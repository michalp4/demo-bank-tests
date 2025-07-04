# Test Cases – Demo Bank

## 🔐 Logowanie

### TC-01: Poprawne logowanie

- **Typ:** Happy path  
- **Cel:** Sprawdzenie poprawnego logowania z użyciem prawidłowych danych  
- **Warunki wstępne:** Strona główna aplikacji jest otwarta  
- **Kroki:**
  1. Wpisz prawidłowy identyfikator użytkownika
  2. Wpisz prawidłowe hasło
  3. Kliknij przycisk „Zaloguj się”
- **Oczekiwany rezultat:** Na pulpicie użytkownika wyświetla się imię i nazwisko "Jan Demobankowy"

---

### TC-02: Nieudane logowanie – zbyt krótki identyfikator

- **Typ:** Unhappy path  
- **Cel:** Walidacja długości pola identyfikatora  
- **Warunki wstępne:** Strona główna aplikacji jest otwarta  
- **Kroki:**
  1. Wpisz za krótki identyfikator użytkownika (np. „testerl”)
  2. Kliknij pole „Hasło”
- **Oczekiwany rezultat:** Wyświetla się komunikat błędu: „identyfikator ma min. 8 znaków”

---

### TC-03: Nieudane logowanie – zbyt krótkie hasło

- **Typ:** Unhappy path  
- **Cel:** Walidacja długości pola hasła  
- **Warunki wstępne:** Strona główna aplikacji jest otwarta  
- **Kroki:**
  1. Wpisz poprawny identyfikator użytkownika
  2. Wpisz zbyt krótkie hasło (np. „12345”)
  3. Opuść pole „Hasło”
- **Oczekiwany rezultat:** Wyświetla się komunikat błędu: „hasło ma min. 8 znaków”

---

## 🧾 Pulpit użytkownika

### TC-04: Szybki przelew z poprawnymi danymi

- **Typ:** Integration test  
- **Cel:** Sprawdzenie poprawnego działania funkcji szybkiego przelewu  
- **Warunki wstępne:** Użytkownik jest zalogowany i znajduje się na pulpicie  
- **Kroki:**
  1. Wprowadź ID odbiorcy: `2`
  2. Wprowadź kwotę przelewu: `150`
  3. Wprowadź tytuł przelewu: `pizza`
  4. Kliknij przycisk wykonania przelewu
- **Oczekiwany rezultat:** Wyświetla się komunikat:  
  `Przelew wykonany! Chuck Demobankowy - 150,00PLN - pizza`

---

### TC-05: Doładowanie telefonu z poprawnymi danymi

- **Typ:** Integration test  
- **Cel:** Sprawdzenie poprawnego działania funkcji doładowania  
- **Warunki wstępne:** Użytkownik jest zalogowany i znajduje się na pulpicie  
- **Kroki:**
  1. Wybierz numer odbiorcy: `500 xxx xxx`
  2. Wybierz kwotę doładowania: `50`
  3. Kliknij „Doładuj”
- **Oczekiwany rezultat:** Wyświetla się komunikat:  
  `Doładowanie wykonane!  50,00PLN na numer 500 xxx xxx`

---

### TC-06: Zmniejszenie salda po doładowaniu telefonu

- **Typ:** Integration test  
- **Cel:** Sprawdzenie, czy saldo konta zmniejsza się po wykonaniu doładowania  
- **Warunki wstępne:** Użytkownik jest zalogowany, zna saldo początkowe  
- **Kroki:**
  1. Odczytaj bieżące saldo konta
  2. Wykonaj doładowanie 50 PLN na numer `500 xxx xxx`
- **Oczekiwany rezultat:** Nowe saldo = (saldo początkowe - 50)


---

## 💸 Płatności

### TC-07: Przelew na nowe konto

- **Typ:** Integration test  
- **Cel:** Sprawdzenie poprawnego wykonania przelewu na nowe konto  
- **Warunki wstępne:** Użytkownik jest zalogowany i znajduje się na stronie „Płatności”  
- **Kroki:**
  1. Wprowadź odbiorcę: `Jan Nowak`
  2. Wprowadź numer konta: `12 3456 7890 1234 5678 9012 36459`
  3. Wprowadź kwotę: `222`
  4. Kliknij „Wykonaj przelew”
- **Oczekiwany rezultat:** Wyświetla się komunikat:  
  `Przelew wykonany! 222,00PLN dla Jan Nowak`
