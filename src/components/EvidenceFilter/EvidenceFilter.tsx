'use client';

import clsx from 'clsx';

import type { EvidenceLevel } from '@/types';
import { EVIDENCE_LEVELS, EVIDENCE_META } from '@/utils/constants';

import css from './EvidenceFilter.module.css';

type EvidenceFilterProps = {
  /** null — показані всі рівні */
  value: EvidenceLevel | null;
  counts: Record<EvidenceLevel, number>;
  totalCount: number;
  onChange: (level: EvidenceLevel | null) => void;
};

export const EvidenceFilter = ({
  value,
  counts,
  totalCount,
  onChange,
}: EvidenceFilterProps) => (
  <div className={css.filter}>
    <p className={css.title} id="evidence-filter-title">
      Рівень доказовості
    </p>

    <div className={css.options} role="group" aria-labelledby="evidence-filter-title">
      <button
        type="button"
        className={css.option}
        aria-pressed={value === null}
        onClick={() => onChange(null)}
      >
        Усі
        <span className={css.count}>{totalCount}</span>
      </button>

      {EVIDENCE_LEVELS.map((level) => (
        <button
          key={level}
          type="button"
          className={clsx(css.option, css[`level${level}`])}
          aria-pressed={value === level}
          onClick={() => onChange(value === level ? null : level)}
        >
          <span className={css.dot} aria-hidden="true" />
          {EVIDENCE_META[level].label}
          <span className={css.count}>{counts[level]}</span>
        </button>
      ))}
    </div>
  </div>
);
