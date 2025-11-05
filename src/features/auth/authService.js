// src/features/auth/authService.js
import apiClient from '../../api/apiClient';

export const authService = {
  // Login
  async login(phone, password) {
    try {
      const response = await apiClient.post('/auth/login', { phone, password });
      const { accessToken, refreshToken, user } = response.data;
      
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));
      
      return { success: true, user };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed. Please try again.',
      };
    }
  },

  // Register
  async register(userData) {
    try {
      const response = await apiClient.post('/auth/register', userData);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Registration failed. Please try again.',
      };
    }
  },

  // Get current user
  async getCurrentUser() {
    try {
      const response = await apiClient.get('/auth/me');
      return { success: true, user: response.data.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Logout
  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  },

  // Get stored user
  getStoredUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Check if authenticated
  isAuthenticated() {
    return !!localStorage.getItem('accessToken');
  },
};