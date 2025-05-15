import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // "user", "organizer", "admin"
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setRole(localStorage.getItem("role")); // Dummy: Rolle aus localStorage
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const logout = () => {
    signOut(auth);
    setRole(null);
    localStorage.removeItem("role");
  };

  return (
    <AuthContext.Provider value={{ user, role, setRole, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}; 