CHECKPOINT

ASP Finder: кнопка Get recommendation не отправляла запрос (2026-10-10) — ИСПРАВЛЕНО ЛОКАЛЬНО

Диагностика и причина

- На странице `/` `src/components/asp-find/AspFind.astro` рендерит `#asp-automation-finder`; в браузере `src/components/asp-find/app.js` загрузился (GET 200) и инициализировал начальный экран. Ошибок инициализации в Console не было.
- До исправления фактический DOM имел `data-proxy-url=""`. В `submit()` `app.js` строка с `const proxy=mount.dataset.proxyUrl.trim()` получала пустую строку, а следующая проверка `if(!proxy) throw ...` завершала обработчик до `fetch()`. Это воспроизведено в браузере: клик вывел сетевую ошибку, в Network не появилось `/api` запроса. Все шаги Finder проходились, кнопка Get recommendation была активна; валидация не блокировала отправку.
- Причина пустого атрибута: `ASP_FIND_PROXY_URL` в `src/config/site.ts` был `null`, если `PUBLIC_ASP_FIND_PROXY_URL` не был задан при сборке. Переменная секретного server runtime `ASP_FINDER_N8N_WEBHOOK_URL` не может заменить этот публичный путь: браузеру нужен только адрес same-origin прокси.

Изменение

- `src/config/site.ts`: при отсутствии либо недопустимом значении публичного override используется фиксированный same-origin путь `/api/asp-automation-finder`. Допустимый `PUBLIC_ASP_FIND_PROXY_URL` всё ещё может переопределить endpoint. Контактный маршрут, Finder API, n8n и обработка ответа не менялись.

Проверки

- Повторный browser-run: обычными кликами пройден welcome и все вопросы до Get recommendation. Network показал `POST http://localhost:4321/api/asp-automation-finder` с JSON Finder payload. Локальный Astro dev ответил 404, поскольку он не исполняет корневые Vercel Functions; это подтверждает клиентскую отправку, но не live backend.
- `npm run build` без `PUBLIC_ASP_FIND_PROXY_URL` — успешно, 73 страницы; в собранном `dist/index.html` `data-proxy-url="/api/asp-automation-finder"` присутствует.
- `npm test` — успешно, 72 страницы; `node --check src/components/asp-find/app.js` — успешно.
- Секрет или URL n8n в браузерную конфигурацию не добавлялись. Диагностический JS не оставлялся.

Следующий шаг

- После обычного Vercel deployment проверить в Preview, что POST `/api/asp-automation-finder` исполняется как Vercel Function и доходит до настроенного Finder webhook; затем проверить n8n. Deployment в рамках этой задачи не выполнялся.

ASP Finder: same-origin Vercel proxy (2026-10-10) — IMPLEMENTED LOCALLY; DEPLOYMENT NOT VERIFIED

Проверка исходников и архитектуры

- Основной проект собирается как статический Astro (`astro.config.mjs`, `output: "static"`) и использует `"type": "module"`. Корневая `api/asp-contact.js` уже существует; `docs/hosting.md` описывает её как Vercel Node Function, что подтверждает ожидаемую схему root `/api` для проекта.
- Фактическую привязку текущего production deployment к Vercel независимо проверить не удалось: в рабочей копии отсутствуют `.vercel/project.json`, `vercel.json` и Git metadata/настройки проекта. Утверждение о Vercel основано на проектной документации и сообщённых владельцем переменных Vercel, а не на доступе к панели деплоя.
- Сравнены `C:\ASP_FIND_FORM\ASP-Lab-Automation-Finder\api\asp-automation-finder.js` и `server.js`: serverless handler содержит proxy-логику, а `server.js` дополнительно раздаёт standalone HTML/CSS/JS и ограничивает входное тело 128 KiB. Для Astro переносится только API handler; standalone static server не нужен. ESM `export default` соответствует `package.json` с `"type": "module"`. Такой же лимит 128 KiB добавлен в Vercel handler.
- Сохранены POST-only, allowlist точных Finder test/prod URL, проверки формы payload (`answers` object, `free_text` string), обязательный серверный ключ, upstream `X-ASP-Finder-Key`, 30-секундный timeout, безопасные 502/504 ошибки, upstream status/body passthrough и редактирование ключа из upstream response. Запросы/ошибки не логируются. Контактный API и workflow не менялись.

Реализовано

- Добавлен `api/asp-automation-finder.js` — same-origin Vercel Function для `/api/asp-automation-finder`; браузерный запрос не содержит n8n URL или секрет.
- Добавлен `scripts/asp-find-proxy.test.mjs` и команда `npm run test:asp-find-proxy`.
- `.env.example` содержит только безопасные имена/пример URL: `PUBLIC_ASP_FIND_PROXY_URL=/api/asp-automation-finder` (публичная build-time настройка), `ASP_FINDER_N8N_WEBHOOK_URL` (server runtime; Preview — test, Production — production Finder URL), `ASP_FINDER_N8N_HEADER_KEY` (server-only secret). `ASP_CONTACT_N8N_WEBHOOK_URL` осталась отдельной настройкой Contact.
- Обновлены `docs/asp-find-integration.md`, `docs/hosting.md`, `README.md`.

