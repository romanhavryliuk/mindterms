import type { Metadata } from 'next';

import { ConfusePage } from '@/views/ConfusePage';

export const metadata: Metadata = {
  title: 'Що з чим плутають',
  description:
    'Пари психологічних понять, які в побутовій мові злилися в одне, і практична різниця між ними.',
};

export default function Page() {
  return <ConfusePage />;
}
