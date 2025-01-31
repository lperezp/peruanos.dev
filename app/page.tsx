import Link from 'next/link';
import styles from './page.module.scss';
import CardEventHome from './components/card-event-home/card-event-home';
import CardCommunityHome from './components/card-community-home/card-community-home';
import { COMMUNITIES } from './data/communities';
import { ICommunity } from './models/community.model';
import { EVENTS } from './data/events';
import { IEvent } from './models/event.model';

export const dynamic = 'force-dynamic';

function getRandomCommunities(communities: ICommunity[], count: number) {
  // Fisher-Yates shuffle
  const shuffled = [...communities];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

export default function Home() {
  const upcomingEvents = EVENTS
    .filter((event) => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  const randomCommunities = getRandomCommunities(COMMUNITIES, 3);

  return (
    <main className="flex w-full max-w-7xl flex-col items-center bg-[var(--color-background)] mx-auto">
      <section className={`${styles.hero} py-40 px-16 flex flex-col items-center max-sm:px-10`}>
        <h1 className="text-5xl sm:text-7xl z-1 text-center font-bold mb-9 leading-[1.4] w-full sm:w-[90%]">Conecta con <span className={`${styles.titleCustom} text-[var(--color-primary)]`}>la comunidad tech</span> en el Perú</h1>
        <p className="text-center z-1 w-fullsm:w-[70%] text-[20px]">Descubre eventos, únete a comunidades y contribuye a proyectos de código abierto realizados en Perú.</p>
        <div className="flex flex-col sm:flex-row gap-6 mt-12 z-1">
          <Link className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-full hover:bg-[var(--color-primary-hover)] transition" href='/events'>
            Ver próximos eventos
          </Link>
          <Link className="px-6 py-3 bg-[var(--color-white)] text-black rounded-full border border-[var(--color-gray-light)] hover:bg-[var(--color-gray-light)] transition" target='_blank' href='https://github.com/lperezp/peruanos.dev/pulls' rel="noopener noreferrer">
            Publicar un evento
          </Link>
        </div>
      </section>
      <section className="py-10 sm:py-15 px-5 w-full flex flex-col items-center">
        <h2 className="text-4xl sm:text-5xl text-center font-bold mb-9">Próximos <span className="text-[var(--color-primary)]">Eventos</span></h2>
        <p className="text-center w-full sm:w-[70%] text-[20px]">Participa en meetups, conferencias y workshops organizados por la comunidad peruana.</p>
        <div className="flex flex-col sm:flex-row gap-6 m-0 mt-10 mb-10 sm:m-10">
          {upcomingEvents.map((event: IEvent) => (
            <CardEventHome key={event.title} event={event} />
          ))}
        </div>
        <Link className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-full hover:bg-[var(--color-primary-hover)] transition" href='/events'>
          Ver todos los eventos
        </Link>
      </section>
      <section className="py-10 sm:py-15 px-5 w-full flex flex-col items-center">
        <h2 className="text-4xl sm:text-5xl text-center font-bold mb-9">Comunidades</h2>
        <p className="text-center w-full sm:w-[70%] text-[20px]">Descubre y únete a las comunidades que impulsan la tecnología en el Perú.</p>
        <div className="flex flex-col sm:flex-row gap-6 m-0 mt-10 mb-10 sm:m-10">
          {randomCommunities.map((community: ICommunity) => (
            <CardCommunityHome
              key={community.name}
              community={community}
            />
          ))}
        </div>
        <Link className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-full hover:bg-[var(--color-primary-hover)] transition" href='/communities'>
          Explorar comunidades
        </Link>
      </section>
    </main>
  );
}


