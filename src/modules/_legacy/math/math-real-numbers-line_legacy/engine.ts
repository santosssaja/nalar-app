/**
 * Module engine adapter for Real Numbers & Number Line.
 */
export {
  absoluteDistance,
  translatePoint,
  scaleVector,
  findMidpoint,
  simplifyFraction,
  approximateSquareRootBounds,
  computeDistributiveAreas,
  generateNumberLineTicks,
} from "@/lib/math-engine/real-numbers";

export type {
  Fraction,
  NumberLineState,
} from "@/lib/math-engine/real-numbers";

export interface RealNumberState {
  point1: number;
  point2: number;
  zoomLevel: number;
  scaleFactor: number;
  sqrtN: number;
  distribA: number;
  distribB: number;
  distribC: number;
}
