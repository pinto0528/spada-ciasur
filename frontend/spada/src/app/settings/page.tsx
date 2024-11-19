"use client"; // Indica que este es un componente de cliente

import { useEffect, useState } from 'react';
import ProtectedRoute from '../../components/secure/protectedRoute'; // Asegúrate de que la ruta sea correcta
import { RiSettings4Fill } from "react-icons/ri";
import DownloadClientHandler from '@/components/widgets/DownloadClientHandler';

export default function HomePage() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null; // Asegúrate de que sea un componente de cliente
    }

    return (
        <ProtectedRoute>
            <div className='inner-content'>
                <div style={{display:'flex', flexDirection:'row'}}>
                    <h1 style={{marginTop:'7px', marginRight:"5px"}}><RiSettings4Fill/></h1>
                    <h1>Settings</h1>   
                </div>
                <div style={{marginTop:'50px'}}>
                <DownloadClientHandler/>
                </div>
            </div>
        </ProtectedRoute>
    );
}
