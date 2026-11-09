import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { defaultLocale, isLocale } from "@/lib/i18n";

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;

  return (
    <>
      <Navbar locale={locale} />
      <div className="flex-1">{children}</div>
      <Footer locale={locale} />
    </>
  );
}