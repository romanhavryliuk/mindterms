/**
 * Іконки кнопок шапки — SVG, а не символи шрифту. Символ «⌕» брався
 * з резервного шрифту, займав 9×8 px у кнопці висотою 38 px і на різних
 * системах виглядав по-різному. Розмір і товщина лінії тут однакові.
 */

const ICON_SIZE = 18;
const STROKE_WIDTH = 2;

const iconProps = {
  width: ICON_SIZE,
  height: ICON_SIZE,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: STROKE_WIDTH,
  strokeLinecap: 'round',
  'aria-hidden': true,
} as const;

export const SearchIcon = () => (
  <svg {...iconProps}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-4-4" />
  </svg>
);

export const MenuIcon = () => (
  <svg {...iconProps}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const CloseIcon = () => (
  <svg {...iconProps}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
