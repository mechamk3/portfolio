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
    <div className="px-2 flex items-center gap-4">
      {index && (
        <span className="font-mono text-sm text-accent">{index}</span>
      )}
      <p className={`text-xs font-medium text-ink-2 ${mono ? "font-mono uppercase tracking-[0.2em]" : ""}`}>
        {label}
      </p>
      <span className="h-px flex-1 bg-line" aria-hidden />
    </div>
  );
}