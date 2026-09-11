import type { CSSProperties } from 'react';
import Link from 'next/link';

import type { CategoryWithCount } from '@/services/contentService';
import { FILTER_PARAM_CATEGORY, localePath } from '@/utils/constants';
import { CONCEPT_FORMS, formatCount } from '@/utils/formatters';

import css from './CategoryCard.module.css';

type CategoryCardProps = {
  category: CategoryWithCount;
};

export const CategoryCard = ({ category }: CategoryCardProps) => {
  const accentStyle = { '--accent': `var(--c-${category.color})` } as CSSProperties;
  const href = `${localePath('/catalog')}?${FILTER_PARAM_CATEGORY}=${category.id}`;

  return (
    <article className={css.card} style={accentStyle}>
      <h3 className={css.title}>
        <Link className={css.link} href={href}>
          {category.name}
        </Link>
      </h3>
      <p className={css.sub}>{category.sub}</p>
      <p className={css.count}>{formatCount(category.conceptCount, CONCEPT_FORMS)}</p>
    </article>
  );
};
