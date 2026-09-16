import { TopicLesson } from "@/types/topic";
import { computeTangentMetrics } from "./engine";

export const tangentLesson: TopicLesson = {
  id: "math-calculus-tangent",
  slug: "math-calculus-tangent",
  title: "Garis Singgung & Turunan Kalkulus",
  category: "math",
  summary:
    "Memahami konsep turunan sebagai limit kemiringan garis sekan yang merapat menjadi garis singgung ketika jarak dua titik mendekati nol.",
  audioNarrationText:
    "Garis singgung adalah batas dari garis sekan saat dua titik didekatkan hingga berhimpit. Kemiringan garis singgung tersebut merepresentasikan laju perubahan sesaat atau turunan fungsi di titik tersebut.",
  initialVariables: {
    a: 1.0,
    deltaX: 1.0,
  },
  challenges: [
    {
      id: "challenge-tangent-1",
      title: "Mencari Kemiringan 4 pada Parabola",
      question:
        "Tantangan 1: Pada fungsi f(x) = x², geser posisi titik a sehingga kemiringan garis singgung f'(a) bernilai tepat 4.",
      targetCondition: (vars: Record<string, number>) => {
        return Math.abs(vars.a - 2.0) <= 0.1;
      },
      hintText:
        "Turunan dari f(x) = x² adalah f'(x) = 2x. Untuk menghasilkan kemiringan 4, berapakah nilai x yang memenuhi 2x = 4?",
      successMessage: "Tepat sekali! Pada a = 2, kemiringan garis singgung f'(2) = 2(2) = 4.",
      xpReward: 30,
    },
    {
      id: "challenge-tangent-2",
      title: "Titik Ekstrem Garis Singgung Mendatar",
      question:
        "Tantangan 2: Pada fungsi kubik f(x) = x³ - 3x, temukan titik stasioner di mana garis singgung mendatar sempurna (kemiringan f'(a) = 0).",
      targetCondition: (vars: Record<string, number>) => {
        const metrics = computeTangentMetrics("x3_minus_3x", vars.a, vars.deltaX || 0.1);
        return Math.abs(metrics.tangentSlope) <= 0.1;
      },
      hintText:
        "Turunan f'(x) = 3x² - 3 bernilai nol saat 3x² = 3, yaitu pada x = 1 (lembah lokal) atau x = -1 (puncak lokal).",
      successMessage: "Luar biasa! Pada titik ekstrem f'(x) = 0, garis singgung berada dalam posisi horizontal.",
      xpReward: 60,
    },
    {
      id: "challenge-tangent-3",
      title: "Konvergensi Limit Garis Sekan",
      question:
        "Tantangan 3: Perkecil jarak Δx hingga garis sekan menyatu dengan garis singgung (Δx ≤ 0.05, error kemiringan < 0.05).",
      targetCondition: (vars: Record<string, number>) => {
        return Math.abs(vars.deltaX) <= 0.05;
      },
      hintText:
        "Tarik slider Δx mendekati nol atau gunakan tombol animasi limit untuk melihat garis sekan berimpit dengan garis tangen.",
      successMessage: "Sempurna! Konvergensi tercapai, garis sekan bertransformasi menjadi garis singgung sesaat.",
      xpReward: 100,
    },
  ],
};
