import React, { useState } from "react";
import { events as allEvents } from "../data/events";

// Dummy-Organizer-ID (wie im OrganizerDashboard)
const ORGANIZER_ID = "mein-organizer-id";

// Dummy-Events mit organizerId und status
const dummyEvents = allEvents.map((e, i) => ({
  ...e,
  organizerId: ORGANIZER_ID,
  status: i % 3 === 0 ? "ausstehend" : i % 3 === 1 ? "genehmigt" : "abgelehnt"
}));

export default function AdminDashboard() {
  const [events, setEvents] = useState(dummyEvents);

  const handleStatus = (eventId, status) => {
    setEvents(events.map(e => e.id === eventId ? { ...e, status } : e));
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 dark:text-white font-sora">Admin-Dashboard</h1>
      <div className="space-y-4">
        {events.length === 0 ? (
          <div className="text-gray-500 dark:text-gray-300">Keine Events gefunden.</div>
        ) : (
          events.map(event => (
            <div key={event.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex justify-between items-center">
              <div>
                <div className="font-bold text-lg dark:text-white">{event.title}</div>
                <div className="text-gray-500 text-sm">{event.date} · {event.location}</div>
                <div className="text-xs mt-1 font-nunito">
                  Status: <span className={
                    event.status === 'genehmigt' ? 'text-green-600' : event.status === 'abgelehnt' ? 'text-red-600' : 'text-yellow-600'
                  }>{event.status}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  disabled={event.status === 'genehmigt'}
                  onClick={() => handleStatus(event.id, 'genehmigt')}
                >
                  Genehmigen
                </button>
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  disabled={event.status === 'abgelehnt'}
                  onClick={() => handleStatus(event.id, 'abgelehnt')}
                >
                  Ablehnen
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 