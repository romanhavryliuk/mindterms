import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ConceptCard } from '@/components/ConceptCard';
import { localePath, type Locale, type Messages } from '@/i18n';
import {
  getAllHelpCards,
  getCategoryMap,
  getConceptsByIds,
} from '@/services/contentService';
import { renderInlineMarkup } from '@/utils/richText';

import css from './HelpPage.module.css';

/** Поняття, які найчастіше стоять за станами з цього розділу */
const RELATED_CONCEPT_IDS = [
  'burnout',
  'anxiety_fear',
  'avoidance',
  'learned',
  'regul',
  'fff',
];

type HelpPageProps = {
  locale: Locale;
  messages: Messages;
};

/**
 * Підставляє номери екстрених служб у шаблон, виділяючи їх напівжирним.
 * Якщо в мові номерів немає — англійська версія не прив'язана до країни —
 * шаблон просто не містить підстановок, і речення виводиться як є.
 */
function renderEmergency(template: string, numbers: Record<string, string>) {
  return template.split(/(\{\w+\})/).map((part, index) => {
    const key = part.match(/^\{(\w+)\}$/)?.[1];

    if (key === undefined) return part;
    return <strong key={`${key}-${index}`}>{numbers[key]}</strong>;
  });
}

export const HelpPage = ({ locale, messages }: HelpPageProps) => {
  const cards = getAllHelpCards(locale);
  const related = getConceptsByIds(locale, RELATED_CONCEPT_IDS);
  const categoryById = getCategoryMap(locale);

  // Лінії підтримки прив'язані до країни, тож беруться цілком із каталогу мови.
  // В англійській версії їх немає: читач може бути в будь-якій країні.
  const { hotlines } = messages.help;

  return (
    <div className={css.page}>
      <Breadcrumbs
        messages={messages}
        items={[
          { label: messages.common.home, href: localePath('/', locale) },
          { label: messages.nav.help },
        ]}
      />

      <header className={css.header}>
        <h1 className={css.title}>{messages.help.title}</h1>
        <p className={css.lead}>{messages.help.lead}</p>
      </header>

      {/* Блок про гострий стан іде першим: у кризі ніхто не гортає сторінку */}
      <section className={css.crisis} aria-labelledby="crisis-title">
        <p className={css.crisisLabel}>{messages.help.crisisLabel}</p>
        <h2 id="crisis-title" className={css.crisisTitle}>
          {messages.help.crisisTitle}
        </h2>
        <p className={css.crisisText}>{messages.help.crisisText}</p>

        {hotlines.length > 0 && (
          <ul className={css.hotlines}>
            {hotlines.map((hotline) => (
              <li key={hotline.phone} className={css.hotline}>
                <a className={css.phone} href={hotline.href}>
                  {hotline.phone}
                </a>
                <p className={css.hotlineName}>{hotline.name}</p>
                <p className={css.hotlineNote}>{hotline.note}</p>
              </li>
            ))}
          </ul>
        )}

        <p className={css.emergency}>
          {renderEmergency(messages.help.emergency, {
            ambulance: messages.help.emergencyAmbulance,
            emergency: messages.help.emergencyGeneral,
          })}
        </p>
      </section>

      <section className={css.section} aria-labelledby="cards-title">
        <h2 id="cards-title" className={css.sectionTitle}>
          {messages.help.cardsTitle}
        </h2>

        <ul className={css.cards}>
          {cards.map((card) => (
            <li key={card.title} className={css.card}>
              <h3 className={css.cardTitle}>{card.title}</h3>
              <ul className={css.points}>
                {card.points.map((point) => (
                  <li key={point} className={css.point}>
                    {renderInlineMarkup(point)}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section className={css.section} aria-labelledby="related-title">
        <h2 id="related-title" className={css.sectionTitle}>
          {messages.help.relatedTitle}
        </h2>
        <p className={css.sectionLead}>{messages.help.relatedLead}</p>

        <ul className={css.related}>
          {related.map((concept) => {
            const category = categoryById.get(concept.category);

            return (
              <li key={concept.id}>
                <ConceptCard
                  concept={concept}
                  locale={locale}
                  messages={messages}
                  color={category?.color}
                  categoryName={category?.name}
                />
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};
