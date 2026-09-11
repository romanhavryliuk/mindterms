import Link from 'next/link';

import { localePath } from '@/utils/constants';

import css from './NotFoundPage.module.css';

export const NotFoundPage = () => (
  <div className={css.page}>
    <p className={css.code}>404</p>
    <h1 className={css.title}>Такої сторінки немає</h1>
    <p className={css.lead}>
      Можливо, посилання застаріло або в адресі одрук. Поняття нікуди не зникли — їх можна
      знайти через каталог або покажчик.
    </p>

    <div className={css.actions}>
      <Link className={css.primaryAction} href={localePath('/catalog')}>
        Відкрити каталог
      </Link>
      <Link className={css.secondaryAction} href={localePath('/search')}>
        Пошук по довіднику
      </Link>
    </div>
  </div>
);
