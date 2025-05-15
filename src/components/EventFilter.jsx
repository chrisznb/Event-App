import React, { useState } from 'react';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';

const EventFilter = ({ searchQuery, onSearchChange, selectedCategory, onCategoryChange }) => {
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const categories = [
    { id: '', label: 'Alle Kategorien' },
    { id: 'Musik', label: 'Musik' },
    { id: 'Kulinarisch', label: 'Kulinarisch' },
    { id: 'Kunst', label: 'Kunst' },
    { id: 'Sport', label: 'Sport' },
    { id: 'Party', label: 'Party' }
  ];

  return (
    <div className="mb-3 sm:mb-4">
      {/* Mobile: Suchleiste immer sichtbar, Filter-Button links daneben */}
      <div className="sm:hidden flex items-center gap-1 mb-1">
        <button
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
          onClick={() => setShowMobileFilter((v) => !v)}
          aria-label="Filter öffnen"
        >
          <FunnelIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Suche nach einem Event..."
            className="w-full pl-9 pr-2 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-nunito text-sm"
          />
          <MagnifyingGlassIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>
      {/* Mobile Dropdown */}
      {showMobileFilter && (
        <div className="sm:hidden bg-white dark:bg-gray-800 rounded-xl shadow-md p-2 mb-2">
          <div className="flex flex-wrap gap-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`px-2 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-[#111827] border-2 border-[#111827]'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Desktop/Tablet: Filter immer sichtbar */}
      <div className="hidden sm:block">
        <div className="relative mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Suche nach einem Event..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-nunito"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category.id
                  ? 'bg-primary-600 text-[#111827] border-2 border-[#111827]'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventFilter; 