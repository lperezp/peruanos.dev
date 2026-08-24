import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

import CardEventHome from './components/events/EventCardHome';
import CardCommunityHome from './components/communities/CommunityCardHome';
import StartupCardHome from './components/startups/StartupCardHome';
import CardProject from './components/projects/ProjectCard';
import { COMMUNITIES } from './data/communities';
import { ICommunity } from './models/community.model';
import { STARTUPS } from './data/startups';
import { Startup } from './models/startup.model';
import { EVENTS } from './data/events';
import { IEvent } from './models/event.model';
import { PROJECTS } from './data/projects';
import { IGitHubRepo } from './models/project.model';
import { CircleCheck, Edit, GitFork, Github } from 'lucide-react';
import { addUTMParams } from './lib/utm';
import { eventSchema, itemListSchema, softwareSourceCodeSchema, startupSchema } from './lib/structured-data';
import TrackedLink from './components/ui/TrackedLink';

export const metadata: Metadata = {
  title: 'Peruanos.dev | Conecta con la comunidad tech en el Perú.',
  description: 'Conecta con la comunidad tech en el Perú. Descubre eventos, únete a comunidades y contribuye a proyectos de código abierto realizados por peruanos.',
  keywords: ['eventos', 'tech', 'meetups', 'conferencias', 'tecnología', 'workshops', 'desarrollo', 'hackathons', 'peru', 'comunidad', 'desarrolladores'],
  authors: [{ name: 'Luis Eduardo', url: 'https://lperezp.dev' }],
  openGraph: {
    title: 'Peruanos.dev | Conecta con la comunidad tech en el Perú.',
    description: 'Conecta con la comunidad tech en el Perú. Descubre eventos, únete a comunidades y contribuye a proyectos de código abierto.',
    images: [
      {
        url: 'https://peruanos.dev/images/og-image.png',
      }
    ],
     url: 'https://peruanos.dev/',
        siteName: 'Peruanos.dev',
        locale: 'es_PE',
        type: 'website',
  },
    twitter: {
        card: 'summary_large_image',
        title: 'Peruanos.dev | Conecta con la comunidad tech en el Perú.',
        description: 'Conecta con la comunidad tech en el Perú. Descubre eventos, únete a comunidades y contribuye a proyectos de código abierto.',
      images: 'https://peruanos.dev/images/og-image.png',
        creator: '@lperezp_pe',
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

function getRandomStartups(startups: Startup[], count: number) {
  const shuffled = [...startups];
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
  const randomStartups = getRandomStartups(STARTUPS, 3);

  // Fetch GitHub data for projects
  type GitHubContributor = { login: string; avatar_url: string; html_url: string; contributions: number; type: string };
  type GitHubIssue = { user: { login: string; avatar_url: string; html_url: string; type: string }; pull_request?: object };

  const [contributorsRes, issuesRes] = await Promise.all([
    fetch('https://api.github.com/repos/lperezp/peruanos.dev/contributors?per_page=100', { next: { revalidate: 3600 } }),
    fetch('https://api.github.com/repos/lperezp/peruanos.dev/issues?state=all&per_page=100', { next: { revalidate: 3600 } }),
  ]);

  const rawContributors: GitHubContributor[] = contributorsRes.ok
    ? (await contributorsRes.json()).filter((c: GitHubContributor) => c.type !== 'Bot')
    : [];

  const rawIssues: GitHubIssue[] = issuesRes.ok ? await issuesRes.json() : [];
  // Merge contributors and issue-only authors, deduped by login
  const seen = new Set(rawContributors.map((c) => c.login));
  const contributors: GitHubContributor[] = [...rawContributors];
  for (const issue of rawIssues) {
    const u = issue.user;
    if (!issue.pull_request && u?.type !== 'Bot' && !seen.has(u?.login)) {
      seen.add(u.login);
      contributors.push({ login: u.login, avatar_url: u.avatar_url, html_url: u.html_url, contributions: 0, type: u.type });
    }
  }
  contributors.sort((a, b) => a.login.localeCompare(b.login));

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

  const jsonLdEvents = itemListSchema(upcomingEvents.map(event => eventSchema({
    name: event.title,
    description: event.description,
    startDate: event.date,
    location: event.location,
    organizer: event.organizer || '',
    url: event.registration_url,
  })));

  const jsonLdProjects = itemListSchema(projectsData.map(project => softwareSourceCodeSchema({
    name: project.name,
    description: project.description,
    codeRepository: project.html_url,
    author: project.owner.login,
  })));

  const jsonLdStartups = itemListSchema(randomStartups.map(startup => startupSchema({
    name: startup.name,
    description: startup.description,
    url: startup.website,
    logo: startup.logo,
    location: startup.location,
    industry: startup.industry,
  })));

  return (
    <main className="flex w-full max-w-7xl flex-col items-center bg-background mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdEvents) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProjects) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdStartups) }}
      />
      <section className="relative flex flex-col items-center py-25 sm:py-40 px-16 max-sm:px-10 overflow-hidden hero-gradient">
        <h1 className="text-5xl sm:text-7xl z-10 text-center font-bold mb-9 leading-[1.4] w-full sm:w-[90%]">Conecta con <span className={`relative max-md:block before:content-[''] before:block before:w-[418px] before:h-[42px] before:bg-[url('/svg/line-text.svg')] before:bg-no-repeat before:bg-cover before:absolute before:-bottom-[10px] before:left-[130px] max-md:before:w-[240px] max-md:before:h-[24px] max-md:before:top-[50px] max-md:before:left-[50px] text-primary-text`}>la comunidad tech</span> en el Perú</h1>
        <p className="text-center z-10 w-full sm:w-[70%] text-[20px]">Descubre eventos, únete a comunidades y contribuye a proyectos de código abierto realizados en Perú.</p>
        <div className="flex flex-col sm:flex-row gap-6 mt-12 z-10">
          <Link className="px-6 py-3 text-center bg-primary text-white rounded-full hover:bg-primary-hover transition" href='/events'>
            Ver próximos eventos
          </Link>
          <TrackedLink
            className="px-6 py-3 text-center bg-background text-foreground rounded-full border border-accent hover:bg-hover transition"
            target='_blank'
            href={addUTMParams('https://github.com/lperezp/peruanos.dev/issues/new?template=event.yml')}
            rel="noopener noreferrer"
            eventName="click_publish_event"
            eventParams={{ event_name: 'Publicar evento', event_link: 'https://github.com/lperezp/peruanos.dev/issues/new?template=event.yml', section: 'Home' }}
          >
            Publicar un evento
          </TrackedLink>
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
        <h2 className="text-4xl sm:text-5xl text-center font-bold mb-9">Startups <span className="text-primary-text">Peruanas</span></h2>
        <p className="text-center w-full sm:w-[70%] text-[20px]">Conoce las empresas tecnológicas e innovadoras que están revolucionando el mercado.</p>
        <div className="flex flex-col sm:flex-row gap-6 m-0 mt-10 mb-10 sm:m-10">
          {randomStartups.map((startup: Startup) => (
            <StartupCardHome
              key={startup.id}
              startup={startup}
            />
          ))}
        </div>
        <Link className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-hover transition" href='/startups'>
          Explorar startups
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
                <strong>Startups:</strong> Empresas tecnológicas, Fintechs, Edtechs, SaaS e iniciativas innovadoras peruanas.
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
            <TrackedLink
              className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-hover transition"
              href={addUTMParams('https://github.com/lperezp/peruanos.dev')}
              target='_blank'
              rel="noopener noreferrer"
              eventName="click_contribute_repo"
            >
              Ir al repositorio
            </TrackedLink>
          </div>
        </div>
      </section>
      {contributors.length > 0 && (
        <section className="py-10 sm:py-15 px-5 w-full flex flex-col items-center">
          <h2 className="text-4xl sm:text-5xl text-center font-bold mb-4">Contribuidores</h2>
          <p className="text-center w-full sm:w-[70%] text-[18px] text-accent mb-12">
            Gracias a quienes han enviado un issue o pull request a este proyecto.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {contributors.map((contributor) => (
              <a
                key={contributor.login}
                href={contributor.html_url}
                target="_blank"
                rel="noopener noreferrer"
                title={`${contributor.login}${contributor.contributions > 0 ? ` · ${contributor.contributions} contribución${contributor.contributions !== 1 ? 'es' : ''}` : ' · issue author'}`}
                className="flex flex-col items-center gap-2 group"
              >
                <Image
                  src={contributor.avatar_url}
                  alt={contributor.login}
                  width={56}
                  height={56}
                  className="rounded-full border-2 border-transparent group-hover:border-primary transition"
                />
                <span className="text-xs text-accent group-hover:text-primary-text transition">
                  @{contributor.login}
                </span>
              </a>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}