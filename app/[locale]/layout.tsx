import { notFound } from 'next/navigation';
import { locales, type Locale, getDictionary } from '@/lib/i18n';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PekaesikWidget } from '@/components/PekaesikWidget';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const dict = getDictionary(locale as Locale);

  return (
    <>
      <Header locale={locale as Locale} dict={dict} />
      <main className="relative">{children}</main>
      <Footer locale={locale as Locale} dict={dict} />
      <PekaesikWidget locale={locale as Locale} />
    </>
  );
}
