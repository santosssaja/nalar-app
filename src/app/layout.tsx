import type { Metadata } from "next";
import "./globals.css";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import { GamificationProvider } from "@/context/GamificationContext";
import { AccessibilityBar } from "@/components/accessibility/AccessibilityBar";

export const metadata: Metadata = {
  title: "Nalar | Platform Belajar STEM Interaktif & Inklusif (SDG 4)",
  description:
    "Eksplorasi konsep matematika dan sains melalui simulasi kanvas interaktif, visualisasi intuitif, dan fitur ramah aksesibilitas difabel tanpa hambatan pendaftaran.",
  keywords: ["STEM", "Matematika Interaktif", "SDG 4", "Aljabar Linear", "Aksesibilitas", "Edukasi Visual"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" data-theme="dark">
      <body className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col antialiased selection:bg-indigo-500 selection:text-white">
        <AccessibilityProvider>
          <GamificationProvider>
            <AccessibilityBar />
            <div className="flex-1 flex flex-col">{children}</div>
          </GamificationProvider>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
