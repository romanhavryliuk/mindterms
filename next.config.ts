import type { NextConfig } from 'next';

import { DEFAULT_LOCALE } from './src/i18n';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Шрифт для OG-зображень читається через fs, тож його треба явно
  // покласти в бандл функції — трасування імпортів його не бачить
  outputFileTracingIncludes: {
    '/api/og': [
      './src/app/api/og/PTSans-Regular.ttf',
      './src/app/api/og/PTSans-Bold.ttf',
    ],
  },

  async redirects() {
    return [
      {
        source: '/',
        destination: `/${DEFAULT_LOCALE}`,
        permanent: false,
      },
    ];
  },

  // Сайт віддає лише статичний текст і не має форм, тож повний CSP тут
  // зайвий. Ці чотири заголовки не потребують налаштування під вміст
  // і закривають найпростіші класи атак.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // не дати браузеру вгадувати тип файлу всупереч Content-Type
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // заборонити вбудовування сайту в чужий iframe
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          // не передавати повну адресу сторінки на чужі домени
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // жодна зі сторінок не користується камерою, мікрофоном і геолокацією
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
