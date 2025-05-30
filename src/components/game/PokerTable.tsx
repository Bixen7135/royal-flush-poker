import React from 'react';
import PokerCard from './PokerCard';
import PlayerPosition from './PlayerPosition';
import ActionButtons from './ActionButtons';
import { GameState } from '../../types';

type PokerTableProps = {
  gameState: GameState;
  currentPlayerId: string;
  onFold: () => void;
  onCheck: () => void;
  onCall: () => void;
  onRaise: (amount: number) => void;
};

const PokerTable: React.FC<PokerTableProps> = ({
  gameState,
  currentPlayerId,
  onFold,
  onCheck,
  onCall,
  onRaise
}) => {
  // Find current player
  const currentPlayer = gameState.players.find(p => p.id === currentPlayerId);
  
  // Determine if current player can check (when there's no current bet or player has matched the bet)
  const canCheck = gameState.currentBet === 0 || 
    (currentPlayer?.bet && currentPlayer.bet >= gameState.currentBet);
  
  // Get positions for 9-max table layout
  const positions = Array(9).fill(null);
  gameState.players.forEach(player => {
    positions[player.position] = player;
  });
  
  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-full bg-table-900 border-8 border-gray-800 shadow-2xl">
      {/* Felt texture overlay */}
      <div className="absolute inset-0 bg-poker-felt bg-cover bg-center opacity-30"></div>
      
      {/* Inner border */}
      <div className="absolute inset-8 rounded-full border-2 border-gray-800/30"></div>
      
      {/* Table center with community cards and pot */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        {/* Community cards */}
        <div className="flex gap-2 mb-4">
          {gameState.communityCards.map((card, index) => (
            <PokerCard 
              key={index} 
              card={card} 
              className={`w-14 h-20 md:w-16 md:h-24 fade-in-delay-${index % 3}`}
            />
          ))}
          {/* Fill with empty spaces if less than 5 cards */}
          {Array.from({ length: Math.max(0, 5 - gameState.communityCards.length) }).map((_, index) => (
            <div 
              key={`empty-${index}`} 
              className="poker-card opacity-20 w-14 h-20 md:w-16 md:h-24 border border-gray-700"
            ></div>
          ))}
        </div>
        
        {/* Pot display */}
        <div className="bg-black/40 backdrop-blur-sm rounded-lg px-4 py-2 text-center">
          <div className="text-xs text-gray-400 uppercase tracking-wide">Pot</div>
          <div className="text-2xl font-bold text-accent-400">
            {gameState.pot.toLocaleString()}
          </div>
        </div>
        
        {/* Current game stage */}
        <div className="mt-2 text-xs text-gray-300 uppercase tracking-wide">
          {gameState.stage === 'pre-flop' ? 'Pre-Flop' : 
           gameState.stage === 'flop' ? 'Flop' :
           gameState.stage === 'turn' ? 'Turn' :
           gameState.stage === 'river' ? 'River' : 'Showdown'}
        </div>
      </div>
      
      {/* Player positions */}
      <div className="absolute inset-0">
        {/* Bottom center (position 0) - Current player */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-2">
          {positions[0] && (
            <PlayerPosition 
              player={positions[0]} 
              isCurrentPlayer={positions[0].id === currentPlayerId}
              isActivePlayer={positions[0].id === gameState.activePlayerId}
              showCards={positions[0].id === currentPlayerId}
            />
          )}
        </div>
        
        {/* Bottom left (position 1) */}
        <div className="absolute bottom-12 left-12 transform -translate-x-1/2">
          {positions[1] && (
            <PlayerPosition 
              player={positions[1]} 
              isCurrentPlayer={positions[1].id === currentPlayerId}
              isActivePlayer={positions[1].id === gameState.activePlayerId}
              showCards={positions[1].id === currentPlayerId}
            />
          )}
        </div>
        
        {/* Left (position 2) */}
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 ml-2">
          {positions[2] && (
            <PlayerPosition 
              player={positions[2]} 
              isCurrentPlayer={positions[2].id === currentPlayerId}
              isActivePlayer={positions[2].id === gameState.activePlayerId}
              showCards={positions[2].id === currentPlayerId}
            />
          )}
        </div>
        
        {/* Top left (position 3) */}
        <div className="absolute top-12 left-12 transform -translate-x-1/2">
          {positions[3] && (
            <PlayerPosition 
              player={positions[3]} 
              isCurrentPlayer={positions[3].id === currentPlayerId}
              isActivePlayer={positions[3].id === gameState.activePlayerId}
              showCards={positions[3].id === currentPlayerId}
            />
          )}
        </div>
        
        {/* Top center (position 4) */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-2">
          {positions[4] && (
            <PlayerPosition 
              player={positions[4]} 
              isCurrentPlayer={positions[4].id === currentPlayerId}
              isActivePlayer={positions[4].id === gameState.activePlayerId}
              showCards={positions[4].id === currentPlayerId}
            />
          )}
        </div>
        
        {/* Top right (position 5) */}
        <div className="absolute top-12 right-12 transform translate-x-1/2">
          {positions[5] && (
            <PlayerPosition 
              player={positions[5]} 
              isCurrentPlayer={positions[5].id === currentPlayerId}
              isActivePlayer={positions[5].id === gameState.activePlayerId}
              showCards={positions[5].id === currentPlayerId}
            />
          )}
        </div>
        
        {/* Right (position 6) */}
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 mr-2">
          {positions[6] && (
            <PlayerPosition 
              player={positions[6]} 
              isCurrentPlayer={positions[6].id === currentPlayerId}
              isActivePlayer={positions[6].id === gameState.activePlayerId}
              showCards={positions[6].id === currentPlayerId}
            />
          )}
        </div>
        
        {/* Bottom right (position 7) */}
        <div className="absolute bottom-12 right-12 transform translate-x-1/2">
          {positions[7] && (
            <PlayerPosition 
              player={positions[7]} 
              isCurrentPlayer={positions[7].id === currentPlayerId}
              isActivePlayer={positions[7].id === gameState.activePlayerId}
              showCards={positions[7].id === currentPlayerId}
            />
          )}
        </div>
        
        {/* Extra position for 9-max table (position 8) */}
        <div className="absolute bottom-0 right-24 transform translate-x-1/2 mb-12">
          {positions[8] && (
            <PlayerPosition 
              player={positions[8]} 
              isCurrentPlayer={positions[8].id === currentPlayerId}
              isActivePlayer={positions[8].id === gameState.activePlayerId}
              showCards={positions[8].id === currentPlayerId}
            />
          )}
        </div>
      </div>
      
      {/* Action buttons (only show if it's current player's turn) */}
      {currentPlayerId === gameState.activePlayerId && currentPlayer && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4">
          <ActionButtons 
            currentBet={gameState.currentBet}
            playerChips={currentPlayer.chips}
            minRaise={gameState.minRaise}
            onFold={onFold}
            onCheck={onCheck}
            onCall={onCall}
            onRaise={onRaise}
            canCheck={canCheck}
          />
        </div>
      )}
    </div>
  );
};

export default PokerTable;