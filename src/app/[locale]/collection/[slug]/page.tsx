import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getAllCollections, getCollectionById } from '@/services/contentService';
import { LOCALES } from '@/utils/constants';
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
    getAllCollections().map((collection) => ({ locale, slug: collection.id }))
  );
}

export async function generateMetadata({
  params,
}: CollectionRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionById(slug);

  if (collection === undefined) {
    return { title: 'Добірку не знайдено' };
  }

  return {
    title: collection.title,
    description: collection.description,
    openGraph: {
      title: `${collection.title} — mindterms`,
      description: collection.description,
      type: 'article',
    },
  };
}

export default async function Page({ params }: CollectionRouteProps) {
  const { slug } = await params;
  const collection = getCollectionById(slug);

  if (collection === undefined) {
    notFound();
  }

  return <CollectionPage collection={collection} />;
}
