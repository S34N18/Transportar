import { Bus, Car, Users, Wallet, TrendingUp, Activity, AlertCircle, CheckCircle } from 'lucide-react';

export default function AdminDashboard() {
  // Mock data - will be replaced with real API data later
  const stats = [
    {
      label: 'Total Revenue',
      value: 'KSh 2.4M',
      icon: Wallet,
      color: 'bg-green-500',
      trend: '+12% from last month',
      trendUp: true,
    },
    {
      label: 'Active Vehicles',
      value: '45',
      icon: Car,
      color: 'bg-blue-500',
      trend: '52 total vehicles',
      trendUp: true,
    },
    {
      label: 'Active Drivers',
      value: '38',
      icon: Users,
      color: 'bg-purple-500',
      trend: '42 total drivers',
      trendUp: true,
    },
    {
      label: 'Trips Today',
      value: '124',
      icon: Bus,
      color: 'bg-orange-500',
      trend: '+8% from yesterday',
      trendUp: true,
    },
  ];

  const recentTrips = [
    {
      id: 1,
      route: 'Nairobi - Mombasa',
      driver: 'John Kamau',
      vehicle: 'KAB 123X',
      passengers: 28,
      revenue: 'KSh 42,000',
      status: 'Completed',
    },
    {
      id: 2,
      route: 'Nairobi - Kisumu',
      driver: 'Mary Wanjiku',
      vehicle: 'KBZ 456Y',
      passengers: 25,
      revenue: 'KSh 37,500',
      status: 'Active',
    },
    {
      id: 3,
      route: 'Mombasa - Nairobi',
      driver: 'Peter Ochieng',
      vehicle: 'KCD 789Z',
      passengers: 30,
      revenue: 'KSh 45,000',
      status: 'Active',
    },
    {
      id: 4,
      route: 'Nairobi - Nakuru',
      driver: 'Jane Akinyi',
      vehicle: 'KDA 321W',
      passengers: 20,
      revenue: 'KSh 30,000',
      status: 'Pending',
    },
  ];

  const fleetStatus = [
    { label: 'Active', count: 45, color: 'bg-green-500', percentage: 86 },
    { label: 'Maintenance', count: 5, color: 'bg-yellow-500', percentage: 10 },
    { label: 'Inactive', count: 2, color: 'bg-red-500', percentage: 4 },
  ];

  const getStatusColor = (status) => {
    const colors = {
      Completed: 'bg-green-100 text-green-800',
      Active: 'bg-blue-100 text-blue-800',
      Pending: 'bg-gray-100 text-gray-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sacco Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Overview of your fleet operations</p>
        </div>
        <button className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition flex items-center space-x-2">
          <Bus className="w-5 h-5" />
          <span>Create New Trip</span>
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

      {/* Fleet Status & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Fleet Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Fleet Status</h2>
          <div className="space-y-4">
            {fleetStatus.map((status, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{status.label}</span>
                  <span className="text-sm font-bold text-gray-900">{status.count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${status.color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${status.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Total Fleet</span>
              <span className="font-bold text-gray-900">52 Vehicles</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
            <Activity className="w-8 h-8 mb-3 opacity-80" />
            <p className="text-sm opacity-80">Active Trips</p>
            <p className="text-3xl font-bold mt-1">23</p>
            <p className="text-xs opacity-70 mt-2">12 departing soon</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
            <CheckCircle className="w-8 h-8 mb-3 opacity-80" />
            <p className="text-sm opacity-80">Completed Today</p>
            <p className="text-3xl font-bold mt-1">101</p>
            <p className="text-xs opacity-70 mt-2">On-time rate: 94%</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl">
            <Users className="w-8 h-8 mb-3 opacity-80" />
            <p className="text-sm opacity-80">Total Passengers</p>
            <p className="text-3xl font-bold mt-1">2,847</p>
            <p className="text-xs opacity-70 mt-2">This month</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl">
            <AlertCircle className="w-8 h-8 mb-3 opacity-80" />
            <p className="text-sm opacity-80">Pending Issues</p>
            <p className="text-3xl font-bold mt-1">5</p>
            <p className="text-xs opacity-70 mt-2">2 require attention</p>
          </div>
        </div>
      </div>

      {/* Recent Trips */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Trips</h2>
          <button className="text-primary-600 hover:text-primary-700 text-sm font-semibold">
            View All Trips
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Route</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Driver</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Vehicle</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Passengers</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Revenue</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentTrips.map((trip) => (
                <tr key={trip.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <p className="font-medium text-gray-900">{trip.route}</p>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">{trip.driver}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{trip.vehicle}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{trip.passengers}</td>
                  <td className="py-4 px-4 text-sm font-semibold text-gray-900">{trip.revenue}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(trip.status)}`}>
                      {trip.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}