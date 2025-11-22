import { useState } from 'react';
import { Bus, Calendar, Clock, MapPin, Users, CheckCircle, PlayCircle, XCircle, AlertCircle, Filter, ChevronRight, Phone, Navigation } from 'lucide-react';

export default function MyTrips() {
  // Mock trips data (would come from API)
  const [trips] = useState([
    {
      id: 1,
      route: 'Nairobi - Mombasa',
      startPoint: 'Nairobi CBD',
      endPoint: 'Mombasa Town',
      departureDate: '2025-11-23',
      departureTime: '08:00',
      arrivalTime: '16:00',
      vehicle: 'KAB 123X',
      vehicleModel: 'Toyota Hiace',
      capacity: 30,
      bookedSeats: 28,
      checkedIn: 28,
      status: 'active',
      fare: 1500,
      revenue: 42000,
      distance: '480 km',
      startedAt: '08:05',
    },
    {
      id: 2,
      route: 'Mombasa - Nairobi',
      startPoint: 'Mombasa Town',
      endPoint: 'Nairobi CBD',
      departureDate: '2025-11-23',
      departureTime: '18:00',
      arrivalTime: '02:00',
      vehicle: 'KAB 123X',
      vehicleModel: 'Toyota Hiace',
      capacity: 30,
      bookedSeats: 25,
      checkedIn: 0,
      status: 'scheduled',
      fare: 1500,
      revenue: 37500,
      distance: '480 km',
      startedAt: null,
    },
    {
      id: 3,
      route: 'Nairobi - Mombasa',
      startPoint: 'Nairobi CBD',
      endPoint: 'Mombasa Town',
      departureDate: '2025-11-22',
      departureTime: '08:00',
      arrivalTime: '16:00',
      vehicle: 'KAB 123X',
      vehicleModel: 'Toyota Hiace',
      capacity: 30,
      bookedSeats: 30,
      checkedIn: 30,
      status: 'completed',
      fare: 1500,
      revenue: 45000,
      distance: '480 km',
      startedAt: '08:00',
      completedAt: '15:45',
    },
    {
      id: 4,
      route: 'Nairobi - Nakuru',
      startPoint: 'Nairobi CBD',
      endPoint: 'Nakuru Town',
      departureDate: '2025-11-24',
      departureTime: '06:00',
      arrivalTime: '09:00',
      vehicle: 'KAB 123X',
      vehicleModel: 'Toyota Hiace',
      capacity: 30,
      bookedSeats: 22,
      checkedIn: 0,
      status: 'scheduled',
      fare: 600,
      revenue: 13200,
      distance: '160 km',
      startedAt: null,
    },
    {
      id: 5,
      route: 'Nairobi - Kisumu',
      startPoint: 'Nairobi CBD',
      endPoint: 'Kisumu Town',
      departureDate: '2025-11-21',
      departureTime: '10:00',
      arrivalTime: '16:00',
      vehicle: 'KAB 123X',
      vehicleModel: 'Toyota Hiace',
      capacity: 30,
      bookedSeats: 18,
      checkedIn: 18,
      status: 'completed',
      fare: 1200,
      revenue: 21600,
      distance: '350 km',
      startedAt: '10:05',
      completedAt: '15:50',
    },
  ]);

  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedTrip, setSelectedTrip] = useState(null);

  // Filter trips
  const filteredTrips = trips.filter(trip => {
    if (filterStatus === 'all') return true;
    return trip.status === filterStatus;
  });

  // Calculate stats
  const stats = {
    scheduled: trips.filter(t => t.status === 'scheduled').length,
    active: trips.filter(t => t.status === 'active').length,
    completed: trips.filter(t => t.status === 'completed').length,
    totalRevenue: trips
      .filter(t => t.status === 'completed')
      .reduce((sum, t) => sum + t.revenue, 0),
  };

  // Get status info
  const getStatusInfo = (status) => {
    const statusConfig = {
      scheduled: {
        label: 'Scheduled',
        color: 'bg-blue-100 text-blue-800',
        icon: Calendar,
      },
      active: {
        label: 'In Progress',
        color: 'bg-green-100 text-green-800',
        icon: PlayCircle,
      },
      completed: {
        label: 'Completed',
        color: 'bg-gray-100 text-gray-800',
        icon: CheckCircle,
      },
      cancelled: {
        label: 'Cancelled',
        color: 'bg-red-100 text-red-800',
        icon: XCircle,
      },
    };
    return statusConfig[status] || statusConfig.scheduled;
  };

  // Check if trip is today
  const isToday = (dateString) => {
    const tripDate = new Date(dateString);
    const today = new Date();
    return tripDate.toDateString() === today.toDateString();
  };

  // Get occupancy percentage
  const getOccupancy = (booked, capacity) => {
    return Math.round((booked / capacity) * 100);
  };

  // Handle trip actions
  const handleStartTrip = (trip) => {
    alert(`Starting trip: ${trip.route}\nScanning QR codes will now be available.`);
    // In real app: navigate to QR scanner or update trip status
  };

  const handleViewDetails = (trip) => {
    setSelectedTrip(trip);
  };

  const handleCompleteTrip = (trip) => {
    if (window.confirm('Mark this trip as completed?')) {
      alert(`Trip completed: ${trip.route}\nRevenue: KSh ${trip.revenue.toLocaleString()}`);
      // In real app: update trip status via API
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Trips</h1>
        <p className="text-gray-600 mt-1">View your assigned trips and schedule</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Scheduled</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.scheduled}</p>
              <p className="text-xs text-gray-500 mt-1">Upcoming trips</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.active}</p>
              <p className="text-xs text-gray-500 mt-1">In progress</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <PlayCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.completed}</p>
              <p className="text-xs text-gray-500 mt-1">This week</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Revenue</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {(stats.totalRevenue / 1000).toFixed(0)}K
              </p>
              <p className="text-xs text-gray-500 mt-1">Completed trips</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Bus className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <span className="text-sm font-medium text-gray-700 mr-4">Filter by:</span>
          <div className="flex space-x-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filterStatus === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({trips.length})
            </button>
            <button
              onClick={() => setFilterStatus('scheduled')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filterStatus === 'scheduled'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Scheduled ({stats.scheduled})
            </button>
            <button
              onClick={() => setFilterStatus('active')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filterStatus === 'active'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Active ({stats.active})
            </button>
            <button
              onClick={() => setFilterStatus('completed')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filterStatus === 'completed'
                  ? 'bg-gray-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Completed ({stats.completed})
            </button>
          </div>
        </div>
      </div>

      {/* Trips List */}
      {filteredTrips.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Bus className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No trips found</h3>
          <p className="text-gray-600">You don't have any {filterStatus !== 'all' ? filterStatus : ''} trips</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTrips.map((trip) => {
            const statusInfo = getStatusInfo(trip.status);
            const StatusIcon = statusInfo.icon;
            const occupancy = getOccupancy(trip.bookedSeats, trip.capacity);
            const today = isToday(trip.departureDate);

            return (
              <div
                key={trip.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  {/* Trip Info */}
                  <div className="flex-1 space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{trip.route}</h3>
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center space-x-1 ${statusInfo.color}`}>
                            <StatusIcon className="w-3 h-3" />
                            <span>{statusInfo.label}</span>
                          </span>
                          {today && trip.status === 'scheduled' && (
                            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
                              Today
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          {trip.startPoint} → {trip.endPoint}
                        </p>
                      </div>
                    </div>

                    {/* Trip Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-gray-600">Date</p>
                          <p className="font-medium text-gray-900">
                            {new Date(trip.departureDate).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 text-sm">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-gray-600">Time</p>
                          <p className="font-medium text-gray-900">
                            {trip.departureTime} - {trip.arrivalTime}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 text-sm">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-gray-600">Distance</p>
                          <p className="font-medium text-gray-900">{trip.distance}</p>
                        </div>
                      </div>
                    </div>

                    {/* Passengers Info */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-700">Passengers</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-900">
                          {trip.bookedSeats}/{trip.capacity}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            occupancy === 100 ? 'bg-red-500' :
                            occupancy >= 80 ? 'bg-orange-500' :
                            occupancy >= 50 ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}
                          style={{ width: `${occupancy}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>{occupancy}% occupied</span>
                        {trip.status === 'active' && (
                          <span className="text-green-600 font-medium">{trip.checkedIn} checked in</span>
                        )}
                      </div>
                    </div>

                    {/* Vehicle & Revenue */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <div>
                          <span className="text-gray-600">Vehicle: </span>
                          <span className="font-medium text-gray-900">{trip.vehicle}</span>
                        </div>
                        {trip.status === 'completed' && (
                          <div>
                            <span className="text-gray-600">Revenue: </span>
                            <span className="font-semibold text-green-600">KSh {trip.revenue.toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Timing Info */}
                    {trip.status === 'active' && trip.startedAt && (
                      <div className="bg-green-50 border-l-4 border-green-500 rounded p-3 text-sm">
                        <p className="text-green-800">
                          <span className="font-semibold">Started:</span> {trip.startedAt}
                        </p>
                      </div>
                    )}

                    {trip.status === 'completed' && trip.completedAt && (
                      <div className="bg-gray-50 border-l-4 border-gray-400 rounded p-3 text-sm">
                        <p className="text-gray-700">
                          <span className="font-semibold">Completed:</span> {trip.completedAt}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col space-y-3 lg:min-w-[180px]">
                    {trip.status === 'scheduled' && (
                      <>
                        <button
                          onClick={() => handleStartTrip(trip)}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold flex items-center justify-center space-x-2"
                        >
                          <PlayCircle className="w-4 h-4" />
                          <span>Start Trip</span>
                        </button>
                        <button
                          onClick={() => handleViewDetails(trip)}
                          className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold flex items-center justify-center space-x-2"
                        >
                          <ChevronRight className="w-4 h-4" />
                          <span>View Details</span>
                        </button>
                      </>
                    )}

                    {trip.status === 'active' && (
                      <>
                        <button
                          onClick={() => handleCompleteTrip(trip)}
                          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold flex items-center justify-center space-x-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>Complete</span>
                        </button>
                        <button
                          onClick={() => alert('Opening QR Scanner...')}
                          className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold"
                        >
                          Scan QR
                        </button>
                        <button
                          onClick={() => handleViewDetails(trip)}
                          className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold"
                        >
                          Details
                        </button>
                      </>
                    )}

                    {trip.status === 'completed' && (
                      <button
                        onClick={() => handleViewDetails(trip)}
                        className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold flex items-center justify-center space-x-2"
                      >
                        <ChevronRight className="w-4 h-4" />
                        <span>View Details</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Trip Details Modal */}
      {selectedTrip && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Trip Details</h2>
                <button
                  onClick={() => setSelectedTrip(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <XCircle className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Details */}
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Route Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Route</span>
                      <span className="font-medium text-gray-900">{selectedTrip.route}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Start Point</span>
                      <span className="font-medium text-gray-900">{selectedTrip.startPoint}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">End Point</span>
                      <span className="font-medium text-gray-900">{selectedTrip.endPoint}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Distance</span>
                      <span className="font-medium text-gray-900">{selectedTrip.distance}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Schedule</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date</span>
                      <span className="font-medium text-gray-900">{selectedTrip.departureDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Departure Time</span>
                      <span className="font-medium text-gray-900">{selectedTrip.departureTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Arrival Time</span>
                      <span className="font-medium text-gray-900">{selectedTrip.arrivalTime}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Passengers & Revenue</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Booked Seats</span>
                      <span className="font-medium text-gray-900">{selectedTrip.bookedSeats}/{selectedTrip.capacity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fare per Seat</span>
                      <span className="font-medium text-gray-900">KSh {selectedTrip.fare.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Revenue</span>
                      <span className="font-semibold text-green-600">KSh {selectedTrip.revenue.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex space-x-3">
                {selectedTrip.status === 'scheduled' && (
                  <button
                    onClick={() => {
                      handleStartTrip(selectedTrip);
                      setSelectedTrip(null);
                    }}
                    className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
                  >
                    Start Trip
                  </button>
                )}
                <button
                  onClick={() => setSelectedTrip(null)}
                  className="flex-1 px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}