import { TopicLesson } from "@/types/topic";

export const siUnitsLesson: TopicLesson = {
  id: "science-si-units",
  slug: "science-si-units",
  title: "Besaran, Satuan SI & Analisis Dimensi",
  category: "science",
  summary:
    "Bahasa formal pengukuran ilmiah: besaran pokok dan turunan, konversi satuan standar SI, notasi ilmiah, dan pengujian rumus lewat analisis dimensi.",
  audioNarrationText:
    "Selamat datang di modul Besaran dan Satuan SI. Sebelum mempelajari gerak dan gaya, kita harus memastikan satuan pengukuran kita konsisten dan tidak ambigu.",
  initialVariables: {
    lengthMeters: 1500,
    timeSeconds: 60,
    targetUnitCode: 1, // 1: km, 2: cm
  },
  challenges: [
    {
      id: "ch-si-1",
      title: "Konversi ke Kilometer",
      question: "Konversikan panjang 1500 meter ke dalam satuan kilometer.",
      targetCondition: (vars: Record<string, number>) => vars.lengthMeters / 1000 === 1.5,
      hintText: "1 kilometer = 1000 meter. Bagi nilai meter dengan 1000: 1500 / 1000 = 1.5 km.",
      successMessage: "1500 m = 1.5 km tercapai!",
      xpReward: 30,
    },
    {
      id: "ch-si-2",
      title: "Dimensi Kecepatan",
      question: "Tentukan dimensi dari besaran kecepatan v = jarak / waktu.",
      targetCondition: (vars: Record<string, number>) => vars.targetUnitCode === 1,
      hintText: "Jarak berdimensi [L], waktu berdimensi [T]. Maka kecepatan berdimensi [L][T]⁻¹.",
      successMessage: "Dimensi kecepatan [L][T]⁻¹ terkonfirmasi!",
      xpReward: 30,
    },
    {
      id: "ch-si-3",
      title: "Kelajuan Rata-rata",
      question: "Hitung kelajuan mobil yang menempuh 1500 meter dalam 60 detik dalam satuan m/s.",
      targetCondition: (vars: Record<string, number>) => 1500 / 60 === 25,
      hintText: "v = s / t = 1500 m / 60 s = 25 m/s.",
      successMessage: "Kelajuan 25 m/s berhasil dihitung!",
      xpReward: 40,
    },
  ],
};
