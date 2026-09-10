export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface UserProgressState {
  xp: number;
  completedTopics: string[]; // topic slugs
  solvedChallenges: string[]; // challenge IDs
  unlockedBadges: string[]; // badge IDs
  consecutiveDays: number;
  lastActiveDate: string;
}

export const INITIAL_PROGRESS_STATE: UserProgressState = {
  xp: 0,
  completedTopics: [],
  solvedChallenges: [],
  unlockedBadges: [],
  consecutiveDays: 1,
  lastActiveDate: new Date().toISOString().split("T")[0],
};

export const AVAILABLE_BADGES: Badge[] = [
  {
    id: "first-step",
    title: "Langkah Pertama",
    description: "Menyelesaikan tantangan interaktif pertamamu.",
    icon: "Sparkles",
  },
  {
    id: "matrix-master",
    title: "Penjelajah Matriks",
    description: "Menguasai transformasi ruang 2D dan konsep determinan.",
    icon: "Grid",
  },
  {
    id: "intuition-builder",
    title: "Pembangun Intuisi",
    description: "Mencapai pemahaman konsep tanpa ketergantungan rumus buta.",
    icon: "Brain",
  },
  {
    id: "perseverance",
    title: "Pantang Menyerah",
    description: "Menyelesaikan tantangan setelah meminta petunjuk bertahap.",
    icon: "ShieldAlert",
  },
];
