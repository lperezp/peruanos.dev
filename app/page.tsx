import Link from 'next/link';
import type { Metadata } from 'next';

import CardEventHome from './components/events/EventCardHome';
import CardCommunityHome from './components/communities/CommunityCardHome';
import CardProject from './components/projects/ProjectCard';
import { COMMUNITIES } from './data/communities';
import { ICommunity } from './models/community.model';
import { EVENTS } from './data/events';
import { IEvent } from './models/event.model';
import { PROJECTS } from './data/projects';
import { IGitHubRepo } from './models/project.model';
import { CircleCheck, Edit, GitFork, Github } from 'lucide-react';
import { addUTMParams } from './lib/utm';

export const metadata: Metadata = {
  title: 'Inicio | Peruanos.dev',
  description: 'Conecta con la comunidad tech en el Perú. Descubre eventos, únete a comunidades y contribuye a proyectos de código abierto realizados por peruanos.',
  openGraph: {
    title: 'Peruanos.dev',
    description: 'Conecta con la comunidad tech en el Perú. Descubre eventos, únete a comunidades y contribuye a proyectos de código abierto.',
  },
};

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

export default async function Home() {
  const upcomingEvents = EVENTS
    .filter((event) => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  const randomCommunities = getRandomCommunities(COMMUNITIES, 3);

  // Fetch GitHub data for projects
  const projectsData: IGitHubRepo[] = await Promise.all(
    PROJECTS.map(async (project) => {
      try {
        const response = await fetch(`https://api.github.com/repos/${project.owner}/${project.repo}`, {
          next: { revalidate: 3600 } // Cache for 1 hour
        });
        if (!response.ok) throw new Error('Failed to fetch');
        return await response.json();
      } catch (error) {
        console.error(`Error fetching ${project.owner}/${project.repo}:`, error);
        return null;
      }
    })
  ).then(results => results.filter(Boolean));

  return (
    <main className="flex w-full max-w-7xl flex-col items-center bg-background mx-auto">
      <section className={`relative flex flex-col items-center py-25 sm:py-40 px-16 max-sm:px-10 overflow-hidden after:content-[''] after:absolute after:w-[1280px] after:h-[717px] after:bg-[radial-gradient(50%_50%_at_50.03%_49.91%,_rgba(205,43,49,0.35)_0%,_rgba(255,255,255,0)_100%)] after:z-0 after:left-0 after:top-0 after:pointer-events-none max-md:after:w-full max-md:after:h-[431px] dark:after:hidden`}>
        <h1 className="text-5xl sm:text-7xl z-1 text-center font-bold mb-9 leading-[1.4] w-full sm:w-[90%]">Conecta con <span className={`relative max-md:block before:content-[''] before:block before:w-[418px] before:h-[42px] before:bg-[url('/svg/line-text.svg')] before:bg-no-repeat before:bg-cover before:absolute before:-bottom-[10px] before:left-[130px] max-md:before:w-[240px] max-md:before:h-[24px] max-md:before:top-[50px] max-md:before:left-[50px] text-primary-text`}>la comunidad tech</span> en el Perú</h1>
        <p className="text-center z-1 w-fullsm:w-[70%] text-[20px]">Descubre eventos, únete a comunidades y contribuye a proyectos de código abierto realizados en Perú.</p>
        <div className="flex flex-col sm:flex-row gap-6 mt-12 z-1">
          <Link className="px-6 py-3 text-center bg-primary text-white rounded-full hover:bg-primary-hover transition" href='/events'>
            Ver próximos eventos
          </Link>
          <Link className="px-6 py-3 text-center bg-white text-black rounded-full border border-accent hover:bg-hover transition" target='_blank' href={addUTMParams('https://github.com/lperezp/peruanos.dev/issues/new?template=event.yml')} rel="noopener noreferrer">
            Publicar un evento
          </Link>
        </div>
      </section>
      <section className="py-10 sm:py-15 px-5 w-full flex flex-col items-center">
        <h2 className="text-4xl sm:text-5xl text-center font-bold mb-9">Próximos <span className="text-primary-text">Eventos</span></h2>
        <p className="text-center w-full sm:w-[70%] text-[20px]">Participa en meetups, conferencias y workshops organizados por la comunidad peruana.</p>
        <div className="flex flex-col sm:flex-row gap-6 m-0 mt-10 mb-10 sm:m-10">
          {upcomingEvents.map((event: IEvent) => (
            <CardEventHome key={event.title} event={event} />
          ))}
        </div>
        <Link className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-hover transition" href='/events'>
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
        <Link className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-hover transition" href='/community'>
          Explorar comunidades
        </Link>
      </section>
      <section className="py-10 sm:py-15 px-5 w-full flex flex-col items-center">
        <h2 className="text-4xl sm:text-5xl text-center font-bold mb-9">Proyectos <span className="text-primary-text">Open Source</span></h2>
        <p className="text-center w-full sm:w-[70%] text-[20px]">Descubre y contribuye a proyectos de código abierto creados por desarrolladores peruanos.</p>
        <div className="flex flex-col sm:flex-row gap-6 m-0 mt-10 mb-10 sm:m-10">
          {projectsData.map((project: IGitHubRepo) => (
            <CardProject key={project.full_name} project={project} />
          ))}
        </div>
        <Link className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-hover transition" href='/projects'>
          Ver todos los proyectos
        </Link>
      </section>
      <section className="py-10 sm:py-15 px-5 w-full flex flex-col items-center">
        <h2 className="text-4xl sm:text-5xl text-center font-bold mb-4">¿Cómo <span className="text-primary-text">contribuir?</span></h2>
        <p className="text-center w-full sm:w-[70%] text-[18px] text-accent mb-12">Este es un portal comunitario. Cualquiera puede agregar eventos, comunidades o proyectos mediante un Pull Request</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-5xl mb-12">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-4">1</div>
            <Github className="w-8 h-8 mb-3 text-primary" />
            <h3 className="font-bold text-lg mb-2">Fork el repositorio</h3>
            <p className="text-sm text-accent">Haz fork del repositorio peruanos.dev en GitHub.</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-4">2</div>
            <Edit className="w-8 h-8 mb-3 text-primary" />
            <h3 className="font-bold text-lg mb-2">Edita el contenido</h3>
            <p className="text-sm text-accent">Agrega tu evento, comunidad o proyecto en el archivo correspondiente.</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-4">3</div>
            <GitFork className="w-8 h-8 mb-3 text-primary" />
            <h3 className="font-bold text-lg mb-2">Envía un Pull Request</h3>
            <p className="text-sm text-accent">Crea un pull request con tus cambios y una descripción clara.</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-4">4</div>
            <CircleCheck className="w-8 h-8 mb-3 text-primary" />
            <h3 className="font-bold text-lg mb-2">¡Listo!</h3>
            <p className="text-sm text-accent">La comunidad revisará y aprobará tu contribución.</p>
          </div>
        </div>

        <div className="bg-background border border-accent rounded-lg p-8 w-full max-w-2xl">
          <h3 className="font-bold text-xl mb-4">¿Qué puedes agregar?</h3>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Eventos:</strong> Meetups, conferencias, workshops, hackathons y cualquier evento tech en Perú.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Comunidades:</strong> Grupos de usuarios, comunidades tech, espacios de aprendizaje y networking.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <div>
                <strong>Proyectos Open Source:</strong> Librerías, herramientas, aplicaciones creadas por desarrolladores peruanos.
              </div>
            </li>
          </ul>
          <div className="flex justify-center">
            <Link
              className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-hover transition"
              href={addUTMParams('https://github.com/lperezp/peruanos.dev')}
              target='_blank'
              rel="noopener noreferrer"
            >
              Ir al repositorio
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}


