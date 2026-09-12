import React from "react";
import { Volume2, X } from "lucide-react";
import { useAccessibility } from "@/context/AccessibilityContext";

export interface NaiSpeechBubbleProps {
  message: string;
  onClose?: () => void;
  onActionClick?: () => void;
  actionText?: string;
  className?: string;
}

export function NaiSpeechBubble({
  message,
  onClose,
  onActionClick,
  actionText,
  className = "",
}: NaiSpeechBubbleProps) {
  const { speakText, isSpeaking } = useAccessibility();

  return (
    <div
      role="status"
      aria-live="polite"
      className={`relative max-w-xs sm:max-w-sm p-3.5 rounded-2xl bg-neutral-900/95 border border-indigo-500/40 text-neutral-100 shadow-2xl backdrop-blur-md text-xs leading-relaxed animate-fade-in ${className}`}
    >
      {/* Top row: Speaker / close buttons */}
      <div className="flex items-center justify-between gap-2 mb-1.5 pb-1 border-b border-neutral-800">
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-400">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
          <span>Nai</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => speakText(message)}
            className="p-1 rounded-md text-neutral-400 hover:text-indigo-300 hover:bg-neutral-800 transition"
            aria-label="Bacakan pesan Nai dengan suara"
            title="Dengarkan narasi"
          >
            <Volume2 className={`w-3.5 h-3.5 ${isSpeaking ? "text-sky-400 animate-pulse" : ""}`} />
          </button>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
              aria-label="Tutup pesan Nai"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Message content */}
      <p className="text-neutral-200 text-xs sm:text-[13px]">{message}</p>

      {/* Optional action CTA */}
      {actionText && onActionClick && (
        <div className="mt-2.5 pt-2 border-t border-neutral-800 flex justify-end">
          <button
            type="button"
            onClick={onActionClick}
            className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] shadow-sm transition"
          >
            {actionText}
          </button>
        </div>
      )}

      {/* Tail pointing downwards towards Nai */}
      <div
        className="absolute -bottom-2 right-8 w-4 h-4 bg-neutral-900 border-r border-b border-indigo-500/40 rotate-45"
        aria-hidden="true"
      />
    </div>
  );
}
