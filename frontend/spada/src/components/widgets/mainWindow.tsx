import React, { useState } from 'react';
import Window from './window'; // Importa correctamente el componente Window

const MainComponent: React.FC = () => {
    const [windows, setWindows] = useState<{ id: number; title: string; position: { x: number; y: number } }[]>([]);
    const [nextId, setNextId] = useState(1); // Para asignar un ID único a cada ventana

    const openWindow = () => {
        // Calcular posición centrada en la ventana del navegador
        const windowWidth = 300; // Ancho predeterminado de la ventana
        const windowHeight = 200; // Alto predeterminado de la ventana
        const x = (window.innerWidth - windowWidth) / 2;
        const y = (window.innerHeight - windowHeight) / 2;

        setWindows([...windows, { id: nextId, title: `Window ${nextId}`, position: { x, y } }]);
        setNextId(nextId + 1); // Incrementar el ID para la próxima ventana
    };

    const closeWindow = (id: number) => {
        setWindows(windows.filter(window => window.id !== id));
    };

    return (
        <div>
            <button onClick={openWindow}>Open Window</button>
            {windows.map(window => (
                <Window
                    key={window.id}
                    title={window.title}
                    onClose={() => closeWindow(window.id)}
                    initialPosition={window.position} // Asegúrate de pasar la posición inicial
                    onSelectEndpoint={() => {}} // Si no estás usando, podrías dejarlo vacío o manejarlo
                >
                    <p>This is the content of {window.title}.</p>
                </Window>
            ))}
        </div>
    );
};

export default MainComponent;
