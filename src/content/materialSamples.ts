/**
 * Przykładowe "odręczne" wpisy fikcyjnej osoby do materiałów — używane
 * wyłącznie na podglądach landingów jako zajawka (font odręczny, niebieski długopis).
 * Klucze muszą być DOKŁADNYMI kopiami etykiet pól / pozycji checklist z plików materiałów.
 */

export type MaterialSample = {
  /** worksheet field label (copied EXACTLY, character for character, from the material file) -> short handwritten answer */
  fields: Record<string, string>;
  /** checklist item text (copied EXACTLY) -> optional short margin note; presence of the key means the item is ticked */
  ticks: Record<string, string>;
};

export const MATERIAL_SAMPLES: Record<string, MaterialSample> = {
  "bezpieczenstwo-cyfrowe-i-finansowe": {
    fields: {
      "Usługa / właściciel konta / kto płaci": "Netflix — konto wspólne, płacę ja → przenieść",
      "Konta dzieci (kto zarządza, co ustalić z drugim rodzicem)":
        "konto Google Oli (8 l.) — ustalić wspólnie kontrolę rodzicielską",
      "Co chcę zrobić w tym tygodniu": "2FA na poczcie i w banku, do 17.11",
    },
    ticks: {
      "Zmień hasło do głównej poczty na nowe, długie i niepowtarzalne (najlepiej fraza z kilku słów).":
        "zrobione 12.11",
      "Włącz weryfikację dwuetapową (2FA) — najlepiej przez aplikację uwierzytelniającą lub klucz sprzętowy, a nie tylko SMS.":
        "",
      "Sprawdź w ustawieniach poczty listę zalogowanych urządzeń i wyloguj wszystkie, których nie rozpoznajesz.":
        "stary tablet — wylogowany",
      "Zaktualizuj telefon i e-mail odzyskiwania — upewnij się, że to twoje dane, a nie drugiej osoby.":
        "",
      "Zmień hasła do bankowości elektronicznej i sprawdź zaufane urządzenia w aplikacji banku.":
        "",
      "Pobierz raport BIK i sprawdź, czy wszystkie zobowiązania są ci znane.": "pobrany, wszystko się zgadza",
    },
  },

  "checklista-dokumentow": {
    fields: {
      "Dokumenty, które już mam (lista):": "akt małżeństwa, PIT za 2025, umowa kredytu",
      "Brakuje mi — do zamówienia online:": "akty urodzenia Oli i Kuby (gov.pl)",
      "Brakuje mi — do odebrania osobiście (gdzie, kiedy):": "zaświadczenie o saldzie — oddział, pt 20.11",
      "Pytania do banku:": "czy można przejąć kredyt samodzielnie?",
      "Pytania do prawnika:": "jak opisać plan kontaktów w pozwie?",
      "Termin, do którego chcę mieć komplet:": "do 30.11",
    },
    ticks: {
      "Odpis skrócony aktu małżeństwa — z USC lub online przez gov.pl.": "mam — skan w chmurze",
      "Odpisy skrócone aktów urodzenia wspólnych małoletnich dzieci — j.w.": "zamówione 3.11",
      "Twój numer PESEL i aktualne adresy obu stron (do wpisania w pozwie).": "",
      "Mam dokumenty o swoich dochodach (PIT za ostatni rok, zaświadczenie z pracy).": "PIT jest, zaświadczenie od kadr",
      "Umowa kredytu wraz z aneksami.": "",
    },
  },

  "inwentaryzacja-majatku": {
    fields: {
      "Forma prawna (JDG, spółka cywilna, spółka z o.o., inna) i kto jest właścicielem / wspólnikiem:":
        "JDG — prowadzi M.",
      "Data założenia (przed ślubem / w trakcie małżeństwa):": "2019, w trakcie małżeństwa",
      "Udziały / akcje — liczba i szacowana wartość:": "brak (JDG)",
      "Środki trwałe (sprzęt, pojazdy firmowe, lokal):": "laptop, drukarka, auto w leasingu",
      "Środki na rachunkach firmowych na dzień …:": "ok. 18 000 zł na 31.10",
      "Zobowiązania firmy (kredyty, leasingi, zaległości):": "leasing auta, ok. 900 zł/mc",
      "Czy w firmę inwestowano środki wspólne lub osobiste — jakie i kiedy:":
        "ok. 15 000 zł ze wspólnych oszczędności, 2019?",
      "Łączna szacunkowa wartość majątku wspólnego / współwłasności:": "ok. 640 000 zł (mieszkanie + auto)",
      "Łączna kwota długów wspólnych:": "kredyt ok. 310 000 zł",
      "Mój majątek osobisty (najważniejsze składniki):": "działka po babci, oszczędności sprzed ślubu",
      "Nakłady do rozliczenia:": "remont mieszkania z mojej darowizny?",
      "Składniki sporne lub niejasne (oznaczone „?”):": "wartość auta, wkład w firmę",
      "Moja wstępna propozycja podziału:": "mieszkanie zostaje u mnie, spłata dla M.",
      "Pytania do prawnika / banku / notariusza:": "jak policzyć nakład na remont?",
    },
    ticks: {
      "Sprawdziłem/Sprawdziłam/am treść księgi wieczystej każdej nieruchomości.": "sprawdzone online 9.11",
      "Wiem, z jakich środków kupiono nieruchomość (wspólne, osobiste, pomoc rodziny).": "",
      "Mam aktualne zaświadczenie o saldzie każdego kredytu.": "",
    },
  },

  "jak-powiedziec-dzieciom": {
    fields: {
      "Nasze wspólne zdanie wyjaśnienia (1–2 zdania):":
        "Będziemy mieszkać osobno, ale oboje zawsze będziemy Waszymi rodzicami.",
      "Co zmieni się dla dziecka (dom, grafik, szkoła):": "dwa domy, co drugi weekend u taty",
      "Co zostaje bez zmian:": "szkoła, basen we wtorki, babcia",
      "Kiedy i gdzie porozmawiamy:": "sobota 21.11 rano, w domu",
      "Kto zacznie rozmowę, kto odpowie na pytania praktyczne:": "zaczynam ja, plan tygodnia — K.",
      "Pytania, których się spodziewamy, i nasze odpowiedzi:":
        "„Czy to przeze mnie?” — nie, to decyzja dorosłych",
      "Jak będziemy się informować o reakcjach dziecka w kolejnych tygodniach:":
        "krótki SMS w niedzielę wieczorem",
    },
    ticks: {
      "Uzgodnijcie z drugim rodzicem wspólną, prostą wersję wyjaśnienia — bez szczegółów o winie.":
        "ustalone 10.11",
      "Ustalcie, co konkretnie zmieni się dla dziecka: gdzie będzie mieszkać, kiedy będzie z każdym z rodziców, co zostaje bez zmian (szkoła, przyjaciele, zajęcia).":
        "",
      "Wybierzcie spokojny moment, kiedy po rozmowie będziecie mogli być z dzieckiem.": "sobota, bez planów",
    },
  },

  "komunikacja-z-drugim-rodzicem": {
    fields: {},
    ticks: {
      "Czy wiadomość dotyczy jednej sprawy?": "",
      "Czy są daty, godziny, kwoty?": "dopisałam godz. odbioru",
      "Czy kończy się propozycją i terminem odpowiedzi?": "",
    },
  },

  "pierwsze-swieta-po-rozstaniu": {
    fields: {
      "Co jest dla mojego dziecka w świętach najważniejsze (osoby, tradycje, miejsca)?":
        "ubieranie choinki, babcia, pierogi",
      "Co jest najważniejsze dla mnie — i z czego mogę w tym roku zrezygnować?":
        "spokojna Wigilia; odpuszczam 12 potraw",
      "Czy mamy już jakieś ustalenia (wyrok, ugoda, porozumienie) dotyczące świąt?":
        "jeszcze nie — rozmowa do 30.11",
      "Jakie są plany dalszej rodziny (dziadkowie, wyjazdy), o których wiem?":
        "dziadkowie K. jadą w góry 26.12",
      "Wybrany model (naprzemiennie / podział dni / podwójne święta)": "podział dni",
      "23 grudnia: gdzie jest dziecko, od której godziny": "u mnie, od 16:00",
      "Wigilia 24 grudnia: u kogo, godziny": "u mnie, do 21:00",
      "Pierwszy dzień świąt 25 grudnia: u kogo, godziny": "u taty, od 10:00",
      "Drugi dzień świąt 26 grudnia: u kogo, godziny": "u taty, powrót 18:00",
      "Kontakt telefoniczny lub wideo z drugim rodzicem: kiedy": "wideo 24.12 o 19:00",
      "Spotkania z dziadkami i dalszą rodziną": "moi rodzice — Wigilia, K. — 25.12",
      "Jak będzie w przyszłym roku (zamiana?)": "tak, zamiana",
      "Lista życzeń dziecka": "klocki, łyżwy, książka o kosmosie",
      "Kupuje rodzic A": "łyżwy",
      "Kupuje rodzic B": "klocki",
      "Wspólny prezent (jeśli jest) i podział kosztów": "rower — po 50%, ok. 400 zł każde",
      "Ustalenia z dziadkami": "książki i ubrania, bez elektroniki",
      "24 grudnia — co robię, z kim": "Wigilia z dziećmi, potem rodzice",
      "25 grudnia — co robię, z kim": "obiad u siostry",
      "26 grudnia — co robię, z kim": "spacer z A., kino wieczorem",
      "Do kogo mogę zadzwonić, gdy będzie trudno": "siostra, A., 116 123",
      "Sylwester / Nowy Rok: u kogo dziecko, godziny": "u mnie, do 1.01 g. 12:00",
      "Termin ferii w naszym województwie": "sprawdzić na gov.pl",
      "Podział ferii (daty)": "1. tydzień ja, 2. tydzień K.",
      "Wyjazdy w ferie: kto, dokąd, kontakt": "z tatą w góry, dzwonimy co wieczór",
    },
    ticks: {
      "Ustalcie dokładne godziny i miejsca przekazania.": "przekazanie 25.12, 10:00",
      "Spakujcie dziecku rzeczy ważne dla niego, nie tylko praktyczne.": "",
      "Potwierdźcie plan na piśmie (SMS lub e-mail) na co najmniej tydzień przed świętami.":
        "wysłać SMS do 15.12",
      "Umów się na wideorozmowę z dzieckiem o stałej porze.": "",
    },
  },

  "przygotowanie-do-konsultacji": {
    fields: {
      "Data zawarcia małżeństwa i miejsce (USC)": "06.2014, USC w Poznaniu",
      "Ustrój majątkowy: wspólność ustawowa / rozdzielność / inny": "wspólność ustawowa",
      "Dzieci: imiona (lub inicjały) i wiek": "O. (8 l.), J. (5 l.)",
      "Z kim obecnie mieszkają dzieci i jak wyglądają kontakty z drugim rodzicem":
        "ze mną; tata — śr. i co drugi weekend",
      "Od kiedy mieszkacie osobno (jeśli tak)": "od września 2026",
      "Najważniejsze składniki majątku (nieruchomości, samochody, oszczędności, firma)":
        "mieszkanie (kredyt), auto, ok. 20 tys. oszczędności",
      "Wspólne długi i kredyty": "hipoteka, ok. 310 tys. zł",
      "Mój dochód miesięczny netto (przedział)": "6–7 tys. zł",
      "Dochód drugiej osoby (przedział, jeśli znasz)": "ok. 8–9 tys. zł?",
      "Czy rozważacie porozumienie lub mediację?": "tak, oboje jesteśmy otwarci",
      "Czy w relacji występuje przemoc lub zagrożenie?": "nie",
      "Specjalista 1: imię i nazwisko, koszt, sposób pracy, moje wrażenie":
        "mec. B., 350 zł, konkretnie, spokojnie",
      "Specjalista 2: imię i nazwisko, koszt, sposób pracy, moje wrażenie":
        "mec. W., 450 zł, dużo żargonu",
      "Specjalista 3: imię i nazwisko, koszt, sposób pracy, moje wrażenie":
        "online, 300 zł, szybko, ale pośpiesznie",
      "Kto najlepiej wyjaśnił moje opcje prostym językiem?": "B. — narysowała mi schemat",
      "Z kim czuję się bezpiecznie i swobodnie?": "z B.",
      "Trzy najważniejsze rzeczy, które usłyszałem/usłyszałam":
        "spisać ustalenia; nie wyprowadzać się pochopnie; mediacja ma sens",
      "Co mam zrobić w ciągu najbliższych 7 dni": "zamówić akty, zebrać PIT, do 20.11",
      "Pytania, które pojawiły się po spotkaniu": "co z kredytem, jeśli zostanę w mieszkaniu?",
      "Jak się czuję po tej rozmowie": "spokojniej, mam plan",
    },
    ticks: {
      "Dokument tożsamości": "",
      "Odpis aktu małżeństwa (jeśli masz)": "mam — skan w chmurze",
      "Odpisy aktów urodzenia dzieci (jeśli masz)": "",
      "Dokumenty dotyczące nieruchomości: numer księgi wieczystej, akt notarialny": "nr KW w notesie",
      "Umowy kredytowe i aktualne harmonogramy spłat": "",
      "Zestawienie stałych kosztów życia i wydatków na dzieci": "ok. 3 200 zł/mc na dzieci",
      "Lista pytań": "",
      "Jakie widzi Pan/Pani możliwe scenariusze w mojej sytuacji?": "",
      "Jakie są koszty: konsultacji, prowadzenia sprawy, opłat sądowych? Jak rozliczana jest współpraca (stała kwota, stawka godzinowa, etapy)?":
        "zapytać o etapy",
    },
  },

  "przygotowanie-do-mediacji": {
    fields: {
      "Trzy najważniejsze dla mnie sprawy (w kolejności):": "1. czas z dziećmi 2. mieszkanie 3. alimenty",
      "Dlaczego każda z nich jest dla mnie ważna (jaka potrzeba za nią stoi — bezpieczeństwo, stabilność, czas z dziećmi, spokój finansowy):":
        "stabilność dla dzieci, spokój finansowy",
      "Jak będzie wyglądało moje życie za rok, jeśli porozumienie się uda:":
        "stały grafik, mniej nerwów, spokojne przekazania",
      "Imię i wiek dziecka:": "Ola, 8 lat",
      "Co daje mu poczucie bezpieczeństwa (rytuały, osoby, miejsca):": "czytanie przed snem, babcia, jej pokój",
      "Szkoła/przedszkole, zajęcia, przyjaciele — co powinno zostać bez zmian:":
        "ta sama szkoła, basen we wtorki",
      "Szczególne potrzeby (zdrowie, terapia, nauka):": "alergia — leki zawsze w plecaku",
      "Jak dziecko znosi zmiany i przejścia między domami:": "w niedzielę wieczorem marudna, potem OK",
      "Co dziecko mówiło o rozstaniu (bez wypytywania — to, co samo powiedziało):":
        "„czy kot może być w obu domach?”",
      "Czego dziecko potrzebuje od każdego z rodziców:": "przewidywalności i żeby się nie kłócili",
      "Moja najlepsza realna alternatywa bez porozumienia (np. sprawa w sądzie, osobne ustalenia z pomocą prawnika):":
        "sprawa w sądzie z pełnomocnikiem",
      "Ile może mnie to kosztować — czasu, pieniędzy, emocji, relacji z dziećmi:":
        "dużo czasu i nerwów, kilka tys. zł",
      "Czego realnie mogę się spodziewać w sądzie (najlepiej omówione z prawnikiem):":
        "omówić z mec. B. — termin 26.11",
      "Jaka propozycja byłaby dla mnie lepsza niż ta alternatywa:": "grafik 2-2-5-5 i stała kwota na dzieci",
      "Poniżej czego nie zejdę — i dlaczego:": "dzieci zostają w tej samej szkole",
      "Co mogę zaproponować, żeby druga strona też zyskała:": "elastyczne weekendy, dłuższe wakacje u K.",
    },
    ticks: {
      "Plan zwykłego tygodnia (dni, godziny, przekazania).": "szkic gotowy",
      "Weekendy, ferie, wakacje letnie.": "",
      "Święta i ważne daty (urodziny, Dzień Matki, Dzień Ojca).": "",
      "Wspólne zasady w obu domach (ekrany, pora snu, kieszonkowe).": "ekrany max 1h",
      "Ile kosztuje mediacja i kto ponosi koszty?": "",
      "Czy mediacja może odbyć się online?": "zapytać 18.11",
    },
  },

  "rozmowa-z-bankiem": {
    fields: {
      "Numer umowy kredytu i data zawarcia": "z umowy — podpisana 03.2018",
      "Kredytobiorcy wpisani w umowie": "oboje (ja i K.)",
      "Aktualne saldo zadłużenia (kapitał do spłaty)": "ok. 310 000 zł",
      "Wysokość bieżącej raty i dzień płatności": "2 450 zł, 10. dnia miesiąca",
      "Pozostały okres kredytowania (liczba rat / data końcowa)": "ok. 250 rat, do 2047",
      "Oprocentowanie: stałe czy zmienne? Do kiedy obowiązuje okres stałej stopy?": "stałe do 04.2028",
      "Rodzaj rat: równe czy malejące": "równe",
      "Szacunkowa wartość nieruchomości (źródło: wycena, oferty podobnych mieszkań)":
        "ok. 600 000 zł (oferty z okolicy)",
      "LTV = saldo kredytu ÷ wartość nieruchomości × 100% (wynik)": "ok. 52%",
      "Ubezpieczenia powiązane z kredytem (nieruchomości, na życie, inne)": "nieruchomości + na życie (oboje)",
      "Ewentualne zaległości lub opóźnienia (tak/nie, kwota)": "nie",
      "Dochód netto miesięcznie i forma zatrudnienia": "6 800 zł, umowa o pracę",
      "Inne stałe zobowiązania (raty, limity na kartach, leasing)": "karta, limit 3 000 zł",
      "Stałe koszty życia (czynsz, media, dojazdy)": "ok. 1 400 zł",
      "Wydatki na dzieci i ewentualne alimenty (płacone lub otrzymywane)": "ok. 2 000 zł, alimenty do ustalenia",
      "Ile wyniesie spłata drugiej osoby i skąd będą na nią środki?": "ok. 145 tys. zł? — pomoc rodziców + oszczędności",
      "Ile zostaje miesięcznie po opłaceniu raty i kosztów?": "ok. 900 zł — mało, policzyć jeszcze raz",
      "Data, godzina, forma kontaktu (telefon / oddział / czat)": "12.11, 14:30, oddział",
      "Imię i stanowisko osoby z banku": "p. Ania, doradca kredytowy",
      "Opcje, które bank uznał za możliwe do rozważenia": "zwolnienie K. po ocenie mojej zdolności",
      "Warunki i wymagane dokumenty": "zaświadczenie o dochodach, zgoda K., wycena",
      "Koszty i terminy": "aneks ok. 400 zł?, decyzja do 30 dni",
      "Co mam zrobić teraz i do kiedy": "złożyć wniosek do 27.11",
    },
    ticks: {
      "Dokument tożsamości każdej osoby, której dotyczy zmiana": "",
      "Umowa kredytu z aneksami i aktualny harmonogram spłat": "mam — skan w chmurze",
      "Zaświadczenie o dochodach lub inne dokumenty potwierdzające dochód (np. wyciągi z konta, PIT)":
        "z kadr do 19.11",
      "Odpis księgi wieczystej lub jej numer": "",
      "Polisy ubezpieczeniowe powiązane z kredytem": "",
      "Czy bank w ogóle rozpatruje wnioski o zwolnienie współkredytobiorcy? Jakie są kryteria?":
        "tak — ocena zdolności",
      "Jakie są koszty aneksu i innych czynności?": "",
    },
  },

  "rozwod-krok-po-kroku": {
    fields: {
      "Czy oboje chcemy rozwodu bez orzekania o winie? (tak / nie / do rozmowy)": "tak",
      "Miejsce zamieszkania dzieci i plan kontaktów:": "u mnie; tata śr. + co drugi weekend",
      "Proponowana wysokość alimentów i sposób płatności:": "do rozmowy — przelew do 10. dnia",
      "Kto zostaje w mieszkaniu, kto płaci rachunki:": "ja z dziećmi, rachunki płacę ja",
      "Co robimy z kredytem i wspólnymi kontami:": "pytam w banku 12.11; konto wspólne zamknąć",
      "Majątek: dzielimy teraz / później / w jaki sposób:": "później, umownie",
      "Sprawy, w których potrzebuję porady prawnika:": "alimenty, podział mieszkania",
    },
    ticks: {
      "Gdzie będą mieszkać dzieci i jak będą wyglądały kontakty z drugim rodzicem (dni powszednie, weekendy, wakacje, święta).":
        "wstępnie ustalone",
      "Kto zostaje w mieszkaniu i do kiedy — oraz kto pokrywa bieżące opłaty.": "",
      "Czy chcecie dzielić majątek od razu, czy później.": "później",
      "Czy oboje zgadzacie się na rozwód bez orzekania o winie.": "",
      "Odpis aktu małżeństwa (z urzędu stanu cywilnego; można zamówić online przez gov.pl).": "zamówione 3.11",
    },
  },
};
