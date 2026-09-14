import type { Metadata } from 'next';

import { getMessages, localeAlternates, toLocale } from '@/i18n';
import { HelpPage } from '@/views/HelpPage';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = toLocale(raw);
  const messages = getMessages(locale);

  return {
    title: messages.help.title,
    description: messages.metadata.help,
    alternates: localeAlternates('/help', locale),
  };
}

export default async function Page({ params }: PageProps) {
  const { locale: raw } = await params;
  const locale = toLocale(raw);

  return <HelpPage locale={locale} messages={getMessages(locale)} />;
}
