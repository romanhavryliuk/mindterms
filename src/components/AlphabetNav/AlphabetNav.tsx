import clsx from 'clsx';

import css from './AlphabetNav.module.css';

type AlphabetNavProps = {
  /** Літери, для яких у покажчику є якорі */
  letters: string[];
};

/** Українська абетка — показуємо всю, щоб було видно, яких літер немає */
const UKRAINIAN_ALPHABET = [
  'А',
  'Б',
  'В',
  'Г',
  'Ґ',
  'Д',
  'Е',
  'Є',
  'Ж',
  'З',
  'И',
  'І',
  'Ї',
  'Й',
  'К',
  'Л',
  'М',
  'Н',
  'О',
  'П',
  'Р',
  'С',
  'Т',
  'У',
  'Ф',
  'Х',
  'Ц',
  'Ч',
  'Ш',
  'Щ',
  'Ю',
  'Я',
];

export const AlphabetNav = ({ letters }: AlphabetNavProps) => {
  const available = new Set(letters);
  // Літери поза українською абеткою (латиниця, цифри) додаємо в кінець
  const extras = letters.filter((letter) => !UKRAINIAN_ALPHABET.includes(letter));

  return (
    <nav className={css.nav} aria-label="Перехід за літерою">
      <ul className={css.list}>
        {[...UKRAINIAN_ALPHABET, ...extras].map((letter) => {
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
