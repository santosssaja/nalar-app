"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  AccessibilityPreferences,
  DEFAULT_ACCESSIBILITY_PREFERENCES,
  FontScale,
  ThemeMode,
} from "@/types/accessibility";
import { getStoredItem, setStoredItem, STORAGE_KEYS } from "@/lib/storage";
import { speechManager } from "@/lib/audio/speech";

interface AccessibilityContextType {
  preferences: AccessibilityPreferences;
  isSpeaking: boolean;
  activeSubtitle: string | null;
  setTheme: (theme: ThemeMode) => void;
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
  const [preferences, setPreferences] = useState<AccessibilityPreferences>(() => {
    return getStoredItem<AccessibilityPreferences>(
      STORAGE_KEYS.A11Y_PREFERENCES,
      DEFAULT_ACCESSIBILITY_PREFERENCES
    );
  });
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeSubtitle, setActiveSubtitle] = useState<string | null>(null);

  // Sync with document element attributes for instant CSS styling
  useEffect(() => {
    const root = document.documentElement;

    root.setAttribute("data-theme", preferences.theme);
    root.setAttribute("data-high-contrast", String(preferences.theme === "high-contrast"));
    root.setAttribute("data-font-scale", preferences.fontScale);

    setStoredItem(STORAGE_KEYS.A11Y_PREFERENCES, preferences);
  }, [preferences]);

  const setTheme = useCallback((theme: ThemeMode) => {
    setPreferences((prev) => ({ ...prev, theme }));
  }, []);

  const toggleHighContrast = useCallback(() => {
    setPreferences((prev) => ({
      ...prev,
      theme: prev.theme === "high-contrast" ? "dark" : "high-contrast",
    }));
  }, []);

  const setFontScale = useCallback((fontScale: FontScale) => {
    setPreferences((prev) => ({ ...prev, fontScale }));
  }, []);

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
  }, []);

  const setSpeechRate = useCallback((speechRate: number) => {
    setPreferences((prev) => ({ ...prev, speechRate }));
  }, []);

  const toggleSubtitles = useCallback(() => {
    setPreferences((prev) => ({ ...prev, subtitlesEnabled: !prev.subtitlesEnabled }));
  }, []);

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
      {/* Visual Subtitle banner for deaf / hard-of-hearing users */}
      {activeSubtitle && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-xl w-[90vw] px-4 py-3 rounded-xl bg-neutral-900/95 border border-amber-400 text-amber-200 shadow-2xl backdrop-blur-md text-sm font-medium flex items-center gap-3 animate-fade-in"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping shrink-0" />
          <p className="flex-1">{activeSubtitle}</p>
          <button
            type="button"
            onClick={stopSpeech}
            className="text-xs px-2 py-1 bg-neutral-800 hover:bg-neutral-700 rounded text-neutral-300 transition"
            aria-label="Tutup takarir suara"
          >
            Tutup
          </button>
        </div>
      )}
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
