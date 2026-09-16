import { ComprehensiveLesson } from "@/lib/curriculum/pedagogy-types";

export const kinematicsPedagogicalLesson: ComprehensiveLesson = {
  id: "science-kinematics",
  slug: "science-kinematics",
  title: "Kinematika (Flagship MVP)",
  subject: "science",
  domain: "physics",
  summary:
    "Membangun intuisi gerak dari fenomena alamiah ke perumusan model matematis. Memahami GLB, GLBB, jatuh bebas, dan gerak parabola 2D dengan sinkronisasi simultan animasi gerak dan tiga grafik fisis (x-t, v-t, a-t).",
  audioNarrationText:
    "Selamat datang di modul Flagship Kinematika Nalar. Di sini kita tidak menghafal rumus gerak, melainkan mengamati bagaimana perubahan posisi dan kecepatan diatur oleh percepatan konstan alam semesta.",
  prerequisites: ["science-si-units", "math-functions-graphs", "math-trig-unit-circle"],
  learningObjectives: [
    "Membedakan konsep jarak, perpindahan, kelajuan, dan kecepatan secara operasional",
    "Menganalisis kemiringan grafik posisi x(t) sebagai kecepatan sesaat",
    "Menghubungkan luas daerah di bawah grafik kecepatan v(t) dengan total perpindahan",
    "Mendekomposisi gerak parabola 2D menjadi GLB horizontal dan GLBB vertikal independen",
    "Merancang eksperimen virtual gerak di gravitasi Bumi vs Bulan",
  ],

  // A. Hook / Phenomenon
  hook: {
    question: "Bagaimana kita bisa memprediksi dengan tepat di mana sebuah bola mendarat sebelum bola itu dilempar?",
    phenomenonDescription:
      "Sebuah mobil meluncur dari keadaan diam di garis start. Di setiap detik, kecepatannya bertambah dengan laju konstan. Mengapa jarak yang ditempuhnya di detik kelima jauh lebih panjang daripada jarak di detik pertama?",
    realWorldContext:
      "Prinsip ini digunakan oleh insinyur otomotif untuk menghitung jarak pengereman darurat dan ilmuwan roket untuk mendaratkan wahana antariksa di Bulan.",
  },

  // B. Prediction
  prediction: {
    prompt: "Eksperimen Prediksi: Sudut Tembak Meriam",
    question:
      "Jika sebutir proyektil ditembakkan dengan kelajuan konstan 20 m/s pada sudut elevasi 45°, lalu ditembakkan lagi pada sudut 60°, manakah tembakan yang menempuh jarak horizontal terjauh di tanah datar?",
    options: [
      {
        id: "pred-1",
        text: "Sudut 60° karena melambung lebih tinggi di udara",
        isCorrect: false,
        explanation: "Melambung lebih tinggi memperlama waktu di udara, namun kecepatan horizontalnya (vx = v cos 60°) jauh lebih lambat.",
      },
      {
        id: "pred-2",
        text: "Sudut 45° karena memberikan perpaduan optimal antara waktu melayang dan kecepatan maju horizontal",
        isCorrect: true,
        explanation: "Tepat! Rumus jangkauan R = (v₀² sin 2θ)/g mencapai maksimum saat sin(2θ) = sin(90°) = 1, yaitu pada sudut θ = 45°.",
      },
      {
        id: "pred-3",
        text: "Kedua sudut menghasilkan jarak yang sama persis",
        isCorrect: false,
        explanation: "Sudut yang menghasilkan jarak sama adalah sudut komplemen yang berjumlah 90° (misal 30° dan 60°), bukan 45° dan 60°.",
      },
    ],
    whatActuallyHappened:
      "Pada sudut 45°, komponen kecepatan horizontal vx = 14.1 m/s dan vertikal vy = 14.1 m/s seimbang sempurna, menghasilkan jarak jangkauan sejauh 40.8 meter, melampaui sudut 60° (35.3 meter).",
  },

  // C. Explore
  explore: {
    prompt: "Eksplorasi Simulator Kinematika 2D",
    guidingQuestions: [
      "Amati jejak lengkung parabola saat sudut diubah dari 15° hingga 75°.",
      "Perhatikan bagaimana grafik v(t) membentuk garis miring dengan gradien sama dengan nilai percepatan a.",
      "Coba ubah gravitasi g menjadi 1.6 m/s² (Bulan) dan amati lonjakan waktu melayang dan jarak proyektil.",
    ],
    initialVariables: {
      x0: 0,
      y0: 0,
      v0: 20,
      angleDeg: 45,
      g: 9.8,
      a: 2,
      t: 0,
    },
  },

  // D. Discover
  discover: {
    prompt: "Pola Hubungan Antar-Grafik",
    patternSummary:
      "Percepatan konstan menghasilkan grafik kecepatan linear (garis lurus miring). Garis miring kecepatan tersebut menghasilkan akumulasi luas segitiga yang melengkungkan kurva posisi x(t) menjadi bentuk kuadratik (parabola).",
    interactiveInsight:
      "Hubungan kalkulus terwujud secara nyata: a = dv/dt (kemiringan grafik v-t), dan Δx = ∫ v dt (luas di bawah kurva v-t).",
  },

  // E. Formalize
  formalize: {
    summary: "Persamaan Baku Gerak Lurus Berubah Beraturan (GLBB) & Gerak Parabola",
    definitions: [
      { term: "Perpindahan (Δx)", explanation: "Perubahan posisi vektor dari titik awal ke titik akhir: Δx = x - x₀." },
      { term: "Kecepatan Sesaat (v)", explanation: "Turunan pertama posisi terhadap waktu: v(t) = dx/dt." },
      { term: "Percepatan Konstan (a)", explanation: "Laju perubahan kecepatan terhadap waktu yang bernilai tetap." },
    ],
    formulas: [
      { name: "Kecepatan Akhir GLBB", latex: "v(t) = v_0 + a t", meaning: "Kecepatan bertambah seiring waktu sebanding dengan percepatan." },
      { name: "Posisi Akhir GLBB", latex: "x(t) = x_0 + v_0 t + \\frac{1}{2} a t^2", meaning: "Suku kuadratik merefleksikan pertambahan luas segitiga di bawah grafik v-t." },
      { name: "Relasi Bebas Waktu", latex: "v^2 = v_0^2 + 2a(x - x_0)", meaning: "Menghubungkan kecepatan langsung dengan jarak tempuh tanpa variabel waktu." },
      { name: "Jangkauan Parabola", latex: "R = \\frac{v_0^2 \\sin(2\\theta)}{g}", meaning: "Jarak tembak terjauh di atas tanah datar." },
    ],
    variablesTable: [
      { symbol: "v₀", meaning: "Kecepatan awal", unit: "m/s" },
      { symbol: "a", meaning: "Percepatan linear", unit: "m/s²" },
      { symbol: "t", meaning: "Waktu tempuh", unit: "sekon (s)" },
      { symbol: "θ", meaning: "Sudut elevasi peluncuran", unit: "derajat (°)" },
      { symbol: "g", meaning: "Percepatan gravitasi", unit: "m/s²" },
    ],
  },

  // F. Derivation / Reasoning
  derivation: {
    title: "Mengapa Muncul Faktor 1/2 pada Persamaan Posisi?",
    steps: [
      {
        stepNumber: 1,
        explanation: "Pada grafik kecepatan v terhadap waktu t, grafik membentuk garis lurus dari (0, v₀) ke (t, v₀ + at).",
        latex: "v(t) = v_0 + at",
      },
      {
        stepNumber: 2,
        explanation: "Perpindahan adalah luas total di bawah kurva v(t), yang dapat dipecah menjadi luas persegi panjang alas ditambah luas segitiga atas.",
        latex: "L_{\\text{persegi}} = v_0 \\cdot t",
      },
      {
        stepNumber: 3,
        explanation: "Luas segitiga atas memiliki alas t dan tinggi (at). Luas segitiga = 1/2 × alas × tinggi.",
        latex: "L_{\\text{segitiga}} = \\frac{1}{2} \\cdot t \\cdot (at) = \\frac{1}{2} a t^2",
      },
      {
        stepNumber: 4,
        explanation: "Menjumlahkan kedua luas menghasilkan rumus posisi GLBB secara utuh dan intuitif.",
        latex: "x(t) = x_0 + v_0 t + \\frac{1}{2} a t^2",
      },
    ],
  },

  // G. Guided Practice (4-level hint system)
  guidedPractice: [
    {
      id: "gp-kin-1",
      title: "Menghitung Jarak Tempuh Mobil",
      question: "Sebuah mobil meluncur dari keadaan diam (v₀ = 0) dengan percepatan a = 2 m/s² selama 5 detik. Berapa jarak yang ditempuh?",
      hints: {
        level1Attention: "Perhatikan kata kunci: 'dari keadaan diam' berarti v₀ = 0 m/s.",
        level2Concept: "Gunakan rumus posisi GLBB yang menghubungkan percepatan a dan waktu t.",
        level3Strategy: "Gunakan rumus x = v₀t + 0.5 a t². Masukkan v₀ = 0, a = 2, dan t = 5.",
        level4Scaffold: "Lakukan kalkulasi: x = 0 + 0.5 × 2 × (5)² = 1 × 25 = 25 meter.",
      },
      targetCondition: (vars) => 0.5 * vars.a * 25 === 25,
      solutionExplanation: "Jarak tempuh mobil adalah 25 meter.",
      xpReward: 35,
    },
  ],

  // H. Independent Practice
  independentPractice: [
    {
      id: "ip-kin-1",
      title: "Tantangan Waktu Reaksi Pengereman",
      question: "Atur sudut peluncuran dan kecepatan meriam agar proyektil mencapai tanah pada waktu melayang tepat 2.88 sekon.",
      targetCondition: (vars) => Math.abs((2 * vars.v0 * Math.sin((vars.angleDeg * Math.PI) / 180)) / 9.8 - 2.88) < 0.1,
      solutionExplanation: "Kombinasi v₀ = 20 m/s dan θ = 45° menghasilkan t = (2 × 20 × sin 45°)/9.8 ≈ 2.88 sekon.",
      xpReward: 45,
    },
  ],

  // I. Virtual Laboratory & Lab Notebook
  virtualLab: {
    question: "Bagaimana percepatan gravitasi memengaruhi jarak jangkauan dan waktu melayang proyektil?",
    hypothesisOptions: [
      "Gravitasi lebih lemah memperpanjang waktu di udara dan memperjauh jarak jatuh",
      "Gravitasi tidak memengaruhi jarak jangkauan horizontal",
      "Gravitasi lebih kuat membuat proyektil meluncur lebih jauh karena gaya tariknya",
    ],
    parameterConfigs: [
      { key: "v0", label: "Kelajuan Awal", unit: "m/s", min: 10, max: 35, step: 1, defaultVal: 20 },
      { key: "angleDeg", label: "Sudut Elevasi", unit: "°", min: 15, max: 75, step: 5, defaultVal: 45 },
      { key: "g", label: "Gravitasi Lingkungan", unit: "m/s²", min: 1.6, max: 15, step: 0.2, defaultVal: 9.8 },
    ],
    observationGuide: "Bandingkan jarak jangkauan saat g = 9.8 m/s² (Bumi) dengan g = 1.6 m/s² (Bulan).",
    conclusionPrompt: "Gravitasi berbanding terbalik dengan jarak jangkauan R = (v₀² sin 2θ)/g. Di Bulan, proyektil meluncur ~6.1 kali lebih jauh.",
  },

  // J. Transfer Challenge (Real-World)
  transferChallenge: {
    title: "Tantangan Transfer Nyata: Melempar Bantuan Logistik",
    realWorldScenario:
      "Sebuah tim penolong darurat berada di tebing dan harus melemparkan paket medis ke perahu penyelamat di sungai. Jika perahu berada 40 meter di depan tebing, kelajuan dan sudut lempar berapa yang tepat sasaran?",
    taskPrompt: "Tentukan parameter sudut dan kecepatan tembak agar jarak jangkauan berada di rentang 40 - 42 meter.",
    targetCondition: (vars) => {
      const theta = (vars.angleDeg * Math.PI) / 180;
      const r = (vars.v0 * vars.v0 * Math.sin(2 * theta)) / 9.8;
      return r >= 40 && r <= 42;
    },
    solutionExplanation: "Dengan v₀ = 20 m/s dan θ = 45°, jarak lempar adalah 40.8 meter, tepat jatuh ke atas perahu penyelamat.",
    reflectionPrompt: "Bagaimana jika ada angin kencang berlawanan arah? Variabel apa yang harus diperhitungkan dalam model fisika kita?",
    xpReward: 60,
  },

  // K. Mastery Check (5 Dimensions of STEM Mastery)
  masteryCheck: [
    {
      id: "mc-1",
      dimension: "conceptual",
      dimensionLabel: "Pemahaman Konseptual",
      question: "Jika kecepatan sebuah mobil bernilai konstan positif, berapakah nilai percepatannya?",
      options: [
        { id: "mc-1-a", text: "Nol, karena tidak ada perubahan nilai kecepatan terhadap waktu", isCorrect: true, feedback: "Tepat! Percepatan adalah turunan kecepatan (dv/dt = 0)." },
        { id: "mc-1-b", text: "Positif konstan", isCorrect: false, feedback: "Jika percepatan positif, kecepatan akan terus bertambah besar." },
        { id: "mc-1-c", text: "Tergantung posisi mobil", isCorrect: false, feedback: "Percepatan hanya bergantung pada laju perubahan kecepatan, bukan posisi absolut." },
      ],
    },
    {
      id: "mc-2",
      dimension: "procedural",
      dimensionLabel: "Kelancaran Prosedural",
      question: "Sebuah benda jatuh bebas dari ketinggian h tanpa kecepatan awal. Manakah ekspresi matematis untuk waktu jatuh t?",
      options: [
        { id: "mc-2-a", text: "t = √(2h / g)", isCorrect: true, feedback: "Benar! Dari h = 0.5 gt² diperoleh t = √(2h/g)." },
        { id: "mc-2-b", text: "t = 2h / g", isCorrect: false, feedback: "Ingat ada hubungan kuadratik t² pada gerak jatuh bebas." },
        { id: "mc-2-c", text: "t = g / 2h", isCorrect: false, feedback: "Perhatikan analisis dimensi satuan: sekon bukan 1/sekon." },
      ],
    },
    {
      id: "mc-3",
      dimension: "reasoning",
      dimensionLabel: "Penalaran Matematis",
      question: "Mengapa dua sudut tembak θ = 30° dan θ = 60° menghasilkan jarak jangkauan horizontal yang sama persis di tanah datar?",
      options: [
        { id: "mc-3-a", text: "Karena sin(2 × 30°) = sin(60°) dan sin(2 × 60°) = sin(120°) bernilai sama yaitu √3/2", isCorrect: true, feedback: "Luar biasa! Identitas trigonometri sin(180° - x) = sin(x) membuktikan kesamaan jangkauan sudut komplemen." },
        { id: "mc-3-b", text: "Karena energi kinetik proyektil bertambah saat sudut dinaikkan", isCorrect: false, feedback: "Energi kinetik awal ditentukan oleh kelajuan v₀, bukan sudut tembak." },
      ],
    },
    {
      id: "mc-4",
      dimension: "problemSolving",
      dimensionLabel: "Pemecahan Masalah",
      question: "Sebuah mobil rem mendadak dengan perlambatan a = -4 m/s² dari kecepatan 20 m/s. Berapa jarak berhenti mobil tersebut?",
      options: [
        { id: "mc-4-a", text: "50 meter", isCorrect: true, feedback: "Tepat! v² = v₀² + 2as => 0 = 400 + 2(-4)s => s = 400 / 8 = 50 meter." },
        { id: "mc-4-b", text: "80 meter", isCorrect: false, feedback: "Periksa kembali kalkulasi rumus bebas waktu v² = v₀² + 2as." },
      ],
    },
    {
      id: "mc-5",
      dimension: "transfer",
      dimensionLabel: "Transfer Pengetahuan",
      question: "Dalam olahraga lompat jauh, atlet biasanya tidak melompat persis pada sudut 45°, melainkan sekitar 20° - 25°. Berdasarkan pemahaman kinematika, apa alasannya?",
      options: [
        { id: "mc-5-a", text: "Untuk melompat 45° atlet harus mengurangi kecepatan lari horizontalnya secara drastis, sehingga total jangkauan justru berkurang", isCorrect: true, feedback: "Hebat! Ini adalah transfer pemikiran fisika nyata ke batas fisiologis manusia." },
        { id: "mc-5-b", text: "Hukum gravitasi tidak berlaku untuk manusia yang melompat", isCorrect: false, feedback: "Gravitasi tetap berlaku konstan pada setiap benda bermassa di Bumi." },
      ],
    },
  ],

  crossDomainBridge: {
    connectedTopicId: "math-functions-graphs",
    connectedTopicTitle: "Fungsi & Grafik",
    connectionNarrative:
      "Grafik posisi terhadap waktu x(t) = v₀t + 0.5at² adalah aplikasi langsung dari kurva kuadratik parabola yang kita pelajari di Matematika. Kemiringan garis tangennya adalah kecepatan, membuktikan fungsi matematika sebagai bahasa pemodelan fisika.",
    badgeText: "Matematika: Fungsi & Grafik → Sains: Kinematika",
  },
};
