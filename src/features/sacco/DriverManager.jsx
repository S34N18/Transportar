import { useState } from 'react';
import { Users, Plus, Edit2, Trash2, Search, X, Save, Phone, Mail, Award, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function DriverManager() {
  // Mock vehicles data (would come from VehicleManager in real app)
  const vehicles = [
    { id: 1, registrationNumber: 'KAB 123X', model: 'Toyota Hiace' },
    { id: 2, registrationNumber: 'KBZ 456Y', model: 'Nissan Caravan' },
    { id: 3, registrationNumber: 'KCD 789Z', model: 'Toyota Hiace' },
    { id: 4, registrationNumber: 'KDA 321W', model: 'Isuzu NQR' },
    { id: 5, registrationNumber: 'KEB 654V', model: 'Toyota Coaster' },
  ];

  // State management
  const [drivers, setDrivers] = useState([
    {
      id: 1,
      name: 'John Kamau',
      phone: '0712345678',
      email: 'john.kamau@email.com',
      licenseNumber: 'DL-12345-2020',
      licenseExpiry: '2026-12-31',
      vehicleId: 1,
      vehicleReg: 'KAB 123X',
      status: 'active',
      rating: 4.8,
      totalTrips: 245,
      joinDate: '2022-03-15',
      nationalId: '12345678',
    },
    {
      id: 2,
      name: 'Mary Wanjiku',
      phone: '0723456789',
      email: 'mary.wanjiku@email.com',
      licenseNumber: 'DL-23456-2019',
      licenseExpiry: '2025-08-20',
      vehicleId: 2,
      vehicleReg: 'KBZ 456Y',
      status: 'active',
      rating: 4.9,
      totalTrips: 312,
      joinDate: '2021-06-10',
      nationalId: '23456789',
    },
    {
      id: 3,
      name: 'Peter Ochieng',
      phone: '0734567890',
      email: 'peter.ochieng@email.com',
      licenseNumber: 'DL-34567-2021',
      licenseExpiry: '2027-03-15',
      vehicleId: 3,
      vehicleReg: 'KCD 789Z',
      status: 'active',
      rating: 4.7,
      totalTrips: 189,
      joinDate: '2023-01-20',
      nationalId: '34567890',
    },
    {
      id: 4,
      name: 'Jane Akinyi',
      phone: '0745678901',
      email: 'jane.akinyi@email.com',
      licenseNumber: 'DL-45678-2020',
      licenseExpiry: '2026-06-30',
      vehicleId: null,
      vehicleReg: 'Unassigned',
      status: 'inactive',
      rating: 4.6,
      totalTrips: 156,
      joinDate: '2022-09-05',
      nationalId: '45678901',
    },
    {
      id: 5,
      name: 'David Mwangi',
      phone: '0756789012',
      email: 'david.mwangi@email.com',
      licenseNumber: 'DL-56789-2022',
      licenseExpiry: '2028-01-10',
      vehicleId: null,
      vehicleReg: 'Unassigned',
      status: 'suspended',
      rating: 3.8,
      totalTrips: 78,
      joinDate: '2024-02-14',
      nationalId: '56789012',
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    licenseNumber: '',
    licenseExpiry: '',
    vehicleId: '',
    status: 'active',
    nationalId: '',
    joinDate: new Date().toISOString().split('T')[0],
  });

  // Filter drivers based on search and status
  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = 
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.phone.includes(searchTerm) ||
      driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || driver.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate stats
  const stats = {
    total: drivers.length,
    active: drivers.filter(d => d.status === 'active').length,
    inactive: drivers.filter(d => d.status === 'inactive').length,
    suspended: drivers.filter(d => d.status === 'suspended').length,
    unassigned: drivers.filter(d => !d.vehicleId).length,
    avgRating: (drivers.reduce((sum, d) => sum + d.rating, 0) / drivers.length).toFixed(1),
  };

  // Open modal for creating new driver
  const handleCreateNew = () => {
    setEditingDriver(null);
    setFormData({
      name: '',
      phone: '',
      email: '',
      licenseNumber: '',
      licenseExpiry: '',
      vehicleId: '',
      status: 'active',
      nationalId: '',
      joinDate: new Date().toISOString().split('T')[0],
    });
    setShowModal(true);
  };

  // Open modal for editing existing driver
  const handleEdit = (driver) => {
    setEditingDriver(driver);
    setFormData({ ...driver });
    setShowModal(true);
  };

  // Save driver (create or update)
  const handleSave = () => {
    if (!formData.name || !formData.phone || !formData.licenseNumber) {
      alert('Please fill in all required fields');
      return;
    }

    // Get vehicle registration from vehicleId
    const selectedVehicle = vehicles.find(v => v.id === parseInt(formData.vehicleId));
    const vehicleReg = selectedVehicle ? selectedVehicle.registrationNumber : 'Unassigned';

    if (editingDriver) {
      // Update existing driver
      setDrivers(drivers.map(d => 
        d.id === editingDriver.id 
          ? { 
              ...formData, 
              id: d.id, 
              vehicleReg, 
              vehicleId: formData.vehicleId ? parseInt(formData.vehicleId) : null,
              rating: d.rating,
              totalTrips: d.totalTrips,
            }
          : d
      ));
    } else {
      // Create new driver
      const newDriver = {
        ...formData,
        id: Math.max(...drivers.map(d => d.id)) + 1,
        vehicleReg,
        vehicleId: formData.vehicleId ? parseInt(formData.vehicleId) : null,
        rating: 5.0,
        totalTrips: 0,
      };
      setDrivers([...drivers, newDriver]);
    }

    setShowModal(false);
  };

  // Delete driver
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this driver? This action cannot be undone.')) {
      setDrivers(drivers.filter(d => d.id !== id));
    }
  };

  // Change driver status
  const handleStatusChange = (id, newStatus) => {
    setDrivers(drivers.map(d => 
      d.id === id ? { ...d, status: newStatus } : d
    ));
  };

  // Get status color
  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      suspended: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  // Get status icon
  const getStatusIcon = (status) => {
    const icons = {
      active: CheckCircle,
      inactive: Clock,
      suspended: XCircle,
    };
    return icons[status] || Clock;
  };

  // Check if license is expiring soon (within 30 days)
  const isLicenseExpiringSoon = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  };

  // Check if license is expired
  const isLicenseExpired = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    return expiry < today;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Driver Management</h1>
          <p className="text-gray-600 mt-1">Manage your drivers and vehicle assignments</p>
        </div>
        <button
          onClick={handleCreateNew}
          className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Driver</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Drivers</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.total}</p>
              <p className="text-xs text-gray-500 mt-1">Registered</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Drivers</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.active}</p>
              <p className="text-xs text-gray-500 mt-1">On duty</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average Rating</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.avgRating}</p>
              <p className="text-xs text-gray-500 mt-1">Out of 5.0</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Award className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Unassigned</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.unassigned}</p>
              <p className="text-xs text-gray-500 mt-1">No vehicle</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, phone, email, or license..."
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
              All ({stats.total})
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
              onClick={() => setFilterStatus('inactive')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filterStatus === 'inactive'
                  ? 'bg-gray-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Inactive ({stats.inactive})
            </button>
            <button
              onClick={() => setFilterStatus('suspended')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filterStatus === 'suspended'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Suspended ({stats.suspended})
            </button>
          </div>
        </div>
      </div>

      {/* Drivers Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Driver</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Contact</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">License</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Assigned Vehicle</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Performance</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDrivers.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-12 text-gray-500">
                    No drivers found
                  </td>
                </tr>
              ) : (
                filteredDrivers.map((driver) => {
                  const StatusIcon = getStatusIcon(driver.status);
                  const licenseExpiringSoon = isLicenseExpiringSoon(driver.licenseExpiry);
                  const licenseExpired = isLicenseExpired(driver.licenseExpiry);
                  
                  return (
                    <tr key={driver.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {driver.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{driver.name}</p>
                            <p className="text-xs text-gray-500">ID: {driver.nationalId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2 text-sm text-gray-900">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span>{driver.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-gray-600">
                            <Mail className="w-3 h-3 text-gray-400" />
                            <span>{driver.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{driver.licenseNumber}</p>
                          <p className={`text-xs mt-1 ${
                            licenseExpired ? 'text-red-600 font-semibold' :
                            licenseExpiringSoon ? 'text-orange-600 font-semibold' :
                            'text-gray-500'
                          }`}>
                            {licenseExpired ? '⚠️ Expired' :
                             licenseExpiringSoon ? '⚠️ Expiring soon' :
                             `Expires: ${driver.licenseExpiry}`}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-sm text-gray-900">{driver.vehicleReg}</p>
                        {!driver.vehicleId && (
                          <p className="text-xs text-orange-600">Not assigned</p>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <Award className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm font-semibold text-gray-900">{driver.rating}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{driver.totalTrips} trips</p>
                      </td>
                      <td className="py-4 px-6">
                        <div className="relative group">
                          <button
                            className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center space-x-1 ${getStatusColor(driver.status)}`}
                          >
                            <StatusIcon className="w-3 h-3" />
                            <span className="capitalize">{driver.status}</span>
                          </button>
                          
                          {/* Status Change Dropdown */}
                          <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 min-w-[140px]">
                            <button
                              onClick={() => handleStatusChange(driver.id, 'active')}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                            >
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span>Active</span>
                            </button>
                            <button
                              onClick={() => handleStatusChange(driver.id, 'inactive')}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                            >
                              <Clock className="w-4 h-4 text-gray-600" />
                              <span>Inactive</span>
                            </button>
                            <button
                              onClick={() => handleStatusChange(driver.id, 'suspended')}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                            >
                              <XCircle className="w-4 h-4 text-red-600" />
                              <span>Suspend</span>
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEdit(driver)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="Edit Driver"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(driver.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="Delete Driver"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
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

      {/* Modal for Create/Edit Driver */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingDriver ? 'Edit Driver' : 'Add New Driver'}
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
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., John Kamau"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                />
              </div>

              {/* Phone and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0712345678"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@email.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              {/* National ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  National ID Number
                </label>
                <input
                  type="text"
                  value={formData.nationalId}
                  onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })}
                  placeholder="12345678"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                />
              </div>

              {/* License Number and Expiry */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Driver's License Number *
                  </label>
                  <input
                    type="text"
                    value={formData.licenseNumber}
                    onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                    placeholder="DL-12345-2020"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    License Expiry Date *
                  </label>
                  <input
                    type="date"
                    value={formData.licenseExpiry}
                    onChange={(e) => setFormData({ ...formData, licenseExpiry: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              {/* Assign Vehicle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assign to Vehicle
                </label>
                <select
                  value={formData.vehicleId}
                  onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                >
                  <option value="">Select a vehicle</option>
                  {vehicles.map(vehicle => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.registrationNumber} - {vehicle.model}
                    </option>
                  ))}
                </select>
              </div>

              {/* Join Date and Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Join Date
                  </label>
                  <input
                    type="date"
                    value={formData.joinDate}
                    onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
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
                <span>{editingDriver ? 'Update Driver' : 'Add Driver'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}