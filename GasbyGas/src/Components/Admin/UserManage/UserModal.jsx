import React, { useState, useEffect } from 'react';
import styles from './UserManagement.module.css';

const UserModal = ({ isOpen, onClose, onSubmit, user }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('Please fill in name and email');
      return;
    }

    const submitData = user ? { ...formData, id: user.id } : formData;
    onSubmit(submitData);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.formInput}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.formInput}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={styles.formInput}
            />
          </div>
          <div>
            <button type="submit" className={styles.submitButton}>
              {user ? 'Update User' : 'Add User'}
            </button>
            <button 
              type="button" 
              onClick={onClose} 
              className={styles.closeButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;