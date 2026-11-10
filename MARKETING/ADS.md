# Nowy Etap — poradnia rozwodowa · Materiały reklamowe

> **Najpierw plan i ustalenia. Dopiero potem pozew.**
>
> Dokument roboczy dla kampanii Google Ads (Demand Gen, Search, YouTube) i Meta (Facebook/Instagram) promujących bezpłatne narzędzia i poradniki. Stan na: listopad 2026.

---

## 0. Zasady kampanii

### 0.1. Ton i obietnice

- Spokojnie, rzeczowo, z szacunkiem. Premium, ale bez dystansu. Bez oceniania kogokolwiek („winny”, „toksyczny”, „walka”).
- **Bez straszenia**: nie piszemy „stracisz mieszkanie”, „nie daj się oszukać”, „zanim będzie za późno”.
- **Bez wymyślonych liczb i opinii**: żadnych „93% par…”, „tysiące zadowolonych klientów”, gwiazdek, cytatów klientów, których nie mamy udokumentowanych.
- **Bez obietnic wyniku w sądzie**: nie piszemy „wygraj”, „gwarantujemy”, „szybki rozwód w 1 rozprawę”, „najwyższe alimenty”.
- **Bez deklaracji porady prawnej w narzędziach**: narzędzia porządkują informacje i przygotowują do rozmowy. Na każdym landingu i w wyniku: *„Narzędzie ma charakter informacyjny i edukacyjny. Nie stanowi porady prawnej ani finansowej.”*
- Słowa, których używamy: *plan, ustalenia, scenariusze, porządek, przygotowanie, rozmowa, spokojnie, krok po kroku, do omówienia*.
- Słowa, których unikamy: *walka, wojna, wygrana, przegrana, pułapka, błąd, który kosztuje, szok, tylko dziś, ostatnia szansa*.
- Jeśli w zespole pracują adwokaci lub radcy prawni, przed startem warto potwierdzić, że kreacje są zgodne z zasadami etyki zawodowej dotyczącymi informowania o działalności (komunikujemy markę poradni i bezpłatne materiały, nie „pozyskiwanie klientów” przez prawnika).

### 0.2. Zgodność z zasadami Meta (personal attributes)

Zasady reklamowe Meta (*Privacy Violations and Personal Attributes*) zabraniają reklam, które **twierdzą lub sugerują, że reklamodawca zna cechy osobiste odbiorcy**, oraz reklam, które o takie cechy **pytają** wprost. Meta uzasadnia to tym, że takie założenia mogą być odbierane jako natrętne, niepokojące lub nietrafione. Dozwolone są ogólne odniesienia i treści informacyjne, które nie przypisują odbiorcy danej sytuacji.

Stan cywilny i sytuacja w związku nie zawsze są wymienione na liście wprost, ale rozstanie łączy się z sytuacją rodzinną, finansową (lista Meta obejmuje m.in. trudną sytuację finansową) i psychiczną. Dlatego przyjmujemy **zasadę ostrożną dla obu platform**: żadna reklama nie przypisuje odbiorcy rozstania, rozwodu, problemów w związku, długów ani trudnej sytuacji dziecka.

| Nie używamy | Używamy zamiast tego | Dlaczego |
|---|---|---|
| „Rozwodzisz się?” | „Rozwód krok po kroku: co po kolei warto ustalić” | Pytanie zakłada sytuację odbiorcy |
| „Rozważasz rozstanie?” | „Rozstanie to wiele decyzji naraz. Zacznij od planu.” | Pytanie o sytuację w związku to też przypisanie cechy, nawet jeśli brzmi łagodniej |
| „Twój mąż / Twoja żona…” | „drugi rodzic”, „druga strona”, „oboje” | Sugeruje wiedzę o relacji odbiorcy |
| „Twój kredyt po rozwodzie” | „Wspólny kredyt po rozstaniu: 3 scenariusze” | Przypisuje kredyt i rozwód |
| „Nie stać Cię na życie po rozstaniu?” | „Budżet po rozstaniu: sprawdź 3 warianty” | Sugeruje trudną sytuację finansową |
| „Twoje dziecko przeżywa rozwód rodziców” | „Jak rozmawiać z dziećmi o rozstaniu” | Przypisuje sytuację rodzinną |

Zasady praktyczne:

- Formy w 2. osobie są w porządku, gdy dotyczą **działania** („Sprawdź”, „Zaplanuj”, „Pobierz”), a nie **cechy** („jesteś po rozwodzie”, „masz problem z…”).
- Tytuły narzędzi i poradników w trzeciej osobie lub bezosobowo („Rozwód w Polsce krok po kroku”) są bezpieczne.
- H1 landing page’y mogą być bardziej bezpośrednie (np. „Czy finansowo poradzisz sobie po rozstaniu?”), bo użytkownik sam wszedł na stronę. Na Meta nie przenosimy ich jednak 1:1 do tekstu reklamy, bo **to tekst reklamy podlega tej zasadzie**. W tabelach poniżej hooki są napisane tak, żeby nadawały się na obie platformy. Tam, gdzie wariant jest tylko dla Google, oznaczamy go **[tylko Google]**.

### 0.3. Zgodność z zasadami Google (reklamy spersonalizowane)

Zasady Google dotyczące reklam spersonalizowanych zaliczają **trudności osobiste, w tym trudności w związku i rodzinie (np. rozwód)** do kategorii wrażliwych. W tej kategorii nie wolno targetować reklam na podstawie danych o użytkownikach. W praktyce:

- **Bez list remarketingowych** z odwiedzających narzędzia i poradniki. To samo dotyczy list z osób, które zaczęły lub ukończyły narzędzie.
- **Bez Customer Match** (list e-mail/telefonów) do targetowania i bez odbiorców podobnych utworzonych na ich podstawie.
- **Bez segmentów niestandardowych** budowanych z fraz typu „rozwód”, „alimenty”, „podział majątku” w Demand Gen/YouTube. Takie segmenty działają jak targetowanie po zainteresowaniu wrażliwą sytuacją. Jeśli konto zostanie do nich dopuszczone, decyzję podejmujemy dopiero po weryfikacji z opiekunem Google.
- Kierowanie **kontekstowe** jest w porządku: słowa kluczowe w kampaniach w sieci wyszukiwania, tematy i miejsca docelowe (treści o prawie rodzinnym, finansach osobistych, rodzicielstwie).

### 0.4. Dane, piksele, zgody

- **Odpowiedzi z narzędzi nie trafiają do żadnego piksela, tagu ani narzędzia analitycznego.** Nie przekazujemy kwot, liczby dzieci, wieku dzieci, statusu mieszkania, wybranych scenariuszy ani treści pól tekstowych.
- **Odpowiedzi nie mogą trafiać do adresu URL** (query string, hash). Piksele Meta i tagi Google automatycznie zbierają adres strony. Stan narzędzia trzymamy w pamięci przeglądarki lub w body żądań, nigdy w URL.
- Wyłączamy w Meta automatyczne dopasowanie zaawansowane (*automatic advanced matching*) i automatyczne zbieranie zdarzeń z formularzy na stronach narzędzi. Warunki Meta Business Tools zabraniają przesyłania informacji wrażliwych.
- Google: **Consent Mode v2** (wymagany w EOG), tagi uruchamiane dopiero po zgodzie marketingowej. Enhanced conversions wyłącznie dla `lead_submit`, wyłącznie po zgodzie i wyłącznie dla adresu e-mail podanego w formularzu kontaktowym (nigdy dla danych z narzędzia).
- **Nie budujemy odbiorców remarketingowych ani lookalike z odpowiedzi, wyników ani zdarzeń narzędzi**, ani w Google, ani w Meta (także *Custom Audiences* z odwiedzających URL `/narzedzia/*` i `/poradniki/*`).

### 0.5. Dozwolone zdarzenia pomiarowe

Tylko poniższe zdarzenia, tylko z poniższymi parametrami. **Żadnej treści odpowiedzi.**

