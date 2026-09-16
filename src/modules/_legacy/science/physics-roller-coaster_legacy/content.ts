import { TopicLesson } from "@/types/topic";
import { calculateRollerCoaster } from "./engine";

export const rollerCoasterLesson: TopicLesson = {
  id: "physics-roller-coaster",
  slug: "physics-roller-coaster",
  title: "Roller Coaster & Konservasi Energi",
  category: "science",
  summary:
    "Memahami pertukaran dinamis antara energi potensial gravitasi dan energi kinetik, serta syarat kecepatan kritis untuk menembus loop vertikal.",
  audioNarrationText:
    "Di atas roller coaster, total energi mekanik selalu kekal. Saat meluncur turun dari puncak bukit, energi potensial gravitasi berubah menjadi energi kinetik yang menghasilkan kecepatan tinggi untuk menembus loop lingkaran vertikal.",
  initialVariables: {
    initialHeight: 28,
    loopRadius: 10,
    mass: 500,
    gravity: 9.8,
    initialVelocity: 0,
  },
  challenges: [
    {
      id: "challenge-coaster-1",
      title: "Ambang Batas Puncak Loop (h = 2.5R)",
      question:
        "Tantangan 1: Atur ketinggian awal bukit h₀ tepat pada batas minimum teoretis (h₀ = 2.5 × R) untuk loop berjari-jari R = 10 m agar kereta tepat dapat menembus loop vertikal.",
      targetCondition: (vars: Record<string, number>) => {
        const h0 = vars.initialHeight ?? 28;
        const R = vars.loopRadius ?? 10;
        return Math.abs(h0 - 2.5 * R) <= 0.8 && Math.abs(R - 10) <= 0.5;
      },
      hintText:
        "Untuk loop vertikal berjari-jari R = 10 m, ketinggian minimum tanpa kecepatan awal adalah h₀ = 2.5 × 10 = 25 meter.",
      successMessage:
        "Sempurna! Pada h₀ = 2.5R, kelajuan di puncak loop tepat memenuhi v = √(gR) sehingga gaya normal N = 0 tepat sebelum jatuh.",
      xpReward: 30,
    },
    {
      id: "challenge-coaster-2",
      title: "Target Kecepatan Lembah 20 m/s",
      question:
        "Tantangan 2: Rancang ketinggian bukit awal h₀ agar kelajuan kereta di dasar lembah (titik terendah h = 0) tepat mencapai 20 m/s (toleransi ±0.5 m/s).",
      targetCondition: (vars: Record<string, number>) => {
        const metrics = calculateRollerCoaster({
          initialHeight: vars.initialHeight ?? 28,
          loopRadius: vars.loopRadius ?? 10,
          mass: vars.mass ?? 500,
          gravity: vars.gravity ?? 9.8,
        });
        return Math.abs(metrics.speedAtBottom - 20) <= 0.5;
      },
      hintText:
        "Dari rumus kekekalan energi mgh = 0.5 mv², maka h = v² / (2g) = 20² / (2 × 9.8) = 400 / 19.6 ≈ 20.4 meter.",
      successMessage:
        "Luar biasa! Pada ketinggian ~20.4 meter, seluruh energi potensial berubah menjadi energi kinetik dengan kelajuan 20 m/s.",
      xpReward: 60,
    },
    {
      id: "challenge-coaster-3",
      title: "Loop Ekstrem Berkecepatan Tinggi",
      question:
        "Tantangan 3: Atur jari-jari loop R = 12 m dan naikkan bukit awal h₀ agar kereta menembus puncak loop dengan aman dan gaya normal di puncak N ≥ 1000 N.",
      targetCondition: (vars: Record<string, number>) => {
        const R = vars.loopRadius ?? 10;
        const metrics = calculateRollerCoaster({
          initialHeight: vars.initialHeight ?? 28,
          loopRadius: R,
          mass: vars.mass ?? 500,
          gravity: vars.gravity ?? 9.8,
        });
        return Math.abs(R - 12) <= 0.5 && metrics.canCompleteLoop && metrics.normalForceAtLoopTop >= 1000;
      },
      hintText:
        "Ketinggian minimum 2.5R = 30 m hanya menghasilkan N = 0. Naikkan ketinggian bukit h₀ ke atas 33 meter agar gaya sentripetal cukup besar.",
      successMessage:
        "DAHSYAT! Kereta meluncur mantap menembus puncak loop 12 meter dengan tekanan roda yang aman dan kokoh!",
      xpReward: 100,
    },
  ],
};
