import { useState } from 'react';
import { Car, Plus, Edit2, Trash2, Search, X, Save, AlertCircle, CheckCircle, Wrench } from 'lucide-react';

export default function VehicleManager() {
  // Mock routes data (would come from RouteManager in real app)
  const routes = [
    { id: 1, name: 'Nairobi - Mombasa' },
    { id: 2, name: 'Nairobi - Kisumu' },
    { id: 3, name: 'Nairobi - Nakuru' },
    { id: 4, name: 'Mombasa - Malindi' },
    { id: 5, name: 'Kisumu - Eldoret' },
  ];

  // State management
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      registrationNumber: 'KAB 123X',
      model: 'Toyota Hiace',
      capacity: 30,
      year: 2020,
      routeId: 1,
      routeName: 'Nairobi - Mombasa',
      status: 'active',
      lastMaintenance: '2025-10-15',
      nextMaintenance: '2025-12-15',
      mileage: '145,000 km',
    },
    {
      id: 2,
      registrationNumber: 'KBZ 456Y',
      model: 'Nissan Caravan',
      capacity: 25,
      year: 2019,
      routeId: 2,
      routeName: 'Nairobi - Kisumu',
      status: 'active',
      lastMaintenance: '2025-09-20',
      nextMaintenance: '2025-11-20',
      mileage: '178,500 km',
    },
    {
      id: 3,
      registrationNumber: 'KCD 789Z',
      model: 'Toyota Hiace',
      capacity: 30,
      year: 2021,
      routeId: 1,
      routeName: 'Nairobi - Mombasa',
      status: 'active',
      lastMaintenance: '2025-11-01',
      nextMaintenance: '2026-01-01',
      mileage: '98,200 km',
    },
    {
      id: 4,
      registrationNumber: 'KDA 321W',
      model: 'Isuzu NQR',
      capacity: 35,
      year: 2018,
      routeId: 3,
      routeName: 'Nairobi - Nakuru',
      status: 'maintenance',
      lastMaintenance: '2025-11-10',
      nextMaintenance: '2026-01-10',
      mileage: '205,800 km',
    },
    {
      id: 5,
      registrationNumber: 'KEB 654V',
      model: 'Toyota Coaster',
      capacity: 28,
      year: 2017,
      routeId: null,
      routeName: 'Unassigned',
      status: 'inactive',
      lastMaintenance: '2025-08-05',
      nextMaintenance: '2025-10-05',
      mileage: '234,100 km',
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [formData, setFormData] = useState({
    registrationNumber: '',
    model: '',
    capacity: '',
    year: '',
    routeId: '',
    status: 'active',
    lastMaintenance: '',
    nextMaintenance: '',
    mileage: '',
  });

  // Filter vehicles based on search and status
  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = 
      vehicle.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.routeName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || vehicle.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate stats
  const stats = {
    total: vehicles.length,
    active: vehicles.filter(v => v.status === 'active').length,
    maintenance: vehicles.filter(v => v.status === 'maintenance').length,
    inactive: vehicles.filter(v => v.status === 'inactive').length,
    unassigned: vehicles.filter(v => !v.routeId).length,
    totalCapacity: vehicles.reduce((sum, v) => sum + v.capacity, 0),
  };

  // Open modal for creating new vehicle
  const handleCreateNew = () => {
    setEditingVehicle(null);
    setFormData({
      registrationNumber: '',
      model: '',
      capacity: '',
      year: '',
      routeId: '',
      status: 'active',
      lastMaintenance: '',
      nextMaintenance: '',
      mileage: '',
    });
    setShowModal(true);
  };

  // Open modal for editing existing vehicle
  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({ ...vehicle });
    setShowModal(true);
  };

  // Save vehicle (create or update)
  const handleSave = () => {
    if (!formData.registrationNumber || !formData.model || !formData.capacity) {
      alert('Please fill in all required fields');
      return;
    }

    // Get route name from routeId
    const selectedRoute = routes.find(r => r.id === parseInt(formData.routeId));
    const routeName = selectedRoute ? selectedRoute.name : 'Unassigned';

    if (editingVehicle) {
      // Update existing vehicle
      setVehicles(vehicles.map(v => 
        v.id === editingVehicle.id 
          ? { ...formData, id: v.id, routeName, routeId: formData.routeId ? parseInt(formData.routeId) : null }
          : v
      ));
    } else {
      // Create new vehicle
      const newVehicle = {
        ...formData,
        id: Math.max(...vehicles.map(v => v.id)) + 1,
        routeName,
        routeId: formData.routeId ? parseInt(formData.routeId) : null,
      };
      setVehicles([...vehicles, newVehicle]);
    }

    setShowModal(false);
  };

  // Delete vehicle
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this vehicle? This action cannot be undone.')) {
      setVehicles(vehicles.filter(v => v.id !== id));
    }
  };

  // Change vehicle status
  const handleStatusChange = (id, newStatus) => {
    setVehicles(vehicles.map(v => 
      v.id === id ? { ...v, status: newStatus } : v
    ));
  };

  // Get status color
  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      maintenance: 'bg-yellow-100 text-yellow-800',
      inactive: 'bg-gray-100 text-gray-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  // Get status icon
  const getStatusIcon = (status) => {
    const icons = {
      active: CheckCircle,
      maintenance: Wrench,
      inactive: AlertCircle,
    };
    return icons[status] || AlertCircle;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vehicle Management</h1>
          <p className="text-gray-600 mt-1">Manage your fleet vehicles and assignments</p>
        </div>
        <button
          onClick={handleCreateNew}
          className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Vehicle</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Vehicles</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.total}</p>
              <p className="text-xs text-gray-500 mt-1">Total capacity: {stats.totalCapacity}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Car className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.active}</p>
              <p className="text-xs text-gray-500 mt-1">On the road</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Maintenance</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.maintenance}</p>
              <p className="text-xs text-gray-500 mt-1">Under repair</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Wrench className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Unassigned</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.unassigned}</p>
              <p className="text-xs text-gray-500 mt-1">No route assigned</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <AlertCircle className="w-6 h-6 text-orange-600" />
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
              placeholder="Search by registration, model, or route..."
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
              onClick={() => setFilterStatus('maintenance')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filterStatus === 'maintenance'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Maintenance ({stats.maintenance})
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
          </div>
        </div>
      </div>

      {/* Vehicles Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Vehicle</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Model & Year</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Capacity</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Assigned Route</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Mileage</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-12 text-gray-500">
                    No vehicles found
                  </td>
                </tr>
              ) : (
                filteredVehicles.map((vehicle) => {
                  const StatusIcon = getStatusIcon(vehicle.status);
                  return (
                    <tr key={vehicle.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="bg-primary-100 p-2 rounded-lg">
                            <Car className="w-5 h-5 text-primary-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{vehicle.registrationNumber}</p>
                            <p className="text-xs text-gray-500">ID: {vehicle.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-sm text-gray-900">{vehicle.model}</p>
                        <p className="text-xs text-gray-500">{vehicle.year}</p>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-sm font-semibold text-gray-900">{vehicle.capacity} seats</p>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-sm text-gray-900">{vehicle.routeName}</p>
                        {!vehicle.routeId && (
                          <p className="text-xs text-orange-600">Not assigned</p>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-sm text-gray-900">{vehicle.mileage}</p>
                      </td>
                      <td className="py-4 px-6">
                        <div className="relative group">
                          <button
                            className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center space-x-1 ${getStatusColor(vehicle.status)}`}
                          >
                            <StatusIcon className="w-3 h-3" />
                            <span className="capitalize">{vehicle.status}</span>
                          </button>
                          
                          {/* Status Change Dropdown */}
                          <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                            <button
                              onClick={() => handleStatusChange(vehicle.id, 'active')}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                            >
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span>Active</span>
                            </button>
                            <button
                              onClick={() => handleStatusChange(vehicle.id, 'maintenance')}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                            >
                              <Wrench className="w-4 h-4 text-yellow-600" />
                              <span>Maintenance</span>
                            </button>
                            <button
                              onClick={() => handleStatusChange(vehicle.id, 'inactive')}
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
                            onClick={() => handleEdit(vehicle)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="Edit Vehicle"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(vehicle.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="Delete Vehicle"
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

      {/* Modal for Create/Edit Vehicle */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
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
              {/* Registration Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registration Number *
                </label>
                <input
                  type="text"
                  value={formData.registrationNumber}
                  onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value.toUpperCase() })}
                  placeholder="e.g., KAB 123X"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none uppercase"
                />
              </div>

              {/* Model and Year */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vehicle Model *
                  </label>
                  <input
                    type="text"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    placeholder="e.g., Toyota Hiace"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Year of Manufacture
                  </label>
                  <input
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) || '' })}
                    placeholder="2020"
                    min="1990"
                    max={new Date().getFullYear()}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              {/* Capacity and Route */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seating Capacity *
                  </label>
                  <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || '' })}
                    placeholder="30"
                    min="1"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assign to Route
                  </label>
                  <select
                    value={formData.routeId}
                    onChange={(e) => setFormData({ ...formData, routeId: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  >
                    <option value="">Select a route</option>
                    {routes.map(route => (
                      <option key={route.id} value={route.id}>{route.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Mileage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Mileage
                </label>
                <input
                  type="text"
                  value={formData.mileage}
                  onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                  placeholder="e.g., 145,000 km"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                />
              </div>

              {/* Maintenance Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Maintenance Date
                  </label>
                  <input
                    type="date"
                    value={formData.lastMaintenance}
                    onChange={(e) => setFormData({ ...formData, lastMaintenance: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Next Maintenance Date
                  </label>
                  <input
                    type="date"
                    value={formData.nextMaintenance}
                    onChange={(e) => setFormData({ ...formData, nextMaintenance: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vehicle Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                >
                  <option value="active">Active</option>
                  <option value="maintenance">Under Maintenance</option>
                  <option value="inactive">Inactive</option>
                </select>
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
                <span>{editingVehicle ? 'Update Vehicle' : 'Add Vehicle'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}