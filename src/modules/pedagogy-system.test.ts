import { describe, it, expect } from "vitest";
import {
  getAllComprehensiveLessons,
  getComprehensiveLesson,
} from "./pedagogy-registry";

describe("New Pedagogical Architecture (docs/new-module.md)", () => {
  it("registers all 6 flagship MVP topics with comprehensive pedagogical data", () => {
    const lessons = getAllComprehensiveLessons();
    expect(lessons.length).toBe(6);

    const ids = lessons.map((l) => l.id);
    expect(ids).toContain("math-real-numbers");
    expect(ids).toContain("math-elementary-algebra");
    expect(ids).toContain("math-functions-graphs");
    expect(ids).toContain("math-trig-unit-circle");
    expect(ids).toContain("science-si-units");
    expect(ids).toContain("science-kinematics");
  });

  describe("Kinematics Flagship MVP Verification (Section 7 & 4)", () => {
    const kin = getComprehensiveLesson("science-kinematics");

    it("has a compelling hook question and real-world context", () => {
      expect(kin?.hook.question).toBeTruthy();
      expect(kin?.hook.phenomenonDescription).toBeTruthy();
      expect(kin?.hook.realWorldContext).toBeTruthy();
    });

    it("includes prediction with 'what actually happened' reflection (Section 8)", () => {
      expect(kin?.prediction.prompt).toBeTruthy();
      expect(kin?.prediction.options.length).toBeGreaterThanOrEqual(2);
      expect(kin?.prediction.whatActuallyHappened).toBeTruthy();

      const correctOpt = kin?.prediction.options.find((o) => o.isCorrect);
      expect(correctOpt).toBeDefined();
    });

    it("provides 4-level progressive hints on guided practice (Section 9)", () => {
      const practice = kin?.guidedPractice[0];
      expect(practice).toBeDefined();
      expect(practice?.hints.level1Attention).toBeTruthy();
      expect(practice?.hints.level2Concept).toBeTruthy();
      expect(practice?.hints.level3Strategy).toBeTruthy();
      expect(practice?.hints.level4Scaffold).toBeTruthy();
    });

    it("includes virtual laboratory with hypothesis options (Section 17)", () => {
      expect(kin?.virtualLab).toBeDefined();
      expect(kin?.virtualLab?.question).toBeTruthy();
      expect(kin?.virtualLab?.hypothesisOptions.length).toBeGreaterThanOrEqual(2);
      expect(kin?.virtualLab?.parameterConfigs.length).toBeGreaterThanOrEqual(3);
    });

    it("includes a novel real-world transfer challenge (Section 4.J)", () => {
      expect(kin?.transferChallenge.title).toBeTruthy();
      expect(kin?.transferChallenge.realWorldScenario).toBeTruthy();
      expect(kin?.transferChallenge.taskPrompt).toBeTruthy();
      expect(typeof kin?.transferChallenge.targetCondition).toBe("function");
    });

    it("evaluates across the 5 dimensions of STEM mastery (Section 11)", () => {
      const dims = kin?.masteryCheck.map((m) => m.dimension);
      expect(dims).toContain("conceptual");
      expect(dims).toContain("procedural");
      expect(dims).toContain("reasoning");
      expect(dims).toContain("problemSolving");
      expect(dims).toContain("transfer");
    });

    it("establishes cross-domain concept bridge to Mathematics (Section 15)", () => {
      expect(kin?.crossDomainBridge).toBeDefined();
      expect(kin?.crossDomainBridge?.connectedTopicId).toBe("math-functions-graphs");
    });
  });

  describe("Mathematics MVP Topics Verification", () => {
    it("verifies Real Numbers has 4-tier hints and continuous line explore", () => {
      const rn = getComprehensiveLesson("math-real-numbers");
      expect(rn?.hook.question).toBeTruthy();
      expect(rn?.explore.initialVariables.point1).toBeDefined();
      expect(rn?.guidedPractice[0].hints.level4Scaffold).toBeTruthy();
    });

    it("verifies Elementary Algebra has balance scale hook and invariant discovery", () => {
      const alg = getComprehensiveLesson("math-elementary-algebra");
      expect(alg?.hook.question).toContain("kotak");
      expect(alg?.discover.patternSummary).toBeTruthy();
    });

    it("verifies Functions & Graphs has quadratic parabola transformation", () => {
      const fn = getComprehensiveLesson("math-functions-graphs");
      expect(fn?.prediction.options.length).toBeGreaterThanOrEqual(2);
      expect(fn?.formalize.formulas.some((f) => f.latex.includes("(x - h)"))).toBe(true);
    });

    it("verifies Trigonometry has unit circle and Pythagorean identity", () => {
      const trig = getComprehensiveLesson("math-trig-unit-circle");
      expect(trig?.formalize.formulas.some((f) => f.name.includes("Pythagoras"))).toBe(true);
      expect(trig?.crossDomainBridge?.connectedTopicId).toBe("science-kinematics");
    });
  });
});
