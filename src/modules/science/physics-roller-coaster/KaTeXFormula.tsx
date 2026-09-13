"use client";

import React, { useMemo } from "react";
import katex from "katex";
import { calculateRollerCoaster } from "./engine";

interface KaTeXFormulaProps {
  initialHeight: number;
  loopRadius: number;
  mass: number;
  gravity: number;
}

export function KaTeXFormula({
  initialHeight,
  loopRadius,
  mass,
  gravity,
}: KaTeXFormulaProps) {
  const metrics = useMemo(
    () =>
      calculateRollerCoaster({
        initialHeight,
        loopRadius,
        mass,
        gravity,
      }),
    [initialHeight, loopRadius, mass, gravity]
  );

  const formulas = useMemo(() => {
    const totalKJ = (metrics.totalEnergy / 1000).toFixed(1);
    const eTex = `E_M = E_P + E_K = mg h_0 = ${mass} \\times ${gravity} \\times ${initialHeight} = \\mathbf{${totalKJ}\\text{ kJ}}`;
    const bottomTex = `v_{\\text{dasar}} = \\sqrt{2gh_0} = \\sqrt{2 \\times ${gravity} \\times ${initialHeight}} = \\mathbf{${metrics.speedAtBottom}\\text{ m/s}}`;
    const loopCondTex = `h_{\\text{kritis}} = \\frac{5}{2} R = 2.5 \\times ${loopRadius} = \\mathbf{${metrics.minLoopHeightRequired}\\text{ m}}, \\quad v_{\\text{kritis}} = \\sqrt{gR} = \\mathbf{${metrics.criticalSpeedAtLoopTop}\\text{ m/s}}`;
    const loopActualTex = metrics.canCompleteLoop
      ? `v_{\\text{puncak}} = \\mathbf{${metrics.speedAtLoopTop}\\text{ m/s}}, \\quad N_{\\text{puncak}} = m\\left(\\frac{v^2}{R} - g\\right) = \\mathbf{${metrics.normalForceAtLoopTop}\\text{ N}}`
      : `v_{\\text{puncak}} = \\mathbf{${metrics.speedAtLoopTop}\\text{ m/s}} < v_{\\text{kritis}} \\implies \\mathbf{\\text{Kereta Jatuh Sebelum Puncak Loop!}}`;

    const render = (tex: string) => {
      try {
        return katex.renderToString(tex, { displayMode: false, throwOnError: false });
      } catch {
        return tex;
      }
    };

    return {
      energy: render(eTex),
      bottom: render(bottomTex),
      loopCond: render(loopCondTex),
      loopActual: render(loopActualTex),
    };
  }, [initialHeight, loopRadius, mass, gravity, metrics]);

  return (
    <div
      role="region"
      aria-label="Formula Konservasi Energi Roller Coaster"
      className="p-4 rounded-xl bg-neutral-900/90 border border-neutral-800 text-neutral-100 shadow-inner space-y-3"
    >
      <div className="flex items-center justify-between text-xs text-neutral-400 font-semibold border-b border-neutral-800/80 pb-2">
        <span>Hukum Kekekalan Energi Mekanik & Syarat Loop:</span>
        <span
          className={`px-2 py-0.5 rounded text-[11px] font-bold ${
            metrics.canCompleteLoop
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
              : "bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-pulse"
          }`}
        >
          {metrics.canCompleteLoop ? "Loop Berhasil Dilalui" : "Gagal: Kecepatan Kurang"}
        </span>
      </div>

      <div className="space-y-2 text-xs sm:text-sm font-mono leading-relaxed overflow-x-auto">
        <div dangerouslySetInnerHTML={{ __html: formulas.energy }} />
        <div dangerouslySetInnerHTML={{ __html: formulas.bottom }} />
        <div dangerouslySetInnerHTML={{ __html: formulas.loopCond }} />
        <div
          className={`p-2 rounded-lg ${
            metrics.canCompleteLoop
              ? "bg-emerald-950/30 border border-emerald-500/30"
              : "bg-rose-950/40 border border-rose-500/40 text-rose-300"
          }`}
          dangerouslySetInnerHTML={{ __html: formulas.loopActual }}
        />
      </div>
    </div>
  );
}
