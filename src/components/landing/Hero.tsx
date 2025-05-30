import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import { Play } from 'lucide-react';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-[90vh] flex items-center">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ 
          backgroundImage: "url('https://images.pexels.com/photos/1871508/pexels-photo-1871508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
          backgroundBlendMode: "overlay"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/90 to-gray-900/80"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-7xl px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`space-y-8 ${isVisible ? 'fade-in' : 'opacity-0'}`}>
            <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight">
              Experience the <span className="text-gradient">Ultimate</span> Poker Game
            </h1>
            <p className="text-xl text-gray-300 max-w-lg">
              Join our premium online poker lounge with immersive gameplay, professional tables, and high-stakes action.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <Link to="/lobby">
                <Button glow className="flex items-center justify-center w-full sm:w-auto">
                  <Play size={20} className="mr-2" />
                  Play Now
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="secondary" className="w-full sm:w-auto">
                  Register
                </Button>
              </Link>
            </div>
          </div>
          
          <div className={`${isVisible ? 'fade-in-delay-1' : 'opacity-0'}`}>
            <div className="relative">
              {/* Cards and chips floating display */}
              <div className="w-full h-96 relative perspective-1000">
                {/* Ace of spades */}
                <div className="absolute top-10 left-10 transform -rotate-12 transition-transform hover:rotate-0 duration-300 z-20">
                  <div className="poker-card shadow-lg">
                    <div className="absolute top-1 left-2">A</div>
                    <div className="absolute bottom-1 right-2">♠</div>
                    <div className="text-4xl">♠</div>
                  </div>
                </div>
                
                {/* King of hearts */}
                <div className="absolute top-16 left-28 transform rotate-6 transition-transform hover:rotate-0 duration-300 z-10">
                  <div className="poker-card shadow-lg">
                    <div className="absolute top-1 left-2 text-red-600">K</div>
                    <div className="absolute bottom-1 right-2 text-red-600">♥</div>
                    <div className="text-4xl text-red-600">♥</div>
                  </div>
                </div>
                
                {/* Card back */}
                <div className="absolute top-32 left-20 transform rotate-15 transition-transform hover:rotate-0 duration-300 z-30">
                  <div className="poker-card-back poker-card"></div>
                </div>
                
                {/* Chips */}
                <div className="absolute bottom-20 left-28 transform -translate-y-2 transition-transform hover:translate-y-0 duration-300 z-40">
                  <div className="poker-chip chip-black">
                    $100
                  </div>
                </div>
                
                <div className="absolute bottom-16 left-16 transform -translate-y-1 transition-transform hover:translate-y-0 duration-300 z-50">
                  <div className="poker-chip chip-blue">
                    $25
                  </div>
                </div>
                
                <div className="absolute bottom-12 left-8 transition-transform hover:translate-y-0 duration-300 z-60">
                  <div className="poker-chip chip-red">
                    $5
                  </div>
                </div>
                
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-radial from-accent-400/20 to-transparent rounded-full filter blur-xl opacity-70"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Features section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-8 border-t border-gray-800">
          <div className={`text-center ${isVisible ? 'fade-in-delay-1' : 'opacity-0'}`}>
            <div className="w-16 h-16 mx-auto bg-accent-900/50 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-xl font-serif font-medium mb-2">Customizable Tables</h3>
            <p className="text-gray-400">Choose your stakes, style, and game variants for the perfect poker experience.</p>
          </div>
          
          <div className={`text-center ${isVisible ? 'fade-in-delay-2' : 'opacity-0'}`}>
            <div className="w-16 h-16 mx-auto bg-accent-900/50 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-serif font-medium mb-2">Live Tournaments</h3>
            <p className="text-gray-400">Compete against players from around the world in scheduled tournaments with big prizes.</p>
          </div>
          
          <div className={`text-center ${isVisible ? 'fade-in-delay-3' : 'opacity-0'}`}>
            <div className="w-16 h-16 mx-auto bg-accent-900/50 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-serif font-medium mb-2">Secure Gameplay</h3>
            <p className="text-gray-400">Advanced encryption and fair play algorithms ensure a safe and authentic experience.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;