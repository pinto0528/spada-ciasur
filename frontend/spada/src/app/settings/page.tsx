"use client"; // Indica que este es un componente de cliente

import { useEffect, useState } from "react";
import ProtectedRoute from "../../../components/secure/protectedRoute"; // Asegúrate de que la ruta sea correcta

export default function HomePage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Asegúrate de que sea un componente de cliente
  }

  return (
    <ProtectedRoute>
      <main>
        <h1>Welcome to Settings</h1>
        {/* Resto del contenido */}
      </main>
    </ProtectedRoute>
  );
}
