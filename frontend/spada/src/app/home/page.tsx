"use client"; // Indica que este es un componente de cliente

import { useEffect, useState } from 'react';
import React from 'react';
import { AboutUs } from '../../components/landing/aboutUs';
import { Mission } from '../../components/landing/mission';
import { Projects } from '../../components/landing/projects';
import { Footer } from '../../components/layout/Footer'
import { Banner }  from '../../components/widgets/banner'
import FAQ from '../../components/widgets/FAQ'
import '../../styles/landing.css';
import { Box } from "@chakra-ui/react";
import { Team } from '@/components/landing/team';

export default function HomePage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="wrapper">
      <Banner/> 
      <div className="container"> 
      <AboutUs />
      <Mission />
      <Projects />
      <Team/>
      <FAQ/>
      <Footer/>
      </div>
    </div>
  );
}
