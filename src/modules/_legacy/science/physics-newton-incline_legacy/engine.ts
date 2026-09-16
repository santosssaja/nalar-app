export * from "@/lib/science-engine/newton-incline";

export interface InclineState {
  angleDeg: number;
  mass: number;
  frictionCoeff: number;
  gravity: number;
  inclineLength: number;
}
