/**
 * Narzędzie 8: pierwsze 30 dni po decyzji o rozstaniu.
 * Plan to propozycja kolejności, nie obowiązkowy harmonogram.
 */
export type First30Answers = {
  children?: "yes" | "no";
  together?: "yes" | "partly" | "no";
  property?: "yes" | "no";
  loan?: "yes" | "no";
  decision?: "joint" | "mine" | "partner" | "unsure";
  urgent?: string[]; // safety | money | housing | kids | none
  filed?: "no" | "me" | "partner";
};

export type Period = 1 | 2 | 3 | 4;
export const PERIODS: { id: Period; label: string; days: string; focus: string }[] = [
  { id: 1, label: "Dni 1–7", days: "1–7", focus: "Sprawy pilne, bezpieczeństwo, dokumenty" },
  { id: 2, label: "Dni 8–14", days: "8–14", focus: "Finanse, dzieci, mieszkanie, codzienność" },
  { id: 3, label: "Dni 15–21", days: "15–21", focus: "Ustalenia, mediacja, rozmowy ze specjalistami" },
  { id: 4, label: "Dni 22–30", days: "22–30", focus: "Podsumowanie, otwarte decyzje, kolejne kroki" },
];

export type Task = { id: string; period: Period; category: string; text: string; note?: string; priority?: boolean; custom?: boolean };

type Rule = Omit<Task, "id"> & { id: string; when?: (a: First30Answers) => boolean };

const urgent = (k: string) => (a: First30Answers) => !!a.urgent?.includes(k);
const safety = urgent("safety");
const kids = (a: First30Answers) => a.children === "yes";
const together = (a: First30Answers) => a.together === "yes" || a.together === "partly";
const property = (a: First30Answers) => a.property === "yes";
const loan = (a: First30Answers) => a.loan === "yes";
const filed = (a: First30Answers) => a.filed === "me" || a.filed === "partner";
const notFiled = (a: First30Answers) => !filed(a);
const canTalk = (a: First30Answers) => a.decision === "joint" && !safety(a);
const all = (...fs: ((a: First30Answers) => boolean)[]) => (a: First30Answers) => fs.every((f) => f(a));
const not = (f: (a: First30Answers) => boolean) => (a: First30Answers) => !f(a);

/**
 * Reguły planu. Zasada: mało zadań ogólnych, dużo zadań wynikających z konkretnej odpowiedzi.
 * Każda odpowiedź na każde pytanie zmienia coś widocznego w planie (patrz testy).
 */
