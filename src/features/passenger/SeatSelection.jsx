import { useState } from 'react';
import { ArrowLeft, User, Check, X, Armchair, Info, CreditCard } from 'lucide-react';

export default function SeatSelection() {
  // Mock trip data (would come from route params or props)
  const trip = {
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
  };

  // Mock booked seats (seats already taken by other passengers)
  const bookedSeats = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 30, 2, 4];

  // Generate seat layout (rows and columns)
  const generateSeats = (capacity) => {
    const seats = [];
    const seatsPerRow = 4; // 2 seats on each side of aisle
    const rows = Math.ceil(capacity / seatsPerRow);

    for (let row = 1; row <= rows; row++) {
      const rowSeats = [];
      for (let col = 1; col <= seatsPerRow; col++) {
        const seatNumber = (row - 1) * seatsPerRow + col;
        if (seatNumber <= capacity) {
          rowSeats.push({
            number: seatNumber,
            position: col <= 2 ? 'left' : 'right',
            isAisle: col === 2 || col === 3,
          });
        }
      }
      seats.push(rowSeats);
    }
    return seats;
  };

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const seatLayout = generateSeats(trip.capacity);

  // Handle seat selection
  const handleSeatClick = (seatNumber) => {
    // Check if seat is already booked
    if (bookedSeats.includes(seatNumber)) {
      return;
    }

    // Toggle seat selection
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatNumber));
    } else {
      // Limit to 5 seats per booking
      if (selectedSeats.length < 5) {
        setSelectedSeats([...selectedSeats, seatNumber]);
      } else {
        alert('Maximum 5 seats per booking');
      }
    }
  };

  // Get seat status
  const getSeatStatus = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) return 'booked';
    if (selectedSeats.includes(seatNumber)) return 'selected';
    return 'available';
  };

  // Get seat color classes
  const getSeatColor = (status) => {
    const colors = {
      available: 'bg-green-100 hover:bg-green-200 border-green-300 text-green-700 cursor-pointer',
      selected: 'bg-primary-600 border-primary-700 text-white cursor-pointer',
      booked: 'bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed',
    };
    return colors[status];
  };

  // Calculate total
  const totalAmount = selectedSeats.length * trip.fare;

  // Handle proceed to payment
  const handleProceedToPayment = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }
    setShowConfirmation(true);
  };

  // Handle confirm booking
  const handleConfirmBooking = () => {
    // In real app: navigate to payment page or trigger M-Pesa STK push
    alert(`Booking confirmed!\nSeats: ${selectedSeats.sort((a, b) => a - b).join(', ')}\nTotal: KSh ${totalAmount.toLocaleString()}\n\nProceeding to M-Pesa payment...`);
  };

  return (
    <div className="space-y-6">
      {/* Back Button & Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => window.history.back()}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Select Your Seat</h1>
          <p className="text-gray-600 mt-1">{trip.route} • {trip.departureDate} at {trip.departureTime}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Seat Map */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Choose Your Seat(s)</h2>
            
            {/* Legend */}
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-100 border-2 border-green-300 rounded flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-700" />
                </div>
                <span className="text-gray-700">Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-600 border-2 border-primary-700 rounded flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700">Selected</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-200 border-2 border-gray-300 rounded flex items-center justify-center">
                  <X className="w-4 h-4 text-gray-400" />
                </div>
                <span className="text-gray-700">Booked</span>
              </div>
            </div>
          </div>

          {/* Bus Front */}
          <div className="mb-4 flex justify-center">
            <div className="bg-gray-700 text-white px-6 py-2 rounded-t-full text-sm font-semibold">
              Driver
            </div>
          </div>

          {/* Seat Layout */}
          <div className="space-y-3">
            {seatLayout.map((row, rowIndex) => (
              <div key={rowIndex} className="flex items-center justify-center space-x-2">
                {/* Left side seats */}
                {row.filter(s => s.position === 'left').map((seat) => {
                  const status = getSeatStatus(seat.number);
                  return (
                    <button
                      key={seat.number}
                      onClick={() => handleSeatClick(seat.number)}
                      disabled={status === 'booked'}
                      className={`w-12 h-12 border-2 rounded flex items-center justify-center text-sm font-semibold transition ${getSeatColor(status)}`}
                      title={`Seat ${seat.number}`}
                    >
                      {seat.number}
                    </button>
                  );
                })}

                {/* Aisle */}
                <div className="w-8 flex items-center justify-center">
                  <div className="w-px h-10 bg-gray-300"></div>
                </div>

                {/* Right side seats */}
                {row.filter(s => s.position === 'right').map((seat) => {
                  const status = getSeatStatus(seat.number);
                  return (
                    <button
                      key={seat.number}
                      onClick={() => handleSeatClick(seat.number)}
                      disabled={status === 'booked'}
                      className={`w-12 h-12 border-2 rounded flex items-center justify-center text-sm font-semibold transition ${getSeatColor(status)}`}
                      title={`Seat ${seat.number}`}
                    >
                      {seat.number}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Info Note */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">Seat Selection Tips:</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>You can select up to 5 seats per booking</li>
                <li>Seats near the front have less vibration</li>
                <li>Window seats offer better views</li>
                <li>Click on a seat to select or deselect it</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Booking Summary */}
        <div className="space-y-6">
          {/* Trip Summary Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Trip Details</h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Route</span>
                <span className="font-semibold text-gray-900">{trip.route}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date</span>
                <span className="font-semibold text-gray-900">{trip.departureDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time</span>
                <span className="font-semibold text-gray-900">{trip.departureTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration</span>
                <span className="font-semibold text-gray-900">{trip.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Vehicle</span>
                <span className="font-semibold text-gray-900">{trip.vehicle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Driver</span>
                <span className="font-semibold text-gray-900">{trip.driver}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Fare per seat</span>
                <span className="font-semibold text-gray-900">KSh {trip.fare.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Selected Seats Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Selected Seats</h3>
            
            {selectedSeats.length === 0 ? (
              <div className="text-center py-6">
                <Armchair className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No seats selected yet</p>
              </div>
            ) : (
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedSeats.sort((a, b) => a - b).map(seat => (
                    <div
                      key={seat}
                      className="flex items-center space-x-2 bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-semibold"
                    >
                      <Armchair className="w-4 h-4" />
                      <span>Seat {seat}</span>
                      <button
                        onClick={() => handleSeatClick(seat)}
                        className="hover:text-primary-900"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Number of seats</span>
                    <span className="font-semibold text-gray-900">{selectedSeats.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price per seat</span>
                    <span className="font-semibold text-gray-900">KSh {trip.fare.toLocaleString()}</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200 flex justify-between">
                    <span className="font-semibold text-gray-900">Total Amount</span>
                    <span className="font-bold text-primary-600 text-lg">KSh {totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <button
            onClick={handleProceedToPayment}
            disabled={selectedSeats.length === 0}
            className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition font-semibold flex items-center justify-center space-x-2"
          >
            <CreditCard className="w-5 h-5" />
            <span>Proceed to Payment</span>
          </button>

          <button
            onClick={() => window.history.back()}
            className="w-full px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold"
          >
            Back to Trip Selection
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Confirm Your Booking</h2>
              
              <div className="space-y-3 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-2">Trip</p>
                  <p className="font-semibold text-gray-900">{trip.route}</p>
                  <p className="text-sm text-gray-600">{trip.departureDate} at {trip.departureTime}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-2">Selected Seats</p>
                  <p className="font-semibold text-gray-900">
                    {selectedSeats.sort((a, b) => a - b).join(', ')}
                  </p>
                  <p className="text-sm text-gray-600">{selectedSeats.length} seat(s)</p>
                </div>

                <div className="bg-primary-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="text-2xl font-bold text-primary-600">KSh {totalAmount.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  You will receive an M-Pesa payment prompt on your phone. Please complete the payment to confirm your booking.
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="flex-1 px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmBooking}
                  className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold"
                >
                  Confirm & Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}