import React, { useState } from 'react';
import { Box, Typography, Stack, TextField,Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function Delete(){








    return(
        <Stack sx={{padding:'10px 12px', width:'800px' }}>
            <Typography sx={{
                color:'#FB4141',
                fontSize:'18px',
                fontFamily:'poppins',
                fontWeight:'500'
            }}>
                Delete an Order
            </Typography>
            <Box sx={{display:'flex', alignItems:'center',justifyContent:'space-between', gap:'10px', marginTop:'20px'}}>
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
                borderRadius:'5px'
              },
            }}
                >
                </TextField>
                <Box sx={{
                  width:'40px',
                  height:'40px',
                  borderRadius:'50%',
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'center',
                  border:'1px solid #344CB7',
                  backgroundColor:'#344CB7',
                  cursor:'pointer'
                }}>
                <SearchIcon sx={{color:'#FFF'}}/>
                </Box>
              </Box>
               <Box>
                
               </Box>
                <Box sx={{
          display:'flex',
          justifyContent:'center'
        , marginRight:'70px'
        }}>
          <Typography sx={{width:'100px',
              height:'40px',
              backgroundColor:'#D84040',
              display:'flex',
              justifyContent:'center',
              alignItems:'center',
              borderRadius:'5px',
              color:'#FFF',
              '&: hover': {
                backgroundColor:'transparent',
                color:'#D84040',
                border:'1px solid #D84040',
                cursor:'pointer'
              }
              }}>
            Delete
          </Typography>
        </Box>
            </Box>

            {/* Customer Name and Ordered Date */}

            <Box sx={{marginTop:'10px'}}>
            <Box sx={{display:'flex', alignItems:'center', gap:'10px'}}>
            <Typography sx={{
                 fontFamily:'poppins',
                 width:'140px'
            }}>
                    Business Name
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

            {/* Email andContact Number*/}

            <Box sx={{marginTop:'10px'}}>
            <Box sx={{display:'flex', alignItems:'center', gap:'10px'}}>
            <Typography sx={{
                 fontFamily:'poppins',
                 width:'140px'
            }}>
                   Email
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
                    Contact Number
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
