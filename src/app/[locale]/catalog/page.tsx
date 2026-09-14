import type { Metadata } from 'next';

import { getMessages, localeAlternates, toLocale } from '@/i18n';
import { CatalogPage } from '@/views/CatalogPage';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = toLocale(raw);
  const messages = getMessages(locale);

  return {
    title: messages.catalog.title,
    description: messages.metadata.catalog,
    alternates: localeAlternates('/catalog', locale),
  };
}

export default async function Page({ params }: PageProps) {
  const { locale: raw } = await params;
  const locale = toLocale(raw);

  return <CatalogPage locale={locale} messages={getMessages(locale)} />;
}
