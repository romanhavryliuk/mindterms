import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ConfusionCard } from '@/components/ConfusionCard';
import { getAllConfusions } from '@/services/contentService';
import { localePath } from '@/utils/constants';
import { formatCount, PAIR_FORMS } from '@/utils/formatters';

import css from './ConfusePage.module.css';

export const ConfusePage = () => {
  const confusions = getAllConfusions();

  return (
    <div className={css.page}>
      <Breadcrumbs
        items={[{ label: 'Головна', href: localePath('/') }, { label: 'Плутанина' }]}
      />

      <header className={css.header}>
        <h1 className={css.title}>Що з чим плутають</h1>
        <p className={css.lead}>
          {formatCount(confusions.length, PAIR_FORMS)} понять, які в побутовій мові
          злилися в одне. Різниця між ними здебільшого практична: від неї залежить, що
          взагалі можна зробити зі станом.
        </p>
      </header>

      <ul className={css.list}>
        {confusions.map((confusion) => (
          <li key={`${confusion.a}-${confusion.b}`}>
            <ConfusionCard confusion={confusion} />
          </li>
        ))}
      </ul>
    </div>
  );
};
