import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
  DEFAULT_LOCALE,
  getMessages,
  isLocale,
  localeAlternates,
  LOCALES,
  type Locale,
} from '@/i18n';
import { getAllCollections, getCollectionById } from '@/services/contentService';
import { CollectionPage } from '@/views/CollectionPage';

type CollectionRouteParams = {
  locale: string;
  slug: string;
};

type CollectionRouteProps = {
  params: Promise<CollectionRouteParams>;
};

export const dynamicParams = false;

export function generateStaticParams(): CollectionRouteParams[] {
  return LOCALES.flatMap((locale) =>
    getAllCollections(locale).map((collection) => ({ locale, slug: collection.id }))
  );
}

export async function generateMetadata({
  params,
}: CollectionRouteProps): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const messages = getMessages(locale);
  const collection = getCollectionById(locale, slug);

  if (collection === undefined) {
    return { title: messages.metadata.collectionNotFound };
  }

  return {
    title: collection.title,
    description: collection.description,
    alternates: localeAlternates(`/collection/${collection.id}`, locale),
    openGraph: {
      title: `${collection.title} — mindterms`,
      description: collection.description,
      type: 'article',
      locale,
    },
  };
}

export default async function Page({ params }: CollectionRouteProps) {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const collection = getCollectionById(locale, slug);

  if (collection === undefined) {
    notFound();
  }

  return (
    <CollectionPage
      collection={collection}
      locale={locale}
      messages={getMessages(locale)}
    />
  );
}
