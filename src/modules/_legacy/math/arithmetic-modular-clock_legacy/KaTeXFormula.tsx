"use client";

import React, { useMemo } from "react";
import katex from "katex";
import { ModularClockState, computeModularMetrics } from "./engine";

interface KaTeXFormulaProps {
  state: ModularClockState;
}

export function KaTeXFormula({ state }: KaTeXFormulaProps) {
  const { safeN, safeM, gcd, isGenerator, additionResult } = useMemo(
    () => computeModularMetrics(state),
    [state]
  );

  const texAddition = useMemo(() => {
    const sum = state.hourA + state.hourB;
    return `${state.hourA} + ${state.hourB} = ${sum} \\equiv \\mathbf{${additionResult}} \\pmod{${safeN}}`;
  }, [state.hourA, state.hourB, additionResult, safeN]);

  const texMultiply = useMemo(() => {
    return `f(i) = (i \\times ${safeM}) \\pmod{${safeN}} \\quad \\mid \\quad \\gcd(${safeM}, ${safeN}) = \\mathbf{${gcd}}`;
  }, [safeM, safeN, gcd]);

  const htmlAddition = useMemo(() => {
    try {
      return katex.renderToString(texAddition, { displayMode: true, throwOnError: false });
    } catch {
      return `${state.hourA} + ${state.hourB} = ${additionResult} (mod ${safeN})`;
    }
  }, [texAddition, state.hourA, state.hourB, additionResult, safeN]);

  const htmlMultiply = useMemo(() => {
    try {
      return katex.renderToString(texMultiply, { displayMode: true, throwOnError: false });
    } catch {
      return `f(i) = (i * ${safeM}) mod ${safeN}`;
    }
  }, [texMultiply, safeM, safeN]);

  return (
    <div
      role="region"
      aria-label="Formula KaTeX Aritmetika Modular"
      className="p-4 rounded-xl bg-neutral-900/90 border border-neutral-800 text-neutral-100 shadow-inner space-y-3"
    >
      <div className="flex items-center justify-between text-xs text-neutral-400 font-semibold border-b border-neutral-800/80 pb-2">
        <span>Formalisasi Matematika Modular:</span>
        <span
          className={`font-bold px-2 py-0.5 rounded text-xs ${
            isGenerator
              ? "bg-emerald-500/20 text-emerald-300"
              : "bg-amber-500/20 text-amber-300"
          }`}
        >
          {isGenerator ? "Siklus Penuh (Koprima, FPB = 1)" : `Terbagi ${gcd} Siklus Terpisah`}
        </span>
      </div>

      <div className="space-y-1">
        <span className="text-[11px] text-neutral-400 font-medium">Penjumlahan Jam:</span>
        <div
          className="text-sm sm:text-base text-center py-0.5 overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: htmlAddition }}
        />
      </div>

      <div className="space-y-1 pt-1 border-t border-neutral-800/60">
        <span className="text-[11px] text-neutral-400 font-medium">Relasi Benang Geometris (Perkalian):</span>
        <div
          className="text-sm sm:text-base text-center py-0.5 overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: htmlMultiply }}
        />
      </div>
    </div>
  );
}
