import Link from "next/link";
import type { Material } from "@/content/types";
import { Cover3D } from "@/components/landing/Cover3D";
import { ScoreBadge } from "./ScoreBadge";

/** Karta materiału: cała klikalna (rozciągnięty link), z odznaką oceny nad linkiem. */
export function MaterialCard({ m, compact = false, headingLevel = 2 }: { m: Material; compact?: boolean; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <div className="card card-link mcard" style={compact ? { padding: 16 } : undefined}>
      <Cover3D m={m} size="sm" />
      <div className="btn-row" style={{ gap: 6 }}>
        <span className="tag tag--gold">{m.format}</span>
        {!compact && <span className="tag">{m.time}</span>}
      </div>
      <div className="mcard__score"><ScoreBadge slug={m.slug} /></div>
      <H className="card__title" style={{ marginTop: 8, fontSize: compact ? "var(--fs-md)" : undefined }}>
        <Link href={`/materialy/${m.slug}`} className="mcard__link">{m.coverTitle}</Link>
      </H>
      <p className={compact ? "xsmall muted" : "small muted"} style={{ margin: 0 }}>{m.promise}</p>
      {!compact && <span className="card-link__more" aria-hidden="true">Zobacz, co zawiera →</span>}
    </div>
  );
}
