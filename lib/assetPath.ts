// Mirror of the `basePath` set in next.config.ts.
//
// Next.js automatically prefixes basePath for <Link>, <Image>, next/router,
// and usePathname(). Use this helper ONLY for raw DOM APIs that Next does
// not know about — e.g. `window.open(src)`, `new Image().src`, fetch() of a
// static JSON, etc. — never pass its result back into a Next component.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "/portfolio";

export function withBasePath(src: string): string {
  // Already prefixed → leave it alone.
  if (BASE_PATH && src.startsWith(`${BASE_PATH}/`)) return src;
  if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("//")) {
    return src;
  }
  return `${BASE_PATH}${src.startsWith("/") ? src : `/${src}`}`;
}
