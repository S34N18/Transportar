import { useState, useEffect } from 'react';
import { MapPin, Navigation, Clock, User, Phone, AlertCircle, ChevronDown, ChevronUp, Bus, Target } from 'lucide-react';

export default function TrackBus() {
  // Mock user's upcoming trips (would come from API)
  const [myTrips] = useState([
    {
      id: 1,
      route: 'Nairobi - Mombasa',
      departureDate: '2025-11-23',
      departureTime: '08:00',
      vehicle: 'KAB 123X',
      driver: 'John Kamau',
      driverPhone: '0712345678',
      seats: [12, 13],
      status: 'active', // active, scheduled, completed
      currentLocation: {
        lat: -1.9536,
        lng: 37.8628,
        placeName: 'Near Emali',
      },
      progress: 45, // Percentage of trip completed
      eta: '15:30',
      distance: {
        covered: '216 km',
        remaining: '264 km',
        total: '480 km',
      },
      speed: '85 km/h',
      lastUpdate: '2 mins ago',
    },
    {
      id: 2,
      route: 'Nairobi - Kisumu',
      departureDate: '2025-11-25',
      departureTime: '10:30',
      vehicle: 'KBZ 456Y',
      driver: 'Mary Wanjiku',
      driverPhone: '0723456789',
      seats: [8],
      status: 'scheduled',
      currentLocation: {
        lat: -1.2864,
        lng: 36.8172,
        placeName: 'Nairobi CBD',
      },
      progress: 0,
      eta: '16:30',
      distance: {
        covered: '0 km',
        remaining: '350 km',
        total: '350 km',
      },
      speed: '0 km/h',
      lastUpdate: '5 mins ago',
    },
  ]);

  const [selectedTrip, setSelectedTrip] = useState(myTrips[0]);
  const [expandedDetails, setExpandedDetails] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshCounter, setRefreshCounter] = useState(0);

  // Simulate real-time updates
  useEffect(() => {
    if (autoRefresh && selectedTrip.status === 'active') {
      const interval = setInterval(() => {
        setRefreshCounter(prev => prev + 1);
        // In real app: fetch updated location from API
      }, 5000); // Update every 5 seconds

      return () => clearInterval(interval);
    }
  }, [autoRefresh, selectedTrip]);

  // Map route waypoints (simplified visualization)
  const routeWaypoints = [
    { name: 'Nairobi CBD', position: 0, passed: true },
    { name: 'Mlolongo', position: 15, passed: true },
    { name: 'Machakos', position: 25, passed: true },
    { name: 'Emali', position: 45, passed: false }, // Current location
    { name: 'Salama', position: 60, passed: false },
    { name: 'Voi', position: 75, passed: false },
    { name: 'Mariakani', position: 90, passed: false },
    { name: 'Mombasa Town', position: 100, passed: false },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Track Your Bus</h1>
        <p className="text-gray-600 mt-1">Real-time location tracking for your trips</p>
      </div>

      {/* Trip Selector */}
      {myTrips.length > 1 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Trip to Track</label>
          <select
            value={selectedTrip.id}
            onChange={(e) => setSelectedTrip(myTrips.find(t => t.id === parseInt(e.target.value)))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          >
            {myTrips.map(trip => (
              <option key={trip.id} value={trip.id}>
                {trip.route} - {trip.departureDate} at {trip.departureTime} ({trip.status})
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status Banner */}
          {selectedTrip.status === 'active' ? (
            <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4">
              <div className="flex items-start">
                <Navigation className="w-5 h-5 text-green-600 mt-0.5 mr-3" />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-green-900">Trip in Progress</h3>
                  <p className="text-sm text-green-700 mt-1">
                    Your bus is currently on the road. Estimated arrival: {selectedTrip.eta}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-blue-900">Scheduled Trip</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    This trip hasn't started yet. Tracking will begin at departure time.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Map Placeholder */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="relative aspect-video bg-gray-100">
              {/* Map would be rendered here using Leaflet or Google Maps */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-primary-600 mx-auto mb-4 animate-bounce" />
                  <p className="text-gray-700 font-semibold">Live Map View</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Current Location: {selectedTrip.currentLocation.placeName}
                  </p>
                  <p className="text-xs text-gray-400 mt-4">
                    Integrate with Leaflet or Google Maps API
                  </p>
                </div>
              </div>

              {/* Auto-refresh indicator */}
              {autoRefresh && selectedTrip.status === 'active' && (
                <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg px-3 py-2 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-700">Live</span>
                </div>
              )}

              {/* Current location marker */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center shadow-lg">
                    <Bus className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -inset-2 bg-primary-600 rounded-full animate-ping opacity-20"></div>
                </div>
              </div>
            </div>

            {/* Map Controls */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">{selectedTrip.currentLocation.placeName}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">Updated {selectedTrip.lastUpdate}</span>
                  </div>
                </div>
                <button
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    autoRefresh
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {autoRefresh ? 'Auto-refresh ON' : 'Auto-refresh OFF'}
                </button>
              </div>
            </div>
          </div>

          {/* Route Progress */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Route Progress</h3>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Progress</span>
                <span className="font-semibold text-gray-900">{selectedTrip.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-primary-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${selectedTrip.progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>{selectedTrip.distance.covered} covered</span>
                <span>{selectedTrip.distance.remaining} remaining</span>
              </div>
            </div>

            {/* Waypoints */}
            <div className="space-y-4">
              {routeWaypoints.map((waypoint, index) => {
                const isCurrent = waypoint.position === selectedTrip.progress;
                return (
                  <div key={index} className="flex items-center">
                    <div className="relative">
                      {waypoint.passed ? (
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <Target className="w-4 h-4 text-white" />
                        </div>
                      ) : isCurrent ? (
                        <div className="relative">
                          <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                            <Bus className="w-4 h-4 text-white" />
                          </div>
                          <div className="absolute -inset-1 bg-primary-600 rounded-full animate-ping opacity-30"></div>
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                        </div>
                      )}
                      {index < routeWaypoints.length - 1 && (
                        <div
                          className={`absolute top-8 left-1/2 -translate-x-1/2 w-0.5 h-8 ${
                            waypoint.passed ? 'bg-green-500' : 'bg-gray-200'
                          }`}
                        ></div>
                      )}
                    </div>
                    <div className="ml-4 flex-1">
                      <p
                        className={`font-medium ${
                          isCurrent ? 'text-primary-600' : waypoint.passed ? 'text-gray-900' : 'text-gray-500'
                        }`}
                      >
                        {waypoint.name}
                      </p>
                      {isCurrent && (
                        <p className="text-xs text-primary-600 mt-1">Current Location</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Trip Details Sidebar */}
        <div className="space-y-6">
          {/* Trip Info Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <button
              onClick={() => setExpandedDetails(!expandedDetails)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition"
            >
              <h3 className="text-lg font-bold text-gray-900">Trip Details</h3>
              {expandedDetails ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {expandedDetails && (
              <div className="p-4 pt-0 space-y-4">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Route</span>
                    <span className="font-semibold text-gray-900">{selectedTrip.route}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date</span>
                    <span className="font-semibold text-gray-900">{selectedTrip.departureDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Departure</span>
                    <span className="font-semibold text-gray-900">{selectedTrip.departureTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">ETA</span>
                    <span className="font-semibold text-gray-900">{selectedTrip.eta}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vehicle</span>
                    <span className="font-semibold text-gray-900">{selectedTrip.vehicle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Your Seat(s)</span>
                    <span className="font-semibold text-gray-900">{selectedTrip.seats.join(', ')}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">Driver Information</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="font-semibold text-gray-900">{selectedTrip.driver}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Phone className="w-3 h-3 text-gray-400" />
                      <a href={`tel:${selectedTrip.driverPhone}`} className="text-sm text-primary-600 hover:text-primary-700">
                        {selectedTrip.driverPhone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Live Stats */}
          {selectedTrip.status === 'active' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Live Stats</h3>
              
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-blue-600 mb-1">Current Speed</p>
                  <p className="text-3xl font-bold text-blue-900">{selectedTrip.speed}</p>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-green-600 mb-1">Distance Covered</p>
                  <p className="text-3xl font-bold text-green-900">{selectedTrip.distance.covered}</p>
                </div>

                <div className="bg-orange-50 rounded-lg p-4">
                  <p className="text-sm text-orange-600 mb-1">Distance Remaining</p>
                  <p className="text-3xl font-bold text-orange-900">{selectedTrip.distance.remaining}</p>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
            
            <div className="space-y-3">
              <button className="w-full px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold flex items-center justify-center space-x-2">
                <Phone className="w-5 h-5" />
                <span>Call Driver</span>
              </button>
              
              <button className="w-full px-4 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold flex items-center justify-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>Share Location</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}