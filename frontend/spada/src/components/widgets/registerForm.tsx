import React, { useState } from 'react';
import { API_URL } from '../../utils/api';
import { useRouter } from 'next/navigation';
import '../../styles/registerForm.css';  // Asegúrate de que este archivo esté en el mismo directorio y esté importado

const Register: React.FC = () => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, last_name: lastName, email, password }),
            });

            const responseBody = await response.json();
            
            if (!response.ok) {
                // Establecer error detallado, por ejemplo, correo ya registrado
                setError(responseBody.detail || 'Failed to register');
                setSuccess(null);
                return;
            }

            setSuccess('User registered successfully! Await admin approval');
            setError(null);

            setTimeout(() => {
                router.push('/login'); // Redirige a /home después de 2 segundos
            }, 500);

        } catch (err) {
            setError('Registration failed.');
            setSuccess(null);
        }
    };

    return (
        <div className="form-container">
        <form onSubmit={handleSubmit} className="register-form">
            <h2>Register</h2>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre"
                required
                className="input-field"
            />
            <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Apellido"
                required
                className="input-field"
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="input-field"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                required
                className="input-field"
            />
            <button type="submit" className="register-button">Register</button>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
        </form>
        </div>
    );
};

export default Register;
