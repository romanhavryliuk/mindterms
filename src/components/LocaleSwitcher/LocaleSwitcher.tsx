'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

import { getMessages, isLocale, LOCALES, type Locale } from '@/i18n';

import css from './LocaleSwitcher.module.css';

type LocaleSwitcherProps = {
  locale: Locale;
  label: string;
};

type LocaleLinksProps = LocaleSwitcherProps & {
  search: string;
};

/**
 * Слаги понять і добірок однакові в усіх мовах, тому перемкнути мову —
 * це підмінити перший сегмент шляху. Користувач лишається на тій самій сторінці.
 */
function swapLocale(pathname: string, next: Locale): string {
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length > 0 && isLocale(segments[0] ?? '')) {
    segments[0] = next;
    return `/${segments.join('/')}`;
  }

  return `/${next}`;
}

const LocaleLinks = ({ locale, label, search }: LocaleLinksProps) => {
  const pathname = usePathname();

  return (
    <nav className={css.switcher} aria-label={label}>
      <ul className={css.list}>
        {LOCALES.map((item) => {
          const isCurrent = item === locale;

          return (
            <li key={item}>
              <Link
                className={clsx(css.option, isCurrent && css.current)}
                href={`${swapLocale(pathname, item)}${search}`}
                hrefLang={item}
                aria-current={isCurrent ? 'true' : undefined}
                title={getMessages(item).locale.name}
              >
                {getMessages(item).locale.short}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

/** Переносить фільтри каталогу в іншу мову: /uk/catalog?evidence=3 → /en/catalog?evidence=3 */
const LocaleLinksWithSearch = (props: LocaleSwitcherProps) => {
  const search = useSearchParams().toString();

  return <LocaleLinks {...props} search={search === '' ? '' : `?${search}`} />;
};

/**
 * useSearchParams відмикає прередер у найближчій межі Suspense, а перемикач
 * стоїть у шапці кожної сторінки. Тому хук живе за власною межею: у статичний
 * HTML потрапляють посилання без запиту, а після гідратації вони добирають
 * фільтри. Без цього прередер втратили б усі сторінки одразу.
 */
export const LocaleSwitcher = (props: LocaleSwitcherProps) => (
  <Suspense fallback={<LocaleLinks {...props} search="" />}>
    <LocaleLinksWithSearch {...props} />
  </Suspense>
);
