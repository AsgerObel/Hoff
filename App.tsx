import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Portal from './components/Portal';
import Kontakt from './components/Kontakt';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Portal />} />
        <Route path="/kontakt" element={<Kontakt />} />
        {/* Add a catch-all route if needed, or redirect */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
