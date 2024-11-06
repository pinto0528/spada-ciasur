// src/app/page.tsx
import React from 'react';
import { AboutUs } from './aboutUs';
import { Mission } from './mission';
import { Projects } from './projects';
import '../../styles/landing.css';

const LandingPage: React.FC = () => {
  return (
    <div className="container">
      <h1 className="title">CIASUR</h1>
      <h2 className="subtitle">Centro de Investigación de la Atmósfera Superior y Radiotransmisiones</h2>
      <AboutUs />
      <Mission />
      <Projects />
    </div>
  );
};

export default LandingPage;
