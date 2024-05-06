import React from 'react';
import { Navigate } from 'react-router-dom';
import {useAuth} from "../../contexts/AuthContext.tsx";
import {useVerifyToken} from "../../hooks/useVerifyToken.ts";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { token } = useAuth();
  const { isValid, isLoading } = useVerifyToken(token);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isValid ? <>{children}</> : <Navigate to="/login" replace state={{ from: location.pathname }} />;
};

export default PrivateRoute;
