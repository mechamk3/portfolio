export default function SectionHeader({
  label,
  index,
}: {
  label: string;
  index?: string;
  /** @deprecated styling now follows the page language automatically */
  mono?: boolean;
}) {
  return (
    <p className="eyebrow">
      {index && <span className="text-accent">{index}</span>}
      {index && <span aria-hidden> / </span>}
      {label}
    </p>
  );
}
