import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import GlobalNotFoundContent from "@/components/GlobalNotFoundContent";
import ThemeProvider from "@/components/providers/ThemeProvider";

export default function GlobalNotFound() {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${fontVariables} font-fa`}
    >
      <body className="min-h-dvh bg-canvas text-ink antialiased">
        <ThemeProvider>
          <GlobalNotFoundContent />
        </ThemeProvider>
      </body>
    </html>
  );
}
