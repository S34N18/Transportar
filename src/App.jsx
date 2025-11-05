// Main application component with routing configuration
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './features/auth/Login';
import Register from './features/auth/Register';

// Main App component that sets up routing and authentication context
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Authentication routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Dashboard routes for different user roles */}
          <Route path="/passenger/dashboard" element={<div className="p-8 text-2xl">Passenger Dashboard (Coming Soon)</div>} />
          <Route path="/driver/dashboard" element={<div className="p-8 text-2xl">Driver Dashboard (Coming Soon)</div>} />
          <Route path="/admin/dashboard" element={<div className="p-8 text-2xl">Admin Dashboard (Coming Soon)</div>} />
          <Route path="/system/dashboard" element={<div className="p-8 text-2xl">System Dashboard (Coming Soon)</div>} />

          {/* Fallback route for 404 errors */}
          <Route path="*" element={<div className="p-8 text-2xl">404 - Page Not Found</div>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;