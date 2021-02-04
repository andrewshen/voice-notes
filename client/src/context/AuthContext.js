import React, { createContext, useState, useEffect } from 'react';
import AuthService from '../services/AuthService';

export const AuthContext = createContext();

export default ({ children }) => {
  const [user, setUser] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    AuthService.isAuthenticated().then((data) => {
      const { user, isAuthenticated } = data;
      setUser(user);
      setIsAuthenticated(isAuthenticated);
      setIsLoaded(true);
    });
  }, []);

  return (
    <>
      {!isLoaded ? (
        <div className="center">Loading...</div>
      ) : (
        <AuthContext.Provider
          value={{ user, setUser, isAuthenticated, setIsAuthenticated }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </>
  );
};
