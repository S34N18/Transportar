import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getMenuForRole } from '../../utils/menuConfig';
import { ChevronLeft, ChevronRight, Bus } from 'lucide-react';
import { useState } from 'react';

export default function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = getMenuForRole(user?.role);

  return (
    <div
      className={`bg-gray-900 text-white h-screen fixed left-0 top-0 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      } flex flex-col`}
    >
      {/* Logo Section */}
      <div className="p-4 flex items-center justify-between border-b border-gray-800">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="bg-primary-600 p-2 rounded-lg">
              <Bus className="w-6 h-6" />
            </div>
            <span className="font-bold text-lg">Matatu</span>
          </div>
        )}
        {collapsed && (
          <div className="bg-primary-600 p-2 rounded-lg mx-auto">
            <Bus className="w-6 h-6" />
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                  title={collapsed ? item.label : ''}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Collapse Button */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
          title={collapsed ? 'Expand' : 'Collapse'}
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5 mr-2" />
              <span className="text-sm">Collapse</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}