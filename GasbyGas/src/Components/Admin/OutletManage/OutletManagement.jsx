import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './OutletManagement.module.css';
import OutletModal from './OutletModal';

const OutletManagement = () => {
  const [outlets, setOutlets] = useState([]);
  const [selectedOutlet, setSelectedOutlet] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetchOutlets();
  }, []);

  const fetchOutlets = async () => {
    try {
      const response = await axios.get('/api/outlets');
      
      // Handle different possible response formats
      const outletData = Array.isArray(response.data) 
        ? response.data 
        : response.data.outlets || response.data.data || [];
      
      setOutlets(outletData);
    } catch (error) {
      console.error('Fetch outlets error:', error);
      alert('Failed to fetch outlets');
    }
  };

  const handleView = (outlet) => {
    setSelectedOutlet(outlet);
    setIsEditModalOpen(true);
  };

  const handleAddOutlet = async (outletData) => {
    try {
      const response = await axios.post('/api/outlets', outletData);
      setOutlets(prev => [...prev, response.data]);
      setIsAddModalOpen(false);
      alert('Outlet added successfully');
    } catch (error) {
      console.error('Add outlet error:', error);
      alert('Failed to add outlet');
    }
  };

  const handleUpdateOutlet = async (updatedOutlet) => {
    try {
      const response = await axios.put(`/api/outlets/${updatedOutlet.id}`, updatedOutlet);
      setOutlets(prev => 
        prev.map(outlet => outlet.id === updatedOutlet.id ? response.data : outlet)
      );
      setIsEditModalOpen(false);
      alert('Outlet updated successfully');
    } catch (error) {
      console.error('Update outlet error:', error);
      alert('Failed to update outlet');
    }
  };

  const handleDeleteOutlet = async (outletId) => {
    if (window.confirm('Are you sure you want to delete this outlet?')) {
      try {
        await axios.delete(`/api/outlets/${outletId}`);
        setOutlets(prev => prev.filter(outlet => outlet.id !== outletId));
        alert('Outlet deleted successfully');
      } catch (error) {
        console.error('Delete outlet error:', error);
        alert('Failed to delete outlet');
      }
    }
  };

  // Sample hardcoded data for testing
  const testOutlets = [
    {
      id: 1,
      name: 'Downtown Cafe',
      address: '123 Main St',
      outletManager: { name: 'John Doe' }
    },
    {
      id: 2,
      name: 'Riverside Branch',
      address: '456 River Rd',
      outletManager: { name: 'Jane Smith' }
    }
  ];

  // Use testOutlets if real data fails
  const displayOutlets = outlets.length > 0 ? outlets : testOutlets;

  return (
    <div className={styles.container}>
      <button 
        onClick={() => setIsAddModalOpen(true)} 
        className={`${styles.actionButton} ${styles.btn}`}
      >
       + Add New Outlet
      </button>

      <table className={styles.table}>
        <thead>
          <tr className={styles.tableHeader}>
            <th>Outlet Name</th>
            <th>Address</th>
            <th>Outlet Manager</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayOutlets.map(outlet => (
            <tr key={outlet.id} className={styles.tableRow}>
              <td>{outlet.name}</td>
              <td>{outlet.address}</td>
              <td>{outlet.outletManager?.name || 'No Manager'}</td>
              <td>
                <button 
                  onClick={() => handleView(outlet)} 
                  className={`${styles.viewButton} ${styles.btn}`}
                >
                  View
                </button>
                <button 
                  onClick={() => handleDeleteOutlet(outlet.id)} 
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
        <OutletModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddOutlet}
          outlet={null}
        />
      )}

      {isEditModalOpen && selectedOutlet && (
        <OutletModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleUpdateOutlet}
          outlet={selectedOutlet}
        />
      )}
    </div>
  );
};

export default OutletManagement;