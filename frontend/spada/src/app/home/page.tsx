"use client"; // Indica que este es un componente de cliente

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import { HStack } from "@chakra-ui/react"
import FAQ from '@/components/widgets/FAQ'


export default function HomePage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <main>
      <h1>Welcome to SPADA!</h1>
      <HStack>
        <FAQ/>
      </HStack>
    </main>
  );
}
