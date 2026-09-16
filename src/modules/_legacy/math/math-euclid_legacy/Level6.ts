import { Level } from "@/types/level";
import { computeEuclideanTiles } from "./engine";

export const level6: Level = {
  id: "euclid-level-6",
  index: 6,
  tier: 3,
  title: "Boss Level: Ujian Modul Pengubinan Euclid",
  description: "Ujian komprehensif menguji reduksi, FPB, KPK, Bézout, dan pengubinan persegi panjang.",
  ahaMoment: "Pengubinan Euclid mengubah aritmetika menjadi seni spasial yang indah dan logis!",
  steps: [
    {
      id: "e6-s1",
      type: "provoke",
      title: "Ujian Akhir Modul Euclid",
      naiExpression: "thinking",
      naiDialogue: "Kamu telah menyelesaikan pembagian ubin, teorema reduksi, KPK, Bézout, hingga spiral Fibonacci. Saatnya menuntaskan Boss Level!",
      provoke: {
        hookTitle: "Ujian Akhir Pengubinan Euclid",
        hookText: "Sebuah aula pertemuan berukuran 78 meter × 48 meter akan dipasangi karpet bujur sangkar terbesar tanpa memotong karpet.",
        interactiveComponentSlug: "math-euclid",
        initialVariables: { width: 78, height: 48 },
        question: "Berapa meter ukuran sisi karpet bujur sangkar terbesar yang pas (FPB dari 78 dan 48)?",
        options: [
          {
            id: "opt-6m",
            text: "6 meter (karena 78 = 1×48 + 30 -> 48 = 1×30 + 18 -> 30 = 1×18 + 12 -> 18 = 1×12 + 6 -> sisa 0)",
            responseText: "Tepat sekali! Rantai reduksi Euclid menemukan FPB = 6 meter hanya dalam 4 baris perhitungan sederhana.",
          },
          {
            id: "opt-12m",
            text: "12 meter",
            responseText: "48 habis dibagi 12, tapi 78 / 12 = 6.5 (bersisa 6 meter celah karpet).",
          },
        ],
      },
    },
    {
      id: "e6-s2",
      type: "predict",
      title: "Berapa Total Karpet yang Dibutuhkan?",
      naiExpression: "thinking",
      naiDialogue: "Jika karpet berukuran 6 × 6 meter, berapa total karpet untuk menutup aula 78 × 48 meter?",
      predict: {
        scenarioTitle: "Kalkulasi Total Ubin Karpet",
        scenarioText: "Panjang 78 m memuat 78 / 6 = 13 karpet. Lebar 48 m memuat 48 / 6 = 8 karpet.",
        question: "Berapa total karpet yang dibutuhkan?",
        options: [
          {
            id: "pred-104",
            text: "104 karpet (13 × 8 = 104 karpet)",
            isCorrect: true,
            feedback: "Benar! Luas total 3744 m² dibagi luas ubin 36 m² = 104 karpet.",
          },
          {
            id: "pred-80",
            text: "80 karpet",
            isCorrect: false,
            feedback: "13 baris dikali 8 kolom menghasilkan 104 karpet.",
          },
        ],
        simulationLabel: "Pasang Karpet Aula!",
        interactiveComponentSlug: "math-euclid",
        initialVariables: { width: 78, height: 48 },
        simulationVariables: { width: 78, height: 48 },
      },
    },
    {
      id: "e6-s3",
      type: "guided",
      title: "Simulator Penuh Pengubinan",
      naiExpression: "happy",
      naiDialogue: "Uji coba berbagai dimensi persegi panjang untuk menguji hipotesis FPB sebelum menjawab misi akhir.",
      guided: {
        instructionTitle: "Laboratorium Pengubinan Aula 78 × 48",
        instructionText: "Amati bagaimana sisa lantai mengecil: 30 -> 18 -> 12 -> 6 -> 0.",
        interactiveComponentSlug: "math-euclid",
        initialVariables: { width: 78, height: 48 },
        observationTable: {
          headers: ["Langkah", "Pembagian Bersisa", "Sisa Area"],
          rows: [
            { parameter: "Langkah 1", expectedValue: "78 = 1 × 48 + 30", unit: "sisa 30" },
            { parameter: "Langkah 2", expectedValue: "48 = 1 × 30 + 18", unit: "sisa 18" },
            { parameter: "Langkah 3", expectedValue: "30 = 1 × 18 + 12", unit: "sisa 12" },
            { parameter: "Langkah 4", expectedValue: "18 = 1 × 12 + 6", unit: "sisa 6" },
            { parameter: "Langkah 5", expectedValue: "12 = 2 × 6 + 0", unit: "selesai!" },
          ],
        },
        discoveryQuestion: {
          prompt: "Berapakah nilai KPK dari 78 dan 48 menggunakan rumus emas (a · b) / gcd?",
          options: [
            "624 (karena (78 × 48) / 6 = 78 × 8 = 624)",
            "3744",
            "1248",
          ],
          correctOption: "624 (karena (78 × 48) / 6 = 78 × 8 = 624)",
          insight: "KPK(78, 48) = (78 × 48) / 6 = 624 meter.",
        },
      },
    },
    {
      id: "e6-s4",
      type: "formalize",
      title: "Teorema Fundamental Pengubinan Euclid",
      naiExpression: "neutral",
      naiDialogue: "Mari formulasikan hukum pamungkas Algoritma Euclid ke dalam KaTeX.",
      formalize: {
        title: "Formula Universal Euclid",
        prompt: "Lengkapi persamaan keterbagian pembagian berulang:",
        formulaTemplate: "r_{k-1} = q_{k+1} \\cdot r_k + 0 \\implies \\gcd(a, b) = [blank1]",
        blanks: [
          { id: "blank1", label: "Sisa Terakhir", options: ["r_k", "r_0", "q_k"], correctOption: "r_k" },
        ],
        resolvedFormulaKaTeX: "r_{k-1} = q_{k+1} \\cdot r_k + 0 \\implies \\gcd(a, b) = r_k",
        explanation: "Sisa bukan nol terakhir r_k selalu membagi habis seluruh sisa sebelumnya dan kedua bilangan awal a dan b.",
      },
    },
    {
      id: "e6-s5",
      type: "check",
      title: "Cek Evaluasi Komprehensif",
      naiExpression: "thinking",
      naiDialogue: "Pertanyaan evaluasi terakhir sebelum mengeksekusi misi penutupan!",
      check: {
        question: "Jika gcd(a, b) = 4, berapakah nilai dari gcd(a², b²)?",
        checkType: "multiple_choice",
        options: [
          { id: "opt-16-ans", text: "16 (karena semua faktor prima terkuadratkan: 4² = 16)", isCorrect: true, explanation: "Tepat sekali! Menguadratkan bilangan melipatgandakan eksponen seluruh faktor primanya, sehingga FPB kuadratnya adalah 4² = 16." },
          { id: "opt-8-ans", text: "8", isCorrect: false, explanation: "Eksponen prima dikalikan 2, bukan dikalikan 2 pada nilai FPB-nya." },
        ],
        explanation: "gcd(a², b²) = (gcd(a, b))² = 4² = 16.",
      },
    },
    {
      id: "e6-s6",
      type: "sandbox",
      title: "Playground Boss Level",
      naiExpression: "happy",
      naiDialogue: "Uji coba konfigurasi dimensi sebelum menyelesaikan misi akhir.",
      sandbox: {
        title: "Simulasi Bebas Boss Level",
        instructions: "Atur dimensi persegi panjang untuk memverifikasi nilai FPB aula.",
        interactiveComponentSlug: "math-euclid",
        initialVariables: { width: 78, height: 48 },
      },
    },
    {
      id: "e6-s7",
      type: "challenge",
      title: "Misi Terakhir: Aula 78 × 48 (FPB = 6)",
      naiExpression: "neutral",
      naiDialogue: "Atur dimensi lantai menjadi 78 × 48 meter. Sisi ubin bujur sangkar terbesar yang mengubin aula secara pas adalah FPB = 6!",
      challenge: {
        id: "challenge-euclid-boss",
        title: "Pengubinan Karpet Aula 78 x 48",
        question:
          "Atur dimensi lantai menjadi 78 × 48 meter. Berapakah sisi ubin bujur sangkar terbesar yang mengubin aula secara sempurna tanpa sisa (Target: FPB = 6)?",
        targetCondition: (vars) => {
          const res = computeEuclideanTiles(vars.width, vars.height);
          return res.gcd === 6 && (vars.width === 78 || vars.height === 78);
        },
        hint1Static: "Atur width = 78 dan height = 48.",
        hint2Static: "78 = 1 x 48 + 30 -> 48 = 1 x 30 + 18 -> 30 = 1 x 18 + 12 -> 18 = 1 x 12 + 6 -> 12 = 2 x 6 + 0. FPB = 6.",
        solutionVariables: { width: 78, height: 48 },
        solutionExplanation: "Sisa bukan nol terakhir dari 78 dan 48 adalah 6. Ubin terbesar berukuran 6x6 meter.",
        xpReward: 100,
      },
    },
    {
      id: "e6-s8",
      type: "reflect",
      title: "Kelulusan Modul Algoritma Euclid",
      naiExpression: "celebrating",
      naiDialogue: "Luar biasa! Kamu telah menguasai Algoritma Euclid dari geometri ubin hingga identitas Bézout!",
      reflect: {
        title: "Modul Selesai: Master Algoritma Euclid",
        takeaways: [
          "FPB adalah ukuran ubin bujur sangkar terbesar yang mempartisi lantai tanpa celah.",
          "Teorema reduksi gcd(a, b) = gcd(b, a mod b) menjamin komputasi FPB super cepat.",
          "Perkalian emas a · b = gcd · lcm memungkinkan pencarian KPK tanpa daftar kelipatan.",
          "Identitas Bézout membuktikan bahwa FPB adalah nilai terkecil dari kombinasi linear ax + by.",
        ],
        connectionText: "Siap melangkah ke topik berikutnya? Masuki dunia partikel dasar semesta bilangan di Faktorisasi Prima & Koprima!",
        badgeToUnlock: "euclid-grandmaster",
        xpReward: 100,
        formulaKaTeX: "\\gcd(a, b) = \\gcd(b, a \\pmod b)",
      },
    },
  ],
};
