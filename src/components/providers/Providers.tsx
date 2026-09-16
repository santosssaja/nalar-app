"use client";

import React from "react";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import { AuthProvider } from "@/context/AuthContext";
import { GamificationProvider } from "@/context/GamificationContext";
import { LearnerProvider } from "@/context/LearnerContext";
import { NaiProvider } from "@/components/nai/NaiContext";
import { Nai } from "@/components/nai/Nai";
import { NaiPageWatcher } from "@/components/nai/NaiPageWatcher";
import { PageShell } from "@/components/layout/PageShell";
import { LevelUpModal } from "@/components/gamification/LevelUpModal";
import { LoginModal } from "@/components/auth/LoginModal";

interface ProvidersProps {
  children: React.ReactNode;
}

/**
 * Global App Providers component combining Accessibility, Auth, Gamification,
 * and AI Assistant context trees with essential modals.
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <AccessibilityProvider>
      <AuthProvider>
        <GamificationProvider>
          <LearnerProvider>
            <NaiProvider>
              <NaiPageWatcher />
              <PageShell>{children}</PageShell>
              <Nai />
              <LevelUpModal />
              <LoginModal />
            </NaiProvider>
          </LearnerProvider>
        </GamificationProvider>
      </AuthProvider>
    </AccessibilityProvider>
  );
}
