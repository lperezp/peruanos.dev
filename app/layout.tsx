import type { Metadata } from "next";
import { GoogleSans } from './fonts';
import "./globals.scss";
import { ThemeProvider } from './context/ThemeContext';
import { Analytics } from "@vercel/analytics/next"
import Footer from './components/footer/Footer';
import Header from './components/header/Header';

export const metadata: Metadata = {
  title: "Inicio | peruanos.dev",
  description: "Descubre eventos, únete a comunidades y contribuye a proyectos de código abierto realizados en Perú.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
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
