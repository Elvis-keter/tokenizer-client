import axios from 'axios';
import { getToken, setToken,getRefreshToken, setRefreshToken, removeToken, removeRefreshToken } from '../util/TokenHelper';
import { Navigate } from 'react-router-dom';

const API = axios.create({
  baseURL: 'http://localhost:5050',
});

API.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = async (credentials) => {
  const response = await API.post('/authenticate', credentials);
  const { token, refreshToken } = response.data;

  setToken(token);
  setRefreshToken(refreshToken);
  return response.data;
};

export const register = async (userData) => {
  const response = await API.post('/signup', userData);
  return response.data;
};

export const refreshToken = async () => {
  const refreshToken = getRefreshToken();
  const response = await API.post('/refreshtoken', { refreshToken });
  
  setToken(response.data.token);
  setRefreshToken(response.data.refreshToken);
  
  return response.data;
};

export const logout = () => {
  removeToken();
  removeRefreshToken();
};
