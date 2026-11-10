import { ToolLanding } from "@/components/landing/ToolLanding";
import { ConsequencesTool } from "@/components/tools/ConsequencesTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/toolMetadata";

const SLUG = "konsekwencje-rozstania";
export const metadata = toolMetadata(SLUG);

function Preview() {
  const tiles: [string, string][] = [
    ["Dzieci", "p"], ["Mieszkanie", "p"], ["Finanse i alimenty", "d"],
    ["Majątek", "d"], ["Kredyt", "d"], ["Możliwe procedury", "d"],
    ["Obowiązki", "w"], ["Dokumenty", "w"], ["Do analizy", "w"],
  ];
  const style = (t: string) => t === "p" ? { background: "var(--gold-500)", color: "var(--green-900)" } : t === "d" ? { background: "var(--green-700)", color: "#fff" } : { background: "var(--green-50)", color: "var(--green-800)", border: "1px solid var(--green-100)" };
  return (
    <div>
      <p className="xsmall muted" style={{ margin: "6px 0 10px", fontWeight: 600 }}>TWOJA MAPA TEMATÓW</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
        {tiles.map(([t, k]) => (
          <div key={t} style={{ ...style(k), borderRadius: 10, padding: "10px 8px", fontSize: 12.5, fontWeight: 650, minHeight: 52, lineHeight: 1.2 }}>{t}</div>
        ))}
      </div>
      <div className="card" style={{ padding: 12, marginTop: 10, borderLeft: "4px solid var(--gold-500)" }}>
        <div style={{ display: "flex", gap: 6, marginBottom: 6 }}><span className="tag tag--gold" style={{ fontSize: 11 }}>Twój priorytet</span><span className="tag tag--warn" style={{ fontSize: 11 }}>Zależy od szczegółów</span></div>
        <strong style={{ fontSize: 14 }}>Dzieci</strong>
        <p className="xsmall muted" style={{ margin: "4px 0 0" }}>Co warto wiedzieć · Co sprawdzić · Pytania do specjalisty</p>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <ToolLanding tool={getTool(SLUG)} preview={<Preview />}>
      <ConsequencesTool />
    </ToolLanding>
  );
}
