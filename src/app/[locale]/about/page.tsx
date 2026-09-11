import type { Metadata } from 'next';

import { AboutPage } from '@/views/AboutPage';

export const metadata: Metadata = {
  title: 'Про проєкт',
  description:
    'Редакційний підхід mindterms: звідки взята інформація, навіщо шкала доказовості та які обмеження має проєкт.',
};

export default function Page() {
  return <AboutPage />;
}
