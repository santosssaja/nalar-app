import { ComprehensiveLesson } from "@/lib/curriculum/pedagogy-types";

export const functionsGraphsPedagogicalLesson: ComprehensiveLesson = {
  id: "math-functions-graphs",
  slug: "math-functions-graphs",
  title: "Fungsi & Grafik",
  subject: "math",
  domain: "calculus",
  summary:
    "Fungsi sebagai pemetaan relasional input-output, transformasi grafik af(x - h) + k, keluarga fungsi polinomial, dan konsep laju perubahan rata-rata.",
  audioNarrationText:
    "Selamat datang di modul Fungsi & Grafik. Fungsi adalah aturan pemetaan yang memberi setiap input tepat satu output. Grafiknya adalah rekaman jejak bagaimana dunia berubah secara dinamis.",
  prerequisites: ["math-elementary-algebra"],
  learningObjectives: [
    "Memahami konsep pemetaan fungsi dan relasi deterministik f(x)",
    "Memprediksi efek transformasi grafik (translasi h dan k, dilatasi a)",
    "Menghubungkan gradien kurva dengan laju perubahan rata-rata",
  ],

  hook: {
    question: "Bagaimana sebuah kurva di layar dapat merekam gerak, pertumbuhan bakteri, atau penurunan suhu kopi panas secara visual?",
    phenomenonDescription:
      "Bayangkan grafik detak jantung EKG di rumah sakit. Setiap lonjakan grafik menceritakan satu peristiwa waktu yang nyata. Bagaimana kita bisa mengubah aturan matematika menjadi gambar kurva kontinu yang hidup?",
    realWorldContext:
      "Semua simulator fisika, grafik ekonomi, dan algoritma kecerdasan buatan bergantung pada fungsi matematis untuk memprediksi masa depan.",
  },

  prediction: {
    prompt: "Prediksi Translasi Parabola",
    question: "Jika fungsi f(x) = x² diubah menjadi g(x) = (x - 3)² + 2, ke manakah puncak parabola berpindah?",
    options: [
      { id: "p1", text: "3 satuan ke kanan dan 2 satuan ke atas (puncak di 3, 2)", isCorrect: true, explanation: "Benar! Bentuk baku y = a(x - h)² + k memiliki titik puncak di (h, k). Pengurangan (x - 3) menggeser kurva ke kanan." },
      { id: "p2", text: "3 satuan ke kiri dan 2 satuan ke bawah", isCorrect: false, explanation: "Perhatikan tanda negatif pada (x - h) justru berarti pergeseran positif ke arah kanan." },
    ],
    whatActuallyHappened: "Puncak parabola (vertex) melompat dari (0, 0) persis ke koordinat (3, 2).",
  },

  explore: {
    prompt: "Eksplorasi Kurva Kartesius 2D Reaktif",
    guidingQuestions: [
      "Geser slider h dan amati kurva parabola meluncur ke kiri dan kanan.",
      "Ubah parameter kelengkungan a dari 1 menjadi -1 dan perhatikan bagaimana kurva terbalik membuka ke bawah.",
    ],
    initialVariables: { a: 1, h: 0, k: 0, xInput: 2 },
  },

  discover: {
    prompt: "Penemuan Pola Transformasi Simetris",
    patternSummary: "Setiap kurva fungsi dasar dapat digeser ke posisi mana pun di alam semesta menggunakan translasi h dan k, serta diskalakan ketajamannya menggunakan faktor a.",
    interactiveInsight: "Pada fungsi kuadrat f(x) = ax² + bx + c, lintasan yang terbentuk adalah parabola simetris—persis seperti bentuk lintasan proyektil di udara!",
  },

  formalize: {
    summary: "Formalisasi Notasi Fungsi & Transformasi Geometris",
    definitions: [
      { term: "Fungsi f: X → Y", explanation: "Relasi yang memasangkan setiap elemen himpunan asal (domain) dengan tepat satu elemen himpunan kawan (kodomain)." },
      { term: "Laju Perubahan Rata-rata", explanation: "Kemiringan garis potong (sekan) yang menghubungkan dua titik pada kurva: Δy / Δx." },
    ],
    formulas: [
      { name: "Transformasi Fungsi Kuadrat", latex: "y = a(x - h)^2 + k", meaning: "Parabola dengan puncak di (h, k) dan orientasi vertikal a." },
      { name: "Laju Perubahan Rata-rata", latex: "\\frac{\\Delta y}{\\Delta x} = \\frac{f(x_2) - f(x_1)}{x_2 - x_1}", meaning: "Gradien garis potong sekan kurva." },
    ],
    variablesTable: [
      { symbol: "h", meaning: "Translasi horizontal", unit: "satuan x" },
      { symbol: "k", meaning: "Translasi vertikal", unit: "satuan y" },
      { symbol: "a", meaning: "Skala kelengkungan vertikal", unit: "faktor skala" },
    ],
  },

  guidedPractice: [
    {
      id: "gp-fn-1",
      title: "Menggeser Parabola ke (3, 2)",
      question: "Atur translasi h = 3 dan k = 2 agar puncak kurva berada di titik (3, 2).",
      hints: {
        level1Attention: "Perhatikan koordinat vertex puncak yang ditampilkan di atas kanvas.",
        level2Concept: "Nilai h mengendalikan posisi sumbu x dan k mengendalikan posisi sumbu y.",
        level3Strategy: "Ubah slider translasi h ke 3 dan k ke 2.",
        level4Scaffold: "Set h = 3 dan k = 2.",
      },
      targetCondition: (vars) => vars.h === 3 && vars.k === 2,
      solutionExplanation: "Puncak parabola berhasil ditranslasikan ke (3, 2).",
      xpReward: 35,
    },
  ],

  independentPractice: [
    {
      id: "ip-fn-1",
      title: "Refleksi Parabola Membuka ke Bawah",
      question: "Atur parameter kelengkungan a = -1 dan k = 4 agar parabola membuka ke bawah dengan puncak di (0, 4).",
      targetCondition: (vars) => vars.a === -1 && vars.k === 4,
      solutionExplanation: "Parabola terbalik y = -x² + 4 berhasil dibuat.",
      xpReward: 35,
    },
  ],

  transferChallenge: {
    title: "Aplikasi Nyata: Pemodelan Lengkungan Jembatan Gantung",
    realWorldScenario: "Kabel utama jembatan gantung Golden Gate membentuk kurva parabola y = a(x - h)² + k dengan jarak antar menara 200 meter dan titik terendah berada 10 meter di atas air.",
    taskPrompt: "Pahami bagaimana para insinyur menggunakan model kuadratik fungsi untuk menghitung tegangan di setiap tiang penyangga jembatan.",
    targetCondition: (vars) => vars.k === 2,
    solutionExplanation: "Dengan model kuadratik, ketinggian kabel di setiap titik x dapat dihitung secara presisi demi keselamatan konstruksi.",
    reflectionPrompt: "Mengapa gravitasi dan beban kabel yang merata secara matematis memaksa kabel membentuk lengkung parabola?",
    xpReward: 50,
  },

  masteryCheck: [
    {
      id: "mc-fn-1",
      dimension: "reasoning",
      dimensionLabel: "Penalaran Matematis",
      question: "Jika fungsi f(x) memiliki laju perubahan rata-rata yang bernilai sama di setiap interval x, kurva apa yang dibentuk oleh grafik f(x)?",
      options: [
        { id: "o1", text: "Garis lurus (fungsi linear) karena kemiringannya konstan", isCorrect: true, feedback: "Tepat! Laju perubahan konstan adalah definisi matematis dari fungsi linear." },
        { id: "o2", text: "Lingkaran", isCorrect: false, feedback: "Lingkaran memiliki kemiringan yang terus berubah di setiap titik." },
      ],
    },
  ],

  crossDomainBridge: {
    connectedTopicId: "science-kinematics",
    connectedTopicTitle: "Kinematika",
    connectionNarrative: "Lintasan gerak proyektil meriam di udara adalah kurva parabola y(x), membuktikan bahwa konsep fungsi kuadrat adalah hukum alam yang nyata.",
    badgeText: "Matematika: Fungsi & Grafik → Sains: Lintasan Parabola",
  },
};
