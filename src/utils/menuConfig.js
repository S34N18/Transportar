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
      path: '/passenger/book',
    },
    {
      label: 'My Tickets',
      icon: Ticket,
      path: '/passenger/tickets',
    },
    {
      label: 'Track Bus',
      icon: MapPin,
      path: '/passenger/track',
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
      label: 'Current Route',
      icon: MapPin,
      path: '/driver/route',
    },
    {
      label: 'Trip History',
      icon: Clock,
      path: '/driver/history',
    },
    {
      label: 'Profile',
      icon: User,
      path: '/driver/profile',
    },
  ],

  sacco_admin: [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/admin/dashboard',
    },
    {
      label: 'Routes',
      icon: Route,
      path: '/admin/routes',
    },
    {
      label: 'Vehicles',
      icon: Car,
      path: '/admin/vehicles',
    },
    {
      label: 'Drivers',
      icon: Users,
      path: '/admin/drivers',
    },
    {
      label: 'Trips',
      icon: Bus,
      path: '/admin/trips',
    },
    {
      label: 'Revenue',
      icon: Wallet,
      path: '/admin/revenue',
    },
    {
      label: 'Analytics',
      icon: BarChart3,
      path: '/admin/analytics',
    },
    {
      label: 'Passengers',
      icon: Users,
      path: '/admin/passengers',
    },
    {
      label: 'Settings',
      icon: Settings,
      path: '/admin/settings',
    },
  ],

  system_admin: [
    {
      label: 'System Overview',
      icon: LayoutDashboard,
      path: '/system/dashboard',
    },
    {
      label: 'Saccos',
      icon: Building2,
      path: '/system/saccos',
    },
    {
      label: 'All Users',
      icon: Users,
      path: '/system/users',
    },
    {
      label: 'Security Logs',
      icon: Shield,
      path: '/system/security',
    },
    {
      label: 'Access Control',
      icon: Lock,
      path: '/system/access',
    },
    {
      label: 'System Analytics',
      icon: Activity,
      path: '/system/analytics',
    },
    {
      label: 'Settings',
      icon: Settings,
      path: '/system/settings',
    },
    {
     label: 'Routes',
     path: '/sacco/routes',
     icon: MapPin,
     roles: ['sacco_admin']
   },
    {
  label: 'Vehicles',
  path: '/sacco/vehicles',
  icon: Car,
  roles: ['sacco_admin']  
  },
  

  ],
};

// Get menu items based on user role
export const getMenuForRole = (role) => {
  return menuConfig[role] || menuConfig.passenger;
};