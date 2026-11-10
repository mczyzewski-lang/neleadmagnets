import type { ReactNode } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Alert } from "@/components/ui/Alert";
import { SITE, absoluteUrl } from "@/lib/site";
import type { ToolMeta } from "@/lib/tools";
import { TOOLS } from "@/lib/tools";
import { Faq } from "./Faq";
import { Sources } from "./Sources";
import { StickyCta } from "./StickyCta";

/**
 * Wspólna struktura landingu narzędzia:
 * 1 Hero (z zapowiedzią prawdziwego wyniku) · 2 Jak to działa · 3–5 Narzędzie + wynik + kolejny krok
 * 6 FAQ · 7 Wiarygodność i źródła
 */
export type RelatedItem = { href: string; title: string; desc: string; icon: ToolMeta["icon"] };

export function ToolLanding({ tool, preview, children, extra, hub = { href: "/narzedzia", label: "Narzędzia" }, related: relatedProp }: {
  tool: ToolMeta; preview: ReactNode; children: ReactNode; extra?: ReactNode;
  /** Dział, do którego należy narzędzie (okruszki, canonical, wydruk) */
  hub?: { href: string; label: string };
  related?: RelatedItem[];
}) {
  const base = `${hub.href}/${tool.slug}`;
  const related: RelatedItem[] = relatedProp ?? TOOLS.filter((t) => t.slug !== tool.slug).slice(0, 3).map((t) => ({ href: `/narzedzia/${t.slug}`, title: t.cardTitle, desc: t.cardDesc, icon: t.icon }));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tool.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: hub.label, item: absoluteUrl(hub.href) },
      { "@type": "ListItem", position: 2, name: tool.cardTitle, item: absoluteUrl(base) },
    ],
  };
  return (
    <>
      <section className="hero landing-only">
        <div className="container hero__grid">
          <div>
            <nav aria-label="Ścieżka" className="small muted" style={{ marginBottom: 14 }}>
              <Link href={hub.href}>{hub.label}</Link> <span aria-hidden="true">/</span> <span>{tool.short}</span>
            </nav>
            <span className="eyebrow">Bezpłatne narzędzie · {tool.time}</span>
            <h1>{tool.h1}</h1>
            <p className="hero__sub">{tool.h2}</p>
            <div className="btn-row">
              <a href="#narzedzie" className="btn btn--gold" id="hero-cta">Rozpocznij <Icon name="arrowRight" width={18} /></a>
              <a href="#jak-to-dziala" className="btn btn--link">Jak to działa?</a>
            </div>
            <ul className="hero__meta">
              <li><Icon name="check" /> Bezpłatnie, bez zakładania konta</li>
              <li><Icon name="lock" /> Bez podawania danych kontaktowych</li>
              <li><Icon name="doc" /> Wynik do pobrania</li>
            </ul>
          </div>
          <div aria-label="Przykład wyniku" role="img" className="preview-wrap">
            <div className="preview" aria-hidden="true">
              <span className="preview__badge">Przykładowy wynik</span>
              {preview}
            </div>
            <p className="xsmall muted center" style={{ marginTop: 10 }}>Otrzymujesz: {tool.outcome}</p>
          </div>
        </div>
      </section>

      <section className="section--tight landing-only" id="jak-to-dziala" style={{ paddingTop: 40, paddingBottom: 8 }}>
        <div className="container">
          <h2 className="visually-hidden">Jak to działa?</h2>
          <ol className="steps3">
            <li><h3>Odpowiedz na kilka pytań</h3><p>{tool.how[0]}</p></li>
            <li><h3>Zobacz indywidualny wynik</h3><p>{tool.how[1]}</p></li>
            <li><h3>Zapisz lub pobierz podsumowanie</h3><p>{tool.how[2]}</p></li>
          </ol>
        </div>
      </section>

      <section className="section" id="narzedzie" style={{ scrollMarginTop: 70 }}>
        <div className="container container--narrow">
          <h2 className="visually-hidden">Narzędzie</h2>
          {children}
          <p className="print-only xsmall" style={{ marginTop: 16 }}>
            {SITE.name} — {SITE.tagline}. Wygenerowano na {SITE.url.replace("https://", "")}{base}. Materiał informacyjny, nie stanowi porady prawnej.
          </p>
        </div>
      </section>

      {extra}

      <section className="section section--sand landing-only">
        <div className="container container--narrow">
          <span className="eyebrow">Pytania i odpowiedzi</span>
          <h2>Najczęstsze pytania</h2>
          <Faq items={tool.faq} />
        </div>
      </section>

      <section className="section landing-only">
        <div className="container">
          <div className="grid grid--2" style={{ alignItems: "start", gap: 32 }}>
            <div>
              <img src="/brand/nowy-etap-logo-poradnia.png" alt="Nowy Etap — Poradnia rozwodowa" width={180} height={45} style={{ height: 34, width: "auto", marginBottom: 16 }} />
              <h2 style={{ fontSize: "var(--fs-xl)" }}>Kto przygotował to narzędzie?</h2>
              <p>Nowy Etap pomaga w przygotowaniu rozwodu, mediacjach i wypracowywaniu ustaleń przedsądowych. Wierzymy, że najpierw warto mieć plan i ustalenia — dopiero potem pozew.</p>
              <Alert tone="info">
                <p>Narzędzie dostarcza informacji i materiałów pomocniczych. <strong>Nie jest indywidualną poradą prawną</strong> i nie podejmuje decyzji za Ciebie. Wyniki opierają się wyłącznie na Twoich odpowiedziach.</p>
              </Alert>
              {!SITE.legalApproved && (
                <p className="xsmall muted" style={{ marginTop: 12 }}>Wersja testowa — treści prawne w trakcie weryfikacji przez prawnika.</p>
              )}
            </div>
            <div>
              <h2 style={{ fontSize: "var(--fs-xl)" }}>Źródła informacji prawnych</h2>
              <Sources items={tool.sources} />
              <p className="xsmall muted">Stan prawny na dzień: {new Date(SITE.legalReviewDate).toLocaleDateString("pl-PL")}. Prawo zagraniczne nie jest podstawą żadnych wyliczeń.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--sand landing-only">
        <div className="container">
          <h2 style={{ fontSize: "var(--fs-xl)" }}>Inne bezpłatne narzędzia</h2>
          <div className="grid grid--3" style={{ marginTop: 16 }}>
            {related.map((t) => (
              <Link key={t.href} href={t.href} className="card card-link">
                <span className="icon-badge"><Icon name={t.icon} /></span>
                <h3 className="card__title">{t.title}</h3>
                <p className="small muted" style={{ margin: 0 }}>{t.desc}</p>
                <span className="card-link__more">Otwórz <Icon name="arrowRight" width={16} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <StickyCta />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
    </>
  );
}
