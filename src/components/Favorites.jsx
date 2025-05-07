import React from 'react';
import EventCard from './EventCard';
import { events } from '../data/events';

const Favorites = ({ onEventClick, favorites, onFavorite, onVisited, visited }) => {
  const favoriteEvents = events.filter(event => favorites.includes(event.id));

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Meine Favoriten
      </h2>

      {favoriteEvents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              isFavorite={favorites.includes(event.id)}
              isVisited={visited.includes(event.id)}
              onFavorite={() => onFavorite(event.id)}
              onVisited={() => onVisited(event.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            Sie haben noch keine Favoriten hinzugefügt.
          </p>
        </div>
      )}
    </div>
  );
};

export default Favorites; 