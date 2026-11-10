"use client";
import { useId } from "react";

/** Segmentowany wybór (radio) — kompaktowy na mobile, z etykietą widoczną */
export function Seg<T extends string>({ label, value, options, onChange, hint }: { label: string; value: T; options: { value: T; label: string }[]; onChange: (v: T) => void; hint?: string }) {
  const id = useId();
  return (
    <div className="field" role="radiogroup" aria-labelledby={id}>
      <span id={id} className="field__label">{label}</span>
      <div className="segmented dc-seg">
        {options.map((o) => (
          <button key={o.value} type="button" role="radio" aria-checked={value === o.value} aria-pressed={value === o.value} onClick={() => onChange(o.value)}>{o.label}</button>
        ))}
      </div>
      {hint && <span className="field__hint">{hint}</span>}
    </div>
  );
}
