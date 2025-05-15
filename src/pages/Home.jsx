import React, { useState } from 'react';
import EventList from '../components/EventList';
import EventFilter from '../components/EventFilter';
import EventStats from '../components/EventStats';
import { events } from '../data/events';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Guten Morgen';
  if (hour < 18) return 'Guten Tag';
  return 'Guten Abend';
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return {
    day: date.getDate(),
    month: date.toLocaleString('de-DE', { month: 'short' })
  };
};

const Home = ({ favorites, visited, onFavorite, onVisited }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const topRatedEvents = [...filteredEvents]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  const upcomingEvents = [...filteredEvents]
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 max-w-7xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2 dark:text-white font-sora">
          {getGreeting()} 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400 font-nunito">
          Es gibt {events.length} Events in deiner Nähe
        </p>
      </header>

      <EventFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <div className="my-8">
        <EventStats events={events} />
      </div>

      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4 dark:text-white font-sora">
          Top bewertete Events
        </h2>
        <div className="overflow-x-auto pb-4 -mx-4 px-4">
          <div className="flex space-x-4" style={{ minWidth: 'max-content' }}>
            {topRatedEvents.map(event => (
              <div key={event.id} className="w-72 sm:w-80 flex-shrink-0">
                <EventList
                  events={[event]}
                  favorites={favorites}
                  visited={visited}
                  onFavorite={onFavorite}
                  onVisited={onVisited}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6 dark:text-white font-sora">
          Kommende Events
        </h2>
        {upcomingEvents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 font-nunito">
              Keine Events gefunden. Bitte versuche es mit anderen Suchkriterien.
            </p>
          </div>
        ) : (
          <div className="relative pb-24">
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-primary-400 dark:bg-primary-600 z-0" />
            <div className="space-y-6 sm:space-y-8">
              {upcomingEvents.map((event, idx) => {
                const { day, month } = formatDate(event.date);
                return (
                  <div
                    key={event.id}
                    className="flex gap-2 sm:gap-6 animate-fadeInUp"
                  >
                    <div className="flex flex-col items-center flex-shrink-0 w-12 sm:w-20 relative z-10">
                      <div className="border-2 border-primary-400 dark:border-primary-600 bg-white/80 dark:bg-primary-900/80 rounded-lg flex flex-col items-center justify-center p-1 sm:p-2" style={{ minHeight: '40px', minWidth: '40px' }}>
                        <div className="text-base sm:text-2xl font-bold text-primary-600 dark:text-primary-400 font-sora leading-none">
                          {day}
                        </div>
                        <div className="text-xs sm:text-sm text-primary-600 dark:text-primary-400 font-nunito leading-none">
                          {month}
                        </div>
                      </div>
                    </div>
                    <div className="flex-grow">
                      <EventList
                        events={[event]}
                        favorites={favorites}
                        visited={visited}
                        onFavorite={onFavorite}
                        onVisited={onVisited}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home; 