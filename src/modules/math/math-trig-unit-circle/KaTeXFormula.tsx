"use client";

import React, { useMemo } from "react";
import katex from "katex";
import { computeUnitCircle } from "./engine";

interface KaTeXFormulaProps {
  angleDegrees: number;
}

export function KaTeXFormula({ angleDegrees }: KaTeXFormulaProps) {
  const metrics = useMemo(() => computeUnitCircle(angleDegrees), [angleDegrees]);

  const { cos, sin, tan, isTanUndefined, exactLabel, angleRadians, quadrant } = metrics;

  const coordTex = useMemo(() => {
    const degStr = `${Math.round(metrics.angleDegrees)}^\\circ`;
    const radStr = exactLabel?.rad ?? `${(angleRadians / Math.PI).toFixed(2)}\\pi`;
    const cosStr = exactLabel?.cos ?? cos.toFixed(3);
    const sinStr = exactLabel?.sin ?? sin.toFixed(3);

    const tex = `P(\\theta) = P(${degStr}) = (${cosStr}, ${sinStr}) \\quad [${radStr}\\text{ rad}]`;
    try {
      return katex.renderToString(tex, { displayMode: true, throwOnError: false });
    } catch {
      return `P(${degStr}) = (${cosStr}, ${sinStr})`;
    }
  }, [metrics.angleDegrees, angleRadians, cos, sin, exactLabel]);

  const identityTex = useMemo(() => {
    const sinSq = (sin * sin).toFixed(3);
    const cosSq = (cos * cos).toFixed(3);
    const sum = (sin * sin + cos * cos).toFixed(2);
    const tex = `\\sin^2(\\theta) + \\cos^2(\\theta) = ${sinSq} + ${cosSq} = \\mathbf{${sum}}`;
    try {
      return katex.renderToString(tex, { displayMode: false, throwOnError: false });
    } catch {
      return `sin²(θ) + cos²(θ) = 1.00`;
    }
  }, [sin, cos]);

  const tanTex = useMemo(() => {
    if (isTanUndefined) {
      const tex = `\\tan(\\theta) = \\frac{\\sin(\\theta)}{\\cos(\\theta)} = \\frac{${sin > 0 ? "1" : "-1"}}{0} = \\text{tak terdefinisi}`;
      try {
        return katex.renderToString(tex, { displayMode: false, throwOnError: false });
      } catch {
        return "tan(θ) tidak terdefinisi";
      }
    }
    const tanStr = exactLabel?.tan ?? tan?.toFixed(3) ?? "0";
    const tex = `\\tan(\\theta) = \\frac{\\sin(\\theta)}{\\cos(\\theta)} = ${tanStr}`;
    try {
      return katex.renderToString(tex, { displayMode: false, throwOnError: false });
    } catch {
      return `tan(θ) = ${tanStr}`;
    }
  }, [isTanUndefined, exactLabel, sin, tan]);

  return (
    <div
      role="region"
      aria-label="Formula Matematika Reaktif Trigonometri"
      className="p-4 rounded-xl bg-neutral-900/90 border border-neutral-800 text-neutral-100 shadow-inner space-y-3"
    >
      <div className="flex items-center justify-between text-xs text-neutral-400 font-semibold border-b border-neutral-800/80 pb-2">
        <span>Koordinat Titik pada Lingkaran Satuan:</span>
        <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 text-[11px] font-mono">
          Kuadran {["I", "II", "III", "IV"][quadrant - 1]}
        </span>
      </div>

      {/* Main Coordinate Formula */}
      <div
        className="py-1 px-3 bg-neutral-950/60 rounded-lg overflow-x-auto text-cyan-300"
        dangerouslySetInnerHTML={{ __html: coordTex }}
      />

      {/* Ratios & Identity Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        <div className="p-2.5 rounded-lg bg-neutral-950/40 border border-neutral-800/60 flex flex-col gap-1">
          <span className="text-neutral-400 font-medium">Rasio Tangen:</span>
          <div
            className="overflow-x-auto text-amber-300 font-mono text-xs"
            dangerouslySetInnerHTML={{ __html: tanTex }}
          />
        </div>

        <div className="p-2.5 rounded-lg bg-neutral-950/40 border border-neutral-800/60 flex flex-col gap-1">
          <span className="text-neutral-400 font-medium">Identitas Pythagoras:</span>
          <div
            className="overflow-x-auto text-emerald-300 font-mono text-xs"
            dangerouslySetInnerHTML={{ __html: identityTex }}
          />
        </div>
      </div>
    </div>
  );
}
