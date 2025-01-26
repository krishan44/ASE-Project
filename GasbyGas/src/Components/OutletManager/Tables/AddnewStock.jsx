import React, { useState } from 'react';
import { Box, Typography, Stack, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function AddNewStock() {
  // Retrieve branch name from localStorage
  const branchName = localStorage.getItem('branch');
  console.log('Branch Name:', branchName);

  // State for Order and Tank Status quantities
  const [orderQuantities, setOrderQuantities] = useState({
    small: '', // For 2.5Kg
    medium: '', // For 5Kg
    large: '', // For 12.5Kg
    extraLarge: '', // For 37.5Kg
  });

  // State for order date
  const [orderDate, setOrderDate] = useState('');

  const handleSave = async () => {
    try {
      // Validate the order date
      if (!orderDate) {
        alert('Please select an order date.');
        return;
      }

      // Prepare the order data
      const orderData = {
        outname: branchName, // Use the branch name from localStorage
        twoandhalfkg: orderQuantities.small || 0, // 2.5Kg
        fivekg: orderQuantities.medium || 0, // 5Kg
        twelevekg: orderQuantities.large || 0, // 12.5Kg
        thirtysevenkg: orderQuantities.extraLarge || 0, // 37.5Kg
        total: calculateTotal(orderQuantities), // Calculate the total
        status: 'Pending', // Default status
        orderedon: orderDate, // Use the selected order date
      };

      // Send the order data to the backend
      const response = await fetch('http://localhost:5001/outlet-orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to save order');
      }

      // Reset the form after successful save
      setOrderQuantities({ small: '', medium: '', large: '', extraLarge: '' });
      setOrderDate(''); // Reset the order date
      alert('Order saved successfully!');
    } catch (error) {
      console.error('Error saving order:', error);
      alert('Failed to save order. Please try again later.');
    }
  };

  // Helper function to calculate the total
  const calculateTotal = (quantities) => {
    const prices = {
      small: 500, // Price for 2.5Kg
      medium: 1000, // Price for 5Kg
      large: 2000, // Price for 12.5Kg
      extraLarge: 5000, // Price for 37.5Kg
    };
    return Object.keys(quantities).reduce((total, key) => {
      return total + (quantities[key] || 0) * prices[key];
    }, 0);
  };

  // Increment/Decrement handlers
  const handleIncrement = (stateUpdater, key) => {
    stateUpdater((prev) => ({
      ...prev,
      [key]: prev[key] ? parseInt(prev[key]) + 1 : 1,
    }));
  };

  const handleDecrement = (stateUpdater, key) => {
    stateUpdater((prev) => ({
      ...prev,
      [key]: prev[key] > 0 ? parseInt(prev[key]) - 1 : '',
    }));
  };

  return (
    <Box
      sx={{
        width: '400px',
        height: '650px', // Increased height to accommodate new option
        padding: '14px 14px',
        borderRadius: '10px',
      }}
    >
      <Typography
        sx={{
          color: '#155E95',
          fontFamily: 'Poppins',
          fontSize: '18px',
          fontWeight: '500',
        }}
      >
        Add New Order
      </Typography>
      <Stack>
        <Box>
          <Typography sx={{ fontSize: '14px', fontWeight: '400', fontFamily: 'Poppins', marginTop: '5px' }}>
            Order
          </Typography>
          <Box sx={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
            {[
              { key: 'small', label: '2.5Kg' },
              { key: 'medium', label: '5Kg' },
              { key: 'large', label: '12.5Kg' },
              { key: 'extraLarge', label: '37.5Kg' }
            ].map(({ key, label }, index) => (
              <Box
                key={index}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '5px 0' }}
              >
                <RemoveIcon
                  onClick={() => handleDecrement(setOrderQuantities, key)}
                  sx={{ cursor: 'pointer' }}
                />
                <TextField
                  variant="outlined"
                  placeholder={label}
                  value={orderQuantities[key]}
                  sx={{
                    '& .MuiInputBase-root': {
                      height: '40px',
                      width: '70px',
                      fontFamily: 'Poppins',
                      fontSize: '12px',
                      marginTop: '5px',
                      textAlign: 'center',
                    },
                  }}
                  inputProps={{ readOnly: true }}
                />
                <AddIcon
                  onClick={() => handleIncrement(setOrderQuantities, key)}
                  sx={{ cursor: 'pointer' }}
                />
              </Box>
            ))}
          </Box>
        </Box>

        <Box>
          <Typography sx={{ fontSize: '14px', fontWeight: '400', fontFamily: 'Poppins', marginTop: '10px' }}>
            Order Date
          </Typography>
          <TextField
            type="date"
            value={orderDate} // Bind the value to the state
            onChange={(e) => setOrderDate(e.target.value)} // Update the state on change
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            sx={{
              marginTop: '5px',
              height: '20px',
              width: '380px',
              '& .MuiInputBase-root': {
                borderRadius: '8px',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#1976d2',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1976d2',
                },
              },
            }}
          />
        </Box>
      </Stack>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <Typography
          sx={{
            width: '100px',
            height: '40px',
            color: '#FFF',
            cursor: 'pointer',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '70px',
            borderRadius: '5px',
            backgroundColor: '#344CB7',
            '&:hover': {
              color: '#344CB7',
              backgroundColor: 'transparent',
              border: '1px solid #344CB7',
            },
          }}
          onClick={handleSave} 
        >
          Save
        </Typography>
      </Box>
    </Box>
  );
}

export default AddNewStock;