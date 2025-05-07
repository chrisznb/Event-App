import React from 'react';
import EventList from '../components/EventList';
import { events } from '../data/events';

const Favorites = ({ favorites, visited, onFavorite, onVisited }) => {
  const favoriteEvents = events.filter((event) => favorites.includes(event.id));

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8 dark:text-white font-sora">
        Meine Favoriten
      </h1>

      {favoriteEvents.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 font-nunito">
            Du hast noch keine Favoriten hinzugefügt.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <EventList
            events={favoriteEvents}
            favorites={favorites}
            visited={visited}
            onFavorite={onFavorite}
            onVisited={onVisited}
          />
        </div>
      )}
    </div>
  );
};

export default Favorites; 