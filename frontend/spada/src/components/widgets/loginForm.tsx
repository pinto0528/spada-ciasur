import React, { useState } from 'react';
import { API_URL } from '../../utils/api';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        try {
            const response = await fetch(`${API_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
    
            const responseBody = await response.json();
            console.log('Response status:', response.status);
            console.log('Response body:', responseBody);

            if (!response.ok) {
                throw new Error('Failed to log in');
            }

            // Asegúrate de que el token está en la respuesta
            const { token } = responseBody;
            if (token) {
                // Almacena el token en localStorage
                localStorage.setItem('authToken', token);
                setSuccess('Logged in successfully!');
                setError(null);
            } else {
                throw new Error('No token received');
            }
        } catch (err) {
            console.error('Error during login:', err);
            setError('Login failed.');
            setSuccess(null);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                required
            />
            <button type="submit">Login</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </form>
    );
};

export default Login;
