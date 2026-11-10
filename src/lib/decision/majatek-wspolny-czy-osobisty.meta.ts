import type { ToolMeta } from "@/lib/tools";
import { SRC } from "@/lib/sources";

export const meta: ToolMeta = {
  slug: "majatek-wspolny-czy-osobisty",
  short: "Majątek wspólny czy osobisty?",
  icon: "scale",
  cardTitle: "Majątek wspólny czy osobisty? Sprawdź składniki",
  cardDesc: "Dodaj mieszkanie, samochód, oszczędności czy darowizny i sprawdź, które składniki mogą być wspólne, osobiste lub wymagać analizy.",
  outcome: "Tabela składników z prawdopodobnym statusem i podstawą prawną, wykres wartości, lista nakładów, dokumenty i pytania",
  time: "ok. 5 min",
  h1: "Majątek wspólny czy osobisty? Sprawdź, co do czego należy.",
  h2: "Dodaj składniki majątku i zobacz ich prawdopodobny status — z uzasadnieniem, dokumentami do zebrania i pytaniami do prawnika.",
  seo: {
    title: "Majątek wspólny czy osobisty? Sprawdź składniki",
    description: "Bezpłatne narzędzie: mieszkanie sprzed ślubu, darowizna, spadek, oszczędności — sprawdź prawdopodobny status składników i możliwe nakłady.",
  },
  ctaLabel: "Sprawdź, jakie kwestie majątkowe warto ustalić przed pozwem",
  primaryOffer: "plan-rozwodu",
  how: ["Wskaż ustrój majątkowy i dodaj składniki — bez nazw własnych", "Zobacz prawdopodobny status każdego składnika", "Pobierz tabelę, listę dokumentów i pytania"],
  faq: [
    { q: "Czy to przesądza, co jest moje?", a: "Nie. Narzędzie pokazuje prawdopodobny status na podstawie ogólnych reguł Kodeksu rodzinnego i opiekuńczego. Ostateczna ocena zależy od dokumentów i szczegółów, a w razie sporu — od sądu." },
    { q: "Mieszkanie jest zapisane tylko na mnie. Czy to mój majątek osobisty?", a: "Niekoniecznie. Jeśli zostało kupione w trakcie wspólności majątkowej ze wspólnych pieniędzy, co do zasady należy do majątku wspólnego — niezależnie od tego, kto jest wpisany w księdze wieczystej." },
    { q: "Co z darowizną od rodziców?", a: "Przedmioty otrzymane w darowiźnie należą co do zasady do majątku osobistego obdarowanego, chyba że darczyńca postanowił inaczej (np. darowizna dla obojga małżonków). Warto sprawdzić treść umowy lub tytuł przelewu." },
    { q: "Czym są nakłady?", a: "To np. spłata kredytu za mieszkanie sprzed ślubu ze wspólnych pieniędzy albo remont z oszczędności osobistych w mieszkaniu wspólnym. Przy podziale majątku można żądać ich rozliczenia (art. 45 KRO)." },
    { q: "Nie jesteśmy małżeństwem — czy narzędzie ma sens?", a: "Tak, ale działa inaczej: między partnerami nie ma wspólności majątkowej. Rzeczy kupione razem są zwykle współwłasnością według Kodeksu cywilnego." },
  ],
  sources: [
    { ...SRC.kro, label: "Kodeks rodzinny i opiekuńczy — art. 31, 33, 41, 43, 45, 51, 54" },
    { ...SRC.kc, label: "Kodeks cywilny — art. 195 i n. (współwłasność), art. 366" },
  ],
};
