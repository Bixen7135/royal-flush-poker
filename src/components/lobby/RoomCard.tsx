import React from 'react';
import { Link } from 'react-router-dom';
import { Users } from 'lucide-react';
import { Room } from '../../types';

type RoomCardProps = {
  room: Room;
};

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  // Calculate percentage of filled seats
  const fillPercentage = (room.players / room.maxPlayers) * 100;
  
  // Determine if the room is almost full (for highlighting)
  const isAlmostFull = fillPercentage >= 80;
  
  // Determine animation classes based on room state
  const animationClass = isAlmostFull ? 'glow-effect' : '';
  
  return (
    <Link to={`/game/${room.id}`} className="block transform transition-all duration-300 hover:scale-[1.03]">
      <div className={`relative bg-card-pattern bg-opacity-10 bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-lg ${animationClass}`}>
        {/* Card banner with room type */}
        <div className={`px-4 py-2 text-xs font-semibold uppercase tracking-wide ${
          room.roomType === 'tournament' ? 'bg-accent-900 text-accent-200' : 'bg-blue-900 text-blue-200'
        }`}>
          {room.roomType === 'tournament' ? 'Tournament' : 'Cash Game'}
        </div>
        
        {/* Card content */}
        <div className="p-6">
          <h3 className="text-xl font-serif font-bold text-white mb-2">{room.name}</h3>
          
          <div className="grid grid-cols-2 gap-2 text-sm mb-4">
            <div className="text-gray-400">Blinds:</div>
            <div className="text-right font-medium text-accent-400">{room.blinds}</div>
            
            <div className="text-gray-400">Buy-in:</div>
            <div className="text-right font-medium text-white">
              {room.minBuy} - {room.maxBuy} 
              <span className="text-xs ml-1 text-gray-400">CHIPS</span>
            </div>
          </div>
          
          {/* Player capacity indicator */}
          <div className="mt-4">
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center text-gray-300">
                <Users size={16} className="mr-2" />
                <span>
                  {room.players}/{room.maxPlayers} Players
                </span>
              </div>
              <div className={`text-xs font-medium ${
                isAlmostFull ? 'text-red-400' : 'text-green-400'
              }`}>
                {isAlmostFull ? 'Almost Full' : 'Open Seats'}
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
              <div 
                className={`h-full rounded-full ${
                  isAlmostFull 
                    ? 'bg-gradient-to-r from-red-600 to-red-500 animate-pulse-slow' 
                    : 'bg-gradient-to-r from-green-600 to-green-500'
                }`}
                style={{ width: `${fillPercentage}%` }}
              />
            </div>
          </div>
          
          {/* Join button/indicator */}
          <div className="mt-4 text-center py-2 bg-gray-900/50 rounded-md border border-gray-700 font-medium text-accent-400 hover:bg-gray-800 transition-colors">
            Join Table
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RoomCard;