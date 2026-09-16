import { describe, it, expect } from "vitest";
import {
  translatePoint,
  scalePoint,
  midpoint,
  distanceBetween,
  distributiveLawArea,
} from "./math/real-numbers/engine";
import {
  solveLinearEquation,
  isScaleBalanced,
  solve2x2LinearSystem,
} from "./math/elementary-algebra/engine";
import {
  evaluateLinear,
  evaluateQuadratic,
  transformPoint,
  averageRateOfChange,
} from "./math/functions-graphs/engine";
import {
  degToRad,
  radToDeg,
  polarToCartesian,
  decomposeVector,
  verifyPythagoreanIdentity,
} from "./math/trigonometry/engine";
import {
  areDimensionsEqual,
  multiplyDimensions,
  divideDimensions,
  convertLength,
  BASE_DIMENSIONS,
} from "./science/si-units/engine";
import {
  position1D,
  velocity1D,
  projectilePosition2D,
  projectileMaxHeight,
  projectileFlightTime,
  projectileRange,
} from "./science/kinematics/engine";
import { TOPIC_MODULES_REGISTRY, getTopicModule, getAllTopicModules } from "./registry";

describe("MVP Canonical Modules - Pure Mathematical & Science Engines", () => {
  describe("1. Math: Real Numbers & Number Line", () => {
    it("performs translation and scaling with defensive guards", () => {
      expect(translatePoint(3, 4)).toBe(7);
      expect(translatePoint(3, -5)).toBe(-2);
      expect(scalePoint(3, 2)).toBe(6);
      expect(scalePoint(NaN, 2)).toBe(0);
    });

    it("calculates midpoint, distance and distributive geometric areas", () => {
      expect(midpoint(-4, 6)).toBe(1);
      expect(distanceBetween(3, -4)).toBe(7);

      const geom = distributiveLawArea(2, 3, 4);
      expect(geom.leftArea).toBe(6);
      expect(geom.rightArea).toBe(8);
      expect(geom.totalArea).toBe(14);
    });
  });

  describe("2. Math: Elementary Algebra", () => {
    it("solves ax + b = c and tests balance equivalence", () => {
      const res = solveLinearEquation(2, 4, 10);
      expect(res.hasSolution).toBe(true);
      expect(res.solution).toBe(3);

      expect(isScaleBalanced(10, 10)).toBe(true);
      expect(isScaleBalanced(10, 12)).toBe(false);
    });

    it("solves 2x2 linear systems defensively", () => {
      // x + y = 5
      // x - y = 1 => x = 3, y = 2
      const sys = solve2x2LinearSystem(1, 1, 5, 1, -1, 1);
      expect(sys.hasUniqueSolution).toBe(true);
      expect(sys.x).toBe(3);
      expect(sys.y).toBe(2);
    });
  });

  describe("3. Math: Functions & Graphs", () => {
    it("evaluates linear and quadratic transformations", () => {
      expect(evaluateLinear(2, 3, 1)).toBe(7);
      expect(evaluateQuadratic(2, 1, 0, 0)).toBe(4);

      const p = transformPoint(2, 4, 1, 2, 2);
      expect(p.x).toBe(3);
      expect(p.y).toBe(10);
    });

    it("calculates average rate of change between points", () => {
      const f = (x: number) => x * x;
      // from x=1 to x=3: (9 - 1) / (3 - 1) = 4
      expect(averageRateOfChange(f, 1, 3)).toBe(4);
    });
  });

  describe("4. Math: Trigonometry & Unit Circle", () => {
    it("converts between radians and degrees", () => {
      expect(degToRad(180)).toBeCloseTo(Math.PI, 5);
      expect(radToDeg(Math.PI)).toBeCloseTo(180, 5);
    });

    it("verifies polar coordinates and Pythagorean identity", () => {
      const { x, y } = polarToCartesian(1, Math.PI / 2);
      expect(x).toBeCloseTo(0, 5);
      expect(y).toBeCloseTo(1, 5);
      expect(verifyPythagoreanIdentity(Math.PI / 4)).toBe(true);
    });

    it("decomposes 2D vectors into horizontal and vertical components", () => {
      const v = decomposeVector(10, 30);
      expect(v.vx).toBeCloseTo(8.66, 2);
      expect(v.vy).toBeCloseTo(5.0, 2);
    });
  });

  describe("5. Science: SI Units & Dimensional Analysis", () => {
    it("handles unit conversions accurately", () => {
      expect(convertLength(1500, "m", "km")).toBe(1.5);
      expect(convertLength(2.5, "km", "m")).toBe(2500);
      expect(convertLength(1, "m", "cm")).toBe(100);
    });

    it("computes physical dimensions correctly", () => {
      const dimV = BASE_DIMENSIONS.velocity; // [L][T]^-1
      const dimT = BASE_DIMENSIONS.time; // [T]
      const mult = multiplyDimensions(dimV, dimT); // [L]
      expect(areDimensionsEqual(mult, BASE_DIMENSIONS.length)).toBe(true);
    });
  });

  describe("6. Science: Kinematics (Flagship)", () => {
    it("calculates 1D motion position and velocity", () => {
      expect(position1D(0, 0, 2, 5)).toBe(25); // 0.5 * 2 * 25 = 25
      expect(velocity1D(0, 2, 5)).toBe(10); // 2 * 5 = 10
    });

    it("computes 2D projectile trajectory metrics", () => {
      const tFlight = projectileFlightTime(20, 45, 9.8);
      const hMax = projectileMaxHeight(20, 45, 9.8);
      const range = projectileRange(20, 45, 9.8);

      expect(tFlight).toBeGreaterThan(0);
      expect(hMax).toBeGreaterThan(0);
      expect(range).toBeGreaterThan(0);

      const pos = projectilePosition2D({
        x0: 0,
        y0: 0,
        v0: 20,
        angleDeg: 45,
        g: 9.8,
        t: tFlight / 2,
      });
      expect(pos.y).toBeCloseTo(hMax, 1);
    });
  });

  describe("7. Topic Registry & Discovery", () => {
    it("registers all 6 flagship MVP topics without legacy dependencies", () => {
      const allMods = getAllTopicModules();
      expect(allMods.length).toBe(6);

      const slugs = allMods.map((m) => m.id);
      expect(slugs).toContain("math-real-numbers");
      expect(slugs).toContain("math-elementary-algebra");
      expect(slugs).toContain("math-functions-graphs");
      expect(slugs).toContain("math-trig-unit-circle");
      expect(slugs).toContain("science-si-units");
      expect(slugs).toContain("science-kinematics");
    });
  });
});
