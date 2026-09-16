import { describe, it, expect } from "vitest";
import {
  isTopicUnlocked,
  getTopicStatus,
  getTopicPrerequisites,
  getTopicDependents,
  getRecommendedNextTopic,
  calculateOverallMastery,
  getTopicConceptConnections,
} from "./prerequisite-engine";
import { CANONICAL_TOPICS } from "./data/topics";

describe("Prerequisite DAG Engine (Phase 1 Foundation)", () => {
  it("unlocks root topic Operasi Bilangan Riil without any completed prerequisites", () => {
    const unlocked = isTopicUnlocked("math-real-numbers", []);
    expect(unlocked).toBe(true);

    const status = getTopicStatus("math-real-numbers", []);
    expect(status).toBe("active");
  });

  it("locks Aljabar Elementer when Operasi Bilangan Riil is not completed", () => {
    const unlocked = isTopicUnlocked("math-elementary-algebra", []);
    expect(unlocked).toBe(false);

    const status = getTopicStatus("math-elementary-algebra", []);
    expect(status).toBe("locked");
  });

  it("unlocks Aljabar Elementer once Operasi Bilangan Riil is completed", () => {
    const unlocked = isTopicUnlocked("math-elementary-algebra", ["math-real-numbers"]);
    expect(unlocked).toBe(true);

    const status = getTopicStatus("math-elementary-algebra", ["math-real-numbers"]);
    expect(status).toBe("active");
  });

  it("enforces multi-prerequisite DAG for flagship Kinematika (requires SI units, Functions, and Trigonometry)", () => {
    // Only SI units completed -> Kinematics must stay locked
    expect(isTopicUnlocked("science-kinematics", ["science-si-units"])).toBe(false);

    // SI units + Functions completed -> still missing Trigonometry -> must stay locked
    expect(
      isTopicUnlocked("science-kinematics", [
        "science-si-units",
        "math-functions-graphs",
      ])
    ).toBe(false);

    // All 3 completed -> Kinematics unlocks!
    expect(
      isTopicUnlocked("science-kinematics", [
        "science-si-units",
        "math-functions-graphs",
        "math-trig-unit-circle",
      ])
    ).toBe(true);
  });

  it("recommends the first available MVP topic (math-real-numbers) for a new learner", () => {
    const recommended = getRecommendedNextTopic([]);
    expect(recommended).not.toBeNull();
    expect(recommended?.id).toBe("math-real-numbers");
  });

  it("advances recommendation to math-elementary-algebra once math-real-numbers is completed", () => {
    const recommended = getRecommendedNextTopic(["math-real-numbers"]);
    expect(recommended).not.toBeNull();
    expect(recommended?.id).toBe("math-elementary-algebra");
  });

  it("retrieves cross-domain knowledge connections for Kinematika", () => {
    const connections = getTopicConceptConnections("science-kinematics");
    expect(connections.length).toBeGreaterThanOrEqual(2);
    const mathTopics = connections.map((c) => c.mathTopicId);
    expect(mathTopics).toContain("math-functions-graphs");
    expect(mathTopics).toContain("math-trig-unit-circle");
  });

  it("computes 5-dimension mastery aggregate correctly", () => {
    const mockMasteries = {
      "math-real-numbers": {
        conceptual: 80,
        procedural: 90,
        reasoning: 70,
        problemSolving: 85,
        transfer: 75,
        overall: 80,
      },
      "math-elementary-algebra": {
        conceptual: 90,
        procedural: 80,
        reasoning: 80,
        problemSolving: 75,
        transfer: 85,
        overall: 82,
      },
    };

    const overall = calculateOverallMastery(mockMasteries);
    expect(overall.conceptual).toBe(85);
    expect(overall.procedural).toBe(85);
    expect(overall.reasoning).toBe(75);
    expect(overall.problemSolving).toBe(80);
    expect(overall.transfer).toBe(80);
    expect(overall.overall).toBe(81);
  });
});
