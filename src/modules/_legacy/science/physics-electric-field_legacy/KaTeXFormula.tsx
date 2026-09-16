"use client";

import React, { useMemo } from "react";
import katex from "katex";
import {
  calculateCoulombForce,
  calculateElectricFieldAtPoint,
  calculateElectricPotential,
  calculateTestChargeForce,
} from "./engine";

interface KaTeXFormulaProps {
  q1: number;
  q2: number;
  distance: number;
  testCharge: number;
  testPosX: number;
  testPosY: number;
}

export function KaTeXFormula({
  q1,
  q2,
  distance,
  testCharge,
  testPosX,
  testPosY,
}: KaTeXFormulaProps) {
  const force = useMemo(
    () => calculateCoulombForce(q1, q2, distance),
    [q1, q2, distance]
  );

  const charges = useMemo(
    () => [
      { id: "q1", q: q1, x: -distance / 2, y: 0 },
      { id: "q2", q: q2, x: distance / 2, y: 0 },
    ],
    [q1, q2, distance]
  );

  const field = useMemo(
    () => calculateElectricFieldAtPoint(charges, { x: testPosX, y: testPosY }),
    [charges, testPosX, testPosY]
  );

  const potential = useMemo(
    () => calculateElectricPotential(charges, { x: testPosX, y: testPosY }),
    [charges, testPosX, testPosY]
  );

  const testForce = useMemo(
    () => calculateTestChargeForce(field, testCharge),
    [field, testCharge]
  );

  const renderedFormulas = useMemo(() => {
    const render = (tex: string) => {
      try {
        return katex.renderToString(tex, { displayMode: false, throwOnError: false });
      } catch {
        return tex;
      }
    };

    const typeDesc = force.isAttractive
      ? "\\text{Tarik-Menarik}"
      : force.isRepulsive
      ? "\\text{Tolak-Menolak}"
      : "\\text{Netral}";

    const coulombTex = `F = k \\frac{|q_1 q_2|}{r^2} = 8.99 \\times 10^9 \\frac{|(${q1})(${q2})| \\times 10^{-12}}{(${distance.toFixed(2)})^2} = \\mathbf{${force.forceN.toFixed(4)}\\text{ N}} \\quad (${typeDesc})`;

    const fieldTex = `\\vec{E} = (${(field.ex / 1000).toFixed(2)}\\hat{i} + ${(field.ey / 1000).toFixed(2)}\\hat{j})\\text{ kN/C}, \\quad |\\vec{E}| = \\mathbf{${(field.magnitude / 1000).toFixed(2)}\\text{ kN/C}}`;

    const testTex = `\\vec{F}_{\\text{uji}} = q_t \\vec{E} = (${testCharge}\\mu\\text{C})(${(field.magnitude / 1000).toFixed(1)}\\text{ kN/C}) = \\mathbf{${(testForce.forceMagnitude * 1000).toFixed(2)}\\text{ mN}}`;

    const potTex = `V = \\sum \\frac{k q_i}{r_i} = \\mathbf{${(potential / 1000).toFixed(2)}\\text{ kV}}`;

    return {
      coulomb: render(coulombTex),
      field: render(fieldTex),
      test: render(testTex),
      potential: render(potTex),
    };
  }, [force, field, testForce, potential, q1, q2, distance, testCharge]);

  return (
    <div
      className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-4 space-y-3"
      aria-label="Persamaan Matematika Medan Listrik Reaktif"
    >
      <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
          Hukum Coulomb & Medan Elektrostatik
        </span>
        <span className="text-xs text-neutral-400">
          k ≈ 8.99 × 10⁹ N·m²/C²
        </span>
      </div>

      <div className="space-y-2 text-sm text-neutral-200">
        <div className="bg-neutral-950/60 p-2.5 rounded-lg border border-neutral-800/80">
          <div className="text-xs text-neutral-400 mb-1 font-medium">Gaya Antar Dua Muatan:</div>
          <div
            className="overflow-x-auto py-1"
            dangerouslySetInnerHTML={{ __html: renderedFormulas.coulomb }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="bg-neutral-950/60 p-2.5 rounded-lg border border-neutral-800/80">
            <div className="text-xs text-neutral-400 mb-1 font-medium">Kuat Medan di Posisi Uji:</div>
            <div
              className="overflow-x-auto py-1"
              dangerouslySetInnerHTML={{ __html: renderedFormulas.field }}
            />
          </div>

          <div className="bg-neutral-950/60 p-2.5 rounded-lg border border-neutral-800/80">
            <div className="text-xs text-neutral-400 mb-1 font-medium">Gaya & Potensial pada Muatan Uji:</div>
            <div
              className="overflow-x-auto py-1"
              dangerouslySetInnerHTML={{ __html: renderedFormulas.test }}
            />
            <div
              className="overflow-x-auto pt-1 text-xs text-neutral-400"
              dangerouslySetInnerHTML={{ __html: renderedFormulas.potential }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
