import type { Material } from "@/content/types";

/**
 * Okładka 3D materiału. Jeśli w /public/covers/<slug>.webp istnieje wygenerowana grafika
 * (np. z OpenAI — prompty w MARKETING/COVERS.md), ustaw `image` w src/content/covers.ts.
 * Do tego czasu renderujemy spójną z marką makietę CSS.
 */
import { COVER_IMAGES } from "@/content/covers";

export function Cover3D({ m, size = "md" }: { m: Material; size?: "sm" | "md" }) {
  const img = COVER_IMAGES[m.slug];
  if (img) return <img src={img} alt={`Okładka: ${m.coverTitle}`} className="cover-img" width={600} height={600} loading="lazy" />;
  return (
    <div className={`cover3d tone-${m.coverTone}`} aria-hidden="true" style={size === "sm" ? { padding: "4px 0 12px" } : undefined}>
      <div className="cover3d__book" style={size === "sm" ? { width: 150 } : undefined}>
        <div className="cover3d__spine" />
        <div className="cover3d__pages" />
        <div className="cover3d__face">
          <span className="cover3d__brand">Nowy Etap · Poradnia rozwodowa</span>
          <span className="cover3d__stair" />
          <span className="cover3d__format">{m.format}</span>
          <span className="cover3d__title" style={size === "sm" ? { fontSize: 14 } : undefined}>{m.coverTitle}</span>
          <span className="cover3d__sub">{m.coverSubtitle}</span>
        </div>
      </div>
    </div>
  );
}
