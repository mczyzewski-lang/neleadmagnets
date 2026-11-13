import Link from "next/link";
import { Cover3D } from "@/components/landing/Cover3D";
import { Faq } from "@/components/landing/Faq";
import { Sources } from "@/components/landing/Sources";
import { Icon } from "@/components/ui/Icon";
import { Alert } from "@/components/ui/Alert";
import { OFFERS } from "@/lib/offers";
import { SITE } from "@/lib/site";
import { TOOLS } from "@/lib/tools";
import type { Material } from "@/content/types";
import { ScoreBadge } from "./ScoreBadge";
import { MaterialPeek } from "./MaterialPeek";
import { Workbook } from "./Workbook";

/** Dopasowanie materiału do powiązanego narzędzia (cross-sell wartości, nie sprzedaży) */
const RELATED_TOOL: Record<string, string> = {
  "rozwod-krok-po-kroku": "przed-pozwem",
  "checklista-dokumentow": "pierwsze-30-dni",
  "jak-powiedziec-dzieciom": "plan-opieki-nad-dzieckiem",
  "przygotowanie-do-mediacji": "przed-pozwem",
  "inwentaryzacja-majatku": "mieszkanie-i-kredyt",
  "rozmowa-z-bankiem": "mieszkanie-i-kredyt",
  "bezpieczenstwo-cyfrowe-i-finansowe": "pierwsze-30-dni",
  "komunikacja-z-drugim-rodzicem": "plan-opieki-nad-dzieckiem",
  "pierwsze-swieta-po-rozstaniu": "plan-opieki-nad-dzieckiem",
  "przygotowanie-do-konsultacji": "konsekwencje-rozstania",
};

/** Widok landingu materiału z wersją online do wypełnienia (demo = ta sama strona + dymek reklam). */
export function MaterialLandingView({ m }: { m: Material; demo?: boolean }) {
  const offer = OFFERS[m.nextOffer];
  const tool = TOOLS.find((t) => t.slug === RELATED_TOOL[m.slug]);
  const jsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: m.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  return (
    <>
      <section className="hero">
        <div className="container hero__grid">
          <div>
            <nav aria-label="Ścieżka" className="small muted" style={{ marginBottom: 14 }}><Link href="/materialy">Materiały</Link> / <span>{m.format}</span></nav>
            <span className="eyebrow">Bezpłatny materiał · {m.format} · {m.time}</span>
            <h1>{m.h1}</h1>
            <p className="hero__sub">{m.h2}</p>
            <div className="btn-row">
              <a href="#wypelnij" className="btn btn--gold" id="hero-cta">Wypełnij online <Icon name="arrowRight" width={18} /></a>
              <a href="#podglad" className="btn btn--link">Zajrzyj do środka</a>
            </div>
            <div style={{ margin: "18px 0 4px" }}><ScoreBadge slug={m.slug} size="md" /></div>
            <ul className="hero__meta">
              <li><Icon name="check" /> Bezpłatnie</li>
              <li><Icon name="lock" /> Bez zakładania konta</li>
              <li><Icon name="checklist" /> Wypełniasz online, podsumowanie od razu</li>
            </ul>
          </div>
          <div><Cover3D m={m} /></div>
        </div>
      </section>

      <section className="section" id="podglad" style={{ scrollMarginTop: 72 }}>
        <div className="container">
          <div className="grid grid--2" style={{ gap: 40, alignItems: "center" }}>
            <div>
              <span className="eyebrow">Zajrzyj do środka</span>
              <h2>Tak wygląda {m.format.toLowerCase()} w użyciu</h2>
              <p className="muted">Poniżej fragment z przykładowymi wpisami — tak, jak mógłby go wypełnić ktoś w podobnej sytuacji. Ty uzupełnisz go po swojemu — online, tutaj na stronie.</p>
              <div className="btn-row">
                <a href="#wypelnij" className="btn">Wypełnij online</a>
              </div>
            </div>
            <MaterialPeek m={m} fillHref="#wypelnij" />
          </div>
        </div>
      </section>

      <section className="section section--sand" id="wypelnij" style={{ scrollMarginTop: 72 }}>
        <div className="container container--narrow">
          <span className="eyebrow">Wersja online</span>
          <h2>Wypełnij materiał tutaj — podsumowanie ułoży się samo</h2>
          <p className="muted">Odhaczaj punkty i wpisuj notatki. Na końcu dostaniesz podsumowanie: co już masz, co zostało do zrobienia i Twoje notatki Bez pobierania i drukowania — wszystko dzieje się tutaj.</p>
          <Workbook m={m} />
        </div>
      </section>


      <section className="section" style={{ paddingTop: 32 }}>
        <div className="container">
          <div className="grid grid--2" style={{ gap: 32, alignItems: "start" }}>
            <div>
              <h2 style={{ fontSize: "var(--fs-xl)" }}>Co znajdziesz w środku</h2>
              <ul className="list-check">{m.inside.map((i) => <li key={i}>{i}</li>)}</ul>
              <h2 style={{ fontSize: "var(--fs-xl)", marginTop: 32 }}>Dla kogo</h2>
              <ul className="list-dot">{m.forWho.map((i) => <li key={i}>{i}</li>)}</ul>
              <h2 style={{ fontSize: "var(--fs-xl)", marginTop: 32 }}>Spis treści</h2>
              <ol className="small" style={{ paddingLeft: 20 }}>{m.sections.map((s) => <li key={s.heading}>{s.heading}</li>)}</ol>
            </div>
            <div style={{ position: "sticky", top: 80 }}>
              {tool && (
                <Link href={`/narzedzia/${tool.slug}`} className="card card-link card--sand" style={{ padding: 16 }}>
                  <span className="xsmall muted" style={{ fontWeight: 600 }}>UZUPEŁNIJ NARZĘDZIEM</span>
                  <strong>{tool.cardTitle}</strong>
                  <span className="small muted">{tool.outcome}</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--sand">
        <div className="container container--narrow">
          <h2>Najczęstsze pytania</h2>
          <Faq items={m.faq} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid--2" style={{ gap: 32 }}>
            <div className="card card--green">
              <h2 style={{ fontSize: "var(--fs-xl)" }}>{offer.title}</h2>
              <p>{offer.description}</p>
              <Link className="btn btn--gold" href={offer.href}>{m.ctaLabel}</Link>
            </div>
            <div>
              <h2 style={{ fontSize: "var(--fs-xl)" }}>Źródła</h2>
              <Sources items={m.sources} />
              <Alert tone="info"><p>Materiał ma charakter informacyjny i nie stanowi porady prawnej. Stan prawny na {new Date(SITE.legalReviewDate).toLocaleDateString("pl-PL")}.</p></Alert>
            </div>
          </div>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
