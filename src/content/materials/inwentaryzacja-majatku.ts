import type { Material } from "../types";

export const material: Material = {
  slug: "inwentaryzacja-majatku",
  format: "Arkusz",
  coverTitle: "Inwentaryzacja majątku i długów",
  coverSubtitle: "Arkusz do podziału majątku po rozstaniu",
  coverTone: "green",
  h1: "Inwentaryzacja majątku i długów przed podziałem: arkusz do wypełnienia",
  h2: "Spisz nieruchomości, oszczędności, pojazdy, firmę i kredyty. Oznacz, co jest wspólne, a co osobiste, i przygotuj się do rozmowy o podziale.",
  promise:
    "Arkusz, który pomoże Ci spisać wspólny majątek i długi, zanim zaczniecie rozmawiać o podziale.",
  forWho: [
    "Dla małżonków przed rozwodem, separacją lub podziałem majątku.",
    "Dla osób, które nie mają pełnego obrazu wspólnych finansów.",
    "Dla tych, którzy mieli majątek przed ślubem albo dostali darowiznę lub spadek.",
    "Dla par niebędących małżeństwem ze wspólnym mieszkaniem, autem lub kredytem.",
  ],
  inside: [
    "Jak odróżnić majątek wspólny od osobistego",
    "Oznaczenia: przed ślubem, w trakcie, darowizna, spadek",
    "Tabele: nieruchomości, ruchomości, pojazdy, konta, inwestycje, firma",
    "Tabela długów i kredytów",
    "Nakłady z majątku wspólnego i osobistego",
    "Pary niebędące małżeństwem: współwłasność",
    "Podsumowanie i wstępna propozycja podziału",
  ],
  time: "60–90 min",
  faq: [
    {
      q: "Po co spisywać majątek przed rozmową o podziale?",
      a: "Bo to część planu. Ze spisem wiesz, na czym stoisz, i nie zgadzasz się na nic pod presją. Potem łatwiej o ustalenia: w rozmowach, w mediacji lub u notariusza. Do sądu trafia tylko to, czego nie uda się ustalić.",
    },
    {
      q: "Co wchodzi do majątku wspólnego małżonków?",
      a: "Co do zasady to, co oboje lub jedno z Was nabyliście w trakcie wspólności, w tym wynagrodzenia. Majątek osobisty to m.in. rzeczy sprzed ślubu oraz darowizny i spadki, chyba że darczyńca lub spadkodawca postanowił inaczej.",
    },
    {
      q: "Czy majątek dzieli się zawsze po połowie?",
      a: "Zasadą są równe udziały. Z ważnych powodów sąd może ustalić udziały nierówne, biorąc pod uwagę, kto ile przyczynił się do majątku. Taką sytuację oceń z prawnikiem.",
    },
    {
      q: "Wyremontowałem/Wyremontowałam mieszkanie żony ze wspólnych pieniędzy. Czy to się liczy?",
      a: "To tzw. nakład. Przy podziale można żądać zwrotu nakładów z majątku wspólnego na osobisty i odwrotnie. Zachowaj dokumenty wydatków.",
    },
    {
      q: "Jak dzieli się PPK, IKE czy IKZE?",
      a: "Zależy od produktu, przepisów szczególnych i źródła wpłat. Wpisz je do arkusza i zapytaj prawnika oraz instytucję finansową.",
    },
    {
      q: "Nie mamy ślubu, ale wspólne mieszkanie. Jak to podzielić?",
      a: "Nie dotyczy Was wspólność majątkowa małżonków. Jeśli oboje jesteście współwłaścicielami, stosuje się przepisy o współwłasności i jej zniesieniu. Rozliczenia bywają złożone, skonsultuj je z prawnikiem.",
    },
  ],
  sources: [
    { label: "Kodeks rodzinny i opiekuńczy (art. 31, 33, 43, 45, 58 § 3)", url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19640090059", verified: "2026-11-10" },
    { label: "Kodeks cywilny (art. 195 i nast., art. 210, art. 366, art. 519)", url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19640160093", verified: "2026-11-10" },
    { label: "Kodeks postępowania cywilnego (art. 103, art. 183¹ i nast., art. 187 § 1 pkt 3)", url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19640430296", verified: "2026-11-16" },
    { label: "Elektroniczne Księgi Wieczyste: ekw.ms.gov.pl", url: "https://ekw.ms.gov.pl/", verified: "2026-11-10" },
  ],
  nextOffer: "plan-rozwodu",
  stage: 1,
  ctaLabel: "Przygotuj podział majątku w Planie Rozwodu",
  seo: {
    title: "Inwentaryzacja majątku przed rozwodem | Nowy Etap",
    description:
      "Arkusz do spisania majątku i długów przed rozwodem: wspólny czy osobisty, nakłady, kredyty, PPK, firma. Bezpłatnie, do wypełnienia online.",
  },
  coverPrompt:
    "Photorealistic 3D render of a standing A4 spiral-bound worksheet planner at a slight angle on a warm off-white (#FCF9F8) background with a soft natural shadow. The cover is deep green (#295550) with a dark green (#263D3A) frame and gold (#C79B59) typography and fine ruled-line details suggesting a ledger. Minimalist premium typography. Render this exact text, spelled exactly, and keep all text minimal: small wordmark at the top \"NOWY ETAP · PORADNIA ROZWODOWA\"; main title \"Inwentaryzacja majątku i długów\"; subtitle \"Arkusz do podziału majątku po rozstaniu\". A subtle thin gold staircase line motif (a stylised ascending step line) near the bottom. No gavels, no paragraph symbols, no people, no money bills, no house icons, no wedding rings, no other text. Square 1:1 composition, high detail, elegant studio lighting.",
  sections: [
    {
      heading: "Wspólne czy osobiste?",
      intro:
        "Rzetelny spis to podstawa każdej rozmowy o podziale. Chroni też przed niespodzianką w postaci nieznanego konta lub długu.",
      blocks: [
        {
          type: "path",
          current: 1,
          note: "Spis majątku i długów to część planu. Najpierw fakty, potem rozmowa o podziale, a sąd tylko w tym, czego nie ustalicie.",
        },
        {
          type: "p",
          text: "Bez intercyzy od ślubu obowiązuje wspólność ustawowa. Obejmuje to, co oboje lub jedno z Was nabyliście w jej trakcie, w tym wynagrodzenia. Wspólność ustaje m.in. z prawomocnym rozwodem lub separacją.",
        },
        {
          type: "table",
          head: ["Oznaczenie", "Co to znaczy", "Zwykle należy do"],
          rows: [
            ["PS: przed ślubem", "Nabyte przed powstaniem wspólności", "Majątku osobistego"],
            ["WT: w trakcie", "Nabyte w trakcie wspólności, np. z wynagrodzeń", "Majątku wspólnego"],
            ["D: darowizna", "Otrzymane w darowiźnie", "Majątku osobistego, chyba że darczyńca postanowił inaczej"],
            ["S: spadek", "Odziedziczone", "Majątku osobistego, chyba że spadkodawca postanowił inaczej"],
            ["Z: zamiana", "Kupione za środki z majątku osobistego", "Często majątku osobistego; trzeba to udokumentować"],
            ["?: nie wiem", "Pochodzenie środków niejasne lub mieszane", "Do wyjaśnienia z prawnikiem"],
          ],
          caption: "Oznaczenia używane w arkuszu",
        },
        {
          type: "callout",
          tone: "info",
          text: "Oznaczenia to Twoja robocza ocena, nie rozstrzygnięcie. Kwalifikacja bywa sporna, np. gdy do zakupu dołożyli się rodzice. Wnioski skonsultuj z prawnikiem.",
        },
      ],
    },
    {
      heading: "Nieruchomości i pojazdy",
      intro:
        "Każdą nieruchomość wpisz osobno. Numer księgi wieczystej jest w akcie notarialnym, a treść księgi sprawdzisz bezpłatnie na ekw.ms.gov.pl.",
      blocks: [
        {
          type: "table",
          head: ["Nieruchomość (adres / opis)", "Nr KW", "Właściciel wg KW", "Oznaczenie (PS/WT/D/S/Z/?)", "Szac. wartość", "Hipoteka / obciążenia"],
          rows: [
            ["", "", "", "", "", ""],
            ["", "", "", "", "", ""],
            ["", "", "", "", "", ""],
          ],
          caption: "Nieruchomości: mieszkania, domy, działki, garaże, spółdzielcze prawa do lokalu",
        },
        {
          type: "table",
          head: ["Pojazd (marka, model, rok)", "Na kogo zarejestrowany", "Oznaczenie", "Szac. wartość", "Leasing / kredyt?"],
          rows: [
            ["", "", "", "", ""],
            ["", "", "", "", ""],
          ],
          caption: "Pojazdy: samochody, motocykle, przyczepy, łodzie",
        },
        {
          type: "checklist",
          items: [
            "Sprawdziłem/Sprawdziłam treść księgi wieczystej każdej nieruchomości.",
            "Mam akt notarialny lub inny dokument nabycia.",
            "Wiem, z jakich środków kupiono nieruchomość (wspólne, osobiste, pomoc rodziny).",
            "Mam orientacyjną wartość rynkową (lub planuję wycenę przez rzeczoznawcę).",
          ],
        },
      ],
    },
    {
      heading: "Ruchomości, konta, oszczędności i inwestycje",
      intro:
        "Cenne rzeczy spisz pojedynczo, resztę zbiorczo. Przy kontach podaj saldo na dzień rozstania i aktualne.",
      blocks: [
        {
          type: "table",
          head: ["Przedmiot", "Kto używa", "Oznaczenie", "Szac. wartość", "Uwagi"],
          rows: [
            ["Meble i AGD", "", "", "", ""],
            ["Elektronika", "", "", "", ""],
            ["Biżuteria, zegarki, dzieła sztuki", "", "", "", ""],
            ["Sprzęt sportowy, narzędzia", "", "", "", ""],
            ["Inne", "", "", "", ""],
          ],
          caption: "Ruchomości",
        },
        {
          type: "table",
          head: ["Bank / instytucja", "Rodzaj (ROR, lokata, oszczędnościowe)", "Właściciel / współwłaściciel", "Saldo na dzień …", "Oznaczenie"],
          rows: [
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
          ],
          caption: "Konta i oszczędności",
        },
        {
          type: "table",
          head: ["Produkt", "Instytucja", "Na kogo", "Wartość na dzień …", "Uwagi"],
          rows: [
            ["Fundusze inwestycyjne", "", "", "", ""],
            ["Akcje, obligacje", "", "", "", ""],
            ["Kryptowaluty", "", "", "", ""],
            ["Polisy z częścią inwestycyjną", "", "", "", ""],
            ["PPK", "", "", "", ""],
            ["IKE", "", "", "", ""],
            ["IKZE", "", "", "", ""],
          ],
          caption: "Inwestycje i oszczędności emerytalne",
        },
        {
          type: "callout",
          tone: "warning",
          title: "PPK, IKE, IKZE i polisy",
          text: "Rozliczenie zależy od produktu i źródła wpłat. Nie zakładaj z góry, że to „tylko moje” albo „wspólne”. Zapytaj prawnika i instytucję finansową.",
        },
      ],
    },
    {
      heading: "Firma",
      intro:
        "Składniki firmy mogą wchodzić do majątku wspólnego. Spisz fakty, ocenę zostaw prawnikowi i księgowemu.",
      blocks: [
        {
          type: "worksheet",
          title: "Firma",
          fields: [
            "Forma prawna (JDG, spółka cywilna, spółka z o.o., inna) i kto jest właścicielem / wspólnikiem:",
            "Data założenia (przed ślubem / w trakcie małżeństwa):",
            "Udziały / akcje: liczba i szacowana wartość:",
            "Środki trwałe (sprzęt, pojazdy firmowe, lokal):",
            "Środki na rachunkach firmowych na dzień …:",
            "Zobowiązania firmy (kredyty, leasingi, zaległości):",
            "Czy w firmę inwestowano środki wspólne lub osobiste (jakie i kiedy):",
          ],
        },
      ],
    },
    {
      heading: "Długi i kredyty",
      intro:
        "Długi są tak samo ważne jak aktywa. Spisz wszystkie, także te, które „spłaca on/ona”.",
      blocks: [
        {
          type: "table",
          head: ["Zobowiązanie", "Wierzyciel", "Dłużnik / współdłużnicy", "Saldo na dzień …", "Rata miesięczna", "Kto obecnie spłaca"],
          rows: [
            ["Kredyt hipoteczny", "", "", "", "", ""],
            ["Kredyt gotówkowy / samochodowy", "", "", "", "", ""],
            ["Karty kredytowe, limity w koncie", "", "", "", "", ""],
            ["Pożyczki (także od rodziny)", "", "", "", "", ""],
            ["Leasing", "", "", "", "", ""],
            ["Zaległości (podatki, czynsz, inne)", "", "", "", "", ""],
          ],
          caption: "Długi i kredyty",
        },
        {
          type: "callout",
          tone: "warning",
          title: "Kredyt nie dzieli się razem z majątkiem",
          text: "Rozwód ani podział majątku nie zmieniają umowy kredytowej. Bank może żądać całego długu od każdego kredytobiorcy. Przejęcie kredytu przez jedną osobę wymaga zgody banku. Porozmawiaj z bankiem przed podziałem.",
        },
        {
          type: "checklist",
          items: [
            "Mam aktualne zaświadczenie o saldzie każdego kredytu.",
            "Wiem, kto jest kredytobiorcą, a kto np. poręczycielem.",
            "Zapisuję, kto i z jakich środków spłaca raty od dnia rozstania (zachowuję potwierdzenia przelewów).",
            "Zapytałem/Zapytałam bank o warunki przejęcia kredytu przez jedną osobę.",
          ],
        },
      ],
    },
    {
      heading: "Nakłady i rozliczenia",
      intro:
        "Przy podziale można żądać zwrotu nakładów z majątku wspólnego na osobisty i odwrotnie. Wyjątkiem są nakłady konieczne na rzeczy przynoszące dochód.",
      blocks: [
        {
          type: "table",
          head: ["Na co (np. remont, spłata kredytu)", "Z jakiego majątku (wspólny / osobisty czyj)", "Na jaki majątek", "Kwota / wartość", "Kiedy", "Dowody"],
          rows: [
            ["", "", "", "", "", ""],
            ["", "", "", "", "", ""],
            ["", "", "", "", "", ""],
          ],
          caption: "Nakłady do rozliczenia",
        },
        {
          type: "list",
          items: [
            "Przykład: ze wspólnych oszczędności wyremontowano odziedziczone mieszkanie jednego z Was. To może być nakład z majątku wspólnego na osobisty.",
            "Przykład: pieniądze ze sprzedaży mieszkania sprzed ślubu dołożono do wspólnego domu. To może być nakład z majątku osobistego na wspólny.",
          ],
        },
        {
          type: "callout",
          tone: "info",
          text: "Podział może być umowny (przy nieruchomościach u notariusza) albo sądowy: w wyroku rozwodowym, jeśli nie opóźni sprawy, lub w osobnym postępowaniu. Zacznij od próby porozumienia.",
        },
      ],
    },
    {
      heading: "Pary niebędące małżeństwem",
      intro:
        "Nie dotyczy Was wspólność majątkowa małżonków. Każde ma swój majątek, a to, co kupiliście razem, jest zwykle współwłasnością.",
      blocks: [
        {
          type: "list",
          items: [
            "Każdy współwłaściciel może żądać zniesienia współwłasności, umownie lub w sądzie.",
            "Udziały wynikają z dokumentów nabycia. Jeśli ich nie określono, przyjmuje się, że są równe.",
            "Rozliczenie wkładu w majątek partnera (np. remont jego mieszkania) bywa złożone. Skonsultuj je z prawnikiem.",
            "Wspólny kredyt działa jak u małżonków: odpowiadacie za cały dług, a zmiana dłużnika wymaga zgody banku.",
          ],
        },
      ],
    },
    {
      heading: "Podsumowanie",
      blocks: [
        {
          type: "worksheet",
          title: "Podsumowanie arkusza",
          fields: [
            "Łączna szacunkowa wartość majątku wspólnego / współwłasności:",
            "Łączna kwota długów wspólnych:",
            "Mój majątek osobisty (najważniejsze składniki):",
            "Nakłady do rozliczenia:",
            "Składniki sporne lub niejasne (oznaczone „?”):",
            "Moja wstępna propozycja podziału:",
            "Pytania do prawnika / banku / notariusza:",
          ],
        },
      ],
    },
    {
      heading: "Co dalej?",
      blocks: [
        {
          type: "p",
          text: "Wypełniony arkusz to baza do rozmowy o podziale. W Nowym Etapie pomożemy przełożyć go na propozycje w Planie Rozwodu: mieszkanie, kredyt, nakłady. Jeśli rozmowa utknie, rozważ mediację:",
        },
        { type: "mediationAttempt" },
        {
          type: "p",
          text: "Materiał jest informacyjny. Decyzje majątkowe skonsultuj z prawnikiem.",
        },
      ],
    },
  ],
};
