import React from 'react';
import { motion } from 'framer-motion';

interface PlayingCardProps {
  suit: 'hearts' | 'diamonds' | 'clubs' | 'spades';
  rank: '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';
  faceDown?: boolean;
  className?: string;
}

const suitSymbols = {
  hearts: '♥',
  diamonds: '♦',
  clubs: '♣',
  spades: '♠'
};

const suitColors = {
  hearts: 'text-red-500',
  diamonds: 'text-red-500',
  clubs: 'text-gray-200',
  spades: 'text-gray-200'
};

export const PlayingCard: React.FC<PlayingCardProps> = ({
  suit,
  rank,
  faceDown = false,
  className = ''
}) => {
  const color = suitColors[suit];
  const symbol = suitSymbols[suit];

  if (faceDown) {
    return (
      <motion.div
        className={`relative rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 shadow-lg ${className}`}
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)'
        }}
      >
        <div className="absolute inset-0 rounded-lg border-2 border-white/10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-white/10" />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`relative rounded-lg bg-white shadow-lg ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      <div className="absolute inset-0 rounded-lg border border-gray-200" />
      
      {/* Top-left corner */}
      <div className="absolute top-2 left-2 flex flex-col items-center">
        <span className={`font-bold ${color}`}>{rank}</span>
        <span className={`text-lg ${color}`}>{symbol}</span>
      </div>

      {/* Center symbol */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`text-4xl ${color}`}>{symbol}</span>
      </div>

      {/* Bottom-right corner (upside down) */}
      <div className="absolute bottom-2 right-2 flex flex-col items-center rotate-180">
        <span className={`font-bold ${color}`}>{rank}</span>
        <span className={`text-lg ${color}`}>{symbol}</span>
      </div>

      {/* Card pattern */}
      <div className="absolute inset-0 rounded-lg opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            ${suit === 'hearts' || suit === 'diamonds' ? '#ef4444' : '#e5e7eb'},
            ${suit === 'hearts' || suit === 'diamonds' ? '#ef4444' : '#e5e7eb'} 10px,
            transparent 10px,
            transparent 20px
          )`
        }} />
      </div>
    </motion.div>
  );
};

export default PlayingCard; 