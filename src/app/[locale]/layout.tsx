import { Disclaimer } from '@/components/Disclaimer';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { LOCALES } from '@/utils/constants';

/** Поза списком LOCALES локалей немає: /en чи /bogus мають давати 404, а не копію сайту */
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

type LocaleLayoutProps = {
  children: React.ReactNode;
};

export default function LocaleLayout({ children }: LocaleLayoutProps) {
  return (
    <>
      <a className="visuallyHidden" href="#main">
        Перейти до вмісту
      </a>

      <Header />
      <Disclaimer variant="banner" />

      <main id="main">{children}</main>

      <Footer />
    </>
  );
}
