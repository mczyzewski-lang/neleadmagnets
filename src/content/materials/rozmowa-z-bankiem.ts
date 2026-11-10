import type { Material } from "../types";

export const material: Material = {
  slug: "rozmowa-z-bankiem",
  format: "Skrypt rozmowy",
  coverTitle: "Kredyt po rozstaniu",
  coverSubtitle: "Jak przygotować rozmowę z bankiem",
  coverTone: "dark",
  h1: "Kredyt po rozstaniu: jak przygotować rozmowę z bankiem",
  h2: "Skrypt rozmowy, lista dokumentów, pytania i arkusz liczb — żebyś do banku szedł z planem, a nie z nadzieją.",
  promise:
    "Przygotujesz się do rozmowy z bankiem o wspólnym kredycie hipotecznym: wiesz, o co zapytać, co mieć przy sobie i czego nie robić.",
  forWho: [
    "Masz wspólny kredyt hipoteczny z osobą, z którą się rozstajesz lub rozwodzisz.",
    "Zastanawiasz się, czy jedno z was może zostać w mieszkaniu i przejąć kredyt.",
    "Chcesz wiedzieć, jakie rozwiązania w ogóle można omówić z bankiem, zanim zaczniecie ustalać podział majątku.",
    "Boisz się rozmowy z doradcą i chcesz mieć gotowe sformułowania.",
  ],
  inside: [
    "Wyjaśnienie, dlaczego rozwód nie zmienia umowy kredytu i co oznacza solidarna odpowiedzialność.",
    "Przegląd opcji, o które możesz zapytać bank — bez obietnic, z plusami i minusami.",
    "Arkusz liczb: saldo, rata, okres, oprocentowanie, wartość nieruchomości, LTV.",
    "Listę dokumentów, o które bank może poprosić.",
    "Skrypt rozmowy telefonicznej i spotkania w oddziale.",
    "Listę pytań do zadania doradcy i miejsce na notatki.",
    "Ostrzeżenie przed wstrzymaniem spłat i jego możliwymi konsekwencjami.",
  ],
  time: "25 min",
  faq: [
    {
      q: "Czy po rozwodzie bank automatycznie wykreśli mnie z kredytu?",
      a: "Nie. Rozwód ani podział majątku nie zmieniają umowy kredytu. Dopóki bank nie zgodzi się na zmianę (np. aneksem), oboje kredytobiorcy odpowiadają za cały dług.",
    },
    {
      q: "Czy wyrok rozwodowy lub umowa o podział majątku wiąże bank?",
      a: "Ustalenia między wami regulują wasze wzajemne rozliczenia, ale bez zgody banku nie zmieniają tego, kto jest jego dłużnikiem. Dlatego rozmowę z bankiem warto przeprowadzić przed podpisaniem ostatecznych ustaleń.",
    },
    {
      q: "Czy bank musi się zgodzić na zwolnienie jednego z nas?",
      a: "Nie ma takiego obowiązku. Zgoda zależy zwykle od oceny zdolności kredytowej osoby, która ma zostać z kredytem, i od wewnętrznych zasad banku. Warto zapytać, jakie warunki trzeba spełnić.",
    },
    {
      q: "Co jeśli nie stać mnie na połowę raty po wyprowadzce?",
      a: "Nie przestawaj płacić bez rozmowy. Skontaktuj się z bankiem jak najwcześniej i zapytaj o dostępne rozwiązania. Zaległości mogą trafić do BIK i skutkować wypowiedzeniem umowy.",
    },
    {
      q: "Czy ten materiał zastępuje poradę prawną lub finansową?",
      a: "Nie. To materiał informacyjny, który pomaga przygotować się do rozmów. Decyzje zależą od twojej umowy, sytuacji i zasad konkretnego banku — warto skonsultować je z prawnikiem lub doradcą.",
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
      label: "Mediacje — gov.pl",
      url: "https://www.gov.pl/web/gov/rozwiaz-spor-przez-mediacje",
      verified: "2026-11-10",
    },
  ],
  nextOffer: "plan-rozwodu",
  ctaLabel: "Ułóż plan podziału majątku i kredytu przed pozwem",
  seo: {
    title: "Kredyt po rozstaniu: rozmowa z bankiem | Nowy Etap",
    description:
      "Wspólny kredyt hipoteczny a rozwód. Skrypt rozmowy z bankiem, lista dokumentów, pytania i arkusz liczb. Bezpłatny materiał do pobrania.",
  },
  coverPrompt:
    "Photorealistic 3D render of a standing hardcover booklet at a slight angle on a warm off-white (#FCF9F8) background with a soft natural shadow. The cover is dark green (#263D3A) with deep green (#295550) panel and fine gold (#C79B59) accents. Minimalist premium typography. Small wordmark text at the top: \"NOWY ETAP · PORADNIA ROZWODOWA\". Exact cover title: \"Kredyt po rozstaniu\". Exact subtitle: \"Jak przygotować rozmowę z bankiem\". Small label \"SKRYPT ROZMOWY\". A subtle thin gold staircase line motif rising across the lower part of the cover. No gavels, no paragraph symbols, no people, no wedding rings, no house icons with hearts. Square 1:1 composition, high detail, keep text minimal and exactly as written.",
  sections: [
    {
      heading: "Najpierw fakt, który porządkuje wszystko",
      intro:
        "Wiele osób zakłada, że skoro sąd orzeknie rozwód albo podzielicie majątek, to kredyt „podzieli się” razem z nim. Tak nie jest.",
      blocks: [
        {
          type: "p",
          text: "Umowa kredytu to umowa między wami a bankiem. Rozstanie, separacja ani rozwód jej nie zmieniają. Jeśli podpisaliście umowę jako współkredytobiorcy, zwykle odpowiadacie solidarnie. Oznacza to, że bank może żądać spłaty całej zaległości od każdego z was — od jednego, od drugiego albo od obojga (art. 366 Kodeksu cywilnego).",
        },
        {
          type: "p",
          text: "Zmiana dłużnika — np. zwolnienie jednej osoby z kredytu albo przejęcie długu przez drugą — wymaga zgody banku (art. 519 Kodeksu cywilnego). W praktyce bank zwykle sprawdza wtedy, czy osoba, która ma zostać z kredytem, sama ma wystarczającą zdolność kredytową.",
        },
        {
          type: "callout",
          tone: "info",
          title: "Co z tego wynika w praktyce",
          text: "Ustalenia między wami (kto zostaje w mieszkaniu, kto spłaca) są ważne, ale bank nie jest nimi związany, dopóki się na nie nie zgodzi. Dlatego dobrze jest najpierw sprawdzić, co bank jest gotów rozważyć, a dopiero potem zamykać ustalenia majątkowe.",
        },
        {
          type: "list",
          items: [
            "Dopóki bank nie podpisze zmian, oboje odpowiadacie za cały kredyt.",
            "Wyprowadzka z mieszkania nie zwalnia z obowiązku spłaty.",
            "Hipoteka obciąża nieruchomość niezależnie od tego, kto w niej mieszka.",
            "Rozmowa z bankiem to rozpoznanie możliwości, a nie od razu decyzja.",
          ],
        },
      ],
    },
    {
      heading: "Opcje, o które możesz zapytać",
      intro:
        "Poniżej rozwiązania, które warto omówić z bankiem lub doradcą. Żadne z nich nie jest gwarantowane — bank ocenia każdy wniosek indywidualnie, a dostępność zależy od jego zasad.",
      blocks: [
        {
          type: "table",
          head: ["Opcja", "Na czym polega", "O czym pamiętać"],
          rows: [
            [
              "Aneks i zwolnienie współkredytobiorcy",
              "Jedna osoba zostaje z kredytem, druga zostaje zwolniona z długu za zgodą banku.",
              "Zwykle wymaga oceny zdolności kredytowej osoby, która zostaje. Zapytaj o opłaty i czas rozpatrzenia.",
            ],
            [
              "Przejęcie długu",
              "Jedna osoba przejmuje zobowiązanie, bank zgadza się na zmianę dłużnika.",
              "Bez zgody banku przejęcie długu jest wobec niego bezskuteczne.",
            ],
            [
              "Refinansowanie w innym banku",
              "Osoba, która zostaje z nieruchomością, zaciąga nowy kredyt i spłaca dotychczasowy.",
              "Nowy bank ocenia zdolność od zera. Uwzględnij koszty: prowizje, wycenę, ubezpieczenia, opłaty sądowe za wpisy.",
            ],
            [
              "Sprzedaż nieruchomości i spłata kredytu",
              "Sprzedajecie mieszkanie, spłacacie bank, dzielicie ewentualną nadwyżkę.",
              "Zapytaj o procedurę wcześniejszej spłaty i zwolnienia hipoteki. Gdy cena nie pokrywa salda, trzeba ustalić, kto pokrywa różnicę.",
            ],
            [
              "Dodanie poręczyciela lub innego zabezpieczenia",
              "Do kredytu dołącza inna osoba lub zabezpieczenie, które poprawia ocenę ryzyka.",
              "To duże zobowiązanie dla tej osoby. Omówcie je spokojnie, bez presji.",
            ],
            [
              "Przejściowe zmiany warunków spłaty",
              "Np. wydłużenie okresu kredytowania lub inne rozwiązanie łagodzące ratę.",
              "Zapytaj, co bank oferuje i jaki ma to wpływ na całkowity koszt kredytu.",
            ],
          ],
          caption: "Traktuj tabelę jako listę tematów do rozmowy, a nie listę gotowych rozwiązań.",
        },
        {
          type: "callout",
          tone: "warning",
          title: "Nie podpisuj ustaleń majątkowych w ciemno",
          text: "Jeśli umówicie się, że jedno z was spłaci drugie i przejmie kredyt, a bank potem odmówi zwolnienia drugiej osoby, oboje nadal będziecie dłużnikami. Warto, by prawnik spojrzał na to, jak zapisać takie ustalenia i co się stanie, gdy bank się nie zgodzi.",
        },
      ],
    },
    {
      heading: "Arkusz liczb: zbierz dane przed rozmową",
      intro:
        "Rozmowa z bankiem jest znacznie łatwiejsza, gdy znasz swoje liczby. Większość danych znajdziesz w umowie, harmonogramie spłat i bankowości elektronicznej.",
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
          text: "LTV (loan to value) pokazuje, jaką część wartości nieruchomości stanowi kredyt. Przykład wyłącznie poglądowy: przy saldzie 300 000 zł i wartości mieszkania 500 000 zł LTV wynosi 60%. Im niższe LTV, tym zwykle łatwiej rozmawiać o refinansowaniu, choć ostateczna decyzja zależy od banku.",
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
      intro:
        "Każdy bank ma własną listę. Zapytaj o nią na początku rozmowy, żeby nie składać wniosku kilka razy.",
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
            "Wyrok rozwodowy, orzeczenie o separacji lub umowa / orzeczenie o podziale majątku — jeśli już są",
            "Dokument potwierdzający ustrój majątkowy (np. umowa majątkowa), jeśli dotyczy",
            "Pisemna zgoda drugiego kredytobiorcy na proponowaną zmianę, jeśli bank jej wymaga",
            "Polisy ubezpieczeniowe powiązane z kredytem",
          ],
        },
        {
          type: "callout",
          tone: "info",
          text: "Na tym etapie nie musisz mieć wszystkiego. Pierwsza rozmowa może służyć tylko temu, by dowiedzieć się, co będzie potrzebne i w jakiej kolejności.",
        },
      ],
    },
    {
      heading: "Skrypt rozmowy z bankiem",
      intro:
        "Możesz zacząć od telefonu na infolinię albo umówić spotkanie z doradcą kredytowym. Poniżej sformułowania, które pomagają zachować spokój i konkret.",
      blocks: [
        {
          type: "script",
          title: "Telefon: umówienie rozmowy",
          lines: [
            {
              label: "Otwarcie",
              text: "Dzień dobry, jestem współkredytobiorcą kredytu hipotecznego nr [numer umowy]. Jesteśmy w trakcie rozstania i chcę dowiedzieć się, jakie rozwiązania bank może rozważyć w takiej sytuacji.",
            },
            {
              label: "Cel",
              text: "Na razie nie składam wniosku. Chcę poznać możliwe opcje, warunki i listę dokumentów.",
            },
            {
              label: "Prośba",
              text: "Czy mogę umówić rozmowę z doradcą, który zajmuje się zmianami w umowach kredytowych? Czy drugi kredytobiorca musi być obecny?",
            },
            {
              label: "Zamknięcie",
              text: "Czy mogę otrzymać listę potrzebnych dokumentów mailowo lub w bankowości elektronicznej? Dziękuję.",
            },
          ],
        },
        {
          type: "script",
          title: "Spotkanie z doradcą",
          lines: [
            {
              label: "Sytuacja",
              text: "Rozstajemy się. Rozważamy, że [ja / druga osoba] zostanie w mieszkaniu i będzie dalej spłacać kredyt. Chcemy sprawdzić, czy to realne, zanim podpiszemy ustalenia majątkowe.",
            },
            {
              label: "Pytanie główne",
              text: "Jakie warunki trzeba spełnić, żeby bank zwolnił jednego z kredytobiorców z umowy? Jak wygląda ocena zdolności kredytowej osoby, która zostaje?",
            },
            {
              label: "Alternatywy",
              text: "Jeśli to nie będzie możliwe, jakie inne rozwiązania bank widzi? Czy możemy omówić wydłużenie okresu, dodanie poręczyciela albo zasady wcześniejszej spłaty przy sprzedaży?",
            },
            {
              label: "Koszty i czas",
              text: "Jakie są opłaty za aneks, wycenę i inne czynności? Ile trwa rozpatrzenie wniosku?",
            },
            {
              label: "Podsumowanie",
              text: "Czy mogę prosić o podsumowanie dzisiejszych informacji na piśmie lub mailem? Chcę spokojnie omówić je z drugą osobą i prawnikiem.",
            },
          ],
        },
        {
          type: "callout",
          tone: "info",
          title: "Wskazówka",
          text: "Nie musisz opowiadać doradcy o przyczynach rozstania. Wystarczy rzeczowa informacja, że zmienia się wasza sytuacja i chcecie uporządkować kredyt.",
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
      heading: "Zanim przestaniesz płacić — przeczytaj to",
      blocks: [
        {
          type: "callout",
          tone: "warning",
          title: "Wstrzymanie spłat szkodzi wam obojgu",
          text: "Gdy jedna osoba przestaje płacić „swoją połowę”, bank i tak może żądać całej raty od drugiej. Zaległości mogą zostać odnotowane w BIK, co utrudni wam obojgu przyszłe kredyty, a dłuższe opóźnienia mogą prowadzić do wypowiedzenia umowy i egzekucji z nieruchomości.",
        },
        {
          type: "list",
          items: [
            "Ustalcie na piśmie, kto i z jakiego konta płaci ratę do czasu decyzji banku.",
            "Zachowuj potwierdzenia przelewów — przydadzą się przy rozliczeniach.",
            "Jeśli spłata staje się trudna, kontaktuj się z bankiem wcześnie, a nie po pierwszej zaległości.",
            "Zapytaj prawnika, jak rozliczyć raty płacone po rozstaniu w ramach podziału majątku.",
          ],
        },
      ],
    },
    {
      heading: "Co dalej?",
      blocks: [
        {
          type: "p",
          text: "Rozmowa z bankiem to jeden z elementów większej układanki: mieszkania, podziału majątku, kosztów życia i — jeśli macie dzieci — ich codzienności. Najlepiej, gdy te elementy są ustalane razem i w odpowiedniej kolejności.",
        },
        {
          type: "p",
          text: "W Nowym Etapie pomagamy przygotować Plan Rozwodu: uporządkować liczby, opcje i pytania, zanim padną decyzje. Jeśli rozmowy z drugą stroną są trudne, możemy pomóc w mediacji. Najpierw plan i ustalenia — dopiero potem pozew. Możesz skorzystać, kiedy poczujesz, że to dobry moment.",
        },
      ],
    },
  ],
};
