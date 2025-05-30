import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, LogIn, ChevronDown } from 'lucide-react';
import Button from './Button';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, logout } = useAuth();

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <nav className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-serif font-bold text-gradient">Royal Flush</span>
            </Link>
            <div className="hidden md:ml-8 md:flex md:space-x-8 items-center">
              <Link to="/lobby" className="text-gray-300 hover:text-accent-400 px-3 py-2 rounded-md">
                Lobby
              </Link>
              <Link to="/rules" className="text-gray-300 hover:text-accent-400 px-3 py-2 rounded-md">
                Rules
              </Link>
              <div className="relative group">
                <button className="text-gray-300 hover:text-accent-400 px-3 py-2 rounded-md flex items-center">
                  <span>Games</span>
                  <ChevronDown size={16} className="ml-1" />
                </button>
                <div className="absolute left-0 pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="bg-gray-800 border border-gray-700 rounded-md shadow-lg py-1">
                    <Link to="/games/texas-holdem" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                      Texas Hold'em
                    </Link>
                    <Link to="/games/omaha" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                      Omaha
                    </Link>
                    <Link to="/games/seven-card-stud" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                      Seven Card Stud
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center">
            {currentUser ? (
              <div className="flex items-center">
                <div className="mr-4 flex items-center text-accent-400">
                  <span className="font-medium">10,000</span>
                  <span className="text-xs ml-1">CHIPS</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Link to="/profile" className="flex items-center text-gray-300 hover:text-accent-400">
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center mr-2">
                      {currentUser.photoURL ? (
                        <img src={currentUser.photoURL} alt="Profile" className="w-full h-full rounded-full" />
                      ) : (
                        <User size={16} />
                      )}
                    </div>
                    <span>{currentUser.displayName || currentUser.email}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-gray-400 hover:text-accent-400 text-sm"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login">
                  <Button variant="secondary" className="flex items-center">
                    <LogIn size={16} className="mr-2" />
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary">Register</Button>
                </Link>
              </div>
            )}
          </div>

          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden"
              onClick={toggleMenu}
            />
            
            {/* Menu panel */}
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-gray-900 border-l border-gray-800 shadow-xl md:hidden overflow-y-auto"
            >
              <div className="p-4 space-y-6">
                {/* User section */}
                {currentUser ? (
                  <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                      {currentUser.photoURL ? (
                        <img src={currentUser.photoURL} alt="Profile" className="w-full h-full" />
                      ) : (
                        <User size={20} />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{currentUser.displayName || currentUser.email}</div>
                      <div className="text-sm text-accent-400">10,000 CHIPS</div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-3">
                    <Link to="/login" onClick={toggleMenu}>
                      <Button variant="secondary" className="w-full flex items-center justify-center">
                        <LogIn size={16} className="mr-2" />
                        Login
                      </Button>
                    </Link>
                    <Link to="/register" onClick={toggleMenu}>
                      <Button variant="primary" className="w-full">
                        Register
                      </Button>
                    </Link>
                  </div>
                )}

                {/* Navigation links */}
                <nav className="space-y-1">
                  <Link
                    to="/lobby"
                    onClick={toggleMenu}
                    className="block px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-md"
                  >
                    Lobby
                  </Link>
                  <Link
                    to="/rules"
                    onClick={toggleMenu}
                    className="block px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-md"
                  >
                    Rules
                  </Link>
                  <div className="px-4 py-2">
                    <div className="text-gray-400 text-sm font-medium mb-2">Games</div>
                    <div className="space-y-1 pl-2">
                      <Link
                        to="/games/texas-holdem"
                        onClick={toggleMenu}
                        className="block px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-md"
                      >
                        Texas Hold'em
                      </Link>
                      <Link
                        to="/games/omaha"
                        onClick={toggleMenu}
                        className="block px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-md"
                      >
                        Omaha
                      </Link>
                      <Link
                        to="/games/seven-card-stud"
                        onClick={toggleMenu}
                        className="block px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-md"
                      >
                        Seven Card Stud
                      </Link>
                    </div>
                  </div>
                </nav>

                {/* Footer links */}
                <div className="pt-4 border-t border-gray-800">
                  <div className="space-y-1">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-400 hover:text-accent-400">
                      Terms of Service
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-400 hover:text-accent-400">
                      Privacy Policy
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-400 hover:text-accent-400">
                      Contact Us
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-400 hover:text-accent-400">
                      Support
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;