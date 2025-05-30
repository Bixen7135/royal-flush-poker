import React from 'react';
import SkeletonLoader from '../common/SkeletonLoader';

const PokerTableSkeleton: React.FC = () => {
  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-full bg-table-900 border-8 border-gray-800 shadow-2xl">
      {/* Center area with community cards */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <div className="flex gap-2 mb-4">
          {[...Array(5)].map((_, i) => (
            <SkeletonLoader key={i} className="w-14 h-20 md:w-16 md:h-24" />
          ))}
        </div>
        <SkeletonLoader className="w-32 h-20 rounded-lg" />
      </div>

      {/* Player positions */}
      {[...Array(9)].map((_, i) => {
        let positionClass = '';
        switch(i) {
          case 0: positionClass = 'bottom-0 left-1/2 -translate-x-1/2 mb-2'; break;
          case 1: positionClass = 'bottom-12 left-12 -translate-x-1/2'; break;
          case 2: positionClass = 'top-1/2 left-0 -translate-y-1/2 ml-2'; break;
          case 3: positionClass = 'top-12 left-12 -translate-x-1/2'; break;
          case 4: positionClass = 'top-0 left-1/2 -translate-x-1/2 mt-2'; break;
          case 5: positionClass = 'top-12 right-12 translate-x-1/2'; break;
          case 6: positionClass = 'top-1/2 right-0 -translate-y-1/2 mr-2'; break;
          case 7: positionClass = 'bottom-12 right-12 translate-x-1/2'; break;
          case 8: positionClass = 'bottom-0 right-24 translate-x-1/2 mb-12'; break;
        }
        return (
          <div key={i} className={`absolute ${positionClass}`}>
            <SkeletonLoader className="w-14 h-14 rounded-full" />
            <SkeletonLoader className="mt-2 w-20 h-4" />
          </div>
        );
      })}

      {/* Action buttons area */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4">
        <SkeletonLoader className="w-full h-32 rounded-lg" />
      </div>
    </div>
  );
};

export default PokerTableSkeleton;