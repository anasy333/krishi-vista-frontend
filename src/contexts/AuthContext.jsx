import React, { createContext, useContext, useState, useEffect } from 'react';

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
  const [loading, setLoading] = useState(false); // Changed to false for demo

  useEffect(() => {
    // For demo purposes, auto-authenticate as farmer
    const mockUser = {
      id: 1,
      first_name: 'Demo',
      last_name: 'Farmer',
      user_type: 'farmer',
      email: 'demo@krishisat.com',
      phone: '+91 9876543210'
    };
    
    setUser(mockUser);
    setIsAuthenticated(true);
    setLoading(false);
  }, []);

  const login = (token, userData) => {
    localStorage.setItem('krishisat_token', token);
    localStorage.setItem('krishisat_user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('krishisat_token');
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