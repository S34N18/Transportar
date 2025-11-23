import { 
  LayoutDashboard, 
  Bus, 
  Ticket, 
  MapPin, 
  Wallet, 
  User, 
  Settings,
  Route,
  Car,
  Users,
  BarChart3,
  PlayCircle,
  QrCode,
  Clock,
  Building2,
  Shield,
  Lock,
  Activity
} from 'lucide-react';

// Navigation menus for each role
export const menuConfig = {
  passenger: [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/passenger/dashboard',
    },
    {
      label: 'Book Trip',
      icon: Bus,
      path: '/passenger/book-trip',  // Fixed: was '/passenger/book'
    },
    {
      label: 'My Tickets',
      icon: Ticket,
      path: '/passenger/my-tickets',  // Fixed: was '/passenger/tickets'
    },
    {
      label: 'Track Bus',
      icon: MapPin,
      path: '/passenger/track-bus',  // Fixed: was '/passenger/track'
    },
    {
      label: 'Payment History',
      icon: Wallet,
      path: '/passenger/payments',
    },
    {
      label: 'My Profile',
      icon: User,
      path: '/passenger/profile',
    },
    {
      label: 'Settings',
      icon: Settings,
      path: '/passenger/settings',
    },
  ],

  driver: [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/driver/dashboard',
    },
    {
      label: 'My Trips',
      icon: Bus,
      path: '/driver/trips',
    },
    {
      label: 'Start Trip',
      icon: PlayCircle,
      path: '/driver/start-trip',
    },
    {
      label: 'Scan QR Code',
      icon: QrCode,
      path: '/driver/scan',
    },
    {
      label: 'Profile',
      icon: User,
      path: '/driver/profile',
    },
    {
      label: 'Settings',
      icon: Settings,
      path: '/driver/settings',
    },
  ],

  sacco_admin: [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/sacco/dashboard',  // Fixed: was '/admin/dashboard'
    },
    {
      label: 'Routes',
      icon: Route,
      path: '/sacco/routes',  // Fixed: was '/admin/routes'
    },
    {
      label: 'Vehicles',
      icon: Car,
      path: '/sacco/vehicles',  // Fixed: was '/admin/vehicles'
    },
    {
      label: 'Drivers',
      icon: Users,
      path: '/sacco/drivers',  // Fixed: was '/admin/drivers'
    },
    {
      label: 'Trips',
      icon: Bus,
      path: '/sacco/trips',  // Fixed: was '/admin/trips'
    },
    {
      label: 'Profile',
      icon: User,
      path: '/sacco/profile',
    },
    {
      label: 'Settings',
      icon: Settings,
      path: '/sacco/settings',  // Fixed: was '/admin/settings'
    },
  ],

  system_admin: [
    {
      label: 'System Overview',
      icon: LayoutDashboard,
      path: '/system/dashboard',
    },
    {
      label: 'Manage Saccos',
      icon: Building2,
      path: '/system/saccos',
    },
    {
      label: 'User Management',
      icon: Users,
      path: '/system/users',
    },
    {
      label: 'Security Dashboard',
      icon: Shield,
      path: '/system/security',
    },
    {
      label: 'Profile',
      icon: User,
      path: '/system/profile',
    },
    {
      label: 'Settings',
      icon: Settings,
      path: '/system/settings',
    },
  ],
};

// Get menu items based on user role
export const getMenuForRole = (role) => {
  return menuConfig[role] || menuConfig.passenger;
};