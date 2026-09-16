import { TopicLesson } from "@/types/topic";
import { calculateDCCircuit } from "./engine";

export const dcCircuitLesson: TopicLesson = {
  id: "physics-dc-circuits",
  slug: "physics-dc-circuits",
  title: "Pembangun Rangkaian Listrik DC",
  category: "science",
  summary:
    "Eksplorasi interaktif Hukum Ohm V = IR, konfigurasi hambatan seri & paralel, tegangan jepit, pembagian arus Kirchhoff, dan disipasi daya Joule.",
  audioNarrationText:
    "Selamat datang di simulator Rangkaian Listrik DC. Kamu dapat mengubah tegangan baterai, menyusun resistor secara seri, paralel, maupun campuran, serta mengamati aliran elektron secara langsung.",
  initialVariables: {
    voltage: 12,
    r1: 4,
    r2: 8,
    r3: 6,
    isSwitchClosed: 1, // 1 for true
  },
  challenges: [
    {
      id: "challenge-circuit-1",
      title: "Arus Seri Terkalibrasi (I = 1.0 A)",
      question:
        "Tantangan 1: Pada topologi Seri, atur tegangan V dan hambatan R1 serta R2 agar arus total yang mengalir tepat 1.0 A (±0.05 A).",
      targetCondition: (vars: Record<string, number>) => {
        const v = vars.voltage ?? 12;
        const r1 = vars.r1 ?? 4;
        const r2 = vars.r2 ?? 8;
        const res = calculateDCCircuit({
          voltage: v,
          r1,
          r2,
          topology: "series",
          isSwitchClosed: true,
        });
        return Math.abs(res.totalCurrent - 1.0) <= 0.05;
      },
      hintText:
        "Pada rangkaian seri, R_eq = R1 + R2. Gunakan Hukum Ohm I = V / R_eq. Misalnya V = 12 V dan R1 + R2 = 12 Ω.",
      successMessage: "Tepat sekali! Hambatan total seimbang dengan tegangan menghasilkan arus 1 Ampere.",
      xpReward: 35,
    },
    {
      id: "challenge-circuit-2",
      title: "Arus Paralel Kuat (I_total = 4.0 A)",
      question:
        "Tantangan 2: Pada topologi Paralel dengan tegangan V = 12 V, atur hambatan R1 dan R2 agar arus total sirkuit tepat bernilai 4.0 A (±0.1 A).",
      targetCondition: (vars: Record<string, number>) => {
        const v = vars.voltage ?? 12;
        const r1 = vars.r1 ?? 4;
        const r2 = vars.r2 ?? 8;
        if (Math.abs(v - 12) > 0.5) return false;
        const res = calculateDCCircuit({
          voltage: v,
          r1,
          r2,
          topology: "parallel",
          isSwitchClosed: true,
        });
        return Math.abs(res.totalCurrent - 4.0) <= 0.1;
      },
      hintText:
        "I_total = I1 + I2 = V/R1 + V/R2. Jika V = 12 V, coba R1 = 6 Ω (I1 = 2 A) dan R2 = 6 Ω (I2 = 2 A), atau R1 = 4 Ω (3 A) dan R2 = 12 Ω (1 A).",
      successMessage: "Luar biasa! Percabangan arus paralel menghasilkan arus total 4 Ampere.",
      xpReward: 45,
    },
    {
      id: "challenge-circuit-3",
      title: "Keseimbangan Daya Campuran (P_total = 36 W)",
      question:
        "Tantangan 3: Pada topologi Campuran (R1 seri dengan R2 // R3) dengan V = 12 V, atur resistor agar disipasi daya total sirkuit tepat 36 Watt (±1 W).",
      targetCondition: (vars: Record<string, number>) => {
        const v = vars.voltage ?? 12;
        const r1 = vars.r1 ?? 2;
        const r2 = vars.r2 ?? 6;
        const r3 = vars.r3 ?? 3;
        if (Math.abs(v - 12) > 0.5) return false;
        const res = calculateDCCircuit({
          voltage: v,
          r1,
          r2,
          r3,
          topology: "mixed",
          isSwitchClosed: true,
        });
        return Math.abs(res.totalPower - 36) <= 1.0;
      },
      hintText:
        "P = V * I. Jika V = 12 V dan target P = 36 W, maka I_total harus 3.0 A, sehingga R_eq = 4.0 Ω. Coba R1 = 2 Ω, R2 = 6 Ω, R3 = 3 Ω (karena 6 // 3 = 2 Ω).",
      successMessage: "Sempurna! Kamu telah menguasai analisis daya dan hambatan rangkaian campuran.",
      xpReward: 50,
    },
  ],
};
