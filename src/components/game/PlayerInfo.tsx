import React from 'react';
import { motion } from 'framer-motion';
import { User, Trophy, TrendingUp, Clock, DollarSign } from 'lucide-react';
import Card from '../common/Card';

interface PlayerStats {
  gamesPlayed: number;
  handsWon: number;
  biggestPot: number;
  averageWin: number;
  timePlayed: number;
}

interface PlayerInfoProps {
  isOpen: boolean;
  onClose: () => void;
  player: {
    id: string;
    username: string;
    chips: number;
    avatar?: string;
    status: 'active' | 'folded' | 'all-in' | 'away';
    stats?: PlayerStats;
  };
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({ isOpen, onClose, player }) => {
  const stats = player.stats || {
    gamesPlayed: 0,
    handsWon: 0,
    biggestPot: 0,
    averageWin: 0,
    timePlayed: 0
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatChips = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const StatItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    value: string | number;
  }> = ({ icon, label, value }) => (
    <div className="flex items-center gap-3 p-2 rounded bg-gray-800/50">
      <div className="text-accent-400">{icon}</div>
      <div>
        <div className="text-sm text-gray-400">{label}</div>
        <div className="font-medium">{value}</div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.95 }}
      transition={{ duration: 0.2 }}
      className={`absolute inset-0 bg-black/50 flex items-center justify-center z-50 ${
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      onClick={() => onClose()}
    >
      <Card
        className="w-80"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center">
              {player.avatar ? (
                <img
                  src={player.avatar}
                  alt={player.username}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User className="w-8 h-8 text-gray-400" />
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold">{player.username}</h3>
              <div className="text-accent-400 font-medium">
                {formatChips(player.chips)}
              </div>
              <div className={`text-sm ${
                player.status === 'active' ? 'text-green-400' :
                player.status === 'folded' ? 'text-red-400' :
                player.status === 'all-in' ? 'text-yellow-400' :
                'text-gray-400'
              }`}>
                {player.status.charAt(0).toUpperCase() + player.status.slice(1)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <StatItem
              icon={<Trophy className="w-5 h-5" />}
              label="Games Played"
              value={stats.gamesPlayed}
            />
            <StatItem
              icon={<TrendingUp className="w-5 h-5" />}
              label="Hands Won"
              value={stats.handsWon}
            />
            <StatItem
              icon={<DollarSign className="w-5 h-5" />}
              label="Biggest Pot"
              value={formatChips(stats.biggestPot)}
            />
            <StatItem
              icon={<DollarSign className="w-5 h-5" />}
              label="Average Win"
              value={formatChips(stats.averageWin)}
            />
            <StatItem
              icon={<Clock className="w-5 h-5" />}
              label="Time Played"
              value={formatTime(stats.timePlayed)}
            />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default PlayerInfo; 