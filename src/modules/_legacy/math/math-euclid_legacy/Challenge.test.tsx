import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderWithProviders, mockGamificationContext } from "@/test/test-utils";
import { Challenge } from "@/modules/_legacy/math/math-euclid_legacy/Challenge";

vi.mock("@/modules/_legacy/math/math-euclid_legacy/content", () => ({
  euclidLesson: {
    challenges: [
      {
        id: "challenge-euclid-1",
        title: "Test Challenge",
        question: "What is GCD(12, 8)?",
        targetCondition: (vars: Record<string, number>) => vars.width === 12 && vars.height === 8,
        hintText: "Use Euclidean algorithm: 12 = 8 × 1 + 4",
        solutionVariables: { width: 12, height: 8 },
        solutionExplanation: "GCD(12, 8) = 4",
        xpReward: 10,
      },
    ],
  },
}));

const mockState = {
  width: 12,
  height: 8,
  steps: [],
  tiles: [],
  gcd: 4,
  lcm: 24,
  bezoutA: 1,
  bezoutB: -1,
};

describe("Challenge component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders challenge question", () => {
    const { getByText } = renderWithProviders(
      <Challenge currentState={mockState} />
    );
    expect(getByText("What is GCD(12, 8)?")).toBeTruthy();
  });

  it("renders check solution button", () => {
    const { getByText } = renderWithProviders(
      <Challenge currentState={mockState} />
    );
    expect(getByText("Verifikasi Solusi")).toBeTruthy();
  });

  it("calls completeChallenge on correct solution", async () => {
    const { getByText } = renderWithProviders(
      <Challenge currentState={mockState} />
    );
    const button = getByText("Verifikasi Solusi");
    button.click();
    expect(mockGamificationContext.completeChallenge).toHaveBeenCalled();
  });
});
