import { L } from "../types";
import { REPO, type CaseData } from "./types";

export const jiraReporting: CaseData = {
  sourceRepository: REPO("jira-to-google-sheets-n8n-auto"),
  dates: { experiment: null, contentUpdated: null },
  architecture: { edges: [["jira", "n8n"], ["n8n", "ai"], ["ai", "sheets"]], nodes: [
    { id: "jira", label: L("Jira (JQL polling every 2 hours)", "Jira (опитування за JQL кожні 2 години)", "Jira (опрос по JQL каждые 2 часа)"), boundary: "external", status: "documented" },
    { id: "n8n", label: L("n8n workflow, one bug at a time (hosting not documented)", "Процес n8n, по одному багу (розміщення не задокументоване)", "Процесс n8n, по одному багу (размещение не задокументировано)"), boundary: "unknown", status: "documented" },
    { id: "ai", label: L("OpenAI agent: summary, category, area", "Агент OpenAI: резюме, категорія, область", "Агент OpenAI: резюме, категория, область"), boundary: "external", status: "documented" },
    { id: "sheets", label: L("Google Sheets: upsert by issue number", "Google Sheets: оновлення чи вставка за номером задачі", "Google Sheets: обновление или вставка по номеру задачи"), boundary: "external", status: "documented" },
  ] },
  metricIds: [], evidenceIds: ["ev-jira-reporting-repo"],
  missingFields: ["dates.experiment", "verification", "measured results"],
  detail: {
    en: {
      potentialValue: "Teams that report on tracker data in spreadsheets could use a similar workflow to prepare summaries for a person to check.",
      context: { problem: "Stakeholders need a high-level spreadsheet of active bugs, but writing and shortening bug reports for it by hand loses context. Out-of-the-box integrations append duplicate rows instead of updating them, and real-time sync usually needs Jira admin webhooks that corporate IT may block.", inputs: ["Jira issues of type Bug selected by a JQL filter"], scope: ["Poll Jira on a schedule (every 2 hours) with a tight JQL filter", "Summarize each bug in three sentences with OpenAI, classify its category and extract the system area", "Normalize the AI output with a JavaScript parser", "Update or create rows in Google Sheets by issue number"], exclusions: ["Webhooks are deliberately not used", "No accuracy measurements are documented"] },
      implementation: { summary: "A scheduled n8n workflow polls Jira with JQL, processes bugs one by one through an OpenAI agent and a parsing node, then updates or creates the matching row in Google Sheets.", technologies: ["n8n", "Jira", "OpenAI", "Google Sheets", "JavaScript (parsing node)"], decisions: ["JQL polling instead of admin webhooks, using standard user-level API credentials", "Processing items one by one so already processed bugs stay committed if a connection drops or a rate limit is hit", "A parser strips Markdown from LLM output before JSON parsing"] },
      verification: { summary: "No test scenarios, accuracy measurements or run conditions are documented.", scenarios: [], criteria: [], conditions: [] },
      results: { summary: "The repository documents the workflow design with a demo GIF. No measured results, such as summary quality or time saved, are documented.", whatItProves: ["A Jira-to-Sheets reporting workflow with update-or-create behavior is documented"], whatItDoesNotProve: ["Quality or correctness of the AI summaries and classifications", "Time saved"] },
      limitations: ["No measurements", "Jira, OpenAI and Google Sheets are external services", "Polling every 2 hours is not real time", "The documented JQL example targets a CRM project", "Where the n8n instance runs is not documented"],
      pilotRequirements: ["The Jira project and issue filter to use", "Credentials with limited, read-oriented access", "A reviewer for the AI summaries", "Agreed rules for rows that were edited by hand"],
      materials: "Repository with README, workflow diagram and demo GIF. No measurements.",
    },
    uk: {
      potentialValue: "Команди, що готують звіти з даних трекера в таблицях, могли б використати схожий процес для підготовки резюме, які перевіряє людина.",
      context: { problem: "Зацікавленим сторонам потрібна оглядова таблиця активних багів, але вручну писати й скорочувати для неї баг-репорти — це втрата контексту. Готові інтеграції додають дублікати рядків замість оновлення, а синхронізація в реальному часі зазвичай потребує адміністративних вебхуків Jira, які корпоративний IT може заблокувати.", inputs: ["Задачі Jira типу Bug, відібрані фільтром JQL"], scope: ["Опитувати Jira за розкладом (кожні 2 години) строгим фільтром JQL", "Стисло викласти кожен баг трьома реченнями через OpenAI, визначити категорію та вилучити область системи", "Нормалізувати вивід AI парсером JavaScript", "Оновлювати чи створювати рядки в Google Sheets за номером задачі"], exclusions: ["Вебхуки свідомо не використовуються", "Вимірювань точності не задокументовано"] },
      implementation: { summary: "Запланований процес n8n опитує Jira за JQL, обробляє баги по одному через агента OpenAI і вузол розбору, після чого оновлює чи створює відповідний рядок у Google Sheets.", technologies: ["n8n", "Jira", "OpenAI", "Google Sheets", "JavaScript (вузол розбору)"], decisions: ["Опитування за JQL замість адміністративних вебхуків, зі стандартними обліковими даними API рівня користувача", "Обробка елементів по одному, щоб уже оброблені баги лишалися збереженими, якщо обірветься з’єднання чи буде досягнуто ліміту запитів", "Парсер прибирає Markdown із виводу LLM перед розбором JSON"] },
      verification: { summary: "Тестових сценаріїв, вимірювань точності чи умов запуску не задокументовано.", scenarios: [], criteria: [], conditions: [] },
      results: { summary: "Репозиторій документує дизайн процесу з демо-GIF. Виміряних результатів, як-от якість резюме чи заощаджений час, не задокументовано.", whatItProves: ["Задокументовано процес звітності Jira → Sheets з поведінкою «оновити чи створити»"], whatItDoesNotProve: ["Якість чи правильність AI-резюме та класифікацій", "Заощаджений час"] },
      limitations: ["Немає вимірювань", "Jira, OpenAI і Google Sheets — зовнішні сервіси", "Опитування кожні 2 години — це не реальний час", "Задокументований приклад JQL стосується проєкту CRM", "Де працює екземпляр n8n, не задокументовано"],
      pilotRequirements: ["Проєкт Jira та фільтр задач для використання", "Облікові дані з обмеженим доступом, переважно на читання", "Рецензент AI-резюме", "Узгоджені правила для рядків, відредагованих вручну"],
      materials: "Репозиторій із README, схемою процесу та демо-GIF. Вимірювань немає.",
    },
    ru: {
      potentialValue: "Команды, готовящие отчёты по данным трекера в таблицах, могли бы использовать похожий процесс для подготовки резюме, которые проверяет человек.",
      context: { problem: "Заинтересованным сторонам нужна обзорная таблица активных багов, но вручную писать и сокращать для неё баг-репорты — значит терять контекст. Готовые интеграции добавляют дубликаты строк вместо обновления, а синхронизация в реальном времени обычно требует административных вебхуков Jira, которые корпоративный IT может заблокировать.", inputs: ["Задачи Jira типа Bug, отобранные фильтром JQL"], scope: ["Опрашивать Jira по расписанию (каждые 2 часа) строгим фильтром JQL", "Кратко изложить каждый баг тремя предложениями через OpenAI, определить категорию и извлечь область системы", "Нормализовать вывод AI парсером JavaScript", "Обновлять или создавать строки в Google Sheets по номеру задачи"], exclusions: ["Вебхуки сознательно не используются", "Измерений точности не задокументировано"] },
      implementation: { summary: "Запланированный процесс n8n опрашивает Jira по JQL, обрабатывает баги по одному через агента OpenAI и узел разбора, после чего обновляет или создаёт соответствующую строку в Google Sheets.", technologies: ["n8n", "Jira", "OpenAI", "Google Sheets", "JavaScript (узел разбора)"], decisions: ["Опрос по JQL вместо административных вебхуков, со стандартными учётными данными API уровня пользователя", "Обработка элементов по одному, чтобы уже обработанные баги оставались сохранёнными, если оборвётся соединение или будет достигнут лимит запросов", "Парсер убирает Markdown из вывода LLM перед разбором JSON"] },
      verification: { summary: "Тестовых сценариев, измерений точности или условий запуска не задокументировано.", scenarios: [], criteria: [], conditions: [] },
      results: { summary: "Репозиторий документирует дизайн процесса с демо-GIF. Измеренных результатов, таких как качество резюме или сэкономленное время, не задокументировано.", whatItProves: ["Задокументирован процесс отчётности Jira → Sheets с поведением «обновить или создать»"], whatItDoesNotProve: ["Качество или правильность AI-резюме и классификаций", "Сэкономленное время"] },
      limitations: ["Нет измерений", "Jira, OpenAI и Google Sheets — внешние сервисы", "Опрос каждые 2 часа — это не реальное время", "Задокументированный пример JQL относится к проекту CRM", "Где работает экземпляр n8n, не задокументировано"],
      pilotRequirements: ["Проект Jira и фильтр задач для использования", "Учётные данные с ограниченным доступом, преимущественно на чтение", "Рецензент AI-резюме", "Согласованные правила для строк, отредактированных вручную"],
      materials: "Репозиторий с README, схемой процесса и демо-GIF. Измерений нет.",
    },
  },
};
