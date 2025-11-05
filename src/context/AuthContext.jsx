// Authentication context provider for managing user authentication state
import { createContext, useState, useEffect } from 'react';
import { authService } from '../features/auth/authService';

export const AuthContext = createContext(null);

// Authentication provider component that manages user state and authentication methods
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check authentication status on component mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Verify user authentication and load user data
  const checkAuth = async () => {
    if (authService.isAuthenticated()) {
      const storedUser = authService.getStoredUser();
      if (storedUser) {
        setUser(storedUser);
      } else {
        const result = await authService.getCurrentUser();
        if (result.success) {
          setUser(result.user);
        } else {
          authService.logout();
        }
      }
    }
    setLoading(false);
  };

  // Handle user login
  const login = async (phone, password) => {
    const result = await authService.login(phone, password);
    if (result.success) {
      setUser(result.user);
    }
    return result;
  };

  // Handle user registration
  const register = async (userData) => {
    return await authService.register(userData);
  };

  // Handle user logout
  const logout = () => {
    authService.logout();
    setUser(null);
  };

  // Check if user has specific role
  const hasRole = (role) => {
    return user?.role === role;
  };

  // Check if user has any of the specified roles
  const hasAnyRole = (roles) => {
    return roles.includes(user?.role);
  };

  // Context value object containing authentication state and methods
  const value = {
    user,
    loading,
    login,
    register,
    logout,
    hasRole,
    hasAnyRole,
    isAuthenticated: !!user,
  };

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
