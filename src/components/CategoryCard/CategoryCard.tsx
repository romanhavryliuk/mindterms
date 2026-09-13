import type { CSSProperties } from 'react';
import Link from 'next/link';

import { formatCount, localePath, type Locale, type Messages } from '@/i18n';
import type { CategoryWithCount } from '@/services/contentService';
import { FILTER_PARAM_CATEGORY } from '@/utils/constants';

import css from './CategoryCard.module.css';

type CategoryCardProps = {
  category: CategoryWithCount;
  locale: Locale;
  messages: Messages;
};

export const CategoryCard = ({ category, locale, messages }: CategoryCardProps) => {
  const accentStyle = { '--accent': `var(--c-${category.color})` } as CSSProperties;
  const href = `${localePath('/catalog', locale)}?${FILTER_PARAM_CATEGORY}=${category.id}`;

  return (
    <article className={css.card} style={accentStyle}>
      <h3 className={css.title}>
        <Link className={css.link} href={href}>
          {category.name}
        </Link>
      </h3>
      <p className={css.sub}>{category.sub}</p>
      <p className={css.count}>
        {formatCount(category.conceptCount, messages.plural.concept, locale)}
      </p>
    </article>
  );
};
