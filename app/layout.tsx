import { Metadata } from 'next';
import { GoogleSans } from './fonts';
import "./globals.scss";
import { ThemeProvider } from './context/ThemeContext';
import { Analytics } from "@vercel/analytics/next"
import Header from './components/header/header';
import Footer from './components/footer/footer';
import { organizationSchema, websiteSchema } from './lib/structured-data';

export const metadata: Metadata = {
  metadataBase: new URL('https://peruanos.dev'),
  title: {
    default: "Peruanos.dev",
    template: "%s | Peruanos.dev"
  },
  description: "Conecta con la comunidad tech en el Perú. Descubre eventos, únete a comunidades y contribuye a proyectos de código abierto realizados por peruanos.",
  keywords: ['comunidad tech Perú', 'eventos tecnología Perú', 'desarrolladores peruanos', 'comunidades tecnológicas', 'meetups Perú', 'código abierto Perú', 'tech Peru'],
  authors: [{ name: 'Peruanos.dev' }],
  creator: 'Peruanos.dev',
  publisher: 'Peruanos.dev',
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: 'https://peruanos.dev',
    siteName: 'Peruanos.dev',
    title: 'Peruanos.dev',
    description: 'Conecta con la comunidad tech en el Perú. Descubre eventos, únete a comunidades y contribuye a proyectos de código abierto.',
    images: [
      {
        url: 'https://peruanos.dev/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Peruanos.dev',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Peruanos.dev',
    description: 'Conecta con la comunidad tech en el Perú. Descubre eventos, únete a comunidades y contribuye a proyectos de código abierto.',
    images: ['https://peruanos.dev/images/twitter-image.png'],
    creator: '@peruanosdev',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'googlec8db8ebb988f2c99',
    // yandex: 'tu-codigo-yandex',
    // bing: 'tu-codigo-bing',
  },
  alternates: {
    canonical: 'https://peruanos.dev',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="es">
      <head>
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=G-P9NG7MDGC5`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-P9NG7MDGC5');
                `,
            }}
          />
        </>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body
        className={`${GoogleSans.className} antialiased`}
      >
        <ThemeProvider>
          <Header />
          {children}
          <Analytics />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
