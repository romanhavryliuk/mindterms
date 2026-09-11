'use client';

import clsx from 'clsx';
import { useEffect, useId, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { SearchBox } from '@/components/SearchBox';
import {
  localePath,
  NAV_LINKS,
  SEARCH_PARAM_QUERY,
  SEARCH_PATH,
  SITE_NAME,
} from '@/utils/constants';

import css from './Header.module.css';

export const Header = () => {
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
      `${localePath(SEARCH_PATH)}?${SEARCH_PARAM_QUERY}=${encodeURIComponent(trimmed)}`
    );
  };

  return (
    <header className={css.header}>
      <div className={css.bar}>
        <Link className={css.logo} href={localePath('/')}>
          {SITE_NAME}
        </Link>

        <nav className={css.nav} aria-label="Основна навігація">
          <ul className={css.navList}>
            {NAV_LINKS.map((link) => {
              const href = localePath(link.href);
              const isActive = pathname === href;

              return (
                <li key={link.href}>
                  <Link
                    className={css.navLink}
                    href={href}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={css.actions}>
          <button
            type="button"
            className={css.iconButton}
            aria-expanded={isSearchOpen}
            aria-controls={searchId}
            onClick={() => setSearchOpen((open) => !open)}
          >
            <span aria-hidden="true">⌕</span>
            <span className={css.iconLabel}>Пошук</span>
          </button>

          <button
            type="button"
            className={clsx(css.iconButton, css.menuButton)}
            aria-expanded={isMenuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span aria-hidden="true">{isMenuOpen ? '✕' : '☰'}</span>
            <span className={css.visuallyHidden}>
              {isMenuOpen ? 'Закрити меню' : 'Відкрити меню'}
            </span>
          </button>
        </div>
      </div>

      {isSearchOpen && (
        <div className={css.searchPanel} id={searchId}>
          <SearchBox value="" onSubmit={handleSearch} autoFocus />
        </div>
      )}

      {isMenuOpen && (
        <nav className={css.mobileNav} aria-label="Мобільна навігація">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link className={css.mobileLink} href={localePath(link.href)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};
