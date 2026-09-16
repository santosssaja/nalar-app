import { TopicLesson } from "@/types/topic";
import { computeProjectileMetrics } from "./engine";

export const projectileLesson: TopicLesson = {
  id: "physics-projectile-motion",
  slug: "physics-projectile-motion",
  title: "Kanon Proyektil & Gerak Parabola",
  category: "science",
  summary:
    "Memahami gerak dua dimensi sebagai perpaduan gerak lurus beraturan horizontal dan gerak lurus berubah beraturan vertikal di bawah pengaruh gravitasi.",
  audioNarrationText:
    "Gerak parabola adalah perpaduan dua gerak independen: gerak horizontal dengan kecepatan tetap tanpa hambatan, dan gerak vertikal yang terus diperlambat lalu dipercepat oleh tarikan gravitasi bumi.",
  initialVariables: {
    angleDegrees: 45,
    v0: 20,
    g: 9.8,
    h0: 0,
  },
  challenges: [
    {
      id: "challenge-projectile-1",
      title: "Jangkauan Tembak Maksimum",
      question:
        "Tantangan 1: Atur sudut elevasi kanon agar peluru mencapai jarak jangkauan horizontal terjauh pada permukaan tanah datar.",
      targetCondition: (vars: Record<string, number>) => {
        return Math.abs(vars.angleDegrees - 45) <= 1.5;
      },
      hintText:
        "Jangkauan horizontal dirumuskan oleh R = (v₀² sin 2θ) / g. Nilai sin(2θ) mencapai maksimum 1 ketika 2θ = 90°, yaitu pada sudut 45°.",
      successMessage: "Tepat sekali! Sudut 45° membagi kecepatan secara optimal antara daya angkat vertikal dan jelajah horizontal.",
      xpReward: 30,
    },
    {
      id: "challenge-projectile-2",
      title: "Misteri Sudut Komplementer",
      question:
        "Tantangan 2: Jika sudut tembak pertama adalah 30°, ubah sudut kanon ke sudut komplementernya yang menghasilkan jangkauan tembakan yang sama persis.",
      targetCondition: (vars: Record<string, number>) => {
        return Math.abs(vars.angleDegrees - 60) <= 1.5;
      },
      hintText:
        "Dua sudut komplementer yang berjumlah 90° (seperti 30° dan 90° - 30° = 60°) selalu memiliki sin(2θ) yang bernilai sama.",
      successMessage: "Hebat! Sudut 60° terbang lebih tinggi namun mendarat di titik horizontal yang sama dengan sudut 30°.",
      xpReward: 60,
    },
    {
      id: "challenge-projectile-3",
      title: "Misi: Tembak Tepat di Target 50 Meter",
      question:
        "Tantangan 3: Atur kombinasi sudut dan kecepatan awal v₀ agar peluru mendarat tepat pada target di jarak 50 meter (toleransi ±1.5 m).",
      targetCondition: (vars: Record<string, number>) => {
        const metrics = computeProjectileMetrics({
          angleDegrees: vars.angleDegrees,
          v0: vars.v0,
          g: vars.g || 9.8,
          h0: vars.h0 || 0,
        });
        return Math.abs(metrics.range - 50) <= 1.5;
      },
      hintText:
        "Pada sudut 45°, rumus jangkauan adalah R = v₀² / g. Jika target berjarak 50 m dan g = 9.8, maka v₀ ≈ √(50 × 9.8) ≈ 22.1 m/s.",
      successMessage: "BULLSEYE! Peluru mendarat tepat sasaran di target 50 meter!",
      xpReward: 100,
    },
  ],
};
