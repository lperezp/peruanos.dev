import Link from 'next/link';
import styles from './page.module.scss';
import CardEventHome from './components/card-event-home/card-event-home';
import CardCommunityHome from './components/card-community-home/card-community-home';

export default function Home() {
  return (
    <main className="flex w-full max-w-7xl flex-col items-center bg-[var(--color-background)] mx-auto">
      <section className="py-40 px-16 flex flex-col items-center " >
        <h1 className="text-7xl text-center font-bold mb-9 leading-[1.4] w-[90%]">Conecta con <span className={`${styles.titleCustom} text-[var(--color-primary)]`}>la comunidad tech</span> en el Perú</h1>
        <p className="text-center w-[70%] text-[20px]">Descubre eventos, únete a comunidades y contribuye a proyectos de código abierto realizados en Perú.</p>
        <div className="flex flex-row gap-6 mt-12">
          <Link className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-full hover:bg-[var(--color-primary-hover)] transition" href='/events'>
            Ver próximos eventos
          </Link>
          <Link className="px-6 py-3 bg-[var(--color-white)] text-black rounded-full border border-[var(--color-gray-light)] hover:bg-[var(--color-gray-light)] transition" target='_blank' href='https://github.com/lperezp/peruanos.dev/pulls' rel="noopener noreferrer">
            Publicar un evento
          </Link>
        </div>
      </section>
      <section className="py-15 w-full flex flex-col items-center">
        <h2 className="text-5xl text-center font-bold mb-9  w-[90%]">Próximos <span className="text-[var(--color-primary)]">Eventos</span></h2>
        <p className="text-center w-[70%] text-[20px]">Participa en meetups, conferencias y workshops organizados por la comunidad peruana.</p>
        <div className="flex flex-row gap-6 m-10">
          <CardEventHome />
          <CardEventHome />
          <CardEventHome />
        </div>
        <Link className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-full hover:bg-[var(--color-primary-hover)] transition" href='/events'>
          Ver todos los eventos
        </Link>
      </section>
      <section className="py-15 w-full flex flex-col items-center">
        <h2 className="text-5xl text-center font-bold mb-9  w-[90%]">Comunidades</h2>
        <p className="text-center w-[70%] text-[20px]">Descubre y únete a las comunidades que impulsan la tecnología en el Perú.</p>
        <div className="flex flex-row gap-6 m-10">
          <CardCommunityHome />
          <CardCommunityHome />
          <CardCommunityHome />
        </div>
        <Link className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-full hover:bg-[var(--color-primary-hover)] transition" href='/communities'>
          Explorar comunidades
        </Link>
      </section>
    </main>
  );
}


