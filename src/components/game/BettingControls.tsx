import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import Button from '../common/Button';

interface BettingControlsProps {
  minBet: number;
  maxBet: number;
  currentBet: number;
  pot: number;
  onAction: (action: 'fold' | 'check' | 'call' | 'raise', amount?: number) => void;
  disabled?: boolean;
}

const BettingControls: React.FC<BettingControlsProps> = ({
  minBet,
  maxBet,
  currentBet,
  pot,
  onAction,
  disabled = false
}) => {
  const [betAmount, setBetAmount] = useState(minBet);
  const [isRaising, setIsRaising] = useState(false);

  useEffect(() => {
    setBetAmount(minBet);
  }, [minBet]);

  const handleBetChange = (amount: number) => {
    const newAmount = Math.max(minBet, Math.min(maxBet, amount));
    setBetAmount(newAmount);
  };

  const quickBetAmounts = [
    { label: '1/2 Pot', value: Math.floor(pot / 2) },
    { label: '2/3 Pot', value: Math.floor(pot * 2 / 3) },
    { label: 'Pot', value: pot },
    { label: 'All In', value: maxBet }
  ];

  const canCheck = currentBet === 0;
  const callAmount = currentBet;

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 p-4"
    >
      <div className="max-w-4xl mx-auto">
        {isRaising ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <Button
                variant="secondary"
                onClick={() => setIsRaising(false)}
                disabled={disabled}
              >
                Cancel
              </Button>
              <div className="flex-1 flex items-center gap-4">
                <button
                  onClick={() => handleBetChange(betAmount - minBet)}
                  disabled={disabled || betAmount <= minBet}
                  className="p-2 rounded-full hover:bg-gray-700 disabled:opacity-50"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <input
                  type="range"
                  min={minBet}
                  max={maxBet}
                  value={betAmount}
                  onChange={e => handleBetChange(Number(e.target.value))}
                  disabled={disabled}
                  className="flex-1"
                />
                <button
                  onClick={() => handleBetChange(betAmount + minBet)}
                  disabled={disabled || betAmount >= maxBet}
                  className="p-2 rounded-full hover:bg-gray-700 disabled:opacity-50"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="w-32 text-right font-mono">
                ${betAmount.toLocaleString()}
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {quickBetAmounts.map(({ label, value }) => (
                <Button
                  key={label}
                  variant="secondary"
                  onClick={() => handleBetChange(value)}
                  disabled={disabled || value > maxBet}
                  className="text-sm"
                >
                  {label}
                </Button>
              ))}
            </div>

            <div className="flex gap-2">
              <Button
                variant="fold"
                onClick={() => onAction('fold')}
                disabled={disabled}
                className="flex-1"
              >
                Fold
              </Button>
              <Button
                variant="raise"
                onClick={() => onAction('raise', betAmount)}
                disabled={disabled}
                className="flex-1"
              >
                Raise to ${betAmount.toLocaleString()}
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="fold"
              onClick={() => onAction('fold')}
              disabled={disabled}
              className="flex-1"
            >
              Fold
            </Button>
            {canCheck ? (
              <Button
                variant="call"
                onClick={() => onAction('check')}
                disabled={disabled}
                className="flex-1"
              >
                Check
              </Button>
            ) : (
              <Button
                variant="call"
                onClick={() => onAction('call')}
                disabled={disabled}
                className="flex-1"
              >
                Call ${callAmount.toLocaleString()}
              </Button>
            )}
            <Button
              variant="raise"
              onClick={() => setIsRaising(true)}
              disabled={disabled || minBet >= maxBet}
              className="flex-1"
            >
              Raise
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default BettingControls; 