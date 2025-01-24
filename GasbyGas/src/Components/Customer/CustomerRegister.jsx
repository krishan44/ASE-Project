import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './CustomerRegister.module.css';
import { useNavigate } from 'react-router-dom';

// Zod validation schema
const registrationSchema = z.object({
  customerType: z.enum(['individual', 'business']),
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  nic: z.string()
    .regex(/^[0-9]{13}$/, { message: "NIC must be 13 digits" }),
  email: z.string().email({ message: "Invalid email address" }),
  businessRegNumber: z.string()
    .optional()
    .refine((val) => val === undefined || val.length > 0, { 
      message: "Business registration number is required for business customers" 
    })
});

const CustomerRegister = () => {
  const navigate = useNavigate();
  const [showBusinessFields, setShowBusinessFields] = useState(false);

  const { 
    register, 
    handleSubmit, 
    watch, 
    formState: { errors } 
  } = useForm({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      customerType: 'individual',
      firstName: '',
      lastName: '',
      nic: '',
      email: '',
      businessRegNumber: ''
    }
  });

  // Watch customer type to conditionally show business fields
  const customerType = watch('customerType');

  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/customer/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert('Registration Successful');
        navigate('/login');
      } else {
        alert('Registration Failed');
      }
    } catch (error) {
      alert('Network Error');
    }
  };

  return (
    <div className={styles.registrationContainer}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.registrationForm}>
        <h2 className={styles.formTitle}>Customer Registration</h2>

        <div className={styles.customerTypeSection}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              value="individual"
              {...register('customerType')}
              onChange={() => setShowBusinessFields(false)}
              checked={customerType === 'individual'}
            />
            Individual
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              value="business"
              {...register('customerType')}
              onChange={() => setShowBusinessFields(true)}
              checked={customerType === 'business'}
            />
            Business
          </label>
        </div>

        <div className={styles.nameGroup}>
          <div className={styles.formGroup}>
            <label htmlFor="firstName" className={styles.label}>First Name</label>
            <input
              id="firstName"
              {...register('firstName')}
              className={styles.input}
            />
            {errors.firstName && (
              <span className={styles.error}>{errors.firstName.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="lastName" className={styles.label}>Last Name</label>
            <input
              id="lastName"
              {...register('lastName')}
              className={styles.input}
            />
            {errors.lastName && (
              <span className={styles.error}>{errors.lastName.message}</span>
            )}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="nic" className={styles.label}>NIC Number</label>
          <input
            id="nic"
            {...register('nic')}
            className={styles.input}
            placeholder="13-digit NIC number"
          />
          {errors.nic && (
            <span className={styles.error}>{errors.nic.message}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className={styles.input}
          />
          {errors.email && (
            <span className={styles.error}>{errors.email.message}</span>
          )}
        </div>

        {showBusinessFields && (
          <div className={styles.formGroup}>
            <label htmlFor="businessRegNumber" className={styles.label}>Business Registration Number</label>
            <input
              id="businessRegNumber"
              {...register('businessRegNumber')}
              className={styles.input}
            />
            {errors.businessRegNumber && (
              <span className={styles.error}>{errors.businessRegNumber.message}</span>
            )}
          </div>
        )}

        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.submitButton}>
            Register
          </button>
          <button 
            type="button" 
            className={styles.loginButton}
            onClick={() => navigate('/login')}
          >
            Go to Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerRegister;