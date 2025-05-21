import React, { useEffect } from 'react';
import { XMarkIcon, MapPinIcon, ClockIcon, TicketIcon } from '@heroicons/react/24/outline';

const categoryColors = {
  Restaurant: '#2563eb',
  Café: '#16a34a',
  Kino: '#a21caf',
  Museum: '#f59e42',
  default: '#e53e3e'
};

const LocalOverlay = ({ local, onClose }) => {
  useEffect(() => {
    // Verhindere Scrollen im Hintergrund
    document.body.style.overflow = 'hidden';
    
    // Cleanup-Funktion
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-full sm:max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fadeInScale">
        <div className="relative">
          <img
            src={local.img}
            alt={local.name}
            className="w-full h-40 sm:h-64 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
          >
            <XMarkIcon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </button>
          {/* Kategorie-Badge */}
          <div
            className="absolute bottom-2 left-2 px-3 py-1 rounded-full text-sm font-medium border"
            style={{
              color: '#fff',
              borderColor: categoryColors[local.category] || categoryColors.default,
              background: `${(categoryColors[local.category] || categoryColors.default)}CC`
            }}
          >
            {local.category}
          </div>
        </div>
        <div className="p-4 sm:p-6 md:p-8">
          <h2 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white font-sora mb-2">
            {local.name}
          </h2>
          <div className="flex items-center text-xs sm:text-base text-gray-600 dark:text-gray-400 mb-2">
            <MapPinIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            <span>{local.address}</span>
          </div>
          {local.openingHours && (
            <div className="flex items-center text-xs sm:text-base text-gray-600 dark:text-gray-400 mb-2">
              <ClockIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              <span>{local.openingHours}</span>
            </div>
          )}
          <p className="text-xs sm:text-base text-gray-700 dark:text-gray-300 mb-6 sm:mb-8">
            {local.description}
          </p>
          {local.coupons && local.coupons.length > 0 && (
            <div className="mt-4">
              <h3 className="text-base font-bold mb-2 text-primary-600 dark:text-primary-400 flex items-center gap-2">
                <TicketIcon className="h-5 w-5" /> Coupons
              </h3>
              <ul className="space-y-2">
                {local.coupons.map((coupon, idx) => (
                  <li key={idx} className="bg-primary-100 dark:bg-primary-900 rounded-lg px-4 py-2 text-primary-800 dark:text-primary-200 font-medium">
                    {coupon}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocalOverlay; 