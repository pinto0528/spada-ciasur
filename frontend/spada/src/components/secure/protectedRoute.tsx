"use client"; // Asegúrate de que sea un componente de cliente

import React, { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Asegúrate de usar el router correcto

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); // Estado para controlar la carga
    const [showMessage, setShowMessage] = useState(false); // Estado para mostrar el mensaje

    useEffect(() => {
        const token = localStorage.getItem('authToken');

        if (token) {
            setIsAuthenticated(true);
            setLoading(false); // No está en carga
        } else {
            setShowMessage(true); // Mostrar el mensaje de no autorizado
            setTimeout(() => {
                router.push('/login'); // Redirige a la página de login después de 3 segundos
            }, 2000);
        }
    }, [router]); // Añade router como dependencia


    // Si no está autenticado, no renderiza nada más que el mensaje
    if (!isAuthenticated) {
        return <div style={{ color: 'red' }}>Debes estar autorizado para acceder a esta página. Redirigiendo...</div>;
    }

    // Si está autenticado, renderiza los hijos
    return <>{children}</>;
};

export default ProtectedRoute;
