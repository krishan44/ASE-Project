import React, { useState } from 'react';
import style from './customerTable.module.css';
import search from '../../../assets/table/search.svg';
import { Box, Typography, Stack, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


const StockTable = () => {

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
    <Box>
        <Typography sx={{color:'#000', fontSize:'18px', fontWeight:'500', fontFamily:'poppins'}}>
            Schedule Order
        </Typography>
        <Box>
            <Box sx={{display:'block', justifyContent:'center', alignItems:'center', gap:'10px'}}>
                <Typography 
                sx={{color:'#000'}}>
                    Order ID
                </Typography>
                <TextField disabled  sx={{width:'120px',}} 
                InputProps={{
                style: {
                    height: "40px", 
                    borderRadius:'5px'
                    },
                    }}>
                </TextField>
            </Box>
            <Box>
                <Typography>
                    Quantity
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
                  disabled='false'
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
                  inputProps={{ readOnly: false }}
                />
                <AddIcon
                  onClick={() => handleIncrement(setOrderQuantities, key)}
                  sx={{ cursor: 'pointer' }}
                />
              </Box>
            ))}
          </Box>
            </Box>
        </Box>
    </Box>
    );
};

export default StockTable;
