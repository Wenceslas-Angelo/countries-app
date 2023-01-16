import React from 'react';
import './App.css';
import { FaMoon } from 'react-icons/fa';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';

function App() {
  return (
    <div className="app">
      <header>
        <h1>Where in the world?</h1>
        <div className="switch-theme">
          <FaMoon /> Dark mode
        </div>
      </header>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:name" element={<Details />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
