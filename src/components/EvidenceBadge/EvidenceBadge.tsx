import clsx from 'clsx';

import type { Messages } from '@/i18n';
import type { EvidenceLevel } from '@/types';

import css from './EvidenceBadge.module.css';

type EvidenceBadgeProps = {
  level: EvidenceLevel;
  messages: Messages;
  /** md — на сторінці поняття, sm — у списках і картках */
  size?: 'sm' | 'md';
};

export const EvidenceBadge = ({ level, messages, size = 'md' }: EvidenceBadgeProps) => {
  const { label } = messages.evidence.levels[level];

  return (
    <span
      className={clsx(css.badge, css[`level${level}`], css[size])}
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
