type CategoryBadgeProps = {
  label: string;
  color?: string;
};

export function CategoryBadge({ label, color = "#6366F1" }: CategoryBadgeProps) {
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold"
      style={{ backgroundColor: `${color}24`, color }}
    >
      {label}
    </span>
  );
}
