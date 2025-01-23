import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4070f4'
    }
  }
});

const sriLankanDistricts = [
  "Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo", "Galle", "Gampaha", 
  "Hambantota", "Jaffna", "Kalutara", "Kandy", "Kegalle", "Kilinochchi", "Kurunegala", 
  "Mannar", "Matale", "Matara", "Moneragala", "Mullaitivu", "Nuwara Eliya", "Polonnaruwa", 
  "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"
];

const Registration = ({ closeForm }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    full_name: "",
    date_of_birth: "",
    email: "",
    mobile_number: "",
    gender: "",
    address: "",
    education_level: "",
    major: "",
    learning_speed: "",
    profession: "",
    job_knowledge: "",
    country: "",
    specification: "",
    outlet: "",
    username: "",
    password: "",
    confirmPassword: "",
    type: "customer", // Default to customer
    business_registration_number: "" // Only for business type
  });
  const [errors, setErrors] = useState({});
  const [openPopup, setOpenPopup] = useState(true); // Controls the popup visibility
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validatePopup = () => {
    const { outlet, username, password, confirmPassword, type, business_registration_number } = formData;
    const newErrors = {};
    if (!outlet) newErrors.outlet = "Outlet is required.";
    if (!username) newErrors.username = "Username is required.";
    if (!password) newErrors.password = "Password is required.";
    if (!confirmPassword) newErrors.confirmPassword = "Confirm Password is required.";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
    if (type === "business" && !business_registration_number) {
      newErrors.business_registration_number = "Business Registration Number is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePopupSubmit = () => {
    if (validatePopup()) {
      setOpenPopup(false); // Close the popup if validation passes
    }
  };

  const validateStep1 = () => {
    const { full_name, date_of_birth, email, mobile_number, gender, address } = formData;
    const newErrors = {};
    if (!full_name) newErrors.full_name = "Full Name is required.";
    if (!date_of_birth) newErrors.date_of_birth = "Date of Birth is required.";
    if (!email) newErrors.email = "Email Address is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Please enter a valid email address.";
    if (!mobile_number) newErrors.mobile_number = "Mobile Number is required.";
    if (!gender) newErrors.gender = "Gender is required.";
    if (!address) newErrors.address = "Physical Address is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep1()) return;

    // Prepare the data to send to the backend
    const registrationData = {
      username: formData.username,
      password: formData.password,
      full_name: formData.full_name,
      email: formData.email,
      mobile_number: formData.mobile_number,
      address: formData.address,
      outlet: formData.outlet,
      date_of_birth: formData.date_of_birth,
      gender: formData.gender,
      type: formData.type,
      business_registration_number: formData.business_registration_number
    };

    try {
      const response = await fetch('http://localhost:5001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Registration successful!');
        console.log('User ID:', result.UserId);
        closeForm(); // Close the form

        // Pass phoneNumber and email as state when navigating to /Verify
        navigate('/Verify', {
          state: {
            phoneNumber: formData.mobile_number,
            email: formData.email
          }
        });
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      navigate('/Verify', {
        state: {
          phoneNumber: formData.mobile_number,
          email: formData.email
        }
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          maxWidth: '900px',
          m: 2,
          zIndex: 1000
        }}
      >
        <Paper elevation={24} sx={{ position: 'relative', p: 4 }}>
          <IconButton
            onClick={closeForm}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h4" component="h1" sx={{ 
            mb: 3, 
            fontWeight: 700,
            pb: 1,
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              left: 0,
              bottom: 0,
              height: '3px',
              width: '150px',
              background: 'linear-gradient(to right, #4070f4, #86a7ff)'
            }
          }}>
            Registration
          </Typography>

          {/* Popup for Username, Password, Outlet, and Type */}
          <Dialog open={openPopup} onClose={() => setOpenPopup(false)}>
            <DialogTitle>Enter Your Details</DialogTitle>
            <DialogContent>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12}>
                  <FormControl fullWidth error={!!errors.outlet}>
                    <InputLabel>Outlet</InputLabel>
                    <Select
                      name="outlet"
                      value={formData.outlet}
                      onChange={handleChange}
                      label="Outlet"
                    >
                      {sriLankanDistricts.map((district) => (
                        <MenuItem key={district} value={district}>
                          {district}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.outlet && <Typography color="error">{errors.outlet}</Typography>}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    error={!!errors.username}
                    helperText={errors.username}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={!!errors.password}
                    helperText={errors.password}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth error={!!errors.type}>
                    <InputLabel>Type</InputLabel>
                    <Select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      label="Type"
                    >
                      <MenuItem value="customer">Customer</MenuItem>
                      <MenuItem value="business">Business</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {formData.type === "business" && (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Business Registration Number"
                      name="business_registration_number"
                      value={formData.business_registration_number}
                      onChange={handleChange}
                      error={!!errors.business_registration_number}
                      helperText={errors.business_registration_number}
                    />
                  </Grid>
                )}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenPopup(false)}>Cancel</Button>
              <Button onClick={handlePopupSubmit} variant="contained">Submit</Button>
            </DialogActions>
          </Dialog>

          {/* Main Form */}
          {!openPopup && (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    error={!!errors.full_name}
                    helperText={errors.full_name}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Date of Birth"
                    name="date_of_birth"
                    value={formData.date_of_birth}
                    onChange={handleChange}
                    error={!!errors.date_of_birth}
                    helperText={errors.date_of_birth}
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Mobile Number"
                    name="mobile_number"
                    value={formData.mobile_number}
                    onChange={handleChange}
                    error={!!errors.mobile_number}
                    helperText={errors.mobile_number}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={!!errors.gender}>
                    <InputLabel>Gender</InputLabel>
                    <Select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      label="Gender"
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    error={!!errors.address}
                    helperText={errors.address}
                  />
                </Grid>
              </Grid>
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </Box>
            </form>
          )}
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default Registration;