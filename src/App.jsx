import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import ProtectedRoute from './routes/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';

// Import Dashboard pages
import PassengerDashboard from './dashboards/PassengerDashboard';
import DriverDashboard from './dashboards/DriverDashboard';
import AdminDashboard from './dashboards/AdminDashboard';
import SystemDashboard from './dashboards/SystemDashboard';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Passenger Routes */}
          <Route
            path="/passenger/dashboard"
            element={
              <ProtectedRoute allowedRoles={['passenger']}>
                <DashboardLayout>
                  <PassengerDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/passenger/*"
            element={
              <ProtectedRoute allowedRoles={['passenger']}>
                <DashboardLayout>
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-gray-900">Page Coming Soon</h2>
                    <p className="text-gray-600 mt-2">This feature is under development</p>
                  </div>
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Driver Routes */}
          <Route
            path="/driver/dashboard"
            element={
              <ProtectedRoute allowedRoles={['driver']}>
                <DashboardLayout>
                  <DriverDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/driver/*"
            element={
              <ProtectedRoute allowedRoles={['driver']}>
                <DashboardLayout>
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-gray-900">Page Coming Soon</h2>
                    <p className="text-gray-600 mt-2">This feature is under development</p>
                  </div>
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={['sacco_admin']}>
                <DashboardLayout>
                  <AdminDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={['sacco_admin']}>
                <DashboardLayout>
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-gray-900">Page Coming Soon</h2>
                    <p className="text-gray-600 mt-2">This feature is under development</p>
                  </div>
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* System Admin Routes */}
          <Route
            path="/system/dashboard"
            element={
              <ProtectedRoute allowedRoles={['system_admin']}>
                <DashboardLayout>
                  <SystemDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/system/*"
            element={
              <ProtectedRoute allowedRoles={['system_admin']}>
                <DashboardLayout>
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-gray-900">Page Coming Soon</h2>
                    <p className="text-gray-600 mt-2">This feature is under development</p>
                  </div>
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-gray-300">404</h1>
                  <p className="text-xl text-gray-600 mt-4">Page Not Found</p>
                </div>
              </div>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

