import type { MaterialBlock, MaterialSection } from "@/content/types";
import { Alert } from "@/components/ui/Alert";

function Block({ b }: { b: MaterialBlock }) {
  switch (b.type) {
    case "p":
      return <p>{b.text}</p>;
    case "list":
      return b.ordered ? <ol>{b.items.map((i) => <li key={i}>{i}</li>)}</ol> : <ul>{b.items.map((i) => <li key={i}>{i}</li>)}</ul>;
    case "checklist":
      return (
        <ul className="list-check" style={{ paddingLeft: 0 }}>
          {b.items.map((i) => <li key={i}>{i}</li>)}
        </ul>
      );
    case "callout":
      return (
        <div style={{ margin: "16px 0" }}>
          <Alert tone={b.tone === "warning" ? "warn" : b.tone === "safety" ? "safety" : "info"} title={b.title}>
            <p>{b.text}</p>
          </Alert>
        </div>
      );
    case "table":
      return (
        <div className="table-wrap" style={{ margin: "16px 0" }}>
          <table className="table">
            {b.caption && <caption className="visually-hidden">{b.caption}</caption>}
            <thead><tr>{b.head.map((h) => <th key={h} scope="col">{h}</th>)}</tr></thead>
            <tbody>{b.rows.map((r, i) => <tr key={i}>{r.map((c, j) => (j === 0 ? <th key={j} scope="row" style={{ fontWeight: 600 }}>{c}</th> : <td key={j}>{c}</td>))}</tr>)}</tbody>
          </table>
        </div>
      );
    case "worksheet":
      return (
        <div className="card card--sand" style={{ margin: "16px 0" }}>
          {b.title && <h4>{b.title}</h4>}
          {b.fields.map((f) => <div key={f} className="worksheet-line">{f}</div>)}
        </div>
      );
    case "script":
      return (
        <div style={{ margin: "16px 0" }}>
          {b.title && <h4>{b.title}</h4>}
          {b.lines.map((l, i) => (
            <div key={i} className="script">
              <span className="script__label">{l.label}</span>
              <p style={{ margin: "4px 0 0" }}>{l.text}</p>
            </div>
          ))}
        </div>
      );
  }
}

export function MaterialSections({ sections }: { sections: MaterialSection[] }) {
  return (
    <>
      {sections.map((s, i) => (
        <section key={s.heading} id={`r${i + 1}`} style={{ breakInside: "auto" }}>
          <h2>{s.heading}</h2>
          {s.intro && <p className="lead" style={{ fontSize: "var(--fs-md)" }}>{s.intro}</p>}
          {s.blocks.map((b, j) => <Block key={j} b={b} />)}
        </section>
      ))}
    </>
  );
}