| Zdarzenie | Kiedy | Dozwolone parametry |
|---|---|---|
| `tool_start` | Pierwsza interakcja z narzędziem | `tool_slug` (np. `mieszkanie-i-kredyt`) |
| `tool_complete` | Wyświetlenie wyniku | `tool_slug` |
| `result_download` | Pobranie PDF / druk / pobranie poradnika | `tool_slug` lub `guide_slug`, `format` (`pdf`, `print`) |
| `lead_submit` | Wysłanie formularza (Plan Rozwodu, konsultacja) | `source_slug` (narzędzie/poradnik, z którego przyszedł), `lead_type` (`plan_rozwodu`, `konsultacja`) |

Niedozwolone parametry to m.in. kwoty, scenariusze, liczba i wiek dzieci, odpowiedzi tak/nie, pola tekstowe, „wynik ryzyka” i jakiekolwiek oceny sytuacji.

### 0.6. Konwersje

- **Konwersja główna (do optymalizacji stawek):** `lead_submit` z `lead_type = plan_rozwodu` (prośba o bezpłatny Plan Rozwodu / wycenę) oraz `konsultacja`. Docelowo **lead zakwalifikowany**: import offline statusu „zakwalifikowany” po GCLID/FBCLID, wyłącznie z flagą zgody i bez żadnych szczegółów sprawy.
- **Konwersje dodatkowe (tylko obserwacja):** `tool_complete`, `result_download`.
- Wyjątek na start: jeśli leadów jest za mało, żeby algorytm się uczył (poniżej kilkudziesięciu miesięcznie na kampanię), można przez 3–4 tygodnie optymalizować Demand Gen na `tool_complete`, a potem przejść na lead. Decyzję zapisujemy w dzienniku zmian kampanii.
- Wartości konwersji: stałe, umowne (np. lead = 1, `tool_complete` = 0). Nie różnicujemy wartości według odpowiedzi w narzędziu.

### 0.7. Konwencja UTM

Wszystko małymi literami, segmenty rozdzielone `_`, słowa w slugu łączone `-`. W UTM-ach nie umieszczamy żadnych danych o użytkowniku.

| Parametr | Format | Przykłady |
|---|---|---|
| `utm_source` | platforma | `google`, `meta`, `youtube` |
| `utm_medium` | typ ruchu | `paid_demandgen`, `paid_search`, `paid_social`, `paid_video` |
| `utm_campaign` | `ne_{typ}_{slug}_{rrrrmm}` | `ne_tool_mieszkanie-i-kredyt_202611`, `ne_guide_pierwsze-swieta-po-rozstaniu_202611` |
| `utm_content` | `{format}_{element}{nr}` | `sq_hook3`, `hz_hook1`, `vid20_v1`, `rsa_h1-2` |
| `utm_term` | tylko Search: słowo kluczowe (`{keyword}`) | `podzial-mieszkania-przy-rozwodzie` |

Formaty w `utm_content`: `sq` (1:1), `hz` (1.91:1), `vt` (4:5 lub 9:16), `vid15`/`vid20`/`vid30` (wideo), `rsa` (Search).

Przykład:
`/narzedzia/mieszkanie-i-kredyt?utm_source=meta&utm_medium=paid_social&utm_campaign=ne_tool_mieszkanie-i-kredyt_202611&utm_content=sq_hook2`

### 0.8. Targetowanie

- **Search (rdzeń intencji):** słowa kluczowe informacyjne i przygotowawcze, np. *podział mieszkania przy rozwodzie, kredyt po rozwodzie, plan opieki nad dzieckiem, mediacja przed rozwodem, separacja a rozwód różnice, koszty utrzymania dziecka*. Wykluczenia: *darmowy prawnik online, wzór pozwu za darmo, adwokat z urzędu, rozwód kościelny / unieważnienie* (jeśli to poza zakresem usług), *zdrada, detektyw*.
- **Demand Gen / YouTube:** szerokie dane demograficzne (Polska, język polski, wiek ok. 28–60, wszystkie płcie), kierowanie zoptymalizowane, tematy i miejsca docelowe kontekstowe (finanse osobiste, rodzicielstwo, nieruchomości, prawo). Grupę odbiorców wybiera kreacja, nie dane o kryzysie.
- **Meta:** Advantage+ audience lub szerokie kierowanie (lokalizacja, wiek, język). **Nie używamy** szczegółowego targetowania typu stan cywilny, „niedawno zmienił status związku”, zainteresowania rozwodem, terapią, poradnictwem kryzysowym ani lookalike z leadów.
- **Bez kierowania na „wywnioskowany kryzys”:** żadnych sygnałów typu zmiana adresu, wyszukiwanie mieszkań do wynajęcia dla jednej osoby, pora nocna, kategorie zdrowia psychicznego.
- **Częstotliwość:** limit ok. 2–3 wyświetleń na osobę tygodniowo (Meta) w kampaniach zasięgowych. Temat jest ciężki, więc nie chodzimy za ludźmi.

### 0.9. Wspólne zasady wizualne

- **Kolory:** głęboka zieleń `#295550` / `#355450` (tła, bloki), ciemna zieleń `#263D3A` (tekst, ciemne tła), złoto `#C79B59` (akcenty, CTA, cienkie linie, podkreślenia), złamana biel `#FCF9F8` (tła jasne, tekst na zieleni).
- **Typografia:** szeryfowy nagłówek (elegancki, spokojny) + bezszeryfowy krój do tekstu i UI. Dużo światła, maks. 2 poziomy hierarchii na grafice.
- **Hero visual:** prawdziwy zrzut ekranu wyniku narzędzia na telefonie (realny mockup, bez przerysowanych odbić). Wynik pokazujemy na **przykładowych, neutralnych danych** (oznaczenie „Przykładowe dane” drobnym drukiem przy liczbach).
- **Fotografia (jeśli w ogóle):** dokumentalna, naturalne światło, ziarno. Dłonie przy stole z notesem i kubkiem, kuchenny stół z segregatorem, okno, spacer z dzieckiem widzianym od tyłu, klucze na stole. Ludzie spokojni, zamyśleni, zajęci planowaniem.
- **Zakazane:** młotki sędziowskie, paragrafy, wagi, togi, regały z kodeksami, rozcięte obrączki i zdjęcia ślubne, płaczące osoby, kłócące się pary, płaczące dzieci, rozdzierane serca i domy. Także obrazy „wyglądające na AI”: plastikowa skóra, nienaturalne dłonie, przesadna symetria, neonowe gradienty, efekt „render 3D”.
- **Logo:** zawsze na end cardzie i w rogu grafik (mała wersja), z tagline „Najpierw plan i ustalenia. Dopiero potem pozew.” na end cardzie.

---

## 1. Mieszkanie i kredyt po rozstaniu

`/narzedzia/mieszkanie-i-kredyt` · slug: `mieszkanie-i-kredyt`
**Wynik:** 3 scenariusze (sprzedaż / jedna osoba zostaje i spłaca drugą / dalsza współwłasność), szacunek wkładu (wartość − saldo kredytu), ryzyka, checklista do banku.
**Kluczowa informacja:** rozwód nie zwalnia współkredytobiorcy z umowy z bankiem.

### 1.1. Hooki Demand Gen

| # | Hook (≤90 znaków) | Nagłówek (≤40 znaków) |
|---|---|---|
| 1 | Wspólne mieszkanie i kredyt po rozstaniu: zobacz 3 możliwe scenariusze w kilka minut. | Mieszkanie i kredyt: 3 scenariusze |
| 2 | Rozwód nie zwalnia współkredytobiorcy z umowy z bankiem. Sprawdź, co warto ustalić. | Rozwód nie kończy umowy z bankiem |
| 3 | Sprzedaż, spłata czy dalsza współwłasność? Porównaj opcje, zanim zapadną decyzje. | Sprzedaż, spłata czy współwłasność? |
| 4 | Wartość mieszkania minus saldo kredytu. Oszacuj spokojnie, co realnie jest do podziału. | Co jest do podziału? Oszacuj |
| 5 | Lista pytań i dokumentów do rozmowy z bankiem w jednym wyniku. Bezpłatnie, bez logowania. | Lista pytań do banku za darmo |

### 1.2. Nagłówki artykułów edukacyjnych

