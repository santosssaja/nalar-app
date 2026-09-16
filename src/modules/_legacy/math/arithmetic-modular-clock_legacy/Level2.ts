import { Level } from "@/types/level";

export const level2: Level = {
  id: "clock-level-2",
  index: 2,
  tier: 1,
  title: "Aritmetika Modular & Efisiensi Angka Raksasa",
  description: "Operasi penjumlahan dan perkalian modular serta reduksi sebelum operasi.",
  ahaMoment: "Kamu bisa menyederhanakan angka SEBELUM menjumlahkan atau mengalikannya, hasilnya tetap sama persis!",
  steps: [
    {
      id: "c2-s1",
      type: "provoke",
      title: "Menghitung Angka Raksasa",
      naiExpression: "curious",
      naiDialogue: "Berapa digit terakhir dari 1234567 × 7654321? Apakah kamu harus mengalikan semuanya?",
      provoke: {
        hookTitle: "Digit Terakhir Perkalian Raksasa",
        hookText: "Komputer modern sering kali harus mengalikan angka ratusan digit untuk sistem keamanan perbankan.",
        interactiveComponentSlug: "arithmetic-modular-clock",
        initialVariables: { n: 10, hourA: 7, hourB: 1, multiplier: 2 },
        question: "Bagaimana cara tercepat mencari digit terakhir (mod 10) dari 1234567 × 7654321?",
        options: [
          {
            id: "opt-last-digit",
            text: "Cukup kalikan digit terakhirnya: 7 × 1 = 7!",
            responseText: "Tepat sekali! Sisa bagi menjaga operasi perkalian. Kita tidak perlu menghitung angka raksasanya secara utuh.",
          },
          {
            id: "opt-calc",
            text: "Harus menggunakan kalkulator ilmiah 64-bit.",
            responseText: "Kurang tepat. Menghitung manual angka sebesar itu tidak efisien dan rentan overflow komputasi.",
          },
        ],
      },
    },
    {
      id: "c2-s2",
      type: "predict",
      title: "Sisa Sebelum vs Sisa Sesudah",
      naiExpression: "thinking",
      naiDialogue: "Apakah (14 + 18) mod 5 sama hasilnya jika kita modulo-kan dulu angkanya?",
      predict: {
        scenarioTitle: "Reduksi Aritmetika Modular",
        scenarioText: "Cara 1: (14 + 18) mod 5 = 32 mod 5 = 2. Cara 2: (14 mod 5) + (18 mod 5) = 4 + 3 = 7 mod 5 = 2.",
        question: "Apakah menyederhanakan angka sebelum operasi selalu menghasilkan jawaban yang sama?",
        options: [
          {
            id: "pred-always-same",
            text: "Pasti sama persis untuk penjumlahan dan perkalian apa pun",
            isCorrect: true,
            feedback: "Benar! Inilah sifat homomorfisma modular yang membuat perhitungan kriptografi super cepat.",
          },
          {
            id: "pred-diff",
            text: "Bisa berbeda jika angkanya terlalu besar",
            isCorrect: false,
            feedback: "Tidak pernah berbeda! Teorema modular menjamin konsistensi hasil.",
          },
        ],
        simulationLabel: "Uji Konsistensi!",
        interactiveComponentSlug: "arithmetic-modular-clock",
        initialVariables: { n: 5, hourA: 4, hourB: 3, multiplier: 2 },
        simulationVariables: { n: 5, hourA: 4, hourB: 3, multiplier: 2 },
      },
    },
    {
      id: "c2-s3",
      type: "guided",
      title: "Eksplorasi Kalender Modulo 7",
      naiExpression: "happy",
      naiDialogue: "Sistem 7 hari seminggu adalah contoh modulo alami yang kita temui setiap hari!",
      guided: {
        instructionTitle: "Simulasi Prediksi Hari Kalender",
        instructionText: "Ubah n menjadi 7, lalu variasikan jam A dan B untuk mensimulasikan pergeseran hari.",
        interactiveComponentSlug: "arithmetic-modular-clock",
        initialVariables: { n: 7, hourA: 1, hourB: 2, multiplier: 3 },
        observationTable: {
          headers: ["Hari Ini", "Tambah Hari", "Hari Mendatang (mod 7)"],
          rows: [
            { parameter: "Selasa (1)", expectedValue: "+ 100 hari", unit: "Kamis (3)" },
            { parameter: "Jumat (4)", expectedValue: "+ 14 hari", unit: "Jumat (4)" },
          ],
        },
        discoveryQuestion: {
          prompt: "Mengapa menambah 14 hari tidak mengubah nama hari sama sekali?",
          options: [
            "Karena 14 adalah kelipatan tepat dari 7 (14 mod 7 = 0)",
            "Karena kalender berhenti di hari ke-14",
            "Hanya kebetulan",
          ],
          correctOption: "Karena 14 adalah kelipatan tepat dari 7 (14 mod 7 = 0)",
          insight: "Menambah kelipatan dari modulus setara dengan melangkah 0 di dunia modulo!",
        },
      },
    },
    {
      id: "c2-s4",
      type: "formalize",
      title: "Hukum Homomorfisma Modular",
      naiExpression: "neutral",
      naiDialogue: "Mari formulasikan sifat kekebalan operasi tambah dan kali terhadap modulo.",
      formalize: {
        title: "Hukum Operasi Modular",
        prompt: "Lengkapi sifat penjumlahan dan perkalian modular berikut:",
        formulaTemplate: "(a + b) \\pmod m \\equiv (a [blank1] b) \\pmod m \\quad \\text{dan} \\quad (a \\cdot b) \\pmod m \\equiv (a [blank2] b) \\pmod m",
        blanks: [
          { id: "blank1", label: "Reduksi Tambah", options: ["\\pmod m + \\dots", "\\times \\dots", "/ \\dots"], correctOption: "\\pmod m + \\dots" },
          { id: "blank2", label: "Reduksi Kali", options: ["\\pmod m \\cdot \\dots", "+ \\dots", "/ \\dots"], correctOption: "\\pmod m \\cdot \\dots" },
        ],
        resolvedFormulaKaTeX: "(a + b) \\pmod m \\equiv ((a \\pmod m) + (b \\pmod m)) \\pmod m",
        explanation: "Kita bebas mereduksi sisa bagi pada setiap tahapan perhitungan tanpa merusak hasil akhir.",
      },
    },
    {
      id: "c2-s5",
      type: "check",
      title: "Kuis Efisiensi Angka Besar",
      naiExpression: "thinking",
      naiDialogue: "Gunakan trik sisa bagi untuk menghitung soal ini dalam sekejap!",
      check: {
        question: "Berapakah sisa bagi dari 99 × 101 jika dibagi oleh 10?",
        checkType: "multiple_choice",
        options: [
          { id: "opt-9", text: "9 (karena 99 ≡ -1 dan 101 ≡ 1, hasil kali = -1 ≡ 9)", isCorrect: true, explanation: "Brilian! 99 × 101 = 9999, digit terakhirnya adalah 9. Cara reduksi: (-1) × 1 = -1 ≡ 9 (mod 10)." },
          { id: "opt-1", text: "1", isCorrect: false, explanation: "9 × 1 = 9, bukan 1." },
          { id: "opt-0", text: "0", isCorrect: false, explanation: "Hasil kali tidak berakhir dengan angka nol." },
        ],
        explanation: "99 ≡ 9 dan 101 ≡ 1. Maka 9 × 1 = 9 (mod 10).",
      },
    },
    {
      id: "c2-s6",
      type: "sandbox",
      title: "Playground Modulo 7 Kalender",
      naiExpression: "happy",
      naiDialogue: "Coba berbagai angka hari untuk menguji siklus kalender abadi.",
      sandbox: {
        title: "Simulator Kalender Mod 7",
        instructions: "Variasikan nilai jam A dan B pada modulus 7 untuk mengamati pergeseran siklus.",
        interactiveComponentSlug: "arithmetic-modular-clock",
        initialVariables: { n: 7, hourA: 2, hourB: 3, multiplier: 3 },
      },
    },
    {
      id: "c2-s7",
      type: "challenge",
      title: "Tantangan: Konfigurasi Jam Modulo 7",
      naiExpression: "neutral",
      naiDialogue: "Atur lingkaran modulo n = 7, lalu atur jam A dan B sehingga total sisa baginya tepat bernilai 5!",
      challenge: {
        id: "challenge-clock-calendar",
        title: "Sinkronisasi Siklus Kalender",
        question:
          "Ubah lingkaran modulo menjadi n = 7. Atur jam A dan jam B sehingga total penjumlahan sisa baginya menghasilkan tepat 5 (misal: Selasa + 4 hari = Sabtu)!",
        targetCondition: (vars) => {
          const n = vars.n || 0;
          const sum = (((vars.hourA || 0) + (vars.hourB || 0)) % 7 + 7) % 7;
          return n === 7 && sum === 5;
        },
        hint1Static: "Ubah slider modulus n menjadi 7 terlebih dahulu.",
        hint2Static: "Pilih jam A dan B yang jika dijumlahkan menghasilkan 5 atau kelipatan 7 + 5 (seperti 12).",
        solutionVariables: { n: 7, hourA: 2, hourB: 3 },
        solutionExplanation: "Pada n = 7, jam A = 2 dan jam B = 3 menghasilkan (2 + 3) mod 7 = 5.",
        xpReward: 40,
      },
    },
    {
      id: "c2-s8",
      type: "reflect",
      title: "Refleksi Level 2: Aljabar yang Rapi",
      naiExpression: "celebrating",
      naiDialogue: "Hebat! Kamu sudah bisa mengendalikan angka-angka raksasa dengan aritmetika modular!",
      reflect: {
        title: "Level 2 Tuntas: Penjumlahan & Perkalian Modulo",
        takeaways: [
          "Angka besar dapat disederhanakan terlebih dahulu sebelum dioperasikan.",
          "Aritmetika modular mempertahankan sifat komutatif, asosiatif, dan distributif.",
          "Kalender dan jam adalah contoh nyata homomorfisma modular di kehidupan nyata.",
        ],
        connectionText: "Di Level 3, kita akan memecahkan misteri PEMBAGIAN di dunia jam modulo!",
        nextLevelTitle: "Level 3: Pembagian & Invers Modular",
        badgeToUnlock: "pattern-seeker",
        xpReward: 40,
        formulaKaTeX: "(a \\times b) \\pmod n = ((a \\pmod n) \\times (b \\pmod n)) \\pmod n",
      },
    },
  ],
};
