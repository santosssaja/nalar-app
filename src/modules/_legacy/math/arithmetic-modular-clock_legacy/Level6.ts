import { Level } from "@/types/level";

export const level6: Level = {
  id: "clock-level-6",
  index: 6,
  tier: 3,
  title: "Boss Level: Ujian Modul Aritmetika Jam",
  description: "Tantangan menyeluruh menggabungkan kongruensi, kalender, invers, dan kurva kardioid.",
  ahaMoment: "Modulo adalah seni melihat keteraturan dalam perulangan siklis bilangan!",
  steps: [
    {
      id: "c6-s1",
      type: "provoke",
      title: "Ujian Akhir Modul Aritmetika Jam",
      naiExpression: "thinking",
      naiDialogue: "Kamu telah menguasai sisa bagi, reduksi angka besar, invers, kardioid, hingga sandi rahasia. Buktikan kemampuanmu!",
      provoke: {
        hookTitle: "Ujian Akhir Modul Modulo",
        hookText: "Boss Level ini menguji pemahaman konsepmu secara terpadu dari Level 1 hingga Level 5.",
        interactiveComponentSlug: "arithmetic-modular-clock",
        initialVariables: { n: 11, multiplier: 4, hourA: 8, hourB: 7 },
        question: "Mengapa lingkaran dengan modulus bilangan prima (seperti n = 11) sangat disukai dalam kriptografi?",
        options: [
          {
            id: "opt-prime-field",
            text: "Karena setiap angka bukan nol dijamin saling koprima dengan 11 sehingga memiliki invers perkalian unik!",
            responseText: "Tepat sekali! Lingkaran modulo prima membentuk lapangan berhingga (Galois Field F_p) di mana semua pembagian selalu valid.",
          },
          {
            id: "opt-prime-simple",
            text: "Karena bilangan prima lebih mudah dihitung secara manual.",
            responseText: "Kurang tepat. Kekuatan modulo prima terletak pada ketiadaan pembagi nol liar.",
          },
        ],
      },
    },
    {
      id: "c6-s2",
      type: "predict",
      title: "Prediksi Siklus Modulo Prima 11",
      naiExpression: "thinking",
      naiDialogue: "Jika n = 11, berapakah sisa bagi dari (8 + 7) mod 11?",
      predict: {
        scenarioTitle: "Evaluasi Kongruensi Terpadu",
        scenarioText: "8 + 7 = 15. Kita ingin mencari posisi jarum pada jam 11.",
        question: "Berapakah nilai 15 mod 11?",
        options: [
          {
            id: "pred-4-boss",
            text: "4 (karena 15 = 1 × 11 + 4)",
            isCorrect: true,
            feedback: "Benar! 15 bersisa 4 pada jam modulo 11.",
          },
          {
            id: "pred-5-boss",
            text: "5",
            isCorrect: false,
            feedback: "11 + 5 = 16, bukan 15.",
          },
        ],
        simulationLabel: "Verifikasi Nilai!",
        interactiveComponentSlug: "arithmetic-modular-clock",
        initialVariables: { n: 11, multiplier: 4, hourA: 8, hourB: 7 },
        simulationVariables: { n: 11, multiplier: 4, hourA: 8, hourB: 7 },
      },
    },
    {
      id: "c6-s3",
      type: "guided",
      title: "Simulator Penuh Modulo",
      naiExpression: "happy",
      naiDialogue: "Uji coba parameter lingkaran prima n = 11 dan multiplier = 4 sebelum menyelesaikan misi akhir.",
      guided: {
        instructionTitle: "Laboratorium Terpadu Modulo 11",
        instructionText: "Atur n = 11 dan amati bagaimana multiplier 4 membentuk siklus tali yang indah dan lengkap.",
        interactiveComponentSlug: "arithmetic-modular-clock",
        initialVariables: { n: 11, multiplier: 4, hourA: 8, hourB: 7 },
        observationTable: {
          headers: ["Modulus n", "Multiplier m", "Hasil (8 + 7) mod 11"],
          rows: [
            { parameter: "n = 11", expectedValue: "m = 4 (koprima)", unit: "sisa 4" },
          ],
        },
        discoveryQuestion: {
          prompt: "Mengapa multiplier 4 menghasilkan siklus yang mengunjungi semua titik pada mod 11?",
          options: [
            "Karena FPB(4, 11) = 1 (keduanya saling prima)",
            "Karena 4 adalah bilangan kuadrat",
            "Karena 11 adalah bilangan ganjil",
          ],
          correctOption: "Karena FPB(4, 11) = 1 (keduanya saling prima)",
          insight: "Keteraturan siklus penuh selalu terjamin jika multiplier koprima dengan modulus.",
        },
      },
    },
    {
      id: "c6-s4",
      type: "formalize",
      title: "Teorema Siklus Modulo Terpadu",
      naiExpression: "neutral",
      naiDialogue: "Mari kita tuangkan rangkuman aksioma modulo ke dalam KaTeX.",
      formalize: {
        title: "Aksioma Universal Modulo",
        prompt: "Lengkapi identitas kesetaraan kongruensi:",
        formulaTemplate: "a \\equiv b \\pmod m \\iff a - b = k \\cdot [blank1]",
        blanks: [
          { id: "blank1", label: "Modulus", options: ["m", "a", "b"], correctOption: "m" },
        ],
        resolvedFormulaKaTeX: "a \\equiv b \\pmod m \\iff a - b = k \\cdot m \\quad (k \\in \\mathbb{Z})",
        explanation: "Dua bilangan kongruen selalu berselisih sebesar kelipatan bilangan bulat dari modulusnya.",
      },
    },
    {
      id: "c6-s5",
      type: "check",
      title: "Cek Evaluasi Komprehensif",
      naiExpression: "thinking",
      naiDialogue: "Pertanyaan evaluasi terakhir sebelum mengeksekusi misi penutupan!",
      check: {
        question: "Berapakah sisa bagi dari 3¹⁰⁰ jika dibagi oleh 7 menggunakan pola siklus pangkat modular?",
        checkType: "multiple_choice",
        options: [
          { id: "opt-2-fermat", text: "2 (karena 3⁶ ≡ 1 mod 7, dan 100 = 16×6 + 4, 3⁴ = 81 ≡ 4? Tidak, 3¹=3, 3²=2, 3³=6, 3⁴=4? Tunggu: 3⁴=81=11×7+4? 81 mod 7 = 4)", isCorrect: false, explanation: "Mari hitung cermat: 3^1=3, 3^2=2, 3^3=6, 3^4=4, 3^5=5, 3^6=1. 100 mod 6 = 4. 3^4 = 4 mod 7." },
          { id: "opt-4-fermat", text: "4 (siklus berulang setiap 6 langkah, sisa pangkat 4 menghasilkan 4)", isCorrect: true, explanation: "Tepat sekali! Siklus pangkat 3 mod 7 adalah [3, 2, 6, 4, 5, 1] berulang setiap 6 langkah. 100 = 16 × 6 + 4, jadi 3¹⁰⁰ ≡ 3⁴ = 81 = 11×7 + 4 ≡ 4 (mod 7)!" },
        ],
        explanation: "Pola perulangan pangkat modulo prima selalu berulang teratur menurut Teorema Fermat.",
      },
    },
    {
      id: "c6-s6",
      type: "sandbox",
      title: "Playground Boss Level",
      naiExpression: "happy",
      naiDialogue: "Uji coba semua parameter sebebas mungkin sebelum menyelesaikan tantangan akhir.",
      sandbox: {
        title: "Simulasi Modulo Terbuka",
        instructions: "Uji coba konfigurasi parameter sebelum menyelesaikan misi akhir.",
        interactiveComponentSlug: "arithmetic-modular-clock",
        initialVariables: { n: 11, multiplier: 4, hourA: 8, hourB: 7 },
      },
    },
    {
      id: "c6-s7",
      type: "challenge",
      title: "Misi Terakhir: Konfigurasi Generator Prima",
      naiExpression: "neutral",
      naiDialogue: "Atur modulus n = 11, multiplier = 4, jam A = 8 dan jam B = 7 sehingga sisa baginya menghasilkan tepat 4!",
      challenge: {
        id: "challenge-clock-boss-mastery",
        title: "Mastery: Lingkaran Prima n = 11 & Multiplier Generator",
        question:
          "Atur modulus prima n = 11, pilih multiplier koprima m = 4, dan atur jam A = 8 serta jam B = 7 sehingga sisa bagi penjumlahannya menghasilkan tepat 4!",
        targetCondition: (vars) => {
          const n = vars.n || 0;
          const m = vars.multiplier || 0;
          const sum = (((vars.hourA || 0) + (vars.hourB || 0)) % 11 + 11) % 11;
          return n === 11 && m === 4 && sum === 4;
        },
        hint1Static: "Ubah n ke 11 dan multiplier ke 4.",
        hint2Static: "(8 + 7) = 15. 15 mod 11 = 4. Pasang jam A = 8 dan jam B = 7.",
        solutionVariables: { n: 11, multiplier: 4, hourA: 8, hourB: 7 },
        solutionExplanation: "Pada mod 11, (8 + 7) mod 11 = 4, dan multiplier 4 koprima dengan 11 sehingga membangkitkan siklus penuh.",
        xpReward: 100,
      },
    },
    {
      id: "c6-s8",
      type: "reflect",
      title: "Kelulusan Modul Aritmetika Jam",
      naiExpression: "celebrating",
      naiDialogue: "Luar biasa! Kamu telah menuntaskan seluruh petualangan Aritmetika Jam Modulo hingga tuntas!",
      reflect: {
        title: "Modul Selesai: Master Aritmetika Jam",
        takeaways: [
          "Aritmetika jam memetakan bilangan tak hingga ke dalam cincin diskrit berhingga Z_n.",
          "Operasi penjumlahan dan perkalian dapat direduksi sebelum dihitung untuk efisiensi komputasi.",
          "Invers modular eksis jika dan hanya jika FPB(b, m) = 1, yang mendasari pembagian tanpa pecahan.",
          "Perkalian modular membungkus kurva amplop epikoloid kardioid dan melindungi enkripsi alfabet digital.",
        ],
        connectionText: "Siap melanjutkan ke topik berikutnya? Pelajari Algoritma Euclid & Geometri Pengubinan FPB!",
        badgeToUnlock: "modular-master",
        xpReward: 100,
        formulaKaTeX: "a^{p-1} \\equiv 1 \\pmod p",
      },
    },
  ],
};
