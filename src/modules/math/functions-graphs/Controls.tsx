"use client";

import React from "react";

interface ControlsProps {
  state: { a: number; h: number; k: number; xInput: number };
  onChange: (newState: { a: number; h: number; k: number; xInput: number }) => void;
}

export function Controls({ state, onChange }: ControlsProps) {
  const update = (field: "a" | "h" | "k" | "xInput", val: number) => {
    onChange({ ...state, [field]: val });
  };

  return (
    <div className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-4 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Curvature / Scale a */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <label htmlFor="ctrl-fn-a" className="text-indigo-400 font-semibold">
              Skala / Kelengkungan a: {state.a}
            </label>
            <span className="text-neutral-500 font-mono">[-2, 3]</span>
          </div>
          <input
            id="ctrl-fn-a"
            type="range"
            min="-2"
            max="3"
            step="0.5"
            value={state.a}
            onChange={(e) => update("a", parseFloat(e.target.value))}
            className="w-full accent-indigo-400 cursor-pointer h-1.5 bg-neutral-800 rounded-lg appearance-none"
            aria-label="Skala a"
          />
        </div>

        {/* Horizontal Shift h */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <label htmlFor="ctrl-fn-h" className="text-rose-400 font-semibold">
              Translasi Horisontal h: {state.h}
            </label>
            <span className="text-neutral-500 font-mono">[-4, 4]</span>
          </div>
          <input
            id="ctrl-fn-h"
            type="range"
            min="-4"
            max="4"
            step="1"
            value={state.h}
            onChange={(e) => update("h", parseFloat(e.target.value))}
            className="w-full accent-rose-400 cursor-pointer h-1.5 bg-neutral-800 rounded-lg appearance-none"
            aria-label="Translasi Horisontal h"
          />
        </div>

        {/* Vertical Shift k */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <label htmlFor="ctrl-fn-k" className="text-emerald-400 font-semibold">
              Translasi Vertikal k: {state.k}
            </label>
            <span className="text-neutral-500 font-mono">[-3, 5]</span>
          </div>
          <input
            id="ctrl-fn-k"
            type="range"
            min="-3"
            max="5"
            step="1"
            value={state.k}
            onChange={(e) => update("k", parseFloat(e.target.value))}
            className="w-full accent-emerald-400 cursor-pointer h-1.5 bg-neutral-800 rounded-lg appearance-none"
            aria-label="Translasi Vertikal k"
          />
        </div>

        {/* Probe Input x */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <label htmlFor="ctrl-fn-x" className="text-sky-400 font-semibold">
              Titik Uji x: {state.xInput}
            </label>
            <span className="text-neutral-500 font-mono">[-4, 4]</span>
          </div>
          <input
            id="ctrl-fn-x"
            type="range"
            min="-4"
            max="4"
            step="0.5"
            value={state.xInput}
            onChange={(e) => update("xInput", parseFloat(e.target.value))}
            className="w-full accent-sky-400 cursor-pointer h-1.5 bg-neutral-800 rounded-lg appearance-none"
            aria-label="Titik Uji x"
          />
        </div>
      </div>

      {/* Presets */}
      <div className="flex flex-wrap gap-2 pt-2 border-t border-neutral-800 text-xs">
        <span className="text-neutral-400 self-center font-medium">Bentuk Kurva:</span>
        <button
          type="button"
          onClick={() => onChange({ a: 1, h: 0, k: 0, xInput: 2 })}
          className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition"
        >
          Parabola Baku y = x²
        </button>
        <button
          type="button"
          onClick={() => onChange({ a: 1, h: 3, k: 2, xInput: 3 })}
          className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition"
        >
          Translasi (3, 2)
        </button>
        <button
          type="button"
          onClick={() => onChange({ a: -1, h: 0, k: 4, xInput: 0 })}
          className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition"
        >
          Refleksi y = -x² + 4
        </button>
      </div>
    </div>
  );
}
