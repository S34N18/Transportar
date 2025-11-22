import { Bus, MapPin, Users, Clock, CheckCircle, PlayCircle } from 'lucide-react';

export default function DriverDashboard() {
  // Mock data - will be replaced with real API data later
  const stats = [
    {
      label: "Today's Trips",
      value: '3',
      icon: Bus,
      color: 'bg-blue-500',
      trend: '1 completed, 2 pending',
    },
    {
      label: 'Passengers Today',
      value: '45',
      icon: Users,
      color: 'bg-green-500',
      trend: 'Capacity: 60',
    },
    {
      label: 'Hours Driven',
      value: '4.5',
      icon: Clock,
      color: 'bg-purple-500',
      trend: 'This week: 28 hours',
    },
    {
      label: 'Completed Trips',
      value: '156',
      icon: CheckCircle,
      color: 'bg-orange-500',
      trend: 'This month: 42 trips',
    },
  ];

  const todaysSchedule = [
    {
      id: 1,
      route: 'Nairobi - Mombasa',
      time: '08:00 AM',
      vehicle: 'KAB 123X',
      passengers: 28,
      capacity: 30,
      status: 'Completed',
    },
    {
      id: 2,
      route: 'Mombasa - Nairobi',
      time: '02:00 PM',
      vehicle: 'KAB 123X',
      passengers: 17,
      capacity: 30,
      status: 'Active',
    },
    {
      id: 3,
      route: 'Nairobi - Nakuru',
      time: '06:00 PM',
      vehicle: 'KAB 123X',
      passengers: 0,
      capacity: 30,
      status: 'Pending',
    },
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
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Driver Dashboard</h1>
        <p className="text-gray-600 mt-1">Manage your trips and schedule</p>
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
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.trend}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Trip Alert */}
      <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6">
        <div className="flex items-start">
          <PlayCircle className="w-6 h-6 text-blue-600 mr-3 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-blue-900">Active Trip in Progress</h3>
            <p className="text-blue-700 mt-1">Mombasa - Nairobi • 17/30 passengers • Started at 2:00 PM</p>
            <div className="mt-4 flex space-x-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                View Route
              </button>
              <button className="px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition">
                Scan QR Code
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Today's Schedule</h2>
          <span className="text-sm text-gray-500">November 5, 2025</span>
        </div>

        <div className="space-y-4">
          {todaysSchedule.map((trip) => (
            <div
              key={trip.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-primary-100 p-3 rounded-lg">
                  <Bus className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{trip.route}</p>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {trip.time}
                    </span>
                    <span>Vehicle: {trip.vehicle}</span>
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {trip.passengers}/{trip.capacity}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(trip.status)}`}>
                  {trip.status}
                </span>
                {trip.status === 'Pending' && (
                  <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">
                    Start Trip
                  </button>
                )}
                {trip.status === 'Active' && (
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                    View Details
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="bg-green-600 text-white p-6 rounded-xl hover:bg-green-700 transition text-left">
          <PlayCircle className="w-8 h-8 mb-3" />
          <p className="font-semibold text-lg">Start Trip</p>
          <p className="text-sm text-green-100 mt-1">Begin your scheduled journey</p>
        </button>

        <button className="bg-purple-600 text-white p-6 rounded-xl hover:bg-purple-700 transition text-left">
          <MapPin className="w-8 h-8 mb-3" />
          <p className="font-semibold text-lg">View Route</p>
          <p className="text-sm text-purple-100 mt-1">See your assigned route</p>
        </button>

        <button className="bg-blue-600 text-white p-6 rounded-xl hover:bg-blue-700 transition text-left">
          <Users className="w-8 h-8 mb-3" />
          <p className="font-semibold text-lg">Scan Tickets</p>
          <p className="text-sm text-blue-100 mt-1">Verify passenger QR codes</p>
        </button>
      </div>
    </div>
  );
}