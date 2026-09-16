import { TopicLesson } from "@/types/topic";
import { calculateWave, calculateInterference } from "./engine";

export const waveLesson: TopicLesson = {
  id: "physics-wave-simulator",
  slug: "physics-wave-simulator",
  title: "Simulator Gelombang Mekanik & Interferensi",
  category: "science",
  summary:
    "Memahami perambatan gelombang transversal dan longitudinal, hubungan cepat rambat v = λf, serta fenomena superposisi dan interferensi konstruktif-destruktif.",
  audioNarrationText:
    "Gelombang adalah perambatan usikan atau energi tanpa memindahkan mediumnya secara permanen. Pertemuan dua gelombang menghasilkan interferensi, di mana gelombang dapat saling melipatgandakan atau justru saling memadamkan.",
  initialVariables: {
    amplitude: 0.5,
    frequency: 2.0,
    wavelength: 4.0,
    phaseDeg: 0,
    wave2Amplitude: 0.5,
    wave2PhaseDeg: 0,
  },
  challenges: [
    {
      id: "challenge-wave-1",
      title: "Kalibrasi Cepat Rambat (v = 10 m/s)",
      question:
        "Tantangan 1: Atur frekuensi f dan panjang gelombang λ agar kecepatan rambat gelombang tepat v = 10 m/s (toleransi ±0.2 m/s).",
      targetCondition: (vars: Record<string, number>) => {
        const w = calculateWave({
          amplitude: vars.amplitude ?? 0.5,
          frequency: vars.frequency ?? 2.0,
          wavelength: vars.wavelength ?? 4.0,
        });
        return Math.abs(w.waveSpeed - 10) <= 0.2;
      },
      hintText:
        "Gunakan rumus cepat rambat v = λ × f. Contoh: jika f = 2.5 Hz, atur panjang gelombang λ = 4.0 m (2.5 × 4.0 = 10 m/s), atau f = 2.0 Hz dan λ = 5.0 m.",
      successMessage:
        "Hebat! Gelombang merambat dengan kecepatan konstan tepat 10 meter per detik.",
      xpReward: 30,
    },
    {
      id: "challenge-wave-2",
      title: "Peredam Kebisingan Aktif (Destruktif 180°)",
      question:
        "Tantangan 2: Pada mode interferensi, atur beda fase gelombang kedua tepat 180° dari gelombang pertama (fase 180° vs 0°) agar kedua gelombang saling meniadakan menjadi garis datar.",
      targetCondition: (vars: Record<string, number>) => {
        const res = calculateInterference({
          wave1: { amplitude: vars.amplitude ?? 0.5, frequency: vars.frequency ?? 2, wavelength: vars.wavelength ?? 4, phaseDeg: vars.phaseDeg ?? 0 },
          wave2: { amplitude: vars.wave2Amplitude ?? 0.5, frequency: vars.frequency ?? 2, wavelength: vars.wavelength ?? 4, phaseDeg: vars.wave2PhaseDeg ?? 180 },
        });
        return res.isDestructive;
      },
      hintText:
        "Interferensi destruktif sempurna terjadi ketika puncak gelombang pertama bertemu tepat dengan lembah gelombang kedua, yaitu saat beda fase Δφ = 180°.",
      successMessage:
        "LUAR BIASA! Ini adalah prinsip kerja teknologi headphone Active Noise Cancelling (ANC).",
      xpReward: 60,
    },
    {
      id: "challenge-wave-3",
      title: "Superposisi Puncak Maksimum (Konstruktif 0°)",
      question:
        "Tantangan 3: Atur kedua gelombang sefase (beda fase 0°) dengan masing-masing amplitudo 0.5 m agar puncak gelombang resultan berlipat ganda tepat menjadi 1.0 m.",
      targetCondition: (vars: Record<string, number>) => {
        const a1 = vars.amplitude ?? 0.5;
        const a2 = vars.wave2Amplitude ?? 0.5;
        const res = calculateInterference({
          wave1: { amplitude: a1, frequency: vars.frequency ?? 2, wavelength: vars.wavelength ?? 4, phaseDeg: vars.phaseDeg ?? 0 },
          wave2: { amplitude: a2, frequency: vars.frequency ?? 2, wavelength: vars.wavelength ?? 4, phaseDeg: vars.wave2PhaseDeg ?? 0 },
        });
        return res.isConstructive && Math.abs(a1 + a2 - 1.0) <= 0.05;
      },
      hintText:
        "Setel fase gelombang 1 dan gelombang 2 sama-sama 0° dengan A₁ = 0.5 m dan A₂ = 0.5 m.",
      successMessage:
        "SEMPURNA! Dua gelombang yang sefase saling memperkuat menghasilkan amplitudo puncak ganda.",
      xpReward: 100,
    },
  ],
};
