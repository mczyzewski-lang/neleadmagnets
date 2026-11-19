import type { Material } from "../types";

export const material: Material = {
  slug: "przygotowanie-do-mediacji",
  format: "Zeszyt ćwiczeń",
  coverTitle: "Przygotowanie do mediacji",
  coverSubtitle: "Zeszyt ćwiczeń przed pierwszym spotkaniem",
  coverTone: "dark",
  h1: "Przygotowanie do mediacji rozwodowej: zeszyt ćwiczeń",
  h2: "Uporządkuj priorytety, potrzeby dzieci i fakty finansowe, zanim usiądziesz z mediatorem.",
  promise:
    "Ćwiczenia, dzięki którym przyjdziesz na mediację spokojniejszy, z jasnymi priorytetami i kompletem informacji.",
  forWho: [
    "Dla osób, które rozważają mediację przed pozwem lub zostały do niej skierowane przez sąd.",
    "Dla tych, którzy chcą wiedzieć, czego się spodziewać.",
    "Dla rodziców, którzy chcą ustalić plan opieki nad dziećmi.",
    "Dla osób, które boją się, że w emocjach zapomną, co jest ważne.",
  ],
  inside: [
    "Czym jest mediacja i czym różni się od zwykłych rozmów",
    "Kiedy mediacja nie jest dobrym pomysłem",
    "Ćwiczenie: priorytety i granice",
    "Ćwiczenie: potrzeby dzieci",
    "Fakty finansowe i pytania do mediatora",
    "Ćwiczenie: co jeśli się nie porozumiemy?",
    "Arkusz „Moja próba mediacji”",
  ],
  time: "40–50 min",
  faq: [
    {
      q: "Czy mediacja jest obowiązkowa?",
      a: "Nie, jest dobrowolna. Gdy sąd skieruje Was do mediacji, możesz się sprzeciwić w ciągu tygodnia. Z mediacji można też zrezygnować w każdej chwili.",
    },
    {
      q: "Jak zacząć mediację?",
      a: "Zwykle od zaproszenia do mediacji. Wysyłasz je sam/a albo wysyła je wybrany mediator lub ośrodek. Formalny wniosek doręczany drugiej stronie to tylko jedna z możliwości.",
    },
    {
      q: "Co, jeśli druga strona odmówi mediacji?",
      a: "Próba i tak się liczy. W pozwie piszesz, czy była próba mediacji, a jeśli nie, dlaczego. Przy wyraźnej odmowie mediator może to potwierdzić na piśmie. Próba nie przesądza o wyniku. Przy przemocy, groźbach lub kontroli nie musisz jej proponować.",
    },
    {
      q: "Czy to, co powiem na mediacji, może zostać użyte w sądzie?",
      a: "Mediacja jest poufna, a mediator musi zachować tajemnicę. Chronione są też propozycje ugodowe. Wyjątki omów z mediatorem na początku.",
    },
    {
      q: "Czy ugoda z mediacji jest wiążąca?",
      a: "Po zatwierdzeniu przez sąd ma moc ugody sądowej. W sprawie rozwodowej sąd bierze ustalenia z mediacji pod uwagę.",
    },
    {
      q: "Ile kosztuje mediacja?",
      a: "Zależy, czy jest prywatna, czy skierowana przez sąd. Zapytaj mediatora o stawki przed pierwszym spotkaniem.",
    },
    {
      q: "Czy mogę przyjść na mediację z prawnikiem?",
      a: "Wiele osób konsultuje się z prawnikiem przed mediacją i przed podpisaniem ugody. Udział pełnomocnika w spotkaniach ustal z mediatorem i drugą stroną.",
    },
  ],
  sources: [
    { label: "Kodeks postępowania cywilnego (art. 103, art. 183¹ i nast., art. 187 § 1 pkt 3, art. 436, art. 445²)", url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19640430296", verified: "2026-11-16" },
    { label: "Kodeks rodzinny i opiekuńczy (art. 58)", url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19640090059", verified: "2026-11-10" },
    { label: "gov.pl: Rozwiąż spór przez mediację", url: "https://www.gov.pl/web/gov/rozwiaz-spor-przez-mediacje", verified: "2026-11-10" },
    { label: "Ministerstwo Sprawiedliwości: Postępowanie mediacyjne w sprawach cywilnych", url: "https://www.gov.pl/web/sprawiedliwosc/postepowanie-mediacyjne-w-sprawach-cywilnych", verified: "2026-11-10" },
  ],
  nextOffer: "mediacja",
  stage: 2,
  ctaLabel: "Porozmawiaj o mediacji z Nowym Etapem",
  seo: {
    title: "Przygotowanie do mediacji rozwodowej | Nowy Etap",
    description:
      "Zeszyt ćwiczeń przed mediacją rozwodową: priorytety, potrzeby dzieci, finanse, pytania do mediatora i plan B. Bezpłatnie, do wypełnienia online.",
  },
  coverPrompt:
    "Photorealistic 3D render of a standing spiral-bound workbook at a slight angle on a warm off-white (#FCF9F8) background with a soft natural shadow. The cover is dark green (#263D3A) with a deep green (#295550) inner panel and gold (#C79B59) typography and accents. Minimalist premium typography. Render this exact text, spelled exactly, and keep all text minimal: small wordmark at the top \"NOWY ETAP · PORADNIA ROZWODOWA\"; main title \"Przygotowanie do mediacji\"; subtitle \"Zeszyt ćwiczeń przed pierwszym spotkaniem\". A subtle thin gold staircase line motif (a stylised ascending step line) across the lower third. No gavels, no paragraph symbols, no people, no handshakes, no wedding rings, no other text. Square 1:1 composition, high detail, elegant studio lighting.",
  sections: [
    {
      heading: "Czym jest mediacja",
      intro:
        "Rozmowy to Wasze próby dogadania się. Mediacja to spotkania z bezstronnym mediatorem, który pomaga Wam samym wypracować porozumienie. Najwięcej daje przed pozwem.",
      blocks: [
        {
          type: "path",
          current: 2,
          note: "Na mediację przychodzisz z planem. To, co uzgodnicie, trafia do pozwu jako gotowe porozumienie.",
        },
        {
          type: "table",
          head: ["Zasada", "Co to znaczy"],
          rows: [
            ["Dobrowolność", "Uczestniczysz za zgodą i możesz zrezygnować w każdej chwili."],
            ["Poufność", "Mediacja nie jest jawna, mediator zachowuje tajemnicę."],
            ["Bezstronność", "Mediator nie jest sędzią ani pełnomocnikiem. Nie rozstrzyga, kto ma rację."],
            ["Wasza decyzja", "O treści porozumienia decydujecie Wy."],
            ["Moc prawna", "Ugoda zatwierdzona przez sąd ma moc ugody sądowej."],
          ],
          caption: "Zasady mediacji",
        },
        {
          type: "p",
          text: "W rozwodzie mediacja dotyczy zwykle warunków rozstania: opieki, kontaktów, alimentów, mieszkania i majątku. To te same sprawy, które sąd rozstrzyga w wyroku.",
        },
        {
          type: "callout",
          tone: "info",
          text: "Zeszyt ma charakter informacyjny. Przed podpisaniem ugody, zwłaszcza majątkowej, skonsultuj ją z prawnikiem.",
        },
      ],
    },
    {
      heading: "Kiedy mediacja nie jest dobrym pomysłem",
      intro:
        "Mediacja wymaga, by obie strony mogły mówić swobodnie i bez lęku.",
      blocks: [
        {
          type: "checklist",
          items: [
            "Jest lub była przemoc: fizyczna, psychiczna, ekonomiczna lub seksualna.",
            "Boisz się drugiej strony albo dostajesz groźby.",
            "Jedna strona kontroluje finanse, informacje lub kontakty i druga nie może swobodnie mówić.",
            "Druga strona nadużywa alkoholu lub innych substancji tak, że rzeczowa rozmowa jest niemożliwa.",
            "Czujesz, że zgodzisz się na wszystko, byle mieć spokój.",
          ],
        },
        {
          type: "p",
          text: "Jeśli coś z tego Cię dotyczy, powiedz o tym mediatorowi przed spotkaniem albo zrezygnuj. Masz prawo nie siadać do wspólnego stołu. W pozwie wyjaśnisz wtedy, dlaczego nie było mediacji. Przygotuj to z prawnikiem.",
        },
        {
          type: "callout",
          tone: "safety",
          title: "Jeśli jesteś w niebezpieczeństwie",
          text: "W bezpośrednim zagrożeniu dzwoń pod 112. Wsparcie: „Niebieska Linia” 800 120 002.",
        },
      ],
    },
    {
      heading: "Ćwiczenie 1: moje priorytety i granice",
      intro:
        "Oddziel to, co naprawdę ważne, od tego, w czym możesz ustąpić. Wypełnij samodzielnie, przed rozmową.",
      blocks: [
        {
          type: "worksheet",
          title: "Moje priorytety",
          fields: [
            "Trzy najważniejsze dla mnie sprawy (w kolejności):",
            "Dlaczego każda z nich jest dla mnie ważna (jaka potrzeba za nią stoi: bezpieczeństwo, stabilność, czas z dziećmi, spokój finansowy):",
            "Jak będzie wyglądało moje życie za rok, jeśli porozumienie się uda:",
          ],
        },
        {
          type: "table",
          head: ["Temat", "Nienegocjowalne (dlaczego?)", "Elastyczne (w jakim zakresie?)"],
          rows: [
            ["Miejsce zamieszkania dzieci", "", ""],
            ["Grafik kontaktów, święta, wakacje", "", ""],
            ["Alimenty i dodatkowe koszty", "", ""],
            ["Mieszkanie / dom", "", ""],
            ["Kredyt", "", ""],
            ["Samochód, oszczędności, inne składniki majątku", "", ""],
            ["Sposób komunikacji po rozstaniu", "", ""],
          ],
          caption: "Co jest nienegocjowalne, a gdzie mam pole manewru",
        },
        {
          type: "callout",
          tone: "info",
          title: "Wskazówka",
          text: "Wszystko jest „nienegocjowalne”? Zapytaj siebie: czego się boję, jeśli tu ustąpię? Za stanowiskiem zwykle stoi potrzeba, którą da się zaspokoić na kilka sposobów.",
        },
      ],
    },
    {
      heading: "Ćwiczenie 2: potrzeby dzieci",
      intro:
        "Spójrz z perspektywy dziecka, a nie „mojego” i „twojego” czasu.",
      blocks: [
        {
          type: "worksheet",
          title: "Dla każdego dziecka osobno",
          fields: [
            "Imię i wiek dziecka:",
            "Co daje mu poczucie bezpieczeństwa (rytuały, osoby, miejsca):",
            "Szkoła/przedszkole, zajęcia, przyjaciele: co powinno zostać bez zmian:",
            "Szczególne potrzeby (zdrowie, terapia, nauka):",
            "Jak dziecko znosi zmiany i przejścia między domami:",
            "Co dziecko mówiło o rozstaniu (bez wypytywania, to, co samo powiedziało):",
            "Czego dziecko potrzebuje od każdego z rodziców:",
          ],
        },
        {
          type: "checklist",
          items: [
            "Plan zwykłego tygodnia (dni, godziny, przekazania).",
            "Weekendy, ferie, wakacje letnie.",
            "Święta i ważne daty (urodziny, Dzień Matki, Dzień Ojca).",
            "Decyzje o szkole, leczeniu, wyjazdach za granicę, paszporcie.",
            "Kontakt telefoniczny/wideo z rodzicem, u którego dziecko akurat nie przebywa.",
            "Wspólne zasady w obu domach (ekrany, pora snu, kieszonkowe).",
            "Sposób informowania się nawzajem i rozwiązywania przyszłych sporów.",
          ],
        },
      ],
    },
    {
      heading: "Fakty finansowe do zebrania",
      intro:
        "O pieniądzach łatwiej rozmawiać na liczbach. Zbierz je przed mediacją, najlepiej wymieńcie się nimi.",
      blocks: [
        {
          type: "table",
          head: ["Obszar", "Co przygotować", "Mam?"],
          rows: [
            ["Dochody", "Wynagrodzenie netto, inne dochody, PIT za ostatni rok", ""],
            ["Koszty dzieci", "Miesięczne zestawienie: jedzenie, ubrania, szkoła, zajęcia, leczenie, wakacje", ""],
            ["Koszty mieszkania", "Czynsz lub raty, media, ubezpieczenie, podatek", ""],
            ["Kredyt", "Saldo, rata, kto jest kredytobiorcą", ""],
            ["Oszczędności i inwestycje", "Konta, lokaty, fundusze, akcje, PPK/IKE/IKZE", ""],
            ["Nieruchomości i pojazdy", "Orientacyjna wartość, właściciel, hipoteka", ""],
            ["Długi", "Pożyczki, karty kredytowe, leasingi, zaległości", ""],
            ["Majątek osobisty", "Sprzed ślubu, darowizny, spadki (z dokumentami)", ""],
          ],
          caption: "Lista faktów finansowych",
        },
        {
          type: "callout",
          tone: "warning",
          title: "Kredyt a ugoda",
          text: "Ugoda nie zmienia umowy z bankiem. Wobec banku oboje nadal odpowiadacie za cały dług, a zmiana dłużnika wymaga zgody banku. Sprawdź to, zanim podpiszesz ustalenia.",
        },
      ],
    },
    {
      heading: "Pytania do mediatora i plan B",
      intro:
        "Zadaj te pytania przy pierwszym kontakcie. Potem zastanów się, co zrobisz bez porozumienia. To pomaga negocjować spokojniej.",
      blocks: [
        {
          type: "checklist",
          items: [
            "Jakie ma Pan/Pani doświadczenie w mediacjach rodzinnych?",
            "Ile zwykle trwa spotkanie i ile spotkań może być potrzebnych?",
            "Ile kosztuje mediacja i kto ponosi koszty?",
            "Czy możliwe są spotkania indywidualne (osobno z każdą stroną)?",
            "Jak wygląda poufność i czy są od niej wyjątki?",
            "Czy mediacja może odbyć się online?",
            "Jak powstaje ugoda i jak wygląda jej zatwierdzenie przez sąd?",
            "Co się stanie, jeśli w trakcie poczuję się niekomfortowo lub zechcę przerwać?",
          ],
        },
        {
          type: "worksheet",
          title: "Co jeśli się nie porozumiemy?",
          fields: [
            "Moja najlepsza realna alternatywa bez porozumienia (np. sprawa w sądzie, osobne ustalenia z pomocą prawnika):",
            "Ile może mnie to kosztować (czasu, pieniędzy, emocji, relacji z dziećmi):",
            "Czego realnie mogę się spodziewać w sądzie (najlepiej omówione z prawnikiem):",
            "Jaka propozycja byłaby dla mnie lepsza niż ta alternatywa:",
            "Poniżej czego nie zejdę i dlaczego:",
            "Co mogę zaproponować, żeby druga strona też zyskała:",
          ],
        },
        {
          type: "script",
          title: "Zdania, które pomagają na mediacji",
          lines: [
            { label: "Gdy rosną emocje", text: "Potrzebuję krótkiej przerwy, żeby wrócić do rozmowy spokojniej." },
            { label: "Gdy nie rozumiesz", text: "Czy możesz powiedzieć, co jest dla ciebie najważniejsze w tej propozycji?" },
            { label: "Gdy potrzebujesz czasu", text: "Chcę to przemyśleć i skonsultować, zanim się zgodzę. Wróćmy do tego na następnym spotkaniu." },
            { label: "Zamiast oskarżenia", text: "Martwię się o… Potrzebuję… Czy możemy poszukać rozwiązania, które to uwzględni?" },
          ],
        },
      ],
    },
    {
      heading: "Moja próba mediacji",
      intro:
        "Druga strona może odmówić albo przerwać mediację. Twoja próba i tak się liczy, jeśli zostawisz po niej ślad.",
      blocks: [
        { type: "mediationAttempt" },
        {
          type: "list",
          ordered: true,
          items: [
            "Wybierz mediatora lub ośrodek.",
            "Wyślij drugiej stronie zaproszenie do mediacji albo poproś o to mediatora. Wybierz formę, którą da się potwierdzić (e-mail, list, wiadomość od mediatora).",
            "Zachowaj zaproszenie, odpowiedź (albo informację, że jej nie było) i korespondencję.",
            "Przy wyraźnej odmowie poproś mediatora o pisemne potwierdzenie.",
            "W pozwie napisz, że była próba mediacji, i wskaż te dokumenty.",
          ],
        },
        {
          type: "worksheet",
          title: "Moja próba mediacji",
          fields: [
            "Data wysłania zaproszenia do mediacji:",
            "Mediator lub ośrodek mediacyjny (imię i nazwisko / nazwa, kontakt):",
            "Kto i jak wysłał zaproszenie (ja, mediator; e-mail, list, telefon):",
            "Odpowiedź drugiej strony (data, treść w skrócie):",
            "Przebieg lub wynik (spotkania, ugoda, częściowe ustalenia, brak zgody):",
            "Dokumenty, które zachowuję (zaproszenie, odpowiedź, korespondencja, potwierdzenie od mediatora):",
            "Gdzie je przechowuję (folder, skany w chmurze):",
          ],
        },
      ],
    },
    {
      heading: "Co dalej?",
      blocks: [
        {
          type: "p",
          text: "Wypełniony zeszyt to Twoja mapa na mediację. W Nowym Etapie pomożemy Ci przygotować się do rozmów i spisać ustalenia w Planie Rozwodu lub porozumieniu, zanim powstanie pozew. Zeszyt jest informacyjny, decyzje skonsultuj z prawnikiem.",
        },
      ],
    },
  ],
};
