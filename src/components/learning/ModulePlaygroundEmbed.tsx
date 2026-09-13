"use client";

import React, { useState, useEffect } from "react";
import { Canvas as ClockCanvas } from "@/modules/math/arithmetic-modular-clock/Canvas";
import { Controls as ClockControls } from "@/modules/math/arithmetic-modular-clock/Controls";
import { KaTeXFormula as ClockKaTeX } from "@/modules/math/arithmetic-modular-clock/KaTeXFormula";
import { ModularClockState } from "@/modules/math/arithmetic-modular-clock/engine";

import { Canvas as EuclidCanvas } from "@/modules/math/math-euclid/Canvas";
import { Controls as EuclidControls, EuclidState } from "@/modules/math/math-euclid/Controls";
import { KaTeXFormula as EuclidKaTeX } from "@/modules/math/math-euclid/KaTeXFormula";

import { Canvas as RealCanvas } from "@/modules/math/math-real-numbers-line/Canvas";
import { Controls as RealControls } from "@/modules/math/math-real-numbers-line/Controls";
import { KaTeXFormula as RealKaTeX } from "@/modules/math/math-real-numbers-line/KaTeXFormula";
import { RealNumberState } from "@/modules/math/math-real-numbers-line/engine";

import { Canvas as PrimesCanvas } from "@/modules/math/math-primes-coprime/Canvas";
import { Controls as PrimesControls } from "@/modules/math/math-primes-coprime/Controls";
import { KaTeXFormula as PrimesKaTeX } from "@/modules/math/math-primes-coprime/KaTeXFormula";
import { PrimesCoprimeState } from "@/modules/math/math-primes-coprime/engine";

import { Canvas as DetCanvas } from "@/modules/math/linear-algebra-determinant-2d/Canvas";
import { Controls as DetControls } from "@/modules/math/linear-algebra-determinant-2d/Controls";
import { KaTeXFormula as DetKaTeX } from "@/modules/math/linear-algebra-determinant-2d/KaTeXFormula";
import { DeterminantCanvasState } from "@/modules/math/linear-algebra-determinant-2d/engine";

import { InclinePlaygroundEmbed } from "./embeds/InclinePlaygroundEmbed";

export interface ModulePlaygroundEmbedProps {
  slug: string;
  initialVariables?: Record<string, number>;
  onVariablesChange?: (vars: Record<string, number>) => void;
  externalVariables?: Record<string, number> | null;
  challengeSidebar?: React.ReactNode;
  compact?: boolean;
}

export function ModulePlaygroundEmbed({
  slug,
  initialVariables = {},
  onVariablesChange,
  externalVariables,
  challengeSidebar,
  compact = false,
}: ModulePlaygroundEmbedProps) {
  // Support physics-newton-incline
  if (slug === "physics-newton-incline") {
    return (
      <InclinePlaygroundEmbed
        initialVariables={initialVariables}
        onVariablesChange={onVariablesChange}
        externalVariables={externalVariables}
        challengeSidebar={challengeSidebar}
      />
    );
  }

  return (
    <StandardModuleEmbed
      slug={slug}
      initialVariables={initialVariables}
      onVariablesChange={onVariablesChange}
      externalVariables={externalVariables}
      challengeSidebar={challengeSidebar}
      compact={compact}
    />
  );
}

