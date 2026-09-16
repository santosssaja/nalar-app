import { TopicModule } from "@/types/topic";
import { trigonometryLesson } from "./content";

export const trigonometryModule: TopicModule = {
  id: trigonometryLesson.id,
  slug: trigonometryLesson.slug,
  title: trigonometryLesson.title,
  category: "math",
  summary: trigonometryLesson.summary,
  audioNarrationText: trigonometryLesson.audioNarrationText,
  initialVariables: trigonometryLesson.initialVariables,
  levels: [
    {
      id: "level-1",
      index: 1,
      tier: 1,
      title: "Proyeksi Lingkaran Satuan",
      description: "Memahami proyeksi sinus (vertikal) dan kosinus (horizontal) pada lingkaran satuan.",
      steps: [
        {
          id: "step-1-1",
          type: "provoke",
          title: "Rotasi Menjadi Gelombang",
          naiExpression: "happy",
          naiDialogue: "Bagaimana titik yang berputar melingkar dapat menghasilkan gelombang naik turun yang harmonis?",
          provoke: {
            hookTitle: "Proyeksi Koordinat",
            hookText: "Setiap sudut θ pada lingkaran satuan menentukan koordinat (x, y) = (cos θ, sin θ).",
            interactiveComponentSlug: "math-trig-unit-circle",
            initialVariables: trigonometryLesson.initialVariables,
            question: "Berapa nilai sinus saat sudut berada di 90 derajat?",
            options: [
              { id: "opt-1", text: "sin(90°) = 1", responseText: "Tepat! Titik berada di puncak tertinggi lingkaran (0, 1)." },
              { id: "opt-2", text: "sin(90°) = 0", responseText: "0 adalah nilai kosinus pada 90°." },
              { id: "opt-3", text: "sin(90°) = 0.5", responseText: "0.5 adalah nilai sinus pada sudut 30°." },
            ],
          },
        },
        {
          id: "step-1-2",
          type: "challenge",
          title: "Tantangan Sudut Puncak",
          naiExpression: "neutral",
          naiDialogue: "Putar jarum sudut agar nilai sinus mencapai nilai maksimum.",
          challenge: {
            id: "ch-trig-1",
            title: "Capai Nilai Maksimum Sinus",
            question: trigonometryLesson.challenges[0].question,
            targetCondition: trigonometryLesson.challenges[0].targetCondition,
            hint1Static: "Nilai maksimum sinus terjadi di sumbu y positif teratas.",
            hint2Static: trigonometryLesson.challenges[0].hintText,
            solutionVariables: { angleDeg: 90 },
            solutionExplanation: "Pada sudut 90 derajat, titik berada di koordinat (0, 1), sehingga sin(90°) = 1.",
            xpReward: 35,
          },
        },
      ],
    },
  ],
};
