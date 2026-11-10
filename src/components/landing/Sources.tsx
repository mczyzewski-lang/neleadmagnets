import type { SourceRef } from "@/content/types";
export function Sources({ items }: { items: SourceRef[] }) {
  return (
    <ul className="list-dot">
      {items.map((s) => (
        <li key={s.label + s.url}>
          <a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>
          {s.verified && <span className="xsmall muted"> · sprawdzono {new Date(s.verified).toLocaleDateString("pl-PL")}</span>}
        </li>
      ))}
    </ul>
  );
}