Проверки

- `npm run test:asp-find-proxy` — успешно, 5/5 (method, конфигурация/валидация payload, размер тела, forwarding/редакция ключа, network/timeout).
- Contact regression: `npm run test:contact` — 6/6; `npm run test:contact-api` — 4/4.
- `node --check api/asp-automation-finder.js` и `node --check src/components/asp-find/app.js` — успешно.
- `npm run build` с `PUBLIC_ASP_FIND_PROXY_URL=/api/asp-automation-finder` — успешно, Astro собрал 73 страницы. В sandbox Astro получил EPERM на `fs.realpath`; повтор с разрешённым доступом к workspace прошёл.
- `npm test` — успешно, 72 страницы; `npm run validate:content` — успешно (13 проектов, 15 capabilities, 221 translation keys × 3 locales).
- В `dist/index.html` проверено наличие `data-proxy-url="/api/asp-automation-finder"`; ключ и upstream n8n URL в собранном homepage отсутствуют.
- Реальный POST в Vercel/n8n и запуск функции после deployment не проверялись. Настройки Vercel не менялись; commit/deployment не выполнялись.

Следующий шаг после отдельного подтверждения deployment

- Проверить, что Vercel Preview/Production подхватывают root `api/asp-automation-finder.js`; настроить `PUBLIC_ASP_FIND_PROXY_URL` на build-time и `ASP_FINDER_N8N_WEBHOOK_URL` + `ASP_FINDER_N8N_HEADER_KEY` только для server runtime (Preview test URL, Production production URL), затем redeploy.
- В Preview проверить в DevTools POST на `/api/asp-automation-finder`, пройти тестовую отправку и подтвердить в n8n доставку Finder payload и корректный ответ. Production запрос делать только после успешной Preview проверки. Contact API/webhook остаётся без изменений.

Contact webhook moved behind a Vercel Function (2026-10-10) — CODE READY; N8N AUTH CONTRACT UNVERIFIED

- Removed the Contact test/production webhook URLs and `WEBHOOK_MODE` from browser code. `src/components/pages/contact-form.js` now POSTs only to same-origin `/api/asp-contact`.
- Added `api/asp-contact.js`, a small Vercel Node Function that validates method, JSON content type, same-origin host, and normalized Contact fields; allows only the configured test or production `asp-contact` URL; reads `ASP_CONTACT_N8N_WEBHOOK_URL` and existing server-only `ASP_FINDER_N8N_HEADER_KEY` at runtime; and forwards only `{ name, email, phone, message }` with `X-ASP-Finder-Key`. Secret values are redacted from upstream response text. Finder frontend and proxy behavior were not changed.
- Inspected the existing ASP Find source proxy and `docs/contract.md`: it reads `ASP_FINDER_N8N_HEADER_KEY` and sends `X-ASP-Finder-Key`. The repository does not include the n8n Contact workflow, so it is not confirmed that `asp-contact` validates this header or uses the same credential. Thus server-side handling is implemented, but end-to-end protection is not confirmed until workflow configuration is inspected.
- Added `.env.example` names/safe values only: Preview test URL and blank server secret. Vercel configuration required: `ASP_CONTACT_N8N_WEBHOOK_URL` = test URL in Preview, production URL in Production; `ASP_FINDER_N8N_HEADER_KEY` as server-only variable. No secret was created, Vercel setting changed, workflow changed, or real request sent. Local Astro dev alone does not execute the Vercel Function.
- Updated `README.md`, `docs/future-contact.md`, `docs/asp-find-integration.md`, `docs/hosting.md`, and this checkpoint with architecture, environment mapping, and the unverified n8n auth boundary.
- Added `scripts/asp-contact-api.test.mjs` and `npm run test:contact-api`; mocked API tests pass (4/4: method/config checks, validation, origin rejection, exact four-field forwarding, server header). Existing contact validation tests pass (6/6). `node --check` passes for API and browser client.
- Production Astro build passed (73 pages) after running outside the restricted sandbox; the initial sandbox run failed because Vite's native `realpath` call returned EPERM. The build emits an existing `[ERROR] The build was canceled` line but completes successfully, as previously observed. `npm test` passed (72 pages); `npm run test:prod` passed (72 indexable pages, 72 sitemap URLs). `npm run check` still fails on 31 existing unrelated diagnostics in legacy metrics/case-study/type files. Browser bundle scan found no Contact webhook URLs, env variable names, or placeholder key.
- Real n8n request/auth validation: NOT RUN. No Vercel runtime or n8n workflow access was available.

Next concrete step

- Inspect the `asp-contact` n8n workflow to confirm its Header Auth check and successful response contract match `X-ASP-Finder-Key` and `{ "status": "ok" }`; then configure the Vercel Preview URL and existing secret, and perform one controlled test submission. Do not enable Production traffic until the test is confirmed in n8n.


