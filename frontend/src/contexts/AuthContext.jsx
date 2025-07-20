import React, { createContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [notificationCount, setNotificationCount] = useState(0);

  const fetchNotificationCount = useCallback(async () => {
    const currentToken = localStorage.getItem('token');
    if (!currentToken) return;
    try {
      const res = await api.get('/users/notifications');
      setNotificationCount(res.data.count);
    } catch (error) {
      console.error("Failed to fetch notification count", error);
    }
  }, []);

  const clearNotificationCount = useCallback(async () => {
    try {
      await api.post('/users/notifications/clear');
      setNotificationCount(0);
    } catch (error) {
      console.error("Failed to clear notifications", error);
    }
  }, []);
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
      fetchNotificationCount();
    }
    setLoading(false);

    // --- START: POLLING LOGIC ---
    // This will check for new notifications every 15 seconds
    const intervalId = setInterval(() => {
      fetchNotificationCount();
    }, 15000); // 15 seconds

    // This is a crucial cleanup function. It stops the polling when the component unmounts.
    return () => clearInterval(intervalId);
    // --- END: POLLING LOGIC ---

  }, [token, fetchNotificationCount]);

  const login = (userData, userToken) => {
    localStorage.setItem('token', userToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(userToken);
    setUser(userData);
    fetchNotificationCount();
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setNotificationCount(0);
  };

  const authContextValue = {
    user,
    token,
    loading,
    login,
    logout,
    notificationCount,
    clearNotificationCount,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};