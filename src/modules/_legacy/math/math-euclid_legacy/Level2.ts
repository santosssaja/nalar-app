import { Level } from "@/types/level";
import { computeEuclideanTiles } from "./engine";

export const level2: Level = {
  id: "euclid-level-2",
  index: 2,
  tier: 1,
  title: "Teorema Reduksi: Mengapa Euclid Selalu Bekerja",
  description: "Memahami sifat pengurangan berulang bahwa gcd(a, b) = gcd(b, a mod b).",
  ahaMoment: "Jika sebuah bilangan membagi A dan B, ia PASTI membagi selisihnya (A - B) dan sisanya (A mod B)!",
  steps: [
    {
      id: "e2-s1",
      type: "provoke",
      title: "Misteri Pengurangan Penggaris",
      naiExpression: "curious",
      naiDialogue: "Penggaris 7 cm bisa mengukur balok 35 cm dan balok 14 cm secara pas. Jika balok 35 dipotong 14 cm, apakah penggaris 7 cm masih pas?",
      provoke: {
        hookTitle: "Faktor Bersama Tidak Hilang Saat Dipotong",
        hookText: "Dua balok kayu berukuran 35 cm dan 14 cm. Penggaris 7 cm mengukur balok 35 cm (5 kali pas) dan balok 14 cm (2 kali pas).",
        interactiveComponentSlug: "math-euclid",
        initialVariables: { width: 35, height: 14 },
        question: "Apakah penggaris 7 cm masih bisa mengukur sisa potongan 35 - 14 = 21 cm secara pas?",
        options: [
          {
            id: "opt-exact",
            text: "Pasti bisa! 21 cm diukur tepat 3 kali oleh penggaris 7 cm (21 = 3 × 7).",
            responseText: "Tepat sekali! Jika d membagi A dan B, maka d pasti membagi selisihnya A - B. Inilah fondasi kokoh Algoritma Euclid!",
          },
          {
            id: "opt-lost",
            text: "Tidak, faktor bersamanya bisa hilang karena terpotong.",
            responseText: "Faktor bersama tidak pernah hilang; sifat distributif aljabar menjamin kelipatannya tetap utuh.",
          },
        ],
      },
    },
    {
      id: "e2-s2",
      type: "predict",
      title: "FPB dari Dua Bilangan Berdekatan",
      naiExpression: "thinking",
      naiDialogue: "Berapakah FPB dari 1.000.003 dan 1.000.000? Apakah kamu harus membuat pohon faktor raksasa?",
      predict: {
        scenarioTitle: "Reduksi Angka Raksasa Berdekatan",
        scenarioText: "Teorema reduksi menyatakan: gcd(A, B) = gcd(B, A - B).",
        question: "Berapakah nilai gcd(1.000.003, 1.000.000)?",
        options: [
          {
            id: "pred-1-giant",
            text: "1 (karena selisihnya adalah 3, dan 1.000.000 tidak habis dibagi 3)",
            isCorrect: true,
            feedback: "Brilian! gcd(1.000.000, 3) = 1 karena jumlah digit 1.000.000 adalah 1 (tidak habis dibagi 3). Selesai dalam 2 detik tanpa pohon faktor!",
          },
          {
            id: "pred-3-giant",
            text: "3",
            isCorrect: false,
            feedback: "1.000.000 tidak habis dibagi 3 (bersisa 1).",
          },
        ],
        simulationLabel: "Uji Teorema Reduksi!",
        interactiveComponentSlug: "math-euclid",
        initialVariables: { width: 42, height: 30 },
        simulationVariables: { width: 42, height: 30 },
      },
    },
    {
      id: "e2-s3",
      type: "guided",
      title: "Simulator Reduksi Persegi Panjang",
      naiExpression: "happy",
      naiDialogue: "Atur lebar = 42 dan tinggi = 30 untuk melihat sisa lantai mengecil dari 12 menjadi 6.",
      guided: {
        instructionTitle: "Penelusuran Rantai Reduksi Euclid",
        instructionText: "Perhatikan bagaimana gcd(42, 30) = gcd(30, 12) = gcd(12, 6) = 6.",
        interactiveComponentSlug: "math-euclid",
        initialVariables: { width: 42, height: 30 },
        observationTable: {
          headers: ["Pasangan Nilai (A, B)", "Sisa Modulo A mod B", "Nilai FPB Dipertahankan"],
          rows: [
            { parameter: "gcd(42, 30)", expectedValue: "12", unit: "FPB = 6" },
            { parameter: "gcd(30, 12)", expectedValue: "6", unit: "FPB = 6" },
            { parameter: "gcd(12, 6)", expectedValue: "0", unit: "FPB = 6" },
          ],
        },
        discoveryQuestion: {
          prompt: "Mengapa nilai FPB tidak pernah berubah di setiap baris pembagian?",
          options: [
            "Karena setiap faktor pembagi A dan B otomatis membagi sisanya A mod B",
            "Karena angkanya selalu bilangan genap",
            "Hanya terjadi pada bilangan di bawah 100",
          ],
          correctOption: "Karena setiap faktor pembagi A dan B otomatis membagi sisanya A mod B",
          insight: "Teorema Euclid menjamin bahwa himpunan pembagi bersama dari (A, B) identik dengan pembagi bersama dari (B, A mod B).",
        },
      },
    },
    {
      id: "e2-s4",
      type: "formalize",
      title: "Teorema Reduksi Euclid",
      naiExpression: "neutral",
      naiDialogue: "Mari kita tuangkan teorema reduksi ke dalam formula KaTeX yang elegan.",
      formalize: {
        title: "Teorema Reduksi FPB",
        prompt: "Lengkapi teorema reduksi pembagian Euclid berikut:",
        formulaTemplate: "\\gcd(a, b) = \\gcd(b, a - b) = \\gcd(b, [blank1])",
        blanks: [
          { id: "blank1", label: "Sisa Pembagian", options: ["a \\pmod b", "a + b", "a \\times b"], correctOption: "a \\pmod b" },
        ],
        resolvedFormulaKaTeX: "\\gcd(a, b) = \\gcd(b, a \\pmod b)",
        explanation: "Algoritma Euclid mereduksi angka raksasa menjadi sisa kerdil secara eksponensial dalam sedikit langkah pembagian.",
      },
    },
    {
      id: "e2-s5",
      type: "check",
      title: "Sifat FPB Bilangan Berurutan",
      naiExpression: "thinking",
      naiDialogue: "Gunakan teorema reduksi untuk menjawab teka-teki bilangan berurutan!",
      check: {
        question: "Berapakah FPB dari dua bilangan bulat positif yang berurutan, yaitu gcd(n, n + 1)?",
        checkType: "multiple_choice",
        options: [
          { id: "opt-always-1", text: "Selalu bernilai 1 (misal gcd(14, 15) = 1, gcd(99, 100) = 1)", isCorrect: true, explanation: "Tepat sekali! gcd(n+1, n) = gcd(n, (n+1) - n) = gcd(n, 1) = 1. Dua bilangan berurutan selalu saling prima!" },
          { id: "opt-dep-n", text: "Tergantung apakah n genap atau ganjil", isCorrect: false, explanation: "Selisihnya selalu 1, dan pembagi dari 1 hanyalah 1." },
        ],
        explanation: "gcd(n+1, n) = gcd(n, 1) = 1 untuk semua bilangan bulat positif n.",
      },
    },
    {
      id: "e2-s6",
      type: "sandbox",
      title: "Playground Reduksi Cepat",
      naiExpression: "happy",
      naiDialogue: "Masukkan berbagai pasangan bilangan untuk melihat kecepatan reduksi algoritma Euclid.",
      sandbox: {
        title: "Simulasi Reduksi Cepat",
        instructions: "Atur lebar dan tinggi untuk melihat rantai reduksi FPB secara real-time.",
        interactiveComponentSlug: "math-euclid",
        initialVariables: { width: 42, height: 30 },
      },
    },
    {
      id: "e2-s7",
      type: "challenge",
      title: "Misi: FPB Berukuran 6",
      naiExpression: "neutral",
      naiDialogue: "Atur persegi panjang lebar = 42 dan tinggi = 30. Sisa ubin bukan nol terakhir harus bernilai 6!",
      challenge: {
        id: "challenge-euclid-gcd6",
        title: "Temukan Pengubinan Berakhir di Ukuran 6",
        question:
          "Atur persegi panjang berukuran lebar = 42 dan tinggi = 30. Berapakah ukuran ubin bujur sangkar terakhir yang menutup sempurna tanpa sisa (FPB)?",
        targetCondition: (vars) => {
          const res = computeEuclideanTiles(vars.width, vars.height);
          return res.gcd === 6 && (vars.width === 42 || vars.height === 42);
        },
        hint1Static: "Atur width = 42 dan height = 30.",
        hint2Static: "42 = 1 x 30 + 12 -> 30 = 2 x 12 + 6 -> 12 = 2 x 6 + 0. Ubin terakhir adalah 6x6.",
        solutionVariables: { width: 42, height: 30 },
        solutionExplanation: "42 = 1*30 + 12, 30 = 2*12 + 6, 12 = 2*6 + 0. Sisa bukan nol terakhir adalah 6.",
        xpReward: 40,
      },
    },
    {
      id: "e2-s8",
      type: "reflect",
      title: "Refleksi Level 2: Keanggunan Reduksi",
      naiExpression: "celebrating",
      naiDialogue: "Hebat! Kamu memahami MENGAPA Algoritma Euclid bekerja, bukan cuma menghafal langkahnya!",
      reflect: {
        title: "Level 2 Tuntas: Teorema Reduksi Euclid",
        takeaways: [
          "Faktor bersama selalu membagi habis selisih (a - b) dan sisa (a mod b).",
          "gcd(a, b) = gcd(b, a mod b) mereduksi angka raksasa menjadi kerdil secara instan.",
          "Dua bilangan bulat berurutan n dan n + 1 selalu memiliki FPB = 1.",
        ],
        connectionText: "Di Level 3, kita akan mengungkap rahasia hubungan emas antara FPB dan saudaranya: KPK!",
        nextLevelTitle: "Level 3: Dualitas FPB & KPK",
        badgeToUnlock: "pattern-seeker",
        xpReward: 40,
        formulaKaTeX: "\\gcd(a, b) = r_{\\text{terakhir}}",
      },
    },
  ],
};
