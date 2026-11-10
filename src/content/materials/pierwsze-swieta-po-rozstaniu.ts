import type { Material } from "../types";

export const material: Material = {
  slug: "pierwsze-swieta-po-rozstaniu",
  format: "Planer",
  coverTitle: "Pierwsze święta po rozstaniu",
  coverSubtitle: "Planer dla rodziców",
  coverTone: "gold",
  h1: "Pierwsze święta po rozstaniu — planer dla rodziców",
  h2: "Modele podziału świąt, arkusz ustaleń, logistyka, prezenty, emocje dzieci i plan na Sylwestra oraz ferie.",
  promise:
    "Ułożysz z drugim rodzicem spokojny plan świąt, w którym dziecko wie, gdzie i z kim będzie — a ty masz plan także dla siebie.",
  forWho: [
    "To wasze pierwsze Boże Narodzenie lub inne święta po rozstaniu.",
    "Nie wiecie jeszcze, jak podzielić Wigilię i dni świąteczne.",
    "Chcesz ograniczyć napięcie, wyjazdy na ostatnią chwilę i rywalizację prezentami.",
    "Obawiasz się samotności w dniach, gdy dziecko będzie u drugiego rodzica.",
  ],
  inside: [
    "Trzy modele podziału świąt z plusami i minusami.",
    "Arkusz do ustalenia planu z drugim rodzicem.",
    "Tabelę logistyki przejazdów i przekazań.",
    "Zasady koordynacji prezentów.",
    "Przewodnik po emocjach dzieci w różnym wieku.",
    "Plan dbania o siebie w dniach bez dziecka i propozycję na Sylwestra oraz ferie.",
    "Gotową wiadomość z propozycją planu i informację, co robić, gdy brak porozumienia.",
  ],
  time: "30 min",
  faq: [
    {
      q: "Kiedy zacząć rozmowę o świętach?",
      a: "Najlepiej kilka tygodni wcześniej — w listopadzie lub na początku grudnia. Im więcej czasu, tym mniej presji i tym łatwiej uwzględnić plany rodzin i wyjazdy.",
    },
    {
      q: "Czy dziecko powinno decydować, gdzie spędzi Wigilię?",
      a: "Warto wysłuchać zdania dziecka, szczególnie starszego, ale odpowiedzialność za decyzję powinna zostać po stronie rodziców. Wybór między rodzicami to dla dziecka duży ciężar.",
    },
    {
      q: "Co, jeśli mamy już ustalenia w wyroku lub ugodzie?",
      a: "Jeśli sąd lub ugoda określiły kontakty w święta, punktem wyjścia są te ustalenia. Możecie się wspólnie umówić inaczej, ale warto taką zmianę potwierdzić na piśmie. W razie wątpliwości zapytaj prawnika.",
    },
    {
      q: "Co zrobić, jeśli nie możemy się porozumieć?",
      a: "Możesz zaproponować mediację, która pozwala ustalić plan przy wsparciu neutralnej osoby. Jeśli porozumienie nie jest możliwe, o kontaktach z dzieckiem w razie sporu rozstrzyga sąd (art. 113 i nast. KRO). Na sprawę sądową przed świętami zwykle jest już za mało czasu, więc warto zacząć rozmowy wcześnie.",
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
      label: "Mediacje — gov.pl",
      url: "https://www.gov.pl/web/gov/rozwiaz-spor-przez-mediacje",
      verified: "2026-11-10",
    },
  ],
  nextOffer: "mediacja",
  ctaLabel: "Ustalcie plan świąt i kontaktów w mediacji",
  seo: {
    title: "Pierwsze święta po rozstaniu — planer | Nowy Etap",
    description:
      "Jak podzielić Wigilię i święta po rozstaniu? Modele planu, arkusz ustaleń, logistyka, prezenty, emocje dzieci i gotowa wiadomość do drugiego rodzica.",
  },
  coverPrompt:
    "Photorealistic 3D render of a standing spiral-bound planner at a slight angle on a warm off-white (#FCF9F8) background with a soft natural shadow. Cover in warm gold (#C79B59) tones with deep green (#295550) typography and a dark green (#263D3A) band. Minimalist premium typography. Small wordmark text at the top: \"NOWY ETAP · PORADNIA ROZWODOWA\". Exact cover title: \"Pierwsze święta po rozstaniu\". Exact subtitle: \"Planer dla rodziców\". Small label \"PLANER\". A subtle thin staircase line motif in dark green with a single tiny gold star at its top step, evoking a calm winter season. No gavels, no paragraph symbols, no people, no wedding rings, no Santa or cartoon decorations. Square 1:1 composition, high detail, keep text minimal and exactly as written.",
  sections: [
    {
      heading: "Zanim zaczniecie: trzy pytania",
      intro:
        "Pierwsze święta po rozstaniu rzadko są „takie jak zawsze”. Nie muszą być idealne — wystarczy, że będą przewidywalne i spokojne dla dziecka.",
      blocks: [
        {
          type: "worksheet",
          title: "Moje punkty wyjścia",
          fields: [
            "Co jest dla mojego dziecka w świętach najważniejsze (osoby, tradycje, miejsca)?",
            "Co jest najważniejsze dla mnie — i z czego mogę w tym roku zrezygnować?",
            "Czy mamy już jakieś ustalenia (wyrok, ugoda, porozumienie) dotyczące świąt?",
            "Jakie są plany dalszej rodziny (dziadkowie, wyjazdy), o których wiem?",
          ],
        },
        {
          type: "callout",
          tone: "info",
          title: "Zasada nadrzędna",
          text: "Plan świąt ma służyć dziecku, nie wyrównywaniu rachunków między dorosłymi. Jeśli w danym punkcie nie możecie się zgodzić, zapytajcie siebie: co będzie łatwiejsze dla dziecka?",
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
              "W tym roku Wigilia i święta u jednego rodzica, w przyszłym u drugiego.",
              "Mniej przejazdów, spokojne święta w jednym miejscu.",
              "Rodzic „bez świąt” w danym roku potrzebuje dobrego planu dla siebie i zastępczego terminu.",
            ],
            [
              "Podział dni",
              "Np. Wigilia u jednego rodzica, pierwszy dzień świąt u drugiego, drugi dzień według ustaleń. Co roku zamiana.",
              "Dziecko co roku spędza czas z obojgiem rodziców.",
              "Więcej przekazań i podróży; trzeba ustalić dokładne godziny.",
            ],
            [
              "Podwójne święta",
              "Każdy rodzic organizuje „swoje” święta w innym terminie, np. Wigilia 24 grudnia u jednego, druga kolacja świąteczna 26 lub 27 grudnia u drugiego.",
              "Dziecko ma pełne święta w obu domach.",
              "Może być męczące dla dziecka; dobrze sprawdza się, gdy domy są blisko.",
            ],
          ],
          caption: "Żaden model nie jest „właściwy” — liczy się to, co działa dla waszej rodziny.",
        },
        {
          type: "p",
          text: "Niektórzy rodzice przy niskim poziomie konfliktu decydują się na wspólną Wigilię lub wspólne wręczenie prezentów. To może być dobre rozwiązanie, ale tylko wtedy, gdy oboje czujecie się z tym komfortowo i nie ma ryzyka kłótni przy dziecku. Nie musicie tego robić.",
        },
      ],
    },
    {
      heading: "Arkusz ustaleń i logistyka",
      intro: "Wypełnij arkusz przed rozmową, a potem uzupełnijcie go wspólnie. Na koniec potwierdźcie ustalenia na piśmie.",
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
          caption: "Logistyka przejazdów i przekazań. Uwzględnij pogodę, korki i rozkład pociągów w okresie świątecznym.",
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
            "Ustalcie orientacyjny budżet lub zakres prezentów, żeby nie licytować się na hojność.",
            "Wymieńcie się listą życzeń dziecka i podzielcie, kto kupuje co — unikniecie dubli.",
            "Rozważcie jeden większy prezent „od obojga rodziców”, jeśli to dla was możliwe.",
            "Pomóż młodszemu dziecku przygotować drobny prezent lub laurkę dla drugiego rodzica.",
            "Poinformuj dziadków o ustaleniach, żeby nie było przykrych niespodzianek.",
            "Prezenty należą do dziecka — może je zabrać do drugiego domu.",
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
      intro:
        "Dzieci przeżywają pierwsze święta po rozstaniu różnie. Poniższa tabela to ogólne wskazówki — każde dziecko jest inne. Jeśli niepokój dziecka jest silny lub długotrwały, warto skonsultować się z psychologiem dziecięcym.",
      blocks: [
        {
          type: "table",
          head: ["Wiek", "Co może się pojawić", "Jak możesz pomóc"],
          rows: [
            ["0–3 lata", "Rozdrażnienie, trudności ze snem przy zmianie miejsca.", "Stały rytm dnia, znane rzeczy (kocyk, przytulanka), krótkie i spokojne przekazania."],
            ["4–6 lat", "Pytania „dlaczego tata/mama nie będzie z nami?”, myślenie magiczne, poczucie winy.", "Proste wyjaśnienia, zapewnienie, że oboje rodzice je kochają, plan pokazany na kalendarzu z obrazkami."],
            ["7–12 lat", "Smutek, tęsknota za dawnymi tradycjami, lojalność wobec obojga rodziców.", "Pozwolenie na tęsknotę, wspólne tworzenie nowych tradycji, brak pytań o to, jak było u drugiego rodzica."],
            ["13+ lat", "Wycofanie, złość, chęć spędzenia świąt z rówieśnikami, własne zdanie.", "Rozmowa i uwzględnienie zdania nastolatka, ale bez przerzucania na niego decyzji między rodzicami."],
          ],
        },
        {
          type: "callout",
          tone: "info",
          title: "Czego unikać przy dziecku",
          text: "Krytykowania drugiego rodzica, wypytywania o szczegóły świąt w drugim domu i pokazywania, że jest ci przykro, gdy dziecko dobrze się tam bawi. Dziecko ma prawo cieszyć się świętami w obu domach.",
        },
      ],
    },
    {
      heading: "Gdy jesteś sam: plan dla siebie",
      intro:
        "Dni świąteczne bez dziecka bywają najtrudniejszą częścią. Warto zaplanować je równie starannie jak czas z dzieckiem.",
      blocks: [
        {
          type: "checklist",
          items: [
            "Zaplanuj, z kim spędzisz Wigilię lub dzień świąt (rodzina, przyjaciele, inne osoby w podobnej sytuacji).",
            "Przygotuj coś, na co możesz czekać: spacer, film, wyjazd, wolontariat.",
            "Umów się na wideorozmowę z dzieckiem o stałej porze.",
            "Ogranicz media społecznościowe, jeśli porównania z „idealnymi” świętami cię przygnębiają.",
            "Daj sobie prawo do smutku — i do radości.",
            "Zapisz numer wsparcia: 116 123 (telefon dla dorosłych w kryzysie emocjonalnym).",
          ],
        },
        {
          type: "worksheet",
          title: "Mój plan na dni bez dziecka",
          fields: [
            "24 grudnia — co robię, z kim",
            "25 grudnia — co robię, z kim",
            "26 grudnia — co robię, z kim",
            "Do kogo mogę zadzwonić, gdy będzie trudno",
          ],
        },
      ],
    },
    {
      heading: "Sylwester, ferie i gotowa wiadomość",
      blocks: [
        {
          type: "p",
          text: "Ustalając święta, od razu zaplanujcie Sylwestra i ferie zimowe. Częstą praktyką jest „wyrównanie”: rodzic, który nie ma dziecka w Wigilię, spędza z nim Sylwestra lub większą część ferii. Termin ferii zależy od województwa — sprawdź aktualny kalendarz roku szkolnego.",
        },
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
              text: "Cześć, chciał(a)bym, żebyśmy spokojnie i z wyprzedzeniem ustalili święta, żeby [imię dziecka] wiedział, czego się spodziewać.",
            },
            {
              label: "Propozycja",
              text: "Proponuję: Wigilia u mnie do 20:00, potem przywożę go do ciebie; pierwszy i drugi dzień świąt u ciebie; Sylwester u mnie. W przyszłym roku zamieniamy się.",
            },
            {
              label: "Otwartość",
              text: "Jeśli masz inny pomysł albo plany rodzinne, o których powinienem wiedzieć, napisz — chętnie to uwzględnię.",
            },
            {
              label: "Termin",
              text: "Czy możesz odpowiedzieć do [data]? Potem potwierdzę ustalenia jednym mailem.",
            },
          ],
        },
        {
          type: "callout",
          tone: "warning",
          title: "Gdy nie ma porozumienia",
          text: "Zaproponuj mediację — to dobrowolna rozmowa z neutralnym mediatorem, która często pozwala szybciej ustalić plan niż spór. Jeśli porozumienie nie jest możliwe, o kontaktach z dzieckiem w razie sporu rozstrzyga sąd (art. 113 i nast. KRO). Jeśli w relacji występuje przemoc, nie negocjuj sam: w zagrożeniu dzwoń pod 112, wsparcie oferuje Niebieska Linia 800 120 002.",
        },
      ],
    },
    {
      heading: "Co dalej?",
      blocks: [
        {
          type: "p",
          text: "Plan na pierwsze święta to dobry moment, by pomyśleć o ustaleniach na dłużej: kalendarzu kontaktów, wakacjach, świętach w kolejnych latach i kosztach utrzymania dziecka.",
        },
        {
          type: "p",
          text: "Nowy Etap może pomóc wam ustalić to w mediacji albo przygotować Plan Rozwodu z porozumieniem dotyczącym dzieci, zanim trafi on do sądu. Najpierw plan i ustalenia — dopiero potem pozew. Spokojnych świąt — takich, na jakie was teraz stać.",
        },
      ],
    },
  ],
};
