import React, { useState } from 'react';
import Window from './NewWindow';
import Chart from './NewChart';
import SearchHandler from './SearchHandler'; // Importa el nuevo SearchHandler

const NewWindowHandler: React.FC = () => {
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
            <button onClick={openWindow}>Open Window (by date)</button>
            {windows.map(window => (
                <Window
                    key={window.id}
                    onClose={() => closeWindow(window.id)}
                    onSelectEndpoint={(endpoint) => handleSelectEndpoint(window.id, endpoint)} // Pasa el ID y el endpoint seleccionado
                    initialPosition={window.initialPosition} // Pasa la posición inicial
                >
                    <SearchHandler 
                        onSelectEndpoint={(endpoint: string) => handleSelectEndpoint(window.id, endpoint)} // Utiliza el nuevo SearchHandler para seleccionar el endpoint
                    />
                    {window.endpoint && <Chart endpoint={window.endpoint} />} {/* Renderiza el gráfico solo si hay un endpoint */}
                </Window>
            ))}
        </div>
    );
};

export default NewWindowHandler;
