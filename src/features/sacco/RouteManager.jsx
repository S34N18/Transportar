import { useState } from 'react';
import { MapPin, Plus, Edit2, Trash2, Search, X, Save, Navigation } from 'lucide-react';

export default function RouteManager() {
  // State management
  const [routes, setRoutes] = useState([
    {
      id: 1,
      name: 'Nairobi - Mombasa',
      startPoint: 'Nairobi CBD',
      endPoint: 'Mombasa Town',
      stops: ['Mlolongo', 'Machakos', 'Emali', 'Salama', 'Voi', 'Mariakani'],
      fare: 1500,
      duration: '8 hours',
      distance: '480 km',
      active: true,
    },
    {
      id: 2,
      name: 'Nairobi - Kisumu',
      startPoint: 'Nairobi CBD',
      endPoint: 'Kisumu Town',
      stops: ['Limuru', 'Naivasha', 'Nakuru', 'Molo', 'Kericho'],
      fare: 1200,
      duration: '6 hours',
      distance: '350 km',
      active: true,
    },
    {
      id: 3,
      name: 'Nairobi - Nakuru',
      startPoint: 'Nairobi CBD',
      endPoint: 'Nakuru Town',
      stops: ['Limuru', 'Naivasha'],
      fare: 600,
      duration: '3 hours',
      distance: '160 km',
      active: true,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingRoute, setEditingRoute] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    startPoint: '',
    endPoint: '',
    stops: [],
    fare: '',
    duration: '',
    distance: '',
    active: true,
  });
  const [newStop, setNewStop] = useState('');

  // Filter routes based on search
  const filteredRoutes = routes.filter(route =>
    route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.startPoint.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.endPoint.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Open modal for creating new route
  const handleCreateNew = () => {
    setEditingRoute(null);
    setFormData({
      name: '',
      startPoint: '',
      endPoint: '',
      stops: [],
      fare: '',
      duration: '',
      distance: '',
      active: true,
    });
    setShowModal(true);
  };

  // Open modal for editing existing route
  const handleEdit = (route) => {
    setEditingRoute(route);
    setFormData({ ...route });
    setShowModal(true);
  };

  // Add stop to the list
  const handleAddStop = () => {
    if (newStop.trim()) {
      setFormData({
        ...formData,
        stops: [...formData.stops, newStop.trim()],
      });
      setNewStop('');
    }
  };

  // Remove stop from the list
  const handleRemoveStop = (index) => {
    const updatedStops = formData.stops.filter((_, i) => i !== index);
    setFormData({ ...formData, stops: updatedStops });
  };

  // Save route (create or update)
  const handleSave = () => {
    if (!formData.name || !formData.startPoint || !formData.endPoint) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingRoute) {
      // Update existing route
      setRoutes(routes.map(r => (r.id === editingRoute.id ? { ...formData, id: r.id } : r)));
    } else {
      // Create new route
      const newRoute = {
        ...formData,
        id: Math.max(...routes.map(r => r.id)) + 1,
      };
      setRoutes([...routes, newRoute]);
    }

    setShowModal(false);
    setFormData({
      name: '',
      startPoint: '',
      endPoint: '',
      stops: [],
      fare: '',
      duration: '',
      distance: '',
      active: true,
    });
  };

  // Delete route
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this route?')) {
      setRoutes(routes.filter(r => r.id !== id));
    }
  };

  // Toggle route active status
  const toggleActive = (id) => {
    setRoutes(routes.map(r => (r.id === id ? { ...r, active: !r.active } : r)));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Route Management</h1>
          <p className="text-gray-600 mt-1">Manage your sacco routes and stops</p>
        </div>
        <button
          onClick={handleCreateNew}
          className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Create New Route</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Routes</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{routes.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Routes</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {routes.filter(r => r.active).length}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Navigation className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Distance</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {routes.reduce((sum, r) => sum + parseInt(r.distance), 0)} km
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <MapPin className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Fare</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                KSh {Math.round(routes.reduce((sum, r) => sum + r.fare, 0) / routes.length)}
              </p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <MapPin className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search routes by name, start, or end point..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Routes Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Route Name</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Start → End</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Stops</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Fare</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Duration</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRoutes.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-12 text-gray-500">
                    No routes found
                  </td>
                </tr>
              ) : (
                filteredRoutes.map((route) => (
                  <tr key={route.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <p className="font-semibold text-gray-900">{route.name}</p>
                      <p className="text-xs text-gray-500">{route.distance}</p>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span>{route.startPoint}</span>
                        <span>→</span>
                        <span>{route.endPoint}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-1">
                        <span className="text-sm text-gray-600">{route.stops.length} stops</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm font-semibold text-gray-900">KSh {route.fare}</p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm text-gray-600">{route.duration}</p>
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => toggleActive(route.id)}
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          route.active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {route.active ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(route)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Edit Route"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(route.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Delete Route"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Create/Edit Route */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingRoute ? 'Edit Route' : 'Create New Route'}
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
              {/* Route Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Route Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Nairobi - Mombasa"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                />
              </div>

              {/* Start and End Points */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Point *
                  </label>
                  <input
                    type="text"
                    value={formData.startPoint}
                    onChange={(e) => setFormData({ ...formData, startPoint: e.target.value })}
                    placeholder="e.g., Nairobi CBD"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Point *
                  </label>
                  <input
                    type="text"
                    value={formData.endPoint}
                    onChange={(e) => setFormData({ ...formData, endPoint: e.target.value })}
                    placeholder="e.g., Mombasa Town"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              {/* Stops */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stops (Optional)
                </label>
                <div className="flex space-x-2 mb-3">
                  <input
                    type="text"
                    value={newStop}
                    onChange={(e) => setNewStop(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddStop()}
                    placeholder="Add a stop location"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                  <button
                    onClick={handleAddStop}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.stops.map((stop, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-full"
                    >
                      <span className="text-sm text-gray-700">{stop}</span>
                      <button
                        onClick={() => handleRemoveStop(index)}
                        className="text-gray-500 hover:text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fare, Duration, Distance */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fare (KSh)
                  </label>
                  <input
                    type="number"
                    value={formData.fare}
                    onChange={(e) => setFormData({ ...formData, fare: parseInt(e.target.value) || 0 })}
                    placeholder="1500"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="8 hours"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Distance
                  </label>
                  <input
                    type="text"
                    value={formData.distance}
                    onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
                    placeholder="480 km"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              {/* Active Status */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="w-4 h-4 text-primary-600 rounded"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Set route as active
                </label>
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
                <span>{editingRoute ? 'Update Route' : 'Create Route'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}