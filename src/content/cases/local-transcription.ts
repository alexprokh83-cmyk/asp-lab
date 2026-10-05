import { L } from "../types";
import { REPO, type CaseData } from "./types";

export const localTranscription: CaseData = {
  sourceRepository: REPO("whisper-batch-transcriber"),
  dates: { experiment: null, contentUpdated: null },
  architecture: { edges: [["in", "whisper"], ["whisper", "out"], ["out", "down"]], nodes: [
    { id: "in", label: L("MP3 files in a local input folder", "MP3-файли в локальній теці input", "MP3-файлы в локальной папке input"), boundary: "local", status: "documented" },
    { id: "whisper", label: L("Faster Whisper on the local GPU (CUDA)", "Faster Whisper на локальному GPU (CUDA)", "Faster Whisper на локальном GPU (CUDA)"), boundary: "local", status: "documented" },
    { id: "out", label: L("Text files in a local output folder", "Текстові файли в локальній теці output", "Текстовые файлы в локальной папке output"), boundary: "local", status: "documented" },
    { id: "down", label: L("Optional n8n lecture-to-Docs workflow: AI summarization and Google Docs (hosting not documented)", "Необов’язковий процес n8n «лекція → Docs»: AI-конспект і Google Docs (розміщення не задокументоване)", "Необязательный процесс n8n «лекция → Docs»: AI-конспект и Google Docs (размещение не задокументировано)"), boundary: "unknown", status: "documented" },
  ] },
  metricIds: [], evidenceIds: ["ev-local-transcription-repo"],
  missingFields: ["dates.experiment", "accuracy measurements"],
  detail: {
    en: {
      potentialValue: "Organizations with many long recordings could transcribe them locally to produce text for human review.",
      context: { problem: "Long audio recordings are slow to transcribe by hand, and free online services limit file size, total usage time and number of requests.", inputs: ["MP3 files in an input folder"], scope: ["Batch transcribe MP3 files into text files in an output folder", "Work offline after the first model download", "Default language is Russian; it can be changed or left to automatic detection", "Also included: an n8n workflow template that turns lecture transcripts into a Google Docs article"], exclusions: ["Only MP3 input is documented", "The README does not state that the n8n summarization step runs locally"] },
      implementation: { summary: "A Python script uses Faster Whisper (medium model, CUDA, float16) with voice-activity filtering and beam size 5 to transcribe each MP3 into a text file.", technologies: ["Python", "Faster Whisper", "NVIDIA CUDA and PyTorch", "FFmpeg", "n8n (optional lecture-to-Docs workflow)"], decisions: ["GPU acceleration for long recordings", "The model is cached locally so later runs work offline"] },
      verification: { summary: "No test scenarios, accuracy measurements or word-error rates are documented.", scenarios: [], criteria: [], conditions: [] },
      results: { summary: "No accuracy or speed measurements are documented in the repository.", whatItProves: ["A local GPU batch transcription script exists with documented setup"], whatItDoesNotProve: ["Transcription accuracy", "Processing speed", "That downstream processing is local: the lecture-to-Docs workflow uses an AI agent and Google Docs, which are external"] },
      limitations: ["No accuracy or speed measurements", "Requires an NVIDIA GPU, CUDA and FFmpeg", "The model is downloaded on first run", "The default language is Russian; mixed-language audio needs automatic detection"],
      pilotRequirements: ["Permitted sample recordings and their languages", "The hardware that would be available", "A human reviewer of the transcripts", "A decision on whether downstream steps may use external services"],
      materials: "Repository with README, workflow diagram, scripts and an n8n template. No measurements.",
    },
    uk: {
      potentialValue: "Організації з багатьма довгими записами могли б транскрибувати їх локально, щоб отримати текст для перевірки людиною.",
      context: { problem: "Довгі аудіозаписи повільно транскрибувати вручну, а безкоштовні онлайн-сервіси обмежують розмір файлу, загальний час використання і кількість запитів.", inputs: ["MP3-файли в теці input"], scope: ["Пакетна транскрипція MP3-файлів у текстові файли в теці output", "Робота офлайн після першого завантаження моделі", "Мова за замовчуванням — російська; її можна змінити або залишити автоматичне визначення", "Також є шаблон процесу n8n, що перетворює транскрипти лекцій на статтю в Google Docs"], exclusions: ["Задокументовано лише вхід у форматі MP3", "У README не сказано, що крок конспектування в n8n виконується локально"] },
      implementation: { summary: "Скрипт Python використовує Faster Whisper (модель medium, CUDA, float16) з фільтрацією голосової активності та розміром променя 5, щоб транскрибувати кожен MP3 у текстовий файл.", technologies: ["Python", "Faster Whisper", "NVIDIA CUDA і PyTorch", "FFmpeg", "n8n (необов’язковий процес «лекція → Docs»)"], decisions: ["GPU-прискорення для довгих записів", "Модель кешується локально, тож наступні запуски працюють офлайн"] },
      verification: { summary: "Тестових сценаріїв, вимірювань точності чи показників помилок слів не задокументовано.", scenarios: [], criteria: [], conditions: [] },
      results: { summary: "У репозиторії не задокументовано вимірювань точності чи швидкості.", whatItProves: ["Існує локальний скрипт пакетної GPU-транскрипції із задокументованим налаштуванням"], whatItDoesNotProve: ["Точність транскрипції", "Швидкість обробки", "Що подальша обробка локальна: процес «лекція → Docs» використовує AI-агента та Google Docs, які є зовнішніми"] },
      limitations: ["Немає вимірювань точності чи швидкості", "Потрібні GPU NVIDIA, CUDA та FFmpeg", "Модель завантажується під час першого запуску", "Мова за замовчуванням — російська; для змішаного аудіо потрібне автоматичне визначення"],
      pilotRequirements: ["Дозволені зразки записів і їхні мови", "Обладнання, яке буде доступне", "Людина, що перевіряє транскрипти", "Рішення, чи можуть подальші кроки використовувати зовнішні сервіси"],
      materials: "Репозиторій із README, схемою процесу, скриптами та шаблоном n8n. Вимірювань немає.",
    },
    ru: {
      potentialValue: "Организации с множеством длинных записей могли бы расшифровывать их локально, чтобы получить текст для проверки человеком.",
      context: { problem: "Длинные аудиозаписи медленно расшифровывать вручную, а бесплатные онлайн-сервисы ограничивают размер файла, общее время использования и количество запросов.", inputs: ["MP3-файлы в папке input"], scope: ["Пакетная расшифровка MP3-файлов в текстовые файлы в папке output", "Работа офлайн после первой загрузки модели", "Язык по умолчанию — русский; его можно изменить или оставить автоматическое определение", "Также есть шаблон процесса n8n, превращающий транскрипты лекций в статью в Google Docs"], exclusions: ["Задокументирован только вход в формате MP3", "В README не сказано, что шаг конспектирования в n8n выполняется локально"] },
      implementation: { summary: "Скрипт Python использует Faster Whisper (модель medium, CUDA, float16) с фильтрацией голосовой активности и размером луча 5, чтобы расшифровать каждый MP3 в текстовый файл.", technologies: ["Python", "Faster Whisper", "NVIDIA CUDA и PyTorch", "FFmpeg", "n8n (необязательный процесс «лекция → Docs»)"], decisions: ["GPU-ускорение для длинных записей", "Модель кэшируется локально, поэтому последующие запуски работают офлайн"] },
      verification: { summary: "Тестовых сценариев, измерений точности или показателей ошибок слов не задокументировано.", scenarios: [], criteria: [], conditions: [] },
      results: { summary: "В репозитории не задокументировано измерений точности или скорости.", whatItProves: ["Существует локальный скрипт пакетной GPU-расшифровки с задокументированной настройкой"], whatItDoesNotProve: ["Точность расшифровки", "Скорость обработки", "Что последующая обработка локальна: процесс «лекция → Docs» использует AI-агента и Google Docs, которые являются внешними"] },
      limitations: ["Нет измерений точности или скорости", "Нужны GPU NVIDIA, CUDA и FFmpeg", "Модель загружается при первом запуске", "Язык по умолчанию — русский; для смешанного аудио нужно автоматическое определение"],
      pilotRequirements: ["Разрешённые образцы записей и их языки", "Оборудование, которое будет доступно", "Человек, проверяющий транскрипты", "Решение, могут ли последующие шаги использовать внешние сервисы"],
      materials: "Репозиторий с README, схемой процесса, скриптами и шаблоном n8n. Измерений нет.",
    },
  },
};
