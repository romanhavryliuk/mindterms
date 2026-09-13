import type { Metadata } from 'next';

import {
  DEFAULT_LOCALE,
  getMessages,
  isLocale,
  localeAlternates,
  type Locale,
} from '@/i18n';
import { AboutPage } from '@/views/AboutPage';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const messages = getMessages(locale);

  return {
    title: messages.about.title,
    description: messages.metadata.about,
    alternates: localeAlternates('/about', locale),
  };
}

export default async function Page({ params }: PageProps) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE;

  return <AboutPage locale={locale} messages={getMessages(locale)} />;
}
