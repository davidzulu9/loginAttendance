import React, { useState } from 'react';
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import Dashboard from "./components/Dashboard.jsx";
import AttendanceTable from "./components/AttendanceTable.jsx";
import './index.css';
import './App.css';


export default function App() {
  const [screen, setScreen] = useState('register');
  const [user, setUser] = useState(null);

  const navigate = (next) => setScreen(next);

  return (
    <>
      {screen === 'register' && <Register onNext={() => navigate('login')} />}
      {screen === 'login' && (
        <Login
          onLogin={(userData) => {
            setUser(userData);
            navigate('dashboard');
          }}
        />
      )}
      {screen === 'dashboard' && (
        <Dashboard
          user={user}
          onNavigate={navigate}
        />
      )}
      {screen === 'attendance' && <AttendanceTable onBack={() => navigate('dashboard')} />}
    </>
  );
}
