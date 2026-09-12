export type RankTitle = "Explorer" | "Navigator" | "Scholar" | "Master";

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category?: "milestone" | "math" | "science" | "streak" | "special";
  unlockedAt?: string;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
}

export interface UserRankInfo {
  title: RankTitle;
  currentXp: number;
  minXp: number;
  nextXp: number;
  progressPercent: number;
}

export interface UserProgressState {
  xp: number;
  completedTopics: string[]; // topic slugs
  solvedChallenges: string[]; // challenge IDs
  unlockedBadges: string[]; // badge IDs
  consecutiveDays: number;
  lastActiveDate: string;
  activityDates?: string[]; // list of dates for activity graph
}

export const INITIAL_PROGRESS_STATE: UserProgressState = {
  xp: 0,
  completedTopics: [],
  solvedChallenges: [],
  unlockedBadges: [],
  consecutiveDays: 1,
  lastActiveDate: new Date().toISOString().split("T")[0],
  activityDates: [new Date().toISOString().split("T")[0]],
};

export const ALL_BADGES: Badge[] = [
  {
    id: "first-step",
    title: "Langkah Pertama",
    description: "Menyelesaikan tantangan logika interaktif pertamamu.",
    icon: "Sparkles",
    category: "milestone",
  },
  {
    id: "modular-master",
    title: "Master Jam Modular",
    description: "Menuntaskan seluruh 3 tingkat aritmetika jam modulo & pola kardioid.",
    icon: "Clock",
    category: "math",
  },
  {
    id: "matrix-master",
    title: "Penjelajah Matriks",
    description: "Menguasai transformasi ruang 2D, singularitas, dan konsep determinan.",
    icon: "Grid",
    category: "math",
  },
  {
    id: "perseverance",
    title: "Pantang Menyerah",
    description: "Menyelesaikan tantangan setelah menggunakan petunjuk bertahap.",
    icon: "ShieldAlert",
    category: "milestone",
  },
  {
    id: "streak-3",
    title: "Konsistensi Api",
    description: "Mempertahankan streak belajar selama 3 hari berturut-turut.",
    icon: "Flame",
    category: "streak",
  },
  {
    id: "polymath",
    title: "Polimatik STEM",
    description: "Menyelesaikan modul di lebih dari satu cabang keilmuan.",
    icon: "Brain",
    category: "special",
  },
];
