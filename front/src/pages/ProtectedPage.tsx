// ProtectedRoute.tsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface ProtectedRouteProps {
  component: React.ComponentType;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, ...rest }) => {
  const auth = useContext(AuthContext);

  return (
    auth?.user ? <Component {...rest} /> : <Navigate to='/login' />
  );
};

export default ProtectedRoute;
