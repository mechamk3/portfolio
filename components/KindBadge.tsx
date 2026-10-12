import type { ComponentType, SVGProps } from "react";
import { BriefcaseIcon, UserIcon } from "@/components/icons/misc";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const icons: Record<string, IconComponent> = {
    personal: UserIcon,
    work: BriefcaseIcon,
};

export function KindBadge({ kind, label }: { kind: string; label: string }) {
  const Icon = icons[kind];
  if (!Icon) return null;

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-2 px-2 py-0.75 text-xs leading-none text-ink-2">
      <Icon className="size-3 shrink-0 -translate-y-px" aria-hidden="true" />
      {label}
    </span>
  );
}