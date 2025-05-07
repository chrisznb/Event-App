import { CalendarIcon, MapPinIcon, UserGroupIcon, StarIcon } from '@heroicons/react/24/outline';

export default function EventStats({ events }) {
  const totalEvents = events.length;
  const uniqueLocations = new Set(events.map((event) => event.location)).size;
  const upcomingEvents = events.filter((event) => new Date(event.date) > new Date()).length;
  const averageRating = events.reduce((acc, event) => acc + event.rating, 0) / totalEvents;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
            <CalendarIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 font-nunito">
              Gesamt Events
            </p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white font-sora">
              {totalEvents}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
            <MapPinIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 font-nunito">
              Standorte
            </p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white font-sora">
              {uniqueLocations}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
            <UserGroupIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 font-nunito">
              Kommende Events
            </p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white font-sora">
              {upcomingEvents}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900">
            <StarIcon className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 font-nunito">
              Durchschnittliche Bewertung
            </p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white font-sora">
              {averageRating.toFixed(1)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 