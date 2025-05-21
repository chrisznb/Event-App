import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Farben nach Kategorie
const categoryColors = {
  Musik: '#2563eb',        // Blau
  Kulinarisch: '#16a34a',  // Grün
  Kunst: '#a21caf',        // Lila
  Sport: '#f59e42',        // Orange
  Party: '#db2777',        // Pink
  default: '#e53e3e'       // Rot
};

// Custom Marker Icon
const createCustomIcon = (color = '#e53e3e') => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div class="marker-container">
        <div class="marker-pin" style="background: ${color}"></div>
        <div class="marker-pulse" style="background: ${color}20"></div>
      </div>
    `,
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    popupAnchor: [0, -42]
  });
};

const Map = ({ events = [], selectedEvent = null }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (!mapInstanceRef.current && mapRef.current) {
      // Heinsberg Koordinaten
      const heinsbergCoords = [51.0632, 6.0964];
      
      mapInstanceRef.current = L.map(mapRef.current).setView(heinsbergCoords, 13);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstanceRef.current);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Entferne alte Marker
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Erstelle neue Marker für jedes Event
    events.forEach(event => {
      const color = categoryColors[event.category] || categoryColors.default;
      const marker = L.marker([event.lat, event.lng], { icon: createCustomIcon(color) })
        .bindPopup(`
          <div class="popup-content">
            <h3 class="text-lg font-bold mb-2">${event.title}</h3>
            <p class="text-gray-600">${event.description}</p>
          </div>
        `)
        .addTo(mapInstanceRef.current);

      markersRef.current.push(marker);

      // Wenn dies das ausgewählte Event ist, öffne das Popup
      if (selectedEvent && selectedEvent.id === event.id) {
        marker.openPopup();
      }
    });
  }, [events, selectedEvent]);

  return (
    <div className="h-full">
      <div ref={mapRef} className="w-full h-full" />
      <style jsx>{`
        .custom-marker {
          background: none;
          border: none;
        }
        .marker-container {
          position: relative;
          width: 30px;
          height: 42px;
        }
        .marker-pin {
          width: 30px;
          height: 30px;
          border-radius: 50% 50% 50% 0;
          position: absolute;
          transform: rotate(-45deg);
          left: 50%;
          top: 50%;
          margin: -15px 0 0 -15px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        .marker-pin::after {
          content: '';
          width: 14px;
          height: 14px;
          margin: 8px 0 0 8px;
          background: #fff;
          position: absolute;
          border-radius: 50%;
        }
        .marker-pulse {
          border-radius: 50%;
          height: 14px;
          width: 14px;
          position: absolute;
          left: 50%;
          top: 50%;
          margin: 11px 0 0 -7px;
          transform: rotateX(55deg);
          z-index: -2;
          animation: pulsate 1.5s ease-out infinite;
        }
        @keyframes pulsate {
          0% {
            transform: rotateX(55deg) scale(0.1);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: rotateX(55deg) scale(1.2);
            opacity: 0;
          }
        }
        .popup-content {
          padding: 8px;
        }
      `}</style>
    </div>
  );
};

export default Map; 