import { L } from "../types";
import { REPO, type CaseData } from "./types";

const NO_RUN = ["No test scenarios, quality criteria or run conditions are documented in the repository.", "У репозиторії не задокументовано тестових сценаріїв, критеріїв якості чи умов запуску.", "В репозитории не задокументированы тестовые сценарии, критерии качества и условия запуска."];
export const documentProcessing: CaseData = {
  sourceRepository: REPO("UniBooks-Translator"),
  dates: { experiment: null, contentUpdated: null },
  architecture: { edges: [["gdrive", "n8n"], ["n8n", "llm"], ["llm", "gdocs"]], nodes: [
    { id: "gdrive", label: L("Google Drive (new-file trigger)", "Google Drive (тригер нового файлу)", "Google Drive (триггер нового файла)"), boundary: "external", status: "documented" },
    { id: "n8n", label: L("n8n workflow: extraction and paragraph chunking (hosting not documented)", "Процес n8n: вилучення та розбиття на абзаци (розміщення не задокументоване)", "Процесс n8n: извлечение и разбиение на абзацы (размещение не задокументировано)"), boundary: "unknown", status: "documented" },
    { id: "llm", label: L("LLM translation, sequential batches (Grok)", "Переклад LLM послідовними пакетами (Grok)", "Перевод LLM последовательными пакетами (Grok)"), boundary: "external", status: "documented" },
    { id: "gdocs", label: L("Google Docs generation", "Створення Google Docs", "Создание Google Docs"), boundary: "external", status: "documented" },
  ] },
  metricIds: [], evidenceIds: ["ev-document-processing-repo"],
  missingFields: ["dates.experiment", "verification", "measured results"],
  detail: {
    en: {
      potentialValue: "Organizations that translate or reformat long documents could use a similar pipeline to produce drafts for human review.",
      context: { problem: "Translating very large books (500+ pages) by hand is expensive. Online translation services limit cost, file size and characters, need manual intervention and make it hard to keep context across a large document.", inputs: ["A raw text file placed in a designated Google Drive folder"], scope: ["Detect a new text file in Google Drive", "Extract the text and split it into chunks along paragraph boundaries", "Translate the chunks sequentially with an LLM (Grok)", "Reassemble the result and generate a formatted Google Doc with the original title"], exclusions: ["Only raw text input is documented; other file formats are not described", "No measurement of translation quality or structure fidelity is documented"] },
      implementation: { summary: "An n8n workflow watches a Google Drive folder, splits the extracted text into chunks on paragraph boundaries, translates the chunks one batch at a time with an LLM and writes the result into a Google Doc.", technologies: ["n8n", "Google Drive", "Google Docs", "Grok (LLM)"], decisions: ["Custom chunking keeps paragraph boundaries to reduce context fragmentation", "Sequential batches keep each request within model limits"] },
      verification: { summary: NO_RUN[0]!, scenarios: [], criteria: [], conditions: [] },
      results: { summary: "The repository documents the pipeline, not measured results. No figures on speed, quality or fidelity are published here.", whatItProves: ["The workflow exists as an n8n configuration with a documented architecture"], whatItDoesNotProve: ["Translation quality or fidelity to the original structure", "Processing speed or throughput"] },
      limitations: ["No measured fidelity, quality or timing", "Depends on external services: Google Drive, Google Docs and the Grok model", "Where the n8n instance runs is not documented", "Input is documented as raw text only"],
      pilotRequirements: ["Permitted sample documents and their languages", "A definition of acceptable translation and structure preservation", "A human reviewer and a sample-based quality check", "Agreed handling of confidential documents, since an external LLM and Google services are involved"],
      materials: "Repository with README, architecture diagram and n8n workflow. No measurements.",
    },
    uk: {
      potentialValue: "Організації, що перекладають чи переформатовують довгі документи, могли б використати схожий конвеєр для чернеток, які перевіряє людина.",
      context: { problem: "Переклад дуже великих книг (500+ сторінок) вручну коштує дорого. Онлайн-сервіси перекладу обмежують вартість, розмір файлу та кількість символів, потребують ручного втручання і ускладнюють збереження контексту у великому документі.", inputs: ["Необроблений текстовий файл у призначеній теці Google Drive"], scope: ["Виявити новий текстовий файл у Google Drive", "Вилучити текст і розбити його на фрагменти за межами абзаців", "Послідовно перекласти фрагменти за допомогою LLM (Grok)", "Зібрати результат і створити форматований Google Doc з оригінальною назвою"], exclusions: ["Задокументовано лише необроблений текст; інші формати файлів не описано", "Вимірювань якості перекладу чи збереження структури не задокументовано"] },
      implementation: { summary: "Процес n8n стежить за текою Google Drive, розбиває вилучений текст на фрагменти за межами абзаців, перекладає їх пакетами за допомогою LLM і записує результат у Google Doc.", technologies: ["n8n", "Google Drive", "Google Docs", "Grok (LLM)"], decisions: ["Власне розбиття зберігає межі абзаців, щоб зменшити фрагментацію контексту", "Послідовні пакети тримають кожен запит у межах обмежень моделі"] },
      verification: { summary: NO_RUN[1]!, scenarios: [], criteria: [], conditions: [] },
      results: { summary: "Репозиторій документує конвеєр, а не виміряні результати. Цифр щодо швидкості, якості чи точності тут не публікується.", whatItProves: ["Процес існує як конфігурація n8n із задокументованою архітектурою"], whatItDoesNotProve: ["Якість перекладу чи відповідність оригінальній структурі", "Швидкість чи пропускну здатність обробки"] },
      limitations: ["Немає виміряної точності, якості чи часу", "Залежить від зовнішніх сервісів: Google Drive, Google Docs і моделі Grok", "Де працює екземпляр n8n, не задокументовано", "Вхідні дані задокументовано лише як необроблений текст"],
      pilotRequirements: ["Дозволені зразки документів і їхні мови", "Визначення прийнятного перекладу та збереження структури", "Людина-рецензент і вибіркова перевірка якості", "Узгоджене поводження з конфіденційними документами, бо задіяні зовнішня LLM і сервіси Google"],
      materials: "Репозиторій із README, схемою архітектури та процесом n8n. Вимірювань немає.",
    },
    ru: {
      potentialValue: "Организации, переводящие или переформатирующие длинные документы, могли бы использовать похожий конвейер для черновиков, которые проверяет человек.",
      context: { problem: "Перевод очень больших книг (500+ страниц) вручную стоит дорого. Онлайн-сервисы перевода ограничивают стоимость, размер файла и количество символов, требуют ручного вмешательства и усложняют сохранение контекста в большом документе.", inputs: ["Необработанный текстовый файл в назначенной папке Google Drive"], scope: ["Обнаружить новый текстовый файл в Google Drive", "Извлечь текст и разбить его на фрагменты по границам абзацев", "Последовательно перевести фрагменты с помощью LLM (Grok)", "Собрать результат и создать форматированный Google Doc с исходным названием"], exclusions: ["Задокументирован только необработанный текст; другие форматы файлов не описаны", "Измерений качества перевода или сохранения структуры не задокументировано"] },
      implementation: { summary: "Процесс n8n следит за папкой Google Drive, разбивает извлечённый текст на фрагменты по границам абзацев, переводит их пакетами с помощью LLM и записывает результат в Google Doc.", technologies: ["n8n", "Google Drive", "Google Docs", "Grok (LLM)"], decisions: ["Собственное разбиение сохраняет границы абзацев, чтобы уменьшить фрагментацию контекста", "Последовательные пакеты удерживают каждый запрос в пределах ограничений модели"] },
      verification: { summary: NO_RUN[2]!, scenarios: [], criteria: [], conditions: [] },
      results: { summary: "Репозиторий документирует конвейер, а не измеренные результаты. Цифр о скорости, качестве или точности здесь не публикуется.", whatItProves: ["Процесс существует как конфигурация n8n с задокументированной архитектурой"], whatItDoesNotProve: ["Качество перевода или соответствие исходной структуре", "Скорость или пропускную способность обработки"] },
      limitations: ["Нет измеренной точности, качества или времени", "Зависит от внешних сервисов: Google Drive, Google Docs и модели Grok", "Где работает экземпляр n8n, не задокументировано", "Входные данные задокументированы только как необработанный текст"],
      pilotRequirements: ["Разрешённые образцы документов и их языки", "Определение приемлемого перевода и сохранения структуры", "Человек-рецензент и выборочная проверка качества", "Согласованное обращение с конфиденциальными документами, так как задействованы внешняя LLM и сервисы Google"],
      materials: "Репозиторий с README, схемой архитектуры и процессом n8n. Измерений нет.",
    },
  },
};
