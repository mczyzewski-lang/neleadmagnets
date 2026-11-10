import { ToolLanding } from "@/components/landing/ToolLanding";
import { PetitionTool } from "@/components/decision/PetitionTool";
import { meta } from "@/lib/decision/pozew-rozwodowy-checklista.meta";
import { metaFor } from "@/lib/toolMetadata";

export const metadata = metaFor(meta, "/przed-decyzja/pozew-rozwodowy-checklista");

function Preview() {
  const items: [string, boolean][] = [["Oznaczenie sądu i stron (PESEL)", true], ["Żądanie rozwodu bez orzekania o winie", true], ["Władza rodzicielska, kontakty, alimenty", false], ["Informacja o próbie mediacji", false], ["Odpis aktu małżeństwa, opłata 600 zł", false]];
  return (
    <div>
      <div style={{ border: "1.5px solid var(--green-700)", background: "var(--green-50)", borderRadius: 10, padding: 10, margin: "6px 0 10px", fontSize: 13 }}>
        <span className="xsmall muted" style={{ fontWeight: 600 }}>WŁAŚCIWY SĄD · ART. 41 KPC</span>
        <div style={{ fontWeight: 700, color: "var(--green-800)" }}>Sąd Okręgowy ostatniego wspólnego miejsca zamieszkania</div>
      </div>
      {items.map(([t, c]) => (
        <div key={t} className={`task ${c ? "task--done" : ""}`} style={{ padding: "7px 0" }}>
          <input type="checkbox" checked={c} readOnly tabIndex={-1} />
          <span className="task__text" style={{ fontSize: 13 }}>{t}</span>
        </div>
      ))}
      <span className="tag tag--gold" style={{ marginTop: 8 }}>2 / 21 sprawdzone</span>
    </div>
  );
}

export default function Page() {
  return (
    <ToolLanding tool={meta} hub={{ href: "/przed-decyzja", label: "Przed decyzją" }} preview={<Preview />}>
      <PetitionTool />
    </ToolLanding>
  );
}
