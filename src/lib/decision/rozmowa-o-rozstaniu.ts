/**
 * Przed decyzją — Jak przygotować się do rozmowy o rozstaniu.
 * Deterministyczny plan rozmowy złożony z odpowiedzi. Przy sygnale zagrożenia
 * wynik zamienia się w plan bezpieczeństwa (bez skryptów do rozmowy w cztery oczy).
 */
export type TalkAnswers = {
  safety?: "no" | "worried" | "yes";
  expects?: "yes" | "maybe" | "no";
  stage?: "decided" | "crisis" | "unsure";
  children?: "none" | "small" | "school" | "teen";
  topics?: string[]; // children | housing | money | reasons | family | timing | none
  goal?: "inform" | "therapy" | "interim" | "future";
  place?: "home-alone" | "neutral" | "walk" | "third";
  emotions?: string[]; // fear | guilt | anger | sadness | relief | calm
};

export type ScriptLine = { label: string; text: string };

export type TalkPlan = {
  mode: "safety" | "talk";
  headline: string;
  prepare: string[];
  openings: ScriptLine[];
  avoid: string[];
  closing: string[];
  escalation: string[];
  after: string[];
  childrenPlan: string[];
  postponed: string[];
  selfCare: string[];
  safety: string[];
};

export const TOPIC_LABELS: Record<string, string> = {
  children: "Dzieci i opieka",
  housing: "Mieszkanie i kto się wyprowadza",
  money: "Pieniądze, konta i kredyt",
  reasons: "Powody i „kto zawinił”",
  family: "Reakcje rodziny i znajomych",
  timing: "Tempo i terminy",
};

export const isSafetyMode = (a: TalkAnswers) => a.safety === "yes" || a.safety === "worried";
const hasKids = (a: TalkAnswers) => !!a.children && a.children !== "none";

function openings(a: TalkAnswers): ScriptLine[] {
  const soft = a.expects === "no" ? "Wiem, że to może być dla Ciebie zaskoczeniem. " : "";
  switch (a.goal) {
    case "therapy":
      return [
        { label: "Wariant 1 — wprost", text: `${soft}Chcę porozmawiać o nas. Od dłuższego czasu jest mi trudno i nie chcę udawać, że jest dobrze. Zanim podejmiemy jakąkolwiek decyzję, chciał(a)bym, żebyśmy spróbowali terapii par.` },
        { label: "Wariant 2 — od uczuć", text: "Czuję, że oddalamy się od siebie, i martwi mnie to. Nie chcę teraz szukać winnych. Czy byłbyś/byłabyś gotów/gotowa, żebyśmy razem porozmawiali z terapeutą?" },
        { label: "Wariant 3 — z propozycją kroku", text: "Mam propozycję: umówmy się na jedną konsultację u terapeuty par i po niej zdecydujmy, co dalej. Nie musimy dziś niczego przesądzać." },
      ];
    case "interim":
      return [
        { label: "Wariant 1 — wprost", text: `${soft}Wiem, że oboje widzimy, jak jest między nami. Chciał(a)bym, żebyśmy ustalili kilka spraw na najbliższe tygodnie, żeby było spokojniej — zwłaszcza w codziennych sprawach.` },
        { label: "Wariant 2 — praktycznie", text: "Nie musimy dziś rozmawiać o wszystkim. Proponuję, żebyśmy ustalili trzy rzeczy: jak dzielimy rachunki, jak organizujemy tydzień i jak rozmawiamy przy dzieciach." },
        { label: "Wariant 3 — z ramą czasową", text: "Umówmy się na zasady na najbliższy miesiąc, a potem usiądźmy jeszcze raz i zobaczmy, co działa." },
      ];
    case "future":
      return [
        { label: "Wariant 1 — otwarcie", text: `${soft}Chcę porozmawiać szczerze o tym, jak widzimy naszą przyszłość. Nie mam gotowych odpowiedzi, ale czuję, że musimy o tym porozmawiać.` },
        { label: "Wariant 2 — od pytania", text: "Jak Ty się czujesz w naszym związku w ostatnich miesiącach? Chciał(a)bym usłyszeć Twoją perspektywę, a potem powiedzieć, co czuję ja." },
        { label: "Wariant 3 — bez presji", text: "Nie chcę dziś niczego rozstrzygać. Chcę tylko, żebyśmy przestali omijać ten temat i zaczęli rozmawiać." },
      ];
    default:
      return [
        { label: "Wariant 1 — jasno i spokojnie", text: `${soft}Muszę Ci powiedzieć coś ważnego i trudnego. Długo o tym myślałem/myślałam. Zdecydowałem/zdecydowałam, że chcę się rozstać.` },
        { label: "Wariant 2 — z szacunkiem", text: "To nie jest decyzja podjęta pod wpływem chwili. Wiem, że to boli, i nie chcę Cię ranić. Chcę, żebyśmy przeszli przez to możliwie spokojnie i z szacunkiem — także ze względu na nas oboje." },
        { label: "Wariant 3 — z zaproszeniem do dalszych rozmów", text: "Nie musimy dziś ustalać szczegółów. Chciał(a)bym, żebyśmy za kilka dni usiedli i porozmawiali o tym, jak dalej zorganizować codzienność." },
      ];
  }
}

