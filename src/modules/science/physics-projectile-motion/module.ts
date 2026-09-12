import { TopicModule } from "@/types/topic";
import { computeProjectileMetrics } from "./engine";

export const projectileModule: TopicModule = {
  id: "physics-projectile-motion",
  slug: "physics-projectile-motion",
  title: "Kanon Proyektil & Gerak Parabola",
  category: "physics",
  summary:
    "Memahami gerak dua dimensi sebagai perpaduan gerak lurus beraturan horizontal dan gerak lurus berubah beraturan vertikal di bawah pengaruh gravitasi.",
  audioNarrationText:
    "Selamat datang di modul Kanon Proyektil. Kamu akan mempelajari bagaimana lintasan melengkung parabola dibentuk oleh kemandirian gerak horizontal dan vertikal.",
  initialVariables: {
    angleDegrees: 45,
    v0: 20,
    g: 9.8,
    h0: 0,
  },
  levels: [
    {
      id: "projectile-level-1",
      index: 1,
      tier: 1,
      title: "Prinsip Superposisi Gerak 2 Dimensi",
      description: "Melihat gerak horizontal dan vertikal sebagai dua dimensi yang saling bebas.",
      steps: [
        {
          id: "p1-step-1",
          type: "explanation",
          title: "Analogi Menjatuhkan dan Menembakkan Peluru",
          explanation: {
            title: "Dua Gerak yang Saling Independen",
            conceptText:
              "Jika sebutir peluru dijatuhkan bebas dari tebing dan sebutir lagi ditembakkan horizontal pada saat yang sama, keduanya akan menyentuh tanah pada detik yang persis bersamaan!",
            analogyText:
              "Gravitasi hanya bekerja menarik benda ke arah vertikal sumbu-y, tanpa memengaruhi sama sekali kecepatan horizontal sumbu-x yang meluncur bebas secara konstan.",
            keyFormulas: [
              "v_x = v_0 \\cos(\\theta) \\quad (\\text{konstan})",
              "v_y(t) = v_0 \\sin(\\theta) - gt",
              "y(t) = v_{0y}t - \\frac{1}{2}gt^2",
            ],
            audioNarrationText:
              "Gerak horizontal proyektil tidak dipengaruhi oleh percepatan gravitasi bumi.",
          },
        },
        {
          id: "p1-step-2",
          type: "playground",
          title: "Eksplorasi Sudut Elevasi Kanon",
          playground: {
            title: "Simulasi Tembakan Parabola",
            instructions: "Ubah sudut elevasi dan tekan tombol Tembak untuk mengamati perubahan jarak jangkauan.",
            interactiveComponentSlug: "physics-projectile-motion",
            initialVariables: { angleDegrees: 45, v0: 20 },
          },
        },
        {
          id: "p1-step-3",
          type: "challenge",
          title: "Misi: Jangkauan Tembak Terjauh",
          challenge: {
            id: "challenge-projectile-1",
            title: "Jangkauan Maksimum 45°",
            question: "Atur sudut kanon agar peluru meluncur dengan jangkauan horizontal terjauh di tanah datar.",
            targetCondition: (vars: Record<string, number>) => {
              return Math.abs(vars.angleDegrees - 45) <= 1.5;
            },
            hint1Static: "Rumus jangkauan horizontal adalah R = (v₀² sin 2θ) / g.",
            hint2Static: "Fungsi sin(2θ) bernilai maksimum ketika 2θ = 90°, yaitu pada θ = 45°.",
            solutionVariables: { angleDegrees: 45 },
            solutionExplanation: "Pada sudut 45°, komponen kecepatan horizontal dan vertikal seimbang optimal menghasilkan jangkauan terjauh.",
            xpReward: 30,
          },
        },
        {
          id: "p1-step-4",
          type: "validation",
          title: "Pemahaman Tuntas: Lintasan Parabola",
          validation: {
            title: "Superposisi Gerak Dikuasai",
            summaryText:
              "Gerak parabola merupakan irisan kerucut parabola yang terbentuk dari persamaan kuadrat posisi vertikal terhadap posisi horizontal.",
            keyTakeaway: "Sudut 45° menghasilkan jarak horizontal maksimum pada medan datar.",
            formulaKaTeX: "R_{\\text{maks}} = \\frac{v_0^2}{g} \\quad (\\theta = 45^\\circ)",
            badgeToUnlock: "first-step",
          },
        },
      ],
    },
    {
      id: "projectile-level-2",
      index: 2,
      tier: 2,
      title: "Sudut Komplementer & Simetri Lintasan",
      description: "Menganalisis pasangan sudut yang menghasilkan jangkauan tembak yang identik.",
      steps: [
        {
          id: "p2-step-1",
          type: "explanation",
          title: "Keajaiban Sudut Komplementer",
          explanation: {
            title: "Mengapa 30° dan 60° Mendarat di Titik yang Sama?",
            conceptText:
              "Karena sin(2 × 30°) = sin(60°) = √3/2, dan sin(2 × 60°) = sin(120°) = √3/2. Nilai sinus keduanya sama persis!",
            analogyText:
              "Tembakan 60° melambung sangat tinggi ke angkasa dan berada di udara lebih lama, sementara tembakan 30° meluncur cepat menyusur tanah. Keduanya mendarat di lubang yang sama persis.",
            keyFormulas: [
              "\\theta_1 + \\theta_2 = 90^\\circ \\implies R(\\theta_1) = R(\\theta_2)",
              "H_{\\text{max}}(\\theta_2) > H_{\\text{max}}(\\theta_1) \\quad (\\text{jika } \\theta_2 > \\theta_1)",
            ],
            audioNarrationText:
              "Dua sudut yang saling berkomplemen memiliki jangkauan horizontal yang tepat sama.",
          },
        },
        {
          id: "p2-step-2",
          type: "playground",
          title: "Uji Pasangan Sudut 30° dan 60°",
          playground: {
            title: "Laboratorium Sudut Komplementer",
            instructions: "Tembak pada sudut 30°, lalu ubah ke 60° dan amati bahwa titik jatuh jejaknya berhimpit.",
            interactiveComponentSlug: "physics-projectile-motion",
            initialVariables: { angleDegrees: 30, v0: 25 },
          },
        },
        {
          id: "p2-step-3",
          type: "challenge",
          title: "Misi: Buktikan Sudut Komplementer",
          challenge: {
            id: "challenge-projectile-2",
            title: "Pasangan Sudut Komplementer 60°",
            question: "Jika sudut tembakan pertama bernilai 30°, atur kanon ke sudut pasangannya yang menghasilkan jangkauan yang sama.",
            targetCondition: (vars: Record<string, number>) => {
              return Math.abs(vars.angleDegrees - 60) <= 1.5;
            },
            hint1Static: "Sudut komplementer adalah 90° dikurangi sudut awal.",
            hint2Static: "90° - 30° = 60°.",
            solutionVariables: { angleDegrees: 60 },
            solutionExplanation: "Sudut 30° dan 60° menghasilkan jangkauan R yang sama persis karena sin(2 × 30°) = sin(2 × 60°).",
            xpReward: 60,
          },
        },
        {
          id: "p2-step-4",
          type: "validation",
          title: "Pemahaman Tuntas: Simetri Parabola",
          validation: {
            title: "Simetri Sudut Dikuasai",
            summaryText:
              "Sudut dengan elevasi lebih tinggi memiliki waktu terbang dan puncak lebih besar, tetapi jangkauan yang sama dengan sudut komplementernya.",
            keyTakeaway: "Untuk setiap target jangkauan R < R_maks, selalu ada dua sudut tembak yang valid.",
            formulaKaTeX: "R(\\theta) = R(90^\\circ - \\theta)",
          },
        },
      ],
    },
    {
      id: "projectile-level-3",
      index: 3,
      tier: 3,
      title: "Menembak Sasaran & Gravitasi Planet",
      description: "Menghitung presisi tembakan dan memahami pengaruh medan gravitasi benda langit.",
      steps: [
        {
          id: "p3-step-1",
          type: "explanation",
          title: "Meriam di Bulan dan Mars",
          explanation: {
            title: "Apa yang Terjadi Jika Gravitasi Berkurang?",
            conceptText:
              "Karena percepatan gravitasi g berada di posisi penyebut rumus jangkauan, proyektil di medan gravitasi lemah akan melayang jauh lebih lama.",
            analogyText:
              "Di Bulan di mana g = 1.6 m/s² (seperenam bumi), sebuah tendangan bola atau tembakan meriam yang sama akan terbang 6 kali lebih jauh dan 6 kali lebih tinggi!",
            keyFormulas: [
              "R \\propto \\frac{1}{g}, \\quad H_{\\text{max}} \\propto \\frac{1}{g}",
              "g_{\\text{Bulan}} \\approx 1.6 \\text{ m/s}^2, \\quad g_{\\text{Mars}} \\approx 3.7 \\text{ m/s}^2",
            ],
            audioNarrationText:
              "Gravitasi yang lebih kecil membuat jangkauan dan waktu terbang proyektil meningkat secara proporsional.",
          },
        },
        {
          id: "p3-step-2",
          type: "playground",
          title: "Eksplorasi Gravitasi Antariksa",
          playground: {
            title: "Kanon Multi-Planet",
            instructions: "Pilih preset planet Bulan atau Mars dan tembak kanon untuk melihat lonjakan jangkauan terbang.",
            interactiveComponentSlug: "physics-projectile-motion",
            initialVariables: { angleDegrees: 45, v0: 15, g: 1.6 },
          },
        },
        {
          id: "p3-step-3",
          type: "challenge",
          title: "Misi: Tembak Tepat Sasaran 50 Meter",
          challenge: {
            id: "challenge-projectile-3",
            title: "Bullseye Target 50 Meter",
            question: "Atur sudut dan kecepatan awal agar peluru mendarat tepat pada bendera target 50 meter (toleransi ±1.5 m).",
            targetCondition: (vars: Record<string, number>) => {
              const metrics = computeProjectileMetrics({
                angleDegrees: vars.angleDegrees,
                v0: vars.v0,
                g: vars.g || 9.8,
                h0: vars.h0 || 0,
              });
              return Math.abs(metrics.range - 50) <= 1.5;
            },
            hint1Static: "Pada sudut 45°, R = v₀² / g. Gunakan rumus v₀ = √(R × g).",
            hint2Static: "Jika R = 50 dan g = 9.8, maka v₀ ≈ √(490) ≈ 22.1 m/s.",
            solutionVariables: { angleDegrees: 45, v0: 22 },
            solutionExplanation: "Pada 45° dan v₀ = 22.1 m/s, jangkauan horizontal peluru tepat mengenai target di jarak 50 meter.",
            xpReward: 100,
          },
        },
        {
          id: "p3-step-4",
          type: "validation",
          title: "Master Kinematika Proyektil",
          validation: {
            title: "Selamat! Kamu Menjadi Ahli Balistik Sains",
            summaryText:
              "Kamu telah menguasai superposisi gerak 2D, simetri sudut komplementer, dan perhitungan jangkauan tembakan di berbagai medan gravitasi.",
            keyTakeaway: "Kinematika proyektil menggabungkan GLB pada sumbu horizontal dan GLBB pada sumbu vertikal.",
            formulaKaTeX: "\\vec{r}(t) = (v_{0x}t) \\hat{i} + \\left(v_{0y}t - \\frac{1}{2}gt^2\\right) \\hat{j}",
            badgeToUnlock: "polymath",
          },
        },
      ],
    },
  ],
};
