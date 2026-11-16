/**
 * Przed decyzją — Pozew rozwodowy: gdzie złożyć i co powinien zawierać.
 * Właściwość: art. 41 KPC (wyłączna). Lista kontrolna to konspekt, nie gotowy pozew.
 * Kolejność wg filozofii Nowego Etapu: najpierw plan i ustalenia (w tym próba mediacji), potem pozew.
 * Próba mediacji: art. 187 § 1 pkt 3 KPC (informacja w pozwie), art. 103 KPC (koszty) — patrz src/content/philosophy.ts.
 */
export type PetitionAnswers = {
  commonHome?: "yes" | "abroad" | "never";
  stillThere?: "me" | "partner" | "both" | "none";
  partnerWhere?: "pl" | "abroad" | "unknown";
  meWhere?: "pl" | "abroad";
  fault?: "none" | "fault" | "unsure";
  children?: "minor" | "adult" | "none";
  agreement?: "yes" | "maybe" | "no";
  flat?: "yes" | "no";
  property?: "together" | "later" | "none" | "unsure";
  alimony?: "request" | "no" | "unsure";
  /** Próba mediacji / polubownego rozwiązania: odbyła się, druga strona odmówiła, nie było, nie jest bezpieczna */
  mediation?: "yes" | "refused" | "no" | "unsafe";
};

export type CourtRuleId = "common" | "defendant" | "plaintiff" | "consult";
export type CourtResult = { rule: CourtRuleId; court: string; explanation: string; crossBorder: boolean; notes: string[] };

export const COURT_RULES: { id: Exclude<CourtRuleId, "consult">; text: string }[] = [
  { id: "common", text: "Sąd okręgowy ostatniego wspólnego miejsca zamieszkania małżonków — jeżeli choć jedno z Was nadal ma w tym okręgu miejsce zamieszkania lub zwykłego pobytu." },
  { id: "defendant", text: "Gdy tej podstawy brak — sąd okręgowy miejsca zamieszkania pozwanego (drugiej strony)." },
  { id: "plaintiff", text: "Gdy i tej podstawy brak — sąd okręgowy miejsca zamieszkania powoda (Twojego)." },
];

export function findCourt(a: PetitionAnswers): CourtResult {
  const crossBorder = a.commonHome === "abroad" || a.partnerWhere === "abroad" || a.meWhere === "abroad";
  const notes: string[] = [];
  if (crossBorder) notes.push("W sprawie występuje element zagraniczny. To, czy sprawę może rozpoznać sąd polski, zależy od przepisów o jurysdykcji (w UE m.in. rozporządzenia Rady (UE) 2019/1111). Skonsultuj to z prawnikiem przed złożeniem pozwu.");
  if (a.partnerWhere === "unknown") notes.push("Jeśli nie znasz miejsca pobytu drugiej strony, poinformuj o tym sąd — w takiej sytuacji sąd może podjąć dodatkowe czynności (np. ustanowić kuratora). Szczegóły ustal z prawnikiem.");
  notes.push("Właściwość z art. 41 KPC jest wyłączna — pozew złożony w niewłaściwym sądzie zostanie przekazany, co wydłuża sprawę.");

  if (a.commonHome === "yes" && a.stillThere && a.stillThere !== "none") {
    return { rule: "common", court: "Sąd Okręgowy właściwy dla ostatniego wspólnego miejsca zamieszkania", explanation: a.stillThere === "partner" ? "Druga strona nadal mieszka w okręgu ostatniego wspólnego miejsca zamieszkania." : a.stillThere === "me" ? "Nadal mieszkasz w okręgu ostatniego wspólnego miejsca zamieszkania." : "Oboje nadal mieszkacie w okręgu ostatniego wspólnego miejsca zamieszkania.", crossBorder, notes };
  }
  if (a.partnerWhere === "pl") {
    return { rule: "defendant", court: "Sąd Okręgowy właściwy dla miejsca zamieszkania drugiej strony (pozwanego)", explanation: a.commonHome === "yes" ? "Żadne z Was nie mieszka już w okręgu ostatniego wspólnego miejsca zamieszkania, a druga strona mieszka w Polsce." : "Nie mieliście wspólnego miejsca zamieszkania w Polsce, a druga strona mieszka w Polsce.", crossBorder, notes };
  }
  if (a.meWhere === "pl") {
    return { rule: "plaintiff", court: "Sąd Okręgowy właściwy dla Twojego miejsca zamieszkania (powoda)", explanation: "Nie ma podstawy z pierwszych dwóch reguł (brak wspólnego miejsca w okręgu, druga strona nie mieszka w Polsce lub jej miejsce jest nieznane).", crossBorder, notes };
  }
  return { rule: "consult", court: "Do ustalenia z prawnikiem", explanation: "Żadne z Was nie mieszka w Polsce — kwestia, czy i który polski sąd jest właściwy, wymaga indywidualnej analizy.", crossBorder: true, notes };
}

