import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Checkbox,
  FormControlLabel,
  Paper,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
  },
});

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Save user information to localStorage
        localStorage.setItem('user', JSON.stringify(result));
        localStorage.setItem('username', result.username);
        localStorage.setItem('userid', result.userid);
        localStorage.setItem('userRole', result.role);
        localStorage.setItem('branch',result.branch.name);
        // Clear previous role-specific data from localStorage
        localStorage.removeItem('customerId');
        localStorage.removeItem('businessId');
        

        // Save role-specific data to localStorage
        if (result.role === 'customer') {
          localStorage.setItem('customerId', result.customerid);
          console.log('Customer ID saved to localStorage:', result.customerid);
        } else if (result.role === 'business') {
          localStorage.setItem('businessId', result.businessid);
          console.log('Business ID saved to localStorage:', result.businessid);

          // Save branch information if available
          if (result.branch) {
            localStorage.setItem('branch', JSON.stringify(result.branch));
            console.log('Branch information saved to localStorage:', result.branch);
          }
        }

        console.log('User information saved to localStorage:', result);

        // Redirect based on the user's role
        switch (result.role) {
          case 'customer':
            navigate('/customer/overview');
            break;
          case 'business':
            navigate('/customer/overview');
            break;
          case 'outlet':
            navigate('/outlet-dashboard');
            break;
          case 'Admin':
            navigate('/admin/dashboard');
            break;
          default:
            alert('Unknown role');
        }
      } else {
        setError(result.error || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred during login.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={24}
            sx={{
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transform: 'scale(1)',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.02)',
              },
            }}
          >
            <Typography component="h1" variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
              Welcome Back
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Please login to continue
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 2 }}
              />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <FormControlLabel
                  control={<Checkbox color="primary" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
                  label="Remember me"
                />
              </Box>

              {error && (
                <Typography color="error" align="center" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoading}
                sx={{
                  py: 1.5,
                  mb: 2,
                  background: 'linear-gradient(45deg, #2196f3 30%, #1976d2 90%)',
                }}
                aria-label={isLoading ? 'Logging in...' : 'Login'}
              >
                {isLoading ? (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CircularProgress size={24} sx={{ color: 'white', mr: 1 }} />
                    Logging in...
                  </Box>
                ) : (
                  'Login'
                )}
              </Button>

              <Typography component="div" align="center" color="text.secondary">
                Don't have an account?{' '}
                <Link to="/Registration" style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 'bold' }}>
                  Register
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Login;