import type { CaseData } from "./types";
import { documentProcessing } from "./document-processing";
import { voiceToTicket } from "./voice-to-ticket";
import { localLlmBenchmark } from "./local-llm-benchmark";
import { llmEvaluation } from "./llm-evaluation";
import { localTranscription } from "./local-transcription";
import { calendarAssistant } from "./calendar-assistant";
import { jiraReporting } from "./jira-reporting";

/** Facts read from the owner's repositories (README, configs, result files). Keyed by project id. */
export const caseData: Record<string, CaseData> = {
  "document-processing": documentProcessing,
  "voice-to-ticket": voiceToTicket,
  "local-llm-benchmark": localLlmBenchmark,
  "llm-evaluation": llmEvaluation,
  "local-transcription": localTranscription,
  "calendar-assistant": calendarAssistant,
  "jira-reporting": jiraReporting,
};
