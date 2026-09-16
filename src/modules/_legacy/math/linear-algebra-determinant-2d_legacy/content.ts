import { TopicLesson } from "@/types/topic";

export const determinantLesson: TopicLesson = {
  id: "math-la-01",
  slug: "linear-algebra-determinant-2d",
  title: "Determinan Matriks: Transformasi Luas Ruang 2D",
  category: "math",
  summary:
    "Pahami determinan bukan sekadar rumus hapalan ad - bc, melainkan sebagai rasio perubahan luas wilayah spasial ketika ruang dua dimensi ditransformasikan oleh matriks.",
  audioNarrationText:
    "Selamat datang di modul Aljabar Linear Nalar. Di sini kamu akan melihat bahwa determinan matriks dua kali dua secara nyata merepresentasikan faktor pengali luas kotak satuan awal. Coba seret ujung panah vektor hijau atau biru pada kisi koordinat, lalu perhatikan bagaimana luas bidang jajaran genjang di tengah berubah.",
  initialVariables: {
    i_hat_x: 1,
    i_hat_y: 0,
    j_hat_x: 0,
    j_hat_y: 1,
  },
  challenges: [
    {
      id: "challenge-det-double",
      title: "Misi 1: Gandakan Luas Wilayah",
      question:
        "Ubah posisi vektor basis sehingga luas wilayah jajaran genjang (determinan) menjadi tepat 2.0 (toleransi ±0.1)!",
      targetCondition: (vars: Record<string, number>) => {
        const det = vars.i_hat_x * vars.j_hat_y - vars.j_hat_x * vars.i_hat_y;
        return Math.abs(det - 2.0) < 0.15;
      },
      hintText:
        "Petunjuk: Kamu bisa melipatgandakan panjang salah satu vektor basis, misalnya atur i_hat_x ke 2 atau j_hat_y ke 2, sementara vektor lainnya tetap 1.",
      successMessage:
        "Luar biasa! Kamu berhasil memperbesar wilayah ruang menjadi 2 kali lipat dari kotak satuan semula. Determinan = 2!",
      xpReward: 30,
    },
    {
      id: "challenge-det-singular",
      title: "Misi 2: Runtuhkan Dimensi (Determinan = 0)",
      question:
        "Atur vektor basis sehingga ruang 2D 'mengempis' menjadi 1 dimensi lurus, menghasilkan determinan tepat 0!",
      targetCondition: (vars: Record<string, number>) => {
        const det = vars.i_hat_x * vars.j_hat_y - vars.j_hat_x * vars.i_hat_y;
        return Math.abs(det) < 0.05;
      },
      hintText:
        "Petunjuk: Ruang 2D gepeng saat kedua vektor basis searah atau segaris (kolinier), misalnya atur i_hat dan j_hat menunjuk ke arah yang sama persis.",
      successMessage:
        "Tepat sekali! Saat kedua vektor segaris, luas jajaran genjang menjadi nol. Ruang 2D kehilangan satu dimensi dan matriks ini tidak memiliki invers!",
      xpReward: 40,
    },
    {
      id: "challenge-det-reflection",
      title: "Misi 3: Cermin Ruang (Determinan Negatif)",
      question:
        "Balikkan orientasi ruang sehingga determinan bernilai negatif (kurang dari -1.0) seperti pantulan cermin!",
      targetCondition: (vars: Record<string, number>) => {
        const det = vars.i_hat_x * vars.j_hat_y - vars.j_hat_x * vars.i_hat_y;
        return det <= -1.0;
      },
      hintText:
        "Petunjuk: Tukar orientasi vektor basis atau putar salah satu vektor melewati garis vektor lainnya (misal: atur i_hat_x menjadi negatif atau tukar sumbunya).",
      successMessage:
        "Hebat! Orientasi ruang berhasil dibalik. Determinan bertanda minus menandakan transformasi refleksi (dunia cermin).",
      xpReward: 50,
    },
  ],
};
