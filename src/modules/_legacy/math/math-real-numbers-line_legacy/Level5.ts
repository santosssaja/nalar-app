import { Level } from "@/types/level";

export const level5: Level = {
  id: "real-level-5",
  index: 5,
  tier: 3,
  title: "Geometri Sifat Aljabar (Komutatif & Distributif)",
  description: "Membuktikan hukum aljabar dasar melalui penataan luas persegi panjang.",
  ahaMoment: "Hukum aljabar bukan aturan hafalan kertas, melainkan fakta bahwa memutar ubin tidak mengubah luasnya!",
  steps: [
    {
      id: "r5-s1",
      type: "provoke",
      title: "Mengapa 3 × 5 = 5 × 3?",
      naiExpression: "curious",
      naiDialogue: "Mengapa perkalian selalu bolak-balik sama? Apakah itu hanya kebetulan atau hukum alam?",
      provoke: {
        hookTitle: "Rotasi Persegi Panjang 2D",
        hookText: "Bayangkan sebuah ubin lantai berukuran 3 baris dan 5 kolom. Jika kita memutar ubin ini 90 derajat, ia menjadi 5 baris dan 3 kolom.",
        interactiveComponentSlug: "math-real-numbers-line",
        initialVariables: { point1: 0, point2: 0, scaleFactor: 1, sqrtN: 2, zoomLevel: 1, distribA: 3, distribB: 4, distribC: 2 },
        question: "Apakah jumlah total kotak berubah saat ubin diputar?",
        options: [
          {
            id: "opt-same-area",
            text: "Tidak berubah sama sekali! Luasnya tetap 15 kotak.",
            responseText: "Tepat sekali! Inilah bukti visual paling murni dari sifat komutatif a · b = b · a.",
          },
          {
            id: "opt-diff-area",
            text: "Berubah tergantung cara menghitungnya.",
            responseText: "Kurang tepat. Menghitung baris dulu atau kolom dulu tidak pernah mengubah jumlah fisik materi.",
          },
        ],
      },
    },
    {
      id: "r5-s2",
      type: "predict",
      title: "Membelah Kebun dengan Pagar",
      naiExpression: "thinking",
      naiDialogue: "Sebuah kebun berukuran a × (b + c) dibelah oleh pagar pemisah. Berapa jumlah luas kedua petak?",
      predict: {
        scenarioTitle: "Kebun Persegi Panjang Distributif",
        scenarioText: "Kebun besar memiliki panjang total (b + c) dan lebar a. Sebuah pagar memisahkan bagian b dan c.",
        question: "Manakah persamaan luas yang menggambarkan pembelahan kebun ini?",
        options: [
          {
            id: "pred-distrib",
            text: "a(b + c) = ab + ac",
            isCorrect: true,
            feedback: "Benar! Luas kebun utuh sama persis dengan luas petak pertama (ab) ditambah luas petak kedua (ac).",
          },
          {
            id: "pred-wrong-plus",
            text: "a(b + c) = ab + c",
            isCorrect: false,
            feedback: "Perhatikan bahwa lebar petak kedua juga harus a, sehingga luasnya adalah ac, bukan c saja.",
          },
        ],
        simulationLabel: "Buktikan Luas Kebun!",
        interactiveComponentSlug: "math-real-numbers-line",
        initialVariables: { distribA: 3, distribB: 4, distribC: 2 },
        simulationVariables: { distribA: 3, distribB: 4, distribC: 2 },
      },
    },
    {
      id: "r5-s3",
      type: "guided",
      title: "Laboratorium Partisi Luas Geometris",
      naiExpression: "happy",
      naiDialogue: "Ubah parameter a, b, dan c untuk melihat pecahan petak luas aljabar di kanvas!",
      guided: {
        instructionTitle: "Eksplorasi Partisi Persegi Panjang",
        instructionText: "Atur parameter panjang a, b, dan c untuk melihat keselarasan antara aljabar simbolik dan luas bangun datar.",
        interactiveComponentSlug: "math-real-numbers-line",
        initialVariables: { distribA: 3, distribB: 4, distribC: 2 },
        observationTable: {
          headers: ["Parameter a, b, c", "Luas Utuh a(b+c)", "Jumlah Petak ab + ac"],
          rows: [
            { parameter: "a=3, b=4, c=2", expectedValue: "3 × (4 + 2) = 18", unit: "satuan luas" },
            { parameter: "a=4, b=3, c=5", expectedValue: "4 × (3 + 5) = 32", unit: "satuan luas" },
          ],
        },
        discoveryQuestion: {
          prompt: "Bagaimana cara menghitung 19 × 7 dengan cepat di luar kepala menggunakan sifat distributif?",
          options: [
            "Pecah menjadi (20 - 1) × 7 = 140 - 7 = 133",
            "Hitung bersusun panjang di atas kertas",
            "Gunakan pendekatan pembulatan kira-kira",
          ],
          correctOption: "Pecah menjadi (20 - 1) × 7 = 140 - 7 = 133",
          insight: "Sifat distributif mengubah perkalian rumit menjadi operasi mental cepat dan elegan.",
        },
      },
    },
    {
      id: "r5-s4",
      type: "formalize",
      title: "Aksioma Lapangan Bilangan Riil",
      naiExpression: "neutral",
      naiDialogue: "Mari kita rangkum aksioma dasar bilangan riil ke dalam formula universal.",
      formalize: {
        title: "Aksioma Komutatif & Distributif",
        prompt: "Lengkapi hukum dasar aljabar berikut:",
        formulaTemplate: "a \\cdot b = [blank1] \\quad \\text{dan} \\quad a(b + c) = [blank2]",
        blanks: [
          { id: "blank1", label: "Sifat Komutatif", options: ["b \\cdot a", "a + b", "b - a"], correctOption: "b \\cdot a" },
          { id: "blank2", label: "Sifat Distributif", options: ["ab + ac", "ab + c", "a + bc"], correctOption: "ab + ac" },
        ],
        resolvedFormulaKaTeX: "a \\cdot b = b \\cdot a \\quad \\text{dan} \\quad a(b + c) = ab + ac",
        explanation: "Sifat aljabar ini bukan sekadar aturan di atas kertas, melainkan perwujudan simetri rotasi dan partisi luas geometri 2D.",
      },
    },
    {
      id: "r5-s5",
      type: "check",
      title: "Cek Nalar Komprehensif",
      naiExpression: "thinking",
      naiDialogue: "Periksa apakah kamu dapat menerapkan sifat distributif secara langsung!",
      check: {
        question: "Berapakah hasil dari 25 × 12 jika diselesaikan dengan sifat distributif 25 × (10 + 2)?",
        checkType: "multiple_choice",
        options: [
          { id: "opt-300", text: "250 + 50 = 300", isCorrect: true, explanation: "Tepat sekali! 25 × 10 = 250, 25 × 2 = 50. 250 + 50 = 300." },
          { id: "opt-280", text: "280", isCorrect: false, explanation: "Periksa kembali penjumlahan 250 + 50." },
          { id: "opt-252", text: "252", isCorrect: false, explanation: "Ini kesalahan jika hanya menambahkan 2 tanpa mengalikannya dengan 25." },
        ],
        explanation: "25 × (10 + 2) = (25 × 10) + (25 × 2) = 250 + 50 = 300.",
      },
    },
    {
      id: "r5-s6",
      type: "sandbox",
      title: "Playground Geometri Aljabar",
      naiExpression: "happy",
      naiDialogue: "Eksplorasi parameter partisi kebun aljabar sebebas mungkin!",
      sandbox: {
        title: "Simulasi Partisi Luas Kebun",
        instructions: "Atur parameter a, b, dan c untuk melihat partisi persegi panjang secara real-time.",
        interactiveComponentSlug: "math-real-numbers-line",
        initialVariables: { distribA: 3, distribB: 4, distribC: 2 },
      },
    },
    {
      id: "r5-s7",
      type: "challenge",
      title: "Tantangan: Konfigurasi Luas Distributif Tepat 18",
      naiExpression: "neutral",
      naiDialogue: "Atur parameter a = 3, b = 4, dan c = 2 sehingga luas total kebun bernilai tepat 18 satuan!",
      challenge: {
        id: "challenge-real-distributive-area",
        title: "Konfigurasi Luas 3 × (4 + 2) = 18",
        question:
          "Atur parameter kebun aljabar menjadi a = 3, b = 4, dan c = 2 sehingga total luas petak bernilai tepat 18 satuan!",
        targetCondition: (vars) => {
          const a = vars.distribA ?? 3;
          const b = vars.distribB ?? 4;
          const c = vars.distribC ?? 2;
          return a === 3 && b === 4 && c === 2;
        },
        hint1Static: "Atur slider distribA ke 3.",
        hint2Static: "Atur slider distribB ke 4 dan distribC ke 2. Total luas: 3 * (4 + 2) = 18.",
        solutionVariables: { distribA: 3, distribB: 4, distribC: 2 },
        solutionExplanation: "3 * (4 + 2) = 3*4 + 3*2 = 12 + 6 = 18 satuan luas.",
        xpReward: 60,
      },
    },
    {
      id: "r5-s8",
      type: "reflect",
      title: "Refleksi Akhir: Penguasa Fondasi Real",
      naiExpression: "celebrating",
      naiDialogue: "Selamat! Kamu telah menyelesaikan seluruh petualangan Fondasi Bilangan Riil!",
      reflect: {
        title: "Modul Selesai: Master Bilangan Riil",
        takeaways: [
          "Bilangan adalah posisi dan perpindahan arah spasial di ruang kontinu.",
          "Perkalian adalah dilatasi skala dan pembalikan arah rotasi 180°.",
          "Kerapatan pecahan dan kelengkapan bilangan irasional menjadikan garis bilangan utuh sempurna.",
          "Hukum-hukum aljabar komutatif dan distributif terbukti secara geometris.",
        ],
        connectionText: "Siap melangkah ke topik berikutnya? Masuki dunia perulangan siklis di Aritmetika Jam (Modulo)!",
        badgeToUnlock: "real-numbers-master",
        xpReward: 60,
        formulaKaTeX: "a(b + c) = ab + ac",
      },
    },
  ],
};
