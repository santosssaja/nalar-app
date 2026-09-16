import { TopicModule } from "@/types/topic";
import { computeRiemannMetrics } from "./engine";

export const riemannModule: TopicModule = {
  id: "math-calculus-riemann",
  slug: "math-calculus-riemann",
  title: "Jumlah Riemann & Kalkulus Integral",
  category: "math",
  summary:
    "Memahami konsep integral tentu sebagai limit akumulasi jumlah luas persegi panjang di bawah kurva fungsi ketika lebar partisi mendekati nol.",
  audioNarrationText:
    "Selamat datang di modul Jumlah Riemann. Kamu akan mempelajari bagaimana luas daerah tak beraturan di bawah kurva dihitung dengan memecahnya menjadi deretan persegi panjang tipis.",
  initialVariables: {
    n: 8,
    a: 0,
    b: 2,
  },
  levels: [
    {
      id: "riemann-level-1",
      index: 1,
      tier: 1,
      title: "Partisi Persegi Panjang & Akumulasi Luas",
      description: "Mendekati luas kurva dengan menjumlahkan luas persegi panjang tipis.",
      steps: [
        {
          id: "r1-step-1",
          type: "explanation",
          title: "Analogi Memotong Roti Tawar Tipis",
          explanation: {
            title: "Bagaimana Mengukur Luas Lengkung?",
            conceptText:
              "Kita tidak punya rumus langsung untuk luas kurva melengkung sembarang, namun kita sangat tahu rumus luas persegi panjang: panjang kali lebar.",
            analogyText:
              "Dengan memotong daerah di bawah kurva menjadi n buah kolom persegi panjang dengan lebar seragam Δx = (b - a)/n, total luas persegi panjang tersebut mendekati luas sebenarnya.",
            keyFormulas: [
              "\\Delta x = \\frac{b - a}{n}",
              "\\text{Luas} \\approx \\sum_{i=1}^n f(x_i^*) \\Delta x",
            ],
            audioNarrationText:
              "Jumlah Riemann membagi bidang lengkung menjadi kolom-kolom persegi panjang sederhana.",
          },
        },
        {
          id: "r1-step-2",
          type: "playground",
          title: "Eksplorasi Partisi Parabola x²",
          playground: {
            title: "Simulasi Partisi Riemann",
            instructions: "Geser slider n untuk menambah jumlah persegi panjang dan amati galat yang mengecil.",
            interactiveComponentSlug: "math-calculus-riemann",
            initialVariables: { n: 8, a: 0, b: 2 },
          },
        },
        {
          id: "r1-step-3",
          type: "challenge",
          title: "Misi: Perkecil Galat Partisi",
          challenge: {
            id: "challenge-riemann-1",
            title: "Partisi n ≥ 30",
            question: "Pada kurva f(x) = x² dari 0 ke 2, naikkan jumlah partisi n ≥ 30 hingga galat relatif di bawah 3%.",
            targetCondition: (vars: Record<string, number>) => {
              const metrics = computeRiemannMetrics("x2", 0, 2, vars.n, "left");
              return vars.n >= 30 && metrics.relErrorPercent < 3.0;
            },
            hint1Static: "Geser slider n ke nilai 30 atau lebih.",
            hint2Static: "Semakin rapat kolom persegi panjang, semakin sedikit celah ruang yang terbuang.",
            solutionVariables: { n: 32 },
            solutionExplanation: "Dengan n = 32, luas akumulasi bernilai sangat dekat dengan nilai analitik 8/3 ≈ 2.667.",
            xpReward: 30,
          },
        },
        {
          id: "r1-step-4",
          type: "validation",
          title: "Pemahaman Tuntas: Akumulasi Kolom",
          validation: {
            title: "Konsep Partisi Dikuasai",
            summaryText:
              "Ketika partisi n bertambah banyak, aproksimasi jumlah Riemann selalu konvergen menuju luas daerah sesungguhnya.",
            keyTakeaway: "Akumulasi luas persegi panjang tipis adalah fondasi utama integral tentu.",
            formulaKaTeX: "\\int_a^b f(x) dx \\approx \\sum_{i=1}^n f(x_i) \\Delta x",
            badgeToUnlock: "first-step",
          },
        },
      ],
    },
    {
      id: "riemann-level-2",
      index: 2,
      tier: 2,
      title: "Perbandingan Metode: Titik Tengah & Trapesium",
      description: "Memilih titik sampel terbaik untuk mempercepat akurasi konvergensi.",
      steps: [
        {
          id: "r2-step-1",
          type: "explanation",
          title: "Kelemahan Metode Kiri & Kanan",
          explanation: {
            title: "Mengapa Memilih Titik Tengah?",
            conceptText:
              "Metode ujung kiri selalu meremehkan luas (underestimate) jika fungsi naik, sedangkan metode ujung kanan melebih-lebihkannya (overestimate).",
            analogyText:
              "Metode Titik Tengah mengambil tinggi di tengah-tengah setiap interval. Bagian persegi panjang yang melebihi kurva secara alami menambal bagian yang kurang, menghasilkan galat jauh lebih kecil!",
            keyFormulas: [
              "x_i^* = \\frac{x_{i-1} + x_i}{2} \\quad (\\text{Titik Tengah})",
              "\\text{Luas Trapesium} = \\frac{f(x_{i-1}) + f(x_i)}{2} \\Delta x",
            ],
            audioNarrationText:
              "Metode titik tengah dan trapesium memberikan akurasi yang jauh lebih tinggi bahkan dengan sedikit partisi.",
          },
        },
        {
          id: "r2-step-2",
          type: "playground",
          title: "Uji Coba 4 Metode Partisi",
          playground: {
            title: "Laboratorium Metode Numerik",
            instructions: "Ganti metode antara Kiri, Kanan, Titik Tengah, dan Trapesium lalu amati perbandingan galatnya.",
            interactiveComponentSlug: "math-calculus-riemann",
            initialVariables: { n: 4, a: 0, b: 2 },
          },
        },
        {
          id: "r2-step-3",
          type: "challenge",
          title: "Misi: Efisiensi Titik Tengah",
          challenge: {
            id: "challenge-riemann-2",
            title: "Akurasi Tinggi pada n = 4",
            question: "Atur jumlah partisi n = 4 dan aktifkan metode Titik Tengah untuk membuktikan keunggulannya.",
            targetCondition: (vars: Record<string, number>) => {
              return vars.n === 4 && vars.method === 2;
            },
            hint1Static: "Posisikan slider n di angka 4.",
            hint2Static: "Pilih tombol metode 'Titik Tengah'. Perhatikan galat yang langsung mengecil drastis.",
            solutionVariables: { n: 4 },
            solutionExplanation: "Pada n = 4, metode Titik Tengah menghasilkan galat di bawah 0.5%, jauh lebih unggul dari metode Kiri.",
            xpReward: 60,
          },
        },
        {
          id: "r2-step-4",
          type: "validation",
          title: "Pemahaman Tuntas: Efisiensi Numerik",
          validation: {
            title: "Metode Numerik Dikuasai",
            summaryText:
              "Metode titik tengah memiliki laju galat kuadratik O(1/n²), sehingga membutuhkan jauh lebih sedikit komputasi dibanding metode biasa O(1/n).",
            keyTakeaway: "Titik tengah menyeimbangkan kelebihan dan kekurangan luas kurva.",
            formulaKaTeX: "\\text{Error}_{\\text{midpoint}} \\propto \\frac{1}{n^2}",
          },
        },
      ],
    },
    {
      id: "riemann-level-3",
      index: 3,
      tier: 3,
      title: "Teorema Dasar Kalkulus & Limit Tak Hingga",
      description: "Menghubungkan akumulasi limit Riemann dengan antiturunan analitik.",
      steps: [
        {
          id: "r3-step-1",
          type: "explanation",
          title: "Lahirnya Integral Tentu",
          explanation: {
            title: "Menuju Partisi Tak Hingga",
            conceptText:
              "Ketika n mendekati tak hingga (n → ∞) dan lebar potongan mendekati nol (Δx → 0), simbol jumlahan Σ bertransformasi menjadi simbol integral ∫.",
            analogyText:
              "Teorema Dasar Kalkulus oleh Leibniz dan Newton membuktikan bahwa luas akumulasi ini dapat dihitung tanpa menjumlahkan persegi panjang satu per satu, melainkan cukup dengan selisih antiturunan F(b) - F(a)!",
            keyFormulas: [
              "\\lim_{n \\to \\infty} \\sum_{i=1}^n f(x_i^*) \\Delta x = \\int_a^b f(x) dx",
              "\\int_a^b f(x) dx = F(b) - F(a) \\quad \\text{di mana } F'(x) = f(x)",
            ],
            audioNarrationText:
              "Limit dari jumlah Riemann ketika partisi mendekati tak hingga adalah definisi sejati dari integral tentu.",
          },
        },
        {
          id: "r3-step-2",
          type: "playground",
          title: "Integrasi Gelombang Sinus",
          playground: {
            title: "Laboratorium Integral Sinus",
            instructions: "Pilih fungsi sin(x) dari 0 ke π dan tekan Animasi n → ∞ untuk melihat konvergensi ke nilai tepat 2.00.",
            interactiveComponentSlug: "math-calculus-riemann",
            initialVariables: { n: 16, a: 0, b: Math.PI },
          },
        },
        {
          id: "r3-step-3",
          type: "challenge",
          title: "Misi: Integralkan Gelombang Sinus",
          challenge: {
            id: "challenge-riemann-3",
            title: "Luas Bukit Gelombang Sinus",
            question: "Integralkan fungsi sin(x) dari 0 ke π dengan galat relatif di bawah 1% (Luas eksak = 2.00).",
            targetCondition: (vars: Record<string, number>) => {
              const metrics = computeRiemannMetrics("sin", 0, Math.PI, vars.n || 20, "midpoint");
              return vars.funcKey === 1 && metrics.relErrorPercent < 1.0;
            },
            hint1Static: "Pilih preset fungsi sin(x) dan gunakan metode Titik Tengah atau Trapesium.",
            hint2Static: "Gunakan partisi n yang cukup rapat (misalnya n ≥ 20) atau tekan tombol Animasi n → ∞.",
            solutionVariables: { n: 30 },
            solutionExplanation: "Integral dari sin(x) pada [0, π] adalah -cos(π) - (-cos(0)) = 1 - (-1) = 2.00.",
            xpReward: 100,
          },
        },
        {
          id: "r3-step-4",
          type: "validation",
          title: "Master Kalkulus Integral",
          validation: {
            title: "Selamat! Kamu Menjadi Master Integral",
            summaryText:
              "Kamu telah menguasai perjalanan lengkap kalkulus integral: dari partisi persegi panjang Riemann, metode titik tengah, hingga Teorema Dasar Kalkulus.",
            keyTakeaway: "Integral tentu adalah jembatan antara jumlah berhingga diskrit dan ruang kontinu.",
            formulaKaTeX: "\\int_0^\\pi \\sin(x) dx = -\\cos(\\pi) - (-\\cos(0)) = 2",
            badgeToUnlock: "polymath",
          },
        },
      ],
    },
  ],
};
