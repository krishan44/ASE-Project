import * as React from 'react';
import { Box,Typography,Stack,TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function addNew(){
    return(
        <Box sx={{
            width:'400px',
            boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
            padding:'14px 14px',    
            borderRadius:'10px'    
            }}>
            <Typography sx={{color:'#155E95', fontFamily:'Poppins', fontSize:'18px', fontWeight:'500', display:'block'}} >
                Add New Order
            </Typography>
            <Stack>
                <Box sx={{marginTop:'20px'}}>
                    <Typography sx={{fontSize:'14px', fontWeight:'400',fontFamily:'Poppins'}}>Token ID : </Typography>
                </Box>
                <Box>
                    <Typography sx={{fontSize:'14px', fontWeight:'400',fontFamily:'Poppins',marginTop:'5px'}}>Customer Name</Typography>
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        
                        sx={{
                            
                            "& .MuiInputBase-root": {
                            height: "40px", // Adjusts the container height
                            width: "280px",
                            fontFamily:'Poppins',
                            fontSize:'12px',
                            marginTop:'5px'
                            },
                        }}
                        />
                </Box>
                <Box>
                <Typography sx={{fontSize:'14px', fontWeight:'400',fontFamily:'Poppins',marginTop:'5px'}}>Order</Typography>
                  <Box sx={{display:'flex', gap:'5px'}}>
                        <Box sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                            <RemoveIcon/>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                placeholder='2.5Kg'
                                sx={{
                                    
                                    "& .MuiInputBase-root": {
                                    height: "40px", // Adjusts the container height
                                    width: "60px",
                                    fontFamily:'Poppins',
                                    fontSize:'12px',
                                    marginTop:'5px'
                                    },
                                }}
                            />
                            <AddIcon/>
                        </Box>
                        <Box sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                            <RemoveIcon/>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                placeholder=' 5 Kg'
                                sx={{
                                    
                                    "& .MuiInputBase-root": {
                                    height: "40px", // Adjusts the container height
                                    width: "60px",
                                    fontFamily:'Poppins',
                                    fontSize:'12px',
                                    marginTop:'5px'
                                    },
                                }}
                            />
                            <AddIcon/>
                        </Box>
                        <Box sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                            <RemoveIcon/>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                placeholder='12.5Kg'
                                sx={{
                                    
                                    "& .MuiInputBase-root": {
                                    height: "40px", // Adjusts the container height
                                    width: "65px",
                                    fontFamily:'Poppins',
                                    fontSize:'12px',
                                    marginTop:'5px'
                                    },
                                }}
                            />
                            <AddIcon/>
                        </Box>
                    </Box>  
                </Box>
                    
            
            </Stack>
        </Box>
    )

}

export default addNew