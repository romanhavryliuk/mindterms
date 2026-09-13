import Link from 'next/link';

import { format, localePath, type Locale, type Messages } from '@/i18n';
import { getCategoriesWithCounts, getMeta } from '@/services/contentService';
import { FILTER_PARAM_CATEGORY, NAV_ITEMS, SITE_NAME } from '@/utils/constants';

import css from './Footer.module.css';

type FooterProps = {
  locale: Locale;
  messages: Messages;
};

export const Footer = ({ locale, messages }: FooterProps) => {
  const categories = getCategoriesWithCounts(locale);
  const meta = getMeta(locale);

  return (
    <footer className={css.footer}>
      <div className={css.inner}>
        <div className={css.column}>
          <h2 className={css.columnTitle}>{messages.footer.themes}</h2>
          <ul className={css.themes}>
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  className={css.link}
                  href={`${localePath('/catalog', locale)}?${FILTER_PARAM_CATEGORY}=${category.id}`}
                >
                  {category.name}
                  <span className={css.count}>{category.conceptCount}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={css.column}>
          <h2 className={css.columnTitle}>{messages.footer.sections}</h2>
          <ul className={css.sections}>
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link className={css.link} href={localePath(item.href, locale)}>
                  {messages.nav[item.key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={css.bottom}>
        <p className={css.disclaimer}>{meta.note}</p>
        <p className={css.meta}>
          {format(messages.footer.meta, {
            site: SITE_NAME,
            updated: meta.updated,
            version: meta.version,
          })}
        </p>
      </div>
    </footer>
  );
};
