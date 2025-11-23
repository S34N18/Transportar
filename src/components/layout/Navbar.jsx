import { Bell, Search, ChevronDown, LogOut, User, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getRoleBadgeColor = (role) => {
    const colors = {
      passenger: 'bg-blue-100 text-blue-800',
      driver: 'bg-green-100 text-green-800',
      sacco_admin: 'bg-purple-100 text-purple-800',
      system_admin: 'bg-red-100 text-red-800',
    };
    return colors[role] || 'bg-gray-100 text-gray-800';
  };

  const getRoleLabel = (role) => {
    const labels = {
      passenger: 'Passenger',
      driver: 'Driver',
      sacco_admin: 'Sacco Admin',
      system_admin: 'System Admin',
    };
    return labels[role] || role;
  };

  // Get the correct path prefix based on user role
  const getRolePrefix = (role) => {
    const prefixes = {
      passenger: 'passenger',
      driver: 'driver',
      sacco_admin: 'sacco',
      system_admin: 'system',
    };
    return prefixes[role] || 'passenger';
  };

  const rolePrefix = getRolePrefix(user?.role);

  const handleProfileClick = () => {
    setShowDropdown(false);
    navigate(`/${rolePrefix}/profile`);
  };

  const handleSettingsClick = () => {
    setShowDropdown(false);
    navigate(`/${rolePrefix}/settings`);
  };

  return (
    <nav className="bg-white border-b border-gray-200 h-16 fixed top-0 right-0 left-64 z-10 transition-all duration-300">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition">
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="text-left hidden md:block">
                <p className="text-sm font-semibold text-gray-900">{user?.name || 'User'}</p>
                <p className={`text-xs px-2 py-0.5 rounded-full inline-block ${getRoleBadgeColor(user?.role)}`}>
                  {getRoleLabel(user?.role)}
                </p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                  <p className="text-xs text-gray-500">{user?.phone}</p>
                </div>

                <button
                  onClick={handleProfileClick}
                  className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                >
                  <User className="w-4 h-4" />
                  <span>My Profile</span>
                </button>

                <button
                  onClick={handleSettingsClick}
                  className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>

                <hr className="my-2" />

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}