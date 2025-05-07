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
            e.target.src = '/Event-App/assets/img/fallback.png';
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
        <h3 className="text-lg font-bold mb-1 dark:text-white font-sora">
          {event.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 font-nunito">
          {formatDate(event.date)} · {event.time}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 font-nunito">
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
