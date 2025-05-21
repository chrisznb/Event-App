import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart, FaCheck, FaCalendarPlus, FaCopy } from 'react-icons/fa';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'long' };
  return new Date(dateString).toLocaleDateString('de-DE', options);
};

// Farben nach Kategorie
const categoryColors = {
  Musik: '#2563eb',        // Blau
  Kulinarisch: '#16a34a',  // Grün
  Kunst: '#a21caf',        // Lila
  Sport: '#f59e42',        // Orange
  Party: '#db2777',        // Pink
  default: '#e53e3e'       // Rot
};

const EventCard = ({ event, isFavorite, isVisited, onFavorite, onVisited, onClick, idx }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const handleFavorite = (e) => {
    e.stopPropagation();
    setIsAnimating(true);
    onFavorite(event.id);
  };

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-md max-w-full animate-fadeIn group/card"
      style={idx !== undefined ? { animationDelay: `${idx * 60}ms`, animationFillMode: 'both' } : {}}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img 
          src={event.img} 
          alt={event.title}
          className="w-full h-32 sm:h-48 object-cover transition-transform duration-500 group-hover/card:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
        <button
          onClick={handleFavorite}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm z-10 group transition-transform duration-200 hover:scale-110"
        >
          {isFavorite ? (
            <HeartIconSolid className={`h-6 w-6 text-pink-500 drop-shadow-lg ${isAnimating ? 'animate-heartbeat' : ''}`} />
          ) : (
            <HeartIcon className="h-6 w-6 text-gray-400 group-hover:text-pink-400 transition-colors" />
          )}
        </button>
        {/* Kategorie-Badge */}
        <div
          className="absolute bottom-2 left-2 px-3 py-1 rounded-full text-sm font-medium transition-transform duration-200 group-hover/card:translate-y-[-2px] border"
          style={{
            color: '#fff',
            borderColor: categoryColors[event.category] || categoryColors.default,
            background: `${(categoryColors[event.category] || categoryColors.default)}CC` // 80% Transparenz
          }}
        >
          {event.category}
        </div>
      </div>

      <div className="p-3 sm:p-4">
        <h3 className="text-base sm:text-lg font-bold mb-1 dark:text-white font-sora transition-colors duration-200 group-hover/card:text-primary-600 dark:group-hover/card:text-primary-400">
          {event.title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-nunito">
          {formatDate(event.date)} · {event.time}
        </p>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500 font-nunito">
          {event.location}
        </p>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onVisited(event.id);
          }}
          className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 mt-2 sm:mt-0 ${
            isVisited
              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          <FaCheck className={`h-5 w-5 transition-transform duration-200 ${isVisited ? 'text-green-500' : 'text-gray-400'} ${isHovered && !isVisited ? 'scale-110' : ''}`} />
          {isVisited ? 'Besucht' : 'Als besucht markieren'}
        </button>
      </div>
    </div>
  );
};

export default EventCard;
