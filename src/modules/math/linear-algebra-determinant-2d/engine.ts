/**
 * Linear Algebra Engine Adapter for 2D Determinant Lesson.
 * Uses pure math engine functions.
 */
import {
  Matrix2x2,
  calculateDeterminant2D,
  calculateAreaScaling,
  isOrientationReversed,
  isSingularMatrix,
  transformVector2D,
} from "@/lib/math-engine/linear-algebra";

export interface DeterminantCanvasState {
  i_hat_x: number;
  i_hat_y: number;
  j_hat_x: number;
  j_hat_y: number;
}

export function toMatrix2x2(state: DeterminantCanvasState): Matrix2x2 {
  return {
    a: state.i_hat_x,
    b: state.j_hat_x,
    c: state.i_hat_y,
    d: state.j_hat_y,
  };
}

/**
 * Returns the 4 polygon vertices forming the transformed unit parallelogram:
 * Origin -> i_hat -> (i_hat + j_hat) -> j_hat
 */
export function getParallelogramVertices(state: DeterminantCanvasState): [number, number][] {
  const iX = state.i_hat_x;
  const iY = state.i_hat_y;
  const jX = state.j_hat_x;
  const jY = state.j_hat_y;

  return [
    [0, 0],
    [iX, iY],
    [iX + jX, iY + jY],
    [jX, jY],
  ];
}

export function computeDeterminantMetrics(state: DeterminantCanvasState) {
  const matrix = toMatrix2x2(state);
  const det = calculateDeterminant2D(matrix);
  const area = calculateAreaScaling(matrix);
  const isSingular = isSingularMatrix(matrix);
  const isFlipped = isOrientationReversed(matrix);

  return {
    matrix,
    det,
    area,
    isSingular,
    isFlipped,
  };
}

export {
  calculateDeterminant2D,
  calculateAreaScaling,
  isOrientationReversed,
  isSingularMatrix,
  transformVector2D,
};
