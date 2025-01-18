import React, { useState } from 'react';
import { Box, Typography, Stack, TextField,Button } from '@mui/material';

function Delete(){








    return(
        <Stack sx={{padding:'10px 12px'}}>
            <Typography sx={{
                color:'#FB4141',
                fontSize:'18px',
                fontFamily:'poppins',
                fontWeight:'500'
            }}>
                Delete an Order
            </Typography>
            <Box sx={{display:'flex', alignItems:'center', gap:'10px'}}>
                <Typography
                 sx={
                    {
                         fontFamily:'poppins'
                    }
                 }>
                    Order Id
                </Typography>
                <TextField sx={{
              '& .MuiInputBase-root': {
                height: '30px',
                width: '100px',
                fontFamily: 'Poppins',
                fontSize: '12px',
                marginTop: '5px',
                borderRadius:'2px'
              },
            }}
                >
                </TextField>
                <Button variant="outlined" 
                sx={{
                    fontFamily:'poppins'
                }}
                > 
                    Search</Button>

            </Box>

            {/* Customer Name and Ordered Date */}

            <Box sx={{marginTop:'10px'}}>
            <Box sx={{display:'flex', alignItems:'center', gap:'10px'}}>
            <Typography sx={{
                 fontFamily:'poppins',
                 width:'140px'
            }}>
                    Customer Name
            </Typography>
            <TextField sx={{
              '& .MuiInputBase-root': {
                height: '30px',
                width: '200px',
                fontFamily: 'Poppins',
                fontSize: '12px',
                marginTop: '5px',
                borderRadius:'5px'
              },
            }}
            disabled
                >
                </TextField>
                <Typography sx={{
                 fontFamily:'poppins',
                    width:'140px'
            }}>
                    Ordered Date
            </Typography>
            <TextField 
            type='date'
            sx={{
              '& .MuiInputBase-root': {
                height: '30px',
                width: '200px',
                fontFamily: 'Poppins',
                fontSize: '12px',
                marginTop: '5px',
                borderRadius:'5px'
              },
            }}
            disabled
                >
                </TextField>
                </Box>
                
            </Box>

            {/* Order and Amount */}
            <Box sx={{marginTop:'10px'}}>
            <Box sx={{display:'flex', alignItems:'center', gap:'10px'}}>
            <Typography sx={{
                   width:'140px',
                 fontFamily:'poppins'
            }}>
                    Order
            </Typography>
            <TextField sx={{
              '& .MuiInputBase-root': {
                height: '30px',
                width: '200px',
                fontFamily: 'Poppins',
                fontSize: '12px',
                marginTop: '5px',
                borderRadius:'5px'
              },
            }}
            disabled
                >
                </TextField>
                <Typography sx={{
                 fontFamily:'poppins',
                    width:'140px',
            }}>
                    Amount 
            </Typography>
            <TextField 
            
            sx={{
              '& .MuiInputBase-root': {
                height: '30px',
                width: '200px',
                fontFamily: 'Poppins',
                fontSize: '12px',
                marginTop: '5px',
                borderRadius:'5px'
              },
            }}
            disabled
                >
                </TextField>
                </Box>
                
            </Box>

        </Stack>
    )
}

export default Delete
