import css from './Disclaimer.module.css';

type DisclaimerProps = {
  /** banner — постійна смуга в шапці, page — блок у кінці сторінки поняття */
  variant?: 'banner' | 'page';
};

export const Disclaimer = ({ variant = 'page' }: DisclaimerProps) => {
  if (variant === 'banner') {
    return (
      <aside className={css.banner}>
        <p className={css.bannerText}>
          <strong className={css.bannerLead}>Освітній матеріал.</strong> mindterms пояснює
          поняття, але не ставить діагнозів і не замінює консультацію фахівця.
        </p>
      </aside>
    );
  }

  return (
    <aside className={css.block} aria-labelledby="disclaimer-title">
      <h2 id="disclaimer-title" className={css.blockTitle}>
        Це не діагностика
      </h2>
      <p className={css.blockText}>
        Опис поняття потрібен для розуміння, а не для того, щоб ставити діагноз собі чи
        комусь іншому. Збіг кількох ознак нічого не доводить: те саме проявляється
        по-різному в різних людей і в різних обставинах.
      </p>
      <p className={css.blockText}>
        Якщо стан заважає жити — спати, працювати, бути в стосунках — про це варто
        говорити з фахівцем: психологом, психотерапевтом або лікарем.
      </p>
    </aside>
  );
};
