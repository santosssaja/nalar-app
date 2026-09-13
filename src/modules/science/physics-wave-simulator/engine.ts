export * from "@/lib/science-engine/wave-simulator";

export type WaveDisplayMode = "single" | "interference" | "longitudinal";

export interface WaveSimulatorState {
  mode: WaveDisplayMode;
  amplitude: number;
  frequency: number;
  wavelength: number;
  phaseDeg: number;
  // Second wave for interference
  wave2Amplitude: number;
  wave2PhaseDeg: number;
}
