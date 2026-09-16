"use client";

import React, { useMemo } from "react";
import katex from "katex";
import { computeProjectileMetrics } from "./engine";

interface KaTeXFormulaProps {
  angleDegrees: number;
  v0: number;
  g: number;
  h0: number;
}

export function KaTeXFormula({ angleDegrees, v0, g, h0 }: KaTeXFormulaProps) {
  const metrics = useMemo(
    () => computeProjectileMetrics({ angleDegrees, v0, g, h0 }),
    [angleDegrees, v0, g, h0]
  );

  const { v0x, v0y, range, maxHeight, flightTime } = metrics;

  const velTex = useMemo(() => {
    const degStr = `${Math.round(angleDegrees)}^\\circ`;
    const v0Str = v0.toFixed(1);
    const tex = `v_{0x} = ${v0Str} \\cos(${degStr}) = ${v0x.toFixed(1)} \\text{ m/s}, \\quad v_{0y} = ${v0Str} \\sin(${degStr}) = ${v0y.toFixed(1)} \\text{ m/s}`;
    try {
      return katex.renderToString(tex, { displayMode: false, throwOnError: false });
    } catch {
      return `v0x = ${v0x.toFixed(1)}, v0y = ${v0y.toFixed(1)}`;
    }
  }, [angleDegrees, v0, v0x, v0y]);

  const trajectoryTex = useMemo(() => {
    const rTex = `R = \\frac{v_0^2 \\sin(2\\theta)}{g} = \\mathbf{${range.toFixed(2)} \\text{ m}}`;
    const hTex = `H_{\\text{max}} = \\frac{v_{0y}^2}{2g} = \\mathbf{${maxHeight.toFixed(2)} \\text{ m}}`;
    const tTex = `t_{\\text{terbang}} = \\mathbf{${flightTime.toFixed(2)} \\text{ s}}`;
    try {
      return {
        r: katex.renderToString(rTex, { displayMode: false, throwOnError: false }),
        h: katex.renderToString(hTex, { displayMode: false, throwOnError: false }),
        t: katex.renderToString(tTex, { displayMode: false, throwOnError: false }),
      };
    } catch {
      return {
        r: `R = ${range.toFixed(2)} m`,
        h: `H = ${maxHeight.toFixed(2)} m`,
        t: `t = ${flightTime.toFixed(2)} s`,
      };
    }
  }, [range, maxHeight, flightTime]);

  return (
    <div
      role="region"
      aria-label="Formula Matematika Reaktif Kinematika Parabola"
      className="p-4 rounded-xl bg-neutral-900/90 border border-neutral-800 text-neutral-100 shadow-inner space-y-3"
    >
      <div className="flex items-center justify-between text-xs text-neutral-400 font-semibold border-b border-neutral-800/80 pb-2">
        <span>Dekomposisi Vektor Kecepatan & Persamaan Gerak:</span>
        <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 text-[11px] font-mono">
          θ = {Math.round(angleDegrees)}°, v₀ = {v0} m/s
        </span>
      </div>

      <div className="p-2.5 rounded-lg bg-neutral-950/60 border border-neutral-800/60 overflow-x-auto text-cyan-300 text-xs">
        <div dangerouslySetInnerHTML={{ __html: velTex }} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
        <div className="p-2 rounded-lg bg-neutral-950/40 border border-neutral-800/60 flex flex-col gap-1">
          <span className="text-neutral-400 font-medium">Jangkauan Horizontal:</span>
          <div
            className="text-cyan-300 font-mono"
            dangerouslySetInnerHTML={{ __html: trajectoryTex.r }}
          />
        </div>

        <div className="p-2 rounded-lg bg-neutral-950/40 border border-neutral-800/60 flex flex-col gap-1">
          <span className="text-neutral-400 font-medium">Ketinggian Maksimum:</span>
          <div
            className="text-amber-300 font-mono"
            dangerouslySetInnerHTML={{ __html: trajectoryTex.h }}
          />
        </div>

        <div className="p-2 rounded-lg bg-neutral-950/40 border border-neutral-800/60 flex flex-col gap-1">
          <span className="text-neutral-400 font-medium">Waktu Terbang Total:</span>
          <div
            className="text-purple-300 font-mono"
            dangerouslySetInnerHTML={{ __html: trajectoryTex.t }}
          />
        </div>
      </div>
    </div>
  );
}
