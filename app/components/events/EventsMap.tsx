import { useMemo } from 'react';
import { IEvent } from '@/app/models/event.model';
import { CITY_COORDINATES } from '@/app/data/cities';
import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerPopup,
  MapControls,
} from '@/components/ui/map';
import { MapPin } from 'lucide-react';

interface EventsMapProps {
  events: IEvent[];
}

export default function EventsMap({ events }: EventsMapProps) {
  // Filter out Virtual events and group them by city
  const cityGroups = useMemo(() => {
    const groups: Record<string, IEvent[]> = {};
    events.forEach(event => {
      if (event.city && event.city !== 'Virtual' && CITY_COORDINATES[event.city]) {
        if (!groups[event.city]) {
          groups[event.city] = [];
        }
        groups[event.city].push(event);
      }
    });
    return groups;
  }, [events]);

  const markers = Object.entries(cityGroups).map(([city, cityEvents]) => {
    const coords = CITY_COORDINATES[city];
    return { city, events: cityEvents, coords };
  });

  if (markers.length === 0) {
    return (
      <div className="w-full h-[500px] bg-background-alt border border-border rounded-lg flex items-center justify-center text-accent">
        No hay eventos presenciales en el mapa con la selección actual.
      </div>
    );
  }

  // Calculate center based on all markers, or default to Lima
  const center: [number, number] = markers.length > 0 ? markers[0].coords : [-77.0428, -12.0464];

  return (
    <div className="w-[300px] h-[300px] border border-border rounded-lg overflow-hidden sticky top-24">
      <Map center={center} zoom={10}>
        <MapControls />
        {markers.map(({ city, events, coords }) => (
          <MapMarker key={city} longitude={coords[0]} latitude={coords[1]}>
            <MarkerContent className="bg-primary/20 p-2 rounded-full cursor-pointer hover:bg-primary/30 transition-colors">
              <MapPin className="text-primary w-6 h-6" />
            </MarkerContent>
            <MarkerPopup className="bg-background-alt border border-border p-4 rounded-lg shadow-lg max-w-[300px]">
              <h3 className="font-bold text-lg mb-2 text-primary-text">{city}</h3>
              <div className="space-y-3 max-h-[250px] overflow-y-auto">
                {events.map((event, idx) => (
                  <div key={`${event.title}-${idx}`} className="text-sm border-b border-border pb-2 last:border-0 last:pb-0 group">
                    <p className="font-semibold group-hover:text-primary transition-colors duration-200">{event.title}</p>
                    <p className="text-xs text-accent mt-1 group-hover:text-primary-hover transition-colors duration-200">{event.date} • {event.time}</p>
                  </div>
                ))}
              </div>
            </MarkerPopup>
          </MapMarker>
        ))}
      </Map>
    </div>
  );
}
