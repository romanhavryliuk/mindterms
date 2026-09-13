import clsx from 'clsx';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CollectionCard } from '@/components/CollectionCard';
import { Disclaimer } from '@/components/Disclaimer';
import { format, localePath, type Locale, type Messages } from '@/i18n';
import { getAllCollections, getBibliography, getMeta } from '@/services/contentService';
import { EVIDENCE_LEVELS } from '@/utils/constants';

import css from './AboutPage.module.css';

type AboutPageProps = {
  locale: Locale;
  messages: Messages;
};

export const AboutPage = ({ locale, messages }: AboutPageProps) => {
  const meta = getMeta(locale);
  const bibliography = getBibliography(locale);
  const collections = getAllCollections(locale);
  const { about } = messages;

  return (
    <div className={css.page}>
      <Breadcrumbs
        messages={messages}
        items={[
          { label: messages.common.home, href: localePath('/', locale) },
          { label: messages.nav.about },
        ]}
      />

      <header className={css.header}>
        <h1 className={css.title}>{about.title}</h1>
        <p className={css.lead}>{about.lead}</p>
      </header>

      <section className={css.section} aria-labelledby="sources-title">
        <h2 id="sources-title" className={css.sectionTitle}>
          {about.sourcesTitle}
        </h2>
        <div className={css.prose}>
          {about.sourcesProse.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className={css.section} aria-labelledby="scale-title">
        <h2 id="scale-title" className={css.sectionTitle}>
          {about.scaleTitle}
        </h2>
        <div className={css.prose}>
          {about.scaleProse.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <ul className={css.scale}>
          {EVIDENCE_LEVELS.map((level) => (
            <li key={level} className={clsx(css.scaleItem, css[`level${level}`])}>
              <p className={css.scaleHead}>
                <span className={css.scaleNumber}>{level}</span>
                <span className={css.scaleName}>
                  {messages.evidence.levels[level].label}
                </span>
              </p>
              <p className={css.scaleText}>
                {messages.evidence.levels[level].description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className={css.section} aria-labelledby="absent-title">
        <h2 id="absent-title" className={css.sectionTitle}>
          {about.absentTitle}
        </h2>
        <div className={css.prose}>
          {about.absentProse.map((item) => (
            <p key={item.lead}>
              <strong>{item.lead}</strong>
              {item.text}
            </p>
          ))}
        </div>
      </section>

      <section className={css.section} aria-labelledby="limits-title">
        <h2 id="limits-title" className={css.sectionTitle}>
          {about.limitsTitle}
        </h2>

        <ul className={css.limitations}>
          {about.limitations.map((limitation) => (
            <li key={limitation.title} className={css.limitation}>
              <h3 className={css.limitationTitle}>{limitation.title}</h3>
              <p className={css.limitationText}>{limitation.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={css.section} aria-labelledby="bibliography-title">
        <h2 id="bibliography-title" className={css.sectionTitle}>
          {about.bibliographyTitle}
        </h2>
        <p className={css.bibliographyNote}>{about.bibliographyNote}</p>
        <ol className={css.bibliography}>
          {bibliography.map((entry) => (
            <li key={entry} className={css.bibliographyItem}>
              {entry}
            </li>
          ))}
        </ol>

        <p className={css.resources}>
          <strong>{about.resourcesLead}</strong>{' '}
          <a
            className={css.resourceLink}
            href="https://dictionary.apa.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            APA Dictionary of Psychology
          </a>
          {about.resourcesApa}
          <a
            className={css.resourceLink}
            href="https://www.who.int"
            target="_blank"
            rel="noopener noreferrer"
          >
            who.int
          </a>
          {about.resourcesWho}
        </p>
      </section>

      <section className={css.section} aria-labelledby="next-title">
        <h2 id="next-title" className={css.sectionTitle}>
          {about.nextTitle}
        </h2>
        <p className={css.bibliographyNote}>{about.nextNote}</p>

        <ul className={css.collections}>
          {collections.map((collection) => (
            <li key={collection.id}>
              <CollectionCard
                collection={collection}
                locale={locale}
                messages={messages}
              />
            </li>
          ))}
        </ul>
      </section>

      <footer className={css.footer}>
        <p className={css.version}>
          {format(about.version, { version: meta.version, updated: meta.updated })}
        </p>
        <Disclaimer messages={messages} variant="page" />
      </footer>
    </div>
  );
};
