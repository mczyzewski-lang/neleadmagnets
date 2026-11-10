import type { Material } from "../types";

export const material: Material = {
  slug: "bezpieczenstwo-cyfrowe-i-finansowe",
  format: "Przewodnik",
  coverTitle: "Bezpieczeństwo cyfrowe i finansowe",
  coverSubtitle: "Spokojny przewodnik na czas rozstania",
  coverTone: "green",
  h1: "Bezpieczeństwo cyfrowe i finansowe w czasie rozstania",
  h2: "Hasła, wspólne konta, lokalizacja, karty i kredyty — krok po kroku, bez paniki i bez działań, które mogą ci zaszkodzić.",
  promise:
    "Uporządkujesz swoje konta, urządzenia i finanse tak, by czuć się bezpieczniej — zgodnie z prawem i bez eskalowania konfliktu.",
  forWho: [
    "Przez lata dzieliliście hasła, urządzenia, konta w serwisach i bankowość.",
    "Nie wiesz, do czego druga osoba nadal ma dostęp — i chcesz to sprawdzić.",
    "Masz wspólne konto bankowe, karty lub kredyty i zastanawiasz się, co z nimi zrobić.",
    "Chcesz zadbać o siebie, ale nie chcesz zrobić niczego, co obróci się przeciwko tobie.",
  ],
  inside: [
    "Checklistę zabezpieczenia własnej poczty, telefonu i haseł z weryfikacją dwuetapową.",
    "Mapę wspólnych kont: streaming, chmura ze zdjęciami, rodzinne konta Google i Apple.",
    "Instrukcję przeglądu udostępniania lokalizacji i wspólnych urządzeń.",
    "Zasady dotyczące wspólnych rachunków i kart — co robić, a czego unikać.",
    "Informacje o raporcie BIK i zastrzeżeniu numeru PESEL.",
    "Wskazówki, jak gromadzić dokumentację i czego nie robić z kontami drugiej osoby.",
    "Numery pomocowe, gdy chodzi o twoje bezpieczeństwo.",
  ],
  time: "30 min",
  faq: [
    {
      q: "Czy mogę wypłacić pieniądze ze wspólnego konta, żeby je „zabezpieczyć”?",
      a: "To ryzykowne. Opróżnienie wspólnego rachunku może mieć konsekwencje w rozliczeniach majątkowych, a w niektórych sytuacjach także inne skutki prawne. Zanim wykonasz większy ruch, porozmawiaj z prawnikiem.",
    },
    {
      q: "Znam hasło do poczty partnera. Czy mogę tam zajrzeć, żeby zebrać dowody?",
      a: "Nie rób tego. Uzyskanie dostępu do cudzej poczty czy konta bez uprawnień może być przestępstwem (art. 267 Kodeksu karnego), nawet jeśli znasz hasło. Dowody zbieraj z własnych źródeł i zapytaj prawnika, co będzie przydatne.",
    },
    {
      q: "Czym jest zastrzeżenie PESEL i czy jest płatne?",
      a: "To usługa, która utrudnia zaciągnięcie kredytu czy pożyczki na twoje dane. Zastrzeżenia możesz dokonać m.in. w aplikacji mObywatel lub przez gov.pl. Aktualne zasady i sposób cofnięcia zastrzeżenia sprawdź na stronie gov.pl.",
    },
    {
      q: "Czy muszę od razu zmieniać wszystkie hasła?",
      a: "Zacznij od najważniejszych: poczta, telefon, bankowość, chmura. Poczta jest kluczem do resetowania innych haseł, więc warto zabezpieczyć ją jako pierwszą. Resztę możesz zrobić w kolejnych dniach.",
    },
    {
      q: "Boję się reakcji drugiej osoby na zmianę haseł. Co robić?",
      a: "Twoje bezpieczeństwo jest najważniejsze. Jeśli obawiasz się przemocy, najpierw porozmawiaj ze specjalistą (np. Niebieska Linia 800 120 002) i zaplanuj kolejność działań. W sytuacji zagrożenia dzwoń pod 112.",
    },
  ],
  sources: [
    {
      label: "Zastrzeżenie numeru PESEL — gov.pl",
      url: "https://www.gov.pl/web/gov/zastrzez-swoj-numer-pesel",
      verified: "2026-11-10",
    },
    {
      label: "Kodeks karny, art. 267 (nielegalne uzyskanie informacji)",
      url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19970880553",
      verified: "2026-11-10",
    },
    {
      label: "Kodeks rodzinny i opiekuńczy",
      url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19640090059",
      verified: "2026-11-10",
    },
    {
      label: "Niebieska Linia",
      url: "https://www.niebieskalinia.info/",
      verified: "2026-11-10",
    },
  ],
  nextOffer: "konsultacja",
  ctaLabel: "Porozmawiaj o bezpiecznym planie na czas rozstania",
  seo: {
    title: "Bezpieczeństwo cyfrowe po rozstaniu | Nowy Etap",
    description:
      "Hasła, wspólne konta, lokalizacja, karty, BIK i zastrzeżenie PESEL. Praktyczny przewodnik bezpieczeństwa cyfrowego i finansowego na czas rozstania.",
  },
  coverPrompt:
    "Photorealistic 3D render of a standing hardcover book at a slight angle on a warm off-white (#FCF9F8) background with a soft natural shadow. Deep green (#295550) cover with dark green (#263D3A) spine and refined gold (#C79B59) accents. Minimalist premium typography. Small wordmark text at the top: \"NOWY ETAP · PORADNIA ROZWODOWA\". Exact cover title: \"Bezpieczeństwo cyfrowe i finansowe\". Exact subtitle: \"Spokojny przewodnik na czas rozstania\". Small label \"PRZEWODNIK\". A subtle thin gold staircase line motif, optionally combined with a minimal gold keyhole outline. No gavels, no paragraph symbols, no people, no wedding rings, no padlock clipart. Square 1:1 composition, high detail, keep text minimal and exactly as written.",
  sections: [
    {
      heading: "Zacznij od siebie: poczta, telefon, hasła",
      intro:
        "Twoja skrzynka e-mail to klucz do większości innych kont — przez nią resetuje się hasła. Dlatego zabezpiecz ją jako pierwszą.",
      blocks: [
        {
          type: "checklist",
          items: [
            "Zmień hasło do głównej poczty na nowe, długie i niepowtarzalne (najlepiej fraza z kilku słów).",
            "Włącz weryfikację dwuetapową (2FA) — najlepiej przez aplikację uwierzytelniającą lub klucz sprzętowy, a nie tylko SMS.",
            "Sprawdź w ustawieniach poczty listę zalogowanych urządzeń i wyloguj wszystkie, których nie rozpoznajesz.",
            "Zaktualizuj telefon i e-mail odzyskiwania — upewnij się, że to twoje dane, a nie drugiej osoby.",
            "Sprawdź reguły przekierowania i filtry w poczcie (czy wiadomości nie są automatycznie przesyłane dalej).",
            "Zmień PIN i kod blokady telefonu; usuń z telefonu odciski palców lub twarze, które nie są twoje.",
            "Zmień hasło do konta Apple ID lub Google powiązanego z telefonem.",
            "Rozważ menedżer haseł, by każde konto miało inne hasło.",
            "Zmień hasła do bankowości elektronicznej i sprawdź zaufane urządzenia w aplikacji banku.",
          ],
        },
        {
          type: "callout",
          tone: "info",
          title: "Kolejność ma znaczenie",
          text: "Najpierw poczta, potem konto telefonu (Apple/Google), potem bank i chmura, a na końcu serwisy rozrywkowe i zakupowe. Dzięki temu nikt nie zresetuje ci haseł „od tyłu”.",
        },
      ],
    },
    {
      heading: "Wspólne konta i usługi: zrób mapę",
      intro:
        "Przez lata wspólnego życia wiele usług stało się „rodzinnych”. Zanim cokolwiek zmienisz, spisz, co macie wspólnego i kto jest właścicielem konta.",
      blocks: [
        {
          type: "table",
          head: ["Usługa", "Co sprawdzić", "Możliwy krok"],
          rows: [
            [
              "Serwisy streamingowe (np. Netflix, muzyka)",
              "Kto płaci, czyja karta jest podpięta, jakie profile istnieją.",
              "Ustal, kto zostaje przy koncie; drugie z was zakłada własne. Wyloguj nieznane urządzenia.",
            ],
            [
              "Chmura ze zdjęciami",
              "Czyje to konto, czy są wspólne albumy, czy zdjęcia dzieci są w jednym miejscu.",
              "Pobierz kopię swoich zdjęć i zdjęć dzieci. Ustalcie, jak oboje zachowacie dostęp do wspólnych wspomnień.",
            ],
            [
              "Rodzina Google",
              "Kto jest administratorem, czy jest wspólne miejsce na dane, kalendarz, lokalizacja.",
              "Sprawdź, co widzi administrator. Rozważ opuszczenie grupy po zabezpieczeniu swoich danych.",
            ],
            [
              "Chmura rodzinna Apple",
              "Kto jest organizatorem, wspólne zakupy, płatności, udostępnianie lokalizacji, konta dzieci.",
              "Przejrzyj ustawienia udostępniania. Konta dzieci omówcie razem — to wspólna sprawa rodzicielska.",
            ],
            [
              "Sklepy internetowe, dostawy, aplikacje transportowe",
              "Zapisane karty, adresy, historia zamówień.",
              "Usuń swoje karty z kont drugiej osoby i odwrotnie poproś o to samo.",
            ],
            [
              "Wspólny kalendarz, notatki, menedżer haseł",
              "Czy widać tam twoje plany, adresy, hasła.",
              "Przenieś prywatne wpisy na własne konto.",
            ],
          ],
        },
        {
          type: "worksheet",
          title: "Moja mapa kont",
          fields: [
            "Usługa / właściciel konta / kto płaci",
            "Usługa / właściciel konta / kto płaci",
            "Usługa / właściciel konta / kto płaci",
            "Konta dzieci (kto zarządza, co ustalić z drugim rodzicem)",
            "Co chcę zrobić w tym tygodniu",
          ],
        },
        {
          type: "callout",
          tone: "info",
          text: "Jeśli konto należy do drugiej osoby, nie zmieniaj w nim haseł ani ustawień. Zadbaj o swoje dane i — gdy to możliwe — ustalcie zmiany wspólnie, najlepiej na piśmie.",
        },
      ],
    },
    {
      heading: "Lokalizacja i wspólne urządzenia",
      blocks: [
        {
          type: "checklist",
          items: [
            "Sprawdź udostępnianie lokalizacji w telefonie (np. w aplikacji Znajdź, w Mapach Google, w komunikatorach).",
            "Sprawdź, czy lokalizacja nie jest udostępniana przez grupę rodzinną lub inteligentny zegarek.",
            "Przejrzyj aplikacje z uprawnieniem do lokalizacji i wyłącz to, którego nie potrzebujesz.",
            "Wyloguj się ze swoich kont na wspólnym laptopie, tablecie, telewizorze i konsoli.",
            "Sprawdź zapisane hasła w przeglądarce na wspólnych urządzeniach.",
            "Zastanów się nad urządzeniami w domu: kamery, inteligentne głośniki, alarm — kto ma do nich dostęp?",
            "Jeśli samochód ma aplikację z lokalizacją, sprawdź, kto ją widzi.",
          ],
        },
        {
          type: "callout",
          tone: "safety",
          title: "Gdy wyłączenie lokalizacji może być ryzykowne",
          text: "Jeśli druga osoba jest kontrolująca lub agresywna, nagłe wyłączenie lokalizacji może wywołać jej reakcję. W takiej sytuacji najpierw porozmawiaj ze specjalistą, np. z Niebieską Linią (800 120 002), i zaplanuj kolejne kroki. W zagrożeniu dzwoń pod 112.",
        },
      ],
    },
    {
      heading: "Wspólne konta bankowe, karty i kredyty",
      intro:
        "Pieniądze to obszar, w którym łatwo o pochopne ruchy. Spokój i dokumentacja chronią cię bardziej niż szybkie decyzje.",
      blocks: [
        {
          type: "callout",
          tone: "warning",
          title: "Nie opróżniaj wspólnego konta",
          text: "Wypłata wszystkich środków ze wspólnego rachunku może zostać później uwzględniona w rozliczeniach majątkowych na twoją niekorzyść i zaostrzyć konflikt. Zanim wykonasz większą operację, zapytaj prawnika, jakie są konsekwencje w twojej sytuacji.",
        },
        {
          type: "table",
          head: ["Raczej rób", "Raczej unikaj"],
          rows: [
            [
              "Załóż własne konto na swoje dochody (jeśli jeszcze go nie masz).",
              "Przelewania dużych kwot ze wspólnego konta bez uzgodnienia.",
            ],
            [
              "Spisz salda wspólnych rachunków na konkretny dzień i zachowaj wyciągi.",
              "Zamykania wspólnego rachunku bez wiedzy drugiej osoby i bez porady.",
            ],
            [
              "Ustal na piśmie, z którego konta płacone są stałe opłaty (kredyt, czynsz, przedszkole).",
              "Zaciągania nowych zobowiązań „na zapas”.",
            ],
            [
              "Sprawdź karty dodatkowe wydane do twojego konta i limity na kartach kredytowych.",
              "Używania karty wydanej do konta drugiej osoby, jeśli nie macie na to zgody.",
            ],
            [
              "Zapytaj bank o możliwości zmiany ustawień wspólnego rachunku.",
              "Ukrywania dochodów czy majątku — to zwykle wychodzi na jaw i szkodzi wiarygodności.",
            ],
          ],
        },
        {
          type: "p",
          text: "Wspólne kredyty (hipoteka, gotówkowe, karty kredytowe) nie znikają z rozstaniem. Jeśli oboje jesteście kredytobiorcami, zwykle oboje odpowiadacie za całość zadłużenia. Ustalcie, kto spłaca raty do czasu uporządkowania spraw, i zachowujcie potwierdzenia.",
        },
      ],
    },
    {
      heading: "Raport BIK i zastrzeżenie numeru PESEL",
      blocks: [
        {
          type: "p",
          text: "Raport z Biura Informacji Kredytowej (BIK) pokazuje kredyty, pożyczki i limity zapisane na twoje dane oraz historię ich spłaty. W czasie rozstania warto go pobrać, by mieć pełny obraz zobowiązań — także tych, o których mogłeś nie wiedzieć. Raport można zamówić na stronie BIK; aktualne zasady i ewentualne opłaty sprawdź u źródła.",
        },
        {
          type: "p",
          text: "Od 2023 roku w Polsce działa zastrzeżenie numeru PESEL. Gdy twój PESEL jest zastrzeżony, banki i inne instytucje powinny to sprawdzić przed udzieleniem kredytu czy pożyczki. Zastrzeżenia możesz dokonać m.in. w aplikacji mObywatel lub przez stronę gov.pl. Gdy sam będziesz chciał wziąć kredyt, możesz zastrzeżenie cofnąć. Szczegóły sprawdź na gov.pl.",
        },
        {
          type: "checklist",
          items: [
            "Pobierz raport BIK i sprawdź, czy wszystkie zobowiązania są ci znane.",
            "Zanotuj wspólne zobowiązania i ich salda.",
            "Rozważ zastrzeżenie numeru PESEL w mObywatelu lub na gov.pl.",
            "Jeśli widzisz zobowiązanie, którego nie zaciągałeś, skontaktuj się z instytucją, która je udzieliła, i skonsultuj kolejne kroki z prawnikiem.",
          ],
        },
      ],
    },
    {
      heading: "Dokumentacja: tak, inwigilacja: nie",
      intro:
        "Porządna dokumentacja pomaga w rozmowach, mediacji i — jeśli będzie potrzeba — w sądzie. Ważne jednak, skąd pochodzą informacje.",
      blocks: [
        {
          type: "checklist",
          items: [
            "Zachowuj kopie własnych wyciągów, umów, rachunków i potwierdzeń przelewów.",
            "Rób kopie zapasowe swojej korespondencji z drugą osobą (wiadomości, maile).",
            "Prowadź krótki dziennik ważnych zdarzeń: data, co się stało, kto był świadkiem.",
            "Przechowuj kopie dokumentów w miejscu, do którego druga osoba nie ma dostępu.",
            "Jeśli doszło do przemocy, zachowaj dokumentację medyczną i zgłoszenia.",
          ],
        },
        {
          type: "callout",
          tone: "warning",
          title: "Czego nie robić",
          text: "Nie loguj się na konta drugiej osoby, nie czytaj jej poczty ani komunikatorów, nie instaluj aplikacji śledzących i nie zakładaj podsłuchów. Uzyskanie dostępu do cudzych informacji bez uprawnienia może być przestępstwem (art. 267 Kodeksu karnego) — nawet jeśli znasz hasło lub macie wspólny komputer. O tym, jakie dowody są przydatne i jak je legalnie zbierać, porozmawiaj z prawnikiem.",
        },
      ],
    },
    {
      heading: "Gdy chodzi o twoje bezpieczeństwo",
      blocks: [
        {
          type: "callout",
          tone: "safety",
          title: "Numery, które warto mieć pod ręką",
          text: "W sytuacji zagrożenia życia lub zdrowia dzwoń pod 112. Niebieska Linia — pomoc dla osób doznających przemocy domowej: 800 120 002. Telefon wsparcia emocjonalnego dla dorosłych w kryzysie: 116 123.",
        },
        {
          type: "list",
          items: [
            "Zapisz numery alarmowe w telefonie i miej naładowany telefon.",
            "Ustal z zaufaną osobą hasło, które oznacza „potrzebuję pomocy”.",
            "Trzymaj kopie najważniejszych dokumentów poza domem lub w bezpiecznej chmurze.",
            "Jeśli doświadczasz przemocy, specjaliści pomogą ci zaplanować bezpieczne kroki — nie musisz robić tego sam.",
          ],
        },
      ],
    },
    {
      heading: "Co dalej?",
      blocks: [
        {
          type: "p",
          text: "Gdy twoje konta i finanse są zabezpieczone, łatwiej skupić się na tym, co dalej: podziale majątku, ustaleniach dotyczących dzieci i kolejności kroków przed złożeniem pozwu.",
        },
        {
          type: "p",
          text: "Nowy Etap może pomóc ci przygotować Plan Rozwodu i ustalenia przed pozwem albo poprowadzić mediację, jeśli chcecie rozmawiać przy wsparciu neutralnej osoby. Najpierw plan i ustalenia — dopiero potem pozew. Bez pośpiechu, w twoim tempie.",
        },
      ],
    },
  ],
};