function StandardModuleEmbed({
  slug,
  initialVariables = {},
  onVariablesChange,
  externalVariables,
  challengeSidebar,
  compact = false,
}: ModulePlaygroundEmbedProps) {
  // 1. Modular Clock State
  const [clockState, setClockState] = useState<ModularClockState>({
    n: initialVariables.n ?? 12,
    multiplier: initialVariables.multiplier ?? 2,
    activeNode: null,
    hourA: initialVariables.hourA ?? 9,
    hourB: initialVariables.hourB ?? 7,
  });

  // 2. Euclid State
  const [euclidState, setEuclidState] = useState<EuclidState>({
    width: initialVariables.width ?? 84,
    height: initialVariables.height ?? 52,
  });

  // 3. Real Numbers Line State
  const [realState, setRealState] = useState<RealNumberState>({
    point1: initialVariables.point1 ?? 3,
    point2: initialVariables.point2 ?? -4,
    scaleFactor: initialVariables.scaleFactor ?? 2,
    sqrtN: initialVariables.sqrtN ?? 2,
    zoomLevel: initialVariables.zoomLevel ?? 1,
    distribA: initialVariables.distribA ?? 3,
    distribB: initialVariables.distribB ?? 4,
    distribC: initialVariables.distribC ?? 2,
  });

  // 4. Primes & Coprime State
  const [primesState, setPrimesState] = useState<PrimesCoprimeState>({
    numberN: initialVariables.numberN ?? 12,
    coprimeA: initialVariables.coprimeA ?? 8,
    coprimeB: initialVariables.coprimeB ?? 9,
    sieveLimit: initialVariables.sieveLimit ?? 60,
    fermatBase: initialVariables.fermatBase ?? 3,
    fermatPrime: initialVariables.fermatPrime ?? 7,
  });

  // 5. Determinant 2D State
  const [detState, setDetState] = useState<DeterminantCanvasState>({
    i_hat_x: initialVariables.a ?? initialVariables.i_hat_x ?? 2,
    i_hat_y: initialVariables.c ?? initialVariables.i_hat_y ?? 0,
    j_hat_x: initialVariables.b ?? initialVariables.j_hat_x ?? 0,
    j_hat_y: initialVariables.d ?? initialVariables.j_hat_y ?? 2,
  });

  // Sync external variables (e.g. from Hint 4 auto-solver)
  useEffect(() => {
    if (!externalVariables) return;

    if (slug === "arithmetic-modular-clock") {
      setClockState((prev) => ({
        ...prev,
        n: externalVariables.n ?? prev.n,
        multiplier: externalVariables.multiplier ?? prev.multiplier,
        hourA: externalVariables.hourA ?? prev.hourA,
        hourB: externalVariables.hourB ?? prev.hourB,
      }));
    } else if (slug === "math-euclid") {
      setEuclidState((prev) => ({
        ...prev,
        width: externalVariables.width ?? prev.width,
        height: externalVariables.height ?? prev.height,
      }));
    } else if (slug === "math-real-numbers-line" || slug === "math-real-numbers") {
      setRealState((prev) => ({
        ...prev,
        point1: externalVariables.point1 ?? prev.point1,
        point2: externalVariables.point2 ?? prev.point2,
        scaleFactor: externalVariables.scaleFactor ?? prev.scaleFactor,
        sqrtN: externalVariables.sqrtN ?? prev.sqrtN,
        zoomLevel: externalVariables.zoomLevel ?? prev.zoomLevel,
      }));
    } else if (slug === "math-primes-coprime" || slug === "math-prime-factorization") {
      setPrimesState((prev) => ({
        ...prev,
        numberN: externalVariables.numberN ?? prev.numberN,
        coprimeA: externalVariables.coprimeA ?? prev.coprimeA,
        coprimeB: externalVariables.coprimeB ?? prev.coprimeB,
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
  }, [externalVariables, slug]);

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
    } else if (slug === "math-euclid") {
      onVariablesChange({
        width: euclidState.width,
        height: euclidState.height,
      });
    } else if (slug === "math-real-numbers-line" || slug === "math-real-numbers") {
      onVariablesChange({
        point1: realState.point1,
        point2: realState.point2,
        scaleFactor: realState.scaleFactor,
        sqrtN: realState.sqrtN,
        zoomLevel: realState.zoomLevel,
      });
    } else if (slug === "math-primes-coprime" || slug === "math-prime-factorization") {
      onVariablesChange({
        numberN: primesState.numberN,
        coprimeA: primesState.coprimeA,
        coprimeB: primesState.coprimeB,
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
  }, [clockState, euclidState, realState, primesState, detState, slug, onVariablesChange]);

  // RENDER 1: Modular Clock
  if (slug === "arithmetic-modular-clock") {
    if (compact) {
      return (
        <div className="w-full flex flex-col gap-2">
          <ClockKaTeX state={clockState} />
          <div className="w-full bg-neutral-900/90 border border-neutral-800 rounded-2xl p-2 shadow-lg flex items-center justify-center min-h-[160px] max-h-[220px] md:max-h-[300px]">
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
        </div>
      );
    }
    return (
      <div className="w-full flex flex-col gap-2.5">
        <ClockKaTeX state={clockState} />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
          <div className="lg:col-span-7 bg-neutral-900/90 border border-neutral-800 rounded-2xl p-3 shadow-lg flex items-center justify-center min-h-[240px] md:min-h-[320px]">
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
          <div className="lg:col-span-5 flex flex-col gap-3">
            {challengeSidebar && <div>{challengeSidebar}</div>}
            <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-4 shadow-lg max-h-[440px] overflow-y-auto">
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
      </div>
    );
  }

  // RENDER 2: Math Euclid
  if (slug === "math-euclid") {
    if (compact) {
      return (
        <div className="w-full flex flex-col gap-2">
          <EuclidKaTeX width={euclidState.width} height={euclidState.height} />
          <div className="w-full bg-neutral-900/90 border border-neutral-800 rounded-2xl p-2 shadow-lg flex items-center justify-center min-h-[160px] max-h-[220px] md:max-h-[300px]">
            <EuclidCanvas width={euclidState.width} height={euclidState.height} />
          </div>
        </div>
      );
    }
    return (
      <div className="w-full flex flex-col gap-2.5">
        <EuclidKaTeX width={euclidState.width} height={euclidState.height} />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
          <div className="lg:col-span-7 bg-neutral-900/90 border border-neutral-800 rounded-2xl p-3 shadow-lg flex items-center justify-center min-h-[240px] md:min-h-[320px]">
            <EuclidCanvas width={euclidState.width} height={euclidState.height} />
          </div>
          <div className="lg:col-span-5 flex flex-col gap-3">
            {challengeSidebar && <div>{challengeSidebar}</div>}
            <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-4 shadow-lg max-h-[440px] overflow-y-auto">
              <EuclidControls
                state={euclidState}
                onChange={(updater) => setEuclidState(updater)}
                onReset={() => setEuclidState({ width: 84, height: 52 })}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // RENDER 3: Real Numbers Line
  if (slug === "math-real-numbers-line" || slug === "math-real-numbers") {
    if (compact) {
      return (
        <div className="w-full flex flex-col gap-2">
          <RealKaTeX state={realState} />
          <div className="w-full bg-neutral-900/90 border border-neutral-800 rounded-2xl p-2 shadow-lg flex items-center justify-center min-h-[160px] max-h-[220px] md:max-h-[300px]">
            <RealCanvas state={realState} />
          </div>
        </div>
      );
    }
    return (
      <div className="w-full flex flex-col gap-2.5">
        <RealKaTeX state={realState} />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
          <div className="lg:col-span-7 bg-neutral-900/90 border border-neutral-800 rounded-2xl p-3 shadow-lg flex items-center justify-center min-h-[240px] md:min-h-[320px]">
            <RealCanvas state={realState} />
          </div>
          <div className="lg:col-span-5 flex flex-col gap-3">
            {challengeSidebar && <div>{challengeSidebar}</div>}
            <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-4 shadow-lg max-h-[440px] overflow-y-auto">
              <RealControls
                state={realState}
                onChange={setRealState}
                onReset={() =>
                  setRealState({
                    point1: 3,
                    point2: -4,
                    scaleFactor: 2,
                    sqrtN: 2,
                    zoomLevel: 1,
                    distribA: 3,
                    distribB: 4,
                    distribC: 2,
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // RENDER 4: Primes & Coprime
  if (slug === "math-primes-coprime" || slug === "math-prime-factorization") {
    if (compact) {
      return (
        <div className="w-full flex flex-col gap-2">
          <PrimesKaTeX state={primesState} />
          <div className="w-full bg-neutral-900/90 border border-neutral-800 rounded-2xl p-2 shadow-lg flex items-center justify-center min-h-[160px] max-h-[220px] md:max-h-[300px]">
            <PrimesCanvas state={primesState} />
          </div>
        </div>
      );
    }
    return (
      <div className="w-full flex flex-col gap-2.5">
        <PrimesKaTeX state={primesState} />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
          <div className="lg:col-span-7 bg-neutral-900/90 border border-neutral-800 rounded-2xl p-3 shadow-lg flex items-center justify-center min-h-[240px] md:min-h-[320px]">
            <PrimesCanvas
              state={primesState}
              onNumberSelect={(val) => setPrimesState((prev) => ({ ...prev, numberN: val }))}
            />
          </div>
          <div className="lg:col-span-5 flex flex-col gap-3">
            {challengeSidebar && <div>{challengeSidebar}</div>}
            <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-4 shadow-lg max-h-[440px] overflow-y-auto">
              <PrimesControls
                state={primesState}
                onChange={setPrimesState}
                onReset={() =>
                  setPrimesState({
                    numberN: 12,
                    coprimeA: 8,
                    coprimeB: 9,
                    sieveLimit: 60,
                    fermatBase: 3,
                    fermatPrime: 7,
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback: Linear Algebra 2D Determinant
  if (compact) {
    return (
      <div className="w-full flex flex-col gap-2">
        <DetKaTeX state={detState} />
        <div className="w-full bg-neutral-900/90 border border-neutral-800 rounded-2xl p-2 shadow-lg flex items-center justify-center min-h-[160px] max-h-[220px] md:max-h-[300px]">
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
      </div>
    );
  }
  return (
    <div className="w-full flex flex-col gap-2.5">
      <DetKaTeX state={detState} />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
        <div className="lg:col-span-7 bg-neutral-900/90 border border-neutral-800 rounded-2xl p-3 shadow-lg min-h-[240px] md:min-h-[340px]">
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
        <div className="lg:col-span-5 flex flex-col gap-3">
          {challengeSidebar && <div>{challengeSidebar}</div>}
          <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-4 shadow-lg max-h-[440px] overflow-y-auto">
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
    </div>
  );
}
