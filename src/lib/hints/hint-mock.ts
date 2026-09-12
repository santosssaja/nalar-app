import { HintRequest, HintResponse } from "./types";

export function getMockHint(
  request: HintRequest,
  solutionVariables?: Record<string, number>,
  solutionExplanation?: string
): HintResponse {
  if (request.hintLevel === 3) {
    return {
      hintLevel: 3,
      naiMood: "hinting",
      title: "Hint 3: Petunjuk Langkah Nyata",
      text:
        "Nai melihat nilaimu saat ini. Konsep kuncinya: perhatikan rumus pembatas. Kamu perlu mengatur parameter agar nilai variabel memenuhi kesetaraan yang diminta pada soal secara tepat.",
      source: "mock",
    };
  }

  // Hint 4: Complete Answer & Auto-movement
  return {
    hintLevel: 4,
    naiMood: "teaching",
    title: "Hint 4: Jawaban Lengkap & Posisi Solusi",
    text:
      solutionExplanation ||
      "Inilah solusi lengkapnya! Nai telah memindahkan posisi parameter kanvas ke jawaban yang benar agar kamu dapat mengamati visualisasinya secara langsung.",
    targetVariables: solutionVariables,
    isAutoSolved: !!solutionVariables,
    source: "mock",
  };
}
