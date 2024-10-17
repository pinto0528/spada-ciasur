import React, { useState, useRef } from 'react';
import '../../styles/window.css';
import ComboBox from './comboBoxEntrypoints'; // Asegúrate de importar ComboBox
import Chart from '../../components/widgets/chart'; // Asegúrate de importar Chart

interface WindowProps {
    title: string;
    children: React.ReactNode;
    onClose: () => void;
    initialPosition: { x: number; y: number };
    onSelectEndpoint: (endpoint: string) => void; // Nueva prop para manejar la selección del endpoint
}

const Window: React.FC<WindowProps> = ({ title: initialTitle, children, onClose, initialPosition, onSelectEndpoint }) => {
    const [position, setPosition] = useState(initialPosition);
    const [size, setSize] = useState({ width: 300, height: 200 });
    const [isMaximized, setIsMaximized] = useState(false);
    const [title, setTitle] = useState(initialTitle);
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value); // Actualizar el título en tiempo real
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
                    display: 'flex', // Agrega esto
                    flexDirection: 'column', // Agrega esto
                }}
            >
            <div
                onMouseDown={handleMouseDown}
                className="window-title"
                onDoubleClick={handleDoubleClick}
            >
                {isEditing ? (
                    <input
                        type="text"
                        value={title}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        ref={titleInputRef}
                        autoFocus
                        style={{ width: '100%', border: 'none', backgroundColor: 'transparent' }}
                    />
                ) : (
                    <>
                        <button onClick={toggleMaximize} className="maximize-button">
                            {isMaximized ? '□' : '■'}
                        </button>
                        <button onClick={onClose} className="close-button">✖</button>
                        {title}
                    </>
                )}
            </div>
            <div className="window-content" style={{ flex: 1 }}>
            <ComboBox onSelect={onSelectEndpoint} />
            <div style={{ flex: 1, overflow: 'hidden' }}>
                {children}
            </div>
            <div onMouseDown={handleResizeMouseDown} className="window-resize" />
        </div>
    </div>
    );
};

export default Window;
