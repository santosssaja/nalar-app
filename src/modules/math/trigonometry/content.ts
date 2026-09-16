import { TopicLesson } from "@/types/topic";

export const trigonometryLesson: TopicLesson = {
  id: "math-trig-unit-circle",
  slug: "math-trig-unit-circle",
  title: "Trigonometri & Lingkaran Satuan",
  category: "math",
  summary:
    "Rasio trigonometri sinus dan kosinus pada lingkaran satuan r = 1, koordinat polar, identitas Pythagoras, dan dekomposisi vektor 2D.",
  audioNarrationText:
    "Selamat datang di modul Trigonometri Lingkaran Satuan. Titik yang berputar di keliling lingkaran satuan menghasilkan nilai sinus pada sumbu vertikal dan kosinus pada sumbu horizontal.",
  initialVariables: {
    angleDeg: 45,
    radius: 1,
  },
  challenges: [
    {
      id: "ch-trig-1",
      title: "Sudut Puncak 90 Derajat",
      question: "Putar sudut hingga proyeksi vertikal (sinus) bernilai tepat 1.",
      targetCondition: (vars: Record<string, number>) => vars.angleDeg === 90,
      hintText: "Pada sudut 90 derajat (π/2 radian), titik berada tepat di puncak lingkaran (0, 1).",
      successMessage: "Nilai sinus maksimum 1 tercapai pada 90°!",
      xpReward: 35,
    },
    {
      id: "ch-trig-2",
      title: "Sudut Simetris 45 Derajat",
      question: "Tentukan sudut di mana nilai kosinus dan sinus bernilai sama besar di kuadran I.",
      targetCondition: (vars: Record<string, number>) => vars.angleDeg === 45,
      hintText: "Pada sudut 45 derajat, sin(45°) = cos(45°) = √2 / 2 ≈ 0.707.",
      successMessage: "Benar! Pada 45°, sinus dan kosinus tepat bernilai sama.",
      xpReward: 35,
    },
    {
      id: "ch-trig-3",
      title: "Dekomposisi Vektor 30 Derajat",
      question: "Uraikan vektor kecepatan 10 m/s pada sudut 30° ke arah horizontal.",
      targetCondition: (vars: Record<string, number>) => Math.abs(10 * Math.cos((30 * Math.PI) / 180) - 8.66) < 0.1,
      hintText: "Komponen horizontal vx = v * cos(30°) = 10 * 0.866 = 8.66 m/s.",
      successMessage: "vx = 8.66 m/s berhasil diuraikan!",
      xpReward: 40,
    },
  ],
};
