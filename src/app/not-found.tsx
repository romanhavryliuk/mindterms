import { Literata, Unbounded } from 'next/font/google';

import { DEFAULT_LOCALE, getMessages } from '@/i18n';
import { SITE_NAME } from '@/utils/constants';
import { NotFoundPage } from '@/views/NotFoundPage';

import '@/styles/not-found.css';

// Той самий набір, що й у layout локалі. Винести його в спільний модуль
// не можна: next/font кладе свій CSS у чанк того сегмента, який його
// імпортує, і для 404 гарнітури просто не завантажились би.
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

/**
 * 404 для адрес поза сегментом локалі: /вигадана-адреса.
 *
 * Кореневий layout живе в [locale] і сюди не дістає, тому документ навколо
 * цієї сторінки малює сам Next. Малювати тут власний <html> не можна —
 * вийде вкладений тег і помилка розбору, — тож мова та шрифти висять на
 * обгортці, а <title> піднімає в <head> React.
 *
 * Мову вгадати ніде: адреса не містить сегмента локалі, тому лишається
 * типова.
 */
export default function NotFound() {
  const messages = getMessages(DEFAULT_LOCALE);

  return (
    <div lang={DEFAULT_LOCALE} className={`${serif.variable} ${display.variable}`}>
      <title>{`${messages.notFound.metaTitle} — ${SITE_NAME}`}</title>
      {/* noindex для цієї сторінки Next проставляє сам */}
      <meta name="description" content={messages.notFound.lead} />

      <main id="main">
        <NotFoundPage locale={DEFAULT_LOCALE} messages={messages} />
      </main>
    </div>
  );
}
