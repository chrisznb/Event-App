import React, { useState, useEffect } from 'react';
import LocalCard from '../components/LocalCard';
import LocalOverlay from '../components/LocalOverlay';

const fetchLocals = async () => {
  const res = await fetch('/Event-App/geschaefte.json', {
    headers: {
      'Accept': 'application/json'
    }
  });
  if (!res.ok) throw new Error('Fehler beim Laden der Daten');
  return res.json();
};

const Locals = () => {
  const [locals, setLocals] = useState([]);
  const [selectedLocal, setSelectedLocal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchLocals()
      .then(data => {
        setLocals(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8 sm:mb-10 dark:text-white font-sora">
        Lokale Geschäfte
      </h1>
      {loading && <div className="text-center text-gray-500">Lade Geschäfte...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}
      {!loading && !error && (
        <>
          {/* Optional: Filterfunktion vorbereiten */}
          {/* <div className="mb-6">Filter kommt hier hin</div> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {locals.map((local, idx) => (
              <LocalCard
                key={local.id}
                local={local}
                onClick={() => setSelectedLocal(local)}
                idx={idx}
              />
            ))}
          </div>
          {selectedLocal && (
            <LocalOverlay
              local={selectedLocal}
              onClose={() => setSelectedLocal(null)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Locals; 