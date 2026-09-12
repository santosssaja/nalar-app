import { TopicLesson } from "@/types/topic";
import { computeRiemannMetrics } from "./engine";

export const riemannLesson: TopicLesson = {
  id: "math-calculus-riemann",
  slug: "math-calculus-riemann",
  title: "Jumlah Riemann & Kalkulus Integral",
  category: "math",
  summary:
    "Memahami konsep integral tentu sebagai limit akumulasi jumlah luas persegi panjang di bawah kurva fungsi ketika lebar partisi mendekati nol.",
  audioNarrationText:
    "Integral tentu menghitung akumulasi total luas daerah di bawah kurva fungsi. Dengan membagi daerah menjadi banyak persegi panjang tipis dan menjumlahkannya, kita mendekati nilai luas eksak.",
  initialVariables: {
    n: 8,
    a: 0,
    b: 2,
  },
  challenges: [
    {
      id: "challenge-riemann-1",
      title: "Memperkecil Galat Partisi Parabola",
      question:
        "Tantangan 1: Pada fungsi f(x) = x² dari 0 ke 2, naikkan jumlah partisi n hingga n ≥ 30 sehingga galat relatif berada di bawah 3%.",
      targetCondition: (vars: Record<string, number>) => {
        const metrics = computeRiemannMetrics("x2", 0, 2, vars.n, "left");
        return vars.n >= 30 && metrics.relErrorPercent < 3.0;
      },
      hintText:
        "Tarik slider partisi n ke kanan mendekati 30 atau lebih. Semakin banyak persegi panjang, celah kosong semakin tertutup.",
      successMessage: "Bagus sekali! Dengan n ≥ 30, akumulasi persegi panjang mendekati luas analitik eksak 8/3 ≈ 2.67.",
      xpReward: 30,
    },
    {
      id: "challenge-riemann-2",
      title: "Keajaiban Metode Titik Tengah",
      question:
        "Tantangan 2: Atur jumlah partisi n = 4, lalu pilih metode Titik Tengah (Midpoint) untuk membuktikan keakuratannya yang tinggi.",
      targetCondition: (vars: Record<string, number>) => {
        return vars.n === 4 && vars.method === 2; // method enum mapping
      },
      hintText:
        "Ubah tombol pilihan metode menjadi 'Titik Tengah'. Pada n = 4, bagian yang melebihi kurva saling meniadakan bagian yang kurang.",
      successMessage: "Hebat! Metode titik tengah menyeimbangkan kelebihan dan kekurangan luas sehingga galat sangat kecil.",
      xpReward: 60,
    },
    {
      id: "challenge-riemann-3",
      title: "Menghitung Luas Gelombang Sinus",
      question:
        "Tantangan 3: Pilih fungsi sin(x) dari 0 ke π dan capai hasil akumulasi dengan galat relatif kurang dari 1% (Luas eksak = 2.00).",
      targetCondition: (vars: Record<string, number>) => {
        const metrics = computeRiemannMetrics("sin", 0, Math.PI, vars.n || 20, "midpoint");
        return vars.funcKey === 1 && metrics.relErrorPercent < 1.0;
      },
      hintText:
        "Pilih preset fungsi sin(x), gunakan metode Titik Tengah atau Trapesium, dan gunakan partisi n yang cukup besar.",
      successMessage: "Luar biasa! Luas satu bukit gelombang sinus dari 0 ke π tepat bernilai 2.00 satuan luas.",
      xpReward: 100,
    },
  ],
};
