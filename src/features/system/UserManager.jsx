// ===========================================
// FILE: src/features/system/UserManager.jsx
// ===========================================
import { Users, Search, Filter } from 'lucide-react';

export default function UserManager() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-600 mt-1">Manage all platform users</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">User Management</h3>
        <p className="text-gray-600">This feature is under development</p>
      </div>
    </div>
  );
}
