import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import EventOverlay from '../components/EventOverlay';
import { events } from '../data/events';

// Utility: Farben nach Kategorie
const categoryColors = {
  Musik: '#2563eb',        // Blau
  Kulinarisch: '#16a34a',  // Grün
  Kunst: '#a21caf',        // Lila
  Sport: '#f59e42',        // Orange
  Party: '#db2777',        // Pink
  default: '#e53e3e'       // Rot
};

// Utility: Custom Marker Icon
const createCustomIcon = (color = '#e53e3e') => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div class=\"marker-container\">
        <div class=\"marker-pin\" style=\"background: ${color}\"></div>
        <div class=\"marker-pulse\" style=\"background: ${color}20\"></div>
      </div>
    `,
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    popupAnchor: [0, -42]
  });
};

// Fix für Leaflet Marker Icons (benötigt für User-Standort, nicht für Custom-Events)
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
    <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8 sm:mb-10 dark:text-white font-sora">
        Karte
      </h1>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="h-[calc(100vh-16rem)] p-4 sm:p-6">
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
              <Marker position={userLocation} icon={DefaultIcon}>
                <Popup>Dein Standort</Popup>
              </Marker>
            )}
            {/* Event Marker */}
            {events.map((event) => (
              <Marker
                key={event.id}
                position={[event.lat, event.lng]}
                icon={createCustomIcon(categoryColors[event.category] || categoryColors.default)}
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
          {/* Marker-Styles */}
          <style>{`
            .custom-marker { background: none; border: none; }
            .marker-container { position: relative; width: 30px; height: 42px; }
            .marker-pin { width: 30px; height: 30px; border-radius: 50% 50% 50% 0; position: absolute; transform: rotate(-45deg); left: 50%; top: 50%; margin: -15px 0 0 -15px; box-shadow: 0 2px 4px rgba(0,0,0,0.3); }
            .marker-pin::after { content: ''; width: 14px; height: 14px; margin: 8px 0 0 8px; background: #fff; position: absolute; border-radius: 50%; }
            .marker-pulse { border-radius: 50%; height: 14px; width: 14px; position: absolute; left: 50%; top: 50%; margin: 11px 0 0 -7px; transform: rotateX(55deg); z-index: -2; animation: pulsate 1.5s ease-out infinite; }
            @keyframes pulsate { 0% { transform: rotateX(55deg) scale(0.1); opacity: 0; } 50% { opacity: 1; } 100% { transform: rotateX(55deg) scale(1.2); opacity: 0; } }
          `}</style>
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