import { TopicLesson } from "@/types/topic";

export const kinematicsLesson: TopicLesson = {
  id: "science-kinematics",
  slug: "science-kinematics",
  title: "Kinematika",
  category: "science",
  summary:
    "Flagship MVP: Karakteristik gerak lurus konstan (GLB), berubah beraturan (GLBB), jatuh bebas, dan gerak parabola 2D dengan sinkronisasi visual posisi, kecepatan, dan percepatan.",
  audioNarrationText:
    "Selamat datang di modul Flagship Kinematika. Amati bagaimana gaya gravitasi dan kecepatan awal berpadu melukiskan lengkung kurva parabola yang sempurna.",
  initialVariables: {
    x0: 0,
    y0: 0,
    v0: 20,
    angleDeg: 45,
    g: 9.8,
    a: 2,
    t: 0,
  },
  challenges: [
    {
      id: "ch-kin-1",
      title: "Kecepatan Akhir Mobil",
      question: "Sebuah mobil bergerak dari keadaan diam dengan percepatan a = 2 m/s². Berapa kecepatannya setelah 5 detik?",
      targetCondition: (vars: Record<string, number>) => vars.a * 5 === 10,
      hintText: "Gunakan hubungan v = v₀ + at = 0 + 2(5) = 10 m/s.",
      successMessage: "Tepat! Kecepatan mobil mencapai 10 m/s setelah 5 detik.",
      xpReward: 35,
    },
    {
      id: "ch-kin-2",
      title: "Jarak Tempuh GLBB",
      question: "Berapa jarak total yang ditempuh mobil tersebut dalam 5 detik?",
      targetCondition: (vars: Record<string, number>) => 0.5 * vars.a * 25 === 25,
      hintText: "s = v₀t + 0.5at² = 0 + 0.5(2)(25) = 25 meter.",
      successMessage: "Benar sekali! Mobil telah menempuh jarak 25 meter.",
      xpReward: 40,
    },
    {
      id: "ch-kin-3",
      title: "Jangkauan Parabola Maksimum",
      question: "Atur sudut peluncuran meriam agar proyektil mencapai jarak jangkauan terjauh di tanah datar.",
      targetCondition: (vars: Record<string, number>) => vars.angleDeg === 45,
      hintText: "Jarak jangkauan maksimum untuk proyektil di permukaan datar tercapai pada sudut 45 derajat (sin(2θ) = sin(90°) = 1).",
      successMessage: "Sempurna! Sudut 45 derajat menghasilkan jarak jangkauan proyektil maksimal.",
      xpReward: 50,
    },
  ],
};
