import type { SourceRef } from "@/content/types";

/** Podstawy prawne i źródła: zwinięte, żeby nie rozpraszały — dostępne dla dociekliwych. */
export function Sources({ items }: { items: SourceRef[] }) {
  if (!items.length) return null;
  return (
    <details className="sources">
      <summary>Podstawy prawne i źródła ({items.length})</summary>
      <ul className="list-dot">
        {items.map((s) => (
          <li key={s.label + s.url}>
            <a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>
            {s.verified && <span className="xsmall muted"> · sprawdzono {new Date(s.verified).toLocaleDateString("pl-PL")}</span>}
          </li>
        ))}
      </ul>
    </details>
  );
}
