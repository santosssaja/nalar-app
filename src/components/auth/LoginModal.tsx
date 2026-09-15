"use client";

import React, { useState } from "react";
import { X, Mail, Lock, User, Sparkles, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";

export function LoginModal() {
  const { isLoginModalOpen, closeLoginModal, login, register } = useAuth();
  const [tab, setTab] = useState<"login" | "register" | "guest">("login");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isLoginModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      if (tab === "login") {
        const res = await login(email, password);
        if (!res.success) setErrorMsg(res.error || "Gagal masuk");
      } else if (tab === "register") {
        const res = await register(name, email, password);
        if (!res.success) setErrorMsg(res.error || "Gagal mendaftar");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Modal Akun & Masuk Nalar"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm animate-fade-in"
    >
      <div className="relative w-full max-w-md p-6 rounded-3xl bg-neutral-900 border border-neutral-800 shadow-2xl space-y-6">
        {/* Close Button */}
        <button
          type="button"
          onClick={closeLoginModal}
          className="absolute top-4 right-4 p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
          aria-label="Tutup modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1 text-center pr-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Akun Pembelajar Nalar</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {tab === "guest" ? "Mode Tamu Aktif" : tab === "login" ? "Masuk ke Akunmu" : "Daftar Akun Baru"}
          </h2>
          <p className="text-xs text-neutral-400">
            {tab === "guest"
              ? "Tetap dapat belajar dan simpan progres di browser tanpa akun."
              : "Sinkronkan kemajuan belajar, XP, dan lencana di berbagai perangkat."}
          </p>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-3 gap-1 p-1 rounded-2xl bg-neutral-950 border border-neutral-800 text-xs font-bold">
          <button
            type="button"
            onClick={() => { setTab("login"); setErrorMsg(null); }}
            className={`py-2 rounded-xl transition ${tab === "login" ? "bg-indigo-600 text-white" : "text-neutral-400 hover:text-white"}`}
          >
            Masuk
          </button>
          <button
            type="button"
            onClick={() => { setTab("register"); setErrorMsg(null); }}
            className={`py-2 rounded-xl transition ${tab === "register" ? "bg-indigo-600 text-white" : "text-neutral-400 hover:text-white"}`}
          >
            Daftar
          </button>
          <button
            type="button"
            onClick={() => { setTab("guest"); setErrorMsg(null); }}
            className={`py-2 rounded-xl transition ${tab === "guest" ? "bg-indigo-600 text-white" : "text-neutral-400 hover:text-white"}`}
          >
            Tamu
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
            {errorMsg}
          </div>
        )}

        {/* Guest Tab View */}
        {tab === "guest" ? (
          <div className="space-y-4 pt-1">
            <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Prinsip Zero-Friction Onboarding</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Di Nalar, registrasi <strong>tidak pernah diwajibkan</strong>. Anda dapat menyelesaikan tantangan logika, mengumpulkan lencana, dan memperoleh XP tanpa login. Data otomatis disimpan di browser Anda.
              </p>
            </div>

            <Button
              variant="primary"
              size="md"
              className="w-full justify-center font-bold"
              onClick={closeLoginModal}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Lanjutkan sebagai Tamu
            </Button>
          </div>
        ) : (
          /* Login & Register Form */
          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === "register" && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-300">Nama Panggilan</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Aria"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-300">Alamat Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs focus:outline-none focus:border-indigo-500 transition"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-neutral-300">Kata Sandi</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white text-xs focus:outline-none focus:border-indigo-500 transition"
                />
              </div>
            </div>

            {tab === "register" && (
              <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-[11px] text-indigo-300 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  Progres lokal, XP, dan lencana yang Anda peroleh sebelumnya akan otomatis dipindahkan ke akun baru ini.
                </span>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={isSubmitting}
              className="w-full justify-center font-bold py-2.5"
            >
              {isSubmitting ? "Memproses..." : tab === "login" ? "Masuk ke Akun" : "Buat Akun & Migrasikan Data"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
