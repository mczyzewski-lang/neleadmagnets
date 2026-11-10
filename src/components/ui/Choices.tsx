"use client";
import { useId } from "react";

export type Option = { value: string; label: string; desc?: string };

export function SingleChoice({ legend, options, value, onChange, columns = 1, hideLegend = true, name }: {
  legend: string; options: Option[]; value?: string; onChange: (v: string) => void; columns?: 1 | 2; hideLegend?: boolean; name?: string;
}) {
  const id = useId();
  return (
    <fieldset className={`choices ${columns === 2 ? "choices--2" : ""}`}>
      <legend className={hideLegend ? "visually-hidden" : "field__label"}>{legend}</legend>
      {options.map((o) => (
        <label key={o.value} className="choice">
          <input type="radio" name={name || id} value={o.value} checked={value === o.value} onChange={() => onChange(o.value)} />
          <span className="choice__mark" aria-hidden="true" />
          <span className="choice__text">
            <span className="choice__label">{o.label}</span>
            {o.desc && <span className="choice__desc">{o.desc}</span>}
          </span>
        </label>
      ))}
    </fieldset>
  );
}

export function MultiChoice({ legend, options, value, onChange, columns = 1, hideLegend = true, exclusive }: {
  legend: string; options: Option[]; value: string[]; onChange: (v: string[]) => void; columns?: 1 | 2; hideLegend?: boolean;
  /** Wartość, która wyklucza pozostałe (np. „żadne z powyższych”) */
  exclusive?: string;
}) {
  const toggle = (v: string) => {
    if (value.includes(v)) return onChange(value.filter((x) => x !== v));
    if (exclusive && v === exclusive) return onChange([v]);
    onChange([...value.filter((x) => x !== exclusive), v]);
  };
  return (
    <fieldset className={`choices ${columns === 2 ? "choices--2" : ""}`}>
      <legend className={hideLegend ? "visually-hidden" : "field__label"}>{legend}</legend>
      {options.map((o) => (
        <label key={o.value} className="choice choice--multi">
          <input type="checkbox" value={o.value} checked={value.includes(o.value)} onChange={() => toggle(o.value)} />
          <span className="choice__mark" aria-hidden="true" />
          <span className="choice__text">
            <span className="choice__label">{o.label}</span>
            {o.desc && <span className="choice__desc">{o.desc}</span>}
          </span>
        </label>
      ))}
    </fieldset>
  );
}
