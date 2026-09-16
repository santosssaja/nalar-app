"use client";

import React from "react";

interface ControlsProps {
  state: { a: number; b: number; c: number; x: number };
  onChange: (newState: { a: number; b: number; c: number; x: number }) => void;
}

export function Controls({ state, onChange }: ControlsProps) {
  const update = (field: "a" | "b" | "c" | "x", val: number) => {
    onChange({ ...state, [field]: val });
  };

  return (
    <div className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-4 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Variable x Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <label htmlFor="ctrl-x" className="text-indigo-400 font-bold">
              Variabel x: {state.x}
            </label>
            <span className="text-neutral-500 font-mono">[-5, 10]</span>
          </div>
          <input
            id="ctrl-x"
            type="range"
            min="-5"
            max="10"
            step="1"
            value={state.x}
            onChange={(e) => update("x", parseFloat(e.target.value))}
            className="w-full accent-indigo-400 cursor-pointer h-1.5 bg-neutral-800 rounded-lg appearance-none"
            aria-label="Variabel x"
          />
        </div>

        {/* Coefficient a */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <label htmlFor="ctrl-a" className="text-sky-400 font-semibold">
              Koefisien a: {state.a}
            </label>
            <span className="text-neutral-500 font-mono">[1, 5]</span>
          </div>
          <input
            id="ctrl-a"
            type="range"
            min="1"
            max="5"
            step="1"
            value={state.a}
            onChange={(e) => update("a", parseFloat(e.target.value))}
            className="w-full accent-sky-400 cursor-pointer h-1.5 bg-neutral-800 rounded-lg appearance-none"
            aria-label="Koefisien a"
          />
        </div>

        {/* Constant b */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <label htmlFor="ctrl-b" className="text-emerald-400 font-semibold">
              Konstanta b: {state.b}
            </label>
            <span className="text-neutral-500 font-mono">[-10, 10]</span>
          </div>
          <input
            id="ctrl-b"
            type="range"
            min="-10"
            max="10"
            step="1"
            value={state.b}
            onChange={(e) => update("b", parseFloat(e.target.value))}
            className="w-full accent-emerald-400 cursor-pointer h-1.5 bg-neutral-800 rounded-lg appearance-none"
            aria-label="Konstanta b"
          />
        </div>

        {/* Target c */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <label htmlFor="ctrl-c" className="text-amber-400 font-semibold">
              Target Ruas Kanan c: {state.c}
            </label>
            <span className="text-neutral-500 font-mono">[0, 20]</span>
          </div>
          <input
            id="ctrl-c"
            type="range"
            min="0"
            max="20"
            step="1"
            value={state.c}
            onChange={(e) => update("c", parseFloat(e.target.value))}
            className="w-full accent-amber-400 cursor-pointer h-1.5 bg-neutral-800 rounded-lg appearance-none"
            aria-label="Target c"
          />
        </div>
      </div>

      {/* Preset Equalities */}
      <div className="flex flex-wrap gap-2 pt-2 border-t border-neutral-800 text-xs">
        <span className="text-neutral-400 self-center font-medium">Contoh Soal:</span>
        <button
          type="button"
          onClick={() => onChange({ a: 2, b: 4, c: 10, x: 0 })}
          className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition"
        >
          2x + 4 = 10 (x=3)
        </button>
        <button
          type="button"
          onClick={() => onChange({ a: 3, b: -5, c: 16, x: 0 })}
          className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition"
        >
          3x - 5 = 16 (x=7)
        </button>
      </div>
    </div>
  );
}
