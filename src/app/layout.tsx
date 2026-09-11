import type { Metadata } from 'next';
import { Literata, Unbounded } from 'next/font/google';

import { DEFAULT_LOCALE, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/utils/constants';

import '@/styles/variables.css';
import '@/styles/globals.css';

// Literata — весь основний текст, Unbounded — заголовки, мітки й бейджі
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — терміни про психіку`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    siteName: SITE_NAME,
    locale: 'uk_UA',
    type: 'website',
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
};

/**
 * Кореневий layout тримає <html> і <body>, щоб їх мали всі сторінки —
 * зокрема глобальна 404 для адрес поза сегментом локалі.
 * Шапка й підвал живуть у layout локалі.
 */
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang={DEFAULT_LOCALE} className={`${serif.variable} ${display.variable}`}>
      <body>{children}</body>
    </html>
  );
}
