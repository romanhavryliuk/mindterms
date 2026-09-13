import type { Metadata } from 'next';

import {
  DEFAULT_LOCALE,
  getMessages,
  isLocale,
  localeAlternates,
  type Locale,
} from '@/i18n';
import { SITE_NAME } from '@/utils/constants';
import { HomePage } from '@/views/HomePage';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const messages = getMessages(locale);

  return {
    // Головна не використовує шаблон «%s — mindterms»
    title: { absolute: `${SITE_NAME} — ${messages.site.tagline}` },
    description: messages.site.description,
    alternates: localeAlternates('/', locale),
  };
}

export default async function Page({ params }: PageProps) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE;

  return <HomePage locale={locale} messages={getMessages(locale)} />;
}
