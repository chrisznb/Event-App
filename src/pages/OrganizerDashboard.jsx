import React, { useState } from "react";
import { events as allEvents } from "../data/events";

// Dummy-Organizer-ID (in echt: aus AuthContext)
const ORGANIZER_ID = "mein-organizer-id";

// Dummy-Events mit organizerId und status
const dummyEvents = allEvents.map((e, i) => ({
  ...e,
  organizerId: ORGANIZER_ID,
  status: i % 3 === 0 ? "ausstehend" : i % 3 === 1 ? "genehmigt" : "abgelehnt"
}));

export default function OrganizerDashboard() {
  // Zeige nur eigene Events (hier: alle mit organizerId === ORGANIZER_ID)
  const [events, setEvents] = useState(dummyEvents.filter(e => e.organizerId === ORGANIZER_ID));

  // Dummy-Handler
  const handleCreate = () => alert("Event anlegen (Demo)");
  const handleEdit = (event) => alert(`Event bearbeiten: ${event.title} (Demo)`);
  const handleDelete = (event) => {
    if(window.confirm(`Event wirklich löschen: ${event.title}?`)) {
      setEvents(events.filter(e => e.id !== event.id));
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 dark:text-white font-sora">Organizer-Dashboard</h1>
      <button
        className="mb-6 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        onClick={handleCreate}
      >
        + Neues Event anlegen
      </button>
      <div className="space-y-4">
        {events.length === 0 ? (
          <div className="text-gray-500 dark:text-gray-300">Keine eigenen Events gefunden.</div>
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
                <button className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500" onClick={() => handleEdit(event)}>Bearbeiten</button>
                <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600" onClick={() => handleDelete(event)}>Löschen</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 