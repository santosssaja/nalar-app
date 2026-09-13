"use client";

import React, { useMemo } from "react";
import katex from "katex";
import { calculateInclineForces } from "./engine";

interface KaTeXFormulaProps {
  angleDeg: number;
  mass: number;
  frictionCoeff: number;
  gravity: number;
  inclineLength: number;
}

export function KaTeXFormula({
  angleDeg,
  mass,
  frictionCoeff,
  gravity,
  inclineLength,
}: KaTeXFormulaProps) {
  const forces = useMemo(
    () =>
      calculateInclineForces({
        angleDeg,
        mass,
        frictionCoeff,
        gravity,
        inclineLength,
      }),
    [angleDeg, mass, frictionCoeff, gravity, inclineLength]
  );

  const formulas = useMemo(() => {
    const degStr = `${Math.round(angleDeg)}^\\circ`;
    const fTex = `W = mg = ${mass} \\times ${gravity} = \\mathbf{${forces.weight}\\text{ N}}`;
    const decompTex = `W_\\parallel = W \\sin(${degStr}) = \\mathbf{${forces.weightParallel}\\text{ N}}, \\quad W_\\perp = W \\cos(${degStr}) = \\mathbf{${forces.weightPerpendicular}\\text{ N}}`;
    const normalTex = `N = W_\\perp = \\mathbf{${forces.normalForce}\\text{ N}}, \\quad f_k = \\mu N = \\mathbf{${forces.frictionForce}\\text{ N}}`;
    const accTex = forces.isSliding
      ? `F_{\\text{net}} = W_\\parallel - f_k = \\mathbf{${forces.netForce}\\text{ N}} \\implies a = \\frac{F_{\\text{net}}}{m} = \\mathbf{${forces.acceleration}\\text{ m/s}^2}`
      : `W_\\parallel \\le f_{s,\\text{max}} \\implies \\mathbf{\\text{Diam Seimbang (Kesetimbangan Statis, } a = 0)}`;
    const motionTex = forces.isSliding
      ? `v_{\\text{akhir}} = \\sqrt{2aL} = \\mathbf{${forces.finalVelocity}\\text{ m/s}}, \\quad t = \\mathbf{${forces.timeToBottom}\\text{ s}}`
      : `v_{\\text{akhir}} = 0\\text{ m/s}, \\quad t = \\infty`;

    const render = (tex: string) => {
      try {
        return katex.renderToString(tex, { displayMode: false, throwOnError: false });
      } catch {
        return tex;
      }
    };

    return {
      weight: render(fTex),
      decomp: render(decompTex),
      normal: render(normalTex),
      acc: render(accTex),
      motion: render(motionTex),
    };
  }, [angleDeg, mass, gravity, forces]);

  return (
    <div
      role="region"
      aria-label="Formula Matematika Reaktif Bidang Miring Newton"
      className="p-4 rounded-xl bg-neutral-900/90 border border-neutral-800 text-neutral-100 shadow-inner space-y-3"
    >
      <div className="flex items-center justify-between text-xs text-neutral-400 font-semibold border-b border-neutral-800/80 pb-2">
        <span>Dekomposisi Vektor Gaya & Hukum II Newton:</span>
        <span
          className={`px-2 py-0.5 rounded text-[11px] font-bold ${
            forces.isSliding
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
              : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
          }`}
        >
          {forces.isSliding ? "Meluncur Bergerak" : "Diam Statis"}
        </span>
      </div>

      <div className="space-y-2 text-xs sm:text-sm font-mono leading-relaxed overflow-x-auto">
        <div dangerouslySetInnerHTML={{ __html: formulas.weight }} />
        <div dangerouslySetInnerHTML={{ __html: formulas.decomp }} />
        <div dangerouslySetInnerHTML={{ __html: formulas.normal }} />
        <div
          className={`p-2 rounded-lg ${
            forces.isSliding ? "bg-indigo-950/40 border border-indigo-500/30" : "bg-neutral-800/60"
          }`}
          dangerouslySetInnerHTML={{ __html: formulas.acc }}
        />
        <div dangerouslySetInnerHTML={{ __html: formulas.motion }} />
      </div>
    </div>
  );
}
