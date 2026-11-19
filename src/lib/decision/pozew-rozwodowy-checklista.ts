/**
 * Przed decyzją: Pozew rozwodowy, gdzie złożyć i co powinien zawierać.
 * Właściwość: art. 41 KPC (wyłączna). Lista kontrolna to konspekt, nie gotowy pozew.
 * Kolejność wg filozofii Nowego Etapu: najpierw plan i ustalenia (w tym próba mediacji), potem pozew.
 * Próba mediacji: art. 187 § 1 pkt 3 KPC (informacja w pozwie), art. 103 KPC (koszty), patrz src/content/philosophy.ts.
 * Teksty dla użytkownika bez przepisów (COPY_GUIDE.md); podstawy prawne są w meta.sources.
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
  { id: "common", text: "Sąd okręgowy ostatniego wspólnego miejsca zamieszkania małżonków, jeśli choć jedno z Was nadal mieszka w tym okręgu." },
  { id: "defendant", text: "Jeśli nie: sąd okręgowy miejsca zamieszkania pozwanego (drugiej strony)." },
  { id: "plaintiff", text: "Jeśli i to nie: sąd okręgowy Twojego miejsca zamieszkania (powoda)." },
];

export function findCourt(a: PetitionAnswers): CourtResult {
  const crossBorder = a.commonHome === "abroad" || a.partnerWhere === "abroad" || a.meWhere === "abroad";
  const notes: string[] = [];
  if (crossBorder) notes.push("Jest element zagraniczny. To, czy sprawę może rozpoznać sąd polski, zależy od przepisów o jurysdykcji, w UE także unijnych. Skonsultuj to z prawnikiem przed złożeniem pozwu.");
  if (a.partnerWhere === "unknown") notes.push("Jeśli nie znasz miejsca pobytu drugiej strony, napisz o tym sądowi. Sąd może wtedy np. ustanowić kuratora. Szczegóły ustal z prawnikiem.");
  notes.push("Ta właściwość jest wyłączna. Pozew złożony w niewłaściwym sądzie zostanie przekazany dalej, a sprawa się wydłuży.");

  if (a.commonHome === "yes" && a.stillThere && a.stillThere !== "none") {
    return { rule: "common", court: "Sąd Okręgowy właściwy dla ostatniego wspólnego miejsca zamieszkania", explanation: a.stillThere === "partner" ? "Druga strona nadal mieszka w okręgu ostatniego wspólnego miejsca zamieszkania." : a.stillThere === "me" ? "Nadal mieszkasz w okręgu ostatniego wspólnego miejsca zamieszkania." : "Oboje nadal mieszkacie w okręgu ostatniego wspólnego miejsca zamieszkania.", crossBorder, notes };
  }
  if (a.partnerWhere === "pl") {
    return { rule: "defendant", court: "Sąd Okręgowy właściwy dla miejsca zamieszkania drugiej strony (pozwanego)", explanation: a.commonHome === "yes" ? "Żadne z Was nie mieszka już w okręgu ostatniego wspólnego miejsca zamieszkania, a druga strona mieszka w Polsce." : "Nie mieliście wspólnego miejsca zamieszkania w Polsce, a druga strona mieszka w Polsce.", crossBorder, notes };
  }
  if (a.meWhere === "pl") {
    return { rule: "plaintiff", court: "Sąd Okręgowy właściwy dla Twojego miejsca zamieszkania (powoda)", explanation: "Dwie pierwsze reguły nie pasują: nikt nie został w okręgu wspólnego mieszkania, a druga strona nie mieszka w Polsce lub nie wiesz, gdzie mieszka.", crossBorder, notes };
  }
  return { rule: "consult", court: "Do ustalenia z prawnikiem", explanation: "Żadne z Was nie mieszka w Polsce. To, czy i który polski sąd jest właściwy, wymaga indywidualnej analizy.", crossBorder: true, notes };
}

export type CheckItem = { id: string; text: string; note?: string };
export type CheckGroup = { id: string; title: string; items: CheckItem[] };

export function buildChecklist(a: PetitionAnswers): CheckGroup[] {
  const g: CheckGroup[] = [];
  const minor = a.children === "minor";
  const anyKids = a.children === "minor" || a.children === "adult";
  const med = a.mediation;
  const attempted = med === "yes" || med === "refused";

  /* Najpierw plan i ustalenia, dopiero potem treść pozwu */
  const topics = [minor && "dzieci", a.flat === "yes" && "mieszkanie", a.property && a.property !== "none" && "majątek", "wina", a.alimony && a.alimony !== "no" && "alimenty"].filter(Boolean).join(", ");
  const before: CheckItem[] = [
    { id: "b1", text: "Plan: spisane fakty, dokumenty, budżet i priorytety. Co jest dla Ciebie kluczowe, a w czym możesz ustąpić", note: "Z planem wiesz, o co wnosisz, i nie zgadzasz się na nic pod presją." },
    { id: "b2", text: `Ustalenia: które sprawy są już uzgodnione (${topics}), a które sporne`, note: "Każde uzgodnienie to jedna sprawa mniej dla sądu. Zwykle krócej i taniej." },
  ];
  if (minor && a.agreement !== "yes") before.push({ id: "b3", text: "Spróbujcie spisać porozumienie rodzicielskie (władza rodzicielska, kontakty, alimenty)", note: "Sąd uwzględnia pisemne porozumienie rodziców, jeśli jest zgodne z dobrem dziecka." });
  if (med === "unsafe") {
    before.push({ id: "b4", text: "Bezpieczeństwo przede wszystkim. Przy przemocy, groźbach lub kontroli nie musisz proponować mediacji", note: "Mediacja jest dobrowolna. W pozwie wyjaśnisz, dlaczego nie było próby polubownego rozwiązania. Sformułowanie ustal z prawnikiem lub ośrodkiem pomocy." });
  } else if (attempted) {
    before.push({ id: "b4", text: med === "refused" ? "Zachowaj dowody próby mediacji: zaproszenie do mediacji, odpowiedź drugiej strony (albo jej brak) i pisemne potwierdzenie od mediatora" : "Zachowaj dokumenty z mediacji lub innej próby porozumienia: korespondencję, informację od mediatora, ugodę lub porozumienie", note: med === "refused" ? "Odmowa drugiej strony nie przekreśla Twojej próby. Pokazuje sądowi Twoją gotowość do porozumienia. Strona, która bez ważnego powodu odmówiła mediacji, może ponieść koszty." : "Jeśli zawarliście ugodę lub spisaliście porozumienie, dołącz je do pozwu." });
  } else {
    before.push({ id: "b4", text: "Zanim złożysz pozew, zaproponuj mediację: wyślij zaproszenie do mediacji (sam/sama albo przez wybranego mediatora) i zachowaj dowody", note: "Próba liczy się nawet przy odmowie. W pozwie piszesz, czy była próba mediacji. Przy wyraźnej odmowie mediator może to potwierdzić na piśmie. Mediacja jest dobrowolna: przy przemocy lub kontroli nie musisz jej proponować." });
  }
  g.push({ id: "before", title: "Zanim złożysz pozew: plan, ustalenia, próba mediacji", items: before });

  g.push({
    id: "head", title: "Nagłówek pozwu",
    items: [
      { id: "h1", text: "Miejscowość i data" },
      { id: "h2", text: "Oznaczenie sądu: Sąd Okręgowy w … (właściwy wydział sprawdź na stronie sądu)" },
      { id: "h3", text: "Powód: imię, nazwisko, adres, numer PESEL" },
      { id: "h4", text: "Pozwany: imię, nazwisko, adres (PESEL, jeśli znasz)" },
      { id: "h5", text: "Tytuł pisma: „Pozew o rozwód”" },
    ],
  });
  const demands: CheckItem[] = [{ id: "d1", text: "Żądanie rozwodu: data i miejsce ślubu, numer aktu małżeństwa" }];
  if (a.fault === "none") demands.push({ id: "d2", text: "Wniosek o rozwód bez orzekania o winie", note: "Sąd nie orzeka o winie tylko wtedy, gdy oboje małżonkowie zgodnie o to wnoszą." });
  if (a.fault === "fault") demands.push({ id: "d2", text: "Żądanie orzeczenia o winie (np. z wyłącznej winy pozwanego) wraz z dowodami", note: "Rozwód z winą zwykle oznacza dłuższe postępowanie dowodowe." });
  if (a.fault === "unsure" || !a.fault) demands.push({ id: "d2", text: "Stanowisko co do winy: zdecyduj przed złożeniem pozwu", note: "Pomoże narzędzie „Rozwód z orzekaniem o winie czy bez?”." });
  if (a.alimony === "request") demands.push({ id: "d3", text: "Ewentualne żądanie alimentów od małżonka", note: "Warunki zależą od winy i sytuacji materialnej. Do konsultacji." });
  if (a.alimony === "unsure") demands.push({ id: "d3", text: "Czy żądać alimentów od małżonka? Do konsultacji" });
  if (minor || a.alimony === "request") {
    const what = [minor && "alimenty na dzieci", minor && "kontakty z dziećmi", a.alimony === "request" && "alimenty dla Ciebie"].filter(Boolean).join(", ");
    demands.push({ id: "d4", text: `Ewentualny wniosek o zabezpieczenie na czas sprawy (${what})`, note: "Do konsultacji z prawnikiem." });
  }
  g.push({ id: "demands", title: "Żądania pozwu", items: demands });

  if (minor) {
    const kids: CheckItem[] = [
      { id: "k1", text: "Propozycja rozstrzygnięcia o władzy rodzicielskiej nad małoletnimi dziećmi" },
      { id: "k2", text: "Miejsce zamieszkania dzieci" },
      { id: "k3", text: "Sposób utrzymywania kontaktów z dziećmi" },
      { id: "k4", text: "Alimenty na dzieci: kwota, termin i sposób płatności", note: "Warto uzasadnić zestawieniem kosztów utrzymania dzieci." },
    ];
    if (a.agreement === "yes" || a.agreement === "maybe") kids.push({ id: "k5", text: a.agreement === "yes" ? "Porozumienie rodzicielskie jako załącznik" : "Porozumienie rodzicielskie jako załącznik, jeśli zdążycie je spisać", note: "Sąd uwzględnia je, jeśli jest zgodne z dobrem dziecka." });
    g.push({ id: "kids", title: "Wspólne małoletnie dzieci", items: kids });
  }
  if (a.children === "adult") g.push({ id: "kids", title: "Dzieci pełnoletnie", items: [{ id: "k6", text: "Wyrok rozwodowy rozstrzyga tylko o małoletnich dzieciach. Pełnoletnie dziecko, które potrzebuje alimentów, występuje o nie we własnym imieniu" }] });

  const prop: CheckItem[] = [];
  if (a.flat === "yes") prop.push({ id: "p1", text: "Ewentualny wniosek o ustalenie sposobu korzystania ze wspólnego mieszkania" });
  if (a.property === "together") prop.push({ id: "p2", text: "Wniosek o podział majątku wspólnego w wyroku rozwodowym", note: "Sąd dzieli majątek w wyroku, jeśli nie wydłuży to nadmiernie sprawy. W praktyce głównie przy zgodnym projekcie podziału." });
  if (a.property === "later") prop.push({ id: "p3", text: "Podział majątku osobno, po rozwodzie: umową (nieruchomość u notariusza) albo w sądzie", note: "Opłata od wniosku o podział: 1000 zł, przy zgodnym projekcie 300 zł." });
  if (a.property === "unsure") prop.push({ id: "p4", text: "Podział majątku w wyroku czy osobno? Do konsultacji" });
  if (prop.length) g.push({ id: "property", title: "Mieszkanie i majątek", items: prop });

  const just: CheckItem[] = [
    { id: "u1", text: anyKids ? "Data ślubu i informacja o wspólnych dzieciach" : "Data ślubu i informacja, że nie macie wspólnych dzieci" },
    { id: "u2", text: "Od kiedy i na czym polega rozkład pożycia (więź uczuciowa, fizyczna, gospodarcza). Rzeczowo, bez zbędnych szczegółów" },
    {
      id: "u3",
      text: med === "yes" ? "Informacja o próbie mediacji lub innego polubownego rozwiązania, ze wskazaniem dokumentów"
        : med === "refused" ? "Informacja o próbie mediacji i braku zgody drugiej strony, ze wskazaniem dokumentów (zaproszenie, odpowiedź lub potwierdzenie od mediatora)"
        : med === "unsafe" ? "Informacja, że nie było próby mediacji, z wyjaśnieniem przyczyn (np. bezpieczeństwo)"
        : "Informacja, czy była próba mediacji lub innego polubownego rozwiązania. Jeśli nie, wyjaśnij dlaczego",
      note: "Obowiązkowy element pozwu.",
    },
  ];
  if (a.fault === "fault") just.push({ id: "u4", text: "Okoliczności uzasadniające winę drugiej strony" });
  if (minor) just.push({ id: "u5", text: "Sytuacja i potrzeby dzieci, dotychczasowa opieka, koszty utrzymania" });
  just.push({ id: "u6", text: "Wnioski dowodowe: dokumenty, świadkowie (imię, nazwisko, adres), przesłuchanie stron" });
  g.push({ id: "just", title: "Uzasadnienie i dowody", items: just });

  const att: CheckItem[] = [
    { id: "a1", text: "Odpis aktu małżeństwa (sprawdź w sądzie, czy potrzebny jest odpis zupełny)", note: "Zamówisz go w USC lub przez gov.pl." },
  ];
  if (minor) att.push({ id: "a2", text: "Odpisy aktów urodzenia małoletnich dzieci" });
  if (attempted) att.push({ id: "a6", text: med === "refused" ? "Dowody próby mediacji: zaproszenie do mediacji, odpowiedź (albo jej brak), potwierdzenie od mediatora" : "Dokumenty z mediacji lub innej próby porozumienia: informacja od mediatora, ugoda lub porozumienie, jeśli są" });
  if (minor || a.alimony === "request") att.push({ id: "a3", text: "Dokumenty o dochodach (np. zaświadczenie o zarobkach) i kosztach utrzymania" });
  att.push({ id: "a4", text: "Dowód uiszczenia opłaty od pozwu: 600 zł" }, { id: "a5", text: "Jeśli działa pełnomocnik: pełnomocnictwo i dowód opłaty skarbowej 17 zł" });
  g.push({ id: "att", title: "Załączniki", items: att });

  g.push({
    id: "formal", title: "Formalności",
    items: [
      { id: "f1", text: "Własnoręczny podpis powoda (lub pełnomocnika)" },
      { id: "f2", text: "Odpis pozwu z załącznikami dla drugiej strony" },
      { id: "f3", text: "Złożenie w biurze podawczym właściwego sądu okręgowego albo listem poleconym", note: "Pozwu o rozwód nie składa się przez e-sąd." },
    ],
  });
  return g;
}

export function countItems(groups: CheckGroup[]) {
  return groups.reduce((n, g) => n + g.items.length, 0);
}
