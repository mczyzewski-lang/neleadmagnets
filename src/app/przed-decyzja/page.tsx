import type { Metadata } from "next";
import Link from "next/link";
import { DECISION_TOOLS } from "@/lib/decisionTools";
import { Icon } from "@/components/ui/Icon";
import { Alert } from "@/components/ui/Alert";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Zanim podejmiesz decyzję o rozstaniu — bezpłatne narzędzia | Nowy Etap" },
  description: "10 bezpłatnych narzędzi na czas przed decyzją: koszt rozwodu, rozmowa o rozstaniu, majątek wspólny czy osobisty, wina czy bez winy, plan wsparcia i więcej.",
  alternates: { canonical: absoluteUrl("/przed-decyzja") },
  openGraph: { title: "Zanim podejmiesz decyzję", description: "10 bezpłatnych narzędzi, które pomagają uporządkować myśli i informacje przed decyzją o rozstaniu.", url: absoluteUrl("/przed-decyzja"), images: [{ url: absoluteUrl("/og/przed-decyzja.png"), width: 1200, height: 630 }] },
};

export default function DecisionHub() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <div style={{ maxWidth: 780 }}>
            <span className="eyebrow">Przed decyzją · Nowy Etap</span>
            <h1>Zanim podejmiesz decyzję</h1>
            <p className="hero__sub">Spokojnie sprawdź koszty, prawa i możliwe drogi. Uporządkuj myśli i przygotuj się do rozmów — we własnym tempie, bez presji i bez podawania danych.</p>
            <ul className="hero__meta">
              <li><Icon name="check" /> 10 narzędzi z indywidualnym wynikiem</li>
              <li><Icon name="shield" /> Nie podejmujemy decyzji za Ciebie</li>
              <li><Icon name="lock" /> Odpowiedzi nie są zapisywane</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 16 }} aria-labelledby="pd-h">
        <div className="container">
          <h2 id="pd-h" className="visually-hidden">Narzędzia przed decyzją</h2>
          <div className="grid grid--2 grid--4-wide">
            {DECISION_TOOLS.map((t) => (
              <Link key={t.slug} href={`/przed-decyzja/${t.slug}`} className="card card-link">
                <span className="icon-badge"><Icon name={t.icon} /></span>
                <h3 className="card__title">{t.cardTitle}</h3>
                <p className="small muted" style={{ marginBottom: 10 }}>{t.cardDesc}</p>
                <p className="xsmall" style={{ margin: 0 }}><strong>Otrzymasz:</strong> {t.outcome}</p>
                <span className="card-link__more">Otwórz · {t.time} <Icon name="arrowRight" width={16} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--sand">
        <div className="container container--narrow">
          <h2 style={{ fontSize: "var(--fs-xl)" }}>Gdy masz już więcej jasności</h2>
          <p>Jeśli decyzja zapadła lub jesteś blisko niej, zobacz narzędzia, które pomagają przygotować konkretne ustalenia: mieszkanie i kredyt, plan opieki nad dzieckiem, budżet i kolejne kroki przed pozwem.</p>
          <Link href="/narzedzia" className="btn">Zobacz narzędzia „Co jeśli się rozstaniemy?”</Link>
          <div className="mt">
            <Alert tone="safety"><p>Jeśli czujesz się zagrożony/zagrożona, zadzwoń pod <strong>112</strong>. Wsparcie dla osób doznających przemocy domowej: <strong>Niebieska Linia 800 120 002</strong>. Kryzys emocjonalny: <strong>116 123</strong>. <Link href="/pomoc">Więcej numerów pomocowych</Link>.</p></Alert>
          </div>
        </div>
      </section>
    </>
  );
}
