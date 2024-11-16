"use client"; // Indica que este es un componente de cliente

import { useEffect, useState } from 'react';
import Window from '../../components/widgets/window'; // Asegúrate de que la ruta sea correcta
import Chart from '../../components/widgets/chart';
import ProtectedRoute from '../../components/secure/protectedRoute'; 
import { Button } from "@/components/ui/button"
import { Box, Collapsible } from "@chakra-ui/react"
import SearchHandler from '@/components/dashboard/SearchHandler';
import NewWindowHandler from '@/components/dashboard/NewWindowHandler';
import { RiLineChartFill } from "react-icons/ri";

export default function HomePage() {
    const [isClient, setIsClient] = useState(false);
    const [windows, setWindows] = useState<{ id: number; title: string; position: { x: number; y: number }; endpoint: string }[]>([]);
    const [nextId, setNextId] = useState(1); // Para asignar un ID único a cada ventana

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleOpenWindow = () => {
        // Calcular posición centrada en la ventana del navegador
        const windowWidth = 300; // Ancho predeterminado de la ventana
        const windowHeight = 200; // Alto predeterminado de la ventana
        const x = (window.innerWidth - windowWidth) / 2;
        const y = (window.innerHeight - windowHeight) / 2;

        setWindows([...windows, { id: nextId, title: `Window ${nextId}`, position: { x, y }, endpoint: '' }]);
        setNextId(nextId + 1); // Incrementar el ID para la próxima ventana
    };

    const handleCloseWindow = (id: number) => {
        setWindows(windows.filter(window => window.id !== id));
    };

    // Manejar la selección del endpoint desde el ComboBox
    const handleSelectEndpoint = (id: number, selectedEndpoint: string) => {
        setWindows(windows.map(window => 
            window.id === id ? { ...window, endpoint: selectedEndpoint } : window
        ));
    };

    return (
        <ProtectedRoute>
        <div className='inner-content'>
        <div style={{display:'flex', flexDirection:'row'}}>
                <h1 style={{marginTop:'7px', marginRight:"5px"}}><RiLineChartFill /></h1>
                <h1>Dashboard</h1>
            </div>
            <NewWindowHandler/>
        </div>
        </ProtectedRoute>
    );
}
