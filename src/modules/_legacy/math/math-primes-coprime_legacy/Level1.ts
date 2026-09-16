import { Level } from "@/types/level";
import { challengeFind17 } from "./challenges";

export const level1: Level = {
  id: "primes-level-1",
  index: 1,
  tier: 1,
  title: "Atom Bilangan & Teorema Dasar Aritmetika",
  description: "Menemukan bahwa bilangan prima adalah bilangan yang ubinnya hanya bisa disusun satu baris.",
  ahaMoment: "Bilangan prima adalah bilangan yang ubinnya HANYA bisa disusun menjadi 1 baris lurus panjang, mustahil dibuat menjadi persegi panjang lain!",
  steps: [
    {
      id: "p1-s1",
      type: "provoke",
      title: "Pabrik Cokelat Persegi Panjang",
      naiExpression: "curious",
      naiDialogue: "Kamu bisa menata 12 potong cokelat menjadi 2 × 6 atau 3 × 4. Bagaimana jika kamu hanya punya 7 cokelat?",
      provoke: {
        hookTitle: "Mengapa 7 Potong Cokelat Kaku?",
        hookText: "Coba susun 7 potong cokelat menjadi kisi 2 baris atau 3 baris. Selalu ada yang bolong! Satu-satunya cara menatanya adalah berbaris lurus 1 × 7.",
        interactiveComponentSlug: "math-primes-coprime",
        initialVariables: { numberN: 7, coprimeA: 8, coprimeB: 9 },
        question: "Mengapa angka 7 disebut angka yang 'kaku'?",
        options: [
          {
            id: "opt-prime-rigid",
            text: "Karena 7 adalah bilangan prima: hanya memiliki tepat 2 faktor pembagi (1 dan 7)",
            responseText: "Tepat sekali! Bilangan prima tidak bisa dipecah menjadi perkalian dua bilangan bulat yang lebih kecil.",
          },
          {
            id: "opt-odd-rigid",
            text: "Karena 7 adalah bilangan ganjil.",
            responseText: "Kurang tepat. Angka 9 juga ganjil, tapi bisa dibuat persegi 3 × 3!",
          },
        ],
      },
    },
    {
      id: "p1-s2",
      type: "predict",
      title: "Angka Mana yang Kaku?",
      naiExpression: "thinking",
      naiDialogue: "Di antara angka-angka 9, 11, 15, dan 21, manakah angka yang hanya punya 1 susunan baris lurus?",
      predict: {
        scenarioTitle: "Mendeteksi Atom Prima",
        scenarioText: "9 = 3 × 3, 15 = 3 × 5, 21 = 3 × 7.",
        question: "Angka manakah yang merupakan bilangan prima?",
        options: [
          {
            id: "pred-11",
            text: "11 (hanya bisa disusun 1 × 11)",
            isCorrect: true,
            feedback: "Benar! 11 tidak bisa dibagi oleh 2, 3, 5, atau angka lain selain 1 dan 11.",
          },
          {
            id: "pred-9",
            text: "9 (bisa dibuat persegi 3 × 3)",
            isCorrect: false,
            feedback: "9 = 3 × 3, jadi 9 adalah bilangan komposit.",
          },
          {
            id: "pred-15",
            text: "15",
            isCorrect: false,
            feedback: "15 = 3 × 5, memiliki 4 faktor (1, 3, 5, 15).",
          },
        ],
        simulationLabel: "Buktikan Balok 11!",
        interactiveComponentSlug: "math-primes-coprime",
        initialVariables: { numberN: 11, coprimeA: 8, coprimeB: 9 },
        simulationVariables: { numberN: 11, coprimeA: 8, coprimeB: 9 },
      },
    },
    {
      id: "p1-s3",
      type: "guided",
      title: "Simulator Kisi Balok Faktor",
      naiExpression: "happy",
      naiDialogue: "Geser nilai N dan amati apakah balok bisa disusun menjadi kisi persegi panjang atau hanya satu baris lurus!",
      guided: {
        instructionTitle: "Laboratorium Balok Bilangan N",
        instructionText: "Amati bagaimana bilangan komposit membentuk banyak kisi, sedangkan bilangan prima hanya menghasilkan 1 baris memanjang.",
        interactiveComponentSlug: "math-primes-coprime",
        initialVariables: { numberN: 12, coprimeA: 8, coprimeB: 9 },
        observationTable: {
          headers: ["Nilai N", "Bentuk Kisi Persegi Panjang", "Status Bilangan"],
          rows: [
            { parameter: "N = 12", expectedValue: "1×12, 2×6, 3×4", unit: "Komposit" },
            { parameter: "N = 17", expectedValue: "Hanya 1×17", unit: "Prima" },
          ],
        },
        discoveryQuestion: {
          prompt: "Berapa banyak bilangan prima yang bernilai GENAP di seluruh semesta matematika?",
          options: [
            "Hanya satu, yaitu angka 2!",
            "Tak terhingga banyaknya",
            "Tidak ada sama sekali",
          ],
          correctOption: "Hanya satu, yaitu angka 2!",
          insight: "Angka 2 adalah bilangan prima paling unik: satu-satunya bilangan prima genap!",
        },
      },
    },
    {
      id: "p1-s4",
      type: "formalize",
      title: "Teorema Dasar Aritmetika",
      naiExpression: "neutral",
      naiDialogue: "Mari tuangkan konsep atom bilangan ini ke dalam formula Teorema Dasar Aritmetika.",
      formalize: {
        title: "Dekomposisi Prima Tunggal (DNA Bilangan)",
        prompt: "Lengkapi persamaan faktorisasi prima unik berikut:",
        formulaTemplate: "N = p_1^{a_1} \\cdot p_2^{a_2} \\dots p_k^{a_k} \\quad \\text{terurai secara } [blank1] \\text{ kecuali urutan faktornya}",
        blanks: [
          { id: "blank1", label: "Sifat Keunikan", options: ["unik (tunggal)", "berubah-ubah", "acak"], correctOption: "unik (tunggal)" },
        ],
        resolvedFormulaKaTeX: "N = \\prod_{i=1}^k p_i^{a_i} \\quad (p_i \\text{ prima unik})",
        explanation: "Setiap bilangan bulat positif lebih dari 1 memiliki sidik jari DNA faktorisasi prima yang tunggal dan abadi.",
      },
    },
    {
      id: "p1-s5",
      type: "check",
      title: "Cek Nalar Pohon Faktor",
      naiExpression: "thinking",
      naiDialogue: "Jika 60 diurai dari 6 × 10 atau dari 4 × 15, apakah atom prima di ujung rantingnya berbeda?",
      check: {
        question: "Apakah hasil akhir faktorisasi prima dari 60 bergantung pada cabang awal yang kita pilih?",
        checkType: "multiple_choice",
        options: [
          { id: "opt-same-dna", text: "Pasti sama persis: 2² × 3 × 5!", isCorrect: true, explanation: "Tepat sekali! Teorema Dasar Aritmetika menjamin hasil akhir faktorisasi prima selalu tunggal." },
          { id: "opt-diff-dna", text: "Bisa berbeda tergantung cabang pohonnya", isCorrect: false, explanation: "Cabang awalnya boleh beda, tapi ujung ranting prima selalu menghasilkan atom yang persis sama." },
        ],
        explanation: "60 = 2 × 2 × 3 × 5 = 2² · 3 · 5 terlepas dari rute penguraian.",
      },
    },
    {
      id: "p1-s6",
      type: "sandbox",
      title: "Playground Balok Faktor Bebas",
      naiExpression: "happy",
      naiDialogue: "Ubah slider N untuk menguji bentuk balok berbagai bilangan prima dan komposit.",
      sandbox: {
        title: "Simulasi Balok N Bebas",
        instructions: "Geser nilai N untuk mengamati dekomposisi kisi dan pohon faktor.",
        interactiveComponentSlug: "math-primes-coprime",
        initialVariables: { numberN: 17, coprimeA: 8, coprimeB: 9 },
      },
    },
    {
      id: "p1-s7",
      type: "challenge",
      title: "Misi: Temukan Atom Prima N = 17",
      naiExpression: "neutral",
      naiDialogue: "Atur slider N ke sebuah bilangan prima antara 15 dan 20 yang hanya memiliki faktor 1 dan dirinya sendiri (Target: N = 17)!",
      challenge: challengeFind17,
    },
    {
      id: "p1-s8",
      type: "reflect",
      title: "Refleksi Level 1: Atom Semesta Bilangan",
      naiExpression: "celebrating",
      naiDialogue: "Sama seperti semua materi tersusun dari atom kimia, semua bilangan tersusun dari bilangan prima!",
      reflect: {
        title: "Level 1 Tuntas: Atom Prima & Teorema Dasar",
        takeaways: [
          "Bilangan prima hanya bisa disusun menjadi satu baris lurus 1 × N.",
          "Teorema Dasar Aritmetika menyatakan setiap bilangan komposit memiliki dekomposisi prima yang unik.",
          "Angka 2 adalah satu-satunya bilangan prima genap di semesta matematika.",
        ],
        connectionText: "Di Level 2, kita akan belajar menyaring ratusan bilangan prima secara ritmis lewat Saringan Eratosthenes!",
        nextLevelTitle: "Level 2: Saringan Eratosthenes & Batas √N",
        badgeToUnlock: "prime-seeker",
        xpReward: 30,
        formulaKaTeX: "N = \\prod_{i} p_i^{a_i}",
      },
    },
  ],
};
