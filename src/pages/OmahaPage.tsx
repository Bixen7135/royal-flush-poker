import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/common/Layout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useAuth } from '../contexts/AuthContext';
import { Play, Users, Clock, Trophy, ChevronRight, Info } from 'lucide-react';

interface Table {
  id: string;
  name: string;
  players: number;
  maxPlayers: number;
  blinds: string;
  minBuyIn: number;
  maxBuyIn: number;
  status: 'waiting' | 'playing';
  variant: 'PLO' | 'NLH'; // Pot Limit Omaha or No Limit Hold'em
}

const OmahaPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  // Mock data for available tables
  const tables: Table[] = [
    {
      id: '1',
      name: 'PLO Beginners',
      players: 2,
      maxPlayers: 9,
      blinds: '0.5/1',
      minBuyIn: 50,
      maxBuyIn: 100,
      status: 'waiting',
      variant: 'PLO'
    },
    {
      id: '2',
      name: 'PLO Regular',
      players: 5,
      maxPlayers: 9,
      blinds: '1/2',
      minBuyIn: 100,
      maxBuyIn: 200,
      status: 'playing',
      variant: 'PLO'
    },
    {
      id: '3',
      name: 'PLO High Stakes',
      players: 3,
      maxPlayers: 9,
      blinds: '2/4',
      minBuyIn: 200,
      maxBuyIn: 500,
      status: 'waiting',
      variant: 'PLO'
    }
  ];

  return (
    <Layout title="Omaha Poker" showBackButton>
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Game Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <div className="p-6">
              <h2 className="text-2xl font-serif font-bold mb-4">Game Overview</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 mb-4">
                  Omaha Poker is a popular variant where each player receives four private cards (instead of two in Texas Hold'em).
                  Players must use exactly two of their private cards and exactly three community cards to make their best hand.
                  This creates more action and bigger pots, as players have more possible hand combinations.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-200 mb-2">Game Rules</h3>
                    <ul className="text-sm text-gray-400 space-y-2">
                      <li>• Each player receives 4 private cards</li>
                      <li>• Must use exactly 2 private cards</li>
                      <li>• Must use exactly 3 community cards</li>
                      <li>• Pot Limit betting (max bet = pot size)</li>
                      <li>• Same hand rankings as Hold'em</li>
                    </ul>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-200 mb-2">Key Differences from Hold'em</h3>
                    <ul className="text-sm text-gray-400 space-y-2">
                      <li>• Four hole cards instead of two</li>
                      <li>• Must use exactly two hole cards</li>
                      <li>• More possible hand combinations</li>
                      <li>• Pot Limit betting structure</li>
                      <li>• Higher variance in hand strength</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="space-y-6">
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-serif font-bold mb-4 flex items-center">
                  <Trophy size={20} className="mr-2" />
                  Leaderboard
                </h2>
                <div className="space-y-3">
                  {[1, 2, 3].map((rank) => (
                    <div key={rank} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center">
                        <span className="w-6 h-6 flex items-center justify-center bg-accent-500/20 text-accent-400 rounded-full text-sm font-medium">
                          {rank}
                        </span>
                        <span className="ml-3 text-gray-300">Player {rank}</span>
                      </div>
                      <span className="text-accent-400 font-medium">{(15000 - rank * 1500).toLocaleString()} CHIPS</span>
                    </div>
                  ))}
                </div>
                <Button variant="secondary" className="w-full mt-4">
                  View Full Leaderboard
                </Button>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <h2 className="text-xl font-serif font-bold mb-4 flex items-center">
                  <Info size={20} className="mr-2" />
                  Quick Tips
                </h2>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>• Look for hands with coordinated cards</li>
                  <li>• Beware of the "nut" hand trap</li>
                  <li>• Position is even more important in PLO</li>
                  <li>• Watch for potential straight draws</li>
                  <li>• Manage your bankroll carefully</li>
                </ul>
              </div>
            </Card>
          </div>
        </div>

        {/* Available Tables */}
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-serif font-bold">Available Tables</h2>
              <Link to="/create-room">
                <Button variant="primary" className="flex items-center">
                  <Play size={16} className="mr-2" />
                  Create Table
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tables.map((table) => (
                <div
                  key={table.id}
                  className={`p-4 rounded-lg border transition-colors cursor-pointer ${
                    selectedTable === table.id
                      ? 'border-accent-500 bg-accent-500/10'
                      : 'border-gray-800 hover:border-gray-700 bg-gray-800/50'
                  }`}
                  onClick={() => setSelectedTable(table.id)}
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
                        <Users size={14} className="mr-1" />
                        Players
                      </span>
                      <span>{table.players}/{table.maxPlayers}</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-400">
                      <span className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        Blinds
                      </span>
                      <span>{table.blinds}</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-400">
                      <span>Buy-in</span>
                      <span>{table.minBuyIn}-{table.maxBuyIn} CHIPS</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-400">
                      <span>Variant</span>
                      <span className="text-accent-400">{table.variant}</span>
                    </div>
                  </div>
                  <Button
                    variant="secondary"
                    className="w-full mt-4 flex items-center justify-center"
                    disabled={!currentUser}
                  >
                    Join Table
                    <ChevronRight size={16} className="ml-1" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default OmahaPage; 