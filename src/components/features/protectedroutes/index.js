import React, { useContext, useEffect } from 'react';
import AuthContext from '../../../context/auth/authcontext';
import { useNavigate } from 'react-router-dom';

const Protectedroutes = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <>{children}</>;
};

export default Protectedroutes;
