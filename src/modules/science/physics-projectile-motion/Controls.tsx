"use client";

import React, { useEffect, useRef } from "react";
import { ProjectileCanvasState, computeProjectileMetrics } from "./engine";

interface ControlsProps {
  state: ProjectileCanvasState;
  onChange: (patch: Partial<ProjectileCanvasState>) => void;
}

const PLANETS = [
  { name: "Bumi", g: 9.8 },
  { name: "Bulan", g: 1.6 },
  { name: "Mars", g: 3.7 },
  { name: "Jupiter", g: 24.8 },
];

export function Controls({ state, onChange }: ControlsProps) {
  const animRef = useRef<number | null>(null);

  // Flight animation loop when firing
  useEffect(() => {
    if (!state.isFiring) {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      return;
    }

    const metrics = computeProjectileMetrics({
      angleDegrees: state.angleDegrees,
      v0: state.v0,
      g: state.g,
      h0: state.h0,
    });

    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = (time - startTime) / 1000;
      if (elapsed >= metrics.flightTime) {
        onChange({ animationTime: metrics.flightTime, isFiring: false });
        return;
      }

      onChange({ animationTime: elapsed });
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [state.isFiring, state.angleDegrees, state.v0, state.g, state.h0, onChange]);

  const handleFire = () => {
    onChange({ isFiring: true, animationTime: 0 });
  };

  return (
    <div
      role="region"
      aria-label="Panel Kontrol Parameter Kanon Proyektil"
      className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-xl space-y-4 text-sm"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-neutral-100">Kontrol Peluncuran Kanon</h3>
        <button
          type="button"
          onClick={handleFire}
          disabled={state.isFiring}
          className="px-4 py-1.5 text-xs rounded-xl font-bold transition-all border bg-gradient-to-r from-amber-500 to-orange-500 text-neutral-950 hover:brightness-110 shadow-lg hover:shadow-orange-500/20 active:scale-95 disabled:opacity-50"
        >
          <span>🔥 TEMBAK!</span>
        </button>
      </div>

      {/* Angle Slider */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <label htmlFor="angle-slider" className="text-neutral-300 font-medium">
            Sudut Elevasi (θ):
          </label>
          <span className="font-mono text-cyan-400 font-bold bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
            {Math.round(state.angleDegrees)}°
          </span>
        </div>
        <input
          id="angle-slider"
          type="range"
          min={0}
          max={90}
          step={1}
          value={Math.round(state.angleDegrees)}
          onChange={(e) => onChange({ angleDegrees: Number(e.target.value) })}
          className="w-full accent-cyan-500 h-2 bg-neutral-800 rounded-lg cursor-pointer"
        />
      </div>

      {/* Velocity Slider */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <label htmlFor="v0-slider" className="text-neutral-300 font-medium">
            Kecepatan Awal (v₀):
          </label>
          <span className="font-mono text-amber-400 font-bold bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
            {state.v0} m/s
          </span>
        </div>
        <input
          id="v0-slider"
          type="range"
          min={5}
          max={40}
          step={1}
          value={state.v0}
          onChange={(e) => onChange({ v0: Number(e.target.value) })}
          className="w-full accent-amber-500 h-2 bg-neutral-800 rounded-lg cursor-pointer"
        />
      </div>

      {/* Gravity Planet Presets */}
      <div className="space-y-1.5">
        <span className="text-xs text-neutral-300 font-medium block">
          Medan Gravitasi Planet:
        </span>
        <div className="grid grid-cols-4 gap-1.5">
          {PLANETS.map((p) => {
            const isSelected = Math.abs(state.g - p.g) < 0.1;
            return (
              <button
                key={p.name}
                type="button"
                onClick={() => onChange({ g: p.g })}
                className={`px-2 py-1.5 text-xs rounded-lg font-medium transition-all border ${
                  isSelected
                    ? "bg-cyan-600 text-white border-cyan-400 font-bold shadow"
                    : "bg-neutral-800/80 text-neutral-300 border-neutral-700 hover:bg-neutral-700 hover:text-white"
                }`}
              >
                <div>{p.name}</div>
                <div className="text-[10px] opacity-75 font-mono">{p.g} m/s²</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Target Distance Slider */}
      <div className="space-y-1.5 pt-2 border-t border-neutral-800/80">
        <div className="flex items-center justify-between text-xs">
          <label htmlFor="target-slider" className="text-neutral-300 font-medium">
            Jarak Sasaran Target:
          </label>
          <span className="font-mono text-rose-400 font-bold bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
            {state.targetDistance.toFixed(1)} m
          </span>
        </div>
        <input
          id="target-slider"
          type="range"
          min={15}
          max={70}
          step={1}
          value={state.targetDistance}
          onChange={(e) => onChange({ targetDistance: Number(e.target.value) })}
          className="w-full accent-rose-500 h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
        />
      </div>

      {/* Toggles */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <button
          type="button"
          onClick={() => onChange({ showTrail: !state.showTrail })}
          className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${
            state.showTrail
              ? "bg-cyan-950/80 border-cyan-600 text-cyan-300"
              : "bg-neutral-800/60 border-neutral-700/60 text-neutral-500"
          }`}
        >
          <span>Jejak Parabola</span>
        </button>

        <button
          type="button"
          onClick={() => onChange({ showVectors: !state.showVectors })}
          className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${
            state.showVectors
              ? "bg-purple-950/80 border-purple-600 text-purple-300"
              : "bg-neutral-800/60 border-neutral-700/60 text-neutral-500"
          }`}
        >
          <span>Vektor Kecepatan</span>
        </button>
      </div>
    </div>
  );
}
