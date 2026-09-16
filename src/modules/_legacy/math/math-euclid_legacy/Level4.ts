import { Level } from "@/types/level";
import { computeEuclideanTiles } from "./engine";

export const level4: Level = {
  id: "euclid-level-4",
  index: 4,
  tier: 2,
  title: "Algoritma Euclid Diperluas & Identitas Bézout",
  description: "Menyatakan FPB sebagai kombinasi linear ax + by = gcd(a, b).",
  ahaMoment: "FPB selalu bisa dibentuk dari kombinasi penjumlahan dan pengurangan kedua bilangan: ax + by = gcd(a,b)!",
  steps: [
    {
      id: "e4-s1",
      type: "provoke",
      title: "Teka-Teki Ember Air (Die Hard Puzzle)",
      naiExpression: "curious",
      naiDialogue: "Bagaimana cara menakar tepat 1 liter air hanya dengan ember 5 liter dan ember 3 liter tanpa garis skala?",
      provoke: {
        hookTitle: "Teka-Teki Dua Ember Air",
        hookText: "Kamu memiliki keran air tak terbatas, satu ember 5 liter, dan satu ember 3 liter. Kamu diminta menghasilkan tepat 1 liter air.",
        interactiveComponentSlug: "math-euclid",
        initialVariables: { width: 7, height: 5 },
        question: "Operasi manakah yang menghasilkan tepat 1 liter air?",
        options: [
          {
            id: "opt-bezout-water",
            text: "Isi ember 3L dua kali (6L), lalu tuang ke ember 5L hingga penuh: sisa 1L! (2 × 3 - 1 × 5 = 1)",
            responseText: "Tepat sekali! 2 × (3L) - 1 × (5L) = 1 Liter. Secara matematis, kamu baru saja menggunakan kombinasi linear Bézout!",
          },
          {
            id: "opt-half-water",
            text: "Isi ember 3 liter setengahnya saja.",
            responseText: "Tanpa garis skala, menebak setengah ember tidak akurat dalam matematika!",
          },
        ],
      },
    },
    {
      id: "e4-s2",
      type: "predict",
      title: "Kapan Takaran Air Mustahil Dibuat?",
      naiExpression: "thinking",
      naiDialogue: "Jika embernya berukuran 4 liter dan 6 liter, apakah mungkin menakar tepat 1 liter air?",
      predict: {
        scenarioTitle: "Eksistensi Solusi Bézout",
        scenarioText: "Teorema Bézout: ax + by = c hanya memiliki solusi bilangan bulat jika c adalah kelipatan dari gcd(a, b).",
        question: "Berapakah FPB(4, 6), dan bisakah kita mengukur 1 liter?",
        options: [
          {
            id: "pred-no-1l",
            text: "Mustahil! Karena FPB(4, 6) = 2, semua kombinasi ember pasti menghasilkan bilangan genap (kelipatan 2)",
            isCorrect: true,
            feedback: "Luar biasa! 4x + 6y = 2(2x + 3y) selalu genap, sehingga mustahil menghasilkan 1 liter (angka ganjil).",
          },
          {
            id: "pred-yes-1l",
            text: "Pasti bisa jika kita memindahkan airnya berulang-ulang",
            isCorrect: false,
            feedback: "Tidak akan pernah bisa! FPB membatasi nilai terkecil yang bisa dibentuk.",
          },
        ],
        simulationLabel: "Buktikan dengan FPB!",
        interactiveComponentSlug: "math-euclid",
        initialVariables: { width: 7, height: 5 },
        simulationVariables: { width: 7, height: 5 },
      },
    },
    {
      id: "e4-s3",
      type: "guided",
      title: "Simulator Pasangan Bézout",
      naiExpression: "happy",
      naiDialogue: "Atur lebar = 7 dan tinggi = 5 untuk melihat pengubinan dengan FPB = 1.",
      guided: {
        instructionTitle: "Identitas Bézout ax + by = gcd(a, b)",
        instructionText: "Untuk a = 7 dan b = 5, kita punya 7 × 3 - 5 × 4 = 21 - 20 = 1. Pasangannya adalah x = 3 dan y = -4.",
        interactiveComponentSlug: "math-euclid",
        initialVariables: { width: 7, height: 5 },
        observationTable: {
          headers: ["Nilai a dan b", "FPB gcd(a,b)", "Koefisien (x, y)"],
          rows: [
            { parameter: "a = 7, b = 5", expectedValue: "1", unit: "7(3) + 5(-4) = 1" },
            { parameter: "a = 5, b = 3", expectedValue: "1", unit: "5(-1) + 3(2) = 1" },
          ],
        },
        discoveryQuestion: {
          prompt: "Berapakah nilai bilangan bulat positif TERKECIL yang bisa dibentuk oleh kombinasi linear ax + by?",
          options: [
            "Tepat sama dengan FPB(a, b)",
            "Selalu angka 1",
            "Tergantung nilai x dan y",
          ],
          correctOption: "Tepat sama dengan FPB(a, b)",
          insight: "Identitas Bézout membuktikan bahwa FPB adalah nilai positif terkecil dari seluruh kombinasi bilangan bulat ax + by.",
        },
      },
    },
    {
      id: "e4-s4",
      type: "formalize",
      title: "Identitas Bézout & Persamaan Diophantine",
      naiExpression: "neutral",
      naiDialogue: "Mari formulasikan Identitas Bézout ke dalam notasi aljabar.",
      formalize: {
        title: "Identitas Bézout",
        prompt: "Lengkapi persamaan kombinasi linier Bézout berikut:",
        formulaTemplate: "a \\cdot x + b \\cdot y = [blank1] \\quad \\text{dan ada solusi untuk } ax+by=1 \\iff \\gcd(a,b) = [blank2]",
        blanks: [
          { id: "blank1", label: "Kombinasi FPB", options: ["\\gcd(a, b)", "a \\cdot b", "0"], correctOption: "\\gcd(a, b)" },
          { id: "blank2", label: "Syarat Solusi 1", options: ["1", "0", "a"], correctOption: "1" },
        ],
        resolvedFormulaKaTeX: "a \\cdot x + b \\cdot y = \\gcd(a, b) \\quad \\text{dan ada solusi untuk } ax+by=1 \\iff \\gcd(a, b) = 1",
        explanation: "Identitas Bézout adalah jembatan emas yang menghubungkan aritmetika pembagian dengan pencarian invers modular dan kriptografi RSA.",
      },
    },
    {
      id: "e4-s5",
      type: "check",
      title: "Cek Pasangan Bézout",
      naiExpression: "thinking",
      naiDialogue: "Periksa apakah pasangan x = 3 dan y = -4 memenuhi persamaan 7x + 5y = 1!",
      check: {
        question: "Hitung nilai dari 7(3) + 5(-4). Apakah menghasilkan FPB(7, 5)?",
        checkType: "multiple_choice",
        options: [
          { id: "opt-bezout-ok", text: "21 - 20 = 1 (Tepat sama dengan FPB(7, 5) = 1)", isCorrect: true, explanation: "Tepat sekali! Ini membuktikan x = 3 dan y = -4 adalah salah satu pasangan solusi Bézout." },
          { id: "opt-bezout-wrong", text: "21 + 20 = 41", isCorrect: false, explanation: "Ingat bahwa y = -4 adalah bilangan negatif." },
        ],
        explanation: "7 × 3 + 5 × (-4) = 21 - 20 = 1.",
      },
    },
    {
      id: "e4-s6",
      type: "sandbox",
      title: "Playground Ember & Bézout",
      naiExpression: "happy",
      naiDialogue: "Atur lebar = 7 dan tinggi = 5 untuk melihat pengubinan dengan FPB = 1.",
      sandbox: {
        title: "Simulasi Pasangan Bézout",
        instructions: "Atur lebar = 7 dan tinggi = 5 untuk melihat pengubinan dengan FPB = 1.",
        interactiveComponentSlug: "math-euclid",
        initialVariables: { width: 7, height: 5 },
      },
    },
    {
      id: "e4-s7",
      type: "challenge",
      title: "Misi: Pasangan Koprima Bézout",
      naiExpression: "neutral",
      naiDialogue: "Atur dimensi lantai menjadi 7 × 5 sehingga FPB = 1!",
      challenge: {
        id: "challenge-euclid-bezout",
        title: "Konfigurasi Ember 7 dan 5 (FPB = 1)",
        question:
          "Atur dimensi lantai menjadi 7 × 5 sehingga FPB = 1 (memungkinkan persamaan 7x + 5y = 1 terselesaikan dengan x = 3, y = -4)!",
        targetCondition: (vars) => {
          const res = computeEuclideanTiles(vars.width, vars.height);
          return (vars.width === 7 && vars.height === 5) || (vars.width === 5 && vars.height === 7);
        },
        hint1Static: "Atur satu slider ke 7 dan slider satunya ke 5.",
        hint2Static: "7 x 3 - 5 x 4 = 21 - 20 = 1. Ini membuktikan FPB(7, 5) = 1.",
        solutionVariables: { width: 7, height: 5 },
        solutionExplanation: "7 * 3 + 5 * (-4) = 21 - 20 = 1 = gcd(7, 5).",
        xpReward: 50,
      },
    },
    {
      id: "e4-s8",
      type: "reflect",
      title: "Refleksi Level 4: Menembus Persamaan Diophantine",
      naiExpression: "celebrating",
      naiDialogue: "Luar biasa! Kamu telah menguasai identitas Bézout yang menjadi pilar aljabar modern!",
      reflect: {
        title: "Level 4 Tuntas: Identitas Bézout",
        takeaways: [
          "FPB selalu dapat dibentuk sebagai kombinasi linear: ax + by = gcd(a, b).",
          "Persamaan ax + by = c hanya memiliki solusi bulat jika c kelipatan FPB(a, b).",
          "Algoritma Euclid Diperluas adalah metode tercepat mencari invers modular perkalian.",
        ],
        connectionText: "Di Level 5, kita akan menyelidiki KASUS TERBURUK yang dihadapi Algoritma Euclid: Deret Fibonacci & Rasio Emas!",
        nextLevelTitle: "Level 5: Kasus Terburuk Euclid & Fibonacci",
        badgeToUnlock: "pattern-seeker",
        xpReward: 50,
        formulaKaTeX: "a \\cdot x + b \\cdot y = \\gcd(a, b)",
      },
    },
  ],
};
