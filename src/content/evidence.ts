/**
 * Evidence records. All current entries are owner-supplied briefs: a brief is the
 * known source of an owner-reported claim, NOT a substitute for the underlying report.
 * source/date/version stay null until the real artifact is supplied (no fake links).
 */
import { L, type Evidence } from "./types";

const briefLimit = L(
  "A brief only records what the owner reported. The underlying report, configuration and run conditions have not been reviewed.",
  "Бриф лише фіксує те, що повідомив власник. Звіт, конфігурацію та умови запуску не перевірено.",
  "Бриф лишь фиксирует то, о чём сообщил владелец. Отчёт, конфигурация и условия запуска не проверены.",
);
const brief = (id: string, en: string, uk: string, ru: string, se: string, su: string, sr: string): Evidence => ({
  id, type: "brief", source: null, date: null, version: null,
  provenance: "owner-supplied-brief", verification: "owner-reported",
  title: L(en, uk, ru), supports: L(se, su, sr), limits: briefLimit,
});

export const evidenceRecords: Evidence[] = [];

const repoLimit = L(
  "A repository records what its author documented. It does not by itself show measured results or customer use.",
  "Репозиторій фіксує те, що задокументував автор. Сам по собі він не показує виміряних результатів чи використання клієнтами.",
  "Репозиторий фиксирует то, что задокументировал автор. Сам по себе он не показывает измеренных результатов или использования клиентами.",
);
const repoEv = (key: string, name: string, date: string, sha: string): Evidence => ({
  id: `ev-${key}-repo`, type: "repository", source: `https://github.com/alexprokh-asp/${name}`, date, version: sha,
  provenance: "repository", verification: "source-reviewed",
  title: L(`Source repository: ${name}`, `Репозиторій: ${name}`, `Репозиторий: ${name}`),
  supports: L("README, architecture diagram(s) and workflow files as of the latest commit were read.", "Прочитано README, схему(и) архітектури та файли процесу станом на останній коміт.", "Прочитаны README, схема(ы) архитектуры и файлы процесса по состоянию на последний коммит."),
  limits: repoLimit,
});
evidenceRecords.push(
  repoEv("document-processing", "UniBooks-Translator", "2026-06-15", "82ec850194"),
  repoEv("voice-to-ticket", "ai-voice-bug-reporting-system", "2026-05-25", "5ad59cdada"),
  repoEv("local-llm-benchmark", "auto-llm-benchmark", "2026-07-29", "bbf85668ac"),
  repoEv("llm-evaluation", "QA-LLM-Lab", "2026-09-09", "2d01a448f6"),
  repoEv("local-transcription", "whisper-batch-transcriber", "2026-05-26", "9a06ae662d"),
  repoEv("calendar-assistant", "telegram-calendar-ai", "2026-06-15", "1e129c9733"),
  repoEv("jira-reporting", "jira-to-google-sheets-n8n-auto", "2026-06-17", "96ebe98aeb"),
  {
    id: "ev-qa-promptfoo-results", type: "report", source: "https://github.com/alexprokh-asp/QA-LLM-Lab/blob/main/results/promptfoo-results.json", date: "2026-08-24", version: "2d01a448f6",
    provenance: "report", verification: "source-reviewed",
    title: L("QA-LLM-Lab Promptfoo results (JSON)", "Результати Promptfoo в QA-LLM-Lab (JSON)", "Результаты Promptfoo в QA-LLM-Lab (JSON)"),
    supports: L("Result file of a Promptfoo run dated 2026-08-24 with deterministic and LLM-judged checks.", "Файл результатів запуску Promptfoo від 2026-08-24 з детермінованими перевірками та перевірками суддею LLM.", "Файл результатов запуска Promptfoo от 2026-08-24 с детерминированными проверками и проверками судьёй LLM."),
    limits: L("Grading by an LLM judge (openai:gpt-4.1); its human-review status and the rubric scale are not documented. Not a general quality or safety rating.", "Оцінювання суддею LLM (openai:gpt-4.1); статус перевірки людиною і шкала рубрики не задокументовані. Це не загальна оцінка якості чи безпеки.", "Оценка судьёй LLM (openai:gpt-4.1); статус проверки человеком и шкала рубрики не задокументированы. Это не общая оценка качества или безопасности."),
  },
  {
    id: "ev-qa-garak-report", type: "report", source: "https://github.com/alexprokh-asp/QA-LLM-Lab/blob/main/results/garak-results.report.jsonl", date: "2026-08-24", version: "2d01a448f6",
    provenance: "report", verification: "source-reviewed",
    title: L("QA-LLM-Lab Garak report (JSONL)", "Звіт Garak в QA-LLM-Lab (JSONL)", "Отчёт Garak в QA-LLM-Lab (JSONL)"),
    supports: L("Garak report of a run dated 2026-08-24 covering three probe families: jailbreak (DAN), prompt injection and bullying.", "Звіт Garak про запуск від 2026-08-24 за трьома родинами проб: jailbreak (DAN), prompt injection і булінг.", "Отчёт Garak о запуске от 2026-08-24 по трём семействам проб: jailbreak (DAN), prompt injection и буллинг."),
    limits: L("Scores are not interpreted here. Long prompts were truncated by the Telegram bridge. Attempts are not vulnerabilities.", "Оцінки тут не інтерпретуються. Довгі промпти обрізалися Telegram-мостом. Спроби — не вразливості.", "Оценки здесь не интерпретируются. Длинные промпты обрезались Telegram-мостом. Попытки — не уязвимости."),
  },
);

export const evidenceById = (id: string) => evidenceRecords.find((e) => e.id === id);
