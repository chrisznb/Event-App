import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix für Leaflet-Icons
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function EventMap({ events, center, zoom, onEventClick }) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className="w-full h-[calc(100vh-4rem)] rounded-lg shadow-lg"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {events.map((event) => (
        <Marker
          key={event.id}
          position={[event.latitude, event.longitude]}
          eventHandlers={{
            click: () => onEventClick(event),
          }}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-medium text-gray-900 dark:text-white">
                {event.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {event.date} · {event.time}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
} 