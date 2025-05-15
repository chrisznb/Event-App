import React, { useEffect } from 'react';
import { XMarkIcon, HeartIcon, CheckIcon, MapPinIcon, CalendarIcon, ClockIcon, GlobeAltIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const formatDate = (dateString) => {
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  return new Date(dateString).toLocaleDateString('de-DE', options);
};

const EventOverlay = ({ event, isFavorite, isVisited, onClose, onFavorite, onVisited }) => {
  useEffect(() => {
    // Body-Scroll verhindern
    document.body.style.overflow = 'hidden';
    return () => {
      // Body-Scroll wieder erlauben
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img 
            src={event.img} 
            alt={event.title}
            className="w-full h-64 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
          >
            <XMarkIcon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </button>
          <button
            onClick={() => onFavorite(event.id)}
            className="absolute top-4 left-4 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
          >
            {isFavorite ? (
              <HeartIconSolid className="h-6 w-6 text-red-500" />
            ) : (
              <HeartIcon className="h-6 w-6 text-gray-400" />
            )}
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-sora">
              {event.title}
            </h2>
            <div className="flex items-center text-yellow-500">
              <span className="text-lg font-medium">{event.rating}</span>
              <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <CalendarIcon className="h-5 w-5 mr-2" />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <ClockIcon className="h-5 w-5 mr-2" />
              <span>{event.time} Uhr</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <MapPinIcon className="h-5 w-5 mr-2" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <GlobeAltIcon className="h-5 w-5 mr-2" />
              <a href={`https://${event.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 dark:hover:text-primary-400">
                {event.website}
              </a>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <EnvelopeIcon className="h-5 w-5 mr-2" />
              <a href={`mailto:${event.contact}`} className="hover:text-primary-600 dark:hover:text-primary-400">
                {event.contact}
              </a>
            </div>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-6">
            {event.description}
          </p>

          <button
            onClick={() => onVisited(event.id)}
            className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-colors mb-6 ${
              isVisited
                ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <CheckIcon className="h-5 w-5" />
            {isVisited ? 'Besucht' : 'Als besucht markieren'}
          </button>

          <div className="h-64 rounded-lg overflow-hidden">
            <MapContainer
              center={[event.lat, event.lng]}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[event.lat, event.lng]}>
                <Popup>{event.title}</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventOverlay; 