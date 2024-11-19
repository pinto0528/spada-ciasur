"use client"; // Indica que este es un componente de cliente

import { useEffect, useState } from 'react';
import ProtectedRoute from '../../components/secure/protectedRoute'; 
import { Button } from "@/components/ui/button"
import NewWindowHandler from '@/components/dashboard/NewWindowHandler';
import { RiLineChartFill } from "react-icons/ri";
import {
    MenuContent,
    MenuItem,
    MenuRoot,
    MenuTrigger,
  } from "@/components/ui/menu"


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

    return (
        <ProtectedRoute>
        <div className='inner-content'>
            <div style={{display:'flex', flexDirection:'row'}}>
                <h1 style={{marginTop:'7px', marginRight:"5px"}}><RiLineChartFill /></h1>
                <h1>Dashboard</h1>
            </div>

            <NewWindowHandler/> 

        </div>
        </ProtectedRoute>
    );
}