ASP Find: геометрия Hero и модальное окно результата (2026-10-10) — ЗАВЕРШЕНО

- Desktop от 1280 px: ширина обеих колонок Hero — 592 px, интервал — 24 px. Слот формы `position: relative; min-height: 624px`; сама форма позиционируется поверх слота, имеет `height: auto`, динамически подстраивается под шаг и получает переход высоты/тени, тонкий синий бордюр и мягкую тень. На desktop уже 1024 px правая колонка адаптируется к доступному месту; ниже 1024 px форма следует за текстом в обычном потоке без desktop-высоты.
- Валидный ответ API с AI-рекомендациями открывается в нативном модальном `<dialog>` по центру экрана. Есть размытый backdrop, максимум 800 px ширины/85 vh высоты, внутренняя прокрутка, крестик, закрытие по Escape, перезапуск диагностики; возврат фокуса назначается кнопке открытия. В самой форме остаётся компактный экран готовности. Ответ `accepted` по-прежнему не выдаётся за AI-результат.
- Локализованы подписи модального окна на EN/UK/RU. Изменены `src/components/home/HomePage.astro`, `src/styles/home.css`, `src/components/asp-find/app.js`, `src/components/asp-find/styles.css`.
- Проверки: `node --check src/components/asp-find/app.js` — успешно; `npm run build` — успешно, 73 страницы; `npm test` — успешно, 72 страницы; `npm run test:prod` — успешно, 72 indexable URLs = 72 sitemap URLs; `npm run validate:content` — успешно (13 проектов, 15 направлений, 206 ключей × 3 языка).
- Ограничения проверок: `npm run check` останавливается на 31 существующей диагностике в старых компонентах/словарях; `npm run check:layout` не запускается без Python Playwright. Локальная страница открыта в браузере при ширине 600 px; видны мобильная вертикальная компоновка и работающий стартовый шаг. Desktop-пиксельная проверка и проверка результата через живой API-ответ не выполнены.
- Следующий шаг: проверить desktop-композицию и открытие настоящего модального результата в среде с установленным Playwright и доступным proxy/API; на текущем этапе backend и инфраструктура не менялись.


ASP Find: фон и удаление верхних подписей (2026-10-10) — ЗАВЕРШЕНО

- Уточнение владельца: сохранить пастельно-голубой стиль карточки и убрать с верхней части формы `ASP Lab` и `BUSINESS AUTOMATION`.
- Проверено, что `ASP Lab` выводится общей функцией `shell()` на всех шагах, а `BUSINESS AUTOMATION` — kicker стартового экрана. В CSS есть отдельные правила для этих элементов.
- Верхняя брендовая строка удалена из общей `shell()`, kicker удалён из стартового экрана и локальных копирайтов. Поэтому эти подписи отсутствуют во всех состояниях Finder.
- Фон стартовой карточки и шагов оформлен малоконтрастными градиентами из `--color-blue-50`, `--color-neutral-50` и `--color-blue-100`. Контрастные белые плитки и синие кнопки сохранены.
- Стабильная desktop-геометрия и мобильное поведение из предыдущего этапа не менялись.

Изменённые файлы

- `src/components/asp-find/app.js` — удалены верхний ASP Lab header и BUSINESS AUTOMATION kicker.
- `src/components/asp-find/styles.css` — удалены их стили; сохранён/задан лёгкий голубой фон через существующие токены.
- `CHECKPOINT.md` — итоги уточнения.

Проверки

- `npm run build` — успешно, 73 страницы.
- `npm test` — успешно, 72 страницы dist.
- `npm run validate:content` — успешно, 13 проектов, 15 возможностей, 206 ключей × 3 языка.
- Поиск по источникам и собранному client bundle не находит `BUSINESS AUTOMATION`, `homeKicker`, `asp-finder-brand` или `<span>ASP</span> Lab`.
- Визуальная browser-проверка не проводилась: в среде отсутствует Python Playwright (см. предыдущую запись о `check:layout`).

ASP Find: стабильные размеры и внутренние скроллеры (2026-10-10) — КОД ЗАВЕРШЁН

Выполнено

- Изучены приложенные состояния: стартовая карточка с четырьмя плитками около 520×510 px и поздний шаг с тремя более длинными вариантами около 520×687 px. Ранее динамическая высота возникала из-за естественной высоты нового `.asp-finder-shell`, которую `app.js` заново создаёт при каждом `render()`.
- На desktop mount Finder закреплён по высоте 688 px. На широких экранах от 1440 px ширина стала 640 px (примерно +120 px к текущей); на 1024–1439 px форма использует доступную ширину правой колонки, не сужая текстовую колонку.
- Внутренний shell и карточки растягиваются в mount; заголовки и действия остаются на местах. Списки домашних плиток, вариантов вопросов и результатов получили отдельную вертикальную прокрутку с зарезервированным scrollbar gutter. Длинные плитки растут внутри scroll area; высота внешнего mount от них не зависит.
- Результаты обёрнуты отдельным скроллируемым блоком. Текстовое поле на desktop занимает оставшееся место и прокручивает свой текст внутри. Логика навигации, ответов и отправки Finder не менялась.
- Все фиксированные размеры ограничены desktop media query от 1024 px; mobile оставлен с естественной высотой и текущей одноколоночной компоновкой.

