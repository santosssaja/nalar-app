import { Level } from "@/types/level";

export const level5: Level = {
  id: "clock-level-5",
  index: 5,
  tier: 3,
  title: "Kriptografi Sandi Caesar & Affine",
  description: "Aplikasi aritmetika modular dalam penyandian pesan rahasia alfabet mod 26.",
  ahaMoment: "Pesan rahasia dienkripsi dengan menggeser atau mengalikan huruf di jam modulo 26!",
  steps: [
    {
      id: "c5-s1",
      type: "provoke",
      title: "Sandi Kaisar Julius Caesar",
      naiExpression: "curious",
      naiDialogue: "Kaisar Romawi mengirim pesan dengan memutar alfabet 3 langkah (A -> D). Bisakah kamu memecahkannya?",
      provoke: {
        hookTitle: "Enkripsi Alfabet Modulo 26",
        hookText: "Huruf A-Z dipetakan ke angka 0 sampai 25. Sandi Caesar menggeser setiap huruf sebesar kunci k: C = (P + k) mod 26.",
        interactiveComponentSlug: "arithmetic-modular-clock",
        initialVariables: { n: 26, hourA: 3, hourB: 7, multiplier: 3 },
        question: "Jika kunci k = 3, ke huruf apakah huruf Z (angka 25) berubah setelah berputar melintasi titik 0?",
        options: [
          {
            id: "opt-c",
            text: "Huruf C (angka 2, karena (25 + 3) mod 26 = 28 mod 26 = 2)",
            responseText: "Tepat sekali! Huruf berputar kembali ke awal alfabet layaknya jarum jam melintasi angka 12.",
          },
          {
            id: "opt-space",
            text: "Hilang menjadi spasi kosong karena melebihi batas 26 huruf.",
            responseText: "Kurang tepat. Di aritmetika modulo 26, tidak ada angka yang hilang, semua berputar kembali ke 0, 1, 2.",
          },
        ],
      },
    },
    {
      id: "c5-s2",
      type: "predict",
      title: "Arah Dekripsi Sandi",
      naiExpression: "thinking",
      naiDialogue: "Jika enkripsi adalah penambahan k, bagaimana cara mendekripsi kembali pesan rahasia?",
      predict: {
        scenarioTitle: "Membalikkan Sandi Caesar",
        scenarioText: "Enkripsi menggeser maju C = (P + k) mod 26.",
        question: "Operasi manakah yang membalikkan sandi untuk mendapatkan kembali teks asli P?",
        options: [
          {
            id: "pred-sub",
            text: "P = (C - k) mod 26 (menggeser mundur sebesar kunci k)",
            isCorrect: true,
            feedback: "Benar! Dekripsi adalah operasi invers dari enkripsi: memutar jarum jam berlawanan arah.",
          },
          {
            id: "pred-mul",
            text: "P = (C × k) mod 26",
            isCorrect: false,
            feedback: "Perkalian bukan kebalikan dari penjumlahan.",
          },
        ],
        simulationLabel: "Dekripsikan Pesan!",
        interactiveComponentSlug: "arithmetic-modular-clock",
        initialVariables: { n: 26, hourA: 23, hourB: 5, multiplier: 3 },
        simulationVariables: { n: 26, hourA: 23, hourB: 5, multiplier: 3 },
      },
    },
    {
      id: "c5-s3",
      type: "guided",
      title: "Matematika Sandi Caesar (Mod 26)",
      naiExpression: "happy",
      naiDialogue: "Atur n = 26 untuk mengamati perputaran 26 huruf alfabet pada lingkaran modulo!",
      guided: {
        instructionTitle: "Roda Sandi Modulo 26",
        instructionText: "Atur n = 26 untuk mengamati bagaimana posisi jam A (teks asli) digeser oleh jam B (kunci sandi).",
        interactiveComponentSlug: "arithmetic-modular-clock",
        initialVariables: { n: 26, hourA: 23, hourB: 5, multiplier: 3 },
        observationTable: {
          headers: ["Huruf Asli P", "Kunci Pergeseran k", "Huruf Sandi C (mod 26)"],
          rows: [
            { parameter: "X (23)", expectedValue: "+ 5 langkah", unit: "C (2)" },
            { parameter: "A (0)", expectedValue: "+ 3 langkah", unit: "D (3)" },
          ],
        },
        discoveryQuestion: {
          prompt: "Mengapa pergeseran 26 langkah menghasilkan teks yang sama persis dengan aslinya?",
          options: [
            "Karena 26 mod 26 = 0 (satu putaran penuh kembali ke tempat semula)",
            "Karena kunci 26 dilarang dalam kriptografi",
            "Hanya kebetulan belaka",
          ],
          correctOption: "Karena 26 mod 26 = 0 (satu putaran penuh kembali ke tempat semula)",
          insight: "Kunci k = 0 dan k = 26 adalah identitas netral yang tidak mengubah teks sama sekali.",
        },
      },
    },
    {
      id: "c5-s4",
      type: "formalize",
      title: "Rumus Enkripsi & Dekripsi Caesar",
      naiExpression: "neutral",
      naiDialogue: "Mari formulasikan sandi Caesar dan sandi Affine ke dalam KaTeX.",
      formalize: {
        title: "Formula Sandi Caesar & Affine",
        prompt: "Lengkapi persamaan enkripsi dan dekripsi modular berikut:",
        formulaTemplate: "C \\equiv (P + k) \\pmod{26} \\quad \\text{dan} \\quad P \\equiv (C [blank1] k) \\pmod{26}",
        blanks: [
          { id: "blank1", label: "Operasi Dekripsi", options: ["-", "+", "\\times"], correctOption: "-" },
        ],
        resolvedFormulaKaTeX: "C \\equiv (P + k) \\pmod{26} \\quad \\text{dan} \\quad P \\equiv (C - k) \\pmod{26}",
        explanation: "Sandi Caesar adalah translasi modular 1D pada cincin Z_26.",
      },
    },
    {
      id: "c5-s5",
      type: "check",
      title: "Validasi Kunci Sandi Affine",
      naiExpression: "thinking",
      naiDialogue: "Pada sandi Affine C = (aP + b) mod 26, pengali a tidak boleh sembarangan!",
      check: {
        question: "Manakah nilai a berikut yang VALID untuk digunakan sebagai pengali sandi Affine di mod 26?",
        checkType: "multiple_choice",
        options: [
          { id: "opt-3-aff", text: "a = 3 (karena FPB(3, 26) = 1, sehingga memiliki invers dekripsi)", isCorrect: true, explanation: "Benar! a wajib memiliki invers di mod 26 agar pesan bisa didekripsi kembali secara unik." },
          { id: "opt-2-aff", text: "a = 2 (FPB(2, 26) = 2 ≠ 1)", isCorrect: false, explanation: "Jika a = 2, huruf genap dan ganjil akan bertumpuk dan pesan tidak bisa didekripsi!" },
          { id: "opt-13-aff", text: "a = 13 (FPB(13, 26) = 13 ≠ 1)", isCorrect: false, explanation: "13 membagi 26, sehingga terjadi tabrakan sandi parah." },
        ],
        explanation: "Kunci perkalian modular harus saling prima dengan ukuran alfabet: FPB(a, 26) = 1.",
      },
    },
    {
      id: "c5-s6",
      type: "sandbox",
      title: "Roda Sandi Modulo 26",
      naiExpression: "happy",
      naiDialogue: "Eksplorasi perputaran 26 huruf alfabet pada lingkaran modulo!",
      sandbox: {
        title: "Simulasi Roda Sandi Caesar",
        instructions: "Atur n = 26 untuk mengamati perputaran alfabet pada jam 26 titik.",
        interactiveComponentSlug: "arithmetic-modular-clock",
        initialVariables: { n: 26, hourA: 3, hourB: 7, multiplier: 3 },
      },
    },
    {
      id: "c5-s7",
      type: "challenge",
      title: "Tantangan: Dekripsi Huruf Sandi",
      naiExpression: "neutral",
      naiDialogue: "Pada n = 26, huruf awal di A = 23 (X). Temukan pergeseran B agar mendarat tepat di 2 (C)!",
      challenge: {
        id: "challenge-clock-crypto-caesar",
        title: "Pecahkan Kunci Sandi Caesar",
        question:
          "Pada lingkaran n = 26, sebuah huruf asli berada di posisi jam A = 23 (huruf X). Temukan pergeseran jam B agar hasil akhirnya mendarat tepat di posisi 2 (huruf C) setelah berputar melintasi titik 0!",
        targetCondition: (vars) => {
          const n = vars.n || 0;
          const res = (((vars.hourA || 0) + (vars.hourB || 0)) % 26 + 26) % 26;
          return n === 26 && vars.hourA === 23 && res === 2;
        },
        hint1Static: "Hitung (23 + B) mod 26 = 2.",
        hint2Static: "Dari 23 ke 26 butuh 3 langkah. Dari 0 ke 2 butuh 2 langkah. Total langkah = 5.",
        solutionVariables: { n: 26, hourA: 23, hourB: 5 },
        solutionExplanation: "(23 + 5) mod 26 = 28 mod 26 = 2. Pergeseran kunci adalah 5.",
        xpReward: 60,
      },
    },
    {
      id: "c5-s8",
      type: "reflect",
      title: "Refleksi Level 5: Keamanan & Kriptografi",
      naiExpression: "celebrating",
      naiDialogue: "Hebat! Kamu telah melihat bagaimana operasi modular melindungi kerahasiaan informasi dunia.",
      reflect: {
        title: "Level 5 Tuntas: Kriptografi Sandi Caesar",
        takeaways: [
          "Sandi Caesar adalah translasi sisa bagi pada modulo ukuran alfabet (mod 26).",
          "Sandi Affine menggabungkan perkalian dan pergeseran: C ≡ (aP + b) mod 26.",
          "Syarat kunci perkalian yang aman adalah harus saling prima dengan modulusnya.",
        ],
        connectionText: "Saatnya menguji seluruh keahlian modul ini di tantangan pamungkas: Boss Level!",
        nextLevelTitle: "Boss Level: Ujian Modul Aritmetika Jam",
        badgeToUnlock: "pattern-seeker",
        xpReward: 60,
        formulaKaTeX: "C \\equiv (a \\cdot P + b) \\pmod{26}",
      },
    },
  ],
};
