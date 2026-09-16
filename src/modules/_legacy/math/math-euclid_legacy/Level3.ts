import { Level } from "@/types/level";
import { computeEuclideanTiles, computeLCM } from "./engine";

export const level3: Level = {
  id: "euclid-level-3",
  index: 3,
  tier: 2,
  title: "Dualitas FPB & KPK (Dua Saudara)",
  description: "Menghubungkan perkalian dua bilangan dengan hasil kali FPB dan KPK-nya.",
  ahaMoment: "Hasil kali dua bilangan selalu sama dengan hasil kali FPB dan KPK-nya: a × b = gcd(a,b) × lcm(a,b)!",
  steps: [
    {
      id: "e3-s1",
      type: "provoke",
      title: "Kapan Dua Lampu Menyala Bersama?",
      naiExpression: "curious",
      naiDialogue: "Lampu hijau berkedip tiap 6 detik, lampu merah tiap 8 detik. Kapan detik pertama mereka menyala bersamaan lagi?",
      provoke: {
        hookTitle: "Pertemuan Ritme Kelipatan",
        hookText: "Kedua lampu mulai menyala bersama di detik 0. Lampu hijau menyala di detik 6, 12, 18, 24... Lampu merah di detik 8, 16, 24...",
        interactiveComponentSlug: "math-euclid",
        initialVariables: { width: 60, height: 45 },
        question: "Di detik ke berapakah kedua lampu pertama kali menyala serentak?",
        options: [
          {
            id: "opt-24-lcm",
            text: "Detik ke-24 (Kelipatan Persekutuan Terkecil / KPK)",
            responseText: "Tepat sekali! KPK(6, 8) = 24. Sekarang perhatikan: FPB(6, 8) = 2. Kalikan keduanya: 2 × 24 = 48 = 6 × 8!",
          },
          {
            id: "opt-48-mul",
            text: "Detik ke-48 (hasil kali langsung 6 × 8)",
            responseText: "Di detik 48 memang menyala bersama, tapi detik PERTAMA adalah detik ke-24.",
          },
        ],
      },
    },
    {
      id: "e3-s2",
      type: "predict",
      title: "Hubungan Perkalian Emas",
      naiExpression: "thinking",
      naiDialogue: "Jika FPB(a, b) × KPK(a, b) = a × b, bisakah kita mencari KPK angka besar tanpa daftar kelipatan?",
      predict: {
        scenarioTitle: "Mencari KPK Lewat Euclid",
        scenarioText: "Diketahui dua bilangan 60 dan 45 memiliki FPB = 15. Kita ingin mencari KPK(60, 45).",
        question: "Berapakah nilai KPK(60, 45)?",
        options: [
          {
            id: "pred-180",
            text: "180 (karena (60 × 45) / 15 = 60 × 3 = 180)",
            isCorrect: true,
            feedback: "Benar! Mencari KPK angka besar sekarang sangat cepat: cari FPB dengan Euclid, lalu bagi hasil kalinya!",
          },
          {
            id: "pred-2700",
            text: "2700 (hasil kali langsung 60 × 45)",
            isCorrect: false,
            feedback: "2700 belum dibagi dengan faktor persekutuan bersamanya (FPB = 15).",
          },
        ],
        simulationLabel: "Buktikan KPK = 180!",
        interactiveComponentSlug: "math-euclid",
        initialVariables: { width: 60, height: 45 },
        simulationVariables: { width: 60, height: 45 },
      },
    },
    {
      id: "e3-s3",
      type: "guided",
      title: "Simulator FPB & KPK Interaktif",
      naiExpression: "happy",
      naiDialogue: "Atur lebar = 60 dan tinggi = 45. Amati nilai FPB dan hasil KPK-nya di kanvas!",
      guided: {
        instructionTitle: "Laboratorium Dualitas FPB & KPK",
        instructionText: "Ubah dimensi untuk melihat bagaimana irisan balok faktor prima membentuk FPB dan gabungannya membentuk KPK.",
        interactiveComponentSlug: "math-euclid",
        initialVariables: { width: 60, height: 45 },
        observationTable: {
          headers: ["Pasangan (a, b)", "FPB gcd(a,b)", "KPK lcm(a,b) = (a·b)/gcd"],
          rows: [
            { parameter: "60 dan 45", expectedValue: "15", unit: "KPK = 180" },
            { parameter: "24 dan 18", expectedValue: "6", unit: "KPK = 72" },
          ],
        },
        discoveryQuestion: {
          prompt: "Mengapa rumus lcm(a, b) = (a · b) / gcd(a, b) selalu berlaku?",
          options: [
            "Karena faktor bersama dihitung dua kali saat a dikali b, sehingga harus dibagi satu kali dengan FPB",
            "Hanya berlaku jika salah satu bilangan prima",
            "Karena KPK selalu kelipatan ganjil",
          ],
          correctOption: "Karena faktor bersama dihitung dua kali saat a dikali b, sehingga harus dibagi satu kali dengan FPB",
          insight: "Mirip teori himpunan: |A ∪ B| = |A| + |B| - |A ∩ B|. Pada dekomposisi prima: max(a,b) + min(a,b) = a + b.",
        },
      },
    },
    {
      id: "e3-s4",
      type: "formalize",
      title: "Rumus Sakti KPK Lewat Euclid",
      naiExpression: "neutral",
      naiDialogue: "Mari formulasikan kaitan dualitas FPB dan KPK ke dalam KaTeX.",
      formalize: {
        title: "Identitas Perkalian FPB & KPK",
        prompt: "Lengkapi persamaan hubungan perkalian berikut:",
        formulaTemplate: "a \\cdot b = \\gcd(a, b) \\cdot [blank1] \\implies \\operatorname{lcm}(a, b) = \\frac{a \\cdot b}{[blank2]}",
        blanks: [
          { id: "blank1", label: "Faktor KPK", options: ["\\operatorname{lcm}(a, b)", "\\gcd(a, b)", "a + b"], correctOption: "\\operatorname{lcm}(a, b)" },
          { id: "blank2", label: "Pembagi FPB", options: ["\\gcd(a, b)", "a \\cdot b", "2"], correctOption: "\\gcd(a, b)" },
        ],
        resolvedFormulaKaTeX: "a \\cdot b = \\gcd(a, b) \\cdot \\operatorname{lcm}(a, b) \\implies \\operatorname{lcm}(a, b) = \\frac{a \\cdot b}{\\gcd(a, b)}",
        explanation: "KPK dari bilangan raksasa mana pun selalu dapat dihitung secara instan berkat kecepatan Algoritma Euclid.",
      },
    },
    {
      id: "e3-s5",
      type: "check",
      title: "Cek Cepat Angka Misterius",
      naiExpression: "thinking",
      naiDialogue: "Dua bilangan memiliki FPB = 6 dan KPK = 90. Jika salah satu bilangannya 18, berapakah bilangan lainnya?",
      check: {
        question: "Dua bilangan a dan b memiliki FPB = 6 dan KPK = 90. Jika a = 18, berapakah nilai b?",
        checkType: "multiple_choice",
        options: [
          { id: "opt-30-ans", text: "b = 30 (karena 18 × b = 6 × 90 = 540 -> b = 540 / 18 = 30)", isCorrect: true, explanation: "Brilian! 18 × 30 = 540 = 6 × 90. Rumus perkalian emas langsung menyelesaikan soal ini tanpa tebak-tebak!" },
          { id: "opt-15-ans", text: "b = 15", isCorrect: false, explanation: "18 × 15 = 270, bukan 540." },
          { id: "opt-45-ans", text: "b = 45", isCorrect: false, explanation: "FPB(18, 45) = 9, bukan 6." },
        ],
        explanation: "a · b = gcd · lcm -> 18 · b = 6 · 90 = 540 -> b = 30.",
      },
    },
    {
      id: "e3-s6",
      type: "sandbox",
      title: "Playground FPB & KPK Bebas",
      naiExpression: "happy",
      naiDialogue: "Uji berbagai kombinasi angka untuk memverifikasi perkalian emas a · b = gcd · lcm.",
      sandbox: {
        title: "Simulasi FPB & KPK Bebas",
        instructions: "Atur lebar = 60 dan tinggi = 45 untuk mengamati nilai FPB dan KPK.",
        interactiveComponentSlug: "math-euclid",
        initialVariables: { width: 60, height: 45 },
      },
    },
    {
      id: "e3-s7",
      type: "challenge",
      title: "Tantangan: Pasangan dengan KPK = 180",
      naiExpression: "neutral",
      naiDialogue: "Atur ukuran lantai sehingga FPB bernilai 15 dan KPK bernilai 180 (misal: 60 × 45)!",
      challenge: {
        id: "challenge-euclid-lcm",
        title: "Konfigurasi FPB = 15 dan KPK = 180",
        question:
          "Atur ukuran lantai sehingga FPB bernilai 15 dan KPK bernilai 180 (misal: 60 × 45)!",
        targetCondition: (vars) => {
          const res = computeEuclideanTiles(vars.width, vars.height);
          const lcm = computeLCM(vars.width, vars.height);
          return res.gcd === 15 && lcm === 180;
        },
        hint1Static: "Coba pasang lebar 60 dan tinggi 45.",
        hint2Static: "60 = 1 x 45 + 15 -> 45 = 3 x 15 + 0. FPB = 15. KPK = (60 x 45)/15 = 180.",
        solutionVariables: { width: 60, height: 45 },
        solutionExplanation: "FPB(60, 45) = 15. KPK(60, 45) = (60 * 45) / 15 = 180.",
        xpReward: 50,
      },
    },
    {
      id: "e3-s8",
      type: "reflect",
      title: "Refleksi Level 3: Dualitas Sempurna",
      naiExpression: "celebrating",
      naiDialogue: "FPB dan KPK adalah dua sisi dari satu koin yang sama!",
      reflect: {
        title: "Level 3 Tuntas: Dualitas FPB & KPK",
        takeaways: [
          "Hasil kali dua bilangan selalu sama dengan perkalian FPB dan KPK-nya: a · b = gcd · lcm.",
          "KPK adalah gabungan seluruh faktor prima, sedangkan FPB adalah irisannya.",
          "Kita tidak perlu lagi mencari KPK dengan mendaftar kelipatan panjang berbaris.",
        ],
        connectionText: "Di Level 4, kita akan memecahkan teka-teki ember air lewat Algoritma Euclid Diperluas & Identitas Bézout!",
        nextLevelTitle: "Level 4: Identitas Bézout & Ember Air",
        badgeToUnlock: "pattern-seeker",
        xpReward: 50,
        formulaKaTeX: "\\operatorname{lcm}(a, b) = \\frac{a \\cdot b}{\\gcd(a, b)}",
      },
    },
  ],
};
