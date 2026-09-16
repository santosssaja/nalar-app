import { Level } from "@/types/level";

export const level2: Level = {
  id: "real-level-2",
  index: 2,
  tier: 1,
  title: "Skala, Dilatasi, & Misteri (-1) × (-1)",
  description: "Perkalian sebagai peregangan garis dan rotasi arah 180 derajat.",
  ahaMoment: "Perkalian adalah zoom/peregangan, dan tanda minus adalah rotasi 180°!",
  steps: [
    {
      id: "r2-s1",
      type: "provoke",
      title: "Mengapa Negatif Kali Negatif Jadi Positif?",
      naiExpression: "curious",
      naiDialogue: "Banyak orang menghafal rumus tanda. Bisakah kamu melihat alasannya secara kasat mata?",
      provoke: {
        hookTitle: "Mengapa Minus Kali Minus Menghasilkan Plus?",
        hookText: "Bayangkan dua cermin berhadapan. Membalik pandangan satu kali membuat kiri jadi kanan. Membalik sekali lagi mengembalikan ke pandangan asli.",
        interactiveComponentSlug: "math-real-numbers-line",
        initialVariables: { point1: 4, point2: 0, scaleFactor: 2, sqrtN: 2, zoomLevel: 1 },
        question: "Mengapa (-1) × (-1) menghasilkan bilangan positif?",
        options: [
          {
            id: "opt-rot",
            text: "Karena membalik arah 180° sebanyak dua kali mengembalikan kita menghadap ke arah asal (+)",
            responseText: "Tepat sekali! 180° + 180° = 360°, yang berarti kembali menghadap ke arah positif.",
          },
          {
            id: "opt-rule",
            text: "Karena sudah aturan hafalan dari buku cetak matematika.",
            responseText: "Kurang tepat. Di Nalar, kita mencari alasan fisis dan geometris di balik setiap aturan!",
          },
        ],
      },
    },
    {
      id: "r2-s2",
      type: "predict",
      title: "Efek Pengali Skala",
      naiExpression: "thinking",
      naiDialogue: "Perhatikan panah dari 0 ke 3. Jika dikalikan pengali k = -2, ke mana ia pergi?",
      predict: {
        scenarioTitle: "Dilatasi Skalar 1D",
        scenarioText: "Vektor awal memiliki panjang 3 satuan ke kanan. Kita kalikan dengan faktor skala k = -2.",
        question: "Apa yang terjadi pada panjang dan arah panah hasil transformasi?",
        options: [
          {
            id: "pred-len-dir",
            text: "Panjang melar menjadi 6, dan arahnya berbalik ke kiri",
            isCorrect: true,
            feedback: "Hebat! Angka 2 melipatgandakan panjangnya (3 × 2 = 6), dan tanda minus membalik arahnya ke kiri (-6).",
          },
          {
            id: "pred-len-same",
            text: "Panjang tetap 3, arah ke kiri",
            isCorrect: false,
            feedback: "Faktor 2 juga mengubah panjang bentangannya, bukan hanya arahnya.",
          },
          {
            id: "pred-dir-same",
            text: "Panjang menjadi 6, arah tetap ke kanan",
            isCorrect: false,
            feedback: "Tanda minus pada -2 harus membalikkan arah vektor 180° ke kiri!",
          },
        ],
        simulationLabel: "Jalankan Peregangan Skala!",
        interactiveComponentSlug: "math-real-numbers-line",
        initialVariables: { point1: 3, point2: 0, scaleFactor: 1, sqrtN: 2, zoomLevel: 1 },
        simulationVariables: { point1: 3, point2: -6, scaleFactor: -2, sqrtN: 2, zoomLevel: 1 },
      },
    },
    {
      id: "r2-s3",
      type: "guided",
      title: "Simulator Dilatasi 1D",
      naiExpression: "happy",
      naiDialogue: "Geser faktor skala k dari positif ke negatif. Lihat bagaimana garis melar dan berputar balik!",
      guided: {
        instructionTitle: "Laboratorium Skala Peregangan",
        instructionText: "Ubah faktor skala k dari 2 ke 1, lalu ke 0, dan ke -2 untuk mengamati efek geometrisnya.",
        interactiveComponentSlug: "math-real-numbers-line",
        initialVariables: { point1: 4, point2: 0, scaleFactor: -2, sqrtN: 2, zoomLevel: 1 },
        observationTable: {
          headers: ["Faktor Skala k", "Efek Panjang", "Efek Arah"],
          rows: [
            { parameter: "k = 1", expectedValue: "Tetap", unit: "arah kanan" },
            { parameter: "k = -1", expectedValue: "Tetap", unit: "terbalik ke kiri (180°)" },
            { parameter: "k = -2", expectedValue: "Melar 2x", unit: "terbalik ke kiri (180°)" },
          ],
        },
        discoveryQuestion: {
          prompt: "Apa makna geometris dari mengalikan bilangan dengan -1?",
          options: [
            "Rotasi 180° membalik arah tanpa mengubah panjang",
            "Memperkecil bilangan menjadi nol",
            "Menggeser posisi sejauh 1 langkah",
          ],
          correctOption: "Rotasi 180° membalik arah tanpa mengubah panjang",
          insight: "Mengalikan dengan -1 adalah refleksi terhadap titik nol (rotasi setengah lingkaran 180°).",
        },
      },
    },
    {
      id: "r2-s4",
      type: "formalize",
      title: "Aturan Tanda & Nilai Mutlak Hasil Kali",
      naiExpression: "neutral",
      naiDialogue: "Mari formulasikan hukum perkalian tanda berdasarkan rotasi spasial yang baru kamu amati.",
      formalize: {
        title: "Formalisasi Perkalian Skalar",
        prompt: "Lengkapi kaidah tanda perkalian bilangan riil berikut:",
        formulaTemplate: "(+) \\times (-) \\to [blank1] \\quad \\text{dan} \\quad (-) \\times (-) \\to [blank2]",
        blanks: [
          { id: "blank1", label: "Tanda (+)(-)", options: ["Arah Kiri (-)", "Arah Kanan (+)", "Nol"], correctOption: "Arah Kiri (-)" },
          { id: "blank2", label: "Tanda (-)(-)", options: ["Arah Kanan (+)", "Arah Kiri (-)", "Nol"], correctOption: "Arah Kanan (+)" },
        ],
        resolvedFormulaKaTeX: "(-a) \\cdot (-b) = +(a \\cdot b) \\quad \\text{dan} \\quad |a \\cdot b| = |a| \\cdot |b|",
        explanation: "Pembalikan arah dua kali selalu menghasilkan arah positif (+). Panjang hasil kali selalu sama dengan perkalian nilai mutlaknya.",
      },
    },
    {
      id: "r2-s5",
      type: "check",
      title: "Cek Kilat Skalar",
      naiExpression: "thinking",
      naiDialogue: "Hati-hati dengan jebakan tanda beruntun pada soal ini!",
      check: {
        question: "Jika x < 0 dan y < 0, di arah manakah posisi hasil kali -x · y berada di garis bilangan?",
        checkType: "multiple_choice",
        options: [
          { id: "opt-neg", text: "Arah Negatif (Kiri)", isCorrect: true, explanation: "Tepat! Karena x < 0, maka -x adalah positif. Positif dikali y (negatif) menghasilkan bilangan negatif!" },
          { id: "opt-pos", text: "Arah Positif (Kanan)", isCorrect: false, explanation: "Ingat bahwa ada 3 tanda minus: -x adalah positif, tapi y tetap negatif, jadi (+)(-) = (-)." },
          { id: "opt-zero", text: "Tepat di titik Nol", isCorrect: false, explanation: "Karena x dan y bukan nol, hasil kalinya tidak nol." },
        ],
        explanation: "Periksa tanda bertahap: (-x) > 0, y < 0. Maka (-x) · y < 0 (berada di sebelah kiri nol).",
      },
    },
    {
      id: "r2-s6",
      type: "sandbox",
      title: "Playground Skala Bebas",
      naiExpression: "happy",
      naiDialogue: "Uji coba berbagai kombinasi titik awal dan faktor skala di kanvas ini.",
      sandbox: {
        title: "Simulasi Skala & Refleksi",
        instructions: "Atur titik A dan faktor skala k untuk mengamati bayangan dilatasi di garis bilangan.",
        interactiveComponentSlug: "math-real-numbers-line",
        initialVariables: { point1: 4, point2: 0, scaleFactor: -2, sqrtN: 2, zoomLevel: 1 },
      },
    },
    {
      id: "r2-s7",
      type: "challenge",
      title: "Tantangan: Skala Terbalik Menjadi -8",
      naiExpression: "neutral",
      naiDialogue: "Atur titik A = 4 dan faktor skala pengali k = -2 sehingga bayangannya tepat mendarat di -8!",
      challenge: {
        id: "challenge-real-scale-reflection",
        title: "Konfigurasi A = 4 dan k = -2",
        question:
          "Atur titik A = 4 dan faktor skala pengali k = -2 sehingga bayangan titik mendarat tepat di -8!",
        targetCondition: (vars) => {
          return vars.point1 === 4 && vars.scaleFactor === -2;
        },
        hint1Static: "Atur slider titik A ke 4.",
        hint2Static: "Geser faktor skala k ke nilai negatif -2.",
        solutionVariables: { point1: 4, scaleFactor: -2 },
        solutionExplanation: "4 * (-2) = -8.",
        xpReward: 40,
      },
    },
    {
      id: "r2-s8",
      type: "reflect",
      title: "Refleksi Level 2: Simetri Dua Arah",
      naiExpression: "celebrating",
      naiDialogue: "Hebat! Kamu tidak lagi sekadar menghafal rumus tanda perkalian!",
      reflect: {
        title: "Level 2 Tuntas: Skala, Dilatasi, & Tanda",
        takeaways: [
          "Perkalian adalah operasi dilatasi peregangan panjang dari titik origin.",
          "Tanda minus adalah operasi geometri pembalik arah 180°.",
          "Minus kali minus menghasilkan plus karena dua kali rotasi 180° menghasilkan 360° (kembali ke asal).",
        ],
        connectionText: "Di Level 3, kita akan menyelami samudra tak hingga di antara dua bilangan bulat lewat PECAHAN!",
        nextLevelTitle: "Level 3: Pecahan, Desimal, & Kerapatan",
        badgeToUnlock: "pattern-seeker",
        xpReward: 40,
        formulaKaTeX: "(-1) \\cdot (-1) = +1",
      },
    },
  ],
};
