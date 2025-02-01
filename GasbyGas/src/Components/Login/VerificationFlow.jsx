import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Container,
  Alert,
  CircularProgress,
  Paper,
  ThemeProvider,
  createTheme
} from '@mui/material';
import { Email, CheckCircle } from '@mui/icons-material';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          padding: '10px 24px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          borderRadius: '12px',
        },
      },
    },
  },
});

const VerificationFlow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email = 'user@example.com' } = location.state || {};

  const [step, setStep] = useState('email');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (step === 'complete') {
      const timer = setTimeout(() => {
        navigate('/');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [step, navigate]);

  const handleVerify = () => {
    if (!otp) {
      setError('Please enter verification code');
      return;
    }
    if (otp.length !== 6) {
      setError('Verification code must be 6 digits');
      return;
    }
    setError('');
    setStep('complete');
    setOtp('');
  };

  const renderVerificationStep = () => {
    switch (step) {
      case 'email':
        return (
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Email sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Verify your Email
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                We'll send a verification code to complete your registration
              </Typography>
              <Paper
                elevation={0}
                sx={{
                  bgcolor: 'grey.50',
                  p: 2,
                  mb: 3,
                  borderRadius: 2
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Verification code will be sent to:
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {email}
                </Typography>
              </Paper>
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={() => setStep('emailOTP')}
              >
                Send Verification Code
              </Button>
            </CardContent>
          </Card>
        );

      case 'emailOTP':
        return (
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h5" gutterBottom>
                Enter Verification Code
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                We've sent a 6-digit code to {email}
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter 6-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                sx={{
                  mb: 3,
                  '& input': {
                    textAlign: 'center',
                    letterSpacing: '0.3em',
                    fontSize: '1.2em'
                  }
                }}
              />
              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleVerify}
              >
                Verify Code
              </Button>
            </CardContent>
          </Card>
        );

      case 'complete':
        return (
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <CheckCircle sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Verification Complete
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Redirecting to login...
              </Typography>
              <CircularProgress size={24} sx={{ mt: 2 }} />
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'background.default',
          display: 'flex',
          alignItems: 'center',
          py: 4
        }}
      >
        <Container maxWidth="sm">
          {renderVerificationStep()}
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default VerificationFlow;