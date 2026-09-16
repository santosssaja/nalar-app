import { Level } from "@/types/level";

export const level3: Level = {
  id: "real-level-3",
  index: 3,
  tier: 2,
  title: "Pecahan, Desimal, & Kerapatan Tak Hingga",
  description: "Menjelajahi kontinuitas garis bilangan dan menemukan titik tengah pecahan.",
  ahaMoment: "Di antara dua bilangan sekecil apa pun, selalu ada samudra bilangan tak hingga!",
  steps: [
    {
      id: "r3-s1",
      type: "provoke",
      title: "Apakah Garis Bilangan Punya Lubang?",
      naiExpression: "curious",
      naiDialogue: "Jika kita melompat dari 0 ke 1, apakah kita melompati kehampaan, atau ada dunia lain di sana?",
      provoke: {
        hookTitle: "Apakah Garis Bilangan Berlubang?",
        hookText: "Pada penggaris biasa, kita hanya melihat bilangan bulat 0, 1, 2. Namun ruang fisik di antaranya dapat diperbesar tanpa henti.",
        interactiveComponentSlug: "math-real-numbers-line",
        initialVariables: { point1: 0, point2: 1, scaleFactor: 1, sqrtN: 2, zoomLevel: 1 },
        question: "Berapa banyak bilangan yang terletak di antara 0 dan 1?",
        options: [
          {
            id: "opt-inf",
            text: "Tak terhingga banyaknya bilangan pecahan dan desimal",
            responseText: "Tepat sekali! Selalu ada bilangan baru seperti 1/2, 1/4, 1/8, 0.001 yang tak pernah habis.",
          },
          {
            id: "opt-ten",
            text: "Hanya ada 9 bilangan desimal (0.1 sampai 0.9)",
            responseText: "Kurang tepat. Di antara 0.1 dan 0.2 masih ada 0.11, 0.12, dan seterusnya tanpa batas!",
          },
        ],
      },
    },
    {
      id: "r3-s2",
      type: "predict",
      title: "Siapa di Tengah-Tengah?",
      naiExpression: "thinking",
      naiDialogue: "Bisakah kamu menemukan pecahan yang persis berada di antara 1/3 dan 1/2?",
      predict: {
        scenarioTitle: "Mencari Titik Tengah Pecahan",
        scenarioText: "Dua titik berada di 1/3 (≈ 0.333) dan 1/2 (= 0.500). Kita ingin mencari titik tengah M = (A + B) / 2.",
        question: "Pecahan berapakah yang berada persis di tengah-tengah 1/3 dan 1/2?",
        options: [
          {
            id: "pred-5-12",
            text: "5/12",
            isCorrect: true,
            feedback: "Benar! (1/3 + 1/2) / 2 = (2/6 + 3/6) / 2 = (5/6) / 2 = 5/12 ≈ 0.4167.",
          },
          {
            id: "pred-2-5",
            text: "2/5",
            isCorrect: false,
            feedback: "2/5 = 0.400, mendekati tapi bukan titik tengah eksak dari 1/3 dan 1/2.",
          },
          {
            id: "pred-none",
            text: "Tidak ada pecahan lagi di antaranya",
            isCorrect: false,
            feedback: "Garis bilangan memiliki sifat kerapatan; selalu ada pecahan di antara dua bilangan rasional!",
          },
        ],
        simulationLabel: "Buktikan Titik Tengah!",
        interactiveComponentSlug: "math-real-numbers-line",
        initialVariables: { point1: 0, point2: 1, scaleFactor: 1, sqrtN: 2, zoomLevel: 1.5 },
        simulationVariables: { point1: 2, point2: 6, scaleFactor: 1, sqrtN: 2, zoomLevel: 2 },
      },
    },
    {
      id: "r3-s3",
      type: "guided",
      title: "Zoom Tak Hingga: Kerapatan Pecahan",
      naiExpression: "happy",
      naiDialogue: "Perbesar skala zoom kanvas untuk melihat pembagian garis mikro di antara bilangan!",
      guided: {
        instructionTitle: "Eksplorasi Sifat Kerapatan (Density)",
        instructionText: "Gunakan pengatur zoom untuk mengamati bagaimana setiap segmen dapat terus dibagi menjadi bagian yang lebih kecil.",
        interactiveComponentSlug: "math-real-numbers-line",
        initialVariables: { point1: 2, point2: 6, scaleFactor: 1, sqrtN: 2, zoomLevel: 1.5 },
        observationTable: {
          headers: ["Rentang Awal", "Pembagi", "Titik Tengah Dihasilkan"],
          rows: [
            { parameter: "0 sampai 1", expectedValue: "0.5 (1/2)", unit: "titik tengah" },
            { parameter: "0 sampai 0.5", expectedValue: "0.25 (1/4)", unit: "titik tengah" },
          ],
        },
        discoveryQuestion: {
          prompt: "Berapa kali kita bisa membagi dua jarak antara dua titik sebelum kehabisan tempat?",
          options: [
            "Tak terhingga kali tanpa pernah habis",
            "Maksimal 100 kali pembagian",
            "Hanya sampai skala milimeter",
          ],
          correctOption: "Tak terhingga kali tanpa pernah habis",
          insight: "Ruang bilangan rasional padat (dense): di antara sembarang dua bilangan riil a < b selalu ada bilangan ketiga c = (a+b)/2.",
        },
      },
    },
    {
      id: "r3-s4",
      type: "formalize",
      title: "Definisi Bilangan Rasional & Titik Tengah",
      naiExpression: "neutral",
      naiDialogue: "Mari formulasikan definisi himpunan bilangan rasional Q dan rumus titik tengahnya.",
      formalize: {
        title: "Formalisasi Bilangan Rasional",
        prompt: "Lengkapi definisi himpunan rasional dan rumus titik tengah berikut:",
        formulaTemplate: "\\mathbb{Q} = \\left\\{ \\frac{p}{q} \\mid p,q \\in \\mathbb{Z}, q \\neq [blank1] \\right\\} \\quad \\text{dan} \\quad x_{\\text{mid}} = [blank2]",
        blanks: [
          { id: "blank1", label: "Syarat Penyebut", options: ["0", "1", "-1"], correctOption: "0" },
          { id: "blank2", label: "Rumus Titik Tengah", options: ["\\frac{x_1 + x_2}{2}", "x_2 - x_1", "\\sqrt{x_1 x_2}"], correctOption: "\\frac{x_1 + x_2}{2}" },
        ],
        resolvedFormulaKaTeX: "\\mathbb{Q} = \\left\\{ \\frac{p}{q} \\mid p,q \\in \\mathbb{Z}, q \\neq 0 \\right\\} \\quad \\text{dan} \\quad x_{\\text{mid}} = \\frac{x_1 + x_2}{2}",
        explanation: "Bilangan rasional adalah rasio dua bilangan bulat dengan penyebut bukan nol. Rata-rata dua bilangan selalu menjadi titik tengah yang sah.",
      },
    },
    {
      id: "r3-s5",
      type: "check",
      title: "Cek Nalar Kerapatan",
      naiExpression: "thinking",
      naiDialogue: "Periksa kembali pemahamanmu tentang kepadatan bilangan desimal!",
      check: {
        question: "Berapa banyak bilangan rasional yang ada di antara 0.99 dan 1.00?",
        checkType: "multiple_choice",
        options: [
          { id: "opt-inf-check", text: "Tak terhingga banyaknya (misal 0.991, 0.9905, ...)", isCorrect: true, explanation: "Benar! Tidak peduli seberapa rapat dua bilangan, selalu ada tak terhingga pecahan di antaranya." },
          { id: "opt-zero-check", text: "Nol buah, karena 0.99 langsung melompat ke 1.00", isCorrect: false, explanation: "0.99 dan 1.00 bukan bilangan bulat yang bersebelahan; ini adalah desimal kontinu." },
          { id: "opt-nine-check", text: "Tepat 9 buah", isCorrect: false, explanation: "9 buah hanya jika kita membatasi 3 desimal saja, padahal desimal bisa memiliki digit tak hingga." },
        ],
        explanation: "Sifat kerapatan menjamin tak terhingga bilangan rasional di antara sembarang interval terbuka sekecil apa pun.",
      },
    },
    {
      id: "r3-s6",
      type: "sandbox",
      title: "Playground Zoom Kerapatan",
      naiExpression: "happy",
      naiDialogue: "Eksplorasi posisi titik dan pembesaran zoom garis bilangan mikro!",
      sandbox: {
        title: "Simulasi Zoom Titik Pecahan",
        instructions: "Ubah slider zoomLevel dan posisi titik untuk mengamati pembagian desimal.",
        interactiveComponentSlug: "math-real-numbers-line",
        initialVariables: { point1: 2, point2: 6, scaleFactor: 1, sqrtN: 2, zoomLevel: 1.5 },
      },
    },
    {
      id: "r3-s7",
      type: "challenge",
      title: "Misi: Titik Tengah Simetris",
      naiExpression: "neutral",
      naiDialogue: "Atur titik A di -5 dan titik B di nilai simetris positif sehingga titik tengahnya persis berada di angka 0!",
      challenge: {
        id: "challenge-real-midpoint",
        title: "Temukan Titik Tengah Nol (M = 0)",
        question:
          "Atur titik A di -5 dan titik B di nilai simetris positif sehingga titik tengahnya persis berada di angka 0!",
        targetCondition: (vars) => {
          return vars.point1 === -5 && vars.point2 === 5;
        },
        hint1Static: "Agar titik tengah = 0, penjumlahan A + B harus bernilai 0.",
        hint2Static: "Lawan dari -5 adalah +5. Geser B ke 5.",
        solutionVariables: { point1: -5, point2: 5 },
        solutionExplanation: "(-5 + 5) / 2 = 0 / 2 = 0.",
        xpReward: 50,
      },
    },
    {
      id: "r3-s8",
      type: "reflect",
      title: "Refleksi Level 3: Samudra Kontinu",
      naiExpression: "celebrating",
      naiDialogue: "Selamat! Sekarang garis bilanganmu sudah padat terisi oleh pecahan tak hingga.",
      reflect: {
        title: "Level 3 Tuntas: Pecahan & Kerapatan",
        takeaways: [
          "Himpunan bilangan rasional Q dapat dinyatakan sebagai pecahan p/q (q ≠ 0).",
          "Sifat kerapatan memastikan tidak ada dua bilangan rasional yang 'bersebelahan langsung'.",
          "Titik tengah antara dua titik selalu dihitung dengan rata-rata aritmetika (a + b) / 2.",
        ],
        connectionText: "Namun... apakah semua titik di garis bilangan sudah terisi penuh oleh pecahan? Temukan jawabannya di Level 4!",
        nextLevelTitle: "Level 4: Penemuan Bilangan Irasional (√2)",
        badgeToUnlock: "fraction-diver",
        xpReward: 50,
        formulaKaTeX: "x_{\\text{mid}} = \\frac{x_1 + x_2}{2}",
      },
    },
  ],
};
