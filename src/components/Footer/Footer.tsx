import { format, type Locale, type Messages } from '@/i18n';
import { getMeta } from '@/services/contentService';
import { SITE_NAME } from '@/utils/constants';

import css from './Footer.module.css';

type FooterProps = {
  locale: Locale;
  messages: Messages;
};

export const Footer = ({ locale, messages }: FooterProps) => {
  const meta = getMeta(locale);

  // Навігацію тут не дублюємо: теми є в каталозі, розділи — у шапці.
  // Футер лишає примітку про характер матеріалів і версію даних
  return (
    <footer className={css.footer}>
      <div className={css.inner}>
        <p className={css.disclaimer}>{meta.note}</p>
        <p className={css.meta}>
          {format(messages.footer.meta, {
            site: SITE_NAME,
            updated: meta.updated,
            version: meta.version,
          })}
        </p>
      </div>
    </footer>
  );
};
