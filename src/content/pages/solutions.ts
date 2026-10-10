/** Copy for /solutions. Facts only from the spec; no prices, deadlines or promised integrations. */
import type { Localized } from "../types";

export interface SolutionsCopy {
  heading: string; lead: string;
  formats: { heading: string; lead: string; items: { title: string; text: string; tag: string }[]; note: string };
  deliverables: { heading: string; lead: string; items: string[] };
  boundaries: { heading: string; lead: string; items: string[] };
  faq: { heading: string; items: { q: string; a: string }[] };
}

export const solutionsCopy: Localized<SolutionsCopy> = {
  en: {
    heading: "Solutions for a concrete process",
    lead: "Each direction starts with one task, a bounded prototype and a way to check the result. A valid outcome of the first assessment is that ordinary automation is enough and AI is not needed.",
      formats: {
      heading: "Engagement formats", lead: "Three stages. Each one is a separate decision.", note: "Cost and timing are determined after the scope is clarified. No prices or deadlines are quoted in advance.",
      items: [
        { tag: "1", title: "Task assessment", text: "A review of the task, the data and the constraints. The result is a written view on whether AI is needed, which approach to test first and what would count as success. “Ordinary automation is enough” is a valid result." },
        { tag: "2", title: "Working solution", text: "A working solution for one task, tested on normal, failing and edge-case inputs, with measures agreed in advance and a report of what was found." },
        { tag: "3", title: "Pilot and integration", text: "Conditional on the results of the working solution. A separate decision with its own scope, access, error handling and responsibilities." },
      ],
    },
    deliverables: { heading: "Tangible deliverables", lead: "What you can expect to hold at the end of the first stage. The exact set is agreed per task.",
      items: ["Solution diagram", "Bounded working scenario", "Documented configuration", "Test examples", "Evaluation report", "Known limitations", "Recommendation to continue, revise or stop"] },
    boundaries: { heading: "Capability boundaries", lead: "What is not promised.",
      items: ["No integration with a particular CRM or other system is promised in advance.", "No support for arbitrary file types or formats.", "No autonomous agents acting without human review.", "No enterprise operations, support contracts or service levels.", "No guaranteed accuracy, savings or deadlines."] },
    faq: { heading: "Questions", items: [
      { q: "What if AI turns out to be unnecessary?", a: "Then the assessment says so. Ordinary automation, or no change at all, is a valid outcome." },
      { q: "Do you need access to our production systems?", a: "Not necessarily. A working version can run on agreed samples, anonymized or synthetic where possible. Access to real systems is a separate, explicit decision." },
      { q: "What can I send in the first message?", a: "Describe the task in words. Do not send credentials, confidential documents or personal data of third parties in an initial message." },
    ] },
  },
  uk: {
    heading: "Рішення для конкретного процесу",
    lead: "Кожен напрям починається з однієї задачі, обмеженого прототипу та способу перевірити результат. Цілком можливий підсумок першої оцінки: звичайної автоматизації достатньо, і AI не потрібен.",
      formats: {
      heading: "Формати співпраці", lead: "Три етапи. Кожен — окреме рішення.", note: "Вартість і строки визначаються після уточнення обсягу. Ціни та дедлайни наперед не називаються.",
      items: [
        { tag: "1", title: "Оцінка задачі", text: "Розгляд задачі, даних і обмежень. Результат — письмова думка про те, чи потрібен AI, який підхід перевіряти першим і що вважатиметься успіхом. «Достатньо звичайної автоматизації» — повноцінний результат." },
        { tag: "2", title: "Робоче рішення", text: "Робоче рішення для однієї задачі, перевірене на звичайних, помилкових і крайніх вхідних даних, із заздалегідь узгодженими показниками та звітом про знайдене." },
        { tag: "3", title: "Пілот та інтеграція", text: "Залежить від результатів робочого рішення. Окреме рішення з власним обсягом, доступами, обробкою помилок і відповідальністю." },
      ],
    },
    deliverables: { heading: "Відчутні результати", lead: "Що ви можете мати на руках після першого етапу. Точний набір узгоджується для кожної задачі.",
      items: ["Схема рішення", "Обмежений робочий сценарій", "Задокументована конфігурація", "Приклади тестів", "Звіт про оцінювання", "Відомі обмеження", "Рекомендація: продовжити, переглянути чи зупинитися"] },
    boundaries: { heading: "Межі можливостей", lead: "Чого не обіцяється.",
      items: ["Інтеграція з конкретною CRM чи іншою системою наперед не обіцяється.", "Підтримка довільних типів і форматів файлів не обіцяється.", "Жодних автономних агентів, що діють без перевірки людиною.", "Жодних корпоративних операцій, договорів підтримки чи рівнів сервісу.", "Жодних гарантій точності, економії чи строків."] },
    faq: { heading: "Питання", items: [
      { q: "А якщо AI виявиться непотрібним?", a: "Тоді оцінка так і скаже. Звичайна автоматизація або відсутність змін — повноцінний результат." },
      { q: "Чи потрібен доступ до наших робочих систем?", a: "Не обов’язково. Робоча версія може працювати на узгоджених зразках, за можливості знеособлених або синтетичних. Доступ до реальних систем — окреме, явне рішення." },
      { q: "Що можна надіслати в першому повідомленні?", a: "Опишіть задачу словами. Не надсилайте в першому повідомленні облікові дані, конфіденційні документи чи персональні дані третіх осіб." },
    ] },
  },
  ru: {
    heading: "Решения для конкретного процесса",
    lead: "Каждое направление начинается с одной задачи, ограниченного прототипа и способа проверить результат. Вполне допустимый итог первой оценки: обычной автоматизации достаточно, и AI не нужен.",
      formats: {
      heading: "Форматы работы", lead: "Три этапа. Каждый — отдельное решение.", note: "Стоимость и сроки определяются после уточнения объёма. Цены и дедлайны заранее не называются.",
      items: [
        { tag: "1", title: "Оценка задачи", text: "Разбор задачи, данных и ограничений. Результат — письменное мнение о том, нужен ли AI, какой подход проверять первым и что считать успехом. «Достаточно обычной автоматизации» — полноценный результат." },
        { tag: "2", title: "Рабочее решение", text: "Рабочее решение для одной задачи, проверенное на обычных, ошибочных и граничных входных данных, с заранее согласованными показателями и отчётом о найденном." },
        { tag: "3", title: "Пилот и интеграция", text: "Зависит от результатов рабочего решения. Отдельное решение со своим объёмом, доступами, обработкой ошибок и ответственностью." },
      ],
    },
    deliverables: { heading: "Осязаемые результаты", lead: "Что вы можете получить на руки после первого этапа. Точный набор согласуется для каждой задачи.",
      items: ["Схема решения", "Ограниченный рабочий сценарий", "Задокументированная конфигурация", "Примеры тестов", "Отчёт об оценке", "Известные ограничения", "Рекомендация: продолжить, пересмотреть или остановиться"] },
    boundaries: { heading: "Границы возможностей", lead: "Чего не обещается.",
      items: ["Интеграция с конкретной CRM или другой системой заранее не обещается.", "Поддержка произвольных типов и форматов файлов не обещается.", "Никаких автономных агентов, действующих без проверки человеком.", "Никаких корпоративных операций, договоров поддержки или уровней сервиса.", "Никаких гарантий точности, экономии или сроков."] },
    faq: { heading: "Вопросы", items: [
      { q: "А если AI окажется ненужным?", a: "Тогда оценка так и скажет. Обычная автоматизация или отсутствие изменений — полноценный результат." },
      { q: "Нужен ли доступ к нашим рабочим системам?", a: "Не обязательно. Рабочая версия может работать на согласованных образцах, по возможности обезличенных или синтетических. Доступ к реальным системам — отдельное, явное решение." },
      { q: "Что можно отправить в первом сообщении?", a: "Опишите задачу словами. Не отправляйте в первом сообщении учётные данные, конфиденциальные документы или персональные данные третьих лиц." },
    ] },
  },
};
