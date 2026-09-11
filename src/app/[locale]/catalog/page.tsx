import type { Metadata } from 'next';

import { CatalogPage } from '@/views/CatalogPage';

export const metadata: Metadata = {
  title: 'Каталог понять',
  description: 'Усі 48 понять довідника з фільтрами за темою та рівнем доказовості.',
};

export default function Page() {
  return <CatalogPage />;
}
