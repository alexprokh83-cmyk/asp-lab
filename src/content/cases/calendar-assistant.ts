import { L } from "../types";
import { REPO, type CaseData } from "./types";

export const calendarAssistant: CaseData = {
  sourceRepository: REPO("telegram-calendar-ai"),
  dates: { experiment: null, contentUpdated: null },
  architecture: { edges: [["tg", "n8n"], ["n8n", "llm"], ["llm", "google"]], nodes: [
    { id: "tg", label: L("Telegram: text or voice input", "Telegram: текстовий чи голосовий ввід", "Telegram: текстовый или голосовой ввод"), boundary: "external", status: "documented" },
    { id: "n8n", label: L("n8n workflow (hosting not documented)", "Процес n8n (розміщення не задокументоване)", "Процесс n8n (размещение не задокументировано)"), boundary: "unknown", status: "documented" },
    { id: "llm", label: L("LLM dispatcher and agents (provider not documented)", "Диспетчер і агенти LLM (провайдера не задокументовано)", "Диспетчер и агенты LLM (провайдер не задокументирован)"), boundary: "unknown", status: "documented" },
    { id: "google", label: L("Google Calendar and Google Sheets", "Google Calendar і Google Sheets", "Google Calendar и Google Sheets"), boundary: "external", status: "documented" },
  ] },
  metricIds: [], evidenceIds: ["ev-calendar-assistant-repo"],
  missingFields: ["dates.experiment", "verification", "measured results"],
  detail: {
    en: {
      potentialValue: "Teams that schedule through chat messages could use a similar assistant to prepare events for confirmation.",
      context: { problem: "The README gives a concept rather than a problem statement: managing scheduling and time tracking through Telegram using natural language, by text or voice.", inputs: ["Text or voice messages in Telegram"], scope: ["Create Google Calendar events from natural language, including vague times such as “tomorrow morning”", "Log time entries (date, category, project, description, duration) to Google Sheets", "List events and send a scheduled daily summary at 20:00", "Ask for clarification when the intent is unclear"], exclusions: ["Timezone handling is documented for Europe/Kyiv only", "No accuracy measurements are documented"] },
      implementation: { summary: "An n8n workflow transcribes voice when needed; an LLM dispatcher detects the intent (create_event, list_events, create_record_work, need_clarification) and routes it to Google Calendar or Google Sheets agents; replies are formatted by an LLM and sent to Telegram.", technologies: ["n8n", "Telegram", "LLM dispatcher and agents", "Google Calendar", "Google Sheets"], decisions: ["A single LLM intent router", "Project names are normalized to canonical projects to correct speech-recognition errors"] },
      verification: { summary: "No test scenarios, criteria or accuracy measurements are documented.", scenarios: [], criteria: [], conditions: [] },
      results: { summary: "The repository documents the system design, with a demo GIF and diagrams. No measured results are documented.", whatItProves: ["A Telegram-based calendar and time-tracking workflow is designed and documented"], whatItDoesNotProve: ["Accuracy of date and duration parsing", "Reliability of intent detection"] },
      limitations: ["No measurements", "Depends on external services: Telegram, Google Calendar, Google Sheets and an LLM", "Written for a personal-assistant use case", "Where the n8n instance runs is not documented"],
      pilotRequirements: ["A defined calendar provider and permission scope", "Sample messages without confidential data", "Handling of ambiguous requests agreed in advance"],
      materials: "Repository with README, workflow diagram and demo GIF. No measurements.",
    },
    uk: {
      potentialValue: "Команди, що планують через повідомлення в чаті, могли б використати схожого асистента для підготовки подій до підтвердження.",
      context: { problem: "У README наведено концепцію, а не опис проблеми: керування розкладом і обліком часу через Telegram природною мовою, текстом або голосом.", inputs: ["Текстові чи голосові повідомлення в Telegram"], scope: ["Створювати події Google Calendar з природної мови, зокрема з нечіткими термінами на кшталт «завтра вранці»", "Записувати облік часу (дата, категорія, проєкт, опис, тривалість) у Google Sheets", "Показувати події та надсилати щоденний підсумок за розкладом о 20:00", "Просити уточнення, коли намір незрозумілий"], exclusions: ["Часові пояси задокументовано лише для Europe/Kyiv", "Вимірювань точності не задокументовано"] },
      implementation: { summary: "Процес n8n за потреби транскрибує голос; диспетчер LLM визначає намір (create_event, list_events, create_record_work, need_clarification) і спрямовує його до агентів Google Calendar чи Google Sheets; відповіді форматує LLM і надсилає в Telegram.", technologies: ["n8n", "Telegram", "Диспетчер і агенти LLM", "Google Calendar", "Google Sheets"], decisions: ["Єдиний маршрутизатор намірів на LLM", "Назви проєктів нормалізуються до канонічних, щоб виправляти помилки розпізнавання мовлення"] },
      verification: { summary: "Тестових сценаріїв, критеріїв чи вимірювань точності не задокументовано.", scenarios: [], criteria: [], conditions: [] },
      results: { summary: "Репозиторій документує дизайн системи з демо-GIF і схемами. Виміряних результатів не задокументовано.", whatItProves: ["Процес календаря й обліку часу в Telegram спроєктовано та задокументовано"], whatItDoesNotProve: ["Точність розбору дат і тривалостей", "Надійність визначення наміру"] },
      limitations: ["Немає вимірювань", "Залежить від зовнішніх сервісів: Telegram, Google Calendar, Google Sheets і LLM", "Написано для сценарію персонального асистента", "Де працює екземпляр n8n, не задокументовано"],
      pilotRequirements: ["Визначений календарний провайдер і обсяг дозволів", "Зразки повідомлень без конфіденційних даних", "Заздалегідь узгоджене поводження з неоднозначними запитами"],
      materials: "Репозиторій із README, схемою процесу та демо-GIF. Вимірювань немає.",
    },
    ru: {
      potentialValue: "Команды, планирующие через сообщения в чате, могли бы использовать похожего ассистента для подготовки событий к подтверждению.",
      context: { problem: "В README приведена концепция, а не описание проблемы: управление расписанием и учётом времени через Telegram на естественном языке, текстом или голосом.", inputs: ["Текстовые или голосовые сообщения в Telegram"], scope: ["Создавать события Google Calendar из естественного языка, включая нечёткие сроки вроде «завтра утром»", "Записывать учёт времени (дата, категория, проект, описание, длительность) в Google Sheets", "Показывать события и отправлять ежедневную сводку по расписанию в 20:00", "Просить уточнение, когда намерение непонятно"], exclusions: ["Часовые пояса задокументированы только для Europe/Kyiv", "Измерений точности не задокументировано"] },
      implementation: { summary: "Процесс n8n при необходимости расшифровывает голос; диспетчер LLM определяет намерение (create_event, list_events, create_record_work, need_clarification) и направляет его агентам Google Calendar или Google Sheets; ответы форматирует LLM и отправляет в Telegram.", technologies: ["n8n", "Telegram", "Диспетчер и агенты LLM", "Google Calendar", "Google Sheets"], decisions: ["Единый маршрутизатор намерений на LLM", "Названия проектов нормализуются до канонических, чтобы исправлять ошибки распознавания речи"] },
      verification: { summary: "Тестовых сценариев, критериев или измерений точности не задокументировано.", scenarios: [], criteria: [], conditions: [] },
      results: { summary: "Репозиторий документирует дизайн системы с демо-GIF и схемами. Измеренных результатов не задокументировано.", whatItProves: ["Процесс календаря и учёта времени в Telegram спроектирован и задокументирован"], whatItDoesNotProve: ["Точность разбора дат и длительностей", "Надёжность определения намерения"] },
      limitations: ["Нет измерений", "Зависит от внешних сервисов: Telegram, Google Calendar, Google Sheets и LLM", "Написано для сценария персонального ассистента", "Где работает экземпляр n8n, не задокументировано"],
      pilotRequirements: ["Определённый календарный провайдер и объём разрешений", "Образцы сообщений без конфиденциальных данных", "Заранее согласованное обращение с неоднозначными запросами"],
      materials: "Репозиторий с README, схемой процесса и демо-GIF. Измерений нет.",
    },
  },
};