1. Kredyt hipoteczny po rozwodzie: czy można wyjść z kredytu i od czego zacząć
2. Podział mieszkania przy rozwodzie: sprzedaż, spłata czy współwłasność — porównanie
3. Jak obliczyć spłatę za mieszkanie z kredytem przy rozstaniu? Prosty przykład

### 1.3. Warianty H1 landing page

1. Co stanie się z Waszym mieszkaniem i kredytem, jeśli się rozstaniecie?
2. Mieszkanie i wspólny kredyt po rozstaniu: zobacz scenariusze, zanim zaczniecie rozmawiać
3. Najpierw liczby i scenariusze. Potem decyzje o mieszkaniu.

### 1.4. CTA

- **A:** Sprawdź scenariusze dla mieszkania
- **B:** Przygotuj rozmowę z bankiem

### 1.5. Scenariusz wideo (20 s, 9:16 i 1:1)

| Czas | Obraz | Napis ekranowy | VO |
|---|---|---|---|
| 0–3 s | Zbliżenie: klucze leżą na drewnianym stole obok wydruku harmonogramu spłat. Spokojne światło dzienne. | Mieszkanie. Kredyt. I co dalej? | „Wspólne mieszkanie i kredyt. Co dalej, jeśli drogi się rozchodzą?” |
| 3–8 s | Telefon w dłoni, ekran narzędzia: suwaki „wartość mieszkania” i „saldo kredytu”, licznik „Szacunkowy wkład do podziału” płynnie się aktualizuje. | Wartość − saldo kredytu = punkt wyjścia | „Wpisz wartość mieszkania i saldo kredytu. Zobaczysz punkt wyjścia do rozmowy.” |
| 8–13 s | Przewijanie wyniku: trzy karty scenariuszy obok siebie: „Sprzedaż”, „Jedna osoba zostaje i spłaca”, „Dalsza współwłasność”. Złota obwódka wędruje po kartach. | 3 scenariusze obok siebie | „Trzy scenariusze, z plusami i ryzykami każdego z nich.” |
| 13–17 s | Zbliżenie na kartę ryzyka (ikona informacji, nie ostrzeżenia): „Rozwód nie zwalnia współkredytobiorcy z umowy z bankiem.” Potem checklista z odhaczanymi pozycjami. | Rozwód ≠ wyjście z kredytu | „Ważne: rozwód nie zmienia umowy z bankiem. Dostaniesz listę pytań na tę rozmowę.” |
| 17–20 s | **End card:** tło `#263D3A`, logo, tagline, przycisk w złocie. | Sprawdź scenariusze dla mieszkania · Bezpłatnie · nowyetap.pl/narzedzia | „Nowy Etap. Najpierw plan i ustalenia.” |

Drobny napis w scenach z liczbami: „Przykładowe dane. Narzędzie informacyjne, nie porada prawna ani finansowa.”

### 1.6. Grafika 1:1

- **Układ:** lewa połowa: tło `#FCF9F8`, nagłówek i 2 linie tekstu. Prawa połowa: telefon lekko pochylony, na ekranie trzy karty scenariuszy. Wyróżniona karta „Jedna osoba zostaje i spłaca” z kwotą przykładowego wkładu.
- **Tekst na grafice:** „Mieszkanie i kredyt po rozstaniu” (nagłówek, `#263D3A`) · „3 scenariusze. Szacunek wkładu. Lista pytań do banku.” · przycisk „Sprawdź bezpłatnie” (złoty `#C79B59`, tekst `#263D3A`).
- **Wizualnie:** cienka złota linia oddzielająca tekst od telefonu. W tle bardzo delikatny, nieostry kadr kuchni.
- **Element UI wyniku:** karty scenariuszy z mini-paskami „plusy / ryzyka” oraz licznik „Wartość − saldo = wkład”.

### 1.7. Grafika 1.91:1

- **Układ:** tło `#295550`. Po lewej telefon z rozwiniętą checklistą „Do rozmowy z bankiem” (3 pozycje odhaczone). Po prawej tekst w `#FCF9F8`.
- **Tekst:** „Rozwód nie zwalnia współkredytobiorcy z umowy z bankiem.” · niżej mniejszym: „Zobacz 3 scenariusze dla mieszkania i przygotuj rozmowę z bankiem.” · CTA „Sprawdź scenariusze” (złoty obrys).
- **Element UI:** checklista bankowa + fragment karty „Ryzyka” z ikoną „i”.

---

## 2. Budżet po rozstaniu

`/narzedzia/budzet-po-rozstaniu` · slug: `budzet-po-rozstaniu`
**Wynik:** obecny budżet vs 3 warianty (ostrożny / bazowy / optymistyczny), wykres, saldo miesięczne, koszty jednorazowe, poduszka finansowa w miesiącach.

### 2.1. Hooki Demand Gen

| # | Hook (≤90 znaków) | Nagłówek (≤40 znaków) |
|---|---|---|
| 1 | Budżet po rozstaniu w 3 wariantach: ostrożnym, bazowym i optymistycznym. Sprawdź liczby. | Budżet po rozstaniu: 3 warianty |
| 2 | Jeden dom, dwa gospodarstwa. Zobacz miesięczne saldo i koszty jednorazowe przed decyzją. | Jeden dom, dwa budżety |
| 3 | Na ile miesięcy wystarczy poduszka finansowa? Policz to spokojnie, w kilka minut. | Na ile wystarczy poduszka? |
| 4 | Kaucja, przeprowadzka, nowe sprzęty. Koszty jednorazowe też warto mieć na liście. | Koszty, o których łatwo zapomnieć |
| 5 | Plan finansowy przed rozmową o rozstaniu. Wykres, saldo i warianty — bezpłatnie. | Najpierw plan finansowy |

### 2.2. Nagłówki artykułów edukacyjnych

1. Budżet po rozwodzie: jak policzyć koszty życia w dwóch gospodarstwach domowych
2. Ile pieniędzy odłożyć przed wyprowadzką? Koszty jednorazowe po rozstaniu — lista
3. Poduszka finansowa po rozstaniu: jak obliczyć, na ile miesięcy wystarczy

### 2.3. Warianty H1 landing page

1. Czy finansowo poradzisz sobie po rozstaniu?
2. Budżet po rozstaniu: zobacz trzy warianty, zanim podejmiesz decyzje
3. Spokojna głowa zaczyna się od liczb. Sprawdź swój budżet po rozstaniu.

### 2.4. CTA

- **A:** Policz budżet w 3 wariantach
- **B:** Sprawdź swoją poduszkę finansową

### 2.5. Scenariusz wideo (20 s)

| Czas | Obraz | Napis ekranowy | VO |
|---|---|---|---|
| 0–3 s | Dłoń odkłada długopis na notes z odręczną listą wydatków. Obok kubek herbaty. | Dwa gospodarstwa. Jeden plan. | „Po rozstaniu z jednego budżetu robią się dwa.” |
| 3–8 s | Telefon: ekran wyniku, wykres słupkowy „Obecnie / Ostrożny / Bazowy / Optymistyczny” rośnie od dołu. | Obecnie vs 3 warianty | „Zobacz obecny budżet obok trzech wariantów.” |
| 8–13 s | Zbliżenie na kartę „Saldo miesięczne” (przykładowa kwota) i przełączanie wariantów, liczba płynnie się zmienia. | Saldo miesięczne w każdym wariancie | „Sprawdź miesięczne saldo w każdym scenariuszu…” |
| 13–17 s | Przewinięcie do „Koszty jednorazowe” (lista: kaucja, przeprowadzka, wyposażenie) i kafelka „Poduszka: X miesięcy”. | Koszty jednorazowe · Poduszka w miesiącach | „…koszty jednorazowe i to, na ile miesięcy wystarczy poduszka.” |
| 17–20 s | **End card** `#263D3A`, logo, tagline. | Policz budżet w 3 wariantach · Bezpłatnie | „Nowy Etap. Najpierw plan.” |

### 2.6. Grafika 1:1

