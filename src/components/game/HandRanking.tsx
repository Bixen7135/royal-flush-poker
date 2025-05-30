import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, ChevronDown } from 'lucide-react';
import Card from '../common/Card';
import { PlayingCard } from './PlayingCard';

interface Card {
  suit: 'hearts' | 'diamonds' | 'clubs' | 'spades';
  rank: '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';
}

interface HandRankingProps {
  holeCards: (Card | null)[];
  communityCards: (Card | null)[];
  currentHand: {
    name: string;
    description: string;
    cards: Card[];
    kickers?: Card[];
  } | null;
  possibleHands: {
    name: string;
    description: string;
    probability: number;
  }[];
  className?: string;
}

const HandRanking: React.FC<HandRankingProps> = ({
  holeCards,
  communityCards,
  currentHand,
  possibleHands,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`relative ${className}`}
    >
      <Card className="p-4">
        {/* Current Hand */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-accent-400" />
            <h3 className="text-lg font-bold">Current Hand</h3>
          </div>

          {currentHand ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-medium">{currentHand.name}</span>
                <span className="text-sm text-gray-400">
                  {currentHand.description}
                </span>
              </div>

              <div className="flex gap-2">
                {currentHand.cards.map((card, index) => (
                  <PlayingCard
                    key={index}
                    suit={card.suit}
                    rank={card.rank}
                    className="w-12 h-16"
                  />
                ))}
                {currentHand.kickers?.map((card, index) => (
                  <PlayingCard
                    key={`kicker-${index}`}
                    suit={card.suit}
                    rank={card.rank}
                    className="w-12 h-16 opacity-75"
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-gray-400">
              No hand yet
            </div>
          )}

          {/* Possible Hands */}
          <div className="pt-4 border-t border-gray-700">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center justify-between w-full text-left"
            >
              <div className="flex items-center gap-2">
                <span className="font-medium">Possible Hands</span>
                <span className="text-sm text-gray-400">
                  ({possibleHands.length})
                </span>
              </div>
              <ChevronDown
                className={`w-5 h-5 transform transition-transform ${
                  isExpanded ? 'rotate-180' : ''
                }`}
              />
            </button>

            <motion.div
              initial={false}
              animate={{ height: isExpanded ? 'auto' : 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4 space-y-2">
                {possibleHands.map((hand, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-sm"
                  >
                    <div>
                      <span className="font-medium">{hand.name}</span>
                      <span className="text-gray-400 ml-2">
                        {hand.description}
                      </span>
                    </div>
                    <div className="font-mono text-accent-400">
                      {(hand.probability * 100).toFixed(1)}%
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default HandRanking; 