export type NaiHintMood = "encouraging" | "thinking" | "hinting" | "teaching";

export interface UserAttemptSnapshot {
  attemptNumber: number;
  canvasSnapshot: Record<string, number>;
}

export interface HintRequest {
  topicSlug: string;
  levelIndex: number;
  challengeId: string;
  challengeQuestion: string;
  userAttempts: UserAttemptSnapshot[];
  hintLevel: 1 | 2 | 3 | 4;
  userAge?: string;
}

export interface HintResponse {
  hintLevel: 1 | 2 | 3 | 4;
  naiMood: NaiHintMood;
  title: string;
  text: string;
  targetVariables?: Record<string, number>; // Coordinates for auto-movement (Hint 4)
  isAutoSolved?: boolean;
  source: "static" | "ai" | "mock";
}
