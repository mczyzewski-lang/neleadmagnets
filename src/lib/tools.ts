import type { FaqItem, OfferKey, SourceRef } from "@/content/types";
import type { IconName } from "@/components/ui/Icon";
import { SRC } from "./sources";

export type ToolMeta = {
  slug: string;
  short: string;
  icon: IconName;
  cardTitle: string;
  cardDesc: string;
  /** Co dokładnie dostaje użytkownik — pokazywane na karcie i w hero */
  outcome: string;
  time: string;
  h1: string;
  h2: string;
  seo: { title: string; description: string };
  ctaLabel: string;
  primaryOffer: OfferKey;
  /** Trzy kroki „Jak to działa” dopasowane do narzędzia */
  how: [string, string, string];
  faq: FaqItem[];
  sources: SourceRef[];
};

export const TOOLS: ToolMeta[] = [
  {
    slug: "mieszkanie-i-kredyt",
    short: "Mieszkanie i kredyt",
    icon: "home",
    cardTitle: "Mieszkanie i kredyt po rozstaniu",
    cardDesc: "Co może stać się z Waszym mieszkaniem i wspólnym kredytem? Zobacz scenariusze dopasowane do Waszej sytuacji.",
    outcome: "3 możliwe scenariusze, orientacyjna różnica wartość − kredyt, lista pytań do banku",
    time: "ok. 3 min",
    h1: "Co stanie się z Waszym mieszkaniem i kredytem, jeśli się rozstaniecie?",
    h2: "Odpowiedz na kilka pytań i poznaj możliwe scenariusze dotyczące nieruchomości i kredytu.",
    seo: {
      title: "Mieszkanie i kredyt po rozwodzie — sprawdź scenariusze",
      description: "Bezpłatne narzędzie: co z mieszkaniem i kredytem hipotecznym po rozstaniu? 3 scenariusze, orientacyjne wyliczenie, pytania do banku i prawnika.",
    },
    ctaLabel: "Sprawdź, jakie kwestie warto ustalić przed pozwem",
    primaryOffer: "plan-rozwodu",
    how: ["Odpowiedz na kilka pytań o mieszkanie i kredyt", "Zobacz 3 scenariusze i orientacyjne liczby", "Pobierz listę pytań do banku i prawnika"],
    faq: [
      { q: "Czy rozwód zwalnia mnie ze wspólnego kredytu?", a: "Nie. Rozwód ani podział majątku nie zmieniają umowy kredytowej. Wszyscy kredytobiorcy odpowiadają wobec banku solidarnie, dopóki bank nie zgodzi się na zmianę (np. aneks zwalniający jedną osobę albo refinansowanie). Bank zwykle ponownie ocenia wtedy zdolność kredytową osoby, która zostaje z kredytem." },
      { q: "Czy wyliczona kwota to moja część mieszkania?", a: "Nie. Narzędzie pokazuje jedynie orientacyjną różnicę między podaną wartością nieruchomości a saldem kredytu. Rzeczywisty podział zależy m.in. od tego, czy mieszkanie należy do majątku wspólnego, od nakładów z majątku osobistego, kosztów sprzedaży i ustaleń stron lub orzeczenia sądu." },
      { q: "Mieszkanie kupiłem/kupiłam przed ślubem — czy jest tylko moje?", a: "Co do zasady przedmioty nabyte przed powstaniem wspólności należą do majątku osobistego. Jeśli jednak kredyt był spłacany z pieniędzy wspólnych w trakcie małżeństwa, może pojawić się kwestia rozliczenia nakładów. To wymaga indywidualnej analizy." },
      { q: "Nie jesteśmy małżeństwem. Czy to coś zmienia?", a: "Tak. Między partnerami w związku nieformalnym nie ma wspólności majątkowej małżeńskiej. Jeśli oboje jesteście właścicielami, zwykle jest to współwłasność w częściach ułamkowych, a jej zniesienie odbywa się według przepisów Kodeksu cywilnego." },
      { q: "Czy zapisujecie moje odpowiedzi?", a: "Nie. Wynik jest liczony w Twojej przeglądarce i nie trafia do naszej bazy. Znika po zamknięciu lub wyczyszczeniu strony, chyba że sam(a) go pobierzesz lub poprosisz o wysłanie na e-mail." },
    ],
    sources: [
      { ...SRC.kro, label: "Kodeks rodzinny i opiekuńczy — art. 31, 33, 43, 45, 58 § 2–3" },
      { ...SRC.kc, label: "Kodeks cywilny — art. 195 i n., 210 (współwłasność), art. 366 (odpowiedzialność solidarna), art. 519 (przejęcie długu)" },
      SRC.uksc,
    ],
  },
  {
    slug: "budzet-po-rozstaniu",
    short: "Budżet po rozstaniu",
    icon: "wallet",
    cardTitle: "Budżet po rozstaniu",
    cardDesc: "Policz, jak mogą wyglądać Twoje miesięczne finanse w osobnym gospodarstwie domowym — w trzech wariantach.",
    outcome: "Budżet obecny + 3 warianty, wykres, saldo miesięczne, poduszka finansowa w miesiącach",
    time: "ok. 5 min",
    h1: "Czy finansowo poradzisz sobie po rozstaniu?",
    h2: "Sprawdź, jak mogą wyglądać Twoje miesięczne finanse, gdy zaczniecie prowadzić oddzielne gospodarstwa domowe.",
    seo: {
      title: "Budżet po rozstaniu — kalkulator finansów po rozwodzie",
      description: "Bezpłatny kalkulator budżetu po rozstaniu: dochody, koszty mieszkania, dzieci, koszty przeprowadzki. 3 warianty, wykres i poduszka finansowa.",
    },
    ctaLabel: "Zobacz, jakie ustalenia finansowe warto przygotować przed rozwodem",
    primaryOffer: "plan-rozwodu",
    how: ["Wpisz dochody i wydatki — także te nieregularne", "Porównaj budżet obecny i 3 warianty przyszłości", "Zmieniaj założenia i pobierz zestawienie"],
    faq: [
      { q: "Czy kalkulator wylicza alimenty?", a: "Nie. Wysokość alimentów zależy m.in. od usprawiedliwionych potrzeb uprawnionego oraz możliwości zarobkowych i majątkowych zobowiązanego, a w razie sporu ustala ją sąd. Jeśli spodziewasz się alimentów lub ich płacenia, możesz wpisać własne założenie — kalkulator potraktuje je jako Twoje założenie, nie prognozę." },
      { q: "Skąd biorą się warianty ostrożny, bazowy i optymistyczny?", a: "To Twoje dane przeliczone według widocznych założeń (np. o ile procent mogą wzrosnąć koszty mieszkania). Każde założenie możesz zmienić. Nie stosujemy ukrytych współczynników." },
      { q: "Jak wpisać wydatki, które nie są co miesiąc?", a: "Przy każdej pozycji możesz wybrać częstotliwość: miesięcznie, kwartalnie, rocznie lub jednorazowo. Kalkulator przeliczy je na miesięczny ekwiwalent; koszty jednorazowe pokaże osobno." },
      { q: "Czy muszę podawać dokładne kwoty?", a: "Nie. Wystarczą orientacyjne wartości. Puste pola są traktowane jako 0." },
      { q: "Czy moje dane finansowe są gdzieś wysyłane?", a: "Nie. Obliczenia wykonuje Twoja przeglądarka. Dane nie trafiają do nas ani do narzędzi analitycznych." },
    ],
    sources: [{ ...SRC.kro, label: "Kodeks rodzinny i opiekuńczy — art. 27, 60, 133, 135 (obowiązki alimentacyjne — kontekst)" }],
  },
  {
    slug: "plan-opieki-nad-dzieckiem",
    short: "Plan opieki nad dzieckiem",
    icon: "calendar",
    cardTitle: "Plan opieki nad dzieckiem",
    cardDesc: "Przygotuj wstępny harmonogram tygodnia, weekendów, wakacji i świąt — jako propozycję do rozmowy z drugim rodzicem.",
    outcome: "Kalendarz tygodniowy i miesięczny, podsumowanie ustaleń, lista otwartych punktów, PDF",
    time: "ok. 6 min",
    h1: "Jak może wyglądać życie dziecka w dwóch domach?",
    h2: "Przygotuj wstępną propozycję harmonogramu opieki i kontaktów, którą będzie można omówić z drugim rodzicem.",
    seo: {
      title: "Plan opieki nad dzieckiem po rozstaniu — kreator",
      description: "Bezpłatny kreator planu rodzicielskiego: tydzień, weekendy, wakacje, święta, transport. Kalendarz i propozycja do omówienia z drugim rodzicem.",
    },
    ctaLabel: "Sprawdź, jakie ustalenia dotyczące dzieci można przygotować przed rozwodem",
    primaryOffer: "plan-rozwodu",
    how: ["Wybierz model opieki i ustalenia na weekendy, wakacje, święta", "Zobacz kalendarz tygodnia i miesiąca", "Pobierz propozycję do rozmowy z drugim rodzicem"],
    faq: [
      { q: "Czy taki plan jest wiążący?", a: "Nie. To propozycja do rozmowy. W sprawie rozwodowej sąd uwzględnia pisemne porozumienie rodziców o sposobie wykonywania władzy rodzicielskiej i utrzymywaniu kontaktów z dzieckiem, jeżeli jest ono zgodne z dobrem dziecka. Treść porozumienia warto skonsultować ze specjalistą." },
      { q: "Który model opieki jest najlepszy?", a: "Nie ma jednego modelu dobrego dla każdej rodziny. Znaczenie mają m.in. wiek i potrzeby dziecka, odległość między domami, szkoła, praca rodziców oraz relacje dziecka z każdym z nich. Narzędzie nie rekomenduje modelu — pomaga go rozpisać i przemyśleć." },
      { q: "Dlaczego nie pytacie o imię dziecka?", a: "Nie jest potrzebne do przygotowania planu. Ograniczamy zbieranie danych dotyczących dzieci do minimum." },
      { q: "Co, jeśli nie możemy się porozumieć?", a: "Można skorzystać z mediacji rodzinnej (jest dobrowolna) lub — gdy porozumienie nie jest możliwe — o kontaktach i władzy rodzicielskiej rozstrzyga sąd. Jeśli w relacji występuje przemoc lub zagrożenie, wspólne negocjacje mogą nie być bezpieczne — skorzystaj z indywidualnej pomocy." },
      { q: "Czy dziecko powinno mieć wpływ na plan?", a: "Zdanie dziecka, stosownie do jego wieku i dojrzałości, jest ważne. Nie powinno jednak być obciążane decyzją ani wybieraniem między rodzicami." },
    ],
    sources: [
      { ...SRC.kro, label: "Kodeks rodzinny i opiekuńczy — art. 58 § 1, 92 i n., 97, 113 i n." },
      SRC.mediacjeGov,
    ],
  },
  {
    slug: "konsekwencje-rozstania",
    short: "Mapa prawnych konsekwencji",
    icon: "map",
    cardTitle: "Mapa prawnych konsekwencji rozstania",
    cardDesc: "Zobacz, które kwestie prawne — dzieci, majątek, kredyt, procedury — dotyczą właśnie Twojej sytuacji.",
    outcome: "Spersonalizowane karty tematów: co warto wiedzieć, co sprawdzić, o co zapytać",
    time: "ok. 3 min",
    h1: "Co prawnie zmieni się w Twoim życiu po rozstaniu?",
    h2: "Odpowiedz na kilka pytań i zobacz, które kwestie prawne warto sprawdzić w swojej sytuacji.",
    seo: {
      title: "Skutki prawne rozstania i rozwodu — mapa tematów",
      description: "Bezpłatna mapa prawnych konsekwencji rozstania: dzieci, majątek, mieszkanie, kredyt, alimenty, procedury. Małżeństwo i związek nieformalny osobno.",
    },
    ctaLabel: "Poznaj możliwe kolejne kroki i przygotuj plan działania",
    primaryOffer: "plan-rozwodu",
    how: ["Zaznacz, czego dotyczy Twoja sytuacja", "Otrzymaj mapę tematów w formie kart", "Wyeksportuj raport z pytaniami do specjalisty"],
    faq: [
      { q: "Czy to porada prawna?", a: "Nie. Mapa wskazuje tematy, które zwykle warto sprawdzić w podobnej sytuacji, oraz pytania do specjalisty. Konkretne uprawnienia i obowiązki zależą od szczegółów, których narzędzie nie zna." },
      { q: "Dlaczego związek nieformalny ma inne wyniki?", a: "Bo przepisy są inne. Rozwód i separacja dotyczą tylko małżeństwa. Partnerów nieformalnych nie łączy wspólność majątkowa małżeńska ani obowiązek alimentacyjny między sobą — natomiast prawa i obowiązki wobec dzieci nie zależą od ślubu." },
      { q: "Złożyliśmy już pozew. Czy narzędzie ma sens?", a: "Tak — mapa pokaże tematy, które nadal można uporządkować, np. porozumienie dotyczące dzieci, mediację w toku sprawy czy dokumenty finansowe." },
      { q: "Czy informacje są aktualne?", a: "Treści opierają się na przepisach obowiązujących w dniu weryfikacji podanym w stopce. Przepisy się zmieniają — przed podjęciem decyzji sprawdź aktualny stan prawny ze specjalistą." },
    ],
    sources: [
      { ...SRC.kro, label: "Kodeks rodzinny i opiekuńczy — art. 27, 31–46, 56–61⁶, 92 i n., 113, 133, 135" },
      { ...SRC.kc, label: "Kodeks cywilny — współwłasność, dziedziczenie, odpowiedzialność solidarna" },
      { ...SRC.kpc, label: "Kodeks postępowania cywilnego — właściwość sądu, mediacja" },
      SRC.uksc,
    ],
  },
  {
    slug: "przed-pozwem",
    short: "Ustalenia przed pozwem",
    icon: "handshake",
    cardTitle: "Czy warto ustalić warunki przed pozwem?",
    cardDesc: "Sprawdź, które sprawy można spróbować uporządkować przed złożeniem pozwu i jak może wyglądać mediacja.",
    outcome: "Mapa możliwych ustaleń, kroki mediacyjne, dokumenty, pytania do mediatora, kolejność działań",
    time: "ok. 4 min",
    h1: "Czy można ustalić warunki rozwodu, zanim złożycie pozew?",
    h2: "Sprawdź, które kwestie można spróbować uporządkować wcześniej i jak może wyglądać mediacja.",
    seo: {
      title: "Ustalenia przed pozwem rozwodowym i mediacja — przewodnik",
      description: "Bezpłatny przewodnik: które warunki rozwodu można ustalić przed pozwem, jak wygląda mediacja, jakie dokumenty przygotować. Mapa ustaleń w 4 minuty.",
    },
    ctaLabel: "Sprawdź koszt i odbierz bezpłatny Plan Rozwodu",
    primaryOffer: "plan-rozwodu",
    how: ["Zaznacz tematy do uzgodnienia — bez opisywania konfliktu", "Zobacz, co można uzgodnić, a co wymaga analizy", "Pobierz kolejność działań i pytania do mediatora"],
    faq: [
      { q: "Czy mediacja jest obowiązkowa?", a: "Nie. Mediacja jest dobrowolna. Sąd może skierować strony do mediacji — wtedy każda z nich może się temu sprzeciwić (w ciągu tygodnia od skierowania). Z mediacji można też zrezygnować na każdym etapie. Mediator jest bezstronny i nie rozstrzyga sporu." },
      { q: "Czy ugoda z mediacji ma moc prawną?", a: "Ugoda zawarta przed mediatorem może zostać zatwierdzona przez sąd — wtedy ma moc prawną ugody sądowej. Nie każda kwestia rozwodowa może być jednak w całości uregulowana ugodą (np. sam rozwód orzeka sąd), dlatego warto skonsultować jej treść." },
      { q: "Czy zawsze trzeba coś ustalać przed pozwem?", a: "Nie. W niektórych sytuacjach — np. gdy brak jest gotowości drugiej strony do rozmów albo gdy występuje przemoc — rozsądniejsze może być od razu skorzystanie z drogi sądowej lub pomocy pełnomocnika. Przygotowanie pozwu nie jest błędem." },
      { q: "Co, jeśli boję się drugiej strony?", a: "Twoje bezpieczeństwo jest najważniejsze. W takiej sytuacji nie zalecamy wspólnych negocjacji. Skorzystaj z indywidualnej pomocy — w sytuacji zagrożenia dzwoń pod 112, a wsparcie znajdziesz m.in. w Niebieskiej Linii (800 120 002)." },
      { q: "Ile kosztuje Plan Rozwodu?", a: "Plan Rozwodu jest bezpłatny. Na stronie Planu Rozwodu możesz też poprosić o informację o kosztach dalszej pomocy Nowego Etapu — bez zobowiązań." },
    ],
    sources: [
      { ...SRC.kpc, label: "Kodeks postępowania cywilnego — art. 183¹ i n. (mediacja), art. 436, 445²" },
      { ...SRC.kro, label: "Kodeks rodzinny i opiekuńczy — art. 57, 58" },
      SRC.mediacjeGov,
      SRC.mediacjeMS,
    ],
  },
  {
    slug: "koszty-utrzymania-dziecka",
    short: "Koszty utrzymania dziecka",
    icon: "coins",
    cardTitle: "Kalkulator kosztów utrzymania dziecka",
    cardDesc: "Uporządkuj miesięczne i roczne wydatki na dziecko. Porównaj scenariusze i pobierz zestawienie do rozmów.",
    outcome: "Koszt miesięczny i roczny, podział na kategorie, wykres, porównanie scenariuszy, eksport",
    time: "ok. 5 min",
    h1: "Ile naprawdę kosztuje miesięczne utrzymanie dziecka?",
    h2: "Uporządkuj wydatki i przygotuj zestawienie, które pomoże w rozmowach o kosztach opieki.",
    seo: {
      title: "Koszty utrzymania dziecka — kalkulator miesięczny i roczny",
      description: "Bezpłatny kalkulator kosztów utrzymania dziecka: jedzenie, ubrania, szkoła, zdrowie, zajęcia, wakacje. Zestawienie miesięczne i roczne do pobrania.",
    },
    ctaLabel: "Zobacz, jak uporządkować kwestie finansowe dotyczące dzieci przed rozwodem",
    primaryOffer: "plan-rozwodu",
    how: ["Wpisz wydatki z ich częstotliwością", "Zobacz koszt miesięczny, roczny i strukturę", "Porównaj scenariusze i pobierz zestawienie"],
    faq: [
      { q: "Czy to kalkulator alimentów?", a: "Nie. Zestawienie wydatków to tylko jeden z elementów rozmowy o kosztach. Zakres obowiązku alimentacyjnego zależy od usprawiedliwionych potrzeb dziecka oraz zarobkowych i majątkowych możliwości rodziców; uwzględnia się też osobiste starania rodzica o utrzymanie i wychowanie dziecka. W razie sporu decyduje sąd." },
      { q: "Jak policzyć koszty mieszkania przypadające na dziecko?", a: "Nie ma jednej metody. Możesz wpisać kwotę, którą uważasz za uzasadnioną (np. część czynszu i mediów), i zaznaczyć w notatce, jak ją wyliczyłeś/wyliczyłaś. Ważne, by metoda była zrozumiała dla drugiej strony." },
      { q: "Po co porównywać scenariusze?", a: "Np. aby zobaczyć różnicę między obecnymi kosztami a kosztami po zmianie szkoły, zapisaniu na nowe zajęcia lub zmianie opieki. Możesz skopiować scenariusz i zmienić tylko wybrane pozycje." },
      { q: "Czy warto zbierać paragony?", a: "Przy rozmowach i ewentualnym postępowaniu pomocne bywa udokumentowanie większych lub regularnych wydatków (faktury, potwierdzenia przelewów, umowy z przedszkolem czy na zajęcia)." },
    ],
    sources: [{ ...SRC.kro, label: "Kodeks rodzinny i opiekuńczy — art. 128, 133, 135 (obowiązek alimentacyjny)" }],
  },
  {
    slug: "separacja-czy-rozwod",
    short: "Separacja czy rozwód?",
    icon: "split",
    cardTitle: "Separacja czy rozwód?",
    cardDesc: "Porównaj skutki prawne obu rozwiązań w tabeli dopasowanej do Twojej sytuacji. Bez podpowiadania decyzji.",
    outcome: "Indywidualna tabela porównawcza, skutki wspólne, różnice, pytania do specjalisty",
    time: "ok. 3 min",
    h1: "Separacja czy rozwód? Sprawdź najważniejsze różnice.",
    h2: "Poznaj konsekwencje prawne obu rozwiązań i pytania, które warto rozważyć przed decyzją.",
    seo: {
      title: "Separacja czy rozwód? Różnice i skutki prawne",
      description: "Porównaj separację i rozwód: status małżeństwa, majątek, dzieci, koszty, nazwisko, dziedziczenie, zniesienie separacji. Interaktywna tabela.",
    },
    ctaLabel: "Poznaj dostępne drogi i uporządkuj kolejne kroki",
    primaryOffer: "konsultacja",
    how: ["Zaznacz, które tematy są dla Ciebie ważne", "Zobacz tabelę: separacja vs rozwód", "Pobierz pytania do specjalisty"],
    faq: [
      { q: "Czy z separacji można przejść do rozwodu?", a: "Tak. Separacja nie wyklucza późniejszego wniesienia pozwu o rozwód, jeżeli spełnione są przesłanki rozwodu (zupełny i trwały rozkład pożycia)." },
      { q: "Czy w separacji można wziąć nowy ślub?", a: "Nie. Małżonek pozostający w separacji nie może zawrzeć nowego małżeństwa — małżeństwo formalnie trwa." },
      { q: "Czy separację można cofnąć?", a: "Tak. Na zgodne żądanie małżonków sąd orzeka o zniesieniu separacji. Rozwodu nie da się „cofnąć” — po rozwodzie można jedynie ponownie zawrzeć związek małżeński." },
      { q: "Co jest szybsze i tańsze?", a: "Opłata od pozwu o rozwód i od pozwu o separację wynosi co do zasady 600 zł; przy zgodnym wniosku o separację opłata jest niższa. Czas trwania zależy od sądu i stopnia sporu, dlatego nie podajemy obietnic co do terminów." },
      { q: "Czy narzędzie podpowie, co wybrać?", a: "Nie. Decyzja należy do Ciebie. Narzędzie porządkuje różnice i pytania, które możesz omówić ze specjalistą." },
    ],
    sources: [
      { ...SRC.kro, label: "Kodeks rodzinny i opiekuńczy — art. 54, 56–61⁶, 62" },
      { ...SRC.kc, label: "Kodeks cywilny — art. 935¹ (dziedziczenie a separacja)" },
      { ...SRC.uksc, label: "Ustawa o kosztach sądowych w sprawach cywilnych — art. 26" },
    ],
  },
  {
    slug: "pierwsze-30-dni",
    short: "Pierwsze 30 dni",
    icon: "checklist",
    cardTitle: "Pierwsze 30 dni po decyzji o rozstaniu",
    cardDesc: "Spersonalizowana checklista na cztery tygodnie: sprawy pilne, finanse, dzieci, mieszkanie i kolejne kroki.",
    outcome: "Plan na 4 okresy z checkboxami, edycją i eksportem PDF",
    time: "ok. 2 min",
    h1: "Co zrobić w pierwszych 30 dniach po decyzji o rozstaniu?",
    h2: "Otrzymaj uporządkowaną checklistę dostosowaną do Twojej sytuacji.",
    seo: {
      title: "Pierwsze 30 dni po decyzji o rozstaniu — checklista",
      description: "Bezpłatna, spersonalizowana checklista na pierwsze 30 dni po decyzji o rozstaniu: bezpieczeństwo, dokumenty, finanse, dzieci, mieszkanie.",
    },
    ctaLabel: "Sprawdź, jak przygotować indywidualny Plan Rozwodu",
    primaryOffer: "plan-rozwodu",
    how: ["Odpowiedz na 7 krótkich pytań", "Otrzymaj plan na 4 tygodnie", "Odhaczaj, edytuj i pobierz PDF"],
    faq: [
      { q: "Czy muszę zrobić wszystko w 30 dni?", a: "Nie. To tylko propozycja kolejności. Tempo zależy od Twojej sytuacji, emocji i możliwości. Niektóre zadania mogą Cię nie dotyczyć — możesz je usunąć." },
      { q: "Czy plan zapisuje się automatycznie?", a: "Nie. Ze względu na bezpieczeństwo na współdzielonych urządzeniach plan nie zapisuje się sam. Możesz go pobrać, wysłać na e-mail albo świadomie zapisać w tej przeglądarce — i w każdej chwili usunąć." },
      { q: "Co, jeśli czuję się zagrożony/zagrożona?", a: "Bezpieczeństwo jest pierwsze. W sytuacji zagrożenia dzwoń pod 112. Wsparcie dla osób doznających przemocy domowej oferuje m.in. Niebieska Linia — 800 120 002." },
      { q: "Czy plan zastąpi rozmowę z prawnikiem?", a: "Nie. Pomaga przygotować się do rozmowy i niczego nie przeoczyć, ale nie zastępuje indywidualnej porady." },
    ],
    sources: [SRC.kro, SRC.mediacjeGov, SRC.niebieskaLinia],
  },
];

export function getTool(slug: string) {
  const t = TOOLS.find((x) => x.slug === slug);
  if (!t) throw new Error(`Unknown tool ${slug}`);
  return t;
}
