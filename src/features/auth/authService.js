// src/features/auth/authService.js - REPLACE WITH THIS MOCK VERSION
//import apiClient from '../../api/apiClient';

// Mock users for te
// sting (REMOVE WHEN BACKEND IS READY)
const MOCK_USERS = {
  'passenger': {
    phone: '0712345678',
    password: 'password',
    user: {
      id: 1,
      name: 'John Doe',
      email: 'passenger@test.com',
      phone: '0712345678',
      role: 'passenger'
    }
  },
  'driver': {
    phone: '0723456789',
    password: 'password',
    user: {
      id: 2,
      name: 'Jane Driver',
      email: 'driver@test.com',
      phone: '0723456789',
      role: 'driver'
    }
  },
  'sacco_admin': {
    phone: '0734567890',
    password: 'password',
    user: {
      id: 3,
      name: 'Admin User',
      email: 'admin@sacco.com',
      phone: '0734567890',
      role: 'sacco_admin'
    }
  },
  'system_admin': {
    phone: '0745678901',
    password: 'password',
    user: {
      id: 4,
      name: 'System Admin',
      email: 'system@admin.com',
      phone: '0745678901',
      role: 'system_admin'
    }
  }
};

export const authService = {
  // Login with MOCK authentication
  async login(phone, password) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check mock users
    const mockUser = Object.values(MOCK_USERS).find(
      u => u.phone === phone && u.password === password
    );

    if (mockUser) {
      const accessToken = 'mock_access_token_' + Date.now();
      const refreshToken = 'mock_refresh_token_' + Date.now();
      
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(mockUser.user));
      
      return { success: true, user: mockUser.user };
    }

    // If no mock user found, return error
    return {
      success: false,
      error: 'Invalid phone number or password. Try:\nPassenger: 0712345678\nDriver: 0723456789\nAdmin: 0734567890\nSystem: 0745678901\nPassword: password',
    };
  },

  // Register (mock - just store in localStorage)
  async register(userData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock registration - just return success
    return { 
      success: true, 
      data: { 
        message: 'Registration successful! Use phone: 0712345678, password: password to login.' 
      } 
    };
  },

  // Get current user
  async getCurrentUser() {
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        return { success: true, user: JSON.parse(userStr) };
      }
      return { success: false, error: 'No user found' };
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