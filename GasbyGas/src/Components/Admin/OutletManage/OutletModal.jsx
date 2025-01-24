import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './OutletManagement.module.css';

const OutletModal = ({ isOpen, onClose, onSubmit, outlet }) => {
  const [outletData, setOutletData] = useState({
    name: '',
    address: '',
    outletManagerId: null
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetchUsers();
    }
    
    if (outlet) {
      setOutletData({
        name: outlet.name || '',
        address: outlet.address || '',
        outletManagerId: outlet.outletManagerId || null
      });
    }
  }, [isOpen, outlet]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      const userData = Array.isArray(response.data) 
      ? response.data 
      : response.data.users || response.data.data || [];

      setUsers(userData);
    } catch (error) {
      alert('Failed to fetch users');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOutletData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!outletData.name || !outletData.address) {
      alert('Please fill in all required fields');
      return;
    }

    onSubmit(outletData);
  };

  if (!isOpen) return null;

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
  // Use SAMPLE_USERS if real data fails
  const displayUsers = users.length > 0 ? users : SAMPLE_USERS;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Outlet Name</label>
            <input
              type="text"
              name="name"
              value={outletData.name}
              onChange={handleChange}
              className={styles.formInput}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Address</label>
            <input
              type="text"
              name="address"
              value={outletData.address}
              onChange={handleChange}
              className={styles.formInput}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Outlet Manager</label>
            <select
              name="outletManagerId"
              value={outletData.outletManagerId || ''}
              onChange={handleChange}
              className={styles.formInput}
            >
              <option value="">Select Manager</option>
              {displayUsers.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <button type="submit" className={styles.submitButton}>
              {outlet ? 'Update Outlet' : 'Add Outlet'}
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

export default OutletModal;