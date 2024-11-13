import React, { createContext, useContext, useEffect, useState } from 'react';
import { getToken, removeToken } from '../util/TokenHelper';
import { refreshToken as refreshTokenAPI} from '../api/Auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());

  const login = (token) => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    removeToken();
    setIsAuthenticated(false);
  };

  const refreshToken = async () => {
    try {
      const newTokens = await refreshTokenAPI();
      login(newTokens.token);
    } catch (error) {
      logout();
    }
  };

  useEffect(() => {
    const interval = setInterval(async(e) => {
        try {
            await refreshToken();

        }
        catch(error) {
            console.log(error);
        }
    }, 55 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext
