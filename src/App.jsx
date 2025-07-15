import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Home from './pages/Home'
import PromptPage from './pages/PromptPage';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prompt" element={<PromptPage />} />

        {/* Add more routes here if needed */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
