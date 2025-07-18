import React, { createContext, useContext, useState, useEffect } from 'react';
import { getToken, removeToken } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token) {
      // Decode token to get user info (you might want to validate with backend)
      try {
        const userData = JSON.parse(localStorage.getItem('krishisat_user') || '{}');
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        removeToken();
        localStorage.removeItem('krishisat_user');
      }
    }
    setLoading(false);
  }, []);

  const login = (token, userData) => {
    localStorage.setItem('krishisat_token', token);
    localStorage.setItem('krishisat_user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    removeToken();
    localStorage.removeItem('krishisat_user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};