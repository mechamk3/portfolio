export function MergeArrows({ className }: { className?: string }) {
  return (
    <div aria-hidden className={`flex flex-col items-center ${className ?? ""}`}>
      {/* three dashed lines converging into the center */}
      <svg viewBox="0 0 300 56" preserveAspectRatio="none" fill="none" className="w-full flex-1">
        <g
          stroke="currentColor"
          strokeWidth={1}
          strokeLinecap="round"
          strokeDasharray="4 5"
          fill="none"
        >
          <path vectorEffect="non-scaling-stroke" d="M50 0 C 50 28 148 24 150 52" />
          <path vectorEffect="non-scaling-stroke" d="M150 0 V 52" />
          <path vectorEffect="non-scaling-stroke" d="M250 0 C 250 28 152 24 150 52" />
        </g>
      </svg>

      {/* chevron */}
      <svg viewBox="0 0 12 8" fill="none" className="-mt-px h-2 w-3">
        <path
          d="M2 2 L6 6 L10 2"
          stroke="currentColor"
          strokeWidth={1}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

export function DeployNode({
  title,
  note,
  className = "",
}: {
  title: string;
  note?: string;
  className?: string;
}) {
  return (
    <div
      className={`w-full rounded-xl border border-line bg-surface-2/40 px-3 py-2.5 text-center ${className}`}
    >
      <p className="font-mono text-sm font-medium text-ink">{title}</p>
      {note && <p className="mt-0.5 text-xs leading-5 text-ink-2">{note}</p>}
    </div>
  );
}

export function DeployConnector({ label }: { label?: string }) {
  return (
    <div className="relative flex flex-col items-center text-ink-3">
      <span aria-hidden className="h-4 border-s border-dashed border-line-strong" />
      <svg aria-hidden viewBox="0 0 12 8" fill="none" className="-mt-px h-2 w-3">
        <path
          d="M2 2 L6 6 L10 2"
          stroke="currentColor"
          strokeWidth={1}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {label && (
        <span className="absolute inset-s-1/2 top-1 ms-2 whitespace-nowrap font-mono text-[10px] leading-none text-ink-3">
          {label}
        </span>
      )}
    </div>
  );
}