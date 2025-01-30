import type { Metadata } from "next";
import { GoogleSans } from './fonts';
import "./globals.scss";
import Header from './components/Header/header';
import { ThemeProvider } from './context/ThemeContext';
import Footer from './components/Footer/footer';

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
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
