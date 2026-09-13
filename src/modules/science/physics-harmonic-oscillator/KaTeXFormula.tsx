"use client";

import React, { useMemo } from "react";
import katex from "katex";
import { calculatePendulum, calculateSpring, OscillatorMode } from "./engine";

interface KaTeXFormulaProps {
  mode: OscillatorMode;
  length: number;
  initialAngleDeg: number;
  gravity: number;
  springConstant: number;
  mass: number;
  amplitude: number;
}

export function KaTeXFormula({
  mode,
  length,
  initialAngleDeg,
  gravity,
  springConstant,
  mass,
  amplitude,
}: KaTeXFormulaProps) {
  const pMetrics = useMemo(
    () => calculatePendulum({ length, initialAngleDeg, gravity }),
    [length, initialAngleDeg, gravity]
  );

  const sMetrics = useMemo(
    () => calculateSpring({ springConstant, mass, amplitude }),
    [springConstant, mass, amplitude]
  );

  const formulas = useMemo(() => {
    const render = (tex: string) => {
      try {
        return katex.renderToString(tex, { displayMode: false, throwOnError: false });
      } catch {
        return tex;
      }
    };

    if (mode === "pendulum") {
      const tTex = `T = 2\\pi\\sqrt{\\frac{L}{g}} = 2\\pi\\sqrt{\\frac{${length}}{${gravity}}} = \\mathbf{${pMetrics.period}\\text{ s}}`;
      const fTex = `f = \\frac{1}{T} = \\mathbf{${pMetrics.frequency}\\text{ Hz}}, \\quad \\omega = \\sqrt{\\frac{g}{L}} = \\mathbf{${pMetrics.angularFrequency}\\text{ rad/s}}`;
      const eqTex = `\\theta(t) = \\theta_0 \\cos(\\omega t) = ${initialAngleDeg}^\\circ \\cos(${pMetrics.angularFrequency} t)`;
      return {
        line1: render(tTex),
        line2: render(fTex),
        line3: render(eqTex),
      };
    } else {
      const tTex = `T = 2\\pi\\sqrt{\\frac{m}{k}} = 2\\pi\\sqrt{\\frac{${mass}}{${springConstant}}} = \\mathbf{${sMetrics.period}\\text{ s}}`;
      const fTex = `f = \\frac{1}{T} = \\mathbf{${sMetrics.frequency}\\text{ Hz}}, \\quad \\omega = \\sqrt{\\frac{k}{m}} = \\mathbf{${sMetrics.angularFrequency}\\text{ rad/s}}`;
      const eTex = `E_{\\text{total}} = \\frac{1}{2}kA^2 = 0.5 \\times ${springConstant} \\times (${amplitude})^2 = \\mathbf{${sMetrics.totalEnergy}\\text{ J}}`;
      return {
        line1: render(tTex),
        line2: render(fTex),
        line3: render(eTex),
      };
    }
  }, [mode, length, initialAngleDeg, gravity, springConstant, mass, amplitude, pMetrics, sMetrics]);

  return (
    <div
      role="region"
      aria-label="Formula Matematika Reaktif Osilator Harmonik"
      className="p-4 rounded-xl bg-neutral-900/90 border border-neutral-800 text-neutral-100 shadow-inner space-y-3"
    >
      <div className="flex items-center justify-between text-xs text-neutral-400 font-semibold border-b border-neutral-800/80 pb-2">
        <span>Persamaan Karakteristik & Frekuensi {mode === "pendulum" ? "Bandul" : "Pegas"}:</span>
        <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 text-[11px] font-mono font-bold">
          {mode === "pendulum" ? "T = 2π√(L/g)" : "T = 2π√(m/k)"}
        </span>
      </div>

      <div className="space-y-2 text-xs sm:text-sm font-mono leading-relaxed overflow-x-auto">
        <div dangerouslySetInnerHTML={{ __html: formulas.line1 }} />
        <div dangerouslySetInnerHTML={{ __html: formulas.line2 }} />
        <div
          className="p-2 rounded-lg bg-neutral-800/60"
          dangerouslySetInnerHTML={{ __html: formulas.line3 }}
        />
      </div>
    </div>
  );
}
