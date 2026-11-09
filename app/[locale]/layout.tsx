import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { inter, vazirmatn } from "@/lib/fonts";

import { getDictionary, isLocale } from "@/lib/i18n";
import ThemeProvider from "@/components/providers/ThemeProvider";
import "../globals.css";

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
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${vazirmatn.variable}`}
    >
      <body
        className={`flex min-h-dvh flex-col bg-canvas text-ink antialiased ${isFa ? "font-fa" : "font-sans"
          }`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}