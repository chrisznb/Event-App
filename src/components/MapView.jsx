import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { events } from '../data/events';
import EventCard from './EventCard';

// Fix für Leaflet-Icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapView = ({ onEventClick, favorites, visited, onFavorite, onVisited }) => {
  const [mapCenter, setMapCenter] = useState([51.0632, 6.0964]); // Heinsberg Zentrum
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapCenter([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error('Fehler beim Abrufen der Position:', error);
        }
      );
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h2 className="text-2xl font-bold mb-6 dark:text-white font-sora">Karte</h2>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="h-[500px]">
          <MapContainer
            center={[51.1657, 6.0425]}
            zoom={13}
            className="h-full w-full"
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {events.map((event) => (
              <Marker
                key={event.id}
                position={[event.coordinates.lat, event.coordinates.lng]}
                eventHandlers={{
                  click: () => setSelectedEvent(event),
                }}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-bold dark:text-white font-sora">{event.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-nunito">
                      {event.date} · {event.time}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-nunito">
                      {event.location}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      {selectedEvent && (
        <div className="mt-4">
          <EventCard
            event={selectedEvent}
            isFavorite={favorites.includes(selectedEvent.id)}
            isVisited={visited.includes(selectedEvent.id)}
            onFavorite={() => onFavorite(selectedEvent.id)}
            onVisited={() => onVisited(selectedEvent.id)}
          />
        </div>
      )}
    </div>
  );
};

export default MapView;
