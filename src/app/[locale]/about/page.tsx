import type { Metadata } from 'next';

import { getMessages, localeAlternates, toLocale } from '@/i18n';
import { AboutPage } from '@/views/AboutPage';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = toLocale(raw);
  const messages = getMessages(locale);

  return {
    title: messages.about.title,
    description: messages.metadata.about,
    alternates: localeAlternates('/about', locale),
  };
}

export default async function Page({ params }: PageProps) {
  const { locale: raw } = await params;
  const locale = toLocale(raw);

  return <AboutPage locale={locale} messages={getMessages(locale)} />;
}
