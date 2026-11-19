import type { Material } from "../types";

export const material: Material = {
  slug: "rozwod-krok-po-kroku",
  format: "Przewodnik",
  coverTitle: "Rozwód w Polsce krok po kroku",
  coverSubtitle: "Od decyzji do życia po wyroku",
  coverTone: "green",
  h1: "Rozwód w Polsce krok po kroku: spokojny przewodnik od decyzji do wyroku",
  h2: "Cały proces na jednej mapie. Najpierw plan, potem ustalenia i mediacja, na końcu pozew, sąd i sprawy po wyroku.",
  promise:
    "Cały proces rozwodowy rozpisany na etapy, żebyś wiedział, co Cię czeka, zanim cokolwiek trafi do sądu.",
  forWho: [
    "Dla osób, które rozważają rozwód i chcą najpierw zrozumieć cały proces.",
    "Dla tych, którzy chcą ustalić sprawy dzieci, mieszkania i finansów przed pozwem.",
    "Dla par, które myślą o rozwodzie bez orzekania o winie.",
    "Dla osób, które zastanawiają się nad separacją.",
  ],
  inside: [
    "Mapa 7 etapów: plan, ustalenia, pozew i sąd",
    "Arkusz „Moje ustalenia przed pozwem”",
    "Próba mediacji: dlaczego ma znaczenie i jak ją udokumentować",
    "Pozew: właściwy sąd, opłata 600 zł, dokumenty",
    "Co sąd rozstrzyga w wyroku rozwodowym",
    "Rozwód a separacja w tabeli",
    "Checklista spraw po wyroku",
  ],
  time: "15 min",
  faq: [
    {
      q: "Dlaczego najpierw plan i ustalenia, a dopiero potem pozew?",
      a: "Bo pozew oparty na gotowych ustaleniach jest konkretny, a sąd ma mniej do rozstrzygania. Porozumienie rodzicielskie sąd uwzględnia, jeśli jest zgodne z dobrem dziecka. Przy zgodnym rozwodzie bez orzekania o winie sąd zwraca połowę opłaty od pozwu. W pozwie trzeba też napisać, czy była próba mediacji. Mediacja jest dobrowolna i nie jest wskazana przy przemocy, groźbach lub kontroli.",
    },
    {
      q: "Ile kosztuje rozwód w sądzie?",
      a: "Opłata od pozwu wynosi 600 zł. Mogą dojść koszty pełnomocnika, mediacji czy biegłych. Czasem możliwy jest zwrot części opłaty albo zwolnienie od kosztów.",
    },
    {
      q: "Do którego sądu złożyć pozew o rozwód?",
      a: "Do sądu okręgowego. Zwykle tego, gdzie ostatnio mieszkaliście razem, jeśli jedno z Was nadal tam mieszka. Jeśli nie, właściwy jest sąd miejsca zamieszkania pozwanego, a gdy i tego brak, powoda.",
    },
    {
      q: "Czy rozwód bez orzekania o winie jest szybszy?",
      a: "Często jest prostszy, bo sąd nie bada winy. Sąd nie orzeka o winie na zgodne żądanie obojga. Czasu trwania sprawy nie da się jednak zagwarantować.",
    },
    {
      q: "Czy w wyroku rozwodowym sąd zawsze dzieli majątek?",
      a: "Nie. Może to zrobić na wniosek, jeśli nie opóźni to nadmiernie sprawy. Zwykle podział odbywa się później: w osobnej sprawie albo umownie, np. u notariusza.",
    },
    {
      q: "Czy po rozwodzie muszę zmienić nazwisko?",
      a: "Nie. Jeśli chcesz wrócić do nazwiska sprzed ślubu, masz na to rok od uprawomocnienia wyroku. Składasz oświadczenie w urzędzie stanu cywilnego lub u konsula.",
    },
  ],
  sources: [
    { label: "Kodeks rodzinny i opiekuńczy (art. 56–61⁶)", url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19640090059", verified: "2026-11-10" },
    { label: "Kodeks postępowania cywilnego (art. 41, art. 103, art. 183¹ i nast., art. 187 § 1 pkt 3, art. 436, art. 445²)", url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19640430296", verified: "2026-11-16" },
    { label: "Ustawa o kosztach sądowych w sprawach cywilnych (art. 26, art. 79 ust. 1 pkt 3 lit. b)", url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20051671398", verified: "2026-11-10" },
    { label: "Kodeks cywilny (art. 366, art. 519)", url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19640160093", verified: "2026-11-10" },
    { label: "gov.pl: Rozwiąż spór przez mediację", url: "https://www.gov.pl/web/gov/rozwiaz-spor-przez-mediacje", verified: "2026-11-10" },
    { label: "gov.pl: Uzyskaj odpis aktu stanu cywilnego", url: "https://www.gov.pl/web/gov/uzyskaj-odpis-aktu-stanu-cywilnego", verified: "2026-11-10" },
  ],
  nextOffer: "plan-rozwodu",
  stage: 1,
  ctaLabel: "Przygotuj Plan Rozwodu przed pozwem",
  seo: {
    title: "Rozwód w Polsce krok po kroku | Nowy Etap",
    description:
      "Rozwód krok po kroku: dokumenty, opłata 600 zł, właściwy sąd, mediacja, treść wyroku i sprawy po rozwodzie. Bezpłatny przewodnik online.",
  },
  coverPrompt:
    "Photorealistic 3D render of a single standing hardcover book at a slight angle on a warm off-white (#FCF9F8) background with a soft natural shadow. The cover is deep green (#295550) with a slightly darker green (#263D3A) spine and subtle gold (#C79B59) accents. Minimalist premium typography. Render this exact text, spelled exactly, and keep all text minimal: small wordmark at the top \"NOWY ETAP · PORADNIA ROZWODOWA\"; main title \"Rozwód w Polsce krok po kroku\"; subtitle \"Od decyzji do życia po wyroku\". A subtle thin gold staircase line motif (a stylised ascending step line) across the lower part of the cover. No gavels, no paragraph symbols, no people, no wedding rings, no other text. Square 1:1 composition, high detail, elegant studio lighting.",
  sections: [
    {
      heading: "Mapa całego procesu",
      intro:
        "Rozwód to ciąg decyzji. Wiele z nich podejmiesz spokojnie, zanim cokolwiek trafi do sądu.",
      blocks: [
        {
          type: "path",
          current: 1,
          note: "Ten przewodnik pokazuje całą drogę, ale zaczyna od planu: faktów, dokumentów, budżetu i potrzeb dzieci.",
        },
        {
          type: "table",
          head: ["Etap", "Co się dzieje", "Na co masz wpływ"],
          rows: [
            ["1. Decyzja i plan", "Spisujesz fakty, dokumenty, budżet, potrzeby dzieci i swoje priorytety.", "Tempo, wsparcie (psycholog, prawnik)."],
            ["2. Ustalenia", "Rozmawiacie o opiece, alimentach, mieszkaniu i finansach. Spisujecie, co uzgodniliście.", "Bardzo duży. To najważniejszy etap."],
            ["3. Mediacja", "Z mediatorem szukacie porozumienia w sprawach, których nie ustaliliście sami.", "Jest dobrowolna. Udokumentowana próba ma znaczenie w sądzie."],
            ["4. Pozew", "Składasz pozew w sądzie okręgowym, opłata 600 zł.", "Treść żądań, wina lub jej brak, informacja o próbie mediacji."],
            ["5. Rozprawa", "Sąd wysłuchuje stron i ewentualnie świadków.", "Przygotowanie i rzeczowa postawa."],
            ["6. Wyrok", "Sąd rozwiązuje małżeństwo i rozstrzyga sprawy dzieci i mieszkania.", "Sąd bierze pod uwagę Wasze porozumienie."],
            ["7. Po wyroku", "Uprawomocnienie, nazwisko, majątek, bank, urzędy.", "Kolejność i terminy."],
          ],
          caption: "Siedem etapów rozwodu",
        },
        {
          type: "callout",
          tone: "info",
          text: "Przewodnik ma charakter informacyjny i nie jest poradą prawną. Decyzje w swojej sprawie skonsultuj z prawnikiem.",
        },
      ],
    },
    {
      heading: "Etap 1–2: decyzja, plan i ustalenia",
      intro:
        "Sąd orzeka rozwód, gdy rozkład pożycia jest zupełny i trwały. Oznacza to, że ustały więzi emocjonalne, fizyczne i gospodarcze.",
      blocks: [
        {
          type: "p",
          text: "Sąd nie orzeknie rozwodu, jeśli ucierpiałoby na tym dobro wspólnych małoletnich dzieci. Co do zasady nie orzeknie go też na żądanie wyłącznie winnego małżonka, gdy drugi się nie zgadza. Dlatego warto pokazać, że sprawy dzieci są przemyślane.",
        },
        {
          type: "p",
          text: "Zacznij od planu. Spisz dokumenty, policz budżet swój i dzieci, zdecyduj, co jest dla Ciebie najważniejsze. Bez planu łatwo zgodzić się na coś pod presją.",
        },
        {
          type: "checklist",
          items: [
            "Gdzie będą mieszkać dzieci i jak będą wyglądały kontakty z drugim rodzicem (dni powszednie, weekendy, wakacje, święta).",
            "Jak będziecie podejmować ważne decyzje dotyczące dzieci (szkoła, leczenie, wyjazdy za granicę).",
            "Wysokość alimentów na dzieci i sposób pokrywania dodatkowych kosztów (zajęcia, leczenie, wyjazdy).",
            "Kto zostaje w mieszkaniu i do kiedy oraz kto pokrywa bieżące opłaty.",
            "Co z kredytem hipotecznym i wspólnymi kontami.",
            "Czy chcecie dzielić majątek od razu, czy później.",
            "Czy oboje zgadzacie się na rozwód bez orzekania o winie.",
          ],
        },
        {
          type: "callout",
          tone: "info",
          title: "Porozumienie rodzicielskie",
          text: "Możecie przedstawić sądowi pisemne porozumienie rodzicielskie: jak wykonujecie władzę rodzicielską i jak wyglądają kontakty z dzieckiem. Sąd je uwzględnia, jeśli jest zgodne z dobrem dziecka.",
        },
        {
          type: "worksheet",
          title: "Moje ustalenia przed pozwem",
          fields: [
            "Czy oboje chcemy rozwodu bez orzekania o winie? (tak / nie / do rozmowy)",
            "Miejsce zamieszkania dzieci i plan kontaktów:",
            "Proponowana wysokość alimentów i sposób płatności:",
            "Kto zostaje w mieszkaniu, kto płaci rachunki:",
            "Co robimy z kredytem i wspólnymi kontami:",
            "Majątek: dzielimy teraz / później / w jaki sposób:",
            "Sprawy, w których potrzebuję porady prawnika:",
          ],
        },
      ],
    },
    {
      heading: "Etap 3: mediacja przed pozwem",
      intro:
        "Rozmowy między Wami to jedno. Mediacja to spotkania z bezstronnym mediatorem. Najwięcej daje przed pozwem, bo to, co uzgodnicie, trafia od razu do pozwu. Sąd może też skierować Was do mediacji w trakcie sprawy.",
      blocks: [
        {
          type: "list",
          items: [
            "Dotyczy zwykle warunków rozstania: opieki, kontaktów, alimentów, mieszkania i majątku.",
            "Mediator nie rozstrzyga sporu i nie staje po żadnej stronie.",
            "Ugodę zawartą przed mediatorem może zatwierdzić sąd.",
            "Koszt zależy od tego, czy mediacja jest prywatna, czy skierowana przez sąd. Sprawdź stawki przed startem.",
          ],
        },
        { type: "mediationAttempt" },
        {
          type: "callout",
          tone: "safety",
          title: "Twoje bezpieczeństwo jest najważniejsze",
          text: "Mediacja nie jest dla Was, gdy jest przemoc, groźby lub silna przewaga jednej strony. W zagrożeniu dzwoń pod 112. Wsparcie: „Niebieska Linia” 800 120 002.",
        },
      ],
    },
    {
      heading: "Etap 4: pozew",
      intro:
        "Pozew opisuje Twoje żądania i fakty. Gdy masz plan i ustalenia, pozew głównie je porządkuje.",
      blocks: [
        {
          type: "table",
          head: ["Kwestia", "Co warto wiedzieć"],
          rows: [
            ["Który sąd", "Okręgowy. Zwykle tam, gdzie ostatnio mieszkaliście razem, jeśli jedno z Was nadal tam mieszka. Jeśli nie, sąd pozwanego, a gdy i tego brak, powoda."],
            ["Opłata", "600 zł. Możesz wnioskować o zwolnienie od kosztów."],
            ["Egzemplarze", "Pozew i załączniki z odpisem dla drugiej strony."],
            ["Wina", "Wnosisz o rozwód z orzekaniem o winie lub bez. Bez winy sąd orzeka na zgodne żądanie obojga."],
            ["Próba mediacji", "Piszesz, czy była próba mediacji lub innego polubownego rozwiązania. Jeśli nie, wyjaśniasz dlaczego."],
          ],
        },
        {
          type: "checklist",
          items: [
            "Odpis aktu małżeństwa (z urzędu stanu cywilnego; można zamówić online przez gov.pl).",
            "Odpisy aktów urodzenia wspólnych małoletnich dzieci.",
            "Dowód uiszczenia opłaty 600 zł (lub wniosek o zwolnienie od kosztów).",
            "Dokumenty o dochodach i kosztach dzieci, jeśli wnosisz o alimenty.",
            "Porozumienie rodzicielskie, jeśli je macie.",
            "Dokumenty próby mediacji: zaproszenie do mediacji, odpowiedź drugiej strony (albo jej brak), pisemne potwierdzenie od mediatora.",
            "Wnioski dowodowe (np. świadkowie), jeśli są potrzebne.",
            "Odpis pozwu i załączników dla drugiej strony.",
          ],
        },
        {
          type: "callout",
          tone: "info",
          text: "Pełna lista dokumentów, także do majątku i kredytu, jest w Checkliście dokumentów do rozwodu.",
        },
      ],
    },
    {
      heading: "Etap 5–6: rozprawa i wyrok",
      intro:
        "Na rozprawie sąd wysłuchuje stron i ewentualnie świadków. Gdy są małoletnie dzieci, dokładnie bada ich opiekę i utrzymanie.",
      blocks: [
        {
          type: "table",
          head: ["Element wyroku", "Co to oznacza"],
          rows: [
            ["Władza rodzicielska", "Kto i w jakim zakresie ją wykonuje."],
            ["Kontakty", "Jak drugi rodzic będzie się kontaktował z dzieckiem."],
            ["Alimenty na dzieci", "Ile każdy z rodziców łoży na dzieci."],
            ["Wspólne mieszkanie", "Jak z niego korzystacie, jeśli nadal mieszkacie razem."],
            ["Wina", "Kto ponosi winę albo brak orzekania o winie na Wasze zgodne żądanie."],
            ["Podział majątku", "Tylko na wniosek i jeśli nie opóźni nadmiernie sprawy."],
          ],
          caption: "Typowe elementy wyroku rozwodowego",
        },
        {
          type: "p",
          text: "Alimenty między byłymi małżonkami to osobny temat. Ich zakres zależy m.in. od orzeczenia o winie. Omów to z prawnikiem przed pozwem.",
        },
        {
          type: "p",
          text: "Wyrok jest prawomocny, gdy minie termin na apelację i nikt jej nie złożył. Od tego dnia liczą się skutki rozwodu, np. termin na powrót do nazwiska.",
        },
      ],
    },
    {
      heading: "Separacja jako alternatywa",
      intro:
        "Separacja zmienia sytuację małżonków, ale nie rozwiązuje małżeństwa.",
      blocks: [
        {
          type: "table",
          head: ["", "Rozwód", "Separacja"],
          rows: [
            ["Przesłanka", "Zupełny i trwały rozkład pożycia", "Zupełny rozkład pożycia (nie musi być trwały)"],
            ["Opłata", "600 zł", "600 zł; 100 zł przy zgodnym wniosku obojga"],
            ["Małżeństwo", "Ustaje", "Trwa. Nie można zawrzeć nowego małżeństwa"],
            ["Majątek", "Ustaje wspólność majątkowa", "Powstaje rozdzielność majątkowa"],
            ["Odwracalność", "Nie. Ponowny związek wymaga nowego ślubu", "Tak. Sąd znosi separację na zgodne żądanie"],
          ],
          caption: "Rozwód i separacja w uproszczeniu",
        },
        {
          type: "p",
          text: "Skutki separacji są w wielu punktach podobne do rozwodu. Ustalenia o dzieciach i finansach przygotuj tak samo starannie.",
        },
      ],
    },
    {
      heading: "Etap 7: po wyroku",
      blocks: [
        {
          type: "checklist",
          items: [
            "Nazwisko: chcesz wrócić do nazwiska sprzed ślubu? Złóż oświadczenie w USC lub u konsula w ciągu roku od uprawomocnienia wyroku.",
            "Dokumenty: po zmianie nazwiska wymień dowód osobisty, w razie potrzeby paszport, prawo jazdy i dane u pracodawcy.",
            "Majątek: jeśli nie podzielił go wyrok, ustalcie podział umownie (przy nieruchomościach u notariusza) albo złóżcie wniosek do sądu.",
            "Bank i kredyt: rozwód nie zmienia umowy. Oboje nadal odpowiadacie za cały dług, a zmiana dłużnika wymaga zgody banku.",
            "Konta i pełnomocnictwa: rozdziel wspólne rachunki, odwołaj pełnomocnictwa, zaktualizuj uposażonych w polisach.",
            "Alimenty: ustal termin przelewów i zachowuj potwierdzenia.",
            "Szkoła, przedszkole, lekarz: przekaż nowe ustalenia i kontakty do obojga rodziców.",
          ],
        },
      ],
    },
    {
      heading: "Co dalej?",
      blocks: [
        {
          type: "p",
          text: "Chcesz najpierw zrobić plan i poukładać ustalenia? To dobry kierunek. W Nowym Etapie pomagamy przygotować Plan Rozwodu: dzieci, mieszkanie, kredyt, majątek, zanim powstanie pozew. Możesz też zacząć od arkusza powyżej i wrócić, gdy poczujesz, że to dobry moment.",
        },
      ],
    },
  ],
};
