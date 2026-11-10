import { ToolLanding } from "@/components/landing/ToolLanding";
import { AssetsTool } from "@/components/decision/AssetsTool";
import { meta } from "@/lib/decision/majatek-wspolny-czy-osobisty.meta";
import { metaFor } from "@/lib/toolMetadata";

export const metadata = metaFor(meta, "/przed-decyzja/majatek-wspolny-czy-osobisty");

function Preview() {
  const rows: [string, string, string][] = [
    ["Mieszkanie (kupione po ślubie)", "Wspólny", "wspolny"],
    ["Samochód (darowizna od rodziców)", "Osobisty", "osobisty"],
    ["Kawalerka sprzed ślubu, raty ze wspólnych", "Mieszany", "mieszany"],
    ["Środki w PPK", "Do analizy", "analiza"],
  ];
  const colors: Record<string, [string, string]> = { wspolny: ["var(--green-50)", "var(--green-700)"], osobisty: ["var(--gold-100)", "var(--gold-text)"], mieszany: ["var(--warn-bg)", "var(--warn)"], analiza: ["#eceff1", "var(--ink-2)"] };
  return (
    <div>
      <p className="xsmall muted" style={{ margin: "6px 0 8px", fontWeight: 600 }}>WSTĘPNA MAPA MAJĄTKU</p>
      {rows.map(([l, s, k]) => (
        <div key={l} style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center", padding: "9px 0", borderBottom: "1px solid var(--line)" }}>
          <span style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>{l}</span>
          <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 999, background: colors[k][0], color: colors[k][1], whiteSpace: "nowrap" }}>{s}</span>
        </div>
      ))}
      <p className="xsmall" style={{ margin: "10px 0 0", fontWeight: 600, color: "var(--warn)" }}>1 nakład do rozważenia (art. 45 KRO)</p>
    </div>
  );
}

export default function Page() {
  return (
    <ToolLanding tool={meta} hub={{ href: "/przed-decyzja", label: "Przed decyzją" }} preview={<Preview />}>
      <AssetsTool />
    </ToolLanding>
  );
}
