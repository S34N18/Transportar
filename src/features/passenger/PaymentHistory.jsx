import { useState } from 'react';
import { CreditCard, Download, Search, Filter, CheckCircle, XCircle, Clock, Calendar, TrendingDown, TrendingUp, DollarSign, Receipt } from 'lucide-react';

export default function PaymentHistory() {
  // Mock payment transactions (would come from API)
  const [transactions] = useState([
    {
      id: 'PAY-2025-001',
      bookingId: 'BKG-2025-001',
      ticketId: 'TKT-001',
      route: 'Nairobi - Mombasa',
      amount: 3000,
      date: '2025-11-20',
      time: '14:35:22',
      method: 'M-Pesa',
      phoneNumber: '0712345678',
      transactionCode: 'QK4H7D8F2P',
      status: 'completed',
      seats: [12, 13],
      description: 'Ticket booking payment',
    },
    {
      id: 'PAY-2025-002',
      bookingId: 'BKG-2025-002',
      ticketId: 'TKT-002',
      route: 'Nairobi - Kisumu',
      amount: 1200,
      date: '2025-11-21',
      time: '09:15:45',
      method: 'M-Pesa',
      phoneNumber: '0712345678',
      transactionCode: 'QL5J8E9G3R',
      status: 'completed',
      seats: [8],
      description: 'Ticket booking payment',
    },
    {
      id: 'PAY-2025-003',
      bookingId: 'BKG-2025-003',
      ticketId: 'TKT-003',
      route: 'Nairobi - Nakuru',
      amount: 1200,
      date: '2025-11-18',
      time: '16:42:10',
      method: 'M-Pesa',
      phoneNumber: '0712345678',
      transactionCode: 'QM6K9F0H4S',
      status: 'completed',
      seats: [15, 16],
      description: 'Ticket booking payment',
    },
    {
      id: 'PAY-2025-004',
      bookingId: 'BKG-2025-004',
      ticketId: 'TKT-004',
      route: 'Nairobi - Mombasa',
      amount: 1500,
      date: '2025-11-17',
      time: '11:20:33',
      method: 'M-Pesa',
      phoneNumber: '0712345678',
      transactionCode: 'QN7L0G1J5T',
      status: 'refunded',
      seats: [5],
      description: 'Refund for cancelled booking',
    },
    {
      id: 'PAY-2025-005',
      bookingId: 'BKG-2025-005',
      ticketId: null,
      route: 'Nairobi - Eldoret',
      amount: 1000,
      date: '2025-11-15',
      time: '13:55:18',
      method: 'M-Pesa',
      phoneNumber: '0712345678',
      transactionCode: 'QO8M1H2K6U',
      status: 'failed',
      seats: null,
      description: 'Payment failed - insufficient funds',
    },
    {
      id: 'PAY-2025-006',
      bookingId: null,
      ticketId: null,
      route: null,
      amount: 500,
      date: '2025-11-14',
      time: '10:30:45',
      method: 'M-Pesa',
      phoneNumber: '0712345678',
      transactionCode: 'QP9N2J3L7V',
      status: 'pending',
      seats: null,
      description: 'Wallet top-up',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterMonth, setFilterMonth] = useState('all');
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Filter transactions
  const filteredTransactions = transactions.filter(txn => {
    const matchesSearch = !searchTerm || 
      txn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.transactionCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (txn.bookingId && txn.bookingId.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (txn.route && txn.route.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = filterStatus === 'all' || txn.status === filterStatus;
    
    const txnMonth = new Date(txn.date).toLocaleString('en-US', { month: 'long', year: 'numeric' });
    const matchesMonth = filterMonth === 'all' || txnMonth === filterMonth;
    
    return matchesSearch && matchesStatus && matchesMonth;
  });

  // Calculate stats
  const stats = {
    total: transactions.length,
    completed: transactions.filter(t => t.status === 'completed').length,
    refunded: transactions.filter(t => t.status === 'refunded').length,
    failed: transactions.filter(t => t.status === 'failed').length,
    totalSpent: transactions
      .filter(t => t.status === 'completed')
      .reduce((sum, t) => sum + t.amount, 0),
    totalRefunded: transactions
      .filter(t => t.status === 'refunded')
      .reduce((sum, t) => sum + t.amount, 0),
  };

  // Get unique months from transactions
  const months = ['all', ...new Set(transactions.map(t => 
    new Date(t.date).toLocaleString('en-US', { month: 'long', year: 'numeric' })
  ))];

  // Get status info
  const getStatusInfo = (status) => {
    const statusConfig = {
      completed: {
        label: 'Completed',
        color: 'bg-green-100 text-green-800',
        icon: CheckCircle,
      },
      refunded: {
        label: 'Refunded',
        color: 'bg-blue-100 text-blue-800',
        icon: TrendingDown,
      },
      failed: {
        label: 'Failed',
        color: 'bg-red-100 text-red-800',
        icon: XCircle,
      },
      pending: {
        label: 'Pending',
        color: 'bg-yellow-100 text-yellow-800',
        icon: Clock,
      },
    };
    return statusConfig[status] || statusConfig.pending;
  };

  // Download receipt
  const handleDownloadReceipt = (txn) => {
    alert(`Downloading receipt for ${txn.id}...\nThis would generate a PDF receipt.`);
  };

  // View transaction details
  const handleViewDetails = (txn) => {
    setSelectedTransaction(txn);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Payment History</h1>
        <p className="text-gray-600 mt-1">View all your transactions and receipts</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Payments</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.total}</p>
              <p className="text-xs text-gray-500 mt-1">All time</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Successful</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.completed}</p>
              <p className="text-xs text-gray-500 mt-1">Completed</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {(stats.totalSpent / 1000).toFixed(1)}K
              </p>
              <p className="text-xs text-gray-500 mt-1">KSh {stats.totalSpent.toLocaleString()}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Refunded</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {(stats.totalRefunded / 1000).toFixed(1)}K
              </p>
              <p className="text-xs text-gray-500 mt-1">{stats.refunded} transactions</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <TrendingDown className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by payment ID, transaction code, booking ID, or route..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Status Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Status:</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                    filterStatus === 'all'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterStatus('completed')}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                    filterStatus === 'completed'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Completed
                </button>
                <button
                  onClick={() => setFilterStatus('refunded')}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                    filterStatus === 'refunded'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Refunded
                </button>
                <button
                  onClick={() => setFilterStatus('failed')}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                    filterStatus === 'failed'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Failed
                </button>
              </div>
            </div>

            {/* Month Filter */}
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <select
                value={filterMonth}
                onChange={(e) => setFilterMonth(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              >
                {months.map(month => (
                  <option key={month} value={month}>
                    {month === 'all' ? 'All Months' : month}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold text-gray-900">{filteredTransactions.length}</span> transaction{filteredTransactions.length !== 1 ? 's' : ''}
        </p>
        {(searchTerm || filterStatus !== 'all' || filterMonth !== 'all') && (
          <button
            onClick={() => {
              setSearchTerm('');
              setFilterStatus('all');
              setFilterMonth('all');
            }}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Transactions List */}
      {filteredTransactions.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Receipt className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No transactions found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTransactions.map((txn) => {
            const statusInfo = getStatusInfo(txn.status);
            const StatusIcon = statusInfo.icon;

            return (
              <div
                key={txn.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  {/* Transaction Info */}
                  <div className="flex-1 space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-bold text-gray-900">
                            {txn.route || 'Wallet Top-up'}
                          </h3>
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center space-x-1 ${statusInfo.color}`}>
                            <StatusIcon className="w-3 h-3" />
                            <span>{statusInfo.label}</span>
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{txn.description}</p>
                      </div>
                    </div>

                    {/* Transaction Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Payment ID</p>
                        <p className="font-medium text-gray-900">{txn.id}</p>
                      </div>
                      {txn.bookingId && (
                        <div>
                          <p className="text-gray-600">Booking ID</p>
                          <p className="font-medium text-gray-900">{txn.bookingId}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-gray-600">M-Pesa Code</p>
                        <p className="font-medium text-gray-900">{txn.transactionCode}</p>
                      </div>
                    </div>

                    {/* Date & Time */}
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(txn.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{txn.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CreditCard className="w-4 h-4" />
                        <span>{txn.method}</span>
                      </div>
                    </div>

                    {/* Seats Info */}
                    {txn.seats && (
                      <div className="bg-gray-50 rounded-lg px-3 py-2 text-sm inline-block">
                        <span className="text-gray-600">Seat(s): </span>
                        <span className="font-medium text-gray-900">{txn.seats.join(', ')}</span>
                      </div>
                    )}
                  </div>

                  {/* Amount & Actions */}
                  <div className="flex flex-col items-end space-y-4 lg:min-w-[200px]">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Amount</p>
                      <p className={`text-3xl font-bold ${
                        txn.status === 'refunded' ? 'text-blue-600' :
                        txn.status === 'failed' ? 'text-red-600' :
                        'text-gray-900'
                      }`}>
                        KSh {txn.amount.toLocaleString()}
                      </p>
                      {txn.status === 'refunded' && (
                        <p className="text-xs text-blue-600 mt-1">Amount refunded</p>
                      )}
                    </div>

                    <div className="flex flex-col w-full space-y-2">
                      {txn.status === 'completed' && (
                        <>
                          <button
                            onClick={() => handleDownloadReceipt(txn)}
                            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold flex items-center justify-center space-x-2"
                          >
                            <Download className="w-4 h-4" />
                            <span>Receipt</span>
                          </button>
                          <button
                            onClick={() => handleViewDetails(txn)}
                            className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold"
                          >
                            View Details
                          </button>
                        </>
                      )}
                      {txn.status !== 'completed' && (
                        <button
                          onClick={() => handleViewDetails(txn)}
                          className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold"
                        >
                          View Details
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Transaction Details Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Transaction Details</h2>
                <button
                  onClick={() => setSelectedTransaction(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <XCircle className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Details */}
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Payment Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment ID</span>
                      <span className="font-medium text-gray-900">{selectedTransaction.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status</span>
                      <span className={`font-medium capitalize ${
                        selectedTransaction.status === 'completed' ? 'text-green-600' :
                        selectedTransaction.status === 'refunded' ? 'text-blue-600' :
                        selectedTransaction.status === 'failed' ? 'text-red-600' :
                        'text-yellow-600'
                      }`}>
                        {selectedTransaction.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date & Time</span>
                      <span className="font-medium text-gray-900">
                        {selectedTransaction.date} at {selectedTransaction.time}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Method</span>
                      <span className="font-medium text-gray-900">{selectedTransaction.method}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone Number</span>
                      <span className="font-medium text-gray-900">{selectedTransaction.phoneNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">M-Pesa Code</span>
                      <span className="font-medium text-gray-900">{selectedTransaction.transactionCode}</span>
                    </div>
                  </div>
                </div>

                {selectedTransaction.route && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Trip Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Route</span>
                        <span className="font-medium text-gray-900">{selectedTransaction.route}</span>
                      </div>
                      {selectedTransaction.bookingId && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Booking ID</span>
                          <span className="font-medium text-gray-900">{selectedTransaction.bookingId}</span>
                        </div>
                      )}
                      {selectedTransaction.ticketId && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Ticket ID</span>
                          <span className="font-medium text-gray-900">{selectedTransaction.ticketId}</span>
                        </div>
                      )}
                      {selectedTransaction.seats && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Seat(s)</span>
                          <span className="font-medium text-gray-900">{selectedTransaction.seats.join(', ')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="bg-primary-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Amount</span>
                    <span className="text-3xl font-bold text-primary-600">
                      KSh {selectedTransaction.amount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex space-x-3">
                {selectedTransaction.status === 'completed' && (
                  <button
                    onClick={() => handleDownloadReceipt(selectedTransaction)}
                    className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold flex items-center justify-center space-x-2"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download Receipt</span>
                  </button>
                )}
                <button
                  onClick={() => setSelectedTransaction(null)}
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