import type { Metadata } from 'next';

import { getMessages, localeAlternates, toLocale } from '@/i18n';
import { IndexPage } from '@/views/IndexPage';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = toLocale(raw);
  const messages = getMessages(locale);

  return {
    title: messages.index.title,
    description: messages.metadata.index,
    alternates: localeAlternates('/index', locale),
  };
}

export default async function Page({ params }: PageProps) {
  const { locale: raw } = await params;
  const locale = toLocale(raw);

  return <IndexPage locale={locale} messages={getMessages(locale)} />;
}
