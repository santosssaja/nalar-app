import { TopicModule } from "@/types/topic";
import { level1 } from "./Level1";
import { level2 } from "./Level2";
import { level3 } from "./Level3";
import { level4 } from "./Level4";
import { level5 } from "./Level5";
import { level6 } from "./Level6";

export const modularClockModule: TopicModule = {
  id: "math-nt-01",
  slug: "arithmetic-modular-clock",
  title: "Aritmetika Jam (Modulo) & Siklus Bilangan",
  category: "math",
  summary:
    "Bayangkan bilangan yang bergerak melingkar seperti jarum jam dinding. Aritmetika modular mengajarkan bahwa bilangan tidak harus selalu bertambah tanpa batas, melainkan berulang dalam siklus teratur yang melahirkan invers modular, enkripsi data perbankan, dan seni geometri kardioid menakjubkan.",
  audioNarrationText:
    "Selamat datang di modul Aritmetika Jam dan Teori Bilangan Elementer. Di sini kamu akan memahami operasi modulo secara intuitif layaknya waktu pada jam dinding hingga membuka gerbang kriptografi modern.",
  initialVariables: {
    n: 12,
    multiplier: 2,
    hourA: 9,
    hourB: 7,
  },
  levels: [level1, level2, level3, level4, level5, level6],
};
