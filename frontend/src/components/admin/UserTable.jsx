import React, { useState } from 'react';
import { mockAdminData } from '../../mockAdminData';
import './UserTable.css';

const UserTable = () => {
    const [users, setUsers] = useState(mockAdminData.users);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleStatus = (id) => {
        setUsers(users.map(user =>
            user.id === id ? { ...user, status: user.status === 'Active' ? 'Banned' : 'Active' } : user
        ));
    };

    return (
        <div className="user-table-container">
            <div className="table-header">
                <h2>User Management</h2>
                <input
                    type="text"
                    placeholder="Search users by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>
            <div className="table-wrapper">
                <table className="admin-users-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <span className={`role-badge role-${user.role.toLowerCase()}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td>
                                    <span className={`status-badge status-${user.status.toLowerCase()}`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="btn-edit" onClick={() => alert(`Edit role for ${user.name}`)}>Edit Role</button>
                                        <button className="btn-reset" onClick={() => alert(`Reset password for ${user.name}`)}>Reset Password</button>
                                        <button
                                            className={`btn-toggle ${user.status === 'Active' ? 'btn-ban' : 'btn-activate'}`}
                                            onClick={() => toggleStatus(user.id)}
                                        >
                                            {user.status === 'Active' ? 'Ban / Suspend' : 'Activate'}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserTable;
