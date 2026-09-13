"use client";

import React from "react";
import Link from "next/link";
import { clsx } from "clsx";
import { Tooltip } from "@/components/ui/Tooltip";
import { Home, Network, BookOpen } from "lucide-react";

export interface NavItemDef {
  label: string;
  href: string;
  icon: React.ElementType;
  isActive: boolean;
  badge?: string;
}

export function SidebarNavItems({
  pathname,
  isCollapsed,
  onClose,
}: {
  pathname: string;
  isCollapsed: boolean;
  onClose?: () => void;
}) {
  const navItems: NavItemDef[] = [
    {
      label: "Beranda",
      href: "/dashboard",
      icon: Home,
      isActive: pathname.startsWith("/dashboard"),
    },
    {
      label: "Katalog Modul",
      href: "/explore",
      icon: BookOpen,
      isActive: pathname.startsWith("/explore") || pathname.startsWith("/topics"),
      badge: "50+ Topik",
    },
  ];

  return (
    <nav aria-label="Navigasi Utama" className="space-y-1.5 w-full">
      {navItems.map((item) => {
        const Icon = item.icon;
        const linkContent = (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className={clsx(
              "flex items-center rounded-xl text-sm font-bold transition duration-150",
              isCollapsed
                ? "justify-center w-full p-2.5"
                : "justify-between px-3.5 py-2.5",
              item.isActive
                ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 shadow-sm"
                : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60"
            )}
            aria-current={item.isActive ? "page" : undefined}
          >
            <div className="flex items-center gap-3">
              <Icon
                className={clsx(
                  "w-4 h-4 shrink-0",
                  item.isActive ? "text-indigo-400" : "text-neutral-400"
                )}
              />
              {!isCollapsed && <span>{item.label}</span>}
            </div>
            {!isCollapsed && item.badge && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {item.badge}
              </span>
            )}
          </Link>
        );

        if (isCollapsed) {
          return (
            <div key={item.href} className="w-full flex justify-center">
              <Tooltip content={item.label} position="right">
                {linkContent}
              </Tooltip>
            </div>
          );
        }
        return linkContent;
      })}
    </nav>
  );
}