Изменённые файлы

- `src/styles/home.css` — фиксированная высота 688 px; ширина 640 px на широком desktop.
- `src/components/asp-find/styles.css` — flex shell, закреплённые controls, scrollable tiles/results/textarea.
- `src/components/asp-find/app.js` — wrapper только для прокручиваемого тела результатов.
- `CHECKPOINT.md` — этот статус и итоги.

Проверки

- `npm run build` — успешно, 73 страницы; Vite собрал клиентский app.js и CSS.
- `npm test` — успешно, 72 страницы dist.
- `npm run validate:content` — успешно, 13 проектов, 15 возможностей, 206 ключей × 3 языка.
- Два приложенных desktop-сценария рассмотрены как исходный замер; целевая внешняя высота установлена равной более высокому сценарию, чтобы карточка не меняла положение и размер при переходе.
- Автоматическая/browser-проверка обоих состояний после изменения не выполнена: `npm run check:layout` останавливается на `ModuleNotFoundError: No module named 'playwright'`. Поэтому фактические post-change координаты и ручной проход шагов Finder ещё не подтверждены.

Следующий шаг

- Если нужна визуальная приёмка в браузере, установить в проверочной среде Python Playwright и Chromium, затем пройти welcome (4 tiles), question (3 длинных tiles), results и проверить desktop/mobile. Релиз, proxy и серверную инфраструктуру не менять.

ASP Find: стабильный desktop-контейнер (2026-10-10) — В ПРОЦЕССЕ

- Изучены скриншоты пользователя и текущая интеграция `src/components/asp-find/app.js` / `styles.css`: при каждом `render()` прежняя разметка заменяется, а `.asp-finder-shell` и её содержимое используют естественную высоту; на примерах ширина около 520 px, высота меняется примерно с 510 до 687 px.
- План: закрепить mount/карточку по размерам только на desktop, отделить скроллируемую область вариантов/результатов от фиксированных заголовков и кнопок, расширить карточку на широких desktop без сужения левой колонки. На mobile оставить естественную высоту.
- Реализация и тесты ещё не завершены; после изменений результаты будут записаны здесь.

Корректировка Hero: цвет H1 и баланс формы (2026-10-10) — ЗАВЕРШЕНО

Выполнено

- Единый H1 разделён на смысловые span: первая локализованная фраза окрашена через `--color-neutral-900`, вторая — через `--color-navy-900`; обе палитровые переменные уже существовали. Вторая строка остаётся отдельным блочным элементом. EN/UK/RU тексты не менялись.
- На desktop правой колонке выделено больше места (`1.05fr / .95fr`, 24 px gap), предел ширины формы увеличен до 520 px; карточка выровнена к верхней части колонки с небольшим отступом. Внутренние отступы, заголовок, плитки и кнопка продолжения увеличены умеренно, без transform/scale и фиксированной высоты.
- Мобильные правила формы сохранены: одноколоночные плитки, естественная высота, отдельные компактные отступы; новые размеры применяются только от 1024 px. Изображение Hero и текст/кнопки левой части не менялись.

Изменённые файлы

- `src/components/home/HomePage.astro` — span для первой смысловой части H1.
- `src/styles/home.css` — цвета H1 из существующих токенов, более сбалансированные desktop-колонки, положение и ширина формы.
- `src/components/asp-find/styles.css` — desktop-внутренняя компоновка карточки от 1024 px.

Проверки

- `npm run build` — успешно, 73 страницы. Первый sandbox-запуск получил EPERM на `fs.realpath`; повтор с доступом к workspace прошёл.
- `npm test` — успешно, 72 страницы dist.
- `npm run validate:content` — успешно, 13 проектов, 15 возможностей, 206 ключей × 3 локали.
- `npm run test:prod` — успешно, 72/72 indexable и 72 URL в sitemap.
- В собранном HTML проверен H1 для `/`, `/uk/`, `/ru/`: во всех версиях одна H1 с двумя нужными локализованными фразами в отдельных span.
- `npm run check` — блокируется 31 существовавшей ошибкой в `MetricTable.astro`, `CaseStudy.astro` и старых типах/метриках/evidence; новые файлы Hero и Finder в списке ошибок не фигурируют.
- `npm run check:layout` не запустился: в окружении отсутствует Python-модуль `playwright`. Поэтому на этом этапе браузерная визуальная сверка desktop/mobile не подтверждена; CSS проверен статически: новые размеры ограничены desktop media query, мобильной фиксированной высоты нет.

Следующий шаг

