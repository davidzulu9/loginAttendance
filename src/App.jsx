import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';

import './index.css';
import './App.css';

const isAuthenticated = true;

export default function App() {
  
  return (
    <Router>
      <Routes>
        <Route path='/' element={isAuthenticated ? <Navigate to='/dashboard' /> : <Login />} />

        <Route path='/register' element={<Register />} />

        <Route path='/dashboard/*' element={isAuthenticated ? <Dashboard /> : <Navigate to='/' />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}
