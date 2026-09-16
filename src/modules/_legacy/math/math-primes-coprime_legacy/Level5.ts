import { Level } from "@/types/level";
import { challengeFermat11 } from "./challenges";

export const level5: Level = {
  id: "primes-level-5",
  index: 5,
  tier: 3,
  title: "Teorema Kecil Fermat & Kunci Publik",
  description: "Siklus perulangan pangkat modular a^(p-1) = 1 (mod p).",
  ahaMoment: "Jika kamu memangkatkan angka koprima sebanyak p - 1 kali di modulo prima p, hasilnya SELALU kembali ke 1!",
  steps: [
    {
      id: "p5-s1",
      type: "provoke",
      title: "Siklus Pangkat yang Ajaib",
      naiExpression: "curious",
      naiDialogue: "Mengapa angka berapa pun yang dipangkatkan 6 selalu menghasilkan sisa 1 di modulo 7?",
      provoke: {
        hookTitle: "Keteraturan Ajaib Pierre de Fermat",
        hookText: "Pada modulo prima p = 7: coba 3⁶ = 729 = 104 × 7 + 1 ≡ 1. Coba 5⁶ = 15625 = 2232 × 7 + 1 ≡ 1!",
        interactiveComponentSlug: "math-primes-coprime",
        initialVariables: { numberN: 7, coprimeA: 3, coprimeB: 5 },
        question: "Apakah fenomena a^(p-1) ≡ 1 (mod p) selalu berlaku untuk semua bilangan prima p?",
        options: [
          {
            id: "opt-fermat-always",
            text: "Ya, selalu berlaku untuk setiap bilangan prima p dan a yang koprima dengan p!",
            responseText: "Tepat sekali! Ini adalah Teorema Kecil Fermat (1640) yang memungkinkan perulangan siklus kunci kriptografi.",
          },
          {
            id: "opt-fermat-coinc",
            text: "Hanya kebetulan pada angka 3 dan 5 saja.",
            responseText: "Bukan kebetulan! Ini adalah teorema universal yang telah terbukti secara matematis.",
          },
        ],
      },
    },
    {
      id: "p5-s2",
      type: "predict",
      title: "Sederhanakan Pangkat Raksasa",
      naiExpression: "thinking",
      naiDialogue: "Berapakah sisa pembagian 2¹⁰⁰ jika dibagi oleh prima 13?",
      predict: {
        scenarioTitle: "Aplikasi Teorema Fermat pada Pangkat 100",
        scenarioText: "Karena 13 adalah prima, maka menurut Fermat: 2¹² ≡ 1 (mod 13). 100 = 8 × 12 + 4.",
        question: "Berapakah sisa pembagian 2¹⁰⁰ mod 13?",
        options: [
          {
            id: "pred-3-fermat",
            text: "3 (karena 2¹⁰⁰ ≡ (2¹²)⁸ · 2⁴ ≡ 1⁸ · 16 ≡ 16 mod 13 = 3)",
            isCorrect: true,
            feedback: "Brilian! Pangkat 100 yang raksasa lenyap seketika menjadi 2⁴ = 16 ≡ 3 (mod 13). Sungguh luar biasa!",
          },
          {
            id: "pred-1-fermat",
            text: "1",
            isCorrect: false,
            feedback: "100 bukan kelipatan tepat dari 12, bersisa 4.",
          },
        ],
        simulationLabel: "Buktikan Pangkat Modular!",
        interactiveComponentSlug: "math-primes-coprime",
        initialVariables: { numberN: 11, coprimeA: 3, coprimeB: 5 },
        simulationVariables: { numberN: 11, coprimeA: 3, coprimeB: 5 },
      },
    },
    {
      id: "p5-s3",
      type: "guided",
      title: "Playground Teorema Fermat",
      naiExpression: "happy",
      naiDialogue: "Atur N ke bilangan prima (seperti 7 atau 11) dan amati sifat keteraturan sisa bagi pangkatnya!",
      guided: {
        instructionTitle: "Simulator Siklus Fermat a^(p-1) ≡ 1",
        instructionText: "Untuk p = 11, pangkat siklus identitasnya adalah p - 1 = 10.",
        interactiveComponentSlug: "math-primes-coprime",
        initialVariables: { numberN: 11, coprimeA: 3, coprimeB: 5 },
        observationTable: {
          headers: ["Modulus Prima p", "Pangkat Siklus p - 1", "Sisa Bagi a^(p-1) mod p"],
          rows: [
            { parameter: "p = 7", expectedValue: "pangkat 6", unit: "≡ 1" },
            { parameter: "p = 11", expectedValue: "pangkat 10", unit: "≡ 1" },
          ],
        },
        discoveryQuestion: {
          prompt: "Apa syarat utama agar Teorema Kecil Fermat a^(p-1) ≡ 1 (mod p) berlaku?",
          options: [
            "p harus bilangan prima dan a tidak habis dibagi p (FPB(a, p) = 1)",
            "a harus bilangan genap",
            "p harus lebih besar dari 100",
          ],
          correctOption: "p harus bilangan prima dan a tidak habis dibagi p (FPB(a, p) = 1)",
          insight: "Syarat mutlaknya adalah p prima dan a saling koprima dengan p.",
        },
      },
    },
    {
      id: "p5-s4",
      type: "formalize",
      title: "Teorema Kecil Fermat (Fermat's Little Theorem)",
      naiExpression: "neutral",
      naiDialogue: "Mari formulasikan Teorema Kecil Fermat ke dalam KaTeX.",
      formalize: {
        title: "Teorema Kecil Fermat",
        prompt: "Lengkapi identitas teorema Fermat berikut:",
        formulaTemplate: "\\gcd(a, p) = 1 \\implies a^{[blank1]} \\equiv 1 \\pmod p \\quad \\text{atau} \\quad a^p \\equiv [blank2] \\pmod p",
        blanks: [
          { id: "blank1", label: "Pangkat Siklus", options: ["p - 1", "p", "p + 1"], correctOption: "p - 1" },
          { id: "blank2", label: "Bentuk Kalikan a", options: ["a", "1", "0"], correctOption: "a" },
        ],
        resolvedFormulaKaTeX: "a^{p-1} \\equiv 1 \\pmod p \\quad \\text{dan} \\quad a^p \\equiv a \\pmod p",
        explanation: "Teorema Fermat memungkinkan enkripsi eksponensial di mana eksponen dapat didekripsi kembali menggunakan invers totient.",
      },
    },
    {
      id: "p5-s5",
      type: "check",
      title: "Cek Nalar Fermat",
      naiExpression: "thinking",
      naiDialogue: "Berapakah sisa bagi dari 5⁴² jika dibagi oleh bilangan prima 43?",
      check: {
        question: "Berapakah sisa dari 5⁴² mod 43? (Ingat: 43 adalah bilangan prima!)",
        checkType: "multiple_choice",
        options: [
          { id: "opt-1-fermat-check", text: "1 (karena 43 prima, maka 5⁴² = 5^(43-1) ≡ 1 mod 43)", isCorrect: true, explanation: "Tepat sekali! Menurut Teorema Fermat, langsung bernilai 1 tanpa perlu menghitung sepeser pun." },
          { id: "opt-5-fermat-check", text: "5", isCorrect: false, explanation: "5 adalah hasil jika dipangkatkan 43 (mod 43), bukan pangkat 42." },
        ],
        explanation: "a^(p-1) ≡ 1 (mod p) -> 5^(43-1) = 5^42 ≡ 1 (mod 43).",
      },
    },
    {
      id: "p5-s6",
      type: "sandbox",
      title: "Playground Siklus Fermat",
      naiExpression: "happy",
      naiDialogue: "Atur N ke bilangan prima 11 dan amati siklus pangkatnya di kanvas.",
      sandbox: {
        title: "Simulasi Siklus Fermat",
        instructions: "Atur N ke bilangan prima 11 dan amati keteraturan sisa bagi pangkatnya.",
        interactiveComponentSlug: "math-primes-coprime",
        initialVariables: { numberN: 11, coprimeA: 3, coprimeB: 5 },
      },
    },
    {
      id: "p5-s7",
      type: "challenge",
      title: "Tantangan: Buktikan Fermat pada p = 11",
      naiExpression: "neutral",
      naiDialogue: "Atur slider N ke bilangan prima p = 11 untuk membuktikan bahwa a¹⁰ ≡ 1 (mod 11)!",
      challenge: challengeFermat11,
    },
    {
      id: "p5-s8",
      type: "reflect",
      title: "Refleksi Level 5: Mahakarya Pierre de Fermat",
      naiExpression: "celebrating",
      naiDialogue: "Menakjubkan! Kamu telah membuktikan Teorema Kecil Fermat yang melegenda!",
      reflect: {
        title: "Level 5 Tuntas: Teorema Kecil Fermat",
        takeaways: [
          "Untuk setiap bilangan prima p dan a yang koprima dengan p: a^(p-1) ≡ 1 (mod p).",
          "Siklus pangkat modular ini memungkinkan penyederhanaan pangkat eksponensial raksasa.",
          "Teorema Fermat adalah gerbang pengujian keprimaan cepat pada algoritma komputer modern.",
        ],
        connectionText: "Saatnya menuntaskan seluruh petualangan Teori Bilangan di Boss Level Pamungkas!",
        nextLevelTitle: "Boss Level: Ujian Modul Faktorisasi Prima",
        badgeToUnlock: "pattern-seeker",
        xpReward: 60,
        formulaKaTeX: "a^{p-1} \\equiv 1 \\pmod p",
      },
    },
  ],
};
