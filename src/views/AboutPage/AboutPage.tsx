import clsx from 'clsx';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CollectionCard } from '@/components/CollectionCard';
import { Disclaimer } from '@/components/Disclaimer';
import { getAllCollections, getBibliography, getMeta } from '@/services/contentService';
import { EVIDENCE_LEVELS, EVIDENCE_META, localePath } from '@/utils/constants';

import css from './AboutPage.module.css';

/** Обмеження проєкту названі явно — це частина редакційного підходу */
const LIMITATIONS = [
  {
    title: 'Немає фахової рецензії',
    text:
      'Тексти писала одна людина за первинними джерелами. Їх не переглядав ' +
      'практикуючий психолог чи науковець, тому помилки інтерпретації можливі — ' +
      'і найімовірніші там, де джерело складне, а формулювання просте.',
  },
  {
    title: 'Переважають західні вибірки',
    text:
      'Більшість досліджень, на які спираються статті, проведені в США та ' +
      'Західній Європі на студентах університетів. Наскільки висновки переносяться ' +
      'на українську вибірку, у більшості випадків просто ніхто не перевіряв.',
  },
  {
    title: 'Наука змінюється',
    text:
      'Позначка доказовості описує стан на момент написання. Криза відтворюваності ' +
      'останніх років уже понизила статус кількох колись хрестоматійних ефектів — ' +
      'і цей процес не закінчився.',
  },
  {
    title: 'Спрощення неминуче',
    text:
      'Абзац замість розділу монографії завжди щось втрачає. Там, де стисла ' +
      'відповідь спотворює суть, у статті стоїть посилання на первинне джерело — ' +
      'ним і варто користуватись, якщо питання для вас важливе.',
  },
];

export const AboutPage = () => {
  const meta = getMeta();
  const bibliography = getBibliography();
  const collections = getAllCollections();

  return (
    <div className={css.page}>
      <Breadcrumbs
        items={[{ label: 'Головна', href: localePath('/') }, { label: 'Про проєкт' }]}
      />

      <header className={css.header}>
        <h1 className={css.title}>Про проєкт</h1>
        <p className={css.lead}>
          mindterms — довідник з психології українською. Він пояснює терміни, які
          розійшлися з популярних текстів, і показує, наскільки кожен із них спирається на
          дослідження.
        </p>
      </header>

      <section className={css.section} aria-labelledby="sources-title">
        <h2 id="sources-title" className={css.sectionTitle}>
          Звідки взята інформація
        </h2>
        <div className={css.prose}>
          <p>
            Основа кожної статті — первинні джерела: оригінальні публікації авторів
            поняття, метааналізи й огляди, а також довідкові видання на зразок APA
            Dictionary of Psychology. Посилання стоять під кожним поняттям, і вони ведуть
            на конкретну роботу, а не на переказ у блозі.
          </p>
          <p>
            Пріоритет там, де джерела суперечать одне одному, віддається метааналізам і
            реплікаціям, а не окремому гучному експерименту. Якщо великий ефект відомий
            переважно з однієї лабораторії й не відтворився в незалежних спробах, це прямо
            сказано в тексті поняття.
          </p>
          <p>
            Українська термінологія в психології досі не усталена, тому поряд із назвою
            завжди стоїть оригінальний англійський термін — за ним можна шукати далі.
          </p>
        </div>
      </section>

      <section className={css.section} aria-labelledby="scale-title">
        <h2 id="scale-title" className={css.sectionTitle}>
          Навіщо шкала доказовості
        </h2>
        <div className={css.prose}>
          <p>
            Популярні тексти подають усі поняття однаково впевнено: і те, що відтворене в
            сотнях досліджень, і те, що народилось у корпоративному тренінгу. Читач не має
            як їх розрізнити — а різниця величезна.
          </p>
          <p>
            Тому кожне поняття має позначку від 1 до 3. Це не оцінка «корисності» й не
            вирок: рівень 1 означає не «дурниця», а «даних мало, будьте обережні з
            висновками».
          </p>
        </div>

        <ul className={css.scale}>
          {EVIDENCE_LEVELS.map((level) => (
            <li key={level} className={clsx(css.scaleItem, css[`level${level}`])}>
              <p className={css.scaleHead}>
                <span className={css.scaleNumber}>{level}</span>
                <span className={css.scaleName}>{EVIDENCE_META[level].label}</span>
              </p>
              <p className={css.scaleText}>{EVIDENCE_META[level].description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={css.section} aria-labelledby="absent-title">
        <h2 id="absent-title" className={css.sectionTitle}>
          Чого тут немає
        </h2>
        <div className={css.prose}>
          <p>
            <strong>Тестів і опитувальників.</strong> Онлайн-тест «дізнайся свій тип» дає
            відчуття відповіді, але не дає інформації: валідні інструменти працюють у
            руках фахівця й у контексті, а не як розвага між справами.
          </p>
          <p>
            <strong>Діагнозів.</strong> Тут описані поняття, а не критерії захворювань.
            Збіг ознак із текстом статті нічого не встановлює — ні для вас, ні для людини,
            про яку ви думаєте, поки читаєте.
          </p>
          <p>
            <strong>Порад «як полагодити людину».</strong> Розуміння терміна не робить
            нікого терапевтом — ні чужим, ні власним.
          </p>
          <p>
            І технічно: сайт не збирає жодних даних, не ставить аналітики з куками й не
            має форм реєстрації. Це статичні сторінки з тексту в репозиторії.
          </p>
        </div>
      </section>

      <section className={css.section} aria-labelledby="limits-title">
        <h2 id="limits-title" className={css.sectionTitle}>
          Обмеження проєкту
        </h2>

        <ul className={css.limitations}>
          {LIMITATIONS.map((limitation) => (
            <li key={limitation.title} className={css.limitation}>
              <h3 className={css.limitationTitle}>{limitation.title}</h3>
              <p className={css.limitationText}>{limitation.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={css.section} aria-labelledby="bibliography-title">
        <h2 id="bibliography-title" className={css.sectionTitle}>
          Загальна бібліографія
        </h2>
        <p className={css.bibliographyNote}>
          Роботи, на які спирається довідник у цілому. Джерела окремих понять — у кінці
          кожної статті.
        </p>
        <ol className={css.bibliography}>
          {bibliography.map((entry) => (
            <li key={entry} className={css.bibliographyItem}>
              {entry}
            </li>
          ))}
        </ol>

        <p className={css.resources}>
          <strong>Довідкові ресурси:</strong>{' '}
          <a
            className={css.resourceLink}
            href="https://dictionary.apa.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            APA Dictionary of Psychology
          </a>{' '}
          — безкоштовний словник Американської психологічної асоціації на понад 25 000
          термінів.{' '}
          <a
            className={css.resourceLink}
            href="https://www.who.int"
            target="_blank"
            rel="noopener noreferrer"
          >
            who.int
          </a>{' '}
          — класифікації та визначення ВООЗ.
        </p>
      </section>

      <section className={css.section} aria-labelledby="next-title">
        <h2 id="next-title" className={css.sectionTitle}>
          Далі
        </h2>
        <p className={css.bibliographyNote}>З чого почати читати довідник.</p>

        <ul className={css.collections}>
          {collections.map((collection) => (
            <li key={collection.id}>
              <CollectionCard collection={collection} />
            </li>
          ))}
        </ul>
      </section>

      <footer className={css.footer}>
        <p className={css.version}>
          Версія контенту {meta.version} · оновлено {meta.updated}
        </p>
        <Disclaimer variant="page" />
      </footer>
    </div>
  );
};
