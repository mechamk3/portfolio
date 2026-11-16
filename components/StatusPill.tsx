/** Status as plain text with a small dot — filled when live, hollow when still in progress. */
export function StatusPill({ status, tone }: { status: string; tone: "ok" | "pilot" }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-ink-3">
      <span
        aria-hidden
        className={`size-1.5 shrink-0 rounded-full ${tone === "ok" ? "bg-success" : "border border-ink-3"}`}
      />
      {status}
    </span>
  );
}
