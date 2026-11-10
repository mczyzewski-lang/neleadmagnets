import { ToolLanding } from "@/components/landing/ToolLanding";
import { First30Tool } from "@/components/tools/First30Tool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/toolMetadata";

const SLUG = "pierwsze-30-dni";
export const metadata = toolMetadata(SLUG);

function Preview() {
  const rows: [string, string, boolean][] = [
    ["1–7", "Zbierz najważniejsze dokumenty", true],
    ["1–7", "Zmień hasła i włącz weryfikację dwuetapową", true],
    ["8–14", "Spisz wspólne konta i zobowiązania", false],
    ["8–14", "Plan tygodnia dzieci: szkoła, zajęcia, odbiory", false],
    ["15–21", "Sprawdź, czy mediacja byłaby dla Was odpowiednia", false],
  ];
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "6px 0 8px" }}>
        <p className="xsmall muted" style={{ margin: 0, fontWeight: 600 }}>TWÓJ PLAN · 24 KROKI</p>
        <span className="tag tag--ok">2/24 wykonane</span>
      </div>
      <div className="progress" style={{ marginBottom: 10 }}><div className="progress__bar" style={{ width: "9%" }} /></div>
      {rows.map(([d, t, c]) => (
        <div key={t} className={`task ${c ? "task--done" : ""}`} style={{ padding: "8px 0" }}>
          <input type="checkbox" checked={c} readOnly tabIndex={-1} />
          <div><span className="task__text" style={{ fontSize: 14 }}>{t}</span><span className="task__meta">Dni {d}</span></div>
        </div>
      ))}
    </div>
  );
}

export default function Page() {
  return (
    <ToolLanding tool={getTool(SLUG)} preview={<Preview />}>
      <First30Tool />
    </ToolLanding>
  );
}
