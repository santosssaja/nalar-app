export * from "@/lib/science-engine/harmonic-oscillator";

export type OscillatorMode = "pendulum" | "spring";

export interface HarmonicState {
  mode: OscillatorMode;
  // Pendulum params
  length: number;
  initialAngleDeg: number;
  gravity: number;
  // Spring params
  springConstant: number;
  mass: number;
  amplitude: number;
}
