import { TopicModule } from "@/types/topic";

export const determinant2dModule: TopicModule = {
  id: "math-la-01",
  slug: "linear-algebra-determinant-2d",
  title: "Determinan: Transformasi Luas Ruang 2D",
  category: "math",
  summary:
    "Determinan bukan sekadar rumus ad minus bc yang dihafal mati. Secara geometris, determinan mengukur bagaimana ruang 2D meregang, menyusut, atau terbalik saat ditransformasikan oleh matriks.",
  audioNarrationText:
    "Selamat datang di modul Determinan Matriks 2D. Tarik ujung panah vektor pada kanvas koordinat untuk mengamati bagaimana luas jajaran genjang berubah secara dinamis.",
  initialVariables: {
    a: 2,
    b: 0,
    c: 0,
    d: 2,
  },
  levels: [
    {
      id: "det-level-1",
      index: 1,
      tier: 1,
      title: "Vektor Basis & Luas Ruang",
      description: "Memahami bagaimana dua vektor basis membentuk bidang jajaran genjang.",
      steps: [
        {
          id: "det1-step-1",
          type: "explanation",
          title: "Geometri Vektor Basis",
          explanation: {
            title: "Kotak Satuan yang Berubah Bentuk",
            conceptText:
              "Matriks 2x2 dapat dipandang sebagai instruksi transformasi terhadap dua vektor basis standar: i-topi (1,0) dan j-topi (0,1). Kotak berukuran 1x1 mula-mula bertransformasi menjadi jajaran genjang baru.",
            analogyText: "Bayangkan kain elastis berbentuk persegi. Menarik ujung-ujungnya akan mengubah luas dan kemiringan kain.",
            keyFormulas: [
              "M = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}",
              "\\det(M) = ad - bc",
            ],
            audioNarrationText:
              "Determinan matriks adalah rasio perbesaran luas wilayah setelah ruang mengalami peregangan oleh matriks tersebut.",
          },
        },
        {
          id: "det1-step-2",
          type: "playground",
          title: "Tarik Vektor Basis di Kanvas",
          playground: {
            title: "Playground Transformasi 2D",
            instructions: "Seret ujung vektor u dan v pada kanvas untuk melihat jajaran genjang melebar atau menyempit.",
            interactiveComponentSlug: "linear-algebra-determinant-2d",
            initialVariables: { a: 2, b: 0, c: 0, d: 2 },
          },
        },
        {
          id: "det1-step-3",
          type: "challenge",
          title: "Misi: Luas Ruang Target 4 Satuan",
          challenge: {
            id: "challenge-det-scale",
            title: "Skala Luas Matriks Diagonal",
            question: "Atur matriks sehingga determinan bernilai tepat 4 (contoh: a = 2, b = 0, c = 0, d = 2).",
            targetCondition: (vars) => {
              const det = (vars.a || 0) * (vars.d || 0) - (vars.b || 0) * (vars.c || 0);
              return Math.abs(det - 4) < 0.01;
            },
            hint1Static: "Determinan matriks diagonal dihitung dari perkalian diagonal utama: a x d.",
            hint2Static: "Jika b = 0 dan c = 0, kamu cukup membuat perkalian a x d = 4.",
            solutionVariables: { a: 2, b: 0, c: 0, d: 2 },
            solutionExplanation: "2 x 2 - 0 x 0 = 4. Luas jajaran genjang menjadi 4 kali lipat dari kotak satuan awal.",
            xpReward: 35,
          },
        },
        {
          id: "det1-step-4",
          type: "validation",
          title: "Rangkuman Konsep Level 1",
          validation: {
            title: "Intuisi Determinan Berhasil Ditangkap!",
            summaryText: "Determinan merepresentasikan faktor pengali luas spasial dua dimensi.",
            keyTakeaway: "Luas akhir = Luas awal x |det(M)|.",
            formulaKaTeX: "\\text{Luas}' = |\\det(M)| \\times \\text{Luas}_0",
          },
        },
      ],
    },
    {
      id: "det-level-2",
      index: 2,
      tier: 2,
      title: "Singularitas: Saat Ruang Mengempis ke Satu Garis",
      description: "Menemukan mengapa determinan nol membuat informasi hilang tanpa invers.",
      steps: [
        {
          id: "det2-step-1",
          type: "explanation",
          title: "Kehilangan Dimensi (Collapse)",
          explanation: {
            title: "Mengapa Determinan Nol Tidak Memiliki Invers?",
            conceptText:
              "Jika kedua vektor basis jatuh ke garis yang sama (segaris/kolinier), jajaran genjang mengempis menjadi garis tipis dengan luas nol. Ruang 2D runtuh menjadi 1D!",
            analogyText:
              "Bayangkan memotret benda 3D menjadi foto datar 2D. Kamu tidak bisa memulihkan bayangan di belakang objek karena dimensi telah hilang.",
            keyFormulas: ["\\det(M) = 0 \\implies \\text{Tidak Ada Invers } M^{-1}"],
            audioNarrationText:
              "Saat determinan bernilai nol, luas ruang menjadi nol. Tidak ada transformasi balik yang bisa memekarkan kembali sebuah garis menjadi bidang datar utuh.",
          },
        },
        {
          id: "det2-step-2",
          type: "playground",
          title: "Eksplorasi Vektor Segaris",
          playground: {
            title: "Simulasi Singularitas Garis",
            instructions: "Atur vektor u dan v sehingga keduanya berimpit pada arah yang sama dan amati determinan menjadi 0.",
            interactiveComponentSlug: "linear-algebra-determinant-2d",
            initialVariables: { a: 2, b: 2, c: 1, d: 1 },
          },
        },
        {
          id: "det2-step-3",
          type: "challenge",
          title: "Misi: Runtuhkan Ruang ke Determinan Nol",
          challenge: {
            id: "challenge-det-zero",
            title: "Menciptakan Matriks Singular",
            question: "Atur koefisien sehingga ad - bc = 0 dengan nilai vektor bukan nol (contoh: a=2, b=1, c=4, d=2).",
            targetCondition: (vars) => {
              const det = (vars.a || 0) * (vars.d || 0) - (vars.b || 0) * (vars.c || 0);
              const nonZero = Math.abs(vars.a || 0) + Math.abs(vars.b || 0) > 0.5;
              return nonZero && Math.abs(det) < 0.01;
            },
            hint1Static: "Dua vektor harus memiliki perbandingan rasio yang sama (kelipatan satu sama lain).",
            hint2Static: "Coba samakan perbandingan a/c dengan b/d.",
            solutionVariables: { a: 2, b: 1, c: 4, d: 2 },
            solutionExplanation: "2 x 2 - 1 x 4 = 4 - 4 = 0. Vektor u=(2,4) dan v=(1,2) sejajar segaris.",
            xpReward: 45,
          },
        },
        {
          id: "det2-step-4",
          type: "validation",
          title: "Rangkuman Konsep Level 2",
          validation: {
            title: "Konsep Singularitas Terkuasai!",
            summaryText: "Determinan nol menandakan kebergantungan linear antarvektor kolom pembentuknya.",
            keyTakeaway: "Matriks dengan det = 0 memampatkan seluruh bidang menjadi satu garis atau satu titik.",
            formulaKaTeX: "\\det(M) = 0 \\iff \\vec{u} = k\\vec{v}",
          },
        },
      ],
    },
    {
      id: "det-level-3",
      index: 3,
      tier: 3,
      title: "Orientasi & Determinan Negatif",
      description: "Memahami efek cermin pembalikan orientasi ruang 2D.",
      steps: [
        {
          id: "det3-step-1",
          type: "explanation",
          title: "Refleksi Cermin & Putaran Orientasi",
          explanation: {
            title: "Apa Arti Nilai Determinan Negatif?",
            conceptText:
              "Nilai negatif pada determinan bukan berarti luasnya minus (luas selalu positif). Tanda negatif menunjukkan bahwa orientasi ruang terbalik (seperti melihat dunia lewat cermin).",
            analogyText: "Putaran jarum jam dari vektor u ke vektor v bertukar arah dari berlawanan jarum jam menjadi searah jarum jam.",
            keyFormulas: ["\\det(M) < 0 \\implies \\text{Pembalikan Orientasi (Refleksi)}"],
            audioNarrationText:
              "Ketika orientasi dua vektor bertukar posisi, determinan bertanda negatif untuk menandakan terjadinya pencerminan ruang.",
          },
        },
        {
          id: "det3-step-2",
          type: "playground",
          title: "Eksplorasi Ruang Terbalik",
          playground: {
            title: "Simulasi Refleksi Cermin",
            instructions: "Tukar posisi kuadran vektor u dan v sehingga u berada di sebelah kanan v.",
            interactiveComponentSlug: "linear-algebra-determinant-2d",
            initialVariables: { a: -1, b: 0, c: 0, d: 1 },
          },
        },
        {
          id: "det3-step-3",
          type: "challenge",
          title: "Misi: Determinan Refleksi Negatif",
          challenge: {
            id: "challenge-det-negative",
            title: "Menghasilkan Orientasi Terbalik",
            question: "Atur matriks refleksi sehingga determinan bernilai negatif (Target: det = -2 atau kurang).",
            targetCondition: (vars) => {
              const det = (vars.a || 0) * (vars.d || 0) - (vars.b || 0) * (vars.c || 0);
              return det <= -2;
            },
            hint1Static: "Ubah salah satu nilai diagonal utama menjadi bertanda negatif.",
            hint2Static: "Misal: atur a = -2 dan d = 1, dengan b = 0 dan c = 0.",
            solutionVariables: { a: -2, b: 0, c: 0, d: 1 },
            solutionExplanation: "-2 x 1 - 0 = -2. Bidang dicerminkan terhadap sumbu y dengan perbesaran luas 2 kali.",
            xpReward: 50,
          },
        },
        {
          id: "det3-step-4",
          type: "validation",
          title: "Lencana Penjelajah Matriks Diraih!",
          validation: {
            title: "Selamat! Kamu Telah Menuntaskan Aljabar Linear 2D",
            summaryText:
              "Kamu kini memahami makna fisik perbesaran luas, pemampatan dimensi (singularitas), dan pembalikan orientasi spasial determinan.",
            keyTakeaway: "Besar determinan menentukan skala luas, tanda menentukan orientasi bidang.",
            formulaKaTeX: "\\det(M) = \\text{sgn}(\\text{orientasi}) \\times \\text{Faktor Luas}",
            badgeToUnlock: "matrix-master",
          },
        },
      ],
    },
  ],
};
