'use client';

import { useState, useRef, useEffect } from 'react';
import { CalendarPlus, Download, ExternalLink } from 'lucide-react';
import { IEvent } from '../../models/event.model';
import { generateGoogleCalendarUrl, generateIcsDataUrl } from '../../utils/calendar';
import TrackedLink from '../ui/TrackedLink';

interface Props {
    event: IEvent;
}

export default function AddToCalendarDropdown({ event }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const googleCalendarUrl = generateGoogleCalendarUrl(event);
    const icsDataUrl = generateIcsDataUrl(event);

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
                type="button"
                onClick={toggleDropdown}
                className="flex items-center mt-4 gap-2 font-semibold text-secondary hover:text-secondary-foreground transition-colors"
            >
                Agregar al calendario
                <CalendarPlus size={16} />
            </button>

            {isOpen && (
                <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-background border border-accent ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                        <TrackedLink
                            href={googleCalendarUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
                            role="menuitem"
                            eventName="add_to_google_calendar"
                            eventParams={{ event_title: event.title }}
                            onClick={() => setIsOpen(false)}
                        >
                            <ExternalLink size={14} className="mr-2" />
                            Google Calendar
                        </TrackedLink>
                        <TrackedLink
                            href={icsDataUrl}
                            download={`${event.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.ics`}
                            className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
                            role="menuitem"
                            eventName="download_ics_calendar"
                            eventParams={{ event_title: event.title }}
                            onClick={() => setIsOpen(false)}
                        >
                            <Download size={14} className="mr-2" />
                            Descargar .ics
                        </TrackedLink>
                    </div>
                </div>
            )}
        </div>
    );
}
