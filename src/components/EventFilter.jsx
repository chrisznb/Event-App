import React from 'react';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';

const EventFilter = ({ searchQuery, onSearchChange, selectedCategory, onCategoryChange }) => {
  const categories = [
    { id: '', label: 'Alle Kategorien' },
    { id: 'Musik', label: 'Musik' },
    { id: 'Kulinarisch', label: 'Kulinarisch' },
    { id: 'Kunst', label: 'Kunst' },
    { id: 'Sport', label: 'Sport' },
    { id: 'Party', label: 'Party' }
  ];

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Suche nach einem Event..."
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-nunito"
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
          <FunnelIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
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
    </div>
  );
};

export default EventFilter; 