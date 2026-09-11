import type { Metadata } from 'next';

import { SITE_DESCRIPTION, SITE_NAME } from '@/utils/constants';
import { HomePage } from '@/views/HomePage';

export const metadata: Metadata = {
  // Головна не використовує шаблон «%s — mindterms»
  title: {
    absolute: `${SITE_NAME} — терміни про психіку`,
  },
  description: SITE_DESCRIPTION,
};

export default function Page() {
  return <HomePage />;
}
