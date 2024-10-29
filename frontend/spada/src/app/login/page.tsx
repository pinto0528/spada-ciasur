"use client"; // Indica que este es un componente de cliente

import { useEffect, useState } from 'react';
import Login from '../../components/widgets/loginForm';
import Link from 'next/link';

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
            <Link href="/register">Registrarse</Link>
      </div>
    </main>
  );
}
