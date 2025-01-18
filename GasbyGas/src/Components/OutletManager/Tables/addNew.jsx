import React, { useState } from 'react';
import { Box, Typography, Stack, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function AddNew() {
  // State for Order and Tank Status quantities
  const [orderQuantities, setOrderQuantities] = useState({
    small: '', // For 2.5Kg
    medium: '', // For 5Kg
    large: '', // For 12.5Kg
  });

  const [tankQuantities, setTankQuantities] = useState({
    small: '',
    medium: '',
    large: '',
  });

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
        height: '600px',
        boxShadow:
          'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
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
        <Box sx={{ marginTop: '20px' }}>
          <Typography sx={{ fontSize: '14px', fontWeight: '400', fontFamily: 'Poppins' }}>
            Token ID : 121
          </Typography>
        </Box>

        <Box>
          <Typography sx={{ fontSize: '14px', fontWeight: '400', fontFamily: 'Poppins', marginTop: '5px' }}>
            Customer Name
          </Typography>
          <TextField
            id="outlined-basic"
            variant="outlined"
            placeholder="Enter customer name"
            sx={{
              '& .MuiInputBase-root': {
                height: '40px',
                width: '280px',
                fontFamily: 'Poppins',
                fontSize: '12px',
                marginTop: '5px',
              },
            }}
          />
        </Box>

        <Box>
          <Typography sx={{ fontSize: '14px', fontWeight: '400', fontFamily: 'Poppins', marginTop: '5px' }}>
            Order
          </Typography>
          <Box sx={{ display: 'flex', gap: '5px' }}>
            {['small', 'medium', 'large'].map((key, index) => (
              <Box
                key={index}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                <RemoveIcon
                  onClick={() => handleDecrement(setOrderQuantities, key)}
                  sx={{ cursor: 'pointer' }}
                />
                <TextField
                  variant="outlined"
                  placeholder={
                    key === 'small'
                      ? '2.5Kg'
                      : key === 'medium'
                      ? '5Kg'
                      : '12.5Kg'
                  }
                  value={orderQuantities[key]}
                  sx={{
                    '& .MuiInputBase-root': {
                      height: '40px',
                      width: '60px',
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
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            sx={{
              marginTop: '5px',
              height: '40px',
              width: '280px',
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

        <Box>
          <Typography sx={{ fontSize: '14px', fontWeight: '400', fontFamily: 'Poppins', marginTop: '25px' }}>
            Tank Status
          </Typography>
          <Box sx={{ display: 'flex', gap: '5px' }}>
            {['small', 'medium', 'large'].map((key, index) => (
              <Box
                key={index}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                <RemoveIcon
                  onClick={() => handleDecrement(setTankQuantities, key)}
                  sx={{ cursor: 'pointer' }}
                />
                <TextField
                  variant="outlined"
                  placeholder={
                    key === 'small'
                      ? '2.5Kg'
                      : key === 'medium'
                      ? '5Kg'
                      : '12.5Kg'
                  }
                  value={tankQuantities[key]}
                  sx={{
                    '& .MuiInputBase-root': {
                      height: '40px',
                      width: '60px',
                      fontFamily: 'Poppins',
                      fontSize: '12px',
                      marginTop: '5px',
                      textAlign: 'center',
                    },
                  }}
                  inputProps={{ readOnly: true }}
                />
                <AddIcon
                  onClick={() => handleIncrement(setTankQuantities, key)}
                  sx={{ cursor: 'pointer' }}
                />
              </Box>
            ))}
          </Box>
        </Box>

        <Box>
          <Typography sx={{ fontSize: '14px', fontWeight: '400', fontFamily: 'Poppins', marginTop: '5px' }}>
            Contact Number
          </Typography>
          <TextField
            variant="outlined"
            placeholder="Enter contact number"
            sx={{
              '& .MuiInputBase-root': {
                height: '40px',
                width: '280px',
                fontFamily: 'Poppins',
                fontSize: '12px',
                marginTop: '5px',
              },
            }}
          />
        </Box>

        <Box>
          <Typography sx={{ fontSize: '14px', fontWeight: '400', fontFamily: 'Poppins', marginTop: '5px' }}>
            Email
          </Typography>
          <TextField
            variant="outlined"
            placeholder="Enter email"
            sx={{
              '& .MuiInputBase-root': {
                height: '40px',
                width: '280px',
                fontFamily: 'Poppins',
                fontSize: '12px',
                marginTop: '5px',
              },
            }}
          />
        </Box>
      </Stack>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
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
            marginTop: '10px',
            borderRadius: '3px',
            backgroundColor: '#D84040',
            '&:hover': {
              color: '#D84040',
              backgroundColor: 'transparent',
              border: '1px solid #D84040',
            },
          }}
        >
          Cancel
        </Typography>

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
            marginTop: '10px',
            borderRadius: '5px',
            backgroundColor: '#344CB7',
            '&:hover': {
              color: '#344CB7',
              backgroundColor: 'transparent',
              border: '1px solid #344CB7',
            },
          }}
        >
          Save
        </Typography>
      </Box>
    </Box>
  );
}

export default AddNew;
