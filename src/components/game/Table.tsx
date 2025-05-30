import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Settings2, History, Trophy } from 'lucide-react';
import Button from '../common/Button';
import PlayerSeat from './PlayerSeat';
import CommunityCards from './CommunityCards';
import PotDisplay from './PotDisplay';
import BettingControls from './BettingControls';
import ChatPanel from './ChatPanel';
import GameSettings from './GameSettings';
import HandHistory from './HandHistory';
import HandRanking from './HandRanking';
import Timer from './Timer';

interface Card {
  suit: 'hearts' | 'diamonds' | 'clubs' | 'spades';
  rank: '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';
}

interface Player {
  id: string;
  username: string;
  chips: number;
  avatar?: string;
  status: 'active' | 'folded' | 'all-in' | 'away';
  cards?: (Card | null)[];
  currentBet?: number;
  isDealer?: boolean;
  isTurn?: boolean;
  position: number;
}

interface TableProps {
  roomId: string;
  players: Player[];
  communityCards: (Card | null)[];
  mainPot: number;
  sidePots: { id: string; amount: number; players: string[] }[];
  currentBet: number;
  minBet: number;
  maxBet: number;
  isPlayerTurn: boolean;
  currentRound: 'pre-flop' | 'flop' | 'turn' | 'river' | 'showdown';
  actions: {
    id: string;
    playerId: string;
    username: string;
    action: 'fold' | 'check' | 'call' | 'raise' | 'small-blind' | 'big-blind' | 'ante';
    amount?: number;
    timestamp: Date;
    round: 'pre-flop' | 'flop' | 'turn' | 'river' | 'showdown';
  }[];
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
  onAction: (action: 'fold' | 'check' | 'call' | 'raise', amount?: number) => void;
  onLeaveTable: () => void;
  onPlayerClick?: (playerId: string) => void;
  className?: string;
}

const Table: React.FC<TableProps> = ({
  roomId,
  players,
  communityCards,
  mainPot,
  sidePots,
  currentBet,
  minBet,
  maxBet,
  isPlayerTurn,
  currentRound,
  actions,
  currentHand,
  possibleHands,
  onAction,
  onLeaveTable,
  onPlayerClick,
  className = ''
}) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isHandRankingOpen, setIsHandRankingOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const handlePlayerClick = (player: Player) => {
    if (onPlayerClick) {
      onPlayerClick(player.id);
    }
    setSelectedPlayer(player);
  };

  const currentPlayer = players.find(p => p.isTurn);
  const playerCards = currentPlayer?.cards || [];

  return (
    <div className={`relative min-h-screen bg-gray-900 ${className}`}>
      {/* Table surface */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative w-full max-w-6xl aspect-[16/9] rounded-[100px] bg-green-800 shadow-2xl"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)'
          }}
        >
          {/* Table felt pattern */}
          <div className="absolute inset-0 rounded-[100px] opacity-10" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #000 0px, #000 1px, transparent 1px, transparent 10px)'
          }} />

          {/* Community cards */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <CommunityCards cards={communityCards} />
          </div>

          {/* Pot display */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-16">
            <PotDisplay mainPot={mainPot} sidePots={sidePots} />
          </div>

          {/* Player seats */}
          {Array.from({ length: 6 }).map((_, index) => {
            const player = players.find(p => p.position === index);
            return (
              <PlayerSeat
                key={index}
                position={index}
                player={player}
                onClick={player ? () => handlePlayerClick(player) : undefined}
              />
            );
          })}

          {/* Action timer */}
          {isPlayerTurn && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-32">
              <Timer
                duration={30}
                onTimeUp={() => onAction('fold')}
                isActive={isPlayerTurn}
              />
            </div>
          )}
        </motion.div>
      </div>

      {/* Game controls */}
      <div className="fixed bottom-4 right-4 flex gap-2">
        <Button
          variant="ghost"
          onClick={() => setIsHandRankingOpen(true)}
          className="p-2 rounded-full hover:bg-gray-700"
        >
          <Trophy className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          onClick={() => setIsHistoryOpen(true)}
          className="p-2 rounded-full hover:bg-gray-700"
        >
          <History className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          onClick={() => setIsChatOpen(true)}
          className="p-2 rounded-full hover:bg-gray-700"
        >
          <MessageSquare className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          onClick={() => setIsSettingsOpen(true)}
          className="p-2 rounded-full hover:bg-gray-700"
        >
          <Settings2 className="w-5 h-5" />
        </Button>
      </div>

      {/* Betting controls */}
      <BettingControls
        minBet={minBet}
        maxBet={maxBet}
        currentBet={currentBet}
        pot={mainPot}
        onAction={onAction}
        disabled={!isPlayerTurn}
      />

      {/* Chat panel */}
      <ChatPanel
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        roomId={roomId}
      />

      {/* Game settings */}
      <GameSettings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onLeaveTable={onLeaveTable}
      />

      {/* Hand history */}
      <HandHistory
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        actions={actions}
        currentRound={currentRound}
      />

      {/* Hand ranking */}
      <HandRanking
        holeCards={playerCards}
        communityCards={communityCards}
        currentHand={currentHand}
        possibleHands={possibleHands}
        className="fixed top-4 left-4"
      />
    </div>
  );
};

export default Table; 