"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";
import { NaiExpression } from "./nai-sprites";
import { useAccessibility } from "@/context/AccessibilityContext";

export interface SayOptions {
  expression?: NaiExpression;
  actionText?: string;
  onAction?: () => void;
  autoDismissMs?: number;
  readAloud?: boolean;
}

export interface NaiContextType {
  expression: NaiExpression;
  message: string | null;
  actionText: string | null;
  onAction: (() => void) | null;
  isMinimized: boolean;
  isHidden: boolean;
  setExpression: (exp: NaiExpression) => void;
  say: (message: string, options?: SayOptions) => void;
  clearMessage: () => void;
  toggleMinimize: () => void;
  toggleHide: () => void;
}

const NaiContext = createContext<NaiContextType | undefined>(undefined);

function getInitialNaiPrefs(): { isMinimized: boolean; isHidden: boolean } {
  if (typeof window === "undefined") {
    return { isMinimized: false, isHidden: false };
  }
  try {
    const stored = localStorage.getItem("nalar_nai_prefs_v1");
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        isMinimized: typeof parsed.isMinimized === "boolean" ? parsed.isMinimized : false,
        isHidden: typeof parsed.isHidden === "boolean" ? parsed.isHidden : false,
      };
    }
  } catch (e) {
    console.warn("Could not read Nai preferences:", e);
  }
  return { isMinimized: false, isHidden: false };
}

export function NaiProvider({ children }: { children: React.ReactNode }) {
  const [expression, setExpression] = useState<NaiExpression>("neutral");
  const [message, setMessage] = useState<string | null>(null);
  const [actionText, setActionText] = useState<string | null>(null);
  const [onAction, setOnAction] = useState<(() => void) | null>(null);
  const [isMinimized, setIsMinimized] = useState<boolean>(() => getInitialNaiPrefs().isMinimized);
  const [isHidden, setIsHidden] = useState<boolean>(() => getInitialNaiPrefs().isHidden);

  const { speakText } = useAccessibility();

  const savePrefs = (min: boolean, hid: boolean) => {
    try {
      localStorage.setItem(
        "nalar_nai_prefs_v1",
        JSON.stringify({ isMinimized: min, isHidden: hid })
      );
    } catch (e) {
      console.warn("Could not write Nai preferences:", e);
    }
  };

  const clearMessage = useCallback(() => {
    setMessage(null);
    setActionText(null);
    setOnAction(null);
  }, []);

  const say = useCallback(
    (text: string, options?: SayOptions) => {
      setMessage(text);
      if (options?.expression) {
        setExpression(options.expression);
      }
      if (options?.actionText && options?.onAction) {
        setActionText(options.actionText);
        setOnAction(() => options.onAction);
      } else {
        setActionText(null);
        setOnAction(null);
      }

      if (options?.readAloud) {
        speakText(text);
      }

      if (options?.autoDismissMs) {
        window.setTimeout(() => {
          setMessage((cur) => (cur === text ? null : cur));
        }, options.autoDismissMs);
      }
    },
    [speakText]
  );

  const toggleMinimize = useCallback(() => {
    setIsMinimized((prev) => {
      const next = !prev;
      savePrefs(next, isHidden);
      return next;
    });
  }, [isHidden]);

  const toggleHide = useCallback(() => {
    setIsHidden((prev) => {
      const next = !prev;
      savePrefs(isMinimized, next);
      return next;
    });
  }, [isMinimized]);

  return (
    <NaiContext.Provider
      value={{
        expression,
        message,
        actionText,
        onAction,
        isMinimized,
        isHidden,
        setExpression,
        say,
        clearMessage,
        toggleMinimize,
        toggleHide,
      }}
    >
      {children}
    </NaiContext.Provider>
  );
}

export function useNai() {
  const context = useContext(NaiContext);
  if (!context) {
    throw new Error("useNai must be used within a NaiProvider");
  }
  return context;
}
