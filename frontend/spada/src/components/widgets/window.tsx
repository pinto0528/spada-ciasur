import React, { useState, useRef } from 'react';
import '../../styles/window.css';
import ComboBox from './comboBoxEntrypoints';

interface WindowProps {
    children: React.ReactNode;
    onClose: () => void;
    initialPosition: { x: number; y: number };
    onSelectEndpoint: (endpoint: string) => void; // Nueva prop para manejar la selección del endpoint
}

const Window: React.FC<WindowProps> = ({children, onClose, initialPosition, onSelectEndpoint }) => {
    const [position, setPosition] = useState(initialPosition);
    const [size, setSize] = useState({ width: 300, height: 200 });
    const [isMaximized, setIsMaximized] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const titleInputRef = useRef<HTMLInputElement | null>(null);
    const isDragging = useRef(false);
    const dragStartPosition = useRef({ x: 0, y: 0 });
    const isResizing = useRef(false);
    const resizeStart = useRef({ width: 0, height: 0, x: 0, y: 0 });

    const handleMouseDown = (e: React.MouseEvent) => {
        isDragging.current = true;
        dragStartPosition.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging.current) {
            setPosition({
                x: e.clientX - dragStartPosition.current.x,
                y: e.clientY - dragStartPosition.current.y,
            });
        }
        if (isResizing.current) {
            setSize({
                width: resizeStart.current.width + (e.clientX - resizeStart.current.x),
                height: resizeStart.current.height + (e.clientY - resizeStart.current.y),
            });
        }
    };

    const handleMouseUp = () => {
        isDragging.current = false;
        isResizing.current = false;
    };

    React.useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    const handleResizeMouseDown = (e: React.MouseEvent) => {
        isResizing.current = true;
        resizeStart.current = { width: size.width, height: size.height, x: e.clientX, y: e.clientY };
    };

    const toggleMaximize = () => {
        if (isMaximized) {
            setPosition(initialPosition);
            setSize({ width: 500, height: 300 }); // O el tamaño que desees por defecto
        } else {
            setPosition({ x: 0, y: 0 }); // Centrar en la pantalla
            setSize({ 
                width: window.innerWidth - 50, // Ajustar un poco para evitar la barra de desplazamiento
                height: window.innerHeight - 50 // Ajustar un poco para evitar la barra de desplazamiento
            }); 
        }
        setIsMaximized(!isMaximized);
    };

    const handleDoubleClick = () => {
        setIsEditing(true); // Activar el modo de edición
    };

    const handleInputBlur = () => {
        setIsEditing(false); // Desactivar el modo de edición al salir del input
    };

    return (
        <div
            className="window"
            style={{
                top: isMaximized ? 0 : position.y,
                left: isMaximized ? 0 : position.x,
                width: isMaximized ? '100vw' : `${size.width}px`,
                height: isMaximized ? '100vh' : `${size.height}px`,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <div onMouseDown={handleMouseDown} className="window-title">
                
                    <>
                        <ComboBox onSelect={onSelectEndpoint} />
                        <button onClick={toggleMaximize} className="maximize-button">
                            {isMaximized ? '□' : '■'}
                        </button>
                        <button onClick={onClose} className="close-button">✖</button>
                    </>
                
            </div>
            <div className="window-content" style={{ flex: 1 }}>
                <div style={{ flex: 1, overflow: 'hidden' }}>
                    {children}
                </div>
                <div onMouseDown={handleResizeMouseDown} className="window-resize" />
            </div>
        </div>
    );
};

export default Window;
