import { Building2, Users, Shield, Activity, Server, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';

export default function SystemDashboard() {
  // Mock data - will be replaced with real API data later
  const stats = [
    {
      label: 'Total Saccos',
      value: '12',
      icon: Building2,
      color: 'bg-blue-500',
      trend: '+2 this month',
      trendUp: true,
    },
    {
      label: 'Total Users',
      value: '1,847',
      icon: Users,
      color: 'bg-green-500',
      trend: '+156 this week',
      trendUp: true,
    },
    {
      label: 'System Health',
      value: '99.8%',
      icon: Activity,
      color: 'bg-purple-500',
      trend: 'All systems operational',
      trendUp: true,
    },
    {
      label: 'Security Alerts',
      value: '3',
      icon: Shield,
      color: 'bg-red-500',
      trend: '1 requires action',
      trendUp: false,
    },
  ];

  const saccos = [
    {
      id: 1,
      name: 'Metro Shuttle',
      vehicles: 45,
      drivers: 38,
      revenue: 'KSh 2.4M',
      status: 'Active',
      health: 98,
    },
    {
      id: 2,
      name: 'Coast Express',
      vehicles: 32,
      drivers: 28,
      revenue: 'KSh 1.8M',
      status: 'Active',
      health: 95,
    },
    {
      id: 3,
      name: 'Rift Valley Trans',
      vehicles: 28,
      drivers: 24,
      revenue: 'KSh 1.5M',
      status: 'Active',
      health: 92,
    },
    {
      id: 4,
      name: 'Western Shuttle',
      vehicles: 15,
      drivers: 12,
      revenue: 'KSh 890K',
      status: 'Warning',
      health: 78,
    },
  ];

  const securityLogs = [
    {
      id: 1,
      type: 'Failed Login',
      user: 'admin@metro.com',
      time: '2 mins ago',
      severity: 'Medium',
      ip: '102.168.1.45',
    },
    {
      id: 2,
      type: 'Unauthorized Access',
      user: 'driver@coast.com',
      time: '15 mins ago',
      severity: 'High',
      ip: '102.168.1.78',
    },
    {
      id: 3,
      type: 'Password Changed',
      user: 'passenger@email.com',
      time: '1 hour ago',
      severity: 'Low',
      ip: '102.168.1.12',
    },
  ];

  const getStatusColor = (status) => {
    const colors = {
      Active: 'bg-green-100 text-green-800',
      Warning: 'bg-yellow-100 text-yellow-800',
      Inactive: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getSeverityColor = (severity) => {
    const colors = {
      Low: 'bg-blue-100 text-blue-800',
      Medium: 'bg-yellow-100 text-yellow-800',
      High: 'bg-red-100 text-red-800',
    };
    return colors[severity] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Administration</h1>
          <p className="text-gray-600 mt-1">Monitor and manage the entire platform</p>
        </div>
        <button className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition flex items-center space-x-2">
          <Building2 className="w-5 h-5" />
          <span>Add New Sacco</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className={`w-4 h-4 mr-1 ${stat.trendUp ? 'text-green-500' : 'text-red-500'}`} />
                    <p className="text-xs text-gray-500">{stat.trend}</p>
                  </div>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* System Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
          <Server className="w-8 h-8 mb-3 opacity-80" />
          <p className="text-sm opacity-80">Server Status</p>
          <p className="text-3xl font-bold mt-1">Online</p>
          <p className="text-xs opacity-70 mt-2">Uptime: 99.8% (30 days)</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
          <Activity className="w-8 h-8 mb-3 opacity-80" />
          <p className="text-sm opacity-80">API Requests</p>
          <p className="text-3xl font-bold mt-1">45.2K</p>
          <p className="text-xs opacity-70 mt-2">Last 24 hours</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl">
          <CheckCircle className="w-8 h-8 mb-3 opacity-80" />
          <p className="text-sm opacity-80">Database Status</p>
          <p className="text-3xl font-bold mt-1">Healthy</p>
          <p className="text-xs opacity-70 mt-2">Response time: 45ms</p>
        </div>
      </div>

      {/* Saccos Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Registered Saccos</h2>
          <button className="text-primary-600 hover:text-primary-700 text-sm font-semibold">
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Sacco Name</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Vehicles</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Drivers</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Monthly Revenue</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Health</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>

              </tr>
            </thead>
            <tbody>
              {saccos.map((sacco) => (
                <tr key={sacco.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <p className="font-medium text-gray-900">{sacco.name}</p>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">{sacco.vehicles}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{sacco.drivers}</td>
                  <td className="py-4 px-4 text-sm font-semibold text-gray-900">{sacco.revenue}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            sacco.health >= 90 ? 'bg-green-500' : sacco.health >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${sacco.health}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{sacco.health}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(sacco.status)}`}>
                      {sacco.status}
                    </span>
                  </td>
                </tr>
              ))}z
            </tbody>
          </table>
        </div>
      </div>

      {/* Security Logs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-red-500" />
            Recent Security Events
          </h2>
          <button className="text-primary-600 hover:text-primary-700 text-sm font-semibold">
            View All Logs
          </button>
        </div>

        <div className="space-y-3">
          {securityLogs.map((log) => (
            <div
              key={log.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
            >
              <div className="flex items-center space-x-4">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="font-medium text-gray-900">{log.type}</p>
                  <p className="text-sm text-gray-600 mt-0.5">
                    User: {log.user} • IP: {log.ip} • {log.time}
                  </p>
                </div>
              </div>
              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getSeverityColor(log.severity)}`}>
                {log.severity}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}