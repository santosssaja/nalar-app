import { ComprehensiveLesson } from "@/lib/curriculum/pedagogy-types";

export const siUnitsPedagogicalLesson: ComprehensiveLesson = {
  id: "science-si-units",
  slug: "science-si-units",
  title: "Besaran, Satuan SI & Analisis Dimensi",
  subject: "science",
  domain: "physics",
  summary:
    "Bahasa formal sains dan pengukuran ilmiah: besaran pokok dan turunan, konversi satuan internasional SI, notasi ilmiah, dan verifikasi validitas rumus menggunakan analisis dimensi.",
  audioNarrationText:
    "Selamat datang di modul Besaran dan Satuan SI. Sebelum kita memodelkan gerak dan alam semesta, kita harus memastikan bahwa satuan pengukuran kita konsisten, terstandar, dan tidak ambigu.",
  prerequisites: ["math-real-numbers"],
  learningObjectives: [
    "Membedakan besaran pokok dan besaran turunan dalam sistem metrik internasional (SI)",
    "Melakukan konversi multi-satuan dengan faktor pengali konsisten",
    "Menerapkan analisis dimensi untuk menguji keabsahan fisik sebuah rumus matematika",
  ],

  hook: {
    question: "Mengapa sebuah wahana antariksa NASA seharga ratusan juta dolar hancur di atmosfer Mars hanya karena kesalahan konversi satuan?",
    phenomenonDescription:
      "Pada tahun 1999, Mars Climate Orbiter hilang kontak dan terbakar karena satu tim rekayasa menggunakan satuan kaki-pound (imperial) sementara tim pengendali menggunakan newton-detik (metrik). Kesalahan satuan berakibat fatal.",
    realWorldContext:
      "Standarisasi satuan internasional (SI) bukan sekadar aturan di buku, melainkan bahasa universal peradaban sains dan teknologi modern.",
  },

  prediction: {
    prompt: "Prediksi Konsistensi Dimensi Rumus",
    question: "Jika sebuah rumus fisika menyatakan Jarak = Kecepatan × Waktu², apakah rumus tersebut masuk akal secara dimensi fisik?",
    options: [
      { id: "p1", text: "Tidak, karena dimensi ruas kanan adalah [L][T]⁻¹ × [T]² = [L][T] (panjang × waktu), bukan jarak murni [L]", isCorrect: true, explanation: "Tepat! Analisis dimensi membuktikan rumus ini salah secara fundamental sebelum kita memasukkan angka apa pun." },
      { id: "p2", text: "Ya, karena semua variabel fisika gerak ada di dalamnya", isCorrect: false, explanation: "Keberadaan variabel tidak menjamin dimensi persamaannya setimbang." },
    ],
    whatActuallyHappened: "Secara dimensi rumus tersebut cacat karena menghasilkan meter-sekon alih-alih meter.",
  },

  explore: {
    prompt: "Eksplorasi Konversi Satuan & Kalkulator Dimensi",
    guidingQuestions: [
      "Ubah panjang dari 1500 meter menjadi kilometer dan perhatikan nilai konversinya berubah menjadi 1.5 km.",
      "Ubah waktu tempuh dan amati kelajuan v = s/t otomatis terhitung dengan dimensi [L][T]⁻¹.",
    ],
    initialVariables: { lengthMeters: 1500, timeSeconds: 60, targetUnitCode: 1 },
  },

  discover: {
    prompt: "Penemuan Kaidah Homogenitas Dimensi",
    patternSummary: "Dua kuantitas fisika hanya dapat dijumlahkan, dikurangkan, atau disamakan jika keduanya memiliki dimensi pokok yang identik (Hukum Homogenitas Fourier).",
    interactiveInsight: "Jika dimensi kedua ruas persamaan tidak sama, persamaan tersebut mustahil benar di alam nyata.",
  },

  formalize: {
    summary: "Formalisasi Besaran Pokok & Analisis Dimensi",
    definitions: [
      { term: "Besaran Pokok", explanation: "Besaran independen yang satuannya ditetapkan secara standar internasional (Massa [M], Panjang [L], Waktu [T])." },
      { term: "Besaran Turunan", explanation: "Besaran yang diturunkan dari kombinasi aljabar besaran pokok (misal Kecepatan [L][T]⁻¹, Gaya [M][L][T]⁻²)." },
    ],
    formulas: [
      { name: "Dimensi Kecepatan", latex: "[v] = \\frac{[L]}{[T]} = [L][T]^{-1}", meaning: "Perubahan panjang per satuan waktu." },
      { name: "Dimensi Percepatan", latex: "[a] = \\frac{[L]}{[T]^2} = [L][T]^{-2}", meaning: "Laju pertambahan kecepatan per sekon." },
      { name: "Dimensi Energi (Joule)", latex: "[E] = [M][L]^2[T]^{-2}", meaning: "Massa dikali percepatan dikali jarak (Gaya × Jarak)." },
    ],
    variablesTable: [
      { symbol: "[M]", meaning: "Dimensi massa (kilogram, kg)", unit: "kg" },
      { symbol: "[L]", meaning: "Dimensi panjang (meter, m)", unit: "m" },
      { symbol: "[T]", meaning: "Dimensi waktu (sekon, s)", unit: "s" },
    ],
  },

  guidedPractice: [
    {
      id: "gp-si-1",
      title: "Konversi 1500 Meter ke Kilometer",
      question: "Pastikan panjang meter berada pada 1500 meter dan pilih konversi ke kilometer.",
      hints: {
        level1Attention: "Perhatikan tombol pilihan satuan di panel kontrol.",
        level2Concept: "1 kilometer setara dengan 1000 meter.",
        level3Strategy: "Bagi 1500 dengan 1000 untuk mendapatkan 1.5 km.",
        level4Scaffold: "Pilih opsi Kilometer pada tombol satuan.",
      },
      targetCondition: (vars) => vars.lengthMeters / 1000 === 1.5,
      solutionExplanation: "1500 meter = 1.5 kilometer tercapai.",
      xpReward: 30,
    },
  ],

  independentPractice: [
    {
      id: "ip-si-1",
      title: "Menghitung Kelajuan Baku SI",
      question: "Atur panjang 1500 m dan waktu 60 s sehingga kelajuan baku bernilai 25 m/s.",
      targetCondition: (vars) => vars.lengthMeters / vars.timeSeconds === 25,
      solutionExplanation: "v = 1500 m / 60 s = 25 m/s.",
      xpReward: 35,
    },
  ],

  transferChallenge: {
    title: "Aplikasi Nyata: Menemukan Rumus Periode Bandul Lewat Dimensi",
    realWorldScenario: "Seorang ilmuwan menduga periode ayunan bandul T hanya bergantung pada massa bandul m [M], panjang tali l [L], dan percepatan gravitasi g [L][T]⁻².",
    taskPrompt: "Tentukan kombinasi variabel manakah yang menghasilkan dimensi waktu [T].",
    targetCondition: (vars) => vars.lengthMeters === 1500,
    solutionExplanation: "Hanya kombinasi T ∝ √(l / g) yang menghasilkan dimensi [L] / ([L][T]⁻²) = [T]² => √[T]² = [T]. Massa bandul m ternyata tidak berpengaruh pada periode ayunan!",
    reflectionPrompt: "Betapa menakjubkannya bahwa analisis dimensi mampu membongkar hukum fisika tanpa perlu melakukan kalkulasi kalkulus yang rumit!",
    xpReward: 45,
  },

  masteryCheck: [
    {
      id: "mc-si-1",
      dimension: "conceptual",
      dimensionLabel: "Pemahaman Konseptual",
      question: "Besaran fisika apa yang memiliki dimensi [M][L]²[T]⁻²?",
      options: [
        { id: "o1", text: "Energi atau Usaha (Joule)", isCorrect: true, feedback: "Tepat! Usaha = Gaya × Jarak = ([M][L][T]⁻²) × [L] = [M][L]²[T]⁻²." },
        { id: "o2", text: "Tekanan (Pascal)", isCorrect: false, feedback: "Tekanan adalah Gaya / Luas = [M][L]⁻¹[T]⁻²." },
      ],
    },
  ],

  crossDomainBridge: {
    connectedTopicId: "science-kinematics",
    connectedTopicTitle: "Kinematika",
    connectionNarrative: "Setiap persamaan gerak kinematika seperti x = v₀t + 0.5at² lolos uji homogenitas dimensi: setiap suku berdimensi panjang [L].",
    badgeText: "Sains: Satuan SI → Sains: Persamaan Kinematika",
  },
};
