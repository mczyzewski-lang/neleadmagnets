import type { Material } from "../types";

export const material: Material = {
  slug: "inwentaryzacja-majatku",
  format: "Arkusz",
  coverTitle: "Inwentaryzacja majątku i długów",
  coverSubtitle: "Arkusz do podziału majątku po rozstaniu",
  coverTone: "green",
  h1: "Inwentaryzacja majątku i długów przed podziałem — arkusz do wypełnienia",
  h2: "Spisz nieruchomości, oszczędności, pojazdy, firmę i kredyty. Oznacz, co jest wspólne, a co osobiste — i przygotuj się do rozmowy o podziale.",
  promise:
    "Kompletny arkusz, który pomoże Ci spisać wspólny majątek i długi — zanim zaczniecie rozmawiać o podziale.",
  forWho: [
    "Dla małżonków przed rozwodem, separacją lub podziałem majątku.",
    "Dla osób, które nie mają pełnego obrazu wspólnych finansów i chcą go uporządkować.",
    "Dla tych, którzy mieli majątek przed ślubem albo otrzymali darowiznę lub spadek.",
    "Dla par niebędących małżeństwem, które mają wspólne mieszkanie, samochód lub kredyt.",
  ],
  inside: [
    "Jak odróżnić majątek wspólny od osobistego (art. 31 i 33 KRO)",
    "System oznaczeń: przed ślubem / w trakcie / darowizna / spadek",
    "Tabele: nieruchomości, ruchomości, pojazdy, konta, inwestycje, PPK/IKE/IKZE, firma",
    "Tabela długów i kredytów — z uwagą o odpowiedzialności wobec banku",
    "Nakłady z majątku wspólnego i osobistego (art. 45 KRO)",
    "Pary niebędące małżeństwem — współwłasność według Kodeksu cywilnego",
  ],
  time: "60–90 min",
  faq: [
    {
      q: "Co wchodzi do majątku wspólnego małżonków?",
      a: "Co do zasady przedmioty majątkowe nabyte w czasie trwania wspólności ustawowej przez oboje lub jedno z małżonków, m.in. pobrane wynagrodzenia i dochody z majątku (art. 31 KRO). Majątkiem osobistym są m.in. rzeczy nabyte przed ślubem oraz otrzymane w darowiźnie lub spadku, chyba że darczyńca lub spadkodawca postanowił inaczej (art. 33 KRO).",
    },
    {
      q: "Czy majątek dzieli się zawsze po połowie?",
      a: "Zasadą są równe udziały w majątku wspólnym. Z ważnych powodów każdy z małżonków może żądać, by sąd ustalił udziały nierówne, z uwzględnieniem stopnia, w jakim każde z nich przyczyniło się do powstania majątku (art. 43 KRO). Ocena takiej sytuacji wymaga konsultacji z prawnikiem.",
    },
    {
      q: "Wyremontowałem/Wyremontowałam mieszkanie żony ze wspólnych pieniędzy. Czy to się liczy?",
      a: "Takie sytuacje to tzw. nakłady. Przy podziale majątku każdy z małżonków może żądać zwrotu wydatków i nakładów poczynionych z majątku wspólnego na majątek osobisty i odwrotnie (art. 45 KRO). Warto zachować dokumenty potwierdzające wydatki.",
    },
    {
      q: "Jak dzieli się PPK, IKE czy IKZE?",
      a: "Zasady zależą od rodzaju produktu i przepisów szczególnych, a także od tego, kiedy i z jakich środków dokonywano wpłat. Wpisz te produkty do arkusza i skonsultuj sposób ich rozliczenia z prawnikiem oraz instytucją finansową.",
    },
    {
      q: "Nie mamy ślubu, ale wspólne mieszkanie. Jak to podzielić?",
      a: "Do par niebędących małżeństwem nie stosuje się przepisów KRO o wspólności majątkowej. Jeśli oboje jesteście współwłaścicielami, zastosowanie mają przepisy Kodeksu cywilnego o współwłasności i jej zniesieniu (art. 195 i nast., art. 210 KC). Rozliczenia mogą być złożone — warto skonsultować je z prawnikiem.",
    },
  ],
  sources: [
    { label: "Kodeks rodzinny i opiekuńczy (art. 31, 33, 43, 45, 58 § 3)", url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19640090059", verified: "2026-11-10" },
    { label: "Kodeks cywilny (art. 195 i nast., art. 210, art. 366, art. 519)", url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19640160093", verified: "2026-11-10" },
    { label: "Elektroniczne Księgi Wieczyste — ekw.ms.gov.pl", url: "https://ekw.ms.gov.pl/", verified: "2026-11-10" },
  ],
  nextOffer: "plan-rozwodu",
  ctaLabel: "Przygotuj podział majątku w Planie Rozwodu",
  seo: {
    title: "Inwentaryzacja majątku przed rozwodem | Nowy Etap",
    description:
      "Arkusz do spisania majątku i długów przed rozwodem: wspólny czy osobisty, nakłady, kredyty, PPK, firma. Bezpłatny PDF do wypełnienia.",
  },
  coverPrompt:
    "Photorealistic 3D render of a standing A4 spiral-bound worksheet planner at a slight angle on a warm off-white (#FCF9F8) background with a soft natural shadow. The cover is deep green (#295550) with a dark green (#263D3A) frame and gold (#C79B59) typography and fine ruled-line details suggesting a ledger. Minimalist premium typography. Render this exact text, spelled exactly, and keep all text minimal: small wordmark at the top \"NOWY ETAP · PORADNIA ROZWODOWA\"; main title \"Inwentaryzacja majątku i długów\"; subtitle \"Arkusz do podziału majątku po rozstaniu\". A subtle thin gold staircase line motif (a stylised ascending step line) near the bottom. No gavels, no paragraph symbols, no people, no money bills, no house icons, no wedding rings, no other text. Square 1:1 composition, high detail, elegant studio lighting.",
  sections: [
    {
      heading: "Zanim zaczniesz: wspólne czy osobiste?",
      intro:
        "Rzetelny spis majątku to podstawa każdej rozmowy o podziale — w mediacji, u notariusza czy w sądzie. Pomaga też uniknąć sytuacji, w której o jakimś koncie lub długu dowiadujesz się na końcu.",
      blocks: [
        {
          type: "p",
          text: "Jeśli małżonkowie nie zawarli umowy majątkowej (intercyzy), z chwilą zawarcia małżeństwa powstaje między nimi wspólność ustawowa. Obejmuje ona przedmioty nabyte w czasie jej trwania przez oboje lub jedno z małżonków — m.in. pobrane wynagrodzenia i dochody z majątku wspólnego i osobistego (art. 31 KRO). Wspólność ustaje m.in. z uprawomocnieniem się wyroku rozwodowego lub orzeczeniem separacji.",
        },
        {
          type: "table",
          head: ["Oznaczenie", "Co to znaczy", "Zwykle należy do"],
          rows: [
            ["PS — przed ślubem", "Nabyte przed powstaniem wspólności", "Majątku osobistego (art. 33 KRO)"],
            ["WT — w trakcie", "Nabyte w czasie trwania wspólności, np. z wynagrodzeń", "Majątku wspólnego (art. 31 KRO)"],
            ["D — darowizna", "Otrzymane w darowiźnie", "Majątku osobistego, chyba że darczyńca postanowił inaczej (art. 33 KRO)"],
            ["S — spadek", "Nabyte w drodze dziedziczenia lub zapisu", "Majątku osobistego, chyba że spadkodawca postanowił inaczej (art. 33 KRO)"],
            ["Z — zamiana", "Kupione za pieniądze lub w zamian za składnik majątku osobistego", "Często majątku osobistego (art. 33 KRO) — wymaga udokumentowania"],
            ["? — nie wiem", "Pochodzenie środków jest niejasne lub mieszane", "Do wyjaśnienia z prawnikiem"],
          ],
          caption: "System oznaczeń używany w arkuszu",
        },
        {
          type: "callout",
          tone: "info",
          title: "Pamiętaj",
          text: "Oznaczenia w arkuszu to Twoja robocza ocena, nie rozstrzygnięcie. Kwalifikacja składnika majątku bywa sporna (np. gdy do zakupu dołożyły się obie strony lub rodzice). Arkusz ma charakter informacyjny — ostateczne wnioski skonsultuj z prawnikiem.",
        },
      ],
    },
    {
      heading: "Nieruchomości i pojazdy",
      intro:
        "Wpisz każdą nieruchomość osobno. Numer księgi wieczystej znajdziesz w akcie notarialnym, a jej treść sprawdzisz bezpłatnie w serwisie ekw.ms.gov.pl.",
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
            "Sprawdziłem/Sprawdziłam/am treść księgi wieczystej każdej nieruchomości.",
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
        "Ruchomości o większej wartości warto spisać pojedynczo, a resztę zbiorczo (np. „wyposażenie kuchni”). Przy kontach wpisz saldo na konkretny dzień — najlepiej na dzień rozstania i aktualne.",
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
          text: "Zasady rozliczania tych produktów przy podziale majątku zależą od rodzaju produktu, przepisów szczególnych i źródła wpłat. Nie zakładaj automatycznie, że „to tylko moje” albo „to wspólne”. Wpisz je do arkusza i skonsultuj z prawnikiem oraz instytucją finansową.",
        },
      ],
    },
    {
      heading: "Firma i działalność gospodarcza",
      intro:
        "Jeśli któreś z Was prowadzi firmę, jej składniki mogą wchodzić do majątku wspólnego. To jeden z najbardziej złożonych obszarów — spisz fakty, a ocenę zostaw na rozmowę z prawnikiem i księgowym.",
      blocks: [
        {
          type: "worksheet",
          title: "Firma",
          fields: [
            "Forma prawna (JDG, spółka cywilna, spółka z o.o., inna) i kto jest właścicielem / wspólnikiem:",
            "Data założenia (przed ślubem / w trakcie małżeństwa):",
            "Udziały / akcje — liczba i szacowana wartość:",
            "Środki trwałe (sprzęt, pojazdy firmowe, lokal):",
            "Środki na rachunkach firmowych na dzień …:",
            "Zobowiązania firmy (kredyty, leasingi, zaległości):",
            "Czy w firmę inwestowano środki wspólne lub osobiste — jakie i kiedy:",
          ],
        },
      ],
    },
    {
      heading: "Długi i kredyty",
      intro:
        "Długi są równie ważne jak aktywa. Spisz wszystkie — także te, które „spłaca on/ona”.",
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
          text: "Rozwód ani podział majątku nie zmieniają umowy kredytowej. Współkredytobiorcy nadal odpowiadają wobec banku solidarnie — bank może żądać całości lub części długu od każdego z nich (art. 366 KC). Przejęcie długu przez jedną osobę wymaga zgody banku (art. 519 KC). Zaplanuj rozmowę z bankiem przed ostatecznym podziałem.",
        },
        {
          type: "checklist",
          items: [
            "Mam aktualne zaświadczenie o saldzie każdego kredytu.",
            "Wiem, kto jest kredytobiorcą, a kto np. poręczycielem.",
            "Zapisuję, kto i z jakich środków spłaca raty od dnia rozstania (zachowuję potwierdzenia przelewów).",
            "Zapytałem/Zapytałam/am bank o warunki przejęcia kredytu przez jedną osobę.",
          ],
        },
      ],
    },
    {
      heading: "Nakłady i rozliczenia",
      intro:
        "Przy podziale majątku każdy z małżonków może żądać zwrotu wydatków i nakładów, które poczynił z majątku wspólnego na majątek osobisty — i odwrotnie (art. 45 KRO). Nie zwraca się wydatków i nakładów koniecznych na przedmioty przynoszące dochód.",
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
            "Przykład: ze wspólnych oszczędności sfinansowano remont mieszkania, które jedno z małżonków odziedziczyło — to może być nakład z majątku wspólnego na majątek osobisty.",
            "Przykład: pieniądze ze sprzedaży mieszkania kupionego przed ślubem dołożono do zakupu wspólnego domu — to może być nakład z majątku osobistego na wspólny.",
            "Zasadą są równe udziały w majątku wspólnym; ustalenie nierównych udziałów jest możliwe z ważnych powodów (art. 43 KRO).",
          ],
        },
        {
          type: "callout",
          tone: "info",
          text: "Podział majątku może nastąpić w wyroku rozwodowym (na wniosek, jeśli nie spowoduje nadmiernej zwłoki — art. 58 § 3 KRO), w osobnym postępowaniu sądowym albo umownie. Przy nieruchomościach umowa wymaga formy aktu notarialnego.",
        },
      ],
    },
    {
      heading: "Pary niebędące małżeństwem",
      intro:
        "Jeśli nie jesteście małżeństwem, przepisy KRO o wspólności majątkowej Was nie dotyczą. Każde z Was ma swój majątek, a to, co kupiliście razem, jest zwykle współwłasnością.",
      blocks: [
        {
          type: "list",
          items: [
            "Współwłasność i jej zniesienie regulują przepisy Kodeksu cywilnego (art. 195 i nast. KC). Każdy ze współwłaścicieli może żądać zniesienia współwłasności (art. 210 KC) — umownie lub przed sądem.",
            "Udziały wynikają z dokumentów nabycia (np. aktu notarialnego). Jeśli nie są określone, domniemywa się, że są równe.",
            "Rozliczenia wkładów jednej osoby w majątek drugiej (np. remont mieszkania partnera) mogą być złożone i zależą od okoliczności — skonsultuj je z prawnikiem.",
            "Wspólny kredyt działa tak samo jak u małżonków: wobec banku odpowiadacie solidarnie, a zmiana dłużnika wymaga zgody banku.",
          ],
        },
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
          text: "Wypełniony arkusz to solidna baza do rozmowy o podziale — z drugą stroną, z mediatorem lub z prawnikiem. Jeśli chcesz, w Nowym Etapie pomożemy Ci przełożyć go na konkretne propozycje w Planie Rozwodu: kto zostaje w mieszkaniu, co z kredytem, jak rozliczyć nakłady — zanim złożysz pozew.",
        },
        {
          type: "p",
          text: "Możesz też wypełniać arkusz stopniowo i wrócić do nas, kiedy będziesz gotowy. Pamiętaj, że to materiał informacyjny — ostateczne decyzje majątkowe skonsultuj z prawnikiem.",
        },
      ],
    },
  ],
};
