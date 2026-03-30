/* eslint-disable react/prop-types */
/**
 * Wideframe-style section label, e.g. [01] HERO
 */
export function SectionIndex({ index, label, className = "" }) {
  const n = String(index).padStart(2, "0");
  return (
    <p
      className={`font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground ${className}`}
    >
      <span className="text-foreground/90">[{n}]</span>
      {label ? <span className="ml-2 text-[hsl(var(--accent))]">{label}</span> : null}
    </p>
  );
}
