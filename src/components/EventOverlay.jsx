import React, { useEffect, useState } from 'react';
import { XMarkIcon, HeartIcon, CheckIcon, MapPinIcon, CalendarIcon, ClockIcon, GlobeAltIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { FaShareAlt, FaCalendarPlus, FaCopy } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const formatDate = (dateString) => {
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  return new Date(dateString).toLocaleDateString('de-DE', options);
};

const generateGoogleCalendarUrl = (event) => {
  const start = new Date(event.date + 'T' + event.time).toISOString().replace(/-|:|\.\d\d\d/g, '');
  const end = new Date(new Date(event.date + 'T' + event.time).getTime() + 2 * 60 * 60 * 1000).toISOString().replace(/-|:|\.\d\d\d/g, '');
  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${start}/${end}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
};

const generateICal = (event) => {
  const dtStart = new Date(event.date + 'T' + event.time).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const dtEnd = new Date(new Date(event.date + 'T' + event.time).getTime() + 2 * 60 * 60 * 1000).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  return `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${event.title}\nDESCRIPTION:${event.description}\nLOCATION:${event.location}\nDTSTART:${dtStart}\nDTEND:${dtEnd}\nEND:VEVENT\nEND:VCALENDAR`;
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

  const [showMenu, setShowMenu] = useState(false);

  const handleShare = async (e) => {
    e.stopPropagation();
    if (navigator.share) {
      await navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert('Link kopiert!');
    }
    setShowMenu(false);
  };

  const handleCalendar = (e) => {
    e.stopPropagation();
    const ical = generateICal(event);
    const blob = new Blob([ical], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${event.title}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setShowMenu(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-full sm:max-w-2xl w-full max-h-[95vh] overflow-y-auto">
        <div className="relative">
          <img 
            src={event.img} 
            alt={event.title}
            className="w-full h-40 sm:h-64 object-cover"
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
          {/* Teilen-Button */}
          <button
            onClick={e => { e.stopPropagation(); setShowMenu(v => !v); }}
            className="absolute top-4 right-16 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm z-10"
          >
            <FaShareAlt className="h-6 w-6 text-primary-600 dark:text-primary-400" />
          </button>
          {/* Dropdown-Menü */}
          {showMenu && (
            <div className="absolute top-14 right-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20 min-w-[200px]">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
              >
                <FaCopy className="h-5 w-5" /> Event teilen
              </button>
              <a
                href={generateGoogleCalendarUrl(event)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
              >
                <FaCalendarPlus className="h-5 w-5" /> Zu Google Kalender
              </a>
              <button
                onClick={handleCalendar}
                className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
              >
                <FaCalendarPlus className="h-5 w-5" /> Als .ics (Apple/Outlook)
              </button>
            </div>
          )}
        </div>

        <div className="p-3 sm:p-6">
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white font-sora">
              {event.title}
            </h2>
            <div className="flex items-center text-yellow-500">
              <span className="text-base sm:text-lg font-medium">{event.rating}</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
            <div className="flex items-center text-xs sm:text-base text-gray-600 dark:text-gray-400">
              <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center text-xs sm:text-base text-gray-600 dark:text-gray-400">
              <ClockIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              <span>{event.time} Uhr</span>
            </div>
            <div className="flex items-center text-xs sm:text-base text-gray-600 dark:text-gray-400">
              <MapPinIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center text-xs sm:text-base text-gray-600 dark:text-gray-400">
              <GlobeAltIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              <a href={`https://${event.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary-600 dark:hover:text-primary-400">
                {event.website}
              </a>
            </div>
            <div className="flex items-center text-xs sm:text-base text-gray-600 dark:text-gray-400">
              <EnvelopeIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              <a href={`mailto:${event.contact}`} className="hover:text-primary-600 dark:hover:text-primary-400">
                {event.contact}
              </a>
            </div>
          </div>

          <p className="text-xs sm:text-base text-gray-700 dark:text-gray-300 mb-4 sm:mb-6">
            {event.description}
          </p>

          <button
            onClick={() => onVisited(event.id)}
            className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-colors mb-4 sm:mb-6 ${
              isVisited
                ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <CheckIcon className="h-5 w-5" />
            {isVisited ? 'Besucht' : 'Als besucht markieren'}
          </button>

          <div className="h-40 sm:h-64 rounded-lg overflow-hidden">
            <MapContainer
              center={[event.lat, event.lng]}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventOverlay;