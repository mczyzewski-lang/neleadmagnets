import type { ToolMeta } from "@/lib/tools";
import { SRC } from "@/lib/sources";

export const meta: ToolMeta = {
  slug: "mity-o-rozwodzie",
  short: "Mity i fakty o rozwodzie",
  icon: "sparkle",
  cardTitle: "Mity i fakty o rozwodzie",
  cardDesc: "12 popularnych przekonań o rozwodzie, kredycie, dzieciach i majątku. Sprawdź, które są prawdą. Z wyjaśnieniem i źródłem.",
  outcome: "Wynik X/12, wyjaśnienia ze źródłem, lista tematów do doczytania",
  time: "ok. 3 min",
  h1: "Mity i fakty o rozwodzie: sprawdź, co jest prawdą",
  h2: "12 popularnych przekonań o rozwodzie, kredycie, dzieciach i majątku. Przy każdym krótkie wyjaśnienie i źródło w polskich przepisach.",
  seo: {
    title: "Mity i fakty o rozwodzie: quiz z wyjaśnieniami",
    description: "Czy rozwód zwalnia z kredytu? Czy mediacja jest obowiązkowa? Sprawdź 12 popularnych mitów o rozwodzie, z wyjaśnieniem i źródłem.",
  },
  ctaLabel: "Pobierz przewodnik: rozwód krok po kroku",
  primaryOffer: "materialy",
  how: ["Oceń 12 twierdzeń: mit, fakt czy „nie wiem”", "Po każdej odpowiedzi zobacz wyjaśnienie i źródło", "Pobierz podsumowanie i tematy do doczytania"],
  faq: [
    { q: "Czy to test, który mnie ocenia?", a: "Nie. To przegląd popularnych przekonań. Wynik pokazuje tylko, które tematy warto doczytać. Nie mówi nic o Twojej sytuacji." },
    { q: "Skąd pochodzą odpowiedzi?", a: "Z polskich przepisów obowiązujących 10.11.2026: Kodeksu rodzinnego i opiekuńczego, Kodeksu cywilnego, Kodeksu postępowania cywilnego i ustawy o kosztach sądowych. Przy każdym twierdzeniu podajemy źródło, a szczegóły w sekcji „Podstawy prawne i źródła”." },
    { q: "Czy rozwód w urzędzie stanu cywilnego jest już możliwy?", a: "Nie. Ustawa, która miała to umożliwić, została zawetowana 30.04.2026 r. Rozwód orzeka wyłącznie sąd okręgowy." },
    { q: "Czy zapisujecie moje odpowiedzi?", a: "Nie. Quiz działa w Twojej przeglądarce. Odpowiedzi nie trafiają do nas ani do narzędzi analitycznych." },
  ],
  sources: [
    { ...SRC.kro, label: "Kodeks rodzinny i opiekuńczy — art. 56–61⁴, 95" },
    { ...SRC.kc, label: "Kodeks cywilny — art. 195, 366, 519" },
    { ...SRC.kpc, label: "Kodeks postępowania cywilnego — art. 17, 103, 183¹, 183⁸, 187 § 1 pkt 3" },
    { ...SRC.uksc, label: "Ustawa o kosztach sądowych w sprawach cywilnych — art. 26" },
  ],
};
