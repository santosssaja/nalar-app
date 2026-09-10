import { TopicLesson } from "@/types/topic";

export const modularClockLesson: TopicLesson = {
  id: "math-nt-01",
  slug: "arithmetic-modular-clock",
  title: "Aritmetika Jam: Modulo & Siklus Pola Bilangan",
  category: "math",
  summary:
    "Bayangkan angka yang bergerak melingkar seperti jarum jam dinding. Aritmetika modular mengajarkan kita bahwa bilangan tidak harus selalu bertambah tanpa batas, melainkan berulang dalam siklus teratur yang melahirkan pola geometri kardioid dan fraktal menakjubkan.",
  audioNarrationText:
    "Selamat datang di modul Aritmetika Jam dan Teori Bilangan Elementer. Di sini kamu akan memahami operasi modulo secara intuitif layaknya waktu pada jam dinding. Jika jam menunjukkan pukul 9, maka 7 jam berikutnya bukan pukul 16, melainkan pukul 4, karena setelah menyentuh angka 12, siklus waktu kembali berputar ke awal.",
  initialVariables: {
    n: 12,
    multiplier: 2,
    hourA: 9,
    hourB: 7,
  },
  challenges: [
    {
      id: "challenge-clock-addition",
      title: "Misi 1: Siklus Waktu Jam Dinding",
      question:
        "Jika saat ini jam menunjukkan pukul 9, lalu waktu berjalan maju 7 jam ke depan, tentukan posisi jam pada sistem jam 12 (Target: sisa bagi = 4)!",
      targetCondition: (vars: Record<string, number>) => {
        const n = vars.n || 12;
        const res = ((vars.hourA + vars.hourB) % n + n) % n;
        return n === 12 && res === 4;
      },
      hintText:
        "Petunjuk: 9 + 7 = 16. Karena 1 lingkaran penuh jam adalah 12, kurangkan 16 dengan 12 untuk mendapatkan posisi sisa bagi jarum jam.",
      successMessage:
        "Benar sekali! 9 + 7 = 16 ≡ 4 (mod 12). Dalam matematika, ini adalah konsep kekongruenan modulo: sisa pembagian 16 oleh 12 adalah 4.",
      xpReward: 30,
    },
    {
      id: "challenge-cardioid-pattern",
      title: "Misi 2: Menciptakan Pola Kardioid ($m = 2$)",
      question:
        "Atur modulus n = 10 dan faktor pengali m = 2 pada kanvas jam untuk menghasilkan kurva kardioid (pola bentuk hati/cangkir kopi) pertama!",
      targetCondition: (vars: Record<string, number>) => {
        return Math.round(vars.n) === 10 && Math.round(vars.multiplier) === 2;
      },
      hintText:
        "Petunjuk: Geser slider modulus (n) ke angka 10 dan pastikan pengali (m) berada di angka 2.",
      successMessage:
        "Fantastis! Pola kardioid terbentuk karena garis-garis pembungkus (sampul amplop) dari operasi kelipatan dua mod 10 merefleksikan sinar kaustik geometris.",
      xpReward: 40,
    },
    {
      id: "challenge-coprime-generator",
      title: "Misi 3: Generator Siklis Penuh (Koprima)",
      question:
        "Pada jam n = 12, pilih angka pengali m yang relatif prima (koprima dengan 12, FPB = 1) lebih dari 1 agar menghasilkan siklus bintang penjelajah penuh!",
      targetCondition: (vars: Record<string, number>) => {
        const n = Math.round(vars.n);
        const m = Math.round(vars.multiplier);
        if (n !== 12 || m <= 1) return false;
        // Euclidean GCD
        let a = m, b = n;
        while (b !== 0) {
          const t = b;
          b = a % b;
          a = t;
        }
        return a === 1;
      },
      hintText:
        "Petunjuk: Angka yang koprima dengan 12 antara lain 5, 7, atau 11 (tidak berbagi faktor pembagi selain 1). Coba atur pengali m ke angka 5!",
      successMessage:
        "Luar biasa! Karena FPB(m, 12) = 1, setiap angka pada lingkaran dikunjungi tepat satu kali sebelum kembali ke titik awal. Ini adalah fondasi penting dalam kriptografi modern!",
      xpReward: 50,
    },
  ],
};