- В рамках этой задачи изменений больше не требуется. Для повторного browser-layout прогона нужен установленный Python Playwright/Chromium; следующие функциональные задачи, серверную конфигурацию и production-релиз не начинать без отдельной команды владельца.

ASP Find в Hero — frontend интеграция (2026-10-10)

Статус: frontend интеграция завершена и проверена. ASP Lab остаётся статическим; серверную часть, hosting, секреты и n8n не меняли. Реальный POST-контракт сохранён; отправка требует отдельного API deployment.

Изучено

- README.md: ASP Lab — статический Astro + TypeScript сайт с EN/UK/RU, без backend и формы.
- PROMPT.md: V1 исключает новую форму, API route, backend и webhook/n8n; задача владельца явно разрешает интегрировать именно существующий ASP Find.
- CHECKPOINT.md: последняя завершённая работа — косметические изменения от 2026-10-09; рабочая копия без Git metadata.
- docs/future-contact.md: для ASP Lab формы и n8n нет; описан только будущий extension point для Contact.
- Hero: исходная `src/assets/hero-automation.jpg` сохранена; на desktop служит фоном правой колонки под Finder-карточкой, на mobile остаётся в нормальном потоке после текста и формы.
- Исходник содержит `index.html`, `app.js`, `styles.css`, `server.js`, `api/asp-automation-finder.js`, `docs/contract.md` и `docs/decision-rules.md`. README и исходники изучены; PROMPT.md и CHECKPOINT.md в ASP Find отсутствуют. Git status внешней папки недоступен из-за ACL на `.git`; ASP Find не редактировался.
- Форма локализована на EN/UK/RU, стартовый язык выбирается через `data-locale`; внутренний switcher удалён в интегрированной версии.
- Отправка формы выполняет POST на `data-proxy-url` (по умолчанию `/api/asp-automation-finder`). Серверный proxy добавляет `ASP_FINDER_N8N_HEADER_KEY` и отправляет payload на один из allowlist n8n webhook URL; mock fallback отсутствует.
- ASP Find предоставляет Node `server.js` и serverless handler `api/asp-automation-finder.js`. README требует разместить `server.js` за HTTPS/проксировать endpoint и секретно предоставить credential серверному runtime; локальный секрет в исходниках не хранится.
- Найденная внешняя зависимость в standalone HTML — DOMPurify с CDN. В ASP Lab зависимости от CDN не добавлено: текстовая серверная custom summary безопасно экранируется перед показом.

Решение

- Встроить существующий клиент формы напрямую в Astro, не использовать iframe и не создавать новый wizard.
- Перенести только клиентский `app.js` и `styles.css`; standalone `index.html`, Node `server.js`, serverless API handler и локальная документация формы не являются клиентскими ресурсами.
- Вынести удалённый переключатель языка из шаблона, брать locale из пропа Astro/data-locale. Стиль формы адаптировать под ASP Lab токены и компактный overlay.
- Не включать секрет и не подменять отправку заглушкой. Сохранить `POST` на настроенный proxy URL; отсутствие proxy должно вести в настоящую ошибку/недоступность.
- Текущая конфигурация ASP Lab (`astro.config.mjs: output: "static"`) не обслуживает POST route. Для реальной отправки позднее потребуется same-origin API/reverse proxy или отдельный доверенный HTTPS proxy origin с CORS и серверным secret; этот шаг вне текущей задачи.

Следующий шаг

- Файлы изменены: `.env.example`, `README.md`, `docs/future-contact.md`, `src/config/site.ts`, `src/components/home/HomePage.astro`, `src/styles/home.css`, `src/components/asp-find/AspFind.astro`, `src/components/asp-find/app.js`, `src/components/asp-find/styles.css`. Добавлен `docs/asp-find-integration.md`.
- В перенесённом UI удалены внутренние языковые кнопки; язык поступает через `data-locale` из Astro. Уровни заголовков приведены к единственной H1 страницы. Локальный host CSS токенизирует типографику и палитру; карточка полупрозрачная и компактная.
- Не переносились: standalone `index.html`, `server.js`, serverless API handler и внешние assets. HTML использует inline SVG и локальные шрифты ASP Lab; внешний DOMPurify CDN не добавлен, custom summary теперь выводится как экранированный текст.
- `PUBLIC_ASP_FIND_PROXY_URL` — только публичный адрес proxy, пустой по умолчанию; секреты не добавлялись. `docs/asp-find-integration.md` описывает контракт и настройку. Проверка формы без API дошла до ошибки «не удалось соединиться с proxy»; состояния успеха без ответа не было.
- Проверки: `npm run build` — успешно, 73 страницы; `npm test` — успешно, 72 страницы dist; `npm run test:prod` — успешно, 72/72 indexable и sitemap URLs; `npm run validate:content` — успешно (13 проектов, 15 возможностей, 206 ключей × 3 языка).
- Браузер вручную: на EN/UK/RU локаль формы совпадает с `html lang`, заголовок формы локализован, внутреннего language picker нет, сохранённая картинка загружается (1376 px), на странице одна H1. Ширины 320/375/768/1024/1440 проверены; горизонтального переполнения нет, на 1024 текст и карточка не пересекаются, схема умещается.
- `npm run check` не проходит из-за 31 уже существовавших Astro/TypeScript diagnostics в старых `MetricTable.astro`, `CaseStudy.astro`, `content/types`/metrics/evidence модулях; новых ошибок в `AspFind.astro` нет. Линтера в scripts нет. Ручная отправка на реальный API не проверена: endpoint не настроен.

