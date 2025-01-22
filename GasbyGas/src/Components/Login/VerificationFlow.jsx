import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const VerificationFlow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { phoneNumber = '1234567890', email = 'user@example.com' } = location.state || {};

  const [step, setStep] = useState('phone');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  // Redirect to login after verification is complete
  useEffect(() => {
    if (step === 'complete') {
      // Redirect to login after 2 seconds
      const timer = setTimeout(() => {
        navigate('/');
      }, 2000);

      // Cleanup the timer
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
    if (step === 'phoneOTP') {
      setStep('email');
    } else if (step === 'emailOTP') {
      setStep('complete');
    }
    setOtp('');
  };

  const handleSkip = () => {
    if (step === 'phone' || step === 'phoneOTP') {
      setStep('email');
    } else {
      setStep('complete');
    }
    setOtp('');
    setError('');
  };

  const renderVerificationStep = () => {
    switch (step) {
      case 'phone':
        return (
          <div className="card">
            <h2>Verify your Phone Number</h2>
            <p>We'll send a verification code to: {phoneNumber}</p>
            <div className="button-group">
              <button className="btn-secondary" onClick={handleSkip}>Skip</button>
              <button className="btn-primary" onClick={() => setStep('phoneOTP')}>Verify</button>
            </div>
          </div>
        );

      case 'phoneOTP':
        return (
          <div className="card">
            <h2>Enter Verification Code</h2>
            <p>We've sent a verification code to: {phoneNumber}</p>
            <input
              type="text"
              placeholder="Enter 6-digit code"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
            />
            {error && <div className="error">{error}</div>}
            <div className="button-group">
              <button className="btn-secondary" onClick={handleSkip}>Skip</button>
              <button className="btn-primary" onClick={handleVerify}>Confirm</button>
            </div>
          </div>
        );

      case 'email':
        return (
          <div className="card">
            <h2>Verify your Email Address</h2>
            <p>We'll send a verification code to: {email}</p>
            <div className="button-group">
              <button className="btn-secondary" onClick={handleSkip}>Skip</button>
              <button className="btn-primary" onClick={() => setStep('emailOTP')}>Verify</button>
            </div>
          </div>
        );

      case 'emailOTP':
        return (
          <div className="card">
            <h2>Enter Verification Code</h2>
            <p>We've sent a verification code to: {email}</p>
            <input
              type="text"
              placeholder="Enter 6-digit code"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
            />
            {error && <div className="error">{error}</div>}
            <div className="button-group">
              <button className="btn-secondary" onClick={handleSkip}>Skip</button>
              <button className="btn-primary" onClick={handleVerify}>Confirm</button>
            </div>
          </div>
        );

      case 'complete':
        return (
          <div className="card">
            <h2>Verification Complete</h2>
            <p>Redirecting to login...</p>
          </div>
        );
    }
  };

  return (
    <div className="verification-container">
      <style>
        {`
          .verification-container {
            max-width: 400px;
            margin: 0 auto;
          }
          .card {
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 20px;
            margin: 10px 0;
            background: white;
          }
          h2 {
            margin: 0 0 16px;
            font-size: 1.25rem;
          }
          input {
            width: 100%;
            padding: 8px;
            margin: 8px 0;
            border: 1px solid #ddd;
            border-radius: 4px;
          }
          .button-group {
            display: flex;
            justify-content: space-between;
            margin-top: 16px;
          }
          .btn-primary {
            background: #2563eb;
            color: white;
            padding: 8px 16px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }
          .btn-secondary {
            background: transparent;
            border: 1px solid #ddd;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
          }
          .error {
            color: #dc2626;
            margin: 8px 0;
          }
        `}
      </style>
      {renderVerificationStep()}
    </div>
  );
};

export default VerificationFlow;