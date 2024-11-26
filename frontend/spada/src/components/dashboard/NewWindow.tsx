import React, { useState, useRef } from "react";
import "../../styles/window.css";
import SearchHandler from "./SearchHandler";
import Chart from "./NewChart";
import { EmptyState } from "@/components/ui/empty-state";

interface WindowProps {
    children: React.ReactNode;
    onClose: () => void;
    initialPosition: { x: number; y: number };
    onSelectEndpoint: (endpoint: string) => void;
}

const NewWindow: React.FC<WindowProps> = ({ onClose, initialPosition, onSelectEndpoint }) => {
    const MIN_WIDTH = 650; // Tamaño mínimo de ancho
    const MIN_HEIGHT = 300; // Tamaño mínimo de alto

    const [position, setPosition] = useState(initialPosition);
    const [size, setSize] = useState({ width: MIN_WIDTH, height: MIN_HEIGHT });
    const [isMaximized, setIsMaximized] = useState(false);
    const [selectedEndpoint, setSelectedEndpoint] = useState<string>("");

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
                width: Math.max(MIN_WIDTH, resizeStart.current.width + (e.clientX - resizeStart.current.x)),
                height: Math.max(MIN_HEIGHT, resizeStart.current.height + (e.clientY - resizeStart.current.y)),
            });
        }
    };

    const handleMouseUp = () => {
        isDragging.current = false;
        isResizing.current = false;
    };

    React.useEffect(() => {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, []);

    const handleResizeMouseDown = (e: React.MouseEvent) => {
        isResizing.current = true;
        resizeStart.current = { width: size.width, height: size.height, x: e.clientX, y: e.clientY };
    };

    const toggleMaximize = () => {
        if (isMaximized) {
            setPosition(initialPosition);
            setSize({ width: MIN_WIDTH, height: MIN_HEIGHT });
        } else {
            setPosition({ x: 0, y: 0 });
            setSize({
                width: window.innerWidth - 50,
                height: window.innerHeight - 50,
            });
        }
        setIsMaximized(!isMaximized);
    };

    const handleEndpointSelection = (endpoint: string) => {
        setSelectedEndpoint(endpoint);
    };

    return (
        <div
            className="window"
            style={{
                top: isMaximized ? 0 : position.y,
                left: isMaximized ? 0 : position.x,
                width: isMaximized ? "100vw" : `${size.width}px`,
                height: isMaximized ? "100vh" : `${size.height}px`,
                display: "flex",
                flexDirection: "column",
            }}
        >
            <div onMouseDown={handleMouseDown} className="window-title">
                <>
                    <SearchHandler onSelectEndpoint={handleEndpointSelection} />
                    <button onClick={toggleMaximize} className="maximize-button">
                        {isMaximized ? "□" : "■"}
                    </button>
                    <button onClick={onClose} className="close-button">
                        ✖
                    </button>
                </>
            </div>

            <div className="window-content" style={{ flex: 1, position: "relative" }}>
                {selectedEndpoint ? (
                    <div style={{ flex: 1, overflow: "hidden" }}>
                        <Chart endpoint={selectedEndpoint} />
                    </div>
                ) : (
                    <EmptyState
                        title="No data selected"
                        description="Use the search bar to select a dataset."
                    />
                )}
                <div onMouseDown={handleResizeMouseDown} className="window-resize" />
            </div>
        </div>
    );
};

export default NewWindow;
