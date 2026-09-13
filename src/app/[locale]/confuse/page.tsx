import type { Metadata } from 'next';

import {
  DEFAULT_LOCALE,
  getMessages,
  isLocale,
  localeAlternates,
  type Locale,
} from '@/i18n';
import { ConfusePage } from '@/views/ConfusePage';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const messages = getMessages(locale);

  return {
    title: messages.confuse.title,
    description: messages.metadata.confuse,
    alternates: localeAlternates('/confuse', locale),
  };
}

export default async function Page({ params }: PageProps) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE;

  return <ConfusePage locale={locale} messages={getMessages(locale)} />;
}
