'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import type { EvidenceLevel } from '@/types';
import {
  EVIDENCE_LEVELS,
  FILTER_PARAM_CATEGORY,
  FILTER_PARAM_EVIDENCE,
} from '@/utils/constants';

export type CatalogFilters = {
  category: string | null;
  evidence: EvidenceLevel | null;
};

/** Читає рівень доказовості з URL, ігноруючи сміття у параметрі */
function parseEvidence(raw: string | null): EvidenceLevel | null {
  const parsed = Number(raw);
  return EVIDENCE_LEVELS.find((level) => level === parsed) ?? null;
}

type CatalogParamsSyncProps = {
  onChange: (filters: CatalogFilters) => void;
};

/**
 * useSearchParams вимикає прередер усього піддерева до найближчої межі
 * Suspense. Тому хук ізольовано в компоненті, який нічого не малює: сітка
 * карток лишається в статичному HTML, а звідси приходить лише стан з URL.
 */
export const CatalogParamsSync = ({ onChange }: CatalogParamsSyncProps) => {
  const searchParams = useSearchParams();
  const category = searchParams.get(FILTER_PARAM_CATEGORY);
  const evidence = searchParams.get(FILTER_PARAM_EVIDENCE);

  useEffect(() => {
    onChange({ category, evidence: parseEvidence(evidence) });
  }, [category, evidence, onChange]);

  return null;
};
