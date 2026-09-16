"use client";

import React from "react";
import { evaluateQuadratic } from "./engine";

interface CanvasProps {
  state: { a: number; h: number; k: number; xInput: number };
}

export function Canvas({ state }: CanvasProps) {
  const { a, h, k, xInput } = state;

  // View bounds: x in [-6, 6], y in [-4, 8]
  // SVG size: 600 x 220
  const toSvgX = (x: number) => ((x + 6) / 12) * 560 + 20;
  const toSvgY = (y: number) => 220 - (((y + 4) / 12) * 200 + 10);

  // Generate curve sample points: y = a*(x - h)^2 + k
  const curvePoints: string[] = [];
  for (let x = -6; x <= 6; x += 0.2) {
    const y = a * Math.pow(x - h, 2) + k;
    if (y >= -5 && y <= 15) {
      curvePoints.push(`${toSvgX(x).toFixed(1)},${toSvgY(y).toFixed(1)}`);
    }
  }
  const pathD = curvePoints.length > 0 ? `M ${curvePoints.join(" L ")}` : "";

  // Target input point
  const currentY = a * Math.pow(xInput - h, 2) + k;
  const svgCurrentX = toSvgX(xInput);
  const svgCurrentY = toSvgY(currentY);

  return (
    <div className="w-full bg-neutral-950 border border-neutral-800 rounded-2xl p-4 shadow-inner">
      <div className="flex items-center justify-between mb-2 text-xs text-neutral-400">
        <span className="font-mono">Bidang Kartesius 2D</span>
        <span className="font-mono text-indigo-400">
          f({xInput}) = {currentY.toFixed(2)} | Vertex: ({h}, {k})
        </span>
      </div>

      <svg
        viewBox="0 0 600 220"
        className="w-full h-48 select-none"
        aria-label="Kanvas Grafik Fungsi Kartesius Interaktif"
        role="img"
      >
        {/* Grid lines */}
        {[-4, -2, 0, 2, 4].map((gx) => (
          <line
            key={`gx-${gx}`}
            x1={toSvgX(gx)}
            y1={10}
            x2={toSvgX(gx)}
            y2={210}
            stroke="#262626"
            strokeWidth="1"
          />
        ))}
        {[-2, 0, 2, 4, 6].map((gy) => (
          <line
            key={`gy-${gy}`}
            x1={20}
            y1={toSvgY(gy)}
            x2={580}
            y2={toSvgY(gy)}
            stroke="#262626"
            strokeWidth="1"
          />
        ))}

        {/* Axes */}
        <line x1="20" y1={toSvgY(0)} x2="580" y2={toSvgY(0)} stroke="#525252" strokeWidth="2" />
        <line x1={toSvgX(0)} y1="10" x2={toSvgX(0)} y2="210" stroke="#525252" strokeWidth="2" />
        <text x="575" y={toSvgY(0) - 6} fontSize="11" fill="#737373" fontFamily="monospace">x</text>
        <text x={toSvgX(0) + 6} y="20" fontSize="11" fill="#737373" fontFamily="monospace">y</text>

        {/* The Plotted Function Curve */}
        {pathD && (
          <path
            d={pathD}
            fill="none"
            stroke="#6366f1"
            strokeWidth="3"
            strokeLinecap="round"
            className="transition-all duration-150"
          />
        )}

        {/* Vertex Point (h, k) */}
        <circle cx={toSvgX(h)} cy={toSvgY(k)} r="5" fill="#f43f5e" />
        <text x={toSvgX(h)} y={toSvgY(k) - 8} textAnchor="middle" fontSize="10" fill="#fda4af" fontWeight="bold">
          Puncak ({h}, {k})
        </text>

        {/* Current evaluated point at xInput */}
        {currentY >= -4 && currentY <= 8 && (
          <g>
            <line
              x1={svgCurrentX}
              y1={toSvgY(0)}
              x2={svgCurrentX}
              y2={svgCurrentY}
              stroke="#38bdf8"
              strokeDasharray="3 3"
              strokeWidth="1.5"
            />
            <circle cx={svgCurrentX} cy={svgCurrentY} r="7" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
            <text x={svgCurrentX} y={svgCurrentY - 10} textAnchor="middle" fontSize="11" fill="#38bdf8" fontWeight="bold">
              ({xInput}, {currentY.toFixed(1)})
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}
