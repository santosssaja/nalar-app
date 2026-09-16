import { Level } from "@/types/level";

export const level5: Level = {
  id: "euclid-level-5",
  index: 5,
  tier: 3,
  title: "Kasus Terburuk Euclid & Rasio Emas Fibonacci",
  description: "Mempelajari mengapa pasangan bilangan Fibonacci membutuhkan langkah pembagian terbanyak.",
  ahaMoment: "Angka yang paling lambat diselesaikan oleh Euclid adalah deret bilangan Fibonacci berturutan: hasil baginya selalu 1 dan ubinnya selalu persegi tunggal!",
  steps: [
    {
      id: "e5-s1",
      type: "provoke",
      title: "Siapa Lawan Terberat Algoritma Euclid?",
      naiExpression: "curious",
      naiDialogue: "Algoritma Euclid sangat cepat. Tapi pasangan bilangan manakah yang memaksa Euclid bekerja paling keras?",
      provoke: {
        hookTitle: "Pasangan Pembagian Terpanjang",
        hookText: "Jika hasil bagi bernilai besar (misal 100/10 = 10 sisa 0), pembagian langsung selesai dalam 1 langkah. Pasangan terburuk adalah yang hasil baginya SELALU 1!",
        interactiveComponentSlug: "math-euclid",
        initialVariables: { width: 34, height: 21 },
        question: "Deret bilangan manakah yang setiap pembagiannya selalu menghasilkan q = 1?",
        options: [
          {
            id: "opt-fibo",
            text: "Deret Bilangan Fibonacci (1, 1, 2, 3, 5, 8, 13, 21, 34...)",
            responseText: "Tepat sekali! Karena F(n+1) = 1 × F(n) + F(n-1), setiap ubin yang dipasang selalu bujur sangkar tunggal dan membutuhkan langkah terbanyak!",
          },
          {
            id: "opt-two",
            text: "Deret perpangkatan 2 (2, 4, 8, 16...)",
            responseText: "Pangkat dua justru sangat cepat selesai karena saling membagi kelipatan genap.",
          },
        ],
      },
    },
    {
      id: "e5-s2",
      type: "predict",
      title: "Spiral Emas dari Pengubinan Terpanjang",
      naiExpression: "thinking",
      naiDialogue: "Jika ubin Fibonacci 13, 8, 5, 3, 2, 1, 1 disusun berputar, bentuk apakah yang terlahir?",
      predict: {
        scenarioTitle: "Pengubinan 21 × 13",
        scenarioText: "Setiap ubin dipasang bersebelahan memutar secara berurutan.",
        question: "Kurva alami apakah yang membungkus ubin-ubin Fibonacci ini?",
        options: [
          {
            id: "pred-spiral",
            text: "Spiral Rasio Emas (mirip cangkang nautilus dan galaksi)",
            isCorrect: true,
            feedback: "Benar! Rasio dua bilangan Fibonacci berurutan mendekati Rasio Emas phi ≈ 1.618.",
          },
          {
            id: "pred-circle",
            text: "Lingkaran simetris sempurna",
            isCorrect: false,
            feedback: "Jari-jarinya terus bertambah secara eksponensial membentuk spiral, bukan lingkaran statis.",
          },
        ],
        simulationLabel: "Buka Spiral Fibonacci!",
        interactiveComponentSlug: "math-euclid",
        initialVariables: { width: 21, height: 13 },
        simulationVariables: { width: 21, height: 13 },
      },
    },
    {
      id: "e5-s3",
      type: "guided",
      title: "Simulator Deret Fibonacci",
      naiExpression: "happy",
      naiDialogue: "Atur dimensi 21 × 13 atau 34 × 21 untuk melihat spiral ubin persegi tunggal berputar!",
      guided: {
        instructionTitle: "Eksplorasi Kasus Terburuk Lamé",
        instructionText: "Perhatikan bagaimana setiap langkah hanya memotong satu bujur sangkar saja: 21 = 1×13 + 8 -> 13 = 1×8 + 5 -> 8 = 1×5 + 3 -> 5 = 1×3 + 2 -> 3 = 1×2 + 1 -> 2 = 2×1 + 0.",
        interactiveComponentSlug: "math-euclid",
        initialVariables: { width: 21, height: 13 },
        observationTable: {
          headers: ["Pasangan Fibonacci", "Jumlah Langkah Euclid", "Rasio Panjang / Lebar"],
          rows: [
            { parameter: "21 × 13", expectedValue: "6 langkah", unit: "21/13 ≈ 1.615" },
            { parameter: "34 × 21", expectedValue: "7 langkah", unit: "34/21 ≈ 1.619" },
          ],
        },
        discoveryQuestion: {
          prompt: "Mengapa kasus terburuk Euclid tetap tergolong sangat cepat dalam ilmu komputer?",
          options: [
            "Karena jumlah langkahnya dibatasi oleh jumlah digit angka (kompleksitas logaritmik O(log n))",
            "Karena komputer bisa menebak jawabannya",
            "Hanya cepat untuk angka Fibonacci",
          ],
          correctOption: "Karena jumlah langkahnya dibatasi oleh jumlah digit angka (kompleksitas logaritmik O(log n))",
          insight: "Teorema Lamé (1844): Jumlah langkah Euclid tidak akan pernah melebihi 5 kali jumlah digit bilangan terkecil!",
        },
      },
    },
    {
      id: "e5-s4",
      type: "formalize",
      title: "Teorema Lamé & Rasio Emas",
      naiExpression: "neutral",
      naiDialogue: "Mari tuangkan relasi Fibonacci dan Rasio Emas ke dalam formula KaTeX.",
      formalize: {
        title: "Konvergensi Rasio Emas",
        prompt: "Lengkapi limit rasio bilangan Fibonacci berikut:",
        formulaTemplate: "\\lim_{n \\to \\infty} \\frac{F_{n+1}}{F_n} = [blank1] = \\frac{1 + \\sqrt{5}}{2} \\approx 1.618",
        blanks: [
          { id: "blank1", label: "Simbol Rasio Emas", options: ["\\phi", "\\pi", "e"], correctOption: "\\phi" },
        ],
        resolvedFormulaKaTeX: "\\lim_{n \\to \\infty} \\frac{F_{n+1}}{F_n} = \\phi = \\frac{1 + \\sqrt{5}}{2} \\approx 1.6180339",
        explanation: "Pasangan Fibonacci adalah input paling menantang bagi Euclid, namun tetap diselesaikan dalam waktu logaritmik O(log min(a,b)).",
      },
    },
    {
      id: "e5-s5",
      type: "check",
      title: "Cek Langkah Fibonacci",
      naiExpression: "thinking",
      naiDialogue: "Uji kejelianmu menghitung langkah reduksi deret Fibonacci!",
      check: {
        question: "Berapa ubin bujur sangkar yang dipasang pada setiap tahap pengubinan bilangan Fibonacci berturutan sebelum tahap akhir?",
        checkType: "multiple_choice",
        options: [
          { id: "opt-1-tile", text: "Selalu tepat 1 ubin bujur sangkar tunggal pada setiap tahap", isCorrect: true, explanation: "Tepat! Karena F(n+1) < 2 × F(n), bujur sangkar yang muat selalu hanya 1 buah saja." },
          { id: "opt-2-tile", text: "Selalu 2 ubin", isCorrect: false, explanation: "Jika muat 2 ubin, itu bukan deret Fibonacci." },
        ],
        explanation: "Hasil bagi q = 1 pada setiap langkah adalah ciri khas deret Fibonacci.",
      },
    },
    {
      id: "e5-s6",
      type: "sandbox",
      title: "Playground Spiral Fibonacci",
      naiExpression: "happy",
      naiDialogue: "Atur dimensi 21 × 13 atau 34 × 21 untuk melihat spiral berputar indah di kanvas.",
      sandbox: {
        title: "Simulasi Spiral Fibonacci Bebas",
        instructions: "Atur dimensi 21 × 13 atau 34 × 21 untuk melihat spiral ubin persegi tunggal berputar.",
        interactiveComponentSlug: "math-euclid",
        initialVariables: { width: 34, height: 21 },
      },
    },
    {
      id: "e5-s7",
      type: "challenge",
      title: "Tantangan: Pengubinan Fibonacci 21 × 13",
      naiExpression: "neutral",
      naiDialogue: "Atur dimensi persegi panjang menjadi tepat 21 × 13 untuk menghasilkan pengubinan bertingkat Fibonacci dengan FPB = 1!",
      challenge: {
        id: "challenge-euclid-fibonacci",
        title: "Konfigurasi Spiral Fibonacci",
        question:
          "Atur dimensi persegi panjang menjadi tepat 21 × 13 untuk menghasilkan pengubinan bertingkat Fibonacci dengan FPB = 1!",
        targetCondition: (vars) => {
          return (vars.width === 21 && vars.height === 13) || (vars.width === 13 && vars.height === 21);
        },
        hint1Static: "Atur panjang = 21 dan lebar = 13 (dua bilangan Fibonacci berurutan).",
        hint2Static: "Ubin yang terbentuk akan berukuran 13x13, 8x8, 5x5, 3x3, 2x2, 1x1, 1x1.",
        solutionVariables: { width: 21, height: 13 },
        solutionExplanation: "21 = 1*13 + 8 -> 13 = 1*8 + 5 -> 8 = 1*5 + 3 -> 5 = 1*3 + 2 -> 3 = 1*2 + 1 -> 2 = 2*1 + 0.",
        xpReward: 60,
      },
    },
    {
      id: "e5-s8",
      type: "reflect",
      title: "Refleksi Level 5: Keindahan Kasus Terburuk",
      naiExpression: "celebrating",
      naiDialogue: "Menakjubkan! Bahkan dalam kasus terburuknya, Algoritma Euclid terbukti sangat efisien!",
      reflect: {
        title: "Level 5 Tuntas: Kasus Terburuk & Fibonacci",
        takeaways: [
          "Pasangan Fibonacci berturutan membutuhkan langkah pembagian terbanyak pada Algoritma Euclid.",
          "Setiap langkah pengubinan Fibonacci memotong bujur sangkar tunggal yang membungkus spiral rasio emas phi.",
          "Teorema Lamé membuktikan batas efisiensi logaritmik yang menjadi standar algoritma komputer modern.",
        ],
        connectionText: "Saatnya menguji seluruh keahlian geometri dan aljabar ini di Boss Level Pamungkas!",
        nextLevelTitle: "Boss Level: Ujian Modul Pengubinan Euclid",
        badgeToUnlock: "pattern-seeker",
        xpReward: 60,
        formulaKaTeX: "\\frac{F_{n+1}}{F_n} \\to \\phi = \\frac{1 + \\sqrt{5}}{2}",
      },
    },
  ],
};
