'use client';

import { Calendar, Clock, MapPin, Mic, ExternalLink } from 'lucide-react';
import { ICFS } from '../../models/cfs.model';
import Badge from '../ui/Badge';
import ShareButton from '../ui/ShareButton';
import TrackedLink from '../ui/TrackedLink';
import { addUTMParams } from '../../lib/utm';

interface Props {
  cfs: ICFS;
}

export default function CfsCard({ cfs }: Props) {
  // Format deadline if present
  let deadlineText = 'Convocatoria continua';
  if (cfs.deadline) {
    const deadlineDate = new Date(cfs.deadline);
    if (!isNaN(deadlineDate.getTime())) {
      const day = deadlineDate.getUTCDate();
      const month = deadlineDate.toLocaleString('es-PE', { month: 'long', timeZone: 'UTC' });
      const year = deadlineDate.getUTCFullYear();
      deadlineText = `Cierra el ${day} de ${month}, ${year}`;
    } else {
      deadlineText = cfs.deadline;
    }
  }

  // Format event date if present
  let eventDateText = '';
  if (cfs.event_date) {
    const eDate = new Date(cfs.event_date);
    if (!isNaN(eDate.getTime())) {
      const day = eDate.getUTCDate();
      const month = eDate.toLocaleString('es-PE', { month: 'short', timeZone: 'UTC' });
      const year = eDate.getUTCFullYear();
      eventDateText = `${day} ${month} ${year}`;
    }
  }

  const isClosed = cfs.status === 'closed';

  return (
    <div className="bg-background border border-accent rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-primary/50 shadow-sm p-6 relative">
      <div>
        {/* Header Badges & Community */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-text flex items-center gap-1.5">
            <Mic size={14} className="text-primary" />
            {cfs.community}
          </span>
          <div className="flex items-center gap-1.5">
            {cfs.status === 'always_open' && (
              <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                Abierto todo el año
              </span>
            )}
            {cfs.status === 'open' && (
              <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                Abierto
              </span>
            )}
            {cfs.status === 'closing_soon' && (
              <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                ¡Cierra pronto!
              </span>
            )}
            {cfs.status === 'closed' && (
              <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-500/10 text-gray-500 border border-gray-500/20">
                Cerrado
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-foreground mb-2 leading-snug">
          {cfs.title}
        </h3>

        {/* Description */}
        <p className="text-accent text-sm mb-4 line-clamp-3 leading-relaxed">
          {cfs.description}
        </p>

        {/* Details: Deadline, Location, Event Date */}
        <div className="flex flex-col gap-2 text-xs text-accent mb-4 border-y border-border/50 py-3">
          <div className="flex items-center gap-2">
            <Clock size={15} className="text-primary flex-shrink-0" />
            <span><strong className="text-foreground">Cierre de propuestas:</strong> {deadlineText}</span>
          </div>
          {cfs.location && (
            <div className="flex items-center gap-2">
              <MapPin size={15} className="text-primary flex-shrink-0" />
              <span><strong className="text-foreground">Ubicación:</strong> {cfs.location} ({cfs.type})</span>
            </div>
          )}
          {eventDateText && (
            <div className="flex items-center gap-2">
              <Calendar size={15} className="text-primary flex-shrink-0" />
              <span><strong className="text-foreground">Fecha del evento:</strong> {eventDateText}</span>
            </div>
          )}
        </div>

        {/* Topics / Tags */}
        <div className="flex flex-wrap gap-1 mb-6">
          {cfs.topics.map((topic) => (
            <Badge key={topic} variant="outline" className="text-[11px] !mb-1 !mr-1">
              {topic}
            </Badge>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-2 gap-3 border-t border-border/40">
        <TrackedLink
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
            isClosed
              ? 'bg-gray-200 dark:bg-gray-800 text-gray-500 cursor-not-allowed pointer-events-none'
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
