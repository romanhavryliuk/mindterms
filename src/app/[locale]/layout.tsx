import type { Metadata } from 'next';
import { Literata, Unbounded } from 'next/font/google';

import { Disclaimer } from '@/components/Disclaimer';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { getMessages, localeAlternates, LOCALES, toLocale } from '@/i18n';
import { SITE_NAME, SITE_URL } from '@/utils/constants';

import '@/styles/variables.css';
import '@/styles/globals.css';

// Literata — весь основний текст, Unbounded — заголовки, мітки й бейджі.
// Той самий набір оголошено в app/not-found.tsx: next/font кладе свій CSS
// у чанк того сегмента, який його імпортує, а 404 живе поза цим layout.
const serif = Literata({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600'],
  variable: '--font-serif-face',
  display: 'swap',
});

const display = Unbounded({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500'],
  variable: '--font-display-face',
  display: 'swap',
});

/** Поза списком LOCALES локалей немає: /xx має давати 404, а не копію сайту */
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = toLocale(raw);
  const messages = getMessages(locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${SITE_NAME} — ${messages.site.tagline}`,
      template: `%s — ${SITE_NAME}`,
    },
    description: messages.site.description,
    applicationName: SITE_NAME,
    openGraph: {
      siteName: SITE_NAME,
      locale,
      type: 'website',
    },
    alternates: localeAlternates('/', locale),
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale: raw } = await params;
  const locale = toLocale(raw);
  const messages = getMessages(locale);

  return (
    <html lang={locale} className={`${serif.variable} ${display.variable}`}>
      <body>
        <a className="visuallyHidden" href="#main">
          {messages.nav.skipToContent}
        </a>

        <Header locale={locale} messages={messages} />
        <Disclaimer messages={messages} variant="banner" />

        <main id="main">{children}</main>

        <Footer locale={locale} messages={messages} />
      </body>
    </html>
  );
}
