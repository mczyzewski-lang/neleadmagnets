import type { Material } from "../types";

export const material: Material = {
  slug: "komunikacja-z-drugim-rodzicem",
  format: "Zestaw szablonów",
  coverTitle: "Rzeczowe wiadomości",
  coverSubtitle: "Szablony do drugiego rodzica",
  coverTone: "cream",
  h1: "Rzeczowe wiadomości do drugiego rodzica: szablony",
  h2: "Metoda 4K i ponad 20 gotowych wiadomości: odbiory, wakacje, święta, wydatki, szkoła i trudne momenty.",
  promise:
    "Napiszesz do drugiego rodzica krótko i spokojnie, tak by rozmowa dotyczyła dziecka, a nie starego konfliktu.",
  forWho: [
    "Wymiana wiadomości z drugim rodzicem kończy się kłótnią lub milczeniem.",
    "Chcesz ustalać sprawy dziecka rzeczowo, ale emocje biorą górę.",
    "Potrzebujesz gotowych sformułowań na odbiory, wydatki, chorobę, szkołę.",
    "Chcesz mieć zapis ustaleń, do którego oboje możecie wrócić.",
  ],
  inside: [
    "Metodę 4K: Krótko, Konkretnie, Kulturalnie, Kończ propozycją.",
    "Ponad 20 szablonów na najczęstsze sytuacje.",
    "Odpowiedzi na wrogą lub prowokującą wiadomość.",
    "Propozycję zasad komunikacji.",
    "Sformułowania, których lepiej unikać, z zamiennikami.",
    "Dziennik ustaleń i zaproszenie do mediacji.",
    "Kiedy przerwać bezpośredni kontakt i gdzie szukać pomocy.",
  ],
  time: "15 min",
  faq: [
    {
      q: "Czy szablony nie brzmią sztucznie?",
      a: "To szkielet. Zmień słowa na swoje, zachowaj strukturę 4K.",
    },
    {
      q: "Co, jeśli drugi rodzic w ogóle nie odpowiada?",
      a: "Wyślij jedno przypomnienie z terminem (szablon 24) i zapisz to w dzienniku. Gdy milczenie się powtarza, wyślij zaproszenie do mediacji (szablon 25).",
    },
    {
      q: "Czy wiadomości mogą trafić do sądu?",
      a: "Może. Pisz tak, jakby miała je przeczytać neutralna osoba.",
    },
    {
      q: "O czym rodzice muszą decydować wspólnie?",
      a: "Przy wspólnej władzy rodzicielskiej o istotnych sprawach (szkoła, poważne leczenie) decydujecie zwykle razem. Bez porozumienia pomoże mediacja, a w ostateczności sąd.",
    },
    {
      q: "Dlaczego najpierw ustalenia i mediacja, a sąd na końcu?",
      a: "Bo to, co uzgodnicie, zostaje w waszych rękach, a porozumienie rodzicielskie sąd może uwzględnić w wyroku. Udokumentowana próba mediacji pokazuje twoją dobrą wolę, nawet przy odmowie, ale nie gwarantuje wyniku. Przy przemocy nie musisz jej proponować.",
    },
  ],
  sources: [
    {
      label: "Kodeks rodzinny i opiekuńczy, art. 97 § 2 i art. 113 i nast.",
      url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19640090059",
      verified: "2026-11-10",
    },
    {
      label: "Kodeks postępowania cywilnego: art. 103, art. 183¹ i nast. (mediacja), art. 187 § 1 pkt 3",
      url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19640430296",
      verified: "2026-11-16",
    },
    {
      label: "Kodeks rodzinny i opiekuńczy: art. 58 (porozumienie rodzicielskie)",
      url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19640090059",
      verified: "2026-11-16",
    },
    {
      label: "Mediacje: gov.pl",
      url: "https://www.gov.pl/web/gov/rozwiaz-spor-przez-mediacje",
      verified: "2026-11-10",
    },
    {
      label: "Niebieska Linia",
      url: "https://www.niebieskalinia.info/",
      verified: "2026-11-10",
    },
  ],
  nextOffer: "mediacja",
  stage: 2,
  ctaLabel: "Ustalcie zasady kontaktów w mediacji",
  seo: {
    title: "Wiadomości do drugiego rodzica: szablony | Nowy Etap",
    description:
      "Metoda 4K i ponad 20 gotowych szablonów wiadomości do drugiego rodzica: odbiory, wakacje, święta, wydatki, choroba, szkoła i trudne rozmowy.",
  },
  coverPrompt:
    "Photorealistic 3D render of a neat set of premium cards in a slim open box, the front card standing upright at a slight angle, on a warm off-white (#FCF9F8) background with a soft natural shadow. Cards in cream with deep green (#295550) and dark green (#263D3A) typography and fine gold (#C79B59) accents. Minimalist premium typography. Small wordmark text at the top of the front card: \"NOWY ETAP · PORADNIA ROZWODOWA\". Exact title: \"Rzeczowe wiadomości\". Exact subtitle: \"Szablony do drugiego rodzica\". Small label \"ZESTAW SZABLONÓW\". A subtle thin gold staircase line motif. No gavels, no paragraph symbols, no people, no wedding rings, no speech-bubble clipart. Square 1:1 composition, high detail, keep text minimal and exactly as written.",
  sections: [
    {
      heading: "Metoda 4K: jak pisać, żeby nie eskalować",
      intro: "Spory w wiadomościach dotyczą zwykle tonu, nie sprawy.",
      blocks: [
        {
          type: "path",
          current: 2,
          note: "Etap ustaleń: rzeczowe wiadomości, pisemne potwierdzenia, a gdy rozmowa utknie, mediacja.",
        },
        {
          type: "table",
          head: ["Zasada", "Co oznacza", "Pytanie kontrolne"],
          rows: [
            ["Krótko", "Jedna sprawa, kilka zdań.", "Czy da się to przeczytać w 20 sekund?"],
            ["Konkretnie", "Daty, godziny, miejsca, kwoty. Bez ocen.", "Czy wiadomo, o co dokładnie chodzi?"],
            ["Kulturalnie", "Neutralny ton, bez ironii i przeszłości.", "Czy mógłby to przeczytać mediator?"],
            ["Kończ propozycją", "Konkretna propozycja i termin odpowiedzi.", "Czy da się odpowiedzieć „tak” lub „nie”?"],
          ],
        },
        {
          type: "script",
          title: "Przed i po Metodzie 4K",
          lines: [
            {
              label: "Przed",
              text: "Znowu wszystko zmieniasz w ostatniej chwili, jak zawsze. Nie wiem, czy w ogóle zależy ci na dziecku.",
            },
            {
              label: "Po",
              text: "Widzę, że piątkowy odbiór się nie uda. Proponuję sobotę 10:00 przy szkole. Daj znać do czwartku 18:00, czy pasuje.",
            },
          ],
        },
        {
          type: "callout",
          tone: "info",
          title: "Zasada 30 minut",
          text: "Wiadomość cię zdenerwowała? Napisz szkic, odczekaj 30 minut, przeczytaj oczami dziecka i dopiero wyślij.",
        },
      ],
    },
    {
      heading: "Odbiory, wakacje i święta",
      intro: "Wstaw własne dane w nawiasach kwadratowych.",
      blocks: [
        {
          type: "script",
          title: "Zmiana terminu odbioru",
          lines: [
            {
              label: "1. Prośba o zmianę",
              text: "Cześć, w piątek [data] nie zdążę na 16:00. Możemy przesunąć odbiór na 18:30? Daj znać do środy.",
            },
            {
              label: "2. Propozycja zamiany weekendu",
              text: "Czy zamienimy się weekendami: ja biorę [data], ty [data]? Jeśli tak, potwierdzę to jednym mailem.",
            },
            {
              label: "3. Odpowiedź na prośbę o zmianę",
              text: "Dziękuję za informację. Sobota 10:00 mi pasuje. Odbiór jak zwykle pod szkołą.",
            },
            {
              label: "4. Spóźnienie",
              text: "Stoję w korku, będę ok. 15 minut później, ok. [godzina]. Przepraszam.",
            },
          ],
        },
        {
          type: "script",
          title: "Wakacje i wyjazdy",
          lines: [
            {
              label: "5. Propozycja podziału wakacji",
              text: "Proponuję wakacje tak: ja [daty], ty [daty]. Jeśli masz inny pomysł, prześlij go do [data].",
            },
            {
              label: "6. Informacja o wyjeździe",
              text: "W dniach [daty] będę z [imię dziecka] w [miejscowość]. Adres: [adres]. Dziecko może dzwonić do ciebie codziennie ok. 19:00.",
            },
            {
              label: "7. Wyjazd za granicę",
              text: "Planuję wyjazd z [imię dziecka] do [kraj] w dniach [daty]. Chcę to z tobą uzgodnić. Czy porozmawiamy o szczegółach do [data]?",
            },
          ],
        },
        {
          type: "script",
          title: "Święta",
          lines: [
            {
              label: "8. Propozycja planu świąt",
              text: "Proponuję: Wigilia u mnie do 20:00, pierwszy dzień świąt u ciebie od 11:00. W przyszłym roku odwrotnie. Co myślisz?",
            },
            {
              label: "9. Prośba o kontakt w dniu świątecznym",
              text: "Czy w [dzień] mogę zadzwonić do [imię dziecka] na wideo ok. 17:00, żeby złożyć życzenia?",
            },
          ],
        },
      ],
    },
    {
      heading: "Wydatki, zdrowie, szkoła i zajęcia",
      blocks: [
        {
          type: "script",
          title: "Wydatki na dziecko",
          lines: [
            {
              label: "10. Propozycja wspólnego wydatku",
              text: "Szkoła zbiera [kwota] zł na [cel] do [data]. Proponuję po połowie. Zapłacę całość, a ty prześlesz mi [kwota] zł. Pasuje?",
            },
            {
              label: "11. Rozliczenie z potwierdzeniem",
              text: "W załączniku paragon za [np. buty zimowe]: [kwota] zł. Twoja część to [kwota] zł. Numer konta: [numer].",
            },
            {
              label: "12. Wydatek, z którym się nie zgadzasz",
              text: "Rozumiem, że [wydatek] jest ważny. Teraz nie dołożę się do całości. Mogę zaproponować [kwota / inne rozwiązanie]. Odpowiada ci to?",
            },
          ],
        },
        {
          type: "script",
          title: "Choroba",
          lines: [
            {
              label: "13. Informacja o chorobie",
              text: "[Imię dziecka] ma od rana 38,5. Byliśmy u lekarza: [zalecenia]. Leki: [nazwa, dawkowanie]. Dam znać wieczorem.",
            },
            {
              label: "14. Choroba a termin kontaktu",
              text: "Lekarz zalecił, żeby dziecko zostało w domu. Proponuję, żebyś odwiedził je u mnie w sobotę, a weekend odrobimy [data]. Co ty na to?",
            },
          ],
        },
        {
          type: "script",
          title: "Szkoła i zajęcia dodatkowe",
          lines: [
            {
              label: "15. Wywiadówka / spotkanie w szkole",
              text: "Zebranie w szkole jest [data] o [godzina]. Wybierasz się? Jeśli nie, prześlę ci notatkę.",
            },
            {
              label: "16. Ważna decyzja szkolna",
              text: "Musimy zdecydować o [np. wyborze szkoły]. Mam informacje o dwóch opcjach: [A] i [B]. Proponuję rozmowę w [dzień] o [godzina].",
            },
            {
              label: "17. Nowe zajęcia dodatkowe",
              text: "[Imię dziecka] chce chodzić na [zajęcia], [dzień i godzina], koszt [kwota] miesięcznie. W twoim tygodniu też trzeba by go zawozić. Co myślisz? Zapisy do [data].",
            },
          ],
        },
      ],
    },
    {
      heading: "Trudne momenty: wrogie wiadomości i zasady komunikacji",
      blocks: [
        {
          type: "script",
          title: "Odpowiedź na wrogą wiadomość",
          lines: [
            {
              label: "18. Odpowiedź tylko na sprawę",
              text: "Dziękuję za wiadomość. Co do soboty: będę o 10:00 pod szkołą. Do reszty nie będę się teraz odnosić.",
            },
            {
              label: "19. Zatrzymanie eskalacji",
              text: "Ta rozmowa idzie w złą stronę. Wrócę do niej jutro. Teraz potwierdzam tylko: [konkret].",
            },
            {
              label: "20. Granica",
              text: "Chcę rozmawiać o sprawach [imię dziecka]. Na obraźliwe wiadomości nie odpowiadam. Gdy będziesz gotowy rozmawiać o [temat], jestem do dyspozycji.",
            },
          ],
        },
        {
          type: "script",
          title: "Ustalenie zasad komunikacji",
          lines: [
            {
              label: "21. Propozycja zasad",
              text: "Proponuję zasady: 1) sprawy organizacyjne w jednym kanale (mail lub komunikator); 2) odpowiedź w 48 godzin, pilne telefonicznie; 3) nic przez dziecko; 4) raz w miesiącu podsumowanie kalendarza. Co byś zmienił?",
            },
            {
              label: "22. Prośba o wspólny kalendarz",
              text: "Czy założymy wspólny kalendarz online tylko dla spraw [imię dziecka]? Na odbiory, lekarza i zajęcia.",
            },
          ],
        },
        {
          type: "script",
          title: "Potwierdzenie ustaleń na piśmie",
          lines: [
            {
              label: "23. Podsumowanie po rozmowie",
              text: "Dziękuję za rozmowę. Podsumowuję: [ustalenie 1], [ustalenie 2], [ustalenie 3]. Jeśli coś zapisałem/zapisałam inaczej, daj znać do [data].",
            },
            {
              label: "24. Przypomnienie o braku odpowiedzi",
              text: "Wracam do wiadomości z [data] w sprawie [temat]. Potrzebuję odpowiedzi do [data], bo [powód, np. termin zapisów]. Jeśli jej nie będzie, [co zrobisz, spokojnie i rzeczowo].",
            },
          ],
        },
      ],
    },
    {
      heading: "Czego nie pisać i co napisać zamiast",
      blocks: [
        {
          type: "table",
          head: ["Unikaj", "Napisz zamiast"],
          rows: [
            ["„Zawsze się spóźniasz”", "„W sobotę odbiór był o 10:40 zamiast 10:00.”"],
            ["„Jesteś nieodpowiedzialny”", "„Dziecko wróciło bez leków. Proszę, pakuj je.”"],
            ["Odwołań do przeszłości", "Bieżącej sprawy dziecka"],
            ["Ironii i wielkich liter", "Prostego zdania"],
            ["„Zobaczymy się w sądzie”", "„Jeśli się nie dogadamy, proponuję mediację.”"],
            ["Wiadomości przez dziecko", "Wiadomości wprost"],
            ["Kilku spraw naraz", "Jednej sprawy w jednej wiadomości"],
          ],
        },
        {
          type: "checklist",
          items: [
            "Czy wiadomość dotyczy jednej sprawy?",
            "Czy są daty, godziny, kwoty?",
            "Czy nie ma ocen i odwołań do przeszłości?",
            "Czy kończy się propozycją i terminem odpowiedzi?",
            "Czy byłoby mi komfortowo, gdyby przeczytało ją dziecko za kilka lat?",
          ],
        },
      ],
    },
    {
      heading: "Dziennik ustaleń",
      intro: "Ucina spory o to, „kto co powiedział”. Zapisuj też zaproszenia do mediacji.",
      blocks: [
        {
          type: "table",
          head: ["Data", "Temat", "Ustalenie", "Gdzie zapisane", "Status"],
          rows: [
            ["[data]", "Odbiór w weekend", "Sobota 10:00 zamiast piątku 16:00", "SMS z [data]", "Zrealizowane"],
            ["[data]", "Wydatek: wycieczka szkolna", "Po połowie, przelew do [data]", "E-mail z [data]", "Czeka na przelew"],
            ["[data]", "Mediacja w sprawie kalendarza kontaktów", "Wysłane zaproszenie, odpowiedź do [data]", "E-mail z [data]", "Czeka na odpowiedź"],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
          ],
          caption: "Prowadź go tam, gdzie tylko ty masz dostęp.",
        },
        {
          type: "list",
          items: [
            "Zapisuj fakty, nie emocje.",
            "Rób kopie zapasowe korespondencji.",
          ],
        },
      ],
    },
    {
      heading: "Kiedy przerwać bezpośredni kontakt i poszukać pomocy",
      intro: "Szablony nie są narzędziem na przemoc. Nie prowadź korespondencji sam, jeśli:",
      blocks: [
        {
          type: "checklist",
          items: [
            "Otrzymujesz groźby lub wiadomości, które cię zastraszają.",
            "Druga osoba śledzi cię, nachodzi lub kontroluje.",
            "Przy przekazaniu dziecka dochodzi do agresji.",
            "Po każdym kontakcie czujesz lęk, a nie tylko złość czy zmęczenie.",
          ],
        },
        {
          type: "callout",
          tone: "safety",
          title: "Gdzie szukać pomocy",
          text: "W zagrożeniu: 112. Niebieska Linia: 800 120 002. Zachowaj wiadomości z groźbami i porozmawiaj z prawnikiem. Przy przemocy mediacja nie jest właściwą drogą.",
        },
        {
          type: "p",
          text: "Przy silnym konflikcie bez przemocy pomaga kontakt mailowy i przekazanie dziecka w neutralnym miejscu.",
        },
      ],
    },
    {
      heading: "Od wiadomości do porozumienia",
      intro: "Gdy wiadomości nie wystarczają, nie zaczynaj od sądu.",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Rzeczowe wiadomości i pisemne podsumowania.",
            "Porozumienie rodzicielskie: kontakty, wakacje, święta, wydatki, ważne decyzje.",
            "Mediacja, gdy sami nie możecie się dogadać.",
            "Sąd tylko dla spraw nieuzgodnionych.",
          ],
        },
        {
          type: "script",
          title: "Zaproszenie do mediacji",
          lines: [
            {
              label: "25. Zaproszenie do mediacji",
              text: "W sprawie [temat] nie udaje nam się porozumieć. Zapraszam cię do mediacji, czyli spotkania z bezstronnym mediatorem. Proponuję [mediator / ośrodek], rozważę też twoją propozycję. Mediator może też sam do ciebie napisać. Daj znać do [data].",
            },
            {
              label: "26. Odpowiedź na odmowę mediacji",
              text: "Dziękuję za odpowiedź. Szkoda, bo zależy mi, żebyśmy sprawy [imię dziecka] ustalili sami. Moje zaproszenie jest aktualne, gdybyś zmienił zdanie.",
            },
          ],
        },
        { type: "mediationAttempt" },
      ],
    },
    {
      heading: "Co dalej?",
      blocks: [
        {
          type: "p",
          text: "Nowy Etap może pomóc wam w mediacji albo w przygotowaniu Planu Rozwodu i porozumienia rodzicielskiego. Najpierw plan i ustalenia, potem pozew.",
        },
      ],
    },
  ],
};
