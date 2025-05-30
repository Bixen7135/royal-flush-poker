import React from 'react';
import { motion } from 'framer-motion';
import { PlayingCard } from './PlayingCard';

interface Card {
  suit: 'hearts' | 'diamonds' | 'clubs' | 'spades';
  rank: '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';
}

interface CommunityCardsProps {
  cards: (Card | null)[];
  className?: string;
}

const CommunityCards: React.FC<CommunityCardsProps> = ({
  cards,
  className = ''
}) => {
  const getCardDelay = (index: number) => {
    // Delay each card's appearance slightly for a nice animation effect
    return index * 0.1;
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`flex items-center justify-center gap-2 ${className}`}
    >
      {cards.map((card, index) => (
        <motion.div
          key={index}
          initial={{ scale: 0, rotateY: 180 }}
          animate={{ scale: 1, rotateY: 0 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
            delay: getCardDelay(index)
          }}
          className="relative"
        >
          {card ? (
            <PlayingCard
              suit={card.suit}
              rank={card.rank}
              className="w-20 h-28 md:w-24 md:h-32"
            />
          ) : (
            <div className="w-20 h-28 md:w-24 md:h-32 rounded-lg border-2 border-dashed border-gray-600 bg-gray-800/50" />
          )}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CommunityCards; 