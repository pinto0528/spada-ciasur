"use client"; // Indica que este es un componente de cliente

import { useEffect, useState} from 'react';
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { AboutUs } from '../../components/landing/aboutUs';
import { Mission } from '../../components/landing/mission';
import { Projects } from '../../components/landing/projects';
import { Footer } from '../../components/layout/Footer';
import { Banner }  from '../../components/widgets/banner';
import FAQ from '../../components/widgets/FAQ';
import '../../styles/landing.css';
import { Box } from "@chakra-ui/react";
import { Team } from '@/components/landing/team';

export default function HomePage() {
  const [isClient, setIsClient] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsClient(true);

    if (searchParams.get('refresh') === 'true') {
      const newUrl = '/home';
      window.history.replaceState(null, '', newUrl);
      window.location.reload();
    }
  }, [searchParams]);

  if (!isClient) {
    return null;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
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
    </Suspense>
  );
}
