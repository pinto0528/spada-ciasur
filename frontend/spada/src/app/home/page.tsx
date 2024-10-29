"use client"; // Indica que este es un componente de cliente

import { useEffect, useState } from 'react';


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
    </main>
  );
}
