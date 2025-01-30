import styles from './page.module.scss';

export default function Home() {
  return (
    <div className="flex items-center justify-center font-sans bg-[var(--color-background)]">
      <main className="flex w-full max-w-7xl flex-col items-center justify-between py-40 px-16 bg-[var(--color-background)]">
        <h1 className="text-7xl text-center font-bold mb-9 leading-[1.4]">Descubre <span className={`${styles.titleCustom} text-[var(--color-primary)]`}>los próximos eventos tech</span> en el Perú</h1>
        <p className="text-center w-[70%] text-[20px]">Descubre eventos, únete a comunidades y contribuye a proyectos de código abierto realizados en Perú.</p>
      </main>
    </div>
  );
}


