import React, { useState } from 'react';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';

const EventFilter = ({ searchQuery, onSearchChange, selectedCategory, onCategoryChange }) => {
  const [showFilter, setShowFilter] = useState(false);
  const categories = [
    { id: '', label: 'Alle Kategorien' },
    { id: 'Musik', label: 'Musik' },
    { id: 'Kulinarisch', label: 'Kulinarisch' },
    { id: 'Kunst', label: 'Kunst' },
    { id: 'Sport', label: 'Sport' },
    { id: 'Party', label: 'Party' }
  ];

  // Schließe das Filtermenü beim Klick außerhalb
  React.useEffect(() => {
    if (!showFilter) return;
    const handleClick = (e) => {
      if (!e.target.closest('.filter-popover')) setShowFilter(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showFilter]);

  return (
    <div className="mb-3 sm:mb-4">
      <div className="flex items-center gap-2 w-full relative">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Suche nach einem Event..."
            className="w-full pl-10 pr-2 py-2 sm:py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 font-nunito text-sm sm:text-base"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
        <button
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 ml-1"
          onClick={() => setShowFilter((v) => !v)}
          aria-label="Filter öffnen"
        >
          <FunnelIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>
        {showFilter && (
          <div className="filter-popover absolute right-0 top-12 z-20 bg-white dark:bg-gray-800 rounded-xl shadow-md p-3 min-w-[180px] border border-gray-200 dark:border-gray-700 animate-fadeIn">
            <div className="flex flex-col gap-1">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => { onCategoryChange(category.id); setShowFilter(false); }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors text-left ${
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
      </div>
    </div>
  );
};

export default EventFilter; 