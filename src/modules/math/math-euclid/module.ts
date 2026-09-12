import { TopicModule } from "@/types/topic";
import { computeEuclideanTiles } from "./engine";

export const euclidModule: TopicModule = {
  id: "math-euclid",
  slug: "math-euclid",
  title: "Algoritma Euclid & Pengubinan FPB",
  category: "math",
  summary:
    "Memvisualisasikan pencarian Faktor Persekutuan Terbesar (FPB) melalui pengubinan geometris persegi panjang dengan bujur sangkar terbesar secara rekursif.",
  audioNarrationText:
    "Selamat datang di modul Algoritma Euclid. Kamu akan mempelajari bagaimana pembagian bersisa dapat divisualisasikan sebagai pengubinan lantai geometris.",
  initialVariables: {
    width: 84,
    height: 52,
  },
  levels: [
    {
      id: "euclid-level-1",
      index: 1,
      tier: 1,
      title: "Konsep Dasar Pengubinan Bujur Sangkar",
      description: "Memahami bilangan bulat sebagai dimensi persegi panjang yang dipartisi bujur sangkar.",
      steps: [
        {
          id: "e1-step-1",
          type: "explanation",
          title: "Analogi Memasang Ubin Lantai",
          explanation: {
            title: "Bagaimana Mencari Ubin Terbesar yang Pas?",
            conceptText:
              "Bayangkan kamu memiliki lantai berukuran 84 × 52 meter dan ingin menutupinya seluruhnya dengan ubin bujur sangkar terbesar yang seragam tanpa perlu memotong ubin.",
            analogyText:
              "Kita mulai dengan memasang bujur sangkar terbesar yang muat: satu bujur sangkar 52 × 52. Sisanya adalah lantai berukuran 32 × 52. Proses ini diulangi terus hingga tidak ada sisa celah!",
            keyFormulas: [
              "a = q_1 \\times b + r_1",
              "\\gcd(a, b) = \\gcd(b, a \\pmod b)",
            ],
            audioNarrationText:
              "Bujur sangkar terbesar yang pertama kali muat selalu memiliki panjang sisi yang sama dengan sisi terpendek persegi panjang.",
          },
        },
        {
          id: "e1-step-2",
          type: "playground",
          title: "Eksplorasi Bujur Sangkar Pertama",
          playground: {
            title: "Simulasi Pengubinan Euclid Interaktif",
            instructions: "Geser sisi A dan B, lalu amati ukuran ubin bujur sangkar pertama yang diletakkan.",
            interactiveComponentSlug: "math-euclid",
            initialVariables: { width: 84, height: 52 },
          },
        },
        {
          id: "e1-step-3",
          type: "challenge",
          title: "Misi: Ubin Pertama Berukuran 24",
          challenge: {
            id: "challenge-euclid-1",
            title: "Sisi Terpendek sebagai Ubin Pertama",
            question: "Atur dimensi persegi panjang sehingga bujur sangkar pertama berukuran tepat 24 × 24.",
            targetCondition: (vars: Record<string, number>) => {
              return Math.min(vars.width, vars.height) === 24;
            },
            hint1Static: "Perhatikan bahwa ubin bujur sangkar pertama selalu memiliki sisi sama dengan sisi terpendek.",
            hint2Static: "Ubah salah satu sisi (lebar atau tinggi) ke nilai 24.",
            solutionVariables: { width: 24, height: 60 },
            solutionExplanation: "Dengan sisi terpendek bernilai 24, bujur sangkar pertama yang terbentuk berukuran 24 × 24.",
            xpReward: 30,
          },
        },
        {
          id: "e1-step-4",
          type: "validation",
          title: "Pemahaman Tuntas: Ubin Pertama",
          validation: {
            title: "Ubin Pertama Berhasil Dipasang",
            summaryText:
              "Algoritma pembagian Euclid a = q · b + r secara geometris berarti memasang q buah bujur sangkar b × b, menyisakan persegi panjang baru b × r.",
            keyTakeaway: "Bujur sangkar terbesar pertama selalu berukuran min(a, b).",
            formulaKaTeX: "\\text{Ubin}_1 = \\min(a, b) \\times \\min(a, b)",
            badgeToUnlock: "first-step",
          },
        },
      ],
    },
    {
      id: "euclid-level-2",
      index: 2,
      tier: 2,
      title: "Rantai Sisa Bagi & FPB Terbesar",
      description: "Menemukan ukuran bujur sangkar terkecil yang menutup sisa ruangan tanpa celah.",
      steps: [
        {
          id: "e2-step-1",
          type: "explanation",
          title: "Mengapa Sisanya Berkurang Terus?",
          explanation: {
            title: "Prinsip Penurunan Sisa Bagi",
            conceptText:
              "Setiap kali kita memotong bujur sangkar dari persegi panjang sisa, sisa ruangan yang tersisa selalu memiliki luas lebih kecil dari sebelumnya ($r_i < b_i$).",
            analogyText:
              "Karena bilangan bulat positif tidak dapat mengecil selamanya, proses ini dijamin akan berhenti pada sisa nol. Ukuran ubin saat sisa bernilai nol adalah FPB dari kedua bilangan mula-mula.",
            keyFormulas: [
              "\\gcd(a, b) = \\gcd(b, r)",
              "r = a - q \\times b",
            ],
            audioNarrationText:
              "Karena sisa selalu lebih kecil dari pembagi, proses pengubinan pasti akan berakhir pada sisa nol.",
          },
        },
        {
          id: "e2-step-2",
          type: "playground",
          title: "Uji Pasangan Bilangan",
          playground: {
            title: "Laboratorium Pengubinan Sisa Bagi",
            instructions: "Pilih pasangan bilangan yang saling membagi untuk melihat proses selesai cepat.",
            interactiveComponentSlug: "math-euclid",
            initialVariables: { width: 60, height: 24 },
          },
        },
        {
          id: "e2-step-3",
          type: "challenge",
          title: "Misi: Hasilkan FPB = 12",
          challenge: {
            id: "challenge-euclid-2",
            title: "Menemukan Pasangan Ber-FPB 12",
            question: "Temukan pasangan bilangan tidak sama (a ≠ b) yang menghasilkan FPB (ubin terkecil) tepat 12.",
            targetCondition: (vars: Record<string, number>) => {
              if (vars.width === vars.height) return false;
              const res = computeEuclideanTiles(vars.width, vars.height);
              return res.gcd === 12;
            },
            hint1Static: "FPB 12 berarti kedua bilangan harus merupakan kelipatan dari 12.",
            hint2Static: "Cobalah kombinasi seperti 48 dan 36, atau 60 dan 24.",
            solutionVariables: { width: 48, height: 36 },
            solutionExplanation: "48 = 1 × 36 + 12, lalu 36 = 3 × 12 + 0. Sisa non-nol terakhir adalah 12.",
            xpReward: 60,
          },
        },
        {
          id: "e2-step-4",
          type: "validation",
          title: "Pemahaman Tuntas: Rantai Pembagian",
          validation: {
            title: "Hebat! Rantai FPB Dikuasai",
            summaryText:
              "Algoritma Euclid adalah salah satu algoritma tertua di dunia yang sangat efisien dengan kompleksitas logaritmik O(log(min(a, b))).",
            keyTakeaway: "FPB dari dua bilangan sama dengan sisa pembagian non-nol terakhir.",
            formulaKaTeX: "\\gcd(a, b) = r_{\\text{terakhir}}",
          },
        },
      ],
    },
    {
      id: "euclid-level-3",
      index: 3,
      tier: 3,
      title: "Rasio Emas & Bilangan Fibonacci",
      description: "Menganalisis kasus terburuk algoritma Euclid melalui pasangan bilangan Fibonacci berurutan.",
      steps: [
        {
          id: "e3-step-1",
          type: "explanation",
          title: "Teorema Lamé & Barisan Fibonacci",
          explanation: {
            title: "Pasangan Bilangan Paling Lambat Selesai",
            conceptText:
              "Dua bilangan Fibonacci berurutan Fn dan Fn-1 (seperti 144 dan 89) membutuhkan jumlah langkah terbanyak karena hasil bagi selalu qi = 1 di setiap langkah!",
            analogyText:
              "Setiap kali ubin diletakkan, hanya muat tepat 1 buah bujur sangkar, menciptakan spiral pengubinan rasio emas φ ≈ 1.618. Mereka selalu saling prima (FPB = 1).",
            keyFormulas: [
              "F_n = 1 \\times F_{n-1} + F_{n-2}",
              "\\gcd(F_n, F_{n-1}) = 1 \\quad \\forall n \\ge 2",
            ],
            audioNarrationText:
              "Dua bilangan Fibonacci berurutan selalu menghasilkan FPB 1 dan membutuhkan iterasi pengubinan paling banyak.",
          },
        },
        {
          id: "e3-step-2",
          type: "playground",
          title: "Eksplorasi Spiral Pengubinan Fibonacci",
          playground: {
            title: "Pengubinan Rasio Emas",
            instructions: "Atur dimensi 144 × 89 dan perhatikan rantai langkah 1 ubin per iterasi.",
            interactiveComponentSlug: "math-euclid",
            initialVariables: { width: 144, height: 89 },
          },
        },
        {
          id: "e3-step-3",
          type: "challenge",
          title: "Misi: Buktikan FPB(144, 89) = 1",
          challenge: {
            id: "challenge-euclid-3",
            title: "Uji Pasangan Fibonacci 144 × 89",
            question: "Atur persegi panjang 144 × 89 untuk membuktikan bahwa FPB dari dua bilangan Fibonacci ini adalah 1.",
            targetCondition: (vars: Record<string, number>) => {
              return (
                (vars.width === 144 && vars.height === 89) ||
                (vars.width === 89 && vars.height === 144)
              );
            },
            hint1Static: "Gunakan preset Fibonacci atau geser slider langsung ke 144 dan 89.",
            hint2Static: "Perhatikan bagaimana setiap langkah hanya menghasilkan tepat satu bujur sangkar.",
            solutionVariables: { width: 144, height: 89 },
            solutionExplanation: "144 dan 89 adalah bilangan Fibonacci berurutan yang saling prima (FPB = 1).",
            xpReward: 100,
          },
        },
        {
          id: "e3-step-4",
          type: "validation",
          title: "Master Algoritma Euclid",
          validation: {
            title: "Luar Biasa! Kamu Menguasai Algoritma Euclid",
            summaryText:
              "Kamu telah menguasai esensi geometris Algoritma Euclid: dari bujur sangkar pembagi, rantai sisa bagi, hingga pembuktian sifat koprima pasangan Fibonacci.",
            keyTakeaway: "Dua bilangan Fibonacci berurutan selalu koprima: gcd(Fn, Fn-1) = 1.",
            formulaKaTeX: "\\gcd(F_n, F_{n-1}) = 1",
            badgeToUnlock: "modular-master",
          },
        },
      ],
    },
  ],
};
