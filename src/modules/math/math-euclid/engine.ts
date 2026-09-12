/**
 * Engine wrapper for math-euclid module.
 * Re-exports calculation functions and types from core math-engine.
 */

export {
  computeEuclideanDivisionSteps,
  computeEuclideanTiles,
} from "@/lib/math-engine/euclidean-tiling";

export type {
  EuclideanDivisionStep,
  EuclideanTile,
  EuclideanTilingResult,
} from "@/lib/math-engine/euclidean-tiling";
