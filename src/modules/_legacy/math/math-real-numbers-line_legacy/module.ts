import { TopicModule } from "@/types/topic";
import { level1 } from "./Level1";
import { level2 } from "./Level2";
import { level3 } from "./Level3";
import { level4 } from "./Level4";
import { level5 } from "./Level5";

export const realNumbersModule: TopicModule = {
  id: "math-real-numbers-line",
  slug: "math-real-numbers-line",
  title: "Operasi Bilangan Riil & Garis Bilangan",
  category: "math",
  summary:
    "Mengubah angka dari sekadar hafalan mati di atas kertas menjadi entitas ruang geometris: posisi, perpindahan vektor 1D, faktor skala dilatasi, kerapatan pecahan tak hingga, dan penemuan bilangan irasional.",
  audioNarrationText:
    "Selamat datang di modul Operasi Bilangan Riil dan Garis Bilangan. Di sini kamu akan menjelajahi angka sebagai pergerakan spasial nyata di atas jalan raya bilangan tak hingga.",
  initialVariables: {
    point1: 3,
    point2: -4,
    scaleFactor: 2,
    sqrtN: 2,
    zoomLevel: 1,
    distribA: 3,
    distribB: 4,
    distribC: 2,
  },
  levels: [level1, level2, level3, level4, level5],
};
