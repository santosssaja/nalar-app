import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderWithProviders, mockGamificationContext } from "@/test/test-utils";
import { Dashboard } from "@/components/gamification/Dashboard";

describe("Dashboard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders dashboard title", () => {
    const { getByText } = renderWithProviders(<Dashboard />);
    expect(getByText("Dashboard Progres Belajar")).toBeTruthy();
  });

  it("displays rank info", () => {
    const { getByText } = renderWithProviders(<Dashboard />);
    expect(getByText(/Status Kemampuan/)).toBeTruthy();
  });

  it("shows XP information", () => {
    const { getByText } = renderWithProviders(<Dashboard />);
    expect(getByText("Total Poin")).toBeTruthy();
  });

  it("renders badge section", () => {
    const { getByText } = renderWithProviders(<Dashboard />);
    expect(getByText("Lencana Diraih")).toBeTruthy();
  });

  it("shows streak counter", () => {
    const { getByText } = renderWithProviders(<Dashboard />);
    expect(getByText("Tantangan Diselesaikan")).toBeTruthy();
  });
});
