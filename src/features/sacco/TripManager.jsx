import { useState } from 'react';
import { Bus, Plus, Edit2, Trash2, Search, X, Save, Calendar, Clock, Users, MapPin, AlertCircle, CheckCircle, Play, XCircle } from 'lucide-react';

export default function TripManager() {
  // Mock data from other managers
  const routes = [
    { id: 1, name: 'Nairobi - Mombasa', fare: 1500 },
    { id: 2, name: 'Nairobi - Kisumu', fare: 1200 },
    { id: 3, name: 'Nairobi - Nakuru', fare: 600 },
  ];

  const vehicles = [
    { id: 1, registrationNumber: 'KAB 123X', capacity: 30 },
    { id: 2, registrationNumber: 'KBZ 456Y', capacity: 25 },
    { id: 3, registrationNumber: 'KCD 789Z', capacity: 30 },
    { id: 4, registrationNumber: 'KDA 321W', capacity: 35 },
  ];

  const drivers = [
    { id: 1, name: 'John Kamau' },
    { id: 2, name: 'Mary Wanjiku' },
    { id: 3, name: 'Peter Ochieng' },
    { id: 4, name: 'Jane Akinyi' },
  ];

  // State management
  const [trips, setTrips] = useState([
    {
      id: 1,
      routeId: 1,
      routeName: 'Nairobi - Mombasa',
      vehicleId: 1,
      vehicleReg: 'KAB 123X',
      driverId: 1,
      driverName: 'John Kamau',
      departureDate: '2025-11-20',
      departureTime: '08:00',
      fare: 1500,
      capacity: 30,
      bookedSeats: 28,
      status: 'scheduled',
    },
    {
      id: 2,
      routeId: 2,
      routeName: 'Nairobi - Kisumu',
      vehicleId: 2,
      vehicleReg: 'KBZ 456Y',
      driverId: 2,
      driverName: 'Mary Wanjiku',
      departureDate: '2025-11-20',
      departureTime: '10:30',
      fare: 1200,
      capacity: 25,
      bookedSeats: 25,
      status: 'active',
    },
    {
      id: 3,
      routeId: 1,
      routeName: 'Nairobi - Mombasa',
      vehicleId: 3,
      vehicleReg: 'KCD 789Z',
      driverId: 3,
      driverName: 'Peter Ochieng',
      departureDate: '2025-11-19',
      departureTime: '14:00',
      fare: 1500,
      capacity: 30,
      bookedSeats: 30,
      status: 'completed',
    },
    {
      id: 4,
      routeId: 3,
      routeName: 'Nairobi - Nakuru',
      vehicleId: 4,
      vehicleReg: 'KDA 321W',
      driverId: 4,
      driverName: 'Jane Akinyi',
      departureDate: '2025-11-21',
      departureTime: '06:00',
      fare: 600,
      capacity: 35,
      bookedSeats: 0,
      status: 'scheduled',
    },
    {
      id: 5,
      routeId: 2,
      routeName: 'Nairobi - Kisumu',
      vehicleId: 1,
      vehicleReg: 'KAB 123X',
      driverId: 1,
      driverName: 'John Kamau',
      departureDate: '2025-11-18',
      departureTime: '09:00',
      fare: 1200,
      capacity: 30,
      bookedSeats: 15,
      status: 'cancelled',
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('');
  const [formData, setFormData] = useState({
    routeId: '',
    vehicleId: '',
    driverId: '',
    departureDate: '',
    departureTime: '',
    fare: '',
    status: 'scheduled',
  });

  // Filter trips
  const filteredTrips = trips.filter(trip => {
    const matchesSearch = 
      trip.routeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.vehicleReg.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.driverName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || trip.status === filterStatus;
    const matchesDate = !filterDate || trip.departureDate === filterDate;
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  // Calculate stats
  const stats = {
    total: trips.length,
    scheduled: trips.filter(t => t.status === 'scheduled').length,
    active: trips.filter(t => t.status === 'active').length,
    completed: trips.filter(t => t.status === 'completed').length,
    cancelled: trips.filter(t => t.status === 'cancelled').length,
    totalRevenue: trips
      .filter(t => t.status === 'completed')
      .reduce((sum, t) => sum + (t.fare * t.bookedSeats), 0),
    totalPassengers: trips
      .filter(t => t.status === 'completed')
      .reduce((sum, t) => sum + t.bookedSeats, 0),
  };

  // Open modal for creating new trip
  const handleCreateNew = () => {
    setEditingTrip(null);
    setFormData({
      routeId: '',
      vehicleId: '',
      driverId: '',
      departureDate: '',
      departureTime: '',
      fare: '',
      status: 'scheduled',
    });
    setShowModal(true);
  };

  // Open modal for editing existing trip
  const handleEdit = (trip) => {
    setEditingTrip(trip);
    setFormData({ ...trip });
    setShowModal(true);
  };

  // Save trip (create or update)
  const handleSave = () => {
    if (!formData.routeId || !formData.vehicleId || !formData.driverId || !formData.departureDate || !formData.departureTime) {
      alert('Please fill in all required fields');
      return;
    }

    // Get related data
    const selectedRoute = routes.find(r => r.id === parseInt(formData.routeId));
    const selectedVehicle = vehicles.find(v => v.id === parseInt(formData.vehicleId));
    const selectedDriver = drivers.find(d => d.id === parseInt(formData.driverId));

    const tripData = {
      ...formData,
      routeId: parseInt(formData.routeId),
      vehicleId: parseInt(formData.vehicleId),
      driverId: parseInt(formData.driverId),
      routeName: selectedRoute.name,
      vehicleReg: selectedVehicle.registrationNumber,
      driverName: selectedDriver.name,
      capacity: selectedVehicle.capacity,
      fare: formData.fare || selectedRoute.fare,
    };

    if (editingTrip) {
      // Update existing trip
      setTrips(trips.map(t => 
        t.id === editingTrip.id 
          ? { ...tripData, id: t.id, bookedSeats: t.bookedSeats }
          : t
      ));
    } else {
      // Create new trip
      const newTrip = {
        ...tripData,
        id: Math.max(...trips.map(t => t.id)) + 1,
        bookedSeats: 0,
      };
      setTrips([...trips, newTrip]);
    }

    setShowModal(false);
  };

  // Delete trip
  const handleDelete = (id) => {
    const trip = trips.find(t => t.id === id);
    if (trip.bookedSeats > 0) {
      alert('Cannot delete trip with existing bookings. Please cancel the trip instead.');
      return;
    }
    if (window.confirm('Are you sure you want to delete this trip?')) {
      setTrips(trips.filter(t => t.id !== id));
    }
  };

  // Change trip status
  const handleStatusChange = (id, newStatus) => {
    setTrips(trips.map(t => 
      t.id === id ? { ...t, status: newStatus } : t
    ));
  };

  // Get status color
  const getStatusColor = (status) => {
    const colors = {
      scheduled: 'bg-blue-100 text-blue-800',
      active: 'bg-green-100 text-green-800',
      completed: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  // Get status icon
  const getStatusIcon = (status) => {
    const icons = {
      scheduled: Calendar,
      active: Play,
      completed: CheckCircle,
      cancelled: XCircle,
    };
    return icons[status] || Calendar;
  };

  // Calculate occupancy percentage
  const getOccupancyPercentage = (booked, capacity) => {
    return Math.round((booked / capacity) * 100);
  };

  // Get occupancy color
  const getOccupancyColor = (percentage) => {
    if (percentage === 100) return 'text-red-600';
    if (percentage >= 80) return 'text-orange-600';
    if (percentage >= 50) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Trip Management</h1>
          <p className="text-gray-600 mt-1">Schedule and manage your trips</p>
        </div>
        <button
          onClick={handleCreateNew}
          className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Create New Trip</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Trips</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.total}</p>
              <p className="text-xs text-gray-500 mt-1">All time</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Bus className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Trips</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.active}</p>
              <p className="text-xs text-gray-500 mt-1">In progress</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Play className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">KSh {stats.totalRevenue.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">Completed trips</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Passengers</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.totalPassengers}</p>
              <p className="text-xs text-gray-500 mt-1">Total served</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by route, vehicle, or driver..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Date Filter */}
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
            {filterDate && (
              <button
                onClick={() => setFilterDate('')}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Status Filter */}
          <div className="flex space-x-2 overflow-x-auto">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                filterStatus === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({stats.total})
            </button>
            <button
              onClick={() => setFilterStatus('scheduled')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                filterStatus === 'scheduled'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Scheduled ({stats.scheduled})
            </button>
            <button
              onClick={() => setFilterStatus('active')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                filterStatus === 'active'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Active ({stats.active})
            </button>
            <button
              onClick={() => setFilterStatus('completed')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
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

      {/* Trips Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Trip Details</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Vehicle & Driver</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Schedule</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Occupancy</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Fare</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrips.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-12 text-gray-500">
                    No trips found
                  </td>
                </tr>
              ) : (
                filteredTrips.map((trip) => {
                  const StatusIcon = getStatusIcon(trip.status);
                  const occupancy = getOccupancyPercentage(trip.bookedSeats, trip.capacity);
                  const occupancyColor = getOccupancyColor(occupancy);
                  
                  return (
                    <tr key={trip.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="bg-primary-100 p-2 rounded-lg">
                            <MapPin className="w-5 h-5 text-primary-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{trip.routeName}</p>
                            <p className="text-xs text-gray-500">Trip #{trip.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-gray-900">{trip.vehicleReg}</p>
                          <p className="text-xs text-gray-600">{trip.driverName}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2 text-sm text-gray-900">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span>{trip.departureDate}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-gray-600">
                            <Clock className="w-3 h-3 text-gray-400" />
                            <span>{trip.departureTime}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <p className={`text-sm font-semibold ${occupancyColor}`}>
                            {trip.bookedSeats}/{trip.capacity}
                          </p>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
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
                          <p className="text-xs text-gray-500 mt-1">{occupancy}% full</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-sm font-semibold text-gray-900">KSh {trip.fare.toLocaleString()}</p>
                        {trip.status === 'completed' && (
                          <p className="text-xs text-gray-500">
                            Revenue: KSh {(trip.fare * trip.bookedSeats).toLocaleString()}
                          </p>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <div className="relative group">
                          <button
                            className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center space-x-1 ${getStatusColor(trip.status)}`}
                          >
                            <StatusIcon className="w-3 h-3" />
                            <span className="capitalize">{trip.status}</span>
                          </button>
                          
                          {/* Status Change Dropdown */}
                          {trip.status !== 'completed' && trip.status !== 'cancelled' && (
                            <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 min-w-[140px]">
                              {trip.status === 'scheduled' && (
                                <button
                                  onClick={() => handleStatusChange(trip.id, 'active')}
                                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                                >
                                  <Play className="w-4 h-4 text-green-600" />
                                  <span>Start Trip</span>
                                </button>
                              )}
                              {trip.status === 'active' && (
                                <button
                                  onClick={() => handleStatusChange(trip.id, 'completed')}
                                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                                >
                                  <CheckCircle className="w-4 h-4 text-gray-600" />
                                  <span>Complete</span>
                                </button>
                              )}
                              <button
                                onClick={() => handleStatusChange(trip.id, 'cancelled')}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                              >
                                <XCircle className="w-4 h-4 text-red-600" />
                                <span>Cancel</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          {trip.status === 'scheduled' && (
                            <button
                              onClick={() => handleEdit(trip)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                              title="Edit Trip"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                          )}
                          {trip.status === 'scheduled' && trip.bookedSeats === 0 && (
                            <button
                              onClick={() => handleDelete(trip.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                              title="Delete Trip"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                          {trip.bookedSeats > 0 && (
                            <button
                              className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg transition"
                              title="View Bookings"
                            >
                              <Users className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Create/Edit Trip */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingTrip ? 'Edit Trip' : 'Create New Trip'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Route Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Route *
                </label>
                <select
                  value={formData.routeId}
                  onChange={(e) => {
                    const selectedRoute = routes.find(r => r.id === parseInt(e.target.value));
                    setFormData({ 
                      ...formData, 
                      routeId: e.target.value,
                      fare: selectedRoute ? selectedRoute.fare : ''
                    });
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                >
                  <option value="">Choose a route</option>
                  {routes.map(route => (
                    <option key={route.id} value={route.id}>
                      {route.name} - KSh {route.fare}
                    </option>
                  ))}
                </select>
              </div>

              {/* Vehicle and Driver Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Vehicle *
                  </label>
                  <select
                    value={formData.vehicleId}
                    onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  >
                    <option value="">Choose a vehicle</option>
                    {vehicles.map(vehicle => (
                      <option key={vehicle.id} value={vehicle.id}>
                        {vehicle.registrationNumber} ({vehicle.capacity} seats)
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Driver *
                  </label>
                  <select
                    value={formData.driverId}
                    onChange={(e) => setFormData({ ...formData, driverId: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  >
                    <option value="">Choose a driver</option>
                    {drivers.map(driver => (
                      <option key={driver.id} value={driver.id}>
                        {driver.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Departure Date *
                  </label>
                  <input
                    type="date"
                    value={formData.departureDate}
                    onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Departure Time *
                  </label>
                  <input
                    type="time"
                    value={formData.departureTime}
                    onChange={(e) => setFormData({ ...formData, departureTime: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              {/* Fare */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fare per Seat (KSh)
                </label>
                <input
                  type="number"
                  value={formData.fare}
                  onChange={(e) => setFormData({ ...formData, fare: parseInt(e.target.value) || '' })}
                  placeholder="Auto-filled from route"
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">Leave blank to use default route fare</p>
              </div>

              {/* Status (only show when editing) */}
              {editingTrip && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trip Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  >
                    <option value="scheduled">Scheduled</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              )}

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-semibold mb-1">Trip Creation Tips:</p>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>Ensure the vehicle and driver are available at the scheduled time</li>
                      <li>The fare is automatically set from the route, but you can override it</li>
                      <li>Trips can only be edited before they become active</li>
                      <li>Trips with bookings cannot be deleted, only cancelled</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition flex items-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>{editingTrip ? 'Update Trip' : 'Create Trip'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}