import { Level } from "@/types/level";

export const level1: Level = {
  id: "real-level-1",
  index: 1,
  tier: 1,
  title: "Garis Bilangan & Operasi Translasi",
  description: "Penjumlahan dan pengurangan sebagai perpindahan arah vektor 1 dimensi.",
  ahaMoment: "Menjumlahkan dan mengurangkan hanyalah melangkah maju atau mundur di jalan raya bilangan!",
  steps: [
    {
      id: "r1-s1",
      type: "provoke",
      title: "Di Mana Rumah Angka?",
      naiExpression: "curious",
      naiDialogue: "Jika pohon di posisi 0, di manakah kita meletakkan sumur 3 langkah ke kiri dan rumah 4 langkah ke kanan?",
      provoke: {
        hookTitle: "Di Mana Rumah Angka?",
        hookText: "Bayangkan sebuah garis jalan raya kosong. Titik acuan pohon kita tetapkan sebagai angka nol.",
        interactiveComponentSlug: "math-real-numbers-line",
        initialVariables: { point1: 0, point2: 0, scaleFactor: 1, sqrtN: 2, zoomLevel: 1 },
        question: "Apa arti sebenarnya dari tanda minus (-) pada garis bilangan?",
        options: [
          {
            id: "opt-dir",
            text: "Tanda minus menunjukkan arah berlawanan (ke kiri) dari titik acuan nol.",
            responseText: "Tepat sekali! Tanda negatif bukan berarti ketiadaan, melainkan arah vektor yang berlawanan dari arah positif.",
          },
          {
            id: "opt-broken",
            text: "Tanda minus berarti angkanya rusak atau bernilai kosong.",
            responseText: "Kurang tepat. Bilangan negatif adalah posisi koordinat fisik yang sah dan nyata di sebelah kiri nol.",
          },
        ],
      },
    },
    {
      id: "r1-s2",
      type: "predict",
      title: "Maju atau Mundur?",
      naiExpression: "thinking",
      naiDialogue: "Jika plus artinya maju searah wajah dan minus artinya membalik badan, di manakah katak mendarat?",
      predict: {
        scenarioTitle: "Lompatan Katak 1D",
        scenarioText: "Katak sedang berada di angka 2. Operasi yang diminta adalah: 2 + (-5).",
        question: "Di angka berapakah katak akan mendarat setelah melompat?",
        options: [
          {
            id: "pred-p7",
            text: "+7",
            isCorrect: false,
            feedback: "Jika melangkah ke kanan katak mendarat di 7, tapi ini adalah penjumlahan dengan bilangan negatif!",
          },
          {
            id: "pred-m3",
            text: "-3",
            isCorrect: true,
            feedback: "Benar! Menambah -5 sama artinya dengan melangkah 5 langkah ke arah kiri: 2 - 5 = -3.",
          },
          {
            id: "pred-m7",
            text: "-7",
            isCorrect: false,
            feedback: "Terlalu jauh ke kiri. Katak mulai melompat dari posisi 2, bukan dari nol.",
          },
        ],
        simulationLabel: "Lompatkan Katak!",
        interactiveComponentSlug: "math-real-numbers-line",
        initialVariables: { point1: 2, point2: 0, scaleFactor: 1, sqrtN: 2, zoomLevel: 1 },
        simulationVariables: { point1: 2, point2: -3, scaleFactor: 1, sqrtN: 2, zoomLevel: 1 },
      },
    },
    {
      id: "r1-s3",
      type: "guided",
      title: "Vektor Perpindahan 1D",
      naiExpression: "happy",
      naiDialogue: "Geser titik A dan B. Amati bagaimana perpindahan selalu menggeser posisi ke kiri atau kanan!",
      guided: {
        instructionTitle: "Eksplorasi Vektor Translasi",
        instructionText: "Geser slider titik A dan B untuk mengamati bagaimana selisih koordinat menentukan panjang dan arah vektor.",
        interactiveComponentSlug: "math-real-numbers-line",
        initialVariables: { point1: 3, point2: -4, scaleFactor: 1, sqrtN: 2, zoomLevel: 1 },
        observationTable: {
          headers: ["Titik Awal A", "Perpindahan Δx", "Posisi Akhir B"],
          rows: [
            { parameter: "Awal = 3", expectedValue: "-4", unit: "posisi" },
            { parameter: "Awal = -5", expectedValue: "+3", unit: "posisi" },
          ],
        },
        discoveryQuestion: {
          prompt: "Apa akibat menjumlahkan bilangan negatif terhadap posisi titik di garis bilangan?",
          options: [
            "Selalu menggeser titik ke arah kiri",
            "Selalu menggeser titik ke arah kanan",
            "Titik diam di tempat",
          ],
          correctOption: "Selalu menggeser titik ke arah kiri",
          insight: "Operasi a + (-b) bernilai sama persis dengan pengurangan a - b, yaitu translasi ke arah kiri.",
        },
      },
    },
    {
      id: "r1-s4",
      type: "formalize",
      title: "Formalisasi Translasi & Jarak",
      naiExpression: "neutral",
      naiDialogue: "Mari kita tuangkan hasil eksplorasi spasialmu ke dalam rumus matematika formal.",
      formalize: {
        title: "Hukum Translasi & Definisi Jarak Mutlak",
        prompt: "Lengkapi kesimpulan operasi penjumlahan bilangan bertanda dan jarak dua titik:",
        formulaTemplate: "a + (-b) = a [blank1] b \\quad \\text{dan} \\quad d(A, B) = [blank2]",
        blanks: [
          { id: "blank1", label: "Tanda Operasi", options: ["-", "+", "\\times"], correctOption: "-" },
          { id: "blank2", label: "Definisi Jarak", options: ["|b - a|", "b + a", "b - a"], correctOption: "|b - a|" },
        ],
        resolvedFormulaKaTeX: "a + (-b) = a - b \\quad \\text{dan} \\quad d(A, B) = |b - a|",
        explanation: "Menjumlahkan negatif setara dengan pengurangan. Jarak fisik antara dua titik selalu non-negatif berkat nilai mutlak.",
      },
    },
    {
      id: "r1-s5",
      type: "check",
      title: "Cek Nalar Cepat",
      naiExpression: "thinking",
      naiDialogue: "Uji pemahamanmu sebelum mencoba tantangan kanvas berikutnya!",
      check: {
        question: "Mengurangkan bilangan negatif, misal 5 - (-3), setara dengan melangkah MAJU ke kanan sejauh 3 langkah.",
        checkType: "true_false",
        trueFalseAnswer: true,
        explanation: "Tepat! Tanda kurang berarti membalik badan (menghadap kiri); bilangan negatif berarti berjalan mundur. Berjalan mundur saat menghadap kiri menghasilkan gerakan maju ke kanan!",
      },
    },
    {
      id: "r1-s6",
      type: "sandbox",
      title: "Playground Translasi Garis",
      naiExpression: "happy",
      naiDialogue: "Silakan geser slider bebas untuk melihat visualisasi vektor di kanvas.",
      sandbox: {
        title: "Simulasi Bebas Garis Bilangan",
        instructions: "Geser titik A dan B untuk menguji berbagai kombinasi bilangan positif dan negatif.",
        interactiveComponentSlug: "math-real-numbers-line",
        initialVariables: { point1: 3, point2: -4, scaleFactor: 1, sqrtN: 2, zoomLevel: 1 },
      },
    },
    {
      id: "r1-s7",
      type: "challenge",
      title: "Misi: Atur Jarak Tepat 9 Satuan",
      naiExpression: "neutral",
      naiDialogue: "Bantu tim SAR mencari koordinat sinyal: atur posisi A di 3 dan temukan titik B berjarak 9 di sebelah kiri!",
      challenge: {
        id: "challenge-real-distance",
        title: "Target Jarak |B - A| = 9",
        question:
          "Atur posisi titik A di 3 dan tentukan posisi titik B di sebelah kiri sehingga jarak |B - A| bernilai tepat 9 satuan (Target: B = -6)!",
        targetCondition: (vars) => {
          return vars.point1 === 3 && vars.point2 === -6;
        },
        hint1Static: "Dari angka 3, melangkah ke kiri sebanyak 9 langkah: 3 - 9 = ?",
        hint2Static: "Geser slider titik B hingga angka -6.",
        solutionVariables: { point1: 3, point2: -6 },
        solutionExplanation: "|-6 - 3| = |-9| = 9 satuan jarak.",
        xpReward: 30,
      },
    },
    {
      id: "r1-s8",
      type: "reflect",
      title: "Refleksi Level 1: Bilangan Adalah Ruang",
      naiExpression: "celebrating",
      naiDialogue: "Luar biasa! Kamu membuktikan bahwa tambah dan kurang adalah petunjuk arah di ruang 1 dimensi!",
      reflect: {
        title: "Level 1 Tuntas: Garis Bilangan & Translasi",
        takeaways: [
          "Angka nol adalah titik origin acuan, bukan sekadar kehampaan.",
          "Penjumlahan dengan bilangan negatif a + (-b) adalah translasi ke arah kiri.",
          "Jarak antara dua koordinat selalu bernilai mutlak non-negatif d = |b - a|.",
        ],
        connectionText: "Di Level 2, kita akan melipatgandakan panjang dan membalik arah garis lewat operasi PERKALIAN!",
        nextLevelTitle: "Level 2: Skala & Misteri (-1) × (-1)",
        badgeToUnlock: "line-walker",
        xpReward: 30,
        formulaKaTeX: "d(a, b) = |b - a|",
      },
    },
  ],
};
