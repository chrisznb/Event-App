import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, MapIcon, HeartIcon, UserIcon } from '@heroicons/react/24/outline';
import { HomeIcon as HomeIconSolid, MapIcon as MapIconSolid, HeartIcon as HeartIconSolid, UserIcon as UserIconSolid } from '@heroicons/react/24/solid';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/', icon: HomeIcon, activeIcon: HomeIconSolid, label: 'Home' },
    { path: '/map', icon: MapIcon, activeIcon: MapIconSolid, label: 'Karte' },
    { path: '/favorites', icon: HeartIcon, activeIcon: HeartIconSolid, label: 'Favoriten' },
    { path: '/profile', icon: UserIcon, activeIcon: UserIconSolid, label: 'Profil' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around">
          {navItems.map(({ path, icon: Icon, activeIcon: ActiveIcon, label }) => (
            <Link
              key={path}
              to={path}
              className="flex flex-col items-center py-2 px-3 text-sm font-medium"
            >
              {isActive(path) ? (
                <ActiveIcon className="h-6 w-6 text-primary-600" />
              ) : (
                <Icon className="h-6 w-6 text-gray-400" />
              )}
              <span className={`mt-1 ${isActive(path) ? 'text-primary-600' : 'text-gray-400'}`}>
                {label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 