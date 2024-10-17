import React, { useState, useRef, useEffect } from 'react';
import '../../styles/window.css'

interface WindowProps {
    title: string;
    children: React.ReactNode;
    onClose: () => void;
    initialPosition: { x: number; y: number }; // Añadir la posición inicial como prop
}

const Window: React.FC<WindowProps> = ({ title, children, onClose, initialPosition }) => {
    const [position, setPosition] = useState(initialPosition); // Usar la posición inicial
    const [size, setSize] = useState({ width: 300, height: 200 });
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

    useEffect(() => {
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

    return (
        <div
            className="window" // Clase CSS para la ventana
            style={{
                top: `${position.y}px`,
                left: `${position.x}px`,
                width: `${size.width}px`,
                height: `${size.height}px`,
            }}
        >
            <div
                onMouseDown={handleMouseDown}
                className="window-title" // Clase CSS para el título
            >
                <button onClick={onClose} className="close-button">✖</button>
                {title}
                
            </div>
            <div className="window-content">
                
                <div>{children}</div>
                <div
                    onMouseDown={handleResizeMouseDown}
                    className="window-resize" // Clase CSS para redimensionar
                />
                </div>
            </div>
            
    );
};

export default Window;
