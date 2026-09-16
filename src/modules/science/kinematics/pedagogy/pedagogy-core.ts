import { ComprehensiveLesson } from "@/lib/curriculum/pedagogy-types";

/** Kinematics lesson core: identity, hook, prediction, explore, discover. */
export const kinematicsCore: Pick<
  ComprehensiveLesson,
  | "id"
  | "slug"
  | "title"
  | "subject"
  | "domain"
  | "summary"
  | "audioNarrationText"
  | "prerequisites"
  | "learningObjectives"
  | "hook"
  | "prediction"
  | "explore"
  | "discover"
> = {
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
};
