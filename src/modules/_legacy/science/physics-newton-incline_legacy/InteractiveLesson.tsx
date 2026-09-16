"use client";

import React, { useState } from "react";
import { Canvas } from "./Canvas";
import { Controls } from "./Controls";
import { KaTeXFormula } from "./KaTeXFormula";
import { Challenge } from "./Challenge";
import { inclineLesson } from "./content";
import { InclineState } from "./engine";
import { useAccessibility } from "@/context/AccessibilityContext";

export function InteractiveLesson() {
  const [state, setState] = useState<InclineState>({
    angleDeg: inclineLesson.initialVariables.angleDeg ?? 30,
    mass: inclineLesson.initialVariables.mass ?? 5,
    frictionCoeff: inclineLesson.initialVariables.frictionCoeff ?? 0.2,
    gravity: inclineLesson.initialVariables.gravity ?? 9.8,
    inclineLength: inclineLesson.initialVariables.inclineLength ?? 10,
  });

  const [isSimulating, setIsSimulating] = useState(false);
  const { speakText } = useAccessibility();

  const handleReset = () => {
    setIsSimulating(false);
    setState({
      angleDeg: 30,
      mass: 5,
      frictionCoeff: 0.2,
      gravity: 9.8,
      inclineLength: 10,
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Canvas and Formulas (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <Canvas
            angleDeg={state.angleDeg}
            mass={state.mass}
            frictionCoeff={state.frictionCoeff}
            gravity={state.gravity}
            inclineLength={state.inclineLength}
            isSimulating={isSimulating}
            onSimulationEnd={() => setIsSimulating(false)}
          />

          <KaTeXFormula
            angleDeg={state.angleDeg}
            mass={state.mass}
            frictionCoeff={state.frictionCoeff}
            gravity={state.gravity}
            inclineLength={state.inclineLength}
          />
        </div>

        {/* Right Column: Controls and Challenges (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <Controls
            angleDeg={state.angleDeg}
            onAngleChange={(v) => setState((prev) => ({ ...prev, angleDeg: v }))}
            mass={state.mass}
            onMassChange={(v) => setState((prev) => ({ ...prev, mass: v }))}
            frictionCoeff={state.frictionCoeff}
            onFrictionChange={(v) => setState((prev) => ({ ...prev, frictionCoeff: v }))}
            gravity={state.gravity}
            onGravityChange={(v) => setState((prev) => ({ ...prev, gravity: v }))}
            isSimulating={isSimulating}
            onToggleSimulate={() => setIsSimulating((prev) => !prev)}
            onReset={handleReset}
            onSpeak={() => speakText(inclineLesson.audioNarrationText)}
          />

          <Challenge currentState={state} />
        </div>
      </div>
    </div>
  );
}
