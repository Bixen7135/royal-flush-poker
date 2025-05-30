import React from 'react';
import { Card as CardType } from '../../types';

type PokerCardProps = {
  card?: CardType;
  faceDown?: boolean;
  className?: string;
};

const PokerCard: React.FC<PokerCardProps> = ({ 
  card, 
  faceDown = false,
  className = '' 
}) => {
  // If no card is provided, return an empty placeholder
  if (!card) {
    return <div className={`poker-card opacity-0 ${className}`}></div>;
  }
  
  // If the card should be face down or if the card itself is marked as face down
  const isFaceDown = faceDown || (card.faceUp === false);
  
  // Determine if the card is red (hearts or diamonds)
  const isRed = card.suit === 'hearts' || card.suit === 'diamonds';
  
  // Get the suit symbol
  const getSuitSymbol = () => {
    switch (card.suit) {
      case 'hearts': return '♥';
      case 'diamonds': return '♦';
      case 'clubs': return '♣';
      case 'spades': return '♠';
      default: return '';
    }
  };
  
  return (
    <div 
      className={`poker-card ${isFaceDown ? 'poker-card-back' : ''} ${className}`}
      style={{ 
        transform: `translateZ(0) ${className.includes('transform') ? '' : 'scale(1)'}`,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
      }}
    >
      {!isFaceDown && (
        <>
          <div className={`absolute top-1 left-2 ${isRed ? 'text-red-600' : ''}`}>
            {card.value}
          </div>
          <div className={`absolute bottom-1 right-2 ${isRed ? 'text-red-600' : ''}`}>
            {getSuitSymbol()}
          </div>
          <div className={`text-4xl ${isRed ? 'text-red-600' : ''}`}>
            {getSuitSymbol()}
          </div>
        </>
      )}
    </div>
  );
};

export default PokerCard;