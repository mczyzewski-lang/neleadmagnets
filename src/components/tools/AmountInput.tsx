"use client";
import { useEffect, useState } from "react";
import { parseAmount } from "@/lib/format";

/** Kompaktowe pole kwoty do wierszy kalkulatora. Puste = brak wartości. */
export function AmountInput({ value, onChange, label, suffix = "zł", max = 10_000_000, className = "" }: {
  value: number | undefined; onChange: (v: number | undefined) => void; label: string; suffix?: string; max?: number; className?: string;
}) {
  const [raw, setRaw] = useState(value === undefined ? "" : String(value));
  useEffect(() => {
    if (value === undefined && raw !== "" && parseAmount(raw) !== 0) setRaw("");
    else if (value !== undefined && parseAmount(raw) !== value) setRaw(String(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  const invalid = raw !== "" && !/^[\d\s.,]+$/.test(raw);
  return (
    <span className={`input-group calc-amount ${className}`}>
      <input
        className="input"
        inputMode="decimal"
        autoComplete="off"
        aria-label={label}
        aria-invalid={invalid ? "true" : undefined}
        placeholder="0"
        value={raw}
        onChange={(e) => {
          const r = e.target.value;
          setRaw(r);
          if (r.trim() === "") return onChange(undefined);
          if (!/^[\d\s.,]+$/.test(r)) return;
          onChange(Math.min(max, Math.max(0, parseAmount(r))));
        }}
      />
      <span className="input-group__suffix">{suffix}</span>
    </span>
  );
}
