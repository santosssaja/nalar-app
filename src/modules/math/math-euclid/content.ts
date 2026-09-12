import { TopicLesson } from "@/types/topic";
import { computeEuclideanTiles } from "./engine";

export const euclidLesson: TopicLesson = {
  id: "math-euclid",
  slug: "math-euclid",
  title: "Algoritma Euclid & Pengubinan FPB",
  category: "math",
  summary:
    "Memvisualisasikan pencarian Faktor Persekutuan Terbesar (FPB) melalui pengubinan geometris persegi panjang dengan bujur sangkar terbesar secara rekursif.",
  audioNarrationText:
    "Algoritma Euclid bekerja seperti memotong lantai persegi panjang menjadi ubin-ubin bujur sangkar terbesar yang pas. Ukuran bujur sangkar terkecil yang akhirnya menutup seluruh sisa ruang tanpa celah adalah Faktor Persekutuan Terbesar dari kedua sisi tersebut.",
  initialVariables: {
    width: 84,
    height: 52,
  },
  challenges: [
    {
      id: "challenge-euclid-1",
      title: "Ubin Pertama",
      question:
        "Tantangan 1: Atur panjang dan lebar persegi panjang sehingga ukuran bujur sangkar pertama bernilai tepat 24.",
      targetCondition: (vars: Record<string, number>) => {
        return Math.min(vars.width, vars.height) === 24;
      },
      hintText:
        "Bujur sangkar terbesar yang pertama kali dapat diletakkan di dalam persegi panjang memiliki sisi yang sama dengan sisi terpendek persegi panjang tersebut.",
      successMessage: "Bagus sekali! Sisi terpendek 24 menjadi ukuran bujur sangkar pertama.",
      xpReward: 30,
    },
    {
      id: "challenge-euclid-2",
      title: "FPB Bernilai 12",
      question:
        "Tantangan 2: Temukan dua bilangan tidak sama (a ≠ b) yang menghasilkan FPB (ukuran ubin terkecil) bernilai tepat 12.",
      targetCondition: (vars: Record<string, number>) => {
        if (vars.width === vars.height) return false;
        const res = computeEuclideanTiles(vars.width, vars.height);
        return res.gcd === 12;
      },
      hintText:
        "Pilihlah dua bilangan yang keduanya merupakan kelipatan dari 12, misalnya 48 dan 36, atau 60 dan 24.",
      successMessage: "Tepat! Ubin terkecil yang menutup sisa ruangan memiliki ukuran sisi 12.",
      xpReward: 50,
    },
    {
      id: "challenge-euclid-3",
      title: "Uji Fibonacci Koprima",
      question:
        "Tantangan 3: Uji rasio emas Fibonacci! Atur persegi panjang 144 × 89 untuk membuktikan bahwa dua bilangan Fibonacci berurutan selalu memiliki FPB = 1 (koprima).",
      targetCondition: (vars: Record<string, number>) => {
        return (
          (vars.width === 144 && vars.height === 89) ||
          (vars.width === 89 && vars.height === 144)
        );
      },
      hintText:
        "Gunakan slider untuk mengatur lebar menjadi 144 dan tinggi menjadi 89. Perhatikan bagaimana setiap langkah hanya menghasilkan tepat satu bujur sangkar hingga selesai!",
      successMessage: "Hebat! Bilangan Fibonacci berurutan selalu menghasilkan FPB = 1.",
      xpReward: 75,
    },
  ],
};
