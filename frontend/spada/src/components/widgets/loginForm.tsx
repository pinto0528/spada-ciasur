// src/components/Login.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { API_URL } from '../../utils/api';
import '../../styles/loginForm.css';
import Link from 'next/link';


const Login: React.FC<{ isAdmin?: boolean }> = ({ isAdmin = false }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const router = useRouter();

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
                setError(responseBody.detail || 'Failed to log in');
                setSuccess(null);
                return;
            }
    
            const { token, is_admin } = responseBody;
            console.log('Token:', token);
            console.log('Is Admin:', is_admin);
    
            if (token) {
                localStorage.setItem('authToken', token);
                setSuccess('Logged in successfully!');
                setError(null);

            const userResponse = await fetch(`${API_URL}/api/users/me`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ email }), // Enviamos el email en el cuerpo de la solicitud
            });

            const userData = await userResponse.json();

            if (userResponse.ok) {
                localStorage.setItem('userInfo', JSON.stringify(userData)); // Guardamos la información en localStorage
            }
                
                if (isAdmin && is_admin) {
                    console.log('Redirecting to /admin');
                    setTimeout(() => {
                        router.push('/admin');
                    }, 500);
                } else {
                    console.log('Redirecting to /home');
                    setTimeout(() => {
                        router.push('/home?refresh=true');
                    }, 500);
                }
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
        <div className="form-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>{isAdmin ? 'Admin Login' : 'Sign in'}</h2>
                {isAdmin ? 
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="input-field"
                /> : 
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="input-field"
                />}
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    required
                    className="input-field"
                />
                <button type="submit" className="login-button">Sign in</button>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                
                <Link className="register" href="/register">New user</Link>
            </form>
        </div> 
    );
};

export default Login;
