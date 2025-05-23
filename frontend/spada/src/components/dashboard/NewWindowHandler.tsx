import React, { useState } from 'react';
import Window from './NewWindow';
import Chart from './NewChart';
import SearchHandler from './SearchHandler';
import { Button } from "@/components/ui/button";
import { Link } from '@chakra-ui/react';

const NewWindowHandler: React.FC = () => {
    const [windows, setWindows] = useState<{ id: number; title: string; endpoint: string; initialPosition: { x: number; y: number } }[]>([]);
    const [nextId, setNextId] = useState(1); // Para asignar un ID único a cada ventana

    const openWindow = () => {
        const initialPosition = { x: 250, y: 250 }; // Define la posición inicial
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
            
            <Button variant='surface' onClick={openWindow}>New Chart</Button>
            {windows.map(window => (
                
                <Window
                    key={window.id}
                    onClose={() => closeWindow(window.id)}
                    onSelectEndpoint={(endpoint) => handleSelectEndpoint(window.id, endpoint)}
                    initialPosition={window.initialPosition}
                >   
                    
                    <SearchHandler 
                        onSelectEndpoint={(endpoint: string) => handleSelectEndpoint(window.id, endpoint)}
                    />
                    {window.endpoint && <Chart endpoint={window.endpoint} />} 
                </Window>
            ))}
        </div>
    );
};

export default NewWindowHandler;
