import { TopicModule } from "@/types/topic";
import { realNumbersLesson } from "./content";

export const realNumbersModule: TopicModule = {
  id: realNumbersLesson.id,
  slug: realNumbersLesson.slug,
  title: realNumbersLesson.title,
  category: "math",
  summary: realNumbersLesson.summary,
  audioNarrationText: realNumbersLesson.audioNarrationText,
  initialVariables: realNumbersLesson.initialVariables,
  levels: [
    {
      id: "level-1",
      index: 1,
      tier: 1,
      title: "Garis Bilangan & Translasi",
      description: "Memahami posisi bilangan riil dan translasi penjumlahan pada garis kontinu.",
      steps: [
        {
          id: "step-1-1",
          type: "provoke",
          title: "Fenomena Kontinum",
          naiExpression: "happy",
          naiDialogue: "Bagaimana jika semua bilangan bulat, pecahan, dan desimal kita letakkan di satu garis tak hingga?",
          provoke: {
            hookTitle: "Translasi Arah Spasial",
            hookText: "Di garis bilangan, operasi penjumlahan a + b identik dengan melangkahkan titik a sejauh b satuan ke kanan.",
            interactiveComponentSlug: "math-real-numbers",
            initialVariables: realNumbersLesson.initialVariables,
            question: "Jika titik berada di 3 dan digeser 4 satuan ke kiri, di manakah titik berhenti?",
            options: [
              { id: "opt-1", text: "-1", responseText: "Tepat sekali! 3 + (-4) = -1." },
              { id: "opt-2", text: "7", responseText: "Ingat, ke kiri berarti nilai berkurang." },
              { id: "opt-3", text: "1", responseText: "Coba periksa kembali selisihnya." },
            ],
          },
        },
        {
          id: "step-1-2",
          type: "challenge",
          title: "Tantangan Translasi",
          naiExpression: "neutral",
          naiDialogue: "Arahkan titik ke target yang ditentukan!",
          challenge: {
            id: "ch-real-1",
            title: "Translasi Titik",
            question: realNumbersLesson.challenges[0].question,
            targetCondition: realNumbersLesson.challenges[0].targetCondition,
            hint1Static: "Perhatikan titik awal berada di angka 3.",
            hint2Static: realNumbersLesson.challenges[0].hintText,
            solutionVariables: { point1: 7 },
            solutionExplanation: "Titik berpindah dari 3 ke 7 dengan menambahkan +4 satuan ke kanan.",
            xpReward: 30,
          },
        },
      ],
    },
  ],
};
