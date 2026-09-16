"use client";

import React from "react";
import { degToRad, polarToCartesian } from "./engine";

interface CanvasProps {
  state: { angleDeg: number; radius: number };
  onAngleChange?: (angle: number) => void;
}

export function Canvas({ state, onAngleChange }: CanvasProps) {
  const { angleDeg, radius } = state;
  const rad = degToRad(angleDeg);
  const cosVal = Math.cos(rad);
  const sinVal = Math.sin(rad);

  // Center of unit circle at (180, 110), scale R = 80px
  const cx = 160;
  const cy = 110;
  const R = 80 * radius;

  const px = cx + R * cosVal;
  const py = cy - R * sinVal; // SVG y inverted

  // Sine wave sample points for right panel (300 to 580)
  const wavePoints: string[] = [];
  for (let deg = 0; deg <= 360; deg += 6) {
    const rSample = degToRad(deg);
    const wx = 320 + (deg / 360) * 250;
    const wy = cy - R * Math.sin(rSample);
    wavePoints.push(`${wx.toFixed(1)},${wy.toFixed(1)}`);
  }
  const waveD = `M ${wavePoints.join(" L ")}`;

  const currentWaveX = 320 + (angleDeg / 360) * 250;
  const currentWaveY = cy - R * sinVal;

  return (
    <div className="w-full bg-neutral-950 border border-neutral-800 rounded-2xl p-4 shadow-inner">
      <div className="flex items-center justify-between mb-2 text-xs text-neutral-400">
        <span className="font-mono">Lingkaran Satuan r = 1</span>
        <span className="font-mono text-cyan-400">
          θ = {angleDeg}° | cos(θ) = {cosVal.toFixed(3)} | sin(θ) = {sinVal.toFixed(3)}
        </span>
      </div>

      <svg
        viewBox="0 0 600 220"
        className="w-full h-48 select-none"
        aria-label="Kanvas Trigonometri Lingkaran Satuan & Gelombang Sinus"
        role="img"
      >
        {/* Unit Circle Axes */}
        <line x1={cx - 100} y1={cy} x2={cx + 100} y2={cy} stroke="#404040" strokeWidth="1.5" />
        <line x1={cx} y1={cy - 100} x2={cx} y2={cy + 100} stroke="#404040" strokeWidth="1.5" />

        {/* Unit Circle */}
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="#262626" strokeWidth="2" />

        {/* Cosine line (horizontal, rose) */}
        <line x1={cx} y1={cy} x2={px} y2={cy} stroke="#f43f5e" strokeWidth="3" />

        {/* Sine line (vertical, sky) */}
        <line x1={px} y1={cy} x2={px} y2={py} stroke="#38bdf8" strokeWidth="3" strokeDasharray="3 3" />

        {/* Radius Vector */}
        <line x1={cx} y1={cy} x2={px} y2={py} stroke="#a855f7" strokeWidth="2.5" />

        {/* Moving Point on Circle */}
        <circle cx={px} cy={py} r="6" fill="#a855f7" stroke="#ffffff" strokeWidth="1.5" />

        {/* Connecting line from circle point to sine wave */}
        <line x1={px} y1={py} x2={currentWaveX} y2={currentWaveY} stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />

        {/* Sine Wave Grid & Axis */}
        <line x1="320" y1={cy} x2="580" y2={cy} stroke="#404040" strokeWidth="1.5" />
        <text x="320" y="25" fontSize="11" fill="#737373" fontFamily="monospace">Gelombang y = sin(θ)</text>
        <text x="560" y={cy - 6} fontSize="10" fill="#737373" fontFamily="monospace">360°</text>

        {/* Sine Wave Curve */}
        <path d={waveD} fill="none" stroke="#6366f1" strokeWidth="2" opacity="0.8" />

        {/* Current Sine Wave Dot */}
        {currentWaveX <= 580 && (
          <circle cx={currentWaveX} cy={currentWaveY} r="5" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
        )}
      </svg>
    </div>
  );
}
