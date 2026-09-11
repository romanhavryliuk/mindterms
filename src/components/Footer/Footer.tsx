import Link from 'next/link';

import { getCategoriesWithCounts, getMeta } from '@/services/contentService';
import {
  FILTER_PARAM_CATEGORY,
  localePath,
  NAV_LINKS,
  SITE_NAME,
} from '@/utils/constants';

import css from './Footer.module.css';

export const Footer = () => {
  const categories = getCategoriesWithCounts();
  const meta = getMeta();

  return (
    <footer className={css.footer}>
      <div className={css.inner}>
        <div className={css.column}>
          <h2 className={css.columnTitle}>Теми</h2>
          <ul className={css.themes}>
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  className={css.link}
                  href={`${localePath('/catalog')}?${FILTER_PARAM_CATEGORY}=${category.id}`}
                >
                  {category.name}
                  <span className={css.count}>{category.conceptCount}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={css.column}>
          <h2 className={css.columnTitle}>Розділи</h2>
          <ul className={css.sections}>
            {NAV_LINKS.map((navLink) => (
              <li key={navLink.href}>
                <Link className={css.link} href={localePath(navLink.href)}>
                  {navLink.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={css.bottom}>
        <p className={css.disclaimer}>{meta.note}</p>
        <p className={css.meta}>
          {SITE_NAME} · дані оновлено {meta.updated} · версія контенту {meta.version}
        </p>
      </div>
    </footer>
  );
};
