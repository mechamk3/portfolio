
"use client";

import "./globals.css";
import { useEffect } from "react";

export default function RootPage() {
  useEffect(() => {
    window.location.replace("fa/");
  }, []);

  return (
    <main
      lang="fa"
      dir="rtl"
      className="flex min-h-dvh flex-col items-center justify-center bg-canvas px-6 text-center text-ink antialiased"
    >
      <p className="text-sm text-ink-2">
        در حال انتقال به نسخه فارسی...
      </p>

      <a
        href="fa/"
        className="mt-6 rounded-full bg-accent px-6 py-3 text-sm font-medium text-canvas transition-colors hover:bg-accent-strong"
      >
        ورود به سایت
      </a>
    </main>
  );
}
