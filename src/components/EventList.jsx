import React, { useState } from 'react';
import EventCard from './EventCard';
import EventOverlay from './EventOverlay';

const EventList = ({ events, favorites, visited, onFavorite, onVisited }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <>
      {events.map((event, idx) => (
        <EventCard
          key={event.id}
          event={event}
          isFavorite={favorites.includes(event.id)}
          isVisited={visited.includes(event.id)}
          onFavorite={onFavorite}
          onVisited={onVisited}
          onClick={() => setSelectedEvent(event)}
          idx={idx}
        />
      ))}

      {selectedEvent && (
        <EventOverlay
          event={selectedEvent}
          isFavorite={favorites.includes(selectedEvent.id)}
          isVisited={visited.includes(selectedEvent.id)}
          onClose={() => setSelectedEvent(null)}
          onFavorite={onFavorite}
          onVisited={onVisited}
        />
      )}
    </>
  );
};

export default EventList;
