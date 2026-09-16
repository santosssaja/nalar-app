export * from "@/lib/math-engine/trigonometry";

export interface TrigCanvasState {
  angleDegrees: number;
  angleUnit: "degrees" | "radians";
  showSin: boolean;
  showCos: boolean;
  showTan: boolean;
  showWave: boolean;
  isPlaying?: boolean;
}

export const INITIAL_TRIG_STATE: TrigCanvasState = {
  angleDegrees: 45,
  angleUnit: "degrees",
  showSin: true,
  showCos: true,
  showTan: true,
  showWave: false,
  isPlaying: false,
};
