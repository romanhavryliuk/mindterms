'use client';

import { useEffect, useRef, useState } from 'react';

import { MIN_QUERY_LENGTH } from '@/services/searchService';

import css from './SearchBox.module.css';

type SearchBoxProps = {
  /** Значення з URL — воно ж початкове для поля */
  value: string;
  onSubmit: (query: string) => void;
  autoFocus?: boolean;
};

export const SearchBox = ({ value, onSubmit, autoFocus = false }: SearchBoxProps) => {
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  // Запит міг змінитись ззовні: кнопкою «очистити» або переходом назад
  useEffect(() => {
    setDraft(value);
  }, [value]);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  return (
    <form
      className={css.form}
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(draft);
      }}
    >
      <input
        ref={inputRef}
        type="search"
        className={css.input}
        placeholder="Шукати: прив&#8217;язаність, нарцис, вигорання…"
        aria-label="Пошук по довіднику"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            setDraft('');
            onSubmit('');
          }
        }}
      />

      <button type="submit" className={css.submit}>
        Знайти
      </button>

      <p className={css.hint}>
        Пошук іде по назвах, визначеннях і тексту статей. Мінімум {MIN_QUERY_LENGTH}{' '}
        символи, Esc — очистити.
      </p>
    </form>
  );
};
