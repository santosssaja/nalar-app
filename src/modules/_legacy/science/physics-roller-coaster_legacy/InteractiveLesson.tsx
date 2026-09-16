"use client";

import React, { useState } from "react";
import { Canvas } from "./Canvas";
import { Controls } from "./Controls";
import { KaTeXFormula } from "./KaTeXFormula";
import { Challenge } from "./Challenge";
import { rollerCoasterLesson } from "./content";
import { RollerCoasterState } from "./engine";
import { useAccessibility } from "@/context/AccessibilityContext";

export function InteractiveLesson() {
  const [state, setState] = useState<RollerCoasterState>({
    initialHeight: rollerCoasterLesson.initialVariables.initialHeight ?? 28,
    loopRadius: rollerCoasterLesson.initialVariables.loopRadius ?? 10,
    mass: rollerCoasterLesson.initialVariables.mass ?? 500,
    gravity: rollerCoasterLesson.initialVariables.gravity ?? 9.8,
    initialVelocity: rollerCoasterLesson.initialVariables.initialVelocity ?? 0,
  });

  const [isSimulating, setIsSimulating] = useState(false);
  const { speakText } = useAccessibility();

  const handleReset = () => {
    setIsSimulating(false);
    setState({
      initialHeight: 28,
      loopRadius: 10,
      mass: 500,
      gravity: 9.8,
      initialVelocity: 0,
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Canvas and Energy Formulas (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <Canvas
            initialHeight={state.initialHeight}
            loopRadius={state.loopRadius}
            mass={state.mass}
            gravity={state.gravity}
            isSimulating={isSimulating}
            onSimulationEnd={() => setIsSimulating(false)}
          />

          <KaTeXFormula
            initialHeight={state.initialHeight}
            loopRadius={state.loopRadius}
            mass={state.mass}
            gravity={state.gravity}
          />
        </div>

        {/* Right Column: Controls and Challenges (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <Controls
            initialHeight={state.initialHeight}
            onHeightChange={(v) => setState((prev) => ({ ...prev, initialHeight: v }))}
            loopRadius={state.loopRadius}
            onRadiusChange={(v) => setState((prev) => ({ ...prev, loopRadius: v }))}
            mass={state.mass}
            onMassChange={(v) => setState((prev) => ({ ...prev, mass: v }))}
            gravity={state.gravity}
            onGravityChange={(v) => setState((prev) => ({ ...prev, gravity: v }))}
            isSimulating={isSimulating}
            onToggleSimulate={() => setIsSimulating((prev) => !prev)}
            onReset={handleReset}
            onSpeak={() => speakText(rollerCoasterLesson.audioNarrationText)}
          />

          <Challenge currentState={state} />
        </div>
      </div>
    </div>
  );
}
