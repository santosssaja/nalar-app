import { ComprehensiveLesson } from "@/lib/curriculum/pedagogy-types";

/** Kinematics lesson practice, lab, transfer, mastery, cross-domain bridge. */
export const kinematicsPractice: Pick<
  ComprehensiveLesson,
  | "guidedPractice"
  | "independentPractice"
  | "virtualLab"
  | "transferChallenge"
  | "masteryCheck"
  | "crossDomainBridge"
> = {
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
