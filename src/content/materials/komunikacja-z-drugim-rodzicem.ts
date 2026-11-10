import type { Material } from "../types";

export const material: Material = {
  slug: "komunikacja-z-drugim-rodzicem",
  format: "Zestaw szablonów",
  coverTitle: "Rzeczowe wiadomości",
  coverSubtitle: "Szablony do drugiego rodzica",
  coverTone: "cream",
  h1: "Rzeczowe wiadomości do drugiego rodzica — szablony",
  h2: "Metoda 4K i ponad 20 gotowych wiadomości na odbiory, wakacje, święta, wydatki, szkołę i trudne momenty.",
  promise:
    "Napiszesz do drugiego rodzica krótko i spokojnie — tak, by rozmowa dotyczyła dziecka, a nie starego konfliktu.",
  forWho: [
    "Każda wymiana wiadomości z drugim rodzicem kończy się kłótnią lub milczeniem.",
    "Chcesz ustalać sprawy dziecka rzeczowo, ale emocje biorą górę.",
    "Potrzebujesz gotowych sformułowań na typowe sytuacje: odbiory, wydatki, choroba, szkoła.",
    "Chcesz mieć porządny zapis ustaleń, do którego oboje możecie wrócić.",
  ],
  inside: [
    "Autorską Metodę 4K: Krótko, Konkretnie, Kulturalnie, Kończ propozycją.",
    "Ponad 20 szablonów wiadomości na najczęstsze sytuacje.",
    "Wzór odpowiedzi na wrogą lub prowokującą wiadomość.",
    "Propozycję zasad komunikacji do ustalenia z drugim rodzicem.",
    "Listę sformułowań, których lepiej unikać — z zamiennikami.",
    "Wzór dziennika ustaleń.",
    "Informację, kiedy przerwać bezpośredni kontakt i gdzie szukać pomocy.",
  ],
  time: "20 min",
  faq: [
    {
      q: "Czy szablony nie brzmią sztucznie?",
      a: "Traktuj je jak szkielet. Zmień słowa tak, by brzmiały jak ty, ale zachowaj strukturę: krótko, konkretnie, kulturalnie i z propozycją na końcu.",
    },
    {
      q: "Co, jeśli drugi rodzic w ogóle nie odpowiada?",
      a: "Wyślij jedną krótką przypominającą wiadomość z jasnym terminem odpowiedzi i zapisz to w dzienniku ustaleń. Jeśli brak kontaktu się powtarza i dotyczy ważnych spraw dziecka, warto porozmawiać z mediatorem lub prawnikiem.",
    },
    {
      q: "Czy wiadomości mogą być później użyte w sądzie?",
      a: "Korespondencja między rodzicami bywa przedstawiana w sprawach rodzinnych. Dlatego warto pisać tak, jakby kiedyś miała ją przeczytać neutralna osoba — spokojnie i rzeczowo. O tym, co i jak przedstawić, decyduj z prawnikiem.",
    },
    {
      q: "O czym rodzice muszą decydować wspólnie?",
      a: "Jeśli oboje macie władzę rodzicielską, o istotnych sprawach dziecka (np. wybór szkoły, poważne leczenie) co do zasady rozstrzygacie wspólnie (art. 97 § 2 KRO). W razie braku porozumienia rozstrzyga sąd.",
    },
  ],
  sources: [
    {
      label: "Kodeks rodzinny i opiekuńczy, art. 97 § 2 i art. 113 i nast.",
      url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19640090059",
      verified: "2026-11-10",
    },
    {
      label: "Mediacje — gov.pl",
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
  ctaLabel: "Ustalcie zasady kontaktów w mediacji",
  seo: {
    title: "Wiadomości do drugiego rodzica — szablony | Nowy Etap",
    description:
      "Metoda 4K i ponad 20 gotowych szablonów wiadomości do drugiego rodzica: odbiory, wakacje, święta, wydatki, choroba, szkoła i trudne rozmowy.",
  },
  coverPrompt:
    "Photorealistic 3D render of a neat set of premium cards in a slim open box, the front card standing upright at a slight angle, on a warm off-white (#FCF9F8) background with a soft natural shadow. Cards in cream with deep green (#295550) and dark green (#263D3A) typography and fine gold (#C79B59) accents. Minimalist premium typography. Small wordmark text at the top of the front card: \"NOWY ETAP · PORADNIA ROZWODOWA\". Exact title: \"Rzeczowe wiadomości\". Exact subtitle: \"Szablony do drugiego rodzica\". Small label \"ZESTAW SZABLONÓW\". A subtle thin gold staircase line motif. No gavels, no paragraph symbols, no people, no wedding rings, no speech-bubble clipart. Square 1:1 composition, high detail, keep text minimal and exactly as written.",
  sections: [
    {
      heading: "Metoda 4K: jak pisać, żeby nie eskalować",
      intro:
        "Większość konfliktów w wiadomościach nie dotyczy samej sprawy, tylko tonu. Metoda 4K to prosta rama, którą sprawdzisz przed wysłaniem każdej wiadomości.",
      blocks: [
        {
          type: "table",
          head: ["Zasada", "Co oznacza", "Pytanie kontrolne"],
          rows: [
            ["Krótko", "Jedna sprawa w jednej wiadomości. Najlepiej kilka zdań.", "Czy da się to przeczytać w 20 sekund?"],
            ["Konkretnie", "Daty, godziny, miejsca, kwoty. Bez ogólników i ocen.", "Czy wiadomo, o co dokładnie chodzi?"],
            ["Kulturalnie", "Neutralny ton, bez ironii, wyrzutów i odwołań do przeszłości.", "Czy byłoby mi komfortowo, gdyby to przeczytał mediator?"],
            ["Kończ propozycją", "Zakończ konkretną propozycją i terminem odpowiedzi.", "Czy druga osoba może odpowiedzieć „tak” lub „nie”?"],
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
          text: "Gdy wiadomość cię zdenerwuje, nie odpowiadaj od razu. Napisz szkic, odczekaj co najmniej 30 minut, przeczytaj go z perspektywy dziecka i dopiero wtedy wyślij.",
        },
      ],
    },
    {
      heading: "Odbiory, wakacje i święta",
      intro: "Szablony do kalendarza kontaktów. Wstaw własne dane w nawiasach kwadratowych.",
      blocks: [
        {
          type: "script",
          title: "Zmiana terminu odbioru",
          lines: [
            {
              label: "1. Prośba o zmianę",
              text: "Cześć, w piątek [data] mam [krótki powód, np. wyjazd służbowy] i nie zdążę na 16:00. Czy możemy przesunąć odbiór na 18:30? Daj znać do środy.",
            },
            {
              label: "2. Propozycja zamiany weekendu",
              text: "Czy zamienimy się weekendami: ja biorę [data], ty [data]? Jeśli tak, potwierdzę wszystko jednym mailem.",
            },
            {
              label: "3. Odpowiedź na prośbę o zmianę",
              text: "Dziękuję za informację. Sobota 10:00 mi pasuje. Odbiór jak zwykle pod szkołą.",
            },
            {
              label: "4. Spóźnienie",
              text: "Utknąłem/Utknęłam w korku, będę ok. 15 minut później, czyli ok. [godzina]. Przepraszam za zmianę.",
            },
          ],
        },
        {
          type: "script",
          title: "Wakacje i wyjazdy",
          lines: [
            {
              label: "5. Propozycja podziału wakacji",
              text: "Chciał(a)bym ustalić wakacje. Proponuję: ja [daty], ty [daty]. Jeśli masz inny pomysł, prześlij go do [data] — chętnie porównam.",
            },
            {
              label: "6. Informacja o wyjeździe",
              text: "W dniach [daty] będę z [imię dziecka] w [miejscowość]. Adres noclegu: [adres]. Dziecko może dzwonić do ciebie codziennie wieczorem, np. ok. 19:00.",
            },
            {
              label: "7. Wyjazd za granicę",
              text: "Planuję wyjazd z [imię dziecka] do [kraj] w dniach [daty]. Chcę to z tobą uzgodnić z wyprzedzeniem. Czy możemy porozmawiać o szczegółach do [data]?",
            },
          ],
        },
        {
          type: "script",
          title: "Święta",
          lines: [
            {
              label: "8. Propozycja planu świąt",
              text: "Chciał(a)bym, żebyśmy wcześnie ustalili święta. Proponuję: Wigilia u mnie do 20:00, pierwszy dzień świąt u ciebie od 11:00. W przyszłym roku odwrotnie. Co o tym myślisz?",
            },
            {
              label: "9. Prośba o kontakt w dniu świątecznym",
              text: "Czy w [dzień] mógł(a)bym zadzwonić do [imię dziecka] na wideo ok. 17:00, żeby złożyć życzenia?",
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
              text: "Szkoła zbiera [kwota] zł na [cel], termin [data]. Proponuję podział po połowie. Mogę zapłacić całość i prześlesz mi [kwota] zł — pasuje?",
            },
            {
              label: "11. Rozliczenie z potwierdzeniem",
              text: "W załączniku paragon za [np. buty zimowe] — [kwota] zł. Zgodnie z naszym ustaleniem twoja część to [kwota] zł. Numer konta: [numer].",
            },
            {
              label: "12. Wydatek, z którym się nie zgadzasz",
              text: "Rozumiem, że [wydatek] jest ważny. Teraz nie mogę dołożyć się do całej kwoty. Mogę zaproponować [kwota / inne rozwiązanie]. Czy to ci odpowiada?",
            },
          ],
        },
        {
          type: "script",
          title: "Choroba",
          lines: [
            {
              label: "13. Informacja o chorobie",
              text: "[Imię dziecka] ma od rana gorączkę 38,5. Byliśmy u lekarza: [rozpoznanie / zalecenia]. Leki: [nazwa, dawkowanie]. Dam znać wieczorem, jak się czuje.",
            },
            {
              label: "14. Choroba a termin kontaktu",
              text: "Dziecko jest chore i lekarz zalecił, żeby zostało w domu. Proponuję, żebyś odwiedził je u mnie w sobotę, a weekend odrobimy [data]. Co ty na to?",
            },
          ],
        },
        {
          type: "script",
          title: "Szkoła i zajęcia dodatkowe",
          lines: [
            {
              label: "15. Wywiadówka / spotkanie w szkole",
              text: "Zebranie w szkole jest [data] o [godzina]. Wybierasz się? Jeśli nie, prześlę ci notatkę z najważniejszymi informacjami.",
            },
            {
              label: "16. Ważna decyzja szkolna",
              text: "Musimy zdecydować o [np. wyborze szkoły / klasy]. Zebrałem/Zebrałam informacje o dwóch opcjach: [A] i [B]. Proponuję rozmowę w [dzień] o [godzina] — telefonicznie albo na żywo.",
            },
            {
              label: "17. Nowe zajęcia dodatkowe",
              text: "[Imię dziecka] chciałby chodzić na [zajęcia], [dzień i godzina], koszt [kwota] miesięcznie. Zajęcia wypadają w moim tygodniu, ale w twoim też musiałbyś go zawozić. Co o tym myślisz? Zapisy do [data].",
            },
          ],
        },
        {
          type: "callout",
          tone: "info",
          text: "Jeśli oboje macie władzę rodzicielską, o istotnych sprawach dziecka — takich jak wybór szkoły czy poważne leczenie — co do zasady decydujecie wspólnie (art. 97 § 2 KRO). Szablony 7, 16 i 17 pomagają zacząć taką rozmowę we właściwy sposób.",
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
              text: "Dziękuję za wiadomość. Odnośnie odbioru w sobotę: będę o 10:00 pod szkołą. Do pozostałych kwestii nie będę się teraz odnosić.",
            },
            {
              label: "19. Zatrzymanie eskalacji",
              text: "Widzę, że ta rozmowa idzie w złą stronę. Wrócę do niej jutro. Teraz potwierdzam tylko: [konkret].",
            },
            {
              label: "20. Granica",
              text: "Chcę rozmawiać o sprawach [imię dziecka]. Na wiadomości z obraźliwymi słowami nie będę odpowiadać. Gdy będziesz gotowy rozmawiać o [temat], jestem do dyspozycji.",
            },
          ],
        },
        {
          type: "script",
          title: "Ustalenie zasad komunikacji",
          lines: [
            {
              label: "21. Propozycja zasad",
              text: "Proponuję kilka zasad, żeby nam obojgu było łatwiej: 1) sprawy organizacyjne piszemy mailem lub w jednym komunikatorze; 2) odpowiadamy w ciągu 48 godzin, w pilnych sprawach dzwonimy; 3) nie przekazujemy wiadomości przez dziecko; 4) raz w miesiącu robimy krótkie podsumowanie kalendarza. Co dodałbyś lub zmienił?",
            },
            {
              label: "22. Prośba o wspólny kalendarz",
              text: "Czy możemy założyć wspólny kalendarz online tylko dla spraw [imię dziecka]? Wpisywalibyśmy tam odbiory, wizyty u lekarza i zajęcia.",
            },
          ],
        },
        {
          type: "script",
          title: "Potwierdzenie ustaleń na piśmie",
          lines: [
            {
              label: "23. Podsumowanie po rozmowie",
              text: "Dziękuję za rozmowę. Dla porządku podsumowuję: [ustalenie 1], [ustalenie 2], [ustalenie 3]. Jeśli coś zapisałem/zapisałam inaczej, niż się umówiliśmy, daj znać do [data].",
            },
            {
              label: "24. Przypomnienie o braku odpowiedzi",
              text: "Wracam do mojej wiadomości z [data] w sprawie [temat]. Potrzebuję odpowiedzi do [data], bo [powód, np. termin zapisów]. Jeśli nie będzie odpowiedzi, [co zrobisz — spokojnie i rzeczowo].",
            },
          ],
        },
      ],
    },
    {
      heading: "Czego nie pisać — i co napisać zamiast",
      blocks: [
        {
          type: "table",
          head: ["Unikaj", "Napisz zamiast"],
          rows: [
            ["„Zawsze” / „nigdy” („Zawsze się spóźniasz”)", "„W sobotę odbiór był o 10:40 zamiast 10:00. Czy możemy trzymać się godziny?”"],
            ["Ocen charakteru („Jesteś nieodpowiedzialny”)", "Opisu faktu i prośby („Dziecko wróciło bez leków. Proszę, pakuj je do plecaka.”)"],
            ["Odwołań do przeszłości związku", "Tylko bieżącej sprawy dziecka"],
            ["Ironii, emotek z przekąsem, wielkich liter", "Neutralnego, prostego zdania"],
            ["Gróźb („To zobaczymy się w sądzie”)", "Propozycji kolejnego kroku („Jeśli się nie dogadamy, proponuję mediację.”)"],
            ["Przekazywania wiadomości przez dziecko", "Bezpośredniej wiadomości do drugiego rodzica"],
            ["Długich elaboratów o kilku sprawach naraz", "Jednej sprawy w jednej wiadomości"],
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
      intro:
        "Krótki, regularnie prowadzony dziennik zmniejsza liczbę sporów o to, „kto co powiedział”. Pomaga też w mediacji i przy ewentualnych zmianach ustaleń.",
      blocks: [
        {
          type: "table",
          head: ["Data", "Temat", "Ustalenie", "Gdzie zapisane", "Status"],
          rows: [
            ["[data]", "Odbiór w weekend", "Sobota 10:00 zamiast piątku 16:00", "SMS z [data]", "Zrealizowane"],
            ["[data]", "Wydatek: wycieczka szkolna", "Po połowie, przelew do [data]", "E-mail z [data]", "Czeka na przelew"],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
          ],
          caption: "Wzór — prowadź go w notesie, arkuszu lub aplikacji, do której tylko ty masz dostęp.",
        },
        {
          type: "list",
          items: [
            "Zapisuj fakty, nie emocje.",
            "Dodawaj odnośnik do wiadomości, w której ustalenie padło.",
            "Raz w miesiącu przejrzyj dziennik i zaproponuj krótkie podsumowanie drugiemu rodzicowi.",
            "Rób kopie zapasowe korespondencji.",
          ],
        },
      ],
    },
    {
      heading: "Kiedy przerwać bezpośredni kontakt i poszukać pomocy",
      blocks: [
        {
          type: "p",
          text: "Szablony pomagają przy zwykłym konflikcie. Nie są narzędziem na przemoc. Jeśli wiadomości zawierają groźby, zastraszanie, nękanie albo boisz się o bezpieczeństwo swoje lub dziecka — nie musisz prowadzić tej korespondencji sam.",
        },
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
          text: "W sytuacji zagrożenia dzwoń pod 112. Niebieska Linia — pomoc dla osób doznających przemocy domowej: 800 120 002. Zachowaj wiadomości z groźbami i porozmawiaj z prawnikiem o kolejnych krokach. Mediacja nie jest właściwą drogą, gdy w relacji występuje przemoc.",
        },
        {
          type: "p",
          text: "Gdy konflikt jest silny, ale bez przemocy, pomocne mogą być: komunikacja wyłącznie mailowa, przekazywanie dziecka w neutralnym miejscu albo mediacja, w której zasady kontaktów ustalacie przy wsparciu neutralnej osoby. W razie sporu o kontakty z dzieckiem rozstrzyga sąd (art. 113 i nast. KRO).",
        },
      ],
    },
    {
      heading: "Co dalej?",
      blocks: [
        {
          type: "p",
          text: "Dobra komunikacja to fundament każdego planu wychowawczego. Gdy już umiecie wymieniać rzeczowe wiadomości, łatwiej ustalić zasady na dłużej: kalendarz kontaktów, wakacje, święta, wydatki.",
        },
        {
          type: "p",
          text: "Nowy Etap może pomóc wam w mediacji albo w przygotowaniu Planu Rozwodu i ustaleń dotyczących dzieci przed złożeniem pozwu. Najpierw plan i ustalenia — dopiero potem pozew. Możesz wrócić do nas, kiedy będziesz gotowy.",
        },
      ],
    },
  ],
};
