import { HintRequest, HintResponse } from "./types";
import { getMockHint } from "./hint-mock";

export async function fetchAIHint(
  request: HintRequest,
  solutionVariables?: Record<string, number>,
  solutionExplanation?: string
): Promise<HintResponse> {
  // If running in SSR or unit tests without DOM origin, immediately fallback to mock
  if (typeof window === "undefined") {
    return getMockHint(request, solutionVariables, solutionExplanation);
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout

    const response = await fetch("/api/hints", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data && data.text) {
        return {
          hintLevel: request.hintLevel,
          naiMood: request.hintLevel === 4 ? "teaching" : "hinting",
          title: data.title || (request.hintLevel === 4 ? "Solusi Lengkap" : "Petunjuk AI"),
          text: data.text,
          targetVariables: data.targetVariables || solutionVariables,
          isAutoSolved: request.hintLevel === 4,
          source: "ai",
        };
      }
    }
  } catch (error) {
    console.warn("[HintAI] API call failed or timed out. Falling back to local mock:", error);
  }

  // Graceful degradation fallback to local mock
  return getMockHint(request, solutionVariables, solutionExplanation);
}
