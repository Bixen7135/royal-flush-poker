import React from 'react';
import { motion } from 'framer-motion';
import { User, DollarSign } from 'lucide-react';
import { PlayingCard } from './PlayingCard';

interface Card {
  suit: 'hearts' | 'diamonds' | 'clubs' | 'spades';
  rank: '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';
}

interface PlayerSeatProps {
  position: number;
  player?: {
    id: string;
    username: string;
    chips: number;
    avatar?: string;
    status: 'active' | 'folded' | 'all-in' | 'away';
    cards?: (Card | null)[];
    currentBet?: number;
    isDealer?: boolean;
    isTurn?: boolean;
  };
  onClick?: () => void;
  className?: string;
}

const PlayerSeat: React.FC<PlayerSeatProps> = ({
  position,
  player,
  onClick,
  className = ''
}) => {
  const getPositionStyles = (pos: number) => {
    const positions = [
      'bottom-0 left-1/2 -translate-x-1/2', // bottom
      'bottom-1/4 left-0', // bottom left
      'top-1/4 left-0', // top left
      'top-0 left-1/2 -translate-x-1/2', // top
      'top-1/4 right-0', // top right
      'bottom-1/4 right-0', // bottom right
    ];
    return positions[pos % 6];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-400';
      case 'folded':
        return 'text-red-400';
      case 'all-in':
        return 'text-yellow-400';
      case 'away':
        return 'text-gray-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`absolute ${getPositionStyles(position)} ${className}`}
      onClick={onClick}
    >
      <div className="relative">
        {/* Player cards */}
        {player?.cards && (
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 flex gap-1">
            {player.cards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ rotateY: 180, scale: 0 }}
                animate={{ rotateY: 0, scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                  delay: index * 0.1
                }}
              >
                <PlayingCard
                  suit={card?.suit || 'hearts'}
                  rank={card?.rank || 'A'}
                  faceDown={!card}
                  className="w-16 h-24"
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* Player info */}
        <motion.div
          className={`relative rounded-lg bg-gray-800 p-3 min-w-[120px] ${
            player?.isTurn ? 'ring-2 ring-accent-400' : ''
          }`}
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          {/* Dealer button */}
          {player?.isDealer && (
            <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-accent-400 flex items-center justify-center text-xs font-bold">
              D
            </div>
          )}

          {/* Player avatar and name */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
              {player?.avatar ? (
                <img
                  src={player.avatar}
                  alt={player.username}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User className="w-5 h-5 text-gray-400" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">
                {player?.username || `Seat ${position + 1}`}
              </div>
              {player && (
                <div className="flex items-center gap-1 text-sm">
                  <DollarSign className="w-3 h-3" />
                  <span className="font-mono">
                    {player.chips.toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Player status and current bet */}
          {player && (
            <div className="mt-1 flex items-center justify-between text-sm">
              <span className={getStatusColor(player.status)}>
                {player.status.charAt(0).toUpperCase() + player.status.slice(1)}
              </span>
              {player.currentBet ? (
                <span className="font-mono text-accent-400">
                  ${player.currentBet.toLocaleString()}
                </span>
              ) : null}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PlayerSeat; 