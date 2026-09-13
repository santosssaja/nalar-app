"use client";

import React, { useState } from "react";
import { Canvas } from "./Canvas";
import { Controls } from "./Controls";
import { KaTeXFormula } from "./KaTeXFormula";
import { Challenge } from "./Challenge";
import { harmonicLesson } from "./content";
import { HarmonicState } from "./engine";
import { useAccessibility } from "@/context/AccessibilityContext";

export function InteractiveLesson() {
  const [state, setState] = useState<HarmonicState>({
    mode: "pendulum",
    length: harmonicLesson.initialVariables.length ?? 1.0,
    initialAngleDeg: harmonicLesson.initialVariables.initialAngleDeg ?? 15,
    gravity: harmonicLesson.initialVariables.gravity ?? 9.8,
    springConstant: harmonicLesson.initialVariables.springConstant ?? 50,
    mass: harmonicLesson.initialVariables.mass ?? 1.0,
    amplitude: harmonicLesson.initialVariables.amplitude ?? 0.3,
  });

  const [isSimulating, setIsSimulating] = useState(true);
  const { speakText } = useAccessibility();

  const handleReset = () => {
    setState((prev) => ({
      ...prev,
      length: 1.0,
      initialAngleDeg: 15,
      gravity: 9.8,
      springConstant: 50,
      mass: 1.0,
      amplitude: 0.3,
    }));
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Canvas and Wave Formulas (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <Canvas
            mode={state.mode}
            length={state.length}
            initialAngleDeg={state.initialAngleDeg}
            gravity={state.gravity}
            springConstant={state.springConstant}
            mass={state.mass}
            amplitude={state.amplitude}
            isSimulating={isSimulating}
          />

          <KaTeXFormula
            mode={state.mode}
            length={state.length}
            initialAngleDeg={state.initialAngleDeg}
            gravity={state.gravity}
            springConstant={state.springConstant}
            mass={state.mass}
            amplitude={state.amplitude}
          />
        </div>

        {/* Right Column: Controls and Challenges (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <Controls
            mode={state.mode}
            onModeChange={(m) => setState((prev) => ({ ...prev, mode: m }))}
            length={state.length}
            onLengthChange={(v) => setState((prev) => ({ ...prev, length: v }))}
            initialAngleDeg={state.initialAngleDeg}
            onAngleChange={(v) => setState((prev) => ({ ...prev, initialAngleDeg: v }))}
            gravity={state.gravity}
            onGravityChange={(v) => setState((prev) => ({ ...prev, gravity: v }))}
            springConstant={state.springConstant}
            onSpringChange={(v) => setState((prev) => ({ ...prev, springConstant: v }))}
            mass={state.mass}
            onMassChange={(v) => setState((prev) => ({ ...prev, mass: v }))}
            amplitude={state.amplitude}
            onAmplitudeChange={(v) => setState((prev) => ({ ...prev, amplitude: v }))}
            isSimulating={isSimulating}
            onToggleSimulate={() => setIsSimulating((prev) => !prev)}
            onReset={handleReset}
            onSpeak={() => speakText(harmonicLesson.audioNarrationText)}
          />

          <Challenge currentState={state} />
        </div>
      </div>
    </div>
  );
}
