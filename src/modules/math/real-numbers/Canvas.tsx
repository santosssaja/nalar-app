"use client";

import React from "react";
import { RealNumberState, distanceBetween, midpoint } from "./engine";

interface CanvasProps {
  state: RealNumberState;
  onPointChange?: (point: "point1" | "point2", val: number) => void;
}

export function Canvas({ state, onPointChange }: CanvasProps) {
  const { point1, point2, scaleFactor } = state;
  const scaledP1 = point1 * scaleFactor;
  const dist = distanceBetween(point1, point2);
  const mid = midpoint(point1, point2);

  // View window: from -10 to +10 mapped to SVG coordinates (width: 600, height: 200)
  const minX = -10;
  const maxX = 10;
  const toSvgX = (x: number) => ((x - minX) / (maxX - minX)) * 560 + 20;

  const ticks = Array.from({ length: 21 }, (_, i) => i - 10);

  return (
    <div className="w-full bg-neutral-950 border border-neutral-800 rounded-2xl p-4 shadow-inner">
      <div className="flex items-center justify-between mb-3 text-xs text-neutral-400">
        <span className="font-mono">Kontinum 1D: [-10, +10]</span>
        <span className="font-mono text-indigo-400">
          Jarak |a - b| = {dist.toFixed(2)} | Titik Tengah = {mid.toFixed(2)}
        </span>
      </div>

      <svg
        viewBox="0 0 600 180"
        className="w-full h-44 select-none"
        aria-label="Kanvas Garis Bilangan Riil Interaktif"
        role="img"
      >
        {/* Main horizontal axis line */}
        <line
          x1="20"
          y1="100"
          x2="580"
          y2="100"
          stroke="#525252"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Arrows */}
        <polygon points="15,100 25,95 25,105" fill="#737373" />
        <polygon points="585,100 575,95 575,105" fill="#737373" />

        {/* Ticks and labels */}
        {ticks.map((t) => {
          const x = toSvgX(t);
          const isZero = t === 0;
          return (
            <g key={t}>
              <line
                x1={x}
                y1={isZero ? 88 : 94}
                x2={x}
                y2={isZero ? 112 : 106}
                stroke={isZero ? "#38bdf8" : "#404040"}
                strokeWidth={isZero ? "2.5" : "1.5"}
              />
              {t % 2 === 0 && (
                <text
                  x={x}
                  y="126"
                  textAnchor="middle"
                  fontSize="11"
                  fill={isZero ? "#38bdf8" : "#a3a3a3"}
                  fontFamily="monospace"
                  fontWeight={isZero ? "bold" : "normal"}
                >
                  {t}
                </text>
              )}
            </g>
          );
        })}

        {/* Distance span bar */}
        <line
          x1={toSvgX(Math.min(point1, point2))}
          y1="60"
          x2={toSvgX(Math.max(point1, point2))}
          y2="60"
          stroke="#818cf8"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        <text
          x={toSvgX(mid)}
          y="52"
          textAnchor="middle"
          fontSize="11"
          fill="#818cf8"
          fontFamily="monospace"
        >
          Δ = {dist.toFixed(1)}
        </text>

        {/* Midpoint marker */}
        <circle cx={toSvgX(mid)} cy="100" r="4" fill="#a78bfa" opacity="0.8" />

        {/* Point 1 (A) */}
        <g
          className="cursor-pointer transition-transform duration-100"
          onClick={() => onPointChange?.("point1", point1 + 1)}
        >
          <circle
            cx={toSvgX(point1)}
            cy="100"
            r="9"
            fill="#38bdf8"
            stroke="#0284c7"
            strokeWidth="2.5"
          />
          <text
            x={toSvgX(point1)}
            y="82"
            textAnchor="middle"
            fontSize="12"
            fontWeight="bold"
            fill="#38bdf8"
          >
            A ({point1})
          </text>
        </g>

        {/* Point 2 (B) */}
        <g
          className="cursor-pointer transition-transform duration-100"
          onClick={() => onPointChange?.("point2", point2 - 1)}
        >
          <circle
            cx={toSvgX(point2)}
            cy="100"
            r="9"
            fill="#f43f5e"
            stroke="#be123c"
            strokeWidth="2.5"
          />
          <text
            x={toSvgX(point2)}
            y="82"
            textAnchor="middle"
            fontSize="12"
            fontWeight="bold"
            fill="#f43f5e"
          >
            B ({point2})
          </text>
        </g>

        {/* Scale Dilation Marker for Point 1 if scaled */}
        {scaleFactor !== 1 && (
          <g>
            <circle
              cx={toSvgX(Math.min(10, Math.max(-10, scaledP1)))}
              cy="100"
              r="7"
              fill="#fbbf24"
              stroke="#d97706"
              strokeWidth="2"
              strokeDasharray="2 2"
            />
            <text
              x={toSvgX(Math.min(10, Math.max(-10, scaledP1)))}
              y="148"
              textAnchor="middle"
              fontSize="11"
              fill="#fbbf24"
              fontWeight="bold"
            >
              A × {scaleFactor} = {scaledP1.toFixed(1)}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}
