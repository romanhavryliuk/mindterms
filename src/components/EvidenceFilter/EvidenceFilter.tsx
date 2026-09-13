'use client';

import clsx from 'clsx';

import type { Messages } from '@/i18n';
import type { EvidenceLevel } from '@/types';
import { EVIDENCE_LEVELS } from '@/utils/constants';

import css from './EvidenceFilter.module.css';

type EvidenceFilterProps = {
  /** null — показані всі рівні */
  value: EvidenceLevel | null;
  counts: Record<EvidenceLevel, number>;
  totalCount: number;
  messages: Messages;
  onChange: (level: EvidenceLevel | null) => void;
};

export const EvidenceFilter = ({
  value,
  counts,
  totalCount,
  messages,
  onChange,
}: EvidenceFilterProps) => (
  <div className={css.filter}>
    <p className={css.title} id="evidence-filter-title">
      {messages.evidence.filterTitle}
    </p>

    <div className={css.options} role="group" aria-labelledby="evidence-filter-title">
      <button
        type="button"
        className={css.option}
        aria-pressed={value === null}
        onClick={() => onChange(null)}
      >
        {messages.evidence.all}
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
          {messages.evidence.levels[level].label}
          <span className={css.count}>{counts[level]}</span>
        </button>
      ))}
    </div>
  </div>
);
