/**
 * Pure Mathematical Engine for 2D Linear Algebra & Matrix Transformations.
 * Strictly decoupled from UI/React components for high performance and testability.
 */

export interface Vector2D {
  x: number;
  y: number;
}

export interface Matrix2x2 {
  a: number; // Row 1, Col 1 (i_hat.x)
  b: number; // Row 1, Col 2 (j_hat.x)
  c: number; // Row 2, Col 1 (i_hat.y)
  d: number; // Row 2, Col 2 (j_hat.y)
}

/**
 * Computes determinant of a 2x2 matrix: det = ad - bc.
 * Handles defensive floating-point safety.
 */
export function calculateDeterminant2D(matrix: Matrix2x2): number {
  const { a, b, c, d } = matrix;
  if (!Number.isFinite(a) || !Number.isFinite(b) || !Number.isFinite(c) || !Number.isFinite(d)) {
    return 0;
  }
  const det = a * d - b * c;
  // Eliminate -0 floating point artifact
  return Object.is(det, -0) ? 0 : Number(det.toFixed(4));
}

/**
 * Transforms a 2D vector by a 2x2 matrix.
 * [x', y'] = [a*x + b*y, c*x + d*y]
 */
export function transformVector2D(matrix: Matrix2x2, vector: Vector2D): Vector2D {
  const { a, b, c, d } = matrix;
  const { x, y } = vector;

  const safeX = Number.isFinite(x) ? x : 0;
  const safeY = Number.isFinite(y) ? y : 0;

  return {
    x: Number((a * safeX + b * safeY).toFixed(4)),
    y: Number((c * safeX + d * safeY).toFixed(4)),
  };
}

/**
 * Computes the geometric scaling factor (absolute determinant).
 * Represents the ratio of transformed polygon area to initial unit area.
 */
export function calculateAreaScaling(matrix: Matrix2x2): number {
  const det = calculateDeterminant2D(matrix);
  return Math.abs(det);
}

/**
 * Checks if the matrix transformation reverses the spatial orientation (det < 0).
 */
export function isOrientationReversed(matrix: Matrix2x2): boolean {
  return calculateDeterminant2D(matrix) < 0;
}

/**
 * Checks if the matrix collapses the 2D space into 1D line or 0D point (det === 0).
 */
export function isSingularMatrix(matrix: Matrix2x2, tolerance = 1e-4): boolean {
  return Math.abs(calculateDeterminant2D(matrix)) < tolerance;
}
