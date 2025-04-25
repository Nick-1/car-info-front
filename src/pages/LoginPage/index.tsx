import React from 'react';
import {useNavigate} from 'react-router-dom';
import LoginForm from "../../components/LoginForm";
import {useAuth} from "../../contexts/AuthContext.tsx";
import {CountryName} from '../../enums/countries.ts';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  // const location = useLocation();
  const { setToken } = useAuth();

  const handleLoginSuccess = (token: string, country: CountryName) => {
    const from = `/${country}`;
    // const from = location.state?.from || `/${country}`;

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
