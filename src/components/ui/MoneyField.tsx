"use client";
import { useId, useState, useEffect } from "react";
import { parseAmount } from "@/lib/format";

/** Pole kwoty: akceptuje „12 500”, „12500,50”. Wartość przechowywana jako liczba. */
export function MoneyField({ label, value, onChange, hint, suffix = "zł", min = 0, max = 100_000_000, id: idProp, compact }: {
  label: string; value: number | undefined; onChange: (v: number | undefined) => void; hint?: string; suffix?: string; min?: number; max?: number; id?: string; compact?: boolean;
}) {
  const auto = useId();
  const id = idProp || auto;
  const [raw, setRaw] = useState(value === undefined ? "" : String(value));
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    // synchronizacja przy zewnętrznej zmianie (np. reset)
    if (value === undefined && raw !== "") setRaw("");
    else if (value !== undefined && parseAmount(raw) !== value) setRaw(String(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return (
    <div className="field" style={compact ? { marginBottom: 10 } : undefined}>
      <label className="field__label" htmlFor={id}>{label}</label>
      <div className="input-group">
        <input
          id={id}
          className="input"
          inputMode="decimal"
          autoComplete="off"
          value={raw}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={hint || error ? `${id}-d` : undefined}
          onChange={(e) => {
            const r = e.target.value;
            setRaw(r);
            if (r.trim() === "") { setError(null); onChange(undefined); return; }
            if (!/^[\d\s.,]+$/.test(r)) { setError("Wpisz samą kwotę, np. 2500"); return; }
            const v = parseAmount(r);
            if (v < min || v > max) { setError(`Wpisz wartość od ${min} do ${max.toLocaleString("pl-PL")}`); return; }
            setError(null);
            onChange(v);
          }}
        />
        <span className="input-group__suffix">{suffix}</span>
      </div>
      {(hint || error) && (
        <span id={`${id}-d`} className={error ? "field__error" : "field__hint"}>{error || hint}</span>
      )}
    </div>
  );
}
