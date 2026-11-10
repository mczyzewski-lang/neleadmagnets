import Link from "next/link";
import { SITE } from "@/lib/site";
import { TOOLS } from "@/lib/tools";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__cols">
          <div>
            <img src="/brand/nowy-etap-logo-poradnia-white.png" alt="Nowy Etap — Poradnia rozwodowa" width={150} height={38} />
            <p>{SITE.claim}</p>
            <p className="small">Nowy Etap pomaga w przygotowaniu rozwodu, mediacjach i wypracowywaniu ustaleń przedsądowych.</p>
          </div>
          <div>
            <h2>Narzędzia</h2>
            <ul>
              {TOOLS.map((t) => (
                <li key={t.slug}><Link href={`/narzedzia/${t.slug}`}>{t.short}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Informacje</h2>
            <ul>
              <li><Link href="/materialy">Bezpłatne materiały</Link></li>
              <li><Link href="/plan-rozwodu">Plan Rozwodu</Link></li>
              <li><Link href="/polityka-prywatnosci">Polityka prywatności i cookies</Link></li>
              <li><Link href="/zastrzezenia">Zastrzeżenia i źródła</Link></li>
              <li><Link href="/pomoc">Gdy potrzebujesz pilnej pomocy</Link></li>
            </ul>
          </div>
        </div>
        <div className="site-footer__legal">
          <p>Narzędzia i materiały mają charakter informacyjny i pomocniczy. Nie stanowią porady prawnej ani nie zastępują indywidualnej konsultacji. Stan prawny weryfikowany: {new Date(SITE.legalReviewDate).toLocaleDateString("pl-PL")}.</p>
          <p>W sytuacji zagrożenia życia lub zdrowia dzwoń pod numer alarmowy <strong>112</strong>.</p>
          <p>© {new Date().getFullYear()} Nowy Etap</p>
        </div>
      </div>
    </footer>
  );
}
