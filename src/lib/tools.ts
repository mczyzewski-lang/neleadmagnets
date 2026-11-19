import type { FaqItem, OfferKey, SourceRef } from "@/content/types";
import type { IconName } from "@/components/ui/Icon";
import { SRC } from "./sources";

export type ToolMeta = {
  slug: string;
  short: string;
  icon: IconName;
  cardTitle: string;
  cardDesc: string;
  /** Co dokładnie dostaje użytkownik (karta i hero) */
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
    cardDesc: "Co może stać się z Waszym mieszkaniem i wspólnym kredytem? Zobacz scenariusze dla Waszej sytuacji.",
    outcome: "3 możliwe scenariusze, orientacyjna różnica między wartością a kredytem, pytania do banku",
    time: "ok. 3 min",
    h1: "Co stanie się z Waszym mieszkaniem i kredytem, jeśli się rozstaniecie?",
    h2: "Odpowiedz na kilka pytań i poznaj możliwe scenariusze dla mieszkania i kredytu.",
    seo: {
      title: "Mieszkanie i kredyt po rozwodzie: sprawdź scenariusze",
      description: "Bezpłatne narzędzie: co z mieszkaniem i kredytem hipotecznym po rozstaniu? 3 scenariusze, orientacyjne wyliczenie, pytania do banku i prawnika.",
    },
    ctaLabel: "Sprawdź, jakie kwestie warto ustalić przed pozwem",
    primaryOffer: "plan-rozwodu",
    how: ["Odpowiedz na kilka pytań o mieszkanie i kredyt", "Zobacz 3 scenariusze i orientacyjne liczby", "Pobierz pytania do banku i prawnika"],
    faq: [
      { q: "Czy rozwód zwalnia mnie ze wspólnego kredytu?", a: "Nie. Rozwód ani podział majątku nie zmieniają umowy kredytowej. Wszyscy kredytobiorcy odpowiadają wobec banku solidarnie, dopóki bank nie zgodzi się na zmianę, np. aneks albo refinansowanie. Bank zwykle sprawdza wtedy zdolność kredytową osoby, która zostaje z kredytem." },
      { q: "Czy wyliczona kwota to moja część mieszkania?", a: "Nie. To tylko orientacyjna różnica między wartością mieszkania a saldem kredytu. Rzeczywisty podział zależy m.in. od tego, czy mieszkanie jest w majątku wspólnym, od nakładów, kosztów sprzedaży oraz ustaleń stron lub decyzji sądu." },
      { q: "Mieszkanie kupiłem/kupiłam przed ślubem. Czy jest tylko moje?", a: "Zwykle tak, bo to, co kupiono przed ślubem, należy do majątku osobistego. Jeśli jednak kredyt spłacaliście ze wspólnych pieniędzy, może być do rozliczenia nakład. To wymaga indywidualnej analizy." },
      { q: "Nie jesteśmy małżeństwem. Czy to coś zmienia?", a: "Tak. Partnerów nie łączy wspólność majątkowa małżeńska. Jeśli oboje jesteście właścicielami, zwykle jest to zwykła współwłasność, a jej zniesienie odbywa się według przepisów cywilnych." },
      { q: "Czy zapisujecie moje odpowiedzi?", a: "Nie. Wynik liczy Twoja przeglądarka i nie trafia do naszej bazy. Znika po zamknięciu strony, chyba że go pobierzesz lub wyślesz na e-mail." },
    ],
    sources: [
      { ...SRC.kro, label: "Kodeks rodzinny i opiekuńczy: art. 31, 33, 43, 45, 58 § 2–3" },
      { ...SRC.kc, label: "Kodeks cywilny: art. 195 i n., 210 (współwłasność), art. 366 (odpowiedzialność solidarna), art. 519 (przejęcie długu)" },
      SRC.uksc,
    ],
  },
  {
    slug: "budzet-po-rozstaniu",
    short: "Budżet po rozstaniu",
    icon: "wallet",
    cardTitle: "Budżet po rozstaniu",
    cardDesc: "Policz, jak mogą wyglądać Twoje miesięczne finanse w osobnym gospodarstwie domowym. W trzech wariantach.",
    outcome: "Budżet obecny i 3 warianty, wykres, saldo miesięczne, poduszka finansowa w miesiącach",
    time: "ok. 5 min",
    h1: "Czy finansowo poradzisz sobie po rozstaniu?",
    h2: "Sprawdź, jak mogą wyglądać Twoje miesięczne finanse w osobnym gospodarstwie domowym.",
    seo: {
      title: "Budżet po rozstaniu: kalkulator finansów po rozwodzie",
      description: "Bezpłatny kalkulator budżetu po rozstaniu: dochody, koszty mieszkania, dzieci, przeprowadzki. 3 warianty, wykres i poduszka finansowa.",
    },
    ctaLabel: "Zobacz, jakie ustalenia finansowe warto przygotować przed rozwodem",
    primaryOffer: "plan-rozwodu",
    how: ["Wpisz dochody i wydatki, także nieregularne", "Porównaj budżet obecny i 3 warianty", "Zmieniaj założenia i pobierz zestawienie"],
    faq: [
      { q: "Czy kalkulator wylicza alimenty?", a: "Nie. Alimenty zależą od potrzeb uprawnionego i możliwości zobowiązanego, a w razie sporu ustala je sąd. Możesz wpisać własne założenie. Kalkulator potraktuje je jako założenie, nie prognozę." },
      { q: "Skąd biorą się warianty ostrożny, bazowy i optymistyczny?", a: "To Twoje dane przeliczone według widocznych założeń, np. o ile mogą wzrosnąć koszty mieszkania. Każde założenie możesz zmienić. Nie ma ukrytych współczynników." },
      { q: "Jak wpisać wydatki, które nie są co miesiąc?", a: "Przy każdej pozycji wybierz częstotliwość: miesięcznie, kwartalnie, rocznie lub jednorazowo. Kalkulator przeliczy je na miesiąc, a koszty jednorazowe pokaże osobno." },
      { q: "Czy muszę podawać dokładne kwoty?", a: "Nie. Wystarczą orientacyjne wartości. Puste pola liczą się jako 0." },
      { q: "Czy moje dane finansowe są gdzieś wysyłane?", a: "Nie. Obliczenia wykonuje Twoja przeglądarka. Dane nie trafiają do nas ani do narzędzi analitycznych." },
    ],
    sources: [{ ...SRC.kro, label: "Kodeks rodzinny i opiekuńczy: art. 27, 60, 133, 135 (obowiązki alimentacyjne, kontekst)" }],
  },
  {
    slug: "plan-opieki-nad-dzieckiem",
    short: "Plan opieki nad dzieckiem",
    icon: "calendar",
    cardTitle: "Plan opieki nad dzieckiem",
    cardDesc: "Ułóż własny rytm opieki, przekazania, święta i wakacje. Wynik to projekt porozumienia rodzicielskiego do rozmowy z drugim rodzicem lub mediatorem.",
    outcome: "Kalendarz tygodnia i miesiąca, przekazania, święta w kolejnych latach, projekt porozumienia rodzicielskiego, PDF",
    time: "ok. 8 min",
    h1: "Jak może wyglądać życie dziecka w dwóch domach?",
    h2: "Przygotuj projekt porozumienia rodzicielskiego: harmonogram, przekazania, święta i decyzje. Do omówienia z drugim rodzicem lub mediatorem.",
    seo: {
      title: "Plan opieki nad dzieckiem po rozstaniu: kreator",
      description: "Bezpłatny kreator porozumienia rodzicielskiego: własny harmonogram, gniazdowanie, przekazania, święta w latach parzystych i nieparzystych, wakacje, decyzje.",
    },
    ctaLabel: "Sprawdź, jakie ustalenia dotyczące dzieci można przygotować przed rozwodem",
    primaryOffer: "plan-rozwodu",
    how: ["Wybierz formę opieki i ułóż własny rytm dwóch tygodni", "Ustal przekazania, święta, wakacje i decyzje", "Pobierz projekt porozumienia rodzicielskiego do rozmowy"],
    faq: [
      { q: "Czy taki plan jest wiążący?", a: "Nie. To propozycja do rozmowy. Może stać się podstawą porozumienia rodzicielskiego. Sąd uwzględnia pisemne porozumienie rodziców, jeśli służy dobru dziecka. Treść warto skonsultować ze specjalistą." },
      { q: "Który model opieki jest najlepszy?", a: "Nie ma jednego modelu dla każdej rodziny. Liczą się wiek i potrzeby dziecka, odległość między domami, szkoła i praca rodziców. Narzędzie nie rekomenduje modelu. Pomaga go rozpisać i przemyśleć, także gdy chcecie własny układ." },
      { q: "Czy można nie ustalać kontaktów szczegółowo?", a: "Tak, gdy rodzice dobrze współpracują. Ryzyko: przy sporze brak jasnych zasad, dlatego warto dopisać rytm zastępczy." },
      { q: "Dlaczego nie pytacie o imię dziecka?", a: "Nie jest potrzebne do planu. Zbieramy jak najmniej danych o dzieciach." },
      { q: "Co, jeśli nie możemy się porozumieć?", a: "Gdy rozmowy między Wami nie wystarczają, może pomóc mediator. Mediacja jest dobrowolna. Jeśli porozumienie nie jest możliwe, o opiece i kontaktach rozstrzyga sąd. Przy przemocy lub zagrożeniu wspólne rozmowy mogą nie być bezpieczne. Skorzystaj wtedy z indywidualnej pomocy." },
      { q: "Czy dziecko powinno mieć wpływ na plan?", a: "Zdanie dziecka, stosownie do wieku i dojrzałości, jest ważne. Dziecko nie powinno jednak decydować ani wybierać między rodzicami." },
    ],
    sources: [
      { ...SRC.kro, label: "Kodeks rodzinny i opiekuńczy: art. 58 § 1, 92 i n., 97, 113 i n." },
      SRC.mediacjeGov,
    ],
  },
  {
    slug: "konsekwencje-rozstania",
    short: "Mapa prawnych konsekwencji",
    icon: "map",
    cardTitle: "Mapa prawnych konsekwencji rozstania",
    cardDesc: "Zobacz, które kwestie prawne dotyczą Twojej sytuacji i etapu: dzieci, majątek, kredyt, procedury.",
    outcome: "Karty tematów dopasowane do odpowiedzi i etapu: co wiedzieć, co sprawdzić, o co zapytać",
    time: "ok. 3 min",
    h1: "Co prawnie zmieni się w Twoim życiu po rozstaniu?",
    h2: "Odpowiedz na kilka pytań i zobacz, które kwestie prawne warto sprawdzić w Twojej sytuacji.",
    seo: {
      title: "Skutki prawne rozstania i rozwodu: mapa tematów",
      description: "Bezpłatna mapa prawnych konsekwencji rozstania: dzieci, majątek, mieszkanie, kredyt, alimenty, procedury. Dopasowana do etapu i rodzaju związku.",
    },
    ctaLabel: "Poznaj możliwe kolejne kroki i przygotuj plan działania",
    primaryOffer: "plan-rozwodu",
    how: ["Zaznacz, czego dotyczy Twoja sytuacja i na jakim etapie jesteś", "Otrzymaj mapę tematów w formie kart", "Pobierz raport z pytaniami do specjalisty"],
    faq: [
      { q: "Czy to porada prawna?", a: "Nie. Mapa wskazuje tematy, które zwykle warto sprawdzić, i pytania do specjalisty. Twoje prawa i obowiązki zależą od szczegółów, których narzędzie nie zna." },
      { q: "Dlaczego związek nieformalny ma inne wyniki?", a: "Bo przepisy są inne. Rozwód, separacja, intercyza i wspólność majątkowa małżeńska dotyczą tylko małżeństwa. Partnerzy nie mają też wobec siebie obowiązku alimentacyjnego. Prawa i obowiązki wobec dzieci nie zależą od ślubu." },
      { q: "Złożyliśmy już pozew albo jest po wyroku. Czy narzędzie ma sens?", a: "Tak. Wynik dopasowuje się do etapu. Pokaże to, co nadal można uporządkować, np. porozumienie rodzicielskie, mediację w trakcie sprawy albo sprawy po wyroku." },
      { q: "Czy informacje są aktualne?", a: "Treści opierają się na przepisach z dnia weryfikacji podanego w stopce. Przepisy się zmieniają, więc przed decyzją sprawdź stan prawny ze specjalistą." },
    ],
    sources: [
      { ...SRC.kro, label: "Kodeks rodzinny i opiekuńczy: art. 27, 31–46, 56–61⁶, 92 i n., 113, 133, 135" },
      { ...SRC.kc, label: "Kodeks cywilny: współwłasność, dziedziczenie, odpowiedzialność solidarna" },
      { ...SRC.kpc, label: "Kodeks postępowania cywilnego: właściwość sądu, mediacja" },
      SRC.uksc,
    ],
  },
  {
    slug: "przed-pozwem",
    short: "Ustalenia przed pozwem",
    icon: "handshake",
    cardTitle: "Czy warto ustalić warunki przed pozwem?",
    cardDesc: "Sprawdź, co możecie uzgodnić sami, kiedy pomaga mediacja i co napisać w pozwie.",
    outcome: "Mapa ustaleń, rozmowy i mediacja osobno, jak zacząć mediację, co wpisać w pozwie, dokumenty",
    time: "ok. 4 min",
    h1: "Czy można ustalić warunki rozwodu, zanim złożycie pozew?",
    h2: "Sprawdź, co możecie uzgodnić w rozmowach, kiedy pomaga mediator i co napisać w pozwie.",
    seo: {
      title: "Ustalenia przed pozwem rozwodowym: rozmowy i mediacja",
      description: "Bezpłatny przewodnik: co ustalić przed pozwem, jak zacząć mediację (zaproszenie do mediacji), co napisać w pozwie, jakie dokumenty przygotować.",
    },
    ctaLabel: "Sprawdź koszt i odbierz bezpłatny Plan Rozwodu",
    primaryOffer: "plan-rozwodu",
    how: ["Zaznacz tematy do uzgodnienia, bez opisywania konfliktu", "Zobacz, co uzgodnić w rozmowach, a co z mediatorem", "Pobierz kolejność działań i pytania do mediatora"],
    faq: [
      { q: "Czym rozmowy różnią się od mediacji?", a: "Rozmowy to Wasze własne próby dogadania się. Mediacja to spotkania z bezstronnym mediatorem, który pomaga wypracować porozumienie, ale niczego nie rozstrzyga. W pozwie wskazuje się próbę mediacji lub innego polubownego rozwiązania sporu." },
      { q: "Jak zacząć mediację?", a: "Zwykle od zaproszenia do mediacji. Możesz je wysłać sam(a) albo poprosić wybranego mediatora lub ośrodek mediacji, żeby wysłał je drugiej stronie. Gdy druga strona wyraźnie odmówi, mediator może to potwierdzić pisemnym oświadczeniem. Formalny wniosek do mediatora to jedna z dróg, nie jedyna." },
      { q: "Czy mediacja jest obowiązkowa?", a: "Nie. Jest dobrowolna. Jeśli sąd skieruje Was do mediacji, każde z Was może się sprzeciwić w ciągu tygodnia. Z mediacji można zrezygnować na każdym etapie." },
      { q: "Czy ugoda z mediacji ma moc prawną?", a: "Ugodę zawartą przed mediatorem sąd może zatwierdzić. Ma wtedy moc ugody sądowej. Samego rozwodu ugoda nie zastąpi, bo orzeka go sąd. Treść warto skonsultować." },
      { q: "Co daje próba mediacji, jeśli druga strona odmówi?", a: "Zaproszenie i oświadczenie mediatora o odmowie pokazują Twoją gotowość do porozumienia. Wskazujesz je w pozwie. Odmowa bez uzasadnionego powodu może mieć znaczenie przy kosztach. Próba nie gwarantuje konkretnego rozstrzygnięcia." },
      { q: "Co, jeśli boję się drugiej strony?", a: "Twoje bezpieczeństwo jest najważniejsze. Nie musisz rozmawiać ani proponować mediacji. Skorzystaj z indywidualnej pomocy. W zagrożeniu dzwoń pod 112, wsparcie daje m.in. Niebieska Linia (800 120 002)." },
      { q: "Ile kosztuje Plan Rozwodu?", a: "Plan Rozwodu jest bezpłatny. Na jego stronie możesz też, bez zobowiązań, zapytać o koszt dalszej pomocy Nowego Etapu." },
    ],
    sources: [
      { ...SRC.kpc, label: "Kodeks postępowania cywilnego: art. 103, art. 183¹ i n. (mediacja), art. 187 § 1 pkt 3, art. 436, 445²" },
      { ...SRC.kro, label: "Kodeks rodzinny i opiekuńczy: art. 57, 58" },
      SRC.mediacjeGov,
      SRC.mediacjeMS,
    ],
  },
  {
    slug: "koszty-utrzymania-dziecka",
    short: "Koszty utrzymania dziecka",
    icon: "coins",
    cardTitle: "Kalkulator kosztów utrzymania dziecka",
    cardDesc: "Uporządkuj miesięczne i roczne wydatki na jedno lub kilkoro dzieci. Porównaj scenariusze i pobierz zestawienie.",
    outcome: "Koszt miesięczny i roczny na każde dziecko i łącznie, kategorie, wykres, scenariusze, eksport",
    time: "ok. 5 min",
    h1: "Ile naprawdę kosztuje miesięczne utrzymanie dziecka?",
    h2: "Uporządkuj wydatki na każde dziecko i przygotuj zestawienie do rozmów o kosztach.",
    seo: {
      title: "Koszty utrzymania dziecka: kalkulator miesięczny i roczny",
      description: "Bezpłatny kalkulator kosztów utrzymania dzieci: jedzenie, ubrania, szkoła, zdrowie, zajęcia, wakacje. Dla jednego lub kilkorga dzieci, z eksportem.",
    },
    ctaLabel: "Zobacz, jak uporządkować kwestie finansowe dotyczące dzieci przed rozwodem",
    primaryOffer: "plan-rozwodu",
    how: ["Dodaj dzieci i wpisz wydatki z częstotliwością", "Zobacz koszt na każde dziecko i łącznie", "Porównaj scenariusze i pobierz zestawienie"],
    faq: [
      { q: "Czy to kalkulator alimentów?", a: "Nie. Zestawienie wydatków to tylko jeden element rozmowy. Alimenty zależą od potrzeb dziecka i możliwości rodziców. Liczy się też osobista opieka rodzica nad dzieckiem. W razie sporu decyduje sąd." },
      { q: "Co, jeśli dziecko jest pełnoletnie?", a: "Pełnoletnie dziecko, które nie może się jeszcze samo utrzymać, występuje z roszczeniem o alimenty we własnym imieniu. Rodzic nie działa w jego zastępstwie. Zestawienie kosztów nadal może pomóc w rozmowie." },
      { q: "Jak policzyć koszty mieszkania przypadające na dziecko?", a: "Nie ma jednej metody. Wpisz kwotę, którą uważasz za uzasadnioną, np. część czynszu i mediów, i zanotuj, jak ją wyliczyłeś/wyliczyłaś. Metoda powinna być zrozumiała dla drugiej strony." },
      { q: "Po co porównywać scenariusze?", a: "Żeby zobaczyć różnicę np. po zmianie szkoły, nowych zajęciach albo zmianie opieki. Skopiuj scenariusz i zmień tylko wybrane pozycje." },
      { q: "Czy warto zbierać paragony?", a: "Tak, przy większych lub regularnych wydatkach. Pomagają faktury, potwierdzenia przelewów, umowy z przedszkolem czy na zajęcia." },
    ],
    sources: [{ ...SRC.kro, label: "Kodeks rodzinny i opiekuńczy: art. 128, 133, 135 (obowiązek alimentacyjny)" }],
  },
  {
    slug: "separacja-czy-rozwod",
    short: "Separacja czy rozwód?",
    icon: "split",
    cardTitle: "Separacja czy rozwód?",
    cardDesc: "Porównaj skutki prawne obu rozwiązań w tabeli dopasowanej do Twoich odpowiedzi. Bez podpowiadania decyzji.",
    outcome: "Tabela porównawcza dopasowana do odpowiedzi, skutki wspólne, różnice, pytania do specjalisty",
    time: "ok. 3 min",
    h1: "Separacja czy rozwód? Sprawdź najważniejsze różnice.",
    h2: "Poznaj skutki prawne obu rozwiązań i pytania, które warto rozważyć przed decyzją.",
    seo: {
      title: "Separacja czy rozwód? Różnice i skutki prawne",
      description: "Porównaj separację i rozwód: status małżeństwa, majątek, dzieci, koszty, nazwisko, dziedziczenie, zniesienie separacji. Tabela dopasowana do Ciebie.",
    },
    ctaLabel: "Poznaj dostępne drogi i uporządkuj kolejne kroki",
    primaryOffer: "konsultacja",
    how: ["Zaznacz, które tematy są dla Ciebie ważne", "Zobacz tabelę: separacja i rozwód", "Pobierz pytania do specjalisty"],
    faq: [
      { q: "Czy z separacji można przejść do rozwodu?", a: "Tak. Po separacji można złożyć pozew o rozwód, jeśli rozkład pożycia jest zupełny i trwały." },
      { q: "Czy w separacji można wziąć nowy ślub?", a: "Nie. Małżeństwo formalnie trwa, więc nowego zawrzeć nie można." },
      { q: "Czy separację można cofnąć?", a: "Tak. Na zgodne żądanie małżonków sąd znosi separację. Rozwodu nie da się cofnąć. Można jedynie ponownie zawrzeć małżeństwo." },
      { q: "Co jest szybsze i tańsze?", a: "Opłata od pozwu o rozwód i o separację wynosi zwykle 600 zł. Przy zgodnym wniosku o separację jest niższa. Czas trwania zależy od sądu i stopnia sporu, więc nie obiecujemy terminów." },
      { q: "Czy narzędzie podpowie, co wybrać?", a: "Nie. Decyzja należy do Ciebie. Narzędzie nie ocenia przesłanek rozwodu ani separacji. Porządkuje różnice i pytania do specjalisty." },
    ],
    sources: [
      { ...SRC.kro, label: "Kodeks rodzinny i opiekuńczy: art. 54, 56–61⁶, 62" },
      { ...SRC.kc, label: "Kodeks cywilny: art. 935¹ (dziedziczenie a separacja)" },
      { ...SRC.uksc, label: "Ustawa o kosztach sądowych w sprawach cywilnych: art. 26" },
    ],
  },
  {
    slug: "pierwsze-30-dni",
    short: "Pierwsze 30 dni",
    icon: "checklist",
    cardTitle: "Pierwsze 30 dni po decyzji o rozstaniu",
    cardDesc: "Checklista na cztery tygodnie, dopasowana do Ciebie: sprawy pilne, finanse, dzieci, mieszkanie.",
    outcome: "Plan na 4 tygodnie z checkboxami, edycją i eksportem PDF",
    time: "ok. 2 min",
    h1: "Co zrobić w pierwszych 30 dniach po decyzji o rozstaniu?",
    h2: "Otrzymaj uporządkowaną checklistę dopasowaną do Twojej sytuacji.",
    seo: {
      title: "Pierwsze 30 dni po decyzji o rozstaniu: checklista",
      description: "Bezpłatna checklista na pierwsze 30 dni po decyzji o rozstaniu, dopasowana do Ciebie: bezpieczeństwo, dokumenty, finanse, dzieci, mieszkanie.",
    },
    ctaLabel: "Sprawdź, jak przygotować indywidualny Plan Rozwodu",
    primaryOffer: "plan-rozwodu",
    how: ["Odpowiedz na 7 krótkich pytań", "Otrzymaj plan na 4 tygodnie", "Odhaczaj, edytuj i pobierz PDF"],
    faq: [
      { q: "Czy muszę zrobić wszystko w 30 dni?", a: "Nie. To propozycja kolejności. Tempo zależy od Twojej sytuacji i możliwości. Zadania, które Cię nie dotyczą, możesz usunąć." },
      { q: "Czy plan zapisuje się automatycznie?", a: "Nie, ze względu na bezpieczeństwo na wspólnych urządzeniach. Możesz go pobrać, wysłać na e-mail albo świadomie zapisać w przeglądarce i w każdej chwili usunąć." },
      { q: "Co, jeśli czuję się zagrożony/zagrożona?", a: "Bezpieczeństwo jest pierwsze. W zagrożeniu dzwoń pod 112. Wsparcie daje m.in. Niebieska Linia: 800 120 002." },
      { q: "Czy plan zastąpi rozmowę z prawnikiem?", a: "Nie. Pomaga przygotować się do rozmowy i niczego nie przeoczyć, ale nie zastępuje porady." },
    ],
    sources: [SRC.kro, SRC.mediacjeGov, SRC.niebieskaLinia],
  },
];

export function getTool(slug: string) {
  const t = TOOLS.find((x) => x.slug === slug);
  if (!t) throw new Error(`Unknown tool ${slug}`);
  return t;
}
