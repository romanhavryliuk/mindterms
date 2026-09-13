import { Breadcrumbs } from '@/components/Breadcrumbs';
import { localePath, type Locale, type Messages } from '@/i18n';
import { getSearchIndex } from '@/services/contentService';

import { SearchBrowser } from './SearchBrowser';
import css from './SearchPage.module.css';

type SearchPageProps = {
  locale: Locale;
  messages: Messages;
};

export const SearchPage = ({ locale, messages }: SearchPageProps) => {
  const index = getSearchIndex(locale);

  return (
    <div className={css.page}>
      <Breadcrumbs
        messages={messages}
        items={[
          { label: messages.common.home, href: localePath('/', locale) },
          { label: messages.search.title },
        ]}
      />

      <header className={css.header}>
        <h1 className={css.title}>{messages.search.title}</h1>
        <p className={css.lead}>{messages.search.lead}</p>
      </header>

      <SearchBrowser index={index} locale={locale} messages={messages} />
    </div>
  );
};
