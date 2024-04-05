import React, { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoutes = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const role = auth?.user?.role;
  console.log(role);
  

  useEffect(() => {
    if (!auth.user.token) {
      // If user is not authenticated, redirect to login page
      navigate('/login');
    } else {
      if (auth.user.role === 1 && window.location.pathname.includes('/user')) {
        navigate('/unauthorized');
      }
      
      else if (auth.user.role === 0 && window.location.pathname.includes('/admin')) {
        navigate('/unauthorized');
      }
    }
  }, [auth]);

  // Render the nested routes
  return <Outlet />;
};

export default PrivateRoutes;
