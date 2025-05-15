import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const roles = [
  { value: "user", label: "Nutzer" },
  { value: "organizer", label: "Veranstalter" },
  { value: "admin", label: "Admin" },
];

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const { setRole: setGlobalRole } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setGlobalRole(role);
      localStorage.setItem("role", role);
      if (role === "user") navigate("/");
      if (role === "organizer") navigate("/organizer");
      if (role === "admin") navigate("/admin");
    } catch (err) {
      setError("Login fehlgeschlagen");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-80 space-y-4">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="email"
          placeholder="E-Mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <select
          value={role}
          onChange={e => setRole(e.target.value)}
          className="w-full p-2 border rounded"
        >
          {roles.map(r => (
            <option key={r.value} value={r.value}>{r.label}</option>
          ))}
        </select>
        {error && <div className="text-red-500">{error}</div>}
        <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
} 