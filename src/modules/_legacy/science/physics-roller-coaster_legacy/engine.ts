export * from "@/lib/science-engine/roller-coaster";

export interface RollerCoasterState {
  initialHeight: number;
  loopRadius: number;
  mass: number;
  gravity: number;
  initialVelocity: number;
}
