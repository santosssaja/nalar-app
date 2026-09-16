"use client";

import React, { useMemo } from "react";
import katex from "katex";
import {
  RiemannFunctionKey,
  RiemannMethod,
  RIEMANN_FUNCTIONS,
  computeRiemannMetrics,
} from "./engine";

interface KaTeXFormulaProps {
  funcKey: RiemannFunctionKey;
  a: number;
  b: number;
  n: number;
  method: RiemannMethod;
}

export function KaTeXFormula({ funcKey, a, b, n, method }: KaTeXFormulaProps) {
  const funcDef = RIEMANN_FUNCTIONS[funcKey] || RIEMANN_FUNCTIONS.x2;
  const metrics = useMemo(
    () => computeRiemannMetrics(funcKey, a, b, n, method),
    [funcKey, a, b, n, method]
  );

  const { approxArea, exactArea, absError, relErrorPercent, deltaX } = metrics;

  const integralTex = useMemo(() => {
    const aStr = a.toFixed(2);
    const bStr = b.toFixed(2);
    const fStr = funcDef.latex.replace("f(x) = ", "");
    const tex = `\\int_{${aStr}}^{${bStr}} (${fStr}) \\, dx = \\mathbf{${exactArea.toFixed(3)}}`;
    try {
      return katex.renderToString(tex, { displayMode: false, throwOnError: false });
    } catch {
      return `Integral = ${exactArea.toFixed(3)}`;
    }
  }, [a, b, funcDef.latex, exactArea]);

  const riemannTex = useMemo(() => {
    const tex = `\\sum_{i=1}^{${n}} f(x_i^*) \\Delta x = \\mathbf{${approxArea.toFixed(3)}} \\quad (\\Delta x = ${deltaX.toFixed(3)})`;
    try {
      return katex.renderToString(tex, { displayMode: false, throwOnError: false });
    } catch {
      return `Jumlah Riemann = ${approxArea.toFixed(3)}`;
    }
  }, [n, approxArea, deltaX]);

  return (
    <div
      role="region"
      aria-label="Formula Matematika Reaktif Akumulasi Luas Riemann"
      className="p-4 rounded-xl bg-neutral-900/90 border border-neutral-800 text-neutral-100 shadow-inner space-y-3"
    >
      <div className="flex items-center justify-between text-xs text-neutral-400 font-semibold border-b border-neutral-800/80 pb-2">
        <span>Konvergensi Jumlah Riemann Menuju Integral Tentu:</span>
        <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 text-[11px] font-mono">
          Metode: {method.toUpperCase()}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
        <div className="p-2.5 rounded-lg bg-neutral-950/60 border border-neutral-800/60 flex flex-col gap-1">
          <span className="text-emerald-400 font-medium">Aproksimasi Jumlah Riemann:</span>
          <div
            className="overflow-x-auto text-emerald-300 font-mono py-1"
            dangerouslySetInnerHTML={{ __html: riemannTex }}
          />
        </div>

        <div className="p-2.5 rounded-lg bg-neutral-950/60 border border-neutral-800/60 flex flex-col gap-1">
          <span className="text-cyan-400 font-medium">Nilai Analitik Eksak:</span>
          <div
            className="overflow-x-auto text-cyan-300 font-mono py-1"
            dangerouslySetInnerHTML={{ __html: integralTex }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-neutral-950/40 border border-neutral-800 text-xs font-mono">
        <span className="text-neutral-400">Selisih Galat Absolut: {absError.toFixed(4)}</span>
        <span
          className={`font-bold ${
            relErrorPercent < 2 ? "text-emerald-400" : "text-amber-400"
          }`}
        >
          Galat Relatif: {relErrorPercent.toFixed(2)}%
        </span>
      </div>
    </div>
  );
}
