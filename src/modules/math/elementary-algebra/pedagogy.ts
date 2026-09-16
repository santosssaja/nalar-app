import { ComprehensiveLesson } from "@/lib/curriculum/pedagogy-types";

export const elementaryAlgebraPedagogicalLesson: ComprehensiveLesson = {
  id: "math-elementary-algebra",
  slug: "math-elementary-algebra",
  title: "Aljabar Elementer",
  subject: "math",
  domain: "algebra",
  summary:
    "Variabel sebagai kuantitas dinamis tak diketahui, prinsip timbangan kesetaraan, invarian aljabar, manipulasi pertidaksamaan, dan solusi sistem linear dua variabel.",
  audioNarrationText:
    "Selamat datang di modul Aljabar Elementer. Aljabar bukan tentang memindahkan suku rumus secara mekanis, melainkan seni menjaga kesetimbangan timbangan logika.",
  prerequisites: ["math-real-numbers"],
  learningObjectives: [
    "Memodelkan variabel sebagai beban misterius pada timbangan setimbang",
    "Memahami sifat invarian kesetaraan melalui operasi serentak pada kedua ruas",
    "Menyelesaikan sistem persamaan linear dua variabel secara geometris",
  ],

  hook: {
    question: "Berapa massa kotak misterius jika 2 kotak + 4 kg setimbang dengan 10 kg?",
    phenomenonDescription:
      "Timbangan dua lengan berada dalam posisi horizontal sempurna. Di piringan kiri ada 2 kotak tertutup identik dan sebuah beban 4 kg. Di piringan kanan ada beban 10 kg. Bagaimana kita mengetahui isi setiap kotak tanpa membukanya?",
    realWorldContext:
      "Ini adalah esensi logika aljabar: kita dapat mengungkap nilai yang tidak terlihat dengan memanfaatkan hubungan kesetaraan yang terjaga.",
  },

  prediction: {
    prompt: "Prediksi Operasi Dua Ruas",
    question: "Jika kita membuang 4 kg dari piringan kiri timbangan, apa yang harus kita lakukan pada piringan kanan agar timbangan tetap setimbang?",
    options: [
      { id: "p1", text: "Membuang 4 kg dari piringan kanan juga", isCorrect: true, explanation: "Benar! Invarian kesetaraan menyatakan bahwa mengurangi kuantitas sama pada kedua sisi mempertahankan kesetimbangan (A = B => A - c = B - c)." },
      { id: "p2", text: "Menambahkan 4 kg ke piringan kanan", isCorrect: false, explanation: "Itu akan membuat piringan kanan semakin berat dan timbangan miring drastis." },
    ],
    whatActuallyHappened: "Dengan membuang 4 kg dari kedua sisi, kita memperoleh 2x = 6 kg, yang menyederhanakan masalah secara dramatis.",
  },

  explore: {
    prompt: "Eksplorasi Simulator Timbangan Aljabar",
    guidingQuestions: [
      "Ubah nilai variabel x sampai timbangan berada dalam posisi horizontal sempurna (kemiringan 0°).",
      "Perhatikan bagaimana persamaan ax + b = c berganti tanda dari '≠' menjadi '=' saat setimbang tercapai.",
    ],
    initialVariables: { a: 2, b: 4, c: 10, x: 0 },
  },

  discover: {
    prompt: "Penemuan Pola Solusi Tunggal",
    patternSummary: "Setiap persamaan linear satu variabel ax + b = c (dengan a ≠ 0) memiliki tepat satu titik kesetimbangan unik di x = (c - b)/a.",
    interactiveInsight: "Secara geometris, menyelesaikan persamaan linear sama dengan mencari titik potong antara garis y = ax + b dengan garis horizontal y = c.",
  },

  formalize: {
    summary: "Formalisasi Notasi Aljabar & Invarian Kesetaraan",
    definitions: [
      { term: "Variabel (x)", explanation: "Simbol yang mewakili kuantitas bernilai fleksibel atau belum diketahui." },
      { term: "Kesetaraan (=)", explanation: "Relasi ekuivalensi bahwa ekspresi di ruas kiri memiliki bobot nilai identik dengan ruas kanan." },
    ],
    formulas: [
      { name: "Persamaan Linear Standar", latex: "ax + b = c", meaning: "Model hubungan linear satu variabel." },
      { name: "Solusi Analitis", latex: "x = \\frac{c - b}{a}, \\quad a \\neq 0", meaning: "Nilai variabel pembawa kesetimbangan." },
    ],
    variablesTable: [
      { symbol: "a", meaning: "Koefisien pengali variabel", unit: "skalar" },
      { symbol: "b", meaning: "Konstanta aditif ruas kiri", unit: "satuan" },
      { symbol: "c", meaning: "Target bobot ruas kanan", unit: "satuan" },
      { symbol: "x", meaning: "Nilai variabel yang dicari", unit: "satuan" },
    ],
  },

  guidedPractice: [
    {
      id: "gp-alg-1",
      title: "Menyetimbangkan 2x + 4 = 10",
      question: "Geser slider variabel x hingga timbangan 2x + 4 = 10 berada dalam kesetimbangan sempurna.",
      hints: {
        level1Attention: "Perhatikan bahwa ruas kanan memiliki bobot 10.",
        level2Concept: "Kurangkan kedua ruas dengan 4 untuk mengisolasi variabel x.",
        level3Strategy: "2x = 10 - 4 = 6. Kemudian bagi kedua ruas dengan 2.",
        level4Scaffold: "Atur x = 3 pada slider.",
      },
      targetCondition: (vars) => vars.x === 3,
      solutionExplanation: "Timbangan setimbang sempurna saat x = 3.",
      xpReward: 35,
    },
  ],

  independentPractice: [
    {
      id: "ip-alg-1",
      title: "Menyetimbangkan 3x - 5 = 16",
      question: "Tentukan nilai variabel x agar persamaan 3x - 5 = 16 terpenuhi.",
      targetCondition: (vars) => vars.x === 7,
      solutionExplanation: "3x = 16 + 5 = 21 => x = 21/3 = 7.",
      xpReward: 35,
    },
  ],

  transferChallenge: {
    title: "Aplikasi Nyata: Menentukan Titik Impas Usaha (Break-Even Point)",
    realWorldScenario: "Sebuah bengkel sains memiliki biaya tetap sewa alat Rp 4.000.000/bulan dan biaya produksi Rp 20.000 per paket sensor. Setiap paket dijual Rp 50.000.",
    taskPrompt: "Modelkan persamaan pendapatan = biaya untuk mencari berapa paket x yang harus dijual agar tidak merugi.",
    targetCondition: (vars) => vars.x === 3,
    solutionExplanation: "50.000x = 20.000x + 4.000.000 => 30.000x = 4.000.000 => x ≈ 134 paket.",
    reflectionPrompt: "Bagaimana cara aljabar menyederhanakan keputusan bisnis rumit menjadi perpotongan dua garis lurus?",
    xpReward: 45,
  },

  masteryCheck: [
    {
      id: "mc-alg-1",
      dimension: "conceptual",
      dimensionLabel: "Pemahaman Konseptual",
      question: "Mengapa pembagian dengan nol tidak diperbolehkan dalam manipulasi persamaan aljabar?",
      options: [
        { id: "o1", text: "Karena pembagian dengan nol merusak relasi ekuivalensi dan menghasilkan kontradiksi logis (seperti membuktikan 1 = 2)", isCorrect: true, feedback: "Tepat! Operasi mengalikan atau membagi dengan nol memusnahkan informasi unik variabel." },
        { id: "o2", text: "Karena nol tidak ada pada garis bilangan", isCorrect: false, feedback: "Nol adalah elemen penting garis bilangan riil." },
      ],
    },
  ],

  crossDomainBridge: {
    connectedTopicId: "science-kinematics",
    connectedTopicTitle: "Kinematika",
    connectionNarrative: "Dalam kinematika, rumus kecepatan v = v₀ + at adalah persamaan aljabar linear di mana percepatan a adalah koefisien kemiringan dan v₀ adalah konstanta awal.",
    badgeText: "Matematika: Aljabar Elementer → Sains: Persamaan Gerak",
  },
};
