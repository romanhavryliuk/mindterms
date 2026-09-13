'use client';

import { useEffect, useRef, useState } from 'react';

import { format, type Messages } from '@/i18n';
import { MIN_QUERY_LENGTH } from '@/services/searchService';

import css from './SearchBox.module.css';

type SearchBoxProps = {
  /** Значення з URL — воно ж початкове для поля */
  value: string;
  messages: Messages;
  onSubmit: (query: string) => void;
  autoFocus?: boolean;
};

export const SearchBox = ({
  value,
  messages,
  onSubmit,
  autoFocus = false,
}: SearchBoxProps) => {
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
        placeholder={messages.search.placeholder}
        aria-label={messages.search.inputLabel}
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
        {messages.search.submit}
      </button>

      <p className={css.hint}>
        {format(messages.search.hint, { min: MIN_QUERY_LENGTH })}
      </p>
    </form>
  );
};
