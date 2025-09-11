import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPage from './LoginPage';

type LoginPayload = { name: string; email: string };

const LoginWrapper: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (userData: LoginPayload) => {
    console.log('Logged in as:', userData);
    // Save user data to context or localStorage as needed
    navigate('/');  // Redirect to home after login
  };

  const handleClose = () => {
    navigate('/');  // Navigate back to home if login is closed
  };

  return <LoginPage onLogin={handleLogin} onClose={handleClose} />;
};

export default LoginWrapper;
