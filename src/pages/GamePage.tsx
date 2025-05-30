import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/common/Layout';
import Table from '../components/game/Table';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

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

type Action = {
  id: string;
  playerId: string;
  username: string;
  action: 'fold' | 'check' | 'call' | 'raise' | 'small-blind' | 'big-blind' | 'ante';
  amount?: number;
  timestamp: Date;
  round: 'pre-flop' | 'flop' | 'turn' | 'river' | 'showdown';
};

const GamePage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock game state
  const [gameState, setGameState] = useState({
    players: [
      {
        id: '1',
        username: 'Player 1',
        chips: 1000,
        status: 'active',
        position: 0,
        isDealer: true,
        isTurn: true,
        cards: [
          { suit: 'hearts', rank: 'A' },
          { suit: 'spades', rank: 'A' }
        ],
        currentBet: 50
      },
      {
        id: '2',
        username: 'Player 2',
        chips: 1500,
        status: 'active',
        position: 1,
        cards: [
          { suit: 'diamonds', rank: 'K' },
          { suit: 'clubs', rank: 'K' }
        ],
        currentBet: 100
      },
      {
        id: '3',
        username: 'Player 3',
        chips: 2000,
        status: 'folded',
        position: 2
      }
    ] as Player[],
    communityCards: [
      { suit: 'hearts', rank: 'Q' },
      { suit: 'diamonds', rank: 'J' },
      { suit: 'clubs', rank: '10' },
      null,
      null
    ] as (Card | null)[],
    mainPot: 150,
    sidePots: [],
    currentBet: 100,
    minBet: 100,
    maxBet: 2000,
    isPlayerTurn: true,
    currentRound: 'flop' as const,
    actions: [
      {
        id: '1',
        playerId: '1',
        username: 'Player 1',
        action: 'small-blind' as const,
        amount: 5,
        timestamp: new Date(Date.now() - 60000),
        round: 'pre-flop' as const
      },
      {
        id: '2',
        playerId: '2',
        username: 'Player 2',
        action: 'big-blind' as const,
        amount: 10,
        timestamp: new Date(Date.now() - 55000),
        round: 'pre-flop' as const
      },
      {
        id: '3',
        playerId: '1',
        username: 'Player 1',
        action: 'raise' as const,
        amount: 50,
        timestamp: new Date(Date.now() - 50000),
        round: 'pre-flop' as const
      },
      {
        id: '4',
        playerId: '2',
        username: 'Player 2',
        action: 'call' as const,
        amount: 50,
        timestamp: new Date(Date.now() - 45000),
        round: 'pre-flop' as const
      },
      {
        id: '5',
        playerId: '3',
        username: 'Player 3',
        action: 'fold' as const,
        timestamp: new Date(Date.now() - 40000),
        round: 'pre-flop' as const
      }
    ] as Action[],
    currentHand: {
      name: 'Pair of Aces',
      description: 'High card: Ace of Hearts',
      cards: [
        { suit: 'hearts' as const, rank: 'A' as const },
        { suit: 'spades' as const, rank: 'A' as const }
      ],
      kickers: [
        { suit: 'hearts' as const, rank: 'Q' as const },
        { suit: 'diamonds' as const, rank: 'J' as const },
        { suit: 'clubs' as const, rank: '10' as const }
      ]
    },
    possibleHands: [
      {
        name: 'Three of a Kind',
        description: 'Three Aces',
        probability: 0.15
      },
      {
        name: 'Full House',
        description: 'Aces full of Queens',
        probability: 0.05
      },
      {
        name: 'Two Pair',
        description: 'Aces and Queens',
        probability: 0.25
      },
      {
        name: 'Pair',
        description: 'Pair of Aces',
        probability: 0.55
      }
    ]
  });

  useEffect(() => {
    // Simulate loading game data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleAction = (action: 'fold' | 'check' | 'call' | 'raise', amount?: number) => {
    // Mock action handling
    console.log('Action:', action, amount);
    setGameState(prev => ({
      ...prev,
      isPlayerTurn: false,
      players: prev.players.map(player => {
        if (player.id === currentUser?.id) {
          return {
            ...player,
            status: action === 'fold' ? 'folded' : 'active',
            currentBet: amount || 0
          };
        }
        return player;
      })
    }));
  };

  const handleLeaveTable = () => {
    navigate('/lobby');
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <div className="w-16 h-16 border-4 border-accent-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-bold">Loading game...</h2>
          </motion.div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <Card className="p-6 max-w-md">
            <h2 className="text-xl font-bold text-red-400 mb-4">Error</h2>
            <p className="text-gray-300 mb-6">{error}</p>
            <Button
              variant="primary"
              onClick={() => navigate('/lobby')}
              className="w-full"
            >
              Return to Lobby
            </Button>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Table
        roomId={roomId || ''}
        players={gameState.players}
        communityCards={gameState.communityCards}
        mainPot={gameState.mainPot}
        sidePots={gameState.sidePots}
        currentBet={gameState.currentBet}
        minBet={gameState.minBet}
        maxBet={gameState.maxBet}
        isPlayerTurn={gameState.isPlayerTurn}
        currentRound={gameState.currentRound}
        actions={gameState.actions}
        currentHand={gameState.currentHand}
        possibleHands={gameState.possibleHands}
        onAction={handleAction}
        onLeaveTable={handleLeaveTable}
      />
    </Layout>
  );
};

export default GamePage;