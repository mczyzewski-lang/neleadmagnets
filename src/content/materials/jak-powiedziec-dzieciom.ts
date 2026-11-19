import type { Material } from "../types";

export const material: Material = {
  slug: "jak-powiedziec-dzieciom",
  format: "Przewodnik",
  coverTitle: "Jak powiedzieć dzieciom o rozstaniu",
  coverSubtitle: "Rozmowa dopasowana do wieku dziecka",
  coverTone: "cream",
  h1: "Jak powiedzieć dzieciom o rozstaniu: przewodnik dla rodziców",
  h2: "Przykładowe zdania dla dzieci w wieku 0–3, 4–6, 7–11 i 12–18 lat, czego unikać i kiedy poszukać wsparcia.",
  promise:
    "Konkretne słowa i wskazówki, jak spokojnie powiedzieć dziecku o rozstaniu, dopasowane do jego wieku.",
  forWho: [
    "Dla rodziców, którzy zastanawiają się, jak powiedzieć dzieciom o rozstaniu.",
    "Dla tych, którzy chcą przygotować wspólną rozmowę z drugim rodzicem.",
    "Dla rodziców, u których temat wraca po pierwszej rozmowie.",
    "Dla osób, które chcą chronić dziecko przed konfliktem dorosłych.",
  ],
  inside: [
    "Przygotowanie rozmowy: kiedy, gdzie, kto mówi",
    "Przykładowe zdania dla 4 grup wiekowych",
    "Odpowiedzi na trudne pytania dzieci",
    "Czego unikać",
    "Sygnały, przy których warto iść do psychologa",
    "Głos dziecka i porozumienie rodzicielskie",
    "Arkusz do wspólnego przygotowania rozmowy",
  ],
  time: "15 min",
  faq: [
    {
      q: "Czy powinniśmy rozmawiać z dzieckiem razem?",
      a: "Jeśli to możliwe i bezpieczne, tak. Wspólna rozmowa pokazuje, że nadal współpracujecie w sprawach dziecka. Jeśli groziłaby kłótnią, porozmawiajcie osobno, ale według tych samych zasad.",
    },
    {
      q: "Kiedy najlepiej powiedzieć dziecku o rozstaniu?",
      a: "Gdy decyzja jest podjęta i wiecie, co zmieni się w codzienności dziecka. Wybierzcie moment, po którym możecie z nim zostać, nie tuż przed szkołą.",
    },
    {
      q: "Czy z ustaleniami czekać do pozwu?",
      a: "Lepiej nie. Najpierw plan, potem ustalenia między rodzicami (rozmowy albo mediacja), na końcu pozew. Porozumienie rodzicielskie sąd uwzględnia, jeśli jest zgodne z dobrem dziecka. Mediacja nie jest wskazana przy przemocy, groźbach lub kontroli.",
    },
    {
      q: "Czy dziecko będzie musiało zeznawać w sądzie?",
      a: "Dziecko nie jest stroną sprawy. Sąd może je wysłuchać, jeśli pozwala na to jego dojrzałość. Robi się to w sposób dostosowany do wieku, zwykle poza salą rozpraw.",
    },
    {
      q: "Co zrobić, gdy dziecko pyta, czyja to wina?",
      a: "Powiedz, że to decyzja dorosłych i dziecko jej nie spowodowało. Nie mów o winie drugiego rodzica.",
    },
    {
      q: "Kiedy szukać pomocy psychologa?",
      a: "Gdy trudności utrzymują się, nasilają albo utrudniają dziecku codzienne życie. Konsultacja to wsparcie, a nie ocena.",
    },
  ],
  sources: [
    { label: "Kodeks rodzinny i opiekuńczy (art. 58, art. 95 § 4, art. 113)", url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19640090059", verified: "2026-11-10" },
    { label: "Kodeks rodzinny i opiekuńczy: art. 58 § 1a (porozumienie rodzicielskie)", url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19640090059", verified: "2026-11-16" },
    { label: "Kodeks postępowania cywilnego (wysłuchanie dziecka; art. 103, art. 187 § 1 pkt 3, próba mediacji)", url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19640430296", verified: "2026-11-10" },
  ],
  nextOffer: "mediacja",
  stage: 2,
  ctaLabel: "Ustalcie porozumienie rodzicielskie w mediacji",
  seo: {
    title: "Jak powiedzieć dzieciom o rozstaniu | Nowy Etap",
    description:
      "Jak powiedzieć dziecku o rozwodzie? Przykładowe zdania dla dzieci 0–18 lat, czego unikać i kiedy warto skonsultować się z psychologiem. Bezpłatnie, online.",
  },
  coverPrompt:
    "Photorealistic 3D render of a single standing softcover booklet at a slight angle on a warm off-white (#FCF9F8) background with a soft natural shadow. The cover is a light warm cream tone with a deep green (#295550) title, a dark green (#263D3A) spine and delicate gold (#C79B59) accents. Minimalist premium, gentle and calm typography. Render this exact text, spelled exactly, and keep all text minimal: small wordmark at the top \"NOWY ETAP · PORADNIA ROZWODOWA\"; main title \"Jak powiedzieć dzieciom o rozstaniu\"; subtitle \"Rozmowa dopasowana do wieku dziecka\". A subtle thin gold staircase line motif (a stylised ascending step line) at the bottom of the cover. No gavels, no paragraph symbols, no people, no children, no wedding rings, no other text. Square 1:1 composition, high detail, soft studio lighting.",
  sections: [
    {
      heading: "Zanim porozmawiasz",
      intro:
        "Dzieci pamiętają głównie atmosferę rozmowy: czy rodzice byli spokojni i czy usłyszały, że są kochane.",
      blocks: [
        {
          type: "path",
          current: 2,
          note: "Najlepiej rozmawiać, gdy macie choć wstępne ustalenia: gdzie dziecko będzie mieszkać i kiedy będzie z każdym z Was.",
        },
        {
          type: "checklist",
          items: [
            "Uzgodnijcie z drugim rodzicem wspólną, prostą wersję wyjaśnienia, bez szczegółów o winie.",
            "Ustalcie, co konkretnie zmieni się dla dziecka: gdzie będzie mieszkać, kiedy będzie z każdym z rodziców, co zostaje bez zmian (szkoła, przyjaciele, zajęcia).",
            "Wybierzcie spokojny moment, kiedy po rozmowie będziecie mogli być z dzieckiem.",
            "Przy kilkorgu dzieciach: wspólna rozmowa, potem krótkie rozmowy z każdym osobno.",
            "Przygotuj się na różne reakcje: płacz, złość, obojętność, pytania praktyczne. Każda jest w porządku.",
            "Jeśli emocje mogą Cię przerosnąć, porozmawiaj wcześniej z kimś zaufanym lub specjalistą.",
          ],
        },
        {
          type: "script",
          title: "Wspólne przesłanie dla każdego wieku",
          lines: [
            { label: "Decyzja dorosłych", text: "Mama i tata postanowili, że nie będą już razem mieszkać. To decyzja dorosłych." },
            { label: "To nie twoja wina", text: "Nic, co zrobiłeś albo powiedziałeś, tego nie spowodowało. I nic, co zrobisz, tego nie zmieni." },
            { label: "Miłość się nie zmienia", text: "Oboje bardzo cię kochamy i zawsze będziemy twoimi rodzicami." },
            { label: "Konkret", text: "Będziesz mieszkać … , a z … będziesz się widzieć … ." },
            { label: "Zaproszenie do pytań", text: "Możesz pytać o wszystko: dziś, jutro i za miesiąc." },
          ],
        },
      ],
    },
    {
      heading: "Dzieci w wieku 0–3 lata",
      intro:
        "Maluchy nie rozumieją rozstania, ale czują zmiany rytmu i emocje dorosłych. Potrzebują przewidywalności i bliskości.",
      blocks: [
        {
          type: "list",
          items: [
            "Trzymaj stałe pory snu, posiłków i rytuały.",
            "Mów krótko i spokojnie. Ton głosu niesie bezpieczeństwo.",
            "Przy zmianie domu zabieraj ulubione przedmioty dziecka.",
            "Częstsze, krótsze kontakty z drugim rodzicem bywają łatwiejsze niż rzadkie i długie.",
            "Przekazujcie sobie informacje o śnie, jedzeniu i samopoczuciu, np. we wspólnej notatce.",
          ],
        },
        {
          type: "script",
          title: "Przykładowe zdania",
          lines: [
            { label: "Przy przekazaniu", text: "Teraz jedziesz do taty. Tata cię przytuli, a jutro po śniadaniu znów będziesz u mamy." },
            { label: "Gdy dziecko płacze", text: "Wiem, że jest ci smutno. Jestem tutaj. Mama/tata też cię kocha." },
          ],
        },
      ],
    },
    {
      heading: "Dzieci w wieku 4–6 lat",
      intro:
        "Przedszkolaki mogą sądzić, że to one spowodowały rozstanie albo mogą je cofnąć. Potrzebują prostych słów i częstego zapewnienia, że to nie ich wina.",
      blocks: [
        {
          type: "list",
          items: [
            "Mów konkretnie: „U mamy będziesz w poniedziałek, wtorek i środę”. Pomaga kalendarz z obrazkami.",
            "Pytania będą wracać. Odpowiadaj cierpliwie, tak samo jak za pierwszym razem.",
            "Pozwól wyrażać emocje przez zabawę i rysunek.",
          ],
        },
        {
          type: "script",
          title: "Przykładowe zdania",
          lines: [
            { label: "Wyjaśnienie", text: "Mama i tata dużo się kłócili i postanowili mieszkać osobno. Teraz będziesz mieć dwa domy: u mamy i u taty." },
            { label: "Magiczne myślenie", text: "To nie przez to, że rozlałeś sok ani że byłeś niegrzeczny. Dorośli tak zdecydowali i to nie twoja wina." },
            { label: "Pytanie „czy wrócicie do siebie?”", text: "Rozumiem, że bardzo byś tego chciał. Nie będziemy już mieszkać razem, ale oboje zawsze będziemy z tobą." },
          ],
        },
      ],
    },
    {
      heading: "Dzieci w wieku 7–11 lat i nastolatki 12–18 lat",
      intro:
        "Starsze dzieci pytają praktycznie. Nastolatki potrzebują szczerości, szacunku i przestrzeni.",
      blocks: [
        {
          type: "table",
          head: ["", "7–11 lat", "12–18 lat"],
          rows: [
            ["Co może się pojawić", "Smutek, złość, rozdarcie między rodzicami, nadzieja na powrót", "Złość, wycofanie, krytyka rodziców"],
            ["Czego potrzebuje", "Konkretnego planu, stałości, zgody na emocje", "Szczerości bez szczegółów, wpływu na plan, prywatności"],
            ["Jak wspierać", "Wspólny kalendarz, stałe pory telefonów do drugiego rodzica", "Pytanie o zdanie, elastyczność wobec szkoły i przyjaciół"],
            ["Uważaj na", "Robienie z dziecka powiernika", "Szukanie w nastolatku sojusznika w konflikcie"],
          ],
          caption: "Starsze dzieci: porównanie",
        },
        {
          type: "script",
          title: "Przykładowe zdania: 7–11 lat",
          lines: [
            { label: "Wyjaśnienie", text: "Próbowaliśmy rozwiązać nasze problemy, ale nie udało się. Będziemy mieszkać osobno. To decyzja dorosłych i nie zmienia tego, jak bardzo cię kochamy." },
            { label: "Lojalność", text: "Możesz kochać nas oboje i dobrze czuć się w obu domach. Nie musisz wybierać." },
            { label: "Praktyka", text: "Zostajesz w tej samej szkole. Na treningi będzie cię woził tata we wtorki, a mama w czwartki." },
          ],
        },
        {
          type: "script",
          title: "Przykładowe zdania: 12–18 lat",
          lines: [
            { label: "Szczerość", text: "Rozstajemy się. Szczegóły zostaną między nami, ale na pytania o to, co zmieni się dla ciebie, odpowiemy." },
            { label: "Wpływ", text: "Chcemy usłyszeć, jak widzisz plan tygodnia. Decyzję podejmiemy my, ale weźmiemy pod uwagę twoje zdanie." },
            { label: "Złość", text: "Masz prawo być zły. Jestem tu, kiedy będziesz chciał porozmawiać." },
          ],
        },
      ],
    },
    {
      heading: "Czego unikać",
      intro: "Najbardziej obciąża dziecko konflikt, w który zostaje wciągnięte.",
      blocks: [
        {
          type: "table",
          head: ["Zamiast…", "Spróbuj…"],
          rows: [
            ["„Tata nas zostawił.”", "„Postanowiliśmy mieszkać osobno.”"],
            ["„Powiedz mamie, żeby oddała pieniądze.”", "Sprawy finansowe załatwiaj bezpośrednio z drugim rodzicem."],
            ["„Z kim chcesz mieszkać?” (jako decyzja dziecka)", "„Chcemy wiedzieć, co jest dla ciebie ważne. Decyzję podejmiemy my.”"],
            ["Wypytywanie o to, co działo się u drugiego rodzica", "„Jak ci minął weekend?” i akceptacja krótkiej odpowiedzi."],
            ["Krytyka drugiego rodzica przy dziecku", "Rozmowy o konflikcie tylko z dorosłymi."],
            ["„Nic się nie zmieni.”", "Prawda o tym, co się zmieni, a co zostaje."],
          ],
          caption: "Zamiast… spróbuj…",
        },
        {
          type: "callout",
          tone: "warning",
          title: "Dziecko nie jest posłańcem ani sędzią",
          text: "Nie przekazuj przez dziecko wiadomości, pieniędzy ani dokumentów. Nie każ mu wybierać. Gdy komunikacja jest trudna, pomogą pisemne ustalenia lub mediacja.",
        },
      ],
    },
    {
      heading: "Kiedy poszukać wsparcia specjalisty",
      intro:
        "Smutek, złość czy chwilowy regres są po takiej zmianie częste. Reaguj, gdy trudności się utrzymują.",
      blocks: [
        {
          type: "checklist",
          items: [
            "Kłopoty ze snem, jedzeniem lub bóle utrzymują się kilka tygodni.",
            "Dziecko wycofuje się z kontaktów z rówieśnikami i przestaje robić to, co lubiło.",
            "Pojawia się utrzymująca się agresja, wybuchy złości lub lęk przed rozstaniem z rodzicem.",
            "Wyraźny, długi spadek wyników w szkole lub odmowa chodzenia do szkoły.",
            "Dziecko mówi, że jest „wszystkiemu winne”, niepotrzebne, albo mówi o samookaleczaniu.",
            "Nastolatek sięga po alkohol lub inne substancje, ryzykownie się zachowuje.",
            "Ty sam/a czujesz, że nie dajesz rady i potrzebujesz wsparcia.",
          ],
        },
        {
          type: "p",
          text: "Wtedy porozmawiaj z psychologiem dziecięcym, pedagogiem szkolnym lub w poradni psychologiczno-pedagogicznej. Ten przewodnik nie zastępuje porady specjalisty.",
        },
        {
          type: "callout",
          tone: "safety",
          title: "Gdy chodzi o bezpieczeństwo",
          text: "Jeśli dziecko mówi o zrobieniu sobie krzywdy lub jest w zagrożeniu, dzwoń pod 112. Dzieci i nastolatki mogą bezpłatnie dzwonić pod 116 111 (Telefon Zaufania dla Dzieci i Młodzieży).",
        },
      ],
    },
    {
      heading: "Głos dziecka i porozumienie rodzicielskie",
      intro:
        "Zdanie dziecka się liczy, ale decyzje należą do dorosłych.",
      blocks: [
        {
          type: "list",
          items: [
            "Przed ważnymi decyzjami rodzice powinni wysłuchać dziecka, jeśli pozwala na to jego dojrzałość, i w miarę możności uwzględnić jego rozsądne życzenia.",
            "Sąd może wysłuchać dziecko w sposób dostosowany do wieku, zwykle poza salą rozpraw. Decyduje o tym w konkretnej sprawie.",
            "Kontakty z dzieckiem są prawem i obowiązkiem zarówno rodziców, jak i dziecka.",
            "Porozumienie rodzicielskie sąd uwzględnia, jeśli jest zgodne z dobrem dziecka. Plan uzgodniony wcześniej trzyma dziecko z dala od sporu.",
          ],
        },
        {
          type: "worksheet",
          title: "Przygotowanie rozmowy z drugim rodzicem",
          fields: [
            "Nasze wspólne zdanie wyjaśnienia (1–2 zdania):",
            "Co zmieni się dla dziecka (dom, grafik, szkoła):",
            "Co zostaje bez zmian:",
            "Kiedy i gdzie porozmawiamy:",
            "Kto zacznie rozmowę, kto odpowie na pytania praktyczne:",
            "Pytania, których się spodziewamy, i nasze odpowiedzi:",
            "Jak będziemy się informować o reakcjach dziecka w kolejnych tygodniach:",
          ],
        },
      ],
    },
    {
      heading: "Co dalej?",
      blocks: [
        {
          type: "p",
          text: "Dzieciom najłatwiej, gdy rodzice mają wspólny, jasny plan. W Nowym Etapie pomożemy Wam przygotować porozumienie rodzicielskie, w rozmowach lub w mediacji, zanim sprawa trafi do sądu. Jeśli rozmowy utknęły, mediacja bywa dobrym krokiem:",
        },
        { type: "mediationAttempt" },
        {
          type: "p",
          text: "Materiał ma charakter informacyjny i nie zastępuje porady prawnika ani psychologa.",
        },
      ],
    },
  ],
};
