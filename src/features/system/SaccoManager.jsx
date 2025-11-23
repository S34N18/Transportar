import { useState } from 'react';
import { Building2, Plus, Edit2, Trash2, Search, X, Save, Users, Car, TrendingUp, MapPin, Phone, Mail, CheckCircle, XCircle, AlertCircle, Eye } from 'lucide-react';

export default function ManageSaccos() {
  // Mock Sacco data
  const [saccos, setSaccos] = useState([
    {
      id: 1,
      name: 'Metro Shuttle Services',
      email: 'admin@metroshuttle.com',
      phone: '0712345678',
      location: 'Nairobi, Kenya',
      adminName: 'James Mwangi',
      vehicles: 45,
      drivers: 38,
      routes: 12,
      monthlyRevenue: 2400000,
      status: 'active',
      registrationDate: '2023-01-15',
      licenseNumber: 'SAC-001-2023',
      subscription: 'premium',
    },
    {
      id: 2,
      name: 'Coast Express',
      email: 'info@coastexpress.com',
      phone: '0723456789',
      location: 'Mombasa, Kenya',
      adminName: 'Sarah Wanjiku',
      vehicles: 32,
      drivers: 28,
      routes: 8,
      monthlyRevenue: 1800000,
      status: 'active',
      registrationDate: '2023-03-20',
      licenseNumber: 'SAC-002-2023',
      subscription: 'standard',
    },
    {
      id: 3,
      name: 'Rift Valley Transport',
      email: 'contact@riftvalley.com',
      phone: '0734567890',
      location: 'Nakuru, Kenya',
      adminName: 'David Kipchoge',
      vehicles: 28,
      drivers: 24,
      routes: 10,
      monthlyRevenue: 1500000,
      status: 'active',
      registrationDate: '2023-05-10',
      licenseNumber: 'SAC-003-2023',
      subscription: 'standard',
    },
    {
      id: 4,
      name: 'Western Shuttle',
      email: 'support@westernshuttle.com',
      phone: '0745678901',
      location: 'Kisumu, Kenya',
      adminName: 'Mary Atieno',
      vehicles: 15,
      drivers: 12,
      routes: 5,
      monthlyRevenue: 890000,
      status: 'suspended',
      registrationDate: '2023-07-22',
      licenseNumber: 'SAC-004-2023',
      subscription: 'basic',
    },
    {
      id: 5,
      name: 'Northern Express',
      email: 'hello@northernexpress.com',
      phone: '0756789012',
      location: 'Eldoret, Kenya',
      adminName: 'Peter Kimani',
      vehicles: 20,
      drivers: 18,
      routes: 7,
      monthlyRevenue: 1100000,
      status: 'inactive',
      registrationDate: '2023-09-05',
      licenseNumber: 'SAC-005-2023',
      subscription: 'standard',
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingSacco, setEditingSacco] = useState(null);
  const [selectedSacco, setSelectedSacco] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    adminName: '',
    licenseNumber: '',
    subscription: 'standard',
    status: 'active',
  });

  // Filter saccos
  const filteredSaccos = saccos.filter(sacco => {
    const matchesSearch = 
      sacco.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sacco.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sacco.adminName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || sacco.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate stats
  const stats = {
    total: saccos.length,
    active: saccos.filter(s => s.status === 'active').length,
    suspended: saccos.filter(s => s.status === 'suspended').length,
    inactive: saccos.filter(s => s.status === 'inactive').length,
    totalRevenue: saccos.reduce((sum, s) => sum + s.monthlyRevenue, 0),
    totalVehicles: saccos.reduce((sum, s) => sum + s.vehicles, 0),
    totalDrivers: saccos.reduce((sum, s) => sum + s.drivers, 0),
  };

  // Get status info
  const getStatusInfo = (status) => {
    const statusConfig = {
      active: { label: 'Active', color: 'bg-green-100 text-green-800', icon: CheckCircle },
      suspended: { label: 'Suspended', color: 'bg-red-100 text-red-800', icon: XCircle },
      inactive: { label: 'Inactive', color: 'bg-gray-100 text-gray-800', icon: AlertCircle },
    };
    return statusConfig[status] || statusConfig.active;
  };

  // Get subscription badge
  const getSubscriptionBadge = (subscription) => {
    const badges = {
      basic: 'bg-gray-100 text-gray-800',
      standard: 'bg-blue-100 text-blue-800',
      premium: 'bg-purple-100 text-purple-800',
    };
    return badges[subscription] || badges.standard;
  };

  // Handle create new
  const handleCreateNew = () => {
    setEditingSacco(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      location: '',
      adminName: '',
      licenseNumber: '',
      subscription: 'standard',
      status: 'active',
    });
    setShowModal(true);
  };

  // Handle edit
  const handleEdit = (sacco) => {
    setEditingSacco(sacco);
    setFormData({ ...sacco });
    setShowModal(true);
  };

  // Handle save
  const handleSave = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.adminName) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingSacco) {
      setSaccos(saccos.map(s => s.id === editingSacco.id ? { ...formData, id: s.id } : s));
    } else {
      const newSacco = {
        ...formData,
        id: Math.max(...saccos.map(s => s.id)) + 1,
        vehicles: 0,
        drivers: 0,
        routes: 0,
        monthlyRevenue: 0,
        registrationDate: new Date().toISOString().split('T')[0],
      };
      setSaccos([...saccos, newSacco]);
    }

    setShowModal(false);
  };

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this Sacco? This action cannot be undone.')) {
      setSaccos(saccos.filter(s => s.id !== id));
    }
  };

  // Handle status change
  const handleStatusChange = (id, newStatus) => {
    setSaccos(saccos.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  // View details
  const handleViewDetails = (sacco) => {
    setSelectedSacco(sacco);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Saccos</h1>
          <p className="text-gray-600 mt-1">Oversee all registered transport companies</p>
        </div>
        <button
          onClick={handleCreateNew}
          className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Register New Sacco</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Saccos</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.total}</p>
              <p className="text-xs text-gray-500 mt-1">{stats.active} active</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Vehicles</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.totalVehicles}</p>
              <p className="text-xs text-gray-500 mt-1">Across all saccos</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Car className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Drivers</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.totalDrivers}</p>
              <p className="text-xs text-gray-500 mt-1">Registered</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {(stats.totalRevenue / 1000000).toFixed(1)}M
              </p>
              <p className="text-xs text-gray-500 mt-1">This month</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-600" />
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
              placeholder="Search by name, location, or admin..."
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

      {/* Saccos Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Sacco</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Admin</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Fleet</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Revenue</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Subscription</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSaccos.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-12 text-gray-500">
                    No saccos found
                  </td>
                </tr>
              ) : (
                filteredSaccos.map((sacco) => {
                  const statusInfo = getStatusInfo(sacco.status);
                  const StatusIcon = statusInfo.icon;

                  return (
                    <tr key={sacco.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="bg-primary-100 p-2 rounded-lg">
                            <Building2 className="w-5 h-5 text-primary-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{sacco.name}</p>
                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                              <MapPin className="w-3 h-3" />
                              <span>{sacco.location}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-sm font-medium text-gray-900">{sacco.adminName}</p>
                        <p className="text-xs text-gray-500">{sacco.phone}</p>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm">
                          <p className="text-gray-900">{sacco.vehicles} vehicles</p>
                          <p className="text-gray-500">{sacco.drivers} drivers</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-sm font-semibold text-gray-900">
                          KSh {(sacco.monthlyRevenue / 1000).toFixed(0)}K
                        </p>
                        <p className="text-xs text-gray-500">per month</p>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full capitalize ${getSubscriptionBadge(sacco.subscription)}`}>
                          {sacco.subscription}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="relative group">
                          <button
                            className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center space-x-1 ${statusInfo.color}`}
                          >
                            <StatusIcon className="w-3 h-3" />
                            <span>{statusInfo.label}</span>
                          </button>
                          
                          {/* Status Change Dropdown */}
                          <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 min-w-[140px]">
                            <button
                              onClick={() => handleStatusChange(sacco.id, 'active')}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                            >
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span>Active</span>
                            </button>
                            <button
                              onClick={() => handleStatusChange(sacco.id, 'suspended')}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                            >
                              <XCircle className="w-4 h-4 text-red-600" />
                              <span>Suspend</span>
                            </button>
                            <button
                              onClick={() => handleStatusChange(sacco.id, 'inactive')}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                            >
                              <AlertCircle className="w-4 h-4 text-gray-600" />
                              <span>Inactive</span>
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleViewDetails(sacco)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(sacco)}
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                            title="Edit Sacco"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(sacco.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="Delete Sacco"
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

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingSacco ? 'Edit Sacco' : 'Register New Sacco'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sacco Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Metro Shuttle Services"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="admin@sacco.com"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0712345678"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="City, Kenya"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Admin Name *
                  </label>
                  <input
                    type="text"
                    value={formData.adminName}
                    onChange={(e) => setFormData({ ...formData, adminName: e.target.value })}
                    placeholder="Full name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    License Number
                  </label>
                  <input
                    type="text"
                    value={formData.licenseNumber}
                    onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                    placeholder="SAC-XXX-YYYY"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subscription Plan
                  </label>
                  <select
                    value={formData.subscription}
                    onChange={(e) => setFormData({ ...formData, subscription: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  >
                    <option value="basic">Basic</option>
                    <option value="standard">Standard</option>
                    <option value="premium">Premium</option>
                  </select>
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
                    <option value="suspended">Suspended</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

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
                <span>{editingSacco ? 'Update Sacco' : 'Register Sacco'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {selectedSacco && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{selectedSacco.name}</h2>
                <button
                  onClick={() => setSelectedSacco(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Admin</span>
                      <span className="font-medium text-gray-900">{selectedSacco.adminName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email</span>
                      <span className="font-medium text-gray-900">{selectedSacco.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone</span>
                      <span className="font-medium text-gray-900">{selectedSacco.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location</span>
                      <span className="font-medium text-gray-900">{selectedSacco.location}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Fleet Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Vehicles</span>
                      <span className="font-medium text-gray-900">{selectedSacco.vehicles}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Drivers</span>
                      <span className="font-medium text-gray-900">{selectedSacco.drivers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Routes</span>
                      <span className="font-medium text-gray-900">{selectedSacco.routes}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Subscription Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Plan</span>
                      <span className={`font-medium capitalize px-3 py-1 rounded-full text-xs ${getSubscriptionBadge(selectedSacco.subscription)}`}>
                        {selectedSacco.subscription}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">License Number</span>
                      <span className="font-medium text-gray-900">{selectedSacco.licenseNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Registration Date</span>
                      <span className="font-medium text-gray-900">{selectedSacco.registrationDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status</span>
                      <span className={`font-medium capitalize ${
                        selectedSacco.status === 'active' ? 'text-green-600' :
                        selectedSacco.status === 'suspended' ? 'text-red-600' :
                        'text-gray-600'
                      }`}>
                        {selectedSacco.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-primary-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Monthly Revenue</span>
                    <span className="text-2xl font-bold text-primary-600">
                      KSh {selectedSacco.monthlyRevenue.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex space-x-3">
                <button
                  onClick={() => {
                    handleEdit(selectedSacco);
                    setSelectedSacco(null);
                  }}
                  className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold"
                >
                  Edit Sacco
                </button>
                <button
                  onClick={() => setSelectedSacco(null)}
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