import { TopicModule } from "@/types/topic";
import { calculateWave, calculateInterference } from "./engine";

export const waveModule: TopicModule = {
  id: "physics-wave-simulator",
  slug: "physics-wave-simulator",
  title: "Simulator Gelombang Mekanik & Interferensi",
  category: "physics",
  summary:
    "Memahami perambatan gelombang transversal dan longitudinal, hubungan cepat rambat v = λf, serta fenomena superposisi dan interferensi konstruktif-destruktif.",
  audioNarrationText:
    "Selamat datang di modul Simulator Gelombang. Kamu akan mengamati bagaimana energi merambat membentuk gelombang periodik dan fenomena superposisi dua gelombang.",
  initialVariables: {
    amplitude: 0.5,
    frequency: 2.0,
    wavelength: 4.0,
    phaseDeg: 0,
    wave2Amplitude: 0.5,
    wave2PhaseDeg: 0,
  },
  levels: [
    {
      id: "wave-level-1",
      index: 1,
      tier: 1,
      title: "Cepat Rambat & Persamaan Gelombang",
      description: "Menghubungkan frekuensi, panjang gelombang, dan cepat rambat v = λf.",
      steps: [
        {
          id: "wv1-step-1",
          type: "explanation",
          title: "Energi yang Merambat Tanpa Memindahkan Materi",
          explanation: {
            title: "Hakikat Gelombang Mekanik",
            conceptText:
              "Ketika kamu menggetarkan seutas tali, partikel tali hanya bergerak naik-turun di sekitar titik setimbangnya. Yang meluncur maju dengan kecepatan v adalah pola energi atau usikannya.",
            analogyText:
              "Cepat rambat gelombang memenuhi relasi universal: jarak satu gelombang (λ) ditempuh dalam waktu satu periode (T), menghasilkan v = λ / T = λ × f.",
            keyFormulas: [
              "v = \\lambda f",
              "k = \\frac{2\\pi}{\\lambda}, \\quad \\omega = 2\\pi f",
              "y(x, t) = A \\sin(kx - \\omega t)",
            ],
            audioNarrationText:
              "Cepat rambat gelombang sama dengan panjang gelombang dikalikan frekuensi getarannya.",
          },
        },
        {
          id: "wv1-step-2",
          type: "playground",
          title: "Eksplorasi Parameter Gelombang",
          playground: {
            title: "Simulasi Tali Bergetar",
            instructions: "Ubah frekuensi f dan panjang gelombang λ lalu amati perubahan kerapatan dan kecepatan rambatan pola gelombang.",
            interactiveComponentSlug: "physics-wave-simulator",
            initialVariables: { amplitude: 0.5, frequency: 2.0, wavelength: 4.0 },
          },
        },
        {
          id: "wv1-step-3",
          type: "challenge",
          title: "Misi: Kalibrasi Cepat Rambat v = 10 m/s",
          challenge: {
            id: "challenge-wave-1",
            title: "Target Kecepatan Rambat",
            question: "Atur frekuensi f dan panjang gelombang λ agar kecepatan rambat gelombang tepat 10 m/s (±0.2 m/s).",
            targetCondition: (vars: Record<string, number>) => {
              const w = calculateWave({
                amplitude: vars.amplitude ?? 0.5,
                frequency: vars.frequency ?? 2.0,
                wavelength: vars.wavelength ?? 4.0,
              });
              return Math.abs(w.waveSpeed - 10) <= 0.2;
            },
            hint1Static: "Gunakan rumus cepat rambat v = λ × f.",
            hint2Static: "Jika f = 2.0 Hz, setel λ = 5.0 m, atau jika f = 2.5 Hz, setel λ = 4.0 m.",
            solutionVariables: { frequency: 2.0, wavelength: 5.0 },
            solutionExplanation: "Dengan f = 2.0 Hz dan λ = 5.0 m, cepat rambat v = 2.0 × 5.0 = 10.0 m/s.",
            xpReward: 30,
          },
        },
        {
          id: "wv1-step-4",
          type: "validation",
          title: "Refleksi Cepat Rambat",
          validation: {
            title: "Relasi Universal Gelombang",
            summaryText: "v = λf berlaku untuk semua jenis gelombang di alam semesta, termasuk gelombang air, bunyi, hingga cahaya.",
            keyTakeaway: "Kecepatan rambat ditentukan oleh sifat fisis medium perantara.",
            formulaKaTeX: "v = \\lambda f = \\frac{\\omega}{k}",
            badgeToUnlock: "wave-explorer",
          },
        },
      ],
    },
    {
      id: "wave-level-2",
      index: 2,
      tier: 2,
      title: "Superposisi & Interferensi Gelombang",
      description: "Memahami bagaimana dua gelombang saling melipatgandakan atau meniadakan.",
      steps: [
        {
          id: "wv2-step-1",
          type: "explanation",
          title: "Prinsip Superposisi Linear",
          explanation: {
            title: "Pertemuan Dua Gelombang",
            conceptText:
              "Ketika dua gelombang merambat melalui titik yang sama, simpangan total adalah penjumlahan aljabar langsung: y_total = y₁ + y₂.",
            analogyText:
              "Jika kedua gelombang memiliki beda fase 180° (berlawanan fase), puncak gelombang 1 akan bertemu lembah gelombang 2, menyebabkan keduanya saling meniadakan menjadi hening (Interferensi Destruktif).",
            keyFormulas: [
              "y_{\\text{total}}(x, t) = y_1(x, t) + y_2(x, t)",
              "\\Delta\\phi = 0^\\circ \\implies A_{\\text{total}} = A_1 + A_2 \\quad (\\text{Konstruktif})",
              "\\Delta\\phi = 180^\\circ \\implies A_{\\text{total}} = |A_1 - A_2| \\quad (\\text{Destruktif})",
            ],
            audioNarrationText:
              "Interferensi destruktif sempurna terjadi ketika dua gelombang yang sama memiliki beda fase seratus delapan puluh derajat.",
          },
        },
        {
          id: "wv2-step-2",
          type: "playground",
          title: "Eksplorasi Interferensi 2 Gelombang",
          playground: {
            title: "Simulasi Superposisi Gelombang",
            instructions: "Pilih mode Interferensi dan geser slider Beda Fase dari 0° menuju 180° untuk melihat efek peredaman.",
            interactiveComponentSlug: "physics-wave-simulator",
            initialVariables: { amplitude: 0.5, wave2Amplitude: 0.5, wave2PhaseDeg: 0 },
          },
        },
        {
          id: "wv2-step-3",
          type: "challenge",
          title: "Misi: Peniadaan Total (Noise Cancelling)",
          challenge: {
            id: "challenge-wave-2",
            title: "Interferensi Destruktif 180°",
            question: "Pada mode interferensi, atur beda fase gelombang 2 tepat 180° dari gelombang 1 agar simpangan resultan mendatar rata nol.",
            targetCondition: (vars: Record<string, number>) => {
              const res = calculateInterference({
                wave1: { amplitude: vars.amplitude ?? 0.5, frequency: vars.frequency ?? 2, wavelength: vars.wavelength ?? 4, phaseDeg: vars.phaseDeg ?? 0 },
                wave2: { amplitude: vars.wave2Amplitude ?? 0.5, frequency: vars.frequency ?? 2, wavelength: vars.wavelength ?? 4, phaseDeg: vars.wave2PhaseDeg ?? 180 },
              });
              return res.isDestructive;
            },
            hint1Static: "Interferensi destruktif terjadi pada beda fase 180°.",
            hint2Static: "Pastikan kedua gelombang memiliki amplitudo yang sama dan atur beda fase tepat 180°.",
            solutionVariables: { wave2PhaseDeg: 180 },
            solutionExplanation: "Pada Δφ = 180°, sin(θ + 180°) = -sin(θ), sehingga kedua gelombang saling menghapuskan.",
            xpReward: 60,
          },
        },
        {
          id: "wv2-step-4",
          type: "validation",
          title: "Teknologi Anti-Bising Modern",
          validation: {
            title: "Prinsip ANC Dikuasai",
            summaryText: "Mikrofon menangkap gelombang suara luar dan mikroprosesor langsung memancarkan gelombang terbalik 180°.",
            keyTakeaway: "Interferensi adalah bukti mutlak sifat gelombang suatu fenomena alam.",
            formulaKaTeX: "y_{\\text{destruktif}} = A\\sin(\\theta) + A\\sin(\\theta + \\pi) = 0",
            badgeToUnlock: "interference-master",
          },
        },
      ],
    },
    {
      id: "wave-level-3",
      index: 3,
      tier: 3,
      title: "Gelombang Suara & Longitudinal",
      description: "Memvisualisasikan getaran partikel searah rambatan menghasilkan mampatan dan renggangan.",
      steps: [
        {
          id: "wv3-step-1",
          type: "explanation",
          title: "Bagaimana Suara Merambat di Udara?",
          explanation: {
            title: "Gelombang Longitudinal",
            conceptText:
              "Berbeda dari gelombang tali (transversal) yang partikelnya bergerak tegak lurus arah rambat, gelombang suara adalah gelombang longitudinal di mana molekul udara berosilasi maju-mundur sejajar arah rambat.",
            analogyText:
              "Daerah bertekanan tinggi di mana partikel berkerumun disebut Mampatan (Compression), sedangkan daerah bertekanan rendah disebut Renggangan (Rarefaction).",
            keyFormulas: [
              "s(x, t) = s_{\\text{max}} \\cos(kx - \\omega t)",
              "\\Delta P(x, t) = \\Delta P_{\\text{max}} \\sin(kx - \\omega t)",
            ],
            audioNarrationText:
              "Pada gelombang longitudinal, getaran partikel terjadi sejajar dengan arah perambatan gelombang.",
          },
        },
        {
          id: "wv3-step-2",
          type: "playground",
          title: "Eksplorasi Molekul Udara Suara",
          playground: {
            title: "Simulasi Mampatan Akustik",
            instructions: "Pilih mode Suara (Longitudinal) dan perhatikan bagaimana pita partikel membentuk kolom mampatan yang merambat ke kanan.",
            interactiveComponentSlug: "physics-wave-simulator",
            initialVariables: { amplitude: 0.6, frequency: 2.0, wavelength: 4.0 },
          },
        },
        {
          id: "wv3-step-3",
          type: "challenge",
          title: "Misi: Superposisi Amplitudo Maksimum",
          challenge: {
            id: "challenge-wave-3",
            title: "Puncak Ganda 1.0 m",
            question: "Atur kedua gelombang sefase (Δφ = 0°) dengan masing-masing amplitudo 0.5 m agar puncak resultan berlipat ganda tepat 1.0 m.",
            targetCondition: (vars: Record<string, number>) => {
              const a1 = vars.amplitude ?? 0.5;
              const a2 = vars.wave2Amplitude ?? 0.5;
              const res = calculateInterference({
                wave1: { amplitude: a1, frequency: vars.frequency ?? 2, wavelength: vars.wavelength ?? 4, phaseDeg: vars.phaseDeg ?? 0 },
                wave2: { amplitude: a2, frequency: vars.frequency ?? 2, wavelength: vars.wavelength ?? 4, phaseDeg: vars.wave2PhaseDeg ?? 0 },
              });
              return res.isConstructive && Math.abs(a1 + a2 - 1.0) <= 0.05;
            },
            hint1Static: "Beda fase harus 0°.",
            hint2Static: "Atur A₁ = 0.5 m dan A₂ = 0.5 m dengan beda fase 0°.",
            solutionVariables: { amplitude: 0.5, wave2Amplitude: 0.5, wave2PhaseDeg: 0 },
            solutionExplanation: "Saat sefase, kedua amplitudo dijumlahkan langsung: 0.5 + 0.5 = 1.0 meter.",
            xpReward: 100,
          },
        },
        {
          id: "wv3-step-4",
          type: "validation",
          title: "Penguasaan Gelombang Komprehensif",
          validation: {
            title: "Pakar Fisika Gelombang",
            summaryText: "Kamu berhasil menguasai cepat rambat gelombang, superposisi interferensi, dan perbedaan transversal vs longitudinal.",
            keyTakeaway: "Gelombang adalah mekanisme alam yang paling efisien untuk mentransmisikan energi dan informasi jarak jauh.",
            formulaKaTeX: "y(x, t) = 2A \\cos\\left(\\frac{\\Delta\\phi}{2}\\right) \\sin\\left(kx - \\omega t + \\frac{\\Delta\\phi}{2}\\right)",
            badgeToUnlock: "wave-master",
          },
        },
      ],
    },
  ],
};
