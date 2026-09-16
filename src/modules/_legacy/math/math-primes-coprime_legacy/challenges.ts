import { ChallengeConfig } from "@/types/level";
import { isPrime, isCoprime } from "./engine";

export const challengeFind17: ChallengeConfig = {
  id: "challenge-prime-find17",
  title: "Konfigurasi Bilangan Prima N = 17",
  question:
    "Atur slider N ke sebuah bilangan prima antara 15 dan 20 yang hanya memiliki faktor pembagi 1 dan dirinya sendiri (Target: N = 17)!",
  targetCondition: (vars) => {
    const n = Math.round(vars.numberN || 0);
    return n === 17 && isPrime(n);
  },
  hint1Static: "Cari bilangan ganjil di atas 15 yang tidak habis dibagi 3.",
  hint2Static: "17 tidak habis dibagi 2 maupun 3. Geser slider N ke 17.",
  solutionVariables: { numberN: 17 },
  solutionExplanation: "17 adalah bilangan prima karena hanya bisa dibagi oleh 1 dan 17.",
  xpReward: 30,
};

export const challengeSieve29: ChallengeConfig = {
  id: "challenge-prime-sieve29",
  title: "Targetkan Bilangan Prima N = 29",
  question:
    "Atur slider N ke bilangan prima terbesar di bawah 30 yang membentuk pasangan prima kembar dengan 31 (Target: N = 29)!",
  targetCondition: (vars) => {
    return Math.round(vars.numberN || 0) === 29;
  },
  hint1Static: "29 dan 31 memiliki selisih 2 (pasangan prima kembar).",
  hint2Static: "Geser slider N ke angka 29.",
  solutionVariables: { numberN: 29 },
  solutionExplanation: "29 adalah bilangan prima, dan (29, 31) adalah pasangan prima kembar.",
  xpReward: 40,
};

export const challengeCoprimePair: ChallengeConfig = {
  id: "challenge-prime-coprime-pair",
  title: "Konfigurasi Pasangan Koprima",
  question:
    "Atur koordinat A = 7 dan koordinat B = 5 sehingga garis pandang berwarna hijau bebas hambatan (FPB = 1)!",
  targetCondition: (vars) => {
    const a = Math.round(vars.coprimeA || 0);
    const b = Math.round(vars.coprimeB || 0);
    return a === 7 && b === 5 && isCoprime(a, b);
  },
  hint1Static: "Atur slider koordinat A ke 7 dan koordinat B ke 5.",
  hint2Static: "7 dan 5 adalah dua bilangan prima berbeda, sehingga dijamin 100% koprima.",
  solutionVariables: { coprimeA: 7, coprimeB: 5 },
  solutionExplanation: "FPB(7, 5) = 1. Garis pandang dari (0,0) ke (7,5) tidak terhalang oleh titik integer mana pun.",
  xpReward: 50,
};

export const challengeTotient15: ChallengeConfig = {
  id: "challenge-prime-totient15",
  title: "Konfigurasi Totient φ(15) = 8",
  question:
    "Atur N = 15 (hasil kali dua prima 3 dan 5). Berapakah nilai totient Euler φ(15) = (3 - 1)(5 - 1)? Target: N = 15!",
  targetCondition: (vars) => {
    return Math.round(vars.numberN || 0) === 15;
  },
  hint1Static: "15 = 3 x 5. Rumus totient: (3 - 1) x (5 - 1) = 2 x 4 = 8.",
  hint2Static: "Geser slider N ke angka 15.",
  solutionVariables: { numberN: 15 },
  solutionExplanation: "φ(15) = (3 - 1) * (5 - 1) = 2 * 4 = 8. Terdapat 8 angka koprima dengan 15: 1, 2, 4, 7, 8, 11, 13, 14.",
  xpReward: 50,
};

export const challengeFermat11: ChallengeConfig = {
  id: "challenge-prime-fermat11",
  title: "Konfigurasi Modulus Prima p = 11",
  question:
    "Atur slider N ke bilangan prima p = 11 untuk membuktikan bahwa a¹⁰ ≡ 1 (mod 11) bagi setiap angka yang koprima dengan 11!",
  targetCondition: (vars) => {
    return Math.round(vars.numberN || 0) === 11;
  },
  hint1Static: "Geser slider N ke bilangan prima 11.",
  hint2Static: "Menurut Teorema Fermat, pangkat siklusnya adalah p - 1 = 11 - 1 = 10.",
  solutionVariables: { numberN: 11 },
  solutionExplanation: "Untuk p = 11 prima, a^10 = 1 (mod 11) untuk setiap gcd(a, 11) = 1.",
  xpReward: 60,
};

export const challengeBossMastery: ChallengeConfig = {
  id: "challenge-prime-boss-mastery",
  title: "Mastery: Prima N = 37 & Pasangan Koprima (9, 7)",
  question:
    "Atur N ke bilangan prima 37, koordinat A = 9, dan koordinat B = 7 (keduanya saling koprima dengan FPB = 1)!",
  targetCondition: (vars) => {
    const n = Math.round(vars.numberN || 0);
    const a = Math.round(vars.coprimeA || 0);
    const b = Math.round(vars.coprimeB || 0);
    return n === 37 && a === 9 && b === 7 && isPrime(n) && isCoprime(a, b);
  },
  hint1Static: "Atur N ke 37, koordinat A ke 9, dan koordinat B ke 7.",
  hint2Static: "37 adalah prima atom. 9 dan 7 koprima karena FPB(9, 7) = 1.",
  solutionVariables: { numberN: 37, coprimeA: 9, coprimeB: 7 },
  solutionExplanation: "N = 37 adalah bilangan prima. Pasangan (9, 7) memiliki FPB = 1 sehingga garis pandang bebas hambatan.",
  xpReward: 100,
};
