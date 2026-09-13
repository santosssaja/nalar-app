/**
 * Pure physics calculations for Mechanical Wave Simulator.
 * Traveling wave, superposition, and standing waves.
 * y(x, t) = A * sin(k*x - omega*t + phi)
 */

export interface WaveParams {
  amplitude: number; // A in meters (> 0)
  frequency: number; // f in Hz (> 0)
  wavelength: number; // lambda in meters (> 0)
  phaseDeg?: number; // phi in degrees [0, 360]
}

export interface WaveMetrics {
  waveNumber: number; // k = 2*pi / lambda
  angularFrequency: number; // omega = 2*pi * f
  waveSpeed: number; // v = lambda * f
  period: number; // T = 1 / f
  displacementAt: (x: number, t: number) => number;
}

export interface InterferenceParams {
  wave1: WaveParams;
  wave2: WaveParams;
}

export interface InterferenceMetrics {
  metrics1: WaveMetrics;
  metrics2: WaveMetrics;
  phaseDifferenceDeg: number;
  resultantDisplacementAt: (x: number, t: number) => number;
  isConstructive: boolean; // phase diff close to 0 or 360 deg
  isDestructive: boolean; // phase diff close to 180 deg
}

export function calculateWave(params: WaveParams): WaveMetrics {
  const A = Math.max(0.01, params.amplitude);
  const f = Math.max(0.1, params.frequency);
  const lambda = Math.max(0.1, params.wavelength);
  const phiRad = ((params.phaseDeg ?? 0) * Math.PI) / 180;

  const k = (2 * Math.PI) / lambda;
  const omega = 2 * Math.PI * f;
  const v = lambda * f;
  const T = 1 / f;

  return {
    waveNumber: Number(k.toFixed(3)),
    angularFrequency: Number(omega.toFixed(3)),
    waveSpeed: Number(v.toFixed(2)),
    period: Number(T.toFixed(3)),
    displacementAt: (x: number, t: number) => A * Math.sin(k * x - omega * t + phiRad),
  };
}

export function calculateInterference(params: InterferenceParams): InterferenceMetrics {
  const m1 = calculateWave(params.wave1);
  const m2 = calculateWave(params.wave2);

  const phaseDiffRaw = Math.abs((params.wave1.phaseDeg ?? 0) - (params.wave2.phaseDeg ?? 0)) % 360;
  const phaseDiff = phaseDiffRaw > 180 ? 360 - phaseDiffRaw : phaseDiffRaw;

  const isConstructive = phaseDiff <= 15;
  const isDestructive = Math.abs(phaseDiff - 180) <= 15;

  return {
    metrics1: m1,
    metrics2: m2,
    phaseDifferenceDeg: Number(phaseDiff.toFixed(1)),
    resultantDisplacementAt: (x: number, t: number) =>
      m1.displacementAt(x, t) + m2.displacementAt(x, t),
    isConstructive,
    isDestructive,
  };
}
