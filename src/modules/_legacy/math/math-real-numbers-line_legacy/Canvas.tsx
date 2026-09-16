"use client";

import React, { useMemo } from "react";
import { RealNumberState, generateNumberLineTicks } from "./engine";

interface CanvasProps {
  state: RealNumberState;
  onPointMove?: (pointKey: "point1" | "point2", val: number) => void;
}

export function Canvas({ state, onPointMove }: CanvasProps) {
  const width = 640;
  const height = 320;
  const originY = 160;
  const originX = width / 2;

  // Scale: pixels per unit on the number line
  const pixelsPerUnit = 28 * Math.max(0.4, Math.min(3, state.zoomLevel || 1));

  // Convert real number coordinate to SVG X position
  const toSvgX = (val: number) => originX + val * pixelsPerUnit;

  const ticks = useMemo(() => {
    return generateNumberLineTicks(0, state.zoomLevel || 1, width);
  }, [state.zoomLevel, width]);

  const xA = toSvgX(state.point1);
  const xB = toSvgX(state.point2);
  const xScaled = toSvgX(state.point1 * state.scaleFactor);

  // Square root geometry: right triangle 1 x sqrt(n-1) -> hypotenuse sqrt(n)
  const sqrtVal = Math.sqrt(Math.max(0, state.sqrtN));
  const xSqrt = toSvgX(sqrtVal);

  return (
    <div
      role="region"
      aria-label="Kanvas Interaktif Garis Bilangan Riil"
      className="relative w-full rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-2xl flex flex-col"
    >
      {/* HUD Header */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-neutral-900/90 border-b border-neutral-800 backdrop-blur-md text-[11px] sm:text-xs">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span className="font-bold text-neutral-200">Garis Bilangan Riil</span>
          <span className="text-neutral-500 hidden sm:inline">•</span>
          <span className="text-neutral-400 hidden sm:inline">Zoom: {(state.zoomLevel || 1).toFixed(1)}×</span>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs">
          <span className="px-1.5 py-0.5 rounded bg-blue-950/60 border border-blue-800 text-blue-300 font-mono">
            A={state.point1}
          </span>
          <span className="px-1.5 py-0.5 rounded bg-amber-950/60 border border-amber-800 text-amber-300 font-mono">
            B={state.point2}
          </span>
          <span className="px-1.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-800 text-emerald-300 font-mono font-bold">
            Δx={Number((state.point2 - state.point1).toFixed(2))}
          </span>
        </div>
      </div>

      {/* SVG Viewport */}
      <div className="relative w-full h-[180px] sm:h-[260px] md:h-[320px] flex items-center justify-center bg-gradient-to-b from-neutral-950 to-neutral-900/40 select-none">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <marker
              id="arrow-right"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
            </marker>
            <marker
              id="arrow-scale"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#06b6d4" />
            </marker>
          </defs>

          {/* Grid Background Lines */}
          <g stroke="#262626" strokeWidth="0.5">
            {ticks.map((t, idx) => {
              const x = toSvgX(t.value);
              return <line key={`grid-${idx}`} x1={x} y1={20} x2={x} y2={height - 20} />;
            })}
          </g>

          {/* Main Number Line Axis */}
          <line
            x1={10}
            y1={originY}
            x2={width - 10}
            y2={originY}
            stroke="#525252"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Axis Arrows */}
          <path d={`M 15 ${originY - 5} L 5 ${originY} L 15 ${originY + 5}`} fill="#737373" />
          <path d={`M ${width - 15} ${originY - 5} L ${width - 5} ${originY} L ${width - 15} ${originY + 5}`} fill="#737373" />

          {/* Ticks and Labels */}
          {ticks.map((t, idx) => {
            const x = toSvgX(t.value);
            if (x < 15 || x > width - 15) return null;
            const isZero = t.value === 0;

            return (
              <g key={`tick-${idx}`}>
                <line
                  x1={x}
                  y1={originY - (isZero ? 14 : t.isMajor ? 10 : 5)}
                  x2={x}
                  y2={originY + (isZero ? 14 : t.isMajor ? 10 : 5)}
                  stroke={isZero ? "#38bdf8" : t.isMajor ? "#a3a3a3" : "#525252"}
                  strokeWidth={isZero ? 3 : t.isMajor ? 1.5 : 1}
                />
                {t.isMajor && (
                  <text
                    x={x}
                    y={originY + 24}
                    textAnchor="middle"
                    className={`text-[11px] font-mono select-none ${
                      isZero ? "fill-sky-400 font-bold" : "fill-neutral-400"
                    }`}
                  >
                    {t.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* Displacement Vector Arrow from A to B */}
          {Math.abs(xA - xB) > 2 && (
            <g>
              <path
                d={`M ${xA} ${originY - 20} Q ${(xA + xB) / 2} ${originY - 45} ${xB} ${originY - 20}`}
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeDasharray="4 2"
                markerEnd="url(#arrow-right)"
              />
              <text
                x={(xA + xB) / 2}
                y={originY - 52}
                textAnchor="middle"
                className="fill-emerald-400 font-mono text-[11px] font-bold"
              >
                Δx = {Number((state.point2 - state.point1).toFixed(2))}
              </text>
            </g>
          )}

          {/* Scaled Point Vector Preview */}
          {state.scaleFactor !== 1 && (
            <g opacity="0.85">
              <line
                x1={toSvgX(0)}
                y1={originY + 45}
                x2={xScaled}
                y2={originY + 45}
                stroke="#06b6d4"
                strokeWidth="2"
                strokeDasharray="3 3"
                markerEnd="url(#arrow-scale)"
              />
              <circle cx={xScaled} cy={originY + 45} r="4" fill="#06b6d4" />
              <text
                x={xScaled}
                y={originY + 62}
                textAnchor="middle"
                className="fill-cyan-400 font-mono text-[10px]"
              >
                A × {state.scaleFactor} = {Number((state.point1 * state.scaleFactor).toFixed(2))}
              </text>
            </g>
          )}

          {/* Square Root Drop Arc (Pythagoras) */}
          {state.sqrtN > 0 && (
            <g opacity="0.75">
              <circle
                cx={originX}
                cy={originY}
                r={sqrtVal * pixelsPerUnit}
                fill="none"
                stroke="#c084fc"
                strokeWidth="1"
                strokeDasharray="2 4"
              />
              <line
                x1={originX}
                y1={originY}
                x2={originX}
                y2={originY - sqrtVal * pixelsPerUnit}
                stroke="#c084fc"
                strokeWidth="1.5"
              />
              <line
                x1={originX}
                y1={originY - sqrtVal * pixelsPerUnit}
                x2={xSqrt}
                y2={originY}
                stroke="#c084fc"
                strokeWidth="1.5"
              />
              <circle cx={xSqrt} cy={originY} r="5" fill="#c084fc" />
              <text
                x={xSqrt}
                y={originY - 10}
                textAnchor="middle"
                className="fill-purple-300 font-mono text-[11px] font-bold"
              >
                √{state.sqrtN} ≈ {sqrtVal.toFixed(2)}
              </text>
            </g>
          )}

          {/* Point A Marker */}
          <g className="cursor-pointer">
            <circle cx={xA} cy={originY} r="9" fill="#3b82f6" className="filter drop-shadow-md" />
            <circle cx={xA} cy={originY} r="4" fill="#ffffff" />
            <text x={xA} y={originY - 14} textAnchor="middle" className="fill-blue-400 font-bold text-xs">
              A ({state.point1})
            </text>
          </g>

          {/* Point B Marker */}
          <g className="cursor-pointer">
            <circle cx={xB} cy={originY} r="9" fill="#f59e0b" className="filter drop-shadow-md" />
            <circle cx={xB} cy={originY} r="4" fill="#ffffff" />
            <text x={xB} y={originY + 36} textAnchor="middle" className="fill-amber-400 font-bold text-xs">
              B ({state.point2})
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
