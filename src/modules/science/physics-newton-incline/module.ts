import { TopicModule } from "@/types/topic";
import { calculateInclineForces } from "./engine";

export const inclineModule: TopicModule = {
  id: "physics-newton-incline",
  slug: "physics-newton-incline",
  title: "Bidang Miring & Hukum Newton",
  category: "physics",
  summary:
    "Memahami dekomposisi gaya berat menjadi komponen sejajar dan tegak lurus bidang miring, gaya normal, serta gaya gesek penentu percepatan luncur balok.",
  audioNarrationText:
    "Selamat datang di modul Bidang Miring Newton. Kamu akan mempelajari bagaimana gaya berat dipecah menjadi komponen sejajar dan tegak lurus untuk menganalisis gerak balok.",
  initialVariables: {
    angleDeg: 30,
    mass: 5,
    frictionCoeff: 0.2,
    gravity: 9.8,
    inclineLength: 10,
  },
  levels: [
    {
      id: "incline-level-1",
      index: 1,
      tier: 1,
      title: "Dekomposisi Gaya Berat Bidang Miring",
      description: "Memahami proyeksi vektor berat W menjadi W sejajar dan W tegak lurus.",
      steps: [
        {
          id: "inc1-step-1",
          type: "explanation",
          title: "Mengapa Benda Meluncur Lebih Lambat di Bidang Landai?",
          explanation: {
            title: "Dekomposisi Vektor Gravitasi",
            conceptText:
              "Ketika benda berada di atas bidang miring bersudut θ, seluruh gaya berat W = mg tidak langsung menariknya ke bawah bidang, melainkan terpecah menjadi dua komponen ortogonal.",
            analogyText:
              "Komponen tegak lurus menekan permukaan menghasilkan Gaya Normal N = mg cos(θ). Komponen sejajar W∥ = mg sin(θ) adalah satu-satunya gaya gravitasi yang menarik balok meluncur turun.",
            keyFormulas: [
              "W = mg",
              "W_\\parallel = mg \\sin(\\theta)",
              "W_\\perp = mg \\cos(\\theta)",
              "N = W_\\perp = mg \\cos(\\theta)",
            ],
            audioNarrationText:
              "Komponen sejajar bidang miring sama dengan massa dikali gravitasi dikali sinus sudut kemiringan.",
          },
        },
        {
          id: "inc1-step-2",
          type: "playground",
          title: "Eksplorasi Perubahan Sudut Kemiringan",
          playground: {
            title: "Simulasi Vektor Gaya Bidang Miring",
            instructions: "Ubah sudut kemiringan θ dan amati bagaimana vektor W∥ dan Gaya Normal N saling bertukar dominasi.",
            interactiveComponentSlug: "physics-newton-incline",
            initialVariables: { angleDeg: 30, mass: 5, frictionCoeff: 0.2 },
          },
        },
        {
          id: "inc1-step-3",
          type: "challenge",
          title: "Misi: Permukaan Licin Sempurna",
          challenge: {
            id: "challenge-incline-1",
            title: "Akselerasi Murni Gravitasi",
            question: "Atur koefisien gesek μ = 0 dan sudut θ = 30° agar percepatan balok tepat a = 0.5 × g ≈ 4.90 m/s².",
            targetCondition: (vars: Record<string, number>) => {
              return (vars.frictionCoeff ?? 0.2) <= 0.02 && Math.abs((vars.angleDeg ?? 30) - 30) <= 1;
            },
            hint1Static: "Pada bidang licin sempurna (μ = 0), tidak ada gaya gesekan yang menahan.",
            hint2Static: "Gunakan rumus a = g sin(θ). Cari sudut θ di mana sin(θ) = 0.5.",
            solutionVariables: { angleDeg: 30, frictionCoeff: 0 },
            solutionExplanation: "Pada μ = 0 dan θ = 30°, percepatan a = g sin(30°) = 0.5g ≈ 4.90 m/s².",
            xpReward: 30,
          },
        },
        {
          id: "inc1-step-4",
          type: "validation",
          title: "Refleksi Fondasi Bidang Miring",
          validation: {
            title: "Dekomposisi Gaya Dikuasai",
            summaryText: "Gaya berat terdekomposisi menjadi W∥ = mg sin(θ) dan W⊥ = mg cos(θ).",
            keyTakeaway: "Semakin curam bidang miring, Gaya Normal N = mg cos(θ) semakin kecil mendekati nol.",
            formulaKaTeX: "N = mg \\cos(\\theta), \\quad W_\\parallel = mg \\sin(\\theta)",
            badgeToUnlock: "incline-explorer",
          },
        },
      ],
    },
    {
      id: "incline-level-2",
      index: 2,
      tier: 2,
      title: "Friksi & Keseimbangan Statis",
      description: "Menghitung batas gesekan statis maksimum dan kondisi awal benda meluncur.",
      steps: [
        {
          id: "inc2-step-1",
          type: "explanation",
          title: "Kapan Balok Mulai Meluncur?",
          explanation: {
            title: "Hukum Gesekan Amontons-Coulomb",
            conceptText:
              "Gaya gesek statis maksimum adalah f_s,max = μ_s × N. Balok akan tetap diam jika gaya penarik W∥ ≤ f_s,max. Jika W∥ > f_s,max, balok mulai meluncur dipercepat.",
            analogyText:
              "Kondisi kritis terjadi saat mg sin(θ) = μ mg cos(θ), yang menghasilkan persamaan indah: tan(θ) = μ! Sudut ini disebut Sudut Repose.",
            keyFormulas: [
              "f_{s,\\text{max}} = \\mu_s N = \\mu_s mg \\cos(\\theta)",
              "\\text{Benda diam jika: } \\tan(\\theta) \\le \\mu_s",
              "F_{\\text{net}} = mg \\sin(\\theta) - \\mu_k mg \\cos(\\theta)",
            ],
            audioNarrationText:
              "Benda akan mulai meluncur saat tangen sudut kemiringan melebihi koefisien gesekan statis.",
          },
        },
        {
          id: "inc2-step-2",
          type: "playground",
          title: "Uji Gesekan Statis vs Kinetis",
          playground: {
            title: "Simulasi Ambang Batas Luncur",
            instructions: "Tingkatkan sudut kemiringan perlahan sampai status balok berubah dari Diam menjadi Meluncur.",
            interactiveComponentSlug: "physics-newton-incline",
            initialVariables: { angleDeg: 15, mass: 5, frictionCoeff: 0.4 },
          },
        },
        {
          id: "inc2-step-3",
          type: "challenge",
          title: "Misi: Tahan Balok dengan Gesekan",
          challenge: {
            id: "challenge-incline-2",
            title: "Kesetimbangan Tanpa Gerak",
            question: "Atur sudut kemiringan minimal 15° namun atur koefisien gesek μ agar balok tetap diam tidak meluncur.",
            targetCondition: (vars: Record<string, number>) => {
              const angle = vars.angleDeg ?? 30;
              const forces = calculateInclineForces({
                mass: vars.mass ?? 5,
                angleDeg: angle,
                frictionCoeff: vars.frictionCoeff ?? 0.2,
                gravity: vars.gravity ?? 9.8,
                inclineLength: 10,
              });
              return angle >= 15 && !forces.isSliding;
            },
            hint1Static: "Balok akan diam jika tan(θ) ≤ μ.",
            hint2Static: "Untuk sudut 20°, tan(20°) ≈ 0.36, sehingga μ harus diatur lebih besar dari 0.36.",
            solutionVariables: { angleDeg: 20, frictionCoeff: 0.5 },
            solutionExplanation: "Karena tan(20°) ≈ 0.36 < 0.5, gaya gesek statis mampu menahan balok.",
            xpReward: 60,
          },
        },
        {
          id: "inc2-step-4",
          type: "validation",
          title: "Konsep Sudut Repose",
          validation: {
            title: "Hukum Friksi Terkuasai",
            summaryText: "Batas kritis sudut kemiringan agar benda tidak meluncur adalah tan(θ) = μ.",
            keyTakeaway: "Keseimbangan statis tidak bergantung pada massa benda, hanya sudut dan koefisien gesek.",
            formulaKaTeX: "\\tan(\\theta_{\\text{repose}}) = \\mu_s",
            badgeToUnlock: "friction-master",
          },
        },
      ],
    },
    {
      id: "incline-level-3",
      index: 3,
      tier: 3,
      title: "Kecepatan Akhir & Dinamika Lanjutan",
      description: "Menghubungkan percepatan resultan dengan waktu tempuh dan kecepatan di dasar bidang.",
      steps: [
        {
          id: "inc3-step-1",
          type: "explanation",
          title: "Kinematika di Sepanjang Bidang Miring",
          explanation: {
            title: "Persamaan Gerak Terakselerasi",
            conceptText:
              "Saat balok mengalami percepatan konstan a = g(sin θ - μ cos θ) sepanjang jarak L, kelajuan akhir memenuhi teorema Torricelli: v² = 2aL.",
            analogyText:
              "Semakin panjang bidang miring atau semakin besar percepatan resultan, semakin tinggi kelajuan yang dicapai balok saat menyentuh dasar.",
            keyFormulas: [
              "a = g(\\sin\\theta - \\mu \\cos\\theta)",
              "v = \\sqrt{2aL}",
              "t = \\sqrt{\\frac{2L}{a}}",
            ],
            audioNarrationText:
              "Kecepatan akhir balok di dasar bidang miring dapat dihitung menggunakan rumus akar dua kali percepatan dikali panjang lintasan.",
          },
        },
        {
          id: "inc3-step-2",
          type: "playground",
          title: "Eksperimen Gravitasi Planet Lain",
          playground: {
            title: "Simulasi Gravitasi Lintas Planet",
            instructions: "Ganti percepatan gravitasi ke gravitasi Bulan (1.6 m/s²) atau Jupiter (24.8 m/s²) dan amati efeknya terhadap waktu tempuh balok.",
            interactiveComponentSlug: "physics-newton-incline",
            initialVariables: { angleDeg: 35, mass: 5, frictionCoeff: 0.1, gravity: 9.8 },
          },
        },
        {
          id: "inc3-step-3",
          type: "challenge",
          title: "Misi: Target Kelajuan Tepat 10 m/s",
          challenge: {
            id: "challenge-incline-3",
            title: "Kalibrasi Kelajuan Akhir",
            question: "Atur kombinasi sudut kemiringan dan koefisien gesek agar kelajuan akhir tepat 10 m/s (±0.5 m/s) di ujung bidang 10 meter.",
            targetCondition: (vars: Record<string, number>) => {
              const forces = calculateInclineForces({
                mass: vars.mass ?? 5,
                angleDeg: vars.angleDeg ?? 30,
                frictionCoeff: vars.frictionCoeff ?? 0.2,
                gravity: vars.gravity ?? 9.8,
                inclineLength: 10,
              });
              return Math.abs(forces.finalVelocity - 10) <= 0.5;
            },
            hint1Static: "Gunakan rumus v² = 2aL. Untuk v = 10 dan L = 10, percepatan harus a = 5 m/s².",
            hint2Static: "Sesuaikan sudut θ dan gesekan μ agar g(sin θ - μ cos θ) ≈ 5 m/s².",
            solutionVariables: { angleDeg: 35, frictionCoeff: 0.1 },
            solutionExplanation: "Dengan percepatan a ≈ 5 m/s² sepanjang 10 m, kelajuan akhir balok mencapai 10 m/s.",
            xpReward: 100,
          },
        },
        {
          id: "inc3-step-4",
          type: "validation",
          title: "Dinamika Gerak Selesai Tuntas",
          validation: {
            title: "Master Bidang Miring Newton",
            summaryText: "Kamu berhasil menguasai dekomposisi gaya, ambang batas friksi, dan kinematika terakselerasi.",
            keyTakeaway: "v = √(2aL) menghubungkan gaya netto Newton dengan kinematika gerak translasi.",
            formulaKaTeX: "v_{\\text{akhir}} = \\sqrt{2 g (\\sin\\theta - \\mu \\cos\\theta) L}",
            badgeToUnlock: "newton-incline-champion",
          },
        },
      ],
    },
  ],
};
