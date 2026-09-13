"use client";

import React, { useState, useEffect } from "react";
import { Canvas as InclineCanvas } from "@/modules/science/physics-newton-incline/Canvas";
import { Controls as InclineControls } from "@/modules/science/physics-newton-incline/Controls";
import { KaTeXFormula as InclineKaTeX } from "@/modules/science/physics-newton-incline/KaTeXFormula";
import { InclineState } from "@/modules/science/physics-newton-incline/engine";

export interface InclinePlaygroundEmbedProps {
  initialVariables?: Record<string, number>;
  onVariablesChange?: (vars: Record<string, number>) => void;
  externalVariables?: Record<string, number> | null;
  challengeSidebar?: React.ReactNode;
}

export function InclinePlaygroundEmbed({
  initialVariables = {},
  onVariablesChange,
  externalVariables,
  challengeSidebar,
}: InclinePlaygroundEmbedProps) {
  const [inclineState, setInclineState] = useState<InclineState>({
    angleDeg: initialVariables.angleDeg ?? 30,
    mass: initialVariables.mass ?? 5,
    frictionCoeff: initialVariables.frictionCoeff ?? 0.2,
    gravity: initialVariables.gravity ?? 9.8,
    inclineLength: initialVariables.inclineLength ?? 10,
  });

  const [isSimulating, setIsSimulating] = useState(false);

  // Sync external variables (e.g. from Auto-solver or Hint)
  useEffect(() => {
    if (externalVariables) {
      setInclineState((prev) => ({
        ...prev,
        angleDeg: externalVariables.angleDeg ?? prev.angleDeg,
        mass: externalVariables.mass ?? prev.mass,
        frictionCoeff: externalVariables.frictionCoeff ?? prev.frictionCoeff,
        gravity: externalVariables.gravity ?? prev.gravity,
      }));
    }
  }, [externalVariables]);

  // Notify parent on state changes
  useEffect(() => {
    onVariablesChange?.({
      angleDeg: inclineState.angleDeg,
      mass: inclineState.mass,
      frictionCoeff: inclineState.frictionCoeff,
      gravity: inclineState.gravity,
      inclineLength: inclineState.inclineLength,
    });
  }, [inclineState, onVariablesChange]);

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
        {/* Left Column: Canvas + KaTeX Formula */}
        <div className="lg:col-span-7 flex flex-col gap-2.5">
          <InclineCanvas
            angleDeg={inclineState.angleDeg}
            mass={inclineState.mass}
            frictionCoeff={inclineState.frictionCoeff}
            gravity={inclineState.gravity}
            inclineLength={inclineState.inclineLength}
            isSimulating={isSimulating}
            onSimulationEnd={() => setIsSimulating(false)}
          />
          <InclineKaTeX
            angleDeg={inclineState.angleDeg}
            mass={inclineState.mass}
            frictionCoeff={inclineState.frictionCoeff}
            gravity={inclineState.gravity}
            inclineLength={inclineState.inclineLength}
          />
        </div>

        {/* Right Column: Challenge card (if present) + Controls */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {challengeSidebar && <div>{challengeSidebar}</div>}
          <div className="max-h-[460px] overflow-y-auto pr-1">
            <InclineControls
              angleDeg={inclineState.angleDeg}
              onAngleChange={(v) => setInclineState((p) => ({ ...p, angleDeg: v }))}
              mass={inclineState.mass}
              onMassChange={(v) => setInclineState((p) => ({ ...p, mass: v }))}
              frictionCoeff={inclineState.frictionCoeff}
              onFrictionChange={(v) => setInclineState((p) => ({ ...p, frictionCoeff: v }))}
              gravity={inclineState.gravity}
              onGravityChange={(v) => setInclineState((p) => ({ ...p, gravity: v }))}
              isSimulating={isSimulating}
              onToggleSimulate={() => setIsSimulating(!isSimulating)}
              onReset={() => {
                setIsSimulating(false);
                setInclineState({
                  angleDeg: 30,
                  mass: 5,
                  frictionCoeff: 0.2,
                  gravity: 9.8,
                  inclineLength: 10,
                });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
