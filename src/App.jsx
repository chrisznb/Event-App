import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MapView from './pages/MapView';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ErrorBoundary from './components/ErrorBoundary';
import Login from './pages/Login';
import OrganizerDashboard from './pages/OrganizerDashboard';
import AdminDashboard from './pages/AdminDashboard';

function PrivateRoute({ children, allowedRoles }) {
  const { user, role, loading } = useAuth();
  if (loading) return <div>Lade...</div>;
  if (!user) return <Login />;
  if (!allowedRoles.includes(role)) return <div>Kein Zugriff</div>;
  return children;
}

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
        <AuthProvider>
          <Router>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-16">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                  path="/organizer"
                  element={
                    <PrivateRoute allowedRoles={["organizer", "admin"]}>
                      <OrganizerDashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin"
                  element={
                    <PrivateRoute allowedRoles={["admin"]}>
                      <AdminDashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/"
                  element={
                    <PrivateRoute allowedRoles={["user", "organizer", "admin"]}>
                      <Home
                        favorites={favorites}
                        visited={visited}
                        onFavorite={handleFavorite}
                        onVisited={handleVisited}
                      />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/map"
                  element={
                    <PrivateRoute allowedRoles={["user", "organizer", "admin"]}>
                      <MapView
                        favorites={favorites}
                        visited={visited}
                        onFavorite={handleFavorite}
                        onVisited={handleVisited}
                      />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/favorites"
                  element={
                    <PrivateRoute allowedRoles={["user", "organizer", "admin"]}>
                      <Favorites
                        favorites={favorites}
                        visited={visited}
                        onFavorite={handleFavorite}
                        onVisited={handleVisited}
                      />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute allowedRoles={["user", "organizer", "admin"]}>
                      <Profile />
                    </PrivateRoute>
                  }
                />
              </Routes>
              <Navbar />
            </div>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
