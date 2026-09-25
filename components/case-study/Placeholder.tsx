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
    <div className="flex flex-col items-center rounded-xl border border-dashed border-zinc-300 px-6 py-6 text-center dark:border-zinc-700">
      {title && (
        <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300">{title}</p>
      )}
      <p className={labelClass ?? "font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500"}>
        {label}
      </p>
    </div>
  );
}