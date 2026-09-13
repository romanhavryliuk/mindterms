import Link from 'next/link';

import { localePath, type Locale, type Messages } from '@/i18n';

import css from './NotFoundPage.module.css';

type NotFoundPageProps = {
  locale: Locale;
  messages: Messages;
};

export const NotFoundPage = ({ locale, messages }: NotFoundPageProps) => (
  <div className={css.page}>
    <p className={css.code}>404</p>
    <h1 className={css.title}>{messages.notFound.title}</h1>
    <p className={css.lead}>{messages.notFound.lead}</p>

    <div className={css.actions}>
      <Link className={css.primaryAction} href={localePath('/catalog', locale)}>
        {messages.notFound.openCatalog}
      </Link>
      <Link className={css.secondaryAction} href={localePath('/search', locale)}>
        {messages.notFound.openSearch}
      </Link>
    </div>
  </div>
);
