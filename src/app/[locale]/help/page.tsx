import type { Metadata } from 'next';

import { HelpPage } from '@/views/HelpPage';

export const metadata: Metadata = {
  title: 'Коли потрібна допомога',
  description:
    'Орієнтири, за якими зрозуміло, що варто звернутись до фахівця, і українські лінії підтримки.',
};

export default function Page() {
  return <HelpPage />;
}
