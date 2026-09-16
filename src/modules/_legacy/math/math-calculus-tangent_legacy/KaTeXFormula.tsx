"use client";

import React, { useMemo } from "react";
import katex from "katex";
import {
  CalculusFunctionKey,
  CALCULUS_FUNCTIONS,
  computeTangentMetrics,
} from "./engine";

interface KaTeXFormulaProps {
  funcKey: CalculusFunctionKey;
  a: number;
  deltaX: number;
}

export function KaTeXFormula({ funcKey, a, deltaX }: KaTeXFormulaProps) {
  const funcDef = CALCULUS_FUNCTIONS[funcKey] || CALCULUS_FUNCTIONS.x2;
  const metrics = useMemo(
    () => computeTangentMetrics(funcKey, a, deltaX),
    [funcKey, a, deltaX]
  );

  const { fa, fb, secantSlope, tangentSlope, error, isConverged } = metrics;

  const secantTex = useMemo(() => {
    const aStr = a.toFixed(2);
    const bStr = (a + deltaX).toFixed(2);
    const dxStr = deltaX.toFixed(2);
    const faStr = fa.toFixed(2);
    const fbStr = fb.toFixed(2);

    const tex = `m_{\\text{sekan}} = \\frac{f(${bStr}) - f(${aStr})}{${dxStr}} = \\frac{${fbStr} - (${faStr})}{${dxStr}} = \\mathbf{${secantSlope.toFixed(2)}}`;
    try {
      return katex.renderToString(tex, { displayMode: true, throwOnError: false });
    } catch {
      return `m_sekan = (${fbStr} - ${faStr}) / ${dxStr} = ${secantSlope.toFixed(2)}`;
    }
  }, [a, deltaX, fa, fb, secantSlope]);

  const tangentTex = useMemo(() => {
    const aStr = a.toFixed(2);
    const tex = `f'(${aStr}) = \\lim_{\\Delta x \\to 0} \\frac{f(${aStr} + \\Delta x) - f(${aStr})}{\\Delta x} = \\mathbf{${tangentSlope.toFixed(2)}}`;
    try {
      return katex.renderToString(tex, { displayMode: true, throwOnError: false });
    } catch {
      return `f'(${aStr}) = ${tangentSlope.toFixed(2)}`;
    }
  }, [a, tangentSlope]);

  return (
    <div
      role="region"
      aria-label="Formula Matematika Reaktif Garis Singgung dan Limit Turunan"
      className="p-4 rounded-xl bg-neutral-900/90 border border-neutral-800 text-neutral-100 shadow-inner space-y-3"
    >
      <div className="flex items-center justify-between text-xs text-neutral-400 font-semibold border-b border-neutral-800/80 pb-2">
        <span>Kalkulasi Limit Garis Sekan Menjadi Garis Singgung:</span>
        <span
          className={`px-2 py-0.5 rounded text-[11px] font-mono border ${
            isConverged
              ? "bg-emerald-950 text-emerald-300 border-emerald-800"
              : "bg-neutral-800 text-neutral-300 border-neutral-700"
          }`}
        >
          {isConverged ? "Limit Tercapai (Δx → 0)" : `Selisih: ${error.toFixed(3)}`}
        </span>
      </div>

      {/* Secant and Tangent Formula Displays */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
        <div className="p-2.5 rounded-lg bg-neutral-950/60 border border-neutral-800/60 flex flex-col gap-1">
          <span className="text-blue-400 font-medium">Kemiringan Sekan (Rata-rata):</span>
          <div
            className="overflow-x-auto text-blue-300 font-mono py-1"
            dangerouslySetInnerHTML={{ __html: secantTex }}
          />
        </div>

        <div className="p-2.5 rounded-lg bg-neutral-950/60 border border-neutral-800/60 flex flex-col gap-1">
          <span className="text-amber-400 font-medium">
            Kemiringan Tangen ({funcDef.derivativeLatex}):
          </span>
          <div
            className="overflow-x-auto text-amber-300 font-mono py-1"
            dangerouslySetInnerHTML={{ __html: tangentTex }}
          />
        </div>
      </div>
    </div>
  );
}
