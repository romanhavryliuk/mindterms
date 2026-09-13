import type { Metadata } from 'next';

import {
  DEFAULT_LOCALE,
  getMessages,
  isLocale,
  localeAlternates,
  type Locale,
} from '@/i18n';
import { HelpPage } from '@/views/HelpPage';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const messages = getMessages(locale);

  return {
    title: messages.help.title,
    description: messages.metadata.help,
    alternates: localeAlternates('/help', locale),
  };
}

export default async function Page({ params }: PageProps) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE;

  return <HelpPage locale={locale} messages={getMessages(locale)} />;
}
