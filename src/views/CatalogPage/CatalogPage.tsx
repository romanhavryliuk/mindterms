import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CatalogBrowser } from '@/components/CatalogBrowser';
import { localePath, type Locale, type Messages } from '@/i18n';
import { getCategoriesWithCounts, getConceptSummaries } from '@/services/contentService';

import css from './CatalogPage.module.css';

type CatalogPageProps = {
  locale: Locale;
  messages: Messages;
};

export const CatalogPage = ({ locale, messages }: CatalogPageProps) => {
  const categories = getCategoriesWithCounts(locale);
  const concepts = getConceptSummaries(locale);

  return (
    <div className={css.page}>
      <Breadcrumbs
        messages={messages}
        items={[
          { label: messages.common.home, href: localePath('/', locale) },
          { label: messages.nav.catalog },
        ]}
      />

      <header className={css.header}>
        <h1 className={css.title}>{messages.catalog.title}</h1>
        <p className={css.lead}>{messages.catalog.lead}</p>
      </header>

      <CatalogBrowser
        categories={categories}
        concepts={concepts}
        locale={locale}
        messages={messages}
      />
    </div>
  );
};
