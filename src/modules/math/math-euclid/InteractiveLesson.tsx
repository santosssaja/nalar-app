"use client";

import React, { useState } from "react";
import { Canvas } from "./Canvas";
import { Controls, EuclidState } from "./Controls";
import { KaTeXFormula } from "./KaTeXFormula";
import { Challenge } from "./Challenge";
import { euclidLesson } from "./content";

export function InteractiveLesson() {
  const [state, setState] = useState<EuclidState>({
    width: euclidLesson.initialVariables.width,
    height: euclidLesson.initialVariables.height,
  });

  const [hoveredStepIndex, setHoveredStepIndex] = useState<number | null>(null);

  const handleReset = () => {
    setState({
      width: euclidLesson.initialVariables.width,
      height: euclidLesson.initialVariables.height,
    });
    setHoveredStepIndex(null);
  };

  return (
    <div className="space-y-6">
      {/* Interactive Playground Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Visual Canvas & KaTeX Formula (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <Canvas
            width={state.width}
            height={state.height}
            selectedStepIndex={hoveredStepIndex}
            onTileHover={setHoveredStepIndex}
          />
          <KaTeXFormula
            width={state.width}
            height={state.height}
            highlightedStepIndex={hoveredStepIndex}
          />
        </div>

        {/* Right Column: Interactive Sliders & Logic Challenges (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <Controls
            state={state}
            onChange={setState}
            onReset={handleReset}
          />
          <Challenge currentState={state} />
        </div>
      </div>
    </div>
  );
}
