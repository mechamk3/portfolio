import "./globals.css";
import { fontClassName, fontStyle } from "@/lib/fonts";
import GlobalNotFoundContent from "@/components/GlobalNotFoundContent";
import ThemeProvider from "@/components/providers/ThemeProvider";

export default function GlobalNotFound() {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${fontClassName} font-fa`}
      style={fontStyle}
    >
      <body className="min-h-dvh bg-canvas text-ink antialiased">
        <ThemeProvider>
          <GlobalNotFoundContent />
        </ThemeProvider>
      </body>
    </html>
  );
}
