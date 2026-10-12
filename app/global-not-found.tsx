// app/global-not-found.tsx
import "./globals.css";

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="flex min-h-dvh flex-col items-center justify-center bg-canvas px-6 text-center text-ink antialiased">
        <p className="font-mono text-6xl font-bold text-ink-3">404</p>
        <p className="mt-4 text-lg">This page hasn&apos;t been designed yet.</p>
        <a
          href="/"
          className="mt-8 rounded-full bg-accent px-6 py-3 text-sm font-medium text-canvas transition-colors hover:bg-accent-strong"
        >
          Back to home
        </a>
      </body>
    </html>
  );
}