- **Układ:** góra: nagłówek. Środek: telefon na wprost z wykresem 4 słupków (obecny w szarości, warianty w odcieniach zieleni, bazowy podkreślony złotem). Dół: pasek z 3 mini-kafelkami.
- **Tekst:** „Budżet po rozstaniu” · kafelki: „Saldo miesięczne” · „Koszty jednorazowe” · „Poduszka w miesiącach” · CTA „Policz bezpłatnie”.
- **Kolory:** tło `#FCF9F8`, słupki `#355450` / `#295550`, akcent `#C79B59`.
- **Element UI:** wykres porównawczy wariantów.

### 2.7. Grafika 1.91:1

- **Układ:** po lewej tekst na `#263D3A`, po prawej telefon z kafelkiem „Poduszka finansowa: 4,5 miesiąca (przykład)” i paskiem postępu w złocie.
- **Tekst:** „Na ile miesięcy wystarczy poduszka finansowa?” · „Budżet po rozstaniu w wariancie ostrożnym, bazowym i optymistycznym.” · CTA „Sprawdź liczby”.
- **Element UI:** kafelek poduszki + przełącznik wariantów (3 zakładki).

---

## 3. Plan opieki nad dzieckiem

`/narzedzia/plan-opieki-nad-dzieckiem` · slug: `plan-opieki-nad-dzieckiem`
**Wynik:** kalendarz tygodniowy i miesięczny, święta i ferie, punkty otwarte, propozycja do wydruku jako podstawa rozmowy.

### 3.1. Hooki Demand Gen

| # | Hook (≤90 znaków) | Nagłówek (≤40 znaków) |
|---|---|---|
| 1 | Jak może wyglądać tydzień dziecka w dwóch domach? Ułóż kalendarz i zobacz go na ekranie. | Tydzień dziecka w dwóch domach |
| 2 | Kalendarz opieki: tydzień, miesiąc, święta i ferie. Propozycja do spokojnej rozmowy. | Kalendarz opieki do rozmowy |
| 3 | Wigilia, ferie, urodziny. Plan opieki pomaga ustalić to wcześniej, nie w ostatniej chwili. | Święta i ferie — ustalcie wcześniej |
| 4 | Punkty otwarte w jednym miejscu: co już ustalone, a co jeszcze do omówienia. | Co ustalone, co do omówienia |
| 5 | Wydrukuj propozycję planu opieki i potraktuj ją jako punkt wyjścia do rozmowy. Bezpłatnie. | Plan opieki do wydruku |

### 3.2. Nagłówki artykułów edukacyjnych

1. Plan opieki nad dzieckiem po rozstaniu: przykładowe harmonogramy i jak je ułożyć
2. Opieka naprzemienna: jak może wyglądać tydzień i miesiąc dziecka w dwóch domach
3. Święta i ferie po rozstaniu rodziców: jak ustalić podział z wyprzedzeniem

### 3.3. Warianty H1 landing page

1. Jak może wyglądać życie dziecka w dwóch domach?
2. Plan opieki nad dzieckiem: kalendarz, święta i punkty do omówienia w jednym miejscu
3. Najpierw spokojny plan dla dziecka. Potem formalności.

### 3.4. CTA

- **A:** Ułóż kalendarz opieki
- **B:** Pobierz propozycję do rozmowy

### 3.5. Scenariusz wideo (20 s)

| Czas | Obraz | Napis ekranowy | VO |
|---|---|---|---|
| 0–3 s | Dwie pary małych butów przy dwóch różnych drzwiach (kadr podzielony, spokojne kolory). Żadnych smutnych twarzy. | Dwa domy. Jeden plan. | „Jak może wyglądać tydzień dziecka w dwóch domach?” |
| 3–8 s | Telefon: widok tygodniowy, dni wypełniają się dwoma kolorami (zieleń / złoto) z etykietami „Dom A / Dom B”. | Kalendarz tygodniowy | „Ułóż kalendarz tygodnia…” |
| 8–12 s | Przełączenie na widok miesiąca, potem zakładka „Święta i ferie”: Wigilia, ferie zimowe, urodziny. | Miesiąc · święta · ferie | „…miesiąca, świąt i ferii.” |
| 12–16 s | Lista „Punkty otwarte”: 3 pozycje z etykietą „do omówienia” (np. odbiór ze szkoły, wakacje). | Co jeszcze do omówienia | „Zobacz, co ustalone, a co jeszcze do omówienia.” |
| 16–20 s | Drukarka wysuwa kartkę z planem → **end card**. | Ułóż kalendarz opieki · Bezpłatnie | „Propozycja do wydruku. Nowy Etap.” |

### 3.6. Grafika 1:1

- **Układ:** telefon w centrum z widokiem tygodniowym (7 kolumn, dwa kolory). Nad nim nagłówek, pod nim dwa „chipy”.
- **Tekst:** „Tydzień dziecka w dwóch domach” · chipy: „Kalendarz tygodnia i miesiąca” · „Święta i ferie” · CTA „Ułóż plan opieki”.
- **Kolory:** tło `#FCF9F8`, dni Dom A `#355450`, Dom B `#C79B59` w 60% krycia, tekst `#263D3A`.
- **Element UI:** siatka tygodnia z legendą „Dom A / Dom B”.

### 3.7. Grafika 1.91:1

- **Układ:** po lewej telefon z zakładką „Święta i ferie” (Wigilia, Boże Narodzenie, Sylwester, ferie). Po prawej tekst na `#295550`.
- **Tekst:** „Święta i ferie: ustalcie je wcześniej.” · „Plan opieki nad dzieckiem z kalendarzem i listą punktów do omówienia.” · CTA „Ułóż kalendarz”.
- **Uwaga sezonowa:** w listopadzie i grudniu 2026 ta wersja powinna dostać większy budżet.

---

## 4. Mapa prawnych konsekwencji rozstania

`/narzedzia/konsekwencje-rozstania` · slug: `konsekwencje-rozstania`
**Wynik:** spersonalizowane karty: dzieci, finanse, majątek, mieszkanie, kredyt, procedury, dokumenty.

### 4.1. Hooki Demand Gen

| # | Hook (≤90 znaków) | Nagłówek (≤40 znaków) |
|---|---|---|
| 1 | Dzieci, majątek, mieszkanie, kredyt, dokumenty. Zobacz, czego może dotyczyć rozstanie. | Co zmienia rozstanie? Mapa |
| 2 | Mapa prawnych konsekwencji rozstania: karty tematyczne zamiast chaosu w wyszukiwarce. | Mapa zamiast chaosu |
| 3 | Kilka pytań, a potem karty z tematami, które warto przemyśleć i omówić ze specjalistą. | Tematy do omówienia ze specjalistą |
| 4 | Rozstanie to nie jedna decyzja, tylko kilka obszarów. Zobacz je na jednej mapie. | Wszystkie obszary na jednej mapie |
| 5 | Zanim zaczniesz szukać odpowiedzi, sprawdź, jakie pytania w ogóle warto zadać. Bezpłatnie. | Najpierw właściwe pytania |

### 4.2. Nagłówki artykułów edukacyjnych

1. Skutki prawne rozwodu: co zmienia się w sprawach dzieci, majątku i nazwiska
2. Co po rozwodzie z majątkiem wspólnym, mieszkaniem i kredytem? Przegląd tematów
3. Rozwód a dokumenty: co trzeba zaktualizować po rozstaniu — lista

### 4.3. Warianty H1 landing page

1. Co prawnie zmieni się w Twoim życiu po rozstaniu?
2. Mapa konsekwencji rozstania: dzieci, finanse, majątek i dokumenty w jednym miejscu
3. Zobacz cały obraz, zanim podejmiesz pierwszą decyzję.

### 4.4. CTA

- **A:** Zobacz swoją mapę
- **B:** Sprawdź, co warto omówić

### 4.5. Scenariusz wideo (15 s)

