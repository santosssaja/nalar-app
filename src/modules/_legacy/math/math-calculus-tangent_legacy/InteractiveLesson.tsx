"use client";

import React, { useState } from "react";
import { Canvas } from "./Canvas";
import { Controls } from "./Controls";
import { KaTeXFormula } from "./KaTeXFormula";
import { Challenge } from "./Challenge";
import { TangentCanvasState, INITIAL_TANGENT_STATE } from "./engine";

export function InteractiveLesson() {
  const [state, setState] = useState<TangentCanvasState>(INITIAL_TANGENT_STATE);

  const handleStateChange = (patch: Partial<TangentCanvasState>) => {
    setState((prev) => ({ ...prev, ...patch }));
  };

  const handlePointAMove = (a: number) => {
    setState((prev) => ({ ...prev, a }));
  };

  return (
    <div className="space-y-6">
      {/* Interactive Playground Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Visual Canvas & KaTeX Formula (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <Canvas
            state={state}
            onPointAMove={handlePointAMove}
          />
          <KaTeXFormula
            funcKey={state.funcKey}
            a={state.a}
            deltaX={state.deltaX}
          />
        </div>

        {/* Right Column: Controls & Challenges (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <Controls
            state={state}
            onChange={handleStateChange}
          />
          <Challenge currentState={state} />
        </div>
      </div>
    </div>
  );
}
