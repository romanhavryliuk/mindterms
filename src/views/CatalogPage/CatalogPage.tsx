import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CatalogBrowser } from '@/components/CatalogBrowser';
import { getCategoriesWithCounts, getConceptSummaries } from '@/services/contentService';
import { localePath } from '@/utils/constants';

import css from './CatalogPage.module.css';

export const CatalogPage = () => {
  const categories = getCategoriesWithCounts();
  const concepts = getConceptSummaries();

  return (
    <div className={css.page}>
      <Breadcrumbs
        items={[{ label: 'Головна', href: localePath('/') }, { label: 'Каталог' }]}
      />

      <header className={css.header}>
        <h1 className={css.title}>Каталог понять</h1>
        <p className={css.lead}>
          Усі поняття довідника. Фільтруйте за темою й рівнем доказовості — вибір
          лишається в адресі сторінки, тож посиланням можна поділитись.
        </p>
      </header>

      <CatalogBrowser categories={categories} concepts={concepts} />
    </div>
  );
};