Следующий шаг

- После отдельного выбора и развёртывания доверенного API proxy настроить публичный `PUBLIC_ASP_FIND_PROXY_URL` для сборки и выполнить тестовую отправку. Endpoint должен принимать контракт из ASP Find и хранить `ASP_FINDER_N8N_HEADER_KEY` только на сервере. Не добавлять proxy, менять инфраструктуру или публиковать сайт без отдельной задачи/согласования.

Косметические доработки (2026-10-09) — ЗАВЕРШЕНЫ

Выполнено

- Логотипы владельца добавлены в `public/logo/`: `asp-lab-logo-wide.jpg` (шапка, в том числе mobile menu) и `asp1-logo.jpg` (подвал). Широкий логотип в шапке и компактный знак в подвале отображаются с исходными пропорциями; подпись ASP Lab оформлена жирным.
- Hero разделён на две локализованные строки в EN/UK/RU. Для `AI` и второй фразы используется тёмно-синий токен `--color-blue-900`; мобильный перенос естественный.
- В общем Telegram CTA убраны подписи с названием/handle бота; кнопки и URL сохранены.
- Секция Results полностью удалена с главной, включая переводы её заголовка. Независимые результаты на страницах проектов сохранены и проверены.
- FAQ fine-tuning сохранён по вопросу и обновлён во всех трёх языках; русский ответ соответствует заданному тексту.

Изменённые файлы

- `src/components/Logo.astro`, `src/components/Header.astro`, `src/components/Footer.astro`, `src/components/TelegramCTA.astro`, `src/config/site.ts`.
- `src/components/home/HomePage.astro`, `src/styles/home.css`, `src/content/pages/projects-section.ts`.
- `src/lib/translations/en.ts`, `uk.ts`, `ru.ts`.
- `scripts/verify-dist.mjs` — проверка стала переносимой для Windows-путей и принимает новые логотипы.
- Добавлены `public/logo/asp-lab-logo-wide.jpg` и `public/logo/asp1-logo.jpg`.

Проверки

- `npm run build` — успешно, 73 страницы. В этом Windows-окружении Astro запускается с разрешённым доступом: sandbox-вызов `fs.realpath.native` возвращает `EPERM` для путей workspace.
- `npm test` — успешно: 72 страницы dist.
- `npm run test:prod` — успешно: 72/72 индексируемых страниц в sitemap.
- `npm run validate:content` — успешно: 13 проектов, 15 возможностей, 206 ключей × 3 языка.
- В браузере вручную проверены EN/UK/RU, логотипы, Hero, FAQ и Telegram CTA; ширины 320/375/768/1024/1440/1920 px, горизонтального переполнения нет.
- `npm run check:layout` и `npm run audit:browser` не запустились: в доступном Python отсутствует `playwright`. Линтер в `package.json` не предусмотрен.
- `npm run check` блокируется 31 Astro diagnostics в старых модулях кейсов/метрик и несогласованных типах; изменения этого этапа в диагностике не фигурируют. Отдельный `npx tsc --noEmit` показывает 5 ошибок импорта удалённых типов (`Project`, `ProjectCopy`, `Metric`, `Evidence`) из `src/content/types.ts` старым модулям. Проверка контента проходит отдельно.
- Git-метаданных в рабочей папке нет; `git status` и diff недоступны.

Следующий шаг

- Этап этой задачи завершён. Остановиться здесь; релиз и следующие функциональные задачи не начинать без отдельной команды владельца.

(Правило проекта: перед работой читать этот файл; продолжать только с последнего подтверждённого этапа; обновлять после каждого этапа; перед длительным процессом сначала сохранять чекпоинт; если точку остановки определить нельзя — не начинать заново, а спросить владельца.)

Последний завершённый этап

Этап 6 — Переработка позиционирования главной и /solutions под 8 направлений (подэтапы 6.1–6.6 завершены и проверены)

Выполнено

