import { Level } from "@/types/level";

export const level4: Level = {
  id: "clock-level-4",
  index: 4,
  tier: 2,
  title: "Geometri Fraktal Kardioid & Pola Bunga Modular",
  description: "Menghubungkan titik i ke (i * m) mod n untuk melahirkan kurva amplop epikoloid.",
  ahaMoment: "Tabel perkalian modulo di lingkaran menghasilkan pola geometri indah: bentuk hati kardioid dan fraktal!",
  steps: [
    {
      id: "c4-s1",
      type: "provoke",
      title: "Garis Lurus Menjadi Lengkungan Cahaya",
      naiExpression: "curious",
      naiDialogue: "Semua benang ini lurus sempurna. Dari mana datangnya lengkungan halus berbentuk hati ini?",
      provoke: {
        hookTitle: "Munculnya Kardioid dari Garis Lurus",
        hookText: "Jika keliling lingkaran dibagi menjadi banyak titik, lalu setiap titik i dihubungkan garis lurus ke (i × 2) mod n, garis-garis tersebut membungkus kurva lengkung mulus bernama kardioid.",
        interactiveComponentSlug: "arithmetic-modular-clock",
        initialVariables: { n: 60, multiplier: 2, hourA: 0, hourB: 0 },
        question: "Mengapa garis-garis lurus bisa membentuk kurva lengkung?",
        options: [
          {
            id: "opt-caustic",
            text: "Karena garis-garis lurus tersebut menjadi garis singgung dari kurva amplop (kaustik)",
            responseText: "Tepat sekali! Mirip pantulan cahaya di dasar cangkir kopi, fenomena kaustik ini adalah manifestasi fisik tabel perkalian modulo 2.",
          },
          {
            id: "opt-bend",
            text: "Karena garisnya melengkung secara fisik saat digambar.",
            responseText: "Garisnya 100% lurus! Lengkungan itu adalah efek optik dari kerapatan garis singgung beruntun.",
          },
        ],
      },
    },
    {
      id: "c4-s2",
      type: "predict",
      title: "Ke Mana Tali Terhubung?",
      naiExpression: "thinking",
      naiDialogue: "Pada lingkaran 10 titik, jika multiplier = 2, ke manakah titik 6 dihubungkan?",
      predict: {
        scenarioTitle: "Koneksi Tali Modular",
        scenarioText: "Rumus koneksi: Target = (Titik Asal × Multiplier) mod 10. Untuk titik 6 dengan multiplier = 2.",
        question: "Ke titik berapakah garis dari titik 6 berakhir?",
        options: [
          {
            id: "pred-2-card",
            text: "Titik 2 (karena 6 × 2 = 12 ≡ 2 mod 10)",
            isCorrect: true,
            feedback: "Benar! 12 dibagi 10 bersisa 2, sehingga tali ditarik dari titik 6 menuju titik 2.",
          },
          {
            id: "pred-12-card",
            text: "Titik 12",
            isCorrect: false,
            feedback: "Ingat bahwa lingkaran ini hanya memiliki 10 titik (angka 0 sampai 9).",
          },
        ],
        simulationLabel: "Hubungkan Tali!",
        interactiveComponentSlug: "arithmetic-modular-clock",
        initialVariables: { n: 10, multiplier: 2, hourA: 6, hourB: 0 },
        simulationVariables: { n: 10, multiplier: 2, hourA: 6, hourB: 2 },
      },
    },
    {
      id: "c4-s3",
      type: "guided",
      title: "Eksplorasi Kurva Kardioid & Nefroid",
      naiExpression: "happy",
      naiDialogue: "Tingkatkan nilai multiplier ke 3 dan 4. Lihat berapa banyak cuping bunga yang mekar!",
      guided: {
        instructionTitle: "Jumlah Cuping Kurva Epikoloid",
        instructionText: "Ubah n menjadi bilangan besar (misal 60) dan naikkan multiplier untuk melihat bentuk kurva amplop.",
        interactiveComponentSlug: "arithmetic-modular-clock",
        initialVariables: { n: 60, multiplier: 2, hourA: 0, hourB: 0 },
        observationTable: {
          headers: ["Multiplier k", "Bentuk Kurva", "Jumlah Cuping (Lekukan)"],
          rows: [
            { parameter: "k = 2", expectedValue: "Kardioid (Hati)", unit: "1 cuping" },
            { parameter: "k = 3", expectedValue: "Nefroid (Ginjal)", unit: "2 cuping" },
            { parameter: "k = 4", expectedValue: "Trefoil", unit: "3 cuping" },
          ],
        },
        discoveryQuestion: {
          prompt: "Apa rumus umum jumlah cuping yang terbentuk untuk sembarang multiplier k?",
          options: [
            "Jumlah Cuping = k - 1",
            "Jumlah Cuping = k + 1",
            "Jumlah Cuping = k × 2",
          ],
          correctOption: "Jumlah Cuping = k - 1",
          insight: "Jumlah cuping selalu tepat k - 1! Untuk multiplier = 3 terbentuk nefroid dengan 3 - 1 = 2 cuping.",
        },
      },
    },
    {
      id: "c4-s4",
      type: "formalize",
      title: "Persamaan Amplop Kaustik Modular",
      naiExpression: "neutral",
      naiDialogue: "Mari formulasikan pemetaan tali ke dalam rumus amplop kaustik.",
      formalize: {
        title: "Persamaan Amplop Kaustik",
        prompt: "Lengkapi pemetaan simpul dan rumus jumlah cuping kurva:",
        formulaTemplate: "i \\mapsto (i \\cdot m) \\pmod n \\quad \\text{dan} \\quad \\text{Banyak Cuping} = [blank1] - 1",
        blanks: [
          { id: "blank1", label: "Parameter Pengali", options: ["m", "n", "i"], correctOption: "m" },
        ],
        resolvedFormulaKaTeX: "i \\mapsto (i \\cdot m) \\pmod n \\quad \\text{dan} \\quad \\text{Banyak Cuping} = m - 1",
        explanation: "Tiap garis lurus menjadi garis singgung dari amplop kurva epikoloid yang memiliki m - 1 cuping simetris.",
      },
    },
    {
      id: "c4-s5",
      type: "check",
      title: "Analisis Titik Temu Nol",
      naiExpression: "thinking",
      naiDialogue: "Perhatikan titik puncak 0 di bagian atas lingkaran!",
      check: {
        question: "Mengapa titik 0 selalu menjadi simpul tempat bertemunya semua garis untuk pengali berapa pun?",
        checkType: "multiple_choice",
        options: [
          { id: "opt-0-zero", text: "Karena 0 × m = 0 (mod n) untuk pengali m berapa pun", isCorrect: true, explanation: "Tepat sekali! Nol dikalikan angka berapa pun selalu menghasilkan nol, sehingga tali dari titik 0 selalu kembali ke dirinya sendiri." },
          { id: "opt-0-top", text: "Karena titik nol berada di paling atas", isCorrect: false, explanation: "Posisi fisik hanyalah pilihan visual koordinat, alasan matematisnya adalah sifat perkalian nol." },
        ],
        explanation: "Sifat nol: 0 · k ≡ 0 (mod n), menjadikan titik 0 sebagai titik tetap (fixed point).",
      },
    },
    {
      id: "c4-s6",
      type: "sandbox",
      title: "Simulasi Pola Benang Kardioid",
      naiExpression: "happy",
      naiDialogue: "Eksplorasi berbagai nilai n dan multiplier untuk melahirkan karya seni matematika.",
      sandbox: {
        title: "Studio Seni Fraktal Modulo",
        instructions: "Ubah n menjadi bilangan besar (misal 60) dan naikkan multiplier untuk melihat keindahan amplop.",
        interactiveComponentSlug: "arithmetic-modular-clock",
        initialVariables: { n: 60, multiplier: 2, hourA: 0, hourB: 0 },
      },
    },
    {
      id: "c4-s7",
      type: "challenge",
      title: "Misi: Bentuk Bunga Nefroid 2 Cuping",
      naiExpression: "neutral",
      naiDialogue: "Atur jumlah titik n minimal 30 dan multiplier = 3 untuk menghasilkan kurva nefroid (2 cuping simetris)!",
      challenge: {
        id: "challenge-clock-cardioid-nephroid",
        title: "Konfigurasi Nefroid (m = 3, n >= 30)",
        question:
          "Atur jumlah titik n minimal 30 dan multiplier = 3 untuk menghasilkan kurva nefroid (2 cuping simetris)!",
        targetCondition: (vars) => {
          return (vars.n || 0) >= 30 && (vars.multiplier || 0) === 3;
        },
        hint1Static: "Ingat rumus jumlah cuping: multiplier - 1 = 2, sehingga multiplier harus 3.",
        hint2Static: "Tingkatkan n ke minimal 30 agar garis terlihat padat dan halus.",
        solutionVariables: { n: 40, multiplier: 3 },
        solutionExplanation: "Multiplier = 3 menghasilkan nefroid (2 cuping). n = 40 memberikan resolusi kurva yang sangat jelas.",
        xpReward: 50,
      },
    },
    {
      id: "c4-s8",
      type: "reflect",
      title: "Refleksi Level 4: Keindahan Matematika Murni",
      naiExpression: "celebrating",
      naiDialogue: "Matematika bukan cuma angka kering, tapi juga simetri visual yang memukau!",
      reflect: {
        title: "Level 4 Tuntas: Kardioid & Seni Geometri Modulo",
        takeaways: [
          "Perkalian modular di atas lingkaran menghasilkan kurva amplop epikoloid kaustik.",
          "Multiplier k = 2 melahirkan kardioid (1 cuping), dan k = 3 melahirkan nefroid (2 cuping).",
          "Hubungan aljabar murni sisa bagi memiliki perwujudan simetri visual nyata di alam semesta.",
        ],
        connectionText: "Di Level 5, kita akan menggunakan modulo untuk menyandikan pesan rahasia para kaisar!",
        nextLevelTitle: "Level 5: Kriptografi Sandi Caesar & Affine",
        badgeToUnlock: "pattern-seeker",
        xpReward: 50,
        formulaKaTeX: "i \\mapsto (i \\cdot m) \\pmod n",
      },
    },
  ],
};
