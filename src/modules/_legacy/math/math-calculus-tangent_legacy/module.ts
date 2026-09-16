import { TopicModule } from "@/types/topic";
import { computeTangentMetrics } from "./engine";

export const tangentModule: TopicModule = {
  id: "math-calculus-tangent",
  slug: "math-calculus-tangent",
  title: "Garis Singgung & Turunan Kalkulus",
  category: "math",
  summary:
    "Memahami konsep turunan sebagai limit kemiringan garis sekan yang merapat menjadi garis singgung ketika jarak dua titik mendekati nol.",
  audioNarrationText:
    "Selamat datang di modul Garis Singgung Kalkulus. Kamu akan mempelajari bagaimana kecepatan sesaat lahir dari limit kemiringan rata-rata dua titik yang saling mendekat.",
  initialVariables: {
    a: 1.0,
    deltaX: 1.0,
  },
  levels: [
    {
      id: "tangent-level-1",
      index: 1,
      tier: 1,
      title: "Garis Sekan Menjadi Garis Singgung",
      description: "Melihat laju perubahan rata-rata bertransformasi menjadi laju sesaat.",
      steps: [
        {
          id: "tan1-step-1",
          type: "explanation",
          title: "Analogi Spidometer Mobil",
          explanation: {
            title: "Laju Rata-rata vs Laju Sesaat",
            conceptText:
              "Jika kamu berkendara 60 km dalam 1 jam, kecepatan rata-ratamu adalah 60 km/jam. Namun spidometer menunjukkan angka yang berubah setiap detik di setiap titik perjalanan.",
            analogyText:
              "Garis sekan mengukur kemiringan rata-rata antara dua titik terpisah Δx. Ketika selang waktu Δx didekatkan menuju nol, garis sekan berubah menjadi garis singgung sesaat f'(a).",
            keyFormulas: [
              "m_{\\text{sekan}} = \\frac{f(a+\\Delta x) - f(a)}{\\Delta x}",
              "f'(a) = \\lim_{\\Delta x \\to 0} m_{\\text{sekan}}",
            ],
            audioNarrationText:
              "Kemiringan garis singgung adalah batas laju perubahan rata-rata saat interval waktu mendekati nol.",
          },
        },
        {
          id: "tan1-step-2",
          type: "playground",
          title: "Eksplorasi Kurva Parabola x²",
          playground: {
            title: "Simulasi Garis Singgung Parabola",
            instructions: "Geser posisi titik a dan amati perubahan kemiringan garis tangen oranye.",
            interactiveComponentSlug: "math-calculus-tangent",
            initialVariables: { a: 1.0, deltaX: 1.0 },
          },
        },
        {
          id: "tan1-step-3",
          type: "challenge",
          title: "Misi: Cari Titik Kemiringan 4",
          challenge: {
            id: "challenge-tangent-1",
            title: "Kemiringan Bernilai 4",
            question: "Pada kurva f(x) = x², geser titik a sehingga kemiringan garis singgung bernilai tepat f'(a) = 4.",
            targetCondition: (vars: Record<string, number>) => {
              return Math.abs(vars.a - 2.0) <= 0.1;
            },
            hint1Static: "Fungsi kuadrat x² memiliki turunan f'(x) = 2x.",
            hint2Static: "Persamaan 2x = 4 diselesaikan dengan x = 2.",
            solutionVariables: { a: 2.0, deltaX: 1.0 },
            solutionExplanation: "Turunan f'(x) = 2x. Pada a = 2, f'(2) = 2(2) = 4.",
            xpReward: 30,
          },
        },
        {
          id: "tan1-step-4",
          type: "validation",
          title: "Pemahaman Tuntas: Kemiringan Sesaat",
          validation: {
            title: "Konsep Turunan Sesaat Dikuasai",
            summaryText:
              "Kemiringan kurva di satu titik tunggal didefinisikan secara unik oleh garis singgung yang menyentuh kurva pada titik tersebut tanpa memotongnya secara menyilang.",
            keyTakeaway: "Kemiringan garis singgung di titik a sama dengan nilai turunan pertama f'(a).",
            formulaKaTeX: "f'(a) = \\left. \\frac{df}{dx} \\right|_{x=a}",
            badgeToUnlock: "first-step",
          },
        },
      ],
    },
    {
      id: "tangent-level-2",
      index: 2,
      tier: 2,
      title: "Limit dan Konvergensi Δx → 0",
      description: "Memahami mengapa kalkulus memerlukan konsep limit untuk menghindari pembagian dengan nol.",
      steps: [
        {
          id: "tan2-step-1",
          type: "explanation",
          title: "Jebakan Pembagian Nol",
          explanation: {
            title: "Mengapa Tidak Bisa Langsung Δx = 0?",
            conceptText:
              "Jika kita langsung memasukkan Δx = 0 ke rumus kemiringan, kita akan mendapatkan bentuk tak tentu 0/0 yang tidak bermakna dalam aritmetika biasa.",
            analogyText:
              "Limit memungkinkan kita melihat ke mana tren nilai kemiringan bergerak saat Δx semakin dekat ke nol, tanpa pernah harus membagi dengan angka nol yang dilarang.",
            keyFormulas: [
              "\\frac{f(a+0) - f(a)}{0} = \\frac{0}{0} \\quad (\\text{tidak terdefinisi})",
              "\\lim_{\\Delta x \\to 0} \\frac{(x+\\Delta x)^2 - x^2}{\\Delta x} = 2x",
            ],
            audioNarrationText:
              "Kalkulus menggunakan limit untuk menembus batas pembagian dengan nol.",
          },
        },
        {
          id: "tan2-step-2",
          type: "playground",
          title: "Mengamati Konvergensi Garis",
          playground: {
            title: "Laboratorium Limit Garis Sekan",
            instructions: "Tekan tombol Animasi Limit untuk melihat garis sekan berimpit dengan garis singgung.",
            interactiveComponentSlug: "math-calculus-tangent",
            initialVariables: { a: 1.5, deltaX: 1.8 },
          },
        },
        {
          id: "tan2-step-3",
          type: "challenge",
          title: "Misi: Dekatkan Garis Sekan",
          challenge: {
            id: "challenge-tangent-2",
            title: "Konvergensi Garis Sekan",
            question: "Perkecil jarak interval Δx hingga garis sekan menyatu dengan garis tangen (Δx ≤ 0.05).",
            targetCondition: (vars: Record<string, number>) => {
              return Math.abs(vars.deltaX) <= 0.05;
            },
            hint1Static: "Gunakan tombol petir 'Animasi Δx → 0' atau geser slider Δx ke nilai terkecil.",
            hint2Static: "Perhatikan selisih nilai kemiringan sekan dan tangen yang semakin mendekati 0.",
            solutionVariables: { deltaX: 0.01 },
            solutionExplanation: "Saat Δx ≤ 0.05, garis sekan berimpit dengan garis singgung secara visual.",
            xpReward: 60,
          },
        },
        {
          id: "tan2-step-4",
          type: "validation",
          title: "Pemahaman Tuntas: Definisi Formal Limit",
          validation: {
            title: "Logika Limit Berhasil Dipahami",
            summaryText:
              "Definisi formal turunan oleh Newton dan Leibniz membuktikan bahwa garis singgung adalah keadaan batas yang pasti dari deretan garis sekan.",
            keyTakeaway: "Turunan f'(x) adalah limit selisih terbagi ketika interval menuju nol.",
            formulaKaTeX: "f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}",
          },
        },
      ],
    },
    {
      id: "tangent-level-3",
      index: 3,
      tier: 3,
      title: "Titik Stasioner & Garis Singgung Mendatar",
      description: "Mendeteksi puncak maksimum dan lembah minimum lokal melalui f'(x) = 0.",
      steps: [
        {
          id: "tan3-step-1",
          type: "explanation",
          title: "Keajaiban Garis Singgung Mendatar",
          explanation: {
            title: "Di Mana Puncak dan Lembah Berada?",
            conceptText:
              "Ketika kamu mendaki bukit dan sampai di puncak tertinggi, untuk sesaat jalanan terasa mendatar sebelum menurun kembali. Begitu juga di dasar lembah.",
            analogyText:
              "Pada titik puncak (maksimum lokal) dan titik lembah (minimum lokal), garis singgung selalu mendatar sempurna dengan kemiringan m = 0.",
            keyFormulas: [
              "f'(x) = 0 \\implies \\text{Garis singgung mendatar (horizontal)}",
              "f(x) = x^3 - 3x \\implies f'(x) = 3x^2 - 3 = 0 \\implies x = \\pm 1",
            ],
            audioNarrationText:
              "Titik di mana turunan bernilai nol disebut titik stasioner, tempat terjadinya nilai ekstrem.",
          },
        },
        {
          id: "tan3-step-2",
          type: "playground",
          title: "Uji Fungsi Kubik x³ - 3x",
          playground: {
            title: "Laboratorium Titik Stasioner",
            instructions: "Pilih fungsi x³ - 3x dan geser titik a ke puncak dan lembah untuk melihat garis oranye mendatar.",
            interactiveComponentSlug: "math-calculus-tangent",
            initialVariables: { a: 0.0, deltaX: 0.1 },
          },
        },
        {
          id: "tan3-step-3",
          type: "challenge",
          title: "Misi: Temukan Titik Ekstrem",
          challenge: {
            id: "challenge-tangent-3",
            title: "Mencari Titik Stasioner",
            question: "Pada fungsi kubik f(x) = x³ - 3x, geser titik a ke salah satu titik stasioner di mana f'(a) = 0.",
            targetCondition: (vars: Record<string, number>) => {
              const metrics = computeTangentMetrics("x3_minus_3x", vars.a, vars.deltaX || 0.1);
              return Math.abs(metrics.tangentSlope) <= 0.1;
            },
            hint1Static: "Fungsi x³ - 3x memiliki turunan f'(x) = 3x² - 3.",
            hint2Static: "3x² - 3 = 0 ketika x² = 1, yaitu pada x = 1 atau x = -1.",
            solutionVariables: { a: 1.0 },
            solutionExplanation: "Pada a = 1 (lembah) dan a = -1 (puncak), kemiringan turunan f'(a) bernilai tepat nol.",
            xpReward: 100,
          },
        },
        {
          id: "tan3-step-4",
          type: "validation",
          title: "Master Kalkulus Diferensial",
          validation: {
            title: "Selamat! Kamu Menguasai Fondasi Kalkulus",
            summaryText:
              "Kamu telah memahami bagaimana kemiringan garis sekan memandu kita menemukan garis singgung, memahami limit, dan memanfaatkan turunan untuk optimasi titik ekstrem.",
            keyTakeaway: "Optimasi fungsi ekstrem selalu diawali dengan mencari akar turunan f'(x) = 0.",
            formulaKaTeX: "f'(x_0) = 0 \\implies x_0 \\text{ adalah titik kritis}",
            badgeToUnlock: "polymath",
          },
        },
      ],
    },
  ],
};
