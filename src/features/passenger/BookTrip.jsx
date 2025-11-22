import { useState } from 'react';
import { Bus, MapPin, Calendar, Clock, Users, Search, Filter, ArrowRight, AlertCircle } from 'lucide-react';

export default function BookTrip() {
  // Mock routes for search
  const routes = [
    'Nairobi - Mombasa',
    'Nairobi - Kisumu',
    'Nairobi - Nakuru',
    'Mombasa - Nairobi',
    'Kisumu - Nairobi',
    'Nakuru - Nairobi',
  ];

  // Mock available trips (would come from API)
  const [trips] = useState([
    {
      id: 1,
      route: 'Nairobi - Mombasa',
      startPoint: 'Nairobi CBD',
      endPoint: 'Mombasa Town',
      departureDate: '2025-11-23',
      departureTime: '08:00',
      arrivalTime: '16:00',
      duration: '8 hours',
      fare: 1500,
      vehicle: 'KAB 123X',
      vehicleModel: 'Toyota Hiace',
      capacity: 30,
      availableSeats: 12,
      driver: 'John Kamau',
      rating: 4.8,
    },
    {
      id: 2,
      route: 'Nairobi - Mombasa',
      startPoint: 'Nairobi CBD',
      endPoint: 'Mombasa Town',
      departureDate: '2025-11-23',
      departureTime: '14:00',
      arrivalTime: '22:00',
      duration: '8 hours',
      fare: 1500,
      vehicle: 'KCD 789Z',
      vehicleModel: 'Toyota Hiace',
      capacity: 30,
      availableSeats: 5,
      driver: 'Peter Ochieng',
      rating: 4.7,
    },
    {
      id: 3,
      route: 'Nairobi - Kisumu',
      startPoint: 'Nairobi CBD',
      endPoint: 'Kisumu Town',
      departureDate: '2025-11-23',
      departureTime: '10:30',
      arrivalTime: '16:30',
      duration: '6 hours',
      fare: 1200,
      vehicle: 'KBZ 456Y',
      vehicleModel: 'Nissan Caravan',
      capacity: 25,
      availableSeats: 18,
      driver: 'Mary Wanjiku',
      rating: 4.9,
    },
    {
      id: 4,
      route: 'Nairobi - Nakuru',
      startPoint: 'Nairobi CBD',
      endPoint: 'Nakuru Town',
      departureDate: '2025-11-23',
      departureTime: '06:00',
      arrivalTime: '09:00',
      duration: '3 hours',
      fare: 600,
      vehicle: 'KDA 321W',
      vehicleModel: 'Isuzu NQR',
      capacity: 35,
      availableSeats: 28,
      driver: 'Jane Akinyi',
      rating: 4.6,
    },
    {
      id: 5,
      route: 'Nairobi - Mombasa',
      startPoint: 'Nairobi CBD',
      endPoint: 'Mombasa Town',
      departureDate: '2025-11-24',
      departureTime: '08:00',
      arrivalTime: '16:00',
      duration: '8 hours',
      fare: 1500,
      vehicle: 'KAB 123X',
      vehicleModel: 'Toyota Hiace',
      capacity: 30,
      availableSeats: 30,
      driver: 'John Kamau',
      rating: 4.8,
    },
  ]);

  // Search filters
  const [filters, setFilters] = useState({
    route: '',
    date: '',
    searchTerm: '',
  });

  const [_selectedTrip, setSelectedTrip] = useState(null);

  // Filter trips based on search criteria
  const filteredTrips = trips.filter(trip => {
    const matchesRoute = !filters.route || trip.route === filters.route;
    const matchesDate = !filters.date || trip.departureDate === filters.date;
    const matchesSearch = !filters.searchTerm || 
      trip.route.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      trip.startPoint.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      trip.endPoint.toLowerCase().includes(filters.searchTerm.toLowerCase());
    
    return matchesRoute && matchesDate && matchesSearch;
  });

  // Get availability color
  const getAvailabilityColor = (available, capacity) => {
    const percentage = (available / capacity) * 100;
    if (percentage > 50) return 'text-green-600';
    if (percentage > 20) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Get availability text
  const getAvailabilityText = (available, capacity) => {
    const percentage = (available / capacity) * 100;
    if (percentage > 50) return 'Good availability';
    if (percentage > 20) return 'Limited seats';
    if (available > 0) return 'Almost full';
    return 'Fully booked';
  };

  // Handle book trip
  const handleBookTrip = (trip) => {
    setSelectedTrip(trip);
    // In real app: navigate('/passenger/book-trip/' + trip.id) or open modal
    alert(`Selected trip: ${trip.route} at ${trip.departureTime}\nProceed to seat selection...`);
  };

  // Clear filters
  const clearFilters = () => {
    setFilters({
      route: '',
      date: '',
      searchTerm: '',
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Book a Trip</h1>
        <p className="text-gray-600 mt-1">Find and book your next journey</p>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Bar */}
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Destination
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={filters.searchTerm}
                onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
                placeholder="Search by route, start point, or destination..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Route Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Route
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={filters.route}
                onChange={(e) => setFilters({ ...filters, route: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none appearance-none"
              >
                <option value="">All Routes</option>
                {routes.map((route, index) => (
                  <option key={index} value={route}>{route}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Date Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Travel Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={filters.date}
                onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Clear Filters */}
          <div className="flex items-end">
            <button
              onClick={clearFilters}
              className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex items-center justify-center space-x-2"
            >
              <Filter className="w-5 h-5" />
              <span>Clear Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Found <span className="font-semibold text-gray-900">{filteredTrips.length}</span> available trip{filteredTrips.length !== 1 ? 's' : ''}
        </p>
        {(filters.route || filters.date || filters.searchTerm) && (
          <button
            onClick={clearFilters}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Trips List */}
      {filteredTrips.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Bus className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No trips found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search filters</p>
          <button
            onClick={clearFilters}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTrips.map((trip) => {
            const availabilityColor = getAvailabilityColor(trip.availableSeats, trip.capacity);
            const availabilityText = getAvailabilityText(trip.availableSeats, trip.capacity);
            const isFullyBooked = trip.availableSeats === 0;

            return (
              <div
                key={trip.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  {/* Trip Details */}
                  <div className="flex-1 space-y-4">
                    {/* Route Info */}
                    <div className="flex items-center space-x-3">
                      <div className="bg-primary-100 p-2 rounded-lg">
                        <MapPin className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{trip.route}</h3>
                        <p className="text-sm text-gray-600">
                          {trip.startPoint} → {trip.endPoint}
                        </p>
                      </div>
                    </div>

                    {/* Time & Date Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{new Date(trip.departureDate).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{trip.departureTime} - {trip.arrivalTime}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Bus className="w-4 h-4 text-gray-400" />
                        <span>{trip.duration}</span>
                      </div>
                    </div>

                    {/* Vehicle & Driver Info */}
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-600">Vehicle:</span>
                        <span className="font-medium text-gray-900">{trip.vehicle}</span>
                        <span className="text-gray-500">({trip.vehicleModel})</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-600">Driver:</span>
                        <span className="font-medium text-gray-900">{trip.driver}</span>
                        <div className="flex items-center space-x-1">
                          <span className="text-yellow-500">★</span>
                          <span className="font-medium text-gray-900">{trip.rating}</span>
                        </div>
                      </div>
                    </div>

                    {/* Availability */}
                    <div className="flex items-center space-x-2">
                      <Users className={`w-4 h-4 ${availabilityColor}`} />
                      <span className={`text-sm font-semibold ${availabilityColor}`}>
                        {trip.availableSeats} / {trip.capacity} seats available
                      </span>
                      <span className="text-xs text-gray-500">• {availabilityText}</span>
                    </div>
                  </div>

                  {/* Fare & Book Button */}
                  <div className="flex flex-col items-end space-y-4 lg:min-w-[200px]">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Fare per seat</p>
                      <p className="text-3xl font-bold text-gray-900">KSh {trip.fare.toLocaleString()}</p>
                    </div>

                    {isFullyBooked ? (
                      <div className="w-full px-6 py-3 bg-gray-100 text-gray-500 rounded-lg text-center font-semibold flex items-center justify-center space-x-2">
                        <AlertCircle className="w-5 h-5" />
                        <span>Fully Booked</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleBookTrip(trip)}
                        className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold flex items-center justify-center space-x-2"
                      >
                        <span>Select Trip</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}