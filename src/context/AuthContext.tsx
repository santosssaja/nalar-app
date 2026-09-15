"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { syncEngine } from "@/lib/sync/sync-engine";

export interface AuthUser {
  id: string;
  email: string | null;
  name: string;
  avatarUrl?: string | null;
  isGuest: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  isGuest: boolean;
  isLoading: boolean;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Initialize Auth & Sync
  useEffect(() => {
    syncEngine.init();

    const checkSession = async () => {
      const token = localStorage.getItem("nalar_auth_token");
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            setUser(data.user);
            // Trigger background sync
            syncEngine.syncNow();
          }
        } else {
          localStorage.removeItem("nalar_auth_token");
        }
      } catch (err) {
        console.warn("[Auth] Failed to restore session:", err);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const openLoginModal = useCallback(() => setIsLoginModalOpen(true), []);
  const closeLoginModal = useCallback(() => setIsLoginModalOpen(false), []);

  const login = async (email: string, password?: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || "Gagal masuk" };
      }

      localStorage.setItem("nalar_auth_token", data.token);
      setUser(data.user);
      setIsLoginModalOpen(false);
      syncEngine.syncNow();
      return { success: true };
    } catch (err) {
      return { success: false, error: "Terjadi kesalahan jaringan" };
    }
  };

  const register = async (name: string, email: string, password?: string) => {
    try {
      // Gather local progress for migration if any
      const rawLocal = localStorage.getItem("nalar_gamification_state");
      let initialProgress = undefined;
      if (rawLocal) {
        try {
          const parsed = JSON.parse(rawLocal);
          initialProgress = {
            xp: parsed.xp || 0,
            completedLevels: parsed.completedLevels || {},
            unlockedBadges: parsed.unlockedBadges || [],
            streak: {
              current: parsed.streak?.currentStreak || 0,
              longest: parsed.streak?.longestStreak || 0,
              lastActiveDate: parsed.streak?.lastActiveDate || null,
            },
          };
        } catch {
          // ignore
        }
      }

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, initialProgress }),
      });

      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || "Gagal mendaftar" };
      }

      localStorage.setItem("nalar_auth_token", data.token);
      setUser(data.user);
      setIsLoginModalOpen(false);
      syncEngine.syncNow();
      return { success: true };
    } catch (err) {
      return { success: false, error: "Terjadi kesalahan jaringan" };
    }
  };

  const logout = async () => {
    const token = localStorage.getItem("nalar_auth_token");
    if (token) {
      fetch("/api/auth/logout", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => {});
    }
    localStorage.removeItem("nalar_auth_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isGuest: !user || user.isGuest,
        isLoading,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
