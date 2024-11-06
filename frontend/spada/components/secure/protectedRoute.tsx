"use client";

import React, { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); // Maneja el estado de carga
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken');

        if (token) {
            setIsAuthenticated(true);
        } else {
            setShowMessage(true);
            setTimeout(() => {
                router.push('/login'); 
            }, 2000);
        }

        setLoading(false); // Finaliza la carga una vez verificado
    }, [router]);

    // Si está en estado de carga, muestra un mensaje o un indicador de carga
    if (loading) {
        return <div>Cargando...</div>;
    }

    // Si no está autenticado y ya se verificó, muestra el mensaje y no carga los hijos
    if (!isAuthenticated) {
        return <div style={{ color: 'red' }}>Debes estar autorizado para acceder a esta página. Redirigiendo...</div>;
    }

    // Si está autenticado, renderiza los hijos
    return <>{children}</>;
};

export default ProtectedRoute;
