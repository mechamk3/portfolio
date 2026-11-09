export default function Placeholder({
  label,
  labelClass,
  title,
}: {
  label: string;
  labelClass?: string;
  title?: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed border-line-strong px-6 py-6 text-center">
      {title && <p className="text-sm font-medium text-ink-2">{title}</p>}
      <p className={labelClass ?? "font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3"}>
        {label}
      </p>
    </div>
  );
}