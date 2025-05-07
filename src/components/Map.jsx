import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapInstanceRef.current && mapRef.current) {
      // Heinsberg Koordinaten
      const heinsbergCoords = [51.0632, 6.0964];
      
      mapInstanceRef.current = L.map(mapRef.current).setView(heinsbergCoords, 13);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstanceRef.current);

      // Beispiel-Marker
      const events = [
        {
          title: 'Straßenfest Oberbruch',
          coords: [51.0632, 6.0964],
          description: 'Ein tolles Straßenfest mit Live-Musik'
        },
        // Weitere Events hier...
      ];

      events.forEach(event => {
        L.marker(event.coords)
          .bindPopup(`
            <h3>${event.title}</h3>
            <p>${event.description}</p>
          `)
          .addTo(mapInstanceRef.current);
      });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="h-full">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
};

export default Map; 