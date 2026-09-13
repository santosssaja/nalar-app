import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import { GamificationProvider } from "@/context/GamificationContext";
import { NaiProvider } from "@/components/nai/NaiContext";
import { Nai } from "@/components/nai/Nai";
import { NaiPageWatcher } from "@/components/nai/NaiPageWatcher";
import { PageShell } from "@/components/layout/PageShell";
import { LevelUpModal } from "@/components/gamification/LevelUpModal";

export const metadata: Metadata = {
  title: "Nalar | Platform Belajar STEM Interaktif & Inklusif",
  description:
    "Pendidikan Berkualitas: menyediakan pendidikan yang inklusif, merata, dan berkualitas melalui simulasi kanvas interaktif dan aksesibilitas ramah difabel.",
  keywords: [
    "STEM",
    "Matematika Interaktif",
    "Pendidikan Berkualitas",
    "Aljabar Linear",
    "Aksesibilitas",
    "Edukasi Visual",
    "Nai",
  ],
};

/**
 * Synchronous Anti-FOUC (Flash of Unstyled Content) Script.
 * Runs in <head> before first browser paint to eliminate theme flickering on page refresh.
 */
const themeInitializerScript = `(function() {
  try {
    var stored = localStorage.getItem('nalar_a11y_prefs_v1');
    if (stored) {
      var prefs = JSON.parse(stored);
      if (prefs && prefs.theme) {
        document.documentElement.setAttribute('data-theme', prefs.theme);
        document.documentElement.setAttribute('data-high-contrast', String(prefs.theme === 'high-contrast'));
      }
      if (prefs && prefs.fontScale) {
        document.documentElement.setAttribute('data-font-scale', prefs.fontScale);
      }
    }
  } catch (e) {}
})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      data-theme="dark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitializerScript }}
        />
      </head>
      <body className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col antialiased selection:bg-indigo-500 selection:text-white">
        <AccessibilityProvider>
          <GamificationProvider>
            <NaiProvider>
              <NaiPageWatcher />
              <PageShell>{children}</PageShell>
              <Nai />
              <LevelUpModal />
            </NaiProvider>
          </GamificationProvider>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
