import clsx from 'clsx';

import type { Messages } from '@/i18n';

import css from './AlphabetNav.module.css';

type AlphabetNavProps = {
  /** Літери, для яких у покажчику є якорі */
  letters: string[];
  messages: Messages;
};

export const AlphabetNav = ({ letters, messages }: AlphabetNavProps) => {
  const available = new Set(letters);
  const alphabet = [...messages.alphabet];
  // Літери поза абеткою локалі (латиниця, цифри) додаємо в кінець
  const extras = letters.filter((letter) => !alphabet.includes(letter));

  return (
    <nav className={css.nav} aria-label={messages.index.alphabetLabel}>
      <ul className={css.list}>
        {[...alphabet, ...extras].map((letter) => {
          const isAvailable = available.has(letter);

          return (
            <li key={letter}>
              {isAvailable ? (
                <a className={css.letter} href={`#letter-${letter}`}>
                  {letter}
                </a>
              ) : (
                <span className={clsx(css.letter, css.empty)} aria-hidden="true">
                  {letter}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
