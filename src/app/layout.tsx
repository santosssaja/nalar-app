import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import { ThemeScript } from "@/components/providers/ThemeScript";

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
        <ThemeScript />
      </head>
      <body className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col antialiased selection:bg-indigo-500 selection:text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
