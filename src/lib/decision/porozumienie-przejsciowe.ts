/**
 * Przed decyzją — Zasady na czas przejściowy.
 * Generuje PROPOZYCJĘ do rozmowy (nie umowę). Nie przesądza o podziale majątku ani rozstrzygnięciach sądu.
 */
export type Bill = { id: string; name: string; amount?: number };

export type InterimAnswers = {
  safety?: "no" | "yes" | "skip";
  together?: "yes" | "partly" | "no";
  children?: "yes" | "no";
  childDaily?: "both" | "me" | "partner" | "alt" | "tbd";
  childContact?: "flex" | "fixed" | "tbd";
  tellKids?: "together" | "done" | "later" | "tbd";
  housing?: "rooms" | "meMove" | "partnerMove" | "settled" | "tbd";
  split?: "half" | "proportional" | "me" | "partner" | "tbd";
  incomeMe?: number;
  incomePartner?: number;
  bills?: Bill[];
  account?: "keep" | "limits" | "close" | "none" | "tbd";
  car?: "none" | "me" | "partner" | "shared" | "tbd";
  pets?: "none" | "me" | "partner" | "shared" | "tbd";
  channel?: "msg" | "talk" | "tbd";
  guests?: "notice" | "noOvernight" | "free" | "tbd";
  reviewWeeks?: 2 | 4 | 8 | 12;
};

export const DEFAULT_BILLS: Bill[] = [
  { id: "b1", name: "Czynsz / rata kredytu" },
  { id: "b2", name: "Media (prąd, gaz, woda)" },
  { id: "b3", name: "Internet i telefon" },
  { id: "b4", name: "Zakupy spożywcze wspólne" },
];

export const isSafety = (a: InterimAnswers) => a.safety === "yes";

/** Udziały w kosztach [ja, druga osoba] w ułamkach; null = do ustalenia */
export function shares(a: InterimAnswers): { me: number; partner: number; note?: string } | null {
  switch (a.split) {
    case "half":
      return { me: 0.5, partner: 0.5 };
    case "me":
      return { me: 1, partner: 0 };
    case "partner":
      return { me: 0, partner: 1 };
    case "proportional": {
      const m = a.incomeMe ?? 0;
      const p = a.incomePartner ?? 0;
      if (m > 0 && p >= 0 && m + p > 0 && a.incomePartner !== undefined) return { me: m / (m + p), partner: p / (m + p) };
      return { me: 0.5, partner: 0.5, note: "Nie podano obu dochodów — tymczasowo przyjęto podział po połowie. Uzupełnij dochody, aby policzyć proporcję." };
    }
    default:
      return null;
  }
}

export type BillSplit = { rows: { name: string; amount: number; me: number; partner: number }[]; total: number; me: number; partner: number; pctMe: number; pctPartner: number; note?: string } | null;

export function splitBills(a: InterimAnswers): BillSplit {
  const s = shares(a);
  if (!s) return null;
  const rows = (a.bills || [])
    .filter((b) => (b.amount ?? 0) > 0)
    .map((b) => {
      const amount = b.amount as number;
      const me = Math.round(amount * s.me * 100) / 100;
      return { name: b.name || "Wydatek", amount, me, partner: Math.round((amount - me) * 100) / 100 };
    });
  const total = rows.reduce((x, r) => x + r.amount, 0);
  const me = rows.reduce((x, r) => x + r.me, 0);
  return { rows, total, me, partner: Math.round((total - me) * 100) / 100, pctMe: Math.round(s.me * 100), pctPartner: 100 - Math.round(s.me * 100), note: s.note };
}

export type DocSection = { heading: string; items: string[] };

const who = (v?: string) => (v === "me" ? "ja" : v === "partner" ? "druga osoba" : v === "shared" ? "wspólnie, według ustalonego grafiku" : "");

