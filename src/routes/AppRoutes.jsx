// Main application router configuration
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import DashboardLayout from '../components/layout/DashboardLayout';

// Auth pages (public)
import Login from '../features/auth/Login';
import Register from '../features/auth/Register';
import ForgotPassword from '../features/auth/ForgotPassword';

// Dashboard pages (from separate dashboards folder)
import PassengerDashboard from '../dashboards/PassengerDashboard';
import DriverDashboard from '../dashboards/DriverDashboard';
import SaccoDashboard from '../dashboards/AdminDashboard';
import SystemDashboard from '../dashboards/SystemDashboard';

// Passenger pages
import BookTrip from '../features/passenger/BookTrip';
import MyTickets from '../features/passenger/MyTickets';
import TrackBus from '../features/passenger/TrackBus';
import PaymentHistory from '../features/passenger/PaymentHistory';

// Driver pages
import MyTrips from '../features/driver/MyTrips';
import StartTrip from '../features/driver/StartTrip';
import ScanQR from '../features/driver/ScanQR';

// Sacco Admin pages
import RouteManager from '../features/sacco/RouteManager';
import VehicleManager from '../features/sacco/VehicleManager';
import DriverManager from '../features/sacco/DriverManager';
import TripManager from '../features/sacco/TripManager';

// System Admin pages
import SaccoManager from '../features/system/SaccoManager';
import UserManager from '../features/system/UserManager';
import SecurityDashboard from '../features/system/SecurityDashboard';

// Shared pages
import ProfileSettings from '../features/shared/Profile';
import NotFound from '../features/shared/NotFound';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

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
            path="/passenger/book-trip"
            element={
              <ProtectedRoute allowedRoles={['passenger']}>
                <DashboardLayout>
                  <BookTrip />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/passenger/my-tickets"
            element={
              <ProtectedRoute allowedRoles={['passenger']}>
                <DashboardLayout>
                  <MyTickets />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/passenger/track-bus"
            element={
              <ProtectedRoute allowedRoles={['passenger']}>
                <DashboardLayout>
                  <TrackBus />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/passenger/payments"
            element={
              <ProtectedRoute allowedRoles={['passenger']}>
                <DashboardLayout>
                  <PaymentHistory />
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
            path="/driver/trips"
            element={
              <ProtectedRoute allowedRoles={['driver']}>
                <DashboardLayout>
                  <MyTrips />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/driver/start-trip"
            element={
              <ProtectedRoute allowedRoles={['driver']}>
                <DashboardLayout>
                  <StartTrip />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/driver/scan"
            element={
              <ProtectedRoute allowedRoles={['driver']}>
                <DashboardLayout>
                  <ScanQR />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Sacco Admin Routes */}
          <Route
            path="/sacco/dashboard"
            element={
              <ProtectedRoute allowedRoles={['sacco_admin']}>
                <DashboardLayout>
                  <SaccoDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/sacco/routes"
            element={
              <ProtectedRoute allowedRoles={['sacco_admin']}>
                <DashboardLayout>
                  <RouteManager />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/sacco/vehicles"
            element={
              <ProtectedRoute allowedRoles={['sacco_admin']}>
                <DashboardLayout>
                  <VehicleManager />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/sacco/drivers"
            element={
              <ProtectedRoute allowedRoles={['sacco_admin']}>
                <DashboardLayout>
                  <DriverManager />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/sacco/trips"
            element={
              <ProtectedRoute allowedRoles={['sacco_admin']}>
                <DashboardLayout>
                  <TripManager />
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
            path="/system/saccos"
            element={
              <ProtectedRoute allowedRoles={['system_admin']}>
                <DashboardLayout>
                  <SaccoManager />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/system/users"
            element={
              <ProtectedRoute allowedRoles={['system_admin']}>
                <DashboardLayout>
                  <UserManager />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/system/security"
            element={
              <ProtectedRoute allowedRoles={['system_admin']}>
                <DashboardLayout>
                  <SecurityDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Shared Routes (All authenticated users) */}
          {/* Global shared routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <ProfileSettings />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <ProfileSettings />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Role-based shared routes (for backward compatibility) */}
          <Route
            path="/passenger/profile"
            element={
              <ProtectedRoute allowedRoles={['passenger']}>
                <DashboardLayout>
                  <ProfileSettings />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/passenger/settings"
            element={
              <ProtectedRoute allowedRoles={['passenger']}>
                <DashboardLayout>
                  <ProfileSettings />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/driver/profile"
            element={
              <ProtectedRoute allowedRoles={['driver']}>
                <DashboardLayout>
                  <ProfileSettings />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/driver/settings"
            element={
              <ProtectedRoute allowedRoles={['driver']}>
                <DashboardLayout>
                  <ProfileSettings />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/sacco/profile"
            element={
              <ProtectedRoute allowedRoles={['sacco_admin']}>
                <DashboardLayout>
                  <ProfileSettings />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/sacco/settings"
            element={
              <ProtectedRoute allowedRoles={['sacco_admin']}>
                <DashboardLayout>
                  <ProfileSettings />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/system/profile"
            element={
              <ProtectedRoute allowedRoles={['system_admin']}>
                <DashboardLayout>
                  <ProfileSettings />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/system/settings"
            element={
              <ProtectedRoute allowedRoles={['system_admin']}>
                <DashboardLayout>
                  <ProfileSettings />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Default redirects */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRouter;