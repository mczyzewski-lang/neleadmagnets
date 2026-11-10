import type { Metadata } from "next";
import { Sources } from "@/components/landing/Sources";
import { SRC } from "@/lib/sources";
import { SITE, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Zastrzeżenia i źródła",
  description: "Na jakich źródłach opierają się narzędzia Nowego Etapu i czego nie robią: nie są poradą prawną, nie przewidują wyroków, nie liczą alimentów.",
  alternates: { canonical: absoluteUrl("/zastrzezenia") },
};

export default function Disclaimer() {
  return (
    <article className="section">
      <div className="container container--narrow prose">
        <span className="eyebrow">Zasady</span>
        <h1 style={{ fontSize: "var(--fs-2xl)" }}>Zastrzeżenia i źródła</h1>
        <h2>Czym są nasze narzędzia</h2>
        <ul>
          <li>Narzędzia dostarczają informacji i materiałów pomocniczych. Nie są indywidualną poradą prawną, finansową ani psychologiczną.</li>
          <li>Wyniki są obliczane deterministycznie na podstawie Twoich odpowiedzi według jawnych reguł — nie są losowe ani generowane przez AI.</li>
          <li>Nie przewidujemy orzeczeń sądu, wysokości alimentów ani podziału majątku.</li>
          <li>Nie podejmujemy decyzji za Ciebie — o rozwodzie, separacji, opiece czy alimentach decydujesz Ty (a w razie sporu — sąd).</li>
          <li>Prawo zagraniczne było jedynie inspiracją dla projektowania doświadczenia użytkownika. Wszystkie treści prawne dotyczą prawa polskiego.</li>
        </ul>
        <h2>Aktualność</h2>
        <p>Stan prawny zweryfikowano na dzień {new Date(SITE.legalReviewDate).toLocaleDateString("pl-PL")}. Przepisy się zmieniają; projekty ustaw (np. dotyczące rozwodów przed kierownikiem USC czy opieki naprzemiennej) nie są uwzględniane jako obowiązujące prawo, dopóki nie wejdą w życie.</p>
        {!SITE.legalApproved && <p><strong>Wersja testowa:</strong> treści prawne oczekują na akceptację polskiego prawnika rodzinnego.</p>}
        <h2>Najważniejsze źródła</h2>
        <Sources items={Object.values(SRC)} />
      </div>
    </article>
  );
}
