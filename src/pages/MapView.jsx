import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import EventOverlay from '../components/EventOverlay';
import { events } from '../data/events';

// Fix für Leaflet Marker Icons
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapView = ({ favorites, visited, onFavorite, onVisited }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [mapCenter, setMapCenter] = useState([51.0632, 6.0964]); // Heinsberg Zentrum
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Benutzerstandort abrufen
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMapCenter([latitude, longitude]);
          setUserLocation([latitude, longitude]);
        },
        (error) => {
          console.error('Fehler beim Abrufen des Standorts:', error);
        }
      );
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8 dark:text-white font-sora">
        Karte
      </h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="h-[calc(100vh-16rem)] p-4">
          <MapContainer
            center={mapCenter}
            zoom={13}
            className="h-full w-full rounded-lg"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {/* Benutzerstandort Marker */}
            {userLocation && (
              <Marker position={userLocation}>
                <Popup>Dein Standort</Popup>
              </Marker>
            )}

            {/* Event Marker */}
            {events.map((event) => (
              <Marker
                key={event.id}
                position={[event.lat, event.lng]}
                eventHandlers={{
                  click: () => setSelectedEvent(event)
                }}
              >
                <Popup>
                  <div className="p-2">
                    <div>
                      <h3 className="font-bold dark:text-white font-sora">{event.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 font-nunito">
                        {event.date} · {event.time}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-nunito">
                        {event.location}
                      </p>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      {selectedEvent && (
        <div className="absolute inset-0 z-[1000]">
          <EventOverlay
            event={selectedEvent}
            isFavorite={favorites.includes(selectedEvent.id)}
            isVisited={visited.includes(selectedEvent.id)}
            onClose={() => setSelectedEvent(null)}
            onFavorite={onFavorite}
            onVisited={onVisited}
          />
        </div>
      )}
    </div>
  );
};

export default MapView; 