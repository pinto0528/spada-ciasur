"use client"; // Indica que este es un componente de cliente

import { useEffect, useState } from 'react';
import {FAQ} from '@/components/widgets/FAQ'


export default function HomePage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div  className = 'p-4 m-4'>
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Preguntas Frecuentes
      </h2>
      <FAQ/></div>
  );
}
