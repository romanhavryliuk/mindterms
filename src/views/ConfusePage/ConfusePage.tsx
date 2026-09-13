import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ConfusionCard } from '@/components/ConfusionCard';
import { format, formatCount, localePath, type Locale, type Messages } from '@/i18n';
import { getAllConfusions } from '@/services/contentService';

import css from './ConfusePage.module.css';

type ConfusePageProps = {
  locale: Locale;
  messages: Messages;
};

export const ConfusePage = ({ locale, messages }: ConfusePageProps) => {
  const confusions = getAllConfusions(locale);

  return (
    <div className={css.page}>
      <Breadcrumbs
        messages={messages}
        items={[
          { label: messages.common.home, href: localePath('/', locale) },
          { label: messages.nav.confuse },
        ]}
      />

      <header className={css.header}>
        <h1 className={css.title}>{messages.confuse.title}</h1>
        <p className={css.lead}>
          {format(messages.confuse.lead, {
            count: formatCount(confusions.length, messages.plural.pair, locale),
          })}
        </p>
      </header>

      <ul className={css.list}>
        {confusions.map((confusion) => (
          <li key={`${confusion.a}-${confusion.b}`}>
            <ConfusionCard confusion={confusion} locale={locale} messages={messages} />
          </li>
        ))}
      </ul>
    </div>
  );
};
