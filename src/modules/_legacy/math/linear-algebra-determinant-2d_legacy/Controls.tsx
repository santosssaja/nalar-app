"use client";

import React from "react";
import { RotateCcw, Sliders } from "lucide-react";
import { DeterminantCanvasState } from "./engine";

interface ControlsProps {
  state: DeterminantCanvasState;
  onChange: (next: DeterminantCanvasState) => void;
  onReset: () => void;
}

export function Controls({ state, onChange, onReset }: ControlsProps) {
  const updateParam = (key: keyof DeterminantCanvasState, val: number) => {
    onChange({
      ...state,
      [key]: Number(val.toFixed(2)),
    });
  };

  const applyPreset = (preset: DeterminantCanvasState) => {
    onChange(preset);
  };

  return (
    <div className="space-y-4 p-4 rounded-2xl bg-neutral-900 border border-neutral-800 text-neutral-200">
      <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-sky-400" />
          <h3 className="text-sm font-bold text-neutral-100">Kontrol Vektor Basis</h3>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1 text-xs text-neutral-400 hover:text-white px-2 py-1 rounded bg-neutral-800 hover:bg-neutral-700 transition"
          aria-label="Reset vektor basis ke identitas"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Preset shortcuts */}
      <div className="flex flex-wrap gap-1.5">
        <span className="text-[11px] text-neutral-400 w-full mb-0.5">Preset Cepat:</span>
        <button
          type="button"
          onClick={() => applyPreset({ i_hat_x: 1, i_hat_y: 0, j_hat_x: 0, j_hat_y: 1 })}
          className="text-xs px-2 py-1 rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition"
        >
          Identitas ($1$)
        </button>
        <button
          type="button"
          onClick={() => applyPreset({ i_hat_x: 2, i_hat_y: 0, j_hat_x: 0, j_hat_y: 2 })}
          className="text-xs px-2 py-1 rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition"
        >
          Skala $2\times$ ($4$)
        </button>
        <button
          type="button"
          onClick={() => applyPreset({ i_hat_x: 1, i_hat_y: 0, j_hat_x: 1, j_hat_y: 1 })}
          className="text-xs px-2 py-1 rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition"
        >
          Shear ($1$)
        </button>
        <button
          type="button"
          onClick={() => applyPreset({ i_hat_x: 1, i_hat_y: 1, j_hat_x: 2, j_hat_y: 2 })}
          className="text-xs px-2 py-1 rounded-md bg-rose-950/50 hover:bg-rose-900/60 text-rose-300 border border-rose-800/60 transition"
        >
          Gepeng ($0$)
        </button>
        <button
          type="button"
          onClick={() => applyPreset({ i_hat_x: -1, i_hat_y: 0, j_hat_x: 0, j_hat_y: 1 })}
          className="text-xs px-2 py-1 rounded-md bg-amber-950/50 hover:bg-amber-900/60 text-amber-300 border border-amber-800/60 transition"
        >
          Cermin ($-1$)
        </button>
      </div>

      {/* Sliders for i_hat (Emerald) */}
      <div className="space-y-2 p-3 rounded-xl bg-neutral-950/60 border border-emerald-900/40">
        <div className="flex items-center justify-between text-xs font-semibold text-emerald-400">
          <span>Vektor Basis î (Hijau)</span>
          <span>[{state.i_hat_x}, {state.i_hat_y}]</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="slider-i-x" className="block text-[11px] text-neutral-400 mb-1">
              Komponen X (a):
            </label>
            <input
              id="slider-i-x"
              type="range"
              min="-3"
              max="3"
              step="0.1"
              value={state.i_hat_x}
              onChange={(e) => updateParam("i_hat_x", parseFloat(e.target.value))}
              aria-label="Komponen X vektor i_hat"
              className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-neutral-800 rounded-lg appearance-none"
            />
          </div>
          <div>
            <label htmlFor="slider-i-y" className="block text-[11px] text-neutral-400 mb-1">
              Komponen Y (c):
            </label>
            <input
              id="slider-i-y"
              type="range"
              min="-3"
              max="3"
              step="0.1"
              value={state.i_hat_y}
              onChange={(e) => updateParam("i_hat_y", parseFloat(e.target.value))}
              aria-label="Komponen Y vektor i_hat"
              className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-neutral-800 rounded-lg appearance-none"
            />
          </div>
        </div>
      </div>

      {/* Sliders for j_hat (Sky Blue) */}
      <div className="space-y-2 p-3 rounded-xl bg-neutral-950/60 border border-sky-900/40">
        <div className="flex items-center justify-between text-xs font-semibold text-sky-400">
          <span>Vektor Basis ĵ (Biru)</span>
          <span>[{state.j_hat_x}, {state.j_hat_y}]</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="slider-j-x" className="block text-[11px] text-neutral-400 mb-1">
              Komponen X (b):
            </label>
            <input
              id="slider-j-x"
              type="range"
              min="-3"
              max="3"
              step="0.1"
              value={state.j_hat_x}
              onChange={(e) => updateParam("j_hat_x", parseFloat(e.target.value))}
              aria-label="Komponen X vektor j_hat"
              className="w-full accent-sky-500 cursor-pointer h-1.5 bg-neutral-800 rounded-lg appearance-none"
            />
          </div>
          <div>
            <label htmlFor="slider-j-y" className="block text-[11px] text-neutral-400 mb-1">
              Komponen Y ($d$):
            </label>
            <input
              id="slider-j-y"
              type="range"
              min="-3"
              max="3"
              step="0.1"
              value={state.j_hat_y}
              onChange={(e) => updateParam("j_hat_y", parseFloat(e.target.value))}
              aria-label="Komponen Y vektor j_hat"
              className="w-full accent-sky-500 cursor-pointer h-1.5 bg-neutral-800 rounded-lg appearance-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
