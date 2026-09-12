import React from "react";
import { NaiExpression } from "./nai-sprites";

export interface NaiExpressionsProps {
  expression?: NaiExpression;
  size?: number;
  className?: string;
  isHighContrast?: boolean;
}

export function NaiExpressions({
  expression = "neutral",
  size = 96,
  className = "",
  isHighContrast = false,
}: NaiExpressionsProps) {
  const activeExp = isHighContrast ? "highContrast" : expression;
  const isHC = activeExp === "highContrast";

  // Base palette
  const furPrimary = isHC ? "#000000" : "#d9532f";
  const furDark = isHC ? "#000000" : "#8c2e17";
  const furWhite = isHC ? "#ffffff" : "#fef3c7";
  const noseColor = isHC ? "#ffffff" : "#1c1917";
  const strokeColor = isHC ? "#facc15" : "#3f1e16";
  const strokeWidth = isHC ? 3.5 : 2;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none transition-transform duration-300 ${className} ${
        activeExp === "curious" ? "rotate-6" : ""
      }`}
      role="img"
      aria-hidden="true"
    >
      {/* Glow / Mood aura */}
      {!isHC && (
        <circle
          cx="60"
          cy="64"
          r="48"
          fill={
            activeExp === "celebrating"
              ? "rgba(16, 185, 129, 0.15)"
              : activeExp === "hinting"
              ? "rgba(250, 204, 21, 0.15)"
              : "rgba(99, 102, 241, 0.1)"
          }
          className="animate-pulse"
        />
      )}

      {/* Accessories Behind Head */}
      {activeExp === "hinting" && (
        <g className="animate-bounce" transform="translate(86, 14)">
          <circle cx="10" cy="10" r="9" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
          <path d="M7 19h6M8 22h4" stroke="#ca8a04" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M10 2v3M3 7l2 2M17 7l-2 2" stroke="#eab308" strokeWidth="1.5" strokeLinecap="round" />
          <text x="7" y="14" fontSize="10" fontWeight="bold" fill="#854d0e">!</text>
        </g>
      )}

      {activeExp === "sleeping" && (
        <g className="animate-pulse" transform="translate(86, 12)">
          <text x="0" y="8" fontSize="10" fontWeight="bold" fill="#94a3b8">z</text>
          <text x="6" y="2" fontSize="12" fontWeight="bold" fill="#64748b">Z</text>
        </g>
      )}

      {/* Ears */}
      <g>
        {/* Left Ear */}
        <polygon
          points="24,45 10,14 42,26"
          fill={furDark}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
        <polygon points="23,40 15,19 37,28" fill={furWhite} />

        {/* Right Ear */}
        <polygon
          points="96,45 110,14 78,26"
          fill={furDark}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
        <polygon points="97,40 105,19 83,28" fill={furWhite} />
      </g>

      {/* Head Base */}
      <ellipse
        cx="60"
        cy="65"
        rx="42"
        ry="38"
        fill={furPrimary}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />

      {/* White Cheek & Brow Markings */}
      <ellipse cx="36" cy="74" rx="14" ry="11" fill={furWhite} />
      <ellipse cx="84" cy="74" rx="14" ry="11" fill={furWhite} />
      <ellipse cx="42" cy="48" rx="5" ry="3.5" fill={furWhite} />
      <ellipse cx="78" cy="48" rx="5" ry="3.5" fill={furWhite} />

      {/* Snout */}
      <ellipse
        cx="60"
        cy="75"
        rx="14"
        ry="10"
        fill={furWhite}
        stroke={strokeColor}
        strokeWidth={strokeWidth * 0.7}
      />
      <path
        d="M56 71C56 71 58 74 60 74C62 74 64 71 64 71C64 71 62 69 60 69C58 69 56 71 56 71Z"
        fill={noseColor}
      />

      {/* Eyes by Expression */}
      {activeExp === "happy" || activeExp === "celebrating" ? (
        <g stroke={strokeColor} strokeWidth="3" strokeLinecap="round">
          <path d="M40 60C43 56 49 56 52 60" />
          <path d="M68 60C71 56 77 56 80 60" />
        </g>
      ) : activeExp === "sleeping" ? (
        <g stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round">
          <path d="M40 62H52" />
          <path d="M68 62H80" />
        </g>
      ) : activeExp === "thinking" ? (
        <g>
          <circle cx="46" cy="57" r="4.5" fill={noseColor} />
          <circle cx="74" cy="57" r="4.5" fill={noseColor} />
          <path d="M38 52L49 53" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
          <path d="M71 51L82 48" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
        </g>
      ) : activeExp === "hinting" ? (
        <g>
          <path d="M40 60C43 57 48 57 52 60" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />
          <circle cx="74" cy="59" r="4.5" fill={noseColor} />
          <circle cx="75.5" cy="57.5" r="1.5" fill="#ffffff" />
        </g>
      ) : (
        <g>
          <circle cx="46" cy="59" r="4.5" fill={noseColor} />
          <circle cx="74" cy="59" r="4.5" fill={noseColor} />
          <circle cx="47.5" cy="57.5" r="1.5" fill="#ffffff" />
          <circle cx="75.5" cy="57.5" r="1.5" fill="#ffffff" />
        </g>
      )}

      {/* Glasses for Teaching */}
      {activeExp === "teaching" && (
        <g stroke="#f59e0b" strokeWidth="1.8" fill="none">
          <circle cx="46" cy="59" r="8" />
          <circle cx="74" cy="59" r="8" />
          <line x1="54" y1="59" x2="66" y2="59" />
        </g>
      )}

      {/* Mouth */}
      {activeExp === "celebrating" || activeExp === "happy" ? (
        <path
          d="M55 77C57 82 63 82 65 77"
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="#f43f5e"
        />
      ) : activeExp === "thinking" ? (
        <path
          d="M57 78C60 78 62 76 64 76"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M56 76C58 78 62 78 64 76"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
        />
      )}

      {/* Paws */}
      {activeExp === "celebrating" ? (
        <g>
          <ellipse cx="28" cy="38" rx="8" ry="6" fill={furDark} stroke={strokeColor} strokeWidth={strokeWidth} />
          <ellipse cx="92" cy="38" rx="8" ry="6" fill={furDark} stroke={strokeColor} strokeWidth={strokeWidth} />
        </g>
      ) : activeExp === "thinking" ? (
        <ellipse cx="44" cy="80" rx="7" ry="6" fill={furDark} stroke={strokeColor} strokeWidth={strokeWidth} />
      ) : activeExp === "encouraging" ? (
        <g>
          <ellipse cx="28" cy="74" rx="7" ry="6" fill={furDark} stroke={strokeColor} strokeWidth={strokeWidth} />
          <path d="M26 69V64" stroke={furDark} strokeWidth="3" strokeLinecap="round" />
        </g>
      ) : null}

      {/* Medal for Proud */}
      {activeExp === "proud" && (
        <g transform="translate(52, 90)">
          <path d="M8 0L12 8H4L8 0Z" fill="#3b82f6" />
          <circle cx="8" cy="11" r="6" fill="#fbbf24" stroke="#d97706" strokeWidth="1.2" />
          <text x="6" y="14" fontSize="7" fontWeight="black" fill="#78350f">★</text>
        </g>
      )}
    </svg>
  );
}
