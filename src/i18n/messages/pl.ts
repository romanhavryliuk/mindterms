import type { Messages } from './uk';

export const pl: Messages = {
  locale: {
    name: 'Polski',
    short: 'PL',
    switcherLabel: 'Język interfejsu',
  },

  site: {
    tagline: 'terminy o psychice',
    description:
      'Przewodnik po psychologii prostym językiem: 48 pojęć z definicją, ' +
      'przykładem, najczęstszym błędem i oceną siły dowodów.',
  },

  plural: {
    concept: { one: 'pojęcie', few: 'pojęcia', many: 'pojęć', other: 'pojęcia' },
    category: { one: 'temat', few: 'tematy', many: 'tematów', other: 'tematu' },
    pair: { one: 'para', few: 'pary', many: 'par', other: 'pary' },
  },

  months: [
    'styczeń',
    'luty',
    'marzec',
    'kwiecień',
    'maj',
    'czerwiec',
    'lipiec',
    'sierpień',
    'wrzesień',
    'październik',
    'listopad',
    'grudzień',
  ],

  alphabet: 'AĄBCĆDEĘFGHIJKLŁMNŃOÓPRSŚTUWYZŹŻ',

  nav: {
    catalog: 'Katalog',
    index: 'Indeks',
    confuse: 'Łatwo pomylić',
    help: 'Pomoc',
    about: 'O projekcie',
    mainLabel: 'Nawigacja główna',
    mobileLabel: 'Nawigacja mobilna',
    openMenu: 'Otwórz menu',
    closeMenu: 'Zamknij menu',
    search: 'Szukaj',
    skipToContent: 'Przejdź do treści',
  },

  common: {
    home: 'Strona główna',
    breadcrumbsLabel: 'Ścieżka nawigacyjna',
    evidenceScale: 'z 3',
  },

  evidence: {
    filterTitle: 'Poziom dowodów',
    all: 'Wszystkie',
    levels: {
      3: {
        label: 'Mocne podstawy',
        description:
          'Efekt wielokrotnie odtworzony w niezależnych badaniach, ze zgodnymi ' +
          'metaanalizami. Spór dotyczy szczegółów, nie tego, czy zjawisko istnieje.',
      },
      2: {
        label: 'Częściowo potwierdzone',
        description:
          'Dane są, ale niejednorodne: część badań potwierdza efekt, część nie. ' +
          'Granice zjawiska są wciąż doprecyzowywane.',
      },
      1: {
        label: 'Słabe podstawy',
        description:
          'Pojęcie jest popularne, ale rzetelnych potwierdzeń mało albo się nie ' +
          'odtwarzają. Warto używać go ostrożnie.',
      },
    },
  },

  home: {
    titleLead: 'Co naprawdę kryje się za słowami',
    titleTerms: ['introwertyk', 'wypalenie', 'przywiązanie'],
    lead:
      'Przewodnik po psychologii prostym językiem. {concepts} pojęć o ' +
      'charakterze, emocjach, lęku, pamięci, motywacji i zachowaniu w grupach — ' +
      'każde z definicją, przykładem z życia, najczęstszym błędem w użyciu i ' +
      'uczciwą informacją o tym, jak mocna nauka za nim stoi.',
    statsEvidence: 'poziomy dowodów',
    statsPairs: 'które się myli',
    openCatalog: 'Otwórz katalog',
    openIndex: 'Indeks alfabetyczny',
    collectionsTitle: 'Od czego zacząć',
    collectionsSub:
      'Sześć wejść według sytuacji życiowej — jeśli nie wiesz, od czego zacząć, ' +
      'zacznij od tego, co niepokoi cię teraz.',
    categoriesTitle: 'Wszystkie tematy',
    categoriesSub:
      '{concepts} pojęć w {categories} tematach, od cech charakteru po zjawiska ' +
      'społeczne.',
    confusionsTitle: 'Łatwo pomylić',
    confusionsSub:
      'Większość szkód wyrządzanych przez psychologię popularną bierze się nie ' +
      'z nieznajomości terminów, lecz z używania ich z przekonaniem tam, gdzie ' +
      'nie pasują.',
    confusionsMore: 'Wszystkie {count} {pairs}',
    evidenceTitle: 'Dlaczego jest tu ocena',
    evidenceSub:
      'W psychologii popularnej Wielka Piątka i socjonika leżą na tej samej ' +
      'półce, choć za jedną stoją dziesięciolecia pomiarów, a za drugą nic. ' +
      'Każde pojęcie ma tu ocenę siły dowodów.',
  },

  catalog: {
    title: 'Katalog pojęć',
    lead:
      'Wszystkie pojęcia przewodnika. Filtruj według tematu i poziomu dowodów — ' +
      'wybór zostaje w adresie strony, więc linkiem można się podzielić.',
    themes: 'Tematy',
    allThemes: 'Wszystkie tematy',
    reset: 'Wyczyść filtry',
    empty: 'Brak pojęć dla tych filtrów. Spróbuj innego poziomu dowodów.',
  },

  concept: {
    manifestations: 'Jak to się objawia',
    example: 'Przykład z życia',
    mistake: 'Częsty błąd',
    evidence: 'Siła dowodów',
    figures: 'Liczby',
    related: 'Powiązane pojęcia',
    sources: 'Źródła',
    theme: 'Temat',
    updated: 'Zaktualizowano',
    pagerLabel: 'Nawigacja w temacie „{scope}”',
    pagerLabelPlain: 'Nawigacja między pojęciami',
    previous: 'Poprzednie',
    next: 'Następne',
  },

  collection: {
    kicker: 'Od czego zacząć',
    conceptsHeading: 'Pojęcia w tym zestawie',
  },

  index: {
    title: 'Indeks alfabetyczny',
    lead: 'Wszystkie {count} według nazwy. Jeśli wiesz, czego szukasz, to najkrótsza droga.',
    alphabetLabel: 'Przejdź do litery',
  },

  confuse: {
    title: 'Co się z czym myli',
    lead:
      '{count} pojęć, które w mowie potocznej zlały się w jedno. Różnica między ' +
      'nimi jest przede wszystkim praktyczna: od niej zależy, co w ogóle można z ' +
      'danym stanem zrobić.',
    versus: 'kontra',
    readMore: 'Czytaj szerzej',
  },

  help: {
    title: 'Kiedy potrzebna jest pomoc',
    lead:
      'Przewodnik wyjaśnia pojęcia, ale nie towarzyszy ci w nich. Tu są drogowskazy, po ' +
      'których widać, że samodzielne rozkładanie tego na części już nie wystarcza.',
    crisisLabel: 'Jeśli stan jest ostry',
    crisisTitle: 'Nie zostawaj z tym sam',
    crisisText:
      'Jeśli pojawiają się myśli o samobójstwie, jesteś w niebezpieczeństwie ' +
      'albo ktoś obok jest w takim stanie — zadzwoń. To bezpłatne i anonimowe, ' +
      'a powód nigdy nie jest „zbyt błahy”.',
    emergency:
      'Jeśli istnieje bezpośrednie zagrożenie życia — {ambulance} (pogotowie) ' +
      'lub {emergency}.',
    emergencyAmbulance: '999',
    emergencyGeneral: '112',
    cardsTitle: 'Drogowskazy',
    relatedTitle: 'Na razie można poczytać',
    relatedLead:
      'Pojęcia, które najczęściej stoją za takimi stanami. To nie zastępuje ' +
      'pomocy — raczej słownik, żeby było czym nazwać to, co się dzieje.',
    /**
     * Polskie linie wsparcia: wersja polska nie może odsyłać do numerów
     * ukraińskich, bo z Polski one nie działają.
     */
    hotlines: [
      {
        phone: '800 70 2222',
        href: 'tel:800702222',
        name: 'Centrum Wsparcia dla Osób Dorosłych w Kryzysie Psychicznym',
        note: 'Całodobowo, bezpłatnie · Fundacja ITAKA',
      },
      {
        phone: '800 12 00 02',
        href: 'tel:800120002',
        name: 'Niebieska Linia — pogotowie dla osób doznających przemocy domowej',
        note: 'Całodobowo, bezpłatnie',
      },
    ],
  },

  about: {
    title: 'O projekcie',
    lead:
      'mindterms to przewodnik po psychologii. Wyjaśnia terminy, które ' +
      'rozeszły się z tekstów popularnych, i pokazuje, na ile każdy z nich ' +
      'opiera się na badaniach.',
    sourcesTitle: 'Skąd pochodzi informacja',
    sourcesProse: [
      'Podstawą każdego artykułu są źródła pierwotne: oryginalne publikacje ' +
        'autorów pojęcia, metaanalizy i przeglądy, a także wydawnictwa ' +
        'referencyjne w rodzaju APA Dictionary of Psychology. Odnośniki stoją ' +
        'pod każdym pojęciem i prowadzą do konkretnej pracy, a nie do streszczenia ' +
        'na blogu.',
      'Tam, gdzie źródła są ze sobą sprzeczne, pierwszeństwo mają metaanalizy i ' +
        'replikacje, a nie pojedynczy głośny eksperyment. Jeśli duży efekt znany ' +
        'jest głównie z jednego laboratorium i nie odtworzył się w niezależnych ' +
        'próbach, jest to w tekście powiedziane wprost.',
      'Polska terminologia psychologiczna wciąż nie jest ustalona, dlatego ' +
        'obok nazwy zawsze stoi oryginalny termin angielski — to po nim szuka ' +
        'się dalej.',
    ],
    scaleTitle: 'Po co skala dowodów',
    scaleProse: [
      'Teksty popularne podają wszystkie pojęcia z jednakową pewnością: i to ' +
        'odtworzone w setkach badań, i to, które narodziło się na szkoleniu ' +
        'korporacyjnym. Czytelnik nie ma jak ich odróżnić — a różnica jest ogromna.',
      'Dlatego każde pojęcie ma ocenę od 1 do 3. To nie ocena „przydatności” i ' +
        'nie wyrok: poziom 1 nie znaczy „bzdura”, tylko „danych jest mało, ' +
        'ostrożnie z wnioskami”.',
    ],
    absentTitle: 'Czego tu nie ma',
    absentProse: [
      {
        lead: 'Testów i kwestionariuszy.',
        text:
          ' Internetowy test „poznaj swój typ” daje poczucie odpowiedzi, ale nie ' +
          'daje informacji: rzetelne narzędzia działają w rękach specjalisty i w ' +
          'kontekście, a nie jako rozrywka między sprawami.',
      },
      {
        lead: 'Diagnoz.',
        text:
          ' Opisane są tu pojęcia, a nie kryteria zaburzeń. Zgodność objawów z ' +
          'tekstem artykułu niczego nie ustala — ani dla ciebie, ani dla osoby, ' +
          'o której myślisz podczas czytania.',
      },
      {
        lead: 'Porad „jak naprawić człowieka”.',
        text: ' Zrozumienie terminu nie czyni nikogo terapeutą — ani cudzym, ani własnym.',
      },
      {
        lead: 'I technicznie:',
        text:
          ' strona nie zbiera żadnych danych, nie ma analityki z ciasteczkami ' +
          'ani formularzy rejestracji. To statyczne strony z tekstu w repozytorium.',
      },
    ],
    limitsTitle: 'Ograniczenia projektu',
    limitations: [
      {
        title: 'Brak recenzji specjalisty',
        text:
          'Teksty napisała jedna osoba na podstawie źródeł pierwotnych. Nie ' +
          'przeglądał ich praktykujący psycholog ani naukowiec, więc błędy ' +
          'interpretacji są możliwe — najbardziej prawdopodobne tam, gdzie ' +
          'źródło jest złożone, a sformułowanie proste.',
      },
      {
        title: 'Tłumaczenie także bez recenzji',
        text:
          'Wersja angielska i polska to maszynowe tłumaczenie ukraińskiej, ' +
          'przejrzane, ale nie sprawdzone przez zawodowego tłumacza ani ' +
          'psychologa pracującego w języku docelowym. Terminologia może się ' +
          'różnić od przyjętej w tych krajach.',
      },
      {
        title: 'Przeważają próby zachodnie',
        text:
          'Większość badań, na których opierają się artykuły, przeprowadzono w ' +
          'USA i Europie Zachodniej na studentach. To, na ile wnioski przenoszą ' +
          'się na inne populacje, w większości przypadków po prostu nie zostało ' +
          'sprawdzone.',
      },
      {
        title: 'Nauka się zmienia',
        text:
          'Ocena dowodów opisuje stan na moment pisania. Kryzys ' +
          'odtwarzalności ostatnich lat obniżył już status kilku niegdyś ' +
          'podręcznikowych efektów — i ten proces się nie skończył.',
      },
    ],
    bibliographyTitle: 'Bibliografia ogólna',
    bibliographyNote:
      'Prace, na których opiera się przewodnik jako całość. Źródła ' +
      'poszczególnych pojęć są na końcu każdego artykułu.',
    resourcesLead: 'Zasoby referencyjne:',
    resourcesApa:
      ' — bezpłatny słownik Amerykańskiego Towarzystwa Psychologicznego, ponad ' +
      '25 000 terminów. ',
    resourcesWho: ' — klasyfikacje i definicje WHO.',
    nextTitle: 'Dalej',
    nextNote: 'Od czego zacząć czytanie przewodnika.',
    version: 'Wersja treści {version} · zaktualizowano {updated}',
  },

  search: {
    title: 'Szukaj',
    lead: 'Przeszukuje nazwy, terminy oryginalne, definicje i tekst artykułów.',
    placeholder: 'Szukaj: przywiązanie, narcyzm, wypalenie…',
    inputLabel: 'Szukaj w przewodniku',
    submit: 'Znajdź',
    hint: 'Przeszukuje nazwy, definicje i tekst artykułów. Minimum {min} znaki, Esc — wyczyść.',
    tooShortBefore: 'Wpisz co najmniej dwa znaki. Jeśli nie wiesz, czego szukać, ',
    tooShortLink: 'indeks alfabetyczny',
    tooShortAfter: ' pokazuje wszystkie pojęcia naraz.',
    emptyText:
      'Nic nie znaleziono dla „{query}”. Spróbuj innej formy słowa — ' +
      'wyszukiwarka szuka dokładnego dopasowania, nie rdzenia.',
    emptyLink: 'Otwórz indeks',
    count:
      '{count}. Najpierw trafienia w nazwie, potem w definicjach i tekście artykułów.',
  },

  notFound: {
    title: 'Nie ma takiej strony',
    lead:
      'Link mógł się zdezaktualizować albo w adresie jest literówka. Pojęcia ' +
      'nigdzie nie zniknęły — można je znaleźć przez katalog lub indeks.',
    openCatalog: 'Otwórz katalog',
    openSearch: 'Szukaj w przewodniku',
    metaTitle: 'Nie znaleziono strony',
  },

  disclaimer: {
    bannerLead: 'Materiał edukacyjny.',
    bannerText:
      ' mindterms wyjaśnia pojęcia, ale nie stawia diagnoz i nie zastępuje ' +
      'konsultacji ze specjalistą.',
    blockTitle: 'To nie jest diagnoza',
    blockText: [
      'Opis pojęcia służy zrozumieniu, a nie stawianiu diagnozy sobie lub komuś ' +
        'innemu. Zgodność kilku objawów niczego nie dowodzi: to samo objawia się ' +
        'inaczej u różnych osób i w różnych okolicznościach.',
      'Jeśli stan przeszkadza w życiu — w spaniu, w pracy, w relacjach — warto o ' +
        'tym porozmawiać ze specjalistą: psychologiem, psychoterapeutą lub lekarzem.',
    ],
  },

  footer: {
    themes: 'Tematy',
    sections: 'Działy',
    meta: '{site} · dane zaktualizowano {updated} · wersja treści {version}',
  },

  metadata: {
    catalog: 'Wszystkie 48 pojęć przewodnika z filtrami według tematu i poziomu dowodów.',
    index: 'Wszystkie pojęcia mindterms według nazwy, pogrupowane literami.',
    confuse:
      'Pary pojęć psychologicznych, które w mowie potocznej zlały się w jedno, ' +
      'i praktyczna różnica między nimi.',
    help:
      'Drogowskazy, po których widać, że warto zwrócić się do specjalisty, oraz ' +
      'polskie linie wsparcia.',
    about:
      'Podejście redakcyjne mindterms: skąd pochodzi informacja, po co skala ' +
      'dowodów i jakie ograniczenia ma projekt.',
    search: 'Szukaj nazw, definicji i tekstu artykułów w przewodniku mindterms.',
    conceptNotFound: 'Nie znaleziono pojęcia',
    collectionNotFound: 'Nie znaleziono zestawu',
  },
};
