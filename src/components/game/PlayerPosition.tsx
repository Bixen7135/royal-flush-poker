import React from 'react';
import PokerCard from './PokerCard';
import { PlayerPosition as PlayerPositionType } from '../../types';

type PlayerPositionProps = {
  player: PlayerPositionType;
  isCurrentPlayer?: boolean;
  isActivePlayer?: boolean;
  showCards?: boolean;
};

const PlayerPosition: React.FC<PlayerPositionProps> = ({ 
  player, 
  isCurrentPlayer = false,
  isActivePlayer = false,
  showCards = false
}) => {
  return (
    <div className={`relative flex flex-col items-center ${
      isActivePlayer ? 'animate-pulse-slow' : ''
    }`}>
      {/* Player avatar */}
      <div className={`relative w-14 h-14 rounded-full bg-gray-800 border-2 
        ${isCurrentPlayer ? 'border-accent-500' : 'border-gray-700'}
        ${player.isFolded ? 'opacity-50' : ''}
        ${isActivePlayer ? 'ring-2 ring-accent-400 ring-opacity-70' : ''}
        overflow-hidden`}
      >
        {player.avatarUrl ? (
          <img 
            src={player.avatarUrl} 
            alt={player.username} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            {player.username.charAt(0).toUpperCase()}
          </div>
        )}

        {/* Dealer button */}
        {player.isDealer && (
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-white text-gray-900 text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
            D
          </div>
        )}
        
        {/* Big blind indicator */}
        {player.isBigBlind && (
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-accent-500 text-gray-900 text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
            BB
          </div>
        )}
        
        {/* Small blind indicator */}
        {player.isSmallBlind && (
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-blue-500 text-gray-900 text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
            SB
          </div>
        )}
      </div>
      
      {/* Player name and chips */}
      <div className="mt-1 text-center">
        <div className="text-sm font-medium truncate max-w-24">
          {player.username}
        </div>
        <div className="text-xs text-accent-400 font-semibold">
          {player.chips.toLocaleString()}
        </div>
      </div>
      
      {/* Player cards */}
      {player.cards && player.cards.length > 0 && (
        <div className="mt-2 flex space-x-1">
          <PokerCard 
            card={player.cards[0]} 
            faceDown={!showCards && !isCurrentPlayer}
            className="w-8 h-12 text-xs transform -rotate-3"
          />
          <PokerCard 
            card={player.cards[1]} 
            faceDown={!showCards && !isCurrentPlayer}
            className="w-8 h-12 text-xs transform rotate-3"
          />
        </div>
      )}
      
      {/* Current bet */}
      {player.bet && player.bet > 0 && (
        <div className="mt-2">
          <div className="poker-chip chip-blue w-8 h-8 text-xs">
            {player.bet}
          </div>
        </div>
      )}
      
      {/* Fold indicator */}
      {player.isFolded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md">
          <div className="text-xs font-medium text-red-500">FOLDED</div>
        </div>
      )}
    </div>
  );
};

export default PlayerPosition;