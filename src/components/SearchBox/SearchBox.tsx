'use client';

import { useEffect, useId, useRef, useState } from 'react';

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
  const [hasError, setHasError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const errorId = useId();

  const handleSubmit = () => {
    const trimmed = draft.trim();

    // Порожнє поле при активному запиті — це очищення пошуку
    if (trimmed === '' && value !== '') {
      setHasError(false);
      onSubmit('');
      return;
    }

    // Закороткий запит не відправляємо мовчки: пояснюємо, чого бракує
    if (trimmed.length < MIN_QUERY_LENGTH) {
      setHasError(true);
      inputRef.current?.focus();
      return;
    }

    setHasError(false);
    onSubmit(draft);
  };

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
        handleSubmit();
      }}
    >
      <input
        ref={inputRef}
        type="search"
        className={css.input}
        placeholder={messages.search.placeholder}
        aria-label={messages.search.inputLabel}
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? errorId : undefined}
        value={draft}
        onChange={(event) => {
          setDraft(event.target.value);
          setHasError(false);
        }}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            setDraft('');
            setHasError(false);
            onSubmit('');
          }
        }}
      />

      <button type="submit" className={css.submit}>
        {messages.search.submit}
      </button>

      {hasError && (
        <p id={errorId} className={css.error} role="alert">
          {messages.search.tooShortError}
        </p>
      )}

      <p className={css.hint}>
        {format(messages.search.hint, { min: MIN_QUERY_LENGTH })}
      </p>
    </form>
  );
};