export function buildDocument(a: InterimAnswers): { sections: DocSection[]; open: string[] } {
  const sections: DocSection[] = [];
  const open: string[] = [];
  const tbd = (topic: string, hint: string) => open.push(`${topic}: ${hint}`);

  // Mieszkanie
  const home: string[] = [];
  if (a.housing === "rooms") home.push("Do czasu kolejnych decyzji mieszkamy razem, korzystając z osobnych pokoi. Ustalamy, z których części mieszkania korzystamy wspólnie (kuchnia, łazienka) i w jakich godzinach.");
  if (a.housing === "meMove") home.push("Wyprowadzam się tymczasowo. Ustalamy termin, zabranie rzeczy osobistych i to, że wyprowadzka nie przesądza o prawach do mieszkania.");
  if (a.housing === "partnerMove") home.push("Druga osoba wyprowadza się tymczasowo. Ustalamy termin, zabranie rzeczy osobistych i to, że wyprowadzka nie przesądza o prawach do mieszkania.");
  if (a.housing === "settled") home.push("Mieszkamy już osobno. Ustalamy, jak odbieramy korespondencję i rzeczy pozostawione w dawnym mieszkaniu.");
  if (a.housing === "tbd" || !a.housing) tbd("Mieszkanie", "kto gdzie mieszka w okresie przejściowym");
  home.push("Żadne z nas nie zmienia zamków ani nie ogranicza drugiej osobie dostępu do mieszkania bez wcześniejszego uzgodnienia (o ile oboje mamy do niego prawo).");
  sections.push({ heading: "Mieszkanie", items: home });

  // Dzieci
  if (a.children === "yes") {
    const k: string[] = [];
    const daily = { both: "Na co dzień oboje opiekujemy się dziećmi jak dotychczas, według wspólnego grafiku tygodnia.", me: "Na co dzień dzieci mieszkają ze mną.", partner: "Na co dzień dzieci mieszkają z drugim rodzicem.", alt: "Dzieci spędzają czas na zmianę u każdego z nas według ustalonego grafiku.", tbd: "" }[a.childDaily || "tbd"];
    if (daily) k.push(daily); else tbd("Dzieci", "z kim dzieci mieszkają na co dzień");
    if (a.childDaily === "me" || a.childDaily === "partner") {
      if (a.childContact === "flex") k.push("Kontakty z drugim rodzicem ustalamy elastycznie, z wyprzedzeniem co najmniej kilku dni.");
      else if (a.childContact === "fixed") k.push("Kontakty z drugim rodzicem odbywają się w stałe dni tygodnia i co drugi weekend (do doprecyzowania w grafiku).");
      else tbd("Kontakty", "jak często i kiedy dzieci spędzają czas z drugim rodzicem");
    }
    if (a.tellKids === "together") k.push("O zmianach rozmawiamy z dziećmi wspólnie, spokojnie i w sposób dostosowany do ich wieku. Nie obarczamy dzieci winą ani sprawami dorosłych.");
    if (a.tellKids === "done") k.push("Dzieci wiedzą o zmianach. Przekazujemy im spójne informacje i nie angażujemy ich w nasze rozmowy.");
    if (a.tellKids === "later") k.push("Rozmowę z dziećmi odkładamy do czasu, gdy będziemy znali podstawowe ustalenia — do tego czasu utrzymujemy ich codzienny rytm.");
    if (!a.tellKids || a.tellKids === "tbd") tbd("Dzieci", "kiedy i jak porozmawiamy z dziećmi");
    k.push("Nie przekazujemy wiadomości przez dzieci i nie rozmawiamy przy nich o sporach.");
    sections.push({ heading: "Dzieci", items: k });
  }

  // Finanse
  const f: string[] = [];
  const splitText = { half: "Wspólne rachunki dzielimy po połowie.", proportional: "Wspólne rachunki dzielimy proporcjonalnie do dochodów.", me: "Wspólne rachunki tymczasowo pokrywam ja.", partner: "Wspólne rachunki tymczasowo pokrywa druga osoba.", tbd: "" }[a.split || "tbd"];
  if (splitText) f.push(splitText); else tbd("Rachunki", "jak dzielimy wspólne koszty");
  f.push("Raty wspólnych zobowiązań płacimy terminowo — za kredyt odpowiadamy wobec banku oboje, niezależnie od naszych ustaleń.");
  const acc = { keep: "Wspólne konto zostaje na wspólne wydatki; większe wypłaty (np. powyżej ustalonej kwoty) uzgadniamy wcześniej.", limits: "Na wspólnym koncie ustalamy limity i zasady wypłat; każde z nas ma też własne konto na swoje dochody.", close: "Wspólne konto zamkniemy po rozliczeniu bieżących płatności — wspólnie i w uzgodnionym terminie.", none: "Nie mamy wspólnego konta.", tbd: "" }[a.account || "tbd"];
  if (acc) f.push(acc); else tbd("Wspólne konto", "zasady korzystania lub zamknięcia");
  if (a.account !== "none") f.push("Żadne z nas nie wypłaca jednostronnie środków ze wspólnych kont ani nie zaciąga nowych wspólnych zobowiązań bez zgody drugiej osoby.");
  sections.push({ heading: "Finanse i rachunki", items: f });

  // Rzeczy
  const r: string[] = [];
  if (a.car && a.car !== "none") {
    if (a.car === "tbd") tbd("Samochód", "kto korzysta i kto płaci za paliwo, ubezpieczenie, serwis");
    else r.push(`Z samochodu korzysta: ${who(a.car)}. Koszty bieżące ponosi osoba korzystająca, chyba że ustalimy inaczej.`);
  }
  if (a.pets && a.pets !== "none") {
    if (a.pets === "tbd") tbd("Zwierzęta", "kto się opiekuje i kto pokrywa koszty");
    else r.push(`Opiekę nad zwierzętami sprawuje: ${who(a.pets)}. Koszty weterynarza i karmy rozliczamy według ustaleń.`);
  }
  r.push("Ustalenia dotyczące rzeczy nie przesądzają o podziale majątku.");
  sections.push({ heading: "Samochód, zwierzęta i rzeczy", items: r });

  // Komunikacja
  const c: string[] = [];
  if (a.channel === "msg") c.push("Sprawy organizacyjne ustalamy na piśmie (wiadomości/e-mail), krótko i rzeczowo. Ważne ustalenia potwierdzamy wiadomością.");
  if (a.channel === "talk") c.push("Raz w tygodniu, w ustalonym terminie, rozmawiamy o sprawach organizacyjnych. Ustalenia zapisujemy.");
  if (!a.channel || a.channel === "tbd") tbd("Komunikacja", "kanał i częstotliwość rozmów o sprawach organizacyjnych");
  c.push("Jeśli rozmowa robi się trudna, robimy przerwę i wracamy do tematu później. Możemy skorzystać z pomocy mediatora.");
  if (a.guests === "notice") c.push("O wizytach gości w mieszkaniu uprzedzamy się wcześniej.");
  if (a.guests === "noOvernight") c.push("W okresie przejściowym nie zapraszamy gości na noc do wspólnego mieszkania.");
  if (a.guests === "free") c.push("Każde z nas swobodnie przyjmuje gości, z poszanowaniem wspólnej przestrzeni.");
  if (!a.guests || a.guests === "tbd") tbd("Goście i nowe relacje", "zasady w okresie przejściowym");
  sections.push({ heading: "Komunikacja i wspólna przestrzeń", items: c });

  // Przegląd
  const weeks = a.reviewWeeks ?? 4;
  sections.push({ heading: "Przegląd ustaleń", items: [`Wracamy do tych zasad za ${weeks} ${weeks < 5 ? "tygodnie" : "tygodni"}, aby sprawdzić, co działa, a co trzeba zmienić.`, "Każde z nas może wcześniej poprosić o rozmowę o zmianie zasad."] });

  return { sections, open };
}

export function reviewDate(weeks: number, from = new Date()): Date {
  const d = new Date(from);
  d.setDate(d.getDate() + weeks * 7);
  return d;
}
