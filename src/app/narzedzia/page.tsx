import type { Metadata } from "next";
import Link from "next/link";
import { TOOLS } from "@/lib/tools";
import { MATERIALS } from "@/content/materials";
import { Icon } from "@/components/ui/Icon";
import { Cover3D } from "@/components/landing/Cover3D";
import { Alert } from "@/components/ui/Alert";
import { absoluteUrl, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Co jeśli się rozstaniemy? Bezpłatne narzędzia | Nowy Etap" },
  description: "Sprawdź, jakie sprawy warto uporządkować przed rozstaniem: mieszkanie i kredyt, budżet, opieka nad dzieckiem, koszty, separacja czy rozwód. 8 bezpłatnych narzędzi.",
  alternates: { canonical: absoluteUrl("/narzedzia") },
  openGraph: { title: "Co jeśli się rozstaniemy?", description: "8 bezpłatnych narzędzi, które pomagają uporządkować sprawy przed kolejnymi krokami.", url: absoluteUrl("/narzedzia"), images: [{ url: absoluteUrl("/og/narzedzia.png"), width: 1200, height: 630 }] },
};

export default function ToolsHub() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <div style={{ maxWidth: 760 }}>
            <span className="eyebrow">Centrum bezpłatnych narzędzi · Nowy Etap</span>
            <h1>Co jeśli się rozstaniemy?</h1>
            <p className="hero__sub">Sprawdź, jakie sprawy warto uporządkować — zanim podejmiesz kolejne kroki.</p>
            <ul className="hero__meta">
              <li><Icon name="check" /> 8 narzędzi z indywidualnym wynikiem</li>
              <li><Icon name="lock" /> Bez konta i bez podawania danych</li>
              <li><Icon name="download" /> Wynik do pobrania jako PDF</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 16 }} aria-labelledby="narzedzia-h">
        <div className="container">
          <h2 id="narzedzia-h" className="visually-hidden">Narzędzia</h2>
          <div className="grid grid--2 grid--4-wide" style={{ gap: 16 }}>
            {TOOLS.map((t) => (
              <Link key={t.slug} href={`/narzedzia/${t.slug}`} className="card card-link">
                <span className="icon-badge"><Icon name={t.icon} /></span>
                <h3 className="card__title">{t.cardTitle}</h3>
                <p className="small muted" style={{ marginBottom: 10 }}>{t.cardDesc}</p>
                <p className="xsmall" style={{ margin: 0 }}><strong>Otrzymasz:</strong> {t.outcome}</p>
                <span className="card-link__more">Otwórz narzędzie · {t.time} <Icon name="arrowRight" width={16} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--green">
        <div className="container">
          <div className="grid grid--2" style={{ alignItems: "center", gap: 32 }}>
            <div>
              <span className="eyebrow">Nasze podejście</span>
              <h2>{SITE.claim}</h2>
              <p>Wiele osób zaczyna od pytań o mieszkanie, pieniądze i dzieci — na długo przed rozmową z kancelarią. Te narzędzia pomagają uporządkować te pytania we własnym tempie. Jeśli zechcesz, pomożemy przygotować ustalenia przed pozwem.</p>
              <Link href="/plan-rozwodu" className="btn btn--gold">Poznaj bezpłatny Plan Rozwodu</Link>
            </div>
            <ul className="list-check" style={{ color: "#e3ebe9" }}>
              <li>Wynik liczony jest w Twojej przeglądarce — nie zapisujemy odpowiedzi.</li>
              <li>Nie pytamy o imiona dzieci ani dane, które nie są potrzebne.</li>
              <li>Nie podejmujemy decyzji za Ciebie i nie przewidujemy wyroków.</li>
              <li>Odezwiemy się tylko, jeśli sam(a) o to poprosisz.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section section--sand" aria-labelledby="materialy-h">
        <div className="container">
          <span className="eyebrow">Do pobrania</span>
          <h2 id="materialy-h">Bezpłatne przewodniki, checklisty i planery</h2>
          <p className="lead" style={{ maxWidth: 680 }}>Praktyczne materiały do przeczytania, wydrukowania i wypełnienia — od dokumentów do rozwodu po plan pierwszych świąt po rozstaniu.</p>
          <div className="grid grid--2 grid--4-wide" style={{ marginTop: 24 }}>
            {MATERIALS.map((m) => (
              <Link key={m.slug} href={`/materialy/${m.slug}`} className="card card-link" style={{ padding: 16 }}>
                <Cover3D m={m} size="sm" />
                <span className="tag tag--gold" style={{ alignSelf: "flex-start" }}>{m.format}</span>
                <h3 className="card__title" style={{ marginTop: 8, fontSize: "var(--fs-md)" }}>{m.coverTitle}</h3>
                <p className="xsmall muted" style={{ margin: 0 }}>{m.promise}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow">
          <Alert tone="info" title="Informacja">
            <p>Narzędzia i materiały Nowego Etapu mają charakter informacyjny i pomocniczy. Nie stanowią porady prawnej i nie zastępują indywidualnej konsultacji. Jeśli czujesz się zagrożony/zagrożona, zadzwoń pod numer <strong>112</strong> lub zobacz <Link href="/pomoc">gdzie szukać pilnej pomocy</Link>.</p>
          </Alert>
        </div>
      </section>
    </>
  );
}
