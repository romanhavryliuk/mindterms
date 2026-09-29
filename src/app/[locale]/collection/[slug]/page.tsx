import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getMessages, localeAlternates, LOCALES, toLocale } from '@/i18n';
import { getAllCollections, getCollectionById } from '@/services/contentService';
import { SITE_NAME } from '@/utils/constants';
import { collectionImage } from '@/utils/ogImage';
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
  const locale = toLocale(raw);
  const messages = getMessages(locale);
  const collection = getCollectionById(locale, slug);

  if (collection === undefined) {
    return { title: messages.metadata.collectionNotFound };
  }

  const image = collectionImage(locale, collection.id, collection.title);

  return {
    title: collection.title,
    description: collection.description,
    alternates: localeAlternates(`/collection/${collection.id}`, locale),
    openGraph: {
      siteName: SITE_NAME,
      title: `${collection.title} — ${SITE_NAME}`,
      description: collection.description,
      type: 'article',
      locale,
      images: [image],
    },
    twitter: { card: 'summary_large_image', images: [image] },
  };
}

export default async function Page({ params }: CollectionRouteProps) {
  const { locale: raw, slug } = await params;
  const locale = toLocale(raw);
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
