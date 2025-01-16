import * as React from 'react';
import { Box,Typography,Stack,TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function addNew(){
    return(
        <Box sx={{
            width:'400px',
            height:'600px',
            boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
            padding:'14px 14px',    
            borderRadius:'10px'    
            }}>
            <Typography sx={{color:'#155E95', fontFamily:'Poppins', fontSize:'18px', fontWeight:'500', display:'block'}} >
                Add New Order
            </Typography>
            <Stack>
                <Box sx={{marginTop:'20px'}}>
                    <Typography sx={{fontSize:'14px', fontWeight:'400',fontFamily:'Poppins'}}>Token ID : 121</Typography>
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
                                    marginTop:'5px',
                                    textAlign:'center'
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
                                    marginTop:'5px',
                                    textAlign:'center'
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
                                    marginTop:'5px',
                                    textAlign:'center'
                                    },
                                }}
                            />
                            <AddIcon/>
                        </Box>
                    </Box>  
                </Box>
                <Box>
                <Typography sx={{fontSize:'14px', fontWeight:'400',fontFamily:'Poppins',marginTop:'10px'}}>Order Date</Typography>
                    <Box>
                       <TextField 
                       type="date"
                       InputLabelProps={{
                        shrink: true, // Ensures the label does not overlap the input
                      }}
                      fullWidth
                    sx={{
                    maxWidth: '300',
                    marginTop:'5px',
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
                    height: "40px", 
                            width: "280px",
                    }}
                    />
                    </Box>
                </Box>
                <Box>
                <Typography sx={{fontSize:'14px', fontWeight:'400',fontFamily:'Poppins',marginTop:'25px'}}>Tank Status</Typography>
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
                                    marginTop:'5px',
                                    textAlign:'center'
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
                                    marginTop:'5px',
                                    textAlign:'center'
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
                                    marginTop:'5px',
                                    textAlign:'center'
                                    },
                                }}
                            />
                            <AddIcon/>
                        </Box>
                    </Box> 
                </Box>    
                <Box>
                    <Typography sx={{fontSize:'14px', fontWeight:'400',fontFamily:'Poppins',marginTop:'5px'}}>Contact Number</Typography>
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
                    <Typography sx={{fontSize:'14px', fontWeight:'400',fontFamily:'Poppins',marginTop:'5px'}}>Email </Typography>
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
            
            </Stack>
            <Box sx={{display:'flex', justifyContent:'space-between', gap:'10px'}}>
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
                    borderRadius:'5px',
                    backgroundColor:'#D84040',
                    '&:hover': {
                    color: '#D84040',
                    backgroundColor:'transparent', // Change color on hover
                    border:'1px solid #D84040'
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
                    borderRadius:'5px',
                    backgroundColor:'#344CB7',
                    '&:hover': {
                    color: '#344CB7',
                    backgroundColor:'transparent', // Change color on hover
                    border:'1px solid #344CB7'
                    },
                }}
                >
                Save
                </Typography>
            </Box>
        </Box>
    )

}

export default addNew