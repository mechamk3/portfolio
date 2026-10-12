import { notFound } from "next/navigation";

import { getDictionary, isLocale, monoClass } from "@/lib/i18n";
import HomeClient from "@/components/home/HomeClient";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return <HomeClient t={t} locale={locale} mono={monoClass(locale)} />;
}