"use client";

import React, { useMemo } from "react";
import katex from "katex";
import { DeterminantCanvasState } from "./engine";

interface KaTeXFormulaProps {
  state: DeterminantCanvasState;
}

export function KaTeXFormula({ state }: KaTeXFormulaProps) {
  const { i_hat_x: a, i_hat_y: c, j_hat_x: b, j_hat_y: d } = state;
  const det = Number((a * d - b * c).toFixed(2));

  const tex = useMemo(() => {
    return `A = \\begin{bmatrix} ${a} & ${b} \\\ ${c} & ${d} \\end{bmatrix} \\quad \\implies \\quad \\det(A) = (${a})(${d}) - (${b})(${c}) = \\mathbf{${det}}`;
  }, [a, b, c, d, det]);

  const html = useMemo(() => {
    try {
      return katex.renderToString(tex, {
        displayMode: true,
        throwOnError: false,
      });
    } catch {
      return `det(A) = ${det}`;
    }
  }, [tex, det]);

  return (
    <div
      role="region"
      aria-label="Formula KaTeX Determinan Terbaca"
      className="p-3.5 rounded-xl bg-neutral-900/90 border border-neutral-800 text-neutral-100 overflow-x-auto shadow-inner"
    >
      <div className="flex items-center justify-between text-xs text-neutral-400 font-semibold mb-1">
        <span>Formalisasi Simbolik Matriks:</span>
        <span
          className={`font-bold px-2 py-0.5 rounded ${
            det === 0
              ? "bg-rose-500/20 text-rose-300"
              : det < 0
              ? "bg-amber-500/20 text-amber-300"
              : "bg-emerald-500/20 text-emerald-300"
          }`}
        >
          {det === 0 ? "Singular (Det = 0)" : det < 0 ? "Refleksi (Det < 0)" : "Standar (Det > 0)"}
        </span>
      </div>
      <div
        className="text-base text-center py-1 tracking-wide"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
