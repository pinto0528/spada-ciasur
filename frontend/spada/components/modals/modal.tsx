import React from 'react';
import '../../styles/modal.css'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{title}</h2>
                <button onClick={onClose}>Close</button>
                {children}
            </div>
        </div>
    );
};

export default Modal;