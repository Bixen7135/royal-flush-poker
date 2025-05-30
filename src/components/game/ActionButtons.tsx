import React from 'react';
import Button from '../common/Button';

type ActionButtonsProps = {
  currentBet: number;
  playerChips: number;
  minRaise: number;
  onFold: () => void;
  onCheck: () => void;
  onCall: () => void;
  onRaise: (amount: number) => void;
  canCheck: boolean;
};

const ActionButtons: React.FC<ActionButtonsProps> = ({
  currentBet,
  playerChips,
  minRaise,
  onFold,
  onCheck,
  onCall,
  onRaise,
  canCheck
}) => {
  const [raiseAmount, setRaiseAmount] = React.useState(minRaise);
  const maxRaise = playerChips;
  
  // Update raise amount when minRaise changes
  React.useEffect(() => {
    setRaiseAmount(minRaise);
  }, [minRaise]);
  
  // Handle raise input change
  const handleRaiseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= minRaise && value <= maxRaise) {
      setRaiseAmount(value);
    }
  };
  
  // Quick raise buttons (2x, 3x, pot)
  const handleQuickRaise = (multiplier: number) => {
    const newAmount = Math.min(currentBet * multiplier, maxRaise);
    setRaiseAmount(Math.max(newAmount, minRaise));
  };
  
  return (
    <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg border border-gray-800 p-4 shadow-lg">
      <div className="flex justify-between mb-4 gap-2">
        <Button
          variant="fold"
          onClick={onFold}
          className="flex-1"
        >
          Fold
        </Button>
        
        {canCheck ? (
          <Button
            variant="call"
            onClick={onCheck}
            className="flex-1"
          >
            Check
          </Button>
        ) : (
          <Button
            variant="call"
            onClick={onCall}
            className="flex-1"
          >
            Call {currentBet}
          </Button>
        )}
        
        <Button
          variant="raise"
          onClick={() => onRaise(raiseAmount)}
          className="flex-1"
          disabled={playerChips < minRaise}
        >
          Raise
        </Button>
      </div>
      
      <div className="mb-2">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>Min: {minRaise}</span>
          <span>Max: All-in ({playerChips})</span>
        </div>
        <input
          type="range"
          min={minRaise}
          max={maxRaise}
          value={raiseAmount}
          onChange={handleRaiseChange}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-accent-500"
          disabled={playerChips < minRaise}
        />
        <div className="mt-2 flex justify-between gap-2">
          <input
            type="number"
            value={raiseAmount}
            onChange={handleRaiseChange}
            className="w-24 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-center text-accent-400"
            disabled={playerChips < minRaise}
          />
          <div className="flex gap-1 flex-1">
            <button
              onClick={() => handleQuickRaise(2)}
              className="flex-1 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-xs hover:bg-gray-700 transition-colors"
              disabled={playerChips < minRaise}
            >
              2x
            </button>
            <button
              onClick={() => handleQuickRaise(3)}
              className="flex-1 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-xs hover:bg-gray-700 transition-colors"
              disabled={playerChips < minRaise}
            >
              3x
            </button>
            <button
              onClick={() => handleQuickRaise(4)}
              className="flex-1 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-xs hover:bg-gray-700 transition-colors"
              disabled={playerChips < minRaise}
            >
              Pot
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionButtons;