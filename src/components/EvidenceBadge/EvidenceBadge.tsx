import clsx from 'clsx';

import type { Messages } from '@/i18n';
import type { EvidenceLevel } from '@/types';

import css from './EvidenceBadge.module.css';

type EvidenceBadgeProps = {
  level: EvidenceLevel;
  messages: Messages;
  /** lg — у блоці «Доказовість» статті, md — інші місця статті, sm — у списках і картках */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Заповнювати кружечки по черзі. Вмикається лише там, де шкала —
   * головний елемент екрана: у каталозі таких бейджів 48, і анімація
   * всіх одночасно перетворилась би на миготіння.
   */
  animated?: boolean;
};

export const EvidenceBadge = ({
  level,
  messages,
  size = 'md',
  animated = false,
}: EvidenceBadgeProps) => {
  const { label } = messages.evidence.levels[level];

  return (
    <span
      className={clsx(
        css.badge,
        css[`level${level}`],
        css[size],
        animated && css.animated
      )}
      title={`${label} — ${level} ${messages.common.evidenceScale}`}
    >
      <span className={css.dots} aria-hidden="true">
        <span className={css.dot} />
        <span className={css.dot} />
        <span className={css.dot} />
      </span>
      <span className={css.label}>{label}</span>
      <span className={css.visuallyHidden}>
        , {level} {messages.common.evidenceScale}
      </span>
    </span>
  );
};
