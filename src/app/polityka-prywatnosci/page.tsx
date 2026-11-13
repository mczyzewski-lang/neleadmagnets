import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Polityka prywatności i cookies",
  description: "Jak narzędzia Nowego Etapu przetwarzają dane: obliczenia w przeglądarce, brak zapisu odpowiedzi, odrębne zgody, cookies tylko za zgodą.",
  alternates: { canonical: absoluteUrl("/polityka-prywatnosci") },
};

/**
 * UWAGA: szablon odzwierciedla faktyczne działanie aplikacji. Przed publikacją uzupełnij dane administratora,
 * dostawców (hosting, poczta, CRM) i okresy przechowywania oraz zleć weryfikację prawnikowi/IOD.
 */
export default function Privacy() {
  return (
    <article className="section">
      <div className="container container--narrow prose">
        <span className="eyebrow">Prywatność</span>
        <h1 style={{ fontSize: "var(--fs-2xl)" }}>Polityka prywatności i cookies</h1>
        <p className="lead">Tematy rozstania, dzieci i finansów są wrażliwe. Dlatego narzędzia zaprojektowaliśmy tak, by zbierać jak najmniej danych.</p>

        <h2>1. Administrator</h2>
        <p>Administratorem danych jest [pełna nazwa podmiotu prowadzącego Nowy Etap, adres, NIP/KRS, e-mail kontaktowy — DO UZUPEŁNIENIA przed publikacją]. W sprawach danych osobowych możesz pisać na: [adres e-mail — DO UZUPEŁNIENIA].</p>

        <h2>2. Korzystanie z narzędzi — bez zapisywania odpowiedzi</h2>
        <ul>
          <li>Odpowiedzi i obliczenia w narzędziach są przetwarzane <strong>w Twojej przeglądarce</strong>. Nie wysyłamy ich na nasz serwer i nie zapisujemy w bazie danych.</li>
          <li>Odpowiedzi znikają po odświeżeniu lub zamknięciu strony, chyba że sam(a) pobierzesz wynik, wydrukujesz go albo poprosisz o wysłanie na e-mail.</li>
          <li>Narzędzie „Pierwsze 30 dni” pozwala — wyłącznie na Twoje wyraźne kliknięcie — zapisać plan w pamięci tej przeglądarki (localStorage). Możesz go usunąć przyciskiem „Usuń zapisany plan”. Nie zapisuj planu na urządzeniu współdzielonym z inną osobą.</li>
          <li>Materiały wypełniane online (checklisty i arkusze) domyślnie nie zapisują odpowiedzi — znikają po zamknięciu karty. Jeśli sam(a) zaznaczysz „Zapamiętaj moje odpowiedzi na tym urządzeniu”, zostaną zapisane w pamięci tej przeglądarki (localStorage); odznaczenie pola lub „Wyczyść moje odpowiedzi” je usuwa. Odpowiedzi nie są wysyłane na nasz serwer.</li>
          <li>Nie pytamy o imiona i inne dane identyfikujące dzieci.</li>
          <li>Pamiętaj: historia przeglądarki pokazuje odwiedzane adresy. Przycisk „Szybkie wyjście” przenosi na neutralną stronę, ale nie czyści historii. Nie obiecujemy anonimowości, której nie możemy technicznie zapewnić.</li>
        </ul>

        <h2>3. Wysłanie podsumowania lub materiału na e-mail</h2>
        <p>Gdy prosisz o wysłanie wyniku lub materiału, przetwarzamy Twój adres e-mail i treść podsumowania wyłącznie w celu jednorazowej wysyłki (art. 6 ust. 1 lit. b RODO — wykonanie Twojego żądania). Wiadomość wysyła dostawca poczty transakcyjnej [nazwa dostawcy, np. Resend — DO UZUPEŁNIENIA]. Treści wyniku nie zapisujemy w naszej bazie ani nie przekazujemy do CRM. Dostawca poczty może przechowywać logi wysyłki zgodnie ze swoją polityką.</p>

        <h2>4. Zgody marketingowe — osobno i dobrowolnie</h2>
        <p>Zgoda na otrzymywanie materiałów i informacji o usługach jest odrębna i dobrowolna (art. 6 ust. 1 lit. a RODO). Możesz ją wycofać w każdej chwili, bez wpływu na zgodność z prawem wcześniejszego przetwarzania. Przy tej zgodzie zapisujemy: adres e-mail, nazwę narzędzia/materiału, datę, wersję treści zgody i parametry kampanii (UTM), jeśli były dostępne.</p>

        <h2>5. Prośba o kontakt (Plan Rozwodu, wycena, rozmowa)</h2>
        <p>Jeśli wyślesz formularz kontaktowy, przetwarzamy podane dane (e-mail, opcjonalnie imię i telefon), typ prośby, zakres zgód, źródło zgłoszenia i parametry kampanii — w celu odpowiedzi na zgłoszenie i podjęcia działań przed zawarciem umowy (art. 6 ust. 1 lit. b RODO). Telefonicznie kontaktujemy się tylko po zaznaczeniu osobnej zgody. Zgłoszenie może trafić do naszego systemu CRM [nazwa — DO UZUPEŁNIENIA]. <strong>Nie przekazujemy do CRM odpowiedzi z narzędzi.</strong></p>
        <p>Sam fakt skorzystania z narzędzia nie jest prośbą o kontakt.</p>

        <h2>6. Okres przechowywania</h2>
        <p>Dane zgłoszeń kontaktowych przechowujemy przez [okres — DO UZUPEŁNIENIA, np. 12 miesięcy od ostatniego kontaktu], dane z zgodą marketingową — do jej wycofania. Logi serwera mogą zawierać adres IP i są usuwane po [okres — DO UZUPEŁNIENIA].</p>

        <h2 id="cookies">7. Cookies i analityka</h2>
        <ul>
          <li>Strona działa bez cookies analitycznych i reklamowych.</li>
          <li>Jeżeli włączymy analitykę (Google Tag Manager / Google Analytics), zostanie ona uruchomiona <strong>dopiero po Twojej zgodzie</strong> w banerze. Twoja decyzja jest zapisywana w pamięci przeglądarki.</li>
          <li>Do narzędzi analitycznych trafiają wyłącznie ogólne zdarzenia (np. „rozpoczęto narzędzie”, „pobrano wynik”) z nazwą narzędzia — nigdy odpowiedzi, kwoty, informacje o dzieciach czy dane kontaktowe.</li>
          <li>Nie tworzymy grup remarketingowych na podstawie korzystania z narzędzi.</li>
          <li>Parametry kampanii (UTM, identyfikatory kliknięć) przechowujemy w pamięci sesji przeglądarki i przekazujemy tylko razem z dobrowolnym zgłoszeniem.</li>
        </ul>

        <h2>8. Twoje prawa</h2>
        <p>Masz prawo dostępu do danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia, sprzeciwu oraz wycofania zgody. Możesz też złożyć skargę do Prezesa Urzędu Ochrony Danych Osobowych.</p>

        <h2>9. Bezpieczeństwo</h2>
        <p>Strona działa wyłącznie przez szyfrowane połączenie HTTPS. Formularze są walidowane po stronie przeglądarki i serwera, a dane nie są umieszczane w adresach URL.</p>
        <p className="xsmall muted">Wersja z dnia 10.11.2026.</p>
      </div>
    </article>
  );
}
