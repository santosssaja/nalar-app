import { TopicModule } from "@/types/topic";
import { calculateRollerCoaster } from "./engine";

export const rollerCoasterModule: TopicModule = {
  id: "physics-roller-coaster",
  slug: "physics-roller-coaster",
  title: "Roller Coaster & Konservasi Energi",
  category: "physics",
  summary:
    "Memahami pertukaran dinamis antara energi potensial gravitasi dan energi kinetik, serta syarat kecepatan kritis untuk menembus loop vertikal.",
  audioNarrationText:
    "Selamat datang di modul Roller Coaster. Kamu akan menyelidiki bagaimana energi mekanik selalu kekal dan syarat kelajuan agar kereta tidak jatuh di puncak loop lingkaran.",
  initialVariables: {
    initialHeight: 28,
    loopRadius: 10,
    mass: 500,
    gravity: 9.8,
    initialVelocity: 0,
  },
  levels: [
    {
      id: "coaster-level-1",
      index: 1,
      tier: 1,
      title: "Hukum Kekekalan Energi Mekanik",
      description: "Pertukaran energi potensial mgh menjadi energi kinetik 0.5mv².",
      steps: [
        {
          id: "rc1-step-1",
          type: "explanation",
          title: "Dari Puncak Menuju Lembah",
          explanation: {
            title: "Prinsip Konservasi Energi",
            conceptText:
              "Ketika kereta roller coaster berada di puncak bukit setinggi h₀, kereta menyimpan energi potensial gravitasi maksimum EP = mgh₀. Begitu meluncur turun, EP berubah menjadi energi kinetik EK.",
            analogyText:
              "Di titik terendah (lembah h = 0), seluruh energi potensial telah berganti wujud menjadi energi kinetik murni, menghasilkan kelajuan maksimum v = √(2gh₀).",
            keyFormulas: [
              "E_M = E_P + E_K = \\text{konstan}",
              "E_P = mgh, \\quad E_K = \\frac{1}{2}mv^2",
              "v_{\\text{dasar}} = \\sqrt{2gh_0}",
            ],
            audioNarrationText:
              "Total energi mekanik kereta roller coaster selalu bernilai konstan tanpa adanya gesekan.",
          },
        },
        {
          id: "rc1-step-2",
          type: "playground",
          title: "Eksplorasi Kecepatan di Dasar Lembah",
          playground: {
            title: "Simulasi Peluncuran Bukit Pertama",
            instructions: "Atur ketinggian awal bukit dan amati perubahan diagram batang energi saat kereta meluncur.",
            interactiveComponentSlug: "physics-roller-coaster",
            initialVariables: { initialHeight: 25, loopRadius: 8 },
          },
        },
        {
          id: "rc1-step-3",
          type: "challenge",
          title: "Misi: Capai Kelajuan 20 m/s",
          challenge: {
            id: "challenge-coaster-1",
            title: "Target Kecepatan Lembah",
            question: "Atur ketinggian awal h₀ agar kelajuan kereta di dasar lembah tepat 20 m/s (±0.5 m/s).",
            targetCondition: (vars: Record<string, number>) => {
              const m = calculateRollerCoaster({
                initialHeight: vars.initialHeight ?? 28,
                loopRadius: vars.loopRadius ?? 10,
                mass: vars.mass ?? 500,
                gravity: vars.gravity ?? 9.8,
              });
              return Math.abs(m.speedAtBottom - 20) <= 0.5;
            },
            hint1Static: "Gunakan rumus v = √(2gh₀) atau h₀ = v² / (2g).",
            hint2Static: "Untuk v = 20 m/s dan g = 9.8 m/s², h₀ = 400 / 19.6 ≈ 20.4 meter.",
            solutionVariables: { initialHeight: 20.4 },
            solutionExplanation: "Ketinggian bukit ~20.4 meter menghasilkan energi kinetik yang memacu kecepatan 20 m/s.",
            xpReward: 30,
          },
        },
        {
          id: "rc1-step-4",
          type: "validation",
          title: "Fondasi Konservasi Energi Teruji",
          validation: {
            title: "Konsep Usaha-Energi Dikuasai",
            summaryText: "Energi tidak dapat dimusnahkan, hanya berpindah bentuk antara potensial dan kinetik.",
            keyTakeaway: "Kecepatan di dasar tidak bergantung pada massa kereta, hanya pada ketinggian bukit awal.",
            formulaKaTeX: "v = \\sqrt{2gh_0}",
            badgeToUnlock: "coaster-pioneer",
          },
        },
      ],
    },
    {
      id: "coaster-level-2",
      index: 2,
      tier: 2,
      title: "Loop Vertikal & Ketinggian Kritis",
      description: "Menghitung syarat batas h ≥ 2.5R agar kereta tidak jatuh di puncak loop.",
      steps: [
        {
          id: "rc2-step-1",
          type: "explanation",
          title: "Mengapa Kereta Tidak Jatuh Terbalik?",
          explanation: {
            title: "Syarat Batas Puncak Loop Lingkaran",
            conceptText:
              "Di titik tertinggi loop (h = 2R), gravitasi menarik ke bawah dan gaya normal rel menekan ke bawah. Agar kereta tidak jatuh lepas dari rel, gaya normal minimal N ≥ 0.",
            analogyText:
              "Kondisi N = 0 menghasilkan kelajuan kritis v_kritis = √(gR). Dari konservasi energi mgh₀ = mg(2R) + 0.5 m v_kritis², diperoleh h₀,min = 2.5 R!",
            keyFormulas: [
              "h_{\\text{puncak loop}} = 2R",
              "v_{\\text{kritis}} = \\sqrt{gR}",
              "h_{0,\\text{min}} = \\frac{5}{2} R = 2.5 R",
            ],
            audioNarrationText:
              "Ketinggian awal bukit minimal harus dua koma lima kali jari-jari loop agar kereta dapat berputar aman.",
          },
        },
        {
          id: "rc2-step-2",
          type: "playground",
          title: "Uji Coba Batas Jatuh Kereta",
          playground: {
            title: "Eksperimen Loop Berbahaya",
            instructions: "Atur h₀ di bawah 2.5R dan amati status peringatan ketika kereta gagal menuntaskan loop.",
            interactiveComponentSlug: "physics-roller-coaster",
            initialVariables: { initialHeight: 20, loopRadius: 10 },
          },
        },
        {
          id: "rc2-step-3",
          type: "challenge",
          title: "Misi: Tembus Puncak Loop Tepat Batas",
          challenge: {
            id: "challenge-coaster-2",
            title: "Kalibrasi Batas h₀ = 2.5R",
            question: "Atur ketinggian awal bukit h₀ tepat 2.5 × R untuk loop R = 10 m agar kereta menembus loop pada batas kritis.",
            targetCondition: (vars: Record<string, number>) => {
              const h0 = vars.initialHeight ?? 28;
              const R = vars.loopRadius ?? 10;
              return Math.abs(h0 - 2.5 * R) <= 0.8 && Math.abs(R - 10) <= 0.5;
            },
            hint1Static: "Hitung h₀ = 2.5 × 10 = 25 meter.",
            hint2Static: "Set R = 10 dan geser h₀ tepat ke 25 meter.",
            solutionVariables: { initialHeight: 25, loopRadius: 10 },
            solutionExplanation: "Pada h₀ = 25 m dan R = 10 m, kecepatan di puncak tepat v = √(98) ≈ 9.9 m/s.",
            xpReward: 60,
          },
        },
        {
          id: "rc2-step-4",
          type: "validation",
          title: "Pemahaman Syarat Batas Lingkaran",
          validation: {
            title: "Loop Vertikal Terkuasai",
            summaryText: "Ketinggian 2.5R adalah batas mutlak kekekalan energi untuk loop lingkaran vertikal sempurna.",
            keyTakeaway: "Tanpa kecepatan awal, bukit pertama harus selalu lebih tinggi dari 2.5 kali radius loop.",
            formulaKaTeX: "h_0 \\ge 2.5 R",
            badgeToUnlock: "loop-master",
          },
        },
      ],
    },
    {
      id: "coaster-level-3",
      index: 3,
      tier: 3,
      title: "G-Force & Keselamatan Penumpang",
      description: "Menghitung gaya normal dan sensasi bobot penumpangnya di berbagai titik lintasan.",
      steps: [
        {
          id: "rc3-step-1",
          type: "explanation",
          title: "Sensasi Gaya Berat Semu (G-Force)",
          explanation: {
            title: "Gaya Sentripetal di Lembah dan Puncak",
            conceptText:
              "Di dasar lembah, gaya normal rel menopang berat plus gaya sentripetal: N = mg + mv²/R. Penumpang merasakan tubuhnya ditekan sangat berat (G-Force positif tinggi).",
            analogyText:
              "Sebaliknya di puncak bukit atau puncak loop, gaya normal berkurang sehingga penumpang merasakan sensasi melayang (airtime / weightlessness).",
            keyFormulas: [
              "N_{\\text{dasar}} = mg + \\frac{mv^2}{R}",
              "N_{\\text{puncak loop}} = m\\left(\\frac{v^2}{R} - g\\right)",
            ],
            audioNarrationText:
              "Gaya normal di dasar lembah jauh lebih besar karena rel harus menahan berat sekaligus membelokkan lintasan kereta.",
          },
        },
        {
          id: "rc3-step-2",
          type: "playground",
          title: "Eksperimen Gravitasi Planet Ekstrem",
          playground: {
            title: "Roller Coaster di Jupiter & Bulan",
            instructions: "Pilih gravitasi Jupiter (24.8 m/s²) dan amati lonjakan drastis pada energi dan kelajuan kereta.",
            interactiveComponentSlug: "physics-roller-coaster",
            initialVariables: { initialHeight: 35, loopRadius: 10, gravity: 24.8 },
          },
        },
        {
          id: "rc3-step-3",
          type: "challenge",
          title: "Misi: Loop Ekstrem Kokoh",
          challenge: {
            id: "challenge-coaster-3",
            title: "Tekanan Aman N ≥ 1000 N",
            question: "Atur R = 12 m dan cari ketinggian awal h₀ agar gaya normal di puncak loop minimal 1000 N untuk m = 500 kg.",
            targetCondition: (vars: Record<string, number>) => {
              const R = vars.loopRadius ?? 10;
              const m = calculateRollerCoaster({
                initialHeight: vars.initialHeight ?? 28,
                loopRadius: R,
                mass: vars.mass ?? 500,
                gravity: vars.gravity ?? 9.8,
              });
              return Math.abs(R - 12) <= 0.5 && m.canCompleteLoop && m.normalForceAtLoopTop >= 1000;
            },
            hint1Static: "Ketinggian 2.5R = 30 m hanya menghasilkan N = 0 N.",
            hint2Static: "Naikkan ketinggian bukit ke atas 33 meter.",
            solutionVariables: { initialHeight: 35, loopRadius: 12 },
            solutionExplanation: "Pada h₀ = 35 m dan R = 12 m, gaya normal mencapai ~1100 N, menjamin keselamatan kereta.",
            xpReward: 100,
          },
        },
        {
          id: "rc3-step-4",
          type: "validation",
          title: "Master Rekayasa Roller Coaster",
          validation: {
            title: "Insinyur Roller Coaster Berbakat",
            summaryText: "Kamu berhasil mengintegrasikan energi potensial, kinetik, gaya sentripetal, dan keselamatan loop.",
            keyTakeaway: "Prinsip konservasi energi adalah landasan fundamental dalam perancangan wahana berkecepatan tinggi.",
            formulaKaTeX: "E_{\\text{total}} = \\frac{1}{2}mv^2 + mgh = \\text{konstan}",
            badgeToUnlock: "coaster-engineer",
          },
        },
      ],
    },
  ],
};
