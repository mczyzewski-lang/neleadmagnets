import Link from "next/link";
import { QuickExit } from "./QuickExit";

export function Header() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/narzedzia" className="site-header__logo" aria-label="Nowy Etap — strona główna narzędzi">
          <img src="/brand/nowy-etap-logo-poradnia.png" alt="Nowy Etap — Poradnia rozwodowa" width={150} height={38} />
        </Link>
        <nav className="site-header__nav" aria-label="Główna">
          <Link href="/narzedzia">Narzędzia</Link>
          <Link href="/przed-decyzja">Przed decyzją</Link>
          <Link href="/materialy">Bezpłatne materiały</Link>
          <Link href="/plan-rozwodu">Plan Rozwodu</Link>
        </nav>
        <QuickExit />
      </div>
    </header>
  );
}
