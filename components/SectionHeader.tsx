export default function SectionHeader({
  label,
  index,
  mono = false,
}: {
  label: string;
  index?: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-center gap-4">
      {index && (
        <span className="font-mono text-sm text-emerald-600 dark:text-emerald-400">
          {index}
        </span>
      )}
      <p className={`text-xs font-medium text-zinc-500 dark:text-zinc-400 ${mono ? "font-mono uppercase tracking-[0.2em]" : ""}`}>
        {label}
      </p>
      <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" aria-hidden />
    </div>
  );
}