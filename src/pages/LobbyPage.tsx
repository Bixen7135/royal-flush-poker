import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/common/Layout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Play, Clock, ChevronRight, Crown, Info, RefreshCw } from 'lucide-react';

interface Player {
  id: string;
  username: string;
  chips: number;
  status: 'online' | 'playing';
  avatar?: string;
}

interface Table {
  id: string;
  name: string;
  gameType: 'texas-holdem' | 'omaha' | 'seven-card-stud';
  players: number;
  maxPlayers: number;
  status: 'waiting' | 'playing';
  blinds?: string;
  ante?: number;
  bringIn?: number;
}

const LobbyPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [activePlayers, setActivePlayers] = useState<Player[]>([]);
  const [activeTables, setActiveTables] = useState<Table[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGameType, setSelectedGameType] = useState<string | null>(null);

  // Mock data for active players
  const mockPlayers: Player[] = [
    { id: '1', username: 'Player1', chips: 15000, status: 'online' },
    { id: '2', username: 'Player2', chips: 12000, status: 'playing' },
    { id: '3', username: 'Player3', chips: 8000, status: 'online' },
    { id: '4', username: 'Player4', chips: 25000, status: 'playing' },
    { id: '5', username: 'Player5', chips: 18000, status: 'online' },
  ];

  // Mock data for active tables
  const mockTables: Table[] = [
    {
      id: '1',
      name: 'Texas Hold\'em Table 1',
      gameType: 'texas-holdem',
      players: 5,
      maxPlayers: 9,
      status: 'playing',
      blinds: '1/2'
    },
    {
      id: '2',
      name: 'Omaha Table 1',
      gameType: 'omaha',
      players: 3,
      maxPlayers: 9,
      status: 'waiting',
      blinds: '0.5/1'
    },
    {
      id: '3',
      name: 'Seven Card Stud Table 1',
      gameType: 'seven-card-stud',
      players: 4,
      maxPlayers: 8,
      status: 'playing',
      ante: 1,
      bringIn: 2
    }
  ];

  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      setIsLoading(true);
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setActivePlayers(mockPlayers);
      setActiveTables(mockTables);
      setIsLoading(false);
    };

    loadData();
  }, []);

  const filteredTables = selectedGameType
    ? activeTables.filter(table => table.gameType === selectedGameType)
    : activeTables;

  const gameTypes = [
    { id: 'texas-holdem', name: 'Texas Hold\'em' },
    { id: 'omaha', name: 'Omaha' },
    { id: 'seven-card-stud', name: 'Seven Card Stud' }
  ];

  return (
    <Layout title="Game Lobby" showBackButton>
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Game Type Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant={selectedGameType === null ? 'primary' : 'secondary'}
            onClick={() => setSelectedGameType(null)}
            className="flex items-center"
          >
            <Play className="w-4 h-4 mr-2" />
            All Games
          </Button>
          {gameTypes.map(gameType => (
            <Button
              key={gameType.id}
              variant={selectedGameType === gameType.id ? 'primary' : 'secondary'}
              onClick={() => setSelectedGameType(gameType.id)}
              className="flex items-center"
            >
              <Play className="w-4 h-4 mr-2" />
              {gameType.name}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Players */}
          <div className="lg:col-span-1">
            <Card>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-serif font-bold flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Active Players
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsLoading(true)}
                    className="text-gray-400 hover:text-white"
                  >
                    <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                  </Button>
                </div>

                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      {[1, 2, 3].map(i => (
                        <div key={i} className="h-12 bg-gray-800/50 rounded animate-pulse" />
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-3"
                    >
                      {activePlayers.map(player => (
                        <div
                          key={player.id}
                          className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg"
                        >
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-accent-500/20 flex items-center justify-center mr-3">
                              <Crown className="w-4 h-4 text-accent-400" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-200">{player.username}</div>
                              <div className="text-sm text-gray-400">
                                {player.status === 'playing' ? 'In Game' : 'Online'}
                              </div>
                            </div>
                          </div>
                          <div className="text-accent-400 font-medium">
                            {player.chips.toLocaleString()} CHIPS
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Card>
          </div>

          {/* Active Tables */}
          <div className="lg:col-span-2">
            <Card>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-serif font-bold flex items-center">
                    <Play className="w-5 h-5 mr-2" />
                    Active Tables
                  </h2>
                  <Link to="/create-room">
                    <Button variant="primary" className="flex items-center">
                      <Play className="w-4 h-4 mr-2" />
                      Create Table
                    </Button>
                  </Link>
                </div>

                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-32 bg-gray-800/50 rounded animate-pulse" />
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      {filteredTables.map(table => (
                        <Link
                          key={table.id}
                          to={`/game/${table.id}`}
                          className="block p-4 rounded-lg border border-gray-800 hover:border-gray-700 bg-gray-800/50 transition-colors"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-medium text-gray-200">{table.name}</h3>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              table.status === 'playing' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {table.status === 'playing' ? 'Playing' : 'Waiting'}
                            </span>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center justify-between text-gray-400">
                              <span className="flex items-center">
                                <Users className="w-4 h-4 mr-1" />
                                Players
                              </span>
                              <span>{table.players}/{table.maxPlayers}</span>
                            </div>
                            {table.blinds && (
                              <div className="flex items-center justify-between text-gray-400">
                                <span className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  Blinds
                                </span>
                                <span>{table.blinds}</span>
                              </div>
                            )}
                            {table.ante && (
                              <div className="flex items-center justify-between text-gray-400">
                                <span className="flex items-center">
                                  <Info className="w-4 h-4 mr-1" />
                                  Ante/Bring-in
                                </span>
                                <span>{table.ante}/{table.bringIn}</span>
                              </div>
                            )}
                          </div>
                          <Button
                            variant="secondary"
                            className="w-full mt-4 flex items-center justify-center"
                            disabled={!currentUser}
                          >
                            Join Table
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LobbyPage;