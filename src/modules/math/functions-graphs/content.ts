import { TopicLesson } from "@/types/topic";

export const functionsGraphsLesson: TopicLesson = {
  id: "math-functions-graphs",
  slug: "math-functions-graphs",
  title: "Fungsi & Grafik",
  category: "math",
  summary:
    "Konsep pemetaan fungsi input-output, transformasi grafik af(x - h) + k, serta laju perubahan rata-rata sebagai kemiringan kurva.",
  audioNarrationText:
    "Selamat datang di modul Fungsi & Grafik. Fungsi memetakan setiap input ke tepat satu output, dan grafiknya melukiskan perjalanan perubahan nilai tersebut.",
  initialVariables: {
    a: 1,
    h: 0,
    k: 0,
    xInput: 2,
  },
  challenges: [
    {
      id: "ch-func-1",
      title: "Translasi Parabola h=3, k=2",
      question: "Geser kurva parabola y = x² sebanyak 3 satuan ke kanan dan 2 satuan ke atas.",
      targetCondition: (vars: Record<string, number>) => vars.h === 3 && vars.k === 2,
      hintText: "Transformasi translasi grafik: y = a(x - h)² + k dengan h = 3 dan k = 2.",
      successMessage: "Kurva parabola berhasil digeser ke (3, 2)!",
      xpReward: 35,
    },
    {
      id: "ch-func-2",
      title: "Kemiringan Garis",
      question: "Buat kemiringan grafik linear y = mx + c menjadi 3 dengan perpotongan sumbu-y di (0, -2).",
      targetCondition: (vars: Record<string, number>) => vars.a === 3 && vars.k === -2,
      hintText: "Ubah gradien kemiringan a = 3 dan konstanta vertikal k = -2.",
      successMessage: "Kemiringan garis berhasil diatur!",
      xpReward: 35,
    },
    {
      id: "ch-func-3",
      title: "Evaluasi Nilai Fungsi",
      question: "Tentukan nilai f(4) jika f(x) = 2x - 3.",
      targetCondition: (vars: Record<string, number>) => 2 * 4 - 3 === 5,
      hintText: "Substitusikan x = 4 ke dalam rumus: f(4) = 2(4) - 3 = 8 - 3 = 5.",
      successMessage: "Benar! f(4) = 5.",
      xpReward: 40,
    },
  ],
};
