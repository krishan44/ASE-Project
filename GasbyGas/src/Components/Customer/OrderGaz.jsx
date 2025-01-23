import React, { useState } from 'react';
import styles from './OrderGaz.module.css';

const GasOrder = () => {
  const [gasOrders, setGasOrders] = useState([{ gasType: '', quantity: 0 }]);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    address: '',
    contactNumber: ''
  });

  const gasTypes = [
    { value: 'propane', label: 'Propane' },
    { value: 'butane', label: 'Butane' },
    { value: 'natural', label: 'Natural Gas' }
  ];

  const addGasOrder = () => {
    setGasOrders([...gasOrders, { gasType: '', quantity: 0 }]);
  };

  const removeGasOrder = (index) => {
    if (gasOrders.length > 1) {
      const newOrders = gasOrders.filter((_, i) => i !== index);
      setGasOrders(newOrders);
    }
  };

  const updateGasOrder = (index, field, value) => {
    const newOrders = [...gasOrders];
    newOrders[index][field] = value;
    setGasOrders(newOrders);
  };

  const isAddGasTypeDisabled = () => {
    return gasOrders.some(order => !order.gasType || order.quantity <= 0);
  };

  const submitOrder = () => {
    const isValid = gasOrders.every(order => order.gasType && order.quantity > 0);
    const hasCustomerDetails = customerDetails.name && 
      customerDetails.address && 
      customerDetails.contactNumber;

    if (!isValid || !hasCustomerDetails) {
      alert('Please fill all required fields');
      return;
    }

    console.log('Order submitted:', { gasOrders, customerDetails });
    alert('Order submitted successfully!');
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Gas Order</h2>
        
        {gasOrders.map((order, index) => (
          <div key={index} className={styles.orderSection}>
            <div className={styles.orderHeader}>
              <label>Gas Type {index + 1}</label>
              {gasOrders.length > 1 && (
                <button 
                  className={styles.removeButton}
                  onClick={() => removeGasOrder(index)}
                >
                  ✖
                </button>
              )}
            </div>
            
            <select
              value={order.gasType}
              onChange={(e) => updateGasOrder(index, 'gasType', e.target.value)}
              className={styles.select}
            >
              <option value="">Select Gas Type</option>
              {gasTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            
            <input
              type="number"
              placeholder="Quantity (Liters)"
              value={order.quantity}
              onChange={(e) => updateGasOrder(index, 'quantity', Number(e.target.value))}
              className={styles.input}
            />
          </div>
        ))}

        <button 
          onClick={addGasOrder}
          className={styles.addButton}
          disabled={isAddGasTypeDisabled()}
        >
          + Add Another Gas Type
        </button>

        <div className={styles.customerSection}>
          <input
            type="text"
            placeholder="Full Name"
            onChange={(e) => setCustomerDetails(prev => ({
              ...prev, 
              name: e.target.value
            }))}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Delivery Address"
            onChange={(e) => setCustomerDetails(prev => ({
              ...prev, 
              address: e.target.value
            }))}
            className={styles.input}
          />
          <input
            type="tel"
            placeholder="Contact Number"
            onChange={(e) => setCustomerDetails(prev => ({
              ...prev, 
              contactNumber: e.target.value
            }))}
            className={styles.input}
          />

          <button 
            onClick={submitOrder}
            className={styles.submitButton}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default GasOrder;