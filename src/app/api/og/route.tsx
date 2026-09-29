import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { ImageResponse } from 'next/og';

import { DEFAULT_LOCALE, formatCount, getMessages, isLocale, type Locale } from '@/i18n';
import {
  getAllCategories,
  getAllConcepts,
  getCategoryById,
  getCollectionById,
  getConceptBySlug,
} from '@/services/contentService';
import type { EvidenceLevel } from '@/types';
import { CATEGORY_HEX, EVIDENCE_HEX, OG_HEX, SITE_NAME } from '@/utils/constants';
import { originalTerm } from '@/utils/formatters';

/**
 * Єдиний серверний код проєкту: OG-зображення не можна відрендерити наперед
 * для довільного слага, тому це маршрут, а не статичний файл.
 *
 * Три види картки — поняття, добірка й сайт загалом — ділять один макет:
 * шапка з темою, заголовок, підзаголовок і нижній рядок. Відрізняються лише
 * даними, тож JSX тут один.
 *
 * Шрифти лежать поруч із маршрутом; їхнє потрапляння у збірку Vercel
 * гарантує outputFileTracingIncludes у next.config.ts. PT Sans узятий
 * замість інтерфейсного Inter свідомо: satori не вміє варіативних
 * шрифтів, а статичних інстансів Inter Google Fonts не роздає.
 */
export const runtime = 'nodejs';

const WIDTH = 1200;
const HEIGHT = 630;

type LoadedFonts = { regular: Buffer; bold: Buffer };

let fontCache: LoadedFonts | null = null;

async function loadFonts(): Promise<LoadedFonts> {
  if (fontCache === null) {
    const dir = join(process.cwd(), 'src/app/api/og');
    const [regular, bold] = await Promise.all([
      readFile(join(dir, 'PTSans-Regular.ttf')),
      readFile(join(dir, 'PTSans-Bold.ttf')),
    ]);
    fontCache = { regular, bold };
  }
  return fontCache;
}

type Card = {
  accent: string;
  kicker: string;
  title: string;
  subtitle: string | null;
  /** Бейдж доказовості доречний лише для поняття */
  evidence: EvidenceLevel | null;
  /** Підпис унизу ліворуч там, де бейджа немає */
  note: string | null;
};

/** Картка сайту: віддається, коли параметрів немає — для головної й розділів */
function siteCard(locale: Locale): Card {
  const messages = getMessages(locale);
  const concepts = getAllConcepts(locale).length;
  const categories = getAllCategories(locale).length;

  return {
    accent: OG_HEX.accent,
    kicker: messages.site.tagline,
    title: messages.home.titleLead,
    subtitle: null,
    evidence: null,
    note: [
      formatCount(concepts, messages.plural.concept, locale),
      formatCount(categories, messages.plural.category, locale),
    ].join(' · '),
  };
}

function conceptCard(locale: Locale, slug: string): Card | null {
  const concept = getConceptBySlug(locale, slug);
  if (concept === undefined) return null;

  const category = getCategoryById(locale, concept.category);

  return {
    accent: category === undefined ? OG_HEX.accent : CATEGORY_HEX[category.color],
    kicker: category?.name ?? '',
    title: concept.title,
    subtitle: originalTerm(concept.title, concept.original),
    evidence: concept.evidence,
    note: null,
  };
}

function collectionCard(locale: Locale, slug: string): Card | null {
  const collection = getCollectionById(locale, slug);
  if (collection === undefined) return null;

  const messages = getMessages(locale);

  return {
    accent: OG_HEX.accent,
    kicker: messages.collection.kicker,
    title: collection.title,
    subtitle: collection.description,
    evidence: null,
    note: formatCount(collection.concepts.length, messages.plural.concept, locale),
  };
}

export async function GET(request: Request): Promise<Response> {
  const params = new URL(request.url).searchParams;
  const rawLocale = params.get('locale') ?? DEFAULT_LOCALE;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const messages = getMessages(locale);

  const slug = params.get('slug');
  const collection = params.get('collection');

  const card =
    slug !== null
      ? conceptCard(locale, slug)
      : collection !== null
        ? collectionCard(locale, collection)
        : siteCard(locale);

  if (card === null) {
    return new Response(messages.metadata.conceptNotFound, { status: 404 });
  }

  // Готуємо бейдж заздалегідь: у JSX рівень лежить у замиканні, і там його
  // тип уже не звузити
  const badge =
    card.evidence === null
      ? null
      : {
          level: card.evidence,
          color: EVIDENCE_HEX[card.evidence],
          label:
            `${messages.evidence.levels[card.evidence].label} · ` +
            `${card.evidence} ${messages.common.evidenceScale}`,
        };

  const fonts = await loadFonts();

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        padding: '64px 72px',
        backgroundColor: OG_HEX.bg,
        // Кольорова смуга теми вздовж верхнього краю
        borderTop: `16px solid ${card.accent}`,
        fontFamily: 'PT Sans',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 8,
              backgroundColor: card.accent,
            }}
          />
          <div
            style={{
              color: card.accent,
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: 'uppercase',
            }}
          >
            {card.kicker}
          </div>
        </div>

        <div
          style={{
            marginTop: 28,
            color: OG_HEX.ink,
            fontSize: card.title.length > 34 ? 66 : 82,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: -1.5,
          }}
        >
          {card.title}
        </div>

        {card.subtitle !== null && (
          <div
            style={{
              marginTop: 20,
              color: OG_HEX.echo,
              fontSize: 32,
            }}
          >
            {card.subtitle}
          </div>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {badge === null ? (
          <div style={{ color: OG_HEX.echo, fontSize: 28 }}>{card.note ?? ''}</div>
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '12px 26px',
              borderRadius: 999,
              border: `2px solid ${badge.color}`,
              color: badge.color,
              fontSize: 28,
            }}
          >
            {[1, 2, 3].map((dot) => (
              <div
                key={dot}
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 7,
                  border: `2px solid ${badge.color}`,
                  backgroundColor: dot <= badge.level ? badge.color : 'transparent',
                }}
              />
            ))}
            {/* satori вимагає рівно один дочірній вузол без display: flex */}
            <div style={{ marginLeft: 4 }}>{badge.label}</div>
          </div>
        )}

        <div
          style={{
            color: OG_HEX.ink,
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: -0.5,
          }}
        >
          {SITE_NAME}
        </div>
      </div>
    </div>,
    {
      width: WIDTH,
      height: HEIGHT,
      fonts: [
        { name: 'PT Sans', data: fonts.regular, weight: 400, style: 'normal' },
        { name: 'PT Sans', data: fonts.bold, weight: 700, style: 'normal' },
      ],
    }
  );
}
