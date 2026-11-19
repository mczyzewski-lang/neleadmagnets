import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/landing/ContactForm";
import { Icon } from "@/components/ui/Icon";
import { Alert } from "@/components/ui/Alert";
import { Faq } from "@/components/landing/Faq";
import { absoluteUrl, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Bezpłatny Plan Rozwodu: najpierw ustalenia, potem pozew",
  description: "Odbierz bezpłatny Plan Rozwodu: lista spraw do ustalenia przed pozwem (dzieci, mieszkanie, finanse) i informacja o koszcie pomocy Nowego Etapu.",
  alternates: { canonical: absoluteUrl("/plan-rozwodu") },
};

const faq = [
  { q: "Czym jest Plan Rozwodu?", a: "To lista spraw do ustalenia przed pozwem (dzieci, mieszkanie, kredyt, finanse) z proponowaną kolejnością działań i opisem możliwej współpracy z Nowym Etapem." },
  { q: "Czy Plan Rozwodu jest naprawdę bezpłatny?", a: "Tak. Odbierając go, nie zobowiązujesz się do skorzystania z płatnych usług." },
  { q: "Jak sprawdzić koszt pomocy?", a: "Zaznacz w formularzu „Informacja o koszcie pomocy”. Koszt zależy od zakresu spraw, dlatego podamy go po krótkim poznaniu Twoich potrzeb." },
  { q: "Czy musimy zgłosić się razem?", a: "Nie. Możesz zgłosić się sam(a). Jeśli oboje chcecie przygotować ustalenia wspólnie, zapytaj o ścieżkę DUO." },
  { q: "Co, jeśli w relacji jest przemoc?", a: "Wtedy wspólne rozmowy czy mediacja mogą nie być bezpieczne. Wybierz indywidualną rozmowę. W sytuacji zagrożenia dzwoń pod 112 lub do Niebieskiej Linii: 800 120 002." },
];

export default function PlanPage() {
  return (
    <>
      <section className="hero">
        <div className="container hero__grid">
          <div>
            <span className="eyebrow">{SITE.claim}</span>
            <h1>Odbierz bezpłatny Plan Rozwodu</h1>
            <p className="hero__sub">Zanim złożysz pozew, uporządkuj to, co najważniejsze: dzieci, mieszkanie, finanse. Sprawdź też, ile kosztowałaby pomoc Nowego Etapu w Twojej sytuacji.</p>
            <ul className="list-check">
              <li>Lista spraw do ustalenia, dopasowana do Twojej sytuacji</li>
              <li>Proponowana kolejność działań przed pozwem</li>
              <li>Możliwe drogi: rozmowy, mediacja, pozew</li>
              <li>Przejrzysta informacja o koszcie pomocy, bez zobowiązań</li>
            </ul>
          </div>
          <div id="kontakt" style={{ scrollMarginTop: 80 }}>
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid--3">
            <div className="card" id="mediacja" style={{ scrollMarginTop: 80 }}>
              <span className="icon-badge"><Icon name="handshake" /></span>
              <h2 className="card__title">Mediacja</h2>
              <p className="small">Mediacja to dobrowolne spotkania z bezstronnym mediatorem. Zwykle zaczyna się od zaproszenia do mediacji. Ustalenia może potem zatwierdzić sąd. Nie nadaje się m.in. przy przemocy lub poważnej nierównowadze sił.</p>
              <Link href="/narzedzia/przed-pozwem" className="btn btn--ghost btn--sm">Sprawdź, co można ustalić przed pozwem</Link>
            </div>
            <div className="card" id="duo" style={{ scrollMarginTop: 80 }}>
              <span className="icon-badge"><Icon name="user" /></span>
              <h2 className="card__title">DUO: razem</h2>
              <p className="small">Ścieżka dla par, które chcą wspólnie i spokojnie przygotować ustalenia dotyczące dzieci, mieszkania i finansów, zanim trafią do sądu.</p>
            </div>
            <div className="card">
              <span className="icon-badge"><Icon name="shield" /></span>
              <h2 className="card__title">Indywidualnie</h2>
              <p className="small">Jeśli wspólne rozmowy nie są możliwe lub bezpieczne, możesz porozmawiać z nami indywidualnie o swojej sytuacji i dostępnych drogach.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--sand">
        <div className="container container--narrow">
          <h2>Pytania</h2>
          <Faq items={faq} />
          <div className="mt"><Alert tone="info"><p>Dane z formularza wykorzystujemy wyłącznie do odpowiedzi na Twoje zgłoszenie (oraz do wysyłki materiałów, jeśli to zaznaczysz). Szczegóły w <Link href="/polityka-prywatnosci">polityce prywatności</Link>.</p></Alert></div>
        </div>
      </section>
    </>
  );
}
