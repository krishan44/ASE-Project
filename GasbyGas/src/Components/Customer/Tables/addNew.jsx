import React, { useState } from 'react';
import { Box, Typography, Stack, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function OrderAndTankForm() {
  const userRole = localStorage.getItem('userRole');
  const userId = localStorage.getItem('userid');

  const [orderQuantities, setOrderQuantities] = useState({
    small: '',
    medium: '',
    large: '',
    extraLarge: '',
  });

  const [tankQuantities, setTankQuantities] = useState({
    small: '',
    medium: '',
    large: '',
    extraLarge: '',
  });

  const [orderDate, setOrderDate] = useState('');

  const handleIncrement = (setState, key) => {
    setState((prev) => ({
      ...prev,
      [key]: prev[key] ? parseInt(prev[key]) + 1 : 1,
    }));
  };

  const handleDecrement = (setState, key) => {
    setState((prev) => ({
      ...prev,
      [key]: prev[key] > 0 ? parseInt(prev[key]) - 1 : '',
    }));
  };

  const handleSubmit = async () => {
    const prepareQuantities = (quantities) => {
      return {
        small: parseInt(quantities.small) || 0,
        medium: parseInt(quantities.medium) || 0,
        large: parseInt(quantities.large) || 0,
        extraLarge: parseInt(quantities.extraLarge) || 0,
      };
    };
  
    const orderData = {
      orderQuantities: prepareQuantities(orderQuantities),
      tankQuantities: prepareQuantities(tankQuantities),
      orderDate,
      userRole,
      userId: parseInt(userId),
      customerId: userRole === 'customer' ? parseInt(localStorage.getItem('customerId')) : null,
      businessId: userRole === 'business' ? parseInt(localStorage.getItem('businessId')) : null,
      name: localStorage.getItem('username'), // Include the customer/business name
    };
  
    console.log('Submitting order data:', orderData); // Debugging
  
    try {
      const response = await fetch('http://localhost:5001/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
  
      if (!response.ok) {
        const errorData = await response.json(); // Parse error response
        console.error('Error response:', errorData); // Debugging
        throw new Error(errorData.error || 'Failed to submit order');
      }
  
      const result = await response.json();
      alert('Order submitted successfully!');
      // Reset form
      setOrderQuantities({ small: '', medium: '', large: '', extraLarge: '' });
      setTankQuantities({ small: '', medium: '', large: '', extraLarge: '' });
      setOrderDate('');
    } catch (error) {
      console.error('Error submitting order:', error);
      alert(error.message || 'Failed to submit order. Please try again.');
    }
  };

  return (
    <Box 
      sx={{ 
        width: 'Auto', 
        padding: '20px', 
        backgroundColor: '#f5f5f5', 
        borderRadius: '12px', 
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
      }}
    >
      <Typography 
        variant="h6" 
        sx={{ 
          color: '#2c3e50', 
          marginBottom: '20px', 
          textAlign: 'center',
          fontWeight: 'bold'
        }}
      >
        Gas Cylinder Order
      </Typography>

      <Stack spacing={3}>
        {/* Order Quantities Section */}
        <Box>
          <Typography sx={{ marginBottom: '10px', fontWeight: 'bold' }}>Order Quantities</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {['small', 'medium', 'large'].map((key) => (
              <Box key={key} sx={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '8px', padding: '5px' }}>
                <RemoveIcon onClick={() => handleDecrement(setOrderQuantities, key)} sx={{ cursor: 'pointer', color: '#e74c3c' }} />
                <TextField
                  variant="standard"
                  value={orderQuantities[key]}
                  placeholder={
                    key === 'small' ? '2.5Kg' : 
                    key === 'medium' ? '5Kg' : 
                    '12.5Kg'
                  }
                  sx={{ width: '50px', textAlign: 'center', '& input': { textAlign: 'center' } }}
                  inputProps={{ readOnly: true }}
                />
                <AddIcon onClick={() => handleIncrement(setOrderQuantities, key)} sx={{ cursor: 'pointer', color: '#2ecc71' }} />
              </Box>
            ))}
            {userRole === 'business' && (
              <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '8px', padding: '5px' }}>
                <RemoveIcon onClick={() => handleDecrement(setOrderQuantities, 'extraLarge')} sx={{ cursor: 'pointer', color: '#e74c3c' }} />
                <TextField
                  variant="standard"
                  value={orderQuantities.extraLarge}
                  placeholder="37.5Kg"
                  sx={{ width: '50px', textAlign: 'center', '& input': { textAlign: 'center' } }}
                  inputProps={{ readOnly: true }}
                />
                <AddIcon onClick={() => handleIncrement(setOrderQuantities, 'extraLarge')} sx={{ cursor: 'pointer', color: '#2ecc71' }} />
              </Box>
            )}
          </Box>
        </Box>

        {/* Order Date Input */}
        <TextField
          type="date"
          label="Order Date"
          variant="outlined"
          fullWidth
          value={orderDate}
          onChange={(e) => setOrderDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ '& .MuiInputBase-root': { borderRadius: '8px' } }}
        />

        {/* Tank Status Quantities Section */}
        <Box>
          <Typography sx={{ marginBottom: '10px', fontWeight: 'bold' }}>Tank Status Quantities</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {['small', 'medium', 'large'].map((key) => (
              <Box key={key} sx={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '8px', padding: '5px' }}>
                <RemoveIcon onClick={() => handleDecrement(setTankQuantities, key)} sx={{ cursor: 'pointer', color: '#e74c3c' }} />
                <TextField
                  variant="standard"
                  value={tankQuantities[key]}
                  placeholder={
                    key === 'small' ? '2.5Kg' : 
                    key === 'medium' ? '5Kg' : 
                    '12.5Kg'
                  }
                  sx={{ width: '50px', textAlign: 'center', '& input': { textAlign: 'center' } }}
                  inputProps={{ readOnly: true }}
                />
                <AddIcon onClick={() => handleIncrement(setTankQuantities, key)} sx={{ cursor: 'pointer', color: '#2ecc71' }} />
              </Box>
            ))}
            {userRole === 'business' && (
              <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '8px', padding: '5px' }}>
                <RemoveIcon onClick={() => handleDecrement(setTankQuantities, 'extraLarge')} sx={{ cursor: 'pointer', color: '#e74c3c' }} />
                <TextField
                  variant="standard"
                  value={tankQuantities.extraLarge}
                  placeholder="37.5Kg"
                  sx={{ width: '50px', textAlign: 'center', '& input': { textAlign: 'center' } }}
                  inputProps={{ readOnly: true }}
                />
                <AddIcon onClick={() => handleIncrement(setTankQuantities, 'extraLarge')} sx={{ cursor: 'pointer', color: '#2ecc71' }} />
              </Box>
            )}
          </Box>
        </Box>

        {/* Submit Button */}
        <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
          <Typography
            onClick={handleSubmit}
            sx={{
              display: 'inline-block',
              padding: '10px 20px',
              backgroundColor: '#3498db',
              color: 'white',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
              '&:hover': {
                backgroundColor: '#2980b9'
              }
            }}
          >
            Submit Order
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

export default OrderAndTankForm;