import type { Material } from "../types";

export const material: Material = {
  slug: "pierwsze-swieta-po-rozstaniu",
  format: "Planer",
  coverTitle: "Pierwsze święta po rozstaniu",
  coverSubtitle: "Planer dla rodziców",
  coverTone: "gold",
  h1: "Pierwsze święta po rozstaniu: planer dla rodziców",
  h2: "Modele podziału świąt, arkusz ustaleń, logistyka, prezenty, emocje dzieci, Sylwester i ferie.",
  promise:
    "Ułożysz z drugim rodzicem spokojny plan świąt: dziecko wie, gdzie i z kim będzie, a ty masz plan także dla siebie.",
  forWho: [
    "To wasze pierwsze święta po rozstaniu.",
    "Nie wiecie jeszcze, jak podzielić Wigilię i dni świąteczne.",
    "Chcesz uniknąć napięcia, zmian na ostatnią chwilę i rywalizacji prezentami.",
    "Obawiasz się samotności w dniach bez dziecka.",
  ],
  inside: [
    "Trzy modele podziału świąt z plusami i minusami.",
    "Arkusz planu do ustalenia z drugim rodzicem.",
    "Tabelę przejazdów i przekazań.",
    "Zasady koordynacji prezentów.",
    "Emocje dzieci w różnym wieku.",
    "Plan na dni bez dziecka, Sylwestra i ferie.",
    "Gotową wiadomość z propozycją planu i co robić, gdy brak porozumienia.",
  ],
  time: "20 min",
  faq: [
    {
      q: "Dlaczego najpierw moje punkty wyjścia, potem rozmowa, a sąd na końcu?",
      a: "Gdy wiesz, co jest ważne, rozmawiasz spokojniej. A na sprawę sądową przed świętami zwykle jest za mało czasu.",
    },
    {
      q: "Kiedy zacząć rozmowę o świętach?",
      a: "W listopadzie lub na początku grudnia. Im wcześniej, tym mniej presji.",
    },
    {
      q: "Czy dziecko powinno decydować, gdzie spędzi Wigilię?",
      a: "Wysłuchaj jego zdania, ale decyzję podejmują rodzice. Wybór między rodzicami to dla dziecka duży ciężar.",
    },
    {
      q: "Co, jeśli mamy już ustalenia w wyroku lub ugodzie?",
      a: "To one są punktem wyjścia. Zmianę potwierdźcie na piśmie, a w razie wątpliwości zapytaj prawnika.",
    },
    {
      q: "Co zrobić, jeśli nie możemy się porozumieć?",
      a: "Zaproś drugiego rodzica do mediacji. Jeśli porozumienie jest niemożliwe, o kontaktach rozstrzyga sąd.",
    },
    {
      q: "Czy warto proponować mediację, jeśli drugi rodzic pewnie odmówi?",
      a: "Często tak. Udokumentowana próba pokazuje twoją gotowość do porozumienia, ale nie gwarantuje wyniku. Przy przemocy nie musisz jej proponować.",
    },
  ],
  sources: [
    {
      label: "Kodeks rodzinny i opiekuńczy, art. 113 i nast. (kontakty z dzieckiem)",
      url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19640090059",
      verified: "2026-11-10",
    },
    {
      label: "Kodeks postępowania cywilnego, art. 183¹ i nast. (mediacja)",
      url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19640430296",
      verified: "2026-11-10",
    },
    {
      label: "Kodeks postępowania cywilnego — art. 103, art. 187 § 1 pkt 3",
      url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19640430296",
      verified: "2026-11-16",
    },
    {
      label: "Mediacje — gov.pl",
      url: "https://www.gov.pl/web/gov/rozwiaz-spor-przez-mediacje",
      verified: "2026-11-10",
    },
  ],
  nextOffer: "mediacja",
  stage: 2,
  ctaLabel: "Ustalcie plan świąt i kontaktów w mediacji",
  seo: {
    title: "Pierwsze święta po rozstaniu: planer | Nowy Etap",
    description:
      "Jak podzielić Wigilię i święta po rozstaniu? Modele planu, arkusz ustaleń, logistyka, prezenty, emocje dzieci i gotowa wiadomość do drugiego rodzica.",
  },
  coverPrompt:
    "Photorealistic 3D render of a standing spiral-bound planner at a slight angle on a warm off-white (#FCF9F8) background with a soft natural shadow. Cover in warm gold (#C79B59) tones with deep green (#295550) typography and a dark green (#263D3A) band. Minimalist premium typography. Small wordmark text at the top: \"NOWY ETAP · PORADNIA ROZWODOWA\". Exact cover title: \"Pierwsze święta po rozstaniu\". Exact subtitle: \"Planer dla rodziców\". Small label \"PLANER\". A subtle thin staircase line motif in dark green with a single tiny gold star at its top step, evoking a calm winter season. No gavels, no paragraph symbols, no people, no wedding rings, no Santa or cartoon decorations. Square 1:1 composition, high detail, keep text minimal and exactly as written.",
  sections: [
    {
      heading: "Zanim zaczniecie: punkty wyjścia",
      intro: "Święta nie muszą być idealne. Mają być przewidywalne dla dziecka.",
      blocks: [
        {
          type: "path",
          current: 2,
          note: "Planer służy ustaleniom z drugim rodzicem. Zaczynasz od tego, co ważne dla dziecka i dla ciebie.",
        },
        {
          type: "worksheet",
          title: "Moje punkty wyjścia",
          fields: [
            "Co jest dla mojego dziecka w świętach najważniejsze (osoby, tradycje, miejsca)?",
            "Co jest najważniejsze dla mnie i z czego mogę w tym roku zrezygnować?",
            "Czy mamy już jakieś ustalenia (wyrok, ugoda, porozumienie) dotyczące świąt?",
            "Jakie są plany dalszej rodziny (dziadkowie, wyjazdy), o których wiem?",
          ],
        },
        {
          type: "callout",
          tone: "info",
          title: "Zasada nadrzędna",
          text: "Gdy się nie zgadzacie, zapytajcie: co będzie łatwiejsze dla dziecka?",
        },
      ],
    },
    {
      heading: "Trzy modele podziału świąt",
      blocks: [
        {
          type: "table",
          head: ["Model", "Jak wygląda", "Plusy", "Na co uważać"],
          rows: [
            [
              "Naprzemiennie co rok",
              "W tym roku święta u jednego rodzica, w przyszłym u drugiego.",
              "Mniej przejazdów, święta w jednym miejscu.",
              "Rodzic „bez świąt” potrzebuje planu dla siebie.",
            ],
            [
              "Podział dni",
              "Np. Wigilia u jednego, pierwszy dzień świąt u drugiego. Co roku zamiana.",
              "Dziecko co roku jest z obojgiem rodziców.",
              "Więcej przekazań; trzeba ustalić dokładne godziny.",
            ],
            [
              "Podwójne święta",
              "Wigilia 24 grudnia u jednego, świąteczna kolacja 26 lub 27 grudnia u drugiego.",
              "Pełne święta w obu domach.",
              "Może męczyć dziecko; sprawdza się, gdy domy są blisko.",
            ],
          ],
          caption: "Liczy się to, co działa dla waszej rodziny.",
        },
        {
          type: "p",
          text: "Przy niskim konflikcie możecie spędzić Wigilię razem, jeśli oboje tego chcecie i nie grozi kłótnia. Nie musicie.",
        },
      ],
    },
    {
      heading: "Arkusz ustaleń i logistyka",
      intro: "Wypełnij arkusz przed rozmową, uzupełnijcie go razem i potwierdźcie na piśmie.",
      blocks: [
        {
          type: "worksheet",
          title: "Nasz plan świąt",
          fields: [
            "Wybrany model (naprzemiennie / podział dni / podwójne święta)",
            "23 grudnia: gdzie jest dziecko, od której godziny",
            "Wigilia 24 grudnia: u kogo, godziny",
            "Pierwszy dzień świąt 25 grudnia: u kogo, godziny",
            "Drugi dzień świąt 26 grudnia: u kogo, godziny",
            "Kontakt telefoniczny lub wideo z drugim rodzicem: kiedy",
            "Spotkania z dziadkami i dalszą rodziną",
            "Jak będzie w przyszłym roku (zamiana?)",
          ],
        },
        {
          type: "table",
          head: ["Data i godzina", "Skąd → dokąd", "Kto przywozi / odbiera", "Co zabrać", "Uwagi"],
          rows: [
            ["[24.12, 10:00]", "[dom A → dom B]", "[rodzic A]", "[ubrania, leki, ulubiona przytulanka]", "[kontakt w razie opóźnienia]"],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
          ],
          caption: "Przejazdy i przekazania.",
        },
        {
          type: "checklist",
          items: [
            "Ustalcie dokładne godziny i miejsca przekazania.",
            "Zaplanujcie bufor czasowy na drogę.",
            "Spakujcie dziecku rzeczy ważne dla niego, nie tylko praktyczne.",
            "Ustalcie, kto zabiera prezenty od dalszej rodziny.",
            "Potwierdźcie plan na piśmie (SMS lub e-mail) na co najmniej tydzień przed świętami.",
          ],
        },
      ],
    },
    {
      heading: "Prezenty bez rywalizacji",
      blocks: [
        {
          type: "list",
          items: [
            "Ustalcie budżet, żeby nie licytować się na hojność.",
            "Rozważcie jeden większy prezent „od obojga”.",
            "Pomóż młodszemu dziecku zrobić laurkę dla drugiego rodzica.",
            "Prezenty należą do dziecka i może je zabrać do drugiego domu.",
          ],
        },
        {
          type: "worksheet",
          title: "Koordynacja prezentów",
          fields: [
            "Lista życzeń dziecka",
            "Kupuje rodzic A",
            "Kupuje rodzic B",
            "Wspólny prezent (jeśli jest) i podział kosztów",
            "Ustalenia z dziadkami",
          ],
        },
      ],
    },
    {
      heading: "Emocje dziecka w zależności od wieku",
      intro: "Każde dziecko jest inne. Przy silnym lub długim niepokoju skonsultuj się z psychologiem dziecięcym.",
      blocks: [
        {
          type: "table",
          head: ["Wiek", "Co może się pojawić", "Jak możesz pomóc"],
          rows: [
            ["0–3 lata", "Rozdrażnienie, kłopoty ze snem.", "Stały rytm, znane rzeczy, krótkie przekazania."],
            ["4–6 lat", "Pytania „dlaczego”, poczucie winy.", "Proste wyjaśnienia, plan na kalendarzu z obrazkami."],
            ["7–12 lat", "Smutek, tęsknota, rozdarcie lojalności.", "Zgoda na tęsknotę, nowe tradycje."],
            ["13+ lat", "Wycofanie, złość, własne plany.", "Uwzględnij jego zdanie, ale nie przerzucaj decyzji."],
          ],
        },
        {
          type: "callout",
          tone: "info",
          title: "Czego unikać przy dziecku",
          text: "Krytykowania drugiego rodzica i wypytywania o drugi dom. Dziecko ma prawo cieszyć się świętami w obu domach.",
        },
      ],
    },
    {
      heading: "Gdy jesteś sam: plan dla siebie",
      intro: "Dni bez dziecka bywają najtrudniejsze. Zaplanuj je równie starannie.",
      blocks: [
        {
          type: "checklist",
          items: [
            "Zaplanuj, z kim spędzisz Wigilię lub dzień świąt (rodzina, przyjaciele, inne osoby w podobnej sytuacji).",
            "Przygotuj coś, na co możesz czekać: spacer, film, wyjazd, wolontariat.",
            "Umów się na wideorozmowę z dzieckiem o stałej porze.",
            "Ogranicz media społecznościowe, jeśli porównania cię przygnębiają.",
            "Daj sobie prawo do smutku i do radości.",
            "Zapisz numer wsparcia: 116 123 (telefon dla dorosłych w kryzysie emocjonalnym).",
          ],
        },
        {
          type: "worksheet",
          title: "Mój plan na dni bez dziecka",
          fields: [
            "24 grudnia: co robię, z kim",
            "25 grudnia: co robię, z kim",
            "26 grudnia: co robię, z kim",
            "Do kogo mogę zadzwonić, gdy będzie trudno",
          ],
        },
      ],
    },
    {
      heading: "Sylwester, ferie i gotowa wiadomość",
      intro: "Rodzic bez dziecka w Wigilię często ma je w Sylwestra lub dłużej w ferie.",
      blocks: [
        {
          type: "worksheet",
          title: "Sylwester i ferie",
          fields: [
            "Sylwester / Nowy Rok: u kogo dziecko, godziny",
            "Termin ferii w naszym województwie",
            "Podział ferii (daty)",
            "Wyjazdy w ferie: kto, dokąd, kontakt",
          ],
        },
        {
          type: "script",
          title: "Wiadomość z propozycją planu",
          lines: [
            {
              label: "Wstęp",
              text: "Cześć, chciał(a)bym z wyprzedzeniem ustalić święta, żeby [imię dziecka] wiedział, czego się spodziewać.",
            },
            {
              label: "Propozycja",
              text: "Proponuję: Wigilia u mnie do 20:00, potem przywożę go do ciebie; pierwszy i drugi dzień świąt u ciebie; Sylwester u mnie. W przyszłym roku zamiana.",
            },
            {
              label: "Otwartość",
              text: "Jeśli masz inny pomysł albo plany rodzinne, napisz. Chętnie to uwzględnię.",
            },
            {
              label: "Termin",
              text: "Odpowiesz do [data]? Potem potwierdzę ustalenia jednym mailem.",
            },
          ],
        },
        {
          type: "callout",
          tone: "warning",
          title: "Gdy nie ma porozumienia",
          text: "Zaproś drugiego rodzica do mediacji na piśmie. Przy przemocy nie negocjuj sam: w zagrożeniu 112, Niebieska Linia 800 120 002.",
        },
      ],
    },
    {
      heading: "Co dalej?",
      blocks: [
        {
          type: "p",
          text: "Ustalenia na dłużej (kontakty, wakacje, koszty) możecie spisać jako porozumienie rodzicielskie. Sąd może je uwzględnić w wyroku.",
        },
        { type: "mediationAttempt" },
        {
          type: "p",
          text: "Nowy Etap może pomóc w mediacji albo w Planie Rozwodu. Spokojnych świąt.",
        },
      ],
    },
  ],
};
