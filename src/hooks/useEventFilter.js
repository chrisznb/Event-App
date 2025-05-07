import { useMemo } from 'react';

export const useEventFilter = (events, searchQuery, categoryFilter, dateFilter) => {
  return useMemo(() => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const isSameDate = (d1, d2) => d1.toDateString() === d2.toDateString();
    const isWeekend = d => [0, 6].includes(d.getDay());

    return events.filter(event => {
      const eventDate = new Date(event.date);
      return (
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (!categoryFilter || event.category === categoryFilter) &&
        (!dateFilter ||
          (dateFilter === 'today' && isSameDate(today, eventDate)) ||
          (dateFilter === 'tomorrow' && isSameDate(tomorrow, eventDate)) ||
          (dateFilter === 'weekend' && isWeekend(eventDate))
        )
      );
    }).sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [events, searchQuery, categoryFilter, dateFilter]);
}; 