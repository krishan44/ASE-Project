import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './ProfileForm.module.css';

// Zod validation schema
const profileSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    contactNumber: z.string()
        .regex(/^\+?[\d\s-]{10,14}$/, { message: "Invalid phone number" })
        .optional(),
    address: z.string().min(6, { message: "Address must be at least 6 characters" }),
});

function ProfileForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [userRole, setUserRole] = useState('');
    const [userId, setUserId] = useState('');

    const form = useForm({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: '',
            email: '',
            contactNumber: '',
            address: ''
        }
    });

    // Fetch the logged-in user's profile data
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                setIsLoading(true);

                // Retrieve the logged-in user's ID, role, and business/customer ID from localStorage
                const userId = localStorage.getItem('userid');
                const userRole = localStorage.getItem('userRole');
                const businessId = localStorage.getItem('businessId');
                const customerId = localStorage.getItem('customerId');

                if (!userId || !userRole) {
                    throw new Error('User ID or role not found');
                }

                setUserRole(userRole);
                setUserId(userRole === 'business' ? businessId : customerId);

                // Fetch the user's profile data from the backend
                const response = await fetch(`http://localhost:5001/profile/${userRole}/${userRole === 'business' ? businessId : customerId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch profile');
                }

                const data = await response.json();
                form.reset(data);
            } catch (error) {
                alert(error.message || 'Failed to fetch profile');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserProfile();
    }, [form]);

    // Handle form submission
    const onSubmit = async (formData) => {
        try {
            setIsLoading(true);

            // Retrieve the logged-in user's ID, role, and business/customer ID from localStorage
            const userId = localStorage.getItem('userid');
            const userRole = localStorage.getItem('userRole');
            const businessId = localStorage.getItem('businessId');
            const customerId = localStorage.getItem('customerId');

            if (!userId || !userRole) {
                throw new Error('User ID or role not found');
            }

            // Send the updated profile data to the backend
            const response = await fetch(`http://localhost:5001/profile/${userRole}/${userRole === 'business' ? businessId : customerId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Profile updated successfully');
            } else {
                throw new Error('Update failed');
            }
        } catch (error) {
            alert(error.message || 'Could not update profile');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={styles.profileForm}
        >
            <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>Name</label>
                <input
                    id="name"
                    {...form.register('name')}
                    className={styles.input}
                    disabled={isLoading}
                />
                {form.formState.errors.name && (
                    <span className={styles.error}>
                        {form.formState.errors.name.message}
                    </span>
                )}
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>Email</label>
                <input
                    id="email"
                    type="email"
                    {...form.register('email')}
                    className={styles.input}
                    disabled={isLoading}
                />
                {form.formState.errors.email && (
                    <span className={styles.error}>
                        {form.formState.errors.email.message}
                    </span>
                )}
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="contactNumber" className={styles.label}>Phone</label>
                <input
                    id="contactNumber"
                    type="tel"
                    {...form.register('contactNumber')}
                    className={styles.input}
                    disabled={isLoading}
                />
                {form.formState.errors.contactNumber && (
                    <span className={styles.error}>
                        {form.formState.errors.contactNumber.message}
                    </span>
                )}
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="address" className={styles.label}>Address</label>
                <input
                    id="address"
                    type="text"
                    {...form.register('address')}
                    className={styles.input}
                    disabled={isLoading}
                />
                {form.formState.errors.address && (
                    <span className={styles.error}>
                        {form.formState.errors.address.message}
                    </span>
                )}
            </div>

            <button
                type="submit"
                className={styles.submitButton}
                disabled={isLoading}
            >
                {isLoading ? 'Updating...' : 'Update Profile'}
            </button>
        </form>
    );
}

export default ProfileForm;