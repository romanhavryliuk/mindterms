[English](README.md) · [Українська](README.uk.md) · **Polski**

# mindterms

Przewodnik po psychologii prostym językiem. 48 pojęć, każde z definicją, przykładem
z życia, najczęstszym błędem w użyciu — i uczciwą informacją o tym, jak mocna nauka
za nim stoi.

Projekt powstał dlatego, że psychologia popularna podaje wszystko z jednakową
pewnością: Wielka Piątka, odtworzona w wielu kulturach i dekadach, leży na tej samej
półce co nastawienie na rozwój, którego efekt po poprawce na błąd publikacyjny jest
bliski zeru. Czytelnik nie ma jak ich odróżnić. Dlatego każde pojęcie ma tu ocenę
siły dowodów od 1 do 3, a artykuł wprost mówi, gdzie danych jest mało.

## Co jest w środku

| | |
|---|---|
| Pojęć | 48 |
| Tematów | 12 |
| Zestawów według sytuacji życiowej | 6 |
| Par, które się myli | 9 |
| Odnośników do źródeł pierwotnych | 96 |
| Języków | ukraiński, angielski, polski |

Rozkład według siły dowodów: **33** pojęcia na mocnych podstawach, **13** częściowo
potwierdzonych, **2** na słabych podstawach.

## Stos technologiczny

- **Next.js 15** (App Router) z **React 19** — wszystko generowane statycznie
  podczas budowania; strona jest serwowana jako HTML plus wspólny bundle 103 kB
- **TypeScript** w trybie `strict` z `noUncheckedIndexedAccess`
- **CSS Modules** — bez frameworków narzędziowych; system projektowy żyje w
  zmiennych CSS
- **Zod** — schemat treści jest jedynym źródłem prawdy, wszystkie typy wywodzą się
  z niego przez `z.infer`

Zależności czasu wykonania jest pięć: `next`, `react`, `react-dom`, `zod` i `clsx`.

## Jak uruchomić

```bash
npm install
npm run dev        # serwer deweloperski na http://localhost:3000
```

| Polecenie | Co robi |
|---|---|
| `npm run dev` | serwer deweloperski |
| `npm run build` | build produkcyjny — 192 strony statyczne |
| `npm start` | serwuje zbudowany projekt |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |

## Model treści

Cała treść leży w trzech plikach JSON: `content/content.json` (ukraiński, źródło
prawdy), `content.en.json` i `content.pl.json`. Każdy z nich jest sprawdzany
schematem [`content/schema.ts`](content/schema.ts) podczas budowania, więc błąd w
danych przerywa build, zamiast trafić na produkcję.

Schemat opisuje siedem bytów: `Category`, `Concept`, `Source`, `Figure`,
`Collection`, `Confusion` i `HelpCard`. Slug pojęcia to jego `id`, identyczny we
wszystkich trzech językach. Właśnie dlatego przełącznik języka zostawia czytelnika
przy tym samym artykule.

## Architektura

```
src/
  app/         wyłącznie routing: parametry, metadane, generateStaticParams
    [locale]/  segment języka trzyma główny layout i <html lang>
  views/       po katalogu na stronę — cała jej struktura
  components/  17 komponentów wielokrotnego użytku, katalog na komponent
  services/    odczyt i zapytania do treści, wyszukiwanie
  i18n/        języki, liczba mnoga, katalogi komunikatów dla uk / en / pl
  utils/       formatery, stałe, znaczniki w tekście
  types/       typy reeksportowane ze schematu Zod
  styles/      tokeny projektowe i style bazowe
```

Pliki tras pozostają cienkie: ustalają język, budują metadane i renderują widok.
Cała struktura strony żyje w `views/`, więc stronę da się przeczytać w jednym pliku
od góry do dołu.

