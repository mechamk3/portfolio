export function StatusPill({ status, tone }: { status: string; tone: "ok" | "pilot" }) {
  const styles = {
    ok: "bg-accent/10 text-accent",
    pilot: "bg-ink/5 text-ink-2",
  } as const;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${styles[tone]}`}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-current opacity-70" />
      {status}
    </span>
  );
}