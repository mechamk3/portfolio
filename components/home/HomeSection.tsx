/**
 * Home-page section: the label sits in the margin on large screens
 * (like a note beside the text) and above the content on small ones.
 */
export default function HomeSection({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-label`}
      className="scroll-mt-16 border-t border-line py-14 sm:py-20 lg:grid lg:grid-cols-[170px_minmax(0,1fr)] lg:gap-10"
    >
      <h2 id={`${id}-label`} className="eyebrow mb-6 lg:sticky lg:top-24 lg:mb-0 lg:self-start lg:pt-2">
        {label}
      </h2>

      <div className="min-w-0">{children}</div>
    </section>
  );
}
