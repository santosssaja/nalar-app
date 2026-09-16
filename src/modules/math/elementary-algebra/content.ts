import { TopicLesson } from "@/types/topic";

export const elementaryAlgebraLesson: TopicLesson = {
  id: "math-elementary-algebra",
  slug: "math-elementary-algebra",
  title: "Aljabar Elementer",
  category: "math",
  summary:
    "Variabel sebagai kuantitas dinamis, prinsip timbangan kesetaraan, manipulasi pertidaksamaan, dan solusi sistem persamaan dua variabel.",
  audioNarrationText:
    "Selamat datang di modul Aljabar Elementer. Aljabar adalah seni mempertahankan kesetimbangan timbangan logika di saat kita mencari nilai variabel tak dikenal.",
  initialVariables: {
    a: 2,
    b: 4,
    c: 10,
    x: 3,
  },
  challenges: [
    {
      id: "ch-alg-1",
      title: "Setimbangkan 2x + 4 = 10",
      question: "Tentukan nilai x agar timbangan 2x + 4 = 10 berada dalam kesetimbangan sempurna.",
      targetCondition: (vars: Record<string, number>) => vars.x === 3,
      hintText: "Kurangkan kedua ruas dengan 4: 2x = 6, lalu bagi kedua ruas dengan 2: x = 3.",
      successMessage: "Timbangan setimbang! x = 3.",
      xpReward: 35,
    },
    {
      id: "ch-alg-2",
      title: "Setimbangkan 3x - 5 = 16",
      question: "Setimbangkan persamaan 3x - 5 = 16.",
      targetCondition: (vars: Record<string, number>) => vars.x === 7,
      hintText: "Tambahkan kedua ruas dengan 5: 3x = 21, kemudian bagi dengan 3: x = 7.",
      successMessage: "Benar! x = 7.",
      xpReward: 35,
    },
    {
      id: "ch-alg-3",
      title: "Titik Potong Dua Garis",
      question: "Temukan titik potong dari dua garis y = x + 1 dan y = -x + 5.",
      targetCondition: (vars: Record<string, number>) => vars.x === 2,
      hintText: "Samakan kedua persamaan: x + 1 = -x + 5 => 2x = 4 => x = 2.",
      successMessage: "Titik potong ditemukan di x = 2!",
      xpReward: 40,
    },
  ],
};