| Czas | Obraz | Napis ekranowy | VO |
|---|---|---|---|
| 0–3 s | Stół z porozrzucanymi karteczkami, dłoń układa je w równy rząd. | Wiele tematów naraz? | „Rozstanie to kilka obszarów naraz.” |
| 3–9 s | Telefon: karty wyniku przesuwają się poziomo: „Dzieci”, „Finanse”, „Majątek”, „Mieszkanie”, „Kredyt”, „Procedury”, „Dokumenty”. Każda z ikoną liniową w złocie. | 7 obszarów. Jedna mapa. | „Mapa pokazuje je jako uporządkowane karty…” |
| 9–12 s | Rozwinięcie jednej karty („Dokumenty”): 3 punkty + „Pytanie do specjalisty”. | Co sprawdzić · o co zapytać | „…z tym, co warto sprawdzić i o co zapytać.” |
| 12–15 s | **End card**. | Zobacz swoją mapę · Bezpłatnie | „Nowy Etap. Najpierw plan.” |

### 4.6. Grafika 1:1

- **Układ:** telefon z siatką 7 kart (2 kolumny). Karta „Mieszkanie” lekko uniesiona z cieniem.
- **Tekst:** „Mapa konsekwencji rozstania” · „Dzieci · Finanse · Majątek · Mieszkanie · Kredyt · Procedury · Dokumenty” · CTA „Zobacz mapę”.
- **Kolory:** tło `#263D3A`, karty `#FCF9F8`, ikony i CTA `#C79B59`.
- **Element UI:** siatka kart tematycznych.

### 4.7. Grafika 1.91:1

- **Układ:** 7 kart ułożonych w łuk przez całą szerokość (jak rozłożona talia), telefon z jedną rozwiniętą kartą po prawej, tekst po lewej.
- **Tekst:** „Rozstanie to kilka obszarów naraz.” · „Zobacz je uporządkowane na jednej mapie.” · CTA „Sprawdź bezpłatnie”.
- **Element UI:** rozwinięta karta z sekcjami „Co sprawdzić” i „Pytania do specjalisty”.

---

## 5. Przed pozwem

`/narzedzia/przed-pozwem` · slug: `przed-pozwem`
**Wynik:** mapa ustaleń przed złożeniem pozwu, kroki mediacji, dokumenty, pytania do mediatora.
**Najsilniejszy związek ze sprzedażą.** Główne CTA: **„Sprawdź koszt i odbierz bezpłatny Plan Rozwodu”**.

### 5.1. Hooki Demand Gen

| # | Hook (≤90 znaków) | Nagłówek (≤40 znaków) |
|---|---|---|
| 1 | Najpierw plan i ustalenia. Dopiero potem pozew. Zobacz, co można ustalić wcześniej. | Najpierw ustalenia, potem pozew |
| 2 | Dzieci, mieszkanie, majątek: mapa ustaleń, które można omówić jeszcze przed pozwem. | Mapa ustaleń przed pozwem |
| 3 | Mediacja krok po kroku: jak wygląda, jakie dokumenty przygotować, o co zapytać mediatora. | Mediacja krok po kroku |
| 4 | Sprawdź koszt przygotowania rozwodu i odbierz bezpłatny Plan Rozwodu. Bez zobowiązań. | Bezpłatny Plan Rozwodu |
| 5 | Ustalenia przed pozwem mogą uporządkować dalsze kroki. Zobacz, od czego zacząć. | Od czego zacząć przed pozwem? |

### 5.2. Nagłówki artykułów edukacyjnych

1. Rozwód za porozumieniem stron: co ustalić przed złożeniem pozwu
2. Mediacja przed rozwodem: jak wygląda, ile trwa i jak się przygotować
3. Porozumienie rodzicielskie i podział majątku przed pozwem: lista tematów do ustalenia

### 5.3. Warianty H1 landing page

1. Czy można ustalić warunki rozwodu, zanim złożycie pozew?
2. Najpierw plan i ustalenia. Dopiero potem pozew.
3. Mapa ustaleń przed pozwem: dzieci, mieszkanie, majątek i mediacja krok po kroku

### 5.4. CTA

- **A (główne):** Sprawdź koszt i odbierz bezpłatny Plan Rozwodu
- **B:** Zobacz mapę ustaleń przed pozwem

### 5.5. Scenariusz wideo (30 s)

| Czas | Obraz | Napis ekranowy | VO |
|---|---|---|---|
| 0–4 s | Biurko, zamknięta teczka. Dłoń kładzie na niej kartkę z napisem „Plan”. | Najpierw plan. | „Najpierw plan i ustalenia…” |
| 4–7 s | Ta sama teczka odsunięta na bok. | Dopiero potem pozew. | „…dopiero potem pozew.” |
| 7–14 s | Telefon: wynik „Mapa ustaleń”: lista tematów ze statusami „ustalone / do rozmowy / do mediacji” (zieleń, złoto, szary). | Co można ustalić wcześniej | „Zobacz, które tematy można omówić jeszcze przed złożeniem pozwu.” |
| 14–20 s | Przewinięcie: oś „Kroki mediacji” (4 kroki), potem lista „Dokumenty do przygotowania”. | Mediacja krok po kroku · dokumenty | „Jak wygląda mediacja i jakie dokumenty warto przygotować.” |
| 20–25 s | Karta „Pytania do mediatora” z 3 pytaniami. Potem dolny pasek z przyciskiem „Sprawdź koszt i odbierz bezpłatny Plan Rozwodu”. Palec go dotyka. | Bezpłatny Plan Rozwodu | „A gdy chcesz pójść dalej, sprawdź koszt i odbierz bezpłatny Plan Rozwodu.” |
| 25–30 s | **End card** `#263D3A`: logo, tagline, przycisk złoty. | Sprawdź koszt i odbierz bezpłatny Plan Rozwodu · Bez zobowiązań | „Nowy Etap. Poradnia rozwodowa.” |

Drobny napis: „Narzędzie informacyjne. Nie stanowi porady prawnej.”

### 5.6. Grafika 1:1

- **Układ:** góra: tagline jako nagłówek w dwóch liniach („Najpierw plan i ustalenia.” w `#263D3A`, „Dopiero potem pozew.” w `#C79B59`). Dół: telefon z mapą ustaleń, częściowo wychodzący poza kadr.
- **Tekst dodatkowy:** „Mapa ustaleń · Kroki mediacji · Pytania do mediatora” · CTA „Odbierz bezpłatny Plan Rozwodu”.
- **Kolory:** tło `#FCF9F8`, telefon w ciemnej ramce, statusy w zieleni i złocie.
- **Element UI:** lista tematów ze statusami „ustalone / do rozmowy / do mediacji”.

### 5.7. Grafika 1.91:1

- **Układ:** tło `#295550`. Po lewej oś 4 kroków mediacji (cienka złota linia z punktami). Po prawej telefon z kartą „Pytania do mediatora”.
- **Tekst:** „Czy można ustalić warunki rozwodu przed pozwem?” · „Zobacz mapę ustaleń i kroki mediacji.” · CTA „Sprawdź koszt i odbierz bezpłatny Plan Rozwodu”.
- **Element UI:** oś kroków mediacji + karta pytań.

---

## 6. Koszty utrzymania dziecka

`/narzedzia/koszty-utrzymania-dziecka` · slug: `koszty-utrzymania-dziecka`
**Wynik:** miesięczne i roczne zestawienie kosztów, wykres, porównanie scenariuszy.
**Ważne:** to **nie jest kalkulator alimentów**. Mówimy to wprost w reklamie, na landingu i w wyniku. Nie używamy słowa „alimenty” w hookach jako obietnicy wyniku. Jeśli pojawia się w Search, to wyłącznie z zaprzeczeniem („to nie kalkulator alimentów”).

### 6.1. Hooki Demand Gen

| # | Hook (≤90 znaków) | Nagłówek (≤40 znaków) |
|---|---|---|
| 1 | Ile naprawdę kosztuje miesiąc życia dziecka? Jedzenie, szkoła, zajęcia, zdrowie — policz. | Ile kosztuje miesiąc dziecka? |
| 2 | Miesięczne i roczne koszty dziecka na jednym wykresie. To nie kalkulator alimentów. | Koszty dziecka: miesiąc i rok |
| 3 | Porównaj scenariusze kosztów dziecka i przygotuj rzeczową listę do rozmowy. | Porównaj scenariusze kosztów |
| 4 | Ferie, wyprawka, dentysta. Roczne koszty dziecka łatwiej omówić, gdy są policzone. | Policz też koszty roczne |
| 5 | Rzetelne zestawienie wydatków na dziecko zamiast szacowania „na oko”. Bezpłatnie. | Zestawienie zamiast „na oko” |

