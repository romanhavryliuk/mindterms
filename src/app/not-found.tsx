import type { Metadata } from 'next';

import { NotFoundPage } from '@/views/NotFoundPage';

export const metadata: Metadata = {
  title: 'Сторінку не знайдено',
  robots: { index: false, follow: true },
};

/** 404 для адрес поза сегментом локалі — без шапки й підвалу */
export default function NotFound() {
  return <NotFoundPage />;
}