- Этап 1. Основа: Astro + TypeScript, один реестр маршрутов (src/lib/routes.ts) и одна страница [...slug].astro для всех языков EN/UK/RU, типизированные словари, валидатор контента (scripts/validate-content.ts), режимы preview/production, canonical/hreflang/sitemap/robots, 404.
- Этап 2. Оболочка и визуальная система: палитра белый + синий + navy (без teal/green), IBM Plex локально (Latin + Cyrillic), шапка/подвал/хлебные крошки, мобильное меню (исправлен баг: <script> лежал внутри <style>), inert-фон, no-JS навигация, цели ≥44 px, печать, доступность.
- Этап 3. Стратегический слой (адендум): путь Discover→…→Deploy, «Demonstrate before deployment», 9 сценариев (концепции), демонстрационная инфраструктура, модели развёртывания, стратегические цели (About + главная).
- Этап 4. Идентичность: бренд «ASP Lab» (полное имя ASP Lab - Automation of Systems & Processes), логотип из лого.jpg (прозрачный PNG ×4, фавиконки, apple-touch, og-image), Telegram-бот https://t.me/ASP_Lab_Bot ВШИТ в код как значение по умолчанию (работает без .env), GitHub-профиль по умолчанию, все видимые TODO убраны.
- Этап 5. Проекты: 13 проектов из материала владельца (ru — исходник, en/uk — перевод) в src/content/project-data/group1–4.ts; модель src/content/project-types.ts; каталог /lab с фильтром по 8 направлениям; единый шаблон страницы проекта (подзаголовок, о проекте, схема по шагам, возможности, где применяется, технологии, выделенный результат); результаты на главной; цифры тестов/бенчмарков нигде не выводятся; валидатор запрещает формулировки «эксперимент/черновик/прототип/не задокументировано» в текстах проектов; старые модели кейсов/метрик/доказательств удалены.
- Проверено на момент последнего архива (2026-10-05 11:26): astro build — 73 страницы; astro check/tsc — 0 ошибок; validate-content проходит (13 проектов, 214 ключей × 3 языка); npm test — 72 страницы; npm run test:prod — 72 в sitemap; check-layout — 72 страницы × 6 ширин без переполнения; audit-browser — 89 из 89; check-release падает только по 5 пунктам конфигурации.
- Архив: /mnt/user-data/outputs/AI_LAB_fixed.zip (содержит весь проект; после этого файла он будет пересобран).

Текущий этап

- Подэтап A1 [x ЗАВЕРШЁН и проверен 2026-10-06: astro check 0 ошибок/0 предупреждений/0 hints, validate ok, build 73, npm test, test:prod, layout, audit-browser 90/90; сценарии A→developing, B→confirmed, E→developing с projectIds, валидатор требует проекты для не-концептов, на карточках ссылки на проекты]: исправить остатки старых формулировок. Найдено: (1) scenarios.ts — сценарий E «обработка совещаний» писал «Локальная транскрипция — лабораторный эксперимент, остальное не задокументировано» (противоречит проекту), сценарий B «Прототип показывает логику маршрутизации»; нужно: A → «developing», B → «confirmed», E → «developing» с границами по фактам проектов (telegram-secretary, feedback-routing, local-transcription, openai-api-desk); (2) audiences.ts: «данные для прототипа»; (3) local-ai.ts: «Лабораторные эксперименты не подтверждают…» (пункт и FAQ); (4) solutions.ts FAQ: «Прототип может работать…»; (5) privacy.ts: «не задокументировано» про журналы хостинга; (6) 5 неиспользуемых переменных (astro hints) в AboutPage, AudiencePage, LocalAiPage, PrivacyPage. После правок: check, validate, build, npm test, audit-browser, обновить чекпоинт, пересобрать zip.
- Аудит «что ещё не сделано» [x ЗАВЕРШЁН 2026-10-06]: найдено и исправлено (подэтап A1 + чистка): устаревшие формулировки в сценариях/FAQ/Privacy/аудиториях, 5 неиспользуемых переменных, мёртвый код (удалены src/lib/content-validation.ts и 12 неиспользуемых типов из types.ts). Смешения языков на uk/ru страницах НЕ найдено. Осталось только то, что требует решения/данных владельца (см. «Следующий шаг» и «Ошибки / проблемы»).
- Этап 6 ЗАВЕРШЁН. Итоговый прогон 2026-10-06: astro build — 73 страницы; astro check/tsc — 0 ошибок; validate-content — ok (13 проектов, 203 ключа × 3 языка, 8 направлений); npm test — 72 страницы, внутренние ссылки и #якоря; npm run test:prod — 72 в sitemap; check-layout — 72 страницы × 6 ширин; audit-browser — 90 проверок, 0 ошибок (в том числе раскладка 8 блоков /solutions); check-release падает только по 5 пунктам конфигурации. Просмотрены в браузере: главная (EN/RU), /solutions, /local-ai, подвал.
- Исправлено попутно: якоря-алиасы automation/model-selection лежали внутри сетки блока направления и сдвигали раскладку (вынесены наружу, добавлен регресс-тест); на Local AI удалён дублирующий callout (поле caution удалено).
- Этап 7 (не начат, ждёт решения владельца): финальная приёмка и релиз — задать PUBLIC_SITE_URL + SITE_MODE=production, оператор/контакт/хостинг, вычитка uk/ru носителем, ссылки на репозитории для 5 проектов, решение по UniBooks.

Следующий шаг