export function buildTalkPlan(a: TalkAnswers): TalkPlan {
  const topics = (a.topics || []).filter((t) => t !== "none");
  const safety = [
    "W sytuacji zagrożenia dzwoń pod 112.",
    "Niebieska Linia (pomoc dla osób doznających przemocy domowej): 800 120 002.",
    "Kryzysowy telefon zaufania dla dorosłych: 116 123.",
    "Więcej numerów i informacji: strona /pomoc.",
  ];

  if (isSafetyMode(a)) {
    return {
      mode: "safety",
      headline: "Twój plan: najpierw bezpieczeństwo",
      prepare: [
        "Nie prowadź tej rozmowy sam(a) w cztery oczy ani w miejscu, z którego trudno wyjść.",
        "Zastanów się, czy informację o decyzji może przekazać pełnomocnik (adwokat lub radca prawny) albo czy rozmowa może odbyć się w obecności zaufanej osoby trzeciej.",
        "Przygotuj w bezpiecznym miejscu najważniejsze dokumenty, leki, klucze, ładowarkę i listę numerów.",
        "Ustal z zaufaną osobą hasło lub sygnał, po którym zadzwoni po pomoc.",
        "Jeśli masz dzieci — zaplanuj, gdzie będą bezpieczne.",
        "Skonsultuj swoją sytuację indywidualnie (np. z prawnikiem, ośrodkiem interwencji kryzysowej lub Niebieską Linią) przed jakimkolwiek kontaktem.",
      ],
      openings: [],
      avoid: [
        "Wspólnych negocjacji i mediacji bez konsultacji ze specjalistą.",
        "Ogłaszania decyzji w chwili, gdy druga osoba jest pod wpływem alkoholu lub silnych emocji.",
        "Informowania o planach wyprowadzki z wyprzedzeniem, jeśli może to zwiększyć zagrożenie.",
      ],
      closing: [],
      escalation: ["Jeśli czujesz zagrożenie — przerwij kontakt, wyjdź w bezpieczne miejsce i dzwoń pod 112."],
      after: [
        "Zadbaj o miejsce, w którym możesz bezpiecznie zostać przez najbliższe dni.",
        "Zapisuj daty i opisy niepokojących zdarzeń oraz zachowuj wiadomości — mogą być ważne później.",
        "Porozmawiaj z prawnikiem o możliwych środkach ochrony.",
      ],
      childrenPlan: hasKids(a) ? ["Zadbaj w pierwszej kolejności o bezpieczeństwo dzieci.", "Dla dzieci i młodzieży: telefon zaufania 116 111."] : [],
      postponed: topics.map((t) => TOPIC_LABELS[t]).filter(Boolean),
      selfCare: ["Nie musisz przechodzić przez to sam(a). Wsparcie jest dostępne bezpłatnie."],
      safety,
    };
  }

  const prepare = [
    "Zapisz w 2–3 zdaniach, co chcesz przekazać. To pomaga nie zgubić się w emocjach.",
    "Wybierz moment, w którym żadne z Was nie jest zmęczone, w pośpiechu ani pod wpływem alkoholu.",
    "Zaplanuj rozmowę tak, by mieć po niej czas dla siebie (bez spotkań, pracy, odbierania dzieci).",
  ];
  if (hasKids(a)) prepare.push("Zorganizuj opiekę nad dziećmi na czas rozmowy — dzieci nie powinny jej słyszeć.");
  if (a.place === "home-alone") prepare.push("Jeśli rozmawiacie w domu, wybierz porę, gdy nikt nie będzie przerywał, i wyłączcie telefony.");
  if (a.place === "neutral") prepare.push("Neutralne miejsce (np. spokojna kawiarnia) pomaga zachować spokój, ale wybierz takie, gdzie nikt Was nie usłyszy.");
  if (a.place === "walk") prepare.push("Spacer zmniejsza napięcie — idąc obok siebie łatwiej mówić o trudnych sprawach.");
  if (a.place === "third") prepare.push("Rozmowa z udziałem terapeuty lub mediatora daje bezpieczną strukturę — umów termin z wyprzedzeniem.");
  if (a.expects === "no") prepare.push("Druga osoba może się nie spodziewać tej rozmowy — przygotuj się na szok, zaprzeczenie lub złość i daj jej czas.");
  if (a.stage === "unsure") prepare.push("Jeśli nie masz jeszcze pewności, powiedz o tym wprost — to rozmowa o kryzysie, a nie ogłoszenie decyzji.");
  if (a.emotions?.includes("guilt")) prepare.push("Poczucie winy jest naturalne, ale nie musisz składać obietnic ani deklaracji w sprawach finansowych czy opieki podczas pierwszej rozmowy.");
  if (a.emotions?.includes("anger")) prepare.push("Jeśli czujesz złość, wypisz wcześniej to, co chcesz powiedzieć, i to, czego nie chcesz mówić.");

  const avoid = [
    "Rozliczania przeszłości i szukania winnych w pierwszej rozmowie.",
    "Uogólnień typu „zawsze” i „nigdy”.",
    "Ustalania na szybko spraw majątkowych, kredytu czy opieki nad dziećmi pod wpływem emocji.",
    "Rozmowy przez komunikator lub SMS, jeśli możecie porozmawiać na spokojnie osobiście.",
  ];
  if (topics.includes("reasons")) avoid.push("Wchodzenia w szczegóły powodów, jeśli prowadzi to do kłótni — możesz powiedzieć: „Rozumiem, że chcesz wiedzieć dlaczego. Porozmawiajmy o tym, kiedy oboje będziemy spokojniejsi”.");
  if (topics.includes("family")) avoid.push("Informowania rodziny i znajomych, zanim porozmawiacie we dwoje.");

  const closing = [
    "Podsumuj krótko, co zostało powiedziane, bez oceniania.",
    "Zaproponuj termin kolejnej rozmowy (np. za kilka dni).",
    a.goal === "therapy" ? "Ustalcie, kto sprawdzi dostępne terminy u terapeuty par." : "Ustalcie, jak wygląda najbliższa doba: kto gdzie śpi, kto odbiera dzieci, jak się komunikujecie.",
    "Podziękuj za rozmowę — nawet jeśli była bardzo trudna.",
  ];

  const escalation = [
    "Zaproponuj przerwę: „Widzę, że to dla nas obojga za dużo. Wróćmy do tego jutro o …”.",
    "Mów o sobie („czuję”, „potrzebuję”), zamiast oceniać drugą osobę.",
    "Nie zatrzymuj drugiej osoby siłą i nie blokuj wyjścia — daj przestrzeń.",
    "Jeśli rozmowa staje się agresywna lub czujesz zagrożenie — przerwij ją i zadbaj o bezpieczeństwo (112).",
  ];

  const after = [
    "Pierwsze 24 godziny: daj sobie i drugiej osobie czas. Nie podejmuj ważnych decyzji.",
    "Do 48 godzin: zapisz, co zostało ustalone, a co zostało otwarte.",
    "Do 72 godzin: umów spokojną rozmowę o organizacji codzienności lub o kolejnym kroku (terapia, konsultacja).",
    "Porozmawiaj z zaufaną osobą o tym, jak się czujesz.",
  ];
  if (a.stage === "decided") after.push("Zbierz podstawowe informacje o mieszkaniu, finansach i — jeśli dotyczy — dzieciach, zanim zaczniecie ustalenia.");

  const childrenPlan: string[] = [];
  if (hasKids(a)) {
    childrenPlan.push("Nie rozmawiajcie o rozstaniu przy dzieciach ani w ich obecności — także „szeptem” czy za drzwiami.");
    childrenPlan.push("O tym, jak i kiedy powiedzieć dzieciom, zdecydujcie w osobnej rozmowie — najlepiej wspólnie.");
    if (a.children === "small") childrenPlan.push("Małe dzieci potrzebują przede wszystkim przewidywalności: zachowajcie zwykłe pory posiłków, snu i rytuały.");
    if (a.children === "school") childrenPlan.push("Dzieci w wieku szkolnym potrzebują prostego wyjaśnienia i zapewnienia, że to nie ich wina oraz że oboje rodzice nadal są przy nich.");
    if (a.children === "teen") childrenPlan.push("Nastolatki często chcą więcej informacji — mówcie prawdę adekwatnie do wieku, bez obciążania ich sprawami dorosłych.");
    childrenPlan.push("Pomocny może być przewodnik „Jak powiedzieć dzieciom o rozstaniu” (bezpłatny materiał).");
  }

  const postponed = topics.map((t) => TOPIC_LABELS[t]).filter(Boolean);

  const selfCare = ["Zaplanuj coś stabilizującego po rozmowie: spacer, rozmowę z przyjacielem, sen."];
  if (a.emotions?.includes("fear")) selfCare.push("Lęk przed rozmową jest naturalny — przećwicz pierwsze zdanie na głos.");
  if (a.emotions?.includes("sadness")) selfCare.push("Daj sobie prawo do smutku. Nie musisz „trzymać się” przez cały czas.");
  if (a.emotions?.includes("relief")) selfCare.push("Ulga też jest w porządku — ale pamiętaj, że druga osoba może przeżywać to zupełnie inaczej.");

  const headline =
    a.goal === "therapy" ? "Twój plan rozmowy o kryzysie i propozycji terapii"
    : a.goal === "interim" ? "Twój plan rozmowy o zasadach na najbliższy czas"
    : a.goal === "future" ? "Twój plan rozmowy o przyszłości związku"
    : "Twój plan rozmowy o decyzji o rozstaniu";

  return { mode: "talk", headline, prepare, openings: openings(a), avoid, closing, escalation, after, childrenPlan, postponed, selfCare, safety };
}
