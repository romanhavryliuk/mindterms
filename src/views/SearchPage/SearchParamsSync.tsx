'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import { SEARCH_PARAM_QUERY } from '@/utils/constants';

type SearchParamsSyncProps = {
  onChange: (query: string) => void;
};

/**
 * useSearchParams вимикає прередер усього піддерева до найближчої межі
 * Suspense. Хук ізольовано тут, щоб саме поле пошуку лишалось у статичному
 * HTML і працювало навіть до гідрації.
 */
export const SearchParamsSync = ({ onChange }: SearchParamsSyncProps) => {
  const searchParams = useSearchParams();
  const query = searchParams.get(SEARCH_PARAM_QUERY) ?? '';

  useEffect(() => {
    onChange(query);
  }, [query, onChange]);

  return null;
};