const RULES: Rule[] = [
  // ---- Dni 1–7
  { id: "s1", period: 1, category: "Bezpieczeństwo", priority: true, when: safety, text: "Zadbaj o bezpieczeństwo swoje i dzieci. W sytuacji zagrożenia dzwoń pod 112.", note: "Niebieska Linia: 800 120 002. Pomyśl o bezpiecznym miejscu i zaufanej osobie." },
  { id: "s2", period: 1, category: "Bezpieczeństwo", priority: true, when: safety, text: "Przygotuj w bezpiecznym miejscu dokumenty, leki, klucze i telefon z numerami alarmowymi." },
  { id: "s3", period: 1, category: "Bezpieczeństwo", when: safety, text: "Zanim zaczniesz rozmowy z drugą stroną, skonsultuj sytuację z prawnikiem lub ośrodkiem pomocy." },
  { id: "d1", period: 1, category: "Bezpieczeństwo cyfrowe", priority: true, when: safety, text: "Zmień hasła do poczty, banku i telefonu. Włącz weryfikację dwuetapową i wyłącz udostępnianie lokalizacji.", note: "Sprawdź też, czy na telefonie nie ma nieznanych aplikacji." },
  { id: "d1b", period: 1, category: "Bezpieczeństwo cyfrowe", when: not(safety), text: "Zmień hasła do poczty, banku i telefonu. Włącz weryfikację dwuetapową.", note: "Nie loguj się na konta drugiej osoby. To może być niezgodne z prawem." },
  { id: "f0", period: 1, category: "Finanse", priority: true, when: urgent("money"), text: "Ustal, z czego pokryjesz w tym miesiącu czynsz, rachunki i jedzenie." },
  { id: "f0b", period: 1, category: "Finanse", when: urgent("money"), text: "Sprawdź, czy przysługuje Ci wsparcie, np. z ośrodka pomocy społecznej lub dodatek mieszkaniowy." },
  { id: "h0", period: 1, category: "Mieszkanie", priority: true, when: urgent("housing"), text: "Ustal, gdzie zamieszkasz w najbliższych tygodniach i na jakich zasadach." },
  { id: "k0", period: 1, category: "Dzieci", priority: true, when: all(kids, urgent("kids")), text: "Ustal tymczasowo, gdzie mieszkają dzieci i jak wygląda ich tydzień." },
  { id: "k0b", period: 1, category: "Dzieci", when: all(kids, urgent("kids")), text: "Powiedz szkole lub przedszkolu, kto odbiera dzieci w najbliższych tygodniach." },
  { id: "p1", period: 1, category: "Sprawa w sądzie", priority: true, when: (a) => a.filed === "partner", text: "Sprawdź w piśmie z sądu termin na odpowiedź na pozew i skonsultuj się z prawnikiem.", note: "Zapisz sygnaturę sprawy z pisma. Będzie potrzebna w każdym kontakcie z sądem." },
  { id: "dm1", period: 1, category: "Decyzja", when: (a) => a.decision === "mine" && !safety(a), text: "Zaplanuj, jak powiesz o decyzji drugiej osobie, jeśli jeszcze nie wie: spokojnie, bez dzieci, bez presji na szybkie ustalenia." },
  { id: "dp1", period: 1, category: "Decyzja", when: (a) => a.decision === "partner", text: "Daj sobie czas na przyjęcie decyzji. Nie podpisuj niczego i nie zgadzaj się na nic pod presją." },
  { id: "du1", period: 1, category: "Decyzja", when: (a) => a.decision === "unsure", text: "Nie musisz od razu podejmować formalnych kroków. Zapisz, czego potrzebujesz, żeby mieć jasność." },
  { id: "dj1", period: 1, category: "Decyzja", when: canTalk, text: "Ustalcie razem, co i kiedy mówicie rodzinie i znajomym, żeby uniknąć sprzecznych wersji." },
  { id: "d2", period: 1, category: "Dokumenty", text: "Zbierz kopie najważniejszych dokumentów: dowód, odpis aktu małżeństwa (jeśli dotyczy), umowy, polisy.", note: "Odpisy aktów stanu cywilnego zamówisz online na gov.pl." },
  { id: "d3", period: 1, category: "Dokumenty", when: kids, text: "Przygotuj dokumenty dzieci: odpisy aktów urodzenia, książeczki zdrowia, dokumenty ze szkoły." },
  { id: "d4", period: 1, category: "Dokumenty", when: property, text: "Zapisz numer księgi wieczystej i zrób kopię aktu notarialnego." },
  { id: "d5", period: 1, category: "Dokumenty", when: loan, text: "Zrób kopię umowy kredytu z aneksami i harmonogramem spłat." },
  { id: "ht1", period: 1, category: "Mieszkanie", when: (a) => a.together === "yes", text: "Schowaj w bezpiecznym miejscu dokumenty i rzeczy osobiste, których potrzebujesz na co dzień." },
  { id: "i1", period: 1, category: "Plan", when: not(urgent("none")), text: "Zapisz, co jest teraz najważniejsze, a co może poczekać." },
  { id: "i0", period: 1, category: "Plan", when: urgent("none"), text: "Nic nie jest pilne, więc masz czas na spokojny plan. Zacznij od dokumentów i budżetu, zanim zaczniecie ustalenia." },
  { id: "i2", period: 1, category: "Wsparcie", text: "Pomyśl, kto może Cię wesprzeć: bliska osoba, psycholog, grupa wsparcia.", note: "Telefon zaufania dla dorosłych: 116 123." },

  // ---- Dni 8–14
  { id: "f1", period: 2, category: "Finanse", text: "Spisz miesięczne dochody i wydatki: obecne i po rozstaniu.", note: "Pomocne: kalkulator Budżet po rozstaniu." },
  { id: "f2", period: 2, category: "Finanse", text: "Spisz wspólne konta, karty i subskrypcje. Rozważ własne konto na swoje dochody. Nie opróżniaj wspólnych kont jednostronnie.", note: "Takie działania mogą mieć skutki prawne i zaostrzyć konflikt." },
  { id: "f4", period: 2, category: "Kredyt", when: loan, text: "Sprawdź saldo i harmonogram kredytu. Zapisz pytania do banku.", note: "Rozwód nie zwalnia współkredytobiorcy z długu." },
  { id: "f6", period: 2, category: "Kredyt", when: loan, priority: true, text: "Ustalcie na piśmie, kto płaci raty w najbliższych miesiącach. Nie wstrzymujcie spłaty.", note: "Zaległości obciążają historię kredytową obojga." },
  { id: "f5", period: 2, category: "Finanse", when: not(loan), text: "Sprawdź, czy macie inne wspólne zobowiązania: karty, raty, pożyczki, leasing." },
  { id: "m1", period: 2, category: "Majątek", when: property, text: "Zrób wstępną listę majątku i długów: co kupiliście razem, co masz sprzed związku, darowizny, spadki." },
  { id: "h3", period: 2, category: "Mieszkanie", when: property, text: "Sprawdź możliwe scenariusze dla mieszkania: sprzedaż, spłata jednej osoby, dalsza współwłasność.", note: "Pomocne: narzędzie Mieszkanie i kredyt po rozstaniu." },
  { id: "r1", period: 2, category: "Mieszkanie", when: not(property), text: "Jeśli wynajmujecie: sprawdź, kto jest stroną umowy najmu, okres wypowiedzenia i kto wpłacił kaucję." },
  { id: "h1", period: 2, category: "Mieszkanie", when: (a) => a.together === "yes", text: "Ustalcie tymczasowe zasady wspólnego mieszkania: przestrzeń, rachunki, goście, sposób komunikacji." },
  { id: "h1p", period: 2, category: "Mieszkanie", when: (a) => a.together === "partly", text: "Ustalcie, kto i kiedy się wyprowadza oraz kto płaci rachunki do tego czasu." },
  { id: "h2", period: 2, category: "Mieszkanie", when: (a) => a.together === "no", text: "Zmień adres do korespondencji w banku, pracy i urzędach. Spisz rzeczy, które zostały w dawnym mieszkaniu." },
  { id: "h4", period: 2, category: "Mieszkanie", when: urgent("housing"), text: "Sprawdź ceny najmu w okolicy i odłóż na kaucję oraz przeprowadzkę." },
  { id: "k1", period: 2, category: "Dzieci", when: kids, text: "Zaplanuj rozmowę z dziećmi o zmianach. Najlepiej razem z drugim rodzicem, jeśli to bezpieczne." },
  { id: "k2", period: 2, category: "Dzieci", when: kids, text: "Spisz tydzień dzieci: szkoła, zajęcia, lekarze, kto odbiera.", note: "Pomocne: kreator Plan opieki nad dzieckiem." },
  { id: "kt1", period: 2, category: "Dzieci", when: all(kids, together), text: "Ustalcie, jak dzielicie opiekę, dopóki mieszkacie razem. Nie rozmawiajcie o rozstaniu przy dzieciach." },
  { id: "kn1", period: 2, category: "Dzieci", when: (a) => kids(a) && a.together === "no", text: "Ustalcie tymczasowy grafik kontaktów dzieci z rodzicem, który mieszka osobno." },
  { id: "k3", period: 2, category: "Dzieci", when: kids, text: "Policz miesięczne koszty utrzymania dzieci.", note: "Pomocne: kalkulator kosztów utrzymania dziecka." },

  // ---- Dni 15–21
  { id: "p2", period: 3, category: "Sprawa w sądzie", when: (a) => a.filed === "me", text: "Gdy dostaniesz sygnaturę sprawy, zapisz ją i sprawdzaj korespondencję z sądu. Notuj terminy.", note: "Sygnatura zwykle przychodzi w pierwszym piśmie z sądu, często po kilku tygodniach." },
  { id: "pp2", period: 2, category: "Sprawa w sądzie", when: (a) => a.filed === "partner", text: "Zbierz dokumenty potrzebne do odpowiedzi na pozew i zapisz swoje stanowisko w najważniejszych sprawach." },
  { id: "u1", period: 3, category: "Ustalenia", when: not(safety), text: "Spisz tematy do ustalenia i oznacz: uzgodnione, do rozmowy, sporne." },
  { id: "u2", period: 3, category: "Ustalenia", when: canTalk, text: "Umówcie spokojną rozmowę o pierwszych ustaleniach, np. o dzieciach i mieszkaniu na okres przejściowy." },
  { id: "uk1", period: 3, category: "Dzieci", when: all(kids, canTalk), text: "Zacznijcie rozmawiać o porozumieniu rodzicielskim: gdzie mieszkają dzieci, kontakty, koszty." },
  { id: "dm3", period: 3, category: "Ustalenia", when: (a) => a.decision === "mine" && !safety(a), text: "Daj drugiej osobie czas. Ustalenia rzadko udają się zaraz po przekazaniu decyzji." },
  { id: "dp3", period: 3, category: "Ustalenia", when: (a) => a.decision === "partner" && !safety(a), text: "Zanim zgodzisz się na propozycje drugiej strony, sprawdź z prawnikiem, co oznaczają dla Ciebie." },
  { id: "du3", period: 3, category: "Wsparcie", when: (a) => a.decision === "unsure" && !safety(a), text: "Rozważ rozmowę z psychologiem lub terapeutą, indywidualnie lub razem, zanim podejmiecie dalsze kroki." },
  { id: "u3", period: 3, category: "Mediacja", when: not(safety), text: "Sprawdź, czym jest mediacja rodzinna i czy może Wam pomóc. Jest dobrowolna.", note: "Pomocne: narzędzie Ustalenia przed pozwem." },
  { id: "u9", period: 3, category: "Mediacja", when: (a) => notFiled(a) && !safety(a), text: "Jeśli myślisz o pozwie, najpierw zaproś drugą stronę do mediacji (sam(a) albo przez wybranego mediatora). Zachowaj kopię zaproszenia i odpowiedź.", note: "W pozwie wskazuje się, czy była próba mediacji lub innego polubownego rozwiązania. Próba ma znaczenie także wtedy, gdy druga strona odmówi." },
  { id: "u4", period: 3, category: "Wsparcie prawne", when: safety, text: "Zamiast wspólnych negocjacji rozważ pełnomocnika, który będzie reprezentował Twoje interesy." },
  { id: "u5", period: 3, category: "Specjaliści", text: "Przygotuj się do konsultacji: krótka oś czasu, lista dokumentów, pytania (także o koszty)." },
  { id: "u6", period: 3, category: "Dzieci", when: kids, text: "Jeśli dzieci trudno przeżywają zmiany, rozważ konsultację z psychologiem dziecięcym." },
  { id: "u7", period: 3, category: "Droga formalna", when: notFiled, text: "Poznaj różnice między separacją a rozwodem, zanim wybierzesz drogę.", note: "Pomocne: porównanie Separacja czy rozwód?" },
  { id: "u8", period: 3, category: "Sprawa w sądzie", when: filed, text: "Sprawdź z prawnikiem, jak w trakcie sprawy zawrzeć porozumienie (np. o dzieciach) albo skorzystać z mediacji." },

  // ---- Dni 22–30
  { id: "z1", period: 4, category: "Podsumowanie", text: "Przejrzyj listę: co jest załatwione, co otwarte i jakich informacji brakuje do decyzji." },
  { id: "z3", period: 4, category: "Kolejne kroki", when: (a) => notFiled(a) && !safety(a), text: "Ułóż kolejne kroki: najpierw plan, potem ustalenia (rozmowa, mediacja), dopiero potem pozew. Zdecyduj, z kim je przejdziesz.", note: "Sprawy uzgodnione przed pozwem sąd może uwzględnić w wyroku. Sprawa jest wtedy zwykle krótsza i tańsza." },
  { id: "z7", period: 4, category: "Kolejne kroki", when: (a) => notFiled(a) && safety(a), text: "Ustal kolejne kroki z prawnikiem lub ośrodkiem pomocy. Przy zagrożeniu nie musisz próbować wspólnych ustaleń ani mediacji." },
  { id: "z4", period: 4, category: "Kolejne kroki", when: filed, text: "Zaplanuj kolejne etapy sprawy: dokumenty, propozycje porozumień, terminy." },
  { id: "zm1", period: 4, category: "Majątek", when: property, text: "Zdecyduj, które sprawy majątkowe chcecie uzgodnić teraz, a które mogą poczekać na osobny podział." },
  { id: "z6", period: 4, category: "Wsparcie", text: "Sprawdź, jak się czujesz. Zaplanuj coś, co da Ci oparcie w kolejnym miesiącu." },
];

/** Zadania pilne na górze listy okresu; poza tym kolejność bez zmian (sortowanie stabilne). */
export function sortTasks(tasks: Task[]): Task[] {
  return tasks
    .map((t, i) => ({ t, i }))
    .sort((x, y) => x.t.period - y.t.period || Number(!!y.t.priority) - Number(!!x.t.priority) || x.i - y.i)
    .map((x) => x.t);
}

/** Zadania jednego okresu, pilne na górze. */
export function tasksForPeriod(tasks: Task[], period: Period): Task[] {
  return sortTasks(tasks.filter((t) => t.period === period));
}

export function buildPlan(a: First30Answers): Task[] {
  return sortTasks(RULES.filter((r) => !r.when || r.when(a)).map(({ when: _w, ...t }) => t));
}

export function planProgress(tasks: Task[], done: Set<string>) {
  const total = tasks.length;
  const completed = tasks.filter((t) => done.has(t.id)).length;
  return { total, completed, pct: total ? Math.round((completed / total) * 100) : 0 };
}
