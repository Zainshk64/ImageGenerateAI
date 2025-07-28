import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Home from './pages/Home'
import PromptPage from './pages/PromptPage';
import Agent1 from './pages/Agent1';
import Agent2 from './pages/Agent2';
import Agent3 from './pages/Agent3';
import Agent4 from './pages/Agent4';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prompt" element={<PromptPage />} />
        <Route path="/agent1" element={<Agent1 />} />
        <Route path="/agent2" element={<Agent2 />} />
        <Route path="/agent3" element={<Agent3 />} />
        <Route path="/agent4" element={<Agent4 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
