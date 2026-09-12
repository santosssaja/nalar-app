import { HintRequest, HintResponse } from "./types";

export function getStaticHint(request: HintRequest, hint2CustomText?: string): HintResponse {
  if (request.hintLevel === 1) {
    return {
      hintLevel: 1,
      naiMood: "encouraging",
      title: "Hint 1: Dorongan Semangat",
      text: "Hmm, jawabanmu belum tepat. Tapi jangan khawatir! Amati kembali bagaimana parameter pada kanvas memengaruhi hasil perhitungan.",
      source: "static",
    };
  }

  // Hint 2: Directional pointer
  return {
    hintLevel: 2,
    naiMood: "thinking",
    title: "Hint 2: Arahan Ringan",
    text:
      hint2CustomText ||
      "Coba fokus pada hubungan sebab-akibat nilai masukan dengan formula. Adakah variabel yang nilainya bisa didekatkan ke target?",
    source: "static",
  };
}
