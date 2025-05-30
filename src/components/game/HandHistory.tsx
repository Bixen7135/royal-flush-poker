import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, X } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';

interface Action {
  id: string;
  playerId: string;
  username: string;
  action: 'fold' | 'check' | 'call' | 'raise' | 'small-blind' | 'big-blind' | 'ante';
  amount?: number;
  timestamp: Date;
  round: 'pre-flop' | 'flop' | 'turn' | 'river' | 'showdown';
}

interface HandHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  actions: Action[];
  currentRound: Action['round'];
}

const HandHistory: React.FC<HandHistoryProps> = ({
  isOpen,
  onClose,
  actions,
  currentRound
}) => {
  const formatAmount = (amount?: number) => {
    if (!amount) return '';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getActionColor = (action: Action['action']) => {
    switch (action) {
      case 'fold':
        return 'text-red-400';
      case 'check':
        return 'text-gray-400';
      case 'call':
        return 'text-green-400';
      case 'raise':
        return 'text-blue-400';
      case 'small-blind':
      case 'big-blind':
      case 'ante':
        return 'text-yellow-400';
      default:
        return 'text-gray-400';
    }
  };

  const groupedActions = actions.reduce((acc, action) => {
    if (!acc[action.round]) {
      acc[action.round] = [];
    }
    acc[action.round].push(action);
    return acc;
  }, {} as Record<Action['round'], Action[]>);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          className="absolute top-0 right-0 w-80 h-full bg-background-800 border-l border-gray-700 flex flex-col"
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-700 flex items-center justify-between">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <History className="w-5 h-5" />
              Hand History
            </h3>
            <Button
              variant="ghost"
              onClick={onClose}
              className="p-1 hover:bg-gray-700 rounded"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Actions */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {Object.entries(groupedActions).map(([round, roundActions]) => (
              <div key={round} className="space-y-2">
                <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                  {round.replace('-', ' ')}
                </h4>
                <Card className="p-3 space-y-2">
                  {roundActions.map(action => (
                    <motion.div
                      key={action.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{action.username}</span>
                        <span className={getActionColor(action.action)}>
                          {action.action.charAt(0).toUpperCase() + action.action.slice(1)}
                        </span>
                      </div>
                      {action.amount && (
                        <span className="font-mono text-accent-400">
                          {formatAmount(action.amount)}
                        </span>
                      )}
                    </motion.div>
                  ))}
                </Card>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HandHistory; 