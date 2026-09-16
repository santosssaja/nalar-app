import { TopicLesson } from "@/types/topic";
import { calculatePendulum, calculateSpring } from "./engine";

export const harmonicLesson: TopicLesson = {
  id: "physics-harmonic-oscillator",
  slug: "physics-harmonic-oscillator",
  title: "Getaran Harmonik Sederhana (Bandul & Pegas)",
  category: "science",
  summary:
    "Memahami fenomena osilasi periodik pada bandul sederhana dan sistem pegas massa, serta kaitannya dengan gelombang sinusoidal dan konservasi energi.",
  audioNarrationText:
    "Getaran harmonik sederhana adalah gerak bolak-balik di sekitar titik kesetimbangan yang dipicu oleh gaya pemulih linier. Ayunan bandul dan getaran pegas menghasilkan kurva sinusoidal yang sempurna.",
  initialVariables: {
    length: 1.0,
    initialAngleDeg: 15,
    gravity: 9.8,
    springConstant: 50,
    mass: 1.0,
    amplitude: 0.3,
  },
  challenges: [
    {
      id: "challenge-ghs-1",
      title: "Kalibrasi Bandul Detik (T = 2.0 s)",
      question:
        "Tantangan 1: Pada mode bandul, atur panjang tali L agar periode satu ayunan penuh tepat T = 2.0 detik (toleransi ±0.05 s) pada gravitasi bumi g = 9.8 m/s².",
      targetCondition: (vars: Record<string, number>) => {
        const p = calculatePendulum({
          length: vars.length ?? 1.0,
          initialAngleDeg: vars.initialAngleDeg ?? 15,
          gravity: vars.gravity ?? 9.8,
        });
        return Math.abs(p.period - 2.0) <= 0.05;
      },
      hintText:
        "Dari rumus T = 2π√(L/g), panjang tali yang dibutuhkan adalah L = g · T² / (4π²) = 9.8 × 4 / (4π²) ≈ 0.99 meter.",
      successMessage:
        "Hebat! Panjang tali ~0.99 meter adalah standar jam bandul klasik (Seconds Pendulum).",
      xpReward: 30,
    },
    {
      id: "challenge-ghs-2",
      title: "Resonansi Frekuensi Pegas (f = 2.0 Hz)",
      question:
        "Tantangan 2: Pada mode pegas, cari kombinasi konstanta pegas k dan massa m agar frekuensi osilasi tepat f = 2.0 Hz (periode T = 0.5 s).",
      targetCondition: (vars: Record<string, number>) => {
        const s = calculateSpring({
          springConstant: vars.springConstant ?? 50,
          mass: vars.mass ?? 1.0,
          amplitude: vars.amplitude ?? 0.3,
        });
        return Math.abs(s.frequency - 2.0) <= 0.1;
      },
      hintText:
        "Frekuensi adalah f = (1 / 2π) √(k / m). Jika m = 1 kg, k harus diatur ke k = (2πf)² · m ≈ (4π)² ≈ 158 N/m.",
      successMessage:
        "Tepat sekali! Frekuensi 2 Hz berarti pegas bergetar 2 siklus penuh setiap detiknya.",
      xpReward: 60,
    },
    {
      id: "challenge-ghs-3",
      title: "Target Energi Mekanik Pegas E = 5.0 J",
      question:
        "Tantangan 3: Rancang osilator pegas agar energi mekanik totalnya tepat E = 5.0 Joule (toleransi ±0.2 J).",
      targetCondition: (vars: Record<string, number>) => {
        const s = calculateSpring({
          springConstant: vars.springConstant ?? 50,
          mass: vars.mass ?? 1.0,
          amplitude: vars.amplitude ?? 0.3,
        });
        return Math.abs(s.totalEnergy - 5.0) <= 0.2;
      },
      hintText:
        "Energi total pegas adalah E = 0.5 · k · A². Misalnya jika k = 100 N/m, maka dibutuhkan amplitudo A = √(2E / k) = √(10 / 100) ≈ 0.32 meter.",
      successMessage:
        "LUAR BIASA! Energi mekanik total 5 Joule berosilasi mulus antara energi potensial pegas dan energi kinetik massa.",
      xpReward: 100,
    },
  ],
};