export type CheckItem = { id: string; text: string; note?: string };
export type CheckGroup = { id: string; title: string; items: CheckItem[] };

export function buildChecklist(a: PetitionAnswers): CheckGroup[] {
  const g: CheckGroup[] = [];
  const minor = a.children === "minor";
  const med = a.mediation;
  const attempted = med === "yes" || med === "refused";

  /* Najpierw plan i ustalenia — dopiero potem treść pozwu */
  const before: CheckItem[] = [
    { id: "b1", text: "Plan: spisane fakty, dokumenty, budżet i Twoje priorytety — co jest dla Ciebie kluczowe, a w czym możesz ustąpić", note: "Z planem wiesz, o co wnosisz, i nie zgadzasz się na rozwiązania pod presją." },
    { id: "b2", text: minor ? "Ustalenia: które sprawy są już uzgodnione (dzieci, mieszkanie, majątek, wina), a które pozostają sporne" : "Ustalenia: które sprawy są już uzgodnione (mieszkanie, majątek, wina, alimenty), a które pozostają sporne", note: "Każde uzgodnienie to jedna sprawa mniej do rozstrzygania przez sąd — zwykle krócej i taniej." },
  ];
  if (minor && a.agreement !== "yes") before.push({ id: "b3", text: "Spróbujcie spisać porozumienie o wychowaniu dzieci (władza rodzicielska, kontakty, alimenty)", note: "Sąd uwzględnia pisemne porozumienie rodziców, jeśli jest zgodne z dobrem dziecka (art. 58 § 1 KRO)." });
  if (med === "unsafe") {
    before.push({ id: "b4", text: "Bezpieczeństwo przede wszystkim — przy przemocy, groźbach lub kontroli nie musisz proponować mediacji", note: "Mediacja jest dobrowolna. W pozwie wyjaśniasz wtedy, dlaczego nie podjęto próby polubownego rozwiązania (art. 187 § 1 pkt 3 KPC) — sformułowanie ustal z prawnikiem lub ośrodkiem pomocy." });
  } else if (attempted) {
    before.push({ id: "b4", text: "Zachowaj dokumenty z próby mediacji: kopię wniosku, dowód doręczenia, korespondencję i pisemną informację od mediatora — wskażesz je w pozwie", note: med === "refused" ? "Odmowa drugiej strony nie przekreśla Twojej próby: pokazuje sądowi Twoją gotowość do porozumienia. Sąd może obciążyć kosztami stronę, która w sposób oczywiście nieuzasadniony odmówiła mediacji (art. 103 KPC)." : "Jeśli zawarliście ugodę lub spisaliście porozumienie, dołącz je do pozwu." });
  } else {
    before.push({ id: "b4", text: "Zanim złożysz pozew, zaproponuj mediację na piśmie (np. wniosek o mediację skierowany do mediatora i doręczony drugiej stronie) i zachowaj dowody", note: "Udokumentowana próba ma znaczenie nawet wtedy, gdy druga strona odmówi: pozew musi zawierać informację o próbie mediacji (art. 187 § 1 pkt 3 KPC), a sąd może obciążyć kosztami stronę, która w sposób oczywiście nieuzasadniony odmówiła mediacji (art. 103 KPC). Mediacja jest dobrowolna — przy przemocy lub kontroli nie musisz jej proponować." });
  }
  g.push({ id: "before", title: "Zanim złożysz pozew: plan, ustalenia, próba mediacji", items: before });

  g.push({
    id: "head", title: "Nagłówek pozwu",
    items: [
      { id: "h1", text: "Miejscowość i data" },
      { id: "h2", text: "Oznaczenie sądu: Sąd Okręgowy w … (wydział właściwy dla spraw rodzinnych/cywilnych — sprawdź strukturę sądu)" },
      { id: "h3", text: "Powód: imię, nazwisko, adres, numer PESEL" },
      { id: "h4", text: "Pozwany: imię, nazwisko, adres (PESEL, jeśli znasz)" },
      { id: "h5", text: "Tytuł pisma: „Pozew o rozwód”" },
    ],
  });
  const demands: CheckItem[] = [{ id: "d1", text: "Żądanie rozwiązania małżeństwa przez rozwód — z datą i miejscem zawarcia małżeństwa oraz numerem aktu małżeństwa" }];
  if (a.fault === "none") demands.push({ id: "d2", text: "Wniosek o rozwód bez orzekania o winie", note: "Sąd zaniecha orzekania o winie tylko na zgodne żądanie obojga małżonków (art. 57 § 2 KRO)." });
  if (a.fault === "fault") demands.push({ id: "d2", text: "Żądanie orzeczenia o winie (np. z wyłącznej winy pozwanego) — wraz z dowodami", note: "Rozwód z winą zwykle oznacza szersze postępowanie dowodowe." });
  if (a.fault === "unsure" || !a.fault) demands.push({ id: "d2", text: "Stanowisko co do winy — do decyzji przed złożeniem pozwu", note: "Pomocne: narzędzie „Rozwód z orzekaniem o winie czy bez?”." });
  if (a.alimony === "request") demands.push({ id: "d3", text: "Ewentualne żądanie alimentów od małżonka (art. 60 KRO)", note: "Warunki zależą od winy i sytuacji materialnej — do konsultacji." });
  if (a.alimony === "unsure") demands.push({ id: "d3", text: "Rozważ, czy żądać alimentów od małżonka (art. 60 KRO) — do konsultacji" });
  if (minor || a.alimony === "request") demands.push({ id: "d4", text: "Ewentualny wniosek o zabezpieczenie na czas trwania sprawy (np. alimenty, kontakty z dziećmi)", note: "Do konsultacji z prawnikiem." });
  g.push({ id: "demands", title: "Żądania pozwu", items: demands });

  if (minor) {
    const kids: CheckItem[] = [
      { id: "k1", text: "Propozycja rozstrzygnięcia o władzy rodzicielskiej nad wspólnymi małoletnimi dziećmi" },
      { id: "k2", text: "Miejsce zamieszkania dzieci" },
      { id: "k3", text: "Sposób utrzymywania kontaktów z dziećmi" },
      { id: "k4", text: "Alimenty na dzieci: kwota, termin płatności, sposób płatności", note: "Warto uzasadnić zestawieniem kosztów utrzymania dzieci." },
    ];
    if (a.agreement === "yes" || a.agreement === "maybe") kids.push({ id: "k5", text: "Pisemne porozumienie rodziców o wykonywaniu władzy rodzicielskiej i kontaktach — jako załącznik", note: "Sąd uwzględnia je, jeśli jest zgodne z dobrem dziecka (art. 58 § 1 KRO)." });
    g.push({ id: "kids", title: "Wspólne małoletnie dzieci", items: kids });
  }
  if (a.children === "adult") g.push({ id: "kids", title: "Dzieci pełnoletnie", items: [{ id: "k6", text: "Wyrok rozwodowy z urzędu rozstrzyga tylko o małoletnich dzieciach — kwestie dotyczące dzieci pełnoletnich (np. alimenty) skonsultuj osobno" }] });

  const prop: CheckItem[] = [];
  if (a.flat === "yes") prop.push({ id: "p1", text: "Ewentualny wniosek o orzeczenie o sposobie korzystania ze wspólnie zajmowanego mieszkania (art. 58 § 2 KRO)" });
  if (a.property === "together") prop.push({ id: "p2", text: "Wniosek o podział majątku wspólnego w wyroku rozwodowym (art. 58 § 3 KRO)", note: "Sąd dokonuje podziału, jeśli nie spowoduje to nadmiernej zwłoki — w praktyce głównie przy zgodnym projekcie podziału." });
  if (a.property === "later") prop.push({ id: "p3", text: "Podział majątku osobno, po rozwodzie — umową (przy nieruchomości u notariusza) lub w sądzie", note: "Opłata sądowa od wniosku o podział: 1000 zł, 300 zł przy zgodnym projekcie podziału." });
  if (a.property === "unsure") prop.push({ id: "p4", text: "Decyzja: podział majątku w wyroku czy osobno — do konsultacji" });
  if (prop.length) g.push({ id: "property", title: "Mieszkanie i majątek", items: prop });

  const just: CheckItem[] = [
    { id: "u1", text: "Data zawarcia małżeństwa i informacja o wspólnych dzieciach" },
    { id: "u2", text: "Od kiedy i na czym polega rozkład pożycia (więź uczuciowa, fizyczna, gospodarcza) — rzeczowo, bez zbędnych szczegółów" },
    {
      id: "u3",
      text: med === "yes" ? "Informacja o podjętej próbie mediacji lub innego polubownego rozwiązania sporu — ze wskazaniem dokumentów"
        : med === "refused" ? "Informacja o podjętej próbie mediacji i braku zgody drugiej strony — ze wskazaniem dokumentów (wniosek, dowód doręczenia, odpowiedź lub informacja od mediatora)"
        : med === "unsafe" ? "Informacja, że strony nie podjęły próby mediacji, wraz z wyjaśnieniem przyczyn (np. względy bezpieczeństwa)"
        : "Informacja, czy strony podjęły próbę mediacji lub innego polubownego rozwiązania sporu — a jeśli nie, wyjaśnienie przyczyn",
      note: "Obowiązkowy element pozwu (art. 187 § 1 pkt 3 KPC).",
    },
  ];
  if (a.fault === "fault") just.push({ id: "u4", text: "Okoliczności uzasadniające winę drugiej strony" });
  if (minor) just.push({ id: "u5", text: "Sytuacja i potrzeby dzieci, dotychczasowa opieka, koszty utrzymania" });
  just.push({ id: "u6", text: "Wnioski dowodowe: dokumenty, świadkowie (imię, nazwisko, adres), przesłuchanie stron" });
  g.push({ id: "just", title: "Uzasadnienie i dowody", items: just });

  const att: CheckItem[] = [
    { id: "a1", text: "Odpis aktu małżeństwa (sprawdź w sądzie, czy wymagany jest odpis zupełny)", note: "Odpis zamówisz w USC lub online przez gov.pl." },
  ];
  if (minor) att.push({ id: "a2", text: "Odpisy aktów urodzenia wspólnych małoletnich dzieci" });
  if (attempted) att.push({ id: "a6", text: "Dokumenty z próby mediacji, na które powołujesz się w pozwie (kopia wniosku, dowód doręczenia, korespondencja, informacja od mediatora; ugoda lub porozumienie — jeśli są)" });
  if (minor || a.alimony === "request") att.push({ id: "a3", text: "Dokumenty dotyczące dochodów (np. zaświadczenie o zarobkach) i kosztów utrzymania" });
  att.push({ id: "a4", text: "Dowód uiszczenia opłaty od pozwu: 600 zł" }, { id: "a5", text: "Pełnomocnictwo i dowód opłaty skarbowej 17 zł — jeśli działa pełnomocnik" });
  g.push({ id: "att", title: "Załączniki", items: att });

  g.push({
    id: "formal", title: "Formalności",
    items: [
      { id: "f1", text: "Własnoręczny podpis powoda (lub pełnomocnika)" },
      { id: "f2", text: "Odpis pozwu z załącznikami dla drugiej strony" },
      { id: "f3", text: "Złożenie w biurze podawczym właściwego sądu okręgowego albo przesyłką poleconą", note: "Pozwu o rozwód nie składa się w elektronicznym postępowaniu upominawczym (e-sąd)." },
    ],
  });
  return g;
}

export function countItems(groups: CheckGroup[]) {
  return groups.reduce((n, g) => n + g.items.length, 0);
}
