/**
 * Project records. Only facts supplied by the owner are used.
 * Unknown values are null / [] and are rendered as TODO — REAL VALUE REQUIRED in preview.
 * Keep the four concepts apart: projectType · capabilityMaturity · publicationStatus (here)
 * and evidence verification (evidence.ts).
 */
import { L, type Project, type ProjectCopy } from "./types";

const EMPTY: Pick<ProjectCopy, "context" | "implementation" | "verification" | "results" | "limitations" | "pilotRequirements"> = {
  context: { problem: null, inputs: [], scope: [], exclusions: [] },
  implementation: { summary: null, technologies: [], decisions: [] },
  verification: { summary: null, scenarios: [], criteria: [], conditions: [] },
  results: { summary: null, whatItProves: [], whatItDoesNotProve: [] },
  limitations: [],
  pilotRequirements: [],
};
const MISSING = ["sourceRepository", "dates.experiment", "context", "implementation", "verification", "results", "limitations", "pilotRequirements"];

export const baseProjects: Project[] = [
  {
    id: "document-processing", slug: "document-processing", routeKey: "labDocumentProcessing",
    originalName: "UniBooks-Translator", categories: ["documentsAndSpeech"], featuredOrder: 1,
    projectType: "laboratory-experiment", capabilityMaturity: "confirmed", publicationStatus: "draft",
    sourceRepository: null, dates: { experiment: null, contentUpdated: null },
    copy: {
      en: {
        title: "UniBooks Translator", positioning: "Long-document processing and translation", summary: "Long-document processing and translation. Preserving document structure is the project's stated objective; fidelity has not been measured.", potentialValue: null,
        ...EMPTY, flow: ["Long document", "Processing", "Translation"], materials: "No measurements supplied.",
      },
      uk: {
        title: "UniBooks Translator", positioning: "Обробка та переклад довгих документів", summary: "Обробка та переклад довгих документів. Збереження структури документа — заявлена мета проєкту; точність не вимірювалась.", potentialValue: null,
        ...EMPTY, flow: ["Довгий документ", "Обробка", "Переклад"], materials: "Вимірювань не надано.",
      },
      ru: {
        title: "UniBooks Translator", positioning: "Обработка и перевод длинных документов", summary: "Обработка и перевод длинных документов. Сохранение структуры документа — заявленная цель проекта; точность не измерялась.", potentialValue: null,
        ...EMPTY, flow: ["Длинный документ", "Обработка", "Перевод"], materials: "Измерения не предоставлены.",
      },
    },
    architecture: null,
    metricIds: [], evidenceIds: [], relatedProjectIds: ["local-transcription", "local-llm-benchmark"], missingFields: MISSING,
  },
  {
    id: "voice-to-ticket", slug: "voice-to-ticket", routeKey: "labVoiceToTicket",
    originalName: "ai-voice-bug-reporting-system", categories: ["documentsAndSpeech", "processAutomation"], featuredOrder: 2,
    projectType: "laboratory-experiment", capabilityMaturity: "confirmed", publicationStatus: "draft",
    sourceRepository: null, dates: { experiment: null, contentUpdated: null },
    copy: {
      en: {
        title: "AI Voice Bug Reporting System", positioning: "Voice input transformed into a structured bug-report workflow", summary: "Voice input transformed into a structured bug-report workflow. The ticket destination has not been specified.", potentialValue: null,
        ...EMPTY, flow: ["Voice input", "Structuring", "Bug report"], materials: "No measurements supplied.",
      },
      uk: {
        title: "AI Voice Bug Reporting System", positioning: "Голосове введення, перетворене на структурований процес баг-репорту", summary: "Голосове введення, перетворене на структурований процес створення баг-репорту. Систему призначення тікетів не визначено.", potentialValue: null,
        ...EMPTY, flow: ["Голосове введення", "Структурування", "Баг-репорт"], materials: "Вимірювань не надано.",
      },
      ru: {
        title: "AI Voice Bug Reporting System", positioning: "Голосовой ввод, превращаемый в структурированный процесс баг-репорта", summary: "Голосовой ввод, превращаемый в структурированный процесс создания баг-репорта. Система назначения тикетов не указана.", potentialValue: null,
        ...EMPTY, flow: ["Голосовой ввод", "Структурирование", "Баг-репорт"], materials: "Измерения не предоставлены.",
      },
    },
    architecture: null,
    metricIds: [], evidenceIds: [], relatedProjectIds: ["jira-reporting", "local-transcription"], missingFields: MISSING,
  },
  {
    id: "local-llm-benchmark", slug: "local-llm-benchmark", routeKey: "labLocalLlmBenchmark",
    originalName: "auto-llm-benchmark", categories: ["localModels", "aiEvaluation"], featuredOrder: 3,
    projectType: "laboratory-experiment", capabilityMaturity: "confirmed", publicationStatus: "draft",
    sourceRepository: null, dates: { experiment: null, contentUpdated: null },
    copy: {
      en: {
        title: "Auto LLM Benchmark", positioning: "Comparison of local models on supplied scenarios", summary: "Comparison of local models using supplied scenarios and benchmark records.", potentialValue: null,
        ...EMPTY, flow: ["Scenarios", "Local models", "Benchmark records"], materials: "Pipeline design documented; no results published.",
      },
      uk: {
        title: "Auto LLM Benchmark", positioning: "Порівняння локальних моделей на наданих сценаріях", summary: "Порівняння локальних моделей на наданих сценаріях і записах бенчмарку.", potentialValue: null,
        ...EMPTY, flow: ["Сценарії", "Локальні моделі", "Записи бенчмарку"], materials: "Дизайн конвеєра задокументовано; результатів не опубліковано.",
      },
      ru: {
        title: "Auto LLM Benchmark", positioning: "Сравнение локальных моделей на предоставленных сценариях", summary: "Сравнение локальных моделей на предоставленных сценариях и записях бенчмарка.", potentialValue: null,
        ...EMPTY, flow: ["Сценарии", "Локальные модели", "Записи бенчмарка"], materials: "Дизайн конвейера задокументирован; результаты не опубликованы.",
      },
    },
    architecture: null,
    metricIds: ["bench-models", "bench-scenarios", "bench-rows"], evidenceIds: ["ev-auto-llm-benchmark-brief"], relatedProjectIds: ["llm-evaluation", "local-transcription"], missingFields: MISSING,
  },
  {
    id: "llm-evaluation", slug: "llm-evaluation", routeKey: "labLlmEvaluation",
    originalName: "QA-LLM-Lab", categories: ["aiEvaluation"], featuredOrder: 4,
    projectType: "laboratory-experiment", capabilityMaturity: "confirmed", publicationStatus: "draft",
    sourceRepository: null, dates: { experiment: null, contentUpdated: null },
    copy: {
      en: {
        title: "QA-LLM-Lab", positioning: "Functional and adversarial LLM evaluation", summary: "Functional and adversarial LLM evaluation using the supplied Promptfoo and Garak results.", potentialValue: null,
        ...EMPTY, flow: ["Test suites", "Promptfoo / Garak", "Reported results"], materials: "Promptfoo and Garak result files.",
      },
      uk: {
        title: "QA-LLM-Lab", positioning: "Функціональне та змагальне оцінювання LLM", summary: "Функціональне та змагальне оцінювання LLM за наданими результатами Promptfoo і Garak.", potentialValue: null,
        ...EMPTY, flow: ["Набори тестів", "Promptfoo / Garak", "Заявлені результати"], materials: "Файли результатів Promptfoo і Garak.",
      },
      ru: {
        title: "QA-LLM-Lab", positioning: "Функциональная и состязательная оценка LLM", summary: "Функциональная и состязательная оценка LLM по предоставленным результатам Promptfoo и Garak.", potentialValue: null,
        ...EMPTY, flow: ["Наборы тестов", "Promptfoo / Garak", "Заявленные результаты"], materials: "Файлы результатов Promptfoo и Garak.",
      },
    },
    architecture: null,
    metricIds: ["promptfoo-total", "promptfoo-passed", "promptfoo-failed", "garak-attempts", "garak-dan", "garak-hijack"], evidenceIds: ["ev-qa-llm-lab-brief"], relatedProjectIds: ["local-llm-benchmark", "voice-to-ticket"], missingFields: MISSING,
  },
  {
    id: "local-transcription", slug: "local-transcription", routeKey: "labLocalTranscription",
    originalName: "whisper-batch-transcriber", categories: ["documentsAndSpeech"], featuredOrder: null,
    projectType: "laboratory-experiment", capabilityMaturity: "confirmed", publicationStatus: "draft",
    sourceRepository: null, dates: { experiment: null, contentUpdated: null },
    copy: {
      en: {
        title: "Local transcription", positioning: "Local transcription of long audio recordings", summary: "Local transcription of long audio recordings. Downstream processing is not assumed to be local.", potentialValue: null,
        ...EMPTY, flow: ["Long audio", "Local transcription", "Text"], materials: "No measurements supplied.",
      },
      uk: {
        title: "Локальна транскрипція", positioning: "Локальна транскрипція довгих аудіозаписів", summary: "Локальна транскрипція довгих аудіозаписів. Подальша обробка не вважається локальною.", potentialValue: null,
        ...EMPTY, flow: ["Довге аудіо", "Локальна транскрипція", "Текст"], materials: "Вимірювань не надано.",
      },
      ru: {
        title: "Локальная транскрипция", positioning: "Локальная транскрипция длинных аудиозаписей", summary: "Локальная транскрипция длинных аудиозаписей. Последующая обработка не считается локальной.", potentialValue: null,
        ...EMPTY, flow: ["Длинное аудио", "Локальная транскрипция", "Текст"], materials: "Измерения не предоставлены.",
      },
    },
    architecture: {
      nodes: [
        { id: "audio", label: L("Long audio recording", "Довгий аудіозапис", "Длинная аудиозапись"), boundary: "unknown", status: "documented" },
        { id: "whisper", label: L("Local transcription (Whisper)", "Локальна транскрипція (Whisper)", "Локальная транскрипция (Whisper)"), boundary: "local", status: "documented" },
        { id: "downstream", label: L("Downstream processing (not documented)", "Подальша обробка (не задокументована)", "Последующая обработка (не задокументирована)"), boundary: "unknown", status: "conceptual" },
      ],
      edges: [["audio", "whisper"], ["whisper", "downstream"]],
    },
    metricIds: [], evidenceIds: [], relatedProjectIds: ["document-processing", "local-llm-benchmark"], missingFields: MISSING,
  },
  {
    id: "calendar-assistant", slug: "calendar-assistant", routeKey: "labCalendarAssistant",
    originalName: "telegram-calendar-ai", categories: ["processAutomation"], featuredOrder: null,
    projectType: "laboratory-experiment", capabilityMaturity: "confirmed", publicationStatus: "draft",
    sourceRepository: null, dates: { experiment: null, contentUpdated: null },
    copy: {
      en: {
        title: "Calendar assistant", positioning: "Telegram-based calendar-assistance prototype", summary: "Telegram-based calendar-assistance prototype. The calendar provider has not been specified; Telegram is an external service.", potentialValue: null,
        ...EMPTY, flow: ["Telegram message", "Assistant", "Calendar"], materials: "No measurements supplied.",
      },
      uk: {
        title: "Календарний асистент", positioning: "Прототип календарного асистента в Telegram", summary: "Прототип календарного асистента в Telegram. Календарний провайдер не вказано; Telegram — зовнішній сервіс.", potentialValue: null,
        ...EMPTY, flow: ["Повідомлення в Telegram", "Асистент", "Календар"], materials: "Вимірювань не надано.",
      },
      ru: {
        title: "Календарный ассистент", positioning: "Прототип календарного ассистента в Telegram", summary: "Прототип календарного ассистента в Telegram. Календарный провайдер не указан; Telegram — внешний сервис.", potentialValue: null,
        ...EMPTY, flow: ["Сообщение в Telegram", "Ассистент", "Календарь"], materials: "Измерения не предоставлены.",
      },
    },
    architecture: {
      nodes: [
        { id: "telegram", label: L("Telegram", "Telegram", "Telegram"), boundary: "external", status: "documented" },
        { id: "assistant", label: L("Assistant (hosting not documented)", "Асистент (розміщення не задокументоване)", "Ассистент (размещение не задокументировано)"), boundary: "unknown", status: "documented" },
        { id: "calendar", label: L("Calendar provider (not specified)", "Календарний провайдер (не вказано)", "Календарный провайдер (не указан)"), boundary: "unknown", status: "documented" },
      ],
      edges: [["telegram", "assistant"], ["assistant", "calendar"]],
    },
    metricIds: [], evidenceIds: [], relatedProjectIds: ["voice-to-ticket", "jira-reporting"], missingFields: MISSING,
  },
  {
    id: "jira-reporting", slug: "jira-reporting", routeKey: "labJiraReporting",
    originalName: "jira-to-google-sheets-n8n-auto", categories: ["processAutomation"], featuredOrder: null,
    projectType: "laboratory-experiment", capabilityMaturity: "confirmed", publicationStatus: "draft",
    sourceRepository: null, dates: { experiment: null, contentUpdated: null },
    copy: {
      en: {
        title: "Jira reporting", positioning: "Jira, n8n and Google Sheets workflow for reporting data", summary: "A workflow involving Jira, n8n and Google Sheets for preparing reporting data. Jira and Google Sheets are external services.", potentialValue: null,
        ...EMPTY, flow: ["Jira", "n8n", "Google Sheets"], materials: "No measurements supplied.",
      },
      uk: {
        title: "Звітність Jira", positioning: "Процес Jira, n8n і Google Sheets для даних звітності", summary: "Процес із Jira, n8n і Google Sheets для підготовки даних звітності. Jira та Google Sheets — зовнішні сервіси.", potentialValue: null,
        ...EMPTY, flow: ["Jira", "n8n", "Google Sheets"], materials: "Вимірювань не надано.",
      },
      ru: {
        title: "Отчётность Jira", positioning: "Процесс Jira, n8n и Google Sheets для данных отчётности", summary: "Процесс с Jira, n8n и Google Sheets для подготовки данных отчётности. Jira и Google Sheets — внешние сервисы.", potentialValue: null,
        ...EMPTY, flow: ["Jira", "n8n", "Google Sheets"], materials: "Измерения не предоставлены.",
      },
    },
    architecture: {
      nodes: [
        { id: "jira", label: L("Jira", "Jira", "Jira"), boundary: "external", status: "documented" },
        { id: "n8n", label: L("n8n workflow", "Процес n8n", "Процесс n8n"), boundary: "unknown", status: "documented" },
        { id: "sheets", label: L("Google Sheets", "Google Sheets", "Google Sheets"), boundary: "external", status: "documented" },
      ],
      edges: [["jira", "n8n"], ["n8n", "sheets"]],
    },
    metricIds: [], evidenceIds: [], relatedProjectIds: ["voice-to-ticket", "calendar-assistant"], missingFields: MISSING,
  },
];

