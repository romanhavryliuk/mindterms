import type { Metadata } from 'next';

import { SearchPage } from '@/views/SearchPage';

export const metadata: Metadata = {
  title: 'Пошук',
  description: 'Пошук по назвах, визначеннях і тексту статей довідника mindterms.',
  // Сторінка результатів не має самостійної цінності для індексу
  robots: { index: false, follow: true },
};

export default function Page() {
  return <SearchPage />;
}
