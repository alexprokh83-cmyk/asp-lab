(() => {
  'use strict';
  const mount = document.getElementById('asp-automation-finder');
  if (!mount) return;
  const PRODUCTION_VERSION = '1.0.0';
  const allowedArchitectures = ['arch_n8n_sync', 'arch_ocr_pipeline', 'arch_rag_basic', 'arch_bot_router', 'arch_enterprise_consult', 'arch_business_audit'];
  const copy = {
    en: {
      title:'Find the right automation approach', intro:'Answer a few questions to get a practical starting point for your business.', start:'Start diagnosis', brand:'ASP Lab', step:'Step', of:'of', optionalStep:'Optional detail', back:'Back', next:'Continue', submit:'Get recommendation', choose:'Choose an answer to continue.', chooseMany:'Choose at least one answer to continue.',
      homeTitle:'What would you like to improve?', homeSubtitle:'Choose an area to explore the right automation for your business.', home_process:'Process automation', home_process_desc:'Routine tasks and approvals', home_documents:'Documents & knowledge', home_documents_desc:'Search, PDFs and internal data', home_integration:'System integration', home_integration_desc:'Connect your business tools', home_assistants:'AI assistants', home_assistants_desc:'Requests, support and answers', homeHint:'Not sure where to start? Choose an area and we’ll guide you.', homeError:'Choose an area to continue.',
      q_pain:'What is the main business problem?', q_data:'What kinds of data are involved?', q_systems:'Which systems are used in this process?', q_api:'Does the custom system have an API?', q_volume:'How often does this process run?', q_privacy:'How sensitive is the data?', q_maturity:'How well is the process defined?', q_description:'Anything else we should know?', descHelp:'Optional. Do not include personal or confidential information.', placeholder:'Describe the process or desired outcome…', chars:'characters',
      pain_routine:'Routine and repetitive work', pain_docs:'Documents and information search', pain_systems:'Disconnected systems', pain_requests:'Incoming requests handled manually', pain_unknown:'The process or problem is not yet clear',
      data_text_tables:'Text and tables', data_scans_pdf:'Scans and PDFs', data_audio_video:'Audio and video', data_databases:'Databases', data_unknown:'Not sure',
      sys_crm:'CRM', sys_erp:'ERP', sys_email:'Email', sys_custom:'Custom system', sys_unknown:'Not sure', api_yes:'Yes', api_no:'No', api_unknown:'Not sure',
      vol_single:'Occasional or one-off tasks', vol_hundreds_day:'Hundreds of operations per day', vol_thousands_day:'Thousands of operations per day',
      priv_public:'Public or non-sensitive data', priv_commercial:'Commercially sensitive; approved SaaS may be acceptable', priv_strict:'Strict confidentiality; external APIs may be prohibited',
      mat_documented:'The process is documented', mat_examples:'Examples exist, but it is not fully documented', mat_tribal:'The process mainly exists in employees’ knowledge',
      loadingTitle:'Sending your diagnosis', loadingText:'We’re securely sending your answers and preparing the recommendation.', errorTitle:'We couldn’t complete the diagnosis', errorText:'Please try again. Your answers are still saved.', errorHttp:'The secure webhook returned HTTP {status}.', errorNetwork:'Could not reach the secure webhook proxy. Check the connection or proxy settings.', errorResponse:'The webhook returned a response we could not use.', retry:'Retry', restart:'Start over', resultTitle:'Your diagnostic result', resultReady:'Your recommendation is ready.', openResult:'View recommendation', closeResult:'Close', closeDialog:'Close recommendation', resultIntro:'These options are a first direction based on your answers. Confirm requirements with your team before implementation.', recommendations:'Recommended approach', explanation:'Why this fits', review:'Human review points', rejected:'Approaches to avoid for now', nextSteps:'Suggested next steps', privacyNote:'Strict privacy selected: recommendations avoid unapproved external APIs.', cta:'Talk to ASP Lab', cta_consult:'Talk to ASP Lab',
      diagnostic_audit:'Clarify the process before automating it', diagnostic_documents:'Process and extract document information', diagnostic_sync:'Connect systems through a controlled integration', diagnostic_requests:'Route incoming requests with human oversight', diagnostic_general:'Review requirements before selecting a solution',
      summary_audit:'Start by clarifying and documenting the process before choosing an automation.', summary_documents:'A document pipeline can extract information and make it easier to find.', summary_sync:'Connect systems through a controlled integration workflow.', summary_requests:'Route and classify incoming requests, with a person handling exceptions.', summary_general:'A small pilot can validate the workflow before wider rollout.',
      arch_n8n_sync_name:'System integration and synchronization', arch_n8n_sync_desc:'A controlled workflow moves data between systems and keeps records in sync.', arch_ocr_pipeline_name:'Document processing and extraction', arch_ocr_pipeline_desc:'Extract structured information from scans and PDFs, with review for uncertain fields.', arch_rag_basic_name:'Search across internal knowledge', arch_rag_basic_desc:'Help staff find answers across approved internal documents with source references.', arch_bot_router_name:'Incoming request routing', arch_bot_router_desc:'Classify and send requests to the right team, escalating uncertain cases to a person.', arch_enterprise_consult_name:'Individual solution design', arch_enterprise_consult_desc:'Review privacy, access, hosting and integration requirements before selecting components.', arch_business_audit_name:'Process discovery and business analysis', arch_business_audit_desc:'Map the real workflow, exceptions and success measures before automating it.',
      review_people:'A team member should verify extracted or generated information before it changes business records.', review_exceptions:'Define who handles exceptions and what happens when an integration fails.', review_access:'Confirm data access, retention, hosting and vendor approval with the responsible owner.', review_process:'Validate the documented process and ownership with the people doing the work.', reject_external:'Avoid sending strict-confidentiality data to external APIs unless explicitly approved.', reject_full_auto:'Avoid fully automatic decisions until accuracy and exception handling are proven.', step_map:'Map the current process and its exceptions.', step_pilot:'Choose one measurable pilot and define a human review point.', step_access:'Confirm system access, privacy and hosting constraints with your IT owner.'
    },
    uk: {
      title:'Знайдіть відповідний підхід до автоматизації', intro:'Дайте відповіді на кілька запитань, щоб отримати практичний напрям для вашого бізнесу.', start:'Почати діагностику', brand:'ASP Lab', step:'Крок', of:'з', optionalStep:'Додатковий опис', back:'Назад', next:'Продовжити', submit:'Отримати рекомендацію', choose:'Оберіть відповідь, щоб продовжити.', chooseMany:'Оберіть принаймні одну відповідь.',
      homeTitle:'Що ви хотіли б покращити?', homeSubtitle:'Оберіть напрям, щоб знайти автоматизацію для вашого бізнесу.', home_process:'Автоматизація процесів', home_process_desc:'Рутинні завдання та погодження', home_documents:'Документи та знання', home_documents_desc:'Пошук, PDF і внутрішні дані', home_integration:'Інтеграція систем', home_integration_desc:'Поєднання бізнес-інструментів', home_assistants:'AI-асистенти', home_assistants_desc:'Запити, підтримка та відповіді', homeHint:'Не знаєте, з чого почати? Оберіть напрям — ми допоможемо.', homeError:'Оберіть напрям, щоб продовжити.',
      q_pain:'Яка головна проблема бізнесу?', q_data:'З якими типами даних ви працюєте?', q_systems:'Які системи використовуються в процесі?', q_api:'Чи має власна система API?', q_volume:'Як часто виконується цей процес?', q_privacy:'Наскільки чутливі ці дані?', q_maturity:'Наскільки визначений процес?', q_description:'Що ще нам варто знати?', descHelp:'Необов’язково. Не вказуйте особисті чи конфіденційні дані.', placeholder:'Опишіть процес або бажаний результат…', chars:'символів',
      pain_routine:'Рутинна та повторювана робота', pain_docs:'Документи та пошук інформації', pain_systems:'Не пов’язані між собою системи', pain_requests:'Ручне опрацювання вхідних запитів', pain_unknown:'Процес або проблема ще не зрозумілі', data_text_tables:'Текст і таблиці', data_scans_pdf:'Скан-копії та PDF', data_audio_video:'Аудіо та відео', data_databases:'Бази даних', data_unknown:'Не впевнений/а', sys_crm:'CRM', sys_erp:'ERP', sys_email:'Електронна пошта', sys_custom:'Власна система', sys_unknown:'Не впевнений/а', api_yes:'Так', api_no:'Ні', api_unknown:'Не знаю', vol_single:'Час від часу або разові завдання', vol_hundreds_day:'Сотні операцій на день', vol_thousands_day:'Тисячі операцій на день', priv_public:'Публічні або нечутливі дані', priv_commercial:'Комерційно чутливі; погоджені SaaS-сервіси можливі', priv_strict:'Сувора конфіденційність; зовнішні API можуть бути заборонені', mat_documented:'Процес задокументовано', mat_examples:'Є приклади, але процес описаний не повністю', mat_tribal:'Процес переважно зберігається у знаннях працівників',
      loadingTitle:'Надсилаємо діагностику', loadingText:'Безпечно передаємо відповіді та готуємо рекомендацію.', errorTitle:'Не вдалося завершити діагностику', errorText:'Спробуйте ще раз. Ваші відповіді збережено.', errorHttp:'Захищений вебхук повернув HTTP {status}.', errorNetwork:'Не вдалося з’єднатися із захищеним проксі вебхука. Перевірте з’єднання або налаштування проксі.', errorResponse:'Вебхук повернув відповідь, яку не вдалося обробити.', retry:'Спробувати ще раз', restart:'Почати спочатку', resultTitle:'Результат діагностики', resultReady:'Рекомендація готова.', openResult:'Переглянути рекомендацію', closeResult:'Закрити', closeDialog:'Закрити рекомендацію', resultIntro:'Це попередній напрям на основі ваших відповідей. Перед впровадженням узгодьте вимоги з командою.', recommendations:'Рекомендований підхід', explanation:'Чому це підходить', review:'Що має перевірити людина', rejected:'Що поки варто відхилити', nextSteps:'Наступні кроки', privacyNote:'Обрано сувору конфіденційність: рекомендації не передбачають непогоджені зовнішні API.', cta:'Зв’язатися з ASP Lab', cta_consult:'Зв’язатися з ASP Lab',
      diagnostic_audit:'Уточніть процес перед автоматизацією', diagnostic_documents:'Обробка та витягування даних із документів', diagnostic_sync:'Поєднайте системи контрольованою інтеграцією', diagnostic_requests:'Маршрутизуйте запити з наглядом людини', diagnostic_general:'Перевірте вимоги перед вибором рішення',
      summary_audit:'Спершу уточніть і задокументуйте процес, а потім обирайте автоматизацію.', summary_documents:'Конвеєр обробки документів може витягувати дані та спрощувати пошук.', summary_sync:'Поєднайте системи контрольованим інтеграційним процесом.', summary_requests:'Розподіляйте та класифікуйте запити, передаючи винятки фахівцю.', summary_general:'Невеликий пілот допоможе перевірити процес перед масштабуванням.',
      arch_n8n_sync_name:'Інтеграція та синхронізація систем', arch_n8n_sync_desc:'Контрольований процес передає дані між системами та синхронізує записи.', arch_ocr_pipeline_name:'Обробка та розпізнавання документів', arch_ocr_pipeline_desc:'Витягування структурованих даних зі сканів і PDF з перевіркою сумнівних полів.', arch_rag_basic_name:'Пошук у внутрішніх знаннях', arch_rag_basic_desc:'Пошук відповідей у погоджених внутрішніх документах із посиланнями на джерела.', arch_bot_router_name:'Маршрутизація вхідних запитів', arch_bot_router_desc:'Класифікація та передача запитів потрібній команді з ескалацією сумнівних випадків.', arch_enterprise_consult_name:'Індивідуальне проєктування рішення', arch_enterprise_consult_desc:'Перевірка вимог до приватності, доступу, хостингу та інтеграцій.', arch_business_audit_name:'Аналіз і дослідження процесу', arch_business_audit_desc:'Опис реального процесу, винятків і критеріїв успіху перед автоматизацією.',
      review_people:'Працівник має перевірити витягнуті або згенеровані дані до зміни бізнес-записів.', review_exceptions:'Визначте відповідальних за винятки та дії при збоях інтеграції.', review_access:'Узгодьте доступ до даних, зберігання, хостинг і постачальників.', review_process:'Перевірте опис процесу та відповідальних разом із виконавцями.', reject_external:'Не передавайте суворо конфіденційні дані зовнішнім API без явного погодження.', reject_full_auto:'Не вмикайте повністю автоматичні рішення, доки не перевірені точність і винятки.', step_map:'Опишіть поточний процес і його винятки.', step_pilot:'Оберіть вимірюваний пілот і визначте точку перевірки людиною.', step_access:'Узгодьте доступ, приватність і хостинг із відповідальним за ІТ.'
    },
    ru: {
      title:'Подберите подход к автоматизации', intro:'Ответьте на несколько вопросов, чтобы определить практичное направление для бизнеса.', start:'Начать диагностику', brand:'ASP Lab', step:'Шаг', of:'из', optionalStep:'Дополнительное описание', back:'Назад', next:'Продолжить', submit:'Получить рекомендацию', choose:'Выберите ответ, чтобы продолжить.', chooseMany:'Выберите хотя бы один ответ.', q_pain:'Какова главная проблема бизнеса?', q_data:'С какими типами данных вы работаете?', q_systems:'Какие системы используются в процессе?', q_api:'Есть ли у собственной системы API?', q_volume:'Как часто выполняется этот процесс?', q_privacy:'Насколько чувствительны эти данные?', q_maturity:'Насколько определён процесс?', q_description:'Что ещё нам следует знать?', descHelp:'Необязательно. Не указывайте личные или конфиденциальные данные.', placeholder:'Опишите процесс или желаемый результат…', chars:'символов',
      homeTitle:'Что вы хотели бы улучшить?', homeSubtitle:'Выберите направление, чтобы найти подходящую автоматизацию для бизнеса.', home_process:'Автоматизация процессов', home_process_desc:'Рутинные задачи и согласования', home_documents:'Документы и знания', home_documents_desc:'Поиск, PDF и внутренние данные', home_integration:'Интеграция систем', home_integration_desc:'Объединение бизнес-инструментов', home_assistants:'AI-ассистенты', home_assistants_desc:'Запросы, поддержка и ответы', homeHint:'Не знаете, с чего начать? Выберите направление — мы подскажем.', homeError:'Выберите направление, чтобы продолжить.',
      pain_routine:'Рутинная и повторяющаяся работа', pain_docs:'Документы и поиск информации', pain_systems:'Разрозненные системы', pain_requests:'Ручная обработка входящих запросов', pain_unknown:'Процесс или проблема пока не ясны', data_text_tables:'Текст и таблицы', data_scans_pdf:'Сканы и PDF', data_audio_video:'Аудио и видео', data_databases:'Базы данных', data_unknown:'Не уверен/а', sys_crm:'CRM', sys_erp:'ERP', sys_email:'Электронная почта', sys_custom:'Собственная система', sys_unknown:'Не знаю', api_yes:'Да', api_no:'Нет', api_unknown:'Не знаю', vol_single:'Периодические или разовые задачи', vol_hundreds_day:'Сотни операций в день', vol_thousands_day:'Тысячи операций в день', priv_public:'Публичные или несекретные данные', priv_commercial:'Коммерчески чувствительные; согласованные SaaS допустимы', priv_strict:'Строгая конфиденциальность; внешние API могут быть запрещены', mat_documented:'Процесс задокументирован', mat_examples:'Есть примеры, но процесс описан не полностью', mat_tribal:'Процесс в основном хранится в знаниях сотрудников',
      loadingTitle:'Отправляем диагностику', loadingText:'Безопасно передаём ответы и готовим рекомендацию.', errorTitle:'Не удалось завершить диагностику', errorText:'Попробуйте ещё раз. Ваши ответы сохранены.', errorHttp:'Защищённый вебхук вернул HTTP {status}.', errorNetwork:'Не удалось подключиться к защищённому прокси вебхука. Проверьте соединение или настройки прокси.', errorResponse:'Вебхук вернул ответ, который не удалось обработать.', retry:'Повторить', restart:'Начать сначала', resultTitle:'Результат диагностики', resultReady:'Рекомендация готова.', openResult:'Посмотреть рекомендацию', closeResult:'Закрыть', closeDialog:'Закрыть рекомендацию', resultIntro:'Это предварительное направление по вашим ответам. Согласуйте требования с командой перед внедрением.', recommendations:'Рекомендуемый подход', explanation:'Почему это подходит', review:'Что должен проверить человек', rejected:'Что пока следует исключить', nextSteps:'Следующие шаги', privacyNote:'Выбрана строгая конфиденциальность: рекомендации не предполагают неразрешённые внешние API.', cta:'Связаться с ASP Lab', cta_consult:'Связаться с ASP Lab',
      diagnostic_audit:'Уточните процесс перед автоматизацией', diagnostic_documents:'Обработка и извлечение данных из документов', diagnostic_sync:'Свяжите системы контролируемой интеграцией', diagnostic_requests:'Направляйте запросы с контролем человека', diagnostic_general:'Проверьте требования перед выбором решения',
      summary_audit:'Сначала уточните и задокументируйте процесс, затем выбирайте автоматизацию.', summary_documents:'Обработка документов может извлекать данные и упрощать поиск.', summary_sync:'Свяжите системы контролируемым интеграционным процессом.', summary_requests:'Классифицируйте и направляйте запросы, передавая исключения специалисту.', summary_general:'Небольшой пилот поможет проверить процесс перед масштабированием.',
      arch_n8n_sync_name:'Интеграция и синхронизация систем', arch_n8n_sync_desc:'Контролируемый процесс передаёт данные между системами и синхронизирует записи.', arch_ocr_pipeline_name:'Обработка и извлечение данных из документов', arch_ocr_pipeline_desc:'Извлечение структурированных данных из сканов и PDF с проверкой спорных полей.', arch_rag_basic_name:'Поиск по внутренним знаниям', arch_rag_basic_desc:'Поиск ответов в одобренных внутренних документах со ссылками на источники.', arch_bot_router_name:'Маршрутизация входящих запросов', arch_bot_router_desc:'Классификация и направление запросов нужной команде с передачей сомнительных случаев человеку.', arch_enterprise_consult_name:'Индивидуальное проектирование решения', arch_enterprise_consult_desc:'Проверка требований к приватности, доступу, хостингу и интеграциям.', arch_business_audit_name:'Анализ и исследование процесса', arch_business_audit_desc:'Описание реального процесса, исключений и критериев успеха перед автоматизацией.',
      review_people:'Сотрудник должен проверить извлечённые или сгенерированные данные до изменения записей.', review_exceptions:'Определите ответственных за исключения и действия при сбоях интеграции.', review_access:'Согласуйте доступ к данным, хранение, хостинг и поставщиков.', review_process:'Проверьте описание процесса и ответственность вместе с исполнителями.', reject_external:'Не передавайте строго конфиденциальные данные внешним API без явного согласования.', reject_full_auto:'Не включайте полностью автоматические решения до проверки точности и обработки исключений.', step_map:'Опишите текущий процесс и его исключения.', step_pilot:'Выберите измеримый пилот и определите этап проверки человеком.', step_access:'Согласуйте доступ, приватность и хостинг с ответственным за ИТ.'
    }
  };
  const requestErrors = {
    en: { config:'The server proxy is not configured with the n8n credential. Please contact the site administrator.', auth:'The n8n webhook rejected the server credential. Please contact the site administrator.', timeout:'The n8n service timed out. Your answers are saved; please retry.' },
    uk: { config:'На серверному проксі не налаштовано облікові дані n8n. Зверніться до адміністратора сайту.', auth:'Вебхук n8n відхилив серверні облікові дані. Зверніться до адміністратора сайту.', timeout:'Сервіс n8n не відповів вчасно. Ваші відповіді збережено — спробуйте ще раз.' },
    ru: { config:'На серверном прокси не настроены учётные данные n8n. Обратитесь к администратору сайта.', auth:'Вебхук n8n отклонил серверные учётные данные. Обратитесь к администратору сайта.', timeout:'Сервис n8n не ответил вовремя. Ваши ответы сохранены — попробуйте ещё раз.' }
  };
  const acceptedCopy = {
    en: { title:'Your diagnostic was received', text:'The test workflow accepted your answers. It is currently configured to collect submissions without returning a recommendation.', action:'You can start a new diagnostic whenever you’re ready.' },
    uk: { title:'Діагностику отримано', text:'Тестовий workflow прийняв ваші відповіді. Наразі він збирає заявки, але не повертає рекомендацію.', action:'Коли будете готові, можна пройти діагностику ще раз.' },
    ru: { title:'Диагностика получена', text:'Тестовый workflow принял ваши ответы. Сейчас он собирает заявки, но не возвращает рекомендацию.', action:'Когда будете готовы, можно пройти диагностику ещё раз.' }
  };
  const questionOptions = {
    pain: ['pain_routine','pain_docs','pain_systems','pain_requests','pain_unknown'],
    data: ['data_text_tables','data_scans_pdf','data_audio_video','data_databases','data_unknown'],
    systems: ['sys_crm','sys_erp','sys_email','sys_custom','sys_unknown'], api: ['api_yes','api_no','api_unknown'],
    volume: ['vol_single','vol_hundreds_day','vol_thousands_day'], privacy: ['priv_public','priv_commercial','priv_strict'], maturity: ['mat_documented','mat_examples','mat_tribal']
  };
  const optionDetails = {
    en: {
      pain_routine:'Repeated tasks that take staff time.', pain_docs:'Find, read, or extract information.', pain_systems:'Information needs to move between tools.', pain_requests:'Intake, sorting, or handoff takes manual work.', pain_unknown:'Begin by clarifying the workflow.',
      data_text_tables:'Spreadsheets, messages, and text fields.', data_scans_pdf:'Paper records and digital documents.', data_audio_video:'Calls, recordings, and video files.', data_databases:'Structured records and stored data.', data_unknown:'The data format is not clear yet.',
      sys_crm:'Customer and sales records.', sys_erp:'Operations, inventory, or finance.', sys_email:'Shared inboxes and email workflows.', sys_custom:'An in-house or industry-specific tool.', sys_unknown:'The systems are not known yet.',
      api_yes:'The system exposes an integration interface.', api_no:'There is no supported interface today.', api_unknown:'The integration path needs checking.',
      vol_single:'Low frequency or a first pilot.', vol_hundreds_day:'Steady daily throughput.', vol_thousands_day:'High throughput and reliability needs.',
      priv_public:'Information safe for public sharing.', priv_commercial:'Internal business information.', priv_strict:'Restricted access or residency needs.',
      mat_documented:'Steps and ownership are written down.', mat_examples:'Past examples show how it is done.', mat_tribal:'Knowledge is held by experienced staff.'
    },
    uk: {
      pain_routine:'Повторювані завдання, що забирають час.', pain_docs:'Пошук, читання або витягування даних.', pain_systems:'Дані потрібно передавати між системами.', pain_requests:'Приймання й розподіл потребують ручної роботи.', pain_unknown:'Спершу уточніть робочий процес.',
      data_text_tables:'Таблиці, повідомлення й текстові поля.', data_scans_pdf:'Паперові записи та електронні документи.', data_audio_video:'Дзвінки, записи й відеофайли.', data_databases:'Структуровані записи та дані.', data_unknown:'Формат даних поки незрозумілий.',
      sys_crm:'Дані про клієнтів і продажі.', sys_erp:'Операції, склад або фінанси.', sys_email:'Спільні скриньки та поштові процеси.', sys_custom:'Внутрішній або спеціалізований інструмент.', sys_unknown:'Системи поки невідомі.',
      api_yes:'Система має інтерфейс для інтеграції.', api_no:'Наразі підтримуваного інтерфейсу немає.', api_unknown:'Потрібно перевірити спосіб інтеграції.',
      vol_single:'Невеликий обсяг або перший пілот.', vol_hundreds_day:'Стабільний щоденний потік.', vol_thousands_day:'Високий потік і вимоги до надійності.',
      priv_public:'Дані, безпечні для публічного поширення.', priv_commercial:'Внутрішня бізнес-інформація.', priv_strict:'Обмежений доступ або вимоги до розміщення.',
      mat_documented:'Кроки й відповідальність описані.', mat_examples:'Приклади показують, як виконується робота.', mat_tribal:'Знання зосереджені в досвідчених працівників.'
    },
    ru: {
      pain_routine:'Повторяющиеся задачи отнимают время.', pain_docs:'Поиск, чтение или извлечение данных.', pain_systems:'Данные нужно передавать между системами.', pain_requests:'Приём и распределение требуют ручной работы.', pain_unknown:'Сначала уточните рабочий процесс.',
      data_text_tables:'Таблицы, сообщения и текстовые поля.', data_scans_pdf:'Бумажные записи и электронные документы.', data_audio_video:'Звонки, записи и видеофайлы.', data_databases:'Структурированные записи и данные.', data_unknown:'Формат данных пока неясен.',
      sys_crm:'Данные о клиентах и продажах.', sys_erp:'Операции, склад или финансы.', sys_email:'Общие ящики и почтовые процессы.', sys_custom:'Внутренний или отраслевой инструмент.', sys_unknown:'Системы пока неизвестны.',
      api_yes:'У системы есть интерфейс интеграции.', api_no:'Поддерживаемого интерфейса пока нет.', api_unknown:'Способ интеграции нужно проверить.',
      vol_single:'Небольшой объём или первый пилот.', vol_hundreds_day:'Стабильный ежедневный поток.', vol_thousands_day:'Высокая нагрузка и требования к надёжности.',
      priv_public:'Данные, безопасные для публичного доступа.', priv_commercial:'Внутренняя деловая информация.', priv_strict:'Ограниченный доступ или требования к размещению.',
      mat_documented:'Шаги и ответственность описаны.', mat_examples:'Примеры показывают порядок работы.', mat_tribal:'Знания сосредоточены у опытных сотрудников.'
    }
  };
  const optionIconNames = {
    pain_routine:'repeat',pain_docs:'file',pain_systems:'nodes',pain_requests:'bot',pain_unknown:'help',
    data_text_tables:'text',data_scans_pdf:'scan',data_audio_video:'media',data_databases:'database',data_unknown:'help',
    sys_crm:'people',sys_erp:'building',sys_email:'mail',sys_custom:'tool',sys_unknown:'help',
    api_yes:'link',api_no:'unlink',api_unknown:'help',vol_single:'calendar',vol_hundreds_day:'layers',vol_thousands_day:'chart',
    priv_public:'globe',priv_commercial:'briefcase',priv_strict:'lock',mat_documented:'checkfile',mat_examples:'copy',mat_tribal:'people'
  };
  const iconPaths = {
    repeat:'<path d="M17 2l3 3-3 3"/><path d="M3 11V9a4 4 0 0 1 4-4h13M7 22l-3-3 3-3"/><path d="M21 13v2a4 4 0 0 1-4 4H4"/>',
    file:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>',
    nodes:'<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="12" cy="18" r="2.5"/><path d="M8 7.5l2.5 7M16 7.5l-2.5 7M8.5 6h7"/>',
    inbox:'<path d="M4 4h16l2 11v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4z"/><path d="M2 15h5l2 3h6l2-3h5M8 9h8"/>',bot:'<rect x="3" y="7" width="18" height="13" rx="5"/><path d="M12 3v4M8 13h.01M16 13h.01M9 17h6"/><circle cx="12" cy="3" r="1"/>',
    help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.6 2.6 0 1 1 4.7 1.5c-.8 1-2.2 1.3-2.2 3M12 17h.01"/>',
    text:'<path d="M4 5h16M4 10h16M4 15h10M4 20h8"/>',scan:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M7 14h10M7 17h7"/>',
    media:'<rect x="3" y="5" width="13" height="14" rx="2"/><path d="m16 10 5-3v10l-5-3zM8 10l4 2-4 2z"/>',database:'<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
    people:'<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0M16 5.5a3 3 0 0 1 0 5.8M17 14a5 5 0 0 1 4 5"/>',building:'<path d="M4 21V5l8-3 8 3v16M2 21h20M8 8h2M14 8h2M8 12h2M14 12h2M10 21v-5h4v5"/>',
    mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',tool:'<path d="M14 6a5 5 0 0 0-6.5 6.5L3 17l4 4 4.5-4.5A5 5 0 0 0 18 10l-3 3-4-4z"/>',
    link:'<path d="M10 13a5 5 0 0 0 7.1 0l3-3A5 5 0 0 0 13 2.9l-1.7 1.7M14 11a5 5 0 0 0-7.1 0l-3 3A5 5 0 0 0 11 21.1l1.7-1.7"/>',unlink:'<path d="m10 13 4-4M8 16l-1 1a5 5 0 0 1-7-7l3-3a5 5 0 0 1 6-1M16 8l1-1a5 5 0 0 1 7 7l-3 3a5 5 0 0 1-6 1M3 3l18 18"/>',
    calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18M8 14h3"/>',layers:'<path d="m12 3 9 5-9 5-9-5zM3 12l9 5 9-5M3 16l9 5 9-5"/>',chart:'<path d="M4 19V5M4 19h17M8 15v-4M13 15V8M18 15V4"/>',
    globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',briefcase:'<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V4h8v3M3 12h18M10 12v2h4v-2"/>',lock:'<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/>',
    checkfile:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 15l2 2 5-5"/>',copy:'<rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h2"/>'
  };
  const optionIcon = id => `<svg class="asp-finder-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${iconPaths[optionIconNames[id] || id] || iconPaths.help}</svg>`;
  const state = { locale: ['en','uk','ru'].includes(mount.dataset.locale) ? mount.dataset.locale : 'en', screen:'welcome', index:0, answers:{ pain:'', data:[], systems:[], api:'', volume:'', privacy:'', maturity:'', description:'' }, error:'', requestError:'', result:null, modalOpen:false };
  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function sanitizeRichText(value) {
    const allowedTags = new Set(['p','strong','b','em','i','br','ul','ol','li']);
    const blockedTags = new Set(['script','style','iframe','object','embed','svg','math','template','noscript','form','input','button','video','audio','source','track','link','meta','base']);
    const parsed = new DOMParser().parseFromString(String(value ?? ''), 'text/html');
    function serialize(node) {
      if (node.nodeType === 3) {
        const text = node.nodeValue || '';
        if (!text.trim() && /[\r\n]/.test(text)) return '';
        return escapeHtml(text).replace(/\r\n?|\n/g, '<br>');
      }
      if (node.nodeType !== 1) return '';
      const tag = node.tagName.toLowerCase();
      if (blockedTags.has(tag)) return '';
      const children = Array.from(node.childNodes, serialize).join('');
      if (tag === 'br') return '<br>';
      return allowedTags.has(tag) ? `<${tag}>${children}</${tag}>` : children;
    }
    return Array.from(parsed.body.childNodes, serialize).join('');
  }
  const t = key => copy[state.locale][key] || copy.en[key] || key;
  function steps() { const list=['pain','data','systems']; if(state.answers.systems.includes('sys_custom')) list.push('api'); list.push('volume','privacy','maturity'); if(state.answers.privacy!=='priv_strict') list.push('description'); return list; }
  function shell(content, shellClass='') { return `<div class="asp-finder-shell ${shellClass}">${content}</div>`; }
  function welcome() {
    const choices=[['pain_routine','home_process','home_process_desc'],['pain_docs','home_documents','home_documents_desc'],['pain_systems','home_integration','home_integration_desc'],['pain_requests','home_assistants','home_assistants_desc']];
    const selected=state.answers.pain || 'pain_docs';
    const tiles=choices.map(([id,title,description])=>`<label class="asp-finder-home-tile${selected===id?' is-selected':''}"><input type="radio" name="pain" value="${id}" ${selected===id?'checked':''}><span class="asp-finder-home-icon">${optionIcon(id)}</span><span class="asp-finder-home-copy"><strong>${escapeHtml(t(title))}</strong><small>${escapeHtml(t(description))}</small></span><span class="asp-finder-home-check" aria-hidden="true">${selected===id?'✓':''}</span></label>`).join('');
    return shell(`<section class="asp-finder-home-content"><h2>${escapeHtml(t('homeTitle'))}</h2><p class="asp-finder-home-subtitle">${escapeHtml(t('homeSubtitle'))}</p><div class="asp-finder-home-grid" role="radiogroup" aria-label="${escapeHtml(t('homeTitle'))}">${tiles}</div><button type="button" class="asp-finder-home-hint${selected==='pain_unknown'?' is-selected':''}" data-action="choose-unknown">${escapeHtml(t('homeHint'))}${selected==='pain_unknown'?'<span aria-hidden="true">✓</span>':''}</button><p class="asp-finder-error asp-finder-home-error" role="alert" ${state.error?'':'hidden'}>${escapeHtml(state.error)}</p><button type="button" class="asp-finder-home-continue" data-action="home-continue">${escapeHtml(t('next'))}<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14M13 5l7 7-7 7"/></svg></button></section>`, 'asp-finder-home-shell');
  }
  function question() {
    const list=steps(), key=list[state.index];
    const multi=key==='data'||key==='systems';
    const options=questionOptions[key] || [];
    const countedSteps=list.filter(step=>step!=='description');
    const visibleProgress=Math.min(state.index+1,countedSteps.length);
    const optionHtml=options.map(value=>{ const checked=multi?state.answers[key].includes(value):state.answers[key]===value; return `<label class="asp-finder-option${checked?' is-selected':''}"><input type="${multi?'checkbox':'radio'}" name="${key}" value="${value}" ${checked?'checked':''}><span class="asp-finder-option-icon">${optionIcon(value)}</span><span class="asp-finder-option-copy"><strong>${escapeHtml(t(value))}</strong><small>${escapeHtml(optionDetails[state.locale][value])}</small></span><span class="asp-finder-option-indicator" aria-hidden="true">${checked?'✓':''}</span></label>`; }).join('');
    const field=key==='description'?`<label class="asp-finder-field-label" for="asp-finder-description">${escapeHtml(t('q_description'))}</label><p class="asp-finder-help">${escapeHtml(t('descHelp'))}</p><textarea id="asp-finder-description" class="asp-finder-textarea" maxlength="1000" data-description aria-describedby="asp-finder-counter" placeholder="${escapeHtml(t('placeholder'))}">${escapeHtml(state.answers.description)}</textarea><div class="asp-finder-counter" id="asp-finder-counter"><span data-counter>${state.answers.description.length}</span> / 1000 ${escapeHtml(t('chars'))}</div>`:`<div class="asp-finder-options" role="${multi?'group':'radiogroup'}" aria-label="${escapeHtml(t('q_'+key))}">${optionHtml}</div>`;
    const denominator=countedSteps.length;
    return shell(`<section class="asp-finder-card"><div class="asp-finder-progress"><span>${key==='description'?escapeHtml(t('optionalStep')):`${escapeHtml(t('step'))} ${visibleProgress} ${escapeHtml(t('of'))} ${denominator}`}</span><span>${Math.round(visibleProgress/denominator*100)}%</span></div><div class="asp-finder-track" role="progressbar" aria-valuemin="1" aria-valuemax="${denominator}" aria-valuenow="${visibleProgress}"><span style="width:${visibleProgress/denominator*100}%"></span></div><h2>${escapeHtml(t('q_'+key))}</h2>${field}${state.error?`<p class="asp-finder-error" role="alert">${escapeHtml(state.error)}</p>`:''}<div class="asp-finder-actions"><button class="asp-finder-button" data-action="back"><span aria-hidden="true">←</span> ${escapeHtml(t('back'))}</button><button class="asp-finder-button asp-finder-button-primary" data-action="continue">${key===list.at(-1)?escapeHtml(t('submit')):escapeHtml(t('next'))} <span aria-hidden="true">→</span></button></div></section>`);
  }
  function requestPayload() { const freeText=state.answers.privacy==='priv_strict'?'':state.answers.description; return {version:PRODUCTION_VERSION,session_id:sessionId(),locale:state.locale,answers:{primary_pain:state.answers.pain,data_type:[...state.answers.data],systems_used:[...state.answers.systems],has_api:state.answers.systems.includes('sys_custom')?state.answers.api:'',volume:state.answers.volume,privacy_level:state.answers.privacy,process_maturity:state.answers.maturity},free_text:freeText,meta:{source:'asp-automation-finder',submitted_at:new Date().toISOString(),user_agent:navigator.userAgent}}; }
  let session=''; function sessionId(){ if(!session) session=(globalThis.crypto?.randomUUID?.() || `af-${Date.now()}-${Math.random().toString(36).slice(2)}`); return session; }
  async function submit() {
    state.screen='loading'; state.error=''; state.requestError=''; render();
    try {
      const payload=requestPayload();
      const proxy=mount.dataset.proxyUrl.trim();
      if(!proxy) throw Object.assign(new Error('Proxy URL is not configured'),{kind:'network'});
      const controller=new AbortController();
      const timeout=setTimeout(()=>controller.abort(),30000);
      let response;
      try { response=await fetch(proxy,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:controller.signal}); }
      finally { clearTimeout(timeout); }
      if(!response.ok) {
        let failure={}; try { failure=await response.json(); } catch {}
        const code=failure?.error?.code;
        if(code==='proxy_not_configured') throw Object.assign(new Error(code),{kind:'config'});
        if(code==='upstream_timeout') throw Object.assign(new Error(code),{kind:'timeout'});
        if(response.status===401||response.status===403) throw Object.assign(new Error('Webhook authentication rejected'),{kind:'auth'});
        throw Object.assign(new Error(`HTTP ${response.status}`),{status:response.status});
      }
      const responseText=await response.text();
      if(!responseText.trim()) state.screen='accepted';
      else {
        let result;
        try { result=JSON.parse(responseText); }
        catch { throw Object.assign(new Error('Invalid JSON response'),{kind:'response'}); }
        if(result?.status==='accepted'||(result&&typeof result==='object'&&!result.status)) state.screen='accepted';
        else {
          if(!result||result.status!=='ok'||!Array.isArray(result.recommended_architectures)||result.recommended_architectures.some(id=>!allowedArchitectures.includes(id))) throw Object.assign(new Error('Invalid webhook response'),{kind:'response'});
          state.result=result; state.screen='results'; state.modalOpen=true;
        }
      }
    } catch(e) {
      console.error('ASP Finder production webhook request failed', {status:e.status||null,kind:e.kind||e.name||'request'});
      state.requestError=e.kind==='config'?requestErrors[state.locale].config:e.kind==='auth'?requestErrors[state.locale].auth:e.kind==='timeout'?requestErrors[state.locale].timeout:e.status?t('errorHttp').replace('{status}',String(e.status)):e.kind==='response'?t('errorResponse'):t('errorNetwork');
      state.screen='error';
    }
    render();
  }
  function results() {
    const r=state.result, arch=r.recommended_architectures;
    const primary=arch[0] || 'arch_business_audit';
    const headingKey=r.summary_key==='summary_audit'?'diagnostic_audit':r.summary_key==='summary_documents'?'diagnostic_documents':r.summary_key==='summary_sync'?'diagnostic_sync':r.summary_key==='summary_requests'?'diagnostic_requests':primary==='arch_business_audit'?'diagnostic_audit':primary==='arch_ocr_pipeline'?'diagnostic_documents':primary==='arch_n8n_sync'?'diagnostic_sync':primary==='arch_bot_router'?'diagnostic_requests':'diagnostic_general';
    const customSummary = typeof r.custom_summary === 'string' ? r.custom_summary.trim() : '';
    const summary = customSummary ? sanitizeRichText(customSummary) : `<p>${escapeHtml(t(r.summary_key))}</p>`;
    const additional=arch.slice(1).map(id=>`<article class="asp-finder-result asp-finder-result-secondary"><div class="asp-finder-result-heading">${optionIcon(optionIconNames[id]||'help')}<h3>${escapeHtml(t(id+'_name'))}</h3></div><p>${escapeHtml(t(id+'_desc'))}</p></article>`).join('');
    const list=(heading,values,icon)=>values?.length?`<article class="asp-finder-result"><div class="asp-finder-result-heading">${optionIcon(icon)}<h3>${escapeHtml(t(heading))}</h3></div><ul class="asp-finder-list">${values.map(value=>`<li>${escapeHtml(t(value) || value)}</li>`).join('')}</ul></article>`:'';
    const cta=mount.dataset.ctaUrl.trim();
    const ctaKey=r.next_step_cta?`cta_${r.next_step_cta}`:'cta';
    const ctaLabel=copy[state.locale][ctaKey]||t('cta');
    return shell(`<section class="asp-finder-card asp-finder-results"><span class="asp-finder-badge">${escapeHtml(t('recommendations'))}</span><h2>${escapeHtml(t(headingKey))}</h2><p class="asp-finder-intro">${escapeHtml(t('resultIntro'))}</p><div class="asp-finder-results-content"><article class="asp-finder-result asp-finder-result-featured"><div class="asp-finder-result-heading">${optionIcon(optionIconNames[primary]||'help')}<h3>${escapeHtml(t(primary+'_name'))}</h3></div><p>${escapeHtml(t(primary+'_desc'))}</p></article>${additional}<article class="asp-finder-result"><div class="asp-finder-result-heading">${optionIcon('file')}<h3>${escapeHtml(t('explanation'))}</h3></div><div class="asp-finder-result-summary">${summary}</div></article>${list('review',r.human_review_points,'people')}${list('rejected',r.rejected_approaches,'help')}<article class="asp-finder-result"><div class="asp-finder-result-heading">${optionIcon('calendar')}<h3>${escapeHtml(t('nextSteps'))}</h3></div><ul class="asp-finder-list"><li>${escapeHtml(t('step_map'))}</li><li>${escapeHtml(t('step_pilot'))}</li><li>${escapeHtml(t('step_access'))}</li></ul>${state.answers.privacy==='priv_strict'?`<p class="asp-finder-help">${escapeHtml(t('privacyNote'))}</p>`:''}</article></div>${cta?`<div class="asp-finder-actions"><a class="asp-finder-button asp-finder-button-primary" href="${escapeHtml(cta)}">${escapeHtml(ctaLabel)}</a></div>`:''}</section>`);
  }
  function resultReady() {
    return shell(`<section class="asp-finder-card asp-finder-result-ready" role="status"><span class="asp-finder-badge">✓</span><h2>${escapeHtml(t('resultTitle'))}</h2><p class="asp-finder-intro">${escapeHtml(t('resultReady'))}</p><div class="asp-finder-actions"><button class="asp-finder-button asp-finder-button-primary" data-action="show-result">${escapeHtml(t('openResult'))}</button><button class="asp-finder-button" data-action="restart">${escapeHtml(t('restart'))}</button></div></section>`);
  }
  function resultDialog() {
    return `<dialog class="asp-finder-result-dialog" aria-labelledby="asp-finder-dialog-title"><div class="asp-finder-dialog-inner"><header class="asp-finder-dialog-header"><h2 id="asp-finder-dialog-title">${escapeHtml(t('resultTitle'))}</h2><button type="button" class="asp-finder-dialog-close" data-modal-action="close" aria-label="${escapeHtml(t('closeDialog'))}">×</button></header><div class="asp-finder-dialog-body">${results()}</div><footer class="asp-finder-dialog-footer"><button type="button" class="asp-finder-button" data-modal-action="restart">${escapeHtml(t('restart'))}</button><button type="button" class="asp-finder-button asp-finder-button-primary" data-modal-action="close">${escapeHtml(t('closeResult'))}</button></footer></div></dialog>`;
  }
  function render() {
    let content;
    if(state.screen==='welcome') content=welcome();
    else if(state.screen==='question') content=question();
    else if(state.screen==='loading') content=shell(`<section class="asp-finder-card" aria-live="polite"><div class="asp-finder-spinner" aria-hidden="true"></div><h2>${escapeHtml(t('loadingTitle'))}</h2><p class="asp-finder-intro">${escapeHtml(t('loadingText'))}</p></section>`);
    else if(state.screen==='accepted') content=shell(`<section class="asp-finder-card" role="status"><span class="asp-finder-badge">✓</span><h2>${escapeHtml(acceptedCopy[state.locale].title)}</h2><p class="asp-finder-intro">${escapeHtml(acceptedCopy[state.locale].text)}</p><p class="asp-finder-help">${escapeHtml(acceptedCopy[state.locale].action)}</p><div class="asp-finder-actions"><button class="asp-finder-button asp-finder-button-primary" data-action="restart">${escapeHtml(t('restart'))}</button></div></section>`);
    else if(state.screen==='error') content=shell(`<section class="asp-finder-card" role="alert"><span class="asp-finder-badge">!</span><h2>${escapeHtml(t('errorTitle'))}</h2><p class="asp-finder-intro">${escapeHtml(t('errorText'))}</p><p class="asp-finder-error">${escapeHtml(state.requestError)}</p><div class="asp-finder-actions"><button class="asp-finder-button" data-action="restart">${escapeHtml(t('restart'))}</button><button class="asp-finder-button asp-finder-button-primary" data-action="retry">${escapeHtml(t('retry'))}</button></div></section>`);
    else content=resultReady();
    mount.innerHTML=content;
    const desc=mount.querySelector('[data-description]'); if(desc){desc.addEventListener('input',()=>{state.answers.description=desc.value.slice(0,1000);mount.querySelector('[data-counter]').textContent=String(state.answers.description.length);});}
    mount.querySelectorAll('[data-action]').forEach(button=>button.addEventListener('click',()=>action(button.dataset.action)));
    if(state.screen==='results'&&state.modalOpen) {
      mount.insertAdjacentHTML('beforeend',resultDialog());
      const dialog=mount.querySelector('.asp-finder-result-dialog');
      dialog.addEventListener('cancel',event=>{event.preventDefault();state.modalOpen=false;render();mount.querySelector('[data-action="show-result"]')?.focus();});
      dialog.querySelectorAll('[data-modal-action="close"]').forEach(button=>button.addEventListener('click',()=>{state.modalOpen=false;render();mount.querySelector('[data-action="show-result"]')?.focus();}));
      dialog.querySelector('[data-modal-action="restart"]').addEventListener('click',()=>action('restart'));
      dialog.showModal();
      dialog.querySelector('.asp-finder-dialog-close').focus();
    }
  }
  function validate() { const key=steps()[state.index]; if(key==='description') return true; if(key==='data'||key==='systems') return state.answers[key].length>0; return Boolean(state.answers[key]); }
  function action(name) {
    if(name==='start'){state.screen='question';state.index=0;state.error='';}
    if(name==='home-continue') { const selected=mount.querySelector('input[name="pain"]:checked'); if(selected) state.answers.pain=selected.value; if(!state.answers.pain) { state.error=t('homeError');render();return; } state.screen='question';state.index=1;state.error=''; }
    if(name==='choose-unknown') { state.answers.pain='pain_unknown';state.error=''; }
    if(name==='back'){state.error='';if(state.index===0) state.screen='welcome'; else if(state.index===1) { state.screen='welcome';state.index=0; } else { state.index--; if(steps()[state.index]==='api'&&!state.answers.systems.includes('sys_custom')) state.index--; }}
    if(name==='continue') { const key=steps()[state.index]; if(key!=='description'){const input=mount.querySelector(`input[name="${key}"]:checked`);if(input&&key!=='data'&&key!=='systems') state.answers[key]=input.value;} if(!validate()){state.error=steps()[state.index]==='data'||steps()[state.index]==='systems'?t('chooseMany'):t('choose');render();return;} state.error=''; if(state.index<steps().length-1) state.index++; else {submit();return;} }
    if(name==='retry') { submit();return; }
    if(name==='show-result'){state.modalOpen=true;}
    if(name==='close-result'){state.modalOpen=false;}
    if(name==='restart'){state.answers={pain:'',data:[],systems:[],api:'',volume:'',privacy:'',maturity:'',description:''};state.index=0;state.result=null;state.modalOpen=false;state.error='';state.requestError='';state.screen='welcome';}
    render();
  }
  // Keep the clicked native control in the DOM while the browser completes its
  // label activation. The former change handler re-rendered here and also
  // dropped ordinary multi-select values instead of adding them.
  mount.addEventListener('change', event=>{
    const input=event.target;
    if(!(input instanceof HTMLInputElement) || !input.name) return;
    const key=input.name;
    if(key==='data'||key==='systems') {
      const unknown=key==='data'?'data_unknown':'sys_unknown';
      const values=state.answers[key];
      if(input.checked) state.answers[key]=input.value===unknown?[unknown]:[...values.filter(value=>value!==unknown&&value!==input.value),input.value];
      else state.answers[key]=values.filter(value=>value!==input.value);
    } else state.answers[key]=input.value;
    mount.querySelectorAll(`input[name="${key}"]`).forEach(control=>{
      const selected=key==='data'||key==='systems'?state.answers[key].includes(control.value):state.answers[key]===control.value;
      control.checked=selected;
      const tile=control.closest('.asp-finder-option, .asp-finder-home-tile');
      if(tile) { tile.classList.toggle('is-selected',selected); const mark=tile.querySelector('.asp-finder-option-indicator, .asp-finder-home-check'); if(mark) mark.textContent=selected?'✓':''; }
    });
    state.error='';
    const alert=mount.querySelector('.asp-finder-error'); if(alert) alert.remove();
  });
  mount.addEventListener('keydown', event=>{
    if(event.key!=='Enter'||state.screen!=='question') return;
    const target=event.target;
    if(target.closest('textarea,button,a,input,select,[contenteditable="true"]')) return;
    if(validate()) { event.preventDefault(); action('continue'); }
  });
  mount.setAttribute('lang',state.locale); render();
})();
