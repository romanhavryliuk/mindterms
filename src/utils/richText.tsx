import type { ReactNode } from 'react';

/**
 * Абзаци в confusions містять інлайновий <b>. Замість dangerouslySetInnerHTML
 * розбираємо єдиний дозволений тег у React-вузли: сирий HTML у DOM не потрапляє.
 */
const BOLD_PATTERN = /<b>(.*?)<\/b>/g;

export function renderInlineMarkup(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;

  for (const match of text.matchAll(BOLD_PATTERN)) {
    const start = match.index;
    const [full, inner = ''] = match;

    if (start > lastIndex) {
      nodes.push(text.slice(lastIndex, start));
    }

    nodes.push(<strong key={key++}>{inner}</strong>);
    lastIndex = start + full.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}
