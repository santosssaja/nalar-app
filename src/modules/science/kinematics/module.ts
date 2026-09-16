import { TopicModule } from "@/types/topic";
import { kinematicsLesson } from "./content";

export const kinematicsModule: TopicModule = {
  id: kinematicsLesson.id,
  slug: kinematicsLesson.slug,
  title: kinematicsLesson.title,
  category: "science",
  summary: kinematicsLesson.summary,
  audioNarrationText: kinematicsLesson.audioNarrationText,
  initialVariables: kinematicsLesson.initialVariables,
  levels: [
    {
      id: "level-1",
      index: 1,
      tier: 1,
      title: "Gerak Lurus Berubah Beraturan (GLBB)",
      description: "Memahami hubungan kecepatan, waktu, dan percepatan konstan pada gerak lurus.",
      steps: [
        {
          id: "step-1-1",
          type: "provoke",
          title: "Prediksi Gerak Fisis",
          naiExpression: "happy",
          naiDialogue: "Jika sebuah mobil terus menerus dipercepat, bagaimana bentuk kurva posisi terhadap waktu?",
          provoke: {
            hookTitle: "Dari Nol ke Cepat",
            hookText: "Mobil yang mengalami percepatan konstan tidak menempuh jarak yang sama setiap detiknya. Jarak yang ditempuh bertambah secara kuadratis seiring waktu.",
            interactiveComponentSlug: "science-kinematics",
            initialVariables: kinematicsLesson.initialVariables,
            question: "Jika percepatan adalah 2 m/s², berapa kecepatan mobil setelah 5 detik dari keadaan diam?",
            options: [
              { id: "opt-1", text: "10 m/s", responseText: "Tepat sekali! v = 0 + 2(5) = 10 m/s." },
              { id: "opt-2", text: "5 m/s", responseText: "5 m/s adalah durasi waktu, bukan kecepatan." },
              { id: "opt-3", text: "25 m/s", responseText: "25 meter adalah jaraknya, bukan kelajuannya." },
            ],
          },
        },
        {
          id: "step-1-2",
          type: "challenge",
          title: "Tantangan GLBB",
          naiExpression: "neutral",
          naiDialogue: "Hitung kecepatan akhir objek setelah bergerak selama 5 detik.",
          challenge: {
            id: "ch-kin-1",
            title: "Kecepatan Akhir",
            question: kinematicsLesson.challenges[0].question,
            targetCondition: kinematicsLesson.challenges[0].targetCondition,
            hint1Static: "Ingat rumus kecepatan GLBB: v = v₀ + at.",
            hint2Static: kinematicsLesson.challenges[0].hintText,
            solutionVariables: { a: 2 },
            solutionExplanation: "v = 0 + 2 * 5 = 10 m/s.",
            xpReward: 40,
          },
        },
      ],
    },
  ],
};
