import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getMessages, localeAlternates, LOCALES, toLocale } from '@/i18n';
import { getAllConcepts, getConceptBySlug } from '@/services/contentService';
import { SITE_NAME } from '@/utils/constants';
import { conceptImage } from '@/utils/ogImage';
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
    getAllConcepts(locale).map((concept) => ({ locale, slug: concept.id }))
  );
}

export async function generateMetadata({ params }: ConceptRouteProps): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = toLocale(raw);
  const messages = getMessages(locale);
  const concept = getConceptBySlug(locale, slug);

  if (concept === undefined) {
    return { title: messages.metadata.conceptNotFound };
  }

  const image = conceptImage(locale, concept.id, concept.title);

  return {
    title: concept.title,
    description: concept.definition,
    alternates: localeAlternates(`/concept/${concept.id}`, locale),
    openGraph: {
      siteName: SITE_NAME,
      title: `${concept.title} — ${SITE_NAME}`,
      description: concept.definition,
      type: 'article',
      locale,
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      images: [image],
    },
  };
}

export default async function Page({ params }: ConceptRouteProps) {
  const { locale: raw, slug } = await params;
  const locale = toLocale(raw);
  const concept = getConceptBySlug(locale, slug);

  if (concept === undefined) {
    notFound();
  }

  return <ConceptPage concept={concept} locale={locale} messages={getMessages(locale)} />;
}
