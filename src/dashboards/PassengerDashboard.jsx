import { Bus, Ticket, MapPin, Wallet, Clock, TrendingUp } from 'lucide-react';

export default function PassengerDashboard() {
  // Mock data - will be replaced with real API data later
  const stats = [
    {
      label: 'Upcoming Trips',
      value: '2',
      icon: Bus,
      color: 'bg-blue-500',
      trend: '+2 this week',
    },
    {
      label: 'Total Tickets',
      value: '24',
      icon: Ticket,
      color: 'bg-green-500',
      trend: '+4 this month',
    },
    {
      label: 'Wallet Balance',
      value: 'KSh 1,250',
      icon: Wallet,
      color: 'bg-purple-500',
      trend: 'Last topped up 2 days ago',
    },
    {
      label: 'Recent Routes',
      value: '5',
      icon: MapPin,
      color: 'bg-orange-500',
      trend: 'Most used: Nairobi - Mombasa',
    },
  ];

  const upcomingTrips = [
    {
      id: 1,
      route: 'Nairobi - Mombasa',
      date: 'Nov 6, 2025',
      time: '08:00 AM',
      vehicle: 'KAB 123X',
      seat: 'A12',
      status: 'Confirmed',
    },
    {
      id: 2,
      route: 'Nairobi - Kisumu',
      date: 'Nov 8, 2025',
      time: '10:30 AM',
      vehicle: 'KBZ 456Y',
      seat: 'B8',
      status: 'Confirmed',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome Back!</h1>
        <p className="text-gray-600 mt-1">Here's your travel overview</p>
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

      {/* Upcoming Trips */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Upcoming Trips</h2>
          <button className="text-primary-600 hover:text-primary-700 text-sm font-semibold">
            View All
          </button>
        </div>

        <div className="space-y-4">
          {upcomingTrips.map((trip) => (
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
                      {trip.date} at {trip.time}
                    </span>
                    <span>Vehicle: {trip.vehicle}</span>
                    <span>Seat: {trip.seat}</span>
                  </div>
                </div>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
                {trip.status}
              </span>
            </div>
          ))}
        </div>

        {upcomingTrips.length === 0 && (
          <div className="text-center py-12">
            <Bus className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No upcoming trips</p>
            <button className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
              Book a Trip
            </button>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="bg-primary-600 text-white p-6 rounded-xl hover:bg-primary-700 transition text-left">
          <Bus className="w-8 h-8 mb-3" />
          <p className="font-semibold text-lg">Book a Trip</p>
          <p className="text-sm text-primary-100 mt-1">Find and book your next journey</p>
        </button>

        <button className="bg-green-600 text-white p-6 rounded-xl hover:bg-green-700 transition text-left">
          <Ticket className="w-8 h-8 mb-3" />
          <p className="font-semibold text-lg">My Tickets</p>
          <p className="text-sm text-green-100 mt-1">View your active tickets</p>
        </button>

        <button className="bg-purple-600 text-white p-6 rounded-xl hover:bg-purple-700 transition text-left">
          <MapPin className="w-8 h-8 mb-3" />
          <p className="font-semibold text-lg">Track Bus</p>
          <p className="text-sm text-purple-100 mt-1">See real-time location</p>
        </button>
      </div>
    </div>
  );
}