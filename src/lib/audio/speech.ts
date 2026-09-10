/**
 * Web Speech API native synthesis wrapper.
 * Provides accessible, zero-latency audio narration without external library overhead.
 */

export interface SpeechOptions {
  rate?: number;
  pitch?: number;
  lang?: string;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: unknown) => void;
}

class WebSpeechManager {
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  public isAvailable(): boolean {
    return typeof window !== "undefined" && "speechSynthesis" in window;
  }

  public speak(text: string, options: SpeechOptions = {}): void {
    if (!this.isAvailable()) {
      options.onEnd?.();
      return;
    }

    this.stop();

    if (!text || text.trim().length === 0) {
      options.onEnd?.();
      return;
    }

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = options.rate ?? 1.0;
      utterance.pitch = options.pitch ?? 1.0;

      // Prefer Indonesian voice if available, otherwise browser default
      const voices = window.speechSynthesis.getVoices();
      const idVoice = voices.find((v) => v.lang.startsWith("id") || v.lang.includes("ID"));
      if (idVoice) {
        utterance.voice = idVoice;
        utterance.lang = "id-ID";
      } else {
        utterance.lang = options.lang ?? "id-ID";
      }

      utterance.onstart = () => {
        options.onStart?.();
      };

      utterance.onend = () => {
        this.currentUtterance = null;
        options.onEnd?.();
      };

      utterance.onerror = (e) => {
        this.currentUtterance = null;
        options.onError?.(e);
        options.onEnd?.();
      };

      this.currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn("[Speech] Failed to speak:", err);
      options.onEnd?.();
    }
  }

  public stop(): void {
    if (!this.isAvailable()) return;
    try {
      window.speechSynthesis.cancel();
      this.currentUtterance = null;
    } catch (e) {
      console.warn("[Speech] Failed to cancel:", e);
    }
  }

  public isSpeaking(): boolean {
    if (!this.isAvailable()) return false;
    return window.speechSynthesis.speaking;
  }
}

export const speechManager = new WebSpeechManager();
