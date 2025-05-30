import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign } from 'lucide-react';
import Card from '../common/Card';

interface Pot {
  id: string;
  amount: number;
  players: string[];
}

interface PotDisplayProps {
  mainPot: number;
  sidePots: Pot[];
  className?: string;
}

const PotDisplay: React.FC<PotDisplayProps> = ({
  mainPot,
  sidePots,
  className = ''
}) => {
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const totalPot = mainPot + sidePots.reduce((sum, pot) => sum + pot.amount, 0);

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`relative ${className}`}
    >
      <Card className="p-4 bg-gray-800/80 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-2">
          <DollarSign className="w-5 h-5 text-accent-400" />
          <h3 className="text-lg font-bold">Pot</h3>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Main Pot</span>
            <span className="font-mono text-accent-400">
              {formatAmount(mainPot)}
            </span>
          </div>

          {sidePots.map(pot => (
            <div
              key={pot.id}
              className="flex items-center justify-between text-sm"
            >
              <div className="text-gray-400">
                Side Pot ({pot.players.length} players)
              </div>
              <span className="font-mono text-accent-400">
                {formatAmount(pot.amount)}
              </span>
            </div>
          ))}

          <div className="pt-2 mt-2 border-t border-gray-700">
            <div className="flex items-center justify-between font-bold">
              <span>Total</span>
              <span className="font-mono text-accent-400">
                {formatAmount(totalPot)}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default PotDisplay; 