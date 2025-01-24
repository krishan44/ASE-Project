import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './ProfileForm.module.css';

// Zod validation schema
const profileSchema = z.object({
    firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
    lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string()
        .regex(/^\+?[\d\s-]{10,14}$/, { message: "Invalid phone number" })
        .optional(),
    address: z.string().min(6, { message: "Address must be at least 6 characters" }),
});

function ProfileForm() {
    // const CustomerProfileForm = () => {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: ''

        }
    });

    useEffect(() => {
        const fetchCustomerProfile = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('/api/customer/profile');
                const data = await response.json();

                form.reset({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phone: data.phone || '',
                    address: data.address || ''
                });
            } catch (error) {
                alert('Failed to fetch profile');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCustomerProfile();
    }, [form]);

    const onSubmit = async (formData) => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/customer/profile', {
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
            alert('Could not update profile');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={styles.profileForm}
        >
            <div className={styles.nameGroup}>
                <div className={styles.formGroup}>
                    <label htmlFor="firstName" className={styles.label}>First Name</label>
                    <input
                        id="firstName"
                        {...form.register('firstName')}
                        className={styles.input}
                        disabled={isLoading}
                    />
                    {form.formState.errors.firstName && (
                        <span className={styles.error}>
                            {form.formState.errors.firstName.message}
                        </span>
                    )}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="lastName" className={styles.label}>Last Name</label>
                    <input
                        id="lastName"
                        {...form.register('lastName')}
                        className={styles.input}
                        disabled={isLoading}
                    />
                    {form.formState.errors.lastName && (
                        <span className={styles.error}>
                            {form.formState.errors.lastName.message}
                        </span>
                    )}
                </div>
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
                <label htmlFor="phone" className={styles.label}>Phone</label>
                <input
                    id="phone"
                    type="tel"
                    {...form.register('phone')}
                    className={styles.input}
                    disabled={isLoading}
                />
                {form.formState.errors.phone && (
                    <span className={styles.error}>
                        {form.formState.errors.phone.message}
                    </span>
                )}
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="address" className={styles.label}>Address</label>
                <input
                    id="address"
                    type="tel"
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
    // };
}
export default ProfileForm;