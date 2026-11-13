"use client";
import { useEffect, useId, useRef, useState } from "react";
import { MATERIAL_SCORES, SCORE_BANDS, SCORE_SCALE_HELP, scoreBand } from "@/content/materialScores";

/** Odznaka „Wartość X/10” z dymkiem wyjaśniającym ocenę (hover, fokus, dotyk). */
export function ScoreBadge({ slug, size = "sm" }: { slug: string; size?: "sm" | "md" }) {
  const s = MATERIAL_SCORES[slug];
  const id = useId();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: PointerEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("pointerdown", onDown); };
  }, [open]);
  if (!s) return null;
  return (
    <span ref={ref} className={`score score--${size}${open ? " is-open" : ""}`}>
      <button
        type="button"
        className="score__btn"
        aria-describedby={id}
        aria-expanded={open}
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen((v) => !v); }}
      >
        <span className="score__dots" aria-hidden="true">
          {Array.from({ length: 10 }, (_, i) => <i key={i} className={i < s.score ? "on" : ""} />)}
        </span>
        <span>Wartość <strong>{s.score}/10</strong></span>
        <span className="score__i" aria-hidden="true">i</span>
      </button>
      <span role="tooltip" id={id} className="score__tip">
        <strong className="score__tip-h">{s.score}/10 — {scoreBand(s.score)}</strong>
        <span className="score__tip-why">{s.why}</span>
        <span className="score__tip-help">{SCORE_SCALE_HELP}</span>
        <span className="score__tip-scale">
          {SCORE_BANDS.slice(0, 3).map((b, i) => <span key={b.min}>{i === 0 ? "9–10" : i === 1 ? "7–8" : "5–6"}: {b.label}</span>)}
        </span>
      </span>
    </span>
  );
}
