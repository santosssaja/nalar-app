"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  AccessibilityPreferences,
  DEFAULT_ACCESSIBILITY_PREFERENCES,
  FontScale,
  ThemeMode,
} from "@/types/accessibility";
import { useLocalStorage, STORAGE_KEYS } from "@/lib/storage";
import { speechManager } from "@/lib/audio/speech";
import { SubtitleBanner } from "@/components/accessibility/SubtitleBanner";

interface AccessibilityContextType {
  preferences: AccessibilityPreferences;
  isSpeaking: boolean;
  activeSubtitle: string | null;
  setTheme: (theme: ThemeMode) => void;
  cycleTheme: () => void;
  toggleHighContrast: () => void;
  setFontScale: (scale: FontScale) => void;
  toggleAudioNarration: () => void;
  setSpeechRate: (rate: number) => void;
  toggleSubtitles: () => void;
  speakText: (text: string) => void;
  stopSpeech: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useLocalStorage<AccessibilityPreferences>(
    STORAGE_KEYS.A11Y_PREFERENCES,
    DEFAULT_ACCESSIBILITY_PREFERENCES
  );
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeSubtitle, setActiveSubtitle] = useState<string | null>(null);

  // Sync with document element attributes for instant CSS styling
  useEffect(() => {
    const root = document.documentElement;

    root.setAttribute("data-theme", preferences.theme);
    root.setAttribute("data-high-contrast", String(preferences.theme === "high-contrast"));
    root.setAttribute("data-font-scale", preferences.fontScale);
  }, [preferences]);

  const triggerThemeTransition = () => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.add("theme-transitioning");
      window.setTimeout(() => {
        document.documentElement.classList.remove("theme-transitioning");
      }, 250);
    }
  };

  const setTheme = useCallback((theme: ThemeMode) => {
    triggerThemeTransition();
    setPreferences((prev) => ({ ...prev, theme }));
  }, [setPreferences]);

  const cycleTheme = useCallback(() => {
    triggerThemeTransition();
    setPreferences((prev) => {
      const nextTheme: ThemeMode =
        prev.theme === "dark"
          ? "light"
          : prev.theme === "light"
          ? "high-contrast"
          : "dark";
      return { ...prev, theme: nextTheme };
    });
  }, [setPreferences]);

  const toggleHighContrast = useCallback(() => {
    triggerThemeTransition();
    setPreferences((prev) => ({
      ...prev,
      theme: prev.theme === "high-contrast" ? "dark" : "high-contrast",
    }));
  }, [setPreferences]);

  const setFontScale = useCallback((fontScale: FontScale) => {
    setPreferences((prev) => ({ ...prev, fontScale }));
  }, [setPreferences]);

  const toggleAudioNarration = useCallback(() => {
    setPreferences((prev) => {
      const next = !prev.audioNarrationEnabled;
      if (!next) {
        speechManager.stop();
        setIsSpeaking(false);
        setActiveSubtitle(null);
      }
      return { ...prev, audioNarrationEnabled: next };
    });
  }, [setPreferences]);

  const setSpeechRate = useCallback((speechRate: number) => {
    setPreferences((prev) => ({ ...prev, speechRate }));
  }, [setPreferences]);

  const toggleSubtitles = useCallback(() => {
    setPreferences((prev) => ({ ...prev, subtitlesEnabled: !prev.subtitlesEnabled }));
  }, [setPreferences]);

  const stopSpeech = useCallback(() => {
    speechManager.stop();
    setIsSpeaking(false);
    setActiveSubtitle(null);
  }, []);

  const speakText = useCallback(
    (text: string) => {
      if (!preferences.audioNarrationEnabled) return;

      if (preferences.subtitlesEnabled) {
        setActiveSubtitle(text);
      }

      speechManager.speak(text, {
        rate: preferences.speechRate,
        onStart: () => setIsSpeaking(true),
        onEnd: () => {
          setIsSpeaking(false);
          setActiveSubtitle(null);
        },
        onError: () => {
          setIsSpeaking(false);
          setActiveSubtitle(null);
        },
      });
    },
    [preferences.audioNarrationEnabled, preferences.speechRate, preferences.subtitlesEnabled]
  );

  return (
    <AccessibilityContext.Provider
      value={{
        preferences,
        isSpeaking,
        activeSubtitle,
        setTheme,
        cycleTheme,
        toggleHighContrast,
        setFontScale,
        toggleAudioNarration,
        setSpeechRate,
        toggleSubtitles,
        speakText,
        stopSpeech,
      }}
    >
      {children}
      <SubtitleBanner subtitle={activeSubtitle} onClose={stopSpeech} />
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider");
  }
  return context;
}
