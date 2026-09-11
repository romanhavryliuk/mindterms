import { Breadcrumbs } from '@/components/Breadcrumbs';
import { getSearchIndex } from '@/services/contentService';
import { localePath } from '@/utils/constants';

import { SearchBrowser } from './SearchBrowser';
import css from './SearchPage.module.css';

export const SearchPage = () => {
  const index = getSearchIndex();

  return (
    <div className={css.page}>
      <Breadcrumbs
        items={[{ label: 'Головна', href: localePath('/') }, { label: 'Пошук' }]}
      />

      <header className={css.header}>
        <h1 className={css.title}>Пошук</h1>
        <p className={css.lead}>
          Шукає по назвах, оригінальних термінах, визначеннях і тексту статей.
        </p>
      </header>

      <SearchBrowser index={index} />
    </div>
  );
};
