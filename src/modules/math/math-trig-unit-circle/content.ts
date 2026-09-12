import { TopicLesson } from "@/types/topic";
import { computeUnitCircle } from "./engine";

export const trigLesson: TopicLesson = {
  id: "math-trig-unit-circle",
  slug: "math-trig-unit-circle",
  title: "Lingkaran Satuan Trigonometri",
  category: "math",
  summary:
    "Memahami fungsi trigonometri (sinus, kosinus, dan tangen) sebagai proyeksi koordinat spasial titik pada lingkaran berjari-jari satu.",
  audioNarrationText:
    "Bayangkan sebuah titik berjalan di keliling lingkaran berjari-jari satu. Nilai kosinus adalah proyeksi horizontal titik tersebut pada sumbu-x, sinus adalah proyeksi vertikalnya pada sumbu-y, dan tangen adalah panjang garis singgung ke sumbu horizontal.",
  initialVariables: {
    angleDegrees: 45,
  },
  challenges: [
    {
      id: "challenge-trig-1",
      title: "Titik Keseimbangan (sin = cos)",
      question:
        "Tantangan 1: Posisikan sudut θ sehingga nilai sinus tepat sama dengan nilai kosinus (sin θ = cos θ) di kuadran pertama.",
      targetCondition: (vars: Record<string, number>) => {
        const d = ((vars.angleDegrees % 360) + 360) % 360;
        return Math.abs(d - 45) <= 1.5;
      },
      hintText:
        "Di kuadran 1, sinus dan kosinus bernilai sama ketika garis miring membagi sudut siku-siku 90° tepat di tengah, yaitu pada 45°.",
      successMessage: "Hebat! Pada 45°, panjang alas kosinus dan tinggi sinus sama-sama bernilai √2/2 ≈ 0.707.",
      xpReward: 30,
    },
    {
      id: "challenge-trig-2",
      title: "Asimtot Garis Singgung",
      question:
        "Tantangan 2: Putar sudut menuju posisi di mana garis tangen sejajar vertikal dan nilainya menjadi tidak terdefinisi (membagi dengan nol).",
      targetCondition: (vars: Record<string, number>) => {
        const metrics = computeUnitCircle(vars.angleDegrees);
        return metrics.isTanUndefined;
      },
      hintText:
        "Tangen adalah perbandingan sinus dibagi kosinus. Nilai ini tidak terdefinisi saat kosinus bernilai nol, yaitu pada sudut puncak 90° atau 270°.",
      successMessage: "Sempurna! Pada 90° dan 270°, garis radial tegak sejajar garis singgung sehingga nilainya tak hingga.",
      xpReward: 60,
    },
    {
      id: "challenge-trig-3",
      title: "Sinus Negatif Kuadran 3",
      question:
        "Tantangan 3: Jelajahi Kuadran 3! Temukan sudut di mana nilai sin(θ) = -0.5.",
      targetCondition: (vars: Record<string, number>) => {
        const d = ((vars.angleDegrees % 360) + 360) % 360;
        return d >= 180 && d < 270 && Math.abs(d - 210) <= 2;
      },
      hintText:
        "Pada kuadran 3, nilai sinus selalu bernilai negatif. Sudut istimewa dengan sin = -1/2 adalah 180° + 30° = 210°.",
      successMessage: "Luar biasa! Sudut 210° menghasilkan nilai sinus tepat -1/2.",
      xpReward: 100,
    },
  ],
};
