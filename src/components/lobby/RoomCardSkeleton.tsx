import React from 'react';
import SkeletonLoader from '../common/SkeletonLoader';

const RoomCardSkeleton: React.FC = () => {
  return (
    <div className="bg-gray-800/60 border border-gray-700 rounded-lg overflow-hidden shadow-lg">
      <SkeletonLoader className="h-10 w-full" />
      <div className="p-6 space-y-4">
        <SkeletonLoader className="h-6 w-3/4" />
        <div className="space-y-2">
          <div className="flex justify-between">
            <SkeletonLoader className="h-4 w-1/4" />
            <SkeletonLoader className="h-4 w-1/4" />
          </div>
          <div className="flex justify-between">
            <SkeletonLoader className="h-4 w-1/3" />
            <SkeletonLoader className="h-4 w-1/3" />
          </div>
        </div>
        <SkeletonLoader className="h-2 w-full rounded-full" />
        <SkeletonLoader className="h-10 w-full" />
      </div>
    </div>
  );
};

export default RoomCardSkeleton;