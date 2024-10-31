// src/admin/UserList.tsx
import React from 'react';
import { API_URL } from '../../utils/api';

interface User {
    id: number;
    name: string;
    last_name: string;
    email: string;
    is_approved: boolean;
}

interface UserListProps {
    users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
    const handleApproval = async (userId: number) => {
        const response = await fetch(`${API_URL}/api/users/${userId}/approve`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                'Content-Type': 'application/json',
            },
        });
        
        if (response.ok) {
            alert('User approved successfully');
            // Aquí puedes actualizar la lista de usuarios si es necesario
        } else {
            alert('Failed to approve user');
        }
    };

    const handleRejection = async (userId: number) => {
        const response = await fetch(`${API_URL}/api/users/${userId}/reject`, {
            method: 'DELETE', // O el método que uses para rechazar
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                'Content-Type': 'application/json',
            },
        });
        
        if (response.ok) {
            alert('User rejected successfully');
            // Aquí puedes actualizar la lista de usuarios si es necesario
        } else {
            alert('Failed to reject user');
        }
    };

    return (
        <div className="user-list">
            <h3>Pending Users</h3>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => handleApproval(user.id)}>Approve</button>
                                <button onClick={() => handleRejection(user.id)}>Reject</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
