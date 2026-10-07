import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter, Vazirmatn } from "next/font/google";

import { getDictionary, isLocale } from "@/lib/i18n";
import ThemeProvider from "@/components/providers/ThemeProvider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const vazirmatn = Vazirmatn({ subsets: ["arabic", "latin"], variable: "--font-vazirmatn" });

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fa" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", fa: "/fa" },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const isFa = locale === "fa";

  return (
    <html
      lang={locale}
      dir={isFa ? "rtl" : "ltr"}
      suppressHydrationWarning // required: theme script mutates <html> class before hydration
      className={`${inter.variable} ${vazirmatn.variable} ${isFa ? "font-fa" : "font-sans"}`}
    >
      <body className="flex min-h-dvh flex-col bg-canvas text-ink antialiased">
        <ThemeProvider>
          <Navbar locale={locale} />
          <div className="flex-1">{children}</div>
          <Footer locale={locale} />
        </ThemeProvider>
      </body>
    </html>
  );
}