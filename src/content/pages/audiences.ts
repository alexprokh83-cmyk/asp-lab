/** Copy for /business, /education, /public-sector. Possible applications only; measures are "what we would measure". */
import type { Localized } from "../types";

export type AudienceId = "business" | "education" | "publicSector";
export interface AudienceCopy {
  scenarios: { title: string; text: string; examples: string[] }[];
  measures: string[];
  pilot: string[];
  constraints: string[];
  capabilityIds: string[];
  projectIds: string[];
}
export interface AudiencesCopy {
  labels: { disclosure: string; scenarios: string; measure: string; measureNote: string; pilot: string; constraints: string; current: string; currentNote: string; developing: string; developingNote: string; projects: string; deliverables: string };
  deliverables: string[];
  pages: Record<AudienceId, AudienceCopy>;
}

export const audiencesCopy: Localized<AudiencesCopy> = {
  en: {
    labels: { disclosure: "Possible areas of application in these organizations.", scenarios: "Scenario groups", measure: "What we would measure", measureNote: "Suggested measures for the first stage.", pilot: "First-pilot requirements", constraints: "Constraints", current: "Applicable current capabilities", currentNote: "Confirmed by our projects.", developing: "Developing directions", developingNote: "Directions under development.", projects: "Relevant engineering projects", deliverables: "First-stage deliverables" },
    deliverables: ["Solution diagram", "A bounded working scenario", "Test examples", "A report with known limitations", "A recommendation to continue, revise or stop"],
    pages: {
      business: {
        scenarios: [
          { title: "Document processing and routing", text: "Incoming documents are read, sorted or summarized as drafts that a person checks.", examples: ["Sorting incoming documents by type", "Short draft summaries for human review", "Extracting fields into a form for checking"] },
          { title: "Workflow automation and integration with existing systems", text: "Routine steps move data between tools; AI is used only where fixed rules are not enough.", examples: ["Moving data between systems by a fixed rule", "Preparing reporting data from a task tracker", "Deciding which steps need AI at all"] },
          { title: "Voice-to-task preparation", text: "A spoken description becomes a structured task draft, confirmed by a person before anything is created.", examples: ["Turning a voice note into a structured draft", "A person confirms before creation", "The destination system is agreed per project"] },
        ],
        measures: ["Processing time", "Completeness", "Correctness", "Manual corrections", "Employee acceptance of drafts"],
        pilot: ["One process with a named owner", "Sample inputs that may be used", "Success measures and a baseline agreed in advance", "Limited, agreed access to the systems involved", "A person who reviews the outputs"],
        constraints: ["Start with a process where errors are cheap to catch.", "Do not send credentials or third-party personal data in an initial message."],
        capabilityIds: ["workflow-automation", "document-processing", "ai-evaluation"],
        projectIds: ["voice-bug-report", "jira-bug-summary"],
      },
      education: {
        scenarios: [
          { title: "Transforming or translating permitted educational and administrative materials", text: "Materials the institution is allowed to process are transformed or translated into drafts that staff review.", examples: ["Translating permitted course materials", "Reformatting administrative documents", "Long documents with structure to preserve"] },
          { title: "Transcribing lectures or meetings for human review", text: "Recordings are transcribed locally, and a person reviews the text.", examples: ["Lecture recordings transcribed for review", "Meeting recordings transcribed for review", "Staff correct the transcript before use"] },
          { title: "Internal knowledge assistance", text: "A developing RAG direction: answering staff questions from the institution’s own documents. It is not an available service.", examples: ["Staff questions answered from internal documents", "Sources shown so answers can be checked", "Developing direction, not a service"] },
        ],
        measures: ["Time to a reviewed draft", "Number of manual corrections", "Completeness against a reference sample", "Staff acceptance of drafts"],
        pilot: ["Materials that are permitted to be processed", "Anonymized or synthetic data for the first stage where possible", "Staff who review every output", "A defined, limited set of documents or recordings"],
        constraints: ["Staff review is required.", "No claims of automated student assessment.", "No collection of information about children through this website.", "Do not send student data in an initial message."],
        capabilityIds: ["document-processing", "local-transcription", "ai-evaluation"],
        projectIds: ["local-transcription", "youtube-to-text"],
      },
      publicSector: {
        scenarios: [
          { title: "Preliminary document triage and draft summaries", text: "Documents are sorted and summarized as drafts; a responsible employee decides.", examples: ["Preliminary sorting of documents", "Draft summaries for an employee to check", "Employees remain responsible for decisions"] },
          { title: "Processing text collections", text: "Larger sets of texts are processed in a bounded way to find patterns or prepare drafts.", examples: ["Grouping similar texts", "Preparing draft overviews", "Checking results on a sample first"] },
          { title: "Internal knowledge assistance", text: "A developing RAG direction for questions about internal documents. It is not an available service.", examples: ["Questions answered from internal documents", "Sources shown for checking", "Developing direction, not a service"] },
        ],
        measures: ["Time to a reviewed draft", "Completeness of summaries against a sample", "Correctness found on review", "Manual corrections", "Employee acceptance of drafts"],
        pilot: ["Define which data is permitted", "Identify where processing happens", "Agree access", "Preserve employee responsibility", "Plan error handling and logging", "Start with a noncritical process"],
        constraints: ["Nothing here implies procurement eligibility, legal compliance, certification or completed institutional deployments.", "Employee responsibility for decisions is preserved."],
        capabilityIds: ["document-processing", "local-llm-experiments", "model-comparison"],
        projectIds: ["telegram-secretary", "feedback-routing"],
      },
    },
  },
  uk: {
    labels: { disclosure: "Можливі сфери застосування в цих організаціях.", scenarios: "Групи сценаріїв", measure: "Що ми вимірювали б", measureNote: "Запропоновані показники для першого етапу.", pilot: "Вимоги до першого пілоту", constraints: "Обмеження", current: "Застосовні поточні можливості", currentNote: "Підтверджено нашими проєктами.", developing: "Напрями, що розвиваються", developingNote: "Напрями в розробці.", projects: "Відповідні інженерні проєкти", deliverables: "Результати першого етапу" },
    deliverables: ["Схема рішення", "Обмежений робочий сценарій", "Приклади тестів", "Звіт із відомими обмеженнями", "Рекомендація: продовжити, переглянути чи зупинитися"],
    pages: {
      business: {
        scenarios: [
          { title: "Обробка та маршрутизація документів", text: "Вхідні документи читаються, сортуються чи стисло викладаються як чернетки, які перевіряє людина.", examples: ["Сортування вхідних документів за типом", "Короткі чернеткові резюме для перевірки людиною", "Вилучення полів у форму для перевірки"] },
          { title: "Автоматизація процесів та інтеграція з наявними системами", text: "Рутинні кроки переносять дані між інструментами; AI застосовується лише там, де фіксованих правил недостатньо.", examples: ["Перенесення даних між системами за фіксованим правилом", "Підготовка даних для звітності з трекера завдань", "Визначення, які кроки взагалі потребують AI"] },
          { title: "Підготовка завдань із голосу", text: "Усний опис стає структурованою чернеткою завдання, яку підтверджує людина, перш ніж щось буде створено.", examples: ["Перетворення голосової нотатки на структуровану чернетку", "Людина підтверджує перед створенням", "Цільова система узгоджується для кожного проєкту"] },
        ],
        measures: ["Час обробки", "Повнота", "Правильність", "Ручні виправлення", "Прийняття чернеток працівниками"],
        pilot: ["Один процес із визначеним власником", "Зразки вхідних даних, які можна використовувати", "Показники успіху та базова лінія, узгоджені заздалегідь", "Обмежений узгоджений доступ до задіяних систем", "Людина, що перевіряє результати"],
        constraints: ["Починайте з процесу, де помилки дешево виявити.", "Не надсилайте в першому повідомленні облікові дані чи персональні дані третіх осіб."],
        capabilityIds: ["workflow-automation", "document-processing", "ai-evaluation"],
        projectIds: ["voice-bug-report", "jira-bug-summary"],
      },
      education: {
        scenarios: [
          { title: "Перетворення чи переклад дозволених навчальних та адміністративних матеріалів", text: "Матеріали, які установі дозволено обробляти, перетворюються чи перекладаються на чернетки, що перевіряє персонал.", examples: ["Переклад дозволених навчальних матеріалів", "Переформатування адміністративних документів", "Довгі документи зі структурою, яку треба зберегти"] },
          { title: "Транскрибування лекцій чи нарад для перевірки людиною", text: "Записи транскрибуються локально, а текст перевіряє людина.", examples: ["Записи лекцій для перевірки", "Записи нарад для перевірки", "Персонал виправляє транскрипт перед використанням"] },
          { title: "Допомога з внутрішніми знаннями", text: "Напрям RAG, що розвивається: відповіді на запитання персоналу з власних документів установи. Це не доступна послуга.", examples: ["Відповіді на запитання персоналу з внутрішніх документів", "Джерела показуються, щоб відповіді можна було перевірити", "Напрям розвитку, а не послуга"] },
        ],
        measures: ["Час до перевіреної чернетки", "Кількість ручних виправлень", "Повнота відносно еталонної вибірки", "Прийняття чернеток персоналом"],
        pilot: ["Матеріали, які дозволено обробляти", "За можливості знеособлені або синтетичні дані для першого етапу", "Персонал, що перевіряє кожен результат", "Визначений обмежений набір документів чи записів"],
        constraints: ["Перевірка персоналом обов’язкова.", "Жодних тверджень про автоматизоване оцінювання учнів.", "Жодного збору інформації про дітей через цей сайт.", "Не надсилайте дані учнів у першому повідомленні."],
        capabilityIds: ["document-processing", "local-transcription", "ai-evaluation"],
        projectIds: ["local-transcription", "youtube-to-text"],
      },
      publicSector: {
        scenarios: [
          { title: "Попереднє сортування документів і чернетки резюме", text: "Документи сортуються й стисло викладаються як чернетки; рішення ухвалює відповідальний працівник.", examples: ["Попереднє сортування документів", "Чернеткові резюме для перевірки працівником", "За рішення відповідають працівники"] },
          { title: "Обробка масивів текстів", text: "Великі набори текстів обробляються в обмежений спосіб, щоб знайти закономірності чи підготувати чернетки.", examples: ["Групування схожих текстів", "Підготовка чернеткових оглядів", "Спершу перевірка результатів на вибірці"] },
          { title: "Допомога з внутрішніми знаннями", text: "Напрям RAG, що розвивається, для запитань про внутрішні документи. Це не доступна послуга.", examples: ["Відповіді на запитання з внутрішніх документів", "Джерела показуються для перевірки", "Напрям розвитку, а не послуга"] },
        ],
        measures: ["Час до перевіреної чернетки", "Повнота резюме відносно вибірки", "Правильність, виявлена під час перевірки", "Ручні виправлення", "Прийняття чернеток працівниками"],
        pilot: ["Визначити, які дані дозволені", "З’ясувати, де відбувається обробка", "Узгодити доступ", "Зберегти відповідальність працівників", "Спланувати обробку помилок і журналювання", "Почати з некритичного процесу"],
        constraints: ["Ніщо тут не означає права на участь у закупівлях, відповідності законодавству, сертифікації чи завершених впроваджень в установах.", "Відповідальність працівників за рішення зберігається."],
        capabilityIds: ["document-processing", "local-llm-experiments", "model-comparison"],
        projectIds: ["telegram-secretary", "feedback-routing"],
      },
    },
  },
  ru: {
    labels: { disclosure: "Возможные сферы применения в этих организациях.", scenarios: "Группы сценариев", measure: "Что мы бы измеряли", measureNote: "Предлагаемые показатели для первого этапа.", pilot: "Требования к первому пилоту", constraints: "Ограничения", current: "Применимые текущие возможности", currentNote: "Подтверждено нашими проектами.", developing: "Развивающиеся направления", developingNote: "Направления в разработке.", projects: "Соответствующие инженерные проекты", deliverables: "Результаты первого этапа" },
    deliverables: ["Схема решения", "Ограниченный рабочий сценарий", "Примеры тестов", "Отчёт с известными ограничениями", "Рекомендация: продолжить, пересмотреть или остановиться"],
    pages: {
      business: {
        scenarios: [
          { title: "Обработка и маршрутизация документов", text: "Входящие документы читаются, сортируются или кратко излагаются как черновики, которые проверяет человек.", examples: ["Сортировка входящих документов по типу", "Краткие черновые резюме для проверки человеком", "Извлечение полей в форму для проверки"] },
          { title: "Автоматизация процессов и интеграция с существующими системами", text: "Рутинные шаги переносят данные между инструментами; AI применяется только там, где фиксированных правил недостаточно.", examples: ["Перенос данных между системами по фиксированному правилу", "Подготовка данных для отчётности из трекера задач", "Определение, какие шаги вообще требуют AI"] },
          { title: "Подготовка задач из голоса", text: "Устное описание становится структурированным черновиком задачи, который подтверждает человек, прежде чем что-либо будет создано.", examples: ["Превращение голосовой заметки в структурированный черновик", "Человек подтверждает перед созданием", "Целевая система согласуется для каждого проекта"] },
        ],
        measures: ["Время обработки", "Полнота", "Правильность", "Ручные исправления", "Принятие черновиков сотрудниками"],
        pilot: ["Один процесс с назначенным владельцем", "Образцы входных данных, которые можно использовать", "Показатели успеха и базовая линия, согласованные заранее", "Ограниченный согласованный доступ к задействованным системам", "Человек, проверяющий результаты"],
        constraints: ["Начинайте с процесса, где ошибки дёшево обнаружить.", "Не отправляйте в первом сообщении учётные данные или персональные данные третьих лиц."],
        capabilityIds: ["workflow-automation", "document-processing", "ai-evaluation"],
        projectIds: ["voice-bug-report", "jira-bug-summary"],
      },
      education: {
        scenarios: [
          { title: "Преобразование или перевод разрешённых учебных и административных материалов", text: "Материалы, которые учреждению разрешено обрабатывать, преобразуются или переводятся в черновики, которые проверяет персонал.", examples: ["Перевод разрешённых учебных материалов", "Переформатирование административных документов", "Длинные документы со структурой, которую нужно сохранить"] },
          { title: "Расшифровка лекций или встреч для проверки человеком", text: "Записи расшифровываются локально, а текст проверяет человек.", examples: ["Записи лекций для проверки", "Записи встреч для проверки", "Персонал исправляет транскрипт перед использованием"] },
          { title: "Помощь с внутренними знаниями", text: "Развивающееся направление RAG: ответы на вопросы персонала по собственным документам учреждения. Это не доступная услуга.", examples: ["Ответы на вопросы персонала по внутренним документам", "Источники показываются, чтобы ответы можно было проверить", "Направление развития, а не услуга"] },
        ],
        measures: ["Время до проверенного черновика", "Количество ручных исправлений", "Полнота относительно эталонной выборки", "Принятие черновиков персоналом"],
        pilot: ["Материалы, которые разрешено обрабатывать", "По возможности обезличенные или синтетические данные для первого этапа", "Персонал, проверяющий каждый результат", "Определённый ограниченный набор документов или записей"],
        constraints: ["Проверка персоналом обязательна.", "Никаких утверждений об автоматизированной оценке учащихся.", "Никакого сбора информации о детях через этот сайт.", "Не отправляйте данные учащихся в первом сообщении."],
        capabilityIds: ["document-processing", "local-transcription", "ai-evaluation"],
        projectIds: ["local-transcription", "youtube-to-text"],
      },
      publicSector: {
        scenarios: [
          { title: "Предварительная сортировка документов и черновые резюме", text: "Документы сортируются и кратко излагаются как черновики; решение принимает ответственный сотрудник.", examples: ["Предварительная сортировка документов", "Черновые резюме для проверки сотрудником", "За решения отвечают сотрудники"] },
          { title: "Обработка массивов текстов", text: "Большие наборы текстов обрабатываются ограниченным образом, чтобы найти закономерности или подготовить черновики.", examples: ["Группировка похожих текстов", "Подготовка черновых обзоров", "Сначала проверка результатов на выборке"] },
          { title: "Помощь с внутренними знаниями", text: "Развивающееся направление RAG для вопросов по внутренним документам. Это не доступная услуга.", examples: ["Ответы на вопросы по внутренним документам", "Источники показываются для проверки", "Направление развития, а не услуга"] },
        ],
        measures: ["Время до проверенного черновика", "Полнота резюме относительно выборки", "Правильность, выявленная при проверке", "Ручные исправления", "Принятие черновиков сотрудниками"],
        pilot: ["Определить, какие данные разрешены", "Выяснить, где происходит обработка", "Согласовать доступ", "Сохранить ответственность сотрудников", "Спланировать обработку ошибок и журналирование", "Начать с некритичного процесса"],
        constraints: ["Ничто здесь не означает права на участие в закупках, соответствия законодательству, сертификации или завершённых внедрений в учреждениях.", "Ответственность сотрудников за решения сохраняется."],
        capabilityIds: ["document-processing", "local-llm-experiments", "model-comparison"],
        projectIds: ["telegram-secretary", "feedback-routing"],
      },
    },
  },
};
