import type { Material } from "../types";

export const material: Material = {
  slug: "przygotowanie-do-mediacji",
  format: "Zeszyt ćwiczeń",
  coverTitle: "Przygotowanie do mediacji",
  coverSubtitle: "Zeszyt ćwiczeń przed pierwszym spotkaniem",
  coverTone: "dark",
  h1: "Przygotowanie do mediacji rozwodowej — zeszyt ćwiczeń",
  h2: "Uporządkuj priorytety, potrzeby dzieci i fakty finansowe, zanim usiądziesz do rozmowy z mediatorem.",
  promise:
    "Ćwiczenia, dzięki którym przyjdziesz na mediację spokojniejszy, z jasnymi priorytetami i kompletem informacji.",
  forWho: [
    "Dla osób, które rozważają mediację przed złożeniem pozwu lub zostały do niej skierowane przez sąd.",
    "Dla tych, którzy chcą wiedzieć, czego się spodziewać na spotkaniu z mediatorem.",
    "Dla rodziców, którzy chcą wspólnie ustalić plan opieki nad dziećmi.",
    "Dla osób, które obawiają się, że w emocjach zapomną, co jest dla nich naprawdę ważne.",
  ],
  inside: [
    "Czym jest mediacja: dobrowolność, poufność, neutralny mediator, ugoda zatwierdzana przez sąd",
    "Kiedy mediacja może nie być dobrym rozwiązaniem — i gdzie szukać pomocy",
    "Ćwiczenie: moje priorytety",
    "Ćwiczenie: sprawy nienegocjowalne a obszary elastyczne",
    "Ćwiczenie: potrzeby dzieci",
    "Lista faktów finansowych do zebrania i pytania do mediatora",
    "Ćwiczenie: co jeśli się nie porozumiemy?",
  ],
  time: "45–60 min",
  faq: [
    {
      q: "Czy mediacja jest obowiązkowa?",
      a: "Nie. Mediacja jest dobrowolna (art. 183¹ KPC). Jeśli sąd skieruje Was do mediacji, każda ze stron może się temu sprzeciwić — zgodnie z przepisami obowiązującymi od 2026 r. sprzeciw trzeba zgłosić w ciągu tygodnia od skierowania (art. 183⁸ KPC). Możecie też w każdej chwili z niej zrezygnować.",
    },
    {
      q: "Czy to, co powiem na mediacji, może zostać użyte w sądzie?",
      a: "Mediacja nie jest jawna, a mediator ma obowiązek zachować w tajemnicy fakty, o których dowiedział się w związku z mediacją. Przepisy KPC chronią też propozycje ugodowe składane w trakcie mediacji. Szczegóły i wyjątki warto omówić z mediatorem na początku spotkania.",
    },
    {
      q: "Czy ugoda z mediacji jest wiążąca?",
      a: "Ugodę zawartą przed mediatorem może zatwierdzić sąd. Po zatwierdzeniu ma moc prawną ugody zawartej przed sądem. W sprawie rozwodowej ustalenia z mediacji (np. dotyczące dzieci) sąd bierze pod uwagę przy wydawaniu wyroku.",
    },
    {
      q: "Ile kosztuje mediacja?",
      a: "To zależy od tego, czy mediacja jest prywatna, czy skierowana przez sąd, oraz od rodzaju sprawy. Zapytaj mediatora o stawki przed pierwszym spotkaniem i sprawdź aktualne przepisy.",
    },
    {
      q: "Czy mogę przyjść na mediację z prawnikiem?",
      a: "Wiele osób konsultuje się z prawnikiem przed mediacją i przed podpisaniem ugody. O udziale pełnomocnika w samych spotkaniach warto porozmawiać z mediatorem i drugą stroną.",
    },
  ],
  sources: [
    { label: "Kodeks postępowania cywilnego (art. 183¹ i nast., art. 436, art. 445²)", url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19640430296", verified: "2026-11-10" },
    { label: "Kodeks rodzinny i opiekuńczy (art. 58)", url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19640090059", verified: "2026-11-10" },
    { label: "gov.pl — Rozwiąż spór przez mediację", url: "https://www.gov.pl/web/gov/rozwiaz-spor-przez-mediacje", verified: "2026-11-10" },
    { label: "Ministerstwo Sprawiedliwości — Postępowanie mediacyjne w sprawach cywilnych", url: "https://www.gov.pl/web/sprawiedliwosc/postepowanie-mediacyjne-w-sprawach-cywilnych", verified: "2026-11-10" },
  ],
  nextOffer: "mediacja",
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
      heading: "Czym jest mediacja (i czym nie jest)",
      intro:
        "Mediacja to rozmowa z udziałem neutralnej osoby — mediatora — która pomaga Wam samodzielnie wypracować porozumienie. Możecie z niej skorzystać przed sprawą w sądzie albo w jej trakcie, gdy sąd skieruje Was do mediacji (art. 436 i art. 445² KPC).",
      blocks: [
        {
          type: "table",
          head: ["Zasada", "Co to dla Ciebie znaczy"],
          rows: [
            ["Dobrowolność", "Udział w mediacji zależy od Twojej zgody i możesz z niej zrezygnować na każdym etapie (art. 183¹ KPC)."],
            ["Poufność", "Mediacja nie jest jawna, a mediator ma obowiązek zachować w tajemnicy to, czego się dowiedział (przepisy KPC o mediacji)."],
            ["Neutralność", "Mediator nie jest sędzią ani pełnomocnikiem żadnej ze stron. Nie rozstrzyga, kto ma rację."],
            ["Wasza decyzja", "To Wy decydujecie o treści porozumienia. Mediator pomaga rozmawiać i porządkować tematy."],
            ["Moc prawna", "Ugodę zawartą przed mediatorem może zatwierdzić sąd — wtedy ma moc ugody sądowej."],
          ],
          caption: "Podstawowe zasady mediacji",
        },
        {
          type: "p",
          text: "W sprawach rozwodowych mediacja może dotyczyć pojednania, ale najczęściej dotyczy warunków rozstania: opieki nad dziećmi i kontaktów, alimentów, sposobu korzystania z mieszkania i spraw majątkowych. To dokładnie te tematy, które sąd rozstrzyga w wyroku (art. 58 KRO) — dlatego dobrze przygotowana mediacja może bardzo uprościć sprawę sądową.",
        },
        {
          type: "callout",
          tone: "info",
          text: "Zeszyt ma charakter informacyjny. Przed podpisaniem ugody warto skonsultować jej treść z prawnikiem, zwłaszcza w sprawach majątkowych i kredytowych.",
        },
      ],
    },
    {
      heading: "Kiedy mediacja może nie być dobrym rozwiązaniem",
      intro:
        "Mediacja wymaga, by obie strony mogły mówić swobodnie i bez lęku. Nie zawsze jest to możliwe.",
      blocks: [
        {
          type: "checklist",
          items: [
            "W związku występuje lub występowała przemoc — fizyczna, psychiczna, ekonomiczna lub seksualna.",
            "Boisz się drugiej strony albo otrzymujesz groźby.",
            "Jedna strona ma silną przewagę (np. kontroluje wszystkie finanse, informacje, kontakty) i druga nie może swobodnie wyrazić swojego zdania.",
            "Druga strona nadużywa alkoholu lub innych substancji w sposób, który uniemożliwia rzeczową rozmowę.",
            "Czujesz, że zgodzisz się na wszystko, byle tylko mieć spokój.",
          ],
        },
        {
          type: "p",
          text: "Jeśli któryś z tych punktów Cię dotyczy, powiedz o tym mediatorowi przed spotkaniem lub zrezygnuj z mediacji. W takich sytuacjach lepszym rozwiązaniem bywa indywidualna pomoc: prawnika, psychologa, ośrodka interwencji kryzysowej. Masz prawo nie siadać do wspólnego stołu.",
        },
        {
          type: "callout",
          tone: "safety",
          title: "Jeśli jesteś w niebezpieczeństwie",
          text: "W sytuacji bezpośredniego zagrożenia dzwoń pod numer alarmowy 112. Wsparcie, informację i rozmowę zapewnia Ogólnopolski Telefon dla Osób Doznających Przemocy Domowej „Niebieska Linia”: 800 120 002.",
        },
      ],
    },
    {
      heading: "Ćwiczenie 1: moje priorytety i granice",
      intro:
        "W emocjach łatwo walczyć o wszystko naraz. To ćwiczenie pomaga oddzielić to, co naprawdę ważne, od tego, w czym możesz ustąpić. Wypełnij je sam/a, zanim porozmawiasz z drugą stroną.",
      blocks: [
        {
          type: "worksheet",
          title: "Moje priorytety",
          fields: [
            "Trzy najważniejsze dla mnie sprawy (w kolejności):",
            "Dlaczego każda z nich jest dla mnie ważna (jaka potrzeba za nią stoi — bezpieczeństwo, stabilność, czas z dziećmi, spokój finansowy):",
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
          caption: "Wypełnij: co jest dla mnie nienegocjowalne, a gdzie mam pole manewru",
        },
        {
          type: "callout",
          tone: "info",
          title: "Wskazówka",
          text: "Jeśli wszystko wpisujesz jako „nienegocjowalne”, zatrzymaj się. Zapytaj siebie: czego się boję, jeśli tu ustąpię? Często za stanowiskiem stoi potrzeba, którą można zaspokoić na kilka sposobów.",
        },
      ],
    },
    {
      heading: "Ćwiczenie 2: potrzeby dzieci",
      intro:
        "Na mediacji łatwo mówić o „moim czasie” i „twoim czasie”. Spróbuj spojrzeć z perspektywy dziecka — to często pomaga obojgu rodzicom wyjść z okopów.",
      blocks: [
        {
          type: "worksheet",
          title: "Dla każdego dziecka osobno",
          fields: [
            "Imię i wiek dziecka:",
            "Co daje mu poczucie bezpieczeństwa (rytuały, osoby, miejsca):",
            "Szkoła/przedszkole, zajęcia, przyjaciele — co powinno zostać bez zmian:",
            "Szczególne potrzeby (zdrowie, terapia, nauka):",
            "Jak dziecko znosi zmiany i przejścia między domami:",
            "Co dziecko mówiło o rozstaniu (bez wypytywania — to, co samo powiedziało):",
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
        "Rozmowy o pieniądzach są łatwiejsze, gdy opierają się na liczbach, a nie na wrażeniach. Zbierz te informacje przed mediacją (a najlepiej wymieńcie się nimi z drugą stroną).",
      blocks: [
        {
          type: "table",
          head: ["Obszar", "Co przygotować", "Mam?"],
          rows: [
            ["Dochody", "Wynagrodzenie netto, inne dochody, PIT za ostatni rok", ""],
            ["Koszty dzieci", "Miesięczne zestawienie: jedzenie, ubrania, szkoła, zajęcia, leczenie, wakacje", ""],
            ["Koszty mieszkania", "Czynsz/raty, media, ubezpieczenie, podatek od nieruchomości", ""],
            ["Kredyt", "Saldo zadłużenia, wysokość raty, kto jest kredytobiorcą", ""],
            ["Oszczędności i inwestycje", "Stany kont i lokat, fundusze, akcje, PPK/IKE/IKZE", ""],
            ["Nieruchomości i pojazdy", "Orientacyjna wartość, kto jest właścicielem, czy jest hipoteka", ""],
            ["Długi", "Pożyczki, karty kredytowe, leasingi, zaległości", ""],
            ["Majątek osobisty", "Co było przed ślubem, darowizny, spadki (z dokumentami)", ""],
          ],
          caption: "Lista faktów finansowych",
        },
        {
          type: "callout",
          tone: "warning",
          title: "Kredyt a ugoda",
          text: "Nawet jeśli w ugodzie ustalicie, że kredyt spłaca jedna osoba, wobec banku oboje kredytobiorcy nadal odpowiadają solidarnie (art. 366 KC). Zmiana dłużnika wymaga zgody banku (art. 519 KC). Sprawdź w banku możliwości, zanim podpiszesz ustalenia.",
        },
      ],
    },
    {
      heading: "Pytania do mediatora i plan B",
      intro:
        "Masz prawo wiedzieć, jak będzie wyglądać mediacja. Zadaj te pytania podczas pierwszego kontaktu. Potem zastanów się, co zrobisz, jeśli porozumienia nie będzie — to paradoksalnie pomaga spokojniej negocjować.",
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
            "Ile może mnie to kosztować — czasu, pieniędzy, emocji, relacji z dziećmi:",
            "Czego realnie mogę się spodziewać w sądzie (najlepiej omówione z prawnikiem):",
            "Jaka propozycja byłaby dla mnie lepsza niż ta alternatywa:",
            "Poniżej czego nie zejdę — i dlaczego:",
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
      heading: "Co dalej?",
      blocks: [
        {
          type: "p",
          text: "Wypełniony zeszyt to Twoja mapa na mediację. Jeśli chcesz, w Nowym Etapie pomożemy Ci przygotować się do rozmów, uporządkować ustalenia i spisać je w Planie Rozwodu lub porozumieniu — zanim powstanie pozew.",
        },
        {
          type: "p",
          text: "Nie musisz podejmować decyzji od razu. Wróć do ćwiczeń, gdy poczujesz potrzebę, i skontaktuj się z nami, kiedy będziesz gotowy. Pamiętaj: zeszyt ma charakter informacyjny, a ostateczne decyzje warto skonsultować z prawnikiem.",
        },
      ],
    },
  ],
};
