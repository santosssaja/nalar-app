import { TopicLesson } from "@/types/topic";

export const realNumbersLesson: TopicLesson = {
  id: "math-real-numbers",
  slug: "math-real-numbers",
  title: "Operasi Bilangan Riil & Garis Bilangan",
  category: "math",
  summary:
    "Eksplorasi garis bilangan kontinu, translasi arah penjumlahan, dilatasi skala perkalian, dan bukti geometris hukum distributif.",
  audioNarrationText:
    "Selamat datang di modul Operasi Bilangan Riil. Di garis bilangan ini, penjumlahan adalah pergeseran posisi, dan perkalian adalah peregangan jarak.",
  initialVariables: {
    point1: 3,
    point2: -4,
    scaleFactor: 2,
    zoomLevel: 1,
  },
  challenges: [
    {
      id: "ch-real-1",
      title: "Translasi Titik 7",
      question: "Geser titik sehingga bernilai 7 melalui translasi dari titik 3.",
      targetCondition: (vars: Record<string, number>) => vars.point1 === 7,
      hintText: "Gunakan operasi translasi penjumlahan positif: 3 + 4 = 7.",
      successMessage: "Hebat! Titik berhasil digeser ke angka 7.",
      xpReward: 30,
    },
    {
      id: "ch-real-2",
      title: "Dilatasi Skala 6",
      question: "Lakukan dilatasi skala pada titik 3 sehingga posisinya menjadi 6.",
      targetCondition: (vars: Record<string, number>) => vars.point1 * vars.scaleFactor === 6,
      hintText: "Pilih faktor skala k = 2 sehingga 3 × 2 = 6.",
      successMessage: "Benar! Dilatasi skala 2 meregangkan jarak menjadi 6.",
      xpReward: 30,
    },
    {
      id: "ch-real-3",
      title: "Titik Tengah",
      question: "Temukan titik tengah antara -4 dan 6 pada garis bilangan.",
      targetCondition: (vars: Record<string, number>) => (vars.point2 + 6) / 2 === 1,
      hintText: "Rumus titik tengah adalah (a + b) / 2 = (-4 + 6) / 2 = 1.",
      successMessage: "Luar biasa! Titik tengah berada di 1.",
      xpReward: 40,
    },
  ],
};
