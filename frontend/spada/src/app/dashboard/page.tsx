"use client"; // Indica que este es un componente de cliente

import { useEffect, useState } from 'react';
import Window from '../../components/widgets/window'; // Asegúrate de que la ruta sea correcta
import Chart from '../../components/widgets/chart';

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
        <div>
            <h1>Welcome to the Dashboard</h1>
            <button onClick={handleOpenWindow}>Open new Window</button>

            {windows.map(window => (
                <Window
                    key={window.id}
                    title={window.title}
                    onClose={() => handleCloseWindow(window.id)}
                    initialPosition={window.position} // Pasar la posición inicial
                    onSelectEndpoint={(selectedEndpoint) => handleSelectEndpoint(window.id, selectedEndpoint)} // Pasar la función para seleccionar el endpoint
                >
                    {/* Solo renderizar el gráfico si hay un endpoint seleccionado */}
                    {window.endpoint && <Chart endpoint={window.endpoint} />} 
                </Window>
            ))}
        </div>
    );
}
