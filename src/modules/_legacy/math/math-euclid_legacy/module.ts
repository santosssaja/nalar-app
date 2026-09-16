import { TopicModule } from "@/types/topic";
import { level1 } from "./Level1";
import { level2 } from "./Level2";
import { level3 } from "./Level3";
import { level4 } from "./Level4";
import { level5 } from "./Level5";
import { level6 } from "./Level6";

export const euclidModule: TopicModule = {
  id: "math-euclid",
  slug: "math-euclid",
  title: "Algoritma Euclid & Pengubinan FPB",
  category: "math",
  summary:
    "Memvisualisasikan pencarian Faktor Persekutuan Terbesar (FPB) melalui pengubinan geometris lantai persegi panjang dengan bujur sangkar terbesar secara rekursif hingga bersisa nol.",
  audioNarrationText:
    "Selamat datang di modul Algoritma Euclid. Kamu akan mempelajari bagaimana pembagian bersisa dapat divisualisasikan sebagai pengubinan lantai geometris tanpa perlu menghafal pohon faktor.",
  initialVariables: {
    width: 84,
    height: 52,
  },
  levels: [level1, level2, level3, level4, level5, level6],
};
