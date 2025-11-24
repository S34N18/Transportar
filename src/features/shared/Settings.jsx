import { useState } from 'react';
import { Bell, Palette, Globe, Shield, AlertCircle, Save, CheckCircle, Moon, Sun, Monitor } from 'lucide-react';

export default function Settings() {
  const [saveStatus, setSaveStatus] = useState(null);
  const [activeTab, setActiveTab] = useState('notifications');

  // Notification settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    bookingConfirmation: true,
    tripReminders: true,
    paymentAlerts: true,
    promotionalEmails: false,
  });

  // Appearance settings
  const [appearance, setAppearance] = useState({
    theme: 'light',
    language: 'en',
    dateFormat: 'DD/MM/YYYY',
    currency: 'KSh',
  });

  // Privacy settings
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'private',
    shareLocation: true,
    allowAnalytics: true,
    marketingEmails: false,
  });

  const tabs = [
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'privacy', label: 'Privacy', icon: Shield },
  ];

  // Handle save
  const handleSave = (type) => {
    setSaveStatus('saving');
    
    // In real app: call API to save settings
    // await api.updateSettings({ type, data });
    
    setTimeout(() => {
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(null), 3000);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your app preferences and settings</p>
      </div>

      {/* Save Status Banner */}
      {saveStatus && (
        <div className={`rounded-lg p-4 ${
          saveStatus === 'success' ? 'bg-green-50 border border-green-200' :
          'bg-blue-50 border border-blue-200'
        }`}>
          <div className="flex items-center space-x-3">
            {saveStatus === 'success' ? (
              <>
                <CheckCircle className="w-5 h-5 text-green-600" />
                <p className="text-green-800 font-medium">Settings saved successfully!</p>
              </>
            ) : (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                <p className="text-blue-800 font-medium">Saving changes...</p>
              </>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sticky top-6">
            <div className="space-y-2">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                      activeTab === tab.id
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            
            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Notification Preferences</h2>
                  <p className="text-sm text-gray-600">Choose how you want to receive updates</p>
                </div>

                <div className="space-y-6">
                  {/* Notification Channels */}
                  <div className="pb-6 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-4">Notification Channels</h3>
                    
                    <div className="space-y-4">
                      <label className="flex items-center justify-between cursor-pointer p-4 rounded-lg hover:bg-gray-50 transition">
                        <div>
                          <p className="font-medium text-gray-900">Email Notifications</p>
                          <p className="text-sm text-gray-600">Receive updates via email</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={notifications.emailNotifications}
                          onChange={(e) => setNotifications({ ...notifications, emailNotifications: e.target.checked })}
                          className="w-5 h-5 text-primary-600 rounded"
                        />
                      </label>

                      <label className="flex items-center justify-between cursor-pointer p-4 rounded-lg hover:bg-gray-50 transition">
                        <div>
                          <p className="font-medium text-gray-900">SMS Notifications</p>
                          <p className="text-sm text-gray-600">Receive text messages on your phone</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={notifications.smsNotifications}
                          onChange={(e) => setNotifications({ ...notifications, smsNotifications: e.target.checked })}
                          className="w-5 h-5 text-primary-600 rounded"
                        />
                      </label>

                      <label className="flex items-center justify-between cursor-pointer p-4 rounded-lg hover:bg-gray-50 transition">
                        <div>
                          <p className="font-medium text-gray-900">Push Notifications</p>
                          <p className="text-sm text-gray-600">Receive browser/app notifications</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={notifications.pushNotifications}
                          onChange={(e) => setNotifications({ ...notifications, pushNotifications: e.target.checked })}
                          className="w-5 h-5 text-primary-600 rounded"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Notification Types */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">What to Get Notified About</h3>
                    
                    <div className="space-y-4">
                      <label className="flex items-center justify-between cursor-pointer p-4 rounded-lg hover:bg-gray-50 transition">
                        <div>
                          <p className="font-medium text-gray-900">Booking Confirmations</p>
                          <p className="text-sm text-gray-600">Get notified when bookings are confirmed</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={notifications.bookingConfirmation}
                          onChange={(e) => setNotifications({ ...notifications, bookingConfirmation: e.target.checked })}
                          className="w-5 h-5 text-primary-600 rounded"
                        />
                      </label>

                      <label className="flex items-center justify-between cursor-pointer p-4 rounded-lg hover:bg-gray-50 transition">
                        <div>
                          <p className="font-medium text-gray-900">Trip Reminders</p>
                          <p className="text-sm text-gray-600">Reminders 1 hour before your scheduled trips</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={notifications.tripReminders}
                          onChange={(e) => setNotifications({ ...notifications, tripReminders: e.target.checked })}
                          className="w-5 h-5 text-primary-600 rounded"
                        />
                      </label>

                      <label className="flex items-center justify-between cursor-pointer p-4 rounded-lg hover:bg-gray-50 transition">
                        <div>
                          <p className="font-medium text-gray-900">Payment Alerts</p>
                          <p className="text-sm text-gray-600">Updates on all payment transactions</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={notifications.paymentAlerts}
                          onChange={(e) => setNotifications({ ...notifications, paymentAlerts: e.target.checked })}
                          className="w-5 h-5 text-primary-600 rounded"
                        />
                      </label>

                      <label className="flex items-center justify-between cursor-pointer p-4 rounded-lg hover:bg-gray-50 transition">
                        <div>
                          <p className="font-medium text-gray-900">Promotional Emails</p>
                          <p className="text-sm text-gray-600">Special offers, discounts, and promotions</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={notifications.promotionalEmails}
                          onChange={(e) => setNotifications({ ...notifications, promotionalEmails: e.target.checked })}
                          className="w-5 h-5 text-primary-600 rounded"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => handleSave('notifications')}
                    className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold flex items-center space-x-2"
                  >
                    <Save className="w-5 h-5" />
                    <span>Save Preferences</span>
                  </button>
                </div>
              </div>
            )}

            {/* Appearance Tab */}
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Appearance Settings</h2>
                  <p className="text-sm text-gray-600">Customize how the app looks and feels</p>
                </div>

                <div className="space-y-6">
                  {/* Theme */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Theme
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      <button
                        onClick={() => setAppearance({ ...appearance, theme: 'light' })}
                        className={`p-4 border-2 rounded-lg transition ${
                          appearance.theme === 'light'
                            ? 'border-primary-600 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Sun className={`w-8 h-8 mx-auto mb-2 ${
                          appearance.theme === 'light' ? 'text-primary-600' : 'text-gray-400'
                        }`} />
                        <p className="text-sm font-medium text-gray-900">Light</p>
                      </button>

                      <button
                        onClick={() => setAppearance({ ...appearance, theme: 'dark' })}
                        className={`p-4 border-2 rounded-lg transition ${
                          appearance.theme === 'dark'
                            ? 'border-primary-600 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Moon className={`w-8 h-8 mx-auto mb-2 ${
                          appearance.theme === 'dark' ? 'text-primary-600' : 'text-gray-400'
                        }`} />
                        <p className="text-sm font-medium text-gray-900">Dark</p>
                        <p className="text-xs text-gray-500 mt-1">Coming soon</p>
                      </button>

                      <button
                        onClick={() => setAppearance({ ...appearance, theme: 'auto' })}
                        className={`p-4 border-2 rounded-lg transition ${
                          appearance.theme === 'auto'
                            ? 'border-primary-600 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Monitor className={`w-8 h-8 mx-auto mb-2 ${
                          appearance.theme === 'auto' ? 'text-primary-600' : 'text-gray-400'
                        }`} />
                        <p className="text-sm font-medium text-gray-900">Auto</p>
                        <p className="text-xs text-gray-500 mt-1">Coming soon</p>
                      </button>
                    </div>
                  </div>

                  {/* Language */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Language
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        value={appearance.language}
                        onChange={(e) => setAppearance({ ...appearance, language: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      >
                        <option value="en">English</option>
                        <option value="sw">Kiswahili</option>
                      </select>
                    </div>
                  </div>

                  {/* Date Format */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date Format
                    </label>
                    <select
                      value={appearance.dateFormat}
                      onChange={(e) => setAppearance({ ...appearance, dateFormat: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    >
                      <option value="DD/MM/YYYY">DD/MM/YYYY (23/11/2025)</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY (11/23/2025)</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD (2025-11-23)</option>
                    </select>
                  </div>

                  {/* Currency */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Currency Display
                    </label>
                    <select
                      value={appearance.currency}
                      onChange={(e) => setAppearance({ ...appearance, currency: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    >
                      <option value="KSh">KSh (Kenyan Shilling)</option>
                      <option value="USD">USD (US Dollar)</option>
                      <option value="EUR">EUR (Euro)</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => handleSave('appearance')}
                    className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold flex items-center space-x-2"
                  >
                    <Save className="w-5 h-5" />
                    <span>Save Preferences</span>
                  </button>
                </div>
              </div>
            )}

            {/* Privacy Tab */}
            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Privacy & Data</h2>
                  <p className="text-sm text-gray-600">Control your privacy and data settings</p>
                </div>

                <div className="space-y-4">
                  <label className="flex items-center justify-between cursor-pointer p-4 rounded-lg hover:bg-gray-50 transition">
                    <div>
                      <p className="font-medium text-gray-900">Profile Visibility</p>
                      <p className="text-sm text-gray-600">Who can see your profile information</p>
                    </div>
                    <select
                      value={privacy.profileVisibility}
                      onChange={(e) => setPrivacy({ ...privacy, profileVisibility: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                      <option value="friends">Friends Only</option>
                    </select>
                  </label>

                  <label className="flex items-center justify-between cursor-pointer p-4 rounded-lg hover:bg-gray-50 transition">
                    <div>
                      <p className="font-medium text-gray-900">Share Location During Trips</p>
                      <p className="text-sm text-gray-600">Allow real-time location tracking for safety</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={privacy.shareLocation}
                      onChange={(e) => setPrivacy({ ...privacy, shareLocation: e.target.checked })}
                      className="w-5 h-5 text-primary-600 rounded"
                    />
                  </label>

                  <label className="flex items-center justify-between cursor-pointer p-4 rounded-lg hover:bg-gray-50 transition">
                    <div>
                      <p className="font-medium text-gray-900">Usage Analytics</p>
                      <p className="text-sm text-gray-600">Help us improve by sharing anonymous usage data</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={privacy.allowAnalytics}
                      onChange={(e) => setPrivacy({ ...privacy, allowAnalytics: e.target.checked })}
                      className="w-5 h-5 text-primary-600 rounded"
                    />
                  </label>

                  <label className="flex items-center justify-between cursor-pointer p-4 rounded-lg hover:bg-gray-50 transition">
                    <div>
                      <p className="font-medium text-gray-900">Marketing Emails</p>
                      <p className="text-sm text-gray-600">Receive updates about new features and offers</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={privacy.marketingEmails}
                      onChange={(e) => setPrivacy({ ...privacy, marketingEmails: e.target.checked })}
                      className="w-5 h-5 text-primary-600 rounded"
                    />
                  </label>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-yellow-800">
                      <p className="font-semibold mb-1">Data Privacy Notice</p>
                      <p>We take your privacy seriously. Your data is encrypted and only used to provide our services. Read our <a href="#" className="underline font-medium">Privacy Policy</a> for more details.</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => handleSave('privacy')}
                    className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold flex items-center space-x-2"
                  >
                    <Save className="w-5 h-5" />
                    <span>Save Preferences</span>
                  </button>
                </div>

                {/* Danger Zone */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-bold text-red-900 mb-4">Danger Zone</h3>
                  
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-red-900 mb-1">Delete Account</p>
                        <p className="text-sm text-red-800">
                          Once you delete your account, there is no going back. Please be certain.
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                            alert('Account deletion requested. You will receive a confirmation email.');
                          }
                        }}
                        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold whitespace-nowrap"
                      >
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}