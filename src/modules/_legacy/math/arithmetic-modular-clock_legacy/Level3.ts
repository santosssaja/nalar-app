import { Level } from "@/types/level";

export const level3: Level = {
  id: "clock-level-3",
  index: 3,
  tier: 2,
  title: "Pembagian Modulo & Invers Perkalian Modular",
  description: "Menemukan invers perkalian modular a * x = 1 (mod m) dan kondisi keterbagian.",
  ahaMoment: "Di dunia modulo, pembagian a / b berarti mencari pasangan pengali rahasia yang menghasilkan 1!",
  steps: [
    {
      id: "c3-s1",
      type: "provoke",
      title: "Membagi Tanpa Pecahan!",
      naiExpression: "curious",
      naiDialogue: "Di aritmetika biasa 6 / 2 = 3. Tapi di modulo 6, apakah pembagian selalu bekerja normal?",
      provoke: {
        hookTitle: "Misteri Pembagi Nol di Modulo 6",
        hookText: "Perhatikan bahwa 2 × 3 = 6 ≡ 0 (mod 6). Dua angka bukan nol bisa menghasilkan nol! Ini merusak pembagian biasa.",
        interactiveComponentSlug: "arithmetic-modular-clock",
        initialVariables: { n: 6, hourA: 2, hourB: 3, multiplier: 2 },
        question: "Bagaimana cara kita membagi dengan bilangan bulat b di dunia modulo?",
        options: [
          {
            id: "opt-inv",
            text: "Dengan mencari invers perkalian b⁻¹ sehingga b · b⁻¹ ≡ 1 (mod m)",
            responseText: "Tepat sekali! Membagi dengan b sama persis dengan mengalikan dengan invers modularnya.",
          },
          {
            id: "opt-dec",
            text: "Dengan mengubahnya menjadi angka pecahan desimal koma.",
            responseText: "Di aritmetika jam modulo tidak ada pecahan desimal koma; semua nilai wajib berupa bilangan bulat!",
          },
        ],
      },
    },
    {
      id: "c3-s2",
      type: "predict",
      title: "Berburu Invers di Modulo 7",
      naiExpression: "thinking",
      naiDialogue: "Di modulo 7, adakah angka x sehingga 3 × x menghasilkan sisa 1?",
      predict: {
        scenarioTitle: "Mencari Pasangan Pengali 3",
        scenarioText: "Kita uji kelipatan 3: 3×1=3, 3×2=6, 3×3=9≡2, 3×4=12≡5, 3×5=15.",
        question: "Berapakah 15 mod 7, dan apakah angka 5 adalah invers dari 3?",
        options: [
          {
            id: "pred-yes-5",
            text: "Ya! 15 = 2 × 7 + 1, bersisa 1, jadi invers dari 3 adalah 5",
            isCorrect: true,
            feedback: "Hebat! Karena 3 × 5 ≡ 1 (mod 7), maka membagi dengan 3 di modulo 7 sama saja dengan mengalikan dengan 5!",
          },
          {
            id: "pred-no-5",
            text: "Bukan, inversnya harus berbentuk 1/3",
            isCorrect: false,
            feedback: "Di modulo 7, tidak ada 1/3. Posisi 1/3 digantikan oleh bilangan bulat 5.",
          },
        ],
        simulationLabel: "Buktikan Invers 3 × 5!",
        interactiveComponentSlug: "arithmetic-modular-clock",
        initialVariables: { n: 7, multiplier: 5, hourA: 3, hourB: 0 },
        simulationVariables: { n: 7, multiplier: 5, hourA: 3, hourB: 1 },
      },
    },
    {
      id: "c3-s3",
      type: "guided",
      title: "Eksplorasi Generator & Invers",
      naiExpression: "happy",
      naiDialogue: "Atur multiplier = 5 pada jam n = 7. Amati siklus tali yang mengelilingi seluruh lingkaran!",
      guided: {
        instructionTitle: "Generator Siklus Penuh Modulo 7",
        instructionText: "Amati bagaimana pengali 5 mengunjungi setiap simpul jam secara bergantian tanpa ada yang terlewat.",
        interactiveComponentSlug: "arithmetic-modular-clock",
        initialVariables: { n: 7, multiplier: 5, hourA: 3, hourB: 0 },
        observationTable: {
          headers: ["Angka Asal", "Dikalikan Invers 5", "Hasil Modulo 7"],
          rows: [
            { parameter: "3 × 5 = 15", expectedValue: "15 mod 7 = 1", unit: "invers tercapai" },
            { parameter: "6 × 5 = 30", expectedValue: "30 mod 7 = 2", unit: "setara 6 / 3 = 2" },
          ],
        },
        discoveryQuestion: {
          prompt: "Kapan sebuah bilangan b DIJAMIN MEMILIKI invers di modulo m?",
          options: [
            "Hanya jika FPB(b, m) = 1 (keduanya saling prima / koprima)",
            "Hanya jika b adalah bilangan genap",
            "Selalu ada untuk semua bilangan bulat",
          ],
          correctOption: "Hanya jika FPB(b, m) = 1 (keduanya saling prima / koprima)",
          insight: "Jika FPB(b, m) > 1, maka kelipatannya tidak akan pernah menyentuh angka 1.",
        },
      },
    },
    {
      id: "c3-s4",
      type: "formalize",
      title: "Definisi Formal Invers Modular",
      naiExpression: "neutral",
      naiDialogue: "Mari kita tuangkan teorema eksistensi invers modular ke dalam KaTeX.",
      formalize: {
        title: "Formalisasi Invers Modular",
        prompt: "Lengkapi persamaan eksistensi invers modular berikut:",
        formulaTemplate: "b \\cdot b^{-1} \\equiv [blank1] \\pmod m \\quad \\text{eksis jika dan hanya jika} \\quad \\gcd(b, m) = [blank2]",
        blanks: [
          { id: "blank1", label: "Target Sisa", options: ["1", "0", "m"], correctOption: "1" },
          { id: "blank2", label: "Syarat FPB", options: ["1", "0", "b"], correctOption: "1" },
        ],
        resolvedFormulaKaTeX: "b \\cdot b^{-1} \\equiv 1 \\pmod m \\iff \\gcd(b, m) = 1",
        explanation: "Invers perkalian modular b⁻¹ adalah bilangan bulat pengali yang membawa hasil kali kembali ke identitas 1 modulo m.",
      },
    },
    {
      id: "c3-s5",
      type: "check",
      title: "Deteksi Kemungkinan Invers",
      naiExpression: "thinking",
      naiDialogue: "Periksa angka mana yang memiliki invers di jam modulo 10!",
      check: {
        question: "Manakah angka berikut yang MEMILIKI invers perkalian di modulo 10?",
        checkType: "multiple_choice",
        options: [
          { id: "opt-7", text: "7 (karena FPB(7, 10) = 1, inversnya adalah 3 karena 7 × 3 = 21 ≡ 1)", isCorrect: true, explanation: "Tepat sekali! 7 dan 10 saling prima, dan 7 × 3 = 21 = 2 × 10 + 1." },
          { id: "opt-2", text: "2 (FPB(2, 10) = 2 ≠ 1)", isCorrect: false, explanation: "Kelipatan 2 selalu genap, tidak akan pernah bersisa 1 di modulo 10." },
          { id: "opt-5", text: "5 (FPB(5, 10) = 5 ≠ 1)", isCorrect: false, explanation: "Kelipatan 5 hanya berakhir di angka 0 atau 5, mustahil menghasilkan sisa 1." },
        ],
        explanation: "Hanya angka yang saling koprima dengan 10 (yaitu 1, 3, 7, 9) yang memiliki invers di mod 10.",
      },
    },
    {
      id: "c3-s6",
      type: "sandbox",
      title: "Playground Invers & Multiplier",
      naiExpression: "happy",
      naiDialogue: "Uji coba berbagai multiplier koprima pada lingkaran modulo n = 7.",
      sandbox: {
        title: "Simulasi Invers Modulo",
        instructions: "Atur multiplier = 5 dan variasikan jam A untuk melihat efek perkalian invers.",
        interactiveComponentSlug: "arithmetic-modular-clock",
        initialVariables: { n: 7, multiplier: 5, hourA: 3, hourB: 0 },
      },
    },
    {
      id: "c3-s7",
      type: "challenge",
      title: "Misi: Temukan Generator Siklus",
      naiExpression: "neutral",
      naiDialogue: "Atur modulus n = 7 dan temukan pengali koprima yang merupakan invers dari 3 (Target: multiplier = 5)!",
      challenge: {
        id: "challenge-clock-inverse-generator",
        title: "Pembangkit Siklus Penuh Mod 7",
        question:
          "Atur modulus n = 7 dan temukan pengali (multiplier) koprima yang menghasilkan invers perkalian dari 3 (Target: multiplier = 5 sehingga 3 x 5 = 1 mod 7)!",
        targetCondition: (vars) => {
          return vars.n === 7 && vars.multiplier === 5;
        },
        hint1Static: "Hitung perkalian 3 dengan angka 1 sampai 6 di modulo 7.",
        hint2Static: "3 x 5 = 15. Berapakah 15 mod 7? Tepat 1! Atur multiplier ke 5.",
        solutionVariables: { n: 7, multiplier: 5 },
        solutionExplanation: "3 * 5 = 15 = 2 * 7 + 1 ≡ 1 (mod 7). Maka invers dari 3 mod 7 adalah 5.",
        xpReward: 50,
      },
    },
    {
      id: "c3-s8",
      type: "reflect",
      title: "Refleksi Level 3: Pembagian Tanpa Pecahan",
      naiExpression: "celebrating",
      naiDialogue: "Luar biasa! Kamu baru saja belajar membagi tanpa pernah menyentuh pecahan desimal!",
      reflect: {
        title: "Level 3 Tuntas: Invers Perkalian Modular",
        takeaways: [
          "Pembagian di modulo didefinisikan sebagai perkalian dengan invers modular.",
          "Invers hanya eksis jika bilangan pembagi koprima dengan modulusnya: FPB(b, m) = 1.",
          "Invers modular adalah fondasi algoritma enkripsi asimetris RSA modern.",
        ],
        connectionText: "Di Level 4, kita akan melihat bagaimana perkalian modular melahirkan kurva seni kardioid yang memukau!",
        nextLevelTitle: "Level 4: Geometri Fraktal Kardioid",
        badgeToUnlock: "pattern-seeker",
        xpReward: 50,
        formulaKaTeX: "a \\cdot x \\equiv 1 \\pmod m",
      },
    },
  ],
};
