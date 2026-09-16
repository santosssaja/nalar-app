import { TopicLesson } from "@/types/topic";
import { calculateInclineForces } from "./engine";

export const inclineLesson: TopicLesson = {
  id: "physics-newton-incline",
  slug: "physics-newton-incline",
  title: "Bidang Miring & Hukum Newton",
  category: "science",
  summary:
    "Memahami dekomposisi gaya berat menjadi komponen sejajar dan tegak lurus bidang miring, gaya normal, serta gaya gesek penentu percepatan luncur balok.",
  audioNarrationText:
    "Pada bidang miring, gaya berat bumi dipecah menjadi dua komponen tegak lurus: komponen yang menekan bidang menghasilkan gaya normal, dan komponen sejajar bidang yang menarik benda meluncur ke bawah melawan gaya gesek.",
  initialVariables: {
    angleDeg: 30,
    mass: 5,
    frictionCoeff: 0.2,
    gravity: 9.8,
    inclineLength: 10,
  },
  challenges: [
    {
      id: "challenge-incline-1",
      title: "Keseimbangan Statis (Tidak Meluncur)",
      question:
        "Tantangan 1: Atur kemiringan bidang minimal 15° namun atur koefisien gesek agar balok tetap diam seimbang (tidak meluncur).",
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
      hintText:
        "Benda tetap diam jika tan(θ) ≤ μ. Untuk sudut 20°, tan(20°) ≈ 0.36, sehingga dibutuhkan koefisien gesek μ ≥ 0.37.",
      successMessage:
        "Hebat! Gaya gesek statis maksimum berhasil menahan tarikan komponen berat sejajar bidang miring.",
      xpReward: 30,
    },
    {
      id: "challenge-incline-2",
      title: "Permukaan Licin Sempurna (μ = 0)",
      question:
        "Tantangan 2: Atur koefisien gesek μ = 0 dan sudut θ = 30° agar percepatan luncur benda tepat a = 0.5 × g ≈ 4.90 m/s².",
      targetCondition: (vars: Record<string, number>) => {
        const forces = calculateInclineForces({
          mass: vars.mass ?? 5,
          angleDeg: vars.angleDeg ?? 30,
          frictionCoeff: vars.frictionCoeff ?? 0.2,
          gravity: vars.gravity ?? 9.8,
          inclineLength: 10,
        });
        return (vars.frictionCoeff ?? 0.2) <= 0.02 && Math.abs((vars.angleDeg ?? 30) - 30) <= 1;
      },
      hintText:
        "Tanpa gesekan (μ = 0), percepatan hanya bergantung pada sudut kemiringan: a = g · sin(θ). Sin(30°) = 0.5.",
      successMessage:
        "Tepat sekali! Pada bidang licin ideal, massa benda sama sekali tidak mempengaruhi percepatan luncur.",
      xpReward: 60,
    },
    {
      id: "challenge-incline-3",
      title: "Misi: Kelajuan Akhir 10 m/s",
      question:
        "Tantangan 3: Atur sudut kemiringan dan gesekan agar balok mencapai kelajuan akhir tepat 10 m/s (toleransi ±0.5 m/s) di ujung bidang 10 meter.",
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
      hintText:
        "Dari rumus v² = 2·a·L, untuk mencapai v = 10 m/s pada L = 10 m, dibutuhkan percepatan a = v² / (2L) = 100 / 20 = 5 m/s².",
      successMessage:
        "SEMPURNA! Balok meluncur kencang dan menyentuh dasar bidang dengan kelajuan tepat 10 m/s!",
      xpReward: 100,
    },
  ],
};
