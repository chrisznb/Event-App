import React from 'react';

const categoryColors = {
  Restaurant: '#2563eb',
  Café: '#16a34a',
  Kino: '#a21caf',
  Museum: '#f59e42',
  default: '#e53e3e'
};

const LocalCard = ({ local, onClick, idx }) => {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-md max-w-full animate-fadeIn group/card"
      style={idx !== undefined ? { animationDelay: `${idx * 60}ms`, animationFillMode: 'both' } : {}}
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={local.img}
          alt={local.name}
          className="w-full h-32 sm:h-48 object-cover transition-transform duration-500 group-hover/card:scale-105"
        />
        {/* Kategorie-Badge */}
        <div
          className="absolute bottom-2 left-2 px-3 py-1 rounded-full text-sm font-medium border"
          style={{
            color: '#fff',
            borderColor: categoryColors[local.category] || categoryColors.default,
            background: `${(categoryColors[local.category] || categoryColors.default)}CC` // 80% Transparenz
          }}
        >
          {local.category}
        </div>
      </div>
      <div className="p-3 sm:p-4">
        <h3 className="text-base sm:text-lg font-bold mb-1 dark:text-white font-sora">
          {local.name}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-nunito">
          {local.address}
        </p>
        {local.openingHours && (
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500 font-nunito">
            Öffnungszeiten: {local.openingHours}
          </p>
        )}
      </div>
    </div>
  );
};

export default LocalCard; 