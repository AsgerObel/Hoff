import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Portal from './components/Portal';
import Kontakt from './components/Kontakt';
import Cases from './components/Cases';
import Services from './components/Services';
import LavaCase from './components/cases/LavaCase';
import NordbrewCase from './components/cases/NordbrewCase';
import DubsAndDonkraftCase from './components/cases/DubsAndDonkraftCase';
import GrenaaChocolaterierCase from './components/cases/GrenaaChocolaterierCase';
import RoGusCase from './components/cases/RoGusCase';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Portal />} />
        <Route path="/kontakt" element={<Kontakt />} />
        <Route path="/cases" element={<Cases />} />
        <Route path="/cases/lava" element={<LavaCase />} />
        <Route path="/cases/nordbrew" element={<NordbrewCase />} />
        <Route path="/cases/dubs-donkraft" element={<DubsAndDonkraftCase />} />
        <Route path="/cases/grenaa-chocolaterier" element={<GrenaaChocolaterierCase />} />
        <Route path="/cases/ro-gus" element={<RoGusCase />} />
        <Route path="/services" element={<Services />} />
        {/* Add a catch-all route if needed, or redirect */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
