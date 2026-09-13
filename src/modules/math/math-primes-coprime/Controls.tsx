"use client";

import React from "react";
import { PrimesCoprimeState, isPrime } from "./engine";
import { RotateCcw } from "lucide-react";

interface ControlsProps {
  state: PrimesCoprimeState;
  onChange: (next: PrimesCoprimeState) => void;
  onReset: () => void;
}

export function Controls({ state, onChange, onReset }: ControlsProps) {
  const handleSlider = (key: keyof PrimesCoprimeState, val: number) => {
    onChange({
      ...state,
      [key]: val,
    });
  };

  const isNPrime = isPrime(state.numberN || 12);

  return (
    <div className="space-y-4 select-none">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
        <h3 className="text-xs font-black uppercase tracking-wider text-neutral-300">
          Kontrol Prima & Koprima
        </h3>
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-white transition px-2 py-1 rounded bg-neutral-800 border border-neutral-700"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>

      {/* Number N Slider */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-blue-400">Bilangan N (Uji Atom Prima)</span>
          <span
            className={`font-mono px-2 py-0.5 rounded font-bold ${
              isNPrime
                ? "bg-emerald-950/60 text-emerald-300 border border-emerald-800"
                : "bg-neutral-800 text-white"
            }`}
          >
            N = {state.numberN} {isNPrime ? "⭐ Prima" : ""}
          </span>
        </div>
        <input
          type="range"
          min="2"
          max="60"
          step="1"
          value={state.numberN}
          onChange={(e) => handleSlider("numberN", parseInt(e.target.value, 10))}
          className="w-full accent-blue-500 cursor-pointer h-1.5 bg-neutral-800 rounded-lg"
          aria-label="Atur Bilangan N"
        />
      </div>

      {/* Coprime Pair A & B */}
      <div className="pt-2 border-t border-neutral-800 space-y-3">
        <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
          Uji Pasangan Koprima (A, B)
        </div>

        {/* Slider A */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-purple-400 font-semibold">Koordinat A (Sumbu X)</span>
            <span className="font-mono bg-neutral-800 px-2 py-0.5 rounded text-purple-300 font-bold">
              {state.coprimeA}
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={state.coprimeA}
            onChange={(e) => handleSlider("coprimeA", parseInt(e.target.value, 10))}
            className="w-full accent-purple-500 cursor-pointer h-1.5 bg-neutral-800 rounded-lg"
            aria-label="Atur Koordinat A"
          />
        </div>

        {/* Slider B */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-emerald-400 font-semibold">Koordinat B (Sumbu Y)</span>
            <span className="font-mono bg-neutral-800 px-2 py-0.5 rounded text-emerald-300 font-bold">
              {state.coprimeB}
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="7"
            step="1"
            value={state.coprimeB}
            onChange={(e) => handleSlider("coprimeB", parseInt(e.target.value, 10))}
            className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-neutral-800 rounded-lg"
            aria-label="Atur Koordinat B"
          />
        </div>
      </div>
    </div>
  );
}
