import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isOwner, setIsOwner] = useState(() => {
    return localStorage.getItem('travelvista_is_owner') === 'true';
  });

  const login = (username, password) => {
    // Basic credential validation for mock owner login
    if (username === 'admin' && password === 'password123') {
      setIsOwner(true);
      localStorage.setItem('travelvista_is_owner', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsOwner(false);
    localStorage.removeItem('travelvista_is_owner');
  };

  return (
    <AuthContext.Provider value={{ isOwner, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
