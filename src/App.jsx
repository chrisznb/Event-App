import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MapView from './pages/MapView';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
  const [favorites, setFavorites] = useState([]);
  const [visited, setVisited] = useState([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    const savedVisited = localStorage.getItem('visited');
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedVisited) setVisited(JSON.parse(savedVisited));
  }, []);

  const handleFavorite = (eventId) => {
    const newFavorites = favorites.includes(eventId)
      ? favorites.filter(id => id !== eventId)
      : [...favorites, eventId];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const handleVisited = (eventId) => {
    const newVisited = visited.includes(eventId)
      ? visited.filter(id => id !== eventId)
      : [...visited, eventId];
    setVisited(newVisited);
    localStorage.setItem('visited', JSON.stringify(newVisited));
  };

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-16">
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    favorites={favorites}
                    visited={visited}
                    onFavorite={handleFavorite}
                    onVisited={handleVisited}
                  />
                }
              />
              <Route
                path="/map"
                element={
                  <MapView
                    favorites={favorites}
                    visited={visited}
                    onFavorite={handleFavorite}
                    onVisited={handleVisited}
                  />
                }
              />
              <Route
                path="/favorites"
                element={
                  <Favorites
                    favorites={favorites}
                    visited={visited}
                    onFavorite={handleFavorite}
                    onVisited={handleVisited}
                  />
                }
              />
              <Route path="/profile" element={<Profile />} />
            </Routes>
            <Navbar />
          </div>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
