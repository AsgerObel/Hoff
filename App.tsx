import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Portal from './components/Portal';
import Kontakt from './components/Kontakt';
import Cases from './components/Cases';
import Services from './components/Services';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Portal />} />
        <Route path="/kontakt" element={<Kontakt />} />
        <Route path="/cases" element={<Cases />} />
        <Route path="/services" element={<Services />} />
        {/* Add a catch-all route if needed, or redirect */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
