"use client";

import React, { useMemo, useCallback } from "react";
import {
  Mafs,
  Coordinates,
  Circle,
  Line,
  Polygon,
  Point,
  MovablePoint,
  Plot,
  Theme,
} from "mafs";
import {
  TrigCanvasState,
  computeUnitCircle,
  radToDeg,
  normalizeDegrees,
} from "./engine";

interface CanvasProps {
  state: TrigCanvasState;
  onAngleChange: (deg: number) => void;
}

export function Canvas({ state, onAngleChange }: CanvasProps) {
  const metrics = useMemo(
    () => computeUnitCircle(state.angleDegrees),
    [state.angleDegrees]
  );

  const { cos, sin, tan, isTanUndefined, quadrant, angleRadians } = metrics;

  // Drag handler on the unit circle circumference
  const handlePointMove = useCallback(
    ([x, y]: [number, number]) => {
      const rawDeg = radToDeg(Math.atan2(y, x));
      const norm = normalizeDegrees(rawDeg);
      onAngleChange(Math.round(norm));
    },
    [onAngleChange]
  );

  // Clamped tangent endpoint for stable rendering
  const tangentY = useMemo(() => {
    if (isTanUndefined || tan === null) return 0;
    return Math.max(-2.5, Math.min(2.5, tan));
  }, [tan, isTanUndefined]);

  return (
    <div
      role="region"
      aria-label="Kanvas Interaktif Lingkaran Satuan Trigonometri"
      className="relative w-full rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-2xl flex flex-col"
    >
      {/* HUD Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-neutral-900/90 border-b border-neutral-800 backdrop-blur-md text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
          <span className="font-bold text-neutral-200">Lingkaran Satuan (r = 1)</span>
          <span className="text-neutral-500">•</span>
          <span className="text-neutral-400">Tarik titik merah atau geser slider</span>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-2.5 py-1 rounded-md bg-neutral-800 text-cyan-300 font-bold border border-neutral-700">
            θ: {metrics.angleDegrees}° ({(angleRadians / Math.PI).toFixed(2)}π)
          </span>
          <span className="px-2 py-1 rounded-md bg-purple-950/60 text-purple-300 border border-purple-800 font-semibold">
            Kuadran {["I", "II", "III", "IV"][quadrant - 1]}
          </span>
        </div>
      </div>

      {/* Mafs Math Canvas */}
      <div className="relative w-full h-[400px] bg-neutral-950 flex items-center justify-center select-none">
        <Mafs
          viewBox={{ x: [-1.8, 1.8], y: [-1.8, 1.8] }}
          preserveAspectRatio={false}
          pan={false}
          zoom={false}
          height={400}
        >
          <Coordinates.Cartesian subdivisions={2} />

          {/* Unit Circle */}
          <Circle
            center={[0, 0]}
            radius={1}
            color={Theme.indigo}
            fillOpacity={0.05}
            weight={1.5}
          />

          {/* Angle Arc */}
          {angleRadians > 0.05 && (
            <Plot.Parametric
              xy={(t) => [0.25 * Math.cos(t), 0.25 * Math.sin(t)]}
              t={[0, angleRadians]}
              color={Theme.yellow}
              weight={2}
            />
          )}

          {/* Right Triangle Fill */}
          <Polygon
            points={[
              [0, 0],
              [cos, 0],
              [cos, sin],
            ]}
            color={Theme.indigo}
            fillOpacity={0.15}
          />

          {/* Cosine Segment (Horizontal / Base) */}
          {state.showCos && (
            <Line.Segment
              point1={[0, 0]}
              point2={[cos, 0]}
              color={Theme.blue}
              weight={3.5}
            />
          )}

          {/* Sine Segment (Vertical / Altitude) */}
          {state.showSin && (
            <Line.Segment
              point1={[cos, 0]}
              point2={[cos, sin]}
              color={Theme.green}
              weight={3.5}
            />
          )}

          {/* Hypotenuse / Radius Line */}
          <Line.Segment
            point1={[0, 0]}
            point2={[cos, sin]}
            color={Theme.indigo}
            weight={2.5}
          />

          {/* Tangent Vertical Projection at x = 1 (if angle in Q1 or Q4) */}
          {state.showTan && !isTanUndefined && (
            <>
              {/* Vertical line tangent at x = 1 */}
              <Line.Segment
                point1={[1, -2.5]}
                point2={[1, 2.5]}
                color={Theme.foreground}
                weight={0.8}
                style="dashed"
              />
              {/* Tangent height */}
              <Line.Segment
                point1={[1, 0]}
                point2={[1, tangentY]}
                color={Theme.orange}
                weight={3}
              />
              {/* Radial extension line */}
              <Line.Segment
                point1={[0, 0]}
                point2={[1, tangentY]}
                color={Theme.orange}
                weight={1.2}
                style="dashed"
              />
            </>
          )}

          {/* Interactive Movable Point on Circle */}
          <MovablePoint
            point={[cos, sin]}
            onMove={handlePointMove}
            color={Theme.red}
          />

          {/* Base Origin Point */}
          <Point x={0} y={0} color={Theme.foreground} />
        </Mafs>
      </div>

      {/* Canvas Footer Legend */}
      <div className="flex flex-wrap items-center justify-around gap-2 px-4 py-2 bg-neutral-900/90 border-t border-neutral-800 text-xs text-neutral-300">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-1 bg-blue-500 rounded-full" />
          <span>cos(θ) = {cos.toFixed(3)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-1 bg-emerald-500 rounded-full" />
          <span>sin(θ) = {sin.toFixed(3)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-1 bg-amber-500 rounded-full" />
          <span>
            tan(θ) = {isTanUndefined ? "∞ (tak terdefinisi)" : tan?.toFixed(3)}
          </span>
        </div>
      </div>
    </div>
  );
}
