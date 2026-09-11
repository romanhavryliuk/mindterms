import clsx from 'clsx';
import Link from 'next/link';

import css from './Pager.module.css';

export type PagerItem = {
  href: string;
  title: string;
};

type PagerProps = {
  previous: PagerItem | null;
  next: PagerItem | null;
  /** Підпис, у межах чого йде навігація — наприклад, назва теми */
  scopeLabel?: string;
};

export const Pager = ({ previous, next, scopeLabel }: PagerProps) => {
  if (previous === null && next === null) return null;

  return (
    <nav
      className={css.pager}
      aria-label={
        scopeLabel === undefined
          ? 'Навігація між поняттями'
          : `Навігація в темі «${scopeLabel}»`
      }
    >
      {previous === null ? (
        <span className={css.placeholder} />
      ) : (
        <Link className={css.link} href={previous.href}>
          <span className={css.direction}>
            <span aria-hidden="true">←</span> Попереднє
          </span>
          <span className={css.title}>{previous.title}</span>
        </Link>
      )}

      {next === null ? (
        <span className={css.placeholder} />
      ) : (
        <Link className={clsx(css.link, css.next)} href={next.href}>
          <span className={css.direction}>
            Наступне <span aria-hidden="true">→</span>
          </span>
          <span className={css.title}>{next.title}</span>
        </Link>
      )}
    </nav>
  );
};
