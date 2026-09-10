export type ThemeMode = "dark" | "high-contrast" | "light";
export type FontScale = "normal" | "large" | "extra-large";

export interface AccessibilityPreferences {
  theme: ThemeMode;
  fontScale: FontScale;
  audioNarrationEnabled: boolean;
  speechRate: number; // 0.8 to 1.4
  subtitlesEnabled: boolean;
  reducedMotion: boolean;
}

export const DEFAULT_ACCESSIBILITY_PREFERENCES: AccessibilityPreferences = {
  theme: "dark",
  fontScale: "normal",
  audioNarrationEnabled: false,
  speechRate: 1.0,
  subtitlesEnabled: true,
  reducedMotion: false,
};