### 6.2. Nagłówki artykułów edukacyjnych

1. Ile kosztuje utrzymanie dziecka miesięcznie? Lista wydatków do policzenia
2. Koszty utrzymania dziecka: jak przygotować zestawienie wydatków krok po kroku
3. Roczne wydatki na dziecko: ferie, wyprawka, zdrowie — o czym łatwo zapomnieć

### 6.3. Warianty H1 landing page

1. Ile naprawdę kosztuje miesięczne utrzymanie dziecka?
2. Koszty utrzymania dziecka: miesięczne i roczne zestawienie w kilka minut
3. Policz koszty dziecka rzetelnie i rzeczowo. (To nie jest kalkulator alimentów.)

Pod każdym H1 obowiązkowo: *„Narzędzie pomaga zestawić rzeczywiste wydatki. Nie oblicza wysokości alimentów. Tę ocenia sąd na podstawie wielu okoliczności.”*

### 6.4. CTA

- **A:** Policz koszty dziecka
- **B:** Zobacz zestawienie miesięczne i roczne

### 6.5. Scenariusz wideo (20 s)

| Czas | Obraz | Napis ekranowy | VO |
|---|---|---|---|
| 0–3 s | Plecak szkolny, para butów sportowych, karta z zajęć basenu na stole. | Ile kosztuje miesiąc dziecka? | „Ile naprawdę kosztuje miesiąc życia dziecka?” |
| 3–9 s | Telefon: kategorie (jedzenie, ubrania, szkoła, zajęcia, zdrowie, mieszkanie) uzupełniają się, wykres kołowy/pierścieniowy się buduje. | Wydatki według kategorii | „Uzupełnij wydatki w kategoriach…” |
| 9–13 s | Przełącznik „Miesięcznie / Rocznie”, kwota się przelicza. | Miesiąc i rok | „…i zobacz koszt miesięczny i roczny.” |
| 13–17 s | Porównanie 2 scenariuszy obok siebie (np. „obecnie” / „po zmianie szkoły”). Na dole stała belka: „To nie jest kalkulator alimentów”. | Porównaj scenariusze · To nie kalkulator alimentów | „Porównaj scenariusze. To zestawienie wydatków, nie kalkulator alimentów.” |
| 17–20 s | **End card**. | Policz koszty dziecka · Bezpłatnie | „Nowy Etap.” |

### 6.6. Grafika 1:1

- **Układ:** telefon po prawej z wykresem pierścieniowym kategorii i sumą „miesięcznie”. Po lewej nagłówek i lista 4 kategorii z kropkami w kolorach wykresu.
- **Tekst:** „Ile kosztuje miesiąc dziecka?” · „Jedzenie · Szkoła · Zajęcia · Zdrowie” · mała linia: „Zestawienie wydatków, nie kalkulator alimentów.” · CTA „Policz bezpłatnie”.
- **Kolory:** tło `#FCF9F8`, segmenty wykresu w odcieniach `#295550` / `#355450` / `#263D3A` / `#C79B59`.
- **Element UI:** wykres pierścieniowy + przełącznik miesiąc/rok.

### 6.7. Grafika 1.91:1

- **Układ:** po lewej telefon z porównaniem 2 scenariuszy (dwa słupki). Po prawej tekst na `#263D3A`.
- **Tekst:** „Koszty utrzymania dziecka: miesiąc i rok.” · „Porównaj scenariusze i przygotuj rzeczową listę do rozmowy.” · CTA „Zobacz zestawienie”.
- **Element UI:** porównanie scenariuszy z sumami rocznymi.

---

## 7. Separacja czy rozwód?

`/narzedzia/separacja-czy-rozwod` · slug: `separacja-czy-rozwod`
**Wynik:** tabela porównawcza konsekwencji prawnych, pytania do specjalisty.
**Zasada:** nigdy nie mówimy, co odbiorca „powinien” wybrać. Nie piszemy „lepsza opcja”, „dla Ciebie”, „rekomendujemy”. Pokazujemy różnice, a decyzja należy do użytkownika.

### 7.1. Hooki Demand Gen

| # | Hook (≤90 znaków) | Nagłówek (≤40 znaków) |
|---|---|---|
| 1 | Separacja i rozwód różnią się skutkami prawnymi. Zobacz porównanie w jednej tabeli. | Separacja a rozwód: różnice |
| 2 | Nazwisko, majątek, dziedziczenie, powrót do wspólnego życia. Porównaj obie drogi. | Porównaj obie drogi |
| 3 | Bez podpowiadania, co wybrać. Rzetelne porównanie i pytania do specjalisty. | Porównanie bez podpowiadania |
| 4 | Czym w praktyce różni się separacja od rozwodu? Przejrzyste zestawienie, bezpłatnie. | Czym się różnią? Zestawienie |
| 5 | Przygotuj listę pytań do specjalisty o separację i rozwód, zanim umówisz rozmowę. | Pytania do specjalisty |

### 7.2. Nagłówki artykułów edukacyjnych

1. Separacja a rozwód: różnice, skutki prawne i najczęstsze pytania
2. Separacja prawna w Polsce: na czym polega i czym różni się od rozwodu
3. Separacja czy rozwód — o co zapytać prawnika przed decyzją

### 7.3. Warianty H1 landing page

1. Separacja czy rozwód? Zobacz, czym różnią się ich skutki prawne.
2. Dwie drogi, różne konsekwencje. Porównanie separacji i rozwodu.
3. Porównaj separację i rozwód spokojnie, punkt po punkcie.

### 7.4. CTA

- **A:** Zobacz porównanie
- **B:** Pobierz pytania do specjalisty

### 7.5. Scenariusz wideo (15 s)

| Czas | Obraz | Napis ekranowy | VO |
|---|---|---|---|
| 0–3 s | Dwie ścieżki w parku rozchodzące się łagodnie (jesień, miękkie światło). Bez ludzi albo z osobą widzianą z daleka. | Separacja czy rozwód? | „Separacja i rozwód to różne skutki prawne.” |
| 3–9 s | Telefon: tabela z dwiema kolumnami „Separacja / Rozwód”, wiersze pojawiają się kolejno: nazwisko, majątek, dziedziczenie, możliwość zniesienia. | Porównanie punkt po punkcie | „Zobacz je porównane punkt po punkcie.” |
| 9–12 s | Karta „Pytania do specjalisty” z 3 pytaniami. | Pytania do specjalisty | „Z listą pytań do specjalisty.” |
| 12–15 s | **End card**. | Zobacz porównanie · Bezpłatnie | „Nowy Etap.” |

### 7.6. Grafika 1:1

- **Układ:** telefon na wprost z tabelą dwóch kolumn. Nad telefonem dwa słowa rozdzielone cienką złotą pionową linią: „Separacja | Rozwód”.
- **Tekst:** „Separacja | Rozwód” · „Porównanie skutków prawnych w jednej tabeli” · CTA „Zobacz porównanie”.
- **Kolory:** tło `#FCF9F8`, nagłówki kolumn na `#295550`, linia `#C79B59`.
- **Element UI:** tabela porównawcza (3–4 widoczne wiersze). Obie kolumny mają równy ciężar wizualny, żadna nie jest „wyróżniona”.

### 7.7. Grafika 1.91:1

- **Układ:** tabela porównawcza rozciągnięta przez lewe 2/3 (jako element graficzny w stylu UI), telefon z kartą pytań po prawej.
- **Tekst:** „Separacja czy rozwód? Zobacz różnice, nie podpowiedzi.” · CTA „Porównaj bezpłatnie”.
- **Element UI:** tabela + karta pytań do specjalisty.

---

## 8. Pierwsze 30 dni

`/narzedzia/pierwsze-30-dni` · slug: `pierwsze-30-dni`
**Wynik:** spersonalizowana checklista w tygodniach (dni 1–7, 8–14, 15–21, 22–30), checkboxy, PDF.

### 8.1. Hooki Demand Gen

