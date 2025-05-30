import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/common/Layout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useAuth } from '../contexts/AuthContext';
import { Play, Users, Clock, Trophy, ChevronRight, Info, Star } from 'lucide-react';

interface Table {
  id: string;
  name: string;
  players: number;
  maxPlayers: number;
  ante: number;
  bringIn: number;
  minBet: number;
  maxBet: number;
  status: 'waiting' | 'playing';
  variant: 'Fixed Limit' | 'Pot Limit';
}

const SevenCardStudPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  // Mock data for available tables
  const tables: Table[] = [
    {
      id: '1',
      name: 'Stud Beginners',
      players: 3,
      maxPlayers: 8,
      ante: 1,
      bringIn: 2,
      minBet: 4,
      maxBet: 8,
      status: 'waiting',
      variant: 'Fixed Limit'
    },
    {
      id: '2',
      name: 'Stud Regular',
      players: 5,
      maxPlayers: 8,
      ante: 2,
      bringIn: 4,
      minBet: 8,
      maxBet: 16,
      status: 'playing',
      variant: 'Fixed Limit'
    },
    {
      id: '3',
      name: 'Stud High Stakes',
      players: 4,
      maxPlayers: 8,
      ante: 5,
      bringIn: 10,
      minBet: 20,
      maxBet: 40,
      status: 'waiting',
      variant: 'Fixed Limit'
    }
  ];

  return (
    <Layout title="Seven Card Stud" showBackButton>
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Game Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <div className="p-6">
              <h2 className="text-2xl font-serif font-bold mb-4">Game Overview</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 mb-4">
                  Seven Card Stud is a classic poker variant where each player receives seven cards throughout the hand,
                  with three cards dealt face-down and four face-up. Unlike Hold'em and Omaha, there are no community cards.
                  Players must make the best five-card hand from their seven cards, and betting is typically done in a fixed-limit format.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-200 mb-2">Game Rules</h3>
                    <ul className="text-sm text-gray-400 space-y-2">
                      <li>• Each player pays an ante to start</li>
                      <li>• Players receive 2 down cards and 1 up card</li>
                      <li>• Low card brings in the betting</li>
                      <li>• Three more up cards are dealt</li>
                      <li>• Final card is dealt face down</li>
                      <li>• Best 5-card hand wins</li>
                    </ul>
                  </div>
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-200 mb-2">Key Features</h3>
                    <ul className="text-sm text-gray-400 space-y-2">
                      <li>• No community cards</li>
                      <li>• Fixed-limit betting structure</li>
                      <li>• Ante and bring-in required</li>
                      <li>• Players can see 4 of 7 opponent cards</li>
                      <li>• Memory and observation skills crucial</li>
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
                      <span className="text-accent-400 font-medium">{(12000 - rank * 1200).toLocaleString()} CHIPS</span>
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
                  <li>• Pay attention to exposed cards</li>
                  <li>• Watch for paired door cards</li>
                  <li>• Remember folded cards</li>
                  <li>• Position matters less than in Hold'em</li>
                  <li>• Starting hand selection is crucial</li>
                </ul>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <h2 className="text-xl font-serif font-bold mb-4 flex items-center">
                  <Star size={20} className="mr-2" />
                  Starting Hand Guide
                </h2>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>• Three of a kind (rolled up)</li>
                  <li>• High pairs with kicker</li>
                  <li>• Three to a straight flush</li>
                  <li>• Three high cards</li>
                  <li>• Three to a flush</li>
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
                        Ante/Bring-in
                      </span>
                      <span>{table.ante}/{table.bringIn}</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-400">
                      <span>Betting Limits</span>
                      <span>{table.minBet}/{table.maxBet}</span>
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

export default SevenCardStudPage; 