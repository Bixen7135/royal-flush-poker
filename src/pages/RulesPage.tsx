import React from 'react';
import Layout from '../components/common/Layout';
import RuleCard from '../components/rules/RuleCard';
import { Rule, PokerHand } from '../types';

// Sample rules data
const rules: Rule[] = [
  {
    id: '1',
    title: 'Basic Rules of Texas Hold\'em',
    content: `Texas Hold'em is played with a standard 52-card deck. The goal is to make the best five-card poker hand using your two hole cards and the five community cards.

1. Each player is dealt two private cards (hole cards)
2. Five community cards are dealt face up in the middle of the table
3. Players can use any combination of their hole cards and the community cards to make their best five-card hand
4. The player with the best hand at showdown wins the pot`
  },
  {
    id: '2',
    title: 'Betting Rounds',
    content: `There are four betting rounds in Texas Hold'em:

1. Pre-Flop: After receiving hole cards, betting begins with the player to the left of the big blind
2. Flop: Three community cards are dealt face up, followed by a betting round
3. Turn: A fourth community card is dealt, followed by another betting round
4. River: The final community card is dealt, followed by the last betting round

In each betting round, players can:
- Check: Pass the action to the next player (only if no one has bet)
- Bet: Place chips into the pot
- Call: Match the current bet
- Raise: Increase the current bet
- Fold: Surrender their cards and exit the hand`
  },
  {
    id: '3',
    title: 'Hand Rankings',
    content: `Poker hands rank from highest to lowest:

1. Royal Flush: A, K, Q, J, 10 of the same suit
2. Straight Flush: Five consecutive cards of the same suit
3. Four of a Kind: Four cards of the same rank
4. Full House: Three of a kind plus a pair
5. Flush: Five cards of the same suit
6. Straight: Five consecutive cards of any suit
7. Three of a Kind: Three cards of the same rank
8. Two Pair: Two different pairs
9. One Pair: Two cards of the same rank
10. High Card: When no player has any of the above`
  },
  {
    id: '4',
    title: 'Blinds and Position',
    content: `Blinds are forced bets posted by players before any cards are dealt:

- Small Blind: Posted by the player to the left of the dealer
- Big Blind: Posted by the player to the left of the small blind (usually twice the small blind)

Position is crucial in poker:
- Early Position: First to act after the flop (disadvantageous)
- Middle Position: Acts in the middle of the betting round
- Late Position: Acts last or near the end (advantageous)
- Button: The dealer position, acts last after the flop (most advantageous)

The dealer button rotates clockwise after each hand.`
  },
  {
    id: '5',
    title: 'Pot Odds and Strategy',
    content: `Pot odds are the ratio of the current pot size to the cost of a contemplated call.

Example: If the pot is $100 and you need to call $20, your pot odds are 100:20 or 5:1.

Key strategy concepts:
- Position: Acting last gives you more information
- Starting Hand Selection: Play strong hands, fold weak ones
- Reading Opponents: Look for betting patterns and tells
- Bankroll Management: Only play with money you can afford to lose
- Aggression: Betting and raising is generally more profitable than calling`
  }
];

// Sample poker hands data
const pokerHands: PokerHand[] = [
  {
    name: 'Royal Flush',
    description: 'The best possible hand: A, K, Q, J, 10, all of the same suit.',
    example: 'A♠ K♠ Q♠ J♠ 10♠',
    rank: 1
  },
  {
    name: 'Straight Flush',
    description: 'Five consecutive cards of the same suit.',
    example: '9♥ 8♥ 7♥ 6♥ 5♥',
    rank: 2
  },
  {
    name: 'Four of a Kind',
    description: 'Four cards of the same rank.',
    example: 'Q♠ Q♥ Q♦ Q♣ 7♠',
    rank: 3
  },
  {
    name: 'Full House',
    description: 'Three cards of one rank and two of another.',
    example: '10♠ 10♥ 10♦ 9♠ 9♥',
    rank: 4
  },
  {
    name: 'Flush',
    description: 'Five cards of the same suit, not in sequence.',
    example: 'A♣ J♣ 8♣ 6♣ 2♣',
    rank: 5
  },
  {
    name: 'Straight',
    description: 'Five consecutive cards of different suits.',
    example: 'Q♠ J♥ 10♦ 9♣ 8♠',
    rank: 6
  },
  {
    name: 'Three of a Kind',
    description: 'Three cards of the same rank.',
    example: '8♠ 8♥ 8♦ K♠ 3♥',
    rank: 7
  },
  {
    name: 'Two Pair',
    description: 'Two cards of one rank and two of another.',
    example: 'A♠ A♥ J♦ J♣ 4♠',
    rank: 8
  },
  {
    name: 'One Pair',
    description: 'Two cards of the same rank.',
    example: '10♠ 10♥ A♦ 6♣ 2♠',
    rank: 9
  },
  {
    name: 'High Card',
    description: 'When no player has any of the above, the highest card wins.',
    example: 'A♠ Q♥ 9♦ 6♣ 3♠',
    rank: 10
  }
];

const RulesPage: React.FC = () => {
  return (
    <Layout title="Poker Rules" showBackButton>
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-serif font-bold mb-6 text-gradient">Game Rules</h2>
          <div className="space-y-4">
            {rules.map((rule) => (
              <RuleCard key={rule.id} rule={rule} />
            ))}
          </div>
        </section>
        
        <section className="mt-12">
          <h2 className="text-2xl font-serif font-bold mb-6 text-gradient">Hand Rankings</h2>
          <div className="overflow-hidden rounded-lg border border-gray-700 bg-gray-800/60">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-800">
                <tr>
                  <th scope="col" className="py-3.5 px-4 text-sm font-semibold text-left text-gray-300">Rank</th>
                  <th scope="col" className="py-3.5 px-4 text-sm font-semibold text-left text-gray-300">Hand</th>
                  <th scope="col" className="py-3.5 px-4 text-sm font-semibold text-left text-gray-300 hidden md:table-cell">Description</th>
                  <th scope="col" className="py-3.5 px-4 text-sm font-semibold text-left text-gray-300">Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700 bg-gray-800/30">
                {pokerHands.map((hand) => (
                  <tr key={hand.name} className="hover:bg-gray-700/30 transition-colors">
                    <td className="whitespace-nowrap py-4 px-4 text-sm font-medium text-accent-400">{hand.rank}</td>
                    <td className="whitespace-nowrap py-4 px-4 text-sm text-gray-300 font-medium">{hand.name}</td>
                    <td className="py-4 px-4 text-sm text-gray-400 hidden md:table-cell">{hand.description}</td>
                    <td className="whitespace-nowrap py-4 px-4 text-sm text-gray-300 font-mono">{hand.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default RulesPage;