| # | Hook (≤90 znaków) | Nagłówek (≤40 znaków) |
|---|---|---|
| 1 | Pierwsze 30 dni po decyzji o rozstaniu: checklista tydzień po tygodniu. Bezpłatnie. | Pierwsze 30 dni: checklista |
| 2 | Dni 1–7, 8–14, 15–21, 22–30. Co zrobić najpierw, a co może poczekać. | Co najpierw, co może poczekać |
| 3 | Dokumenty, finanse, dzieci, mieszkanie. Uporządkowana lista zamiast nocnych notatek. | Lista zamiast chaosu |
| 4 | Odhaczaj kolejne kroki i pobierz checklistę jako PDF. Spokojnie, we własnym tempie. | Checklista do odhaczania + PDF |
| 5 | Kiedy wszystko dzieje się naraz, pomaga prosty plan na najbliższe cztery tygodnie. | Plan na 4 tygodnie |

### 8.2. Nagłówki artykułów edukacyjnych

1. Pierwsze kroki po decyzji o rozwodzie: co zrobić w pierwszym miesiącu
2. Od czego zacząć rozstanie? Checklista na pierwsze 30 dni
3. Dokumenty, konto, dzieci: co uporządkować na początku rozstania — lista

### 8.3. Warianty H1 landing page

1. Pierwsze 30 dni: co zrobić najpierw, a co może poczekać?
2. Spokojny plan na pierwszy miesiąc, tydzień po tygodniu
3. Twoja checklista na pierwsze 30 dni: krok po kroku, w Twoim tempie

### 8.4. CTA

- **A:** Ułóż checklistę na 30 dni
- **B:** Pobierz plan jako PDF

### 8.5. Scenariusz wideo (20 s)

| Czas | Obraz | Napis ekranowy | VO |
|---|---|---|---|
| 0–3 s | Poranek, okno, dłoń otwiera notes na pustej stronie. | Od czego zacząć? | „Kiedy wszystko dzieje się naraz, od czego zacząć?” |
| 3–9 s | Telefon: checklista z czterema sekcjami-zakładkami „Dni 1–7 / 8–14 / 15–21 / 22–30”. Palec odhacza 2 pozycje, złote „ptaszki”. | Tydzień po tygodniu | „Checklista na pierwsze 30 dni, tydzień po tygodniu.” |
| 9–14 s | Przewijanie kolejnych tygodni, licznik postępu „3 z 18” rośnie. | Co najpierw · co może poczekać | „Co zrobić najpierw, a co może poczekać.” |
| 14–17 s | Przycisk „Pobierz PDF”, podgląd wydrukowanej strony. | Pobierz jako PDF | „Pobierz ją jako PDF.” |
| 17–20 s | **End card**. | Ułóż checklistę na 30 dni · Bezpłatnie | „Nowy Etap. Najpierw plan.” |

### 8.6. Grafika 1:1

- **Układ:** telefon na wprost z zakładką „Dni 1–7” i 4 pozycjami (2 odhaczone). Nad telefonem duża cyfra „30” w złocie (szeryf), obok „dni”.
- **Tekst:** „Pierwsze 30 dni” · „Checklista tydzień po tygodniu + PDF” · CTA „Ułóż swoją listę”.
- **Kolory:** tło `#295550`, telefon jasny, akcenty `#C79B59`, tekst `#FCF9F8`.
- **Element UI:** zakładki tygodni + checkboxy + pasek postępu.

### 8.7. Grafika 1.91:1

- **Układ:** cztery kolumny „1–7 · 8–14 · 15–21 · 22–30” jako oś czasu przez całą szerokość (cienka złota linia), na niej telefon z otwartą checklistą.
- **Tekst:** „Spokojny plan na pierwsze 30 dni.” · CTA „Ułóż checklistę”.
- **Element UI:** checklista z odhaczonymi pozycjami i przyciskiem „Pobierz PDF”.

---

## 9. Poradniki do pobrania

Format skrócony: 3 hooki, 1 CTA, 1 koncepcja grafiki 1:1. Hooki ≤90 znaków, wspólne dla Google i Meta.
Wspólny motyw wizualny poradników: **okładka poradnika (PDF) + 2–3 rozłożone strony** w realistycznym, płaskim mockupie (jak papier na stole, z lekkim cieniem). Tło `#FCF9F8` lub `#263D3A`, akcent złoty. Bez renderów 3D „książki w powietrzu”.
`utm_campaign`: `ne_guide_{slug}_{rrrrmm}`.

### 9.1. Rozwód w Polsce krok po kroku · `rozwod-krok-po-kroku`

**Hooki**
1. Rozwód w Polsce krok po kroku: od pierwszych ustaleń do wyroku. Poradnik PDF za darmo.
2. Kolejne etapy, dokumenty i decyzje w jednym przejrzystym poradniku. Bezpłatnie.
3. Najpierw plan i ustalenia, potem pozew. Zobacz całą drogę rozpisaną na etapy.

**CTA:** Pobierz poradnik krok po kroku
**Grafika 1:1:** okładka z tytułem i pod nią rozłożona strona z osią etapów (5 punktów połączonych złotą linią: „Ustalenia → Dokumenty → Pozew → Rozprawa → Po wyroku”). Tekst: „Rozwód w Polsce krok po kroku” · „Bezpłatny poradnik PDF”. Tło `#FCF9F8`, oś w `#295550`.

### 9.2. Checklista dokumentów do rozwodu i podziału majątku · `checklista-dokumentow`

**Hooki**
1. Akt małżeństwa, akty urodzenia, umowy, wyciągi. Checklista dokumentów w jednym PDF.
2. Dokumenty do rozwodu i podziału majątku: odhaczaj, co już masz. Bezpłatna checklista.
3. Zanim zaczną się formalności, zbierz dokumenty według prostej listy.

**CTA:** Pobierz checklistę dokumentów
**Grafika 1:1:** wydruk checklisty na stole, obok segregator w kolorze `#295550` i długopis. Na liście 3 pozycje odhaczone złotym ptaszkiem. Tekst: „Checklista dokumentów” · „do rozwodu i podziału majątku”.

### 9.3. Jak powiedzieć dzieciom o rozstaniu · `jak-powiedziec-dzieciom`

**Hooki**
1. Jak rozmawiać z dziećmi o rozstaniu rodziców? Spokojny poradnik z przykładami zdań.
2. Co powiedzieć, czego unikać i jak dopasować rozmowę do wieku dziecka. Poradnik PDF.
3. Jedna z najtrudniejszych rozmów. Warto się do niej przygotować. Bezpłatny poradnik.

**CTA:** Pobierz poradnik o rozmowie z dziećmi
**Grafika 1:1:** ciepła, dokumentalna fotografia: dwa kubki (duży i mały) na parapecie, bez twarzy. Po prawej okładka poradnika i rozłożona strona „Przykładowe zdania według wieku”. Tekst: „Jak powiedzieć dzieciom o rozstaniu”. Tło `#FCF9F8`, tytuł `#263D3A`.

### 9.4. Zeszyt przygotowania do mediacji · `przygotowanie-do-mediacji`

**Hooki**
1. Zeszyt przygotowania do mediacji: tematy, priorytety i pytania zapisane przed spotkaniem.
2. Na mediację lepiej przyjść z notatkami. Bezpłatny zeszyt do wypełnienia.
3. Co jest dla mnie najważniejsze, co mogę elastycznie omówić? Uporządkuj to przed mediacją.

**CTA:** Pobierz zeszyt do mediacji
**Grafika 1:1:** zeszyt w okładce `#295550` ze złotym tytułem, otwarty na stronie z tabelą „Ważne dla mnie / Mogę omówić / Pytania”. Tekst: „Zeszyt przygotowania do mediacji” · „Do wydruku i wypełnienia”.

### 9.5. Arkusz: majątek i długi przed rozstaniem · `inwentaryzacja-majatku`

**Hooki**
1. Mieszkanie, auto, oszczędności, kredyty. Spisz majątek i zobowiązania w jednym arkuszu.
2. Arkusz majątku i długów: przejrzysty punkt wyjścia do rozmowy o podziale.
3. Pełny obraz aktywów i zobowiązań, zanim zacznie się rozmowa o podziale. Bezpłatnie.

