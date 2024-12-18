"use client"; // Indica que este es un componente de cliente

import { useEffect, useState } from 'react';
import LoginForm from '../../components/widgets/loginForm'

export default function HomePage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
      <div>
        <LoginForm isAdmin={true} />
      </div>
  );
}
