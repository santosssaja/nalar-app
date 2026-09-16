import { TopicModule } from "@/types/topic";
import { elementaryAlgebraLesson } from "./content";

export const elementaryAlgebraModule: TopicModule = {
  id: elementaryAlgebraLesson.id,
  slug: elementaryAlgebraLesson.slug,
  title: elementaryAlgebraLesson.title,
  category: "math",
  summary: elementaryAlgebraLesson.summary,
  audioNarrationText: elementaryAlgebraLesson.audioNarrationText,
  initialVariables: elementaryAlgebraLesson.initialVariables,
  levels: [
    {
      id: "level-1",
      index: 1,
      tier: 1,
      title: "Timbangan Kesetaraan Aljabar",
      description: "Mempertahankan kesetimbangan kedua ruas untuk menemukan nilai variabel tersembunyi.",
      steps: [
        {
          id: "step-1-1",
          type: "provoke",
          title: "Prinsip Timbangan",
          naiExpression: "happy",
          naiDialogue: "Bagaimana cara mengetahui berat beban misterius x tanpa membuka kotaknya?",
          provoke: {
            hookTitle: "Kesetaraan Simetris",
            hookText: "Jika dua sisi timbangan setimbang, menambahkan atau mengurangi beban yang sama di kedua sisi tidak akan mengubah kesetimbangan.",
            interactiveComponentSlug: "math-elementary-algebra",
            initialVariables: elementaryAlgebraLesson.initialVariables,
            question: "Jika 2x + 4 = 10, berapa nilai x?",
            options: [
              { id: "opt-1", text: "x = 3", responseText: "Benar sekali! 2(3) + 4 = 10." },
              { id: "opt-2", text: "x = 2", responseText: "2(2) + 4 = 8, timbangan masih belum seimbang." },
              { id: "opt-3", text: "x = 4", responseText: "2(4) + 4 = 12, timbangan akan condong ke kiri." },
            ],
          },
        },
        {
          id: "step-1-2",
          type: "challenge",
          title: "Tantangan Kesetimbangan",
          naiExpression: "neutral",
          naiDialogue: "Cari nilai variabel x yang tepat untuk menyeimbangkan timbangan.",
          challenge: {
            id: "ch-alg-1",
            title: "Setimbangkan Timbangan",
            question: elementaryAlgebraLesson.challenges[0].question,
            targetCondition: elementaryAlgebraLesson.challenges[0].targetCondition,
            hint1Static: "Perhatikan konstanta 4 di sisi kiri.",
            hint2Static: elementaryAlgebraLesson.challenges[0].hintText,
            solutionVariables: { x: 3 },
            solutionExplanation: "2x + 4 = 10 => 2x = 6 => x = 3.",
            xpReward: 35,
          },
        },
      ],
    },
  ],
};
