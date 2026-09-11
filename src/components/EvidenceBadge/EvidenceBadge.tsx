import clsx from 'clsx';

import type { EvidenceLevel } from '@/types';
import { EVIDENCE_META } from '@/utils/constants';

import css from './EvidenceBadge.module.css';

type EvidenceBadgeProps = {
  level: EvidenceLevel;
  /** md — на сторінці поняття, sm — у списках і картках */
  size?: 'sm' | 'md';
};

export const EvidenceBadge = ({ level, size = 'md' }: EvidenceBadgeProps) => {
  const { label } = EVIDENCE_META[level];

  return (
    <span
      className={clsx(css.badge, css[`level${level}`], css[size])}
      title={`Доказовість ${level} з 3`}
    >
      <span className={css.dots} aria-hidden="true">
        <span className={css.dot} />
        <span className={css.dot} />
        <span className={css.dot} />
      </span>
      <span className={css.label}>{label}</span>
      <span className={css.visuallyHidden}>, рівень доказовості {level} з 3</span>
    </span>
  );
};
