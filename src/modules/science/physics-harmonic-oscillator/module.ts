import { TopicModule } from "@/types/topic";
import { calculatePendulum, calculateSpring } from "./engine";

export const harmonicModule: TopicModule = {
  id: "physics-harmonic-oscillator",
  slug: "physics-harmonic-oscillator",
  title: "Getaran Harmonik Sederhana (Bandul & Pegas)",
  category: "physics",
  summary:
    "Memahami fenomena osilasi periodik pada bandul sederhana dan sistem pegas massa, serta kaitannya dengan gelombang sinusoidal dan konservasi energi.",
  audioNarrationText:
    "Selamat datang di modul Getaran Harmonik Sederhana. Kamu akan mengeksplorasi bagaimana gaya pemulih menghasilkan ayunan periodik yang menjadi dasar teknologi waktu dan gelombang.",
  initialVariables: {
    length: 1.0,
    initialAngleDeg: 15,
    gravity: 9.8,
    springConstant: 50,
    mass: 1.0,
    amplitude: 0.3,
  },
  levels: [
    {
      id: "ghs-level-1",
      index: 1,
      tier: 1,
      title: "Bandul Sederhana & Ayunan Galilei",
      description: "Menemukan hukum isokronisme bandul: periode hanya bergantung pada panjang tali dan gravitasi.",
      steps: [
        {
          id: "ghs1-step-1",
          type: "explanation",
          title: "Penemuan Ayunan Lampu Katedral Galilei",
          explanation: {
            title: "Isokronisme Bandul",
            conceptText:
              "Galileo Galilei menemukan bahwa waktu satu ayunan penuh bandul (periode T) selalu konstan, tidak bergantung pada massa beban maupun seberapa lebar ayunan (untuk sudut kecil θ < 20°).",
            analogyText:
              "Ketika tali diperpanjang 4 kali lipat, periode ayunannya bertambah menjadi 2 kali lipat karena rumus mengandung akar kuadrat panjang tali L.",
            keyFormulas: [
              "T = 2\\pi \\sqrt{\\frac{L}{g}}",
              "f = \\frac{1}{T} = \\frac{1}{2\\pi} \\sqrt{\\frac{g}{L}}",
              "\\omega = \\sqrt{\\frac{g}{L}}",
            ],
            audioNarrationText:
              "Periode ayunan bandul sederhana sebanding dengan akar panjang tali dan berbanding terbalik dengan akar percepatan gravitasi.",
          },
        },
        {
          id: "ghs1-step-2",
          type: "playground",
          title: "Eksplorasi Ayunan Bandul",
          playground: {
            title: "Simulasi Bandul Galilei",
            instructions: "Ubah panjang tali L dan perhatikan bagaimana kurva gelombang sinusoidal melebar atau merapat.",
            interactiveComponentSlug: "physics-harmonic-oscillator",
            initialVariables: { length: 1.0, initialAngleDeg: 15 },
          },
        },
        {
          id: "ghs1-step-3",
          type: "challenge",
          title: "Misi: Kalibrasi Jam Bandul Detik",
          challenge: {
            id: "challenge-ghs-1",
            title: "Periode T = 2.0 Detik",
            question: "Atur panjang tali L agar periode ayunan tepat T = 2.0 s (±0.05 s) pada gravitasi bumi g = 9.8 m/s².",
            targetCondition: (vars: Record<string, number>) => {
              const p = calculatePendulum({
                length: vars.length ?? 1.0,
                initialAngleDeg: vars.initialAngleDeg ?? 15,
                gravity: vars.gravity ?? 9.8,
              });
              return Math.abs(p.period - 2.0) <= 0.05;
            },
            hint1Static: "Dari rumus T = 2π√(L/g), kuadratkan kedua sisi: L = gT² / (4π²).",
            hint2Static: "Untuk T = 2 dan g = 9.8, L = 9.8 × 4 / (4π²) ≈ 0.99 meter.",
            solutionVariables: { length: 0.99 },
            solutionExplanation: "Panjang tali ~0.99 m menghasilkan ayunan tepat 2 detik (1 detik ke kanan, 1 detik kembali ke kiri).",
            xpReward: 30,
          },
        },
        {
          id: "ghs1-step-4",
          type: "validation",
          title: "Refleksi Isokronisme",
          validation: {
            title: "Hukum Bandul Dikuasai",
            summaryText: "Periode bandul mandiri dari massa beban. Tali yang lebih panjang menghasilkan ayunan yang lebih lambat.",
            keyTakeaway: "T sebanding dengan √L. Untuk menggandakan periode, panjang tali harus dikalikan 4.",
            formulaKaTeX: "T = 2\\pi\\sqrt{\\frac{L}{g}}",
            badgeToUnlock: "pendulum-pioneer",
          },
        },
      ],
    },
    {
      id: "ghs-level-2",
      index: 2,
      tier: 2,
      title: "Sistem Pegas Massa & Hukum Hooke",
      description: "Menghitung getaran harmonik dari gaya pemulih elastisitas F = -kx.",
      steps: [
        {
          id: "ghs2-step-1",
          type: "explanation",
          title: "Gaya Pemulih Elastis Pegas",
          explanation: {
            title: "Hukum Hooke dan Gerak Sinusoidal",
            conceptText:
              "Ketika pegas ditarik sejauh x dari titik setimbang, timbul gaya pemulih F = -kx yang menarik massa kembali. Sesuai Hukum II Newton ma = -kx, percepatannya sebanding dengan simpangan berlawanan arah.",
            analogyText:
              "Pegas yang lebih kaku (nilai k besar) menarik lebih kuat sehingga menghasilkan frekuensi getaran yang lebih tinggi.",
            keyFormulas: [
              "F = -kx",
              "T = 2\\pi \\sqrt{\\frac{m}{k}}",
              "f = \\frac{1}{2\\pi} \\sqrt{\\frac{k}{m}}",
            ],
            audioNarrationText:
              "Periode getaran pegas sebanding dengan akar massa beban dan berbanding terbalik dengan akar konstanta kekakuan pegas.",
          },
        },
        {
          id: "ghs2-step-2",
          type: "playground",
          title: "Eksplorasi Osilator Pegas",
          playground: {
            title: "Simulasi Pegas Hooke",
            instructions: "Ubah konstanta pegas k dan massa beban m pada mode Pegas untuk mengamati perubahan kelincahan osilasi.",
            interactiveComponentSlug: "physics-harmonic-oscillator",
            initialVariables: { springConstant: 50, mass: 1.0, amplitude: 0.3 },
          },
        },
        {
          id: "ghs2-step-3",
          type: "challenge",
          title: "Misi: Frekuensi Resonansi 2.0 Hz",
          challenge: {
            id: "challenge-ghs-2",
            title: "Kalibrasi f = 2.0 Hz",
            question: "Pada mode pegas, cari rasio konstanta k dan massa m agar frekuensi getaran tepat 2.0 Hz (±0.1 Hz).",
            targetCondition: (vars: Record<string, number>) => {
              const s = calculateSpring({
                springConstant: vars.springConstant ?? 50,
                mass: vars.mass ?? 1.0,
                amplitude: vars.amplitude ?? 0.3,
              });
              return Math.abs(s.frequency - 2.0) <= 0.1;
            },
            hint1Static: "Frekuensi f = 2.0 Hz berarti periode T = 0.5 detik.",
            hint2Static: "Gunakan hubungan k / m = (2πf)² ≈ (4π)² ≈ 158. Coba m = 1.0 kg dan k = 160 N/m.",
            solutionVariables: { springConstant: 160, mass: 1.0 },
            solutionExplanation: "Dengan k = 160 N/m dan m = 1 kg, frekuensi sudut ω = √160 ≈ 12.65 rad/s, menghasilkan f ≈ 2.01 Hz.",
            xpReward: 60,
          },
        },
        {
          id: "ghs2-step-4",
          type: "validation",
          title: "Refleksi Osilator Pegas",
          validation: {
            title: "Hukum Hooke Dikuasai",
            summaryText: "Massa yang lebih berat memperlambat osilasi, sedangkan pegas yang lebih kaku mempercepat getaran.",
            keyTakeaway: "Berbeda dengan bandul, gravitasi tidak memengaruhi frekuensi osilator pegas horizontal maupun vertikal.",
            formulaKaTeX: "T = 2\\pi\\sqrt{\\frac{m}{k}}",
            badgeToUnlock: "spring-master",
          },
        },
      ],
    },
    {
      id: "ghs-level-3",
      index: 3,
      tier: 3,
      title: "Energi & Jejak Gelombang Harmonik",
      description: "Menganalisis konservasi energi mekanik E = 0.5kA² dan pembentukan grafik sinusoidal.",
      steps: [
        {
          id: "ghs3-step-1",
          type: "explanation",
          title: "Osilasi sebagai Proyeksi Gelombang",
          explanation: {
            title: "Hubungan Antara Getaran dan Gelombang",
            conceptText:
              "Jika selembar kertas digulirkan secara konstan di bawah ujung pena bandul yang berosilasi, tercipta grafik fungsi kosinus sempurna x(t) = A cos(ωt).",
            analogyText:
              "Di titik simpangan maksimum (amplitudo ±A), seluruh energi berupa potensial pegas EP = 0.5kA² dan kelajuan nol. Di titik setimbang x = 0, seluruh energi berubah menjadi kinetik maksimum EK = 0.5mv_max².",
            keyFormulas: [
              "E_{\\text{total}} = \\frac{1}{2}kA^2 = \\frac{1}{2}mv_{\\text{maks}}^2",
              "x(t) = A \\cos(\\omega t), \\quad v(t) = -A\\omega \\sin(\\omega t)",
            ],
            audioNarrationText:
              "Energi total getaran harmonik sebanding dengan kuadrat amplitudo simpangannya.",
          },
        },
        {
          id: "ghs3-step-2",
          type: "playground",
          title: "Eksplorasi Jejak Gelombang",
          playground: {
            title: "Simulasi Seismograf Sinusoidal",
            instructions: "Perhatikan garis jejak gelombang di panel kanan yang bergerak sinkron dengan posisi beban di panel kiri.",
            interactiveComponentSlug: "physics-harmonic-oscillator",
            initialVariables: { springConstant: 80, mass: 1.5, amplitude: 0.4 },
          },
        },
        {
          id: "ghs3-step-3",
          type: "challenge",
          title: "Misi: Target Energi Mekanik 5.0 Joule",
          challenge: {
            id: "challenge-ghs-3",
            title: "Energi Total E = 5.0 J",
            question: "Rancang osilator pegas agar total energi mekanik osilasi tepat E = 5.0 Joule (±0.2 J).",
            targetCondition: (vars: Record<string, number>) => {
              const s = calculateSpring({
                springConstant: vars.springConstant ?? 50,
                mass: vars.mass ?? 1.0,
                amplitude: vars.amplitude ?? 0.3,
              });
              return Math.abs(s.totalEnergy - 5.0) <= 0.2;
            },
            hint1Static: "Gunakan rumus energi total E = 0.5 · k · A².",
            hint2Static: "Pilih k = 100 N/m dan cari amplitudo A = √(10/100) ≈ 0.32 m, atau k = 40 N/m dan A = 0.5 m.",
            solutionVariables: { springConstant: 40, amplitude: 0.5 },
            solutionExplanation: "Pada k = 40 N/m dan A = 0.5 m, E = 0.5 × 40 × 0.25 = 5.0 Joule.",
            xpReward: 100,
          },
        },
        {
          id: "ghs3-step-4",
          type: "validation",
          title: "Master Osilasi Harmonik",
          validation: {
            title: "Sertifikasi Dinamika Osilasi",
            summaryText: "Kamu berhasil menguasai bandul Galilei, pegas Hooke, frekuensi sudut, dan konservasi energi getaran.",
            keyTakeaway: "Getaran harmonik sederhana adalah jembatan konseptual penting menuju mekanika gelombang dan fisika kuantum.",
            formulaKaTeX: "E = \\frac{1}{2}kA^2 = \\frac{1}{2}m\\omega^2 A^2",
            badgeToUnlock: "harmonic-master",
          },
        },
      ],
    },
  ],
};
