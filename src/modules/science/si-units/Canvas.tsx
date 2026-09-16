"use client";

import React from "react";
import { convertLength } from "./engine";

interface CanvasProps {
  state: { lengthMeters: number; timeSeconds: number; targetUnitCode: number };
}

export function Canvas({ state }: CanvasProps) {
  const { lengthMeters, timeSeconds } = state;
  const km = convertLength(lengthMeters, "m", "km");
  const cm = convertLength(lengthMeters, "m", "cm");
  const speed = timeSeconds > 0 ? lengthMeters / timeSeconds : 0;

  return (
    <div className="w-full bg-neutral-950 border border-neutral-800 rounded-2xl p-4 shadow-inner">
      <div className="flex items-center justify-between mb-3 text-xs text-neutral-400">
        <span className="font-mono">Laboratorium Pengukuran SI</span>
        <span className="font-mono text-cyan-400">
          Kelajuan v = {speed.toFixed(2)} m/s | Dimensi: [L][T]⁻¹
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
        {/* Metric Cards */}
        <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl space-y-1">
          <span className="text-[10px] text-neutral-400 uppercase font-semibold">Panjang Baku (SI)</span>
          <div className="text-lg font-mono font-bold text-sky-400">{lengthMeters} m</div>
          <span className="text-[10px] text-neutral-500 font-mono">Dimensi [L]</span>
        </div>

        <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl space-y-1">
          <span className="text-[10px] text-neutral-400 uppercase font-semibold">Waktu Tempuh (SI)</span>
          <div className="text-lg font-mono font-bold text-amber-400">{timeSeconds} s</div>
          <span className="text-[10px] text-neutral-500 font-mono">Dimensi [T]</span>
        </div>

        <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl space-y-1">
          <span className="text-[10px] text-neutral-400 uppercase font-semibold">Konversi Skala Jauh</span>
          <div className="text-lg font-mono font-bold text-emerald-400">{km.toFixed(3)} km</div>
          <span className="text-[10px] text-neutral-500 font-mono">{cm.toLocaleString()} cm</span>
        </div>
      </div>

      <svg
        viewBox="0 0 600 90"
        className="w-full h-24 select-none"
        aria-label="Penggaris Virtual Skala Logaritmik Satuan"
        role="img"
      >
        {/* Measurement Tape Line */}
        <rect x="20" y="20" width="560" height="40" rx="8" fill="#171717" stroke="#38bdf8" strokeWidth="1.5" />
        
        {/* Ticks */}
        {Array.from({ length: 11 }, (_, i) => {
          const x = 30 + i * 54;
          return (
            <g key={i}>
              <line x1={x} y1="20" x2={x} y2="35" stroke="#737373" strokeWidth="1.5" />
              <text x={x} y="48" fontSize="9" fill="#a3a3a3" textAnchor="middle" fontFamily="monospace">
                {( (lengthMeters / 10) * i ).toFixed(0)}m
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
