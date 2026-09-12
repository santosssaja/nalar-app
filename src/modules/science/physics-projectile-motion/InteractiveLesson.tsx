"use client";

import React, { useState } from "react";
import { Canvas } from "./Canvas";
import { Controls } from "./Controls";
import { KaTeXFormula } from "./KaTeXFormula";
import { Challenge } from "./Challenge";
import { ProjectileCanvasState, INITIAL_PROJECTILE_STATE } from "./engine";

export function InteractiveLesson() {
  const [state, setState] = useState<ProjectileCanvasState>(INITIAL_PROJECTILE_STATE);

  const handleStateChange = (patch: Partial<ProjectileCanvasState>) => {
    setState((prev) => ({ ...prev, ...patch }));
  };

  return (
    <div className="space-y-6">
      {/* Interactive Playground Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Visual Canvas & KaTeX Formula (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <Canvas state={state} />
          <KaTeXFormula
            angleDegrees={state.angleDegrees}
            v0={state.v0}
            g={state.g}
            h0={state.h0}
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
