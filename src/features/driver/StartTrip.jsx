import { PlayCircle, MapPin, Users, Clock } from 'lucide-react';

export default function StartTrip() {
  const assignedTrips = [
    {
      id: 1,
      route: 'Nairobi - Mombasa',
      vehicle: 'KAB 123X',
      departureTime: '08:00',
      seatsBooked: 25,
      totalSeats: 30,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Start Trip</h1>
        <p className="text-gray-600 mt-1">Begin your scheduled journey</p>
      </div>

      <div className="grid gap-4">
        {assignedTrips.map(trip => (
          <div key={trip.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-900">{trip.route}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{trip.departureTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{trip.seatsBooked}/{trip.totalSeats} booked</span>
                  </div>
                </div>
              </div>
              <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center space-x-2">
                <PlayCircle className="w-5 h-5" />
                <span>Start Trip</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}