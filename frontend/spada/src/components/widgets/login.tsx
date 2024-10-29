// src/components/Login.tsx
import '../../styles/loginForm.css';
import React, { useState } from 'react';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validación simple
        if (!email || !password) {
            setError('Por favor ingrese su email y contraseña.');
            return;
        }

        setError(null);
        
        // Lógica para autenticar al usuario
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: email, password }), // Asegúrate de que las claves coincidan con lo que espera tu API
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('authToken', data.token); // Guarda el token en localStorage
                // Aquí puedes redirigir al usuario a otra página, como el dashboard
                // Por ejemplo, usando `router.push('/dashboard');` si tienes acceso al router
            } else {
                setError('Credenciales inválidas');
            }
        } catch (err) {
            setError('Hubo un error durante el inicio de sesión.');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Iniciar Sesión</h2>

                {error && <p className="error-message">{error}</p>}

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Ingrese su email"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Ingrese su contraseña"
                    />
                </div>

                <button type="submit" className="login-button">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default Login;
