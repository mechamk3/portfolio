import { createFileRoute, redirect } from "@tanstack/react-router";
import { defaultLocale } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/$locale", params: { locale: defaultLocale } });
  },
  head: () => ({
    meta: [
      { title: "MohammadJavad Tolou — Software Engineer" },
      { name: "description", content: "Portfolio of MohammadJavad Tolou, software engineer." },
      { property: "og:title", content: "MohammadJavad Tolou — Software Engineer" },
      { property: "og:description", content: "Portfolio of MohammadJavad Tolou, software engineer." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});
