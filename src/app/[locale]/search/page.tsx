import type { Metadata } from 'next';

import { getMessages, toLocale } from '@/i18n';
import { SearchPage } from '@/views/SearchPage';

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const messages = getMessages(locale);

  return {
    title: messages.search.title,
    description: messages.metadata.search,
    // Сторінка результатів не має самостійної цінності для індексу
    robots: { index: false, follow: true },
  };
}

export default async function Page({ params }: PageProps) {
  const { locale: raw } = await params;
  const locale = toLocale(raw);

  return <SearchPage locale={locale} messages={getMessages(locale)} />;
}
