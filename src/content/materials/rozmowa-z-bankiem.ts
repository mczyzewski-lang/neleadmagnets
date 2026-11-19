import type { Material } from "../types";

export const material: Material = {
  slug: "rozmowa-z-bankiem",
  format: "Skrypt rozmowy",
  coverTitle: "Kredyt po rozstaniu",
  coverSubtitle: "Jak przygotować rozmowę z bankiem",
  coverTone: "dark",
  h1: "Kredyt po rozstaniu: jak przygotować rozmowę z bankiem",
  h2: "Skrypt rozmowy, lista dokumentów, pytania i arkusz liczb. Idziesz do banku z planem.",
  promise:
    "Przygotujesz rozmowę z bankiem o wspólnym kredycie: wiesz, o co zapytać, co zabrać i czego nie robić.",
  forWho: [
    "Masz wspólny kredyt hipoteczny z osobą, z którą się rozstajesz.",
    "Zastanawiasz się, czy jedno z was może zostać w mieszkaniu i przejąć kredyt.",
    "Chcesz poznać opcje w banku, zanim zaczniecie ustalać podział majątku.",
    "Chcesz mieć gotowe sformułowania na rozmowę z doradcą.",
  ],
  inside: [
    "Dlaczego rozwód nie zmienia umowy kredytu.",
    "Opcje, o które możesz zapytać bank, z plusami i minusami.",
    "Arkusz liczb: saldo, rata, okres, oprocentowanie, wartość mieszkania, LTV.",
    "Listę dokumentów, o które bank może poprosić.",
    "Skrypt telefonu i spotkania z doradcą.",
    "Pytania do doradcy, notatkę z rozmowy i arkusz opcji do uzgodnienia z drugim kredytobiorcą.",
    "Ostrzeżenie przed wstrzymaniem spłat.",
  ],
  time: "20 min",
  faq: [
    {
      q: "Czy po rozwodzie bank automatycznie wykreśli mnie z kredytu?",
      a: "Nie. Ani rozwód, ani wyrok czy umowa o podział majątku nie zmieniają umowy kredytu. Dopóki bank nie zgodzi się na zmianę, oboje odpowiadacie za cały dług.",
    },
    {
      q: "Czy bank musi się zgodzić na zwolnienie jednego z nas?",
      a: "Nie. Zwykle ocenia zdolność kredytową osoby, która zostaje z kredytem.",
    },
    {
      q: "Co jeśli nie stać mnie na połowę raty po wyprowadzce?",
      a: "Nie przestawaj płacić bez rozmowy. Skontaktuj się z bankiem jak najwcześniej. Zaległości mogą trafić do BIK i skończyć się wypowiedzeniem umowy.",
    },
    {
      q: "Dlaczego najpierw bank, potem ustalenia, a pozew na końcu?",
      a: "Bo bank nie jest związany waszymi ustaleniami. Znając jego stanowisko, uzgodnicie realne rozwiązanie, a sąd rozstrzygnie tylko resztę.",
    },
    {
      q: "Co, jeśli drugi kredytobiorca nie chce rozmawiać o kredycie?",
      a: "Zaproponuj rozmowę na piśmie, a potem mediację: zaproszenie możesz wysłać sam albo przez wybranego mediatora. Udokumentowana próba pokazuje twoją dobrą wolę, ale nie gwarantuje wyniku. Przy przemocy lub kontroli finansowej nie musisz proponować mediacji.",
    },
    {
      q: "Czy ten materiał zastępuje poradę prawną lub finansową?",
      a: "Nie. To materiał informacyjny. Decyzje skonsultuj z prawnikiem lub doradcą.",
    },
  ],
  sources: [
    {
      label: "Kodeks cywilny, art. 366 (zobowiązania solidarne) i art. 519 (przejęcie długu)",
      url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19640160093",
      verified: "2026-11-10",
    },
    {
      label: "Kodeks rodzinny i opiekuńczy",
      url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19640090059",
      verified: "2026-11-10",
    },
    {
      label: "Kodeks postępowania cywilnego: art. 103, art. 183¹ i nast. (mediacja), art. 187 § 1 pkt 3",
      url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19640430296",
      verified: "2026-11-16",
    },
    {
      label: "Mediacje: gov.pl",
      url: "https://www.gov.pl/web/gov/rozwiaz-spor-przez-mediacje",
      verified: "2026-11-10",
    },
  ],
  nextOffer: "plan-rozwodu",
  stage: 1,
  ctaLabel: "Ułóż plan podziału majątku i kredytu przed pozwem",
  seo: {
    title: "Kredyt po rozstaniu: rozmowa z bankiem | Nowy Etap",
    description:
      "Wspólny kredyt hipoteczny a rozwód. Skrypt rozmowy z bankiem, lista dokumentów, pytania i arkusz liczb. Bezpłatnie, do wypełnienia online.",
  },
  coverPrompt:
    "Photorealistic 3D render of a standing hardcover booklet at a slight angle on a warm off-white (#FCF9F8) background with a soft natural shadow. The cover is dark green (#263D3A) with deep green (#295550) panel and fine gold (#C79B59) accents. Minimalist premium typography. Small wordmark text at the top: \"NOWY ETAP · PORADNIA ROZWODOWA\". Exact cover title: \"Kredyt po rozstaniu\". Exact subtitle: \"Jak przygotować rozmowę z bankiem\". Small label \"SKRYPT ROZMOWY\". A subtle thin gold staircase line motif rising across the lower part of the cover. No gavels, no paragraph symbols, no people, no wedding rings, no house icons with hearts. Square 1:1 composition, high detail, keep text minimal and exactly as written.",
  sections: [
    {
      heading: "Najpierw fakt, który porządkuje wszystko",
      intro: "Rozwód ani podział majątku nie „dzielą” kredytu.",
      blocks: [
        {
          type: "path",
          current: 1,
          note: "To część planu: zbierasz liczby i sprawdzasz, co bank jest gotów rozważyć. Z tą wiedzą łatwiej uzgodnić kredyt z drugą osobą.",
        },
        {
          type: "p",
          text: "Umowa kredytu łączy was z bankiem i rozstanie jej nie zmienia. Bank może zwykle żądać całej zaległości od każdego z was.",
        },
        {
          type: "p",
          text: "Zwolnienie jednej osoby lub przejęcie długu wymaga zgody banku. Bank sprawdza wtedy zdolność kredytową osoby, która zostaje.",
        },
        {
          type: "list",
          items: [
            "Wyprowadzka nie zwalnia ze spłaty.",
            "Hipoteka obciąża mieszkanie niezależnie od tego, kto w nim mieszka.",
            "Pierwsza rozmowa z bankiem to rozpoznanie, nie decyzja.",
          ],
        },
      ],
    },
    {
      heading: "Opcje, o które możesz zapytać",
      intro: "Żadna z nich nie jest gwarantowana. Bank ocenia każdy wniosek osobno.",
      blocks: [
        {
          type: "table",
          head: ["Opcja", "Na czym polega", "O czym pamiętać"],
          rows: [
            [
              "Aneks i zwolnienie współkredytobiorcy",
              "Jedna osoba zostaje z kredytem, druga zostaje zwolniona za zgodą banku.",
              "Zapytaj o warunki, opłaty i czas.",
            ],
            [
              "Przejęcie długu",
              "Jedna osoba przejmuje zobowiązanie, bank zgadza się na zmianę dłużnika.",
              "Bez zgody banku nie działa wobec banku.",
            ],
            [
              "Refinansowanie w innym banku",
              "Osoba, która zostaje w mieszkaniu, bierze nowy kredyt i spłaca stary.",
              "Nowa ocena zdolności. Policz prowizje, wycenę i opłaty.",
            ],
            [
              "Sprzedaż i spłata kredytu",
              "Sprzedajecie mieszkanie, spłacacie bank, dzielicie nadwyżkę.",
              "Ustalcie, kto pokrywa ewentualny niedobór.",
            ],
            [
              "Poręczyciel lub inne zabezpieczenie",
              "Dołącza inna osoba lub zabezpieczenie.",
              "To duże zobowiązanie dla tej osoby. Bez presji.",
            ],
            [
              "Zmiana warunków spłaty",
              "Np. dłuższy okres kredytowania i niższa rata.",
              "Zapytaj, ile to zmienia w całkowitym koszcie.",
            ],
          ],
          caption: "To lista tematów do rozmowy, nie gotowe rozwiązania.",
        },
        {
          type: "callout",
          tone: "warning",
          title: "Nie podpisuj ustaleń majątkowych w ciemno",
          text: "Jeśli bank odmówi zwolnienia, oboje zostajecie dłużnikami mimo waszej umowy. Niech prawnik sprawdzi, jak zapisać ustalenia na wypadek odmowy.",
        },
      ],
    },
    {
      heading: "Arkusz liczb: zbierz dane przed rozmową",
      intro: "Większość danych znajdziesz w umowie, harmonogramie spłat i bankowości elektronicznej.",
      blocks: [
        {
          type: "worksheet",
          title: "Twój kredyt w liczbach",
          fields: [
            "Numer umowy kredytu i data zawarcia",
            "Kredytobiorcy wpisani w umowie",
            "Aktualne saldo zadłużenia (kapitał do spłaty)",
            "Wysokość bieżącej raty i dzień płatności",
            "Pozostały okres kredytowania (liczba rat / data końcowa)",
            "Oprocentowanie: stałe czy zmienne? Do kiedy obowiązuje okres stałej stopy?",
            "Rodzaj rat: równe czy malejące",
            "Szacunkowa wartość nieruchomości (źródło: wycena, oferty podobnych mieszkań)",
            "LTV = saldo kredytu ÷ wartość nieruchomości × 100% (wynik)",
            "Ubezpieczenia powiązane z kredytem (nieruchomości, na życie, inne)",
            "Ewentualne zaległości lub opóźnienia (tak/nie, kwota)",
          ],
        },
        {
          type: "p",
          text: "Przykład LTV: saldo 300 000 zł przy wartości 500 000 zł to 60%. Niższe LTV zwykle ułatwia refinansowanie.",
        },
        {
          type: "worksheet",
          title: "Budżet osoby, która chce zostać z kredytem",
          fields: [
            "Dochód netto miesięcznie i forma zatrudnienia",
            "Inne stałe zobowiązania (raty, limity na kartach, leasing)",
            "Stałe koszty życia (czynsz, media, dojazdy)",
            "Wydatki na dzieci i ewentualne alimenty (płacone lub otrzymywane)",
            "Ile wyniesie spłata drugiej osoby i skąd będą na nią środki?",
            "Ile zostaje miesięcznie po opłaceniu raty i kosztów?",
          ],
        },
      ],
    },
    {
      heading: "Dokumenty, o które bank może poprosić",
      intro: "Każdy bank ma własną listę. Poproś o nią na początku. Na pierwszą rozmowę nie musisz mieć wszystkiego.",
      blocks: [
        {
          type: "checklist",
          items: [
            "Dokument tożsamości każdej osoby, której dotyczy zmiana",
            "Umowa kredytu z aneksami i aktualny harmonogram spłat",
            "Zaświadczenie o dochodach lub inne dokumenty potwierdzające dochód (np. wyciągi z konta, PIT)",
            "Informacje o innych zobowiązaniach finansowych",
            "Odpis księgi wieczystej lub jej numer",
            "Aktualna wycena nieruchomości (operat szacunkowy), jeśli bank jej wymaga",
            "Wyrok rozwodowy, orzeczenie o separacji, umowa lub orzeczenie o podziale majątku (jeśli już są)",
            "Dokument potwierdzający ustrój majątkowy (np. umowa majątkowa), jeśli dotyczy",
            "Pisemna zgoda drugiego kredytobiorcy na proponowaną zmianę, jeśli bank jej wymaga",
            "Polisy ubezpieczeniowe powiązane z kredytem",
          ],
        },
      ],
    },
    {
      heading: "Skrypt rozmowy z bankiem",
      intro: "Nie musisz mówić o przyczynach rozstania. Wystarczy rzeczowa informacja, że chcecie uporządkować kredyt.",
      blocks: [
        {
          type: "script",
          title: "Telefon: umówienie rozmowy",
          lines: [
            {
              label: "Otwarcie",
              text: "Dzień dobry, jestem współkredytobiorcą kredytu hipotecznego nr [numer umowy]. Rozstajemy się i chcę poznać rozwiązania, które bank może rozważyć.",
            },
            {
              label: "Cel",
              text: "Na razie nie składam wniosku. Chcę poznać opcje, warunki i listę dokumentów.",
            },
            {
              label: "Prośba",
              text: "Czy mogę umówić rozmowę z doradcą od zmian w umowach kredytowych? Czy drugi kredytobiorca musi być obecny?",
            },
            {
              label: "Zamknięcie",
              text: "Czy mogę dostać listę dokumentów mailem lub w bankowości elektronicznej? Dziękuję.",
            },
          ],
        },
        {
          type: "script",
          title: "Spotkanie z doradcą",
          lines: [
            {
              label: "Sytuacja",
              text: "Rozstajemy się. Rozważamy, że [ja / druga osoba] zostanie w mieszkaniu i będzie spłacać kredyt. Chcemy sprawdzić, czy to realne, zanim podpiszemy ustalenia.",
            },
            {
              label: "Pytanie główne",
              text: "Jakie warunki trzeba spełnić, żeby bank zwolnił jednego kredytobiorcę? Jak ocenia zdolność osoby, która zostaje?",
            },
            {
              label: "Alternatywy",
              text: "Jeśli to niemożliwe, co bank może zaproponować? Dłuższy okres, poręczyciela, wcześniejszą spłatę przy sprzedaży?",
            },
            {
              label: "Koszty i czas",
              text: "Ile kosztuje aneks, wycena i inne czynności? Ile trwa rozpatrzenie wniosku?",
            },
            {
              label: "Podsumowanie",
              text: "Czy mogę dostać podsumowanie tych informacji mailem? Chcę je spokojnie omówić z drugą osobą i prawnikiem.",
            },
          ],
        },
      ],
    },
    {
      heading: "Pytania do zadania i notatki z rozmowy",
      blocks: [
        {
          type: "checklist",
          items: [
            "Czy bank w ogóle rozpatruje wnioski o zwolnienie współkredytobiorcy? Jakie są kryteria?",
            "Jakie dokumenty muszą złożyć obie strony?",
            "Czy potrzebna będzie nowa wycena nieruchomości?",
            "Jakie są koszty aneksu i innych czynności?",
            "Ile trwa decyzja i czy jest ważna przez określony czas?",
            "Co się stanie z ubezpieczeniami powiązanymi z kredytem?",
            "Jak wygląda procedura przy sprzedaży mieszkania i wcześniejszej spłacie?",
            "Czy jest prowizja za wcześniejszą spłatę? Sprawdź też, co mówi umowa.",
            "Jakie rozwiązania bank oferuje, gdy pojawia się przejściowy problem ze spłatą?",
            "Kto będzie moją osobą kontaktową?",
          ],
        },
        {
          type: "worksheet",
          title: "Notatka z rozmowy",
          fields: [
            "Data, godzina, forma kontaktu (telefon / oddział / czat)",
            "Imię i stanowisko osoby z banku",
            "Opcje, które bank uznał za możliwe do rozważenia",
            "Warunki i wymagane dokumenty",
            "Koszty i terminy",
            "Co mam zrobić teraz i do kiedy",
          ],
        },
      ],
    },
    {
      heading: "Ustalcie kredyt między sobą, zanim zajmie się nim sąd",
      intro: "Gdy znasz liczby i odpowiedź banku, porozmawiaj z drugim kredytobiorcą.",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Podzielcie się podsumowaniem z banku.",
            "Wypiszcie opcje realne dla was obojga.",
            "Ustalcie na piśmie, kto płaci ratę do decyzji banku.",
            "Jeśli rozmowa utknie, zaproponujcie mediację.",
            "Ostateczne ustalenia pokażcie prawnikowi.",
          ],
        },
        {
          type: "worksheet",
          title: "Opcje do omówienia z drugim kredytobiorcą",
          fields: [
            "Opcja, którą preferuję, i dlaczego",
            "Opcja, którą mogę zaakceptować awaryjnie",
            "Czego nie zaakceptuję (moja granica)",
            "Co już uzgodniliśmy (i gdzie to zapisaliśmy)",
            "Sprawy do omówienia z mediatorem lub prawnikiem",
          ],
        },
        { type: "mediationAttempt" },
      ],
    },
    {
      heading: "Zanim przestaniesz płacić, przeczytaj to",
      blocks: [
        {
          type: "callout",
          tone: "warning",
          title: "Wstrzymanie spłat szkodzi wam obojgu",
          text: "Bank może żądać całej raty od osoby, która płaci. Zaległości trafiają do BIK, a dłuższe grożą wypowiedzeniem umowy i egzekucją.",
        },
        {
          type: "list",
          items: [
            "Zachowuj potwierdzenia przelewów.",
            "Gdy spłata staje się trudna, dzwoń do banku przed pierwszą zaległością.",
            "Zapytaj prawnika, jak rozliczyć raty płacone po rozstaniu.",
          ],
        },
      ],
    },
    {
      heading: "Co dalej?",
      blocks: [
        {
          type: "p",
          text: "Kredyt to jeden element układanki. Nowy Etap pomoże przygotować Plan Rozwodu, a gdy rozmowy są trudne, mediację. Najpierw plan i ustalenia, potem pozew.",
        },
      ],
    },
  ],
};
