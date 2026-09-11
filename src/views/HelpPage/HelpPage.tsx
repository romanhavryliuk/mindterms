import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ConceptCard } from '@/components/ConceptCard';
import {
  getAllCategories,
  getAllHelpCards,
  getConceptsByIds,
} from '@/services/contentService';
import { HOTLINES, localePath } from '@/utils/constants';
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

export const HelpPage = () => {
  const cards = getAllHelpCards();
  const related = getConceptsByIds(RELATED_CONCEPT_IDS);
  const categoryById = new Map(
    getAllCategories().map((category) => [category.id, category])
  );

  return (
    <div className={css.page}>
      <Breadcrumbs
        items={[{ label: 'Головна', href: localePath('/') }, { label: 'Допомога' }]}
      />

      <header className={css.header}>
        <h1 className={css.title}>Коли потрібна допомога</h1>
        <p className={css.lead}>
          Довідник пояснює поняття, але не супроводжує. Тут — орієнтири, за якими
          зрозуміло, що саморозбору вже недостатньо.
        </p>
      </header>

      {/* Блок про гострий стан іде першим: у кризі ніхто не гортає сторінку */}
      <section className={css.crisis} aria-labelledby="crisis-title">
        <p className={css.crisisLabel}>Якщо стан гострий</p>
        <h2 id="crisis-title" className={css.crisisTitle}>
          Не залишайтесь із цим наодинці
        </h2>
        <p className={css.crisisText}>
          Якщо зараз є думки про самогубство, ви в небезпеці або поруч людина в такому
          стані — телефонуйте. Це безкоштовно й анонімно, і це не «занадто дрібний
          привід».
        </p>

        <ul className={css.hotlines}>
          {HOTLINES.map((hotline) => (
            <li key={hotline.phone} className={css.hotline}>
              <a className={css.phone} href={hotline.tel}>
                {hotline.phone}
              </a>
              <p className={css.hotlineName}>{hotline.name}</p>
              <p className={css.hotlineNote}>{hotline.note}</p>
            </li>
          ))}
        </ul>

        <p className={css.emergency}>
          Якщо є пряма загроза життю — <strong>103</strong> (швидка) або{' '}
          <strong>112</strong>.
        </p>
      </section>

      <section className={css.section} aria-labelledby="cards-title">
        <h2 id="cards-title" className={css.sectionTitle}>
          Орієнтири
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
          Поки що можна почитати
        </h2>
        <p className={css.sectionLead}>
          Поняття, які найчастіше стоять за такими станами. Це не заміна допомоги — радше
          словник, щоб було чим назвати те, що відбувається.
        </p>

        <ul className={css.related}>
          {related.map((concept) => {
            const category = categoryById.get(concept.category);

            return (
              <li key={concept.id}>
                <ConceptCard
                  concept={concept}
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
