"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Network, BookOpen } from "lucide-react";
import { clsx } from "clsx";

export function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Beranda",
      href: "/dashboard",
      icon: Home,
      isActive: pathname.startsWith("/dashboard"),
    },
    {
      label: "Pohon Belajar",
      href: "/skill-tree",
      icon: Network,
      isActive: pathname.startsWith("/skill-tree"),
    },
    {
      label: "Katalog Modul",
      href: "/explore",
      icon: BookOpen,
      isActive: pathname.startsWith("/explore") || pathname.startsWith("/topics"),
    },
  ];

  return (
    <nav
      aria-label="Navigasi Mobile Bawah"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-neutral-900/95 border-t border-neutral-800 backdrop-blur-md px-4 py-2 flex items-center justify-around text-neutral-400"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              "flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition text-xs font-semibold select-none",
              item.isActive
                ? "text-indigo-400 bg-indigo-500/10"
                : "text-neutral-400 hover:text-neutral-200"
            )}
            aria-current={item.isActive ? "page" : undefined}
          >
            <Icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
