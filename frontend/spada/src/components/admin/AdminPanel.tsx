import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import jwt from 'jsonwebtoken'; // Importa jsonwebtoken
import { API_URL } from '../../utils/api';
import UserList from './UserList';
import '../../styles/adminPanel.css';
import { Heading } from '@chakra-ui/react';

interface DecodedToken {
    sub: string;
    exp: number;
    is_admin: boolean; // Cambia esto a true o false según la estructura de tu token
}

const AdminPanel: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('authToken');

        // Verifica si el token no existe
        if (!token) {
            router.push('/admin-login'); // Redirige al login si no está autenticado
            return;
        }

        // Decodifica el token
        let isAdmin = false;
        try {
            const decoded: DecodedToken = jwt.decode(token) as DecodedToken; // Usa jwt.decode
            isAdmin = decoded.is_admin; // Verifica si es admin
        } catch (err) {
            console.error('Error decoding token:', err);
            router.push('/admin-login'); // Redirige si no se puede decodificar el token
            return;
        }

        // Verifica si el usuario no es admin
        if (!isAdmin) {
            router.push('/admin-login'); // Redirige al login si no es admin
            return;
        }

        const fetchUsers = async () => {
            try {
                const response = await fetch(`${API_URL}/api/admin/pending-users`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }

                const data = await response.json();
                setUsers(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
                console.error('Error during fetching users:', err);
            }
        };

        fetchUsers();
    }, [router]);

    return (
        <div className="admin-panel">
            <Heading style={{marginBottom:'15px', fontSize:'2rem'}}>Admin Panel</Heading>
            {error && <p className="error-message">{error}</p>}
            <UserList users={users} />
        </div>
    );
};

export default AdminPanel;
