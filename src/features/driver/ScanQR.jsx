import { useState } from 'react';
import { Camera, X, CheckCircle, XCircle, User, MapPin, Calendar, Clock, AlertCircle, Scan, ArrowLeft } from 'lucide-react';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function QRScanner() {
  const [scanning, setScanning] = useState(false);
  const [scannedTicket, setScannedTicket] = useState(null);
  const [scanHistory, setScanHistory] = useState([]);
  const [manualTicketId, setManualTicketId] = useState('');

  // Mock current trip data (would come from driver's active trip)
  const currentTrip = {
    id: 1,
    route: 'Nairobi - Mombasa',
    departureDate: '2025-11-23',
    departureTime: '08:00',
    vehicle: 'KAB 123X',
    totalSeats: 30,
    bookedSeats: 28,
  };

  // Mock ticket database (would come from API)
  const ticketDatabase = {
    'QR-TKT-001-2025': {
      id: 'TKT-001',
      bookingId: 'BKG-2025-001',
      passengerName: 'John Doe',
      passengerPhone: '0712345678',
      route: 'Nairobi - Mombasa',
      departureDate: '2025-11-23',
      departureTime: '08:00',
      seats: [12, 13],
      totalAmount: 3000,
      status: 'confirmed',
      tripId: 1,
      verified: false,
      qrCode: 'QR-TKT-001-2025',
    },
    'QR-TKT-002-2025': {
      id: 'TKT-002',
      bookingId: 'BKG-2025-002',
      passengerName: 'Jane Smith',
      passengerPhone: '0723456789',
      route: 'Nairobi - Kisumu',
      departureDate: '2025-11-25',
      departureTime: '10:30',
      seats: [8],
      totalAmount: 1200,
      status: 'confirmed',
      tripId: 2,
      verified: false,
      qrCode: 'QR-TKT-002-2025',
    },
    'QR-TKT-003-2025': {
      id: 'TKT-003',
      bookingId: 'BKG-2025-003',
      passengerName: 'Michael Johnson',
      passengerPhone: '0734567890',
      route: 'Nairobi - Mombasa',
      departureDate: '2025-11-23',
      departureTime: '08:00',
      seats: [15, 16],
      totalAmount: 3000,
      status: 'confirmed',
      tripId: 1,
      verified: true,
      qrCode: 'QR-TKT-003-2025',
    },
  };

  // Simulate QR scan
//   const handleStartScan = () => {
//     setScanning(true);
//     // Simulate camera opening and QR detection
//     setTimeout(() => {
//       // Simulate scanning a QR code after 2 seconds
//       const mockQRCode = 'QR-TKT-001-2025'; // Simulated scan result
//       handleQRCodeDetected(mockQRCode);
//     }, 2000);
//   };
const scanner = new Html5QrcodeScanner(
  "qr-reader",
  { fps: 10, qrbox: 250 },
  false
);

const onScanSuccess = (decodedText, decodedResult) => {
  // Handle the scanned QR code
  handleQRCodeDetected(decodedText);
};

const onScanError = (errorMessage) => {
  // Handle scan error if needed
};

scanner.render(onScanSuccess, onScanError);


  // Handle QR code detected
  const handleQRCodeDetected = (qrCode) => {
    setScanning(false);
    verifyTicket(qrCode);
  };

  // Verify ticket
  const verifyTicket = (qrCode) => {
    const ticket = ticketDatabase[qrCode];

    if (!ticket) {
      setScannedTicket({
        valid: false,
        error: 'Invalid QR Code',
        message: 'This ticket does not exist in our system.',
      });
      return;
    }

    // Check if ticket is for current trip
    if (ticket.tripId !== currentTrip.id) {
      setScannedTicket({
        valid: false,
        error: 'Wrong Trip',
        message: `This ticket is for ${ticket.route} on ${ticket.departureDate} at ${ticket.departureTime}`,
        ticket,
      });
      return;
    }

    // Check if ticket is cancelled
    if (ticket.status === 'cancelled') {
      setScannedTicket({
        valid: false,
        error: 'Ticket Cancelled',
        message: 'This ticket has been cancelled.',
        ticket,
      });
      return;
    }

    // Check if already verified
    if (ticket.verified) {
      setScannedTicket({
        valid: false,
        error: 'Already Verified',
        message: 'This ticket has already been scanned and verified.',
        ticket,
      });
      return;
    }

    // Valid ticket
    setScannedTicket({
      valid: true,
      ticket,
    });
  };

  // Confirm boarding
  const handleConfirmBoarding = () => {
    if (scannedTicket && scannedTicket.valid) {
      // Mark ticket as verified
      const ticket = scannedTicket.ticket;
      ticket.verified = true;
      ticket.verifiedAt = new Date().toLocaleTimeString();

      // Add to scan history
      setScanHistory([
        {
          ...ticket,
          scannedAt: new Date().toLocaleTimeString(),
          valid: true,
        },
        ...scanHistory,
      ]);

      // Reset
      setScannedTicket(null);
      alert(`Boarding confirmed for ${ticket.passengerName}\nSeat(s): ${ticket.seats.join(', ')}`);
    }
  };

  // Manual ticket entry
  const handleManualEntry = () => {
    if (!manualTicketId.trim()) {
      alert('Please enter a ticket ID');
      return;
    }

    // Find ticket by ID
    const ticket = Object.values(ticketDatabase).find(
      t => t.id === manualTicketId || t.bookingId === manualTicketId
    );

    if (ticket) {
      verifyTicket(ticket.qrCode);
      setManualTicketId('');
    } else {
      setScannedTicket({
        valid: false,
        error: 'Ticket Not Found',
        message: 'No ticket found with this ID.',
      });
      setManualTicketId('');
    }
  };

  // Calculate stats
  const stats = {
    scanned: scanHistory.filter(s => s.valid).length,
    remaining: currentTrip.bookedSeats - scanHistory.filter(s => s.valid).length,
    capacity: currentTrip.totalSeats,
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
          <h1 className="text-3xl font-bold text-gray-900">Scan Tickets</h1>
          <p className="text-gray-600 mt-1">Verify passenger QR codes</p>
        </div>
      </div>

      {/* Current Trip Info */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">Current Trip</h2>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>{currentTrip.route}</span>
              </div>
              <div className="flex items-center space-x-4 text-sm opacity-90">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{currentTrip.departureDate}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{currentTrip.departureTime}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-90">Vehicle</p>
            <p className="text-2xl font-bold">{currentTrip.vehicle}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Scanned</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{stats.scanned}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Remaining</p>
              <p className="text-3xl font-bold text-orange-600 mt-2">{stats.remaining}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-orange-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Capacity</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.capacity}</p>
            </div>
            <User className="w-8 h-8 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scanner Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Scan QR Code</h3>

          {/* Camera View / Scan Button */}
          {!scanning && !scannedTicket && (
            <div className="space-y-4">
              <button
                onClick={handleStartScan}
                className="w-full aspect-square bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex flex-col items-center justify-center hover:from-primary-200 hover:to-primary-300 transition cursor-pointer border-2 border-dashed border-primary-400"
              >
                <Camera className="w-16 h-16 text-primary-600 mb-4" />
                <p className="text-primary-700 font-semibold">Tap to Scan QR Code</p>
                <p className="text-primary-600 text-sm mt-2">Camera will open automatically</p>
              </button>

              {/* Manual Entry */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-700 mb-2">Manual Ticket Entry</p>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={manualTicketId}
                    onChange={(e) => setManualTicketId(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleManualEntry()}
                    placeholder="Enter Ticket ID or Booking ID"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                  <button
                    onClick={handleManualEntry}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                  >
                    Verify
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Scanning Animation */}
          {scanning && (
            <div className="aspect-square bg-black rounded-xl flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 border-4 border-green-500 rounded-lg relative">
                  {/* Scanning line animation */}
                  <div className="absolute inset-x-0 top-0 h-1 bg-green-500 animate-pulse"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Scan className="w-32 h-32 text-green-500 animate-pulse" />
                  </div>
                </div>
              </div>
              <p className="text-white mt-80">Scanning for QR code...</p>
              <button
                onClick={() => setScanning(false)}
                className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Cancel
              </button>
            </div>
          )}

          {/* Scan Result */}
          {scannedTicket && (
            <div className="space-y-4">
              {scannedTicket.valid ? (
                /* Valid Ticket */
                <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-green-500 rounded-full p-3">
                      <CheckCircle className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-green-900 text-center mb-4">Valid Ticket</h3>

                  <div className="bg-white rounded-lg p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Passenger</span>
                      <span className="font-semibold text-gray-900">{scannedTicket.ticket.passengerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone</span>
                      <span className="font-semibold text-gray-900">{scannedTicket.ticket.passengerPhone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Seat(s)</span>
                      <span className="font-semibold text-gray-900">{scannedTicket.ticket.seats.join(', ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ticket ID</span>
                      <span className="font-semibold text-gray-900">{scannedTicket.ticket.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Booking ID</span>
                      <span className="font-semibold text-gray-900">{scannedTicket.ticket.bookingId}</span>
                    </div>
                  </div>

                  <div className="flex space-x-3 mt-4">
                    <button
                      onClick={handleConfirmBoarding}
                      className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
                    >
                      Confirm Boarding
                    </button>
                    <button
                      onClick={() => setScannedTicket(null)}
                      className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                /* Invalid Ticket */
                <div className="bg-red-50 border-2 border-red-500 rounded-xl p-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-red-500 rounded-full p-3">
                      <XCircle className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-red-900 text-center mb-2">{scannedTicket.error}</h3>
                  <p className="text-red-700 text-center mb-4">{scannedTicket.message}</p>

                  {scannedTicket.ticket && (
                    <div className="bg-white rounded-lg p-4 mb-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Passenger</span>
                        <span className="font-medium text-gray-900">{scannedTicket.ticket.passengerName}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Ticket ID</span>
                        <span className="font-medium text-gray-900">{scannedTicket.ticket.id}</span>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => setScannedTicket(null)}
                    className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Scan History */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Scan History</h3>

          {scanHistory.length === 0 ? (
            <div className="text-center py-12">
              <Scan className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No tickets scanned yet</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {scanHistory.map((scan, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-gray-900">{scan.passengerName}</p>
                      <p className="text-sm text-gray-600">{scan.passengerPhone}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-xs text-green-600 font-medium">Verified</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Seat(s): <span className="font-medium text-gray-900">{scan.seats.join(', ')}</span></span>
                    <span className="text-gray-500">{scan.scannedAt}</span>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    {scan.id} • {scan.bookingId}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}