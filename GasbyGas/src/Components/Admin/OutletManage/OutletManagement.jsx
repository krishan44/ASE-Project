import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './OutletManagement.module.css';

const OutletModal = ({ isOpen, onClose, onSubmit, outlet }) => {
  const [formData, setFormData] = useState({
    name: outlet?.name || '',
    address: outlet?.address || '',
    email: outlet?.email || '',
    contactNumber: outlet?.contactNumber || '',
    username: outlet?.username || '',
    password: outlet?.password || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return isOpen ? (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>{outlet ? 'Edit Outlet' : 'Add New Outlet'}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Outlet Name:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Username:</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Password:</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Address:</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Email:</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Contact Number:</label>
            <input
              type="tel"
              value={formData.contactNumber}
              onChange={(e) => setFormData({...formData, contactNumber: e.target.value})}
              required
            />
          </div>
          <div className={styles.modalButtons}>
            <button type="submit" className={styles.submitButton}>
              {outlet ? 'Update' : 'Add'}
            </button>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

const OutletManagement = () => {
  const [outlets, setOutlets] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    fetchOutlets();
  }, []);

  const fetchOutlets = async () => {
    try {
      const response = await axios.get('http://localhost:5001/outlets');
      setOutlets(response.data);
    } catch (error) {
      console.error('Fetch outlets error:', error);
      alert('Failed to fetch outlets');
    }
  };

  const handleAddOutlet = async (outletData) => {
    try {
      const response = await axios.post('http://localhost:5001/outlets', outletData);
      setOutlets(prev => [...prev, response.data]);
      alert('Outlet added successfully');
    } catch (error) {
      console.error('Add outlet error:', error);
      alert('Failed to add outlet');
    }
  };

  const handleDeleteOutlet = async (outletId) => {
    if (window.confirm('Are you sure you want to delete this outlet?')) {
      try {
        await axios.delete(`http://localhost:5001/outlets/${outletId}`);
        setOutlets(prev => prev.filter(outlet => outlet.id !== outletId));
        alert('Outlet deleted successfully');
      } catch (error) {
        console.error('Delete outlet error:', error);
        alert('Failed to delete outlet');
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button 
          onClick={() => setIsAddModalOpen(true)} 
          className={styles.addButton}
        >
          + Add New Outlet
        </button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Outlet ID</th>
            <th>Outlet Name</th>
            <th>Address</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {outlets.map(outlet => (
            <tr key={outlet.id}>
              <td>{outlet.id}</td>
              <td>{outlet.name}</td>
              <td>{outlet.address}</td>
              <td>{outlet.email}</td>
              <td>{outlet.contactNumber}</td>
              <td>
                <button 
                  onClick={() => handleDeleteOutlet(outlet.id)} 
                  className={styles.deleteButton}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <OutletModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddOutlet}
        outlet={null}
      />
    </div>
  );
};

export default OutletManagement;