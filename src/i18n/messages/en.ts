import type { Messages } from './uk';

export const en: Messages = {
  locale: {
    name: 'English',
    short: 'EN',
    switcherLabel: 'Interface language',
  },

  site: {
    tagline: 'terms about the mind',
    description:
      'A psychology reference in plain language: 48 concepts with a definition, ' +
      'an example, the most common misuse and an evidence rating.',
  },

  plural: {
    concept: { one: 'concept', few: 'concepts', many: 'concepts', other: 'concepts' },
    category: { one: 'topic', few: 'topics', many: 'topics', other: 'topics' },
    pair: { one: 'pair', few: 'pairs', many: 'pairs', other: 'pairs' },
  },

  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],

  alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',

  nav: {
    catalog: 'Catalogue',
    index: 'Index',
    confuse: 'Easily confused',
    help: 'Getting help',
    about: 'About',
    mainLabel: 'Main navigation',
    mobileLabel: 'Mobile navigation',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    search: 'Search',
    skipToContent: 'Skip to content',
  },

  common: {
    home: 'Home',
    breadcrumbsLabel: 'Breadcrumbs',
    evidenceScale: 'of 3',
  },

  evidence: {
    filterTitle: 'Evidence level',
    all: 'All',
    levels: {
      3: {
        label: 'Solid ground',
        description:
          'The effect has been replicated many times in independent studies and ' +
          'has consistent meta-analyses. The arguments are about details, not ' +
          'about whether it exists.',
      },
      2: {
        label: 'Partly supported',
        description:
          'There is evidence, but it is mixed: some studies find the effect, ' +
          'others do not. The boundaries of the phenomenon are still being ' +
          'worked out.',
      },
      1: {
        label: 'Weak ground',
        description:
          'The concept is popular, but rigorous support is scarce or fails to ' +
          'replicate. Worth using with care.',
      },
    },
  },

  home: {
    titleLead: 'What actually sits behind the words',
    titleTerms: ['introvert', 'burnout', 'attachment'],
    lead:
      'A psychology reference in plain language. {concepts} concepts about ' +
      'character, emotion, anxiety, memory, motivation and behaviour in groups — ' +
      'each with a definition, an example from life, the most common misuse and ' +
      'an honest note on how solid the science behind it really is.',
    statsEvidence: 'evidence levels',
    statsPairs: 'commonly confused',
    openCatalog: 'Open the catalogue',
    openIndex: 'Alphabetical index',
    collectionsTitle: 'Where to start',
    collectionsSub:
      'Six ways in, by life situation — if you do not know where to begin, ' +
      'start from whatever is troubling you right now.',
    categoriesTitle: 'All topics',
    categoriesSub:
      '{concepts} concepts across {categories} topics, from character traits to ' +
      'social phenomena.',
    confusionsTitle: 'Easily confused',
    confusionsSub:
      'Most of the harm popular psychology does comes not from not knowing the ' +
      'terms, but from using them confidently for the wrong thing.',
    confusionsMore: 'All {count} {pairs}',
    evidenceTitle: 'Why there is a rating here',
    evidenceSub:
      'In popular psychology the Big Five and socionics sit on the same shelf, ' +
      'even though one has decades of measurement behind it and the other has ' +
      'nothing. Every concept here carries an evidence rating.',
  },

  catalog: {
    title: 'Catalogue of concepts',
    lead:
      'Every concept in the reference. Filter by topic and evidence level — the ' +
      'selection stays in the page address, so the link can be shared.',
    themes: 'Topics',
    allThemes: 'All topics',
    reset: 'Clear filters',
    empty: 'No concepts match these filters. Try a different evidence level.',
  },

  concept: {
    manifestations: 'How it shows up',
    example: 'An example from life',
    mistake: 'Common mistake',
    evidence: 'Evidence',
    figures: 'Numbers',
    related: 'Related concepts',
    sources: 'Sources',
    theme: 'Topic',
    updated: 'Updated',
    pagerLabel: 'Navigation within “{scope}”',
    pagerLabelPlain: 'Navigation between concepts',
    previous: 'Previous',
    next: 'Next',
  },

  collection: {
    kicker: 'Where to start',
    conceptsHeading: 'Concepts in this collection',
  },

  index: {
    title: 'Alphabetical index',
    lead: 'All {count} by name. If you know what you are looking for, this is the shortest route.',
    alphabetLabel: 'Jump to letter',
  },

  confuse: {
    title: 'What gets mixed up with what',
    lead:
      '{count} of concepts that everyday language has fused into one. The ' +
      'difference between them is mostly practical: it decides what can be done ' +
      'about the state at all.',
    versus: 'versus',
    readMore: 'Read in full',
  },

  help: {
    title: 'When you need help',
    lead:
      'The reference explains concepts; it does not walk alongside you. Here are ' +
      'the signs that working it out alone is no longer enough.',
    crisisLabel: 'If the state is acute',
    crisisTitle: 'Do not stay alone with this',
    crisisText:
      'If you are having thoughts of suicide right now, you are in danger, or ' +
      'someone near you is in that state — do not stay with it alone. Nearly ' +
      'every country has a crisis line that is free, confidential and open ' +
      'round the clock: look up the one for the country you are in and call ' +
      'it. It is not “too small a reason”.',
    emergency:
      'If there is an immediate threat to life, call the emergency number of ' +
      'the country you are in, or go to the nearest emergency department.',
    emergencyAmbulance: '',
    emergencyGeneral: '',
    cardsTitle: 'Signs to go by',
    relatedTitle: 'Something to read meanwhile',
    relatedLead:
      'The concepts that most often sit behind states like these. This is not a ' +
      'replacement for help — more a vocabulary, so there is a name for what is ' +
      'happening.',
    /**
     * Англійською читають у десятках країн, тому конкретних номерів тут
     * немає: будь-який із них був би правильним для когось одного й марним
     * для решти. Замість списку — вказівка знайти лінію своєї країни.
     */
    hotlines: [],
  },

  about: {
    title: 'About the project',
    lead:
      'mindterms is a psychology reference. It explains the terms that have ' +
      'spread out of popular writing, and shows how far each of them rests on ' +
      'actual research.',
    sourcesTitle: 'Where the information comes from',
    sourcesProse: [
      'Each article is built on primary sources: the original publications by ' +
        'the authors of a concept, meta-analyses and reviews, plus reference ' +
        'works such as the APA Dictionary of Psychology. The links sit under ' +
        'every concept, and they lead to the specific work rather than to a ' +
        'blog retelling.',
      'Where sources contradict each other, priority goes to meta-analyses and ' +
        'replications rather than to a single loud experiment. If a large effect ' +
        'is known mostly from one laboratory and has not replicated ' +
        'independently, the article says so outright.',
      'Psychological terminology has not settled the same way in every language, ' +
        'so the original English term always sits next to the name — it is what ' +
        'you search by to go further.',
    ],
    scaleTitle: 'Why an evidence scale',
    scaleProse: [
      'Popular writing presents every concept with the same confidence: both ' +
        'the one replicated in hundreds of studies and the one born in a ' +
        'corporate training. The reader has no way to tell them apart — and the ' +
        'difference is enormous.',
      'So every concept carries a rating from 1 to 3. It is not a judgement of ' +
        '“usefulness” and not a verdict: level 1 does not mean “nonsense”, it ' +
        'means “there is little data, be careful with conclusions”.',
    ],
    absentTitle: 'What is not here',
    absentProse: [
      {
        lead: 'Tests and questionnaires.',
        text:
          ' An online “find out your type” test gives the feeling of an answer ' +
          'without the information: valid instruments work in a professional’s ' +
          'hands and in context, not as entertainment between tasks.',
      },
      {
        lead: 'Diagnoses.',
        text:
          ' What is described here are concepts, not criteria for disorders. ' +
          'Signs matching the text of an article establish nothing — neither for ' +
          'you, nor for the person you are thinking about while reading.',
      },
      {
        lead: 'Advice on “how to fix a person”.',
        text:
          ' Understanding a term makes nobody a therapist — not someone else’s, ' +
          'and not their own.',
      },
      {
        lead: 'And technically:',
        text:
          ' the site collects no data, runs no cookie analytics and has no sign-up ' +
          'forms. These are static pages built from text in a repository.',
      },
    ],
    limitsTitle: 'Limits of the project',
    limitations: [
      {
        title: 'No professional review',
        text:
          'The texts were written by one person from primary sources. No ' +
          'practising psychologist or researcher has reviewed them, so errors of ' +
          'interpretation are possible — and most likely where the source is ' +
          'complex and the wording is simple.',
      },
      {
        title: 'The translation is unreviewed too',
        text:
          'The English and Polish versions are machine translations of the ' +
          'Ukrainian, proofread but not checked by a professional translator or ' +
          'by a psychologist working in the target language. Terminology may ' +
          'differ from what is established in those countries.',
      },
      {
        title: 'Western samples dominate',
        text:
          'Most of the studies the articles rest on were run in the United ' +
          'States and Western Europe on university students. Whether the ' +
          'conclusions carry over to other populations is, in most cases, simply ' +
          'something nobody has checked.',
      },
      {
        title: 'Science changes',
        text:
          'An evidence rating describes the state of things at the time of ' +
          'writing. The replication crisis of recent years has already demoted ' +
          'several once-textbook effects — and that process is not finished.',
      },
    ],
    bibliographyTitle: 'General bibliography',
    bibliographyNote:
      'The works the reference rests on as a whole. Sources for individual ' +
      'concepts are at the end of each article.',
    resourcesLead: 'Reference resources:',
    resourcesApa:
      ' — the free dictionary of the American Psychological Association, over ' +
      '25,000 terms. ',
    resourcesWho: ' — WHO classifications and definitions.',
    nextTitle: 'Next',
    nextNote: 'Where to start reading the reference.',
    version: 'Content version {version} · updated {updated}',
  },

  search: {
    title: 'Search',
    lead: 'Searches names, original terms, definitions and the text of articles.',
    placeholder: 'Search: attachment, narcissism, burnout…',
    inputLabel: 'Search the reference',
    submit: 'Search',
    hint: 'Searches names, definitions and article text. At least {min} characters, Esc to clear.',
    tooShortBefore:
      'Enter at least two characters. If you do not know what to look for, the ',
    tooShortLink: 'alphabetical index',
    tooShortAfter: ' shows every concept at once.',
    emptyText:
      'Nothing found for “{query}”. Try another form of the word — the search ' +
      'looks for an exact match, not a stem.',
    emptyLink: 'Open the index',
    count: '{count}. Matches in the name first, then in definitions and article text.',
  },

  notFound: {
    title: 'There is no such page',
    lead:
      'The link may be out of date, or there is a typo in the address. The ' +
      'concepts have not gone anywhere — you can find them through the ' +
      'catalogue or the index.',
    openCatalog: 'Open the catalogue',
    openSearch: 'Search the reference',
    metaTitle: 'Page not found',
  },

  disclaimer: {
    bannerLead: 'Educational material.',
    bannerText:
      ' mindterms explains concepts, but does not diagnose and does not replace ' +
      'a consultation with a professional.',
    blockTitle: 'This is not a diagnosis',
    blockText: [
      'A description of a concept is there for understanding, not for diagnosing ' +
        'yourself or anyone else. A handful of matching signs proves nothing: ' +
        'the same thing shows up differently in different people and in ' +
        'different circumstances.',
      'If a state is getting in the way of living — sleeping, working, being in ' +
        'relationships — that is worth talking about with a professional: a ' +
        'psychologist, a psychotherapist or a doctor.',
    ],
  },

  footer: {
    themes: 'Topics',
    sections: 'Sections',
    meta: '{site} · data updated {updated} · content version {version}',
  },

  metadata: {
    catalog: 'All 48 concepts in the reference, filtered by topic and evidence level.',
    index: 'Every concept in mindterms by name, grouped by letter.',
    confuse:
      'Pairs of psychological concepts that everyday language has fused into ' +
      'one, and the practical difference between them.',
    help:
      'Signs that it is worth turning to a professional, and what to do when ' +
      'the state is acute.',
    about:
      'The editorial approach of mindterms: where the information comes from, ' +
      'why there is an evidence scale, and what limits the project has.',
    search: 'Search names, definitions and article text in the mindterms reference.',
    conceptNotFound: 'Concept not found',
    collectionNotFound: 'Collection not found',
  },
};
