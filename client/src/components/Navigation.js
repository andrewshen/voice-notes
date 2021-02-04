import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import AuthService from '../services/AuthService';

const Navigation = () => {
  const { user, setUser, setIsAuthenticated } = useContext(AuthContext);

  const logout = (event) => {
    AuthService.logout().then((data) => {
      const { success } = data;
      if (success) {
        setUser('');
        setIsAuthenticated(false);
      }
    });
  };
  return (
    <div className="nav">
      {user} <span onClick={logout}>Logout</span>
    </div>
  );
};

export default Navigation;
