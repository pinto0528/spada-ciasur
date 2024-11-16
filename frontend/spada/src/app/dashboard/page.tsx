"use client"; // Indica que este es un componente de cliente

import { useEffect, useState } from 'react';
import Window from '../../components/widgets/window'; // Asegúrate de que la ruta sea correcta
import Chart from '../../components/widgets/chart';
import ProtectedRoute from '../../components/secure/protectedRoute'; 
import { Button } from "@/components/ui/button"
import { Box, Collapsible } from "@chakra-ui/react"
import SearchHandler from '@/components/dashboard/SearchHandler';
import NewWindowHandler from '@/components/dashboard/NewWindowHandler';

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
        <Collapsible.Root>
            <Collapsible.Trigger paddingY="3"><h1>Dashboard</h1></Collapsible.Trigger>
            <Collapsible.Content>
            <Box padding="4" borderWidth="1px">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book.
            </Box>
            </Collapsible.Content>
        </Collapsible.Root>
            <Button onClick={handleOpenWindow} marginY='5'>New Chart</Button>

            {windows.map(window => (
                <Window
                    key={window.id}
                    onClose={() => handleCloseWindow(window.id)}
                    initialPosition={window.position}
                    onSelectEndpoint={(selectedEndpoint) => handleSelectEndpoint(window.id, selectedEndpoint)} // Pasar la función para seleccionar el endpoint
                >
                    {/* Solo renderizar el gráfico si hay un endpoint seleccionado */}
                    {window.endpoint && <Chart endpoint={window.endpoint} />} 
                </Window>
            ))}
            <NewWindowHandler/>
        </div>
        </ProtectedRoute>
    );
}
