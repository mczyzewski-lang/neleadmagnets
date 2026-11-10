import type { Material } from "../types";

export const material: Material = {
  slug: "checklista-dokumentow",
  format: "Checklista",
  coverTitle: "Checklista dokumentów do rozwodu",
  coverSubtitle: "Rozwód · dzieci · majątek · kredyt",
  coverTone: "gold",
  h1: "Checklista dokumentów do rozwodu, podziału majątku i spraw dzieci",
  h2: "Zbierz wszystko w jednym miejscu: co jest potrzebne zawsze, co zależy od Twojej sytuacji i gdzie to uzyskać.",
  promise:
    "Jedna lista dokumentów do rozwodu, majątku, dzieci i kredytu — z informacją, skąd je wziąć.",
  forWho: [
    "Dla osób, które przygotowują się do złożenia pozwu o rozwód lub separację.",
    "Dla tych, którzy chcą uporządkować dokumenty majątkowe przed rozmową z prawnikiem lub mediatorem.",
    "Dla rodziców, którzy będą ustalać alimenty i kontakty z dziećmi.",
    "Dla osób ze wspólnym kredytem hipotecznym lub wspólną nieruchomością.",
  ],
  inside: [
    "Dokumenty potrzebne zawsze — podstawa każdego pozwu",
    "Dokumenty dotyczące dzieci i alimentów",
    "Dokumenty majątkowe: nieruchomości, pojazdy, konta, firma",
    "Kredyt hipoteczny i inne zobowiązania — co zebrać z banku",
    "Tabela „skąd to wziąć”: USC, gov.pl, ekw.ms.gov.pl, bank, pracodawca",
    "Arkusz kontrolny: co już mam, czego brakuje",
  ],
  time: "15 min",
  faq: [
    {
      q: "Jaki odpis aktu małżeństwa dołączyć do pozwu?",
      a: "Najczęściej dołącza się odpis skrócony aktu małżeństwa. Możesz go zamówić w dowolnym urzędzie stanu cywilnego albo online przez gov.pl. Przed złożeniem pozwu warto sprawdzić, czy sąd w Twojej sprawie nie oczekuje odpisu zupełnego.",
    },
    {
      q: "Czy muszę mieć wszystkie dokumenty majątkowe już przy pozwie?",
      a: "Nie zawsze. Do samego pozwu o rozwód potrzebne są przede wszystkim odpisy aktów stanu cywilnego i dowód opłaty. Dokumenty majątkowe są niezbędne, jeśli wnosisz o podział majątku w wyroku albo przygotowujesz porozumienie. Zebranie ich wcześniej ułatwia jednak rozmowy i planowanie.",
    },
    {
      q: "Jak sprawdzić księgę wieczystą mieszkania?",
      a: "Treść księgi wieczystej możesz bezpłatnie przejrzeć w serwisie Ministerstwa Sprawiedliwości ekw.ms.gov.pl, jeśli znasz numer księgi. Znajdziesz tam m.in. właścicieli i hipoteki.",
    },
    {
      q: "Czy po rozwodzie bank wykreśli mnie z kredytu?",
      a: "Nie automatycznie. Rozwód nie zmienia umowy kredytowej — współkredytobiorcy nadal odpowiadają solidarnie (art. 366 KC). Zmiana dłużnika wymaga zgody banku (art. 519 KC), który zwykle ponownie bada zdolność kredytową.",
    },
  ],
  sources: [
    { label: "Kodeks rodzinny i opiekuńczy (art. 31, 33, 58)", url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19640090059", verified: "2026-11-10" },
    { label: "Kodeks cywilny (art. 366, art. 519)", url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19640160093", verified: "2026-11-10" },
    { label: "Ustawa o kosztach sądowych w sprawach cywilnych (art. 26)", url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20051671398", verified: "2026-11-10" },
    { label: "gov.pl — Uzyskaj odpis aktu stanu cywilnego", url: "https://www.gov.pl/web/gov/uzyskaj-odpis-aktu-stanu-cywilnego", verified: "2026-11-10" },
    { label: "Elektroniczne Księgi Wieczyste — ekw.ms.gov.pl", url: "https://ekw.ms.gov.pl/", verified: "2026-11-10" },
  ],
  nextOffer: "plan-rozwodu",
  ctaLabel: "Uporządkuj dokumenty w Planie Rozwodu",
  seo: {
    title: "Checklista dokumentów do rozwodu | Nowy Etap",
    description:
      "Jakie dokumenty do rozwodu, podziału majątku, alimentów i kredytu? Lista: co zawsze, co zależnie od sytuacji i skąd to wziąć. Bezpłatny PDF.",
  },
  coverPrompt:
    "Photorealistic 3D render of a standing spiral-bound checklist booklet at a slight angle on a warm off-white (#FCF9F8) background with a soft natural shadow. The cover is warm gold (#C79B59) with deep green (#295550) typography and a thin dark green (#263D3A) border. Minimalist premium typography. Render this exact text, spelled exactly, and keep all text minimal: small wordmark at the top \"NOWY ETAP · PORADNIA ROZWODOWA\"; main title \"Checklista dokumentów do rozwodu\"; subtitle \"Rozwód · dzieci · majątek · kredyt\". A subtle thin staircase line motif (a stylised ascending step line) in deep green near the bottom, with three small elegant check marks. No gavels, no paragraph symbols, no people, no wedding rings, no other text. Square 1:1 composition, high detail, elegant studio lighting.",
  sections: [
    {
      heading: "Jak korzystać z tej checklisty",
      intro:
        "Dokumenty to fundament spokojnego przygotowania. Kiedy masz je w jednym miejscu, łatwiej rozmawiać o ustaleniach, a prawnik lub mediator szybciej zobaczy pełny obraz.",
      blocks: [
        {
          type: "list",
          items: [
            "Lista jest podzielona na grupy: zawsze potrzebne, dzieci, majątek, kredyt i zobowiązania.",
            "Przy każdej grupie zaznaczamy, kiedy dany dokument jest potrzebny — nie musisz zbierać wszystkiego, jeśli Twoja sytuacja tego nie wymaga.",
            "Zrób osobny folder (papierowy i/lub w chmurze) i skanuj dokumenty od razu po otrzymaniu.",
            "Zbieraj kopie dokumentów, do których masz legalny dostęp. Nie zabieraj i nie ukrywaj oryginałów należących do drugiej strony — to może zaostrzyć konflikt.",
          ],
        },
        {
          type: "callout",
          tone: "info",
          text: "Materiał ma charakter informacyjny. Sąd w konkretnej sprawie może poprosić o dodatkowe dokumenty — w razie wątpliwości zapytaj prawnika.",
        },
      ],
    },
    {
      heading: "Dokumenty potrzebne zawsze",
      intro: "To podstawa pozwu o rozwód (lub separację). Bez nich pozew może zostać zwrócony do uzupełnienia.",
      blocks: [
        {
          type: "checklist",
          items: [
            "Odpis skrócony aktu małżeństwa — z USC lub online przez gov.pl.",
            "Odpisy skrócone aktów urodzenia wspólnych małoletnich dzieci — j.w.",
            "Dowód uiszczenia opłaty od pozwu: 600 zł (art. 26 ustawy o kosztach sądowych w sprawach cywilnych) albo wniosek o zwolnienie od kosztów z oświadczeniem o stanie rodzinnym, majątku i dochodach.",
            "Pozew wraz z odpisem dla drugiej strony (i odpisami wszystkich załączników).",
            "Pełnomocnictwo i dowód opłaty skarbowej od pełnomocnictwa — jeśli działa w Twoim imieniu pełnomocnik.",
            "Twój numer PESEL i aktualne adresy obu stron (do wpisania w pozwie).",
          ],
        },
        {
          type: "callout",
          tone: "info",
          title: "Odpis online",
          text: "Odpis aktu stanu cywilnego (małżeństwa, urodzenia) możesz zamówić przez internet na gov.pl — z profilem zaufanym lub e-dowodem. Możesz wybrać odbiór elektroniczny lub w urzędzie. Sprawdź aktualną opłatę skarbową w usłudze na gov.pl.",
        },
      ],
    },
    {
      heading: "Dzieci i alimenty",
      intro:
        "Sąd w wyroku rozwodowym rozstrzyga o władzy rodzicielskiej, kontaktach i kosztach utrzymania dzieci (art. 58 § 1 KRO). Dokumenty pomagają pokazać realne potrzeby dziecka i możliwości rodziców.",
      blocks: [
        {
          type: "table",
          head: ["Dokument", "Kiedy potrzebny", "Skąd"],
          rows: [
            ["Porozumienie rodzicielskie / plan wychowawczy", "Gdy macie uzgodnienia co do opieki i kontaktów (art. 58 § 1a KRO)", "Spisujecie sami, z prawnikiem lub w mediacji"],
            ["Zestawienie miesięcznych kosztów dziecka", "Gdy ustalane są alimenty", "Twoje wyliczenie + rachunki"],
            ["Rachunki i faktury (przedszkole, szkoła, zajęcia, leczenie)", "Gdy ustalane są alimenty", "Placówki, lekarze, Twoje konto"],
            ["Zaświadczenia o zarobkach obu rodziców", "Gdy ustalane są alimenty", "Pracodawca; PIT z urzędu skarbowego / e-Urząd Skarbowy"],
            ["Dokumentacja szczególnych potrzeb dziecka (np. leczenie, terapia)", "Gdy dziecko ma dodatkowe potrzeby", "Lekarz, poradnia, placówka"],
            ["Zaświadczenie ze szkoły/przedszkola", "Zależnie od sytuacji, np. przy sporze o miejsce zamieszkania", "Placówka"],
          ],
          caption: "Dokumenty dotyczące dzieci",
        },
        {
          type: "checklist",
          items: [
            "Zestawiłem/Zestawiłam/am koszty dziecka z ostatnich 3–6 miesięcy.",
            "Mam potwierdzenia płatności za stałe wydatki (przedszkole, zajęcia, leki).",
            "Mam dokumenty o swoich dochodach (PIT za ostatni rok, zaświadczenie z pracy).",
            "Spisałem/Spisałam/am obecny rytm opieki: kto zawozi, kto odbiera, kto jest z dzieckiem w weekendy.",
          ],
        },
      ],
    },
    {
      heading: "Majątek: nieruchomości, pojazdy, konta, firma",
      intro:
        "Te dokumenty są potrzebne, jeśli chcesz dzielić majątek w wyroku, osobno w sądzie albo umownie — a także po to, by w ogóle wiedzieć, co wchodzi do majątku wspólnego (art. 31 KRO), a co jest Twoim majątkiem osobistym (art. 33 KRO).",
      blocks: [
        {
          type: "table",
          head: ["Składnik", "Dokumenty", "Skąd"],
          rows: [
            ["Mieszkanie / dom / działka", "Numer księgi wieczystej, akt notarialny nabycia, umowa deweloperska, decyzja o przydziale spółdzielczego prawa", "ekw.ms.gov.pl (podgląd KW), notariusz, spółdzielnia"],
            ["Wartość nieruchomości", "Operat szacunkowy lub orientacyjne oferty z rynku", "Rzeczoznawca majątkowy; portale ogłoszeniowe (orientacyjnie)"],
            ["Samochód, motocykl", "Dowód rejestracyjny, umowa kupna / faktura, polisa", "Twoje dokumenty, ubezpieczyciel"],
            ["Konta i lokaty", "Wyciągi z ostatnich 12 miesięcy, saldo na dzień rozstania", "Bankowość elektroniczna, oddział"],
            ["Inwestycje, akcje, fundusze", "Zestawienie portfela, potwierdzenia nabycia", "Dom maklerski, TFI"],
            ["PPK, IKE, IKZE, polisy", "Ostatnie zestawienie środków, umowa", "Instytucja finansowa, pracodawca (PPK)"],
            ["Firma / działalność", "Wpis CEIDG lub KRS, umowa spółki, bilans / KPiR, wykaz środków trwałych", "CEIDG, KRS, księgowość"],
            ["Darowizny i spadki", "Umowa darowizny, akt poświadczenia dziedziczenia, postanowienie sądu o stwierdzeniu nabycia spadku", "Notariusz, sąd, Twoje archiwum"],
            ["Majątek sprzed ślubu", "Dokumenty nabycia z datą sprzed ślubu", "Twoje archiwum, notariusz, bank"],
            ["Umowa majątkowa małżeńska (intercyza)", "Akt notarialny", "Notariusz, który sporządzał akt"],
          ],
          caption: "Dokumenty majątkowe — co i skąd",
        },
        {
          type: "callout",
          tone: "info",
          title: "Dlaczego darowizny i spadki są ważne",
          text: "To, co dostałeś w darowiźnie lub odziedziczyłeś, co do zasady należy do Twojego majątku osobistego, chyba że darczyńca lub spadkodawca postanowił inaczej (art. 33 KRO). Dokument z datą i stronami umowy bywa kluczowy, gdy trzeba to wykazać.",
        },
      ],
    },
    {
      heading: "Kredyt hipoteczny i inne zobowiązania",
      intro:
        "Rozwód nie zmienia umowy kredytowej. Jeśli oboje jesteście kredytobiorcami, bank nadal może żądać spłaty od każdego z Was (solidarność dłużników, art. 366 KC). Zmiana dłużnika — np. przejęcie kredytu przez jedną osobę — wymaga zgody banku (art. 519 KC).",
      blocks: [
        {
          type: "checklist",
          items: [
            "Umowa kredytu wraz z aneksami.",
            "Aktualny harmonogram spłat.",
            "Zaświadczenie z banku o saldzie zadłużenia na określony dzień.",
            "Informacja o zabezpieczeniach: hipoteka, ubezpieczenie, cesja polisy.",
            "Potwierdzenia, kto i z jakich środków spłacał raty (szczególnie po rozstaniu) — mogą mieć znaczenie przy rozliczeniach.",
            "Umowy innych kredytów, pożyczek, leasingów, kart kredytowych.",
            "Informacja o warunkach przejęcia kredytu przez jednego kredytobiorcę — zapytaj bank, jakie dokumenty i jaką zdolność kredytową będzie badał.",
          ],
        },
        {
          type: "callout",
          tone: "warning",
          title: "Uwaga na ustalenia „między nami”",
          text: "Nawet jeśli w porozumieniu lub przy podziale majątku ustalicie, że kredyt spłaca jedna osoba, bank nie jest tym związany bez swojej zgody. Wobec banku oboje nadal odpowiadacie. Dlatego rozmowę z bankiem warto zaplanować przed ostatecznym podziałem majątku.",
        },
      ],
    },
    {
      heading: "Skąd wziąć dokumenty — ściąga",
      blocks: [
        {
          type: "table",
          head: ["Gdzie", "Co tam uzyskasz", "Wskazówka"],
          rows: [
            ["Urząd stanu cywilnego / gov.pl", "Odpisy aktu małżeństwa i aktów urodzenia dzieci", "Online z profilem zaufanym lub e-dowodem; możesz zamówić w dowolnym USC"],
            ["ekw.ms.gov.pl", "Podgląd treści księgi wieczystej", "Potrzebny numer KW (znajdziesz go m.in. w akcie notarialnym)"],
            ["Bank", "Wyciągi, saldo kredytu, harmonogram, zaświadczenia", "Część pobierzesz w bankowości elektronicznej; zaświadczenia bywają płatne"],
            ["Pracodawca", "Zaświadczenie o zarobkach, informacja o PPK", "Poproś dział kadr lub sprawdź w systemie HR"],
            ["Urząd skarbowy / e-Urząd Skarbowy", "PIT-y, zaświadczenia o dochodach", "Dostęp online po zalogowaniu"],
            ["Notariusz", "Wypisy aktów notarialnych", "Notariusz, który sporządzał akt, przechowuje jego oryginał"],
            ["CEIDG / KRS", "Dane działalności lub spółki", "Wyszukiwarki online"],
          ],
          caption: "Ściąga: gdzie po dokumenty",
        },
      ],
    },
    {
      heading: "Arkusz kontrolny",
      intro: "Wypisz brakujące dokumenty i zaplanuj, kiedy je zdobędziesz. Jedna rzecz dziennie wystarczy.",
      blocks: [
        {
          type: "worksheet",
          title: "Co mam, czego brakuje",
          fields: [
            "Dokumenty, które już mam (lista):",
            "Brakuje mi — do zamówienia online:",
            "Brakuje mi — do odebrania osobiście (gdzie, kiedy):",
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
          text: "Komplet dokumentów to świetny punkt wyjścia do rozmowy o ustaleniach. Jeśli chcesz, w Nowym Etapie pomożemy Ci przełożyć je na Plan Rozwodu: kto zostaje w mieszkaniu, co z kredytem, jak podzielić majątek i jak zorganizować opiekę nad dziećmi — zanim powstanie pozew.",
        },
        {
          type: "p",
          text: "Możesz też najpierw spokojnie zebrać wszystko z tej listy i wrócić do nas, kiedy będziesz gotowy. Pamiętaj, że to materiał informacyjny — ostateczne decyzje skonsultuj z prawnikiem.",
        },
      ],
    },
  ],
};
