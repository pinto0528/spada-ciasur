"use client"; // Indica que este es un componente de cliente

import { useEffect, useState } from 'react';
import LandingPage from '../../components/landing/landing'
import React from 'react';
import { AboutUs } from '../../components/landing/aboutUs';
import { Mission } from '../../components/landing/mission';
import { Projects } from '../../components/landing/projects';
import '../../styles/landing.css';

export default function HomePage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="container">
      <h1 className="title">CIASUR</h1>
      <h2 className="subtitle">Centro de Investigación de la Atmósfera Superior y Radiotransmisiones</h2>
      <AboutUs />
      <Mission />
      <Projects />
    </div>
  );
}
