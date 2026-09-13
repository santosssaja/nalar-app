"use client";

import React, { useState } from "react";
import { Canvas } from "./Canvas";
import { Controls } from "./Controls";
import { KaTeXFormula } from "./KaTeXFormula";
import { Challenge } from "./Challenge";
import { dcCircuitLesson } from "./content";
import { DCCircuitState } from "./engine";
import { useAccessibility } from "@/context/AccessibilityContext";

export function InteractiveLesson() {
  const [state, setState] = useState<DCCircuitState>({
    voltage: dcCircuitLesson.initialVariables.voltage ?? 12,
    r1: dcCircuitLesson.initialVariables.r1 ?? 4,
    r2: dcCircuitLesson.initialVariables.r2 ?? 8,
    r3: dcCircuitLesson.initialVariables.r3 ?? 6,
    topology: "series",
    isSwitchClosed: true,
  });

  const { speakText } = useAccessibility();

  const handleReset = () => {
    setState({
      voltage: 12,
      r1: 4,
      r2: 8,
      r3: 6,
      topology: "series",
      isSwitchClosed: true,
    });
    speakText("Rangkaian listrik telah direset ke kondisi awal 12 Volt seri.");
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Canvas and Formulas (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <Canvas
            voltage={state.voltage}
            r1={state.r1}
            r2={state.r2}
            r3={state.r3}
            topology={state.topology}
            isSwitchClosed={state.isSwitchClosed}
          />

          <KaTeXFormula
            voltage={state.voltage}
            r1={state.r1}
            r2={state.r2}
            r3={state.r3}
            topology={state.topology}
            isSwitchClosed={state.isSwitchClosed}
          />
        </div>

        {/* Right Column: Controls and Challenge (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <Controls
            voltage={state.voltage}
            r1={state.r1}
            r2={state.r2}
            r3={state.r3}
            topology={state.topology}
            isSwitchClosed={state.isSwitchClosed}
            onChange={(newVars) => setState((prev) => ({ ...prev, ...newVars }))}
            onReset={handleReset}
          />

          <Challenge currentState={state} />
        </div>
      </div>
    </div>
  );
}
