import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getAllConcepts, getConceptBySlug } from '@/services/contentService';
import { LOCALES } from '@/utils/constants';
import { ConceptPage } from '@/views/ConceptPage';

type ConceptRouteParams = {
  locale: string;
  slug: string;
};

type ConceptRouteProps = {
  params: Promise<ConceptRouteParams>;
};

/** Поза списком generateStaticParams маршрутів немає — тільки 404 */
export const dynamicParams = false;

export function generateStaticParams(): ConceptRouteParams[] {
  return LOCALES.flatMap((locale) =>
    getAllConcepts().map((concept) => ({ locale, slug: concept.id }))
  );
}

export async function generateMetadata({ params }: ConceptRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const concept = getConceptBySlug(slug);

  if (concept === undefined) {
    return { title: 'Поняття не знайдено' };
  }

  const image = {
    url: `/api/og?slug=${encodeURIComponent(concept.id)}`,
    width: 1200,
    height: 630,
    alt: `${concept.title} — ${concept.original}`,
  };

  return {
    title: concept.title,
    description: concept.definition,
    openGraph: {
      title: `${concept.title} — mindterms`,
      description: concept.definition,
      type: 'article',
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      images: [image],
    },
  };
}

export default async function Page({ params }: ConceptRouteProps) {
  const { slug } = await params;
  const concept = getConceptBySlug(slug);

  if (concept === undefined) {
    notFound();
  }

  return <ConceptPage concept={concept} />;
}
