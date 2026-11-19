import type { Material } from "../types";

export const material: Material = {
  slug: "przygotowanie-do-konsultacji",
  format: "Checklista",
  coverTitle: "Pierwsza konsultacja",
  coverSubtitle: "Jak się przygotować do rozmowy z prawnikiem lub mediatorem",
  coverTone: "green",
  h1: "Jak przygotować się do pierwszej konsultacji z prawnikiem lub mediatorem",
  h2: "Co zabrać, jak spisać oś czasu i fakty, o co zapytać i jak porównać specjalistów. Z pierwszej rozmowy wychodzisz z planem, nie od razu z pozwem.",
  promise:
    "Przyjdziesz na konsultację z dokumentami, faktami i pytaniami i wykorzystasz ten czas na to, co ważne.",
  forWho: [
    "Planujesz pierwszą rozmowę z adwokatem, radcą prawnym lub mediatorem.",
    "Nie wiesz, co zabrać i od czego zacząć.",
    "Chcesz porównać kilku specjalistów.",
    "Boisz się, że przez emocje zapomnisz o czymś ważnym.",
  ],
  inside: [
    "Checklistę dokumentów.",
    "Arkusz osi czasu.",
    "Kartę kluczowych faktów: małżeństwo, dzieci, majątek, dochody.",
    "Pytania o koszty, sposób pracy, ryzyka, porozumienie i mediację przed pozwem.",
    "Porównanie ról: adwokat i radca prawny, mediator, psycholog.",
    "Kilka słów o tajemnicy zawodowej.",
    "Przygotowanie emocjonalne i notatkę po spotkaniu.",
  ],
  time: "15 min",
  faq: [
    {
      q: "Po co iść do prawnika, skoro nie chcę jeszcze składać pozwu?",
      a: "Właśnie dlatego. Poznasz opcje i ryzyka, zanim zaczniesz rozmowy z drugą stroną.",
    },
    {
      q: "Czy warto próbować mediacji, jeśli druga strona prawdopodobnie odmówi?",
      a: "Często tak, ale omów to z prawnikiem. Udokumentowana próba pokazuje twoją dobrą wolę, choć nie gwarantuje wyniku. Przy przemocy, groźbach lub kontroli nie musisz proponować mediacji.",
    },
    {
      q: "Czy muszę mieć wszystkie dokumenty?",
      a: "Nie. Zabierz to, co masz. Oś czasu i karta faktów są często ważniejsze niż komplet dokumentów.",
    },
    {
      q: "Czym różni się adwokat lub radca prawny od mediatora?",
      a: "Adwokat i radca prawny doradzają tobie i mogą reprezentować cię w sądzie. Mediator jest bezstronny i pomaga wam obojgu wypracować porozumienie.",
    },
    {
      q: "Czy to, co powiem prawnikowi, zostanie między nami?",
      a: "Adwokatów i radców obowiązuje tajemnica zawodowa, z wyjątkami w przepisach. Zapytaj o nią na początku.",
    },
    {
      q: "Czy pierwsza konsultacja jest płatna?",
      a: "To zależy od specjalisty. Zapytaj o koszt przed umówieniem spotkania.",
    },
    {
      q: "Czy mogę przyjść z kimś bliskim?",
      a: "Zapytaj wcześniej. Obecność osoby trzeciej może wpłynąć na poufność rozmowy.",
    },
  ],
  sources: [
    {
      label: "Kodeks rodzinny i opiekuńczy (m.in. art. 56, 58, 97 § 2, 113 i nast.)",
      url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19640090059",
      verified: "2026-11-10",
    },
    {
      label: "Kodeks postępowania cywilnego, art. 183¹ i nast. (mediacja)",
      url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19640430296",
      verified: "2026-11-10",
    },
    {
      label: "Kodeks postępowania cywilnego: art. 103, art. 187 § 1 pkt 3",
      url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19640430296",
      verified: "2026-11-16",
    },
    {
      label: "Mediacje: gov.pl",
      url: "https://www.gov.pl/web/gov/rozwiaz-spor-przez-mediacje",
      verified: "2026-11-10",
    },
  ],
  nextOffer: "konsultacja",
  stage: 1,
  ctaLabel: "Umów konsultację i zacznij od planu",
  seo: {
    title: "Pierwsza konsultacja z prawnikiem: checklista | Nowy Etap",
    description:
      "Jak przygotować się do konsultacji z prawnikiem rodzinnym lub mediatorem: dokumenty, oś czasu, karta faktów, pytania o koszty i porównanie specjalistów.",
  },
  coverPrompt:
    "Photorealistic 3D render of a standing hardcover booklet at a slight angle on a warm off-white (#FCF9F8) background with a soft natural shadow. Deep green (#295550) cover with dark green (#263D3A) details and fine gold (#C79B59) accents, including a few minimal gold checkbox marks. Minimalist premium typography. Small wordmark text at the top: \"NOWY ETAP · PORADNIA ROZWODOWA\". Exact cover title: \"Pierwsza konsultacja\". Exact subtitle: \"Jak się przygotować do rozmowy z prawnikiem lub mediatorem\". Small label \"CHECKLISTA\". A subtle thin gold staircase line motif. No gavels, no paragraph symbols, no scales of justice, no people, no wedding rings. Square 1:1 composition, high detail, keep text minimal and exactly as written.",
  sections: [
    {
      heading: "Po co się przygotowywać",
      intro: "Konsultacja trwa zwykle do godziny. Nie trać jej na szukanie dat i dokumentów.",
      blocks: [
        {
          type: "path",
          current: 1,
          note: "Konsultacja to część planu, nie start sprawy w sądzie. Najpierw rozumiesz swoją sytuację, potem próbujecie ustaleń.",
        },
        {
          type: "list",
          items: [
            "Specjalista szybciej zrozumie sytuację.",
            "Łatwiej porównasz specjalistów.",
            "Masz wszystko zapisane, nawet gdy pojawią się emocje.",
            "Wyjdziesz z listą kolejnych kroków.",
          ],
        },
        {
          type: "callout",
          tone: "info",
          text: "Nie musisz mieć gotowych decyzji. Ten materiał ma charakter informacyjny i nie zastępuje porady prawnej.",
        },
      ],
    },
    {
      heading: "Co zabrać na konsultację",
      intro: "Zaznacz to, co masz. Zwykle wystarczą kopie.",
      blocks: [
        {
          type: "checklist",
          items: [
            "Dokument tożsamości",
            "Odpis aktu małżeństwa (jeśli masz)",
            "Odpisy aktów urodzenia dzieci (jeśli masz)",
            "Umowa majątkowa małżeńska (intercyza), jeśli była zawarta",
            "Wcześniejsze orzeczenia, ugody lub pisma z sądu (np. w sprawie alimentów, kontaktów, separacji)",
            "Dokumenty dotyczące nieruchomości: numer księgi wieczystej, akt notarialny",
            "Umowy kredytowe i aktualne harmonogramy spłat",
            "Informacje o dochodach (np. PIT, zaświadczenie o zarobkach): twoich i, jeśli znasz, drugiej osoby",
            "Zestawienie stałych kosztów życia i wydatków na dzieci",
            "Ważna korespondencja z drugą osobą (wybrane wydruki lub zrzuty ekranu)",
            "Dokumentacja dotycząca przemocy, jeśli występowała (zgłoszenia, dokumentacja medyczna)",
            "Wypełniona oś czasu i karta faktów z tego materiału",
            "Lista pytań",
          ],
        },
      ],
    },
    {
      heading: "Oś czasu i karta kluczowych faktów",
      intro: "Wystarczą daty (także przybliżone) i jedno zdanie opisu.",
      blocks: [
        {
          type: "table",
          head: ["Data (przybliżona)", "Wydarzenie", "Dokumenty / świadkowie"],
          rows: [
            ["[rok]", "Zawarcie małżeństwa", "Akt małżeństwa"],
            ["[rok]", "Narodziny dziecka / dzieci", "Akty urodzenia"],
            ["[rok]", "Zakup mieszkania / zaciągnięcie kredytu", "Akt notarialny, umowa kredytu"],
            ["[miesiąc, rok]", "Początek kryzysu w związku", ""],
            ["[miesiąc, rok]", "Wyprowadzka / zamieszkanie osobno", ""],
            ["[miesiąc, rok]", "Ostatnie wspólne ustalenia (np. dzieci, pieniądze)", ""],
            ["", "", ""],
            ["", "", ""],
          ],
        },
        {
          type: "worksheet",
          title: "Karta kluczowych faktów",
          fields: [
            "Data zawarcia małżeństwa i miejsce (USC)",
            "Ustrój majątkowy: wspólność ustawowa / rozdzielność / inny",
            "Dzieci: imiona (lub inicjały) i wiek",
            "Z kim obecnie mieszkają dzieci i jak wyglądają kontakty z drugim rodzicem",
            "Od kiedy mieszkacie osobno (jeśli tak)",
            "Najważniejsze składniki majątku (nieruchomości, samochody, oszczędności, firma)",
            "Wspólne długi i kredyty",
            "Mój dochód miesięczny netto (przedział)",
            "Dochód drugiej osoby (przedział, jeśli znasz)",
            "Czy rozważacie porozumienie lub mediację?",
            "Czy któraś ze stron proponowała już mediację lub inne polubowne rozwiązanie? Kiedy, w jakiej formie i z jaką odpowiedzią?",
            "Czy w relacji występuje przemoc lub zagrożenie?",
          ],
        },
        {
          type: "callout",
          tone: "info",
          text: "Wystarczą przedziały dochodów (np. 6–8 tys. zł netto). Dokładne kwoty zbierzecie później.",
        },
      ],
    },
    {
      heading: "Pytania, które warto zadać",
      intro: "Wybierz najważniejsze. Kolejność: sytuacja, ustalenia, sprawa i koszty.",
      blocks: [
        {
          type: "checklist",
          items: [
            "Jakie widzi Pan/Pani możliwe scenariusze w mojej sytuacji?",
            "Jakie są główne ryzyka i na co powinienem uważać już teraz?",
            "Czego nie robić, zanim podejmę decyzję (np. w sprawie wyprowadzki, pieniędzy, dzieci)?",
            "Czy w mojej sprawie realne jest porozumienie lub mediacja? Jak to wygląda w praktyce?",
            "Jak zaprosić drugą stronę do mediacji i jak udokumentować tę próbę?",
            "Które sprawy (dzieci, mieszkanie, kredyt, majątek) możemy uzgodnić przed pozwem i jak je zapisać?",
            "Co napisać w pozwie o próbach polubownego rozwiązania sporu?",
            "Jak zmieni się przebieg i koszt sprawy, jeśli dojdziemy do porozumienia, a jak, jeśli nie?",
            "Jak orientacyjnie może wyglądać przebieg sprawy i od czego zależy czas jej trwania?",
            "Jakie dokumenty muszę zebrać i w jakiej kolejności?",
            "Jakie są koszty: konsultacji, prowadzenia sprawy, opłat sądowych? Jak rozliczana jest współpraca (stała kwota, stawka godzinowa, etapy)?",
            "Jak będziemy się kontaktować i jak szybko mogę spodziewać się odpowiedzi?",
            "Kto konkretnie będzie prowadził moją sprawę?",
            "Jakie ma Pan/Pani doświadczenie w sprawach rodzinnych podobnych do mojej?",
            "Co mogę zrobić sam, żeby obniżyć koszty i przyspieszyć sprawy?",
          ],
        },
        {
          type: "callout",
          tone: "warning",
          title: "Uważaj na obietnice",
          text: "Rzetelny specjalista mówi o scenariuszach i ryzykach, a nie gwarantuje wyniku.",
        },
      ],
    },
    {
      heading: "Porozumienie i mediacja przed pozwem",
      intro: "Zapytaj o to już na pierwszym spotkaniu.",
      blocks: [
        {
          type: "list",
          items: [
            "Sprawy uzgodnione wcześniej, np. porozumienie rodzicielskie, sąd może uwzględnić w wyroku.",
            "Bez sporu o winę, dzieci i mieszkanie sprawa często kończy się na jednej rozprawie.",
            "Pozew pisany na gotowych ustaleniach jest konkretny.",
          ],
        },
        { type: "mediationAttempt" },
      ],
    },
    {
      heading: "Kto jest kim: jak porównać specjalistów",
      blocks: [
        {
          type: "table",
          head: ["Specjalista", "Rola", "Kiedy może pomóc", "Ważne"],
          rows: [
            [
              "Adwokat / radca prawny",
              "Twój pełnomocnik: doradza, pisze pisma, może reprezentować cię w sądzie.",
              "Ocena prawna, plan, negocjacje, porozumienie, pozew.",
              "Działa w twoim interesie. Obowiązuje go tajemnica zawodowa.",
            ],
            [
              "Mediator",
              "Bezstronna osoba, która pomaga obu stronom wypracować porozumienie.",
              "Ustalenia o dzieciach, majątku, alimentach.",
              "Nie reprezentuje żadnej strony. Mediacja jest dobrowolna i co do zasady poufna.",
            ],
            [
              "Psycholog / terapeuta",
              "Wsparcie emocjonalne, pomoc w kryzysie, wsparcie dzieci.",
              "Gdy emocje utrudniają decyzje lub martwisz się o dziecko.",
              "Nie udziela porad prawnych.",
            ],
          ],
        },
        {
          type: "worksheet",
          title: "Porównanie po konsultacjach",
          fields: [
            "Specjalista 1: imię i nazwisko, koszt, sposób pracy, moje wrażenie",
            "Specjalista 2: imię i nazwisko, koszt, sposób pracy, moje wrażenie",
            "Specjalista 3: imię i nazwisko, koszt, sposób pracy, moje wrażenie",
            "Kto najlepiej wyjaśnił moje opcje prostym językiem?",
            "Z kim czuję się bezpiecznie i swobodnie?",
          ],
        },
      ],
    },
    {
      heading: "Przygotowanie emocjonalne",
      intro: "Łzy, złość albo pustka w głowie podczas takiej rozmowy są normalne.",
      blocks: [
        {
          type: "checklist",
          items: [
            "Zaplanuj spotkanie tak, by nie musieć biec od razu do pracy czy po dziecko.",
            "Zabierz wodę, chusteczki i notes z pytaniami.",
            "Zapisz trzy najważniejsze rzeczy, które chcesz wiedzieć po spotkaniu.",
            "Możesz poprosić o przerwę.",
            "Poproś o powtórzenie lub wyjaśnienie, jeśli coś jest niejasne.",
            "Jeśli to możliwe, zapytaj o zgodę na nagranie lub rób notatki.",
            "Zaplanuj coś dobrego dla siebie po spotkaniu.",
          ],
        },
        {
          type: "worksheet",
          title: "Po spotkaniu (wypełnij tego samego dnia)",
          fields: [
            "Trzy najważniejsze rzeczy, które usłyszałem/usłyszałam",
            "Co mam zrobić w ciągu najbliższych 7 dni",
            "Pytania, które pojawiły się po spotkaniu",
            "Jak się czuję po tej rozmowie",
          ],
        },
        {
          type: "callout",
          tone: "safety",
          title: "Gdy chodzi o bezpieczeństwo",
          text: "Przemoc zgłoś na początku konsultacji, bo wpływa na wybór drogi. W zagrożeniu: 112. Niebieska Linia: 800 120 002. Wsparcie w kryzysie: 116 123.",
        },
      ],
    },
    {
      heading: "Co dalej?",
      blocks: [
        {
          type: "p",
          text: "Po konsultacji: plan, potem rozmowy lub mediacja, na końcu pozew. W Nowym Etapie umówisz konsultację, Plan Rozwodu albo mediację.",
        },
      ],
    },
  ],
};
