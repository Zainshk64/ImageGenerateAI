import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SessionProvider } from './contexts/SessionContext';
import Navbar from './components/Navbar';
import Home from './pages/Home'
import PromptPage from './pages/PromptPage';
import Agent1 from './pages/Agent1';
import Agent2 from './pages/Agent2';
import Agent3 from './pages/Agent3';
import Agent4 from './pages/Agent4';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import SessionStatus from './components/SessionStatus';

const App = () => {
  return (
    <SessionProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prompt" element={<ProtectedRoute><PromptPage /></ProtectedRoute>} />
          <Route path="/agent1" element={<ProtectedRoute><Agent1 /></ProtectedRoute>} />
          <Route path="/agent2" element={<ProtectedRoute><Agent2 /></ProtectedRoute>} />
          <Route path="/agent3" element={<ProtectedRoute><Agent3 /></ProtectedRoute>} />
          <Route path="/agent4" element={<ProtectedRoute><Agent4 /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <SessionStatus show={true} />
      </BrowserRouter>
    </SessionProvider>
  );
};

export default App;
