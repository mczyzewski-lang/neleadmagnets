import type { Material } from "../types";

export const material: Material = {
  slug: "checklista-dokumentow",
  format: "Checklista",
  coverTitle: "Checklista dokumentów do rozwodu",
  coverSubtitle: "Rozwód · dzieci · majątek · kredyt",
  coverTone: "gold",
  h1: "Checklista dokumentów do rozwodu, podziału majątku i spraw dzieci",
  h2: "Zbierz wszystko w jednym miejscu: najpierw do planu i ustaleń, potem do pozwu. Co jest potrzebne zawsze, co zależy od sytuacji i skąd to wziąć.",
  promise:
    "Jedna lista dokumentów do rozwodu, majątku, dzieci i kredytu, z informacją, skąd je wziąć.",
  forWho: [
    "Dla osób przed rozwodem lub separacją, które chcą zacząć od planu, a nie od pozwu.",
    "Dla tych, którzy idą do prawnika lub mediatora i chcą mieć dokumenty w porządku.",
    "Dla rodziców, którzy będą ustalać alimenty i kontakty.",
    "Dla osób ze wspólnym kredytem lub nieruchomością.",
  ],
  inside: [
    "Dokumenty dotyczące dzieci i alimentów",
    "Majątek: nieruchomości, pojazdy, konta, firma",
    "Kredyt i inne zobowiązania",
    "Ustalenia i dokumenty próby mediacji",
    "Dokumenty do pozwu",
    "Ściąga „skąd to wziąć”",
    "Arkusz: co mam, czego brakuje",
  ],
  time: "15 min",
  faq: [
    {
      q: "Po co dokumenty próby mediacji, skoro druga strona odmówiła?",
      a: "Bo próba liczy się także wtedy, gdy się nie udała. W pozwie piszesz, czy była próba mediacji, a jeśli nie, dlaczego. Zaproszenie do mediacji, odpowiedź drugiej strony i potwierdzenie od mediatora pokazują Twoją dobrą wolę. Próba nie przesądza o wyniku. Przy przemocy, groźbach lub kontroli nie musisz jej proponować.",
    },
    {
      q: "Jaki odpis aktu małżeństwa dołączyć do pozwu?",
      a: "Zwykle odpis skrócony. Zamówisz go w dowolnym USC albo online na gov.pl.",
    },
    {
      q: "Czy muszę mieć wszystkie dokumenty majątkowe już przy pozwie?",
      a: "Nie zawsze. Do pozwu o rozwód potrzebne są głównie odpisy aktów i dowód opłaty. Dokumenty majątkowe są potrzebne do podziału majątku i do porozumienia. Zebrane wcześniej ułatwiają rozmowy.",
    },
    {
      q: "Jak sprawdzić księgę wieczystą mieszkania?",
      a: "Bezpłatnie na ekw.ms.gov.pl, jeśli znasz numer księgi. Zobaczysz tam właścicieli i hipoteki.",
    },
    {
      q: "Czy po rozwodzie bank wykreśli mnie z kredytu?",
      a: "Nie automatycznie. Rozwód nie zmienia umowy, a bank może żądać spłaty od każdego z Was. Zmiana dłużnika wymaga zgody banku, który zwykle ponownie bada zdolność kredytową.",
    },
  ],
  sources: [
    { label: "Kodeks rodzinny i opiekuńczy (art. 31, 33, 58)", url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19640090059", verified: "2026-11-10" },
    { label: "Kodeks postępowania cywilnego (art. 103, art. 183¹ i nast., art. 187 § 1 pkt 3)", url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19640430296", verified: "2026-11-16" },
    { label: "Kodeks cywilny (art. 366, art. 519)", url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19640160093", verified: "2026-11-10" },
    { label: "Ustawa o kosztach sądowych w sprawach cywilnych (art. 26)", url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20051671398", verified: "2026-11-10" },
    { label: "gov.pl: Uzyskaj odpis aktu stanu cywilnego", url: "https://www.gov.pl/web/gov/uzyskaj-odpis-aktu-stanu-cywilnego", verified: "2026-11-10" },
    { label: "Elektroniczne Księgi Wieczyste: ekw.ms.gov.pl", url: "https://ekw.ms.gov.pl/", verified: "2026-11-10" },
  ],
  nextOffer: "plan-rozwodu",
  stage: 1,
  ctaLabel: "Uporządkuj dokumenty w Planie Rozwodu",
  seo: {
    title: "Checklista dokumentów do rozwodu | Nowy Etap",
    description:
      "Jakie dokumenty do rozwodu, podziału majątku, alimentów i kredytu? Lista: co zawsze, co zależnie od sytuacji i skąd to wziąć. Odhaczasz online, za darmo.",
  },
  coverPrompt:
    "Photorealistic 3D render of a standing spiral-bound checklist booklet at a slight angle on a warm off-white (#FCF9F8) background with a soft natural shadow. The cover is warm gold (#C79B59) with deep green (#295550) typography and a thin dark green (#263D3A) border. Minimalist premium typography. Render this exact text, spelled exactly, and keep all text minimal: small wordmark at the top \"NOWY ETAP · PORADNIA ROZWODOWA\"; main title \"Checklista dokumentów do rozwodu\"; subtitle \"Rozwód · dzieci · majątek · kredyt\". A subtle thin staircase line motif (a stylised ascending step line) in deep green near the bottom, with three small elegant check marks. No gavels, no paragraph symbols, no people, no wedding rings, no other text. Square 1:1 composition, high detail, elegant studio lighting.",
  sections: [
    {
      heading: "Jak korzystać z checklisty",
      intro:
        "Dokumenty w jednym miejscu ułatwiają rozmowy o ustaleniach. Prawnik lub mediator szybciej zobaczy pełny obraz.",
      blocks: [
        {
          type: "path",
          current: 1,
          note: "Dokumenty służą najpierw planowi i rozmowom, dopiero potem pozwowi. Kto zna liczby, negocjuje spokojniej.",
        },
        {
          type: "list",
          items: [
            "Grupy idą w kolejności użycia: dzieci, majątek, kredyt, ustalenia i mediacja, na końcu pozew.",
            "Zbieraj tylko to, czego wymaga Twoja sytuacja.",
            "Załóż folder (papierowy lub w chmurze) i skanuj dokumenty od razu.",
            "Zbieraj kopie dokumentów, do których masz legalny dostęp. Nie zabieraj oryginałów drugiej strony, bo to zaostrza konflikt.",
          ],
        },
        {
          type: "callout",
          tone: "info",
          text: "Materiał ma charakter informacyjny. Sąd może poprosić o dodatkowe dokumenty. W razie wątpliwości zapytaj prawnika.",
        },
      ],
    },
    {
      heading: "Dzieci i alimenty",
      intro:
        "Te dokumenty pomagają najpierw Wam: przy budżecie dziecka, planie opieki i alimentach. Potem pokazują sądowi realne potrzeby dziecka i możliwości rodziców.",
      blocks: [
        {
          type: "table",
          head: ["Dokument", "Kiedy potrzebny", "Skąd"],
          rows: [
            ["Porozumienie rodzicielskie", "Gdy macie uzgodnienia co do opieki i kontaktów", "Spisujecie sami, z prawnikiem lub w mediacji"],
            ["Zestawienie miesięcznych kosztów dziecka", "Przy alimentach", "Twoje wyliczenie i rachunki"],
            ["Rachunki (przedszkole, szkoła, zajęcia, leczenie)", "Przy alimentach", "Placówki, lekarze, Twoje konto"],
            ["Zaświadczenia o zarobkach obu rodziców", "Przy alimentach", "Pracodawca; PIT z e-Urzędu Skarbowego"],
            ["Dokumentacja szczególnych potrzeb dziecka", "Gdy dziecko ma dodatkowe potrzeby", "Lekarz, poradnia"],
            ["Zaświadczenie ze szkoły lub przedszkola", "Np. przy sporze o miejsce zamieszkania", "Placówka"],
          ],
          caption: "Dokumenty dotyczące dzieci",
        },
        {
          type: "checklist",
          items: [
            "Zestawiłem/Zestawiłam koszty dziecka z ostatnich 3–6 miesięcy.",
            "Mam potwierdzenia płatności za stałe wydatki (przedszkole, zajęcia, leki).",
            "Mam dokumenty o swoich dochodach (PIT za ostatni rok, zaświadczenie z pracy).",
            "Spisałem/Spisałam obecny rytm opieki: kto zawozi, kto odbiera, kto jest z dzieckiem w weekendy.",
          ],
        },
      ],
    },
    {
      heading: "Majątek: nieruchomości, pojazdy, konta, firma",
      intro:
        "Potrzebne, jeśli chcesz dzielić majątek. Przede wszystkim jednak po to, by wiedzieć, co jest wspólne, a co osobiste.",
      blocks: [
        {
          type: "table",
          head: ["Składnik", "Dokumenty", "Skąd"],
          rows: [
            ["Mieszkanie, dom, działka", "Numer księgi wieczystej, akt notarialny, umowa deweloperska, przydział spółdzielczego prawa", "ekw.ms.gov.pl, notariusz, spółdzielnia"],
            ["Wartość nieruchomości", "Operat szacunkowy lub oferty z rynku", "Rzeczoznawca; portale (orientacyjnie)"],
            ["Samochód, motocykl", "Dowód rejestracyjny, umowa kupna lub faktura, polisa", "Twoje dokumenty, ubezpieczyciel"],
            ["Konta i lokaty", "Wyciągi z 12 miesięcy, saldo na dzień rozstania", "Bankowość elektroniczna, oddział"],
            ["Inwestycje, akcje, fundusze", "Zestawienie portfela, potwierdzenia nabycia", "Dom maklerski, TFI"],
            ["PPK, IKE, IKZE, polisy", "Ostatnie zestawienie środków, umowa", "Instytucja finansowa, pracodawca (PPK)"],
            ["Firma", "Wpis CEIDG lub KRS, umowa spółki, bilans lub KPiR, wykaz środków trwałych", "CEIDG, KRS, księgowość"],
            ["Darowizny i spadki", "Umowa darowizny, poświadczenie dziedziczenia lub postanowienie o nabyciu spadku", "Notariusz, sąd, Twoje archiwum"],
            ["Majątek sprzed ślubu", "Dokumenty nabycia z datą sprzed ślubu", "Twoje archiwum, notariusz, bank"],
            ["Intercyza", "Akt notarialny", "Notariusz, który go sporządził"],
          ],
          caption: "Dokumenty majątkowe: co i skąd",
        },
        {
          type: "callout",
          tone: "info",
          title: "Darowizny i spadki",
          text: "Co do zasady należą do Twojego majątku osobistego, chyba że darczyńca lub spadkodawca postanowił inaczej. Dokument z datą i stronami pomaga to wykazać.",
        },
      ],
    },
    {
      heading: "Kredyt i inne zobowiązania",
      intro:
        "Rozwód nie zmienia umowy kredytowej. Bank może żądać spłaty od każdego z kredytobiorców. Przejęcie kredytu przez jedną osobę wymaga zgody banku.",
      blocks: [
        {
          type: "checklist",
          items: [
            "Umowa kredytu wraz z aneksami.",
            "Aktualny harmonogram spłat.",
            "Zaświadczenie z banku o saldzie zadłużenia na określony dzień.",
            "Informacja o zabezpieczeniach: hipoteka, ubezpieczenie, cesja polisy.",
            "Potwierdzenia, kto i z jakich środków spłacał raty (szczególnie po rozstaniu).",
            "Umowy innych kredytów, pożyczek, leasingów, kart kredytowych.",
            "Warunki przejęcia kredytu przez jedną osobę: zapytaj bank o dokumenty i wymaganą zdolność kredytową.",
          ],
        },
        {
          type: "callout",
          tone: "warning",
          title: "Ustalenia „między nami” nie wiążą banku",
          text: "Nawet jeśli ustalicie, że kredyt spłaca jedna osoba, bank nie jest tym związany bez swojej zgody. Porozmawiaj z bankiem przed podziałem majątku.",
        },
      ],
    },
    {
      heading: "Ustalenia i próba mediacji",
      intro:
        "Zachowaj dokumenty z etapu ustaleń: spisane uzgodnienia i ślad próby mediacji, także gdy druga strona odmówiła.",
      blocks: [
        {
          type: "checklist",
          items: [
            "Spisane ustalenia z rozmów (notatka lub e-mail podsumowujący), także częściowe.",
            "Porozumienie rodzicielskie, jeśli je macie.",
            "Ugoda zawarta przed mediatorem, jeśli mediacja zakończyła się porozumieniem.",
            "Zaproszenie do mediacji (od Ciebie albo od wybranego mediatora lub ośrodka).",
            "Odpowiedź drugiej strony (albo informacja, że jej nie było) i korespondencja w sprawie mediacji.",
            "Pisemna informacja od mediatora o przebiegu mediacji albo o braku zgody drugiej strony.",
          ],
        },
        { type: "mediationAttempt" },
      ],
    },
    {
      heading: "Do pozwu: dokumenty potrzebne zawsze",
      intro: "Bez nich pozew może wrócić do uzupełnienia. Odpisy zamów wcześniej, a pozew pisz na gotowych ustaleniach.",
      blocks: [
        {
          type: "checklist",
          items: [
            "Odpis skrócony aktu małżeństwa z USC lub online przez gov.pl.",
            "Odpisy skrócone aktów urodzenia wspólnych małoletnich dzieci.",
            "Dowód opłaty od pozwu (600 zł) albo wniosek o zwolnienie od kosztów z oświadczeniem o rodzinie, majątku i dochodach.",
            "Pozew wraz z odpisem dla drugiej strony (i odpisami wszystkich załączników).",
            "Pełnomocnictwo i dowód opłaty skarbowej, jeśli działa za Ciebie pełnomocnik.",
            "Twój numer PESEL i aktualne adresy obu stron (do wpisania w pozwie).",
          ],
        },
        {
          type: "callout",
          tone: "info",
          title: "Odpis online",
          text: "Odpis aktu zamówisz na gov.pl z profilem zaufanym lub e-dowodem. Opłatę skarbową sprawdzisz w usłudze.",
        },
      ],
    },
    {
      heading: "Skąd wziąć dokumenty",
      blocks: [
        {
          type: "table",
          head: ["Gdzie", "Co tam uzyskasz", "Wskazówka"],
          rows: [
            ["USC / gov.pl", "Odpisy aktu małżeństwa i aktów urodzenia", "Online lub w dowolnym USC"],
            ["ekw.ms.gov.pl", "Treść księgi wieczystej", "Numer KW znajdziesz m.in. w akcie notarialnym"],
            ["Bank", "Wyciągi, saldo kredytu, harmonogram, zaświadczenia", "Część pobierzesz online; zaświadczenia bywają płatne"],
            ["Pracodawca", "Zaświadczenie o zarobkach, informacja o PPK", "Dział kadr lub system HR"],
            ["e-Urząd Skarbowy", "PIT-y, zaświadczenia o dochodach", "Online po zalogowaniu"],
            ["Notariusz", "Wypisy aktów notarialnych", "Ten, który sporządził akt"],
            ["CEIDG / KRS", "Dane firmy lub spółki", "Wyszukiwarki online"],
          ],
          caption: "Ściąga: gdzie po dokumenty",
        },
      ],
    },
    {
      heading: "Arkusz kontrolny",
      intro: "Wypisz braki i zaplanuj, kiedy je uzupełnisz. Jedna rzecz dziennie wystarczy.",
      blocks: [
        {
          type: "worksheet",
          title: "Co mam, czego brakuje",
          fields: [
            "Dokumenty, które już mam (lista):",
            "Brakuje mi (do zamówienia online):",
            "Brakuje mi (do odebrania osobiście, gdzie i kiedy):",
            "Dokumenty ustaleń i próby mediacji (co mam, czego brakuje):",
            "Pytania do banku:",
            "Pytania do prawnika:",
            "Termin, do którego chcę mieć komplet:",
          ],
        },
      ],
    },
    {
      heading: "Co dalej?",
      blocks: [
        {
          type: "p",
          text: "Komplet dokumentów to dobry start do rozmów o ustaleniach, a potem do pozwu. W Nowym Etapie pomożemy przełożyć je na Plan Rozwodu: mieszkanie, kredyt, majątek i opieka nad dziećmi. Materiał jest informacyjny, decyzje skonsultuj z prawnikiem.",
        },
      ],
    },
  ],
};
