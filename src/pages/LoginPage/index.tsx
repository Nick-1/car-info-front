import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import LoginForm from "../../components/LoginForm";
import {useAuth} from "../../contexts/AuthContext.tsx";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setToken } = useAuth();
  const from = location.state?.from || '/';

  const handleLoginSuccess = (token: string) => {
    localStorage.setItem('authToken', token);
    setToken(token);
    navigate(from, { replace: true });
  };

  return (
    <div>
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </div>
  );
};

export default LoginPage;
