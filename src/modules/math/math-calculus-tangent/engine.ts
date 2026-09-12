export * from "@/lib/math-engine/calculus-tangent";
import { CalculusFunctionKey } from "@/lib/math-engine/calculus-tangent";

export interface TangentCanvasState {
  funcKey: CalculusFunctionKey;
  a: number;
  deltaX: number;
  showSecant: boolean;
  showTangent: boolean;
  isAnimatingLimit: boolean;
}

export const INITIAL_TANGENT_STATE: TangentCanvasState = {
  funcKey: "x2",
  a: 1.0,
  deltaX: 1.0,
  showSecant: true,
  showTangent: true,
  isAnimatingLimit: false,
};
