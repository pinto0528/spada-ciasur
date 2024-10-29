"use client"; // Indica que este es un componente de cliente

import { useEffect, useState } from 'react';
import Login from '../../components/widgets/login';

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
      <div>
            <Login />
      </div>
    </main>
  );
}
