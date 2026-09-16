import { TopicLesson } from "@/types/topic";
import { calculateCoulombForce, calculateElectricFieldAtPoint } from "./engine";

export const electricFieldLesson: TopicLesson = {
  id: "physics-electric-field",
  slug: "physics-electric-field",
  title: "Medan & Gaya Elektrostatik",
  category: "science",
  summary:
    "Eksplorasi interaksi muatan titik, Hukum Coulomb, formasi garis medan listrik, potensial elektrostatik, dan gaya pada muatan uji.",
  audioNarrationText:
    "Selamat datang di laboratorium Medan Listrik. Di sini kamu dapat menata muatan positif dan negatif, mengamati vektor kuat medan, serta mengukur gaya elektrostatik secara real-time.",
  initialVariables: {
    q1: 3,
    q2: -3,
    distance: 2.0,
    testCharge: 1,
    testPosX: 0,
    testPosY: 0.5,
  },
  challenges: [
    {
      id: "challenge-efield-1",
      title: "Gaya Coulomb Presisi",
      question:
        "Tantangan 1: Atur muatan q1 dan q2 serta jarak pemisah agar Gaya Coulomb antara kedua muatan tepat bernilai 0.054 N (±0.005 N).",
      targetCondition: (vars: Record<string, number>) => {
        const q1 = vars.q1 ?? 3;
        const q2 = vars.q2 ?? -3;
        const dist = vars.distance ?? 2;
        const f = calculateCoulombForce(q1, q2, dist);
        return Math.abs(f.forceN - 0.054) <= 0.005;
      },
      hintText:
        "F = k * |q1 * q2| / r^2. Coba setel q1 = +3 µC, q2 = -3 µC, dan r = 1.22 m, atau q1 = 2, q2 = 3, r = 1.0 m.",
      successMessage: "Bagus sekali! Gaya elektrostatik tepat terkalibrasi ke 0.054 N.",
      xpReward: 35,
    },
    {
      id: "challenge-efield-2",
      title: "Titik Keseimbangan Medan Nol",
      question:
        "Tantangan 2: Ciptakan konfigurasi dua muatan sejenis identik q1 = q2 = +4 µC lalu letakkan muatan uji tepat di titik nol medan listrik (E_net < 100 N/C).",
      targetCondition: (vars: Record<string, number>) => {
        const q1 = vars.q1 ?? 0;
        const q2 = vars.q2 ?? 0;
        const testX = vars.testPosX ?? 1;
        const testY = vars.testPosY ?? 1;
        if (Math.abs(q1 - 4) > 0.5 || Math.abs(q2 - 4) > 0.5) return false;
        const dist = vars.distance ?? 2;
        const charges = [
          { id: "q1", q: q1, x: -dist / 2, y: 0 },
          { id: "q2", q: q2, x: dist / 2, y: 0 },
        ];
        const field = calculateElectricFieldAtPoint(charges, { x: testX, y: testY });
        return field.magnitude < 100;
      },
      hintText:
        "Pada dua muatan identik berjarak sama dari titik asal, titik simetri x = 0 dan y = 0 memiliki resultan medan nol karena vektor saling meniadakan.",
      successMessage: "Hebat! Kamu menemukan titik netral di mana medan listrik saling meniadakan.",
      xpReward: 45,
    },
    {
      id: "challenge-efield-3",
      title: "Medan Horisontal Dipol",
      question:
        "Tantangan 3: Bentuk dipol listrik (q1 = +5 µC, q2 = -5 µC, r = 2.0 m) dan letakkan muatan uji pada posisi yang mengalami gaya ke arah sumbu +X.",
      targetCondition: (vars: Record<string, number>) => {
        const q1 = vars.q1 ?? 0;
        const q2 = vars.q2 ?? 0;
        const testX = vars.testPosX ?? 0;
        const testY = vars.testPosY ?? 0;
        const isDipole = Math.abs(q1 - 5) <= 0.5 && Math.abs(q2 - (-5)) <= 0.5;
        if (!isDipole) return false;
        const dist = vars.distance ?? 2;
        const charges = [
          { id: "q1", q: q1, x: -dist / 2, y: 0 },
          { id: "q2", q: q2, x: dist / 2, y: 0 },
        ];
        const field = calculateElectricFieldAtPoint(charges, { x: testX, y: testY });
        return field.ex > 5000 && Math.abs(field.ey) < 1000;
      },
      hintText:
        "Di antara dua muatan dipol sepanjang sumbu X, garis medan mengalir dari muatan positif (+X) menuju muatan negatif.",
      successMessage: "Luar biasa! Vektor medan dipol mengarahkan gaya dorong positif secara horizontal.",
      xpReward: 50,
    },
  ],
};
