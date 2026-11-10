import type { Metadata } from "next";
import Link from "next/link";
import { TOOLS } from "@/lib/tools";
import { DECISION_TOOLS } from "@/lib/decisionTools";
import { MATERIALS } from "@/content/materials";

export const metadata: Metadata = { title: "Strony demo z propozycjami reklam", robots: { index: false, follow: false } };

function Row({ href, title, kind }: { href: string; title: string; kind: string }) {
  return (
    <tr>
      <th scope="row" style={{ fontWeight: 600 }}>{title}</th>
      <td><span className="tag">{kind}</span></td>
      <td><Link href={href}>{href}</Link></td>
      <td><Link className="btn btn--sm" href={`${href}/demo`}>Demo + reklamy</Link></td>
    </tr>
  );
}

export default function DemoIndex() {
  return (
    <section className="section">
      <div className="container">
        <span className="eyebrow">Wewnętrzne · nieindeksowane</span>
        <h1 style={{ fontSize: "var(--fs-2xl)" }}>Strony demo z propozycjami reklam</h1>
        <p className="lead">Każdy landing ma wersję <code>/demo</code> z dymkiem: propozycje treści Meta, Google Demand Gen i Google Search (z limitami znaków, podglądem i linkami UTM).</p>
        <div className="table-wrap">
          <table className="table">
            <thead><tr><th>Lead magnet</th><th>Typ</th><th>Landing</th><th>Demo</th></tr></thead>
            <tbody>
              {DECISION_TOOLS.map((t) => <Row key={t.slug} href={`/przed-decyzja/${t.slug}`} title={t.cardTitle} kind="Przed decyzją · nowe" />)}
              {TOOLS.map((t) => <Row key={t.slug} href={`/narzedzia/${t.slug}`} title={t.cardTitle} kind="Narzędzie" />)}
              {MATERIALS.map((m) => <Row key={m.slug} href={`/materialy/${m.slug}`} title={m.coverTitle} kind={m.format} />)}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
