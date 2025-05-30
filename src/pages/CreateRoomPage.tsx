import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/common/Layout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { Play, Users, Clock, DollarSign, Settings, ChevronLeft } from 'lucide-react';

interface RoomSettings {
  gameType: 'texas-holdem' | 'omaha' | 'seven-card-stud';
  name: string;
  maxPlayers: number;
  blinds?: string;
  ante?: number;
  bringIn?: number;
  minBuyIn: number;
  maxBuyIn: number;
  isPrivate: boolean;
}

const CreateRoomPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [settings, setSettings] = useState<RoomSettings>({
    gameType: 'texas-holdem',
    name: '',
    maxPlayers: 9,
    blinds: '1/2',
    minBuyIn: 40,
    maxBuyIn: 100,
    isPrivate: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would create a room via API
    const roomId = Math.random().toString(36).substring(7);
    navigate(`/game/${roomId}`);
  };

  const gameTypes = [
    { id: 'texas-holdem', name: 'Texas Hold\'em', icon: <Play className="w-5 h-5" /> },
    { id: 'omaha', name: 'Omaha', icon: <Play className="w-5 h-5" /> },
    { id: 'seven-card-stud', name: 'Seven Card Stud', icon: <Play className="w-5 h-5" /> }
  ];

  return (
    <Layout title="Create Room" showBackButton>
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Game Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Game Type
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {gameTypes.map(gameType => (
                    <button
                      key={gameType.id}
                      type="button"
                      onClick={() => setSettings({ ...settings, gameType: gameType.id as RoomSettings['gameType'] })}
                      className={`p-4 rounded-lg border ${
                        settings.gameType === gameType.id
                          ? 'border-accent-500 bg-accent-500/10'
                          : 'border-gray-700 hover:border-gray-600'
                      } transition-colors`}
                    >
                      <div className="flex flex-col items-center text-center">
                        {gameType.icon}
                        <span className="mt-2 text-sm">{gameType.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Room Name */}
              <div>
                <label htmlFor="roomName" className="block text-sm font-medium text-gray-300 mb-2">
                  Room Name
                </label>
                <input
                  type="text"
                  id="roomName"
                  value={settings.name}
                  onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                  className="w-full px-4 py-2 bg-background-700 border border-gray-700 rounded-lg focus:outline-none focus:border-accent-500"
                  placeholder="Enter room name"
                  required
                />
              </div>

              {/* Game Settings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="maxPlayers" className="block text-sm font-medium text-gray-300 mb-2">
                    Max Players
                  </label>
                  <select
                    id="maxPlayers"
                    value={settings.maxPlayers}
                    onChange={(e) => setSettings({ ...settings, maxPlayers: Number(e.target.value) })}
                    className="w-full px-4 py-2 bg-background-700 border border-gray-700 rounded-lg focus:outline-none focus:border-accent-500"
                  >
                    <option value="6">6 Players</option>
                    <option value="9">9 Players</option>
                  </select>
                </div>

                {settings.gameType !== 'seven-card-stud' && (
                  <div>
                    <label htmlFor="blinds" className="block text-sm font-medium text-gray-300 mb-2">
                      Blinds
                    </label>
                    <select
                      id="blinds"
                      value={settings.blinds}
                      onChange={(e) => setSettings({ ...settings, blinds: e.target.value })}
                      className="w-full px-4 py-2 bg-background-700 border border-gray-700 rounded-lg focus:outline-none focus:border-accent-500"
                    >
                      <option value="0.5/1">0.5/1</option>
                      <option value="1/2">1/2</option>
                      <option value="2/4">2/4</option>
                      <option value="5/10">5/10</option>
                    </select>
                  </div>
                )}

                {settings.gameType === 'seven-card-stud' && (
                  <>
                    <div>
                      <label htmlFor="ante" className="block text-sm font-medium text-gray-300 mb-2">
                        Ante
                      </label>
                      <input
                        type="number"
                        id="ante"
                        value={settings.ante}
                        onChange={(e) => setSettings({ ...settings, ante: Number(e.target.value) })}
                        className="w-full px-4 py-2 bg-background-700 border border-gray-700 rounded-lg focus:outline-none focus:border-accent-500"
                        min="0"
                        step="0.5"
                      />
                    </div>
                    <div>
                      <label htmlFor="bringIn" className="block text-sm font-medium text-gray-300 mb-2">
                        Bring-in
                      </label>
                      <input
                        type="number"
                        id="bringIn"
                        value={settings.bringIn}
                        onChange={(e) => setSettings({ ...settings, bringIn: Number(e.target.value) })}
                        className="w-full px-4 py-2 bg-background-700 border border-gray-700 rounded-lg focus:outline-none focus:border-accent-500"
                        min="0"
                        step="0.5"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label htmlFor="minBuyIn" className="block text-sm font-medium text-gray-300 mb-2">
                    Min Buy-in
                  </label>
                  <input
                    type="number"
                    id="minBuyIn"
                    value={settings.minBuyIn}
                    onChange={(e) => setSettings({ ...settings, minBuyIn: Number(e.target.value) })}
                    className="w-full px-4 py-2 bg-background-700 border border-gray-700 rounded-lg focus:outline-none focus:border-accent-500"
                    min="0"
                    step="1"
                  />
                </div>

                <div>
                  <label htmlFor="maxBuyIn" className="block text-sm font-medium text-gray-300 mb-2">
                    Max Buy-in
                  </label>
                  <input
                    type="number"
                    id="maxBuyIn"
                    value={settings.maxBuyIn}
                    onChange={(e) => setSettings({ ...settings, maxBuyIn: Number(e.target.value) })}
                    className="w-full px-4 py-2 bg-background-700 border border-gray-700 rounded-lg focus:outline-none focus:border-accent-500"
                    min="0"
                    step="1"
                  />
                </div>
              </div>

              {/* Private Room Toggle */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="privateRoom"
                  checked={settings.isPrivate}
                  onChange={(e) => setSettings({ ...settings, isPrivate: e.target.checked })}
                  className="w-4 h-4 text-accent-500 border-gray-700 rounded focus:ring-accent-500"
                />
                <label htmlFor="privateRoom" className="ml-2 text-sm text-gray-300">
                  Private Room (Requires invite)
                </label>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button type="submit" variant="primary" className="flex items-center">
                  <Play className="w-5 h-5 mr-2" />
                  Create Room
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </Layout>
  );
};

export default CreateRoomPage;