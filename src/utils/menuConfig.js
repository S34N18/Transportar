// Menu configurations for different user roles
import { 
  LayoutDashboard, Bus, Ticket, MapPin, CreditCard, User, Settings,
  Play, Camera, History, Package, Users, TrendingUp, Shield,
  Building, Lock, BarChart3, UserCog
} from 'lucide-react';

export const menuConfig = {
  passenger: [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: LayoutDashboard, 
      path: '/dashboard' 
    },
    { 
      id: 'book-trip', 
      label: 'Book Trip', 
      icon: Bus, 
      path: '/book-trip' 
    },
    { 
      id: 'my-tickets', 
      label: 'My Tickets', 
      icon: Ticket, 
      path: '/my-tickets' 
    },
    { 
      id: 'track-bus', 
      label: 'Track Bus', 
      icon: MapPin, 
      path: '/track-bus' 
    },
    { 
      id: 'payments', 
      label: 'Payment History', 
      icon: CreditCard, 
      path: '/payments' 
    },
    { 
      id: 'profile', 
      label: 'My Profile', 
      icon: User, 
      path: '/profile' 
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: Settings, 
      path: '/settings' 
    }
  ],

  driver: [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: LayoutDashboard, 
      path: '/driver/dashboard' 
    },
    { 
      id: 'my-trips', 
      label: 'My Trips', 
      icon: Bus, 
      path: '/driver/trips' 
    },
    { 
      id: 'start-trip', 
      label: 'Start Trip', 
      icon: Play, 
      path: '/driver/start-trip' 
    },
    { 
      id: 'scan-qr', 
      label: 'Scan QR Code', 
      icon: Camera, 
      path: '/driver/scan' 
    },
    { 
      id: 'current-route', 
      label: 'Current Route', 
      icon: MapPin, 
      path: '/driver/route' 
    },
    { 
      id: 'history', 
      label: 'Trip History', 
      icon: History, 
      path: '/driver/history' 
    },
    { 
      id: 'profile', 
      label: 'Profile', 
      icon: User, 
      path: '/driver/profile' 
    }
  ],

  sacco_admin: [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: LayoutDashboard, 
      path: '/sacco/dashboard' 
    },
    { 
      id: 'routes', 
      label: 'Routes', 
      icon: MapPin, 
      path: '/sacco/routes' 
    },
    { 
      id: 'vehicles', 
      label: 'Vehicles', 
      icon: Bus, 
      path: '/sacco/vehicles' 
    },
    { 
      id: 'drivers', 
      label: 'Drivers', 
      icon: UserCog, 
      path: '/sacco/drivers' 
    },
    { 
      id: 'trips', 
      label: 'Trips', 
      icon: Package, 
      path: '/sacco/trips' 
    },
    { 
      id: 'revenue', 
      label: 'Revenue Reports', 
      icon: CreditCard, 
      path: '/sacco/revenue' 
    },
    { 
      id: 'analytics', 
      label: 'Analytics', 
      icon: TrendingUp, 
      path: '/sacco/analytics' 
    },
    { 
      id: 'passengers', 
      label: 'Passengers', 
      icon: Users, 
      path: '/sacco/passengers' 
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: Settings, 
      path: '/sacco/settings' 
    }
  ],

  system_admin: [
    { 
      id: 'overview', 
      label: 'System Overview', 
      icon: LayoutDashboard, 
      path: '/admin/overview' 
    },
    { 
      id: 'saccos', 
      label: 'Saccos', 
      icon: Building, 
      path: '/admin/saccos' 
    },
    { 
      id: 'users', 
      label: 'All Users', 
      icon: Users, 
      path: '/admin/users' 
    },
    { 
      id: 'security', 
      label: 'Security Logs', 
      icon: Lock, 
      path: '/admin/security' 
    },
    { 
      id: 'access', 
      label: 'Access Control', 
      icon: Shield, 
      path: '/admin/access' 
    },
    { 
      id: 'analytics', 
      label: 'System Analytics', 
      icon: BarChart3, 
      path: '/admin/analytics' 
    },
    { 
      id: 'settings', 
      label: 'System Settings', 
      icon: Settings, 
      path: '/admin/settings' 
    }
  ]
};

// Helper function to get menu items for a specific role
export const getMenuForRole = (role) => {
  return menuConfig[role] || menuConfig.passenger;
};