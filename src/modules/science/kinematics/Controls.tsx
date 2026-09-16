"use client";

import React from "react";

interface ControlsProps {
  state: {
    x0: number;
    y0: number;
    v0: number;
    angleDeg: number;
    g: number;
    a: number;
    t: number;
  };
  onChange: (newState: {
    x0: number;
    y0: number;
    v0: number;
    angleDeg: number;
    g: number;
    a: number;
    t: number;
  }) => void;
}

export function Controls({ state, onChange }: ControlsProps) {
  const update = (
    field: "v0" | "angleDeg" | "a" | "g",
    val: number
  ) => {
    onChange({ ...state, [field]: val });
  };

  return (
    <div className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-4 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Initial Velocity v0 */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <label htmlFor="ctrl-v0" className="text-sky-400 font-semibold">
              Kecepatan Awal v₀: {state.v0} m/s
            </label>
            <span className="text-neutral-500 font-mono">[5, 40]</span>
          </div>
          <input
            id="ctrl-v0"
            type="range"
            min="5"
            max="40"
            step="1"
            value={state.v0}
            onChange={(e) => update("v0", parseFloat(e.target.value))}
            className="w-full accent-sky-400 cursor-pointer h-1.5 bg-neutral-800 rounded-lg appearance-none"
            aria-label="Kecepatan Awal v0"
          />
        </div>

        {/* Projectile Angle */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <label htmlFor="ctrl-ang" className="text-indigo-400 font-semibold">
              Sudut Elevasi θ: {state.angleDeg}°
            </label>
            <span className="text-neutral-500 font-mono">[15°, 85°]</span>
          </div>
          <input
            id="ctrl-ang"
            type="range"
            min="15"
            max="85"
            step="5"
            value={state.angleDeg}
            onChange={(e) => update("angleDeg", parseFloat(e.target.value))}
            className="w-full accent-indigo-400 cursor-pointer h-1.5 bg-neutral-800 rounded-lg appearance-none"
            aria-label="Sudut Elevasi Derajat"
          />
        </div>

        {/* 1D Acceleration a */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <label htmlFor="ctrl-acc" className="text-amber-400 font-semibold">
              Percepatan GLBB a: {state.a} m/s²
            </label>
            <span className="text-neutral-500 font-mono">[0, 8]</span>
          </div>
          <input
            id="ctrl-acc"
            type="range"
            min="0"
            max="8"
            step="0.5"
            value={state.a}
            onChange={(e) => update("a", parseFloat(e.target.value))}
            className="w-full accent-amber-400 cursor-pointer h-1.5 bg-neutral-800 rounded-lg appearance-none"
            aria-label="Percepatan GLBB"
          />
        </div>

        {/* Gravity g */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <label htmlFor="ctrl-g" className="text-emerald-400 font-semibold">
              Gravitasi g: {state.g} m/s²
            </label>
            <span className="text-neutral-500 font-mono">Bumi (9.8)</span>
          </div>
          <input
            id="ctrl-g"
            type="range"
            min="1.6"
            max="15"
            step="0.2"
            value={state.g}
            onChange={(e) => update("g", parseFloat(e.target.value))}
            className="w-full accent-emerald-400 cursor-pointer h-1.5 bg-neutral-800 rounded-lg appearance-none"
            aria-label="Gravitasi g"
          />
        </div>
      </div>

      {/* Planet / Case Presets */}
      <div className="flex flex-wrap gap-2 pt-2 border-t border-neutral-800 text-xs">
        <span className="text-neutral-400 self-center font-medium">Lingkungan:</span>
        <button
          type="button"
          onClick={() => update("g", 9.8)}
          className={`px-2.5 py-1 rounded-lg transition ${
            state.g === 9.8 ? "bg-emerald-600 text-white" : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
          }`}
        >
          Bumi (9.8 m/s²)
        </button>
        <button
          type="button"
          onClick={() => update("g", 1.6)}
          className={`px-2.5 py-1 rounded-lg transition ${
            state.g === 1.6 ? "bg-emerald-600 text-white" : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
          }`}
        >
          Bulan (1.6 m/s²)
        </button>
        <button
          type="button"
          onClick={() => update("angleDeg", 45)}
          className="px-2.5 py-1 rounded-lg bg-neutral-800 text-neutral-300 hover:bg-neutral-700 transition"
        >
          Jangkauan Maks (45°)
        </button>
      </div>
    </div>
  );
}
