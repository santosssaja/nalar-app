"use client";

import { useEffect, useCallback } from "react";
import confetti from "canvas-confetti";

export interface ConfettiCelebrationProps {
  active?: boolean;
  mode?: "cannon" | "fireworks" | "stars" | "shower";
  duration?: number;
  onComplete?: () => void;
}

export function fireCannonConfetti() {
  try {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#6366f1", "#38bdf8", "#facc15", "#10b981", "#ec4899"],
    });
  } catch (e) {
    console.warn("[Confetti] error:", e);
  }
}

export function fireFireworksConfetti(durationMs = 2500) {
  const animationEnd = Date.now() + durationMs;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

  const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

  const interval = window.setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 40 * (timeLeft / durationMs);
    try {
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.15, 0.4), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.6, 0.85), y: Math.random() - 0.2 },
      });
    } catch {
      clearInterval(interval);
    }
  }, 250);

  return () => clearInterval(interval);
}

export function fireStarConfetti() {
  try {
    confetti({
      particleCount: 60,
      spread: 100,
      origin: { y: 0.5 },
      shapes: ["circle"],
      colors: ["#facc15", "#fbbf24", "#fef08a", "#6366f1"],
    });
  } catch (e) {
    console.warn("[Confetti] error:", e);
  }
}

export function ConfettiCelebration({
  active = true,
  mode = "cannon",
  duration = 2000,
  onComplete,
}: ConfettiCelebrationProps) {
  const trigger = useCallback(() => {
    if (typeof window === "undefined") return;

    if (mode === "fireworks") {
      const cleanup = fireFireworksConfetti(duration);
      const timer = setTimeout(() => {
        onComplete?.();
      }, duration);
      return () => {
        cleanup();
        clearTimeout(timer);
      };
    } else if (mode === "stars") {
      fireStarConfetti();
      const timer = setTimeout(() => onComplete?.(), 1000);
      return () => clearTimeout(timer);
    } else {
      fireCannonConfetti();
      const timer = setTimeout(() => onComplete?.(), 1000);
      return () => clearTimeout(timer);
    }
  }, [mode, duration, onComplete]);

  useEffect(() => {
    if (active) {
      const cleanup = trigger();
      return () => {
        cleanup?.();
      };
    }
  }, [active, trigger]);

  return null;
}
