import type { Metadata } from 'next';

import { IndexPage } from '@/views/IndexPage';

export const metadata: Metadata = {
  title: 'Покажчик за абеткою',
  description: 'Усі поняття довідника mindterms за назвою, згруповані за літерою.',
};

export default function Page() {
  return <IndexPage />;
}
