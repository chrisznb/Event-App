import React, { useState, useCallback } from 'react';
import EventCard from './EventCard';
import EventOverlay from './EventOverlay';
import { events } from '../data/events';
import { useEventFilter } from '../hooks/useEventFilter';
import { useLocalStorage } from '../hooks/useLocalStorage';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Guten Morgen';
  if (hour < 18) return 'Guten Tag';
  return 'Guten Abend';
};

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [favorites, setFavorites] = useLocalStorage('favorites', []);
  const [visited, setVisited] = useLocalStorage('visited', []);

  const filteredEvents = useEventFilter(events, searchQuery, categoryFilter, dateFilter);
  const topRatedEvents = filteredEvents
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  const handleEventClick = useCallback((event) => {
    setSelectedEvent(event);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedEvent(null);
  }, []);

  const handleFavorite = useCallback((eventId) => {
    setFavorites(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  }, [setFavorites]);

  const handleVisited = useCallback((eventId) => {
    setVisited(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  }, [setVisited]);

  const categories = ['all', ...new Set(events.map((event) => event.category))];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Hallo, {getGreeting()}</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Suche nach Events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-4 pl-12 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <svg
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </header>

      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="px-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Alle Termine</option>
          <option value="today">Heute</option>
          <option value="tomorrow">Morgen</option>
          <option value="weekend">Wochenende</option>
        </select>
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-bold mb-6 dark:text-white">Top Events</h2>
        <div className="flex overflow-x-auto pb-4 gap-6 snap-x snap-mandatory -mx-4 px-4">
          {topRatedEvents.map(event => (
            <div key={event.id} className="flex-none w-[280px] snap-center">
            <EventCard
              event={event}
              onClick={() => handleEventClick(event)}
              onFavorite={() => handleFavorite(event.id)}
              onVisited={() => handleVisited(event.id)}
              isFavorite={favorites.includes(event.id)}
              isVisited={visited.includes(event.id)}
            />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mt-12 mb-6 dark:text-white">Alle Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEvents.map(event => (
            <EventCard
              key={event.id}
              event={event}
              onClick={() => handleEventClick(event)}
              onFavorite={() => handleFavorite(event.id)}
              onVisited={() => handleVisited(event.id)}
              isFavorite={favorites.includes(event.id)}
              isVisited={visited.includes(event.id)}
            />
          ))}
        </div>
      </section>

      {selectedEvent && (
        <EventOverlay
          event={selectedEvent}
          onClose={handleClose}
          onFavorite={() => handleFavorite(selectedEvent.id)}
          onVisited={() => handleVisited(selectedEvent.id)}
          isFavorite={favorites.includes(selectedEvent.id)}
          isVisited={visited.includes(selectedEvent.id)}
        />
      )}

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            Keine Events gefunden. Bitte versuchen Sie es mit anderen Suchkriterien.
          </p>
        </div>
      )}
    </div>
  );
};

export default Home; 