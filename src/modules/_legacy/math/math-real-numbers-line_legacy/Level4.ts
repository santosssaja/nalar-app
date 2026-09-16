import { Level } from "@/types/level";

export const level4: Level = {
  id: "real-level-4",
  index: 4,
  tier: 2,
  title: "Penemuan Bilangan Irasional (Akar Pythagoras)",
  description: "Menemukan titik nyata di garis bilangan yang tidak bisa ditulis sebagai pecahan biasa.",
  ahaMoment: "Ada titik di garis bilangan yang mustahil ditulis sebagai pecahan: selamat datang di bilangan irasional!",
  steps: [
    {
      id: "r4-s1",
      type: "provoke",
      title: "Misteri Diagonal Bujur Sangkar",
      naiExpression: "curious",
      naiDialogue: "Menurut Pythagoras, kuadrat garis miring bujur sangkar 1 × 1 adalah 2. Berapa panjang pastinya?",
      provoke: {
        hookTitle: "Mengapa √2 Mengguncang Yunani Kuno?",
        hookText: "Bujur sangkar 1 × 1 memiliki diagonal c² = 1² + 1² = 2. Ilmuwan kuno mencoba menulis panjang ini sebagai pecahan biasa p/q namun selalu gagal.",
        interactiveComponentSlug: "math-real-numbers-line",
        initialVariables: { point1: 0, point2: 0, scaleFactor: 1, sqrtN: 2, zoomLevel: 1 },
        question: "Bisakah panjang diagonal √2 ditulis dalam pecahan biasa p/q?",
        options: [
          {
            id: "opt-no-ratio",
            text: "Mustahil! Angka desimalnya tak berujung dan tak pernah berpola (irasional).",
            responseText: "Tepat sekali! Penemuan ini mengguncang dunia karena membuktikan ada panjang fisik yang bukan pecahan rasional.",
          },
          {
            id: "opt-yes-ratio",
            text: "Pasti bisa, hanya saja kita butuh angka pecahan yang sangat besar.",
            responseText: "Kurang tepat. Telah terbukti secara matematis bahwa √2 tidak dapat dinyatakan dalam bentuk p/q!",
          },
        ],
      },
    },
    {
      id: "r4-s2",
      type: "predict",
      title: "Di Mana Posisi √2 di Garis Bilangan?",
      naiExpression: "thinking",
      naiDialogue: "Jika diagonal direbahkan dengan jangka ke garis bilangan, di antara dua bilangan bulat manakah ia mendarat?",
      predict: {
        scenarioTitle: "Rebahan Diagonal Bujur Sangkar",
        scenarioText: "Kita letakkan bujur sangkar 1 × 1 di garis bilangan dari 0 ke 1, lalu busur jangka menjatuhkan diagonalnya ke garis bilangan.",
        question: "Di antara dua bilangan manakah posisi ujung jangka tersebut mendarat?",
        options: [
          {
            id: "pred-1-2",
            text: "Antara 1 dan 2 (tepatnya sekitar 1.414)",
            isCorrect: true,
            feedback: "Benar! Karena 1² = 1 dan 2² = 4, maka nilai √2 berada di antara 1 dan 2 (sekitar 1.414).",
          },
          {
            id: "pred-2-3",
            text: "Antara 2 dan 3",
            isCorrect: false,
            feedback: "Terlalu besar. 2² = 4, padahal kuadrat diagonal ini hanyalah 2.",
          },
          {
            id: "pred-0-1",
            text: "Antara 0 dan 1",
            isCorrect: false,
            feedback: "Diagonal bujur sangkar selalu lebih panjang dari sisi tegaknya (sisi tegak = 1).",
          },
        ],
        simulationLabel: "Rebahkan Jangka!",
        interactiveComponentSlug: "math-real-numbers-line",
        initialVariables: { point1: 0, point2: 0, scaleFactor: 1, sqrtN: 2, zoomLevel: 1 },
        simulationVariables: { point1: 0, point2: 1.414, scaleFactor: 1, sqrtN: 2, zoomLevel: 1 },
      },
    },
    {
      id: "r4-s3",
      type: "guided",
      title: "Simulator Busur Jangka Pythagoras",
      naiExpression: "happy",
      naiDialogue: "Ubah slider N akar kuadrat dan amati busur jangka ungu yang merebahkan nilai akar ke garis bilangan!",
      guided: {
        instructionTitle: "Menjatuhkan Hipotenusa ke Garis Bilangan",
        instructionText: "Ubah nilai N untuk melihat konstruksi geometri segitiga siku-siku dan posisi jatuhnya akar pada garis riil.",
        interactiveComponentSlug: "math-real-numbers-line",
        initialVariables: { point1: 0, point2: 0, scaleFactor: 1, sqrtN: 2, zoomLevel: 1 },
        observationTable: {
          headers: ["Nilai N", "Segitiga Alas × Tinggi", "Posisi Jatuh √N"],
          rows: [
            { parameter: "N = 2", expectedValue: "1 × 1", unit: "≈ 1.414" },
            { parameter: "N = 5", expectedValue: "2 × 1", unit: "≈ 2.236" },
          ],
        },
        discoveryQuestion: {
          prompt: "Apakah titik √2 benar-benar ada secara fisik di garis bilangan?",
          options: [
            "Ya, memiliki lokasi koordinat yang nyata dan terukur",
            "Tidak, itu hanya bilangan imajiner",
            "Hanya ada jika dibulatkan",
          ],
          correctOption: "Ya, memiliki lokasi koordinat yang nyata dan terukur",
          insight: "Bilangan irasional memiliki lokasi koordinat fisik nyata yang menutup lubang-lubang mikroskopis pada garis bilangan.",
        },
      },
    },
    {
      id: "r4-s4",
      type: "formalize",
      title: "Definisi Bilangan Irasional & Bilangan Riil",
      naiExpression: "neutral",
      naiDialogue: "Sekarang garis bilangan menjadi utuh berkat gabungan rasional dan irasional.",
      formalize: {
        title: "Himpunan Bilangan Riil R",
        prompt: "Lengkapi kesimpulan klasifikasi bilangan dan gabungan kontinum berikut:",
        formulaTemplate: "\\sqrt{2} [blank1] \\mathbb{Q} \\quad \\text{dan} \\quad \\mathbb{R} = \\mathbb{Q} \\cup [blank2]",
        blanks: [
          { id: "blank1", label: "Keanggotaan Rasional", options: ["\\notin", "\\in", "="], correctOption: "\\notin" },
          { id: "blank2", label: "Himpunan Irasional", options: ["\\mathbb{I}", "\\mathbb{Z}", "\\mathbb{N}"], correctOption: "\\mathbb{I}" },
        ],
        resolvedFormulaKaTeX: "\\sqrt{2} \\notin \\mathbb{Q} \\quad \\text{dan} \\quad \\mathbb{R} = \\mathbb{Q} \\cup \\mathbb{I}",
        explanation: "Bilangan irasional tidak dapat ditulis sebagai p/q. Gabungan seluruh bilangan rasional dan irasional membentuk himpunan Bilangan Riil (R).",
      },
    },
    {
      id: "r4-s5",
      type: "check",
      title: "Cek Pemahaman Irasional",
      naiExpression: "thinking",
      naiDialogue: "Uji kejelianmu membedakan bilangan rasional dan irasional!",
      check: {
        question: "Penjumlahan bilangan rasional dan bilangan irasional, misalnya 3 + √2, selalu menghasilkan bilangan irasional.",
        checkType: "true_false",
        trueFalseAnswer: true,
        explanation: "Benar! Jika hasilnya rasional, maka √2 = rasional - 3 yang akan membuat √2 menjadi rasional (kontradiksi). Maka 3 + √2 pasti irasional.",
      },
    },
    {
      id: "r4-s6",
      type: "sandbox",
      title: "Playground Busur Akar Bilangan",
      naiExpression: "happy",
      naiDialogue: "Eksplorasi berbagai nilai N untuk melihat konstruksi spiral Theodorus di kanvas.",
      sandbox: {
        title: "Simulasi Rebahan Akar Kuadrat Bebas",
        instructions: "Ubah slider N dan amati panjang hipotenusa yang direbahkan ke garis bilangan.",
        interactiveComponentSlug: "math-real-numbers-line",
        initialVariables: { point1: 0, point2: 0, scaleFactor: 1, sqrtN: 2, zoomLevel: 1 },
      },
    },
    {
      id: "r4-s7",
      type: "challenge",
      title: "Tantangan: Rebahkan √5 ke Garis Bilangan",
      naiExpression: "neutral",
      naiDialogue: "Atur slider akar kuadrat ke N = 5 untuk merebahkan diagonal segitiga siku-siku 1 × 2 (Target: √5 ≈ 2.24)!",
      challenge: {
        id: "challenge-real-sqrt5",
        title: "Konfigurasi Akar Kuadrat N = 5",
        question:
          "Atur slider akar kuadrat ke N = 5 untuk merebahkan diagonal segitiga siku-siku 1 × 2 (Target: √5 ≈ 2.24)!",
        targetCondition: (vars) => {
          return vars.sqrtN === 5;
        },
        hint1Static: "1² + 2² = 1 + 4 = 5. Panjang diagonal adalah √5.",
        hint2Static: "Geser slider akar kuadrat ke angka 5.",
        solutionVariables: { sqrtN: 5 },
        solutionExplanation: "√5 ≈ 2.236067... berada di antara bilangan bulat 2 dan 3.",
        xpReward: 50,
      },
    },
    {
      id: "r4-s8",
      type: "reflect",
      title: "Refleksi Level 4: Garis Bilangan yang Utuh",
      naiExpression: "celebrating",
      naiDialogue: "Luar biasa! Sekarang garis bilanganmu tidak berlubang lagi!",
      reflect: {
        title: "Level 4 Tuntas: Penakluk Bilangan Irasional",
        takeaways: [
          "Bilangan irasional memiliki desimal tak hingga yang tidak pernah berulang periodik.",
          "Konstruksi busur jangka membuktikan bahwa bilangan irasional memiliki titik fisik nyata di garis 1D.",
          "Setiap titik di garis bilangan berkorespondensi satu-satu dengan satu bilangan riil R.",
        ],
        connectionText: "Di Level 5, kita akan membuktikan hukum-hukum aljabar dasar (komutatif & distributif) secara geometris!",
        nextLevelTitle: "Level 5: Geometri Sifat Aljabar",
        badgeToUnlock: "irrational-master",
        xpReward: 50,
        formulaKaTeX: "\\mathbb{R} = \\mathbb{Q} \\cup \\mathbb{I}",
      },
    },
  ],
};
