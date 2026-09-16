"use client";

import React, { useMemo } from "react";
import katex from "katex";
import { calculateDCCircuit, CircuitTopology } from "./engine";

interface KaTeXFormulaProps {
  voltage: number;
  r1: number;
  r2: number;
  r3: number;
  topology: CircuitTopology;
  isSwitchClosed: boolean;
}

export function KaTeXFormula({
  voltage,
  r1,
  r2,
  r3,
  topology,
  isSwitchClosed,
}: KaTeXFormulaProps) {
  const result = useMemo(
    () =>
      calculateDCCircuit({
        voltage,
        r1,
        r2,
        r3,
        topology,
        isSwitchClosed,
      }),
    [voltage, r1, r2, r3, topology, isSwitchClosed]
  );

  const formulas = useMemo(() => {
    const render = (tex: string) => {
      try {
        return katex.renderToString(tex, { displayMode: false, throwOnError: false });
      } catch {
        return tex;
      }
    };

    let reqTex = "";
    if (topology === "series") {
      reqTex = `R_{\\text{eq}} = R_1 + R_2 = ${r1} + ${r2} = \\mathbf{${result.equivalentResistance}\\ \\Omega}`;
    } else if (topology === "parallel") {
      reqTex = `\\frac{1}{R_{\\text{eq}}} = \\frac{1}{R_1} + \\frac{1}{R_2} = \\frac{1}{${r1}} + \\frac{1}{${r2}} \\implies R_{\\text{eq}} = \\mathbf{${result.equivalentResistance}\\ \\Omega}`;
    } else {
      const r23 = ((r2 * r3) / (r2 + r3)).toFixed(2);
      reqTex = `R_{\\text{eq}} = R_1 + (R_2 \\parallel R_3) = ${r1} + ${r23} = \\mathbf{${result.equivalentResistance}\\ \\Omega}`;
    }

    const ohmTex = isSwitchClosed
      ? `I_{\\text{total}} = \\frac{V}{R_{\\text{eq}}} = \\frac{${voltage}\\text{ V}}{${result.equivalentResistance}\\ \\Omega} = \\mathbf{${result.totalCurrent}\\text{ A}}`
      : `I_{\\text{total}} = \\mathbf{0\\text{ A}} \\quad (\\text{Sakelar Terbuka})`;

    const powerTex = isSwitchClosed
      ? `P_{\\text{total}} = V \\times I = ${voltage} \\times ${result.totalCurrent} = \\mathbf{${result.totalPower}\\text{ W}}`
      : `P = \\mathbf{0\\text{ W}}`;

    const branchSummary = result.resistors
      .map((res) => `${res.id}: ${res.voltageDrop}V, ${res.current}A, ${res.power}W`)
      .join("  |  ");

    return {
      req: render(reqTex),
      ohm: render(ohmTex),
      power: render(powerTex),
      branchSummary,
    };
  }, [voltage, r1, r2, r3, topology, isSwitchClosed, result]);

  return (
    <div
      className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-4 space-y-3"
      aria-label="Persamaan Matematika Rangkaian DC Reaktif"
    >
      <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
          Hukum Ohm & Daya Listrik DC
        </span>
        <span className="text-xs text-neutral-400">
          V = IR, P = VI = I²R
        </span>
      </div>

      <div className="space-y-2 text-sm text-neutral-200">
        <div className="bg-neutral-950/60 p-2.5 rounded-lg border border-neutral-800/80">
          <div className="text-xs text-neutral-400 mb-1 font-medium">Hambatan Pengganti (Ekuivalen):</div>
          <div
            className="overflow-x-auto py-1"
            dangerouslySetInnerHTML={{ __html: formulas.req }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="bg-neutral-950/60 p-2.5 rounded-lg border border-neutral-800/80">
            <div className="text-xs text-neutral-400 mb-1 font-medium">Arus Total Sirkuit:</div>
            <div
              className="overflow-x-auto py-1"
              dangerouslySetInnerHTML={{ __html: formulas.ohm }}
            />
          </div>

          <div className="bg-neutral-950/60 p-2.5 rounded-lg border border-neutral-800/80">
            <div className="text-xs text-neutral-400 mb-1 font-medium">Disipasi Daya Total (Joule):</div>
            <div
              className="overflow-x-auto py-1"
              dangerouslySetInnerHTML={{ __html: formulas.power }}
            />
          </div>
        </div>

        <div className="bg-neutral-950/40 p-2 rounded-lg border border-neutral-800/60 text-xs text-neutral-400 flex items-center justify-between">
          <span className="text-amber-300 font-medium">Status Komponen:</span>
          <span className="font-mono text-neutral-300">{formulas.branchSummary}</span>
        </div>
      </div>
    </div>
  );
}
