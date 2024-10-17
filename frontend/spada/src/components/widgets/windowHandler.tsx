import React, { useState } from 'react';
import Window from './window';
import Chart from './chart';
import ComboBox from './comboBoxEntrypoints'; // Asegúrate de importar ComboBox

const WindowHandler: React.FC = () => {
    const [windows, setWindows] = useState<{ id: number; title: string; endpoint: string; initialPosition: { x: number; y: number } }[]>([]);
    const [nextId, setNextId] = useState(1); // Para asignar un ID único a cada ventana

    const openWindow = () => {
        const initialPosition = { x: 100, y: 100 }; // Define la posición inicial
        setWindows([...windows, { id: nextId, title: `Window ${nextId}`, endpoint: '', initialPosition }]);
        setNextId(nextId + 1); // Incrementar el ID para la próxima ventana
    };

    const closeWindow = (id: number) => {
        setWindows(windows.filter(window => window.id !== id));
    };

    const handleSelectEndpoint = (id: number, endpoint: string) => {
        setWindows(windows.map(window => 
            window.id === id ? { ...window, endpoint } : window
        ));
    };

    return (
        <div>
            <button onClick={openWindow}>Open Window</button>
            {windows.map(window => (
                <Window
                    key={window.id}
                    title={window.title}
                    onClose={() => closeWindow(window.id)}
                    onSelectEndpoint={(endpoint) => handleSelectEndpoint(window.id, endpoint)} // Pasa el ID y el endpoint seleccionado
                    initialPosition={window.initialPosition} // Pasa la posición inicial
                >
                    <ComboBox onSelect={(endpoint) => handleSelectEndpoint(window.id, endpoint)} /> {/* ComboBox para seleccionar el endpoint */}
                    {window.endpoint && <Chart endpoint={window.endpoint} />} {/* Renderiza el gráfico solo si hay un endpoint */}
                </Window>
            ))}
        </div>
    );
};

export default WindowHandler;
