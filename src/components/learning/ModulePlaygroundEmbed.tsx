"use client";

import React, { useState, useEffect } from "react";
import { Canvas as ClockCanvas } from "@/modules/math/arithmetic-modular-clock/Canvas";
import { Controls as ClockControls } from "@/modules/math/arithmetic-modular-clock/Controls";
import { KaTeXFormula as ClockKaTeX } from "@/modules/math/arithmetic-modular-clock/KaTeXFormula";
import { ModularClockState } from "@/modules/math/arithmetic-modular-clock/engine";

import { Canvas as DetCanvas } from "@/modules/math/linear-algebra-determinant-2d/Canvas";
import { Controls as DetControls } from "@/modules/math/linear-algebra-determinant-2d/Controls";
import { KaTeXFormula as DetKaTeX } from "@/modules/math/linear-algebra-determinant-2d/KaTeXFormula";
import { DeterminantCanvasState } from "@/modules/math/linear-algebra-determinant-2d/engine";

export interface ModulePlaygroundEmbedProps {
  slug: string;
  initialVariables?: Record<string, number>;
  onVariablesChange?: (vars: Record<string, number>) => void;
  externalVariables?: Record<string, number> | null;
}

export function ModulePlaygroundEmbed({
  slug,
  initialVariables = {},
  onVariablesChange,
  externalVariables,
}: ModulePlaygroundEmbedProps) {
  // Modular Clock State
  const [clockState, setClockState] = useState<ModularClockState>({
    n: initialVariables.n ?? 12,
    multiplier: initialVariables.multiplier ?? 2,
    activeNode: null,
    hourA: initialVariables.hourA ?? 9,
    hourB: initialVariables.hourB ?? 7,
  });

  // Determinant 2D State
  const [detState, setDetState] = useState<DeterminantCanvasState>({
    i_hat_x: initialVariables.a ?? initialVariables.i_hat_x ?? 2,
    i_hat_y: initialVariables.c ?? initialVariables.i_hat_y ?? 0,
    j_hat_x: initialVariables.b ?? initialVariables.j_hat_x ?? 0,
    j_hat_y: initialVariables.d ?? initialVariables.j_hat_y ?? 2,
  });

  // Sync external variables (e.g. from Hint 4 auto-solver) during render
  const [prevExternal, setPrevExternal] = useState(externalVariables);
  if (externalVariables !== prevExternal) {
    setPrevExternal(externalVariables);
    if (externalVariables) {
      if (slug === "arithmetic-modular-clock") {
        setClockState((prev) => ({
          ...prev,
          n: externalVariables.n ?? prev.n,
          multiplier: externalVariables.multiplier ?? prev.multiplier,
          hourA: externalVariables.hourA ?? prev.hourA,
          hourB: externalVariables.hourB ?? prev.hourB,
        }));
      } else if (slug === "linear-algebra-determinant-2d") {
        setDetState((prev) => ({
          ...prev,
          i_hat_x: externalVariables.a ?? externalVariables.i_hat_x ?? prev.i_hat_x,
          i_hat_y: externalVariables.c ?? externalVariables.i_hat_y ?? prev.i_hat_y,
          j_hat_x: externalVariables.b ?? externalVariables.j_hat_x ?? prev.j_hat_x,
          j_hat_y: externalVariables.d ?? externalVariables.j_hat_y ?? prev.j_hat_y,
        }));
      }
    }
  }

  // Notify parent of variable changes
  useEffect(() => {
    if (!onVariablesChange) return;

    if (slug === "arithmetic-modular-clock") {
      onVariablesChange({
        n: clockState.n,
        multiplier: clockState.multiplier,
        hourA: clockState.hourA,
        hourB: clockState.hourB,
      });
    } else if (slug === "linear-algebra-determinant-2d") {
      onVariablesChange({
        a: detState.i_hat_x,
        b: detState.j_hat_x,
        c: detState.i_hat_y,
        d: detState.j_hat_y,
        i_hat_x: detState.i_hat_x,
        i_hat_y: detState.i_hat_y,
        j_hat_x: detState.j_hat_x,
        j_hat_y: detState.j_hat_y,
      });
    }
  }, [clockState, detState, slug, onVariablesChange]);

  if (slug === "arithmetic-modular-clock") {
    return (
      <div className="w-full space-y-4">
        <ClockKaTeX state={clockState} />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 bg-neutral-900/90 border border-neutral-800 rounded-3xl p-4 shadow-xl flex items-center justify-center min-h-[380px]">
            <ClockCanvas
              state={clockState}
              onNodeClick={(idx) =>
                setClockState((prev) => ({
                  ...prev,
                  activeNode: prev.activeNode === idx ? null : idx,
                }))
              }
            />
          </div>
          <div className="lg:col-span-5 bg-neutral-900/90 border border-neutral-800 rounded-3xl p-5 shadow-xl">
            <ClockControls
              state={clockState}
              onChange={(next) => setClockState(next)}
              onReset={() =>
                setClockState({
                  n: 12,
                  multiplier: 2,
                  activeNode: null,
                  hourA: 9,
                  hourB: 7,
                })
              }
            />
          </div>
        </div>
      </div>
    );
  }

  // Linear Algebra 2D Determinant
  return (
    <div className="w-full space-y-4">
      <DetKaTeX state={detState} />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 bg-neutral-900/90 border border-neutral-800 rounded-3xl p-4 shadow-xl min-h-[420px]">
          <DetCanvas
            state={detState}
            onVectorMove={(key, pt) =>
              setDetState((prev) => ({
                ...prev,
                [key === "i" ? "i_hat_x" : "j_hat_x"]: pt[0],
                [key === "i" ? "i_hat_y" : "j_hat_y"]: pt[1],
              }))
            }
          />
        </div>
        <div className="lg:col-span-5 bg-neutral-900/90 border border-neutral-800 rounded-3xl p-5 shadow-xl">
          <DetControls
            state={detState}
            onChange={(next) => setDetState(next)}
            onReset={() =>
              setDetState({
                i_hat_x: 2,
                i_hat_y: 0,
                j_hat_x: 0,
                j_hat_y: 2,
              })
            }
          />
        </div>
      </div>
    </div>
  );
}
