/** Copy for /solutions. Facts only from the spec; no prices, deadlines or promised integrations. */
import type { Localized } from "../types";

export interface SolutionsCopy {
  eyebrow: string; heading: string; lead: string;
  labels: { whenUseful: string; test: string; deliver: string; inputs: string; project: string; cta: string };
  directions: { id: "automation" | "documents" | "model-selection" | "evaluation"; projectId: string; whenUseful: string; test: string[]; deliver: string[]; inputs: string[] }[];
  formats: { heading: string; lead: string; items: { title: string; text: string; tag: string }[]; note: string };
  deliverables: { heading: string; lead: string; items: string[] };
  boundaries: { heading: string; lead: string; items: string[] };
  related: { heading: string; lead: string; ids: string[] };
  faq: { heading: string; items: { q: string; a: string }[] };
}

export const solutionsCopy: Localized<SolutionsCopy> = {
  en: {
    eyebrow: "Solutions",
    heading: "Solutions for a concrete process",
    lead: "Each direction starts with one task, a bounded prototype and a way to check the result. A valid outcome of the first assessment is that ordinary automation is enough and AI is not needed.",
    labels: { whenUseful: "When it is useful", test: "What we would test", deliver: "What the prototype can deliver", inputs: "What inputs and access are needed", project: "Relevant engineering project", cta: "Discuss a task" },
    directions: [
      { id: "automation", projectId: "jira-bug-summary",
        whenUseful: "A routine task moves between people and systems, follows fairly stable rules, and some steps involve text, speech or documents that ordinary rules handle poorly.",
        test: ["Which steps ordinary automation can cover without AI", "Where an AI step adds value and where it adds risk", "How the workflow behaves on normal, failing and edge-case inputs"],
        deliver: ["A bounded working scenario for one workflow", "A diagram of the steps and the systems involved", "Test examples and known limitations"],
        inputs: ["A description of the current process", "Example inputs, anonymized or synthetic where possible", "Agreed access to the systems involved, limited to the prototype"] },
      { id: "documents", projectId: "local-transcription",
        whenUseful: "People spend time reading, translating, summarizing or transcribing documents or recordings, and a draft for human review would help.",
        test: ["Whether a draft is good enough to review instead of writing from scratch", "How long or poorly structured inputs behave", "Which details a person must always check"],
        deliver: ["A working scenario for one document or audio type", "Draft outputs for human review", "A short report on the errors found and the limits"],
        inputs: ["Permitted sample documents or recordings", "What a correct result looks like", "Who reviews the draft"] },
      { id: "model-selection", projectId: "auto-llm-benchmark",
        whenUseful: "Several models could do the job and the choice depends on your data, hardware and requirements, including whether processing must stay local.",
        test: ["Candidate models on your own scenarios", "Speed, resource use and quality measured the same way for every model", "Whether a local model is good enough at all"],
        deliver: ["A comparison on agreed scenarios with documented conditions", "Model versions, runtime and hardware recorded", "A recommendation to continue, revise or stop"],
        inputs: ["Representative scenarios", "Hardware and hosting constraints", "Quality criteria and who judges them"] },
      { id: "evaluation", projectId: "qa-llm-lab",
        whenUseful: "An AI feature already exists or is planned, and you need to know how it behaves on ordinary requests, on mistakes and on hostile input before relying on it.",
        test: ["Functional behavior against defined cases", "Adversarial and prompt-injection style inputs", "What the results do and do not show"],
        deliver: ["A defined test suite", "An evaluation report with absolute counts and run conditions", "Known limitations and open questions"],
        inputs: ["Access to the system or a test copy", "Expected behavior and any policies", "Permission to run the tests"] },
    ],
    formats: {
      heading: "Engagement formats", lead: "Three stages. Each one is a separate decision.", note: "Cost and timing are determined after the scope is clarified. No prices or deadlines are quoted in advance.",
      items: [
        { tag: "1", title: "Task assessment", text: "A review of the task, the data and the constraints. The result is a written view on whether AI is needed, which approach to test first and what would count as success. “Ordinary automation is enough” is a valid result." },
        { tag: "2", title: "Verifiable prototype", text: "A bounded prototype for one task, tested on normal, failing and edge-case inputs, with measures agreed in advance and a report of what was found." },
        { tag: "3", title: "Pilot and integration", text: "Conditional on the prototype results. A separate decision with its own scope, access, error handling and responsibilities." },
      ],
    },
    deliverables: { heading: "Tangible deliverables", lead: "What you can expect to hold at the end of a prototype stage. The exact set is agreed per task.",
      items: ["Solution diagram", "Bounded working scenario", "Documented configuration", "Test examples", "Evaluation report", "Known limitations", "Recommendation to continue, revise or stop"] },
    boundaries: { heading: "Capability boundaries", lead: "What is not promised.",
      items: ["No integration with a particular CRM or other system is promised in advance.", "No support for arbitrary file types or formats.", "No autonomous agents acting without human review.", "No enterprise operations, support contracts or service levels.", "A prototype is not production-ready software.", "No guaranteed accuracy, savings or deadlines."] },
    related: { heading: "Related projects", lead: "Laboratory projects behind these directions. They are experiments and prototypes, not customer deployments.", ids: ["local-transcription", "voice-bug-report", "auto-llm-benchmark"] },
    faq: { heading: "Questions", items: [
      { q: "What if AI turns out to be unnecessary?", a: "Then the assessment says so. Ordinary automation, or no change at all, is a valid outcome." },
      { q: "Do you need access to our production systems?", a: "Not necessarily. A prototype can run on agreed samples, anonymized or synthetic where possible. Access to real systems is a separate, explicit decision." },
      { q: "What can I send in the first message?", a: "Describe the task in words. Do not send credentials, confidential documents or personal data of third parties in an initial message." },
    ] },
  },
  uk: {
    eyebrow: "Рішення",
    heading: "Рішення для конкретного процесу",
    lead: "Кожен напрям починається з однієї задачі, обмеженого прототипу та способу перевірити результат. Цілком можливий підсумок першої оцінки: звичайної автоматизації достатньо, і AI не потрібен.",
    labels: { whenUseful: "Коли це корисно", test: "Що ми перевірятимемо", deliver: "Що може дати прототип", inputs: "Які вхідні дані та доступи потрібні", project: "Відповідний інженерний проєкт", cta: "Обговорити задачу" },
    directions: [
      { id: "automation", projectId: "jira-bug-summary",
        whenUseful: "Рутинна задача переходить між людьми та системами, виконується за досить стабільними правилами, а деякі кроки стосуються тексту, мовлення чи документів, з якими звичайні правила справляються погано.",
        test: ["Які кроки може закрити звичайна автоматизація без AI", "Де крок з AI дає користь, а де додає ризик", "Як процес поводиться на звичайних, помилкових і крайніх вхідних даних"],
        deliver: ["Обмежений робочий сценарій для одного процесу", "Схема кроків і задіяних систем", "Приклади тестів і відомі обмеження"],
        inputs: ["Опис поточного процесу", "Приклади вхідних даних, за можливості знеособлені або синтетичні", "Узгоджений доступ до задіяних систем, обмежений прототипом"] },
      { id: "documents", projectId: "local-transcription",
        whenUseful: "Люди витрачають час на читання, переклад, стислий виклад чи транскрибування документів або записів, і допоміг би чернетка для перевірки людиною.",
        test: ["Чи достатньо якісна чернетка, щоб перевіряти її, а не писати з нуля", "Як поводяться довгі чи погано структуровані вхідні дані", "Які деталі людина має перевіряти завжди"],
        deliver: ["Робочий сценарій для одного типу документів чи аудіо", "Чернеткові результати для перевірки людиною", "Короткий звіт про знайдені помилки та межі"],
        inputs: ["Дозволені зразки документів або записів", "Як виглядає правильний результат", "Хто перевіряє чернетку"] },
      { id: "model-selection", projectId: "auto-llm-benchmark",
        whenUseful: "Завдання можуть виконати кілька моделей, а вибір залежить від ваших даних, обладнання та вимог, зокрема від того, чи має обробка залишатися локальною.",
        test: ["Моделі-кандидати на ваших власних сценаріях", "Швидкість, використання ресурсів і якість, виміряні однаково для кожної моделі", "Чи достатньо локальної моделі взагалі"],
        deliver: ["Порівняння на узгоджених сценаріях із задокументованими умовами", "Зафіксовані версії моделей, середовище виконання та обладнання", "Рекомендація: продовжити, переглянути чи зупинитися"],
        inputs: ["Репрезентативні сценарії", "Обмеження щодо обладнання та розміщення", "Критерії якості та хто їх оцінює"] },
      { id: "evaluation", projectId: "qa-llm-lab",
        whenUseful: "AI-функція вже є або плануються, і потрібно знати, як вона поводиться на звичайних запитах, на помилках і на ворожих вхідних даних, перш ніж на неї покладатися.",
        test: ["Функціональну поведінку на визначених випадках", "Змагальні вхідні дані та спроби prompt injection", "Що результати показують, а що ні"],
        deliver: ["Визначений набір тестів", "Звіт про оцінювання з абсолютними числами та умовами запуску", "Відомі обмеження та відкриті питання"],
        inputs: ["Доступ до системи чи її тестової копії", "Очікувана поведінка та будь-які політики", "Дозвіл на запуск тестів"] },
    ],
    formats: {
      heading: "Формати співпраці", lead: "Три етапи. Кожен — окреме рішення.", note: "Вартість і строки визначаються після уточнення обсягу. Ціни та дедлайни наперед не називаються.",
      items: [
        { tag: "1", title: "Оцінка задачі", text: "Розгляд задачі, даних і обмежень. Результат — письмова думка про те, чи потрібен AI, який підхід перевіряти першим і що вважатиметься успіхом. «Достатньо звичайної автоматизації» — повноцінний результат." },
        { tag: "2", title: "Перевірюваний прототип", text: "Обмежений прототип для однієї задачі, перевірений на звичайних, помилкових і крайніх вхідних даних, із заздалегідь узгодженими показниками та звітом про знайдене." },
        { tag: "3", title: "Пілот та інтеграція", text: "Залежить від результатів прототипу. Окреме рішення з власним обсягом, доступами, обробкою помилок і відповідальністю." },
      ],
    },
    deliverables: { heading: "Відчутні результати", lead: "Що ви можете мати на руках після етапу прототипу. Точний набір узгоджується для кожної задачі.",
      items: ["Схема рішення", "Обмежений робочий сценарій", "Задокументована конфігурація", "Приклади тестів", "Звіт про оцінювання", "Відомі обмеження", "Рекомендація: продовжити, переглянути чи зупинитися"] },
    boundaries: { heading: "Межі можливостей", lead: "Чого не обіцяється.",
      items: ["Інтеграція з конкретною CRM чи іншою системою наперед не обіцяється.", "Підтримка довільних типів і форматів файлів не обіцяється.", "Жодних автономних агентів, що діють без перевірки людиною.", "Жодних корпоративних операцій, договорів підтримки чи рівнів сервісу.", "Прототип — це не готове до експлуатації програмне забезпечення.", "Жодних гарантій точності, економії чи строків."] },
    related: { heading: "Пов’язані проєкти", lead: "Лабораторні проєкти за цими напрямами. Це експерименти й прототипи, а не впровадження для клієнтів.", ids: ["local-transcription", "voice-bug-report", "auto-llm-benchmark"] },
    faq: { heading: "Питання", items: [
      { q: "А якщо AI виявиться непотрібним?", a: "Тоді оцінка так і скаже. Звичайна автоматизація або відсутність змін — повноцінний результат." },
      { q: "Чи потрібен доступ до наших робочих систем?", a: "Не обов’язково. Прототип може працювати на узгоджених зразках, за можливості знеособлених або синтетичних. Доступ до реальних систем — окреме, явне рішення." },
      { q: "Що можна надіслати в першому повідомленні?", a: "Опишіть задачу словами. Не надсилайте в першому повідомленні облікові дані, конфіденційні документи чи персональні дані третіх осіб." },
    ] },
  },
  ru: {
    eyebrow: "Решения",
    heading: "Решения для конкретного процесса",
    lead: "Каждое направление начинается с одной задачи, ограниченного прототипа и способа проверить результат. Вполне допустимый итог первой оценки: обычной автоматизации достаточно, и AI не нужен.",
    labels: { whenUseful: "Когда это полезно", test: "Что мы будем проверять", deliver: "Что может дать прототип", inputs: "Какие входные данные и доступы нужны", project: "Соответствующий инженерный проект", cta: "Обсудить задачу" },
    directions: [
      { id: "automation", projectId: "jira-bug-summary",
        whenUseful: "Рутинная задача переходит между людьми и системами, выполняется по довольно стабильным правилам, а некоторые шаги связаны с текстом, речью или документами, с которыми обычные правила справляются плохо.",
        test: ["Какие шаги может закрыть обычная автоматизация без AI", "Где шаг с AI даёт пользу, а где добавляет риск", "Как процесс ведёт себя на обычных, ошибочных и граничных входных данных"],
        deliver: ["Ограниченный рабочий сценарий для одного процесса", "Схема шагов и задействованных систем", "Примеры тестов и известные ограничения"],
        inputs: ["Описание текущего процесса", "Примеры входных данных, по возможности обезличенные или синтетические", "Согласованный доступ к задействованным системам, ограниченный прототипом"] },
      { id: "documents", projectId: "local-transcription",
        whenUseful: "Люди тратят время на чтение, перевод, краткое изложение или расшифровку документов либо записей, и помог бы черновик для проверки человеком.",
        test: ["Достаточно ли хорош черновик, чтобы проверять его, а не писать с нуля", "Как ведут себя длинные или плохо структурированные входные данные", "Какие детали человек должен проверять всегда"],
        deliver: ["Рабочий сценарий для одного типа документов или аудио", "Черновые результаты для проверки человеком", "Короткий отчёт о найденных ошибках и границах"],
        inputs: ["Разрешённые образцы документов или записей", "Как выглядит правильный результат", "Кто проверяет черновик"] },
      { id: "model-selection", projectId: "auto-llm-benchmark",
        whenUseful: "Задачу могут выполнить несколько моделей, а выбор зависит от ваших данных, оборудования и требований, в том числе от того, должна ли обработка оставаться локальной.",
        test: ["Модели-кандидаты на ваших собственных сценариях", "Скорость, использование ресурсов и качество, измеренные одинаково для каждой модели", "Достаточно ли локальной модели вообще"],
        deliver: ["Сравнение на согласованных сценариях с задокументированными условиями", "Зафиксированные версии моделей, среда выполнения и оборудование", "Рекомендация: продолжить, пересмотреть или остановиться"],
        inputs: ["Репрезентативные сценарии", "Ограничения по оборудованию и размещению", "Критерии качества и кто их оценивает"] },
      { id: "evaluation", projectId: "qa-llm-lab",
        whenUseful: "AI-функция уже есть или планируется, и нужно знать, как она ведёт себя на обычных запросах, на ошибках и на враждебных входных данных, прежде чем на неё полагаться.",
        test: ["Функциональное поведение на определённых случаях", "Состязательные входные данные и попытки prompt injection", "Что результаты показывают, а что нет"],
        deliver: ["Определённый набор тестов", "Отчёт об оценке с абсолютными числами и условиями запуска", "Известные ограничения и открытые вопросы"],
        inputs: ["Доступ к системе или её тестовой копии", "Ожидаемое поведение и любые политики", "Разрешение на запуск тестов"] },
    ],
    formats: {
      heading: "Форматы работы", lead: "Три этапа. Каждый — отдельное решение.", note: "Стоимость и сроки определяются после уточнения объёма. Цены и дедлайны заранее не называются.",
      items: [
        { tag: "1", title: "Оценка задачи", text: "Разбор задачи, данных и ограничений. Результат — письменное мнение о том, нужен ли AI, какой подход проверять первым и что считать успехом. «Достаточно обычной автоматизации» — полноценный результат." },
        { tag: "2", title: "Проверяемый прототип", text: "Ограниченный прототип для одной задачи, проверенный на обычных, ошибочных и граничных входных данных, с заранее согласованными показателями и отчётом о найденном." },
        { tag: "3", title: "Пилот и интеграция", text: "Зависит от результатов прототипа. Отдельное решение со своим объёмом, доступами, обработкой ошибок и ответственностью." },
      ],
    },
    deliverables: { heading: "Осязаемые результаты", lead: "Что вы можете получить на руки после этапа прототипа. Точный набор согласуется для каждой задачи.",
      items: ["Схема решения", "Ограниченный рабочий сценарий", "Задокументированная конфигурация", "Примеры тестов", "Отчёт об оценке", "Известные ограничения", "Рекомендация: продолжить, пересмотреть или остановиться"] },
    boundaries: { heading: "Границы возможностей", lead: "Чего не обещается.",
      items: ["Интеграция с конкретной CRM или другой системой заранее не обещается.", "Поддержка произвольных типов и форматов файлов не обещается.", "Никаких автономных агентов, действующих без проверки человеком.", "Никаких корпоративных операций, договоров поддержки или уровней сервиса.", "Прототип — это не готовое к эксплуатации программное обеспечение.", "Никаких гарантий точности, экономии или сроков."] },
    related: { heading: "Связанные проекты", lead: "Лабораторные проекты по этим направлениям. Это эксперименты и прототипы, а не внедрения для клиентов.", ids: ["local-transcription", "voice-bug-report", "auto-llm-benchmark"] },
    faq: { heading: "Вопросы", items: [
      { q: "А если AI окажется ненужным?", a: "Тогда оценка так и скажет. Обычная автоматизация или отсутствие изменений — полноценный результат." },
      { q: "Нужен ли доступ к нашим рабочим системам?", a: "Не обязательно. Прототип может работать на согласованных образцах, по возможности обезличенных или синтетических. Доступ к реальным системам — отдельное, явное решение." },
      { q: "Что можно отправить в первом сообщении?", a: "Опишите задачу словами. Не отправляйте в первом сообщении учётные данные, конфиденциальные документы или персональные данные третьих лиц." },
    ] },
  },
};
