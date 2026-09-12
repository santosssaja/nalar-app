export * from "@/lib/math-engine/riemann-sum";
import { RiemannFunctionKey, RiemannMethod } from "@/lib/math-engine/riemann-sum";

export interface RiemannCanvasState {
  funcKey: RiemannFunctionKey;
  a: number;
  b: number;
  n: number;
  method: RiemannMethod;
  isAnimatingN: boolean;
}

export const INITIAL_RIEMANN_STATE: RiemannCanvasState = {
  funcKey: "x2",
  a: 0,
  b: 2,
  n: 8,
  method: "left",
  isAnimatingN: false,
};
