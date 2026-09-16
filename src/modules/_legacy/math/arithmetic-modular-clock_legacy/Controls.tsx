"use client";

import React from "react";
import { Sliders, RotateCcw, Clock } from "lucide-react";
import { ModularClockState } from "./engine";

interface ControlsProps {
  state: ModularClockState;
  onChange: (next: ModularClockState) => void;
  onReset: () => void;
}

export function Controls({ state, onChange, onReset }: ControlsProps) {
  const updateField = (key: keyof ModularClockState, val: number) => {
    onChange({
      ...state,
      [key]: Math.round(val),
    });
  };

  const applyPreset = (preset: Partial<ModularClockState>) => {
    onChange({
      ...state,
      ...preset,
    });
  };

  return (
    <div className="space-y-4 p-4 rounded-2xl bg-neutral-900 border border-neutral-800 text-neutral-200">
      <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-sky-400" />
          <h3 className="text-sm font-bold text-neutral-100">Kontrol Parameter Jam</h3>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1 text-xs text-neutral-400 hover:text-white px-2 py-1 rounded bg-neutral-800 hover:bg-neutral-700 transition"
          aria-label="Reset jam ke setelan awal"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Preset shortcuts */}
      <div className="flex flex-wrap gap-1.5">
        <span className="text-[11px] text-neutral-400 w-full mb-0.5">Pilihan Geometri:</span>
        <button
          type="button"
          onClick={() => applyPreset({ n: 12, multiplier: 1, hourA: 9, hourB: 7 })}
          className="text-xs px-2 py-1 rounded-md bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition"
        >
          Jam Dinding (n=12)
        </button>
        <button
          type="button"
          onClick={() => applyPreset({ n: 10, multiplier: 2 })}
          className="text-xs px-2 py-1 rounded-md bg-indigo-950/60 hover:bg-indigo-900/70 text-indigo-300 border border-indigo-800/60 transition"
        >
          Kardioid (n=10, m=2)
        </button>
        <button
          type="button"
          onClick={() => applyPreset({ n: 12, multiplier: 5 })}
          className="text-xs px-2 py-1 rounded-md bg-emerald-950/60 hover:bg-emerald-900/70 text-emerald-300 border border-emerald-800/60 transition"
        >
          Bintang Koprima (n=12, m=5)
        </button>
        <button
          type="button"
          onClick={() => applyPreset({ n: 30, multiplier: 3 })}
          className="text-xs px-2 py-1 rounded-md bg-amber-950/60 hover:bg-amber-900/70 text-amber-300 border border-amber-800/60 transition"
        >
          Nefroid (n=30, m=3)
        </button>
        <button
          type="button"
          onClick={() => applyPreset({ n: 48, multiplier: 7 })}
          className="text-xs px-2 py-1 rounded-md bg-purple-950/60 hover:bg-purple-900/70 text-purple-300 border border-purple-800/60 transition"
        >
          Fraktal Bunga (n=48, m=7)
        </button>
      </div>

      {/* Modulus (n) slider */}
      <div className="space-y-1.5 p-3 rounded-xl bg-neutral-950/60 border border-neutral-800">
        <div className="flex items-center justify-between text-xs font-semibold text-neutral-300">
          <span>Modulus / Jumlah Angka Jam (n)</span>
          <span className="text-amber-400 font-mono font-bold text-sm">{state.n}</span>
        </div>
        <input
          type="range"
          min="4"
          max="60"
          step="1"
          value={state.n}
          onChange={(e) => updateField("n", parseInt(e.target.value, 10))}
          aria-label="Jumlah angka putaran jam n"
          className="w-full accent-amber-500 cursor-pointer h-1.5 bg-neutral-800 rounded-lg appearance-none"
        />
        <div className="flex justify-between text-[10px] text-neutral-500">
          <span>4 (Sederhana)</span>
          <span>12 (Jam Standar)</span>
          <span>60 (Sangat Detail)</span>
        </div>
      </div>

      {/* Multiplier (m) slider */}
      <div className="space-y-1.5 p-3 rounded-xl bg-neutral-950/60 border border-neutral-800">
        <div className="flex items-center justify-between text-xs font-semibold text-neutral-300">
          <span>Faktor Pengali Garis (m)</span>
          <span className="text-sky-400 font-mono font-bold text-sm">{state.multiplier}x</span>
        </div>
        <input
          type="range"
          min="1"
          max="12"
          step="1"
          value={state.multiplier}
          onChange={(e) => updateField("multiplier", parseInt(e.target.value, 10))}
          aria-label="Faktor pengali kelipatan m"
          className="w-full accent-sky-500 cursor-pointer h-1.5 bg-neutral-800 rounded-lg appearance-none"
        />
        <div className="flex justify-between text-[10px] text-neutral-500">
          <span>1 (Identitas)</span>
          <span>2 (Kardioid)</span>
          <span>3 (Nefroid)</span>
          <span>12</span>
        </div>
      </div>

      {/* Clock addition hours sliders */}
      <div className="space-y-2 p-3 rounded-xl bg-neutral-950/60 border border-neutral-800">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-300">
          <Clock className="w-3.5 h-3.5 text-indigo-400" />
          <span>Simulasi Penjumlahan Waktu</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] text-neutral-400 mb-1">
              Jam Awal: <span className="text-white font-bold">{state.hourA}</span>
            </label>
            <input
              type="range"
              min="0"
              max={state.n - 1}
              step="1"
              value={state.hourA % state.n}
              onChange={(e) => updateField("hourA", parseInt(e.target.value, 10))}
              aria-label="Jam awal"
              className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-neutral-800 rounded-lg appearance-none"
            />
          </div>
          <div>
            <label className="block text-[11px] text-neutral-400 mb-1">
              Maju (+jam): <span className="text-white font-bold">{state.hourB}</span>
            </label>
            <input
              type="range"
              min="0"
              max="24"
              step="1"
              value={state.hourB}
              onChange={(e) => updateField("hourB", parseInt(e.target.value, 10))}
              aria-label="Jumlah jam ditambahkan"
              className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-neutral-800 rounded-lg appearance-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
