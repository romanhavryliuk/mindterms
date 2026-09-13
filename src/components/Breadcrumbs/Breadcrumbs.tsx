import Link from 'next/link';

import type { Messages } from '@/i18n';
import { SITE_URL } from '@/utils/constants';

import css from './Breadcrumbs.module.css';

export type Crumb = {
  label: string;
  /** Останню крихту лишаємо без href — це поточна сторінка */
  href?: string;
};

type BreadcrumbsProps = {
  items: Crumb[];
  messages: Messages;
};

/** Schema.org BreadcrumbList — щоб пошук показував шлях під посиланням */
function buildJsonLd(items: Crumb[]): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href === undefined ? {} : { item: `${SITE_URL}${item.href}` }),
    })),
  });
}

export const Breadcrumbs = ({ items, messages }: BreadcrumbsProps) => (
  <nav className={css.nav} aria-label={messages.common.breadcrumbsLabel}>
    <ol className={css.list}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <li key={item.label} className={css.item}>
            {item.href === undefined || isLast ? (
              <span className={css.current} aria-current={isLast ? 'page' : undefined}>
                {item.label}
              </span>
            ) : (
              <Link className={css.link} href={item.href}>
                {item.label}
              </Link>
            )}
            {!isLast && (
              <span className={css.separator} aria-hidden="true">
                /
              </span>
            )}
          </li>
        );
      })}
    </ol>

    <script
      type="application/ld+json"
      // Рядок зібраний із власного контенту через JSON.stringify
      dangerouslySetInnerHTML={{ __html: buildJsonLd(items) }}
    />
  </nav>
);
