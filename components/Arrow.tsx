/** Plain typographic arrow that points the reading direction (mirrors in RTL). */
export default function Arrow({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`inline-block font-sans rtl:-scale-x-100 ${className}`}>
      →
    </span>
  );
}
