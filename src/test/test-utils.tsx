import React from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { vi } from "vitest";

const mockGamificationContext = {
  progress: {
    xp: 0,
    level: 1,
    badges: [],
    unlockedBadges: [],
    solvedChallenges: [],
    activityDates: [],
    lastActiveDate: new Date().toISOString(),
    streak: 0,
  },
  rankInfo: { title: "Pemula", minXP: 0, maxXP: 100 },
  addXP: vi.fn(),
  completeChallenge: vi.fn(),
  unlockBadge: vi.fn(),
  resetProgress: vi.fn(),
};

const mockAccessibilityContext = {
  speakText: vi.fn(),
  isSpeaking: false,
  highContrast: false,
  toggleHighContrast: vi.fn(),
  reducedMotion: false,
  toggleReducedMotion: vi.fn(),
  fontSize: "normal",
  setFontSize: vi.fn(),
};

vi.mock("@/context/GamificationContext", () => ({
  useGamification: () => mockGamificationContext,
  GamificationProvider: ({ children }: { children: React.ReactNode }) => children,
}));

const mockLearnerContext = {
  learnerState: {
    topicMastery: {},
    completedTopics: [],
    completedActivities: [],
    attemptHistory: [],
    mistakes: [],
    hintsUsedCount: {},
    lastActivity: {
      topicId: "math-real-numbers",
      topicTitle: "Operasi Bilangan Riil & Garis Bilangan",
      activityType: "explore",
      route: "/topics/math-real-numbers",
      timestamp: new Date().toISOString(),
    },
    learningMode: "learn",
    labNotebook: [],
  },
  learningMode: "learn",
  setLearningMode: vi.fn(),
  updateTopicMastery: vi.fn(),
  recordActivity: vi.fn(),
  recordMistake: vi.fn(),
  recordHintUsed: vi.fn(),
  saveLabNotebookEntry: vi.fn(),
  resetLearnerData: vi.fn(),
  overallMastery: { conceptual: 0, procedural: 0, reasoning: 0, problemSolving: 0, transfer: 0, overall: 0 },
  recommendedTopic: {
    id: "math-real-numbers",
    slug: "math-real-numbers",
    title: "Operasi Bilangan Riil & Garis Bilangan",
    subject: "math",
    domain: "arithmetic",
    level: 1,
    stage: "explorer",
    phase: "mvp",
    summary: "Garis bilangan",
    description: "Deskripsi",
    audioNarrationText: "",
    prerequisites: [],
    unlocks: ["math-elementary-algebra"],
    learningObjectives: [],
    concepts: [],
    sections: [],
    xpReward: 100,
    isAvailable: true,
    route: "/topics/math-real-numbers",
    position: { x: 0, y: 0 },
  },
  isUnlocked: vi.fn((id: string) => id === "math-real-numbers"),
};

vi.mock("@/context/LearnerContext", () => ({
  useLearnerModel: () => mockLearnerContext,
  LearnerProvider: ({ children }: { children: React.ReactNode }) => children,
}));

vi.mock("@/context/AccessibilityContext", () => ({
  useAccessibility: () => mockAccessibilityContext,
  AccessibilityProvider: ({ children }: { children: React.ReactNode }) => children,
}));

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("lucide-react", () => {
  const iconNames = [
    "Activity", "AlertCircle", "ArrowLeft", "ArrowRight", "ArrowUpRight",
    "Atom", "Award", "BookOpen", "Bot", "Brain", "Calculator", "Calendar",
    "Check", "CheckCircle2", "ChevronRight", "ChevronUp", "Clock", "Compass",
    "Disc", "Dna", "Download", "Eye", "EyeOff", "FileText", "Filter", "Flame",
    "FlaskConical", "Gamepad2", "Grid", "HelpCircle", "Home", "Info",
    "Keyboard", "Layers", "LayoutGrid", "Lightbulb", "Link2", "Lock", "LockOpen",
    "LogIn", "LogOut", "Mail", "Map", "Menu", "MessageCircle", "Minus", "Moon",
    "Network", "Play", "PlayCircle", "Radio", "RefreshCw", "RotateCcw", "Search",
    "Send", "ShieldAlert", "ShieldCheck", "Sliders", "Sparkles", "Star",
    "Subtitles", "Sun", "Table", "TableIcon", "Target", "Trophy", "Type",
    "Upload", "User", "Volume2", "VolumeX", "Wand2", "Waves", "Wifi", "WifiOff",
    "XCircle", "Zap", "ZoomIn", "ZoomOut",
  ];
  const mock: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {};
  for (const name of iconNames) {
    const Icon = (props: React.SVGProps<SVGSVGElement>) => <svg data-testid={`icon-${name}`} {...props} />;
    Icon.displayName = name;
    mock[name] = Icon;
  }
  return mock;
});

export function renderWithProviders(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) {
  return render(ui, options);
}

export { mockGamificationContext, mockAccessibilityContext, mockLearnerContext };
