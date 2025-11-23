// ===========================================
// FILE: src/features/system/SecurityDashboard.jsx
// ===========================================
import { Shield, Activity } from 'lucide-react';

export default function SecurityDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Security Dashboard</h1>
        <p className="text-gray-600 mt-1">Monitor security logs and access</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
        <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Security Logs</h3>
        <p className="text-gray-600">This feature is under development</p>
      </div>
    </div>
  );
}