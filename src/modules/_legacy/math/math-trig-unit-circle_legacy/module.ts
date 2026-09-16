import { TopicModule } from "@/types/topic";
import { computeUnitCircle } from "./engine";

export const trigModule: TopicModule = {
  id: "math-trig-unit-circle",
  slug: "math-trig-unit-circle",
  title: "Lingkaran Satuan Trigonometri",
  category: "math",
  summary:
    "Memahami fungsi trigonometri (sinus, kosinus, dan tangen) sebagai proyeksi koordinat spasial titik pada lingkaran berjari-jari satu.",
  audioNarrationText:
    "Selamat datang di modul Lingkaran Satuan Trigonometri. Kamu akan mempelajari bagaimana segitiga siku-siku bertransformasi menjadi koordinat dinamis pada lingkaran berjari-jari satu.",
  initialVariables: {
    angleDegrees: 45,
  },
  levels: [
    {
      id: "trig-level-1",
      index: 1,
      tier: 1,
      title: "Konsep Dasar Lingkaran Satuan & Koordinat",
      description: "Melihat kosinus dan sinus sebagai proyeksi sumbu horizontal dan vertikal.",
      steps: [
        {
          id: "t1-step-1",
          type: "explanation",
          title: "Analogi Titik Berputar pada Roda",
          explanation: {
            title: "Mengapa Lingkaran Berjari-jari Satu?",
            conceptText:
              "Bayangkan sebuah roda sepeda dengan jari-jari tepat 1 meter. Saat titik pada roda berputar sebesar sudut θ dari sumbu horizontal timur, posisinya dapat dinyatakan sebagai pasangan koordinat (x, y).",
            analogyText:
              "Jarak horizontal titik ke sumbu tegak dinamai kosinus, sedangkan ketinggian vertikalnya dari tanah dinamai sinus. Karena jari-jarinya 1, teorema Pythagoras langsung membuktikan bahwa x² + y² = 1.",
            keyFormulas: [
              "x = \\cos(\\theta)",
              "y = \\sin(\\theta)",
              "\\cos^2(\\theta) + \\sin^2(\\theta) = 1",
            ],
            audioNarrationText:
              "Kosinus adalah koordinat sumbu horizontal x, dan sinus adalah koordinat sumbu vertikal y pada lingkaran satuan.",
          },
        },
        {
          id: "t1-step-2",
          type: "playground",
          title: "Eksplorasi Sudut dan Proyeksi",
          playground: {
            title: "Simulasi Lingkaran Satuan",
            instructions: "Geser slider sudut atau seret titik merah untuk melihat proyeksi garis sinus dan kosinus.",
            interactiveComponentSlug: "math-trig-unit-circle",
            initialVariables: { angleDegrees: 45 },
          },
        },
        {
          id: "t1-step-3",
          type: "challenge",
          title: "Misi: Titik Seimbang (sin = cos)",
          challenge: {
            id: "challenge-trig-1",
            title: "Keseimbangan Sinus dan Kosinus",
            question: "Posisikan sudut θ di Kuadran 1 sehingga nilai sinus sama dengan kosinus (sin θ = cos θ).",
            targetCondition: (vars: Record<string, number>) => {
              const d = ((vars.angleDegrees % 360) + 360) % 360;
              return Math.abs(d - 45) <= 1.5;
            },
            hint1Static: "Pada segitiga siku-siku sama kaki, panjang alas dan tinggi sama besar.",
            hint2Static: "Sudut yang membagi kuadran 90° tepat di tengah adalah 45°.",
            solutionVariables: { angleDegrees: 45 },
            solutionExplanation: "Pada θ = 45°, cos(45°) = sin(45°) = √2/2 ≈ 0.707.",
            xpReward: 30,
          },
        },
        {
          id: "t1-step-4",
          type: "validation",
          title: "Pemahaman Tuntas: Koordinat Lingkaran",
          validation: {
            title: "Koordinat Titik Lingkaran Terkuasai",
            summaryText:
              "Setiap titik pada lingkaran satuan memiliki koordinat (cos θ, sin θ). Identitas Pythagoras sin²(θ) + cos²(θ) = 1 selalu berlaku untuk semua sudut.",
            keyTakeaway: "Koordinat titik P(θ) pada lingkaran r = 1 adalah (cos θ, sin θ).",
            formulaKaTeX: "\\cos^2(\\theta) + \\sin^2(\\theta) = 1",
            badgeToUnlock: "first-step",
          },
        },
      ],
    },
    {
      id: "trig-level-2",
      index: 2,
      tier: 2,
      title: "Misteri Garis Singgung (Tangen)",
      description: "Memahami tangen sebagai rasio perbandingan dan kemiringan garis singgung.",
      steps: [
        {
          id: "t2-step-1",
          type: "explanation",
          title: "Mengapa Dinamakan Tangen?",
          explanation: {
            title: "Tangen Berasal dari Garis Singgung",
            conceptText:
              "Kata tangen berasal dari bahasa Latin 'tangere' yang berarti menyentuh. Jika ditarik garis tegak yang menyinggung lingkaran di x = 1, perpanjangan sinar sudut akan memotong garis tersebut tepat setinggi tan(θ).",
            analogyText:
              "Karena tan(θ) = sin(θ) / cos(θ), saat sudut mendekati 90°, cos(θ) mendekati 0 sehingga nilai tangen melonjak tak terhingga ke atas!",
            keyFormulas: [
              "\\tan(\\theta) = \\frac{\\sin(\\theta)}{\\cos(\\theta)}",
              "\\theta = 90^\\circ \\implies \\cos(90^\\circ) = 0",
            ],
            audioNarrationText:
              "Tangen adalah rasio sinus terhadap kosinus. Saat kosinus bernilai nol, tangen tidak terdefinisi.",
          },
        },
        {
          id: "t2-step-2",
          type: "playground",
          title: "Eksplorasi Garis Singgung Vertikal",
          playground: {
            title: "Laboratorium Garis Tangen",
            instructions: "Aktifkan tampilan tangen dan geser sudut mendekati 90° untuk melihat lonjakan nilai tinggi tangen.",
            interactiveComponentSlug: "math-trig-unit-circle",
            initialVariables: { angleDegrees: 60 },
          },
        },
        {
          id: "t2-step-3",
          type: "challenge",
          title: "Misi: Jebakan Pembagian Nol",
          challenge: {
            id: "challenge-trig-2",
            title: "Titik Tak Terdefinisi Tangen",
            question: "Putar sudut menuju titik di mana nilai tangen tidak terdefinisi akibat pembagian dengan nol.",
            targetCondition: (vars: Record<string, number>) => {
              const metrics = computeUnitCircle(vars.angleDegrees);
              return metrics.isTanUndefined;
            },
            hint1Static: "Tangen bernilai tidak terdefinisi ketika pembaginya (kosinus) sama dengan nol.",
            hint2Static: "Kosinus bernilai nol saat titik berada tepat di kutub atas (90°) atau bawah (270°).",
            solutionVariables: { angleDegrees: 90 },
            solutionExplanation: "Pada 90°, garis radial sejajar dengan garis singgung x = 1 sehingga tidak ada titik potong (tan 90° tak terdefinisi).",
            xpReward: 60,
          },
        },
        {
          id: "t2-step-4",
          type: "validation",
          title: "Pemahaman Tuntas: Perilaku Asimtot Tangen",
          validation: {
            title: "Asimtot Tangen Terkuasai",
            summaryText:
              "Fungsi tangen memiliki asimtot tegak pada θ = 90° + k · 180°. Pada sudut ini, segitiga siku-siku berubah menjadi garis tegak sempurna.",
            keyTakeaway: "tan(θ) = y / x; saat x = 0, nilai tangen tidak terdefinisi.",
            formulaKaTeX: "\\tan(90^\\circ) = \\text{tak terdefinisi}",
          },
        },
      ],
    },
    {
      id: "trig-level-3",
      index: 3,
      tier: 3,
      title: "Kuadran & Tanda Negatif (ASTC)",
      description: "Menjelajahi aturan All-Sin-Tan-Cos di keempat kuadran kartesius.",
      steps: [
        {
          id: "t3-step-1",
          type: "explanation",
          title: "Aturan Tanda di 4 Kuadran",
          explanation: {
            title: "Menghafal Tanda dengan Spasial",
            conceptText:
              "Karena lingkaran berada pada bidang koordinat kartesius dengan sumbu negatif, tanda fungsi trigonometri mengikuti tanda koordinat titik (x, y).",
            analogyText:
              "Di Kuadran 1, semua fungsi bernilai positif (All). Di Kuadran 2, hanya sinus yang positif (+y, -x). Di Kuadran 3, hanya tangen yang positif (-y / -x = +). Di Kuadran 4, hanya kosinus yang positif (+x, -y).",
            keyFormulas: [
              "\\text{K1: Semua (+)}, \\quad \\text{K2: } \\sin (+)",
              "\\text{K3: } \\tan (+), \\quad \\text{K4: } \\cos (+)",
            ],
            audioNarrationText:
              "Aturan tanda kuadran: Semua, Sinus, Tangen, Kosinus. Singkatannya ASTC.",
          },
        },
        {
          id: "t3-step-2",
          type: "playground",
          title: "Uji Coba Titik Lintas Kuadran",
          playground: {
            title: "Eksplorasi Kuadran Lingkaran",
            instructions: "Putar titik melewati kuadran 2, 3, dan 4 untuk melihat perubahan warna dan tanda angka pada rumus reaktif.",
            interactiveComponentSlug: "math-trig-unit-circle",
            initialVariables: { angleDegrees: 150 },
          },
        },
        {
          id: "t3-step-3",
          type: "challenge",
          title: "Misi: Sinus Negatif di Kuadran 3",
          challenge: {
            id: "challenge-trig-3",
            title: "Mencari Sudut Kuadran 3",
            question: "Jelajahi Kuadran 3 dan atur sudut sehingga nilai sinus tepat sama dengan -0.5 (-1/2).",
            targetCondition: (vars: Record<string, number>) => {
              const d = ((vars.angleDegrees % 360) + 360) % 360;
              return d >= 180 && d < 270 && Math.abs(d - 210) <= 2;
            },
            hint1Static: "Kuadran 3 berada pada rentang sudut antara 180° dan 270°.",
            hint2Static: "Sudut relasinya adalah 180° + 30° = 210° karena sin(30°) = 0.5.",
            solutionVariables: { angleDegrees: 210 },
            solutionExplanation: "Di Kuadran 3, koordinat y bernilai negatif. sin(210°) = -sin(30°) = -1/2 = -0.5.",
            xpReward: 100,
          },
        },
        {
          id: "t3-step-4",
          type: "validation",
          title: "Masteri Lengkap: Lingkaran Satuan",
          validation: {
            title: "Selamat! Kamu Menjadi Master Trigonometri",
            summaryText:
              "Kamu telah menguasai konsep inti trigonometri: koordinat titik pada lingkaran satuan, perilaku garis singgung tangen, serta simetri kuadran.",
            keyTakeaway: "Simetri kuadran memungkinkan konversi semua sudut ke sudut lancip di Kuadran 1.",
            formulaKaTeX: "\\sin(180^\\circ + \\theta) = -\\sin(\\theta)",
            badgeToUnlock: "matrix-master",
          },
        },
      ],
    },
  ],
};
