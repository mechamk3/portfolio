import type { NextConfig } from "next";

/**
 * Base path under which the site is served.
 *
 * - On GitHub Pages (project site) this MUST match `/repo-name`.
 * - For a user/org root site (`user.github.io`) set it to `""`.
 *
 * You can override it at build time:
 *   NEXT_PUBLIC_BASE_PATH=/my-repo npm run build
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "/portfolio";

const nextConfig: NextConfig = {
  // Static HTML export — produces a fully static `out/` folder.
  output: "export",
  // Each route becomes `/route/index.html` — friendlier for static hosts.
  trailingSlash: true,
  // GitHub Pages cannot run the Next.js image optimizer.
  images: { unoptimized: true },
  // Tells Next that every URL/asset lives under BASE_PATH (e.g. /portfolio).
  // <Link>, <Image>, next/router, usePathname() all handle this automatically.
  basePath: BASE_PATH,
  experimental: { globalNotFound: true },
};

export default nextConfig;
