"use client";

import React, { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, AbsoluteCenter, Center, Circle, Square, Spinner } from "@chakra-ui/react"
import { Alert } from "@/components/ui/alert"

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
            }, 2500);
        }

        setLoading(false); // Finaliza la carga una vez verificado
    }, [router]);

    // Si está en estado de carga, muestra un mensaje o un indicador de carga
    if (loading) {
        return(
        <div>
        <Box>
            <AbsoluteCenter>
            <Spinner color="#5e5ef3" borderWidth="4px" size='xl' />
            </AbsoluteCenter>
        </Box>    
        </div>);
    }

    // Si no está autenticado y ya se verificó, muestra el mensaje y no carga los hijos
    if (!isAuthenticated) {
        return <div style={{ color: 'red' }}>
            <Box>
            <AbsoluteCenter>
            <Alert status="error" title="User not autenticated">
                Debes estar autorizado para acceder a esta página. Redirigiendo...
            </Alert>
            </AbsoluteCenter>
            </Box>
            </div>;
    }

    // Si está autenticado, renderiza los hijos
    return <>{children}</>;
};

export default ProtectedRoute;
