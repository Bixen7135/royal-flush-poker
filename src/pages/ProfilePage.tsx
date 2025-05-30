import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/common/Layout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { User, Mail, LogOut, Settings } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <Layout title="Profile" showBackButton>
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <Card className="mb-8">
          <div className="p-6">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                {currentUser?.photoURL ? (
                  <img src={currentUser.photoURL} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User size={40} className="text-gray-400" />
                )}
              </div>
              <div>
                <h1 className="text-2xl font-serif font-bold mb-1">
                  {currentUser?.displayName || 'Anonymous Player'}
                </h1>
                <p className="text-gray-400 flex items-center">
                  <Mail size={16} className="mr-2" />
                  {currentUser?.email}
                </p>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-serif font-bold mb-4 flex items-center">
                <Settings size={20} className="mr-2" />
                Account Settings
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={currentUser?.displayName || ''}
                    disabled
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-gray-300"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Display name changes coming soon
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={currentUser?.email || ''}
                    disabled
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-gray-300"
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <h2 className="text-xl font-serif font-bold mb-4">Game Statistics</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-800/50 rounded-lg">
                  <span className="text-gray-400">Total Games</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-800/50 rounded-lg">
                  <span className="text-gray-400">Games Won</span>
                  <span className="font-medium text-green-400">0</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-800/50 rounded-lg">
                  <span className="text-gray-400">Win Rate</span>
                  <span className="font-medium">0%</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-800/50 rounded-lg">
                  <span className="text-gray-400">Current Balance</span>
                  <span className="font-medium text-accent-400">10,000 CHIPS</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-8 flex justify-end">
          <Button
            variant="secondary"
            onClick={handleLogout}
            className="flex items-center"
          >
            <LogOut size={16} className="mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage; 