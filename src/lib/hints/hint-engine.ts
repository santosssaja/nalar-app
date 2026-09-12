import { HintRequest, HintResponse } from "./types";
import { getStaticHint } from "./hint-static";
import { fetchAIHint } from "./hint-ai";

export interface RequestHintParams {
  topicSlug: string;
  levelIndex: number;
  challengeId: string;
  challengeQuestion: string;
  userAttempts: { attemptNumber: number; canvasSnapshot: Record<string, number> }[];
  hintLevel: 1 | 2 | 3 | 4;
  hint2Static?: string;
  solutionVariables?: Record<string, number>;
  solutionExplanation?: string;
}

export async function requestProgressiveHint(
  params: RequestHintParams
): Promise<HintResponse> {
  const request: HintRequest = {
    topicSlug: params.topicSlug,
    levelIndex: params.levelIndex,
    challengeId: params.challengeId,
    challengeQuestion: params.challengeQuestion,
    userAttempts: params.userAttempts,
    hintLevel: params.hintLevel,
  };

  // Levels 1 & 2: 100% static rule-based (0 tokens)
  if (params.hintLevel === 1 || params.hintLevel === 2) {
    return getStaticHint(request, params.hint2Static);
  }

  // Levels 3 & 4: LLM API call with graceful mock degradation
  return fetchAIHint(
    request,
    params.solutionVariables,
    params.solutionExplanation
  );
}
