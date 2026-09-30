'use client';

import {
  AlarmClock,
  Calendar,
  Clock,
  ExternalLink,
  Globe,
  MapPin,
  Users,
  Video,
} from 'lucide-react';
import { ICFS } from '../../models/cfs.model';
import Badge from '../ui/Badge';
import ShareButton from '../ui/ShareButton';
import TrackedLink from '../ui/TrackedLink';
import { addUTMParams } from '../../lib/utm';

interface Props {
  cfs: ICFS;
}

export default function CfsCard({ cfs }: Props) {
  // Format event date (e.g. "Sáb, 14 Nov 2026")
  let formattedEventDate = '';
  if (cfs.event_date) {
    const eDate = new Date(cfs.event_date);
    if (!isNaN(eDate.getTime())) {
      const weekday = eDate.toLocaleDateString('es-PE', { weekday: 'short', timeZone: 'UTC' });
      const day = eDate.getUTCDate();
      const month = eDate.toLocaleDateString('es-PE', { month: 'short', timeZone: 'UTC' });
      const year = eDate.getUTCFullYear();
      const capWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1).replace('.', '');
      const capMonth = month.charAt(0).toUpperCase() + month.slice(1).replace('.', '');
      formattedEventDate = `${capWeekday}, ${day} ${capMonth} ${year}`;
    }
  }

  // Format deadline text
  let deadlineText = 'Convocatoria continua';
  if (cfs.deadline) {
    const deadlineDate = new Date(cfs.deadline);
    if (!isNaN(deadlineDate.getTime())) {
      const day = deadlineDate.getUTCDate();
      const month = deadlineDate.toLocaleString('es-PE', { month: 'long', timeZone: 'UTC' });
      const year = deadlineDate.getUTCFullYear();
      deadlineText = `${day} de ${month}, ${year}`;
    } else {
      deadlineText = cfs.deadline;
    }
  }

  // Format clean website URL and display hostname
  const rawWebsite = cfs.website_url || cfs.cfs_url;
  let displayWebsite = '';
  let cleanWebsiteUrl = rawWebsite;
  if (rawWebsite) {
    try {
      const parsed = new URL(rawWebsite);
      displayWebsite =
        parsed.hostname.replace(/^www\./, '') +
        (parsed.pathname !== '/' && !cfs.website_url ? parsed.pathname : '');
      cleanWebsiteUrl = rawWebsite;
    } catch {
      displayWebsite = rawWebsite.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
    }
  }

  const isClosed = cfs.status === 'closed';

  return (
    <div className="bg-background border border-border hover:border-primary/50 rounded-xl p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-4">
      <div>
        {/* Top Badges Row (Sessionize layout styled strictly with app tokens) */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {/* Status badge: Cierra pronto / Abierto / Cerrado */}
          {cfs.status === 'closing_soon' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-primary text-white">
              <AlarmClock size={13} className="stroke-[2.5]" />
              Cierra pronto
            </span>
          )}
          {cfs.status === 'open' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-hover text-foreground border border-border">
              <Clock size={13} className="text-accent" />
              Abierto
            </span>
          )}
          {cfs.status === 'always_open' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-hover text-foreground border border-border">
              <Clock size={13} className="text-accent" />
              Todo el año
            </span>
          )}
          {cfs.status === 'closed' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-hover text-accent border border-border line-through">
              <Clock size={13} />
              Cerrado
            </span>
          )}

          {/* Type Badge: Presencial / Virtual / Híbrido */}
          {cfs.type === 'Presencial' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-hover text-foreground border border-border">
              <Users size={13} className="text-accent" />
              Presencial
            </span>
          )}
          {cfs.type === 'Virtual' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-hover text-foreground border border-border">
              <Video size={13} className="text-accent" />
              Virtual
            </span>
          )}
          {cfs.type === 'Híbrido' && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-hover text-foreground border border-border">
              <Users size={13} className="text-accent" />
              Híbrido
            </span>
          )}

        </div>

        {/* Title (Direct link with app tokens, NO MODAL) */}
        <h3
          className="text-xl mb-2 sm:text-2xl font-bold text-foreground hover:text-primary-text transition-colors leading-tight inline-block">
          {cfs.title}
        </h3>

        {/* Metadata Details (Date, Location, Website, Deadline) */}
        <div className="flex flex-col gap-1.5 text-sm my-3">
          {formattedEventDate && (
            <div className="flex items-center gap-2.5">
              <Calendar size={16} className="text-accent flex-shrink-0" />
              <span className="font-medium text-foreground">{formattedEventDate}</span>
            </div>
          )}
          {cfs.location && (
            <div className="flex items-center gap-2.5">
              <MapPin size={16} className="text-accent flex-shrink-0" />
              <span className="font-medium text-foreground">{cfs.location}</span>
            </div>
          )}
          {displayWebsite && (
            <div className="flex items-center gap-2.5">
              <Globe size={16} className="text-accent flex-shrink-0" />
              <a
                href={cleanWebsiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary-text hover:text-primary underline"
              >
                {displayWebsite}
              </a>
            </div>
          )}
          {cfs.deadline && (
            <div className="flex items-center gap-2.5 text-xs text-accent mt-0.5">
              <Clock size={15} className="text-accent flex-shrink-0" />
              <span>
                <strong className="text-foreground">Cierre de propuestas:</strong> {deadlineText}
              </span>
            </div>
          )}
        </div>

        {/* Description */}
        {cfs.description && (
          <p className="text-accent text-sm leading-relaxed line-clamp-2 mb-3">
            {cfs.description}
          </p>
        )}

        {/* Topics / Tags */}
        {cfs.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {cfs.topics.map((topic) => (
              <Badge key={topic} variant="outline" className="text-[11px] !py-0.5 !px-2.5 !mb-0 !mr-0">
                {topic}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Actions (Direct application link, share, NO MODAL) */}
      <div className="flex items-center justify-between pt-3 gap-3 border-t border-border mt-auto">
        <TrackedLink
          className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${isClosed
            ? 'bg-hover text-accent cursor-not-allowed pointer-events-none'
            : 'bg-primary text-white hover:bg-primary-hover shadow-sm'
            }`}
          href={addUTMParams(cfs.cfs_url)}
          target="_blank"
          rel="noopener noreferrer"
          eventName="click_apply_cfs"
          eventParams={{ cfs_title: cfs.title, community: cfs.community, section: 'CFS' }}
        >
          <span>Postular como Speaker</span>
          <ExternalLink size={15} />
        </TrackedLink>

        <ShareButton
          title={cfs.title}
          text={`¡Postula como speaker a "${cfs.title}" con la comunidad ${cfs.community}! Vía peruanos.dev`}
          url={cfs.cfs_url}
          eventName="click_share_cfs"
          eventParams={{ cfs_title: cfs.title, section: 'CFS' }}
        />
      </div>
    </div>
  );
}
