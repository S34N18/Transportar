// src/features/auth/authService.js
// Authentication service functions for login, registration, and user management
import apiClient from '../../api/apiClient';

export const authService = {
  // Authenticate user with phone and password
  async login(phone, password) {
    try {
      const response = await apiClient.post('/auth/login', { phone, password });
      const { accessToken, refreshToken, user } = response.data;

      // Store authentication tokens and user data in localStorage
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

  // Register a new user account
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

  // Fetch current authenticated user information
  async getCurrentUser() {
    try {
      const response = await apiClient.get('/auth/me');
      return { success: true, user: response.data.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Clear authentication data from localStorage
  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  },

  // Retrieve user data from localStorage
  getStoredUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Check if user has valid access token
  isAuthenticated() {
    return !!localStorage.getItem('accessToken');
  },
};