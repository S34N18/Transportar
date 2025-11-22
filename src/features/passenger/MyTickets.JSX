import { useState } from 'react';
import { Ticket, QrCode, Download, MapPin, Calendar, Clock, User, Phone, CheckCircle, XCircle, AlertCircle, Filter, Search } from 'lucide-react';

export default function MyTickets() {
  // Mock tickets data (would come from API)
  const [tickets] = useState([
    {
      id: 'TKT-001',
      bookingId: 'BKG-2025-001',
      route: 'Nairobi - Mombasa',
      startPoint: 'Nairobi CBD',
      endPoint: 'Mombasa Town',
      departureDate: '2025-11-23',
      departureTime: '08:00',
      arrivalTime: '16:00',
      seats: [12, 13],
      fare: 1500,
      totalAmount: 3000,
      vehicle: 'KAB 123X',
      vehicleModel: 'Toyota Hiace',
      driver: 'John Kamau',
      driverPhone: '0712345678',
      status: 'confirmed',
      bookingDate: '2025-11-20',
      paymentStatus: 'paid',
      qrCode: 'QR-TKT-001-2025',
    },
    {
      id: 'TKT-002',
      bookingId: 'BKG-2025-002',
      route: 'Nairobi - Kisumu',
      startPoint: 'Nairobi CBD',
      endPoint: 'Kisumu Town',
      departureDate: '2025-11-25',
      departureTime: '10:30',
      arrivalTime: '16:30',
      seats: [8],
      fare: 1200,
      totalAmount: 1200,
      vehicle: 'KBZ 456Y',
      vehicleModel: 'Nissan Caravan',
      driver: 'Mary Wanjiku',
      driverPhone: '0723456789',
      status: 'confirmed',
      bookingDate: '2025-11-21',
      paymentStatus: 'paid',
      qrCode: 'QR-TKT-002-2025',
    },
    {
      id: 'TKT-003',
      bookingId: 'BKG-2025-003',
      route: 'Nairobi - Nakuru',
      startPoint: 'Nairobi CBD',
      endPoint: 'Nakuru Town',
      departureDate: '2025-11-19',
      departureTime: '06:00',
      arrivalTime: '09:00',
      seats: [15, 16],
      fare: 600,
      totalAmount: 1200,
      vehicle: 'KDA 321W',
      vehicleModel: 'Isuzu NQR',
      driver: 'Jane Akinyi',
      driverPhone: '0745678901',
      status: 'completed',
      bookingDate: '2025-11-18',
      paymentStatus: 'paid',
      qrCode: 'QR-TKT-003-2025',
    },
    {
      id: 'TKT-004',
      bookingId: 'BKG-2025-004',
      route: 'Nairobi - Mombasa',
      startPoint: 'Nairobi CBD',
      endPoint: 'Mombasa Town',
      departureDate: '2025-11-18',
      departureTime: '14:00',
      arrivalTime: '22:00',
      seats: [5],
      fare: 1500,
      totalAmount: 1500,
      vehicle: 'KCD 789Z',
      vehicleModel: 'Toyota Hiace',
      driver: 'Peter Ochieng',
      driverPhone: '0734567890',
      status: 'cancelled',
      bookingDate: '2025-11-17',
      paymentStatus: 'refunded',
      qrCode: 'QR-TKT-004-2025',
    },
  ]);

  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Filter tickets
  const filteredTickets = tickets.filter(ticket => {
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    const matchesSearch = !searchTerm || 
      ticket.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  // Get status info
  const getStatusInfo = (status) => {
    const statusConfig = {
      confirmed: {
        label: 'Confirmed',
        color: 'bg-green-100 text-green-800',
        icon: CheckCircle,
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
      pending: {
        label: 'Pending Payment',
        color: 'bg-yellow-100 text-yellow-800',
        icon: AlertCircle,
      },
    };
    return statusConfig[status] || statusConfig.confirmed;
  };

  // Calculate stats
  const stats = {
    upcoming: tickets.filter(t => t.status === 'confirmed').length,
    completed: tickets.filter(t => t.status === 'completed').length,
    cancelled: tickets.filter(t => t.status === 'cancelled').length,
    total: tickets.length,
  };

  // Check if trip is upcoming
  const isUpcoming = (ticket) => {
    const today = new Date();
    const tripDate = new Date(ticket.departureDate);
    return tripDate >= today && ticket.status === 'confirmed';
  };

  // Download ticket
  const handleDownloadTicket = (ticket) => {
    alert(`Downloading ticket ${ticket.id}...\nThis would generate a PDF with QR code for offline use.`);
  };

  // View ticket details
  const handleViewTicket = (ticket) => {
    setSelectedTicket(ticket);
  };

  // Generate QR code placeholder
  const generateQRPlaceholder = (qrData) => {
    // In real app, use a QR code library like 'qrcode.react'
    return (
      <div className="w-48 h-48 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-2" />
          <p className="text-xs text-gray-500">{qrData}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Tickets</h1>
        <p className="text-gray-600 mt-1">View and manage your bookings</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Upcoming</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.upcoming}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Ticket className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.completed}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Cancelled</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.cancelled}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.total}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Ticket className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by booking ID, ticket ID, or route..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Status Filter */}
          <div className="flex space-x-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filterStatus === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({tickets.length})
            </button>
            <button
              onClick={() => setFilterStatus('confirmed')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filterStatus === 'confirmed'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Upcoming ({stats.upcoming})
            </button>
            <button
              onClick={() => setFilterStatus('completed')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filterStatus === 'completed'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Completed ({stats.completed})
            </button>
          </div>
        </div>
      </div>

      {/* Tickets List */}
      {filteredTickets.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Ticket className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No tickets found</h3>
          <p className="text-gray-600 mb-4">You don't have any bookings yet</p>
          <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">
            Book a Trip
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTickets.map((ticket) => {
            const statusInfo = getStatusInfo(ticket.status);
            const StatusIcon = statusInfo.icon;
            const upcoming = isUpcoming(ticket);

            return (
              <div
                key={ticket.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  {/* Ticket Details */}
                  <div className="flex-1 space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{ticket.route}</h3>
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center space-x-1 ${statusInfo.color}`}>
                            <StatusIcon className="w-3 h-3" />
                            <span>{statusInfo.label}</span>
                          </span>
                          {upcoming && (
                            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                              Upcoming
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>Booking ID: {ticket.bookingId}</span>
                          <span>•</span>
                          <span>Ticket ID: {ticket.id}</span>
                        </div>
                      </div>
                    </div>

                    {/* Trip Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2 text-sm">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{ticket.startPoint} → {ticket.endPoint}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{new Date(ticket.departureDate).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{ticket.departureTime} - {ticket.arrivalTime}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Seats: {ticket.seats.join(', ')}</span>
                      </div>
                    </div>

                    {/* Vehicle & Driver */}
                    <div className="bg-gray-50 rounded-lg p-3 text-sm">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div>
                          <span className="text-gray-600">Vehicle: </span>
                          <span className="font-medium text-gray-900">{ticket.vehicle} ({ticket.vehicleModel})</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Driver: </span>
                          <span className="font-medium text-gray-900">{ticket.driver}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Amount */}
                  <div className="flex flex-col items-end space-y-4 lg:min-w-[200px]">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Total Amount</p>
                      <p className="text-2xl font-bold text-gray-900">KSh {ticket.totalAmount.toLocaleString()}</p>
                      <p className="text-xs text-gray-500 mt-1">{ticket.seats.length} seat(s) × KSh {ticket.fare.toLocaleString()}</p>
                    </div>

                    <div className="flex flex-col w-full space-y-2">
                      <button
                        onClick={() => handleViewTicket(ticket)}
                        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold flex items-center justify-center space-x-2"
                      >
                        <QrCode className="w-4 h-4" />
                        <span>View QR Code</span>
                      </button>
                      <button
                        onClick={() => handleDownloadTicket(ticket)}
                        className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold flex items-center justify-center space-x-2"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Ticket Detail Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Ticket Details</h2>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <XCircle className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* QR Code */}
              <div className="flex justify-center mb-6">
                {generateQRPlaceholder(selectedTicket.qrCode)}
              </div>

              {/* Ticket Info */}
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Trip Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Route</span>
                      <span className="font-medium text-gray-900">{selectedTicket.route}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date</span>
                      <span className="font-medium text-gray-900">{selectedTicket.departureDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Departure Time</span>
                      <span className="font-medium text-gray-900">{selectedTicket.departureTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Seat(s)</span>
                      <span className="font-medium text-gray-900">{selectedTicket.seats.join(', ')}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Booking Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Booking ID</span>
                      <span className="font-medium text-gray-900">{selectedTicket.bookingId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ticket ID</span>
                      <span className="font-medium text-gray-900">{selectedTicket.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Booked On</span>
                      <span className="font-medium text-gray-900">{selectedTicket.bookingDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Status</span>
                      <span className="font-medium text-green-600 capitalize">{selectedTicket.paymentStatus}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-primary-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Amount Paid</span>
                    <span className="text-2xl font-bold text-primary-600">KSh {selectedTicket.totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800 font-semibold mb-2">Important:</p>
                <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
                  <li>Present this QR code to the driver when boarding</li>
                  <li>Arrive at least 15 minutes before departure</li>
                  <li>Carry a valid ID for verification</li>
                  <li>Download ticket for offline access</li>
                </ul>
              </div>

              {/* Actions */}
              <div className="mt-6 flex space-x-3">
                <button
                  onClick={() => handleDownloadTicket(selectedTicket)}
                  className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold flex items-center justify-center space-x-2"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Ticket</span>
                </button>
                <button
                  onClick={() => setSelectedTicket(null)}
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