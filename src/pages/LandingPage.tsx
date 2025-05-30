import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/common/Layout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { Play, Users, Info, ChevronRight, Crown, Sparkles } from 'lucide-react';

const LandingPage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState('');
  const [showJoinModal, setShowJoinModal] = useState(false);

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomId.trim()) {
      navigate(`/game/${roomId}`);
    }
  };

  const features = [
    {
      icon: <Crown className="w-6 h-6 text-accent-400" />,
      title: "Multiple Game Variants",
      description: "Play Texas Hold'em, Omaha, and Seven Card Stud"
    },
    {
      icon: <Users className="w-6 h-6 text-accent-400" />,
      title: "Real-time Multiplayer",
      description: "Compete with players from around the world"
    },
    {
      icon: <Sparkles className="w-6 h-6 text-accent-400" />,
      title: "Beautiful Interface",
      description: "Enjoy a modern, responsive design with smooth animations"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background-900 to-background-800 z-0" />
        <div className="absolute inset-0 bg-[url('/images/poker-table.jpg')] bg-cover bg-center opacity-10 z-0" />
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 bg-gradient-to-r from-accent-400 to-accent-600 bg-clip-text text-transparent">
              Project Bolt Poker
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Experience the thrill of professional poker in a modern, user-friendly environment.
              Join tables, compete with friends, and master multiple poker variants.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              {currentUser ? (
                <>
                  <Link to="/create-room">
                    <Button variant="primary" className="w-full sm:w-auto">
                      <Play className="w-5 h-5 mr-2" />
                      Create Room
                    </Button>
                  </Link>
                  <Button 
                    variant="secondary" 
                    className="w-full sm:w-auto"
                    onClick={() => setShowJoinModal(true)}
                  >
                    <Users className="w-5 h-5 mr-2" />
                    Join Room
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/register">
                    <Button variant="primary" className="w-full sm:w-auto">
                      Get Started
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="secondary" className="w-full sm:w-auto">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-serif font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </Card>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Join Room Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-background-800 p-6 rounded-lg w-full max-w-md mx-4"
          >
            <h2 className="text-2xl font-serif font-bold mb-4">Join Room</h2>
            <form onSubmit={handleJoinRoom}>
              <div className="mb-4">
                <label htmlFor="roomId" className="block text-sm font-medium text-gray-300 mb-2">
                  Room ID
                </label>
                <input
                  type="text"
                  id="roomId"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  className="w-full px-4 py-2 bg-background-700 border border-gray-700 rounded-lg focus:outline-none focus:border-accent-500"
                  placeholder="Enter room ID"
                  required
                />
              </div>
              <div className="flex gap-4">
                <Button type="submit" variant="primary" className="flex-1">
                  Join
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1"
                  onClick={() => setShowJoinModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Quick Links */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Link to="/rules">
            <Card className="p-6 hover:bg-background-700 transition-colors">
              <div className="flex items-center">
                <Info className="w-6 h-6 text-accent-400 mr-4" />
                <div>
                  <h3 className="text-xl font-serif font-bold mb-2">Learn to Play</h3>
                  <p className="text-gray-400">Master the rules and strategies of poker</p>
                </div>
              </div>
            </Card>
          </Link>
          <Link to="/games/texas-holdem">
            <Card className="p-6 hover:bg-background-700 transition-colors">
              <div className="flex items-center">
                <Play className="w-6 h-6 text-accent-400 mr-4" />
                <div>
                  <h3 className="text-xl font-serif font-bold mb-2">Start Playing</h3>
                  <p className="text-gray-400">Choose your game and join a table</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default LandingPage;