import { TopicModule } from "@/types/topic";
import { level1 } from "./Level1";
import { level2 } from "./Level2";
import { level3 } from "./Level3";
import { level4 } from "./Level4";
import { level5 } from "./Level5";
import { level6 } from "./Level6";

export const primesCoprimeModule: TopicModule = {
  id: "math-primes-coprime",
  slug: "math-primes-coprime",
  title: "Faktorisasi Prima & Bilangan Koprima",
  category: "math",
  summary:
    "Menyelami partikel dasar pembentuk semesta aritmetika: bilangan prima sebagai atom bilangan bulat, saringan ritmis Eratosthenes, relasi koprima tanpa hambatan faktor bersama, hingga pilar enkripsi data perbankan dunia melalui fungsi Euler dan Teorema Fermat.",
  audioNarrationText:
    "Selamat datang di modul Faktorisasi Prima dan Koprima. Kamu akan membedah bilangan bulat hingga ke atom penyusun dasarnya dan memahami bagaimana bilangan prima mengamankan komunikasi digital dunia.",
  initialVariables: {
    numberN: 12,
    coprimeA: 8,
    coprimeB: 9,
    sieveLimit: 60,
    fermatBase: 3,
    fermatPrime: 7,
  },
  levels: [level1, level2, level3, level4, level5, level6],
};
