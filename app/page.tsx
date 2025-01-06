import Image from "next/image";
import styles from "./page.module.scss";
import Header from './components/header';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <section className={styles.hero}>
        <div className={styles.hero__content}>
          <h1 className={styles.hero__contentTitle}>Hola peruanos.dev</h1>
          <p className={styles.hero__contentParagraph}>Estamos creando un directorio con todas las comunidades de tecnología en el Perú. Si no encuentras tu comunidad, puedes agregarla desde <Link href="https://github.com/lperezp/peruanos.dev" className={styles.btnLink} target='_blank'>aquí</Link>.</p>
        </div>
        <div className={styles.hero__image}>
          <Image src="./svg/nazca-lines.svg" alt="Líneas decorativas estilo Nazca" width={492} height={287} />
        </div>
      </section>
      <main className={styles.main}>

      </main>
      {/* <Footer /> */}
    </div>
  );
}
