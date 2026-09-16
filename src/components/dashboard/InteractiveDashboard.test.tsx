import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderWithProviders } from "@/test/test-utils";
import { InteractiveDashboard } from "./InteractiveDashboard";

describe("InteractiveDashboard (Phase 1 Foundation)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the dashboard header and title", () => {
    const { getByText } = renderWithProviders(<InteractiveDashboard />);
    expect(getByText("Lingkungan Belajar Sains & Matematika")).toBeTruthy();
  });

  it("renders the learning mode switcher buttons", () => {
    const { getByText } = renderWithProviders(<InteractiveDashboard />);
    expect(getByText("Belajar Terstruktur")).toBeTruthy();
    expect(getByText("Eksplorasi Bebas")).toBeTruthy();
    expect(getByText("Uji Penguasaan")).toBeTruthy();
  });

  it("renders continue learning card and recommended next topic", () => {
    const { getByText } = renderWithProviders(<InteractiveDashboard />);
    expect(getByText("Lanjutkan Belajar")).toBeTruthy();
    expect(getByText("Rekomendasi Alur")).toBeTruthy();
  });

  it("renders the 5-dimensional STEM mastery matrix", () => {
    const { getByText } = renderWithProviders(<InteractiveDashboard />);
    expect(getByText("Matriks 5 Dimensi Kemahiran STEM")).toBeTruthy();
    expect(getByText("Conceptual Understanding")).toBeTruthy();
    expect(getByText("Procedural Fluency")).toBeTruthy();
    expect(getByText("Mathematical Reasoning")).toBeTruthy();
    expect(getByText("Problem Solving")).toBeTruthy();
    expect(getByText("Transfer of Knowledge")).toBeTruthy();
  });

  it("renders knowledge connections between math and science", () => {
    const { getByText } = renderWithProviders(<InteractiveDashboard />);
    expect(getByText("Hubungan Antara Matematika & Sains")).toBeTruthy();
  });

  it("renders virtual experiment labs", () => {
    const { getByText } = renderWithProviders(<InteractiveDashboard />);
    expect(getByText("Simulasi Kanvas Interaktif")).toBeTruthy();
  });
});
