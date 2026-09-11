import type { NextConfig } from 'next';

import { DEFAULT_LOCALE } from './src/utils/constants';

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
};

export default nextConfig;
