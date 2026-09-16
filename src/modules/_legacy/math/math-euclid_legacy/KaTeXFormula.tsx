"use client";

import React, { useMemo } from "react";
import katex from "katex";
import { computeEuclideanDivisionSteps } from "./engine";

interface KaTeXFormulaProps {
  width: number;
  height: number;
  highlightedStepIndex?: number | null;
}

export function KaTeXFormula({
  width,
  height,
  highlightedStepIndex = null,
}: KaTeXFormulaProps) {
  const steps = useMemo(
    () => computeEuclideanDivisionSteps(width, height),
    [width, height]
  );

  const gcd = steps.length > 0 ? steps[steps.length - 1].divisor : 1;
  const isCoprime = gcd === 1;

  const renderedSteps = useMemo(() => {
    return steps.map((step) => {
      const tex = `${step.dividend} = ${step.quotient} \\times ${step.divisor} + ${step.remainder}`;
      try {
        return katex.renderToString(tex, {
          displayMode: false,
          throwOnError: false,
        });
      } catch {
        return `${step.dividend} = ${step.quotient} * ${step.divisor} + ${step.remainder}`;
      }
    });
  }, [steps]);

  const gcdTex = useMemo(() => {
    const tex = `\\gcd(${Math.max(width, height)}, ${Math.min(width, height)}) = \\mathbf{${gcd}}`;
    try {
      return katex.renderToString(tex, {
        displayMode: true,
        throwOnError: false,
      });
    } catch {
      return `GCD(${width}, ${height}) = ${gcd}`;
    }
  }, [width, height, gcd]);

  return (
    <div
      role="region"
      aria-label="Formula KaTeX Langkah Pembagian Algoritma Euclid"
      className="p-4 rounded-xl bg-neutral-900/90 border border-neutral-800 text-neutral-100 shadow-inner space-y-3"
    >
      <div className="flex items-center justify-between text-xs text-neutral-400 font-semibold border-b border-neutral-800/80 pb-2">
        <span>Rantai Pembagian Algoritma Euclid:</span>
        <span
          className={`font-bold px-2 py-0.5 rounded text-xs ${
            isCoprime
              ? "bg-emerald-500/20 text-emerald-300"
              : "bg-indigo-500/20 text-indigo-300"
          }`}
        >
          {isCoprime ? "Koprima (FPB = 1)" : `FPB Bersama: ${gcd}`}
        </span>
      </div>

      {/* Steps List */}
      <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1 font-mono text-xs">
        {steps.map((step, idx) => {
          const isHighlighted =
            highlightedStepIndex !== null && highlightedStepIndex === idx;

          return (
            <div
              key={step.stepNumber}
              className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg border transition-all ${
                isHighlighted
                  ? "bg-indigo-600/30 border-indigo-400 text-white shadow-md scale-[1.01]"
                  : step.isTerminal
                  ? "bg-emerald-950/40 border-emerald-800/60 text-emerald-300"
                  : "bg-neutral-950/60 border-neutral-800/80 text-neutral-300"
              }`}
            >
              <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">
                Langkah {step.stepNumber}:
              </span>
              <span
                dangerouslySetInnerHTML={{ __html: renderedSteps[idx] }}
                className="font-mono text-sm"
              />
            </div>
          );
        })}
      </div>

      {/* Final GCD Conclusion */}
      <div className="pt-2 border-t border-neutral-800/80 text-center">
        <div
          dangerouslySetInnerHTML={{ __html: gcdTex }}
          className="text-base text-emerald-400 font-bold"
        />
        <p className="text-[11px] text-neutral-400 mt-1">
          Sisa pembagian terakhir bukan nol ({gcd}) merupakan ukuran bujur sangkar terkecil yang dapat mengubin seluruh persegi panjang.
        </p>
      </div>
    </div>
  );
}
