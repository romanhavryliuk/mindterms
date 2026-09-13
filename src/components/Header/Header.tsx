'use client';

import clsx from 'clsx';
import { useEffect, useId, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { SearchBox } from '@/components/SearchBox';
import { localePath, type Locale, type Messages } from '@/i18n';
import { NAV_ITEMS, SEARCH_PARAM_QUERY, SEARCH_PATH, SITE_NAME } from '@/utils/constants';

import css from './Header.module.css';

type HeaderProps = {
  locale: Locale;
  messages: Messages;
};

export const Header = ({ locale, messages }: HeaderProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const searchId = useId();

  // Будь-яка навігація закриває і меню, і пошук
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const handleSearch = (query: string) => {
    const trimmed = query.trim();
    if (trimmed === '') return;

    router.push(
      `${localePath(SEARCH_PATH, locale)}?${SEARCH_PARAM_QUERY}=${encodeURIComponent(trimmed)}`
    );
  };

  return (
    <header className={css.header}>
      <div className={css.bar}>
        <Link className={css.logo} href={localePath('/', locale)}>
          {SITE_NAME}
        </Link>

        <nav className={css.nav} aria-label={messages.nav.mainLabel}>
          <ul className={css.navList}>
            {NAV_ITEMS.map((item) => {
              const href = localePath(item.href, locale);
              const isActive = pathname === href;

              return (
                <li key={item.href}>
                  <Link
                    className={css.navLink}
                    href={href}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {messages.nav[item.key]}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={css.actions}>
          <LocaleSwitcher locale={locale} label={messages.locale.switcherLabel} />

          <button
            type="button"
            className={css.iconButton}
            aria-expanded={isSearchOpen}
            aria-controls={searchId}
            onClick={() => setSearchOpen((open) => !open)}
          >
            <span aria-hidden="true">⌕</span>
            <span className={css.iconLabel}>{messages.nav.search}</span>
          </button>

          <button
            type="button"
            className={clsx(css.iconButton, css.menuButton)}
            aria-expanded={isMenuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span aria-hidden="true">{isMenuOpen ? '✕' : '☰'}</span>
            <span className={css.visuallyHidden}>
              {isMenuOpen ? messages.nav.closeMenu : messages.nav.openMenu}
            </span>
          </button>
        </div>
      </div>

      {isSearchOpen && (
        <div className={css.searchPanel} id={searchId}>
          <SearchBox value="" messages={messages} onSubmit={handleSearch} autoFocus />
        </div>
      )}

      {isMenuOpen && (
        <nav className={css.mobileNav} aria-label={messages.nav.mobileLabel}>
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link className={css.mobileLink} href={localePath(item.href, locale)}>
                  {messages.nav[item.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};
