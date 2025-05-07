import React from 'react';
import { HeartIcon, CheckIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'long' };
  return new Date(dateString).toLocaleDateString('de-DE', options);
};

const EventCard = ({ event, isFavorite, isVisited, onFavorite, onVisited, onClick }) => {
  const imagePath = event.img.startsWith('/') ? event.img : `/${event.img}`;

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
      onClick={onClick}
    >
      <div className="relative">
        <img 
          src={imagePath} 
          alt={event.title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/heinsberg-event-app/images/fallback.png';
          }}
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavorite(event.id);
          }}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
        >
          {isFavorite ? (
            <HeartIconSolid className="h-6 w-6 text-red-500" />
          ) : (
            <HeartIcon className="h-6 w-6 text-gray-400" />
          )}
        </button>
        <div className="absolute bottom-2 left-2 px-3 py-1 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-sm font-medium">
          {event.price}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-sora">
            {event.title}
          </h3>
          <div className="flex items-center text-yellow-500">
            <span className="text-sm font-medium">{event.rating}</span>
            <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          {formatDate(event.date)} · {event.time} Uhr
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mb-3">
          {event.location}
        </p>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onVisited(event.id);
          }}
          className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
            isVisited
              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          <CheckIcon className="h-5 w-5" />
          {isVisited ? 'Besucht' : 'Als besucht markieren'}
        </button>
      </div>
    </div>
  );
};

export default EventCard;
