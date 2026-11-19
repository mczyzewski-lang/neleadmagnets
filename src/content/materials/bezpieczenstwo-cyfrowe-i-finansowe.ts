import type { Material } from "../types";

export const material: Material = {
  slug: "bezpieczenstwo-cyfrowe-i-finansowe",
  format: "Przewodnik",
  coverTitle: "Bezpieczeństwo cyfrowe i finansowe",
  coverSubtitle: "Spokojny przewodnik na czas rozstania",
  coverTone: "green",
  h1: "Bezpieczeństwo cyfrowe i finansowe w czasie rozstania",
  h2: "Hasła, wspólne konta, lokalizacja, karty i kredyty. Krok po kroku, bez paniki i bez ruchów, które mogą ci zaszkodzić.",
  promise:
    "Zabezpieczysz swoje konta, urządzenia i finanse zgodnie z prawem i bez eskalowania konfliktu.",
  forWho: [
    "Przez lata dzieliliście hasła, urządzenia, konta i bankowość.",
    "Nie wiesz, do czego druga osoba nadal ma dostęp.",
    "Masz wspólne konto, karty lub kredyty i nie wiesz, co z nimi zrobić.",
    "Chcesz zadbać o siebie, nie robiąc niczego, co obróci się przeciwko tobie.",
  ],
  inside: [
    "Checklistę zabezpieczenia poczty, telefonu i haseł.",
    "Mapę wspólnych kont: streaming, chmura ze zdjęciami, konta rodzinne Google i Apple.",
    "Przegląd udostępniania lokalizacji i wspólnych urządzeń.",
    "Co robić, a czego unikać przy wspólnych rachunkach i kartach.",
    "Raport BIK i zastrzeżenie numeru PESEL.",
    "Jak zbierać dokumentację legalnie.",
    "Numery pomocowe.",
  ],
  time: "20 min",
  faq: [
    {
      q: "Czy mogę wypłacić pieniądze ze wspólnego konta, żeby je „zabezpieczyć”?",
      a: "To ryzykowne. Może zaszkodzić ci w rozliczeniach majątkowych. Najpierw porozmawiaj z prawnikiem.",
    },
    {
      q: "Znam hasło do poczty partnera. Czy mogę tam zajrzeć po dowody?",
      a: "Nie. Wejście na cudze konto bez uprawnienia może być przestępstwem, nawet gdy znasz hasło. Zbieraj dowody z własnych źródeł.",
    },
    {
      q: "Czym jest zastrzeżenie PESEL?",
      a: "Utrudnia wzięcie kredytu na twoje dane. Zrobisz je w mObywatelu lub na gov.pl, gdzie sprawdzisz też aktualne zasady.",
    },
    {
      q: "Czy muszę od razu zmieniać wszystkie hasła?",
      a: "Nie. Zacznij od poczty, telefonu, banku i chmury. Resztę zrób w kolejnych dniach.",
    },
    {
      q: "Dlaczego bezpieczeństwo jest przed ustaleniami i pozwem?",
      a: "Bo to fundament planu. Zanim zaczniesz rozmowy, konta i dane powinny być pod twoją kontrolą.",
    },
    {
      q: "Czy muszę proponować mediację, jeśli boję się drugiej osoby?",
      a: "Nie. Mediacja jest dobrowolna. Najpierw zadbaj o bezpieczeństwo. To, jak opisać w pozwie brak próby mediacji, ustal z prawnikiem.",
    },
    {
      q: "Boję się reakcji drugiej osoby na zmianę haseł. Co robić?",
      a: "Najpierw porozmawiaj ze specjalistą (np. Niebieska Linia 800 120 002) i zaplanuj kolejność działań. W zagrożeniu dzwoń pod 112.",
    },
  ],
  sources: [
    {
      label: "Zastrzeżenie numeru PESEL: gov.pl",
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
      label: "Kodeks postępowania cywilnego: art. 183¹ i nast. (mediacja), art. 187 § 1 pkt 3",
      url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19640430296",
      verified: "2026-11-16",
    },
    {
      label: "Niebieska Linia",
      url: "https://www.niebieskalinia.info/",
      verified: "2026-11-10",
    },
  ],
  nextOffer: "konsultacja",
  stage: 1,
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
        "Przez pocztę resetuje się większość haseł. Zabezpiecz ją pierwszą, potem konto telefonu (Apple/Google), bank i chmurę, a na końcu resztę serwisów.",
      blocks: [
        {
          type: "path",
          current: 1,
          note: "Bezpieczeństwo to pierwszy element planu. Zanim zaczniesz rozmowy czy formalności, upewnij się, że konta i finanse są pod twoją kontrolą.",
        },
        {
          type: "checklist",
          items: [
            "Zmień hasło do głównej poczty na nowe, długie i niepowtarzalne (najlepiej fraza z kilku słów).",
            "Włącz weryfikację dwuetapową (2FA), najlepiej przez aplikację uwierzytelniającą lub klucz sprzętowy, a nie tylko SMS.",
            "Sprawdź w ustawieniach poczty listę zalogowanych urządzeń i wyloguj wszystkie, których nie rozpoznajesz.",
            "Zaktualizuj telefon i e-mail odzyskiwania: to mają być twoje dane, nie drugiej osoby.",
            "Sprawdź reguły przekierowania i filtry w poczcie (czy wiadomości nie są automatycznie przesyłane dalej).",
            "Zmień PIN i kod blokady telefonu; usuń z telefonu odciski palców lub twarze, które nie są twoje.",
            "Zmień hasło do konta Apple ID lub Google powiązanego z telefonem.",
            "Rozważ menedżer haseł, by każde konto miało inne hasło.",
            "Zmień hasła do bankowości elektronicznej i sprawdź zaufane urządzenia w aplikacji banku.",
          ],
        },
      ],
    },
    {
      heading: "Wspólne konta i usługi: zrób mapę",
      intro: "Zanim coś zmienisz, spisz, co macie wspólnego i kto jest właścicielem konta.",
      blocks: [
        {
          type: "table",
          head: ["Usługa", "Co sprawdzić", "Możliwy krok"],
          rows: [
            [
              "Streaming (filmy, muzyka)",
              "Kto płaci, czyja karta, jakie profile.",
              "Ustalcie, kto zostaje przy koncie.",
            ],
            [
              "Chmura ze zdjęciami",
              "Czyje konto, wspólne albumy, zdjęcia dzieci.",
              "Pobierz kopię swoich zdjęć i zdjęć dzieci.",
            ],
            [
              "Rodzina Google",
              "Kto jest administratorem i co widzi.",
              "Po zabezpieczeniu danych rozważ opuszczenie grupy.",
            ],
            [
              "Chmura rodzinna Apple",
              "Organizator, płatności, lokalizacja, konta dzieci.",
              "Przejrzyj udostępnianie. Konta dzieci omówcie razem.",
            ],
            [
              "Sklepy, dostawy, transport",
              "Zapisane karty, adresy, historia zamówień.",
              "Usuń swoje karty z kont drugiej osoby i poproś o to samo.",
            ],
            [
              "Wspólny kalendarz, notatki, menedżer haseł",
              "Czy widać twoje plany, adresy, hasła.",
              "Przenieś prywatne wpisy na własne konto.",
            ],
          ],
        },
        {
          type: "worksheet",
          title: "Moja mapa kont",
          fields: [
            "Usługa 1: właściciel konta, kto płaci",
            "Usługa 2: właściciel konta, kto płaci",
            "Usługa 3: właściciel konta, kto płaci",
            "Konta dzieci (kto zarządza, co ustalić z drugim rodzicem)",
            "Co chcę zrobić w tym tygodniu",
          ],
        },
        {
          type: "callout",
          tone: "info",
          text: "W koncie drugiej osoby nie zmieniaj haseł ani ustawień. Zmiany ustalcie wspólnie, najlepiej na piśmie.",
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
            "Sprawdź, kto ma dostęp do urządzeń w domu: kamer, głośników, alarmu.",
            "Jeśli samochód ma aplikację z lokalizacją, sprawdź, kto ją widzi.",
          ],
        },
        {
          type: "callout",
          tone: "safety",
          title: "Gdy wyłączenie lokalizacji może być ryzykowne",
          text: "Przy osobie kontrolującej lub agresywnej nagłe wyłączenie lokalizacji może wywołać reakcję. Najpierw porozmawiaj ze specjalistą (Niebieska Linia: 800 120 002). W zagrożeniu: 112.",
        },
      ],
    },
    {
      heading: "Wspólne konta bankowe, karty i kredyty",
      intro: "Spokój i dokumentacja chronią cię bardziej niż szybkie decyzje.",
      blocks: [
        {
          type: "callout",
          tone: "warning",
          title: "Nie opróżniaj wspólnego konta",
          text: "Może to zostać rozliczone na twoją niekorzyść i zaostrzyć konflikt. Przed większą operacją zapytaj prawnika.",
        },
        {
          type: "table",
          head: ["Raczej rób", "Raczej unikaj"],
          rows: [
            ["Załóż własne konto na swoje dochody.", "Przelewania dużych kwot ze wspólnego konta bez uzgodnienia."],
            ["Spisz salda wspólnych rachunków na konkretny dzień i zachowaj wyciągi.", "Zamykania wspólnego rachunku bez wiedzy drugiej osoby i bez porady."],
            ["Ustal na piśmie, z którego konta idą stałe opłaty (kredyt, czynsz, przedszkole).", "Brania nowych zobowiązań „na zapas”."],
            ["Sprawdź karty dodatkowe do twojego konta i limity na kartach kredytowych.", "Używania karty do konta drugiej osoby bez jej zgody."],
            ["Zapytaj bank o zmianę ustawień wspólnego rachunku.", "Ukrywania dochodów lub majątku. Zwykle wychodzi to na jaw."],
          ],
        },
        {
          type: "p",
          text: "Wspólne kredyty nie znikają z rozstaniem. Ustalcie, kto spłaca raty, i zachowujcie potwierdzenia.",
        },
      ],
    },
    {
      heading: "Raport BIK i zastrzeżenie numeru PESEL",
      blocks: [
        {
          type: "p",
          text: "Raport BIK pokazuje kredyty, pożyczki i limity na twoje dane, także te, o których nie wiesz.",
        },
        {
          type: "p",
          text: "Zastrzeżony PESEL utrudnia wzięcie kredytu na twoje dane. Możesz je cofnąć, gdy sam będziesz brać kredyt.",
        },
        {
          type: "checklist",
          items: [
            "Pobierz raport BIK i sprawdź, czy wszystkie zobowiązania są ci znane.",
            "Zanotuj wspólne zobowiązania i ich salda.",
            "Rozważ zastrzeżenie numeru PESEL w mObywatelu lub na gov.pl.",
            "Jeśli widzisz nieznane zobowiązanie, skontaktuj się z instytucją, która je udzieliła, i z prawnikiem.",
          ],
        },
      ],
    },
    {
      heading: "Dokumentacja: tak, inwigilacja: nie",
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
          text: "Nie loguj się na konta drugiej osoby, nie czytaj jej poczty, nie instaluj aplikacji śledzących. To może być przestępstwo, nawet przy znanym haśle. O legalnych dowodach porozmawiaj z prawnikiem.",
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
          text: "Zagrożenie życia lub zdrowia: 112. Niebieska Linia (przemoc domowa): 800 120 002. Wsparcie dla dorosłych w kryzysie: 116 123.",
        },
        {
          type: "list",
          items: [
            "Ustal z zaufaną osobą hasło, które oznacza „potrzebuję pomocy”.",
            "Trzymaj kopie dokumentów poza domem lub w bezpiecznej chmurze.",
            "Przy przemocy specjaliści pomogą ci zaplanować bezpieczne kroki.",
          ],
        },
      ],
    },
    {
      heading: "Co dalej?",
      blocks: [
        {
          type: "p",
          text: "Gdy konta są zabezpieczone, dokończ plan, a potem przejdź do ustaleń. Nowy Etap pomoże przygotować Plan Rozwodu albo poprowadzi mediację, jeśli jest to bezpieczne.",
        },
        {
          type: "callout",
          tone: "safety",
          title: "Najpierw bezpieczeństwo",
          text: "Przy przemocy, groźbach lub kontroli (także finansowej czy cyfrowej) nie musisz proponować mediacji. Kolejność kroków ustal z prawnikiem lub ośrodkiem pomocy.",
        },
      ],
    },
  ],
};
