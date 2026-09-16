import { ComprehensiveLesson } from "@/lib/curriculum/pedagogy-types";

export const trigonometryPedagogicalLesson: ComprehensiveLesson = {
  id: "math-trig-unit-circle",
  slug: "math-trig-unit-circle",
  title: "Trigonometri & Lingkaran Satuan",
  subject: "math",
  domain: "geometry",
  summary:
    "Rasio trigonometri sinus dan kosinus pada lingkaran satuan r = 1, koordinat polar, identitas Pythagoras geometris, dan dekomposisi vektor 2D.",
  audioNarrationText:
    "Selamat datang di modul Trigonometri Lingkaran Satuan. Lingkaran yang berputar melukiskan proyeksi sinus pada sumbu vertikal dan kosinus pada sumbu horizontal, menghubungkan rotasi melingkar dengan gelombang osilasi.",
  prerequisites: ["math-elementary-algebra"],
  learningObjectives: [
    "Memahami sinus dan kosinus sebagai proyeksi koordinat (x, y) pada lingkaran r = 1",
    "Membuktikan identitas Pythagoras cos²θ + sin²θ = 1 secara visual",
    "Mendekomposisi besaran vektor 2D menjadi komponen horizontal dan vertikal",
  ],

  hook: {
    question: "Bagaimana roda yang berputar melingkar dapat menghasilkan gelombang air yang naik turun secara periodik?",
    phenomenonDescription:
      "Amati jarum jam yang berputar. Bayangkan kita melihat jarum itu dari arah samping persis sejajar mata kita. Gerakan ujung jarum terlihat seperti naik dan turun secara teratur: gerak harmonik sederhana!",
    realWorldContext:
      "Semua sinyal Wi-Fi, transmisi suara radio, dan analisis gelombang gempa bumi dibangun di atas fondasi proyeksi trigonometri ini.",
  },

  prediction: {
    prompt: "Prediksi Nilai Sinus Sudut 90 Derajat",
    question: "Saat jarum berputar dari posisi mendatar 0° menuju tegak lurus 90°, apa yang terjadi pada panjang bayangan horizontalnya (kosinus)?",
    options: [
      { id: "p1", text: "Panjang kosinus menyusut menjadi nol persis di 90°", isCorrect: true, explanation: "Tepat! Di sudut 90°, titik berada di koordinat (0, 1), sehingga cos(90°) = 0 dan sin(90°) = 1." },
      { id: "p2", text: "Panjang kosinus membesar menjadi tak terhingga", isCorrect: false, explanation: "Nilai kosinus pada lingkaran satuan dibatasi maksimal bernilai 1 dan minimal -1." },
    ],
    whatActuallyHappened: "Proyeksi garis horizontal (merah) memendek hingga lenyap di titik pusat saat sudut mencapai 90°.",
  },

  explore: {
    prompt: "Eksplorasi Lingkaran Satuan & Gelombang Sinus",
    guidingQuestions: [
      "Putar sudut θ dari 0° hingga 360° dan perhatikan titik gelombang biru di sebelah kanan bergerak sinkron.",
      "Perhatikan bagaimana segitiga siku-siku selalu terbentuk dengan hipotenusa bernilai tetap r = 1.",
    ],
    initialVariables: { angleDeg: 45, radius: 1 },
  },

  discover: {
    prompt: "Penemuan Identitas Abadi Pythagoras",
    patternSummary: "Di setiap sudut rotasi apa pun, panjang alas kuadrat ditambah tinggi kuadrat selalu bernilai tepat sama dengan jari-jari kuadrat: cos²(θ) + sin²(θ) = 1.",
    interactiveInsight: "Trigonometri adalah jembatan antara dunia sudut (rotasi) dengan dunia koordinat kartesius (jarak dan posisi).",
  },

  formalize: {
    summary: "Formalisasi Trigonometri Analitik",
    definitions: [
      { term: "Lingkaran Satuan", explanation: "Lingkaran berpusat di (0, 0) dengan panjang jari-jari tepat satu satuan: x² + y² = 1." },
      { term: "Radian (rad)", explanation: "Ukuran sudut di mana panjang busur sama dengan panjang jari-jari: 180° = π rad." },
    ],
    formulas: [
      { name: "Definisi Koordinat Titik", latex: "(x, y) = (\\cos\\theta, \\sin\\theta)", meaning: "Koordinat titik di keliling lingkaran satuan." },
      { name: "Identitas Pythagoras", latex: "\\cos^2\\theta + \\sin^2\\theta = 1", meaning: "Konsekuensi teorema Pythagoras pada lingkaran r = 1." },
      { name: "Dekomposisi Vektor", latex: "v_x = v\\cos\\theta, \\quad v_y = v\\sin\\theta", meaning: "Penguraian vektor kelajuan pada dua sumbu tegak lurus." },
    ],
    variablesTable: [
      { symbol: "θ", meaning: "Sudut putar dari sumbu-x positif", unit: "derajat (°) atau radian (rad)" },
      { symbol: "r", meaning: "Jari-jari lingkaran", unit: "satuan panjang" },
    ],
  },

  guidedPractice: [
    {
      id: "gp-trig-1",
      title: "Mencapai Puncak Sinus (90°)",
      question: "Putar sudut hingga proyeksi vertikal (sinus) bernilai tepat 1.",
      hints: {
        level1Attention: "Perhatikan garis putus-putus biru vertikal.",
        level2Concept: "Nilai sinus maksimum terjadi ketika titik berada di puncak lingkaran.",
        level3Strategy: "Gunakan tombol sudut istimewa 90°.",
        level4Scaffold: "Atur sudut θ = 90°.",
      },
      targetCondition: (vars) => vars.angleDeg === 90,
      solutionExplanation: "Pada 90°, sin(90°) = 1 tercapai sempurna.",
      xpReward: 35,
    },
  ],

  independentPractice: [
    {
      id: "ip-trig-1",
      title: "Keseimbangan Sinus dan Kosinus (45°)",
      question: "Atur sudut di kuadran I sehingga nilai sinus dan kosinus sama panjang.",
      targetCondition: (vars) => vars.angleDeg === 45,
      solutionExplanation: "Pada 45°, cos(45°) = sin(45°) = √2 / 2 ≈ 0.707.",
      xpReward: 35,
    },
  ],

  transferChallenge: {
    title: "Aplikasi Nyata: Menghitung Gaya Angkat Sayap Pesawat",
    realWorldScenario: "Sebuah pesawat terbang menanjak dengan sudut kemiringan 30° dan kecepatan mesin 200 m/s. Pilot perlu mengetahui berapa laju kenaikan ketinggian vertikal pesawat per detik.",
    taskPrompt: "Hitung komponen kecepatan vertikal vy = v · sin(30°).",
    targetCondition: (vars) => vars.angleDeg === 45,
    solutionExplanation: "vy = 200 · sin(30°) = 200 × 0.5 = 100 m/s. Pesawat naik setinggi 100 meter setiap detik.",
    reflectionPrompt: "Mengapa dekomposisi vektor trigonometri adalah alat paling vital dalam navigasi penerbangan dan peluncuran satelit?",
    xpReward: 50,
  },

  masteryCheck: [
    {
      id: "mc-trig-1",
      dimension: "procedural",
      dimensionLabel: "Kelancaran Prosedural",
      question: "Jika cos(θ) = 0.6 pada kuadran I, berapakah nilai sin(θ)?",
      options: [
        { id: "o1", text: "0.8, karena (0.6)² + (0.8)² = 0.36 + 0.64 = 1.0", isCorrect: true, feedback: "Tepat! Tripel Pythagoras 3-4-5 dalam skala desimal." },
        { id: "o2", text: "0.4", isCorrect: false, feedback: "Ingat kuadrat cos²θ + sin²θ = 1, bukan penjumlahan linear." },
      ],
    },
  ],

  crossDomainBridge: {
    connectedTopicId: "science-kinematics",
    connectedTopicTitle: "Kinematika (Gerak Parabola)",
    connectionNarrative: "Kecepatan awal meriam v₀ diuraikan menjadi vx = v₀ cos(θ) untuk gerak maju dan vy = v₀ sin(θ) untuk gerak vertikal melawan gravitasi.",
    badgeText: "Matematika: Trigonometri → Sains: Dekomposisi Kecepatan Proyektil",
  },
};
