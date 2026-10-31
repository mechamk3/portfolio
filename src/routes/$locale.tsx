import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { isLocale, type Locale } from "@/lib/i18n";
import { Navbar, Footer } from "@/components/site/Navbar";
import { Backdrop } from "@/components/site/bits";

export const Route = createFileRoute("/$locale")({
  beforeLoad: ({ params }) => {
    if (!isLocale(params.locale)) throw notFound();
  },
  component: LocaleLayout,
});

function LocaleLayout() {
  const { locale } = Route.useParams();
  return (
    <div className="relative flex min-h-dvh flex-col">
      <Backdrop />
      <Navbar locale={locale as Locale} />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer locale={locale as Locale} />
    </div>
  );
}
