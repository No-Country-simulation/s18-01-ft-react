import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { isAuthenticated, user } = useAuth0();
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    if (isAuthenticated && user) {
      setAuthUser(user);
      sessionStorage.setItem('authUser', JSON.stringify(user)); // Store user in session storage
    } else {
      setAuthUser(null);
      sessionStorage.removeItem('authUser'); // Clear session storage if not authenticated
    }
  }, [isAuthenticated, user]);

  return (
    <AuthContext.Provider value={{ authUser }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
