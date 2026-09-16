import { TopicModule } from "@/types/topic";
import { functionsGraphsLesson } from "./content";

export const functionsGraphsModule: TopicModule = {
  id: functionsGraphsLesson.id,
  slug: functionsGraphsLesson.slug,
  title: functionsGraphsLesson.title,
  category: "math",
  summary: functionsGraphsLesson.summary,
  audioNarrationText: functionsGraphsLesson.audioNarrationText,
  initialVariables: functionsGraphsLesson.initialVariables,
  levels: [
    {
      id: "level-1",
      index: 1,
      tier: 1,
      title: "Transformasi Kurva Grafik",
      description: "Memahami pergeseran horizontal, vertikal, dan dilatasi skala fungsi.",
      steps: [
        {
          id: "step-1-1",
          type: "provoke",
          title: "Mesin Pemetaan",
          naiExpression: "happy",
          naiDialogue: "Bagaimana mengubah bentuk kurva tanpa harus menggambar ulang titik demi titik?",
          provoke: {
            hookTitle: "Pergeseran Kurva",
            hookText: "Mengubah rumus f(x) menjadi f(x - h) + k menggeser seluruh kurva secara serempak di bidang kartesius.",
            interactiveComponentSlug: "math-functions-graphs",
            initialVariables: functionsGraphsLesson.initialVariables,
            question: "Jika f(x) = x², rumus fungsi manakah yang menggeser grafik 3 satuan ke kanan?",
            options: [
              { id: "opt-1", text: "f(x) = (x - 3)²", responseText: "Benar! Pergeseran ke kanan menggunakan (x - h) dengan h positif." },
              { id: "opt-2", text: "f(x) = (x + 3)²", responseText: "(x + 3)² akan menggeser ke kiri." },
              { id: "opt-3", text: "f(x) = x² + 3", responseText: "x² + 3 menggeser grafik ke atas, bukan ke kanan." },
            ],
          },
        },
        {
          id: "step-1-2",
          type: "challenge",
          title: "Tantangan Transformasi",
          naiExpression: "neutral",
          naiDialogue: "Ubah parameter h dan k agar grafik tepat bergeser ke koordinat target.",
          challenge: {
            id: "ch-func-1",
            title: "Translasi Parabola",
            question: functionsGraphsLesson.challenges[0].question,
            targetCondition: functionsGraphsLesson.challenges[0].targetCondition,
            hint1Static: "Atur slider h ke angka 3.",
            hint2Static: functionsGraphsLesson.challenges[0].hintText,
            solutionVariables: { h: 3, k: 2 },
            solutionExplanation: "Grafik digeser dengan menetapkan h = 3 dan k = 2.",
            xpReward: 35,
          },
        },
      ],
    },
  ],
};
