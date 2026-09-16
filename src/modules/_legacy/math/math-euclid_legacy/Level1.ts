import { Level } from "@/types/level";

export const level1: Level = {
  id: "euclid-level-1",
  index: 1,
  tier: 1,
  title: "Konsep Dasar Pengubinan Bujur Sangkar",
  description: "Memahami bilangan bulat sebagai dimensi persegi panjang yang dipartisi bujur sangkar.",
  ahaMoment: "FPB dari dua bilangan adalah ukuran ubin bujur sangkar terbesar yang bisa memasang lantai secara pas tanpa perlu memotong ubin!",
  steps: [
    {
      id: "e1-s1",
      type: "provoke",
      title: "Tukang Keramik yang Bingung",
      naiExpression: "curious",
      naiDialogue: "Tukang ingin menutup lantai 42 × 30 dengan ubin bujur sangkar tanpa memotong satu pun ubin. Berapa ukuran ubin terbesar yang pas?",
      provoke: {
        hookTitle: "Memasang Ubin Lantai Tanpa Memotong",
        hookText: "Sebuah ruangan berukuran 42 cm × 30 cm. Ubin harus berbentuk bujur sangkar seragam dan membagi habis panjang maupun lebar sekaligus.",
        interactiveComponentSlug: "math-euclid",
        initialVariables: { width: 42, height: 30 },
        question: "Berapa ukuran bujur sangkar TERBESAR yang muat pertama kali?",
        options: [
          {
            id: "opt-30",
            text: "Bujur sangkar 30 × 30 cm (sebesar sisi terpendek ruangan)",
            responseText: "Tepat sekali! Kita mulai dengan memotong satu bujur sangkar sebesar 30 × 30 cm, menyisakan area lantai yang lebih kecil.",
          },
          {
            id: "opt-42",
            text: "Bujur sangkar 42 × 42 cm",
            responseText: "Terlalu besar! Lebar ruangan hanya 30 cm, jadi ubin 42 cm tidak akan muat.",
          },
        ],
      },
    },
    {
      id: "e1-s2",
      type: "predict",
      title: "Berapa Ukuran Sisa Lantai?",
      naiExpression: "thinking",
      naiDialogue: "Setelah bujur sangkar 30 × 30 dipasang di lantai 42 × 30, berapa ukuran lantai sisa yang belum tertutup?",
      predict: {
        scenarioTitle: "Langkah Pertama Pemotongan Lantai",
        scenarioText: "Panjang awal 42 cm, dipotong oleh bujur sangkar bersisi 30 cm.",
        question: "Berapakah ukuran sisa lantai yang belum tertutup?",
        options: [
          {
            id: "pred-30-12",
            text: "30 cm × 12 cm (karena 42 - 30 = 12)",
            isCorrect: true,
            feedback: "Benar! Panjang lantai bersisa 12 cm, sedangkan lebarnya tetap 30 cm.",
          },
          {
            id: "pred-30-20",
            text: "30 cm × 20 cm",
            isCorrect: false,
            feedback: "42 - 30 = 12, bukan 20.",
          },
        ],
        simulationLabel: "Pasang Ubin Pertama!",
        interactiveComponentSlug: "math-euclid",
        initialVariables: { width: 42, height: 30 },
        simulationVariables: { width: 42, height: 30 },
      },
    },
    {
      id: "e1-s3",
      type: "guided",
      title: "Simulator Pengubinan Rekursif Euclid",
      naiExpression: "happy",
      naiDialogue: "Amati bagaimana sisa lantai terus dipartisi hingga tidak bersisa celah sedikit pun!",
      guided: {
        instructionTitle: "Langkah-Langkah Pengubinan Euclid",
        instructionText: "Perhatikan bagaimana lantai 42 × 30 dipotong bertahap: 30×30 (sisa 12) -> dua ubin 12×12 (sisa 6) -> dua ubin 6×6 (sisa 0).",
        interactiveComponentSlug: "math-euclid",
        initialVariables: { width: 42, height: 30 },
        observationTable: {
          headers: ["Tahap Pemotongan", "Ukuran Ubin Dipasang", "Sisa Area"],
          rows: [
            { parameter: "Langkah 1", expectedValue: "1 buah ubin 30 × 30", unit: "sisa 30 × 12" },
            { parameter: "Langkah 2", expectedValue: "2 buah ubin 12 × 12", unit: "sisa 12 × 6" },
            { parameter: "Langkah 3", expectedValue: "2 buah ubin 6 × 6", unit: "sisa 0 (selesai!)" },
          ],
        },
        discoveryQuestion: {
          prompt: "Berapakah ukuran ubin terakhir yang menutup lantai sempurna tanpa sisa?",
          options: [
            "6 × 6 cm (ini adalah FPB dari 42 dan 30)",
            "12 × 12 cm",
            "30 × 30 cm",
          ],
          correctOption: "6 × 6 cm (ini adalah FPB dari 42 dan 30)",
          insight: "Ukuran bujur sangkar terakhir yang menutup sempurna tanpa sisa celah adalah FPB dari kedua dimensi!",
        },
      },
    },
    {
      id: "e1-s4",
      type: "formalize",
      title: "Formulasi Langkah Pembagian Euclid",
      naiExpression: "neutral",
      naiDialogue: "Mari tuliskan proses pengubinan geometris tadi ke dalam bentuk persamaan pembagian bersisa.",
      formalize: {
        title: "Pembagian Berulang Euclid",
        prompt: "Lengkapi deret pembagian berulang dari lantai 42 × 30:",
        formulaTemplate: "42 = 1 \\times 30 + 12 \\implies 30 = 2 \\times 12 + [blank1] \\implies 12 = 2 \\times 6 + 0 \\implies \\gcd(42, 30) = [blank2]",
        blanks: [
          { id: "blank1", label: "Sisa Langkah 2", options: ["6", "10", "4"], correctOption: "6" },
          { id: "blank2", label: "Nilai FPB", options: ["6", "12", "30"], correctOption: "6" },
        ],
        resolvedFormulaKaTeX: "42 = 1 \\times 30 + 12 \\implies 30 = 2 \\times 12 + 6 \\implies 12 = 2 \\times 6 + 0 \\implies \\gcd(42, 30) = 6",
        explanation: "Sisa pembagian bukan nol yang terakhir selalu merupakan Faktor Persekutuan Terbesar (FPB / GCD).",
      },
    },
    {
      id: "e1-s5",
      type: "check",
      title: "Cek Pemahaman Pengubinan",
      naiExpression: "thinking",
      naiDialogue: "Uji nalarmu pada persegi panjang berukuran 20 × 15!",
      check: {
        question: "Jika lantai berukuran 20 × 15, berapa ukuran bujur sangkar pertama yang dipotong, dan berapa sisa lantainya?",
        checkType: "multiple_choice",
        options: [
          { id: "opt-15-5", text: "Potong 15 × 15, sisa lantai 15 × 5", isCorrect: true, explanation: "Tepat sekali! Sisi terpendek adalah 15, jadi dipotong ubin 15 × 15, menyisakan 20 - 15 = 5 cm." },
          { id: "opt-20-5", text: "Potong 20 × 20, sisa 5", isCorrect: false, explanation: "Lebar lantai hanya 15, tidak muat bujur sangkar 20." },
        ],
        explanation: "Langkah 1 selalu mengambil bujur sangkar dengan sisi min(panjang, lebar).",
      },
    },
    {
      id: "e1-s6",
      type: "sandbox",
      title: "Playground Pengubinan Bebas",
      naiExpression: "happy",
      naiDialogue: "Ubah panjang dan lebar ruangan di kanvas untuk melihat partisi ubin secara langsung.",
      sandbox: {
        title: "Simulasi Pengubinan Euclid",
        instructions: "Geser sisi A dan B, lalu amati ukuran ubin bujur sangkar pertama yang diletakkan.",
        interactiveComponentSlug: "math-euclid",
        initialVariables: { width: 60, height: 24 },
      },
    },
    {
      id: "e1-s7",
      type: "challenge",
      title: "Misi: Ubin Pertama Berukuran 24",
      naiExpression: "neutral",
      naiDialogue: "Atur ukuran persegi panjang sehingga sisi terpendek bernilai tepat 24 dan sisi terpanjang bernilai 60!",
      challenge: {
        id: "challenge-euclid-1",
        title: "Sisi Terpendek sebagai Ubin Pertama",
        question:
          "Atur ukuran persegi panjang sehingga sisi terpendek bernilai tepat 24 dan sisi terpanjang bernilai 60!",
        targetCondition: (vars) => {
          const w = Math.round(vars.width || 0);
          const h = Math.round(vars.height || 0);
          return (w === 60 && h === 24) || (w === 24 && h === 60);
        },
        hint1Static: "Ubah salah satu slider (panjang atau lebar) menjadi 60 dan yang lainnya menjadi 24.",
        hint2Static: "Ubin bujur sangkar pertama yang terbentuk akan berukuran 24x24.",
        solutionVariables: { width: 60, height: 24 },
        solutionExplanation:
          "Pada persegi panjang 60 x 24, bujur sangkar terbesar yang muat pertama kali berukuran 24 x 24 sebanyak 2 buah (2 x 24 = 48), menyisakan area 24 x 12.",
        xpReward: 30,
      },
    },
    {
      id: "e1-s8",
      type: "reflect",
      title: "Refleksi Level 1: FPB Adalah Geometri",
      naiExpression: "celebrating",
      naiDialogue: "Selamat! Kamu telah memahami bahwa FPB adalah ukuran ubin bujur sangkar terbesar di dunia fisik!",
      reflect: {
        title: "Level 1 Tuntas: Geometri Pengubinan Lantai",
        takeaways: [
          "FPB dari dua bilangan bulat setara dengan ukuran bujur sangkar terbesar yang menutup persegi panjang tanpa celah.",
          "Ukuran ubin pertama selalu sama dengan sisi terpendek min(a, b).",
          "Sisa lantai yang belum tertutup terus dipartisi ulang hingga bersisa nol.",
        ],
        connectionText: "Di Level 2, kita akan membuktikan MENGAPA algoritma pemotongan ini selalu berhasil!",
        nextLevelTitle: "Level 2: Teorema Reduksi Euclid",
        badgeToUnlock: "tile-master",
        xpReward: 30,
        formulaKaTeX: "\\gcd(a, b) = \\gcd(b, a \\pmod b)",
      },
    },
  ],
};
