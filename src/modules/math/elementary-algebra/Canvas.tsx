"use client";

import React from "react";
import { isScaleBalanced } from "./engine";

interface CanvasProps {
  state: { a: number; b: number; c: number; x: number };
  onXChange?: (newX: number) => void;
}

export function Canvas({ state, onXChange }: CanvasProps) {
  const { a, b, c, x } = state;
  const leftWeight = a * x + b;
  const rightWeight = c;
  const diff = leftWeight - rightWeight;
  const balanced = isScaleBalanced(leftWeight, rightWeight);

  // Tilt angle between -20 and +20 degrees
  const tiltDeg = Math.max(-20, Math.min(20, (leftWeight - rightWeight) * 2.5));

  return (
    <div className="w-full bg-neutral-950 border border-neutral-800 rounded-2xl p-4 shadow-inner">
      <div className="flex items-center justify-between mb-3 text-xs text-neutral-400">
        <span className="font-mono">Timbangan Kesetaraan Aljabar</span>
        <span
          className={`font-mono font-bold px-2 py-0.5 rounded-full ${
            balanced
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
              : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
          }`}
        >
          {balanced
            ? "SETIMBANG (ax + b = c)"
            : diff > 0
            ? "Kiri Lebih Berat"
            : "Kanan Lebih Berat"}
        </span>
      </div>

      <svg
        viewBox="0 0 600 220"
        className="w-full h-48 select-none"
        aria-label="Kanvas Timbangan Aljabar Interaktif"
        role="img"
      >
        {/* Fulcrum base triangle */}
        <polygon points="300,120 280,180 320,180" fill="#404040" stroke="#525252" strokeWidth="2" />
        <line x1="240" y1="180" x2="360" y2="180" stroke="#525252" strokeWidth="4" strokeLinecap="round" />

        {/* Pivot pin */}
        <circle cx="300" cy="120" r="6" fill="#6366f1" stroke="#4f46e5" strokeWidth="2" />

        {/* Rotating beam */}
        <g transform={`rotate(${tiltDeg}, 300, 120)`} className="transition-transform duration-300 ease-out">
          {/* Main beam line */}
          <line x1="120" y1="120" x2="480" y2="120" stroke="#737373" strokeWidth="6" strokeLinecap="round" />

          {/* Left Pan Attachment */}
          <line x1="150" y1="120" x2="150" y2="160" stroke="#525252" strokeWidth="2" />
          <polygon points="110,165 190,165 180,175 120,175" fill="#38bdf8" opacity="0.9" />

          {/* Left Pan Content */}
          <text x="150" y="155" textAnchor="middle" fontSize="12" fill="#e0f2fe" fontWeight="bold">
            {a}x + {b} = {leftWeight.toFixed(1)}
          </text>

          {/* Right Pan Attachment */}
          <line x1="450" y1="120" x2="450" y2="160" stroke="#525252" strokeWidth="2" />
          <polygon points="410,165 490,165 480,175 420,175" fill="#fbbf24" opacity="0.9" />

          {/* Right Pan Content */}
          <text x="450" y="155" textAnchor="middle" fontSize="12" fill="#fef3c7" fontWeight="bold">
            {c}
          </text>
        </g>

        {/* Dynamic Formula Display */}
        <g transform="translate(300, 40)">
          <rect x="-140" y="-22" width="280" height="34" rx="10" fill="#18181b" stroke="#27272a" />
          <text x="0" y="0" textAnchor="middle" fontSize="13" fill="#f4f4f5" fontFamily="monospace">
            {a}·({x}) + {b} {balanced ? "=" : "≠"} {c}
          </text>
        </g>
      </svg>
    </div>
  );
}
