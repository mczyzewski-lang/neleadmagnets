/**
 * Narzędzie 8 — Pierwsze 30 dni po decyzji o rozstaniu.
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
  { id: 1, label: "Dni 1–7", days: "1–7", focus: "Sprawy pilne, bezpieczeństwo, dokumenty, podstawowe informacje" },
  { id: 2, label: "Dni 8–14", days: "8–14", focus: "Finanse, dzieci, mieszkanie, organizacja codzienności" },
  { id: 3, label: "Dni 15–21", days: "15–21", focus: "Możliwe ustalenia, opcje mediacyjne, przygotowanie do rozmów ze specjalistami" },
  { id: 4, label: "Dni 22–30", days: "22–30", focus: "Podsumowanie spraw, lista otwartych decyzji, kolejne kroki" },
];

export type Task = { id: string; period: Period; category: string; text: string; note?: string; priority?: boolean; custom?: boolean };

type Rule = Omit<Task, "id"> & { id: string; when?: (a: First30Answers) => boolean };

const safety = (a: First30Answers) => !!a.urgent?.includes("safety");
const kids = (a: First30Answers) => a.children === "yes";
const together = (a: First30Answers) => a.together === "yes" || a.together === "partly";
const property = (a: First30Answers) => a.property === "yes";
const loan = (a: First30Answers) => a.loan === "yes";
const filed = (a: First30Answers) => a.filed === "me" || a.filed === "partner";
const notFiled = (a: First30Answers) => !filed(a);
const canTalk = (a: First30Answers) => a.decision === "joint" && !safety(a);

const RULES: Rule[] = [
  // ---- Dni 1–7
  { id: "s1", period: 1, category: "Bezpieczeństwo", priority: true, when: safety, text: "Zadbaj o bezpieczeństwo swoje i dzieci. W sytuacji zagrożenia dzwoń pod 112.", note: "Wsparcie: Niebieska Linia 800 120 002. Rozważ rozmowę z kimś zaufanym i zaplanowanie bezpiecznego miejsca." },
  { id: "s2", period: 1, category: "Bezpieczeństwo", priority: true, when: safety, text: "Przygotuj w bezpiecznym miejscu najważniejsze dokumenty, leki, klucze i telefon z kontaktami alarmowymi." },
  { id: "s3", period: 1, category: "Bezpieczeństwo", when: safety, text: "Skonsultuj swoją sytuację indywidualnie (np. z prawnikiem lub ośrodkiem pomocy) zanim podejmiesz rozmowy z drugą stroną." },
  { id: "d1", period: 1, category: "Bezpieczeństwo cyfrowe", text: "Zmień hasła do poczty, bankowości i telefonu; włącz weryfikację dwuetapową. Sprawdź udostępnianie lokalizacji.", note: "Nie loguj się na konta drugiej osoby — to może być niezgodne z prawem." },
  { id: "d2", period: 1, category: "Dokumenty", text: "Zbierz kopie najważniejszych dokumentów: dowód osobisty, odpis aktu małżeństwa (jeśli dotyczy), umowy, polisy.", note: "Odpisy aktów stanu cywilnego można zamówić online na gov.pl." },
  { id: "d3", period: 1, category: "Dokumenty", when: kids, text: "Przygotuj dokumenty dzieci: odpisy aktów urodzenia, książeczki zdrowia, dokumenty ze szkoły/przedszkola." },
  { id: "d4", period: 1, category: "Dokumenty", when: (a) => property(a) || loan(a), text: "Zapisz numer księgi wieczystej i zbierz akt notarialny oraz umowę kredytową." },
  { id: "i1", period: 1, category: "Informacje", text: "Spisz na kartce, co dla Ciebie jest teraz najważniejsze, a co może poczekać." },
  { id: "i2", period: 1, category: "Wsparcie", text: "Pomyśl, kto może Cię wesprzeć: bliska osoba, psycholog, grupa wsparcia. Rozstanie to duże obciążenie.", note: "Kryzysowy telefon zaufania dla dorosłych: 116 123." },
  { id: "f0", period: 1, category: "Finanse", priority: true, when: (a) => !!a.urgent?.includes("money"), text: "Ustal, z czego pokryjesz najbliższe wydatki (czynsz, rachunki, jedzenie) w tym miesiącu." },
  { id: "h0", period: 1, category: "Mieszkanie", priority: true, when: (a) => !!a.urgent?.includes("housing"), text: "Ustal, gdzie zamieszkasz w najbliższych tygodniach i na jakich zasadach (tymczasowo)." },
  { id: "k0", period: 1, category: "Dzieci", priority: true, when: (a) => kids(a) && !!a.urgent?.includes("kids"), text: "Ustal tymczasowo, gdzie dzieci mieszkają i jak wygląda ich tydzień, aby zachować przewidywalność." },
  { id: "p1", period: 1, category: "Procedura", priority: true, when: (a) => a.filed === "partner", text: "Jeśli otrzymałeś/otrzymałaś pozew: sprawdź termin na odpowiedź wskazany w piśmie z sądu i skonsultuj się z prawnikiem." },
  { id: "p2", period: 1, category: "Procedura", when: (a) => a.filed === "me", text: "Sprawdź sygnaturę sprawy i korespondencję z sądu; zanotuj terminy." },

  // ---- Dni 8–14
  { id: "f1", period: 2, category: "Finanse", text: "Spisz miesięczne dochody i wydatki — obecne i po rozstaniu.", note: "Pomocne: kalkulator Budżet po rozstaniu." },
  { id: "f2", period: 2, category: "Finanse", text: "Zrób listę wspólnych kont, kart, subskrypcji i zobowiązań. Nie opróżniaj wspólnych kont jednostronnie.", note: "Takie działania mogą mieć skutki prawne i zaostrzyć konflikt." },
  { id: "f3", period: 2, category: "Finanse", text: "Rozważ założenie własnego konta, na które będą wpływać Twoje dochody (jeśli jeszcze go nie masz)." },
  { id: "f4", period: 2, category: "Finanse", when: loan, text: "Sprawdź saldo i harmonogram kredytu; zapisz pytania do banku.", note: "Rozwód nie zwalnia współkredytobiorcy z długu." },
  { id: "m1", period: 2, category: "Majątek", when: property, text: "Sporządź wstępną listę majątku i długów: co kupiliście razem, co jest Twoje sprzed związku, darowizny, spadki." },
  { id: "k1", period: 2, category: "Dzieci", when: kids, text: "Zastanów się, jak i kiedy porozmawiać z dziećmi o zmianach — najlepiej wspólnie z drugim rodzicem, jeśli to bezpieczne." },
  { id: "k2", period: 2, category: "Dzieci", when: kids, text: "Spisz plan tygodnia dzieci: szkoła, zajęcia, lekarze, kto odbiera.", note: "Pomocne: kreator Plan opieki nad dzieckiem." },
  { id: "k3", period: 2, category: "Dzieci", when: kids, text: "Zbierz informacje o miesięcznych kosztach utrzymania dzieci.", note: "Pomocne: kalkulator kosztów utrzymania dziecka." },
  { id: "h1", period: 2, category: "Mieszkanie", when: together, text: "Ustalcie tymczasowe zasady mieszkania razem: przestrzeń, rachunki, goście, komunikacja." },
  { id: "h2", period: 2, category: "Mieszkanie", when: (a) => a.together === "no", text: "Uporządkuj sprawy adresowe: korespondencję, adres do doręczeń, ewentualne zgłoszenie zmiany miejsca zamieszkania." },
  { id: "h3", period: 2, category: "Mieszkanie", when: property, text: "Sprawdź możliwe scenariusze dla mieszkania i kredytu.", note: "Pomocne: narzędzie Mieszkanie i kredyt po rozstaniu." },
  { id: "o1", period: 2, category: "Codzienność", text: "Zaplanuj codzienność: dojazdy, opieka, praca, czas dla siebie. Nie wszystko musi być rozwiązane od razu." },

  // ---- Dni 15–21
  { id: "u1", period: 3, category: "Ustalenia", text: "Spisz tematy do ustalenia i oznacz: uzgodnione / do rozmowy / sporne." },
  { id: "u2", period: 3, category: "Ustalenia", when: canTalk, text: "Jeśli oboje jesteście gotowi i czujecie się bezpiecznie — umówcie spokojną rozmowę o pierwszych ustaleniach (np. dzieci, mieszkanie w okresie przejściowym)." },
  { id: "u3", period: 3, category: "Mediacja", when: (a) => !safety(a), text: "Sprawdź, czym jest mediacja rodzinna i czy mogłaby być dla Was odpowiednia. Pamiętaj: jest dobrowolna.", note: "Pomocne: narzędzie Ustalenia przed pozwem." },
  { id: "u4", period: 3, category: "Wsparcie prawne", when: safety, text: "Zamiast wspólnych negocjacji rozważ wsparcie pełnomocnika, który będzie reprezentował Twoje interesy." },
  { id: "u5", period: 3, category: "Specjaliści", text: "Przygotuj się do konsultacji: krótka oś czasu, lista dokumentów, pytania (także o koszty i sposób pracy)." },
  { id: "u6", period: 3, category: "Specjaliści", when: kids, text: "Jeśli dzieci przeżywają zmiany trudno, rozważ konsultację z psychologiem dziecięcym." },
  { id: "u7", period: 3, category: "Procedura", when: notFiled, text: "Poznaj różnice między separacją a rozwodem, zanim zdecydujesz o drodze.", note: "Pomocne: porównanie Separacja czy rozwód?" },
  { id: "u8", period: 3, category: "Procedura", when: filed, text: "Sprawdź z prawnikiem, czy i jak w toku sprawy można zawrzeć porozumienie (np. o dzieciach) lub skorzystać z mediacji." },

  // ---- Dni 22–30
  { id: "z1", period: 4, category: "Podsumowanie", text: "Przejrzyj listę: co udało się uporządkować, co pozostaje otwarte." },
  { id: "z2", period: 4, category: "Decyzje", text: "Wypisz otwarte decyzje i informacje, których potrzebujesz, by je podjąć." },
  { id: "z3", period: 4, category: "Kolejne kroki", when: notFiled, text: "Ustal, czy chcesz najpierw przygotować ustalenia (plan), czy od razu przejść do formalnych kroków — i z kim." },
  { id: "z4", period: 4, category: "Kolejne kroki", when: filed, text: "Zaplanuj przygotowanie do kolejnych etapów sprawy: dokumenty, propozycje porozumień, terminy." },
  { id: "z5", period: 4, category: "Finanse", text: "Zaktualizuj budżet o to, czego dowiedziałeś/dowiedziałaś się w ostatnich tygodniach." },
  { id: "z6", period: 4, category: "Wsparcie", text: "Sprawdź, jak się czujesz. Zaplanuj coś, co daje Ci oparcie w kolejnym miesiącu." },
];

export function buildPlan(a: First30Answers): Task[] {
  return RULES.filter((r) => !r.when || r.when(a)).map(({ when: _w, ...t }) => t);
}

export function planProgress(tasks: Task[], done: Set<string>) {
  const total = tasks.length;
  const completed = tasks.filter((t) => done.has(t.id)).length;
  return { total, completed, pct: total ? Math.round((completed / total) * 100) : 0 };
}
