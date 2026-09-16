"use client";

import React, { useMemo } from "react";
import katex from "katex";
import { calculateWave, calculateInterference, WaveDisplayMode } from "./engine";

interface KaTeXFormulaProps {
  mode: WaveDisplayMode;
  amplitude: number;
  frequency: number;
  wavelength: number;
  phaseDeg: number;
  wave2Amplitude: number;
  wave2PhaseDeg: number;
}

export function KaTeXFormula({
  mode,
  amplitude,
  frequency,
  wavelength,
  phaseDeg,
  wave2Amplitude,
  wave2PhaseDeg,
}: KaTeXFormulaProps) {
  const wMetrics = useMemo(
    () => calculateWave({ amplitude, frequency, wavelength, phaseDeg }),
    [amplitude, frequency, wavelength, phaseDeg]
  );

  const intMetrics = useMemo(
    () =>
      calculateInterference({
        wave1: { amplitude, frequency, wavelength, phaseDeg },
        wave2: { amplitude: wave2Amplitude, frequency, wavelength, phaseDeg: wave2PhaseDeg },
      }),
    [amplitude, frequency, wavelength, phaseDeg, wave2Amplitude, wave2PhaseDeg]
  );

  const formulas = useMemo(() => {
    const render = (tex: string) => {
      try {
        return katex.renderToString(tex, { displayMode: false, throwOnError: false });
      } catch {
        return tex;
      }
    };

    const speedTex = `v = \\lambda f = ${wavelength} \\times ${frequency} = \\mathbf{${wMetrics.waveSpeed}\\text{ m/s}}, \\quad T = \\mathbf{${wMetrics.period}\\text{ s}}`;
    const paramsTex = `k = \\frac{2\\pi}{\\lambda} = \\mathbf{${wMetrics.waveNumber}\\text{ rad/m}}, \\quad \\omega = 2\\pi f = \\mathbf{${wMetrics.angularFrequency}\\text{ rad/s}}`;
    const waveEqTex = `y(x, t) = ${amplitude} \\sin(${wMetrics.waveNumber} x - ${wMetrics.angularFrequency} t + ${phaseDeg}^\\circ)`;

    let interferenceTex = "";
    if (mode === "interference") {
      const diff = intMetrics.phaseDifferenceDeg;
      if (intMetrics.isConstructive) {
        interferenceTex = `\\Delta\\phi = ${diff}^\\circ \\implies \\mathbf{\\text{Interferensi Konstruktif (Puncak Berlipat Ganda)}}`;
      } else if (intMetrics.isDestructive) {
        interferenceTex = `\\Delta\\phi = ${diff}^\\circ \\implies \\mathbf{\\text{Interferensi Destruktif (Saling Meniadakan / Hening)}}`;
      } else {
        interferenceTex = `\\Delta\\phi = ${diff}^\\circ \\implies \\text{Superposisi Beda Fase Parsial}`;
      }
    }

    return {
      speed: render(speedTex),
      params: render(paramsTex),
      waveEq: render(waveEqTex),
      interference: interferenceTex ? render(interferenceTex) : null,
    };
  }, [mode, amplitude, frequency, wavelength, phaseDeg, wMetrics, intMetrics]);

  return (
    <div
      role="region"
      aria-label="Formula Matematika Gelombang Mekanik"
      className="p-4 rounded-xl bg-neutral-900/90 border border-neutral-800 text-neutral-100 shadow-inner space-y-3"
    >
      <div className="flex items-center justify-between text-xs text-neutral-400 font-semibold border-b border-neutral-800/80 pb-2">
        <span>Persamaan Gelombang Berjalan & Cepat Rambat:</span>
        <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 text-[11px] font-mono font-bold">
          v = λ · f
        </span>
      </div>

      <div className="space-y-2 text-xs sm:text-sm font-mono leading-relaxed overflow-x-auto">
        <div dangerouslySetInnerHTML={{ __html: formulas.speed }} />
        <div dangerouslySetInnerHTML={{ __html: formulas.params }} />
        <div className="p-2 rounded-lg bg-neutral-800/60" dangerouslySetInnerHTML={{ __html: formulas.waveEq }} />
        {formulas.interference && (
          <div
            className={`p-2 rounded-lg ${
              intMetrics.isConstructive
                ? "bg-emerald-950/40 border border-emerald-500/30 text-emerald-300"
                : intMetrics.isDestructive
                ? "bg-indigo-950/40 border border-indigo-500/30 text-indigo-300"
                : "bg-neutral-800/60 text-neutral-300"
            }`}
            dangerouslySetInnerHTML={{ __html: formulas.interference }}
          />
        )}
      </div>
    </div>
  );
}
