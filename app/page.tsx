
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
        className="btn btn-primary mt-6"
      >
        ورود به سایت
      </a>
    </main>
  );
}
