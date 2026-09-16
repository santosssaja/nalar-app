import { Level } from "@/types/level";

export const level1: Level = {
  id: "clock-level-1",
  index: 1,
  tier: 1,
  title: "Konsep Dasar Modulo & Sisa Bagi",
  description: "Memahami bilangan bulat sebagai perputaran siklis pada jam dinding.",
  ahaMoment: "Jika garis bilangan digulung pada lingkaran, angka 12 dan angka 0 berada di tempat yang sama!",
  steps: [
    {
      id: "c1-s1",
      type: "provoke",
      title: "Teka-Teki Jam Dinding",
      naiExpression: "curious",
      naiDialogue: "Sekarang pukul 9. Jika kita menunggu 5 jam lagi, mengapa kita tidak menyebutnya pukul 14?",
      provoke: {
        hookTitle: "Teka-Teki Jam Dinding",
        hookText: "Pada jam analog biasa, jarum jam hanya memiliki angka 1 sampai 12. Setelah melewati angka 12, putaran kembali mengulang dari awal.",
        interactiveComponentSlug: "arithmetic-modular-clock",
        initialVariables: { n: 12, hourA: 9, hourB: 5, multiplier: 2 },
        question: "Mengapa kita menyebut 9 + 5 sebagai pukul 2 di jam dinding biasa?",
        options: [
          {
            id: "opt-cycle",
            text: "Karena setelah 12, hitungan jam berulang kembali ke sisa putarannya (14 - 12 = 2)",
            responseText: "Tepat sekali! Inilah konsep inti dari aritmetika modular: perulangan siklis dengan sisa pembagian.",
          },
          {
            id: "opt-broken",
            text: "Karena jam dinding tidak bisa berputar lebih dari 12 jam.",
            responseText: "Jarum jam tetap berputar terus tanpa henti, tetapi posisinya berulang setiap 12 jam sekali.",
          },
        ],
      },
    },
    {
      id: "c1-s2",
      type: "predict",
      title: "Di Mana Jarum Berhenti?",
      naiExpression: "thinking",
      naiDialogue: "Pada lingkaran modulo 7, jika kita melompat 16 langkah dari posisi 5, di mana jarum berhenti?",
      predict: {
        scenarioTitle: "Lompatan Siklus Modulo 7",
        scenarioText: "Lingkaran modulus bernilai m = 7 (angka 0 sampai 6). Jarum berada di 5 dan melangkah maju 16 langkah.",
        question: "Di angka berapakah jarum jam akan berhenti?",
        options: [
          {
            id: "pred-0",
            text: "0",
            isCorrect: true,
            feedback: "Benar! Posisi awal 5 + 16 langkah = 21. Karena 21 adalah kelipatan tepat dari 7 (21 = 3 × 7), sisa baginya adalah 0!",
          },
          {
            id: "pred-2",
            text: "2",
            isCorrect: false,
            feedback: "16 mod 7 memang 2, tetapi posisi awal jarum berada di 5, sehingga (5 + 16) mod 7 = 21 mod 7 = 0.",
          },
          {
            id: "pred-5",
            text: "5",
            isCorrect: false,
            feedback: "16 langkah memutar jarum lebih dari 2 putaran penuh.",
          },
        ],
        simulationLabel: "Putar Jarum Jam!",
        interactiveComponentSlug: "arithmetic-modular-clock",
        initialVariables: { n: 7, hourA: 5, hourB: 0, multiplier: 2 },
        simulationVariables: { n: 7, hourA: 5, hourB: 2, multiplier: 2 },
      },
    },
    {
      id: "c1-s3",
      type: "guided",
      title: "Menggulung Garis Lurus: Jam Modulo",
      naiExpression: "happy",
      naiDialogue: "Geser nilai jam A dan B untuk mengamati bagaimana garis bilangan tak hingga digulung rapi!",
      guided: {
        instructionTitle: "Laboratorium Sisa Pembagian Modular",
        instructionText: "Ubah nilai jam A dan B pada jam modulo 12 untuk melihat hasil perputaran jarum jam.",
        interactiveComponentSlug: "arithmetic-modular-clock",
        initialVariables: { n: 12, hourA: 9, hourB: 7, multiplier: 2 },
        observationTable: {
          headers: ["Total Jam A + B", "Banyak Putaran 12", "Posisi Akhir Jarum"],
          rows: [
            { parameter: "9 + 7 = 16", expectedValue: "1 putaran", unit: "sisa 4" },
            { parameter: "10 + 15 = 25", expectedValue: "2 putaran", unit: "sisa 1" },
          ],
        },
        discoveryQuestion: {
          prompt: "Apa sebenarnya makna dari hasil operasi bilangan a mod m?",
          options: [
            "Sisa pembagian bilangan a setelah dibagi oleh modulus m",
            "Hasil bagi bilangan a dibagi m",
            "Kelipatan terbesar dari bilangan m",
          ],
          correctOption: "Sisa pembagian bilangan a setelah dibagi oleh modulus m",
          insight: "Modulo mengukur posisi sisa putaran: a = q · m + r dengan 0 ≤ r < m.",
        },
      },
    },
    {
      id: "c1-s4",
      type: "formalize",
      title: "Notasi Modulo & Relasi Kongruensi",
      naiExpression: "neutral",
      naiDialogue: "Mari tuangkan konsep perputaran jam ini ke dalam simbol resmi teori bilangan.",
      formalize: {
        title: "Notasi Modulo & Kongruensi",
        prompt: "Lengkapi kesimpulan matematis relasi kongruensi berikut:",
        formulaTemplate: "16 \\pmod{12} = [blank1] \\quad \\text{dan} \\quad a \\equiv b \\pmod m \\iff m \\mid [blank2]",
        blanks: [
          { id: "blank1", label: "Nilai Sisa", options: ["4", "2", "6"], correctOption: "4" },
          { id: "blank2", label: "Syarat Kongruen", options: ["(a - b)", "(a + b)", "(a \\times b)"], correctOption: "(a - b)" },
        ],
        resolvedFormulaKaTeX: "16 \\pmod{12} = 4 \\quad \\text{dan} \\quad a \\equiv b \\pmod m \\iff m \\mid (a - b)",
        explanation: "Dua bilangan disebut kongruen jika selisih keduanya habis dibagi oleh modulus m (artinya keduanya mendarat di posisi jam yang persis sama).",
      },
    },
    {
      id: "c1-s5",
      type: "check",
      title: "Cek Kilat Kongruensi",
      naiExpression: "thinking",
      naiDialogue: "Uji kejelianmu memeriksa sisa pembagian pada jam dinding!",
      check: {
        question: "Manakah dari bilangan berikut yang TIDAK kongruen dengan 3 (mod 4)?",
        checkType: "multiple_choice",
        options: [
          { id: "opt-18", text: "18", isCorrect: true, explanation: "Tepat! 18 mod 4 = 2, bukan 3. Sedangkan 7, 11, 15, dan 23 semuanya bersisa 3 jika dibagi 4." },
          { id: "opt-7", text: "7 (7 = 1 × 4 + 3)", isCorrect: false, explanation: "7 bersisa 3, jadi kongruen." },
          { id: "opt-15", text: "15 (15 = 3 × 4 + 3)", isCorrect: false, explanation: "15 bersisa 3, jadi kongruen." },
        ],
        explanation: "18 = 4 × 4 + 2 ≡ 2 (mod 4), sehingga tidak sekongruen dengan 3.",
      },
    },
    {
      id: "c1-s6",
      type: "sandbox",
      title: "Playground Jam Dinding Bebas",
      naiExpression: "happy",
      naiDialogue: "Putar jam sesukamu dan amati bagaimana warna dan sisa bagi berubah.",
      sandbox: {
        title: "Simulasi Jam Dinding Interaktif",
        instructions: "Geser nilai jam A dan jam B untuk mengamati posisi jarum jam dan sisa bagi mod 12.",
        interactiveComponentSlug: "arithmetic-modular-clock",
        initialVariables: { n: 12, hourA: 9, hourB: 7, multiplier: 2 },
      },
    },
    {
      id: "c1-s7",
      type: "challenge",
      title: "Misi: Jam Menunjuk Angka Berapa?",
      naiExpression: "neutral",
      naiDialogue: "Atur jam A = 9 dan jam B = 7 pada jam modulo 12. Sisa baginya harus menghasilkan angka 4!",
      challenge: {
        id: "challenge-clock-addition",
        title: "Penjumlahan Modular Jam 12",
        question:
          "Atur jam A = 9 dan jam B = 7 pada jam modulo 12. Berapakah sisa bagi posisi jarum jam (Target: hasil = 4)?",
        targetCondition: (vars) => {
          const n = vars.n || 12;
          const res = (((vars.hourA || 0) + (vars.hourB || 0)) % n + n) % n;
          return n === 12 && res === 4;
        },
        hint1Static: "Hitung total jam terlebih dahulu: 9 + 7 = 16.",
        hint2Static: "Kurangkan 16 dengan 12 (kelipatan lingkaran jam). Berapa sisanya?",
        solutionVariables: { n: 12, hourA: 9, hourB: 7 },
        solutionExplanation: "9 + 7 = 16. Dalam modulo 12: 16 = 1 x 12 + 4, sehingga sisa bagi adalah 4.",
        xpReward: 30,
      },
    },
    {
      id: "c1-s8",
      type: "reflect",
      title: "Refleksi Level 1: Lingkaran Siklis",
      naiExpression: "celebrating",
      naiDialogue: "Keren! Kamu sudah menguasai fondasi aritmetika jam modulo.",
      reflect: {
        title: "Level 1 Tuntas: Jam Modulo & Sisa Bagi",
        takeaways: [
          "Modulo memetakan garis bilangan tak hingga ke dalam siklus lingkaran berhingga.",
          "Hasil operasi a mod m selalu berada di antara 0 sampai m - 1.",
          "Dua bilangan kongruen a ≡ b (mod m) memiliki sisa bagi yang identik.",
        ],
        connectionText: "Di Level 2, kita akan menjinakkan angka-angka raksasa dengan penjumlahan & perkalian modular!",
        nextLevelTitle: "Level 2: Aritmetika Modular & Efisiensi",
        badgeToUnlock: "first-step",
        xpReward: 30,
        formulaKaTeX: "a \\pmod n = r \\quad (0 \\le r < n)",
      },
    },
  ],
};
