export type User = {
  id: string;
  username: string;
  avatarUrl: string;
  chips: number;
};

export type Room = {
  id: string;
  name: string;
  players: number;
  maxPlayers: number;
  minBuy: number;
  maxBuy: number;
  blinds: string;
  roomType: 'cash' | 'tournament';
};

export type Card = {
  suit: 'hearts' | 'diamonds' | 'clubs' | 'spades';
  value: string; // '2' through '10', 'J', 'Q', 'K', 'A'
  faceUp?: boolean;
};

export type PlayerPosition = {
  id: string;
  username: string;
  avatarUrl: string;
  chips: number;
  cards?: Card[];
  isActive: boolean;
  isFolded: boolean;
  isDealer: boolean;
  isBigBlind: boolean;
  isSmallBlind: boolean;
  bet?: number;
  position: number; // 0-8 for position around the table
};

export type GameState = {
  pot: number;
  currentBet: number;
  minRaise: number;
  communityCards: Card[];
  players: PlayerPosition[];
  activePlayerId: string;
  dealerId: string;
  stage: 'pre-flop' | 'flop' | 'turn' | 'river' | 'showdown';
};

export type ChatMessage = {
  id: string;
  username: string;
  avatarUrl: string;
  message: string;
  timestamp: string;
};

export type Rule = {
  id: string;
  title: string;
  content: string;
};

export type PokerHand = {
  name: string;
  description: string;
  example: string;
  rank: number;
};