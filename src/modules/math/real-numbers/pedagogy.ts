import { ComprehensiveLesson } from "@/lib/curriculum/pedagogy-types";

export const realNumbersPedagogicalLesson: ComprehensiveLesson = {
  id: "math-real-numbers",
  slug: "math-real-numbers",
  title: "Operasi Bilangan Riil & Garis Bilangan",
  subject: "math",
  domain: "arithmetic",
  summary:
    "Garis bilangan kontinu, vektor translasi penjumlahan dan pengurangan, dilatasi skala perkalian, kerapatan bilangan rasional, dan bukti geometris hukum distributif.",
  audioNarrationText:
    "Selamat datang di modul Operasi Bilangan Riil. Bilangan bukan sekadar simbol mati, melainkan posisi spasial di garis tak hingga, di mana penjumlahan adalah pergeseran langkah dan perkalian adalah peregangan jarak.",
  prerequisites: [],
  learningObjectives: [
    "Memahami garis bilangan riil sebagai ruang kontinu satu dimensi",
    "Menginterpretasikan penjumlahan sebagai translasi vektor arah",
    "Memahami perkalian sebagai dilatasi skala",
    "Menemukan pembuktian geometris hukum distributif melalui luas persegi panjang",
  ],

  hook: {
    question: "Jika di antara dua bilangan bulat ada tak hingga pecahan, bagaimana kita bisa meletakkan bilangan irasional persis di atas garis?",
    phenomenonDescription:
      "Bayangkan sebuah penggaris dengan zoom tak hingga. Kita bisa memperbesar antara angka 0 dan 1 menjadi sejuta bagian, lalu memperbesarnya lagi tanpa pernah menemukan ujungnya. Di manakah posisi tepat angka √2 dan π?",
    realWorldContext:
      "Kontinum satu dimensi ini adalah fondasi koordinat GPS, skala termometer, dan sumbu waktu fisika.",
  },

  prediction: {
    prompt: "Prediksi Operasi Tanda Negatif",
    question: "Jika sebuah titik berada di -3 lalu dikurangkan dengan -5, ke manakah arah pergeseran titik tersebut?",
    options: [
      { id: "p1", text: "Ke arah kiri sejauh 5 langkah karena ada tanda minus", isCorrect: false, explanation: "Mengurangkan nilai negatif secara geometris setara dengan membalik arah pengurangan menjadi penambahan ke kanan." },
      { id: "p2", text: "Ke arah kanan sejauh 5 langkah menuju angka +2", isCorrect: true, explanation: "Tepat! -3 - (-5) = -3 + 5 = +2. Dua tanda minus saling membalikkan arah translasi." },
      { id: "p3", text: "Titik tetap berada di tempatnya", isCorrect: false, explanation: "Operasi aritmetika dengan bilangan bukan nol pasti menghasilkan perpindahan titik." },
    ],
    whatActuallyHappened: "Titik bergeser 5 langkah ke arah positif (kanan), mendarat persis di angka +2.",
  },

  explore: {
    prompt: "Eksplorasi Kontinum Garis Bilangan 1D",
    guidingQuestions: [
      "Geser titik A ke angka 3, dan amati jarak absolut |A - B| terhadap titik B di -4.",
      "Terapkan faktor dilatasi k = 2× dan amati bagaimana jarak titik A dari titik nol meregang dua kali lipat.",
    ],
    initialVariables: { point1: 3, point2: -4, scaleFactor: 1, zoomLevel: 1 },
  },

  discover: {
    prompt: "Penemuan Pola Translasi vs Dilatasi",
    patternSummary: "Penjumlahan a + b adalah translasi kaku yang mempertahankan bentuk dan jarak relatif, sedangkan perkalian k · a adalah dilatasi skala yang meregangkan atau menyusutkan jarak dari titik pusat nol.",
    interactiveInsight: "Operasi distributif a(b + c) = ab + ac adalah konsekuensi logis dari menghitung luas satu persegi panjang besar versus dua persegi panjang berdampingan.",
  },

  formalize: {
    summary: "Aksioma Lapangan & Sifat Operasi Bilangan Riil",
    definitions: [
      { term: "Kontinum Riil (ℝ)", explanation: "Himpunan bilangan yang tidak memiliki 'lubang' atau celah kosong pada garis." },
      { term: "Nilai Mutlak |x|", explanation: "Jarak geometris titik x ke titik nol pada garis bilangan tanpa memerhatikan arah." },
    ],
    formulas: [
      { name: "Translasi Penjumlahan (Pergeseran)", latex: "x' = x + \\Delta x", meaning: "Pergeseran posisi titik sejauh Δx: ke kanan jika positif, ke kiri jika negatif." },
      { name: "Dilatasi Skala (Perkalian)", latex: "x' = k \\cdot x", meaning: "Peregangan (k > 1) atau pemampatan (0 < k < 1) jarak titik terhadap titik pusat nol." },
      { name: "Jarak Geometris & Nilai Mutlak", latex: "d(a, b) = |a - b|", meaning: "Panjang ruas garis yang menghubungkan titik a dan b tanpa memandang arah." },
      { name: "Hukum Distributif Geometris", latex: "a(b + c) = ab + ac", meaning: "Luas gabungan persegi panjang dengan tinggi sama." },
      { name: "Titik Tengah Ruas (Midpoint)", latex: "M = \\frac{a + b}{2}", meaning: "Titik tepat di tengah antara titik a dan b (rata-rata posisi)." },
    ],
    variablesTable: [
      { symbol: "x, a, b", meaning: "Koordinat posisi titik pada garis bilangan", unit: "satuan" },
      { symbol: "Δx", meaning: "Besar translasi / pergeseran posisi", unit: "satuan" },
      { symbol: "k", meaning: "Faktor skala dilatasi", unit: "rasio (tanpa satuan)" },
      { symbol: "M", meaning: "Koordinat titik tengah ruas", unit: "satuan" },
    ],
  },

  derivation: {
    title: "Penalaran Geometris: Operasi Translasi, Dilatasi, dan Titik Tengah",
    steps: [
      {
        stepNumber: 1,
        explanation: "Setiap bilangan riil x adalah titik koordinat tunggal pada garis kontinum 1D terhadap titik acuan nol.",
        latex: "x \\in \\mathbb{R}",
      },
      {
        stepNumber: 2,
        explanation: "Penjumlahan x + a adalah translasi kaku yang menggeser posisi titik ke kanan (a > 0) atau ke kiri (a < 0).",
        latex: "T_a(x) = x + a",
      },
      {
        stepNumber: 3,
        explanation: "Perkalian k · x adalah dilatasi skala yang meregangkan atau menyusutkan jarak titik terhadap titik pusat 0.",
        latex: "D_k(x) = k \\cdot x",
      },
      {
        stepNumber: 4,
        explanation: "Titik tengah M antara titik a dan titik b adalah rata-rata aritmetika posisi kedua titik pada garis bilangan.",
        latex: "M = \\frac{a + b}{2}",
      },
    ],
  },

  guidedPractice: [
    {
      id: "gp-rn-1",
      title: "Translasi Titik ke Angka 7",
      question: "Geser titik A yang awalnya bernilai 3 sehingga posisinya menjadi 7.",
      hints: {
        level1Attention: "Perhatikan posisi awal titik A berada di angka 3.",
        level2Concept: "Penjumlahan positif menggeser titik ke arah kanan pada garis bilangan.",
        level3Strategy: "Gunakan translasi Δx = 7 - 3 = +4 satuan.",
        level4Scaffold: "Atur slider titik A ke angka 7.",
      },
      targetCondition: (vars) => vars.point1 === 7,
      solutionExplanation: "Titik A berhasil digeser ke posisi 7 melalui translasi +4.",
      xpReward: 30,
    },
  ],

  independentPractice: [
    {
      id: "ip-rn-1",
      title: "Tantangan Titik Tengah Simetris",
      question: "Tentukan nilai B sedemikian rupa sehingga titik tengah antara A=4 dan B berada tepat di angka 0.",
      targetCondition: (vars) => vars.point2 === -4,
      solutionExplanation: "Titik simetris terhadap nol dari +4 adalah -4.",
      xpReward: 35,
    },
  ],

  transferChallenge: {
    title: "Aplikasi Nyata: Skala Suhu Celcius dan Fahrenheit",
    realWorldScenario: "Termometer adalah garis bilangan vertikal. Titik beku air berada di 0°C (32°F) dan titik didih di 100°C (212°F). Konversi suhu menggunakan dilatasi skala 9/5 dan translasi +32.",
    taskPrompt: "Hitung suhu dalam Fahrenheit jika suhu terukur 25°C melalui model dilatasi dan translasi.",
    targetCondition: (vars) => vars.scaleFactor === 2,
    solutionExplanation: "F = (9/5) × 25 + 32 = 45 + 32 = 77°F. Dilatasi skala 1.8 meregangkan derajat Celcius sebelum ditranslasikan +32.",
    reflectionPrompt: "Mengapa pembacaan skala suhu membutuhkan translasi offset sementara skala massa kilogram ke gram hanya butuh dilatasi perkalian murni?",
    xpReward: 40,
  },

  masteryCheck: [
    {
      id: "mc-rn-1",
      dimension: "conceptual",
      dimensionLabel: "Pemahaman Konseptual",
      question: "Apakah bilangan 0.333... (desimal berulang) dapat diletakkan persis pada garis bilangan?",
      options: [
        { id: "o1", text: "Ya, karena 0.333... adalah pecahan rasional 1/3 yang memiliki posisi tunggal pasti", isCorrect: true, feedback: "Tepat! Bilangan rasional selalu memiliki lokasi unik di garis bilangan riil." },
        { id: "o2", text: "Tidak, karena digitnya tak terhingga maka titiknya terus bergerak", isCorrect: false, feedback: "Banyaknya digit representasi tidak mengubah kepastian nilai tunggal bilangan tersebut." },
      ],
    },
  ],

  crossDomainBridge: {
    connectedTopicId: "science-si-units",
    connectedTopicTitle: "Besaran, Satuan SI & Analisis Dimensi",
    connectionNarrative: "Garis bilangan riil kontinu adalah alat yang kita gunakan untuk mengukur besaran fisika apa pun—dari jarak, massa, hingga waktu tempuh.",
    badgeText: "Matematika: Garis Bilangan → Sains: Skala Pengukuran SI",
  },
};
