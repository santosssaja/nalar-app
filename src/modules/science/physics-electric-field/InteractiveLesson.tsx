"use client";

import React, { useState } from "react";
import { Canvas } from "./Canvas";
import { Controls } from "./Controls";
import { KaTeXFormula } from "./KaTeXFormula";
import { Challenge } from "./Challenge";
import { electricFieldLesson } from "./content";
import { ElectricFieldState } from "./engine";
import { useAccessibility } from "@/context/AccessibilityContext";

export function InteractiveLesson() {
  const [state, setState] = useState<ElectricFieldState>({
    q1: electricFieldLesson.initialVariables.q1 ?? 3,
    q2: electricFieldLesson.initialVariables.q2 ?? -3,
    distance: electricFieldLesson.initialVariables.distance ?? 2.0,
    testCharge: electricFieldLesson.initialVariables.testCharge ?? 1,
    testPosX: electricFieldLesson.initialVariables.testPosX ?? 0,
    testPosY: electricFieldLesson.initialVariables.testPosY ?? 0.5,
    showVectors: true,
    showPotential: true,
  });

  const { speakText } = useAccessibility();

  const handleReset = () => {
    setState({
      q1: 3,
      q2: -3,
      distance: 2.0,
      testCharge: 1,
      testPosX: 0,
      testPosY: 0.5,
      showVectors: true,
      showPotential: true,
    });
    speakText("Nilai simulasi medan listrik telah direset ke kondisi awal.");
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Canvas and Formulas (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <Canvas
            q1={state.q1}
            q2={state.q2}
            distance={state.distance}
            testCharge={state.testCharge}
            testPosX={state.testPosX}
            testPosY={state.testPosY}
            showVectors={state.showVectors}
            showPotential={state.showPotential}
            onPositionChange={(pos) => setState((prev) => ({ ...prev, ...pos }))}
          />

          <KaTeXFormula
            q1={state.q1}
            q2={state.q2}
            distance={state.distance}
            testCharge={state.testCharge}
            testPosX={state.testPosX}
            testPosY={state.testPosY}
          />
        </div>

        {/* Right Column: Controls and Challenge (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <Controls
            q1={state.q1}
            q2={state.q2}
            distance={state.distance}
            testCharge={state.testCharge}
            testPosX={state.testPosX}
            testPosY={state.testPosY}
            showVectors={state.showVectors}
            showPotential={state.showPotential}
            onChange={(newVars) => setState((prev) => ({ ...prev, ...newVars }))}
            onReset={handleReset}
          />

          <Challenge currentState={state} />
        </div>
      </div>
    </div>
  );
}
