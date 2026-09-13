export interface ModuleCardData {
  slug: string;
  title: string;
  category: "math" | "science";
  domain: string;
  badgeLabel: string;
  description: string;
  highlights: string[];
  xpReward: number;
  levelCount: number;
  accentBorder: string;
  accentBadge: "math" | "science" | "default";
}

export const FEATURED_LANDING_MODULES: ModuleCardData[] = [
  {
    slug: "math-real-numbers-line",
    title: "Garis Bilangan Riil & Operasi Translasi",
    category: "math",
    domain: "Fondasi Aljabar",
    badgeLabel: "Fase 1A • Fondasi",
    description:
      "Visualisasikan bilangan sebagai posisi kontinu. Temukan mengapa perkalian adalah dilatasi peregangan dan mengapa minus kali minus menghasilkan plus secara geometris.",
    highlights: ["Translasi Vektor", "Dilatasi Skala", "Sifat Distributif"],
    xpReward: 200,
    levelCount: 5,
    accentBorder: "hover:border-blue-500/50",
    accentBadge: "math",
  },
  {
    slug: "arithmetic-modular-clock",
    title: "Aritmetika Jam & Modulo Siklis",
    category: "math",
    domain: "Teori Bilangan",
    badgeLabel: "Fase 1B • Siklis",
    description:
      "Pahami bilangan bulat sebagai siklus rotasi jam dinding. Amati bagaimana perkalian modular melahirkan kurva kardioid dan struktur generator siklis.",
    highlights: ["Sisa Bagi Modulo", "Pola Busur Kardioid", "Generator Siklis"],
    xpReward: 240,
    levelCount: 6,
    accentBorder: "hover:border-amber-500/50",
    accentBadge: "math",
  },
  {
    slug: "math-euclid",
    title: "Algoritma Euclid & Pengubinan Geometri",
    category: "math",
    domain: "Geometri & Aritmetika",
    badgeLabel: "Fase 1C • Algoritma",
    description:
      "Temukan FPB terbesar melalui pengubinan persegi panjang dengan bujur sangkar sempurna tanpa menghafal faktorisasi pohon faktor konvensional.",
    highlights: ["Pengubinan Persegi", "Reduksi Sisa Bagi", "Pecahan Berlanjut"],
    xpReward: 240,
    levelCount: 6,
    accentBorder: "hover:border-cyan-500/50",
    accentBadge: "math",
  },
  {
    slug: "math-primes-coprime",
    title: "Faktorisasi Prima & Bilangan Koprima",
    category: "math",
    domain: "Kriptografi & Teori Bilangan",
    badgeLabel: "Fase 1D • Kriptografi",
    description:
      "Eksplorasi bilangan prima sebagai balok pembangun aritmetika, temukan garis pandang koprima tanpa rintangan kisi, dan uji teorema Fermat.",
    highlights: ["Susunan Balok Atom", "Saringan Eratosthenes", "Garis Pandang Koprima"],
    xpReward: 240,
    levelCount: 6,
    accentBorder: "hover:border-emerald-500/50",
    accentBadge: "math",
  },
  {
    slug: "physics-projectile-motion",
    title: "Kanon Gerak Proyektil Parabola",
    category: "science",
    domain: "Fisika Kinematika",
    badgeLabel: "Fisika 1A • Mekanika",
    description:
      "Tembakkan meriam virtual pada berbagai elevasi sudut dan gravitasi. Buktikan secara mandiri mengapa sudut 45° menghasilkan jangkauan terjauh di ruang hampa.",
    highlights: ["Dekomposisi Vektor", "Sudut Tembak 45°", "Pengaruh Gravitasi"],
    xpReward: 160,
    levelCount: 4,
    accentBorder: "hover:border-rose-500/50",
    accentBadge: "science",
  },
  {
    slug: "linear-algebra-determinant-2d",
    title: "Determinan: Transformasi Luas Ruang 2D",
    category: "math",
    domain: "Aljabar Linear",
    badgeLabel: "Fase 2A • Spasial",
    description:
      "Tarik ujung vektor basis i-hat dan j-hat pada bidang kartesius. Saksikan bagaimana determinan mengukur rasio ekspansi luas poligon dan orientasi ruang.",
    highlights: ["Vektor Basis Spasial", "Determinan Nol (Singular)", "Refleksi Orientasi"],
    xpReward: 120,
    levelCount: 3,
    accentBorder: "hover:border-indigo-500/50",
    accentBadge: "math",
  },
];
