"use client";

import React from "react";
import { RealNumberState, absoluteDistance } from "./engine";

interface KaTeXFormulaProps {
  state: RealNumberState;
}

export function KaTeXFormula({ state }: KaTeXFormulaProps) {
  const dist = absoluteDistance(state.point1, state.point2);
  const sum = state.point1 + state.point2;
  const scaled = Number((state.point1 * state.scaleFactor).toFixed(3));
  const sqrtVal = Number(Math.sqrt(Math.max(0, state.sqrtN)).toFixed(4));
  const distribTotal = state.distribA * (state.distribB + state.distribC);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-neutral-900/90 border border-neutral-800 rounded-2xl text-xs font-mono">
      <div className="flex items-center gap-4">
        <div>
          <span className="text-neutral-500">Posisi: </span>
          <span className="text-blue-400 font-bold">A = {state.point1}</span>
          <span className="text-neutral-600 mx-1">,</span>
          <span className="text-amber-400 font-bold">B = {state.point2}</span>
        </div>
        <div>
          <span className="text-neutral-500">Jarak: </span>
          <span className="text-emerald-400 font-bold">|B - A| = {dist}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="px-2 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-neutral-300">
          A × k = <span className="text-cyan-400 font-bold">{scaled}</span>
        </span>
        <span className="px-2 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-neutral-300">
          √{state.sqrtN} ≈ <span className="text-purple-400 font-bold">{sqrtVal}</span>
        </span>
      </div>
    </div>
  );
}
