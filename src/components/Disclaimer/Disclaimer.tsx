import type { Messages } from '@/i18n';

import css from './Disclaimer.module.css';

type DisclaimerProps = {
  messages: Messages;
  /** banner — постійна смуга в шапці, page — блок у кінці сторінки поняття */
  variant?: 'banner' | 'page';
};

export const Disclaimer = ({ messages, variant = 'page' }: DisclaimerProps) => {
  const { disclaimer } = messages;

  if (variant === 'banner') {
    return (
      <aside className={css.banner}>
        <p className={css.bannerText}>
          <strong className={css.bannerLead}>{disclaimer.bannerLead}</strong>
          {disclaimer.bannerText}
        </p>
      </aside>
    );
  }

  return (
    <aside className={css.block} aria-labelledby="disclaimer-title">
      <h2 id="disclaimer-title" className={css.blockTitle}>
        {disclaimer.blockTitle}
      </h2>
      {disclaimer.blockText.map((text) => (
        <p key={text} className={css.blockText}>
          {text}
        </p>
      ))}
    </aside>
  );
};