- Ждать указаний владельца. Возможные следующие шаги (не начинать без команды): (1) вычитка переводов uk/ru; (2) ссылки на репозитории для: Миграция Jira→GitHub, YouTube→текст, AI-диктовка, Telegram-секретарь, Форма с маршрутизацией; (3) значения для релиза (домен, оператор, контакт, хостинг) и тексты Privacy; (4) решение по UniBooks Translator; (5) пересмотр 9 сценариев-концепций и страниц /approach, /business, /education, /public-sector под новое позиционирование (метки «Demonstration concept» сохранены только у сценариев без проектов; A/B/E теперь developing/confirmed со ссылками на проекты).

НЕ повторять

- Этапы 1–5 целиком (сборка, проверки и просмотр страниц уже выполнены; повторять только полный прогон после правок этапа 6).
- Перевод и ввод 13 проектов; логотип и фавиконки; подключение бота; удаление TODO; удаление чисел тестов/бенчмарков.
- 6.1 (directions.ts и его проверки), 6.2 (hero + плитки главной), 6.3 (страница /solutions на 8 направлениях), 6.4 (подвал).
- Чтение READMEs репозиториев и анализ «что подтверждает направление» — источником истины являются тексты проектов от владельца.
- Не возвращать на сайт: UniBooks Translator (нет в материале владельца), числа тестов/проходов/бенчмарков, слова про «эксперимент/черновик/прототип» для работающих проектов.

Ошибки / проблемы

- Старые формулировки из главной/solutions/Local AI/аудиторий/подвала/сценариев/Privacy устранены (этап 6 + A1). Остались намеренно: метки «Demonstration concept» у сценариев без проектов (C, D, F, G, H), «Laboratory-scale local execution, not production hosting» (честная граница по инфраструктуре) и раздел «What is not claimed» про лабораторную инфраструктуру.
- Ссылки на репозиторий есть у 8 из 13 проектов; нет у: Миграция Jira→GitHub, YouTube→текст, AI-диктовка, Telegram-секретарь, Форма с маршрутизацией (нужны ссылки от владельца или оставить без ссылки).
- Блокеры релиза (конфигурация, не код): PUBLIC_SITE_URL + SITE_MODE=production, PUBLIC_OPERATOR_NAME, PUBLIC_PRIVACY_CONTACT, PUBLIC_HOSTING_PROVIDER; тексты Privacy (юрлицо, хранение, основания) не написаны.
- Переводы en/uk новых текстов выполнены без носителя языка — нужна вычитка.
- Не сделано (нужен человек/внешняя среда): ручная проверка клавиатуры и скринридером (автоматический axe и фокус-тесты есть), реальные замеры производительности на хостинге (есть только лабораторные на localhost), JSON-LD/структурированные данные (в ТЗ — по желанию, не добавлялись), папка tests/ (проверки реализованы скриптами scripts/*, не отдельным каталогом).
- Не проверено: слэши и статус 404 на реальном хостинге; ручная проверка скринридером; 5 «hints» astro check не разбирались.
- В выводе astro build каждый раз есть строка «[ERROR] The build was canceled», при этом сборка завершается успешно (причина не выяснена).
- Токен Telegram-бота был прислан в чат — рекомендовано отозвать в @BotFather; в проекте токена нет.

Дата обновления

2026-10-06 10:45 UTC

ASP Finder: rich text in AI recommendation (2026-10-10) — IMPLEMENTED LOCALLY

- In `src/components/asp-find/app.js`, `results()` escaped `custom_summary` with `escapeHtml()` and placed it inside a `<p>`. That rendered formatting tags literally and would have created invalid nested block markup if escaping were simply removed.
- Added a local allowlist sanitizer for `p`, `strong`, `b`, `em`, `i`, `br`, `ul`, `ol`, and `li`. It reconstructs those tags without attributes; drops script/style/embedded active subtrees; unwraps other tags (including links) to text. Plain text remains text; newlines become `<br>`. No normalization of backslash-escaped angle brackets was added because no captured response showed that form.
- The source integration contract documents `custom_summary` as optional localized free-form text and shows it empty in the example. No live n8n payload was captured or requested, so runtime formatting bytes and any literal backslash escaping remain unverified.
- `src/components/asp-find/styles.css` adds only scoped spacing/color rules for formatted summary paragraphs and lists. API shape, request/error handling, locales, proxy, workflow and other components were not changed.

Checks

- `node --check src/components/asp-find/app.js` — passed.
- `npm run build` — passed, 73 pages. Initial sandbox run hit a filesystem `realpath` EPERM; the retry with approved workspace access passed.
- `npm test` — passed, 72 pages.
- `npm run test:asp-find-proxy` — passed, 5/5.
- Browser mock-response checks — passed: multiple paragraphs, strong/emphasis, unordered list, newline-to-`<br>`, plain text, and native result dialog. A payload with script, event attribute, image and `javascript:` link rendered with no script/image/link attributes and did not execute the XSS sentinel.

Next step

- After deployment, verify the actual `custom_summary` from a controlled n8n response in the deployed Finder. No commit, push, deployment, or live workflow request was made.