**CTA:** Pobierz arkusz majątku i długów
**Grafika 1:1:** arkusz w formie tabeli (kolumny: „Składnik”, „Wartość”, „Zobowiązanie”, „Uwagi”) z przykładowymi wierszami oznaczonymi „przykład”. Na górze tytuł, na dole złota linia podsumowania „Razem”. Tło `#FCF9F8`, nagłówki tabeli `#263D3A`.

### 9.6. Kredyt po rozstaniu: jak przygotować rozmowę z bankiem · `rozmowa-z-bankiem`

**Hooki**
1. Rozwód nie zwalnia współkredytobiorcy z umowy. Przygotuj rozmowę z bankiem krok po kroku.
2. Pytania do banku, potrzebne dokumenty, możliwe rozwiązania. Bezpłatny poradnik PDF.
3. Wspólny kredyt po rozstaniu: idź do banku z planem, a nie tylko z pytaniami.

**CTA:** Pobierz poradnik o rozmowie z bankiem
**Grafika 1:1:** okładka i strona z listą „Pytania do banku” (5 pozycji). Obok klucze i kalkulator na stole (dokumentalne zdjęcie). Tekst: „Kredyt po rozstaniu” · „Jak przygotować rozmowę z bankiem”. Tło `#263D3A`, tytuł `#FCF9F8`, akcent złoty.

### 9.7. Bezpieczeństwo cyfrowe i finansowe w czasie rozstania · `bezpieczenstwo-cyfrowe-i-finansowe`

**Uwaga:** komunikujemy higienę cyfrową i porządek finansowy. **Nie** sugerujemy inwigilacji drugiej osoby ani zagrożenia („ktoś czyta Twoje wiadomości”). Nie obiecujemy ochrony. Na landingu i w PDF warto dodać spokojną informację: *„Jeśli czujesz się zagrożona lub zagrożony — zadzwoń pod 112. Wsparcie oferuje też Niebieska Linia: 800 120 002.”*

**Hooki**
1. Hasła, wspólne konta, dostęp do aplikacji. Spokojne kroki porządkujące sprawy cyfrowe.
2. Wspólne subskrypcje, karty i konta: co przejrzeć na początku rozstania. Poradnik PDF.
3. Bezpieczeństwo cyfrowe i finansowe w czasie rozstania: praktyczna checklista, bezpłatnie.

**CTA:** Pobierz checklistę bezpieczeństwa
**Grafika 1:1:** płaska ilustracja liniowa (nie AI, prosta ikonografia): kłódka, karta płatnicza, telefon, połączone cienką złotą linią na tle `#295550`. Obok okładka poradnika. Tekst: „Bezpieczeństwo cyfrowe i finansowe” · „Praktyczna checklista”.

### 9.8. Rzeczowe wiadomości do drugiego rodzica — szablony · `komunikacja-z-drugim-rodzicem`

**Hooki**
1. Krótko, rzeczowo, o dziecku. Szablony wiadomości do drugiego rodzica do skopiowania.
2. Zmiana odbioru, wydatki szkolne, wakacje. Gotowe szablony spokojnych wiadomości.
3. Mniej emocji w wiadomościach, więcej konkretu. Bezpłatne szablony dla rodziców.

**CTA:** Pobierz szablony wiadomości
**Grafika 1:1:** telefon z ekranem komunikatora (neutralny, bez marek), dymek z przykładową wiadomością: „Cześć, w piątek odbiorę Zosię o 16:00 zamiast 17:00. Daj znać, czy pasuje.” Tekst nad telefonem: „Rzeczowe wiadomości do drugiego rodzica” · „Szablony do skopiowania”. Tło `#FCF9F8`, dymek `#295550` z tekstem w złamanej bieli.

### 9.9. Pierwsze święta po rozstaniu — planer rodzica · `pierwsze-swieta-po-rozstaniu`

**Kampania sezonowa: start od razu (listopad 2026), główny budżet do ok. 20 grudnia, wygaszenie po 6 stycznia.** Grafiki z delikatnym zimowym akcentem (gałązka świerku, ciepłe światło). Bez czerwieni i bombek, kolory marki zostają.

**Hooki**
1. Pierwsze święta w dwóch domach? Zaplanujcie je spokojnie jeszcze przed grudniem. *(Uwaga: forma pytania. Na Meta lepiej użyć wariantu 2 lub 3.)*
2. Wigilia, pierwszy dzień świąt, Sylwester. Planer pomaga rozpisać, kto, gdzie i kiedy.
3. Planer pierwszych świąt po rozstaniu: kalendarz, ustalenia i pomysły na nowe tradycje.

**CTA:** Pobierz planer świąteczny
**Grafika 1:1:** planer na stole przy oknie z zimowym światłem, gałązka świerku, kubek. Na stronie planera kalendarz 24–26 grudnia z dwoma kolorami (zieleń / złoto). Tekst: „Pierwsze święta po rozstaniu” · „Planer rodzica — bezpłatnie”. Tło `#263D3A`, tytuł `#FCF9F8`, akcent złoty.

### 9.10. Jak przygotować się do pierwszej konsultacji z prawnikiem · `przygotowanie-do-konsultacji`

**Hooki**
1. Pierwsza konsultacja z prawnikiem: jakie dokumenty zabrać i o co zapytać. Lista PDF.
2. Dobrze przygotowana konsultacja to więcej konkretów w krótszym czasie. Bezpłatny poradnik.
3. Spisz pytania, zbierz dokumenty, określ cele. Przygotuj się do pierwszej rozmowy.

**CTA:** Pobierz listę przygotowań
**Grafika 1:1:** notes z listą „Pytania na konsultację” (3 pozycje ręcznym pismem), obok teczka z dokumentami i okładka poradnika. Bez togi i kodeksów. Tekst: „Jak przygotować się do pierwszej konsultacji” · „Dokumenty, pytania, cele”. Tło `#FCF9F8`, akcenty `#C79B59`.

---

## 10. Checklista przed publikacją kreacji

- [ ] Tekst nie przypisuje odbiorcy rozstania, rozwodu, problemów finansowych ani sytuacji dziecka (Meta / Google).
- [ ] Brak liczb statystycznych, opinii i obietnic wyniku.
- [ ] Liczby w UI oznaczone jako „Przykładowe dane”.
- [ ] Disclaimer „informacyjne, nie porada prawna” na landingu i w wyniku.
- [ ] Koszty dziecka: widoczne „to nie kalkulator alimentów”.
- [ ] Separacja/rozwód: brak sugestii, co wybrać.
- [ ] UTM zgodny z konwencją. URL nie zawiera odpowiedzi z narzędzia.
- [ ] Brak remarketingu, Customer Match, lookalike i segmentów z fraz o rozwodzie.
- [ ] Wizualnie: brak młotków, paragrafów, obrączek, płaczu i estetyki AI.

---

## Źródła (do weryfikacji przed startem kampanii)

- Meta, *Privacy Violations and Personal Attributes* (zasady reklamowe): https://transparency.meta.com/policies/ad-standards/objectionable-content/privacy-violations-personal-attributes/
- Meta, *Personal attributes*: https://transparency.meta.com/policies/ad-standards/objectionable-content/personal-attributes
- Jon Loomer, „Can We Use the Words ‘You’ and ‘Your’ in Facebook Ads Copy?”: https://www.jonloomer.com/can-we-use-the-words-you-and-your-in-facebook-ads-copy/
- Google Ads, *Personalized advertising* (kategorie wrażliwe, m.in. trudności osobiste): https://support.google.com/adspolicy/answer/143465
- Meta, *Business Tools Terms* (zakaz przesyłania informacji wrażliwych): https://www.facebook.com/legal/businesstech
- Google Ads, *Consent mode*: https://support.google.com/google-ads/answer/10000067

> Uwaga: brzmienie zasad Meta potwierdzono w listopadzie 2026 w wynikach wyszukiwania. Stron Google i Meta nie udało się otworzyć bezpośrednio z tej sesji, bo nie pozwalają na to ustawienia sieci. Przed startem kampanii przejrzyj aktualne wersje stron pod linkami powyżej.
