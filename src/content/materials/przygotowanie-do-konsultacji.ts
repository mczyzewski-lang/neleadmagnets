import type { Material } from "../types";

export const material: Material = {
  slug: "przygotowanie-do-konsultacji",
  format: "Checklista",
  coverTitle: "Pierwsza konsultacja",
  coverSubtitle: "Jak się przygotować do rozmowy z prawnikiem lub mediatorem",
  coverTone: "green",
  h1: "Jak przygotować się do pierwszej konsultacji z prawnikiem lub mediatorem",
  h2: "Co zabrać, jak spisać oś czasu i najważniejsze fakty, o co zapytać i jak porównać specjalistów — żeby z pierwszej rozmowy wyjść z planem.",
  promise:
    "Przyjdziesz na pierwszą konsultację przygotowany: z dokumentami, faktami i pytaniami — i wykorzystasz ten czas na to, co naprawdę ważne.",
  forWho: [
    "Planujesz pierwszą rozmowę z adwokatem, radcą prawnym lub mediatorem.",
    "Nie wiesz, jakie dokumenty zabrać i od czego zacząć opowieść.",
    "Chcesz wiedzieć, o co pytać, żeby porównać kilku specjalistów.",
    "Boisz się, że emocje sprawią, że zapomnisz o czymś ważnym.",
  ],
  inside: [
    "Checklistę dokumentów do zabrania na konsultację.",
    "Arkusz osi czasu najważniejszych wydarzeń.",
    "Kartę kluczowych faktów: małżeństwo, dzieci, majątek, dochody.",
    "Listę pytań o koszty, sposób pracy, czas trwania, mediację i ryzyka.",
    "Porównanie ról: adwokat i radca prawny, mediator, psycholog.",
    "Informację o tajemnicy zawodowej pełnomocnika.",
    "Wskazówki, jak przygotować się emocjonalnie i co zrobić po spotkaniu.",
  ],
  time: "20 min",
  faq: [
    {
      q: "Czy muszę mieć wszystkie dokumenty na pierwszej konsultacji?",
      a: "Nie. Zabierz to, co masz pod ręką. Specjalista powie ci, czego jeszcze może potrzebować. Dobrze przygotowana oś czasu i karta faktów są często ważniejsze niż komplet dokumentów.",
    },
    {
      q: "Czym różni się adwokat lub radca prawny od mediatora?",
      a: "Adwokat i radca prawny mogą być twoimi pełnomocnikami — doradzają tobie i reprezentują cię w sądzie. Mediator jest neutralny, nie reprezentuje żadnej ze stron i pomaga wam wspólnie wypracować porozumienie.",
    },
    {
      q: "Czy to, co powiem prawnikowi, zostanie między nami?",
      a: "Adwokaci i radcowie prawni są związani tajemnicą zawodową, która obejmuje informacje uzyskane w związku z udzielaniem pomocy prawnej. Jej zakres i wyjątki określają przepisy — jeśli masz wątpliwości, zapytaj o to na początku spotkania.",
    },
    {
      q: "Czy pierwsza konsultacja jest płatna?",
      a: "To zależy od specjalisty. Zapytaj o koszt konsultacji i sposób rozliczania dalszej współpracy, zanim umówisz spotkanie.",
    },
    {
      q: "Czy mogę przyjść na konsultację z kimś bliskim?",
      a: "Zapytaj o to wcześniej. Obecność osoby trzeciej może mieć znaczenie dla poufności rozmowy, a część spotkania specjalista może chcieć przeprowadzić tylko z tobą.",
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
      label: "Mediacje — gov.pl",
      url: "https://www.gov.pl/web/gov/rozwiaz-spor-przez-mediacje",
      verified: "2026-11-10",
    },
  ],
  nextOffer: "konsultacja",
  ctaLabel: "Umów konsultację i zacznij od planu",
  seo: {
    title: "Pierwsza konsultacja z prawnikiem — checklista | Nowy Etap",
    description:
      "Jak przygotować się do konsultacji z prawnikiem rodzinnym lub mediatorem: dokumenty, oś czasu, karta faktów, pytania o koszty i porównanie specjalistów.",
  },
  coverPrompt:
    "Photorealistic 3D render of a standing hardcover booklet at a slight angle on a warm off-white (#FCF9F8) background with a soft natural shadow. Deep green (#295550) cover with dark green (#263D3A) details and fine gold (#C79B59) accents, including a few minimal gold checkbox marks. Minimalist premium typography. Small wordmark text at the top: \"NOWY ETAP · PORADNIA ROZWODOWA\". Exact cover title: \"Pierwsza konsultacja\". Exact subtitle: \"Jak się przygotować do rozmowy z prawnikiem lub mediatorem\". Small label \"CHECKLISTA\". A subtle thin gold staircase line motif. No gavels, no paragraph symbols, no scales of justice, no people, no wedding rings. Square 1:1 composition, high detail, keep text minimal and exactly as written.",
  sections: [
    {
      heading: "Po co się przygotowywać",
      intro:
        "Pierwsza konsultacja trwa zwykle od kilkudziesięciu minut do godziny. Jeśli większość tego czasu zajmie ustalanie dat i szukanie dokumentów, zostanie mało czasu na to, co najważniejsze: twoje opcje i kolejne kroki.",
      blocks: [
        {
          type: "list",
          items: [
            "Specjalista szybciej zrozumie twoją sytuację i zada trafniejsze pytania.",
            "Łatwiej porównasz kilku specjalistów, jeśli każdemu przedstawisz te same fakty.",
            "Mniej emocji „w biegu” — masz wszystko zapisane.",
            "Wyjdziesz ze spotkania z konkretną listą kolejnych kroków.",
          ],
        },
        {
          type: "callout",
          tone: "info",
          text: "Nie musisz mieć gotowych decyzji. Konsultacja jest po to, by poznać możliwości. Ten materiał ma charakter informacyjny i nie zastępuje porady prawnej.",
        },
      ],
    },
    {
      heading: "Co zabrać na konsultację",
      intro: "Zaznacz to, co masz. Kopie są zwykle wystarczające — oryginały zostaw w domu, chyba że specjalista poprosi inaczej.",
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
            "Informacje o dochodach (np. PIT, zaświadczenie o zarobkach) — twoich i, jeśli znasz, drugiej osoby",
            "Zestawienie stałych kosztów życia i wydatków na dzieci",
            "Ważna korespondencja z drugą osobą (wydruk lub zrzuty ekranu — wybrane, nie wszystko)",
            "Dokumentacja dotycząca przemocy, jeśli występowała (zgłoszenia, dokumentacja medyczna)",
            "Wypełniona oś czasu i karta faktów z tego materiału",
            "Lista pytań",
          ],
        },
      ],
    },
    {
      heading: "Oś czasu i karta kluczowych faktów",
      intro:
        "Spisz wydarzenia w kolejności. Nie musisz pisać wypracowania — wystarczą daty i jedno zdanie opisu.",
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
            ["[miesiąc, rok]", "Ostatnie wspólne ustalenia (np. dotyczące dzieci, pieniędzy)", ""],
            ["", "", ""],
            ["", "", ""],
          ],
          caption: "Wpisz własne wydarzenia. Daty przybliżone są w porządku.",
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
            "Czy w relacji występuje przemoc lub zagrożenie?",
          ],
        },
        {
          type: "callout",
          tone: "info",
          text: "Wystarczą przedziały dochodów (np. 6–8 tys. zł netto). Dokładne kwoty i dokumenty specjalista może zebrać później.",
        },
      ],
    },
    {
      heading: "Pytania, które warto zadać",
      intro: "Wybierz najważniejsze dla ciebie i zapisz je wcześniej. Na spotkaniu zaznaczaj odpowiedzi.",
      blocks: [
        {
          type: "checklist",
          items: [
            "Jakie widzi Pan/Pani możliwe scenariusze w mojej sytuacji?",
            "Jakie są główne ryzyka i na co powinienem uważać już teraz?",
            "Czego nie robić, zanim podejmę decyzję (np. w sprawie wyprowadzki, pieniędzy, dzieci)?",
            "Czy w mojej sprawie realne jest porozumienie lub mediacja? Jak to wygląda w praktyce?",
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
          text: "Rzetelny specjalista mówi o scenariuszach i ryzykach, a nie gwarantuje konkretnego wyniku. Rozstrzygnięcie sądu zależy od okoliczności sprawy i oceny sądu.",
        },
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
              "Pełnomocnik — doradza tobie, przygotowuje pisma, może reprezentować cię w sądzie.",
              "Gdy potrzebujesz oceny prawnej, strategii, pisma procesowego lub reprezentacji.",
              "Działa w twoim interesie. Jest związany tajemnicą zawodową.",
            ],
            [
              "Mediator",
              "Osoba neutralna, która pomaga obu stronom rozmawiać i wypracować porozumienie.",
              "Gdy chcecie ustalić sprawy dzieci, majątku czy alimentów bez długiego sporu.",
              "Nie reprezentuje żadnej ze stron i nie doradza jednej z nich. Mediacja jest dobrowolna (art. 183¹ i nast. KPC).",
            ],
            [
              "Psycholog / terapeuta",
              "Wsparcie emocjonalne, pomoc w kryzysie, wsparcie dzieci.",
              "Gdy emocje utrudniają codzienne funkcjonowanie lub decyzje, albo martwisz się o dziecko.",
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
        {
          type: "p",
          text: "O tajemnicy zawodowej: adwokaci i radcowie prawni są obowiązani zachować w tajemnicy informacje, które uzyskali w związku z udzielaniem pomocy prawnej. Przepisy przewidują jednak określone wyjątki. Jeśli poufność jest dla ciebie szczególnie ważna, zapytaj o jej zakres na początku spotkania. Mediator również jest co do zasady zobowiązany do zachowania w tajemnicy faktów, o których dowiedział się w związku z prowadzeniem mediacji — szczegóły wyjaśni mediator.",
        },
      ],
    },
    {
      heading: "Przygotowanie emocjonalne",
      intro: "Rozmowa o rozstaniu z obcą osobą bywa trudna. To normalne, że pojawią się łzy, złość albo pustka w głowie.",
      blocks: [
        {
          type: "checklist",
          items: [
            "Zaplanuj spotkanie tak, by nie musieć biec od razu do pracy czy po dziecko.",
            "Zabierz wodę, chusteczki i notes z pytaniami.",
            "Zapisz trzy najważniejsze rzeczy, które chcesz wiedzieć po spotkaniu.",
            "Pozwól sobie na pauzę — możesz poprosić o chwilę przerwy.",
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
          text: "Jeśli doświadczasz przemocy, powiedz o tym na początku konsultacji — to wpływa na wybór dalszej drogi. W sytuacji zagrożenia dzwoń pod 112. Niebieska Linia: 800 120 002. Telefon dla dorosłych w kryzysie emocjonalnym: 116 123.",
        },
      ],
    },
    {
      heading: "Co dalej?",
      blocks: [
        {
          type: "p",
          text: "Dobrze przygotowana konsultacja to pierwszy krok do planu. Kolejny to uporządkowanie spraw, które trzeba ustalić: dzieci, mieszkanie, majątek, finanse — i kolejność działań.",
        },
        {
          type: "p",
          text: "W Nowym Etapie możesz umówić konsultację, przygotować Plan Rozwodu i ustalenia przed złożeniem pozwu albo skorzystać z mediacji. Najpierw plan i ustalenia — dopiero potem pozew. Wybierz to, co jest dla ciebie teraz potrzebne.",
        },
      ],
    },
  ],
};
