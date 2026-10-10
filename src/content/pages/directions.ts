/**
 * The 8 Solutions directions ("what we can automate"). Same ids as the project categories.
 * Every scenario is taken from the texts of our projects (src/content/project-data); nothing is invented.
 * Direction names come from projectsSectionCopy.categories.
 */
import type { Localized } from "../types";
import type { CategoryId } from "../project-types";

export interface Direction { id: CategoryId; problem: string; automate: string; scenarios: string[]; projectIds: string[] }
export interface DirectionsCopy {
  heading: string; lead: string;
  labels: { problem: string; automate: string; scenarios: string; examples: string; discuss: string; details: string };
  items: Direction[];
}

export const directionsCopy: Localized<DirectionsCopy> = {
  ru: {
    heading: "Что мы можем автоматизировать",
    lead: "Выберите направление, ближайшее к вашему процессу. За каждым стоят решения, которые мы создали.",
    labels: { problem: "Какую задачу решает", automate: "Что можно автоматизировать", scenarios: "Примеры сценариев", examples: "Наши рабочие решения", discuss: "Обсудить задачу", details: "Подробнее" },
    items: [
      { id: "documents", problem: "Нужно превратить записи, видео и устные заметки в читаемые, оформленные документы — без ручной расшифровки и набора.", automate: "Расшифровку аудио и видео в текст, очистку и структурирование текста, оформление статей и отчётов в Google Docs.",
        scenarios: ["Лекции и интервью расшифровываются на своём компьютере и превращаются в статью в Google Docs", "Видео на YouTube становится читаемым текстом, который приходит в Telegram", "Голосовой рассказ превращается в оформленный отчёт"], projectIds: ["local-transcription", "youtube-to-text", "voice-bug-report"] },
      { id: "requests", problem: "Обращения приходят с сайта и из мессенджеров, их разбирают вручную и пересылают нужным людям.", automate: "Приём обращений, определение темы, передачу ответственному сотруднику, уведомления и историю переписки.",
        scenarios: ["Форма на сайте: вопрос об оплате — бухгалтеру, техническая проблема — в поддержку, общее обращение — администратору", "AI-секретарь в Telegram отвечает на типовые вопросы по базе знаний и передаёт сложные сотруднику", "Внутренние заявки сотрудников в IT-поддержку, HR и административные службы"], projectIds: ["telegram-secretary", "feedback-routing"] },
      { id: "voice", problem: "Голосовые сообщения и записи приходится слушать, расшифровывать и переносить в нужные системы вручную.", automate: "Распознавание речи, пакетную расшифровку записей, превращение голоса в текст, отчёты и записи в календаре.",
        scenarios: ["Пакетная расшифровка лекций и интервью на видеокарте, полностью офлайн", "Диктовка сообщения в Telegram и получение аккуратного текста", "Голосовое описание ошибки превращается в баг-репорт и задачу в Jira"], projectIds: ["local-transcription", "ai-dictation", "voice-bug-report", "calendar-ai-chronos"] },
      { id: "assistants", problem: "Рутинные действия — планирование, учёт времени, обработка текстов — отнимают время и требуют переключения между приложениями.", automate: "Действия по обычному сообщению в Telegram: события в календаре, учёт времени, обработка и оформление текста, ответы клиентам.",
        scenarios: ["«Завтра с 9 до 10 — встреча» становится событием в Google Calendar, а затраченное время — записью в таблице учёта", "Ссылка на YouTube-видео возвращается читаемым текстом", "AI-секретарь принимает обращения клиентов круглосуточно"], projectIds: ["calendar-ai-chronos", "youtube-to-text", "ai-dictation", "telegram-secretary"] },
      { id: "knowledge", problem: "Сотрудники и клиенты задают одни и те же вопросы, а ответы разбросаны по документам.", automate: "Ответы по внутренней базе знаний, поиск по собственным документам, передачу сложных вопросов человеку.",
        scenarios: ["Telegram-секретарь отвечает на типовые вопросы по базе знаний организации", "Создание хранилищ документов и поиск по выбранной базе, проверка ответов по своим материалам", "Записи занятий превращаются в материалы базы знаний"], projectIds: ["telegram-secretary", "openai-api-desk", "local-transcription"] },
      { id: "integrations", problem: "Данные переносят между системами вручную, отчёты собирают руками, а переезд на другой инструмент занимает недели.", automate: "Обмен данными между Jira, GitHub, Google Sheets и Docs, Telegram и другими системами; AI-обработку текстов внутри процессов.",
        scenarios: ["Баги из Jira превращаются в сводку в Google Sheets без повторных строк", "Почти 500 задач перенесены из Jira в GitHub Projects примерно за 4 часа", "Обращения с сайта автоматически уходят нужному сотруднику по email или в Telegram"], projectIds: ["jira-bug-summary", "jira-to-github-migration", "feedback-routing", "voice-bug-report"] },
      { id: "qa", problem: "Ручное тестирование и сверка ответов не масштабируются, а баги долго описывать и переносить между инструментами.", automate: "Прогон тестов, проверку ответов AI-ботов, фиксацию багов и отчётность.",
        scenarios: ["Автоматическая проверка Telegram-ботов с оценкой ответов и вердиктом PASS или FAIL", "Функциональные проверки и проверки безопасности AI-бота: промпт-инъекции и попытки обхода ограничений", "Голосовой баг-репорт с задачей в Jira и сводка багов для руководителей"], projectIds: ["qa-llm-lab", "telegram-bot-testing", "voice-bug-report", "jira-bug-summary"] },
      { id: "evaluation", problem: "Выбор модели и оценка AI-решения по впечатлению от нескольких ответов ненадёжны.", automate: "Сравнение моделей на одинаковых заданиях, оценку ответов по единым критериям, проверку бота после изменений.",
        scenarios: ["Одинаковые задания для разных локальных моделей: качество и скорость в одной таблице", "AI-оценка ответов по смысловым критериям с баллом и объяснением", "Регулярная проверка поведения бота после смены инструкций, модели или логики"], projectIds: ["auto-llm-benchmark", "qa-llm-lab", "telegram-bot-testing"] },
    ],
  },
  en: {
    heading: "What we can automate",
    lead: "Pick the direction closest to your process. Each one is backed by solutions we have built.",
    labels: { problem: "The task it solves", automate: "What can be automated", scenarios: "Example scenarios", examples: "Our working solutions", discuss: "Discuss a task", details: "Details" },
    items: [
      { id: "documents", problem: "Recordings, videos and spoken notes need to become readable, formatted documents — without manual transcription and typing.", automate: "Transcribing audio and video into text, cleaning and structuring the text, formatting articles and reports in Google Docs.",
        scenarios: ["Lectures and interviews are transcribed on your own computer and turned into an article in Google Docs", "A YouTube video becomes readable text delivered to Telegram", "A spoken account becomes a formatted report"], projectIds: ["local-transcription", "youtube-to-text", "voice-bug-report"] },
      { id: "requests", problem: "Requests arrive from the website and messengers, and people sort them by hand and forward them to the right colleagues.", automate: "Receiving requests, detecting the topic, passing them to the responsible employee, notifications and conversation history.",
        scenarios: ["A website form: a payment question goes to the accountant, a technical problem to support, a general request to the administrator", "An AI secretary in Telegram answers typical questions from a knowledge base and hands complex ones to an employee", "Internal employee requests to IT support, HR and administrative services"], projectIds: ["telegram-secretary", "feedback-routing"] },
      { id: "voice", problem: "Voice messages and recordings have to be listened to, transcribed and moved into the right systems by hand.", automate: "Speech recognition, batch transcription of recordings, turning voice into text, reports and calendar entries.",
        scenarios: ["Batch transcription of lectures and interviews on a graphics card, fully offline", "Dictating a message in Telegram and getting neat text back", "A voice description of a bug becomes a bug report and a Jira task"], projectIds: ["local-transcription", "ai-dictation", "voice-bug-report", "calendar-ai-chronos"] },
      { id: "assistants", problem: "Routine actions — planning, time tracking, processing texts — take time and require switching between apps.", automate: "Actions from an ordinary message in Telegram: calendar events, time tracking, processing and formatting text, answering customers.",
        scenarios: ["“Tomorrow from 9 to 10 — meeting” becomes a Google Calendar event, and the time spent becomes an entry in the tracking table", "A YouTube link comes back as readable text", "An AI secretary receives customer requests around the clock"], projectIds: ["calendar-ai-chronos", "youtube-to-text", "ai-dictation", "telegram-secretary"] },
      { id: "knowledge", problem: "Employees and customers keep asking the same questions, while the answers are scattered across documents.", automate: "Answers from an internal knowledge base, search across your own documents, handing complex questions to a person.",
        scenarios: ["A Telegram secretary answers typical questions from the organization's knowledge base", "Creating document stores and searching the chosen base, checking answers over your own materials", "Recordings of sessions become knowledge-base materials"], projectIds: ["telegram-secretary", "openai-api-desk", "local-transcription"] },
      { id: "integrations", problem: "Data is moved between systems by hand, reports are compiled manually, and moving to another tool takes weeks.", automate: "Data exchange between Jira, GitHub, Google Sheets and Docs, Telegram and other systems; AI processing of texts inside processes.",
        scenarios: ["Bugs from Jira become a summary in Google Sheets without duplicate rows", "Almost 500 tasks were moved from Jira to GitHub Projects in about 4 hours", "Requests from the website automatically go to the right employee by email or in Telegram"], projectIds: ["jira-bug-summary", "jira-to-github-migration", "feedback-routing", "voice-bug-report"] },
      { id: "qa", problem: "Manual testing and checking answers do not scale, and bugs take long to describe and move between tools.", automate: "Running tests, checking the answers of AI bots, recording bugs and reporting.",
        scenarios: ["Automatic checking of Telegram bots with an evaluation of answers and a PASS or FAIL verdict", "Functional and security checks of an AI bot: prompt injections and attempts to bypass restrictions", "A voice bug report with a Jira task, and a bug summary for managers"], projectIds: ["qa-llm-lab", "telegram-bot-testing", "voice-bug-report", "jira-bug-summary"] },
      { id: "evaluation", problem: "Choosing a model and judging an AI solution by the impression of a few answers is unreliable.", automate: "Comparing models on the same tasks, evaluating answers by common criteria, checking a bot after changes.",
        scenarios: ["The same tasks for different local models: quality and speed in one table", "AI evaluation of answers by meaning-based criteria, with a score and an explanation", "Regular checks of a bot's behavior after changes to instructions, model or logic"], projectIds: ["auto-llm-benchmark", "qa-llm-lab", "telegram-bot-testing"] },
    ],
  },
  uk: {
    heading: "Що ми можемо автоматизувати",
    lead: "Оберіть напрям, найближчий до вашого процесу. За кожним стоять рішення, які ми створили.",
    labels: { problem: "Яке завдання розв’язує", automate: "Що можна автоматизувати", scenarios: "Приклади сценаріїв", examples: "Наші робочі рішення", discuss: "Обговорити задачу", details: "Докладніше" },
    items: [
      { id: "documents", problem: "Потрібно перетворити записи, відео й усні нотатки на читабельні, оформлені документи — без ручного розшифрування та набору.", automate: "Розшифрування аудіо й відео в текст, очищення та структурування тексту, оформлення статей і звітів у Google Docs.",
        scenarios: ["Лекції та інтерв’ю розшифровуються на власному комп’ютері й перетворюються на статтю в Google Docs", "Відео на YouTube стає читабельним текстом, який приходить у Telegram", "Голосова розповідь перетворюється на оформлений звіт"], projectIds: ["local-transcription", "youtube-to-text", "voice-bug-report"] },
      { id: "requests", problem: "Звернення надходять із сайту та месенджерів, їх розбирають вручну й пересилають потрібним людям.", automate: "Приймання звернень, визначення теми, передачу відповідальному співробітнику, сповіщення та історію листування.",
        scenarios: ["Форма на сайті: запитання про оплату — бухгалтеру, технічна проблема — до підтримки, загальне звернення — адміністратору", "AI-секретар у Telegram відповідає на типові запитання за базою знань і передає складні співробітнику", "Внутрішні заявки співробітників до IT-підтримки, HR та адміністративних служб"], projectIds: ["telegram-secretary", "feedback-routing"] },
      { id: "voice", problem: "Голосові повідомлення й записи доводиться слухати, розшифровувати та переносити в потрібні системи вручну.", automate: "Розпізнавання мовлення, пакетне розшифрування записів, перетворення голосу на текст, звіти й записи в календарі.",
        scenarios: ["Пакетне розшифрування лекцій та інтерв’ю на відеокарті, повністю офлайн", "Диктування повідомлення в Telegram і отримання охайного тексту", "Голосовий опис помилки перетворюється на баг-репорт і завдання в Jira"], projectIds: ["local-transcription", "ai-dictation", "voice-bug-report", "calendar-ai-chronos"] },
      { id: "assistants", problem: "Рутинні дії — планування, облік часу, обробка текстів — забирають час і потребують перемикання між застосунками.", automate: "Дії зі звичайного повідомлення в Telegram: події в календарі, облік часу, обробка й оформлення тексту, відповіді клієнтам.",
        scenarios: ["«Завтра з 9 до 10 — зустріч» стає подією в Google Calendar, а витрачений час — записом у таблиці обліку", "Посилання на YouTube-відео повертається читабельним текстом", "AI-секретар приймає звернення клієнтів цілодобово"], projectIds: ["calendar-ai-chronos", "youtube-to-text", "ai-dictation", "telegram-secretary"] },
      { id: "knowledge", problem: "Співробітники й клієнти ставлять одні й ті самі запитання, а відповіді розкидані по документах.", automate: "Відповіді за внутрішньою базою знань, пошук за власними документами, передачу складних запитань людині.",
        scenarios: ["Telegram-секретар відповідає на типові запитання за базою знань організації", "Створення сховищ документів і пошук за вибраною базою, перевірка відповідей за власними матеріалами", "Записи занять перетворюються на матеріали бази знань"], projectIds: ["telegram-secretary", "openai-api-desk", "local-transcription"] },
      { id: "integrations", problem: "Дані переносять між системами вручну, звіти збирають руками, а перехід на інший інструмент займає тижні.", automate: "Обмін даними між Jira, GitHub, Google Sheets і Docs, Telegram та іншими системами; AI-обробку текстів усередині процесів.",
        scenarios: ["Баги з Jira перетворюються на зведення в Google Sheets без повторних рядків", "Майже 500 завдань перенесено з Jira в GitHub Projects приблизно за 4 години", "Звернення з сайту автоматично йдуть потрібному співробітнику електронною поштою або в Telegram"], projectIds: ["jira-bug-summary", "jira-to-github-migration", "feedback-routing", "voice-bug-report"] },
      { id: "qa", problem: "Ручне тестування та звіряння відповідей не масштабуються, а баги довго описувати й переносити між інструментами.", automate: "Прогін тестів, перевірку відповідей AI-ботів, фіксацію багів і звітність.",
        scenarios: ["Автоматична перевірка Telegram-ботів з оцінкою відповідей і вердиктом PASS або FAIL", "Функціональні перевірки й перевірки безпеки AI-бота: промпт-ін’єкції та спроби обходу обмежень", "Голосовий баг-репорт із завданням у Jira та зведення багів для керівників"], projectIds: ["qa-llm-lab", "telegram-bot-testing", "voice-bug-report", "jira-bug-summary"] },
      { id: "evaluation", problem: "Вибір моделі та оцінка AI-рішення за враженням від кількох відповідей ненадійні.", automate: "Порівняння моделей на однакових завданнях, оцінку відповідей за єдиними критеріями, перевірку бота після змін.",
        scenarios: ["Однакові завдання для різних локальних моделей: якість і швидкість в одній таблиці", "AI-оцінка відповідей за смисловими критеріями з балом і поясненням", "Регулярна перевірка поведінки бота після зміни інструкцій, моделі чи логіки"], projectIds: ["auto-llm-benchmark", "qa-llm-lab", "telegram-bot-testing"] },
    ],
  },
};