Zależności biegną w jedną stronę — `app` → `views` → `components` — i wśród 83
modułów nie ma ani jednego cyklu. Komponenty dostają to, czego potrzebują, przez
propsy; dwa wyjątki to stopka i karta pomyleń, które czytają treść bezpośrednio. To
decyzja świadoma: są to komponenty serwerowe, a odczyt z pamięci podręcznej tam,
gdzie dane są potrzebne, jest lepszy niż przeciąganie ich przez layout.

Modułów klientowych jest tylko 9 z 83 — filtry katalogu, wyszukiwarka, menu mobilne
i przełącznik języka. Reszta renderuje się na serwerze.

## Decyzje warte wyjaśnienia

**Główny layout żyje w segmencie języka.** `app/[locale]/layout.tsx` renderuje
`<html lang={locale}>` — inaczej nie da się uzyskać poprawnego atrybutu języka dla
każdej wersji. Ceną jest to, że globalna strona 404 leży poza tym layoutem i musi
przynieść własne style oraz kroje pisma. Po to właśnie istnieje
`src/styles/not-found.css`.

**`dynamicParams = false` wszędzie.** Bez tego `/xx` i `/bogus/catalog` zwracały 200
z pełną kopią strony. Teraz wszystko poza wygenerowanymi parametrami to 404.

**Filtry katalogu żyją w adresie.** Wybór tematu i poziomu dowodów zapisuje się w
`searchParams`, więc odfiltrowanym widokiem można podzielić się linkiem.
`useSearchParams` wyłączyłby prerendering całego poddrzewa, dlatego hook jest
odizolowany w osobnym komponencie, który nic nie rysuje — dzięki temu wszystkie 48
kart zostaje w statycznym HTML.

**Obrazy OG używają kroju statycznego.** `satori` nie obsługuje krojów zmiennych,
więc trasa wozi PT Sans obok siebie, a `next.config.ts` przypina go do bundle'a
funkcji przez `outputFileTracingIncludes`.

**Znacznik siły dowodów jest znakiem projektu.** Trzy kropki — dwie wypełnione,
jedna przygaszona — stoją na każdej karcie, w każdym artykule, na obrazie OG i w
faviconie.

## Dostępność i SEO

Kontrast tekstu spełnia WCAG AA w motywie jasnym i ciemnym. Jeden `h1` na stronę,
bez przeskoków poziomów nagłówków, widoczna obwódka fokusu na wszystkim, co dostępne
z klawiatury, i poszanowanie `prefers-reduced-motion`. Nie ma przewijania poziomego
przy 320, 375, 768 ani 1440 px w żadnym z trzech języków.

Każda strona ma adres kanoniczny i odnośniki `hreflang` do wszystkich trzech
języków. Strony pojęć emitują Schema.org `DefinedTerm`, wszystkie strony —
`BreadcrumbList`. `sitemap.xml` zawiera 180 adresów z alternatywami językowymi,
`robots.txt` również jest generowany.

## Ograniczenia projektu

**Brak recenzji specjalisty.** Teksty napisała jedna osoba na podstawie źródeł
pierwotnych. Nie przeglądał ich ani praktykujący psycholog, ani naukowiec, więc błędy
interpretacji są możliwe — najbardziej prawdopodobne tam, gdzie źródło jest złożone,
a sformułowanie proste.

**Tłumaczenie także bez recenzji.** Wersja angielska i polska to maszynowe
tłumaczenie ukraińskiej, przejrzane, ale niesprawdzone przez zawodowego tłumacza ani
psychologa pracującego w tych językach. Terminologia może się różnić od przyjętej w
tych krajach.

**Przeważają próby zachodnie.** Większość badań, na których opierają się artykuły,
przeprowadzono w USA i Europie Zachodniej, często na studentach. To, czy wnioski
przenoszą się na inne populacje, w większości przypadków po prostu nie zostało
sprawdzone.

**To nie jest narzędzie diagnostyczne.** Strona wyjaśnia pojęcia. Nie stawia diagnoz
i nie zastępuje konsultacji ze specjalistą.

## Licencja

Kod jest osobistym projektem portfolio. Treść skompilowano z opublikowanych badań;
źródła podano na końcu każdego artykułu.
