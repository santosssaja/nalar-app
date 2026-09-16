import { TopicModule } from "@/types/topic";
import { siUnitsLesson } from "./content";

export const siUnitsModule: TopicModule = {
  id: siUnitsLesson.id,
  slug: siUnitsLesson.slug,
  title: siUnitsLesson.title,
  category: "science",
  summary: siUnitsLesson.summary,
  audioNarrationText: siUnitsLesson.audioNarrationText,
  initialVariables: siUnitsLesson.initialVariables,
  levels: [
    {
      id: "level-1",
      index: 1,
      tier: 1,
      title: "Standarisasi Pengukuran & Dimensi",
      description: "Memahami sistem metrik internasional dan aturan homogenitas dimensi.",
      steps: [
        {
          id: "step-1-1",
          type: "provoke",
          title: "Pentingnya Standar Satuan",
          naiExpression: "happy",
          naiDialogue: "Mengapa para ilmuwan di seluruh dunia sepakat menggunakan sistem satuan internasional yang seragam?",
          provoke: {
            hookTitle: "Bahasa Pengukuran Global",
            hookText: "Satu meter di Paris harus sama persis dengan satu meter di Jakarta dan Tokyo agar eksperimen sains dapat direproduksi.",
            interactiveComponentSlug: "science-si-units",
            initialVariables: siUnitsLesson.initialVariables,
            question: "Berapa kilometer jarak tempuh 1500 meter?",
            options: [
              { id: "opt-1", text: "1.5 km", responseText: "Tepat sekali! 1500 / 1000 = 1.5 km." },
              { id: "opt-2", text: "15 km", responseText: "15 km sama dengan 15000 meter." },
              { id: "opt-3", text: "0.15 km", responseText: "0.15 km adalah 150 meter." },
            ],
          },
        },
        {
          id: "step-1-2",
          type: "challenge",
          title: "Tantangan Konversi Satuan",
          naiExpression: "neutral",
          naiDialogue: "Lakukan konversi satuan panjang ke kilometer.",
          challenge: {
            id: "ch-si-1",
            title: "Konversi ke Kilometer",
            question: siUnitsLesson.challenges[0].question,
            targetCondition: siUnitsLesson.challenges[0].targetCondition,
            hint1Static: "Ingat awalan kilo artinya 1000.",
            hint2Static: siUnitsLesson.challenges[0].hintText,
            solutionVariables: { lengthMeters: 1500 },
            solutionExplanation: "1500 meter setara dengan 1.5 kilometer.",
            xpReward: 30,
          },
        },
      ],
    },
  ],
};
