"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useNai } from "./NaiContext";
import { getTopicModule } from "@/modules/registry";

export function NaiPageWatcher() {
  const pathname = usePathname();
  const router = useRouter();
  const { say, isMinimized, isHidden } = useNai();
  const lastPathRef = useRef<string | null>(null);

  useEffect(() => {
    // Avoid re-triggering on identical path
    if (lastPathRef.current === pathname) return;
    lastPathRef.current = pathname;

    // Small delay to let page mount and settle before Nai greets
    const timer = setTimeout(() => {
      // 1. Landing Page (/)
      if (pathname === "/") {
        say(
          "Halo! Aku Nai, teman belajarmu di Nalar 👋 Di sini kita memahami sains dan matematika lewat simulasi visual langsung tanpa hafalan rumus. Mau mulai petualangan dari mana hari ini?",
          {
            expression: "happy",
            actionText: "Jelajahi Modul",
            onAction: () => router.push("/explore"),
            autoDismissMs: 14000,
          }
        );
        return;
      }

      // 2. Explore / Katalog (/explore)
      if (pathname === "/explore") {
        say(
          "Ini katalog modul interaktif kita! Ada topik Matematika dan Sains. Pilih topik apa pun yang membuatmu penasaran untuk mulai bereksperimen!",
          {
            expression: "curious",
            actionText: "Buka Peta Keahlian",
            onAction: () => router.push("/skill-tree"),
            autoDismissMs: 12000,
          }
        );
        return;
      }

      // 3. Skill Tree (/skill-tree)
      if (pathname === "/skill-tree") {
        say(
          "Peta Keahlian interaktif! Setiap modul yang kamu kuasai akan membuka cabang konsep baru di sekitarnya. Coba klik salah satu simpul untuk melihat prasyaratnya!",
          {
            expression: "thinking",
            autoDismissMs: 12000,
          }
        );
        return;
      }

      // 4. Settings (/settings)
      if (pathname === "/settings") {
        say(
          "Sesuaikan kenyamanan belajarmu di sini. Kamu bisa menyalakan asistensi audio, mode kontras tinggi, atau menyesuaikan ukuran font!",
          {
            expression: "neutral",
            autoDismissMs: 10000,
          }
        );
        return;
      }

      // 5. Topic Overview (/topics/[slug])
      // Only trigger on topic overview, NOT on level runner (/topics/[slug]/[token])
      const topicMatch = pathname.match(/^\/topics\/([^/]+)$/);
      if (topicMatch) {
        const slug = topicMatch[1];
        const moduleData = getTopicModule(slug);
        const title = moduleData ? moduleData.title : "Topik Ini";
        const levelCount = moduleData ? moduleData.levels.length : "beberapa";

        say(
          `Selamat datang di ${title}! Topik ini memiliki ${levelCount} tingkat penemuan konsep. Mulai dari Tingkat 1 untuk menemukan polanya secara mandiri!`,
          {
            expression: "teaching",
            autoDismissMs: 12000,
          }
        );
        return;
      }

      // 6. Level Runner (/topics/[slug]/[token])
      // Do nothing here — Level runner steps (ExplanationStep, PlaygroundStep, ChallengeStep)
      // will manage their own contextual Nai dialogs.
    }, 600);

    return () => clearTimeout(timer);
  }, [pathname, say, router, isMinimized, isHidden]);

  return null;
}
