import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { ImageResponse } from 'next/og';

import { DEFAULT_LOCALE, getMessages, isLocale, type Locale } from '@/i18n';
import { getCategoryById, getConceptBySlug } from '@/services/contentService';
import { CATEGORY_HEX, EVIDENCE_HEX, OG_HEX, SITE_NAME } from '@/utils/constants';
import { originalTerm } from '@/utils/formatters';

/**
 * Єдиний серверний код проєкту: OG-зображення не можна відрендерити наперед
 * для довільного слага, тому це маршрут, а не статичний файл.
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

export async function GET(request: Request): Promise<Response> {
  const params = new URL(request.url).searchParams;
  const slug = params.get('slug');
  const rawLocale = params.get('locale') ?? DEFAULT_LOCALE;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const messages = getMessages(locale);
  const concept = slug === null ? undefined : getConceptBySlug(locale, slug);

  if (concept === undefined) {
    return new Response(messages.metadata.conceptNotFound, { status: 404 });
  }

  const category = getCategoryById(locale, concept.category);
  const accent = category === undefined ? OG_HEX.accent : CATEGORY_HEX[category.color];
  const evidenceColor = EVIDENCE_HEX[concept.evidence];
  const evidenceLabel = messages.evidence.levels[concept.evidence].label;
  const original = originalTerm(concept.title, concept.original);
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
        borderTop: `16px solid ${accent}`,
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
              backgroundColor: accent,
            }}
          />
          <div
            style={{
              color: accent,
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: 'uppercase',
            }}
          >
            {category?.name ?? ''}
          </div>
        </div>

        <div
          style={{
            marginTop: 28,
            color: OG_HEX.ink,
            fontSize: concept.title.length > 34 ? 66 : 82,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: -1.5,
          }}
        >
          {concept.title}
        </div>

        {original !== null && (
          <div
            style={{
              marginTop: 20,
              color: OG_HEX.echo,
              fontSize: 32,
            }}
          >
            {original}
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
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            padding: '12px 26px',
            borderRadius: 999,
            border: `2px solid ${evidenceColor}`,
            color: evidenceColor,
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
                border: `2px solid ${evidenceColor}`,
                backgroundColor: dot <= concept.evidence ? evidenceColor : 'transparent',
              }}
            />
          ))}
          {/* satori вимагає рівно один дочірній вузол без display: flex */}
          <div style={{ marginLeft: 4 }}>
            {`${evidenceLabel} · ${concept.evidence} ${messages.common.evidenceScale}`}
          </div>
        </div>

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
