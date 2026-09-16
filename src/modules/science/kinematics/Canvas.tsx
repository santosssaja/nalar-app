"use client";

import React, { useState, useEffect } from "react";
import {
  projectilePosition2D,
  projectileMaxHeight,
  projectileFlightTime,
  projectileRange,
  position1D,
  velocity1D,
} from "./engine";
import { Play, Pause, RotateCcw } from "lucide-react";

interface CanvasProps {
  state: {
    x0: number;
    y0: number;
    v0: number;
    angleDeg: number;
    g: number;
    a: number;
    t: number;
  };
  onTimeChange?: (t: number) => void;
}

export function Canvas({ state, onTimeChange }: CanvasProps) {
  const { v0, angleDeg, g = 9.8, a = 2 } = state;
  const [simTime, setSimTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const tTotal = projectileFlightTime(v0, angleDeg, g);
  const hMax = projectileMaxHeight(v0, angleDeg, g);
  const range = projectileRange(v0, angleDeg, g);

  // Animation loop with cleanup
  useEffect(() => {
    let animId: number;
    if (isPlaying) {
      const step = () => {
        setSimTime((prev) => {
          const next = prev + 0.05;
          if (next >= tTotal) {
            setIsPlaying(false);
            return tTotal;
          }
          onTimeChange?.(next);
          return next;
        });
        animId = requestAnimationFrame(step);
      };
      animId = requestAnimationFrame(step);
    }
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, tTotal, onTimeChange]);

  // Current projectile coordinates
  const currentPos = projectilePosition2D({
    x0: 0,
    y0: 0,
    v0,
    angleDeg,
    g,
    t: simTime,
  });

  // SVG dimensions: 600 x 240
  const maxViewX = Math.max(50, range * 1.15);
  const maxViewY = Math.max(30, hMax * 1.3);

  const toSvgX = (x: number) => (x / maxViewX) * 540 + 30;
  const toSvgY = (y: number) => 210 - (y / maxViewY) * 170;

  // Trajectory sample points
  const trajectoryPoints: string[] = [];
  const dt = Math.max(0.05, tTotal / 40);
  for (let t = 0; t <= tTotal; t += dt) {
    const pos = projectilePosition2D({ x0: 0, y0: 0, v0, angleDeg, g, t });
    trajectoryPoints.push(`${toSvgX(pos.x).toFixed(1)},${toSvgY(pos.y).toFixed(1)}`);
  }
  const trajD = trajectoryPoints.length > 0 ? `M ${trajectoryPoints.join(" L ")}` : "";

  // Synchronized 1D metrics at simTime
  const pos1DVal = position1D(0, 0, a, simTime);
  const vel1DVal = velocity1D(0, a, simTime);

  return (
    <div className="w-full bg-neutral-950 border border-neutral-800 rounded-2xl p-4 shadow-inner space-y-3">
      {/* Metrics Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs border-b border-neutral-800 pb-2">
        <div className="flex items-center gap-3 font-mono">
          <span className="text-cyan-400 font-bold">t = {simTime.toFixed(2)}s / {tTotal.toFixed(2)}s</span>
          <span className="text-neutral-400">Jangkauan: <b className="text-white">{range.toFixed(1)}m</b></span>
          <span className="text-neutral-400">Tinggi Maks: <b className="text-white">{hMax.toFixed(1)}m</b></span>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1 px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg text-xs transition"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? "Jeda" : "Simulasi"}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setIsPlaying(false);
              setSimTime(0);
              onTimeChange?.(0);
            }}
            className="p-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg transition"
            title="Reset Waktu"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main 2D Flight Canvas */}
      <svg
        viewBox="0 0 600 230"
        className="w-full h-52 select-none"
        aria-label="Simulator Kinematika Proyektil Parabola 2D"
        role="img"
      >
        {/* Ground Line */}
        <line x1="20" y1="210" x2="580" y2="210" stroke="#3f3f46" strokeWidth="2.5" />
        <text x="560" y="225" fontSize="10" fill="#71717a" fontFamily="monospace">x (m)</text>

        {/* Trajectory Path */}
        {trajD && (
          <path
            d={trajD}
            fill="none"
            stroke="#6366f1"
            strokeWidth="2.5"
            strokeDasharray="4 4"
            opacity="0.8"
          />
        )}

        {/* Cannon Base */}
        <polygon points="20,210 40,210 30,195" fill="#52525b" />
        <circle cx="30" cy="195" r="5" fill="#71717a" />

        {/* Moving Projectile Ball */}
        <circle
          cx={toSvgX(currentPos.x)}
          cy={toSvgY(currentPos.y)}
          r="8"
          fill="#38bdf8"
          stroke="#0284c7"
          strokeWidth="2"
          className="shadow-lg"
        />

        {/* Velocity vector arrow indicator */}
        <line
          x1={toSvgX(currentPos.x)}
          y1={toSvgY(currentPos.y)}
          x2={toSvgX(currentPos.x) + 20 * Math.cos((angleDeg * Math.PI) / 180)}
          y2={toSvgY(currentPos.y) - 20 * Math.sin((angleDeg * Math.PI) / 180)}
          stroke="#38bdf8"
          strokeWidth="2"
        />
      </svg>

      {/* Synchronized 1D Motion Graphs Summary (docs/new-module.md Section 7) */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-neutral-800 text-[11px] font-mono">
        <div className="p-2 bg-neutral-900 border border-neutral-800 rounded-lg text-center">
          <span className="text-neutral-400 block text-[10px]">Posisi 1D x(t)</span>
          <span className="font-bold text-sky-400">{pos1DVal.toFixed(1)} m</span>
        </div>
        <div className="p-2 bg-neutral-900 border border-neutral-800 rounded-lg text-center">
          <span className="text-neutral-400 block text-[10px]">Kecepatan v(t)</span>
          <span className="font-bold text-emerald-400">{vel1DVal.toFixed(1)} m/s</span>
        </div>
        <div className="p-2 bg-neutral-900 border border-neutral-800 rounded-lg text-center">
          <span className="text-neutral-400 block text-[10px]">Percepatan a</span>
          <span className="font-bold text-amber-400">{a} m/s²</span>
        </div>
      </div>
    </div>
  );
}
