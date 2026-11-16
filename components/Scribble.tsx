/** A hand-drawn pencil stroke — sits under a word as an underline. */
export default function Scribble({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 300 14"
      preserveAspectRatio="none"
      fill="none"
      className={`pointer-events-none absolute start-0 w-full text-accent rtl:-scale-x-100 ${className}`}
    >
      <path
        d="M3 9.5C28 5.2 52 4.1 79 6.3c24 1.9 41 4.6 68 3.1 29-1.600 52-5.2 82-4.700 23 .400 44 2.600 68 1.300"
        stroke="currentColor"
        strokeWidth={2.4}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M96 12.2c31-1.900 70-2.700 118-1.400"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        opacity={0.55}
      />
    </svg>
  );
}
