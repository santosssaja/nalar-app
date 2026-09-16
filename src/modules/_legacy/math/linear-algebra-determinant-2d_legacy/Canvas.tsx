"use client";

import React, { useMemo } from "react";
import { Mafs, Coordinates, Vector, Polygon, MovablePoint, Theme } from "mafs";
import {
  DeterminantCanvasState,
  getParallelogramVertices,
  computeDeterminantMetrics,
} from "./engine";

interface CanvasProps {
  state: DeterminantCanvasState;
  onVectorMove: (key: "i" | "j", point: [number, number]) => void;
}

export function Canvas({ state, onVectorMove }: CanvasProps) {
  const { det, area, isSingular, isFlipped } = useMemo(
    () => computeDeterminantMetrics(state),
    [state]
  );

  const vertices = useMemo(() => getParallelogramVertices(state), [state]);

  // Dynamic polygon color based on mathematical state
  const polygonColor = useMemo(() => {
    if (isSingular) return Theme.red;
    if (isFlipped) return Theme.yellow;
    return Theme.indigo;
  }, [isSingular, isFlipped]);

  return (
    <div
      role="region"
      aria-label="Kanvas Interaktif Transformasi Determinan Matriks 2D"
      className="relative w-full rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-2xl flex flex-col"
    >
      {/* Visual State HUD Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-neutral-900/90 border-b border-neutral-800 backdrop-blur-md text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
          <span className="font-bold text-neutral-200">Kanvas Spasial 2D</span>
          <span className="text-neutral-500">•</span>
          <span className="text-neutral-400">Tarik ujung panah untuk eksperimen</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-md bg-neutral-800 font-mono font-bold text-neutral-200 border border-neutral-700">
            Luas (|det|): <span className="text-amber-300">{area.toFixed(2)}</span>
          </span>
          <span
            className={`px-2 py-1 rounded-md font-semibold border ${
              isSingular
                ? "bg-rose-950/60 text-rose-300 border-rose-800"
                : isFlipped
                ? "bg-amber-950/60 text-amber-300 border-amber-800"
                : "bg-emerald-950/60 text-emerald-300 border-emerald-800"
            }`}
          >
            det = {det > 0 ? `+${det.toFixed(2)}` : det.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Mafs Math Canvas Viewport */}
      <div className="relative w-full h-[380px] bg-neutral-950 flex items-center justify-center select-none">
        <Mafs
          viewBox={{ x: [-3.5, 3.5], y: [-3.5, 3.5] }}
          preserveAspectRatio={false}
          pan={false}
          zoom={false}
          height={380}
        >
          <Coordinates.Cartesian
            subdivisions={2}
          />

          {/* Transformed Unit Parallelogram */}
          <Polygon
            points={vertices}
            color={polygonColor}
            fillOpacity={isSingular ? 0.05 : 0.35}
            strokeOpacity={isSingular ? 0.3 : 0.8}
            weight={2}
          />

          {/* Basis Vector i_hat (Emerald) */}
          <Vector
            tip={[state.i_hat_x, state.i_hat_y]}
            color="#10b981"
            weight={3}
          />
          <MovablePoint
            point={[state.i_hat_x, state.i_hat_y]}
            onMove={(pt) => onVectorMove("i", [Number(pt[0].toFixed(2)), Number(pt[1].toFixed(2))])}
            color="#10b981"
            aria-label="Ujung vektor basis i_hat"
          />

          {/* Basis Vector j_hat (Sky Blue) */}
          <Vector
            tip={[state.j_hat_x, state.j_hat_y]}
            color="#38bdf8"
            weight={3}
          />
          <MovablePoint
            point={[state.j_hat_x, state.j_hat_y]}
            onMove={(pt) => onVectorMove("j", [Number(pt[0].toFixed(2)), Number(pt[1].toFixed(2))])}
            color="#38bdf8"
            aria-label="Ujung vektor basis j_hat"
          />
        </Mafs>

        {/* Sensory guidance overlay for deaf / visual learners */}
        {isSingular && (
          <div className="absolute top-4 left-4 pointer-events-none px-3 py-1.5 rounded-lg bg-rose-950/80 border border-rose-500/80 text-rose-200 text-xs font-semibold backdrop-blur-sm animate-bounce">
            ⚠️ Dimensi Gepeng: Determinan 0 (Ruang mengempis ke 1 garis)
          </div>
        )}
        {isFlipped && !isSingular && (
          <div className="absolute top-4 left-4 pointer-events-none px-3 py-1.5 rounded-lg bg-amber-950/80 border border-amber-500/80 text-amber-200 text-xs font-semibold backdrop-blur-sm">
            🔄 Orientasi Terbalik: Ruang terbalik seperti bayangan cermin
          </div>
        )}
      </div>

      {/* Vector Legend */}
      <div className="flex items-center justify-around px-4 py-2 bg-neutral-900/60 border-t border-neutral-800/80 text-xs text-neutral-400">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-1 bg-emerald-500 rounded" />
          <span>Vektor î = [{state.i_hat_x}, {state.i_hat_y}]</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-1 bg-sky-400 rounded" />
          <span>Vektor ĵ = [{state.j_hat_x}, {state.j_hat_y}]</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 bg-indigo-500/50 border border-indigo-400 rounded" />
          <span>Luas Jajaran Genjang</span>
        </div>
      </div>
    </div>
  );
}
