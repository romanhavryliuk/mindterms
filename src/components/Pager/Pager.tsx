import clsx from 'clsx';
import Link from 'next/link';

import { format, type Messages } from '@/i18n';

import css from './Pager.module.css';

export type PagerItem = {
  href: string;
  title: string;
};

type PagerProps = {
  previous: PagerItem | null;
  next: PagerItem | null;
  messages: Messages;
  /** Підпис, у межах чого йде навігація — наприклад, назва теми */
  scopeLabel?: string;
};

export const Pager = ({ previous, next, messages, scopeLabel }: PagerProps) => {
  if (previous === null && next === null) return null;

  const label =
    scopeLabel === undefined
      ? messages.concept.pagerLabelPlain
      : format(messages.concept.pagerLabel, { scope: scopeLabel });

  return (
    <nav className={css.pager} aria-label={label}>
      {previous === null ? (
        <span className={css.placeholder} />
      ) : (
        <Link className={css.link} href={previous.href}>
          <span className={css.direction}>
            <span aria-hidden="true">←</span> {messages.concept.previous}
          </span>
          <span className={css.title}>{previous.title}</span>
        </Link>
      )}

      {next === null ? (
        <span className={css.placeholder} />
      ) : (
        <Link className={clsx(css.link, css.next)} href={next.href}>
          <span className={css.direction}>
            {messages.concept.next} <span aria-hidden="true">→</span>
          </span>
          <span className={css.title}>{next.title}</span>
        </Link>
      )}
    </nav>
  );
};
