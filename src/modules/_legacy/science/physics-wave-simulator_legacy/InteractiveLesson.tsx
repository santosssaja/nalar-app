"use client";

import React, { useState } from "react";
import { Canvas } from "./Canvas";
import { Controls } from "./Controls";
import { KaTeXFormula } from "./KaTeXFormula";
import { Challenge } from "./Challenge";
import { waveLesson } from "./content";
import { WaveSimulatorState } from "./engine";
import { useAccessibility } from "@/context/AccessibilityContext";

export function InteractiveLesson() {
  const [state, setState] = useState<WaveSimulatorState>({
    mode: "single",
    amplitude: waveLesson.initialVariables.amplitude ?? 0.5,
    frequency: waveLesson.initialVariables.frequency ?? 2.0,
    wavelength: waveLesson.initialVariables.wavelength ?? 4.0,
    phaseDeg: waveLesson.initialVariables.phaseDeg ?? 0,
    wave2Amplitude: waveLesson.initialVariables.wave2Amplitude ?? 0.5,
    wave2PhaseDeg: waveLesson.initialVariables.wave2PhaseDeg ?? 0,
  });

  const [isSimulating, setIsSimulating] = useState(true);
  const { speakText } = useAccessibility();

  const handleReset = () => {
    setState((prev) => ({
      ...prev,
      amplitude: 0.5,
      frequency: 2.0,
      wavelength: 4.0,
      phaseDeg: 0,
      wave2Amplitude: 0.5,
      wave2PhaseDeg: 0,
    }));
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Canvas and Wave Formulas (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <Canvas
            mode={state.mode}
            amplitude={state.amplitude}
            frequency={state.frequency}
            wavelength={state.wavelength}
            phaseDeg={state.phaseDeg}
            wave2Amplitude={state.wave2Amplitude}
            wave2PhaseDeg={state.wave2PhaseDeg}
            isSimulating={isSimulating}
          />

          <KaTeXFormula
            mode={state.mode}
            amplitude={state.amplitude}
            frequency={state.frequency}
            wavelength={state.wavelength}
            phaseDeg={state.phaseDeg}
            wave2Amplitude={state.wave2Amplitude}
            wave2PhaseDeg={state.wave2PhaseDeg}
          />
        </div>

        {/* Right Column: Controls and Challenges (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <Controls
            mode={state.mode}
            onModeChange={(m) => setState((prev) => ({ ...prev, mode: m }))}
            amplitude={state.amplitude}
            onAmplitudeChange={(v) => setState((prev) => ({ ...prev, amplitude: v }))}
            frequency={state.frequency}
            onFrequencyChange={(v) => setState((prev) => ({ ...prev, frequency: v }))}
            wavelength={state.wavelength}
            onWavelengthChange={(v) => setState((prev) => ({ ...prev, wavelength: v }))}
            wave2Amplitude={state.wave2Amplitude}
            onWave2AmplitudeChange={(v) => setState((prev) => ({ ...prev, wave2Amplitude: v }))}
            wave2PhaseDeg={state.wave2PhaseDeg}
            onWave2PhaseChange={(v) => setState((prev) => ({ ...prev, wave2PhaseDeg: v }))}
            isSimulating={isSimulating}
            onToggleSimulate={() => setIsSimulating((prev) => !prev)}
            onReset={handleReset}
            onSpeak={() => speakText(waveLesson.audioNarrationText)}
          />

          <Challenge currentState={state} />
        </div>
      </div>
    </div>
  );
}
