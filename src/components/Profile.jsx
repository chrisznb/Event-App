import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const Profile = () => {
  const [isOrganizerView, setIsOrganizerView] = useState(false);
  const [theme, setTheme] = useState('system');
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('Deutsch');
  const { isDarkMode, toggleTheme } = useTheme();

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    // Hier würde die Theme-Änderung implementiert werden
  };

  const handleNotificationToggle = () => {
    setNotifications(!notifications);
  };

  if (isOrganizerView) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">🎤 Veranstalterbereich</h2>
        <p className="text-gray-600 mb-6">Hier kannst du neue Events erstellen. Einfach und schnell.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Titel:</label>
            <input
              type="text"
              placeholder="z. B. Straßenfest Oberbruch"
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Bild hochladen:</label>
            <input
              type="file"
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Datum:</label>
            <input
              type="date"
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Uhrzeit:</label>
            <input
              type="time"
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium">Ort:</label>
            <input
              type="text"
              placeholder="z. B. Oberbruch"
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => alert('📣 Event wurde gespeichert (Demo)')}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Event veröffentlichen
          </button>
          <button
            onClick={() => setIsOrganizerView(false)}
            className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300"
          >
            Zurück zum Profil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Profil
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">Dark Mode</span>
            <button
              onClick={toggleTheme}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700"
            >
              <span
                className={`${
                  isDarkMode ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </button>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Über die App
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Heinsberg Events ist eine Plattform für Veranstaltungen in Heinsberg und Umgebung.
              Entdecken Sie Events, markieren Sie Ihre Favoriten und teilen Sie Ihre Erfahrungen.
            </p>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Kontakt
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Bei Fragen oder Anregungen können Sie uns unter{' '}
              <a
                href="mailto:info@heinsberg-events.de"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                info@heinsberg-events.de
              </a>{' '}
              kontaktieren.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={() => setIsOrganizerView(true)}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700"
        >
          🛠 Veranstalteransicht testen
        </button>
      </div>
    </div>
  );
};

export default Profile; 