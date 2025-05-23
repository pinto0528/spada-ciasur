"use client"; // Indica que este es un componente de cliente

import { useEffect, useState } from 'react';
import Register from '../../components/widgets/registerForm';

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
            <Register />
      </div>
    </main>
  );
}
