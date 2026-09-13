import { TopicModule } from "@/types/topic";
import { calculateDCCircuit } from "./engine";

export const dcCircuitModule: TopicModule = {
  id: "physics-dc-circuits",
  slug: "physics-dc-circuits",
  title: "Pembangun Rangkaian Listrik DC",
  category: "physics",
  summary:
    "Memahami Hukum Ohm V = IR, hambatan ekuivalen seri dan paralel, pembagian arus dan tegangan Kirchhoff, serta disipasi daya P = VI.",
  audioNarrationText:
    "Selamat datang di modul Rangkaian Listrik DC. Di sini kamu dapat bereksperimen dengan tegangan, arus, resistor seri-paralel, dan hukum kekekalan daya.",
  initialVariables: {
    voltage: 12,
    r1: 4,
    r2: 8,
    r3: 6,
    isSwitchClosed: 1,
  },
  levels: [
    {
      id: "circuit-level-1",
      index: 1,
      tier: 1,
      title: "Hukum Ohm & Rangkaian Hambatan Seri",
      description: "Memahami hubungan tegangan, arus, dan pembagian tegangan pada resistor seri.",
      steps: [
        {
          id: "dc1-step-1",
          type: "explanation",
          title: "Hubungan Fundamental Arus dan Tegangan",
          explanation: {
            title: "Hukum Ohm & Rangkaian Seri",
            conceptText:
              "Arus listrik yang mengalir melalui konduktor sebanding lurus dengan beda potensial (tegangan) dan berbanding terbalik dengan hambatannya (V = I·R). Pada susunan seri, arus yang mengalir di setiap komponen bernilai sama.",
            analogyText:
              "Tegangan bagaikan pompa air, hambatan bagaikan pipa sempit yang menahan laju air, dan kuat arus adalah debit aliran air per detik.",
            keyFormulas: [
              "V = I \\cdot R",
              "R_{\\text{eq}} = R_1 + R_2 + \\dots + R_n",
              "V_{\\text{total}} = V_1 + V_2 = I R_1 + I R_2",
            ],
            audioNarrationText:
              "Hukum Ohm menyatakan bahwa tegangan sama dengan arus dikalikan hambatan listrik.",
          },
        },
        {
          id: "dc1-step-2",
          type: "playground",
          title: "Eksplorasi Sirkuit Seri",
          playground: {
            title: "Laboratorium Sirkuit Seri",
            instructions: "Atur tegangan baterai V dan resistor R1 serta R2 lalu amati arus I dan nyala lampu resistor.",
            interactiveComponentSlug: "physics-dc-circuits",
            initialVariables: { voltage: 12, r1: 4, r2: 8 },
          },
        },
        {
          id: "dc1-step-3",
          type: "challenge",
          title: "Misi: Kalibrasi Arus Seri Tepat 1.0 A",
          challenge: {
            id: "challenge-circuit-1",
            title: "Target Arus 1 Ampere",
            question: "Atur tegangan V dan hambatan R1 serta R2 pada mode Seri agar arus sirkuit tepat 1.0 A (±0.05 A).",
            targetCondition: (vars: Record<string, number>) => {
              const res = calculateDCCircuit({
                voltage: vars.voltage ?? 12,
                r1: vars.r1 ?? 4,
                r2: vars.r2 ?? 8,
                topology: "series",
                isSwitchClosed: true,
              });
              return Math.abs(res.totalCurrent - 1.0) <= 0.05;
            },
            hint1Static: "R_eq = R1 + R2. I = V / R_eq.",
            hint2Static: "Jika V = 12 V, atur total hambatan R1 + R2 = 12 Ω (misal 4 Ω + 8 Ω atau 6 Ω + 6 Ω).",
            solutionVariables: { voltage: 12, r1: 4, r2: 8 },
            solutionExplanation: "Dengan V = 12 V dan R_eq = 4 + 8 = 12 Ω, maka arus I = 12 / 12 = 1.0 A.",
            xpReward: 35,
          },
        },
        {
          id: "dc1-step-4",
          type: "validation",
          title: "Refleksi Rangkaian Seri",
          validation: {
            title: "Karakteristik Jalur Tunggal",
            summaryText: "Pada rangkaian seri, jika salah satu komponen putus, seluruh aliran arus akan terhenti seketika.",
            keyTakeaway: "Hambatan pengganti seri selalu lebih besar dari hambatan komponen penyusun terbesarnya.",
            formulaKaTeX: "R_{\\text{seri}} = \\sum_{i=1}^n R_i",
            badgeToUnlock: "ohm-apprentice",
          },
        },
      ],
    },
    {
      id: "circuit-level-2",
      index: 2,
      tier: 2,
      title: "Percabangan Paralel & Hukum Kirchhoff Arus",
      description: "Menganalisis pembagian arus cabang pada tegangan konstan.",
      steps: [
        {
          id: "dc2-step-1",
          type: "explanation",
          title: "Percabangan Bebas & Pembagian Arus",
          explanation: {
            title: "Hukum I Kirchhoff (KCL)",
            conceptText:
              "Jumlah kuat arus yang masuk ke suatu titik percabangan sama dengan jumlah kuat arus yang keluar dari titik tersebut. Pada rangkaian paralel, tegangan pada setiap cabang sama besar dengan tegangan sumber.",
            analogyText:
              "Bagaikan jalan raya yang terbelah dua; kendaraan akan lebih banyak memilih jalur dengan hambatan kemacetan lebih rendah.",
            keyFormulas: [
              "\\sum I_{\\text{masuk}} = \\sum I_{\\text{keluar}}",
              "\\frac{1}{R_{\\text{eq}}} = \\frac{1}{R_1} + \\frac{1}{R_2}",
              "I_1 = \\frac{V}{R_1}, \\quad I_2 = \\frac{V}{R_2}",
            ],
            audioNarrationText:
              "Pada rangkaian paralel, tegangan setiap cabang bernilai sama dan arus terbagi berbanding terbalik dengan hambatannya.",
          },
        },
        {
          id: "dc2-step-2",
          type: "playground",
          title: "Eksplorasi Percabangan Paralel",
          playground: {
            title: "Laboratorium Sirkuit Paralel",
            instructions: "Pilih topologi Paralel lalu variasikan R1 dan R2 untuk mengamati distribusi arus pada masing-masing cabang.",
            interactiveComponentSlug: "physics-dc-circuits",
            initialVariables: { voltage: 12, r1: 6, r2: 6 },
          },
        },
        {
          id: "dc2-step-3",
          type: "challenge",
          title: "Misi: Arus Total Paralel 4.0 A",
          challenge: {
            id: "challenge-circuit-2",
            title: "Arus Paralel Kuat",
            question: "Pada mode Paralel dengan V = 12 V, atur hambatan R1 dan R2 agar arus total sirkuit tepat 4.0 A (±0.1 A).",
            targetCondition: (vars: Record<string, number>) => {
              if (Math.abs((vars.voltage ?? 12) - 12) > 0.5) return false;
              const res = calculateDCCircuit({
                voltage: 12,
                r1: vars.r1 ?? 6,
                r2: vars.r2 ?? 6,
                topology: "parallel",
                isSwitchClosed: true,
              });
              return Math.abs(res.totalCurrent - 4.0) <= 0.1;
            },
            hint1Static: "I_total = I1 + I2 = 12/R1 + 12/R2.",
            hint2Static: "Jika R1 = 6 Ω (2 A) dan R2 = 6 Ω (2 A), total arus = 2 + 2 = 4 A.",
            solutionVariables: { voltage: 12, r1: 6, r2: 6 },
            solutionExplanation: "Dengan R1 = 6 Ω dan R2 = 6 Ω, I1 = 12/6 = 2 A dan I2 = 12/6 = 2 A. Maka I_tot = 4 A.",
            xpReward: 45,
          },
        },
        {
          id: "dc2-step-4",
          type: "validation",
          title: "Refleksi Rangkaian Paralel",
          validation: {
            title: "Sistem Listrik Rumah Tangga",
            summaryText: "Semua stopkontak rumah dipasang paralel agar peralatan mendapat tegangan penuh 220V dan alat lain tetap menyala saat satu alat dimatikan.",
            keyTakeaway: "Hambatan pengganti paralel selalu lebih kecil dari hambatan resistor terkecil.",
            formulaKaTeX: "R_{\\text{paralel}} = \\frac{R_1 R_2}{R_1 + R_2} < \\min(R_1, R_2)",
            badgeToUnlock: "kirchhoff-circuit-expert",
          },
        },
      ],
    },
    {
      id: "circuit-level-3",
      index: 3,
      tier: 3,
      title: "Rangkaian Campuran & Disipasi Daya Listrik",
      description: "Menganalisis rangkaian gabungan seri-paralel dan energi termal disipasi daya Joule.",
      steps: [
        {
          id: "dc3-step-1",
          type: "explanation",
          title: "Daya Listrik & Efek Pemanasan Joule",
          explanation: {
            title: "Daya Listrik (P = VI)",
            conceptText:
              "Laju energi listrik yang diubah menjadi kalor atau cahaya pada resistor disebut daya listrik (P). Satuan daya adalah Watt (Joule/sekon). Resistor dengan daya lebih tinggi akan berpendar lebih terang atau memanas lebih cepat.",
            analogyText:
              "Daya bagaikan energi yang dilepaskan pemanas air listrik setiap detik.",
            keyFormulas: [
              "P = V \\cdot I = I^2 R = \\frac{V^2}{R}",
              "W = P \\cdot t \\quad (\\text{Joule})",
              "R_{\\text{campuran}} = R_1 + (R_2 \\parallel R_3)",
            ],
            audioNarrationText:
              "Daya listrik sama dengan tegangan dikalikan arus, atau arus kuadrat dikalikan hambatan.",
          },
        },
        {
          id: "dc3-step-2",
          type: "playground",
          title: "Eksplorasi Rangkaian Campuran",
          playground: {
            title: "Laboratorium Sirkuit Campuran",
            instructions: "Gunakan topologi Campuran lalu perhatikan bagaimana R1 menerima arus penuh, sementara R2 dan R3 berbagi arus.",
            interactiveComponentSlug: "physics-dc-circuits",
            initialVariables: { voltage: 12, r1: 2, r2: 6, r3: 3 },
          },
        },
        {
          id: "dc3-step-3",
          type: "challenge",
          title: "Misi: Atur Daya Disipasi Total 36 Watt",
          challenge: {
            id: "challenge-circuit-3",
            title: "Keseimbangan Daya 36 Watt",
            question: "Pada mode Campuran dengan V = 12 V, atur resistor R1, R2, R3 agar daya total yang dikonsumsi rangkaian tepat 36 Watt (±1 W).",
            targetCondition: (vars: Record<string, number>) => {
              if (Math.abs((vars.voltage ?? 12) - 12) > 0.5) return false;
              const res = calculateDCCircuit({
                voltage: 12,
                r1: vars.r1 ?? 2,
                r2: vars.r2 ?? 6,
                r3: vars.r3 ?? 3,
                topology: "mixed",
                isSwitchClosed: true,
              });
              return Math.abs(res.totalPower - 36) <= 1.0;
            },
            hint1Static: "P = V * I. Jika V = 12 V dan P = 36 W, arus I harus 3.0 A, sehingga R_eq = 4.0 Ω.",
            hint2Static: "Setel R1 = 2 Ω, R2 = 6 Ω, R3 = 3 Ω. R_paralel = (6×3)/(6+3) = 2 Ω. R_total = 2 + 2 = 4 Ω.",
            solutionVariables: { voltage: 12, r1: 2, r2: 6, r3: 3 },
            solutionExplanation: "Dengan R1 = 2 Ω, R2 = 6 Ω, R3 = 3 Ω, hambatan total R_eq = 2 + 2 = 4 Ω. Arus I = 12/4 = 3 A. Daya P = 12 × 3 = 36 Watt.",
            xpReward: 50,
          },
        },
        {
          id: "dc3-step-4",
          type: "validation",
          title: "Refleksi Analisis Sirkuit Lanjutan",
          validation: {
            title: "Hukum Kekekalan Energi",
            summaryText: "Total daya yang disuplai baterai selalu sama persis dengan jumlah daya yang didisipasikan oleh seluruh resistor.",
            keyTakeaway: "Keseimbangan daya adalah verifikasi mutlak atas kebenaran perhitungan arus dan tegangan sirkuit.",
            formulaKaTeX: "P_{\\text{sumber}} = \\sum_{i} P_{i} = \\sum_{i} I_i^2 R_i",
            badgeToUnlock: "circuit-master",
          },
        },
      ],
    },
  ],
};
