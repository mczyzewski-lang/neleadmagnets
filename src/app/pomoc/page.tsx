import type { Metadata } from "next";
import { Alert } from "@/components/ui/Alert";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gdy potrzebujesz pilnej pomocy",
  description: "Numery pomocowe: 112, Niebieska Linia 800 120 002, 116 123, 116 111. Gdzie szukać wsparcia, gdy czujesz się zagrożony/zagrożona.",
  alternates: { canonical: absoluteUrl("/pomoc") },
};

const lines = [
  { n: "112", t: "Numer alarmowy", d: "W sytuacji zagrożenia życia lub zdrowia. Bezpłatny, całodobowy." },
  { n: "800 120 002", t: "Niebieska Linia", d: "Ogólnopolski telefon dla osób doznających przemocy domowej. Bezpłatny." },
  { n: "116 123", t: "Kryzysowy telefon zaufania dla dorosłych", d: "Wsparcie w kryzysie emocjonalnym. Bezpłatny." },
  { n: "116 111", t: "Telefon zaufania dla dzieci i młodzieży", d: "Dla dzieci i nastolatków. Bezpłatny." },
  { n: "800 70 2222", t: "Centrum Wsparcia dla osób w stanie kryzysu psychicznego", d: "Bezpłatny." },
];

export default function Help() {
  return (
    <section className="section">
      <div className="container container--narrow">
        <span className="eyebrow">Bezpieczeństwo</span>
        <h1 style={{ fontSize: "var(--fs-2xl)" }}>Gdy potrzebujesz pilnej pomocy</h1>
        <p className="lead">Jeśli doświadczasz przemocy, gróźb lub boisz się o siebie albo o dzieci, najpierw zadbaj o bezpieczeństwo. Wspólne rozmowy czy mediacja z drugą stroną mogą wtedy nie być bezpieczne.</p>
        <div className="grid">
          {lines.map((l) => (
            <div key={l.n} className="card" style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <a href={`tel:${l.n.replace(/\s/g, "")}`} className="btn btn--gold" style={{ minWidth: 150 }}>{l.n}</a>
              <div><strong>{l.t}</strong><p className="small muted" style={{ margin: 0 }}>{l.d}</p></div>
            </div>
          ))}
        </div>
        <div className="mt">
          <Alert tone="info"><p>Godziny działania linii mogą się zmieniać. Sprawdź aktualne informacje u operatorów, np. <a href="https://www.niebieskalinia.info/" target="_blank" rel="noopener noreferrer">niebieskalinia.info</a>. Lista zweryfikowana: 10.11.2026.</p></Alert>
        </div>
        <h2 style={{ fontSize: "var(--fs-xl)", marginTop: 32 }}>Indywidualna pomoc prawna</h2>
        <p>Możesz skorzystać z porady adwokata lub radcy prawnego albo z nieodpłatnej pomocy prawnej w punktach prowadzonych przez powiaty (informacje: gov.pl, „Nieodpłatna pomoc prawna”). Pełnomocnik reprezentuje wyłącznie Twoje interesy.</p>
      </div>
    </section>
  );
}
