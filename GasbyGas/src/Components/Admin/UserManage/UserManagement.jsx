import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserModal from './UserModal';
import styles from './UserManagement.module.css';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Sample hardcoded user data for testing
    const SAMPLE_USERS = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '123-456-7890'
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            phone: '987-654-3210'
        },
        {
            id: 3,
            name: 'Mike Johnson',
            email: 'mike.johnson@example.com',
            phone: '456-789-0123'
        }
    ];

    useEffect(() => {
        // fetchUsers();
        setUsers(SAMPLE_USERS);//remove after integrate API

    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/users');
            // Handle different possible response formats
            const userData = Array.isArray(response.data)
                ? response.data
                : response.data.users || response.data.data || [];
            setUsers(userData);
        } catch (error) {
            console.error('Fetch users error:', error);
            alert('Failed to fetch users');
        }
    };

    const handleView = (user) => {
        setSelectedUser(user);
        setIsEditModalOpen(true);
    };

    const handleAddUser = async (userData) => {
        try {
            const response = await axios.post('/api/users', userData);
            const newUser = response.data;
            setUsers(prevUsers => [...prevUsers, newUser]);
            setIsAddModalOpen(false);
            alert('User added successfully');
        } catch (error) {
            console.error('Add user error:', error);
            alert('Failed to add user');
        }
    };

    const handleUpdateUser = async (updatedUser) => {
        try {
            const response = await axios.put(`/api/users/${updatedUser.id}`, updatedUser);
            setUsers(prevUsers =>
                prevUsers.map(user => user.id === updatedUser.id ? response.data : user)
            );
            setIsEditModalOpen(false);
            alert('User updated successfully');
        } catch (error) {
            console.error('Update user error:', error);
            alert('Failed to update user');
        }
    };

    const handleDeleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`/api/users/${userId}`);
                setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
                alert('User deleted successfully');
            } catch (error) {
                console.error('Delete user error:', error);
                alert('Failed to delete user');
            }
        }
    };

    return (
        <div className={styles.container}>
            <button
                onClick={() => setIsAddModalOpen(true)}
                className={`${styles.actionButton} ${styles.btn}`}
            >
                + Add New User
            </button>

            <table className={styles.table}>
                <thead>
                    <tr className={styles.tableHeader}>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id} className={styles.tableRow}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button
                                    onClick={() => handleView(user)}
                                    className={`${styles.viewButton} ${styles.btn}`}
                                >
                                    View
                                </button>
                                <button
                                    onClick={() => handleDeleteUser(user.id)}
                                    className={`${styles.deleteButton} ${styles.btn}`}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isAddModalOpen && (
                <UserModal
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                    onSubmit={handleAddUser}
                    user={null}
                />
            )}

            {isEditModalOpen && selectedUser && (
                <UserModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    onSubmit={handleUpdateUser}
                    user={selectedUser}
                />
            )}
        </div>
    );
};

export default UserManagement;