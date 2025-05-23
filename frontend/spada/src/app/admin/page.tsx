"use client"; // Indica que este es un componente de cliente

import { useEffect, useState } from 'react';
import AdminPanel from '../../components/admin/AdminPanel';

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
        <AdminPanel />
      </div>
  );
}
