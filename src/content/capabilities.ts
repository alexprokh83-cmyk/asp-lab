/** Capability maturity — separate from editorial status. "Confirmed by projects" ≠ deployed for customers. */
import { L, type Maturity, type Localized } from "./types";

export interface Capability { id: string; maturity: Maturity; label: Localized<string>; projectIds: string[] }

export const capabilities: Capability[] = [
  { id: "workflow-automation", maturity: "confirmed", label: L("AI workflow automation", "Автоматизація процесів з AI", "Автоматизация процессов с AI"), projectIds: ["jira-bug-summary", "calendar-ai-chronos", "voice-bug-report", "jira-to-github-migration", "telegram-secretary"] },
  { id: "document-processing", maturity: "confirmed", label: L("Document processing", "Обробка документів", "Обработка документов"), projectIds: ["local-transcription", "youtube-to-text"] },
  { id: "local-transcription", maturity: "confirmed", label: L("Local transcription", "Локальна транскрипція", "Локальная транскрипция"), projectIds: ["local-transcription"] },
  { id: "local-llm-experiments", maturity: "confirmed", label: L("Local LLM experimentation", "Експерименти з локальними LLM", "Эксперименты с локальными LLM"), projectIds: ["auto-llm-benchmark"] },
  { id: "model-comparison", maturity: "confirmed", label: L("Model comparison", "Порівняння моделей", "Сравнение моделей"), projectIds: ["auto-llm-benchmark"] },
  { id: "ai-evaluation", maturity: "confirmed", label: L("AI evaluation", "Оцінювання AI", "Оценка AI"), projectIds: ["qa-llm-lab"] },
  { id: "api-ai-tools", maturity: "confirmed", label: L("API-based AI tools", "AI-інструменти на базі API", "AI-инструменты на базе API"), projectIds: [] },
  { id: "rag", maturity: "developing", label: L("Retrieval / RAG", "Retrieval / RAG", "Retrieval / RAG"), projectIds: [] },
  { id: "inference-optimization", maturity: "developing", label: L("Systematic inference optimization", "Системна оптимізація інференсу", "Системная оптимизация инференса"), projectIds: [] },
  { id: "specialized-datasets", maturity: "developing", label: L("Specialized datasets", "Спеціалізовані датасети", "Специализированные датасеты"), projectIds: [] },
  { id: "domain-adaptation", maturity: "developing", label: L("Domain adaptation", "Доменна адаптація", "Доменная адаптация"), projectIds: [] },
  { id: "lora-qlora", maturity: "planned", label: L("LoRA / QLoRA fine-tuning", "LoRA / QLoRA fine-tuning", "LoRA / QLoRA fine-tuning"), projectIds: [] },
  { id: "production-local-deployment", maturity: "planned", label: L("Production local model deployment", "Продуктивне розгортання локальних моделей", "Продуктивное развёртывание локальных моделей"), projectIds: [] },
  { id: "private-ai-infrastructure", maturity: "planned", label: L("Dedicated Private AI infrastructure", "Окрема інфраструктура Private AI", "Отдельная инфраструктура Private AI"), projectIds: [] },
  { id: "local-model-api", maturity: "planned", label: L("Supported local model API", "Підтримуваний API локальних моделей", "Поддерживаемый API локальных моделей"), projectIds: [] },
];
