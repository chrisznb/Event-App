import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { logout, role } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8 dark:text-white font-sora">
        Profil
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white font-sora">
            Dark Mode
          </h2>
          <button
            onClick={toggleTheme}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
              isDarkMode ? 'bg-primary-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isDarkMode ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 font-sora">
            Über die App
          </h2>
          <p className="text-gray-600 dark:text-gray-400 font-nunito">
            Die Heinsberg Events App hilft dir, alle wichtigen Veranstaltungen in und um Heinsberg zu entdecken. 
            Markiere deine Lieblingsveranstaltungen als Favoriten und behalte den Überblick über besuchte Events.
          </p>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 font-sora">
            Kontakt
          </h2>
          <p className="text-gray-600 dark:text-gray-400 font-nunito">
            Bei Fragen oder Anregungen kannst du uns gerne kontaktieren:
            <br />
            <a
              href="mailto:info@heinsberg-events.de"
              className="text-primary-600 dark:text-primary-400 hover:underline"
            >
              info@heinsberg-events.de
            </a>
          </p>
        </div>

        {(role === 'organizer' || role === 'admin') && (
          <div className="mb-4">
            <a
              href="#/organizer"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mr-2"
            >
              Organizer-Dashboard
            </a>
            {role === 'admin' && (
              <a
                href="#/admin"
                className="inline-block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Admin-Dashboard
              </a>
            )}
          </div>
        )}

        <div className="flex justify-end">
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile; 